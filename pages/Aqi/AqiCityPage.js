import MetaHead from "../../components/MetaHead";
import DefaultLayout from "../../layout/DefaultLayout";
import LayoutRightSidebar from "../../layout/LayoutRightSidebar";
import Breadcrumb from "../../components/pb/Breadcrumb";
import RenderWidget from "../../components/pb/RenderWidget";
import { usePageData } from "../../lib/usePageData";
import { getPageProps } from "../../lib/server/getPageProps";
import { PAGE_IDS } from "../../lib/pageConfig";
import { slugToTitle, resolveMetaPlaceholders, SITE_URL } from "../../lib/helper/commonHelper";
import { parseAqiCitySlug } from "../../lib/helper/aqiEvents";

export default function AqiCityPage({ pageData, queryParams = {} }) {
  const { meta, sections, schemas, settings, siteSettings } = usePageData(pageData);

  const isDebug = queryParams?.debug === "1";
  if (isDebug) {
    console.log("[AqiCityPage] meta:", meta);
    console.log("[AqiCityPage] pageDetail:", pageData?.pageDetail);
  }

  const citySlug = queryParams?.city || "";
  const cityName = slugToTitle(citySlug) || pageData?.pageDetail?.city_name || "";
  const homeLabel = siteSettings?.site_name || "TV9 Tamil News";
  const breadcrumbCityName = slugToTitle(parseAqiCitySlug(citySlug));
  const cityBreadcrumbLabel = breadcrumbCityName
    ? `${breadcrumbCityName} Air Quality Index Today`
    : "Air Quality Index Today";

  const metaParams = {
    city: cityName,
    city_slug: citySlug,
    category: queryParams?.category || "aqi",
  };

  // If PB has meta with placeholders → resolve them
  // If PB meta is empty/null → use page-level static fallback
  const resolvedMeta = resolveMetaPlaceholders(meta, metaParams);

  // Only apply fallback if PB didn't provide a meta_title at all
  if (!meta?.meta_title && cityName) {
    resolvedMeta.meta_title = `${cityName} Air Quality Index (AQI) Today - ${cityName} வான்மண்டல தர குறியீடு | ${siteSettings?.site_name || "TV9 Tamil"}`;
  }
  if (!meta?.meta_description && cityName) {
    resolvedMeta.meta_description = `Check ${cityName} Air Quality Index today. Get real-time AQI, PM2.5, PM10 levels and health recommendations for ${cityName}.`;
  }
  if (!resolvedMeta.og_title) {
    resolvedMeta.og_title = resolvedMeta.meta_title;
  }
  if (!resolvedMeta.og_description) {
    resolvedMeta.og_description = resolvedMeta.meta_description;
  }
  if (!resolvedMeta.canonical && citySlug) {
    resolvedMeta.canonical = `${SITE_URL}/aqi/${citySlug}-air-quality-index-today`;
  }

  const headerSections = sections.filter((s) => s.position === "header");
  // Page-level Breadcrumb below is the city trail. Skip CMS breadcrumb-widget
  // (aqi-detail.json has empty data_config; query.category="aqi" would render "Malayalam News / aqi").
  const contentSections = sections.filter(
    (s) =>
      s.position !== "header" &&
      s.position !== "footer" &&
      s.type !== "breadcrumb-widget",
  );
  const footerSections = sections.filter((s) => s.position === "footer");
  const hasRightSidebar = contentSections.some((s) => s.position === "right-sidebar");
  const Layout = hasRightSidebar ? LayoutRightSidebar : DefaultLayout;

  return (
    <>
      <MetaHead meta={resolvedMeta} schemas={schemas} settings={settings} siteSettings={siteSettings} />

      {headerSections.map((section, index) => (
        <RenderWidget key={`header-${index}`} section={section} queryParams={queryParams} />
      ))}
      <div className="AQIWrapperMain">
        <div className="container">
          <Breadcrumb
            items={[
              { label: homeLabel, href: "/" },
              { label: "AQI", href: "/aqi" },
              { label: cityBreadcrumbLabel },
            ]}
          />
        </div>
        <Layout>
          {contentSections.map((section, index) => (
            <RenderWidget key={`content-${section.position}-${index}`} section={section} queryParams={queryParams} />
          ))}
        </Layout>
      </div>
      {footerSections.map((section, index) => (
        <RenderWidget key={`footer-${index}`} section={section} queryParams={queryParams} />
      ))}
    </>
  );
}

export async function getServerSideProps({ query }) {
  const city = query?.city || "";
  if (!city) return { notFound: true };

  return getPageProps(PAGE_IDS.AQI_CITY, {
    query: { ...query, city, category: "aqi" },
  });
}
