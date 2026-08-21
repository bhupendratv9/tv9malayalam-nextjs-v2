/**
 * AMP Meta Tags Builder
 * Generates OG tags and other meta for AMP <head>
 */
import { esc } from "./ampUtils";

const SITE_LANGUAGE = process.env.NEXT_PUBLIC_SITE_LANGUAGE || "hi";

export function buildMetaTags(meta = {}, settings = {}, siteSettings = {}) {
  const ogTitle = esc(meta?.og_title || meta?.meta_title || meta?.title || "");
  const ogDesc = esc(meta?.og_description || meta?.meta_description || meta?.desc || "");
  const ogImage = esc(settings?.["og:image"] || meta?.og_image || "");
  const siteName = esc(siteSettings?.site_name || "");
  const inlanguage = esc(siteSettings?.inlanguage || SITE_LANGUAGE);
  const newsKeywords = esc(meta?.news_keywords || "");
  const robotsIndex = siteSettings?.robots_index || "";

  const tags = [];
  if (newsKeywords) tags.push(`<meta name="news_keywords" content="${newsKeywords}">`);
  if (robotsIndex) tags.push(`<meta name="robots" content="${robotsIndex}">`);
  tags.push(`<meta property="og:type" content="article">`);
  if (ogTitle) tags.push(`<meta property="og:title" content="${ogTitle}">`);
  if (ogDesc) tags.push(`<meta property="og:description" content="${ogDesc}">`);
  if (ogImage) tags.push(`<meta property="og:image" content="${ogImage}">`);
  if (siteName) tags.push(`<meta property="og:site_name" content="${siteName}">`);
  if (inlanguage) tags.push(`<meta property="og:locale" content="${inlanguage}">`);

  return tags.join("\n  ");
}
