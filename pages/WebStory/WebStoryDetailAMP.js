/**
 * WebStoryDetailAMP — Serves AMP web story pages.
 *
 * Fetches the web story from the API and serves the `content_html`
 * with injected analytics (GA4, Chartbeat), JSON-LD schemas, and meta tags.
 *
 * Route: /web-stories/:slug
 * API:   {WEBSTORY_API_BASE}/webstory-detail/:slug
 */

import analyticsConfig from "../../lib/analytics/config";

// Site identity — from env (populated from siteSettings at deploy time)
const SITE_NAME_VALUE = process.env.NEXT_PUBLIC_SITE_NAME || "Tv9up";
const SITE_LOGO_VALUE = process.env.NEXT_PUBLIC_SITE_LOGO_URL || "";
const SITE_LANGUAGE_VALUE = process.env.NEXT_PUBLIC_SITE_LANGUAGE || "hi";

const WEBSTORY_API_BASE = process.env.WEBSTORY_API_BASE_URL;

if (!WEBSTORY_API_BASE) {
  console.warn(
    "[WebStoryDetailAMP] WARNING: WEBSTORY_API_BASE_URL environment variable is not set. " +
      "Web story detail pages will not function correctly."
  );
}

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");

export default function WebStoryDetailAMP() {
  // When accessed via client-side navigation (Link), force a full page reload
  // so getServerSideProps can serve the raw AMP HTML.
  if (typeof window !== "undefined") {
    window.location.reload();
  }
  return null;
}

function escHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escJson(str) {
  if (!str) return "";
  return String(str).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

/**
 * Build amp-analytics tags to inject inside <amp-story>
 */
function buildStoryAnalytics(data = {}) {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID || analyticsConfig.ga4.measurementId || "";
  const chartbeatUid = process.env.NEXT_PUBLIC_CHARTBEAT_UID || analyticsConfig.chartbeat.uid || "";
  const chartbeatDomain = process.env.NEXT_PUBLIC_CHARTBEAT_DOMAIN || analyticsConfig.chartbeat.domain || "";

  const title = data.title || "";
  const permalink = data.permalink || "";
  const contentId = data.id || "";
  const author = data.author?.display_name || "";
  const authorId = data.author?.id || "";
  const category = data.categories?.[0]?.name || "NA";
  const publishedDate = data.created_gmt || "";
  const modifiedDate = data.modified_gmt || "";

  const snippets = [];

  // GA4 gtag
  if (ga4Id) {
    snippets.push(`<amp-analytics type="gtag" data-credentials="include">
<script type="application/json">
{
  "vars": {
    "gtag_id": "${ga4Id}",
    "config": {
      "${ga4Id}": {
        "groups": "default",
        "page_type": "Detail",
        "page_url": "${escJson(permalink)}",
        "content_id": "${contentId}",
        "content_type": "Webstories",
        "author_name": "${escJson(author)}",
        "author_id": "${authorId}",
        "edit_by_author_name": "${escJson(author)}",
        "edit_by_author_id": "${authorId}",
        "title": "${escJson(title)}",
        "published_date": "${escJson(publishedDate)}",
        "modification_date": "${escJson(modifiedDate)}",
        "article_position": "NA",
        "category": "${escJson(category)}",
        "anchor_name": "NA",
        "sub_category": "NA",
        "previous_source": "NA",
        "day_parting": "NA"
      }
    }
  }
}
</script>
</amp-analytics>`);
  }

  // Chartbeat
  if (chartbeatUid && chartbeatDomain) {
    snippets.push(`<amp-analytics type="chartbeat">
<script type="application/json">
{
  "vars": {
    "uid": "${chartbeatUid}",
    "domain": "${chartbeatDomain}",
    "sections": "${escJson(category)}",
    "authors": "${escJson(author)}"
  }
}
</script>
</amp-analytics>`);
  }

  return snippets.join("\n");
}

/**
 * Build JSON-LD schemas for the web story
 */
function buildSchemas(data = {}) {
  const title = data.title || "";
  const permalink = data.permalink || "";
  const excerpt = data.excerpt || "";
  const thumbnail = data.thumbnail_full || data.thumbnail || "";
  const publishedDate = data.created_gmt || "";
  const modifiedDate = data.modified_gmt || "";
  const author = data.author || {};
  const category = data.categories?.[0]?.name || "";

  const siteName = SITE_NAME_VALUE;
  const siteUrl = SITE_URL || "";
  const logoUrl = SITE_LOGO_VALUE;

  const schemas = [];

  // WebPage schema
  schemas.push({
    "@context": "http://schema.org",
    "@type": "WebPage",
    name: title,
    url: permalink,
    description: excerpt,
    keywords: "",
    inLanguage: SITE_LANGUAGE_VALUE,
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        contentUrl: logoUrl,
        width: "600",
        height: "60",
      },
    },
  });

  // NewsArticle schema
  schemas.push({
    "@context": "http://schema.org",
    "@type": "NewsArticle",
    headline: title,
    url: permalink,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    name: title,
    isAccessibleForFree: "http://schema.org/True",
    articleSection: category,
    thumbnailUrl: thumbnail,
    image: {
      "@type": "ImageObject",
      url: thumbnail,
      width: "900",
      height: "1200",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": permalink,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        contentUrl: logoUrl,
        url: logoUrl,
        name: "logo",
        width: "600",
        height: "60",
      },
    },
    author: {
      "@type": "Person",
      givenName: author.display_name || "",
      name: author.display_name || "",
      url: author.link || "",
    },
  });

  return schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n");
}

