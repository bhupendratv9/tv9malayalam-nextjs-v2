/**
 * NewsMediaOrganization Schema
 * https://schema.org/NewsMediaOrganization
 *
 * Represents the news organization that publishes the content.
 */
export function buildNewsMediaOrganizationSchema(schema, context = {}) {
  const { siteSettings = {} } = context;

  const siteUrl = siteSettings?.site_url || process.env.NEXT_PUBLIC_SITE_URL || "";
  const siteName = siteSettings?.site_name || "";
  const logoUrl = siteSettings?.logo_url || "";

  if (!siteName) return null;

  const sameAs = [
    siteSettings.facebook_url,
    siteSettings.twitter_url,
    siteSettings.youtube_url,
    siteSettings.instagram_url,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: siteName,
    url: siteUrl,
    logo: logoUrl ? {
      "@type": "ImageObject",
      url: logoUrl,
      width: "600",
      height: "60",
    } : undefined,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}
