import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./HomeWebStories.module.css";
import {
  decodeHtml,
  getHref,
  getViewMoreUrl,
  getViewMoreLabel,
  ViewMoreLink,
} from "@/lib/helper/commonHelper";
import { parseEndpoint, extractItems } from "@/lib/helper/widgetHelper";
import { ICONS_SVG } from "@/lib/constants";

export default function HomeWebStoriesWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title) || "விஷுவல் ஸ்டோரீஸ்";
  const viewMoreUrl = getViewMoreUrl({
    view_more_link,
    dataConfig,
    sectionUrl,
    fallback: "/web-stories",
  });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });

  const endpoint = dataConfig?.endpoint || "";
  const parsed = parseEndpoint(endpoint);
  const pageSize = parsed ? parsed.limit : 4;

  const [allItems, setAllItems] = useState(Array.isArray(items) && items.length > 0 ? items : []);
  const [currentOffset, setCurrentOffset] = useState(parsed ? parsed.offset + pageSize : pageSize);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(!!parsed && items.length >= pageSize);

  // Sync items from client-side fetch
  useEffect(() => {
    if (Array.isArray(items) && items.length > 0 && allItems.length === 0) {
      setAllItems(items);
      setHasMore(!!parsed && items.length >= pageSize);
    }
  }, [items]);

  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore || !parsed) return;
    setLoading(true);

    const url = `${parsed.base}${currentOffset}_${pageSize}${parsed.trailing}`;

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
  }, [loading, hasMore, parsed, currentOffset, pageSize]);

  if (!allItems.length) return null;

  return (
    <div className={styles.webStoriesHome_Widget}>
      <div className="tv9common_heading">
        <div className="h2">
          <AppLink href={viewMoreUrl} title={displayTitle}>
            {displayTitle}
          </AppLink>
        </div>
        <ViewMoreLink href={viewMoreUrl} label={viewMoreLabel} />
      </div>
      <div className={styles.webStoriesGrid_Wrapper}>
        {allItems.map((item, idx) => {
          const imgSrc = item.image || item.thumbnail || item.image_url || item.thumb || "";
          const itemTitle = decodeHtml(item.title) || "";
          const itemUrl = getHref(item.permalink || item.url || item.link || "#");

          return (
            <figure key={item.id || idx}>
              <a href={itemUrl} title={itemTitle}>
                {imgSrc && (
                  <div className={styles.imgThumb}>
                    <Image
                      width={228}
                      height={300}
                      src={imgSrc}
                      alt={itemTitle}
                      title={itemTitle}
                      unoptimized
                    />
                    <span className={styles.webstoryIcon}>
                      <svg>
                        <use xlinkHref={`${ICONS_SVG}#webstory-icon`}></use>
                      </svg>
                    </span>
                  </div>
                )}
                <div className={styles.card_title}>
                  <span className={styles.h3}>{itemTitle}</span>
                </div>
              </a>
            </figure>
          );
        })}
      </div>

      {/* Load More — only shows if items >= 5 */}
      {hasMore && allItems.length >= 5 && (
        <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
          <button
            onClick={handleLoadMore}
            disabled={loading}
            style={{
              background: "#dc0000",
              color: "#fff",
              border: "none",
              padding: "10px 30px",
              borderRadius: "4px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
