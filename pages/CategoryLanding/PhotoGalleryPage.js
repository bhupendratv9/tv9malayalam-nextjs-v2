import MetaHead from "../../components/MetaHead";
import DefaultLayout from "../../layout/DefaultLayout";
import LayoutRightSidebar from "../../layout/LayoutRightSidebar";
import RenderWidget from "../../components/pb/RenderWidget";
import { usePageData } from "../../lib/usePageData";
import { getPageProps } from "../../lib/server/getPageProps";
import { PAGE_IDS } from "../../lib/pageConfig";

export default function PhotoGalleryPage({ pageData, queryParams = {} }) {
  const { meta, sections, schemas, settings, siteSettings } = usePageData(pageData);

  const headerSections = sections.filter((s) => s.position === "header");
  const contentSections = sections.filter((s) => s.position !== "header" && s.position !== "footer");
  const footerSections = sections.filter((s) => s.position === "footer");
  const hasRightSidebar = contentSections.some((s) => s.position === "right-sidebar");
  const Layout = hasRightSidebar ? LayoutRightSidebar : DefaultLayout;

  return (
    <>
      <MetaHead meta={meta} schemas={schemas} settings={settings} siteSettings={siteSettings} />

      {headerSections.map((section, index) => (
        <RenderWidget key={`header-${index}`} section={section} queryParams={queryParams} />
      ))}

      <Layout>
        {contentSections.map((section, index) => (
          <RenderWidget key={`content-${section.position}-${index}`} section={section} queryParams={queryParams} />
        ))}
      </Layout>

      {footerSections.map((section, index) => (
        <RenderWidget key={`footer-${index}`} section={section} queryParams={queryParams} />
      ))}
    </>
  );
}

export async function getServerSideProps({ query }) {
  // Dedicated S3 key `photo-gallery-landing.json` is 403 on Malayalam CDN.
  // Category-detail API for slug `photo-gallery` 200s — use the shared listing page
  // (same as /sports, /world) until CMS publishes the landing JSON.
  return getPageProps(PAGE_IDS.CATEGORY_LISTING, {
    query: { ...query, category: query.category || "photo-gallery" },
  });
}
