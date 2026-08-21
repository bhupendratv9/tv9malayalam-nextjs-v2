/**
 * BreadcrumbList Schema
 * https://schema.org/BreadcrumbList
 *
 * Builds from articleMeta.breadcrumb array (from detail API).
 * Controlled via:
 *   - Page builder schemas array (schema_type: "BreadcrumbList")
 *   - Global schemas (schema_breadcrumb_enabled: "1" in siteSettings)
 */
export function buildBreadcrumbSchema(schema, context = {}) {
  const { articleMeta = {} } = context;
  const breadcrumb = articleMeta?.breadcrumb || [];

  if (!Array.isArray(breadcrumb) || breadcrumb.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumb.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name || "",
      item: item.url || "",
    })),
  };
}
