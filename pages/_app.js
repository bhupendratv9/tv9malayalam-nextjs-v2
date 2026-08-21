import Script from "next/script";
import { useRouter } from "next/router";
import "../styles/globals.css";

import { Anek_Devanagari } from "next/font/google";

const anekDevanagari = Anek_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Need to remove later */
// import "../styles/homepageTopWidget.css";
// import "../styles/homepage-common-widgets.css";

/** Need to remove later */

import { AnalyticsHead, AnalyticsBody, DataLayer } from "../lib/analytics";
import ComScore from "../lib/analytics/ComScore";
import Chartbeat from "../lib/analytics/Chartbeat";
import { SiteProvider } from "../lib/SiteContext";
import GptScript from "../components/GptScript";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const isAmpPage =
    router.pathname === "/ArticleDetail/ArticleDetailPageAMP";

  const siteSettings = pageProps?.pageData?.siteSettings || pageProps?.siteSettings || {};
  const settings = pageProps?.pageData?.settings || pageProps?.settings || {};

  // DataLayer: determine page type and article data
  const pageDataSections = pageProps?.pageData?.sections || pageProps?.sections || [];
  const detailSection = pageDataSections.find((s) =>
    s.type === "detail-main-content-widget" ||
    s.type === "photo-detail-main-content-widget" ||
    s.type === "video-detail-main-content-widget" ||
    s.type === "live-blog-detail-main-content-widget"
  );
  const articleData = detailSection?.items?.[0] || detailSection?.data?.data || detailSection?.data || null;

  // Resolve page type from route
  let dlPageType = "Home";
  let dlCategory = "";
  let dlTitle = pageProps?.pageData?.meta?.meta_title || "";
  const path = router.pathname;

  if (path.includes("ArticleDetail")) dlPageType = "Detail";
  else if (path.includes("CategoryLanding")) { dlPageType = "Category Page"; dlCategory = router.query?.category || ""; }
  else if (path.includes("Topic")) { dlPageType = "Topic"; dlCategory = router.query?.topicSlug || ""; }
  else if (path.includes("Author")) { dlPageType = "Author"; dlCategory = "Author"; }
  else if (path.includes("Videos") || path.includes("ShortVideo")) { dlPageType = "Videos"; dlCategory = "Videos"; }
  else if (path.includes("WebStory")) { dlPageType = "WebStories"; dlCategory = "WebStories"; }
  else if (path.includes("home") || path === "/") dlPageType = "Home";
  else if (path.includes("Aqi")) { dlPageType = "AQI"; dlCategory = "AQI"; }
  else if (path.includes("Weather")) { dlPageType = "Weather"; dlCategory = "Weather"; }
  else if (path.includes("Sports")) { dlPageType = "Sports"; dlCategory = "Sports"; }

  return (
    <SiteProvider siteSettings={siteSettings} settings={settings}>
      <div className={anekDevanagari.className} role="main">
        {/* DataLayer — Custom Dimensions */}
        {!isAmpPage && (
          <DataLayer
            pageType={dlPageType}
            articleData={dlPageType === "Detail" ? articleData : null}
            category={dlCategory}
            title={dlTitle}
          />
        )}

        {/* GPT script — loaded dynamically only when ads_enabled + gpt_enabled */}
        {!isAmpPage && <GptScript />}

        {/* Analytics — GTM, GA4, DataLayer */}
        {!isAmpPage && <AnalyticsHead siteSettings={siteSettings} />}

        {/* {!isAmpPage && (
          <Script
            src={`${process.env.NEXT_PUBLIC_STATIC_CDN_URL || "https://static.tv9hindi.com"}/wp-content/themes/tv9bharavarsh/js/splide_slider.js?ver=1.1.4`}
            strategy="afterInteractive"
          />
        )} */}

        {/* GTM noscript + ComScore noscript */}
        {!isAmpPage && <AnalyticsBody siteSettings={siteSettings} />}

        {/* ComScore beacon script */}
        {!isAmpPage && <ComScore siteSettings={siteSettings} />}

        {/* Chartbeat */}
        {!isAmpPage && <Chartbeat siteSettings={siteSettings} meta={pageProps?.pageData?.meta || pageProps?.meta || {}} />}

        <Component {...pageProps} key={router.asPath} />
      </div>
    </SiteProvider>
  );
}
