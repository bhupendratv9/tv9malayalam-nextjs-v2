/**
 * homePageBuilder.js
 * ==================
 * Server-side page assembly engine.
 * Fetches page layout from the Page Builder API, resolves widget endpoints,
 * fetches data for each widget, and assembles the final page props.
 *
 * Exports: buildHomePageData(pageId, { queryParams })
 */

import { fetchPageBuilderPage, fetchGlobalSettings } from "./pageBuilder";
import { fetchNavMenu, fetchTrendingMenu, fetchTopCitiesMenu, fetchBottomNavMenu } from "./fetchNavMenu";
import { cachedFetch } from "./fileCache";
import { getHref } from "../helper/commonHelper";
import { HOME_BREAKING_NEWS_TICKER_API } from "../constants";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
const PERMALINK_KEYS = new Set(["url", "permalink", "link", "canonical_url"]);

// HTML entity decoding — applied globally to all string values in API responses
const ENTITY_MAP = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#039;": "'", "&apos;": "'" };
function decodeHtmlEntities(str) {
  if (!str || typeof str !== "string") return str;
  // Skip if no entities present (fast path)
  if (!str.includes("&")) return str;
  return str
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&amp;|&lt;|&gt;|&quot;|&#039;|&apos;/g, (m) => ENTITY_MAP[m]);
}

// Keys that contain raw HTML content — should NOT be decoded (they handle entities themselves)
const RAW_HTML_KEYS = new Set(["content_html", "content", "body", "html", "raw_html"]);

// ---------------------------------------------------------------------------
// URL Rewriting — replaces tv9hindi.com origin with SITE_URL
// ---------------------------------------------------------------------------

function rewritePermalink(url) {
  if (!url || typeof url !== "string") return url;
  if (!SITE_URL) return url;
  // Same rewrite as client getHref (UP: one origin swap + collapse doubled basePath)
  return getHref(url);
}

