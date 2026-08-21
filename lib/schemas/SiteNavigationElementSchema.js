/**
 * SiteNavigationElement Schema
 * https://schema.org/SiteNavigationElement
 *
 * Builds from navigation menu items (fetched via MAIN_NAV_MENU API).
 * The nav items are injected into header sections as `navItems`.
 */
export function buildSiteNavigationElementSchema(schema, context = {}) {
  const { siteSettings = {}, navItems = [], sections = [] } = context;

  const siteUrl = siteSettings?.site_url || process.env.NEXT_PUBLIC_SITE_URL || "";
  const siteName = siteSettings?.site_name || "";

  // Priority: navItems from context > header section navItems > siteSettings nav_menu_json
  let menuItems = navItems;

  if (!menuItems.length && Array.isArray(sections)) {
    const headerSection = sections.find((s) => s.type === "header");
    if (headerSection?.navItems) {
      menuItems = headerSection.navItems;
    }
  }

  if (!menuItems.length && siteSettings.nav_menu_json) {
    try {
      const parsed = typeof siteSettings.nav_menu_json === "string"
        ? JSON.parse(siteSettings.nav_menu_json)
        : siteSettings.nav_menu_json;
      menuItems = parsed?.items || parsed || [];
    } catch { /* ignore */ }
  }

  if (!menuItems.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: siteName,
    url: siteUrl,
    hasPart: menuItems.map((item) => ({
      "@type": "SiteNavigationElement",
      name: item.title || item.label || item.name || "",
      url: item.url
        ? (item.url.startsWith("http") ? item.url : `${siteUrl}${item.url.startsWith("/") ? "" : "/"}${item.url}`)
        : siteUrl,
    })),
  };
}
