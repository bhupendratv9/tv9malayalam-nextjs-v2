import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./CategoryListingCommon.module.css";
import React, { useState, useCallback } from "react";
import { getHref, decodeHtml, getViewMoreUrl, getViewMoreLabel, ViewMoreLink } from "@/lib/helper/commonHelper";
import { pickValue, parseEndpoint, extractItems } from "@/lib/helper/widgetHelper";
import { DEFAULT_FALLBACK_IMAGE , ICONS_SVG } from "@/lib/constants";
import { useAdsEnabled } from "@/lib/helper/adsHelper";

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

function AdBlock({ desktopId, mobileId }) {
  const adsEnabled = useAdsEnabled();
  if (!adsEnabled) return null;
  if (!desktopId && !mobileId) return null;
  return (
    <>
      <div className={`${styles.adsCont} ${styles.onlyWebADS} ${styles.Topads}`}>
        <div id={desktopId}></div>
      </div>
      <div className={`${styles.adsCont} ${styles.onlyMobileADS}`}>
        <div id={mobileId}></div>
      </div>
    </>
  );
}

function LandingCard({ row, pos, widgetTitle, priority = false }) {
  const url = getHref(pickValue(row, ["url", "permalink", "link"], "#"));
  const text = decodeHtml(pickValue(row, ["title", "headline", "name"], ""));
  const cid = pickValue(row, ["id", "cid", "post_id"], "");
  const image = pickValue(
    row,
    ["image", "thumbnail", "thumb", "image_url", "fallback_image", "featured_image"],
    DEFAULT_FALLBACK_IMAGE
  );

  return (
    <figure>
      <AppLink href={url} title={text} data-pos={pos} data-widget={widgetTitle} data-cid={cid}>
        <div className={styles.imgThumb}>
          <Image
            src={image}
            alt={text}
            title={text}
            width={320}
            height={180}
            {...(priority ? { priority: true } : {})}
          />
          <ThumbnailIcon item={row} />
        </div>
        <div className={styles.card_title}>
          <h3 className={styles.h3}><LiveBlink item={row} />{text}</h3>
        </div>
      </AppLink>
    </figure>
  );
}

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

export default function CategoryListingCommonWidget({
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
  // Title priority: widget title_override → API response title/name → category slug
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
    return <div className="pb-empty">No data found.</div>;
  }

  // Ad positions and slot IDs from dataConfig (fully dynamic)
  // Expected format in dataConfig:
  //   ad_positions: [6, 12, 18]
  //   ad_slots: { "6": { desktop: "slot_id", mobile: "slot_id" }, "12": {...} }
  // OR simplified:
  //   desktop_ads: { "6": "slot_id", "12": "slot_id" }
  //   mobile_ads: { "6": "slot_id", "12": "slot_id" }
  const adPositions = Array.isArray(dataConfig.ad_positions) ? dataConfig.ad_positions : [];
  const adSlots = dataConfig.ad_slots || {};
  const desktopAds = dataConfig.desktop_ads || {};
  const mobileAds = dataConfig.mobile_ads || {};

  function getAdIds(pos) {
    const posKey = String(pos);
    if (adSlots[posKey]) {
      return { desktopId: adSlots[posKey].desktop || "", mobileId: adSlots[posKey].mobile || "" };
    }
    return { desktopId: desktopAds[posKey] || "", mobileId: mobileAds[posKey] || "" };
  }

  return (
    <div className={styles.categoryLandingPage_Wrapper}>
      <div className="tv9common_heading">
        <h1 className="h2">
          {viewMoreUrl && viewMoreUrl !== "#" ? (
            <a href={viewMoreUrl} title={titleText}>{titleText}</a>
          ) : (
            titleText
          )}
        </h1>
        <ViewMoreLink href={viewMoreUrl} label={viewMoreLabel} />
      </div>

      <div className={styles.catNewsBlocks}>
        {allItems.map((row, idx) => {
          const pos = idx + 1;

          return (
            <React.Fragment key={row?.id || row?.cid || row?.post_id || idx}>
              <LandingCard row={row} pos={pos} widgetTitle={titleText} priority={idx === 0} />
              {adPositions.includes(pos) && (() => {
                const { desktopId, mobileId } = getAdIds(pos);
                return <AdBlock desktopId={desktopId} mobileId={mobileId} />;
              })()}
            </React.Fragment>
          );
        })}

        {/* Load More */}
        {hasMore && (
          <button className={styles.loadMoreBtn} onClick={handleLoadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
}