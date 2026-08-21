/**
 * usePageData — Client-safe helper to extract page data with defaults.
 *
 * Usage in page component:
 *   import { usePageData } from "../lib/usePageData";
 *   const { meta, sections, schemas, settings, siteSettings } = usePageData(pageData);
 */

export function usePageData(pageData = {}) {
  return {
    meta: pageData?.meta || {},
    sections: pageData?.sections || [],
    schemas: pageData?.schemas || [],
    settings: pageData?.settings || {},
    siteSettings: pageData?.siteSettings || {},
  };
}
