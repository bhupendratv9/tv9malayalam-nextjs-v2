/**
 * Analytics Configuration
 * -----------------------
 * All tracking IDs and toggle settings.
 * 
 * Priority: siteSettings (from page builder API) > env vars > defaults here.
 *
 * siteSettings keys used:
 *   - ga4_enabled         ("1" / "0")
 *   - ga4_id              (measurement ID)
 *   - gtm_enabled         ("1" / "0")
 *   - gtm_id              (container ID)
 *   - comscore_enabled    ("1" / "0")
 *   - comscore_c2         (account ID)
 *   - chartbeat_enabled   ("1" / "0")
 *   - chartbeat_uid       (account UID)
 *   - chartbeat_domain    (site domain)
 *   - fb_pixel_enabled    ("1" / "0")
 *   - fb_pixel_id         (pixel ID)
 *   - gpt_enabled         ("1" / "0")
 */

const analyticsConfig = {
  // Google Analytics 4
  ga4: {
    measurementId: process.env.NEXT_PUBLIC_GA4_ID || "G-XXXXXXXXXX",
    enabled: process.env.NEXT_PUBLIC_GA4_ENABLED !== "0",
  },

  // Google Tag Manager
  gtm: {
    containerId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX",
    enabled: process.env.NEXT_PUBLIC_GTM_ENABLED !== "0",
  },

  // ComScore
  comscore: {
    c2: process.env.NEXT_PUBLIC_COMSCORE_C2 || "",
    enabled: process.env.NEXT_PUBLIC_COMSCORE_ENABLED !== "0",
  },

  // Chartbeat
  chartbeat: {
    uid: process.env.NEXT_PUBLIC_CHARTBEAT_UID || "",
    domain: process.env.NEXT_PUBLIC_CHARTBEAT_DOMAIN || "",
    enabled: process.env.NEXT_PUBLIC_CHARTBEAT_ENABLED !== "0",
  },

  // Facebook Pixel
  fbPixel: {
    pixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID || "",
    enabled: process.env.NEXT_PUBLIC_FB_PIXEL_ENABLED === "1",
  },

  // Google Publisher Tag (GPT ads)
  gpt: {
    enabled: process.env.NEXT_PUBLIC_GPT_ENABLED !== "0",
  },
};

/**
 * Resolve whether a tracker is enabled.
 * siteSettings from API overrides env/config.
 */
export function isTrackerEnabled(tracker, siteSettings = {}) {
  const siteKey = `${tracker}_enabled`;
  if (siteSettings[siteKey] === "1") return true;
  if (siteSettings[siteKey] === "0") return false;
  // Fall back to config
  return analyticsConfig[tracker]?.enabled ?? false;
}

/**
 * Resolve a tracker value (ID, domain, etc).
 * Checks siteSettings with common key patterns, then falls back to config.
 */
export function getTrackerValue(tracker, key, siteSettings = {}) {
  // Check direct key: e.g. "gtm_id", "ga4_id", "comscore_c2"
  const directKey = `${tracker}_${key}`;
  if (siteSettings[directKey]) return siteSettings[directKey];

  // Check simple key: e.g. "gtm_id" when tracker is "gtm" and key is "containerId"
  const simpleKey = `${tracker}_id`;
  if (key === "containerId" || key === "measurementId" || key === "pixelId" || key === "uid") {
    if (siteSettings[simpleKey]) return siteSettings[simpleKey];
  }

  // Fall back to config
  return analyticsConfig[tracker]?.[key] || "";
}

export default analyticsConfig;
