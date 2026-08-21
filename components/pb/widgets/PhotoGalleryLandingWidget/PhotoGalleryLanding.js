import React, { useState, useCallback } from "react";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./PhotoGalleryLanding.module.css";
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

function getImageCount(item) {
  const candidateValues = [
    item?.photo_count,
    item?.gallery_count,
    item?.count,
    item?.image_count,
    item?.total_images,
    item?.gallery_images_count,
    item?.images_count,
    item?.imageCount,
    item?.totalImages,
    Array.isArray(item?.gallery_images) ? item.gallery_images.length : item?.gallery_images,
  ];

  const countValue = candidateValues.find(
    (value) => value !== undefined && value !== null && value !== ""
  );

  if (countValue === undefined) {
    return "";
  }

  const count = Array.isArray(countValue) ? countValue.length : Number(countValue);

  return Number.isFinite(count) && count > 0 ? `${count} Images` : "";
}

export default function PhotoGalleryLandingWidget({
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

      {/* ─── Photo Gallery Grid ─── */}
      <div className={styles.photoGalleryLanding_Wrapper}>
        {allItems.map((item, index) => {
          const itemUrl = getHref(pickValue(item, ["url", "permalink", "link"], "#"));
          const itemTitle = decodeHtml(pickValue(item, ["title", "headline", "name"], ""));
          const imgSrc = pickValue(item, ["image", "thumbnail", "thumb", "image_url", "fallback_image", "featured_image"], DEFAULT_FALLBACK_IMAGE);
          const imageCount = getImageCount(item);

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
                  {imageCount && (
                    <div className={styles.media_info}>
                      <span>{imageCount}</span>
                      <svg>
                        <use href={`${ICONS_SVG}#ic_photo`}></use>
                      </svg>
                    </div>
                  )}
                  <div className={styles.h3}>
                    {itemTitle}
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
