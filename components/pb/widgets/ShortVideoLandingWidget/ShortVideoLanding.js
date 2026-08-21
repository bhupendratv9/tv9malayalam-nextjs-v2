import { useState, useCallback, useEffect } from "react";
import AppLink from "@/components/AppLink";
import Thumbnail from "../../Thumbnail";
import styles from "./ShortVideoLanding.module.css";
import { decodeHtml, getHref } from "@/lib/helper/commonHelper";
import { getImg, getLink, parseEndpoint, extractItems } from "@/lib/helper/widgetHelper";
import { ICONS_SVG } from "@/lib/constants";

export default function ShortVideoLandingWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
}) {
  const displayTitle = decodeHtml(title) || "Short Videos";
  const viewMoreUrl = getHref(view_more_link || dataConfig?.view_more_url || sectionUrl || "/videos/short-videos");
  const endpoint = dataConfig?.endpoint || "";
  const parsed = parseEndpoint(endpoint);
  const pageSize = parsed ? parsed.limit : 10;

  const [allItems, setAllItems] = useState(Array.isArray(items) && items.length > 0 ? items : []);
  const [currentOffset, setCurrentOffset] = useState(parsed ? parsed.offset + pageSize : pageSize);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(!!parsed);

  // Sync items when they arrive from client-side fetch (client_only widgets)
  useEffect(() => {
    if (Array.isArray(items) && items.length > 0 && allItems.length === 0) {
      setAllItems(items);
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
    <>
      <div className="tv9common_heading">
        <h1 className="h2">
          <AppLink href={viewMoreUrl}>{displayTitle}</AppLink>
        </h1>
      </div>
      <div className={styles.shortVideosListing_Wrapper}>
        {allItems.map((item, idx) => {
          const img = getImg(item);
          const link = getLink(item);
          const itemTitle = decodeHtml(item?.title || item?.post_title || "");

          return (
            <figure key={item?.id || item?.post_id || idx}>
              <div className={styles.img_wrap}>
                <AppLink href={link} title={itemTitle}>
                  {img && (
                    <Thumbnail
                      src={img}
                      alt={itemTitle}
                      preset="portrait"
                      dataConfig={dataConfig}
                    />
                  )}
                  <div className={styles.sv_btn}>
                    <svg>
                      <use href={`${ICONS_SVG}#ytShort`}></use>
                    </svg>
                  </div>
                </AppLink>
              </div>
              <div className={styles.textgraint}>
                <h3 className={styles.h3}>
                  <AppLink href={link} title={itemTitle}>{itemTitle}</AppLink>
                </h3>
              </div>
            </figure>
          );
        })}

        {hasMore && (
          <button className={styles.loadMoreBtn} onClick={handleLoadMore} disabled={loading}>
            {loading ? "Loading..." : (dataConfig?.load_more_label || "Load More")}
          </button>
        )}
      </div>
    </>
  );
}
