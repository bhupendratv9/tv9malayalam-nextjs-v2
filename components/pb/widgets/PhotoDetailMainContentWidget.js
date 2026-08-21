import { useMemo } from "react";
import Image from "next/image";
import ArticleFormat from "./detail/ArticleFormat";
import VideoFormat from "./detail/VideoFormat";
import PhotoFormat from "./detail/PhotoFormat";

function getValue(obj, path, defaultValue = null) {
  if (!obj || typeof obj !== "object") return defaultValue;
  if (typeof path === "string") {
    return Object.prototype.hasOwnProperty.call(obj, path) ? obj[path] : defaultValue;
  }
  let current = obj;
  for (const key of path) {
    if (current && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, key)) {
      current = current[key];
    } else {
      return defaultValue;
    }
  }
  return current ?? defaultValue;
}

function formatIstDate(dateString) {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    const formatted = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
    return `${formatted} IST`;
  } catch {
    return dateString;
  }
}

function buildTags(article = {}) {
  const topicTerms = getValue(article, ["taxonomies", "topic"], []);
  const categoryTerms = getValue(article, ["taxonomies", "category"], []);
  const source =
    Array.isArray(topicTerms) && topicTerms.length > 0
      ? topicTerms
      : Array.isArray(categoryTerms) && categoryTerms.length > 0
      ? categoryTerms
      : [];
  return source
    .filter((item) => item && typeof item === "object" && item.name)
    .map((item) => ({ name: String(item.name || ""), slug: String(item.slug || "") }));
}

function normalizeArticleInput({ items = [], data = [], item = null, response = null }) {
  if (data && typeof data === "object" && !Array.isArray(data)) {
    if (data.data && typeof data.data === "object" && !Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.data) && data.data.length > 0) return data.data[0];
    if (data.item && typeof data.item === "object") return data.item;
    if (data.title || data.content_html || data.id) return data;
  }
  if (Array.isArray(data) && data.length > 0) return data[0];
  if (Array.isArray(items) && items.length > 0) return items[0];
  if (item && typeof item === "object") return item;
  if (response && typeof response === "object") {
    if (Array.isArray(response) && response.length > 0) return response[0];
    if (response.data && typeof response.data === "object" && !Array.isArray(response.data)) return response.data;
    if (Array.isArray(response.data) && response.data.length > 0) return response.data[0];
    if (response.item && typeof response.item === "object") return response.item;
    if (response.title || response.content_html || response.id) return response;
  }
  return null;
}

