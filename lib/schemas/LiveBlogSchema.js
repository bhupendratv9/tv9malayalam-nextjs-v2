/**
 * LiveBlogPosting Schema
 * https://schema.org/LiveBlogPosting
 *
 * Builds from articleMeta + live_entries from article data.
 * Includes liveBlogUpdate array from live_entries.
 */
export function buildLiveBlogSchema(schema, context = {}) {
  const { articleMeta = {}, siteSettings = {} } = context;

  if (!articleMeta || !articleMeta.title || articleMeta.type !== "live-blog") return null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const siteName = siteSettings?.site_name || "";
  const logoUrl = siteSettings?.logo_url || "";
  const authorName = articleMeta.authorName || siteName || "";
  const authorUrl = articleMeta.author?.link || articleMeta.author?.url || "";
  const articleUrl = articleMeta.url || "";
  const headline = articleMeta.title || "";
  const description = articleMeta.description || "";
  const image = articleMeta.image || "";
  const datePublished = articleMeta.publishedTime || "";
  const dateModified = articleMeta.modifiedTime || "";

  // Coverage: start = published, end = +1 day or modified (whichever is later)
  const coverageStartTime = datePublished;
  let coverageEndTime = dateModified;
  if (datePublished && !coverageEndTime) {
    try {
      const start = new Date(datePublished);
      start.setDate(start.getDate() + 1);
      coverageEndTime = start.toISOString().replace("Z", "+05:30");
    } catch { coverageEndTime = ""; }
  }

  const result = {
    "@context": "https://schema.org",
    "@type": "LiveBlogPosting",
    url: articleUrl,
    datePublished,
    dateModified,
    coverageStartTime,
    coverageEndTime,
    headline,
    description,
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
        width: "600",
        height: "60",
      },
    },
    author: {
      "@type": "Person",
      name: authorName,
      ...(authorUrl ? { url: authorUrl } : {}),
    },
    about: {
      "@type": "Event",
      name: headline,
      description,
      ...(image ? { image } : {}),
      startDate: coverageStartTime,
      endDate: coverageEndTime,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "http://schema.org/EventMovedOnline",
      location: { address: "India", name: "India" },
    },
    ...(image ? {
      image: {
        "@type": "ImageObject",
        url: image,
        width: "1280",
        height: "720",
      },
    } : {}),
  };

  // Build liveBlogUpdate from live_entries
  const liveEntries = articleMeta.liveEntries || [];
  if (Array.isArray(liveEntries) && liveEntries.length > 0) {
    result.liveBlogUpdate = liveEntries.map((entry, idx) => {
      const entryTitle = entry.title || "";
      const entryContent = (entry.content || "").replace(/<[^>]+>/g, "").trim();
      const entryDate = entry.date || entry.modified || "";

      return {
        "@type": "BlogPosting",
        headline: entryTitle,
        url: `${articleUrl}#post${idx + 1}`,
        datePublished: entryDate,
        dateModified: entry.modified || entryDate,
        mainEntityOfPage: articleUrl,
        author: {
          "@type": "Person",
          name: authorName,
          ...(authorUrl ? { url: authorUrl } : {}),
        },
        articleBody: entryContent,
        publisher: {
          "@type": "Organization",
          name: siteName,
          logo: {
            "@type": "ImageObject",
            url: logoUrl,
            width: "600",
            height: "60",
          },
        },
        ...(image ? {
          image: {
            "@type": "ImageObject",
            width: "1280",
            height: "720",
            url: image,
          },
        } : {}),
      };
    });
  }

  return result;
}
