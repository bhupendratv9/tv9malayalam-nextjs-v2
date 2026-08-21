import { buildHomePageData } from "../../lib/server/homePageBuilder";
import { PAGE_IDS } from "../../lib/pageConfig";
import { buildAmpHtml } from "../../lib/server/amp/ampPageBuilder";

export default function ArticleDetailPageAMP() {
  return null;
}

// Map post_format → page ID for AMP
const AMP_PAGE_ID_MAP = {
  video: PAGE_IDS.VIDEO_DETAIL_AMP,
  photo: PAGE_IDS.PHOTO_DETAIL_AMP,
  gallery: PAGE_IDS.PHOTO_DETAIL_AMP,
  "photo-gallery": PAGE_IDS.PHOTO_DETAIL_AMP,
  "live-blog": PAGE_IDS.LIVE_BLOG_DETAIL_AMP,
};

function extractArticleFromSections(sections) {
  const detailSection = sections?.find((s) => s.type === "detail-main-content-widget");
  if (!detailSection) return null;

  // Try multiple paths to find the article
  if (detailSection.items?.length > 0) return detailSection.items[0];
  if (detailSection.data?.data && typeof detailSection.data.data === "object" && !Array.isArray(detailSection.data.data)) return detailSection.data.data;
  if (detailSection.data && typeof detailSection.data === "object" && !Array.isArray(detailSection.data) && detailSection.data.title) return detailSection.data;
  return null;
}

export async function getServerSideProps(context) {
  const { query, params, res } = context;

  const queryParams = {
    ...(query || {}),
    ...(params || {}),
    id: params?.id || query?.id || "",
    title: params?.title || query?.title || "",
    category: params?.category || query?.category || "",
    subcategory: params?.subcategory || query?.subcategory || "",
  };

  if (!queryParams.id) {
    return { notFound: true };
  }

  try {
    // Step 1: Fetch with default detail page to get article + detect format
    let page = await buildHomePageData(PAGE_IDS.ARTICLE_DETAIL_AMP, { queryParams });

    if (!page?.sections?.length) {
      return { notFound: true };
    }

    // Step 2: Detect post format
    const article = extractArticleFromSections(page.sections);
    if (!article) {
      return { notFound: true };
    }

    const postFormat = String(article?.post_format || "post").toLowerCase();

    // Step 3: Re-fetch with format-specific page if different from default
    const formatPageId = AMP_PAGE_ID_MAP[postFormat];
    if (formatPageId && formatPageId !== PAGE_IDS.ARTICLE_DETAIL_AMP) {
      try {
        const formatPage = await buildHomePageData(formatPageId, { queryParams });
        if (formatPage?.sections?.length > 0) {
          page = formatPage;
        }
      } catch (e) {
        // Keep default page — format-specific page might not exist
        console.warn(`[AMP] Format page "${formatPageId}" failed, using default:`, e?.message);
      }
    }

    // Step 4: Build AMP HTML
    const ampHtml = buildAmpHtml({
      meta: page?.meta || {},
      schemas: page?.schemas || [],
      settings: page?.settings || {},
      siteSettings: page?.siteSettings || {},
      sections: page?.sections || [],
      queryParams,
    });

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    res.write(ampHtml);
    res.end();

    return { props: {} };
  } catch (error) {
    console.error("[ArticleDetailPageAMP] Error:", error?.message || error);
    return { notFound: true };
  }
}
