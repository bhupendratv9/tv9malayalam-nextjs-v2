import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./DetailMainContent.module.css";
import ArticleFormat from "../detail/ArticleFormat";
import VideoFormat from "../detail/VideoFormat";
import PhotoFormat from "../detail/PhotoFormat";
import DetailPageAuthorUP from "../DetailPageAuthorWidgetUP/DetailPageAuthorUP";
import { getValue, formatIstDate, normalizeArticleInput, buildTags, processEmbedHtml } from "@/lib/helper/widgetHelper";
import { decodeHtml } from "@/lib/helper/commonHelper";
import { ICONS_SVG } from "@/lib/constants";

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
    [items, data, item, response],
  );

  if (!article || typeof article !== "object") {
    return <div className="pb-empty">Article not found.</div>;
  }

  const title = decodeHtml(String(getValue(article, "title", "")));
  const excerpt = decodeHtml(String(getValue(article, "excerpt", "")));
  const permalink = String(getValue(article, "permalink", "#"));
  const modifiedGmt = String(getValue(article, "modified_at", ""));
  const createdGmt = String(getValue(article, "published_at", ""));
  const liveblogstatus = String(getValue(article.postmeta, "_tv9lb_status", ""));

  // DEBUG: check exact value and type
  if (typeof window !== "undefined") {
    console.log("[LiveBlog] liveblogstatus repr:", JSON.stringify(liveblogstatus), "length:", liveblogstatus.length, "=== closed:", liveblogstatus === "closed");
  }
  const postFormat = String(
    getValue(article, "post_format", "post"),
  ).toLowerCase();

  const authorObj = getValue(article, "author", {});
  const authorName = String(authorObj?.display_name || "");
  const authorUrl = String(authorObj?.link || "#");
  const authorImage = String(authorObj?.image || "");

  const googleBadgeUrl = String(
    config?.google_badge_url || dataConfig?.google_badge_url || "#",
  );
  const googleBadgeImage = String(
    config?.google_badge_image || dataConfig?.google_badge_image || "",
  );
  const googleStickyImage = String(
    config?.google_sticky_image || dataConfig?.google_sticky_image || "",
  );

  const liveTvUrl = String(
    config?.live_tv_url || dataConfig?.live_tv_url || "https://www.tv9hindi.com/live-tv",
  );
  const youtubeUrl = String(
    config?.youtube_url || dataConfig?.youtube_url || "https://www.youtube.com/@TV9UPUK?sub_confirmation=1",
  );
  const facebookUrl = String(
    config?.facebook_url || dataConfig?.facebook_url || "https://www.facebook.com/Tv9UttarPradesh/",
  );
  const twitterUrl = String(
    config?.twitter_url || dataConfig?.twitter_url || "https://x.com/tv9uttarpradesh?lang=en",
  );

  const updatedText = formatIstDate(modifiedGmt || createdGmt);
  const tags = buildTags(article);

  // Select format component based on post_format
  let FormatComponent = ArticleFormat;
  if (postFormat === "video") FormatComponent = VideoFormat;
  else if (
    postFormat === "photo" ||
    postFormat === "gallery" ||
    postFormat === "photo-gallery"
  )
    FormatComponent = PhotoFormat;

  return (
    <>
      <div className={`${styles.articleBody} ${styles.liveBodyCont}`}>
        {liveblogstatus !== "closed" && (
          <div className={styles.live_blog_tag}>
            <span className={styles.blinker}></span>
            <span>live now</span>
          </div>
        )}

        <h1 className={styles.articleHD}>{title}</h1>

        {excerpt && <div className={styles.excerpt}> <h2 className={styles.short_desc}>{excerpt}</h2> </div>}

        {/* Author box */}
        <DetailPageAuthorUP
          authorUrl={authorUrl}
          authorName={authorName}
          authorImage={authorImage}
          updatedText={updatedText}
          googleBadgeUrl={googleBadgeUrl}
          googleBadgeImage={googleBadgeImage}
        />

        {/* Format-specific content (article / video / photo) */}
        <FormatComponent
          article={article}
          config={{ ...config, ...dataConfig }}
        />

        {/* Live Blog Entries */}
        <div className={styles.liveblogdetail_wrap}>
          <div className={styles.blogHeading}>
            LIVE NEWS & UPDATES
          </div>
          {liveblogstatus === "closed" && (
            <div className={styles.liveblogClosed_Message}>The liveblog has ended</div>
          )}
          {article.live_entries &&
            Array.isArray(article.live_entries) &&
            article.live_entries.length > 0 && (
              <LiveBlogEntries entries={article.live_entries} styles={styles} />
            )}
        </div>

        {/* Google sticky badge */}
        {googleStickyImage && (
          <div className={styles.googlePrefStickyMob}>
            <AppLink
              href={googleBadgeUrl}
              target="_blank"
              title="google"
              rel="nofollow noreferrer"
            >
              <Image
                width={200}
                height={60}
                src={googleStickyImage}
                alt="google button"
                unoptimized
              />
            </AppLink>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className={styles.tagsWrapper}>
            {tags.map((tag, index) => (
              <AppLink
                href={`/topic/${encodeURIComponent(tag.slug || tag.name)}`}
                rel="topic"
                key={`${tag.slug}-${index}`}
              >
                {tag.name}
              </AppLink>
            ))}
          </div>
        )}

        {/* Follow us + Live TV */}
        <div className={styles.flexWrap}>
          <div className={styles.followUs}>
            <span>Follow Us</span>
            <div className={styles.socialLinks}>
              <AppLink
                href={youtubeUrl}
                target="_blank"
                title="Youtube"
                rel="noreferrer"
              >
                <svg>
                  <use href={`${ICONS_SVG}#icon_youtube`} />
                </svg>
              </AppLink>
              <AppLink
                href={facebookUrl}
                target="_blank"
                title="Facebook"
                rel="noreferrer"
              >
                <svg>
                  <use href={`${ICONS_SVG}#fb-follow`} />
                </svg>
              </AppLink>
              <AppLink
                href={twitterUrl}
                target="_blank"
                title="twitter follow"
                rel="noreferrer"
              >
                <svg className={styles.whatsapp}>
                  <use href={`${ICONS_SVG}#icTwitter`} />
                </svg>
              </AppLink>
            </div>
          </div>
          <div className={styles.liveTVBadge}>
            <AppLink href={liveTvUrl}>
              <i className={styles.blinker} />
              <span>LIVE</span>
              <span>TV</span>
            </AppLink>
          </div>
        </div>
	      <div className="common_border"></div>
      </div>
    </>
  );
}


