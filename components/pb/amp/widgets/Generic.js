/**
 * AMP Generic Widget
 * Fallback renderer for any widget type not explicitly registered.
 * If the section has items, renders them as a simple linked list.
 * Otherwise renders just the title (or nothing).
 */
import { esc } from "../../../../lib/server/amp/ampUtils";

export function renderGenericAmp(section) {
  const title = esc(section?.title_override || section?.title || "");
  const items = section?.items || [];

  // If no items, just show title or nothing
  if (!items.length) {
    return title
      ? `<section class="container" style="padding:16px 12px;"><h2 style="font-size:22px;margin:0 0 12px;">${title}</h2></section>`
      : "";
  }

  // Render items as a simple news list
  const itemsHtml = items.slice(0, 10).map((item) => {
    const itemTitle = esc(item?.title || item?.headline || item?.name || "");
    const itemUrl = item?.url || item?.permalink || "#";
    const img = item?.image || item?.thumbnail || "";

    if (!itemTitle) return "";

    return `
      <figure>
        ${img ? `
        <div class="imgwrap">
          <a href="${esc(itemUrl)}" title="${itemTitle}">
            <amp-img src="${esc(img)}" width="120" height="68" layout="responsive" alt="${itemTitle}"></amp-img>
          </a>
        </div>` : ""}
        <div class="card_title">
          <h3><a href="${esc(itemUrl)}" title="${itemTitle}">${itemTitle}</a></h3>
        </div>
      </figure>`;
  }).join("");

  return `
    <section class="container" style="padding:16px 12px;">
      ${title ? `<div class="common_heading"><h2 class="h2">${title}</h2></div>` : ""}
      <div class="commonStory_Wrapper">
        ${itemsHtml}
      </div>
    </section>`;
}
