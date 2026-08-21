import { createContext, useContext } from "react";

/**
 * SiteContext — global site settings + page settings accessible anywhere.
 *
 * Provides:
 *   - siteSettings (from page builder API: logo, favicon, social URLs, etc.)
 *   - settings (page-level: og:image, fb:app_id, etc.)
 *
 * Usage in any component/widget:
 *   import { useSiteSettings } from "../../lib/SiteContext";
 *   const { siteSettings, settings } = useSiteSettings();
 *   const logo = siteSettings.logo_url;
 */

const SiteContext = createContext({
  siteSettings: {},
  settings: {},
});

export function SiteProvider({ siteSettings = {}, settings = {}, children }) {
  return (
    <SiteContext.Provider value={{ siteSettings, settings }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteContext);
}

export default SiteContext;