const ENTRIES_PAGE_SIZE = 10;

/**
 * Process entry HTML:
 * - Add loading="lazy" to all <img> tags
 * - Strip inline Twitter/Instagram scripts (loaded once globally)
 */
const processEntryHtml = processEmbedHtml;

function LiveBlogEntries({ entries = [], styles: s = {} }) {
  const [visibleCount, setVisibleCount] = useState(ENTRIES_PAGE_SIZE);
  const containerRef = useRef(null);
  const loadMoreRef = useRef(null);

  const visibleEntries = entries.slice(0, visibleCount);
  const hasMore = visibleCount < entries.length;

  // Load Twitter/Instagram widgets and render embeds when visible
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    // Twitter
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);
      script.onload = () => {
        if (window.twttr?.widgets) window.twttr.widgets.load(containerRef.current);
      };
    } else if (window.twttr?.widgets) {
      window.twttr.widgets.load(containerRef.current);
    }

    // Instagram
    if (window.instgrm?.Embeds) {
      window.instgrm.Embeds.process();
    }
  }, [visibleCount]);

  // Lazy load embeds using IntersectionObserver
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            if (el.querySelector(".twitter-tweet") && window.twttr?.widgets) {
              window.twttr.widgets.load(el);
            }
            observer.unobserve(el);
          }
        });
      },
      { rootMargin: "200px" }
    );

    const items = containerRef.current.querySelectorAll("li[data-tv9lb-post-id]");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [visibleCount]);

  // Auto-load more entries when scrolled near bottom (infinite scroll)
  useEffect(() => {
    if (typeof window === "undefined" || !loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => prev + ENTRIES_PAGE_SIZE);
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, visibleCount]);

  return (
    <div className={s.liveBlog_Listing} ref={containerRef}>
      <ul>
        {visibleEntries.map((entry) => (
          <li key={entry.id} data-tv9lb-post-id={entry.id}>
            <div className={s.lb_timestamp}>
              <span className={s.blogTime}>{formatIstDate(entry.date || entry.modified)}</span>
            </div>
            <div className={s.lb_list_wrap}>
              {entry.title && <h3 className={s.h3}>{entry.title}</h3>}
              {entry.content && (
                <div
                  className={s.aboutBlog_Wrapper}
                  dangerouslySetInnerHTML={{ __html: processEntryHtml(entry.content) }}
                />
              )}
            </div>
          </li>
        ))}
      </ul>

      {hasMore && (
        <div ref={loadMoreRef} style={{ minHeight: 1 }} />
      )}
    </div>
  );
}
