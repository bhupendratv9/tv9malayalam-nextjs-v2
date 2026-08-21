import {
  esc,
  decodeHtml,
  getValue,
} from "../../../../../lib/server/amp/ampUtils";
import { renderArticleFormatAmp } from "./ArticleFormatAMP";

/**
 * Render photo/gallery format — gallery images with captions and social share
 */
export function renderPhotoFormatAmp(article, meta) {
  const galleryImages = article?.gallery_images || [];
  const title = decodeHtml(String(getValue(article, "title", "")));
  const canonical = String(getValue(article, "canonical", "") || meta?.canonical || getValue(article, "permalink", "#"));

  if (!galleryImages.length) {
    // Fallback to article format if no gallery images
    return renderArticleFormatAmp(article, meta);
  }

  const imagesHtml = galleryImages.map((item, index) => {
    const caption = item.caption || item.alt || "";
    const shareText = encodeURIComponent(caption || title);
    const shareUrlEncoded = encodeURIComponent(canonical);

    return `
      <div class="photoCard_Wrapper">
        <div class="imgwrap">
          <amp-img
            src="${esc(item.url)}"
            alt="${esc(caption)}"
            width="1280"
            height="720"
            layout="responsive">
          </amp-img>
        </div>
        <div class="cardInfo_Wrapper">
          <div class="photoDesc">
            <p>${esc(caption)}</p>
          </div>
          <div class="cardAction">
            <div class="photoCount">
              <span>${index + 1}</span> / ${galleryImages.length}
            </div>
            <div class="article_socialShare">
              <a href="https://twitter.com/share?url=${shareUrlEncoded}%3Futm_source%3Dreferral%26utm_medium%3DTW%26utm_campaign%3Dsocial_share&text=${shareText}" class="tw-icon" title="Twitter" target="_blank" rel="nofollow noreferrer">
                <svg><use href="#icTwitter"></use></svg>
              </a>
              <a href="https://www.facebook.com/dialog/share?href=${shareUrlEncoded}%3Futm_source%3Dreferral%26utm_medium%3DFB%26utm_campaign%3Dsocial_share&app_id=966242223397117" class="fb-icon" title="Facebook" target="_blank" rel="nofollow noreferrer">
                <svg><use href="#icFacebook"></use></svg>
              </a>
              <a href="https://api.whatsapp.com/send?text=To know more on %22${shareText}%22, click the link - ${shareUrlEncoded}%3Futm_source%3Dreferral%26utm_medium%3DWA%26utm_campaign%3Dsocial_share" class="wh-icon" title="WhatsApp" target="_blank" rel="nofollow noreferrer">
                <svg><use href="#icWhatsapp-solid"></use></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");

  return `
    <div class="photo_summary">
      ${imagesHtml}
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
      <symbol viewBox="0 0 48 48" id="icTwitter">
        <g clip-path="url(#clip_tw)">
          <path d="M24.0002 47.8C37.1446 47.8 47.8002 37.1444 47.8002 24C47.8002 10.8556 37.1446 0.200012 24.0002 0.200012C10.8558 0.200012 0.200195 10.8556 0.200195 24C0.200195 37.1444 10.8558 47.8 24.0002 47.8Z" fill="#000000"/>
          <path d="M12.6 12.9L21.1 25L12.5 35.1H14.8L22.1 26.5L28.2 35.1H35.5L26.2 21.8L33.7 12.9H31.4L25.1 20.3L19.9 12.9H12.6Z" fill="white"/>
          <path d="M16.0996 14.8H18.8996L31.9996 33.2H29.0996L16.0996 14.8Z" fill="#000000"/>
        </g>
        <defs><clipPath id="clip_tw"><rect width="48" height="48" fill="white"/></clipPath></defs>
      </symbol>
      <symbol viewBox="0 0 20 20" id="icFacebook">
        <g clip-path="url(#clip_fb)">
          <path d="M8.35 19.9C3.6 19.05 0 14.95 0 10C0 4.5 4.5 0 10 0C15.5 0 20 4.5 20 10C20 14.95 16.4 19.05 11.65 19.9L11.1 19.45H8.9L8.35 19.9Z" fill="#3B5998"/>
          <path d="M13.9 12.8L14.35 9.99999H11.7V8.04999C11.7 7.24999 12 6.64999 13.2 6.64999H14.5V4.09999C13.8 3.99999 13 3.89999 12.3 3.89999C10 3.89999 8.40002 5.29999 8.40002 7.79999V9.99999H5.90002V12.8H8.40002V19.85C8.95002 19.95 9.50002 20 10.05 20C10.6 20 11.15 19.95 11.7 19.85V12.8H13.9Z" fill="white"/>
        </g>
        <defs><clipPath id="clip_fb"><rect width="20" height="20" fill="white"/></clipPath></defs>
      </symbol>
      <symbol viewBox="0 0 30 30" id="icWhatsapp-solid">
        <path fill="#25D366" d="M15 0C6.72 0 0 6.72 0 15c0 2.65.7 5.22 2.02 7.5L0 30l7.73-2.02A14.9 14.9 0 0015 30c8.28 0 15-6.72 15-15S23.28 0 15 0z"/>
        <path fill="#fff" d="M22.1 17.6c-.38-.19-2.24-1.1-2.59-1.23-.35-.12-.6-.19-.86.19-.25.38-.98 1.23-1.2 1.48-.22.25-.44.28-.82.1-.38-.2-1.6-.59-3.04-1.88-1.12-1-1.88-2.24-2.1-2.62-.22-.38-.02-.58.17-.77.17-.17.38-.44.57-.66.19-.22.25-.38.38-.63.12-.25.06-.47-.03-.66-.1-.19-.86-2.07-1.17-2.83-.31-.74-.63-.64-.86-.65-.22-.01-.47-.01-.73-.01s-.66.1-.98.47c-.34.38-1.28 1.25-1.28 3.04s1.31 3.53 1.5 3.77c.19.25 2.58 3.94 6.26 5.52.87.38 1.55.6 2.08.77.88.28 1.68.24 2.31.15.7-.1 2.24-.92 2.56-1.8.31-.89.31-1.65.22-1.8-.1-.16-.35-.25-.73-.44z"/>
      </symbol>
    </svg>
  `;
}
