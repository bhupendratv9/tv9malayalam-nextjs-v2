import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./AqiWeatherRelatedNews.module.css";

import { decodeHtml } from "@/lib/helper/commonHelper";

const DEFAULT_INITIAL_COUNT = 8;

function parseEndpoint(endpoint) {
  if (!endpoint) return null;
  const match = endpoint.match(/^(.*\/)(\d+)_(\d+)(\/?)$/);
  if (!match) return null;
  return {
    base: match[1],
    offset: Number.parseInt(match[2], 10),
    limit: Number.parseInt(match[3], 10),
    trailing: match[4],
  };
}

function normalizeNewsItem(item = {}) {
  return {
    id: item.id || item.post_id || item.ID || null,
    title: item.title || item.post_title || "",
    url: item.url || item.permalink || item.link || "#",
    image:
      item.image ||
      item.image_url ||
      item.featured_image ||
      item.thumbnail ||
      item?.featured_media?.url ||
      "",
  };
}

function extractItems(json) {
  if (Array.isArray(json)) return json;
  if (Array.isArray(json?.data)) return json.data;
  if (Array.isArray(json?.items)) return json.items;
  if (json?.data && typeof json.data === "object") return [json.data];
  return [];
}

export default function AqiRelatedNewsWidget({ title = "", items = [], dataConfig = {} }) {
  const displayTitle =
     decodeHtml(dataConfig.title) || decodeHtml(title) || "தொடர்புடைய செய்திகள்";
  const parsed = parseEndpoint(dataConfig.endpoint || "");
  const pageSize = parsed?.limit ?? dataConfig.load_more_count ?? 10;
  const initialCount = dataConfig.initial_count ?? DEFAULT_INITIAL_COUNT;
  const loadMoreLabel = dataConfig.load_more_label || "Load More";
  const imageHeight = dataConfig.image_height || 158;
  const imageWidth = dataConfig.image_width || 280;

  const [allItems, setAllItems] = useState(() =>
    Array.isArray(items) ? items.map(normalizeNewsItem) : []
  );
  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(initialCount, Array.isArray(items) ? items.length : initialCount)
  );
  const [currentOffset, setCurrentOffset] = useState(() =>
    parsed ? parsed.offset + pageSize : pageSize
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(() => {
    const count = Array.isArray(items) ? items.length : 0;
    return count > initialCount || (!!parsed && count >= pageSize);
  });

  const visibleNews = allItems.slice(0, visibleCount);
  const showLoadMore = visibleCount < allItems.length || hasMore;

  const fetchMoreItems = useCallback(() => {
    if (!parsed || loading) return;

    setLoading(true);
    const url = `${parsed.base}${currentOffset}_${pageSize}${parsed.trailing}`;

    fetch(url, { headers: { Accept: "application/json" } })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        const newItems = extractItems(json).map(normalizeNewsItem);
        if (newItems.length === 0) {
          setHasMore(false);
          return;
        }

        setAllItems((prev) => [...prev, ...newItems]);
        setVisibleCount((prev) => prev + newItems.length);
        setCurrentOffset((prev) => prev + pageSize);
        if (newItems.length < pageSize) {
          setHasMore(false);
        }
      })
      .catch(() => setHasMore(false))
      .finally(() => setLoading(false));
  }, [parsed, loading, currentOffset, pageSize]);

  const handleLoadMore = useCallback(() => {
    if (loading) return;

    if (visibleCount < allItems.length) {
      setVisibleCount((prev) => Math.min(prev + pageSize, allItems.length));
      return;
    }

    fetchMoreItems();
  }, [loading, visibleCount, allItems.length, pageSize, fetchMoreItems]);

  if (!visibleNews.length) {
    return null;
  }

  return (
    <div className={styles.AQIWTHRelatedNews_Widget}>
      <div className={styles.container}>
        <div className={styles.custom_heading}>
          <h2 className={styles.h1}>{displayTitle}</h2>
        </div>

        <div className={styles.AQIWTHRelatedNews_Listing}>
          {visibleNews.map((news) => {
            const newsTitle = decodeHtml(news.title);
            return (
              <figure key={news.id || news.post_id || news.url}>
                <AppLink href={news.url} title={newsTitle}>
                  <div className={styles.imgWrap}>
                    <Image
                      src={news.image}
                      alt={newsTitle}
                      title={newsTitle}
                      width={imageWidth}
                      height={imageHeight}
                    />
                  </div>

                  <div className={styles.cardTitle}>{newsTitle}</div>
                </AppLink>
              </figure>
            );
          })}
        </div>
        
        {showLoadMore && (
          <button
            type="button"
            className={styles.loadMoreBtn}
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : loadMoreLabel}
          </button>
        )}
      </div>
    </div>
  );
}

AqiRelatedNewsWidget.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  dataConfig: PropTypes.shape({
    title: PropTypes.string,
    endpoint: PropTypes.string,
    initial_count: PropTypes.number,
    load_more_count: PropTypes.number,
    load_more_label: PropTypes.string,
    image_height: PropTypes.number,
    image_width: PropTypes.number,
  }),
};
