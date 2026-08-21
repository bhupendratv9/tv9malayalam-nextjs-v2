import Image from "next/image";
import React, { useState, useCallback } from "react";
import { getHref, decodeHtml } from "@/lib/helper/commonHelper";

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

function TopicCard({ row }) {
  const url = getHref(pickValue(row, ["url", "permalink", "link"], "#"));
  const text = decodeHtml(pickValue(row, ["title", "headline", "name"], ""));
  const excerpt = decodeHtml(pickValue(row, ["excerpt", "description", "summary"], ""));
  const image = pickValue(
    row,
    ["image", "thumbnail", "thumb", "image_url", "fallback_image", "featured_image"],
    DEFAULT_FALLBACK_IMAGE
  );
  const authorName = row?.author?.display_name || pickValue(row, ["author_name"], "");
  const authorUrl = row?.author?.link ? getHref(row.author.link) : "#";
  const date = pickValue(row, ["modified_gmt", "created_gmt", "date", "published_at"], "");
  const postFormat = pickValue(row, ["post_format"], "post");

  return (
    <figure>
      <div className={`imgThumb ${postFormat}`}>
        <a href={url} title={text}>
          <Image
            width={320}
            height={180}
            src={image}
            alt={text}
            unoptimized
            style={{ width: "100%", height: "auto" }}
          />
        </a>
      </div>
      <div className="card_title">
        <h3 className="h3"><a href={url}>{text}</a></h3>
        {excerpt && <p>{excerpt}</p>}
        {(authorName || date) && (
          <ul className="newsCredit">
            {authorName && (
              <li><a href={authorUrl}>{authorName}</a></li>
            )}
            {date && <li>Updated on: {formatDate(date)}</li>}
          </ul>
        )}
      </div>
    </figure>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d) + " IST";
  } catch {
    return dateStr;
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
    return { base: match[1], offset: parseInt(match[2], 10), limit: parseInt(match[3], 10), trailing: match[4] };
  }
  return null;
}

/**
 * Resolve all known placeholders in an endpoint URL.
 */
function resolveEndpoint(endpoint, queryParams = {}) {
  if (!endpoint) return "";
  const topicSlug = queryParams.topicSlug || queryParams.topic || "";
  const authorSlug = queryParams.nameSlug || queryParams.authorSlug || queryParams.author || "";
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
  if (json?.data?.posts && Array.isArray(json.data.posts)) return json.data.posts;
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
    queryParams
  );

  const parsed = parseEndpoint(rawEndpoint);
  const pageSize = parsed ? parsed.limit : 10;

  // Determine if tabs should be shown (only if endpoint contains /all/ segment for tab switching)
  const hasTabs = rawEndpoint.includes("/all/");
  const tabs = hasTabs ? (Array.isArray(dataConfig.tabs) ? dataConfig.tabs : DEFAULT_TABS) : [];

  const [activeTab, setActiveTab] = useState("all");
  const [allItems, setAllItems] = useState(Array.isArray(items) ? items : []);
  const [currentOffset, setCurrentOffset] = useState(parsed ? parsed.offset + pageSize : pageSize);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(!!parsed);

  /**
   * Build the fetch URL for a given tab and offset.
   */
  const buildFetchUrl = useCallback((tab, offset) => {
    if (!parsed) return "";
    let base = parsed.base;
    // If tabs are enabled, replace /all/ segment with active tab
    if (hasTabs && base.includes("/all/")) {
      base = base.replace("/all/", `/${tab}/`);
    }
    return `${base}${offset}_${pageSize}${parsed.trailing}`;
  }, [parsed, hasTabs, pageSize]);

  const handleTabChange = useCallback((tabId) => {
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
  }, [activeTab, parsed, buildFetchUrl, pageSize]);

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
  }, [loading, hasMore, parsed, currentOffset, pageSize, activeTab, buildFetchUrl]);

  if (!allItems.length && !loading) {
    return <div className="pb-empty">No data found.</div>;
  }

  return (
    <div className="common_section MB20">
      {/* Tab filters (only shown if endpoint supports tabs) */}
      {tabs.length > 0 && (
        <div className="topicFilter_Wrapper">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              className={activeTab === tab.id ? "active" : ""}
              onClick={(e) => { e.preventDefault(); handleTabChange(tab.id); }}
              href="#"
            >
              {tab.label}
            </a>
          ))}
        </div>
      )}

      {/* Listing */}
      <div className="tv9_listingWidget">
        {allItems.map((row, idx) => (
          <TopicCard key={row?.id || row?.post_id || idx} row={row} />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="loadMore_Wrapper">
          <button className="loadMore_Btn" onClick={handleLoadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      <style jsx>{`
        .topicFilter_Wrapper{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px}
        .topicFilter_Wrapper a{padding:8px 16px;border:1px solid #ddd;border-radius:20px;text-decoration:none;color:#333;font-size:14px;cursor:pointer;transition:all 0.2s}
        .topicFilter_Wrapper a.active,.topicFilter_Wrapper a:hover{background:#dc0000;color:#fff;border-color:#dc0000}
        .loadMore_Wrapper{display:flex;justify-content:center;padding:20px 0}
        .loadMore_Btn{background:#dc0000;color:#fff;border:none;padding:10px 30px;border-radius:4px;font-size:1rem;font-weight:600;cursor:pointer;transition:background 0.2s}
        .loadMore_Btn:hover{background:#b00000}
        .loadMore_Btn:disabled{background:#999;cursor:not-allowed}
      `}</style>
    </div>
  );
}
