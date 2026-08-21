/**
 * AnalyticsBody — GTM noscript + ComScore noscript pixel
 */
import { isTrackerEnabled, getTrackerValue } from "./config";

export default function AnalyticsBody({ siteSettings = {} }) {
  const gtmEnabled = isTrackerEnabled("gtm", siteSettings);
  const gtmId = getTrackerValue("gtm", "containerId", siteSettings);
  const comscoreEnabled = isTrackerEnabled("comscore", siteSettings);
  const comscoreC2 = getTrackerValue("comscore", "c2", siteSettings);

  return (
    <>
      {gtmEnabled && gtmId && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      )}

      {comscoreEnabled && comscoreC2 && (
        <noscript>
          <img
            src={`https://sb.scorecardresearch.com/p?c1=2&c2=${comscoreC2}&cv=2.0&cj=1`}
            alt=""
            width="1"
            height="1"
          />
        </noscript>
      )}
    </>
  );
}
