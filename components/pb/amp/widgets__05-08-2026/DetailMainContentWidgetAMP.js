import {
  esc,
  getValue,
  normalizeArticleInput,
  formatIstDate,
  buildTags,
} from "../../../../lib/server/amp/ampUtils";
import { isAdsEnabled, isTaboolaEnabled, isGptEnabled } from "../../../../lib/helper/adsHelper";
import { renderArticleFormatAmp } from "./detail/ArticleFormatAMP";
import { renderVideoFormatAmp } from "./detail/VideoFormatAMP";
import { renderPhotoFormatAmp } from "./detail/PhotoFormatAMP";
import { renderLiveBlogFormatAmp } from "./detail/LiveBlogFormatAMP";

/**
 * Build breadcrumb HTML from article taxonomies
 */
function buildBreadcrumbAmp(article, siteUrl) {
  const categories = getValue(article, ["taxonomies", "category"], []);
  let breadcrumbItems = `<span><a href="${esc(siteUrl)}">होम</a></span>`;

  if (Array.isArray(categories) && categories.length > 0) {
    categories.forEach((cat) => {
      if (cat && cat.name && cat.slug) {
        breadcrumbItems += `<span><a title="${esc(cat.name)}" href="${esc(siteUrl)}/${esc(cat.slug)}">${esc(cat.name)}</a></span>`;
      }
    });
  }

  return `<div id="breadcrumbs" class="breadcrumb">${breadcrumbItems}</div>`;
}

