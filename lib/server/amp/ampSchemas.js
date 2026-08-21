/**
 * AMP Schema Builder
 * Generates JSON-LD <script> tags for AMP <head>
 *
 * Schemas are controlled by the page builder `schemas` array.
 * Each schema with is_active:1 and a matching schema_type in SCHEMA_BUILDERS gets rendered.
 */
import { buildSchemas } from "../../schemas";

/**
 * Extract articleMeta from sections
 */
function extractArticleMeta(sections = []) {
  const detailSection = sections?.find((s) =>
    s.type === "detail-main-content-widget" ||
    s.type === "photo-detail-main-content-widget" ||
    s.type === "video-detail-main-content-widget" ||
    s.type === "live-blog-detail-main-content-widget"
  );
  if (!detailSection) return null;

  const article = detailSection.items?.[0] || detailSection.data?.data || detailSection.data || null;
  if (!article || typeof article !== "object") return null;

  // Also check breadcrumb widget
  const breadcrumbSection = sections?.find((s) => s.type === "breadcrumb-widget");
  const breadcrumb = article.breadcrumb
    || breadcrumbSection?.data?.breadcrumb
    || breadcrumbSection?.data?.data?.breadcrumb
    || [];

  return {
    title: article.title || "",
    description: article.excerpt || article.description || "",
    image: article.thumbnail_full || article.featured_media?.url || article.thumbnail || article.image || "",
    url: article.canonical || article.permalink || article.url || "",
    type: article.post_format || "post",
    keywords: article.meta?.meta_keywords || "",
    videoUrl: article.postmeta?.video_embed_url || "",
    videoDuration: article.postmeta?.video_duration || "",
    publishedTime: article.published_at || article.created_gmt || "",
    modifiedTime: article.modified_at || article.modified_gmt || "",
    authorName: article.author?.display_name || "",
    author: article.author || null,
    categories: article.categories || article.taxonomies?.category || [],
    content_html: article.content_html || "",
    thumbnail_full: article.thumbnail_full || article.thumbnail || "",
    articleSection: Array.isArray(article.categories)
      ? article.categories[0]?.slug || article.categories[0]?.name || ""
      : "",
    liveEntries: article.live_entries || [],
    breadcrumb,
  };
}

export function buildSchemaScripts(schemas = [], meta = {}, settings = {}, siteSettings = {}, sections = []) {
  if (!Array.isArray(schemas) || schemas.length === 0) schemas = [];

  const articleMeta = extractArticleMeta(sections);
  const schemaObjects = buildSchemas(schemas, { meta, settings, siteSettings, articleMeta });

  // Always add BreadcrumbList if breadcrumb data exists (not dependent on page builder config)
  const hasBreadcrumbSchema = schemaObjects.some((s) => s["@type"] === "BreadcrumbList");
  if (!hasBreadcrumbSchema && articleMeta?.breadcrumb?.length > 0) {
    schemaObjects.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: articleMeta.breadcrumb.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: item.name || "",
        item: item.url || "",
      })),
    });
  }

  if (!schemaObjects.length) return "";

  return schemaObjects
    .map((obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`)
    .join("\n  ");
}
