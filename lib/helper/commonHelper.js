import { useEffect } from "react";
import { ICONS_SVG } from "@/lib/constants";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

/**
 * Normalise a URL for the current site.
 * - Falsy → "#"
 * - Relative (starts with "/") → prefixed with SITE_URL
 * - Absolute matching NEXT_PUBLIC_SITE_REWRITE_PATTERN → origin replaced with SITE_URL
 */
export function getHref(url) {
  if (!url || typeof url !== "string") return "#";
  // Already absolute external URL — check if it's our own site's domain
  if (url.startsWith("http://") || url.startsWith("https://")) {
    // Only rewrite URLs from the CURRENT site's known domains (configured via env)
    // Other TV9 network sites (tv9hindi, tv9tamil etc.) are treated as external
    const rewritePattern = process.env.NEXT_PUBLIC_SITE_REWRITE_PATTERN;
    if (rewritePattern) {
      const regex = new RegExp(rewritePattern);
      if (regex.test(url)) {
        let result = url.replace(regex, SITE_URL);
        // Avoid double basePath
        const basePath = SITE_URL.replace(/^https?:\/\/[^/]+/, "");
        if (basePath) {
          const doubled = `${basePath}${basePath}`;
          while (result.includes(doubled)) {
            result = result.replace(doubled, basePath);
          }
        }
        return result;
      }
    }
    // No rewrite pattern or didn't match — return as-is
    return url;
  }
  // Relative with leading slash
  if (url.startsWith("/")) return `${SITE_URL}${url}`;
  // Hash link
  if (url === "#") return "#";
  // Relative without leading slash — add one
  return `${SITE_URL}/${url}`;
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