export function renderDetailMainContentAmp(section, queryParams, meta, siteSettings = {}) {
  const config = section?.config || {};
  const dataConfig = section?.dataConfig || {};

  const article = normalizeArticleInput({
    items: section?.items || [],
    data: section?.data || [],
    item: section?.item || null,
    response: section?.response || null,
  });

  if (!article || typeof article !== "object") {
    return `<div class="pb-empty">Article not found.</div>`;
  }

  const title = String(getValue(article, "title", ""));
  const excerpt = String(getValue(article, "excerpt", ""));
  const permalink = String(
    getValue(article, "permalink", meta?.canonical || "#")
  );
  const modifiedGmt = String(getValue(article, "modified_gmt", "") || getValue(article, "modified_at", ""));
  const createdGmt = String(getValue(article, "created_gmt", "") || getValue(article, "published_at", ""));
  const postFormat = String(getValue(article, "post_format", "post")).toLowerCase();

  // Author (dynamic from article data)
  const authorObj = getValue(article, "author", {});
  const authorId = getValue(article, ["author", "id"], "");
  const authorName = String(authorObj?.display_name || "TV9 UP");
  const authorUrl = String(authorObj?.link || (authorId ? `/author/${authorId}` : "/author/tv9-com"));
  const authorImage = String(authorObj?.image || "https://images.tv9hindi.com/wp-content/themes/tv9bharavarsh/images/TV9-HINDI-100X100.svg?w=100&h=100&mode=crop&crop=top");

  // Follow Us URLs (dynamic from config/dataConfig)
  const liveTvUrl = String(
    config?.live_tv_url || dataConfig?.live_tv_url || "https://www.tv9up.com/live-tv"
  );
  const youtubeUrl = String(
    config?.youtube_url || dataConfig?.youtube_url || "https://www.youtube.com/@TV9UPUK?sub_confirmation=1"
  );
  const facebookUrl = String(
    config?.facebook_url || dataConfig?.facebook_url || "https://www.facebook.com/Tv9UttarPradesh/"
  );
  const twitterUrl = String(
    config?.twitter_url || dataConfig?.twitter_url || "https://x.com/tv9uttarpradesh?lang=en"
  );

  const siteUrl = String(process.env.NEXT_PUBLIC_SITE_URL || "https://www.tv9up.com");

  const updatedText = formatIstDate(modifiedGmt || createdGmt);
  const tags = buildTags(article);

  // Live blog blinker
  const liveBlogStatus = String(getValue(article, ["postmeta", "_tv9lb_status"], ""));
  const isLiveBlog = postFormat === "live-blog";

  // Select format-specific content
  let formatContent = "";
  if (postFormat === "video") {
    formatContent = renderVideoFormatAmp(article, meta);
  } else if (postFormat === "photo" || postFormat === "gallery" || postFormat === "photo-gallery") {
    formatContent = renderPhotoFormatAmp(article, meta);
  } else if (isLiveBlog) {
    formatContent = renderLiveBlogFormatAmp(article, meta);
  } else {
    formatContent = renderArticleFormatAmp(article, meta);
  }

  // Dynamic breadcrumb
  const breadcrumbHtml = buildBreadcrumbAmp(article, siteUrl);

  return `
  ${breadcrumbHtml}
  <div class="articleBody">
      ${isLiveBlog && liveBlogStatus !== "closed" ? `
        <div class="live_blog_tag">
          <span class="blinker"></span>
          <span>live now</span>
        </div>
      ` : ""}

      <h1 class="articleHD">${esc(title)}</h1>
      ${excerpt ? `<div class="excerpt"><h2>${esc(excerpt)}</h2></div>` : ""}

      <section class="article_author">
        <div class="AuthorInfo">
          <figure>
            <div class="coauthors_list">
              <div class="authorThumb">
                <a href="${esc(authorUrl)}" title="Posts by ${esc(authorName)}" rel="author">
                  <amp-img src="${esc(authorImage)}" width="45" height="45" layout="fixed" title="${esc(authorName)}" alt="${esc(authorName)}"></amp-img>
                </a>
              </div>
            </div>
            <figcaption>
              <a href="${esc(authorUrl)}" title="Posts by ${esc(authorName)}" rel="author">${esc(authorName)}</a>
              ${updatedText ? `<span> Updated on:<span> ${esc(updatedText)}</span></span>` : ""}
            </figcaption>
          </figure>
        </div>
        <div class="flexAlignCenter">
          <amp-social-share type="system" aria-label="Share" width="90" height="36"></amp-social-share>
        </div>
      </section>

      ${formatContent}

      <div class="flexWrap">
        <div class="followUs">
          <span>Follow Us</span>
          <div class="socialLinks">
            <a href="${esc(youtubeUrl)}" target="_blank" title="Youtube">
              <svg><use href="#icon_youtube"></use></svg>
            </a>
            <a href="${esc(facebookUrl)}" target="_blank" title="Facebook">
              <svg><use href="#fb-follow"></use></svg>
            </a>
            <a href="${esc(twitterUrl)}" target="_blank" title="Twitter">
              <svg class="whatsapp"><use href="#icTwitter"></use></svg>
            </a>
          </div>
        </div>
        <div class="liveTVBadge">
          <a href="${esc(liveTvUrl)}"><i class="blinker"></i><span>LIVE</span><span>TV</span></a>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
        <symbol viewBox="0 0 48 48" id="icon_youtube">
          <path fill="#fff" d="M7.02,40.23c9.77,10.22,26.14,9.59,35.1-1.26,3.26-3.95,5.37-8.92,5.37-14.18v-1.57c0-4.96-1.9-9.67-4.85-13.53C35.26.05,21.72-2.39,11.45,4.14c-2.19,1.39-3.91,2.93-5.59,4.95-7.14,8.58-7.15,21.17-.04,29.78.39.47.79.93,1.2,1.36Z" />
          <path fill="#ed1f24" d="M7.02,40.23c-.41-.43-.81-.89-1.2-1.36-7.11-8.6-7.1-21.19.04-29.78,1.67-2.01,3.39-3.55,5.59-4.95C21.72-2.39,35.26.05,42.65,9.69c2.96,3.85,4.85,8.57,4.85,13.53v1.57c0,5.26-2.11,10.23-5.37,14.18-8.97,10.85-25.34,11.48-35.1,1.26ZM28.47,34.25l3.33-.14.87-.04c2.3-.1,4.81-.57,5.4-3.12.51-2.24.65-5.91.52-8.2l-.27-4.52c-.05-.77-.31-1.52-.65-2.19-.88-1.77-3.17-2.04-4.92-2.12l-.87-.04-3.83-.15c-2.74-.11-5.42-.11-8.16,0l-4.39.18c-1.09.05-2.15.11-3.18.47-2.61.91-2.67,3.65-2.79,5.98-.17,3.33-.34,7.53.45,10.74.62,2.54,3.4,2.87,5.61,2.96l.79.03,3.6.15,7.39.03c.36,0,.69-.02,1.09-.04Z" />
          <path fill="#fff" d="M28.47,34.25c-.4.02-.73.04-1.09.04l-7.39-.03-3.6-.15-.79-.03c-2.21-.09-4.99-.43-5.61-2.96-.79-3.21-.62-7.41-.45-10.74.12-2.33.18-5.07,2.79-5.98,1.03-.36,2.08-.42,3.18-.47l4.39-.18c2.73-.11,5.42-.11,8.16,0l3.83.15.87.04c1.75.08,4.04.35,4.92,2.12.33.67.6,1.42.65,2.19l.27,4.52c.13,2.29,0,5.96-.52,8.2-.59,2.55-3.1,3.02-5.4,3.12l-.87.04-3.33.14ZM28.54,23.99l-7.48-4.36v8.73s7.48-4.37,7.48-4.37Z" />
          <polygon fill="#ed1f24" points="28.54 23.99 21.05 28.36 21.05 19.63 28.54 23.99"/>
        </symbol>
        <symbol id="fb-follow" viewBox="0 0 20 20">
          <g clip-path="url(#clip0_308_4342)">
            <path d="M8.35 19.9C3.6 19.05 0 14.95 0 10C0 4.5 4.5 0 10 0C15.5 0 20 4.5 20 10C20 14.95 16.4 19.05 11.65 19.9L11.1 19.45H8.9L8.35 19.9Z" fill="#3B5998"/>
            <path d="M13.9 12.8L14.35 9.99999H11.7V8.04999C11.7 7.24999 12 6.64999 13.2 6.64999H14.5V4.09999C13.8 3.99999 13 3.89999 12.3 3.89999C10 3.89999 8.40002 5.29999 8.40002 7.79999V9.99999H5.90002V12.8H8.40002V19.85C8.95002 19.95 9.50002 20 10.05 20C10.6 20 11.15 19.95 11.7 19.85V12.8H13.9Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_308_4342"><rect width="20" height="20" fill="white"/></clipPath>
          </defs>
        </symbol>
        <symbol viewBox="0 0 48 48" id="icTwitter">
          <g clip-path="url(#clip0_918_16)">
            <path d="M24.0002 47.8C37.1446 47.8 47.8002 37.1444 47.8002 24C47.8002 10.8556 37.1446 0.200012 24.0002 0.200012C10.8558 0.200012 0.200195 10.8556 0.200195 24C0.200195 37.1444 10.8558 47.8 24.0002 47.8Z" fill="#000000"/>
            <path d="M12.6 12.9L21.1 25L12.5 35.1H14.8L22.1 26.5L28.2 35.1H35.5L26.2 21.8L33.7 12.9H31.4L25.1 20.3L19.9 12.9H12.6Z" fill="white"/>
            <path d="M16.0996 14.8H18.8996L31.9996 33.2H29.0996L16.0996 14.8Z" fill="#000000"/>
          </g>
          <defs>
            <clipPath id="clip0_918_16"><rect width="48" height="48" fill="white"/></clipPath>
          </defs>
        </symbol>
      </svg>

      ${tags.length > 0 ? `
        <div class="hdBG tags_wrap">
          ${tags.map((tag) => {
            const tagUrl = `/topic/${encodeURIComponent(tag.slug || tag.name)}`;
            return `<a href="${tagUrl}" rel="topic">${esc(tag.name)}</a>`;
          }).join("")}
        </div>
      ` : ""}

${isAdsEnabled(siteSettings) && isGptEnabled(siteSettings) ? `
      <div class="adsCont">
        <amp-ad width="336" height="280" type="doubleclick" data-slot="/21874393853/Tv9_Hindi_AMP/tv9_hindi_amp_btf_3_300x250" data-multi-size="300x250,250x250"></amp-ad>
      </div>
` : ""}

${isAdsEnabled(siteSettings) && isTaboolaEnabled(siteSettings) ? `
      <div class="trc_related_container">
        <amp-embed width="100" height="2600" type="taboola" layout="responsive" data-publisher="tv9-hindi" data-mode="thumbnails-a" data-placement="Below Article Thumbnails AMP" data-target_type="mix" data-article="auto" data-url=""></amp-embed>
      </div>
` : ""}

  </div>
  `;
}
