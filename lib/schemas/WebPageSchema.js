/**
 * WebPage Schema
 * https://schema.org/WebPage
 */
export function buildWebPageSchema(schema, context = {}) {
  const { meta = {}, siteSettings = {}, settings = {} } = context;

  const siteUrl = siteSettings.site_url || process.env.NEXT_PUBLIC_SITE_URL || "";
  const inLanguage = siteSettings.inlanguage || siteSettings.site_language || settings.inlanguage || "ta";

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta.meta_title || siteSettings.default_meta_title || "",
    description: meta.meta_description || siteSettings.default_meta_description || "",
    keywords: meta.meta_keywords || meta.news_keywords || siteSettings.default_meta_keyowrds || "",
    url: meta.canonical || siteUrl,
    inLanguage,
    publisher: {
      "@type": "Organization",
      name: siteSettings.site_name || "",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: siteSettings.logo_url || "",
        width: "600",
        height: "60",
      },
    },
  };
}
