import { cachedFetch } from "./fileCache";
import {
  PAGE_BUILDER_API_BASE,
  PAGE_BUILDER_ENV,
  PAGE_BUILDER_SITE_NAME,
  PAGE_BUILDER_SITE_ID,
  PAGE_BUILDER_CHANNEL_ID,
  PAGE_BUILDER_LOCALE_ID,
} from "../constants";

/**
 * Page Builder API — supports two modes:
 *
 * 1. "s3" mode (default): Static JSON files from S3/CDN
 *    URL: {API_BASE_URL}/{API_ENV}/{API_SITE_NAME}/{pageKey}.json
 *    Example: https://apipublish1.tv9hindi.com/pagebuilder-apis/development/tv9tamil/home-page.json
 *
 * 2. "api" mode: Dynamic API with query params
 *    URL: {API_BASE_URL}/api/admin/public/pages/{pageKey}?site_id=...
 *    Example: https://apipublish.tv9hindi.com/page-builder/api/admin/public/pages/home-page?site_id=6&channel_id=1&locale_id=1
 *
 * Global settings: fetched from site-global-settings.json (s3) or page builder site_settings.
 * If global settings file exists, it takes priority over per-page site_settings.
 *
 * Set PAGE_BUILDER_MODE=s3 or PAGE_BUILDER_MODE=api in .env
 */

const MODE        = process.env.PAGE_BUILDER_MODE || "s3";

// S3 mode config
const API_BASE    = process.env.API_BASE_URL      || PAGE_BUILDER_API_BASE;
const API_ENV     = process.env.API_ENV           || PAGE_BUILDER_ENV;
const API_SITE    = process.env.API_SITE_NAME     || PAGE_BUILDER_SITE_NAME;

// API mode config
const API_SITE_ID    = process.env.API_SITE_ID     || PAGE_BUILDER_SITE_ID;
const API_CHANNEL_ID = process.env.API_CHANNEL_ID  || PAGE_BUILDER_CHANNEL_ID;
const API_LOCALE_ID  = process.env.API_LOCALE_ID   || PAGE_BUILDER_LOCALE_ID;

// Cached global settings (fetched once, reused across pages)
let _globalSettingsCache = null;
let _globalSettingsFetchedAt = 0;
const GLOBAL_SETTINGS_TTL = 300; // 5 minutes

/**
 * Fetch a page builder page by page key.
 */
export async function fetchPageBuilderPage(id) {
  const pageKey = String(id);
  let url;

  if (MODE === "api") {
    url = `${API_BASE}/api/admin/public/pages/${pageKey}?site_id=${API_SITE_ID}&channel_id=${API_CHANNEL_ID}&locale_id=${API_LOCALE_ID}`;
  } else {
    url = `${API_BASE}/${API_ENV}/${API_SITE}/${pageKey}.json`;
  }

  return await cachedFetch(url, { ttl: 120, key: `pagebuilder_page_${pageKey}` });
}

/**
 * Fetch global site settings from site-global-settings.json.
 * Returns the settings object or null if not available.
 */
export async function fetchGlobalSettings() {
  // In-memory cache check
  const now = Date.now() / 1000;
  if (_globalSettingsCache && (now - _globalSettingsFetchedAt) < GLOBAL_SETTINGS_TTL) {
    return _globalSettingsCache;
  }

  try {
    let url;
    if (MODE === "api") {
      // API mode doesn't have a separate global settings endpoint — return null
      return null;
    } else {
      url = `${API_BASE}/${API_ENV}/${API_SITE}/site-global-settings.json`;
    }

    const data = await cachedFetch(url, { ttl: GLOBAL_SETTINGS_TTL, key: "site_global_settings" });
    _globalSettingsCache = data?.settings || data || null;
    _globalSettingsFetchedAt = now;
    return _globalSettingsCache;
  } catch (e) {
    console.error("[fetchGlobalSettings] Error:", e?.message || e);
    return null;
  }
}
