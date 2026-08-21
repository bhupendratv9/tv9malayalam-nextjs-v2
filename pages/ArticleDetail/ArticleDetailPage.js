import MetaHead from "../../components/MetaHead";
import DetailPageLayout from "../../components/pb/DetailPageLayout";
import { getDetailServerSideProps } from "../../lib/detail/getDetailServerSideProps";
import { PAGE_IDS } from "../../lib/pageConfig";

export default function ArticleDetailPage({ meta, sections, schemas, settings, siteSettings, queryParams = {}, pageDebug = null, articleMeta = null }) {
  const am = articleMeta || {};
  const postFormat = (am.type || "post").toLowerCase();

  // Build page meta from article data with fallback to page builder meta
  const pageMeta = {
    meta_title: am.title || meta?.meta_title || "",
    meta_description: am.description || meta?.meta_description || "",
    meta_keywords: am.keywords || meta?.meta_keywords || "",
    news_keywords: am.keywords || meta?.news_keywords || "",
    canonical: am.url || meta?.canonical || "",
    og_title: am.title || meta?.og_title || "",
    og_description: am.description || meta?.og_description || "",
  };

  // OG type based on post format
  const ogType = postFormat === "video" ? "video.other" : "article";

  return (
    <>
      <MetaHead
        meta={pageMeta}
        schemas={schemas}
        settings={{ ...settings, "og:image": am.image || settings?.["og:image"] || "" }}
        siteSettings={siteSettings}
        articleMeta={am}
      />

      <DetailPageLayout sections={sections} queryParams={queryParams} meta={meta} pageDebug={pageDebug} />
    </>
  );
}

export async function getServerSideProps(context) {
  return getDetailServerSideProps(context, {
    pageId: PAGE_IDS.ARTICLE_DETAIL,
    pageIdMap: {
      video: PAGE_IDS.VIDEO_DETAIL,
      photo: PAGE_IDS.PHOTO_DETAIL,
      gallery: PAGE_IDS.PHOTO_DETAIL,
      "photo-gallery": PAGE_IDS.PHOTO_DETAIL,
      "live-blog": PAGE_IDS.LIVE_BLOG_DETAIL,
    },
  });
}
