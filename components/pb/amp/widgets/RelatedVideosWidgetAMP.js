/**
 * AMP Related Videos Widget
 * Horizontal scrollable video cards with play icon (matches non-AMP RelatedVideosWidget)
 */
import { esc } from "../../../../lib/server/amp/ampUtils";

export function renderRelatedVideosAmp(section, queryParams, meta, siteSettings = {}) {
  const items = section?.items || [];
  const title = esc(section?.title || section?.dataConfig?.title || section?.dataConfig?.widget_title || section?.name || "");
  const viewMoreUrl = section?.view_more_link || section?.sectionUrl || "";

  if (!items.length) return "";

  const itemsHtml = items.slice(0, 5).map((item) => {
    const itemTitle = esc(item?.title || item?.headline || item?.name || "");
    const itemUrl = item?.url || item?.permalink || "#";
    const img = item?.image || item?.thumbnail || "";

    if (!itemTitle) return "";

    return `
      <figure class="rvw_card">
        <a href="${esc(itemUrl)}" title="${itemTitle}">
          ${img ? `<div class="rvw_imgwrap">
            <amp-img src="${esc(img)}" width="216" height="134" layout="responsive" alt="${itemTitle}"></amp-img>
            <span class="rvw_play_icon">&#9654;</span>
          </div>` : ""}
          <div class="rvw_card_title"><h3>${itemTitle}</h3></div>
        </a>
      </figure>`;
  }).join("");

  return `
    <div class="rvw_wrapper">
      ${title ? `<div class="rvw_heading"><h2>${viewMoreUrl ? `<a href="${esc(viewMoreUrl)}">${title}</a>` : title}</h2></div>` : ""}
      <div class="rvw_scroll">${itemsHtml}</div>
    </div>`;
}
