import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Script from "next/script";
import ArticleFormat from "./detail/ArticleFormat";
import VideoFormat from "./detail/VideoFormat";
import PhotoFormat from "./detail/PhotoFormat";
import { getValue, formatIstDate, normalizeArticleInput, buildTags } from "@/lib/helper/widgetHelper";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

export default function LiveBlogDetailMainContentWidget({
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
      
	  <div className="live-blink">
		<div className="blinker"><div className="dot"></div><div className="pulse"></div></div>
		<span>live now</span>
	  </div>
	  
	  <h1 className="article-HD">Live {title}</h1>

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
            <span><svg><use href="#shareIcon" /></svg></span>
          </div>
        </div>
      </section>
	  	
      {/* Live Blog Entries */}
      {article.live_entries && Array.isArray(article.live_entries) && article.live_entries.length > 0 && (
        <LiveBlogEntries entries={article.live_entries} />
      )}

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
            <a href={`${SITE_URL}/topic/${encodeURIComponent(tag.slug || tag.name)}`} rel="topic" key={`${tag.slug}-${index}`}>
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
              <svg><use href="#icon_youtube" /></svg>
            </a>
            <a href={googleNewsUrl} target="_blank" title="Google News" rel="noreferrer">
              <svg><use href="#icon_googleNews" /></svg>
            </a>
            <a href={whatsappUrl} target="_blank" title="whatsapp follow" rel="noreferrer">
              <svg className="whatsapp"><use href="#whats_iconff" /></svg>
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


/**
 * LiveBlogEntries — Renders live blog entries with load more + Twitter embed support.
 * Shows initial batch (PAGE_SIZE), loads more on click.
 * Triggers Twitter widget rendering after each DOM update.
 */
const ENTRIES_PAGE_SIZE = 10;

function LiveBlogEntries({ entries = [] }) {
  const [visibleCount, setVisibleCount] = useState(ENTRIES_PAGE_SIZE);
  const containerRef = useRef(null);

  const visibleEntries = entries.slice(0, visibleCount);
  const hasMore = visibleCount < entries.length;

  // Render Twitter embeds after entries are inserted into DOM
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Load Twitter widgets.js if not already loaded
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);
      script.onload = () => {
        if (window.twttr?.widgets) {
          window.twttr.widgets.load(containerRef.current);
        }
      };
    } else if (window.twttr?.widgets) {
      // Re-render tweets in the container
      window.twttr.widgets.load(containerRef.current);
    }
  }, [visibleCount]);

  // Also handle Instagram/Facebook oEmbed if present
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.instgrm?.Embeds) window.instgrm.Embeds.process();
    if (window.FB?.XFBML) window.FB.XFBML.parse(containerRef.current);
  }, [visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ENTRIES_PAGE_SIZE);
  };

  return (
    <div className="BlogPost news_liveblog">
      <div id="tv9lb-liveblog" className="tv9lb-liveblog" ref={containerRef}>
        <ul className="tv9lb-liveblog-list">
          {visibleEntries.map((entry) => (
            <li
              key={entry.id}
              data-tv9lb-post-id={entry.id}
              className="tv9lb-liveblog-post"
            >
              <div className="timestamp">
                <span className="blog-time">
                  {formatIstDate(entry.date || entry.modified)}
                </span>
              </div>
              {entry.title && <h3 className="h3">{entry.title}</h3>}
              {entry.content && (
                <div
                  className="tv9lb-post-content"
                  dangerouslySetInnerHTML={{
                    __html: entry.content.replace(
                      /<script[^>]*src="https:\/\/platform\.twitter\.com\/widgets\.js"[^>]*><\/script>/gi,
                      ""
                    ),
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      {hasMore && (
        <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
          <button
            onClick={handleLoadMore}
            style={{
              background: "#dc0000",
              color: "#fff",
              border: "none",
              padding: "10px 30px",
              borderRadius: "4px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
