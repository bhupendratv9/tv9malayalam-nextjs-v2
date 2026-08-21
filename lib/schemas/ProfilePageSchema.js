/**
 * ProfilePage Schema
 * https://schema.org/ProfilePage
 *
 * Builds from articleMeta (detail pages only).
 * Identifies the author and their latest article.
 */
export function buildProfilePageSchema(schema, context = {}) {
  const { articleMeta, siteSettings = {} } = context;
  if (!articleMeta) return null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const authorName = articleMeta.authorName || articleMeta.author?.display_name || articleMeta.author?.name || "";
  const authorSlug = articleMeta.author?.slug || articleMeta.author?.name_slug || "";
  const authorUrl = articleMeta.author?.link || articleMeta.author?.url || (authorSlug ? `${siteUrl}/author/${authorSlug}` : "");

  if (!authorName || !authorUrl) return null;

  const headline = articleMeta.title || "";
  const articleUrl = articleMeta.url || "";
  const datePublished = articleMeta.publishedTime || "";

  const result = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@id": authorUrl,
      "@type": "Person",
      name: authorName,
    },
  };

  if (headline && articleUrl) {
    result.hasPart = {
      "@type": "Article",
      headline,
      url: articleUrl,
      ...(datePublished ? { datePublished } : {}),
      author: { "@id": authorUrl },
    };
  }

  return result;
}
