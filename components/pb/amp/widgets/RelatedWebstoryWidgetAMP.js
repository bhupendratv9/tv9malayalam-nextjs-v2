/**
 * AMP Related Webstory Widget
 * Portrait-style scrollable webstory cards (matches non-AMP RelatedWebstoryWidget)
 */
import { esc } from "../../../../lib/server/amp/ampUtils";

export function renderRelatedWebstoryAmp(section, queryParams, meta, siteSettings = {}) {
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
      <figure class="rwsw_card">
        <a href="${esc(itemUrl)}" title="${itemTitle}">
          <div class="rwsw_imgwrap">
            ${img ? `<amp-img src="${esc(img)}" width="300" height="380" layout="responsive" alt="${itemTitle}"></amp-img>` : ""}
          </div>
          <div class="rwsw_card_title"><h3>${itemTitle}</h3></div>
        </a>
      </figure>`;
  }).join("");

  return `
    <div class="rwsw_wrapper">
      ${title ? `<div class="rwsw_heading"><h2>${viewMoreUrl ? `<a href="${esc(viewMoreUrl)}">${title}</a>` : title}</h2></div>` : ""}
      <div class="rwsw_scroll">${itemsHtml}</div>
    </div>`;
}
