/**
 * AMP Related News Widget
 * Renders a horizontal scrollable card list matching RelatedPhotosWidget design.
 * Used for: related-photos-widget, related-videos-widget, related-webstory-widget, related-news-widget
 */
import { esc } from "../../../../lib/server/amp/ampUtils";

export function renderRelatedNewsAmp(section, queryParams, meta, siteSettings = {}) {
  const items = section?.items || [];
  const title = esc(section?.title || section?.dataConfig?.title || section?.dataConfig?.widget_title || section?.name || "");
  const viewMoreUrl = section?.view_more_link || section?.sectionUrl || "";

  if (!items.length) return "";

  const itemsHtml = items.slice(0, 5).map((item, idx) => {
    const itemTitle = esc(item?.title || item?.headline || item?.name || "");
    const itemUrl = item?.url || item?.permalink || "#";
    const img = item?.image || item?.thumbnail || "";
    const imageCount = item?.gallery_count || item?.image_count || "";
   
    console.log(section);
    
    if (!itemTitle) return "";

    return `
      <figure class="rnw_card">
        ${img ? `
        <div class="rnw_imgwrap">
          <a href="${esc(itemUrl)}" title="${itemTitle}">
            <amp-img src="${esc(img)}" width="400" height="225" layout="responsive" alt="${itemTitle}"></amp-img>
          </a>
        </div>` : ""}
        <div class="rnw_card_title">
          ${imageCount ? `<div class="rnw_media_info"><span>${imageCount} Images</span></div>` : ""}
          <h3><a href="${esc(itemUrl)}" title="${itemTitle}">${itemTitle}</a></h3>
        </div>
      </figure>`;
  }).join("");

  const headingHtml = title
    ? `<div class="rnw_heading">
        <h2>${viewMoreUrl ? `<a href="${esc(viewMoreUrl)}">${title}</a>` : title}</h2>
      </div>`
    : "";

  return `
    <div class="rnw_wrapper">
      ${headingHtml}
      <div class="rnw_scroll">
        ${itemsHtml}
      </div>
    </div>`;
}

/**
 * CSS for RelatedNewsWidgetAMP — append to ampCss
 */
export const relatedNewsAmpCss = `
.rnw_wrapper{background-color:#1a1a2e;padding:0.9375rem;margin-bottom:1.875rem}
.rnw_heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem}
.rnw_heading h2,.rnw_heading h2 a{color:#fff;font-size:1.5rem;line-height:1;font-weight:800;text-transform:capitalize}
.rnw_heading h2 a::after{content:"";border:solid #fff;border-width:0 2px 2px 0;border-radius:2px;display:inline-block;padding:3px;transform:rotate(-45deg);margin-left:5px;vertical-align:middle}
.rnw_scroll{display:flex;overflow-x:auto;-webkit-overflow-scrolling:touch;gap:0.75rem;padding-bottom:0.5rem}
.rnw_scroll::-webkit-scrollbar{display:none}
.rnw_card{flex:0 0 65%;min-width:200px;background:#2a2a3e;border-radius:4px;overflow:hidden}
@media(min-width:768px){.rnw_card{flex:0 0 24%}}
.rnw_imgwrap amp-img{display:block;width:100%}
.rnw_card_title{padding:0.5rem 0.625rem}
.rnw_card_title h3{margin:0}
.rnw_card_title h3 a{font-size:0.9375rem;line-height:1.4;font-weight:500;color:#fff;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;text-decoration:none}
.rnw_media_info{margin-bottom:0.25rem}
.rnw_media_info span{color:#ffc900;font-size:0.75rem;font-weight:400;text-transform:uppercase}
`;