/** Deep-rewrite all permalink/url/link values and decode HTML entities in an object tree */
function rewriteDetailObject(obj) {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(rewriteDetailObject);

  const out = {};
  for (const [key, val] of Object.entries(obj)) {
    if (PERMALINK_KEYS.has(key) && typeof val === "string") {
      out[key] = rewritePermalink(val);
    } else if (RAW_HTML_KEYS.has(key) && typeof val === "string") {
      // Keep raw HTML as-is (entities are part of the HTML structure)
      out[key] = val;
    } else if (val && typeof val === "object") {
      out[key] = rewriteDetailObject(val);
    } else if (typeof val === "string") {
      out[key] = decodeHtmlEntities(val);
    } else {
      out[key] = val;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Data Fetching — fetch and normalize endpoint responses
// ---------------------------------------------------------------------------

/**
 * Fetch JSON from a widget endpoint and normalize the response.
 *
 * Modes:
 *  - "detail"           → returns { raw, items } (full response preserved)
 *  - "listing_with_meta"→ returns { raw, items, meta } (posts + SEO meta)
 *  - "listing" (default)→ returns flat items array
 */
async function fetchJsonData(url, endpointType = "") {
  const type = String(endpointType).toLowerCase();

  try {
    if (!url) {
      return (type === "detail" || type === "listing_with_meta")
        ? { raw: null, items: [] }
        : [];
    }

    const json = await cachedFetch(url, { ttl: 120 });

    // ── Detail Mode ──
    if (type === "detail") {
      let items = [];
      if (Array.isArray(json)) items = json;
      else if (Array.isArray(json?.data)) items = json.data;
      else if (Array.isArray(json?.items)) items = json.items;
      else if (json?.data && typeof json.data === "object") items = [json.data];
      else if (json?.item && typeof json.item === "object") items = [json.item];
      else if (json && typeof json === "object") items = [json];
      return { raw: json, items };
    }

    // ── Listing With Meta Mode ──
    if (type === "listing_with_meta") {
      const rawData = json?.data || json || {};
      const posts = Array.isArray(rawData.posts) ? rawData.posts
        : Array.isArray(rawData) ? rawData
        : Array.isArray(json?.data) ? json.data
        : [];
      return { raw: json, items: posts, meta: rawData.meta || null };
    }

    // ── Normal Listing Mode ──
    if (Array.isArray(json)) return json;
    if (Array.isArray(json?.data?.posts)) return json.data.posts;
    if (Array.isArray(json?.data)) return json.data;
    if (Array.isArray(json?.items)) return json.items;
    if (json?.data && typeof json.data === "object") return [json.data];
    if (json?.item && typeof json.item === "object") return [json.item];
    if (json && typeof json === "object") return [json];
    return [];
  } catch (e) {
    console.error("[fetchJsonData] Error:", e?.message || e);
    return (type === "detail" || type === "listing_with_meta")
      ? { raw: null, items: [] }
      : [];
  }
}

// ---------------------------------------------------------------------------
// Endpoint Resolution — replace placeholders with runtime values
// ---------------------------------------------------------------------------

/**
 * Replace dynamic placeholders in endpoint URLs.
 * Supports: {id}, {category}, {topic}, {topicSlug}, {author}, {nameSlug}
 */
function resolveEndpoint(endpoint, endpointType, queryParams = {}) {
  if (!endpoint) return endpoint;

  // ── Universal placeholder replacements ──
  const topicSlug = queryParams.topicSlug || queryParams.topic || "";
  if (topicSlug && (endpoint.includes("{topic}") || endpoint.includes("{topicSlug}"))) {
    endpoint = endpoint.replace(/\{topic\}|\{topicSlug\}/g, topicSlug);
  }

  const nameSlug = queryParams.nameSlug || queryParams.author || "";
  if (nameSlug && (endpoint.includes("{author}") || endpoint.includes("{nameSlug}"))) {
    endpoint = endpoint.replace(/\{author\}|\{nameSlug\}/g, nameSlug);
  }

  const slug = queryParams.slug || "";
  if (slug && endpoint.includes("{slug}")) {
    endpoint = endpoint.replace(/\{slug\}/g, slug);
  }

  const city = queryParams.city || "";
  if (city && endpoint.includes("{city}")) {
    endpoint = endpoint.replace(/\{city\}/g, city);
  }
  
  const category = queryParams.category || "";
  if (category && endpoint.includes("{category}")) {
    endpoint = endpoint.replace(/\{category\}/g, category);
  }

  // ── Type-specific resolution ──
  if (endpointType === "detail") {
    const id = queryParams.id || "";
    if (!id) return endpoint;
    if (endpoint.includes("{id}")) return endpoint.replace("{id}", id);
    // Fallback: replace last numeric segment
    return endpoint.replace(/(\/)\d+(\.[a-z]+)?(\/?$)/, `$1${id}$2$3`);
  }

  if (endpointType === "listing" || endpointType === "listing_with_meta") {
    if (!category) return endpoint;
    // Fallback: replace segment between /category/ and next /
    return endpoint.replace(/(\/category\/)([^/]+)(\/)/, `$1${category}$3`);
  }

  return endpoint;
}

// ---------------------------------------------------------------------------
// Item Mapping — normalize raw items into a consistent public shape
// ---------------------------------------------------------------------------

function mapItemsForPublic(items = []) {
  if (!Array.isArray(items)) return [];
  return items.map((item) => {
    // Remove duplicate keys — permalink/thumbnail/link are consolidated into url/image
    const { permalink, thumbnail, link, image_url, featured_image, post_title, post_id, ID, featured_media, ...rest } = item || {};
    return {
      ...rest,
      id: item.id || post_id || ID || null,
      title: decodeHtmlEntities(item.title || post_title || ""),
      url: rewritePermalink(item.url || permalink || link || "#"),
      image: item.image || image_url || featured_image || thumbnail || featured_media?.url || "",
      summary: decodeHtmlEntities(item.summary || item.description || item.excerpt || item.short_desc || ""),
      category: decodeHtmlEntities(item.category || item.category_name || ""),
      date: item.date || item.date_info || item.publish_date || item.created_gmt || item.modified_gmt || "",
      videoUrl: item.video_url || item.video_duration ? item.video_url || "" : "",
    };
  });
}

// ---------------------------------------------------------------------------
// Extra Endpoints — fetch supplementary data (video, liveblog, match)
// ---------------------------------------------------------------------------

async function fetchExtraEndpoints(dataConfig, queryParams = {}) {
  const extra = {};
  const videoUrl = dataConfig.video_endpoint || dataConfig.endpoint_videonews || "";
  const liveblogUrl = dataConfig.liveblog_endpoint || dataConfig.endpoint_liveblogitem || "";
  const latestNewsUrl = dataConfig.latest_news_endpoint || dataConfig.endpoint_latestnews || "";
  const photoGalleryUrl = dataConfig.photo_gallery_endpoint || dataConfig.endpoint_photogallery || "";
  let matchApiUrl = dataConfig.match_api_url || "";

  if (matchApiUrl && queryParams.matchId) {
    matchApiUrl = matchApiUrl.replace("{matchId}", queryParams.matchId);
  }

  if (!videoUrl && !liveblogUrl && !matchApiUrl && !latestNewsUrl && !photoGalleryUrl) return extra;

  try {
    const [videoData, liveblogData, matchData, latestNewsData, photoGalleryData] = await Promise.all([
      videoUrl ? fetchJsonData(videoUrl, "listing") : Promise.resolve([]),
      liveblogUrl ? fetchJsonData(liveblogUrl, "listing") : Promise.resolve([]),
      matchApiUrl ? fetchJsonData(matchApiUrl, "detail") : Promise.resolve({ raw: null, items: [] }),
      latestNewsUrl ? fetchJsonData(latestNewsUrl, "listing") : Promise.resolve([]),
      photoGalleryUrl ? fetchJsonData(photoGalleryUrl, "listing") : Promise.resolve([]),
    ]);

    if (videoUrl) extra.videoItems = mapItemsForPublic(Array.isArray(videoData) ? videoData : []);
    if (liveblogUrl) extra.liveblogItems = mapItemsForPublic(Array.isArray(liveblogData) ? liveblogData : []);
    if (matchApiUrl && matchData) extra.matchData = matchData.raw || matchData;
    if (latestNewsUrl) extra.latestNewsItems = mapItemsForPublic(Array.isArray(latestNewsData) ? latestNewsData : []);
    if (photoGalleryUrl) extra.photoGalleryItems = mapItemsForPublic(Array.isArray(photoGalleryData) ? photoGalleryData : []);
  } catch (e) {
    console.error("[fetchExtraEndpoints] Error:", e?.message || e);
  }

  return extra;
}

// ---------------------------------------------------------------------------
// Section Builder — assemble a single widget into a public section object
// ---------------------------------------------------------------------------

function normalizeDataConfig(dataConfig) {
  if (!dataConfig) return {};
  if (typeof dataConfig === "object") return dataConfig;
  try { return JSON.parse(dataConfig); } catch { return {}; }
}

function normalizePosition(position) {
  return String(position || "main").trim().toLowerCase();
}

function isBreakingNewsWidget(slug = "") {
  return slug === "breaking-strip-widget" || slug === "breaking-news-strip";
}

async function buildPublicSection(widget, queryParams = {}, pageDetailData = null) {
  const slug = widget.component_slug || "";
  const dataConfig = normalizeDataConfig(widget.data_config);
  if (isBreakingNewsWidget(slug) && !dataConfig.endpoint) {
    dataConfig.endpoint = HOME_BREAKING_NEWS_TICKER_API;
  }
  const rawEndpoint = dataConfig.endpoint || "";
  const endpointType = String(dataConfig.endpoint_type || "").toLowerCase();
  const endpoint = resolveEndpoint(rawEndpoint, endpointType, queryParams);
  let isClientOnly = widget.client_only === 1 || widget.client_only === "1";

  let items = [];
  let data = null;

  // ── If page-level detail data is available, inject it into content widgets ──
  // This skips the widget's own endpoint fetch (data already fetched once)
  const isDetailWidget = slug === "detail-main-content-widget"
    || slug === "video-detail-main-content-widget"
    || slug === "photo-detail-main-content-widget"
    || slug === "live-blog-detail-main-content-widget"
    || slug === "static-detail-content-widget"
    || slug === "category-listing-common-widget"
    || slug === "category-listing-common-widget-up";

  // Category listing widgets need full response (meta with custom_category_title)
  const isCategoryListingWidget = slug === "category-listing-common-widget"
    || slug === "category-listing-common-widget-up";

  // Breadcrumb widget — inject pageDetailData if it has a breadcrumb array (works on any page type)
  const isBreadcrumbWidget = slug === "breadcrumb-widget";

  if (pageDetailData && isBreadcrumbWidget && (pageDetailData.breadcrumb || pageDetailData.data?.breadcrumb)) {
    data = pageDetailData;
    items = [pageDetailData];
    isClientOnly = false;
  } else if (pageDetailData && isDetailWidget) {
    // If pageDetailData has posts array (category-detail response), use posts as items
    if (Array.isArray(pageDetailData.posts)) {
      items = mapItemsForPublic(pageDetailData.posts);
      data = pageDetailData;
    } else if (Array.isArray(pageDetailData.data?.posts)) {
      items = mapItemsForPublic(pageDetailData.data.posts);
      data = pageDetailData;
    } else if (Array.isArray(pageDetailData.items)) {
      // Direct array listing response
      items = mapItemsForPublic(pageDetailData.items);
      data = pageDetailData;
    } else if (Array.isArray(pageDetailData.data?.items)) {
      items = mapItemsForPublic(pageDetailData.data.items);
      data = pageDetailData;
    } else {
      // Single detail object (article)
      items = [pageDetailData];
      data = pageDetailData;
    }
    // Override clientOnly since data is already provided by page-level API
    isClientOnly = false;
  } else if (endpoint && !isClientOnly) {
    // Force listing_with_meta for category listing widgets to preserve meta (custom_category_title)
    const effectiveEndpointType = isCategoryListingWidget && (!endpointType || endpointType === "listing")
      ? "listing_with_meta"
      : endpointType;

    try {
      const fetchedData = await fetchJsonData(endpoint, effectiveEndpointType);

      if (effectiveEndpointType === "detail") {
        data = rewriteDetailObject(fetchedData?.raw || null);
        items = Array.isArray(fetchedData?.items) ? fetchedData.items.map(rewriteDetailObject) : [];
      } else if (effectiveEndpointType === "listing_with_meta") {
        data = fetchedData?.raw?.data || fetchedData?.raw || null;
        items = Array.isArray(fetchedData?.items) ? mapItemsForPublic(fetchedData.items) : [];
      } else {
        const list = Array.isArray(fetchedData) ? fetchedData : [];
        items = mapItemsForPublic(list);
        if (isBreakingNewsWidget(slug)) {
          data = list[0] || null;
        }
      }
    } catch (e) {
      console.error(`[buildPublicSection] Fetch error for ${slug}:`, e?.message || e);
    }
  }

  return {
    id: widget.id || null,
    type: slug,
    position: normalizePosition(widget.position),
    sortOrder: Number(widget.sort_order || 0),
    title: widget.title_override || widget.title || widget.name || "",
    dataConfig,
    items,
    data,
    // View more link/label from page builder
    view_more_link: widget.view_more_link || null,
    view_more_label: widget.view_more_label || null,
    // Section URL (fallback for view more)
    sectionUrl: widget.view_more_link || dataConfig.view_more_url || "",
    // Rendering hints from widget config
    clientOnly: isClientOnly ? 1 : 0,
    lazy: widget.lazy || 0,
    placeholder: widget.placeholder || null,
    hidden: widget.hidden || 0,
    // Skip extra endpoint fetching for client_only widgets
    ...(isClientOnly ? {} : await fetchExtraEndpoints(dataConfig, queryParams)),
  };
}

// ---------------------------------------------------------------------------
// SEO Meta Extraction — scan widget responses for Yoast meta fields
// ---------------------------------------------------------------------------

/** Extract a Yoast field value (handles both array and string formats) */
function getYoastField(meta, key) {
  const val = meta?.[key];
  if (Array.isArray(val)) return val[0] || "";
  return val || "";
}

/**
 * Scan all sections for a widget response containing SEO meta fields.
 * Checks multiple possible field names for title, description, keywords.
 * Returns extracted meta or null if none found.
 */
function extractSeoMetaFromSections(sections) {
  for (const section of sections) {
    const sData = section.data?.data || section.data || null;
    if (!sData || typeof sData !== "object" || !sData.meta) continue;

    const m = sData.meta;

    // Title: try clean keys first, then yoast keys
    const meta_title = m.meta_title
      || getYoastField(m, "_yoast_wpseo_title")
      || getYoastField(m, "_yoast_wpseo_opengraph-title")
      || getYoastField(m, "custom_category_title")
      || sData.name || "";

    // Description
    const meta_description = m.meta_description
      || getYoastField(m, "_yoast_wpseo_metadesc")
      || getYoastField(m, "_yoast_wpseo_opengraph-description")
      || getYoastField(m, "topic_description")
      || getYoastField(m, "custom_category_descriptions")
      || sData.description || "";

    // Keywords
    const meta_keywords = m.meta_keywords
      || getYoastField(m, "_yoast_wpseo_keywordsynonyms") || "";

    // News keywords
    const news_keywords = m.news_keywords || meta_keywords;

    // Canonical
    const canonical = m.canonical
      || getYoastField(m, "_yoast_wpseo_permalink")
      || sData.link || "";

    // OG
    const og_title = m.og_title
      || getYoastField(m, "_yoast_wpseo_opengraph-title")
      || meta_title || "";

    const og_description = m.og_description
      || getYoastField(m, "_yoast_wpseo_opengraph-description")
      || meta_description || "";

    if (meta_title || meta_description) {
      return { meta_title, meta_description, meta_keywords, news_keywords, canonical, og_title, og_description };
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Main Export — buildHomePageData
// ---------------------------------------------------------------------------

/**
 * Build all data needed to render a page.
 *
 * @param {string} id - Page Builder page ID
 * @param {object} options - { queryParams }
 * @returns {{ meta, sections, _debug }}
 */
export async function buildHomePageData(id, { queryParams = {} } = {}) {
  let pb = null;

  try {
    pb = await fetchPageBuilderPage(id);
  } catch (e) {
    console.error(`[buildHomePageData] Failed to fetch page ${id}:`, e?.message || e);
  }

  // If API explicitly returned ok:false, return empty page data
  if (pb && pb.ok === false) {
    console.warn(`[buildHomePageData] API returned ok:false for page ${id}`);
    return { meta: {}, sections: [], schemas: [], settings: {}, siteSettings: {} };
  }

  // ── Page-level detail API (validation + data source) ──
  // If `detail_api_url` is set, fetch it first for:
  //   1. Validation (404 if no data)
  //   2. Meta/breadcrumb extraction
  //   3. Injecting data into the main content widget (skip widget's own fetch)
  const pageConfig = pb?.page || {};
  const rawDetailApiUrl = pageConfig.detail_api_url && pageConfig.detail_api_url !== "null" ? pageConfig.detail_api_url : "";
  let pageDetailData = null;
  let pageDetailNotFound = false;

  if (rawDetailApiUrl) {
    const detailApiUrl = resolveEndpoint(rawDetailApiUrl, "detail", queryParams);
    //console.log(`[buildHomePageData] detail_api_url resolved: ${detailApiUrl}`);
    try {
      const detailResponse = await fetchJsonData(detailApiUrl, "detail");
      const raw = detailResponse?.raw;
      //console.log(`[buildHomePageData] detail_api response:`, JSON.stringify(raw).substring(0, 300));

      // Check if API returned ok:false
      if (raw?.ok === false) {
        pageDetailNotFound = true;
      } else {
        // Try multiple response formats:
        // Format 1: { ok: true, data: {...} } or { ok: true, data: [...] }
        // Format 2: { data: {...} } or { data: [...] }
        // Format 3: flat object (no data wrapper) — e.g. weather API
        const dataPayload = raw?.data;

        if (dataPayload && Array.isArray(dataPayload)) {
          // Array response
          if (dataPayload.length === 0) {
            pageDetailNotFound = true;
          } else {
            pageDetailData = { items: dataPayload, _raw: raw };
          }
        } else if (dataPayload && typeof dataPayload === "object") {
          // Object response with data wrapper
          const posts = Array.isArray(dataPayload.posts) ? dataPayload.posts : null;
          if (posts && posts.length === 0) {
            pageDetailNotFound = true;
          } else {
            pageDetailData = dataPayload;
          }
        } else if (raw && typeof raw === "object" && !raw.data) {
          // Flat response (no data wrapper) — treat the whole response as the data
          // Check it has some meaningful content (not just errors)
          if (raw.error || raw.message === "not found") {
            pageDetailNotFound = true;
          } else {
            const keys = Object.keys(raw).filter((k) => k !== "ok" && k !== "message" && k !== "error");
            if (keys.length > 0) {
              pageDetailData = raw;
            } else {
              pageDetailNotFound = true;
            }
          }
        } else {
          pageDetailNotFound = true;
        }
      }
    } catch (e) {
      console.error(`[buildHomePageData] detail_api_url fetch error:`, e?.message || e);
      pageDetailNotFound = true;
    }
  }

  // If detail API returned no valid data, trigger 404
  // Return empty sections so getPageProps detects it as empty page
  if (pageDetailNotFound) {
    const globalSettings = await fetchGlobalSettings();
    return { meta: {}, sections: [], schemas: [], settings: {}, siteSettings: globalSettings || pb?.site_settings || {}, pageDetail: null };
  }

  // ── Extract active widgets sorted by position ──
  const widgets = pb?.widgets || pb?.current_version?.widgets || [];
  const activeWidgets = widgets
    .filter((item) => Number(item.is_active) === 1)
    .sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0));

  // ── Fetch navigation menus in parallel ──
  const [navItems, trendingItems, topCitiesItems, bottomNavItems] = await Promise.all([fetchNavMenu(), fetchTrendingMenu(), fetchTopCitiesMenu(), fetchBottomNavMenu()]);

  // ── Build all sections ──
  const sections = [];
  for (const widget of activeWidgets) {
    const publicSection = await buildPublicSection(widget, queryParams, pageDetailData);

    // Inject shared data into specific widget types
    if (publicSection.type === "header" || publicSection.type === "header-up") {
      publicSection.navItems = navItems;
      publicSection.topCitiesItems = topCitiesItems;
    }
    if (publicSection.type === "trending-navigation") publicSection.trendingItems = trendingItems;
    if (publicSection.type === "mobile-footer-sticky-bottomnav-widget") publicSection.bottomNavItems = bottomNavItems;

    // Inject next article ID for infinite scroll widget from current article's prev_article_id
    if (publicSection.type === "infinite-scroll-article-widget" && pageDetailData) {
      const articleData = pageDetailData.data || pageDetailData;
      const nextId = articleData.prev_article_id || articleData.next_article_id || "";
      if (nextId) {
        publicSection.nextArticleId = String(nextId);
      }
    }

    sections.push(publicSection);
  }

  // ── Extract SEO meta from widget responses or pageDetailData ──
  const extractedMeta = extractSeoMetaFromSections(sections);

  // ── Remove extracted meta keys from section data to avoid duplication ──
  const META_KEYS_TO_REMOVE = [
    "meta_title", "meta_description", "meta_keywords", "news_keywords",
    "canonical", "og_title", "og_description",
    "_yoast_wpseo_title", "_yoast_wpseo_metadesc", "_yoast_wpseo_keywordsynonyms",
    "_yoast_wpseo_opengraph-title", "_yoast_wpseo_opengraph-description",
    "_yoast_wpseo_permalink", "custom_category_descriptions",
    "topic_description",
  ];

  if (extractedMeta) {
    for (const section of sections) {
      const sData = section.data?.data || section.data;
      if (sData && typeof sData === "object" && sData.meta && typeof sData.meta === "object") {
        for (const key of META_KEYS_TO_REMOVE) {
          if (key in sData.meta) delete sData.meta[key];
        }
      }
      // Remove posts from data (already in items)
      if (sData && typeof sData === "object" && Array.isArray(sData.posts)) {
        delete sData.posts;
      }
    }
  }

  // ── Resolve page meta ──
  // Priority: widget endpoint meta (for dynamic pages) > page builder i18n (for static pages)
  const i18n = pb?.i18n || {};

  const pageMeta = {
    meta_title: extractedMeta?.meta_title || i18n.meta_title || i18n.title || "",
    meta_description: extractedMeta?.meta_description || i18n.meta_description || i18n.description || "",
    meta_keywords: extractedMeta?.meta_keywords || i18n.meta_keywords || "",
    news_keywords: extractedMeta?.news_keywords || i18n.meta_news_keywords || "",
    canonical: extractedMeta?.canonical || i18n.canonical || i18n.canonical_url || pageDetailData?.canonical || pageDetailData?.link || pageDetailData?.permalink || "",
    og_title: extractedMeta?.og_title || extractedMeta?.meta_title || i18n.meta_title || "",
    og_description: extractedMeta?.og_description || extractedMeta?.meta_description || i18n.meta_description || "",
    og_image: extractedMeta?.og_image || i18n.og_image || pageDetailData?.thumbnail_full || pageDetailData?.thumbnail || "",
    index_status: i18n.index_status || pageDetailData?.meta?.is_noindex || pageDetailData?.is_noindex || "",
    _source: extractedMeta ? "widget_endpoint" : "page_builder_i18n",
  };

  // ── Schemas and settings from page builder ──
  const schemas = pb?.schemas || [];
  const settings = pb?.settings || {};

  // Global settings (from site-global-settings.json) take priority over per-page site_settings
  const globalSettings = await fetchGlobalSettings();
  const siteSettings = globalSettings || pb?.site_settings || {};

  return {
    meta: pageMeta,
    sections,
    schemas,
    settings,
    siteSettings,
    pageDetail: pageDetailData || null,
  };
}