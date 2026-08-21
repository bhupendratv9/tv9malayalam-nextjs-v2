import React, { useState, useCallback } from "react";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./VideoGalleryLanding.module.css";
import { getHref, decodeHtml, getViewMoreUrl, getViewMoreLabel } from "@/lib/helper/commonHelper";
import { pickValue, parseEndpoint, extractItems } from "@/lib/helper/widgetHelper";
import { DEFAULT_FALLBACK_IMAGE, ICONS_SVG } from "@/lib/constants";

/**
 * Resolve all known placeholders in an endpoint URL.
 */
function resolveEndpoint(endpoint, queryParams = {}) {
  if (!endpoint) return "";
  const category = queryParams.category || "";
  const subcategory = queryParams.subcategory || "";
  const topicSlug = queryParams.topicSlug || queryParams.topic || "";
  const authorSlug = queryParams.nameSlug || queryParams.authorSlug || queryParams.author || "";

  return endpoint
    .replace(/\{category\}/g, category)
    .replace(/\{subcategory\}/g, subcategory)
    .replace(/\{topicSlug\}/g, topicSlug)
    .replace(/\{topic\}/g, topicSlug)
    .replace(/\{nameSlug\}/g, authorSlug)
    .replace(/\{author\}/g, authorSlug);
}

function getVideoDuration(item) {
  const raw = item?.duration || item?.video_duration || "";
  if (!raw) return "";
  // Parse ISO 8601 duration format (e.g., PT06M40S, PT1H02M30S)
  const match = String(raw).match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return raw;
  const hours = match[1] ? match[1].padStart(2, "0") : "";
  const minutes = (match[2] || "0").padStart(2, "0");
  const seconds = (match[3] || "0").padStart(2, "0");
  return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
}

export default function VideoGalleryLandingWidget({
  title = "",
  items = [],
  data = null,
  sectionUrl = "#",
  config = {},
  dataConfig = {},
  queryParams = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const category = queryParams?.category || "";
  const apiTitle = data?.data?.title || data?.data?.name || data?.title || data?.name || "";
  const titleText = decodeHtml(apiTitle) || decodeHtml(title) || category || "";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });

  // Resolve the endpoint from props (dataConfig from page builder)
  const rawEndpoint = resolveEndpoint(
    dataConfig.endpoint || config?.endpoint || "",
    queryParams
  );
  const parsed = parseEndpoint(rawEndpoint);
  const pageSize = parsed ? parsed.limit : 10;

  const [allItems, setAllItems] = useState(Array.isArray(items) ? items : []);
  const [currentOffset, setCurrentOffset] = useState(parsed ? parsed.offset + pageSize : pageSize);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(!!parsed);

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

  if (!allItems.length) {
    return null;
  }

  return (
    <>
      {/* ─── Title Heading ─── */}
      {titleText && (
        <div className="common_heading">
          <h1 className="h2">
            {viewMoreUrl && viewMoreUrl !== "#" ? (
              <AppLink href={viewMoreUrl} title={titleText}>{titleText}</AppLink>
            ) : (
              titleText
            )}
          </h1>
        </div>
      )}

      {/* ─── Video Gallery Grid ─── */}
      <div className={styles.videoGalleryLanding_Wrapper}>
        {allItems.map((item, index) => {
          const itemUrl = getHref(pickValue(item, ["url", "permalink", "link"], "#"));
          const itemTitle = decodeHtml(pickValue(item, ["title", "headline", "name"], ""));
          const imgSrc = pickValue(item, ["image", "thumbnail", "thumb", "image_url", "fallback_image", "featured_image"], DEFAULT_FALLBACK_IMAGE);
          const duration = getVideoDuration(item);

          return (
            <figure key={item.id || item.cid || index}>
              <AppLink href={itemUrl} title={itemTitle}>
                <div className={styles.imgwrap}>
                  <Image
                    width={231}
                    height={143}
                    src={imgSrc}
                    alt={itemTitle}
                    title={itemTitle}
                    unoptimized
                    priority={index < 3}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className={styles.card_title}>
                  <div className={styles.media_info}>
                    <svg>
                      <use href={`${ICONS_SVG}#ic_play`}></use>
                    </svg>
                    {duration && <span> {duration}</span>}
                  </div>
                  <div className={styles.h3}>
                    {itemTitle} {item.duration}
                  </div>
                </div>
              </AppLink>
            </figure>
          );
        })}

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
