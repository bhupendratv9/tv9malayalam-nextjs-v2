import MetaHead from "../../components/MetaHead";
import DefaultLayout from "../../layout/DefaultLayout";
import LayoutRightSidebar from "../../layout/LayoutRightSidebar";
import Breadcrumb from "../../components/pb/Breadcrumb";
import RenderWidget from "../../components/pb/RenderWidget";
import { usePageData } from "../../lib/usePageData";
import { getPageProps } from "../../lib/server/getPageProps";
import { PAGE_IDS } from "../../lib/pageConfig";
import { slugToTitle, resolveMetaPlaceholders, SITE_URL } from "../../lib/helper/commonHelper";
import { parseWeatherCitySlug } from "../../lib/helper/weatherHelper";

export default function WeatherForecastCityPage({ pageData, queryParams = {} }) {
  const { meta, sections, schemas, settings, siteSettings } = usePageData(pageData);

  const isDebug = queryParams?.debug === "1";
  if (isDebug) {
    console.log("[WeatherForecastCityPage] meta:", meta);
    console.log("[WeatherForecastCityPage] pageDetail:", pageData?.pageDetail);
  }

  const citySlug = queryParams?.city || "";
  const cityName = slugToTitle(citySlug) || pageData?.pageDetail?.city_name || "";

  const metaParams = {
    city: cityName,
    city_slug: citySlug,
  };

  // If PB has meta with placeholders → resolve them
  // If PB meta is empty/null → use page-level static fallback
  const resolvedMeta = resolveMetaPlaceholders(meta, metaParams);

  if (!meta?.meta_title && cityName) {
    resolvedMeta.meta_title = `${cityName} Weather Today - ${cityName} வானிலை அறிக்கை | ${siteSettings?.site_name || "TV9 Tamil"}`;
  }
  if (!meta?.meta_description && cityName) {
    resolvedMeta.meta_description = `Check ${cityName} weather today. Get real-time temperature, humidity, wind speed and weather forecast for ${cityName}.`;
  }
  if (!resolvedMeta.og_title) {
    resolvedMeta.og_title = resolvedMeta.meta_title;
  }
  if (!resolvedMeta.og_description) {
    resolvedMeta.og_description = resolvedMeta.meta_description;
  }
  if (!resolvedMeta.canonical && citySlug) {
    resolvedMeta.canonical = `${SITE_URL}/weather-forecast/${citySlug}-weather-update`;
  }

  const headerSections = sections.filter((s) => s.position === "header");
  const contentSections = sections.filter((s) => s.position !== "header" && s.position !== "footer");
  const footerSections = sections.filter((s) => s.position === "footer");
  const hasRightSidebar = contentSections.some((s) => s.position === "right-sidebar");
  const Layout = hasRightSidebar ? LayoutRightSidebar : DefaultLayout;
  const homeLabel = siteSettings?.site_name || "TV9 Tamil News";
  const breadcrumbCitySlug = parseWeatherCitySlug(queryParams?.city || "");
  const breadcrumbCityName = slugToTitle(breadcrumbCitySlug);
  const cityBreadcrumbLabel = breadcrumbCityName
    ? `${breadcrumbCityName} Weather Forecast Today`
    : "Weather Forecast Today";

  return (
    <>
      <MetaHead meta={resolvedMeta} schemas={schemas} settings={settings} siteSettings={siteSettings} />

      {headerSections.map((section, index) => (
        <RenderWidget key={`header-${index}`} section={section} queryParams={queryParams} />
      ))}

      <div className="WeatherBody_Main">
        <div className="container">
          <Breadcrumb
            items={[
              { label: homeLabel, href: "/" },
              { label: "Weather Forecast", href: "/weather-forecast" },
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

  return getPageProps(PAGE_IDS.WEATHER_FORECAST_CITY, {
    query: { ...query, city },
  });
}
