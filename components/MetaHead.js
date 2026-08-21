import Head from "next/head";
import { buildSchemas } from "../lib/schemas";
import { buildGlobalSchemas } from "../lib/schemas/globalSchemas";

/**
 * MetaHead — renders complete SEO head tags + JSON-LD schemas.
 *
 * @param {object} meta - { meta_title, meta_description, meta_keywords, news_keywords, canonical, og_title, og_description }
 * @param {array} schemas - Schema config list from page builder
 * @param {object} settings - Page-level settings (og:image, fb:app_id, inlanguage)
 * @param {object} siteSettings - Global site settings
 * @param {object} articleMeta - Article-level meta (for detail pages)
 * @param {string} fallbackTitle - Fallback title
 */
export default function MetaHead({ meta = {}, schemas = [], settings = {}, siteSettings = {}, articleMeta = null, fallbackTitle = "" }) {
  const meta_title = meta?.meta_title || fallbackTitle || siteSettings?.default_meta_title || "";
  const meta_description = meta?.meta_description || siteSettings?.default_meta_description || "";
  const meta_keywords = meta?.meta_keywords || "";
  const news_keywords = meta?.news_keywords || "";

  // Canonical: from API or page builder — resolve relative paths to full URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const rawCanonical = meta?.canonical || articleMeta?.url || "";
  const canonical = rawCanonical && !rawCanonical.startsWith("http")
    ? `${siteUrl}${rawCanonical.startsWith("/") ? "" : "/"}${rawCanonical}`
    : rawCanonical;

  const og_title = meta?.og_title || meta_title || "";
  const og_description = meta?.og_description || meta_description || "";
  const og_image = settings?.["og:image"] || meta?.og_image || siteSettings?.og_default_image || "";
  const og_image_width = settings?.["og:image:width"] || "200";
  const og_image_height = settings?.["og:image:height"] || "200";
  const fb_app_id = settings?.["fb:app_id"] || siteSettings?.fb_app_id || "";
  const inlanguage = settings?.inlanguage || siteSettings?.inlanguage || "";

  // Site settings
  const siteName = siteSettings?.site_name || "";
  const faviconUrl = siteSettings?.favicon_url || "";
  const twitterHandle = siteSettings?.twitter_handle || "";
  const facebookUrl = siteSettings?.facebook_url || "";

  // Robots: page-level index_status overrides global siteSettings.robots_index
  // Supports: "noindex", "index", "1" (noindex), "0" (index), "yes" (noindex), "" (use global)
  const indexStatus = meta?.index_status || "";
  let robotsIndex = "";
  if (indexStatus === "noindex" || indexStatus === "1" || indexStatus === "yes") {
    robotsIndex = "noindex,follow";
  } else if (indexStatus === "index" || indexStatus === "0" || indexStatus === "no") {
    robotsIndex = "index,follow";
  } else {
    robotsIndex = siteSettings?.robots_index || "";
  }

  // Author
  const authorName = articleMeta?.authorName || siteName || "";

  // Build JSON-LD schemas from page builder config
  const schemaJsonLd = buildSchemas(schemas, { meta, settings, siteSettings, articleMeta });

  // Build global schemas (enabled via siteSettings keys, deduplicated against page schemas)
  const globalSchemaJsonLd = buildGlobalSchemas({ meta, settings, siteSettings, articleMeta }, schemaJsonLd);

  // Combine: page-specific first, then global
  const allSchemas = [...schemaJsonLd, ...globalSchemaJsonLd];

  return (
    <Head>
      {meta_title && <title>{meta_title}</title>}
      {meta_description && <meta name="description" content={meta_description} />}
      {meta_keywords && <meta name="keywords" content={meta_keywords} />}
      {news_keywords && <meta name="news_keywords" content={news_keywords} />}
      {authorName && <meta name="author" content={authorName} />}
      {robotsIndex && <meta name="robots" content={robotsIndex} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {faviconUrl && <link rel="icon" href={faviconUrl} />}

      {/* Open Graph */}
      {og_title && <meta property="og:title" content={og_title} />}
      {og_description && <meta property="og:description" content={og_description} />}
      {og_image && <meta property="og:image" content={og_image} />}
      {og_image && <meta property="og:image:width" content={og_image_width} />}
      {og_image && <meta property="og:image:height" content={og_image_height} />}
      <meta property="og:type" content="website" />
      {siteName && <meta property="og:site_name" content={siteName} />}
      {canonical && <meta property="og:url" content={canonical} />}
      {fb_app_id && <meta property="fb:app_id" content={fb_app_id} />}
      {inlanguage && <meta property="og:locale" content={inlanguage} />}
      {facebookUrl && <meta property="article:publisher" content={facebookUrl} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {og_title && <meta name="twitter:title" content={og_title} />}
      {og_description && <meta name="twitter:description" content={og_description} />}
      {canonical && <meta name="twitter:url" content={canonical} />}
      {og_image && <meta property="twitter:image:src" content={og_image} />}
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}

      {/* JSON-LD Schemas */}
      {allSchemas.map((jsonLd, idx) => (
        <script
          key={`schema-${jsonLd["@type"] || idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ))}
    </Head>
  );
}
