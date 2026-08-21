/**
 * AMP Analytics Builder
 * Generates <amp-analytics> tags for GA4, GTM, Chartbeat, ComScore
 */
import { isTrackerEnabled, getTrackerValue } from "../../analytics/config";

export function buildAnalyticsTags(siteSettings = {}) {
  const tags = [];

  // GA4 via amp-analytics gtag
  const ga4Enabled = isTrackerEnabled("ga4", siteSettings);
  const ga4Id = getTrackerValue("ga4", "measurementId", siteSettings);
  if (ga4Enabled && ga4Id) {
    tags.push(`<amp-analytics type="gtag" data-credentials="include">
<script type="application/json">
{"vars":{"gtag_id":"${ga4Id}","config":{"${ga4Id}":{"groups":"default"}}}}
</script>
</amp-analytics>`);
  }

  // GTM via amp-analytics
  const gtmEnabled = isTrackerEnabled("gtm", siteSettings);
  const gtmId = getTrackerValue("gtm", "containerId", siteSettings);
  if (gtmEnabled && gtmId) {
    tags.push(`<amp-analytics config="https://www.googletagmanager.com/amp.json?id=${gtmId}&gtm.url=SOURCE_URL" data-credentials="include"></amp-analytics>`);
  }

  // Chartbeat
  const chartbeatEnabled = isTrackerEnabled("chartbeat", siteSettings);
  const chartbeatUid = getTrackerValue("chartbeat", "uid", siteSettings);
  const chartbeatDomain = siteSettings?.chartbeat_domain || "";
  if (chartbeatEnabled && chartbeatUid && chartbeatDomain) {
    tags.push(`<amp-analytics type="chartbeat">
<script type="application/json">
{"vars":{"uid":"${chartbeatUid}","domain":"${chartbeatDomain}"}}
</script>
</amp-analytics>`);
  }

  // ComScore
  const comscoreEnabled = isTrackerEnabled("comscore", siteSettings);
  const comscoreC2 = siteSettings?.comscore_c2 || getTrackerValue("comscore", "c2", siteSettings);
  if (comscoreEnabled && comscoreC2) {
    tags.push(`<amp-analytics type="comscore">
<script type="application/json">
{"vars":{"c2":"${comscoreC2}"}}
</script>
</amp-analytics>`);
  }

  return tags.join("\n");
}

/**
 * Check if any analytics are enabled (to conditionally load amp-analytics script)
 */
export function hasAnalytics(siteSettings = {}) {
  return (
    (isTrackerEnabled("ga4", siteSettings) && !!getTrackerValue("ga4", "measurementId", siteSettings)) ||
    (isTrackerEnabled("gtm", siteSettings) && !!getTrackerValue("gtm", "containerId", siteSettings)) ||
    (isTrackerEnabled("chartbeat", siteSettings) && !!(siteSettings?.chartbeat_domain)) ||
    (isTrackerEnabled("comscore", siteSettings) && !!(siteSettings?.comscore_c2 || getTrackerValue("comscore", "c2", siteSettings)))
  );
}
