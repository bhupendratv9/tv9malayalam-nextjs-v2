/**
 * Widget Helper — Shared utility functions used across multiple widgets.
 * Import these instead of defining locally in each widget.
 *
 * Usage:
 *   import { getImg, getLink, parseEndpoint, extractItems, formatIstDate, getValue, normalizeArticleInput, pickValue } from "@/lib/helper/widgetHelper";
 */

import { getHref } from "./commonHelper";

/**
 * Extract image URL from an item (multiple possible field names).
 * Optionally appends CDN resize param (?w=XXX) based on target width.
 *
 * Usage:
 *   getImg(item)           → raw URL
 *   getImg(item, 320)      → URL with ?w=320
 *   getImg(item, "thumb")  → URL with ?w=90 (preset)
 */
const IMG_WIDTH_PRESETS = {
  landscape: 320,
  portrait: 228,
  square: 170,
  thumb: 90,
  banner: 600,
  photo: 320,
};

export function getImg(item, width) {
  const src =
    item?.thumbnail ||
    item?.image ||
    item?.thumb ||
    item?.image_url ||
    item?.featured_image ||
    item?.featured_media?.url ||
    "";
  if (!src || !width) return src;
  const w = typeof width === "string" ? (IMG_WIDTH_PRESETS[width] || 320) : width;
  return cdnResize(src, w);
}

/**
 * Append/replace CDN resize params on image URL.
 * Works with tv9 image CDN (images.tv9tamilnews.com, images.tv9hindi.com).
 * If URL already has ?w=, replaces it with the new width.
 */
export function cdnResize(src, width) {
  if (!src || !width) return src;
  if (!src.includes("images.tv9")) return src;

  // Replace existing w= param if present
  if (/[?&]w=\d+/.test(src)) {
    return src.replace(/([?&])w=\d+/, `$1w=${width}`);
  }

  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}w=${width}`;
}

/**
 * Extract and normalize link URL from an item.
 */
export function getLink(item) {
  const url = item?.permalink || item?.url || item?.link || "#";
  return getHref(url);
}

/**
 * Parse endpoint URL to extract base, offset, and limit for pagination.
 * Example: ".../category/india/0_10" → { base: ".../category/india/", offset: 0, limit: 10, trailing: "" }
 */
export function parseEndpoint(endpoint) {
  if (!endpoint) return null;
  const match = endpoint.match(/^(.*\/)(\d+)_(\d+)(\/?)$/);
  if (match) {
    return {
      base: match[1],
      offset: parseInt(match[2], 10),
      limit: parseInt(match[3], 10),
      trailing: match[4],
    };
  }
  return null;
}

/**
 * Extract items array from various API response formats.
 */
export function extractItems(json) {
  if (!json) return [];
  if (Array.isArray(json)) return json;
  if (Array.isArray(json?.data?.posts)) return json.data.posts;
  if (Array.isArray(json?.data)) return json.data;
  if (Array.isArray(json?.items)) return json.items;
  if (Array.isArray(json?.posts)) return json.posts;
  if (json?.data && typeof json.data === "object") return [json.data];
  return [];
}

/**
 * Format a date string to IST display format.
 * "2026-05-25T06:58:06Z" → "May 25, 2026, 12:28 PM IST"
 */
export function formatIstDate(dateString) {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    const formatted = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
    return `${formatted} IST`;
  } catch {
    return dateString;
  }
}

/**
 * Safe deep property access for objects.
 * getValue(obj, "title") or getValue(obj, ["author", "name"], "fallback")
 */
export function getValue(obj, path, defaultValue = null) {
  if (!obj || typeof obj !== "object") return defaultValue;
  if (typeof path === "string") {
    return Object.prototype.hasOwnProperty.call(obj, path)
      ? obj[path]
      : defaultValue;
  }
  let current = obj;
  for (const key of path) {
    if (
      current &&
      typeof current === "object" &&
      Object.prototype.hasOwnProperty.call(current, key)
    ) {
      current = current[key];
    } else {
      return defaultValue;
    }
  }
  return current ?? defaultValue;
}

/**
 * Normalize article data from various input formats (items, data, response).
 * Used by detail widgets to extract the article object.
 */
export function normalizeArticleInput({ items = [], data = [], item = null, response = null }) {
  if (data && typeof data === "object" && !Array.isArray(data)) {
    if (data.data && typeof data.data === "object" && !Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.data) && data.data.length > 0) return data.data[0];
    if (data.item && typeof data.item === "object") return data.item;
    if (data.title || data.content_html || data.id) return data;
  }
  if (Array.isArray(data) && data.length > 0) return data[0];
  if (Array.isArray(items) && items.length > 0) return items[0];
  if (item && typeof item === "object") return item;
  if (response && typeof response === "object") {
    if (Array.isArray(response) && response.length > 0) return response[0];
    if (response.data && typeof response.data === "object" && !Array.isArray(response.data)) return response.data;
    if (Array.isArray(response.data) && response.data.length > 0) return response.data[0];
    if (response.item && typeof response.item === "object") return response.item;
    if (response.title || response.content_html || response.id) return response;
  }
  return null;
}

/**
 * Pick the first non-empty value from an object using a list of possible keys.
 */
export function pickValue(row = {}, keys = [], defaultValue = "") {
  for (const key of keys) {
    if (row?.[key] !== undefined && row?.[key] !== null && row?.[key] !== "") {
      return row[key];
    }
  }
  return defaultValue;
}

/**
 * Process HTML content for safe rendering:
 * - Add loading="lazy" to all <img> tags
 * - Strip inline Twitter/Instagram scripts (loaded globally instead)
 */
export function processEmbedHtml(html) {
  if (!html) return "";
  return html
    .replace(/<img(?![^>]*loading=)/gi, '<img loading="lazy"')
    .replace(/<script[^>]*src="https:\/\/platform\.twitter\.com\/widgets\.js"[^>]*><\/script>/gi, "")
    .replace(/<script[^>]*src="https:\/\/www\.instagram\.com\/embed\.js"[^>]*><\/script>/gi, "");
}

/**
 * Build tags array from article taxonomies.
 */
export function buildTags(article = {}) {
  const topicTerms = getValue(article, ["taxonomies", "topic"], []);
  const categoryTerms = getValue(article, ["taxonomies", "category"], []);
  const topics = Array.isArray(article?.topics) ? article.topics : [];
  const source =
    topics.length > 0
      ? topics
      : Array.isArray(topicTerms) && topicTerms.length > 0
        ? topicTerms
        : Array.isArray(categoryTerms) && categoryTerms.length > 0
          ? categoryTerms
          : [];
  return source
    .filter((item) => item && typeof item === "object" && (item.name || item.title))
    .map((item) => ({
      name: String(item.name || item.title || ""),
      slug: String(item.slug || ""),
    }));
}


/**
 * Build the proxy URL for load-more requests.
 * Uses the _proxyToken from sanitized dataConfig.
 */
export function buildLoadMoreUrl(dataConfig = {}, offset, limit) {
  const proxyToken = dataConfig?._proxyToken;
  if (!proxyToken) return null;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/";
  return `${basePath}/api/proxy/load-more?e=${encodeURIComponent(proxyToken)}&offset=${offset}&limit=${limit}`;
}
