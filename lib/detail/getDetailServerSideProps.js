import { buildHomePageData } from "../server/homePageBuilder";
import { JWPLAYER_BASE_URL, JWPLAYER_PLAYER_ID } from "../constants";

const JW_PLAYER_ID = process.env.NEXT_PUBLIC_JWPLAYER_PLAYER_ID || JWPLAYER_PLAYER_ID;

function extractArticleData(sections) {
  if (!Array.isArray(sections)) return null;

  // Look for any detail content widget type
  const detailSection = sections.find((s) =>
    s.type === "detail-main-content-widget" ||
    s.type === "video-detail-main-content-widget" ||
    s.type === "photo-detail-main-content-widget" ||
    s.type === "live-blog-detail-main-content-widget" ||
    (s.type && s.type.includes("detail-main-content"))
  );

  if (!detailSection) return null;

  const d = detailSection.data || detailSection.response;
  if (!d) return detailSection.items?.[0] || null;
  if (d.data && typeof d.data === "object" && !Array.isArray(d.data)) return d.data;
  if (Array.isArray(d.data) && d.data.length > 0) return d.data[0];
  if (d.title || d.content_html || d.id) return d;
  return detailSection.items?.[0] || null;
}

function buildArticleMeta(articleData) {
  if (!articleData) return null;

  const ogTitle = articleData.postmeta?.["_yoast_wpseo_opengraph-title"]
    || articleData.postmeta?._yoast_wpseo_opengraph_title
    || articleData.title || "";
  const ogDesc = articleData.postmeta?.["_yoast_wpseo_opengraph-description"]
    || articleData.postmeta?._yoast_wpseo_opengraph_description
    || articleData.excerpt || "";

  const postFormat = (articleData.post_format || "post").toLowerCase();
  const embedType = articleData.postmeta?.embed_type?.toLowerCase() || "";
  const videoEmbedUrl = articleData.postmeta?.video_embed_url || "";

  let videoUrl = "";
  if (postFormat === "video") {
    if (embedType === "jwplayer" && videoEmbedUrl) {
      videoUrl = `${JWPLAYER_BASE_URL}/${videoEmbedUrl}-${JW_PLAYER_ID}.html`;
    } else if (videoEmbedUrl && videoEmbedUrl.startsWith("http")) {
      videoUrl = videoEmbedUrl;
    }
  }

  return {
    title: ogTitle,
    description: ogDesc,
    image: articleData.featured_media?.url || articleData.thumbnail_full || articleData.thumbnail || "",
    url: articleData.canonical || articleData.permalink || "",
    type: postFormat,
    keywords: articleData.meta?.meta_keywords || articleData.postmeta?._yoast_wpseo_keywordsynonyms || "",
    videoUrl,
    videoDuration: articleData.postmeta?.video_duration || "",
    publishedTime: articleData.published_at || articleData.created_gmt || "",
    modifiedTime: articleData.modified_at || articleData.modified_gmt || "",
    // Pass through for NewsArticle schema
    authorName: articleData.author?.display_name || "",
    author: articleData.author || null,
    categories: articleData.categories || [],
    content_html: articleData.content_html || "",
    thumbnail_full: articleData.thumbnail_full || articleData.thumbnail || "",
    articleSection: Array.isArray(articleData.categories)
      ? articleData.categories[0]?.slug || ""
      : articleData.categories?.slug || "",
    liveEntries: articleData.live_entries || [],
    breadcrumb: articleData.breadcrumb || [],
  };
}

export async function getDetailServerSideProps(context, { pageId = "3", pageIdMap = {} } = {}) {
  const { query, params, resolvedUrl } = context;

  const queryParams = {
    ...(query || {}),
    ...(params || {}),
    id: params?.id || query?.id || "",
  };

  if (!queryParams.id) {
    return { notFound: true };
  }

  const isDebug = query?.debug === "1";

  try {
    // First fetch to detect post_format
    let page = await buildHomePageData(pageId, { queryParams });
    let sections = (page?.sections || []).map(({ _debug, ...rest }) =>
      isDebug ? { ...rest, _debug } : rest
    );

    let articleData = extractArticleData(sections);

    // ── 404: No article data found ──
    if (!articleData) {
      return { notFound: true };
    }

    let articleMeta = buildArticleMeta(articleData);
    const postFormat = (articleMeta?.type || "post").toLowerCase();

    // If a format-specific page ID is configured, re-fetch with that ID
    const formatPageId = pageIdMap[postFormat];
    if (formatPageId && formatPageId !== pageId) {
      page = await buildHomePageData(formatPageId, { queryParams });
      sections = (page?.sections || []).map(({ _debug, ...rest }) =>
        isDebug ? { ...rest, _debug } : rest
      );
      // Re-extract article data from new sections (may have different widgets)
      const newArticleData = extractArticleData(sections);
      if (newArticleData) {
        articleData = newArticleData;
        articleMeta = buildArticleMeta(articleData);
      }
    }

    // ── Canonical redirect: if API canonical differs from current URL, redirect ──
    const canonical = articleData.permalink || articleData.url || articleData.canonical_url || "";
    if (canonical) {
      // Extract the path portion from the canonical URL
      let canonicalPath = canonical;
      try {
        const parsed = new URL(canonical);
        canonicalPath = parsed.pathname;
      } catch {
        // If it starts with "/" it's already a relative path; otherwise skip redirect
        if (!canonical.startsWith("/")) canonicalPath = "";
      }

      if (canonicalPath) {
        // Remove basePath prefix from canonicalPath if present (API may return full path with basePath)
        const basePath = "/";
        if (canonicalPath.startsWith(basePath)) {
          canonicalPath = canonicalPath.slice(basePath.length) || "/";
        }

        // Build the current request path from URL segments (category/subcategory/title-id.html)
        const { category, subcategory, subcat2, title, id } = queryParams;
        let currentPath = "";
        if (category && title && id) {
          if (subcat2) {
            currentPath = `/${category}/${subcategory}/${subcat2}/${title}-${id}.html`;
          } else if (subcategory) {
            currentPath = `/${category}/${subcategory}/${title}-${id}.html`;
          } else {
            currentPath = `/${category}/${title}-${id}.html`;
          }
        }

        console.log("[Detail Redirect Check]", { canonical, canonicalPath, currentPath });

        // Compare paths — if they differ, issue a 301 redirect to the correct canonical
        // Next.js automatically prepends basePath to the redirect destination
        if (currentPath && canonicalPath && currentPath !== canonicalPath) {
          return {
            redirect: {
              destination: canonicalPath,
              permanent: true, // 301
            },
          };
        }
      }
    }

    return {
      props: {
        meta: page?.meta || {},
        sections,
        schemas: page?.schemas || [],
        settings: page?.settings || {},
        siteSettings: page?.siteSettings || {},
        queryParams,
        articleMeta,
        ...(isDebug ? { pageDebug: page?._debug || null } : {}),
      },
    };
  } catch (error) {
    console.error("Error fetching article detail page:", error);
    return { notFound: true };
  }
}