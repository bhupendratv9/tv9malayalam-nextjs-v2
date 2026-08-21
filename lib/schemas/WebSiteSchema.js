/**
 * WebSite Schema (with SearchAction for sitelinks searchbox)
 * https://schema.org/WebSite
 */
export function buildWebSiteSchema(schema, context = {}) {
  const { siteSettings = {} } = context;

  const siteUrl = siteSettings?.site_url || process.env.NEXT_PUBLIC_SITE_URL || "";
  const siteName = siteSettings?.site_name || "";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
