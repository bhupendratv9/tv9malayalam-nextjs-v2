/**
 * Ads Helper — Global ad control from siteSettings.
 *
 * siteSettings keys:
 *   - ads_enabled: "1" | "0" (default "1") — master switch for all ads
 *   - taboola_enabled: "1" | "0" (default "1") — Taboola widget control
 *   - gpt_enabled: "1" | "0" (default "1") — Google Publisher Tag ads
 *
 * Usage in components:
 *   import { useAdsEnabled, useTaboolaEnabled } from "@/lib/helper/adsHelper";
 *   const adsEnabled = useAdsEnabled();
 *   if (!adsEnabled) return null;
 *
 * Usage in non-hook context:
 *   import { isAdsEnabled, isTaboolaEnabled } from "@/lib/helper/adsHelper";
 *   if (!isAdsEnabled(siteSettings)) return null;
 */

import { useSiteSettings } from "../SiteContext";

/**
 * Check if current device matches the target device.
 * "desktop" → width > 768 | "mobile" → width <= 768 | "all"/"both" → always true
 */
export function isDeviceMatch(device) {
  if (typeof window === "undefined") return false;
  if (!device || device === "all" || device === "both") return true;
  const isMobile = window.innerWidth <= 768;
  if (device === "mobile") return isMobile;
  if (device === "desktop") return !isMobile;
  return true;
}

/**
 * Check if ads are enabled from siteSettings object.
 */
export function isAdsEnabled(siteSettings = {}) {
  // Env override takes precedence
  if (process.env.NEXT_PUBLIC_ADS_ENABLED === "0") return false;
  return siteSettings?.ads_enabled !== "0";
}

/**
 * Check if Taboola is enabled from siteSettings object.
 */
export function isTaboolaEnabled(siteSettings = {}) {
  if (process.env.NEXT_PUBLIC_ADS_ENABLED === "0") return false;
  if (process.env.NEXT_PUBLIC_TABOOLA_ENABLED === "0") return false;
  if (siteSettings?.ads_enabled === "0") return false;
  return siteSettings?.taboola_enabled !== "0";
}

/**
 * Check if GPT (Google Publisher Tag) ads are enabled.
 */
export function isGptEnabled(siteSettings = {}) {
  if (process.env.NEXT_PUBLIC_ADS_ENABLED === "0") return false;
  if (siteSettings?.ads_enabled === "0") return false;
  return siteSettings?.gpt_enabled !== "0";
}

/**
 * Hook: check if ads are globally enabled.
 */
export function useAdsEnabled() {
  const { siteSettings } = useSiteSettings();
  return isAdsEnabled(siteSettings);
}

/**
 * Hook: check if Taboola is enabled.
 */
export function useTaboolaEnabled() {
  const { siteSettings } = useSiteSettings();
  return isTaboolaEnabled(siteSettings);
}

/**
 * Hook: check if GPT ads are enabled.
 */
export function useGptEnabled() {
  const { siteSettings } = useSiteSettings();
  return isGptEnabled(siteSettings);
}

/**
 * AdSlot — Renders an ad div only if ads are globally enabled.
 * Use this instead of raw <div id="ad_slot_id"> in widgets.
 *
 * Usage:
 *   <AdSlot id="desktop_rhs_sidebar_1" className="adsCont onlyWebADS" />
 *   <AdSlot id="mobile_masterhead_300x250" className="adsCont onlyMobileADS" />
 */
export function AdSlot({ id, className = "adsCont", style }) {
  const adsEnabled = useAdsEnabled();
  if (!adsEnabled || !id) return null;
  return (
    <div className={className} style={style}>
      <div id={id}></div>
    </div>
  );
}
