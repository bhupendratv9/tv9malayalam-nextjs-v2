import { ENDPOINTS, DEFAULT_NAV_ITEMS } from "../constants";
import { cachedFetch } from "./fileCache";

/**
 * Fetches the main navigation menu from API (file-cached).
 * Falls back to DEFAULT_NAV_ITEMS on error or empty response.
 * Skips API call if MENU_API_BASE_URL or MAIN_NAV_MENU_SLUG is not set.
 */
async function fetchNavMenu() {
  if (!ENDPOINTS.MAIN_NAV_MENU) {
    console.warn("[fetchNavMenu] MENU_API_BASE_URL or MAIN_NAV_MENU_SLUG not configured, using fallback");
    return DEFAULT_NAV_ITEMS;
  }

  console.log("[fetchNavMenu] Fetching from:", ENDPOINTS.MAIN_NAV_MENU);

  try {
    const json = await cachedFetch(ENDPOINTS.MAIN_NAV_MENU, { ttl: 300, key: "nav_main_menu" });

    console.log("[fetchNavMenu] Response ok:", json?.ok, "data length:", json?.data?.length);

    if (!json?.ok || !Array.isArray(json.data) || json.data.length === 0) {
      console.warn("[fetchNavMenu] API returned empty or invalid data, using fallback");
      return DEFAULT_NAV_ITEMS;
    }

    return json.data.map((item) => ({
      id: item.id,
      title: item.title || "",
      url: item.url || "#",
      target: item.target || "",
      children: Array.isArray(item.children) ? item.children.map((child) => ({
        id: child.id,
        title: child.title || "",
        url: child.url || "#",
        target: child.target || "",
      })) : [],
    }));
  } catch (error) {
    console.error("[fetchNavMenu] Failed to fetch nav menu:", error?.message || error);
    return DEFAULT_NAV_ITEMS;
  }
}

/**
 * Fetches the trending topics menu from API (file-cached).
 * Falls back to empty array on error.
 * Skips API call if MENU_API_BASE_URL or TRENDING_MENU_SLUG is not set.
 */
async function fetchTrendingMenu() {
  if (!ENDPOINTS.TRENDING_MENU) {
    console.warn("[fetchTrendingMenu] MENU_API_BASE_URL or TRENDING_MENU_SLUG not configured, skipping");
    return [];
  }

  try {
    const json = await cachedFetch(ENDPOINTS.TRENDING_MENU, { ttl: 300, key: "nav_trending_menu" });

    if (!json?.ok || !Array.isArray(json.data) || json.data.length === 0) {
      console.warn("[fetchTrendingMenu] API returned empty or invalid data");
      return [];
    }

    return json.data.map((item) => ({
      id: item.id,
      title: item.title || "",
      url: item.url || "#",
      target: item.target || "",
    }));
  } catch (error) {
    console.error("[fetchTrendingMenu] Failed to fetch trending menu:", error?.message || error);
    return [];
  }
}

/**
 * Fetches the top cities menu from API (file-cached).
 * Falls back to empty array on error.
 * Skips API call if MENU_API_BASE_URL or TOP_CITIES_MENU_SLUG is not set.
 */
async function fetchTopCitiesMenu() {
  if (!ENDPOINTS.TOP_CITIES_MENU) {
    console.warn("[fetchTopCitiesMenu] MENU_API_BASE_URL or TOP_CITIES_MENU_SLUG not configured, skipping");
    return [];
  }

  try {
    const json = await cachedFetch(ENDPOINTS.TOP_CITIES_MENU, { ttl: 300, key: "nav_top_cities_menu" });

    if (!json?.ok || !Array.isArray(json.data) || json.data.length === 0) {
      console.warn("[fetchTopCitiesMenu] API returned empty or invalid data");
      return [];
    }

    return json.data.map((item) => ({
      id: item.id,
      title: item.title || "",
      url: item.url || "#",
      target: item.target || "",
    }));
  } catch (error) {
    console.error("[fetchTopCitiesMenu] Failed to fetch top cities menu:", error?.message || error);
    return [];
  }
}

/**
 * Fetches the bottom navigation menu from API (file-cached).
 * Falls back to empty array on error.
 * Skips API call if MENU_API_BASE_URL or BOTTOM_NAV_MENU_SLUG is not set.
 */
async function fetchBottomNavMenu() {
  if (!ENDPOINTS.BOTTOM_NAV_MENU) {
    console.warn("[fetchBottomNavMenu] MENU_API_BASE_URL or BOTTOM_NAV_MENU_SLUG not configured, skipping");
    return [];
  }

  try {
    const json = await cachedFetch(ENDPOINTS.BOTTOM_NAV_MENU, { ttl: 300, key: "nav_bottom_menu" });

    if (!json?.ok || !Array.isArray(json.data) || json.data.length === 0) {
      console.warn("[fetchBottomNavMenu] API returned empty or invalid data");
      return [];
    }

    return json.data.map((item) => ({
      id: item.id,
      title: item.title || "",
      url: item.url || "#",
      target: item.target || "",
      image_url: item.image_url || "",
      icon_name: item.icon_name || "",
    }));
  } catch (error) {
    console.error("[fetchBottomNavMenu] Failed to fetch bottom nav menu:", error?.message || error);
    return [];
  }
}

export { fetchNavMenu, fetchTrendingMenu, fetchTopCitiesMenu, fetchBottomNavMenu };
