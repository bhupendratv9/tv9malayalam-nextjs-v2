/**
 * AMP Custom Ad Widget (GPT / DoubleClick)
 * Renders <amp-ad> based on dataConfig from page builder.
 *
 * dataConfig keys:
 *   - ad_slot_id   : DFP slot path (e.g. "/21874393853/tv9_amp_btf_300x250")
 *   - ad_width     : Ad width (default 300)
 *   - ad_height    : Ad height (default 250)
 *   - ad_multi_size: Multi-size string (e.g. "300x250,250x250")
 *   - ad_device    : "all" | "mobile" | "desktop"
 *   - ad_sticky    : "1" to wrap in amp-sticky-ad
 */
import { isAdsEnabled, isGptEnabled } from "../../../../lib/helper/adsHelper";

export function renderCustomAdAmp(section, queryParams, meta, siteSettings = {}) {
  if (!isAdsEnabled(siteSettings) || !isGptEnabled(siteSettings)) return "";

  const dataConfig = section?.dataConfig || {};
  const adType = dataConfig?.ad_type || "";

  // Only render if ad_type is "amp"
  if (adType !== "amp") return "";

  const slotId = dataConfig?.ad_slot_id || dataConfig?.adSlotId || "";
  if (!slotId) return "";

  const width = dataConfig?.ad_width || dataConfig?.adWidth || "300";
  const height = dataConfig?.ad_height || dataConfig?.adHeight || "250";
  const multiSize = dataConfig?.ad_multi_size || dataConfig?.adMultiSize || "";
  const isSticky = dataConfig?.ad_sticky === "1";
  const device = dataConfig?.ad_device || dataConfig?.adDevice || "all";

  const deviceClass = device === "desktop" ? "onlyWebADS"
    : device === "mobile" ? "onlyMobileADS"
    : "";

  const classNames = ["adsCont", deviceClass].filter(Boolean).join(" ");

  const rawRefresh = dataConfig?.ad_refresh || dataConfig?.adRefresh || "";
  const refreshInterval = Number(rawRefresh) > 0 ? rawRefresh : "";

  const adTag = `<amp-ad width="${width}" height="${height}" type="doubleclick" data-slot="${slotId}"${multiSize ? ` data-multi-size="${multiSize}"` : ""}${refreshInterval ? ` data-enable-refresh="${refreshInterval}"` : ""}></amp-ad>`;

  if (isSticky) {
    return `<amp-sticky-ad layout="nodisplay">${adTag}</amp-sticky-ad>`;
  }

  return `<div class="${classNames}">${adTag}</div>`;
}
