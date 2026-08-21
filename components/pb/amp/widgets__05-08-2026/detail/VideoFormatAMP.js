import {
  esc,
  decodeHtml,
  getValue,
  sanitizeAmpHtml,
} from "../../../../../lib/server/amp/ampUtils";
import { JWPLAYER_BASE_URL, JWPLAYER_PLAYER_ID } from "../../../../../lib/constants";

const JW_PLAYER_ID = process.env.NEXT_PUBLIC_JWPLAYER_PLAYER_ID || JWPLAYER_PLAYER_ID;

/**
 * Parse ISO 8601 duration (PT06M40S) to readable format (06:40)
 */
function formatDuration(raw) {
  if (!raw) return "";
  const match = String(raw).match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return raw;
  const hours = match[1] ? match[1].padStart(2, "0") : "";
  const minutes = (match[2] || "0").padStart(2, "0");
  const seconds = (match[3] || "0").padStart(2, "0");
  return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
}

/**
 * Render video format — amp-iframe player + content_html
 */
export function renderVideoFormatAmp(article, meta) {
  const title = decodeHtml(String(getValue(article, "title", "")));
  const mainImage = String(getValue(article, ["featured_media", "url"], ""));
  const contentHtml = sanitizeAmpHtml(String(getValue(article, "content_html", "")));
  const embedType = String(getValue(article, ["postmeta", "embed_type"], "")).toLowerCase();
  const videoEmbedUrl = String(getValue(article, ["postmeta", "video_embed_url"], ""));
  const videoDuration = formatDuration(getValue(article, ["postmeta", "video_duration"], ""));

  let videoSrc = "";
  if (embedType === "jwplayer" && videoEmbedUrl) {
    videoSrc = `${JWPLAYER_BASE_URL}/${videoEmbedUrl}-${JW_PLAYER_ID}.html`;
  } else if (videoEmbedUrl && videoEmbedUrl.startsWith("http")) {
    videoSrc = videoEmbedUrl;
  }

  return `
    ${videoSrc ? `
      <div class="featured_video">
        <amp-jwplayer
          data-player-id="${JW_PLAYER_ID}"
          data-media-id="${videoEmbedUrl}"
          layout="responsive"
          width="16"
          height="9"
          autoplay
        >
        </amp-jwplayer>
      </div>
    ` : mainImage ? `
      <div class="articleImg">
        <amp-img
          src="${esc(mainImage)}"
          alt="${esc(title)}"
          width="1280"
          height="720"
          layout="responsive">
        </amp-img>
      </div>
    ` : ""}
    <div class="ArticleBodyCont">
      ${contentHtml || ""}
    </div>
  `;
}
