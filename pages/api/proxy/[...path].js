/**
 * Generic XML/Feed Proxy
 * ----------------------
 * Proxies sitemap, feed, and other XML/text files from the origin site.
 * Serves them as-is with the correct content-type.
 *
 * URL pattern: /api/proxy/<path>
 * Example:     /api/proxy/news-sitemap.xml → fetches https://www.tv9hindi.com/news-sitemap.xml
 *              /api/proxy/sitemap.xml
 *              /api/proxy/feed
 *              /api/proxy/sitemap/post-sitemap1.xml
 *
 * The response is cached for 10 minutes (configurable via PROXY_CACHE_TTL env).
 */

import { PROXY_USER_AGENT } from "../../../lib/constants";

const ORIGIN = process.env.PROXY_ORIGIN;
const CACHE_TTL = parseInt(process.env.PROXY_CACHE_TTL || "600", 10); // 10 min default

// Map file extensions / paths to content types
function getContentType(pathStr) {
  if (pathStr.endsWith(".xml")) return "application/xml; charset=utf-8";
  if (pathStr.endsWith(".xsl")) return "application/xml; charset=utf-8";
  if (pathStr.endsWith(".txt")) return "text/plain; charset=utf-8";
  if (pathStr.endsWith(".json")) return "application/json; charset=utf-8";
  if (pathStr.includes("feed") || pathStr.includes("rss")) return "application/rss+xml; charset=utf-8";
  if (pathStr.includes("atom")) return "application/atom+xml; charset=utf-8";
  return "application/xml; charset=utf-8";
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const pathSegments = req.query.path;
  let remotePath = "";

  if (Array.isArray(pathSegments) && pathSegments.length > 0) {
    remotePath = pathSegments.join("/");
  } else if (typeof pathSegments === "string" && pathSegments) {
    remotePath = pathSegments;
  } else {
    // Fallback: extract from the raw URL (rewrite strips /api/proxy/ prefix)
    const rawUrl = req.url || "";
    // Try /api/proxy/... pattern first
    const proxyMatch = rawUrl.match(/\/api\/proxy\/(.+?)(\?|$)/);
    if (proxyMatch) {
      remotePath = proxyMatch[1];
    } else {
      // The URL IS the path (e.g. /news-sitemap.xml from rewrite)
      remotePath = rawUrl.replace(/^\//, "").split("?")[0];
    }
  }

  if (!remotePath) {
    return res.status(400).json({ error: "Path is required", query: req.query, url: req.url });
  }

  const originUrl = `${ORIGIN}/${remotePath}`;

  try {
    const response = await fetch(originUrl, {
      headers: {
        "User-Agent": PROXY_USER_AGENT,
        Accept: "*/*",
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Origin returned ${response.status}`,
        url: originUrl,
      });
    }

    const body = await response.text();
    const contentType = getContentType(remotePath);

    // Set caching headers
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", `public, s-maxage=${CACHE_TTL}, stale-while-revalidate=${CACHE_TTL * 2}`);
    res.setHeader("X-Proxy-Origin", originUrl);

    return res.status(200).send(body);
  } catch (error) {
    console.error(`[proxy] Failed to fetch ${originUrl}:`, error?.message || error);
    return res.status(502).json({ error: "Failed to fetch from origin", url: originUrl });
  }
}
