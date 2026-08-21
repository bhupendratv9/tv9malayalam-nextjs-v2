import MetaHead from "../../components/MetaHead";
import DefaultLayout from "../../layout/DefaultLayout";
import LayoutRightSidebar from "../../layout/LayoutRightSidebar";
import RenderWidget from "../../components/pb/RenderWidget";
import BreadcrumbWidget from "../../components/pb/widgets/BreadcrumbWidget";
import { usePageData } from "../../lib/usePageData";
import { getPageProps } from "../../lib/server/getPageProps";
import { PAGE_IDS } from "../../lib/pageConfig";

export default function AuthorLandingPage({ pageData, queryParams = {} }) {
  const { meta, sections, schemas, settings, siteSettings } = usePageData(pageData);

  // Fallback meta for this page if not set in page builder
  const pageMeta = {
    ...meta,
    canonical: meta?.canonical || "/author",
    meta_title: meta?.meta_title || "Authors",
    meta_description: meta?.meta_description || "",
  };

  // Fallback breadcrumb if not provided by widget/API
  const pageBreadcrumb = [
    { name: "Home", url: "/" },
    { name: "Authors", url: "/author" },
  ];

  const headerSections = sections.filter((s) => s.position === "header");
  const contentSections = sections.filter((s) => s.position !== "header" && s.position !== "footer");
  const footerSections = sections.filter((s) => s.position === "footer");
  const hasRightSidebar = contentSections.some((s) => s.position === "right-sidebar");
  const Layout = hasRightSidebar ? LayoutRightSidebar : DefaultLayout;

  // Check if breadcrumb widget exists in sections
  const hasBreadcrumbWidget = sections.some((s) => s.type === "breadcrumb-widget");

  return (
    <>
      <MetaHead meta={pageMeta} schemas={schemas} settings={settings} siteSettings={siteSettings} />

      {headerSections.map((section, index) => (
        <RenderWidget key={`header-${index}`} section={section} queryParams={queryParams} />
      ))}

      <Layout>
        {!hasBreadcrumbWidget && (
          <BreadcrumbWidget dataConfig={{
            breadcrumb_1_name: pageBreadcrumb[0].name,
            breadcrumb_1_url: pageBreadcrumb[0].url,
            breadcrumb_2_name: pageBreadcrumb[1].name,
            breadcrumb_2_url: pageBreadcrumb[1].url,
          }} queryParams={queryParams} />
        )}
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
  return getPageProps(PAGE_IDS.AUTHOR_LANDING, { query });
}
