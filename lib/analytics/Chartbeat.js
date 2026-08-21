/**
 * Chartbeat Analytics
 */
import Script from "next/script";
import { isTrackerEnabled, getTrackerValue } from "./config";

export default function Chartbeat({ siteSettings = {}, meta = {} }) {
  const enabled = isTrackerEnabled("chartbeat", siteSettings);
  const uid = getTrackerValue("chartbeat", "uid", siteSettings) || siteSettings?.chartbeat_uid || "";
  const domain = getTrackerValue("chartbeat", "domain", siteSettings) || siteSettings?.chartbeat_domain || "tv9hindi.com";

  if (!enabled || !uid) return null;

  return (
    <>
      <Script id="chartbeat-config" strategy="beforeInteractive">
        {`var _sf_async_config = _sf_async_config || {};
        _sf_async_config.uid = "${uid}";
        _sf_async_config.domain = "${domain}";
        _sf_async_config.flickerControl = false;
        _sf_async_config.useCanonical = true;
        _sf_async_config.useCanonicalDomain = true;
        ${meta?.meta_title ? `_sf_async_config.title = "${meta.meta_title.replace(/"/g, '\\"')}";` : ""}
        ${meta?.canonical ? `_sf_async_config.path = "${meta.canonical}";` : ""}`}
      </Script>
      <Script id="chartbeat-loader" strategy="afterInteractive">
        {`(function() {
          var e = document.createElement('script');
          var n = document.getElementsByTagName('script')[0];
          e.type = 'text/javascript';
          e.async = true;
          e.src = '//static.chartbeat.com/js/chartbeat.js';
          n.parentNode.insertBefore(e, n);
        })();`}
      </Script>
    </>
  );
}
