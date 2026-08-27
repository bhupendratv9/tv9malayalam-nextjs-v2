import MetaHead from "../components/MetaHead";
import DefaultLayout from "../layout/DefaultLayout";
import LayoutLeftSidebar from "../layout/LayoutRightSidebar";
import RenderWidget from "../components/pb/RenderWidget";
import { usePageData } from "../lib/usePageData";
import { getPageProps } from "../lib/server/getPageProps";
import { PAGE_IDS } from "../lib/pageConfig";

export default function HomePage({ pageData, queryParams = {} }) {
  const { meta, sections, schemas, settings, siteSettings } = usePageData(pageData);

  const headerSections = sections.filter((s) => s.position === "header");
  const mainSections = sections.filter((s) => s.position === "main");
  const rhsSections = sections.filter((s) => s.position === "right-sidebar");
  const footerSections = sections.filter((s) => s.position === "footer");
  const hasLeftSidebar = sections.some((s) => s.position === "left-sidebar");
  const Layout = hasLeftSidebar ? LayoutLeftSidebar : DefaultLayout;

  return (
    <>
      <MetaHead meta={meta} schemas={schemas} settings={settings} siteSettings={siteSettings} />

      <Layout>
        {headerSections.map((section, index) => (
          <RenderWidget key={`header-${index}`} section={section} queryParams={queryParams} />
        ))}
        <div className="container">
          <div className={rhsSections.length > 0 ? "tv9wrapperMain" : ""}>
            <div className={rhsSections.length > 0 ? "main_col" : ""}>
              {mainSections.map((section, index) => (
                <RenderWidget key={`main-${index}`} section={section} queryParams={queryParams} />
              ))}
            </div>
            {rhsSections.length > 0 && (
              <aside className="rhs_col">
                {rhsSections.map((section, index) => (
                  <RenderWidget key={`rhs-${index}`} section={section} queryParams={queryParams} />
                ))}
              </aside>
            )}
          </div>
        </div>
        {footerSections.map((section, index) => (
          <RenderWidget key={`footer-${index}`} section={section} queryParams={queryParams} />
        ))}
      </Layout>
    </>
  );
}

export async function getServerSideProps({ query }) {
  return getPageProps(PAGE_IDS.HOME, { query });
}
