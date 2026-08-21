/**
 * Site Constants
 * ==============
 * Only values NOT available from siteSettings API belong here.
 * 
 * For dynamic values, use siteSettings via useSiteSettings() hook:
 *   import { useSiteSettings } from "@/lib/SiteContext";
 *   const { siteSettings } = useSiteSettings();
 *
 * siteSettings keys available:
 *   - site_name, logo_url, favicon_url, inlanguage
 *   - facebook_url, twitter_url, instagram_url, youtube_url
 *   - play_store_url, app_store_url
 *   - footer_links_json, network_sites_json, nav_menu_json
 *   - footer_text, default_meta_title, default_meta_description
 *   - ga4_id, gtm_id, chartbeat_uid, chartbeat_domain, comscore_c2
 *   - gpt_enabled, taboola_enabled, ads_enabled
 *   - brand_color, header_style, breadcrumb_home_title
 */

// ---------- Static Asset URLs (not in siteSettings) ----------

// Fallback image when no thumbnail/image is available
export const DEFAULT_FALLBACK_IMAGE =
  "https://images.tv9hindi.com/wp-content/themes/tv9bharavarsh/images/watermark-new-small.jpg?ar=16:9";

// Base URL for static images (AQI icons, flags, etc.)
export const IMAGE_BASE = "https://images.tv9hindi.com/images";

// Country/team flag images base URL
export const FLAG_BASE_URL = "https://static.tv9hindi.com/images/large_flags/";

// IPL team flag images base URL
export const IPL_FLAG_BASE_URL = "https://images.tv9hindi.com/images/large_flags/ipl/";

// Default user image
export const DEFAULT_USER_IMAGE = "https://appstatic.tv9tamil.com/images/user-default.jpg";

// TV9 Network Logo
export const TV9_NETWORK_LOGO = "https://appstatic.tv9tamil.com/images/TV9-NETWORK-LOGO.jpg";

// AQI brand image
export const AQI_BRAND_IMAGE = "https://static.tv9hindi.com/images/aqi-brand.png";

// Google Play / App Store badge images
export const GOOGLE_PLAY_BADGE = "https://static.tv9hindi.com/images/googleplay.png";
export const APP_STORE_BADGE = "https://static.tv9hindi.com/images/appstore.png";

// SVG Icons sprite path (based on basePath)
export const ICONS_SVG = "/tv9malayalam-nextjs/images/icons.svg";

// ---------- siteSettings Key References (use with useSiteSettings()) ----------
// These are key names to read from siteSettings object.
// Widgets should do: siteSettings?.logo_url, siteSettings?.site_name, etc.

export const SS_KEYS = {
  SITE_NAME: "site_name",
  LOGO_URL: "logo_url",
  FAVICON_URL: "favicon_url",
  LANGUAGE: "inlanguage",
  FACEBOOK_URL: "facebook_url",
  TWITTER_URL: "twitter_url",
  INSTAGRAM_URL: "instagram_url",
  YOUTUBE_URL: "youtube_url",
  PLAY_STORE_URL: "play_store_url",
  APP_STORE_URL: "app_store_url",
  FOOTER_LINKS: "footer_links_json",
  NETWORK_SITES: "network_sites_json",
  NAV_MENU: "nav_menu_json",
  FOOTER_TEXT: "footer_text",
  BRAND_COLOR: "brand_color",
  BREADCRUMB_HOME: "breadcrumb_home_title",
  ADS_ENABLED: "ads_enabled",
  GPT_ENABLED: "gpt_enabled",
  TABOOLA_ENABLED: "taboola_enabled",
  GA4_ID: "ga4_id",
  GTM_ID: "gtm_id",
  CHARTBEAT_UID: "chartbeat_uid",
  CHARTBEAT_DOMAIN: "chartbeat_domain",
  COMSCORE_C2: "comscore_c2",
  GOOGLE_SSO_CLIENT_ID: "google_sso_client_id",
  JWPLAYER_PLAYER_ID: "jwplayer_player_id",
};

// ---------- API Endpoints (not in siteSettings) ----------
  
