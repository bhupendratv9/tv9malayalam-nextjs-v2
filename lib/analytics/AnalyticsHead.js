/**
 * AnalyticsHead — GTM head snippet, GA4 gtag, DataLayer init
 */
import Script from "next/script";
import { isTrackerEnabled, getTrackerValue } from "./config";

export default function AnalyticsHead({ siteSettings = {} }) {
  const gtmEnabled = isTrackerEnabled("gtm", siteSettings);
  const ga4Enabled = isTrackerEnabled("ga4", siteSettings);
  const gtmId = getTrackerValue("gtm", "containerId", siteSettings);
  const ga4Id = getTrackerValue("ga4", "measurementId", siteSettings);

  return (
    <>
      {/* DataLayer Init */}
      {/* <Script id="dataLayer-init" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];`}
      </Script> */}

      {/* Google Tag Manager */}
      {gtmEnabled && gtmId && (
        <Script id="gtm-head" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      )}

      {/* GA4 standalone (only if GTM is disabled) */}
      {ga4Enabled && !gtmEnabled && ga4Id && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ga4Id}');`}
          </Script>
        </>
      )}
    </>
  );
}
