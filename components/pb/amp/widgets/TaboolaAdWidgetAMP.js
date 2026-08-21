/**
 * AMP Taboola Ad Widget
 * Renders <amp-embed type="taboola"> based on dataConfig from page builder.
 *
 * dataConfig keys:
 *   - taboola_publisher   : Publisher name (e.g. "tv9-hindi")
 *   - taboola_mode        : Mode (e.g. "thumbnails-a")
 *   - taboola_placement   : Placement name (e.g. "Below Article Thumbnails AMP")
 *   - taboola_target_type : Target type (e.g. "mix")
 *   - taboola_width       : Width (default "100")
 *   - taboola_height      : Height (default "2600")
 */
import { isAdsEnabled, isTaboolaEnabled } from "../../../../lib/helper/adsHelper";

export function renderTaboolaAdAmp(section, queryParams, meta, siteSettings = {}) {
  // Only block if explicitly disabled
  const hasSiteSettings = Object.keys(siteSettings).length > 0;
  if (hasSiteSettings && (!isAdsEnabled(siteSettings) || !isTaboolaEnabled(siteSettings))) return "";

  const dataConfig = section?.dataConfig || {};
  const adType = dataConfig?.ad_type || "";

  // Only render if ad_type is "amp" (skip non-amp ads)
  if (adType && adType !== "amp") return "";
  const publisher = dataConfig?.taboola_publisher || "tv9-hindi";
  const mode = dataConfig?.taboola_mode || "thumbnails-a";
  const placement = dataConfig?.taboola_placement || "Below Article Thumbnails AMP";
  const targetType = dataConfig?.taboola_target_type || "mix";
  const width = dataConfig?.taboola_width || "100";
  const height = dataConfig?.taboola_height || "2600";

  return `
<div class="trc_related_container">
  <amp-embed
    width="${width}"
    height="${height}"
    type="taboola"
    layout="responsive"
    data-publisher="${publisher}"
    data-mode="${mode}"
    data-placement="${placement}"
    data-target_type="${targetType}"
    data-article="auto"
    data-url="">
  </amp-embed>
</div>`;
}