// Default AQI base API
export const DEFAULT_AQI_BASE_API = "https://webapi.tv9.com/apis/aqi";

// Short Video detail API endpoint
export const SHORT_VIDEO_API_URL = "https://apipublish1.tv9hindi.com/apis/page-builder/alphamalayalam/pagecategory/short-video-detail";

// User-Agent string for internal proxy requests
export const PROXY_USER_AGENT = "TV9Hindi-NextJS-Proxy/1.0";

// ---------- Third-Party / Auth (not in siteSettings) ----------

// Google SSO client ID (fallback — prefer siteSettings.google_sso_client_id)
export const GOOGLE_SSO_CLIENT_ID = "";

// SSO Login URL
export const SSO_LOGIN_URL = "https://e.tv9news.com/sso_login";

// ---------- JW Player Configuration ----------

// JW Player embed base URL
export const JWPLAYER_BASE_URL = "https://content.jwplatform.com/players";

// JW Player default player ID (fallback — prefer siteSettings.jwplayer_player_id)
export const JWPLAYER_PLAYER_ID = "";

// ---------- Navigation / Menu API Endpoints ----------

const MENU_API_BASE = process.env.MENU_API_BASE_URL;

export const ENDPOINTS = {
  MAIN_NAV_MENU: MENU_API_BASE && process.env.MAIN_NAV_MENU_SLUG
    // ? `${MENU_API_BASE}/menu/${process.env.MAIN_NAV_MENU_SLUG}`
    ? `${MENU_API_BASE}/${process.env.MAIN_NAV_MENU_SLUG}.json`
    : "",
  TRENDING_MENU: MENU_API_BASE && process.env.TRENDING_MENU_SLUG
    // ? `${MENU_API_BASE}/menu/${process.env.TRENDING_MENU_SLUG}`
    ? `${MENU_API_BASE}/${process.env.TRENDING_MENU_SLUG}.json`
    : "",
  TOP_CITIES_MENU: MENU_API_BASE && process.env.TOP_CITIES_MENU_SLUG
    // ? `${MENU_API_BASE}/menu/${process.env.TOP_CITIES_MENU_SLUG}`
    ? `${MENU_API_BASE}/${process.env.TOP_CITIES_MENU_SLUG}.json`
    : "",
   BOTTOM_NAV_MENU: MENU_API_BASE && process.env.BOTTOM_NAV_MENU_SLUG
    ? `${MENU_API_BASE}/${process.env.BOTTOM_NAV_MENU_SLUG}.json`
    : "", 
};

// Default/fallback navigation items (used when siteSettings.nav_menu_json and API are both empty)
export const DEFAULT_NAV_ITEMS = [
  { title: "Home", url: "/" },
  { title: "Politics", url: "/politics" },
  { title: "Crime", url: "/crime" },
  { title: "Cities", url: "/cities" },
  { title: "Short Videos", url: "/videos/short-videos" },
  { title: "Videos", url: "/videos" },
  { title: "Photos", url: "/photo-gallery" },
];

// Default header navigation items with icons (fallback for HeaderUP)
export const HEADER_NAV_ITEMS_UP = [
  { label: "Home", href: "/", icon: "IconHome" },
  { label: "Politics", href: "/politics", icon: "IconPolitics" },
  { label: "Crime", href: "/crime", icon: "IconCrime" },
  { label: "Cities", href: "/cities", icon: "IconCities" },
  { label: "Short Videos", href: "/videos/short-videos", icon: "IconVideo" },
  { label: "Videos", href: "/videos", icon: "IconVideo" },
  { label: "Photos", href: "/photo-gallery", icon: "IconPhoto" },
];

// ---------- Page Builder Defaults ----------

export const PAGE_BUILDER_API_BASE = "https://apipublish1.tv9hindi.com/pagebuilder-apis";
export const PAGE_BUILDER_ENV = "development";
export const PAGE_BUILDER_SITE_NAME = "tv9up";
export const PAGE_BUILDER_SITE_ID = "6";
export const PAGE_BUILDER_CHANNEL_ID = "1";
export const PAGE_BUILDER_LOCALE_ID = "1";
