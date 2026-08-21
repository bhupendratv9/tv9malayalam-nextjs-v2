/**
 * AMP Related Photos Widget
 * Horizontal scrollable photo cards with dark background (matches non-AMP RelatedPhotosWidget)
 */
import { esc } from "../../../../lib/server/amp/ampUtils";

export function renderRelatedPhotosAmp(section, queryParams, meta, siteSettings = {}) {
  const items = section?.items || [];
  const title = esc(section?.title || section?.dataConfig?.title || section?.dataConfig?.widget_title || section?.name || "");
  const viewMoreUrl = section?.view_more_link || section?.sectionUrl || "";

  if (!items.length) return "";

  const itemsHtml = items.slice(0, 5).map((item) => {
    const itemTitle = esc(item?.title || item?.headline || item?.name || "");
    const itemUrl = item?.url || item?.permalink || "#";
    const img = item?.image || item?.thumbnail || "";
    const imageCount = item?.gallery_count || item?.image_count || "";

    
    if (!itemTitle) return "";

    return `
      <figure class="rpw_card">
        ${img ? `<div class="rpw_imgwrap">
          <a href="${esc(itemUrl)}" title="${itemTitle}">
            <amp-img src="${esc(img)}" width="400" height="225" layout="responsive" alt="${itemTitle}"></amp-img>
          </a>
        </div>` : ""}
        <div class="rpw_card_title">
          ${imageCount ? `<div class="rpw_media_info"><span>${imageCount} Images</span></div>` : ""}
          <h3><a href="${esc(itemUrl)}" title="${itemTitle}">${itemTitle}</a></h3>
        </div>
      </figure>`;
  }).join("");

  return `
    <div class="rpw_wrapper">
      ${title ? `<div class="rpw_heading"><h2>${viewMoreUrl ? `<a href="${esc(viewMoreUrl)}">${title}</a>` : title}</h2></div>` : ""}
      <div class="rpw_scroll">${itemsHtml}</div>
    </div>`;
}
