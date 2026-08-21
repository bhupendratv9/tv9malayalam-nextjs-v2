import React, { useState, useCallback } from "react";
import Head from "next/head";
import AppLink from "@/components/AppLink";
import Image from "next/image";
import styles from "./CategoryListingCommonUP.module.css";
import { getHref, decodeHtml, getViewMoreUrl, getViewMoreLabel } from "@/lib/helper/commonHelper";
import { pickValue, parseEndpoint, extractItems } from "@/lib/helper/widgetHelper";
import { DEFAULT_FALLBACK_IMAGE, ICONS_SVG } from "@/lib/constants";
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
      {desktopId && (
        <div className="adsCont onlyWebADS Topads">
          <div id={desktopId}></div>
        </div>
      )}
      {mobileId && (
        <div className="adsCont onlyMobileADS">
          <div id={mobileId}></div>
        </div>
      )}
    </>
  );
}

function getDescription(item) {
  return item.excerpt || item.description || item.summary || item.short_description || "";
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

export default function CategoryListingCommonUP({
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
  // Title priority: custom_category_title from meta → category name → widget title → category slug
  const customTitle = data?.data?.meta?.custom_category_title
    || data?.meta?.custom_category_title
    || data?.data?.data?.meta?.custom_category_title
    || "";

  console.log(data);
    
  const apiName = data?.data?.name || data?.name || data?.data?.title || data?.title || "";
  const apiTitle = customTitle || apiName;
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

  // Ad positions and slot IDs from dataConfig
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

  const bigItem = allItems[0];
  const smallItems = allItems.slice(1);

  const bigUrl = getHref(pickValue(bigItem, ["url", "permalink", "link"], "#"));
  const bigTitle = decodeHtml(pickValue(bigItem, ["title", "headline", "name"], ""));
  const bigImg = pickValue(bigItem, ["image", "thumbnail", "thumb", "image_url", "fallback_image", "featured_image"], DEFAULT_FALLBACK_IMAGE);
  const bigDesc = decodeHtml(getDescription(bigItem));
  const bigCid = pickValue(bigItem, ["id", "cid", "post_id"], "");

  // Build ItemList schema from items
  const itemListSchema = allItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: allItems.slice(0, 20).map((item, idx) => {
      const itemUrl = getHref(pickValue(item, ["url", "permalink", "link"], ""));
      const itemName = decodeHtml(pickValue(item, ["title", "headline", "name"], ""));
      if (!itemUrl || !itemName) return null;
      return { "@type": "ListItem", position: idx + 1, "@id": itemUrl, name: itemName };
    }).filter(Boolean),
  } : null;

  return (
    <>
      {itemListSchema && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
          />
        </Head>
      )}
      {/* ─── Title Heading ─── */}
      <div className="common_heading">
        <h1 className="h2">
          {viewMoreUrl && viewMoreUrl !== "#" ? (
            <AppLink href={viewMoreUrl} title={titleText}>{titleText}</AppLink>
          ) : (
            titleText
          )}
        </h1>
      </div>

      {/* ─── Big News (first item) ─── */}
      <div className={styles.bigNews_Wrapper}>
        <figure>
          <div className={styles.imgwrap}>
            <AppLink href={bigUrl} title={bigTitle} data-pos={1} data-widget={titleText} data-cid={bigCid}>
              {bigImg ? (
                <Image
                  width={350}
                  height={197}
                  src={bigImg}
                  title={bigTitle}
                  alt={bigTitle}
                  unoptimized
                  priority
                  style={{ width: "100%", height: "auto" }}
                />
              ) : null}
              <ThumbnailIcon item={bigItem} />
            </AppLink>
          </div>
          <div className={styles.card_title}>
            <h3 className={styles.h3}>
              <AppLink href={bigUrl} title={bigTitle}>
                <LiveBlink item={bigItem} />
                {bigTitle}
              </AppLink>
            </h3>
            {bigDesc && <p>{bigDesc}</p>}
          </div>
        </figure>
      </div>

      {/* ─── Common Story Items ─── */}
      <div className={styles.commonStory_Wrapper}>
        {smallItems.map((item, idx) => {
          const pos = idx + 2;
          const itemUrl = getHref(pickValue(item, ["url", "permalink", "link"], "#"));
          const itemTitle = decodeHtml(pickValue(item, ["title", "headline", "name"], ""));
          const imgSrc = pickValue(item, ["image", "thumbnail", "thumb", "image_url", "fallback_image", "featured_image"], DEFAULT_FALLBACK_IMAGE);
          const desc = decodeHtml(getDescription(item));
          const cid = pickValue(item, ["id", "cid", "post_id"], "");

          return (
            <React.Fragment key={cid || idx}>
              <figure>
                <div className={styles.imgwrap}>
                  <AppLink href={itemUrl} title={itemTitle} data-pos={pos} data-widget={titleText} data-cid={cid}>
                    {imgSrc ? (
                      <Image
                        width={220}
                        height={124}
                        src={imgSrc}
                        title={itemTitle}
                        alt={itemTitle}
                        unoptimized
                      />
                    ) : null}
                    <ThumbnailIcon item={item} />
                  </AppLink>
                </div>
                <div className={styles.card_title}>
                  <h3 className={styles.h3}>
                    <AppLink href={itemUrl} title={itemTitle}>
                      <LiveBlink item={item} />
                      {itemTitle}
                    </AppLink>
                  </h3>
                  {desc && <p>{desc}</p>}
                </div>
              </figure>
              {adPositions.includes(pos) && (() => {
                const { desktopId, mobileId } = getAdIds(pos);
                return <AdBlock desktopId={desktopId} mobileId={mobileId} />;
              })()}
            </React.Fragment>
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