/**
 * Build meta tags for the web story
 */
function buildMetaTags(data = {}) {
  const title = data.title || "";
  const permalink = data.permalink || "";
  const excerpt = data.excerpt || "";
  const thumbnail = data.thumbnail_full || data.poster_portrait || data.thumbnail || "";
  const publishedDate = data.created_gmt || "";
  const modifiedDate = data.modified_gmt || "";
  const siteName = SITE_NAME_VALUE;

  const tags = [];
  tags.push(`<meta name="description" content="${escHtml(excerpt)}">`);
  tags.push(`<meta property="og:locale" content="${SITE_LANGUAGE}">`);
  tags.push(`<meta property="og:site_name" content="${escHtml(siteName)}">`);
  tags.push(`<meta property="og:type" content="article">`);
  tags.push(`<meta property="og:title" content="${escHtml(title)}">`);
  tags.push(`<meta property="og:url" content="${escHtml(permalink)}">`);
  tags.push(`<meta property="og:description" content="${escHtml(excerpt)}">`);
  if (publishedDate) tags.push(`<meta property="article:published_time" content="${escHtml(publishedDate)}">`);
  if (modifiedDate) tags.push(`<meta property="article:modified_time" content="${escHtml(modifiedDate)}">`);
  if (thumbnail) {
    tags.push(`<meta property="og:image" content="${escHtml(thumbnail)}">`);
    tags.push(`<meta property="og:image:width" content="640">`);
    tags.push(`<meta property="og:image:height" content="853">`);
    tags.push(`<meta name="twitter:card" content="summary_large_image">`);
    tags.push(`<meta name="twitter:image" content="${escHtml(thumbnail)}">`);
    tags.push(`<meta name="twitter:image:alt" content="${escHtml(title)}">`);
  }
  return tags.join("\n");
}

/**
 * Ensure amp-analytics script is in <head>
 */
function ensureAmpAnalyticsScript(html) {
  if (html.includes('custom-element="amp-analytics"')) {
    return html;
  }
  const script = `<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>`;
  return html.replace("</head>", `${script}\n</head>`);
}

/**
 * Inject meta tags and schemas into <head>
 */
function injectHeadContent(html, metaTags, schemas) {
  const headContent = `${metaTags}\n${schemas}`;
  return html.replace("</head>", `${headContent}\n</head>`);
}

/**
 * Inject analytics inside <amp-story> (must be child of amp-story, not body)
 */
function injectStoryAnalytics(html, analyticsHtml) {
  if (!analyticsHtml) return html;

  // Insert before </amp-story> closing tag (after social share, before close)
  if (html.includes("</amp-story>")) {
    return html.replace("</amp-story>", `${analyticsHtml}\n</amp-story>`);
  }

  return html;
}

export async function getServerSideProps({ query, res }) {
  const slug = query?.slug || "";

  if (!WEBSTORY_API_BASE) {
    console.error("[WebStoryDetailAMP] WEBSTORY_API_BASE_URL env variable is not configured.");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.statusCode = 503;
    res.write(
      `<!doctype html><html><head><title>Service Unavailable</title></head>` +
        `<body><h1>503 - Service Unavailable</h1>` +
        `<p>Web Story API is not configured. Please set the WEBSTORY_API_BASE_URL environment variable.</p>` +
        `</body></html>`
    );
    res.end();
    return { props: {} };
  }

  if (!slug) {
    return { notFound: true };
  }

  try {
    const apiUrl = `${WEBSTORY_API_BASE}/webstory-detail/${slug}`;
    const response = await fetch(apiUrl, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      console.error(`[WebStoryDetailAMP] API returned ${response.status} for slug: ${slug}`);
      return { notFound: true };
    }

    const json = await response.json();

    if (!json?.ok || !json?.data?.content_html) {
      console.error(`[WebStoryDetailAMP] No content_html for slug: ${slug}`);
      return { notFound: true };
    }

    const data = json.data;
    let ampHtml = data.content_html.trim();

    // Ensure <!doctype html>
    if (!ampHtml.toLowerCase().startsWith("<!doctype")) {
      ampHtml = `<!doctype html>\n${ampHtml}`;
    }

    // Build analytics, schemas, meta
    const analyticsHtml = buildStoryAnalytics(data);
    const schemasHtml = buildSchemas(data);
    const metaTagsHtml = buildMetaTags(data);

    // Inject into HTML
    ampHtml = ensureAmpAnalyticsScript(ampHtml);
    ampHtml = injectHeadContent(ampHtml, metaTagsHtml, schemasHtml);
    ampHtml = injectStoryAnalytics(ampHtml, analyticsHtml);

    // Serve
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    res.write(ampHtml);
    res.end();

    return { props: {} };
  } catch (error) {
    console.error(`[WebStoryDetailAMP] Error fetching web story:`, error?.message || error);
    return { notFound: true };
  }
}
