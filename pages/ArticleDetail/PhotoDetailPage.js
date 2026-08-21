import MetaHead from "../../components/MetaHead";
import DetailPageLayout from "../../components/pb/DetailPageLayout";
import { getDetailServerSideProps } from "../../lib/detail/getDetailServerSideProps";
import { PAGE_IDS } from "../../lib/pageConfig";

export default function PhotoDetailPage({ meta, sections, schemas, settings, siteSettings, queryParams = {}, pageDebug = null, articleMeta = null }) {
  const am = articleMeta || {};

  const pageMeta = {
    meta_title: am.title || meta?.meta_title || "",
    meta_description: am.description || meta?.meta_description || "",
    meta_keywords: am.keywords || meta?.meta_keywords || "",
    canonical: am.url || meta?.canonical || "",
    og_title: am.title || meta?.og_title || "",
    og_description: am.description || meta?.og_description || "",
  };

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
  return getDetailServerSideProps(context, { pageId: PAGE_IDS.PHOTO_DETAIL });
}