export default function PhotoDetailMainContentWidget({
  items = [],
  data = [],
  item = null,
  response = null,
  config = {},
  dataConfig = {},
}) {
  const article = useMemo(
    () => normalizeArticleInput({ items, data, item, response }),
    [items, data, item, response]
  );

  if (!article || typeof article !== "object") {
    return <div className="pb-empty">Article not found.</div>;
  }

  const title = String(getValue(article, "title", ""));
  const excerpt = String(getValue(article, "excerpt", ""));
  const permalink = String(getValue(article, "permalink", "#"));
  const modifiedGmt = String(getValue(article, "modified_gmt", ""));
  const createdGmt = String(getValue(article, "created_gmt", ""));
  const postFormat = String(getValue(article, "post_format", "post")).toLowerCase();

  const authorId = getValue(article, ["author", "id"], "");
  const authorObj = getValue(article, "author", {});
  const authorName = String(authorObj?.display_name || "");
  const authorUrl = String(authorObj?.link || "#");
  const authorImage = String(authorObj?.image || "");

  const googleBadgeUrl = String(config?.google_badge_url || dataConfig?.google_badge_url || "#");
  const googleBadgeImage = String(config?.google_badge_image || dataConfig?.google_badge_image || "");
  const googleStickyImage = String(config?.google_sticky_image || dataConfig?.google_sticky_image || "");

  const liveTvUrl = String(config?.live_tv_url || dataConfig?.live_tv_url || "#");
  const youtubeUrl = String(config?.youtube_url || dataConfig?.youtube_url || "#");
  const googleNewsUrl = String(config?.google_news_url || dataConfig?.google_news_url || "#");
  const whatsappUrl = String(config?.whatsapp_url || dataConfig?.whatsapp_url || "#");

  const updatedText = formatIstDate(modifiedGmt || createdGmt);
  const tags = buildTags(article);

  // Select format component based on post_format
  let FormatComponent = ArticleFormat;
  if (postFormat === "video") FormatComponent = VideoFormat;
  else if (postFormat === "photo" || postFormat === "gallery" || postFormat === "photo-gallery") FormatComponent = PhotoFormat;

  return (
    <div className="detailBody">
      <h1 className="article-HD">{title}</h1>

      {excerpt && <h2 className="short_desc">{excerpt}</h2>}

      <div className="adsCont onlyMobileADS">
        <div id="mobile_masterhead_300x250" />
      </div>
	  
	  {/* Author box */}
      <section className="author-box">
        <figure>
          <div className="author-pic">
            <div className="author_thumb">
              <a href={authorUrl} title={`Posts by ${authorName}`} rel="author">
                {authorImage && (
                  <Image src={authorImage} width={45} height={45} alt={authorName} unoptimized />
                )}
              </a>
            </div>
          </div>
          <figcaption>
            <a href={authorUrl} title={`Posts by ${authorName}`} rel="author">{authorName}</a>
            {updatedText && <span> Updated on:<span> {updatedText}</span></span>}
          </figcaption>
        </figure>
        <div className="d-flex">
          {googleBadgeImage && (
            <div className="google_badge_icon">
              <a href={googleBadgeUrl} target="_blank" title="google" rel="nofollow noreferrer">
                <Image src={googleBadgeImage} alt="Google News Badge" width={134} height={42} unoptimized />
              </a>
            </div>
          )}
          <div className="sharebox" id="share">
            Share
            <span><svg><use xlinkHref="#shareIcon" /></svg></span>
          </div>
        </div>
      </section>
	  	
      {/* Format-specific content (article / video / photo) */}
      <FormatComponent article={article} config={{ ...config, ...dataConfig }} />

      {/* Google sticky badge */}
      {googleStickyImage && (
        <div className="googlePrefStickyMob">
          <a href={googleBadgeUrl} target="_blank" title="google" rel="nofollow noreferrer">
            <Image width={200} height={60} src={googleStickyImage} alt="google button" unoptimized />
          </a>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="hastag">
          {tags.map((tag, index) => (
            <a href={`/topic/${encodeURIComponent(tag.slug || tag.name)}`} rel="topic" key={`${tag.slug}-${index}`}>
              {tag.name}
            </a>
          ))}
        </div>
      )}

      {/* Follow us + Live TV */}
      <div className="flexWrap">
        <div className="followUs">
          <span>Follow Us</span>
          <div className="socialLinks">
            <a href={youtubeUrl} target="_blank" title="Youtube" rel="noreferrer">
              <svg><use xlinkHref="#icon_youtube" /></svg>
            </a>
            <a href={googleNewsUrl} target="_blank" title="Google News" rel="noreferrer">
              <svg><use xlinkHref="#icon_googleNews" /></svg>
            </a>
            <a href={whatsappUrl} target="_blank" title="whatsapp follow" rel="noreferrer">
              <svg className="whatsapp"><use xlinkHref="#whats_iconff" /></svg>
            </a>
          </div>
        </div>
        <div className="liveTVBadge">
          <a href={liveTvUrl}>
            <i className="blinker" /><span>LIVE</span><span>TV</span>
          </a>
        </div>
      </div>

      <div className="adsCont Topads">
        <div id="desktop_top_ads_lhs3" />
        <div id="mobile_bottom_300x250" />
      </div>
    </div>
  );
}
