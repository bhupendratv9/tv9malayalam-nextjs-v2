/**
 * VideoObject Schema
 * https://schema.org/VideoObject
 *
 * Builds from articleMeta for video post format.
 * Add schema_type: "VideoObject" in page builder schemas with is_active: 1.
 */
import { JWPLAYER_BASE_URL, JWPLAYER_PLAYER_ID } from "../constants";

export function buildVideoObjectSchema(schema, context = {}) {
  const { articleMeta = {}, siteSettings = {} } = context;

  if (!articleMeta || !articleMeta.title || articleMeta.type !== "video") return null;

  const jwPlayerId = siteSettings?.jwplayer_player_id || process.env.NEXT_PUBLIC_JWPLAYER_PLAYER_ID || JWPLAYER_PLAYER_ID;
  const videoEmbedUrl = articleMeta.videoUrl || "";

  // Build full player URL
  let contentUrl = "";
  let embedUrl = "";
  if (videoEmbedUrl) {
    if (videoEmbedUrl.startsWith("http")) {
      contentUrl = videoEmbedUrl;
      embedUrl = videoEmbedUrl;
    } else {
      // Short JW Player ID — build full URL
      const fullUrl = `${JWPLAYER_BASE_URL}/${videoEmbedUrl}-${jwPlayerId}.html`;
      contentUrl = fullUrl;
      embedUrl = fullUrl;
    }
  }

  const result = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: articleMeta.title || "",
    uploadDate: articleMeta.publishedTime || "",
    description: articleMeta.description || "",
    thumbnailUrl: articleMeta.image || "",
    duration: articleMeta.videoDuration || "",
    publisher: {
      "@type": "Organization",
      name: siteSettings?.site_name || "",
      logo: {
        "@type": "ImageObject",
        url: siteSettings?.logo_url || "",
        width: "600",
        height: "60",
      },
    },
    contentUrl,
    embedUrl,
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: { "@type": "https://schema.org/WatchAction" },
      userInteractionCount: "",
    },
  };

  return result;
}
