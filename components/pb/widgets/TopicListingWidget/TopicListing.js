import AppLink from "@/components/AppLink";
import Image from "next/image";
import styles from "./TopicListing.module.css";
import React, { useState, useCallback } from "react";
import { getHref, decodeHtml } from "@/lib/helper/commonHelper";
import { ICONS_SVG } from "@/lib/constants";

const DEFAULT_FALLBACK_IMAGE =
  "https://images.tv9hindi.com/wp-content/themes/tv9bharavarsh/images/watermark-new-small.jpg?ar=16:9";

function pickValue(row = {}, keys = [], defaultValue = "") {
  for (const key of keys) {
    if (row?.[key] !== undefined && row?.[key] !== null && row?.[key] !== "") {
      return row[key];
    }
  }
  return defaultValue;
}

function getPostFormat(item, override) {
  if (override) return override;
  return String(item?.post_format || "post").toLowerCase();
}

function ThumbnailIcon({ item, format }) {
  const postFormat = getPostFormat(item, format);

  if (postFormat === "video") {
    return (
      <span className={styles.icon_BG}>
        <svg><use href={`${ICONS_SVG}#v_icon`}></use></svg>
      </span>
    );
  }

  if (postFormat === "photo" || postFormat === "gallery" || postFormat === "photo-gallery") {
    return (
      <span className={styles.icon_BG}>
        <svg><use href={`${ICONS_SVG}#p_icon`}></use></svg>
      </span>
    );
  }

  return null;
}

function LiveBlink({ item, format }) {
  const postFormat = getPostFormat(item, format);

  if (postFormat !== "live-blog") return null;

  return (
    <i
      className="blinker"
      style={{
        animation: item?.is_live === true ? undefined : "none",
      }}
    ></i>
  );
}

function TopicCard({ row }) {
  const url = getHref(pickValue(row, ["url", "permalink", "link"], "#"));
  const text = decodeHtml(pickValue(row, ["title", "headline", "name"], ""));
  const excerpt = decodeHtml(
    pickValue(row, ["excerpt", "description", "summary"], ""),
  );
  const image = pickValue(
    row,
    [
      "image",
      "thumbnail",
      "thumb",
      "image_url",
      "fallback_image",
      "featured_image",
    ],
    DEFAULT_FALLBACK_IMAGE,
  );
  const authorName =
    row.author ||  row?.author?.display_name || pickValue(row, ["author_name"], "");
  const authorUrl = row?.author?.link ? getHref(row.author.link) : "#";
  const date = pickValue(row, ["modified_at", "published_at"], "");
  const dateLabel = row?.modified_at ? "Updated on:" : "Published on:";
  const postFormat = pickValue(row, ["post_format"], "post");

  return (
    <figure>
      <div className={`${styles.imgThumb} ${postFormat}`}>
        <AppLink href={url} title={text}>
          <Image
            width={320}
            height={180}
            src={image}
            alt={text}
          />
        </AppLink>
        <ThumbnailIcon item={row} />
      </div>
      <div className={styles.card_title}>
        <h3 className={styles.h3}>
          <AppLink href={url}><LiveBlink item={row} />{text}</AppLink>
        </h3>
        {excerpt && <p>{excerpt}</p>}
        {(authorName || date) && (
          <ul className={styles.newsCredit}>
            {authorName && (
              <li className={styles.name}>
                <AppLink href={authorUrl}>{authorName}</AppLink>
              </li>
            )}
            {date && <li className={styles.date}>{dateLabel} {formatDate(date).date}</li>}
            {date && <li className={styles.time}>{formatDate(date).time}</li>}
          </ul>
        )}
      </div>
    </figure>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return { date: "", time: "" };
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return { date: dateStr, time: "" };
    const datePart = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(d);
    const timePart =
      new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(d) + " IST";
    return { date: datePart, time: timePart };
  } catch {
    return { date: dateStr, time: "" };
  }
}

/**
 * Parse endpoint like: .../topic/{slug}/all/0_10 or .../author/{slug}/0_10
 * Extract base (everything before offset_limit), offset, and limit.
 */
function parseEndpoint(endpoint) {
  if (!endpoint) return null;
  const match = endpoint.match(/^(.*\/)(\d+)_(\d+)(\/?)$/);
  if (match) {
    return {
      base: match[1],
      offset: parseInt(match[2], 10),
      limit: parseInt(match[3], 10),
      trailing: match[4],
    };
  }
  return null;
}

/**
 * Resolve all known placeholders in an endpoint URL.
 */
function resolveEndpoint(endpoint, queryParams = {}) {
  if (!endpoint) return "";
  const topicSlug = queryParams.topicSlug || queryParams.topic || "";
  const authorSlug =
    queryParams.nameSlug || queryParams.authorSlug || queryParams.author || "";
  const category = queryParams.category || "";

  return endpoint
    .replace(/\{topicSlug\}/g, topicSlug)
    .replace(/\{topic\}/g, topicSlug)
    .replace(/\{nameSlug\}/g, authorSlug)
    .replace(/\{author\}/g, authorSlug)
    .replace(/\{category\}/g, category);
}

