/**
 * Organization Schema
 * https://schema.org/Organization
 */
export function buildOrganizationSchema(schema, context = {}) {
  const { siteSettings = {} } = context;

  const siteUrl = siteSettings.site_url || process.env.NEXT_PUBLIC_SITE_URL || "";

  const sameAs = [
    siteSettings.facebook_url,
    siteSettings.twitter_url,
    siteSettings.youtube_url,
    siteSettings.instagram_url,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteSettings.site_name || "",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: siteSettings.logo_url || "",
      width: "600",
      height: "60",
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}
