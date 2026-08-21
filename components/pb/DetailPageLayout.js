import DefaultLayout from "../../layout/DefaultLayout";
import LayoutRightSidebar from "../../layout/LayoutRightSidebar";
import RenderWidget from "../pb/RenderWidget";
import DebugPanel from "../pb/DebugPanel";

export default function DetailPageLayout({ sections, queryParams, meta, pageDebug }) {
  const normalizedSections = Array.isArray(sections) ? sections : [];

  const headerSections = normalizedSections.filter((s) => s.position === "header");
  const contentSections = normalizedSections.filter((s) => s.position !== "header" && s.position !== "footer");
  const footerSections = normalizedSections.filter((s) => s.position === "footer");

  const hasRightSidebar = contentSections.some((s) => s.position === "right-sidebar");
  const Layout = hasRightSidebar ? LayoutRightSidebar : DefaultLayout;
  const showDebug = queryParams?.debug === "1";

  return (
    <>
      {headerSections.map((section, index) => (
        <RenderWidget key={`header-${section.id || index}`} section={section} queryParams={queryParams} />
      ))}

      <Layout>
        {contentSections.map((section, index) => (
          <RenderWidget key={`content-${section.position}-${section.id || index}`} section={section} queryParams={queryParams} />
        ))}
      </Layout>

      {footerSections.map((section, index) => (
        <RenderWidget key={`footer-${section.id || index}`} section={section} queryParams={queryParams} />
      ))}

      {showDebug && (
        <DebugPanel queryParams={queryParams} pageDebug={pageDebug} sections={normalizedSections} meta={meta} />
      )}
    </>
  );
}
