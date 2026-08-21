/**
 * AMP Right News Widget
 * Vertical list with thumbnail + title (matches non-AMP RightNewsWidgetUP)
 */
import { esc } from "../../../../lib/server/amp/ampUtils";

export function renderRightNewsAmp(section, queryParams, meta, siteSettings = {}) {
  const items = section?.items || [];
  const title = esc(section?.title || section?.dataConfig?.title || section?.dataConfig?.widget_title || section?.name || "");
  const viewMoreUrl = section?.view_more_link || section?.sectionUrl || "";

  if (!items.length) return "";

  const itemsHtml = items.slice(0, 10).map((item) => {
    const itemTitle = esc(item?.title || item?.headline || item?.name || "");
    const itemUrl = item?.url || item?.permalink || "#";
    const img = item?.image || item?.thumbnail || "";

    if (!itemTitle) return "";

    return `
      <figure class="rhn_item">
        <a href="${esc(itemUrl)}" title="${itemTitle}">
          ${img ? `<div class="rhn_thumb">
            <amp-img src="${esc(img)}" width="120" height="68" layout="responsive" alt="${itemTitle}"></amp-img>
          </div>` : ""}
          <div class="rhn_title"><h3>${itemTitle}</h3></div>
        </a>
      </figure>`;
  }).join("");

  return `
    <div class="rhn_wrapper">
      ${title ? `<div class="common_heading"><h2 class="h2">${viewMoreUrl ? `<a href="${esc(viewMoreUrl)}">${title}</a>` : title}</h2></div>` : ""}
      <div class="rhn_list">${itemsHtml}</div>
    </div>`;
}