const DEFAULT_TABS = [
  { id: "all", label: "All" },
  { id: "news", label: "News" },
  { id: "web-stories", label: "Web Stories" },
  { id: "photos", label: "Photos" },
  { id: "videos", label: "Videos" },
  { id: "short-video", label: "Short Videos" },
];

function extractItems(json) {
  if (!json) return [];
  if (Array.isArray(json)) return json;
  // Handle { ok, data: { posts: [...] } } shape
  if (json?.data?.posts && Array.isArray(json.data.posts))
    return json.data.posts;
  if (Array.isArray(json?.data)) return json.data;
  if (Array.isArray(json?.posts)) return json.posts;
  if (Array.isArray(json?.items)) return json.items;
  if (json?.data && typeof json.data === "object") return [json.data];
  return [];
}

export default function TopicListingWidget({
  title = "",
  items = [],
  config = {},
  dataConfig = {},
  queryParams = {},
}) {
  // Resolve the endpoint from props (dataConfig from page builder)
  const rawEndpoint = resolveEndpoint(
    dataConfig.endpoint || config?.endpoint || "",
    queryParams,
  );

  const parsed = parseEndpoint(rawEndpoint);
  const pageSize = parsed ? parsed.limit : 10;

  // Determine if tabs should be shown (only if endpoint contains /all/ segment for tab switching)
  const hasTabs = rawEndpoint.includes("/all/");
  const tabs = hasTabs
    ? Array.isArray(dataConfig.tabs)
      ? dataConfig.tabs
      : DEFAULT_TABS
    : [];

  const [activeTab, setActiveTab] = useState("all");
  const [allItems, setAllItems] = useState(Array.isArray(items) ? items : []);
  const [currentOffset, setCurrentOffset] = useState(
    parsed ? parsed.offset + pageSize : pageSize,
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(!!parsed);

  /**
   * Build the fetch URL for a given tab and offset.
   */
  const buildFetchUrl = useCallback(
    (tab, offset) => {
      if (!parsed) return "";
      let base = parsed.base;
      // If tabs are enabled, replace /all/ segment with active tab
      if (hasTabs && base.includes("/all/")) {
        base = base.replace("/all/", `/${tab}/`);
      }
      return `${base}${offset}_${pageSize}${parsed.trailing}`;
    },
    [parsed, hasTabs, pageSize],
  );

  const handleTabChange = useCallback(
    (tabId) => {
      if (tabId === activeTab || !parsed) return;
      setActiveTab(tabId);
      setLoading(true);

      const url = buildFetchUrl(tabId, 0);
      if (!url) {
        setLoading(false);
        return;
      }

      fetch(url, { headers: { Accept: "application/json" } })
        .then((res) => (res.ok ? res.json() : null))
        .then((json) => {
          const newItems = extractItems(json);
          setAllItems(newItems);
          setCurrentOffset(pageSize);
          setHasMore(newItems.length >= pageSize);
        })
        .catch(() => {
          setAllItems([]);
          setHasMore(false);
        })
        .finally(() => setLoading(false));
    },
    [activeTab, parsed, buildFetchUrl, pageSize],
  );

  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore || !parsed) return;
    setLoading(true);

    const url = buildFetchUrl(activeTab, currentOffset);
    if (!url) {
      setLoading(false);
      setHasMore(false);
      return;
    }

    fetch(url, { headers: { Accept: "application/json" } })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        const newItems = extractItems(json);
        if (newItems.length === 0) {
          setHasMore(false);
        } else {
          setAllItems((prev) => [...prev, ...newItems]);
          setCurrentOffset((prev) => prev + pageSize);
          if (newItems.length < pageSize) {
            setHasMore(false);
          }
        }
      })
      .catch(() => setHasMore(false))
      .finally(() => setLoading(false));
  }, [
    loading,
    hasMore,
    parsed,
    currentOffset,
    pageSize,
    activeTab,
    buildFetchUrl,
  ]);

  if (!allItems.length && !loading) {
    return <div className="pb-empty">No data found.</div>;
  }

  return (
    <>
      {/* Tab filters (only shown if endpoint supports tabs) */}
      {tabs.length > 0 && (
        <ul className={styles.newsFilterTabs}>
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={activeTab === tab.id ? "isActive" : ""}
              onClick={(e) => {
                e.preventDefault();
                handleTabChange(tab.id);
              }}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      )}

      {/* Listing */}
      <div className={styles.newsGridWrapper}>
        {allItems.map((row, idx) => (
          <TopicCard key={row?.id || row?.post_id || idx} row={row} />
        ))}

        {/* Load More */}
        {hasMore && (
          <button
            className={styles.loadMoreBtn}
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </>
  );
}
