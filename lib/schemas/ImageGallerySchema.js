/**
 * ImageGallery Schema
 * https://schema.org/ImageGallery
 */
export function buildImageGallerySchema(schema, context = {}) {
  const { articleMeta = {}, siteSettings = {} } = context;

  if (!articleMeta || !articleMeta.title) return null;
  if (articleMeta.type !== "photo" && articleMeta.type !== "gallery" && articleMeta.type !== "photo-gallery") return null;

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    headline: articleMeta.title || "",
    description: articleMeta.description || "",
    image: articleMeta.image ? [articleMeta.image] : [],
    datePublished: articleMeta.publishedTime || "",
    dateModified: articleMeta.modifiedTime || "",
    url: articleMeta.url || "",
    publisher: {
      "@type": "Organization",
      name: siteSettings.site_name || "",
      logo: {
        "@type": "ImageObject",
        url: siteSettings.logo_url || "",
        width: "600",
        height: "60",
      },
    },
  };
}
