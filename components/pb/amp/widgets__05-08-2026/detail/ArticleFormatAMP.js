import {
  esc,
  decodeHtml,
  getValue,
  sanitizeAmpHtml,
} from "../../../../../lib/server/amp/ampUtils";

/**
 * Render article format (default) — featured image + content_html
 */
export function renderArticleFormatAmp(article, meta) {
  const title = decodeHtml(String(getValue(article, "title", "")));
  const mainImage = String(getValue(article, ["featured_media", "url"], ""));
  const imageCaption = decodeHtml(String(getValue(article, ["postmeta", "image_caption"], ""))) || title;
  const contentHtml = sanitizeAmpHtml(String(getValue(article, "content_html", "")));

  return `
    ${mainImage ? `
      <div class="featured_image">
        <amp-img
          src="${esc(mainImage)}"
          alt="${esc(title)}"
          width="1280"
          height="720"
          layout="responsive">
        </amp-img>
      </div>
    ` : ""}    
    ${imageCaption ? `<div class="image_caption">${esc(imageCaption)}</div>` : ""}
    <div class="ArticleBodyCont">
      ${contentHtml || ""}
    </div>
  `;
}
