"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "../DetailMainContentWidget/DetailMainContent.module.css";
import { decodeHtml, getHref } from "@/lib/helper/commonHelper";
import { formatIstDate, buildTags } from "@/lib/helper/widgetHelper";

const BASE_PATH = "/tv9up-nextjs";

/**
 * Normalize the raw API response to extract article data.
 */
function extractArticle(json) {
  if (!json) return null;
  if (json.data && typeof json.data === "object" && !Array.isArray(json.data)) return json.data;
  if (Array.isArray(json.data) && json.data.length > 0) return json.data[0];
  if (json.title || json.content_html || json.id) return json;
  return null;
}

/**
 * Single article card rendered in the infinite scroll list.
 */
function ArticleCard({ article, position }) {
  const title = decodeHtml(article.title || "");
  const excerpt = decodeHtml(article.excerpt || article.short_desc || "");
  const contentHtml = article.content_html || "";
  const permalink = getHref(article.permalink || article.url || article.canonical || "#");
  const mainImage = article.featured_media?.url || article.thumbnail_full || article.thumbnail || "";
  const imageCaption = article.postmeta?.image_caption || title;
  const authorObj = article.author || {};
  const authorName = authorObj.display_name || "";
  const authorUrl = authorObj.link || "#";
  const authorImage = authorObj.image || "";
  const modifiedGmt = article.modified_at || article.modified_gmt || "";
  const createdGmt = article.published_at || article.created_gmt || "";
  const updatedText = formatIstDate(modifiedGmt || createdGmt);
  const tags = buildTags(article);
  const category = article.categories?.[0] || null;

  return (
    <div className={styles.detailPage_Content} data-article-id={article.id} data-permalink={permalink} data-position={position}>
      {/* Category badge */}
      {category && (
        <div className={styles.categoryBadge}>
          <AppLink href={getHref(`/${category.slug || ""}`)} title={category.name || ""}>
            {category.name || ""}
          </AppLink>
        </div>
      )}

      <h1 className={styles.articleHD}>{title}</h1>
      {excerpt && (
        <div className={styles.excerpt}>
          <h2 className={styles.short_desc}>{excerpt}</h2>
        </div>
      )}

      {/* Author & date */}
      {(authorName || updatedText) && (
        <div className={styles.authorDateWrap}>
          {authorImage && (
            <div className={styles.authorImg}>
              <Image src={authorImage} alt={authorName} width={36} height={36} unoptimized />
            </div>
          )}
          <div className={styles.authorInfo}>
            {authorName && (
              <AppLink href={getHref(authorUrl)} className={styles.authorName}>
                {authorName}
              </AppLink>
            )}
            {updatedText && <span className={styles.updateDate}>{updatedText}</span>}
          </div>
        </div>
      )}

      {/* Featured image */}
      {mainImage && (
        <div className={styles.featuredImage}>
          <Image
            src={mainImage}
            alt={title}
            title={title}
            width={1280}
            height={720}
            unoptimized
            style={{ width: "100%", height: "auto" }}
          />
          {imageCaption && (
            <div className={styles.image_caption}>
              <span>{imageCaption}</span>
            </div>
          )}
        </div>
      )}

      {/* Article body content */}
      {contentHtml && (
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className={styles.tagsWrapper}>
          {tags.map((tag, index) => (
            <AppLink
              href={getHref(`/topic/${encodeURIComponent(tag.slug || tag.name)}`)}
              rel="topic"
              key={`${tag.slug}-${index}`}
            >
              {tag.name}
            </AppLink>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * InfiniteScrollArticle Widget
 *
 * Placed after the main article content on detail pages.
 * When the user scrolls near the bottom, it fetches the next article using
 * `prev_article_id` from the current article's API response, creating a chain.
 * Also updates the browser URL as articles come into view.
 *
 * Props:
 *   - nextArticleId: the first article ID to load (from current article's prev_article_id)
 *   - dataConfig: widget configuration from page builder
 */
export default function InfiniteScrollArticle({
  nextArticleId = "",
  items = [],
  data = null,
  section = null,
  dataConfig = {},
}) {
  // Get the initial next article ID from props
  // Priority: direct prop > dataConfig > extracted from current article data
  const initialNextId = nextArticleId
    || dataConfig.next_article_id
    || dataConfig.prev_article_id
    || "";

  const [articles, setArticles] = useState([]);
  const [nextId, setNextId] = useState(initialNextId);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(!!initialNextId);
  const sentinelRef = useRef(null);
  const loadedIdsRef = useRef(new Set());
  const initialUrlRef = useRef("");

  // Store initial URL on mount
  useEffect(() => {
    initialUrlRef.current = window.location.href;
  }, []);

  const fetchNextArticle = useCallback(async () => {
    if (!nextId || loading || loadedIdsRef.current.has(nextId)) return;

    setLoading(true);
    loadedIdsRef.current.add(nextId);

    try {
      const res = await fetch(`${BASE_PATH}/api/article/${nextId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      const article = extractArticle(json);

      if (!article) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      setArticles((prev) => [...prev, article]);

      // Chain: get the next article ID from this article's response
      const chainNextId = article.prev_article_id || article.next_article_id || "";
      if (chainNextId && !loadedIdsRef.current.has(String(chainNextId))) {
        setNextId(String(chainNextId));
        setHasMore(true);
      } else {
        setNextId("");
        setHasMore(false);
      }

      // Update browser URL to the new article's permalink
      const newUrl = article.permalink || article.url || article.canonical || "";
      if (newUrl) {
        const href = getHref(newUrl);
        window.history.pushState({ articleId: article.id }, article.title || "", href);
      }
    } catch (err) {
      console.error("[InfiniteScrollArticle] Fetch error:", err?.message || err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [nextId, loading]);

  // IntersectionObserver to trigger loading next article
  useEffect(() => {
    if (!hasMore || !nextId) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          fetchNextArticle();
        }
      },
      { rootMargin: "600px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [nextId, hasMore, loading, fetchNextArticle]);

  // Update URL on scroll based on which article is currently visible
  useEffect(() => {
    if (articles.length === 0) return;

    const handleScroll = () => {
      const articleElements = document.querySelectorAll("[data-article-id]");
      for (let i = articleElements.length - 1; i >= 0; i--) {
        const el = articleElements[i];
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          const permalink = el.getAttribute("data-permalink");
          if (permalink && permalink !== "#" && window.location.href !== permalink) {
            const id = el.getAttribute("data-article-id");
            window.history.replaceState({ articleId: id }, "", permalink);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [articles]);

  // Don't render anything if no next article ID
  if (!initialNextId && articles.length === 0) return null;

  return (
    <div className="infinite-scroll-articles">
      {articles.map((article, idx) => (
        <div key={article.id || idx} className="next-article-separator">
          <hr style={{ margin: "2rem 0", border: "none", borderTop: "1px solid #e0e0e0" }} />
          <ArticleCard article={article} position={idx + 2} />
        </div>
      ))}

      {/* Sentinel element — triggers next fetch when scrolled into view */}
      {hasMore && (
        <div ref={sentinelRef} style={{ minHeight: 1 }}>
          {loading && (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div className="loading-spinner" style={{ display: "inline-block", width: 32, height: 32, border: "3px solid #f3f3f3", borderTop: "3px solid #e21b22", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
