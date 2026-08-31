import { useEffect } from "react";
import { ICONS_SVG } from "@/lib/constants";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

/**
 * CMS / Alpha publish hosts — same list as original ML getHref.
 * Env NEXT_PUBLIC_SITE_REWRITE_PATTERN is extra (UP live host, e.g. malayalamtv9.com).
 */
const BUILTIN_SITE_ORIGIN_REGEXES = [
  /^https?:\/\/(www|app|alpha|alphapublish)\.tv9(hindi|tamil|telugu|marathi|kannada|bangla|up)(news)?\.com/i,
  /^https?:\/\/(www|app|alpha|alphapublish)\.malayalamtv9\.com/i,
];

// Folder CMS still puts in permalinks (live Alpha). Preview SITE_URL may be
// /tv9malayalam-nextjs-v1 — do not treat this as a prefix of -v1.
const CMS_BASE_PATH = (
  process.env.NEXT_PUBLIC_CMS_BASE_PATH || "/tv9malayalam-nextjs"
).replace(/\/$/, "");

function collapseDoubleBasePath(url) {
  if (!url || !SITE_URL) return url;
  const basePath = SITE_URL.replace(/^https?:\/\/[^/]+/, "");
  if (!basePath) return url;

  let result = url;

  // Existing (UP / live): /tv9malayalam-nextjs/tv9malayalam-nextjs → once
  const doubled = `${basePath}${basePath}`;
  while (result.includes(doubled)) {
    result = result.replace(doubled, basePath);
  }

  // Preview slot: SITE_URL path + CMS folder
  // /tv9malayalam-nextjs-v1/tv9malayalam-nextjs/videos/... → /tv9malayalam-nextjs-v1/videos/...
  // Skip when they are the same (live) — already handled above.
  if (CMS_BASE_PATH && CMS_BASE_PATH !== basePath) {
    const mixed = `${basePath}${CMS_BASE_PATH}`;
    while (result.includes(mixed)) {
      result = result.replace(mixed, basePath);
    }
  }

  return result;
}

function rewriteSiteOrigin(url) {
  if (!url || typeof url !== "string" || !SITE_URL) return url;

  const patterns = [];
  const envPattern = process.env.NEXT_PUBLIC_SITE_REWRITE_PATTERN;
  if (envPattern) {
    try {
      patterns.push(new RegExp(envPattern));
    } catch {
      // ignore invalid env regex
    }
  }
  patterns.push(...BUILTIN_SITE_ORIGIN_REGEXES);

  for (const regex of patterns) {
    if (regex.test(url)) {
      return collapseDoubleBasePath(url.replace(regex, SITE_URL));
    }
  }
  return url;
}

/**
 * Normalise a URL for the current site (same job as UP getHref + original ML host rewrite).
 * - Falsy → "#"
 * - Relative (starts with "/") → prefixed with SITE_URL
 * - Absolute CMS/live host → origin replaced with SITE_URL, doubled / mixed basePath collapsed
 */
export function getHref(url) {
  if (!url || typeof url !== "string") return "#";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return rewriteSiteOrigin(url);
  }
  if (url.startsWith("/")) return collapseDoubleBasePath(`${SITE_URL}${url}`);
  if (url === "#") return "#";
  return collapseDoubleBasePath(`${SITE_URL}/${url}`);
}

export { SITE_URL };

export const DEFAULT_SMOOTH_SCROLL_OFFSET = 120;

export const decodeHtml = (text) => {
  if (!text || typeof text !== "string") return text;
  const map = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#039;": "'", "&apos;": "'" };
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(Number.parseInt(hex, 16))
    )
    .replace(/&amp;|&lt;|&gt;|&quot;|&#039;|&apos;/g, (m) => map[m]);
};

export function scrollToElementById(
  targetId,
  topOffset = DEFAULT_SMOOTH_SCROLL_OFFSET
) {
  if (!targetId || typeof document === "undefined") return;

  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - topOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

export function useSmoothScrollAnchor(topOffset = DEFAULT_SMOOTH_SCROLL_OFFSET) {
  useEffect(() => {
    const handleClick = (event) => {
      const anchor = event.target.closest?.('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const targetId = decodeURIComponent(href.substring(1));
      if (!document.getElementById(targetId)) return;

      event.preventDefault();
      scrollToElementById(targetId, topOffset);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [topOffset]);
}

/**
 * Resolve the "view more" URL from section-level props.
 * Priority: view_more_link (API field) → dataConfig.view_more_url → sectionUrl → fallback
 */
export function getViewMoreUrl({ view_more_link, dataConfig, sectionUrl, fallback = "#" } = {}) {
  const url = view_more_link || dataConfig?.view_more_url || sectionUrl || fallback;
  return getHref(url);
}

/**
 * Resolve the "view more" label from section-level props.
 * Priority: view_more_label (API field) → default label
 */
export function getViewMoreLabel({ view_more_label, defaultLabel = "View more" } = {}) {
  return view_more_label || defaultLabel;
}

/**
 * ViewMoreLink — reusable "View more" anchor used across widgets.
 *
 * Props:
 *   - href: resolved URL (use getViewMoreUrl to compute)
 *   - label: display text (use getViewMoreLabel to compute)
 *   - className: CSS class (default "view_more")
 *   - iconId: SVG sprite icon id (default "#rgt-arrow")
 *   - show: if false, renders nothing (default true)
 */
export function ViewMoreLink({
  href,
  label = "View more",
  className = "view_more",
  iconId = `${ICONS_SVG}#rgt-arrow`,
  show = true,
}) {
  if (!show || !href || href === "#") return null;
  return (
    <a href={href} className={className}>
      {label}
      <svg><use href={iconId}></use></svg>
    </a>
  );
}


/**
 * Convert a URL slug to a display-friendly name.
 * "new-delhi" → "New Delhi"
 */
export function slugToTitle(slug = "") {
  if (!slug || typeof slug !== "string") return "";
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Resolve placeholders in a string using a params map.
 * Supports: {key}, {KEY}, {Key} — all match the same param (case-insensitive).
 *
 * Example:
 *   resolvePlaceholders("{city} Air Quality Index Today", { city: "New Delhi" })
 *   → "New Delhi Air Quality Index Today"
 */
export function resolvePlaceholders(template, params = {}) {
  if (!template || typeof template !== "string") return template || "";
  if (!params || typeof params !== "object") return template;

  return template.replace(/\{([^}]+)\}/g, (match, key) => {
    const normalizedKey = key.trim().toLowerCase();
    // Find the param value (case-insensitive lookup)
    const entry = Object.entries(params).find(
      ([k]) => k.toLowerCase() === normalizedKey
    );
    return entry ? entry[1] : match;
  });
}

/**
 * Resolve all string values in a meta object that contain {placeholders}.
 * Non-string values are passed through unchanged.
 */
export function resolveMetaPlaceholders(meta = {}, params = {}) {
  if (!meta || typeof meta !== "object") return meta || {};
  if (!params || !Object.keys(params).length) return meta;

  const resolved = {};
  for (const [key, value] of Object.entries(meta)) {
    resolved[key] = typeof value === "string" ? resolvePlaceholders(value, params) : value;
  }
  return resolved;
}