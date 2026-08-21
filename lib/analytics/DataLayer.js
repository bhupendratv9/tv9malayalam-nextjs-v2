/**
 * DataLayer Component
 * ====================
 * Renders the dataLayer script with custom dimensions based on page type.
 *
 * Usage:
 *   <DataLayer pageType="Homepage" />
 *   <DataLayer pageType="Detail" articleData={articleData} />
 *   <DataLayer pageType="Category" category="politics" title="Politics News" />
 *
 * Page types: Homepage, Detail, Category, Topic, Author, Videos, Photos, WebStories, LiveTV, ShortVideos
 */
import Script from "next/script";

function countWords(html) {
  if (!html) return "NA";
  const text = html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  const count = text.split(" ").filter(Boolean).length;
  return count > 0 ? String(count) : "NA";
}

function formatDate(dateStr) {
  if (!dateStr) return "NA";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "NA";
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const h = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    const s = String(d.getSeconds()).padStart(2, "0");
    return `${y}-${m}-${day} ${h}:${min}:${s}`;
  } catch {
    return "NA";
  }
}

export default function DataLayer({ pageType = "Home", articleData = null, category = "", subCategory = "", title = "" }) {
  let dataLayerObj = {};

  if (pageType === "Detail" && articleData) {
    const postFormat = (articleData.post_format || "post").toLowerCase();
    let contentType = "NewsArticle";
    if (postFormat === "video") contentType = "Video";
    else if (postFormat === "photo" || postFormat === "gallery" || postFormat === "photo-gallery") contentType = "Gallery";
    else if (postFormat === "live-blog") contentType = "Live Blog";

    const categories = articleData.categories || articleData.taxonomies?.category || [];
    const catName = categories[0]?.slug || categories[0]?.name || category || "NA";
    const subCatName = categories[1]?.slug || categories[1]?.name || subCategory || catName;

    dataLayerObj = {
      page_type: "default",
      page_type: "Detail",
      content_id: String(articleData.id || "NA"),
      content_type: contentType,
      word_count: countWords(articleData.content_html),
      author_name: articleData.author?.display_name || "NA",
      author_id: String(articleData.author?.id || "NA"),
      edit_by_author_name: articleData.modified_by?.display_name || articleData.author?.display_name || "NA",
      edit_by_author_id: String(articleData.modified_by?.id || articleData.author?.id || "NA"),
      title: articleData.title || title || "NA",
      published_date: formatDate(articleData.published_at || articleData.created_gmt),
      modification_date: formatDate(articleData.modified_at || articleData.modified_gmt),
      article_position: "NA",
      category: catName,
      anchor_name: "NA",
      sub_category: subCatName,
      previous_source: "NA",
      day_parting: "NA",
    };
  } else {
    // Non-detail pages: Homepage, Category, Topic, Author, Videos, Photos, etc.
    const pageCategory = category || pageType;

    dataLayerObj = {
      page_type: pageType,
      content_id: "NA",
      content_type: pageType,
      word_count: "NA",
      author_name: "NA",
      author_id: "NA",
      edit_by_author_name: "NA",
      edit_by_author_id: "NA",
      title: title || pageType,
      published_date: "NA",
      modification_date: "NA",
      article_position: "NA",
      category: pageCategory,
      anchor_name: "NA",
      sub_category: "NA",
      previous_source: "NA",
      day_parting: "NA",
    };
  }

  const scriptContent = `dataLayer=[${JSON.stringify(dataLayerObj)}]`;

  return (
    <Script id="dataLayer-custom-dimensions" strategy="beforeInteractive">
      {scriptContent}
    </Script>
  );
}

/**
 * DataLayer Push Helper
 * ---------------------
 * Push structured page data to the dataLayer for GTM consumption.
 *
 * Usage:
 *   import { pushPageView } from "../lib/analytics/DataLayer";
 *   pushPageView({ pageType: "article", category: "india", title: "..." });
 */

/**
 * Push a page view event to the dataLayer.
 */
export function pushPageView({ pageType = "", category = "", title = "", articleId = "", author = "", tags = [] }) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "page_view",
    page_type: pageType,
    page_category: category,
    page_title: title,
    article_id: articleId,
    article_author: author,
    article_tags: Array.isArray(tags) ? tags.join(",") : "",
  });
}

/**
 * Push a custom event to the dataLayer.
 */
export function pushEvent(eventName, data = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...data });
}

/**
 * Push article detail data to dataLayer (for detail pages).
 */
export function pushArticleData(articleMeta = {}) {
  if (typeof window === "undefined" || !articleMeta) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "article_view",
    article_id: articleMeta.id || "",
    article_title: articleMeta.title || "",
    article_type: articleMeta.type || "post",
    article_author: articleMeta.authorName || "",
    article_category: articleMeta.category || "",
    article_published: articleMeta.publishedTime || "",
    article_url: articleMeta.url || "",
  });
}
