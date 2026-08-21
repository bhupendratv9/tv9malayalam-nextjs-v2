/**
 * AMP Right News Photo Widget
 * Vertical list with photo thumbnail + icon overlay (matches non-AMP RightNewsPhotoWidgetUP)
 */
import { esc } from "../../../../lib/server/amp/ampUtils";

export function renderRightNewsPhotoAmp(section, queryParams, meta, siteSettings = {}) {
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
      <figure class="rhnp_item">
        <a href="${esc(itemUrl)}" title="${itemTitle}">
          ${img ? `<div class="rhnp_thumb">
            <amp-img src="${esc(img)}" width="320" height="180" layout="responsive" alt="${itemTitle}"></amp-img>
            <span class="rhnp_icon">&#128247;</span>
          </div>` : ""}
          <div class="rhnp_title"><h3>${itemTitle}</h3></div>
        </a>
      </figure>`;
  }).join("");

  return `
    <div class="rhnp_wrapper">
      ${title ? `<div class="common_heading"><h2 class="h2">${viewMoreUrl ? `<a href="${esc(viewMoreUrl)}">${title}</a>` : title}</h2></div>` : ""}
      <div class="rhnp_list">${itemsHtml}</div>
      ${viewMoreUrl ? `<div class="rhnp_viewmore"><a href="${esc(viewMoreUrl)}">More Photos</a></div>` : ""}
    </div>`;
}
