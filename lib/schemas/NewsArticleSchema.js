/**
 * NewsArticle Schema
 * https://schema.org/NewsArticle
 *
 * Builds from articleMeta passed to MetaHead.
 * Supports both:
 *   - buildArticleMeta format: { title, description, image, url, publishedTime, modifiedTime, ... }
 *   - Raw article format: { title, excerpt, canonical, published_at, modified_at, author, categories, ... }
 */

/**
 * Convert UTC date string to IST (+05:30) ISO format.
 * "2026-05-25T06:58:06Z" → "2026-05-25T12:28:06+05:30"
 */
function toIST(dateStr) {
  if (!dateStr) return "";
  // Already has offset (not UTC)
  if (dateStr.includes("+") || (dateStr.includes("-") && dateStr.lastIndexOf("-") > 9)) {
    return dateStr;
  }
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    // Add 5:30 hours for IST
    const ist = new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
    const y = ist.getUTCFullYear();
    const m = String(ist.getUTCMonth() + 1).padStart(2, "0");
    const d = String(ist.getUTCDate()).padStart(2, "0");
    const h = String(ist.getUTCHours()).padStart(2, "0");
    const min = String(ist.getUTCMinutes()).padStart(2, "0");
    const s = String(ist.getUTCSeconds()).padStart(2, "0");
    return `${y}-${m}-${d}T${h}:${min}:${s}+05:30`;
  } catch {
    return dateStr;
  }
}

export function buildNewsArticleSchema(schema, context = {}) {
  const { articleMeta = {}, siteSettings = {}, meta = {} } = context;

  if (!articleMeta || (!articleMeta.title && !meta.meta_title)) return null;

  const siteUrl = siteSettings.site_url || process.env.NEXT_PUBLIC_SITE_URL || "";
  const inLanguage = siteSettings.inlanguage || siteSettings.site_language || "ta";
  const siteName = siteSettings.site_name || "";
  const logoUrl = siteSettings.logo_url || "";

  // Resolve fields from either format
  const title = articleMeta.title || meta.meta_title || "";
  const description = articleMeta.description || articleMeta.excerpt || meta.meta_description || "";
  const url = articleMeta.url || articleMeta.canonical || articleMeta.permalink || meta.canonical || "";
  const imageUrl = articleMeta.image || articleMeta.thumbnail_full || articleMeta.thumbnail || articleMeta.featured_media?.url || "";
  const publishedAt = toIST(articleMeta.publishedTime || articleMeta.published_at || "");
  const modifiedAt = toIST(articleMeta.modifiedTime || articleMeta.modified_at || "");

  // Author
  const authorName = articleMeta.authorName || articleMeta.author?.display_name || "";
  const authorUrl = articleMeta.author?.link || "";

  // Category / section
  const categories = Array.isArray(articleMeta.categories)
    ? articleMeta.categories
    : (articleMeta.categories?.slug ? [articleMeta.categories] : []);
  const articleSection = categories[0]?.slug || "";

  // Keywords
  const keywords = articleMeta.meta?.meta_keywords || articleMeta.keywords || meta.meta_keywords || "";

  // Article body — strip HTML tags for clean text in schema
  const rawBody = articleMeta.content_html || "";
  const articleBody = rawBody
    ? rawBody.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim().substring(0, 2000)
    : "";

  const result = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description,
    url,
    inLanguage,
    articleSection,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    thumbnailUrl: imageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
      ...(imageUrl ? { image: imageUrl } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
        width: "600",
        height: "60",
      },
    },
    author: {
      "@type": "Person",
      name: authorName || siteName,
      ...(authorUrl ? { url: authorUrl } : {}),
    },
  };

  if (imageUrl) {
    result.image = {
      "@type": "ImageObject",
      url: imageUrl,
      width: "1280",
      height: "720",
    };
  }

  if (keywords) result.keywords = keywords;
  if (articleBody) result.articleBody = articleBody;
  if (title && title !== description) result.alternativeHeadline = title;

  return result;
}
