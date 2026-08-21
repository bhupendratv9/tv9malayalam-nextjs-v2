import {
  esc,
  decodeHtml,
  getValue,
  formatIstDate,
  sanitizeAmpHtml,
} from "../../../../../lib/server/amp/ampUtils";

/**
 * Render live-blog format — featured image + content + live blog entries
 */
export function renderLiveBlogFormatAmp(article, meta) {
  const contentHtml = sanitizeAmpHtml(String(getValue(article, "content_html", "")));
  const mainImage = String(getValue(article, ["featured_media", "url"], ""));
  const title = decodeHtml(String(getValue(article, "title", "")));
  const imageCaption = decodeHtml(String(getValue(article, ["postmeta", "image_caption"], ""))) || title;
  const liveBlogStatus = String(getValue(article, ["postmeta", "_tv9lb_status"], ""));
  const liveEntries = article?.live_entries || [];

  let entriesHtml = "";
  if (liveEntries.length > 0) {
    entriesHtml = liveEntries.map((entry) => {
      const entryTitle = entry.title || "";
      const entryContent = sanitizeAmpHtml(entry.content || "");
      const entryDate = formatIstDate(entry.date || entry.modified || entry.published_at || entry.modified_at || "");

      return `
        <li>
          ${entryDate ? `<div class="lb_timestamp"><span class="blogTime">${esc(entryDate)}</span></div>` : ""}
          <div class="lb_list_wrap">
            ${entryTitle ? `<h3 class="h3">${esc(entryTitle)}</h3>` : ""}
            ${entryContent ? `<div class="aboutBlog_Wrapper">${entryContent}</div>` : ""}
          </div>
        </li>
      `;
    }).join("");
  }

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
    ${contentHtml ? `<div class="ArticleBodyCont">${contentHtml}</div>` : ""}
    <div class="liveblogdetail_wrap">
      <div class="blogHeading">LIVE NEWS &amp; UPDATES</div>
      ${liveBlogStatus === "closed" ? `<div class="liveblogClosed_Message">The liveblog has ended</div>` : ""}
      ${entriesHtml ? `<div class="liveBlog_Listing"><ul>${entriesHtml}</ul></div>` : ""}
    </div>
  `;
}
