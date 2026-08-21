"use client";

import Head from "next/head";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import styles from "./HomeTopNewsUP.module.css";
import { ICONS_SVG } from "@/lib/constants";
import { getHref, decodeHtml } from "@/lib/helper/commonHelper";
import { getImg, getLink } from "@/lib/helper/widgetHelper";
import { useAdsEnabled } from "@/lib/helper/adsHelper";

function getPostFormat(item, override) {
  if (override) return override;
  return String(item?.post_format || "post").toLowerCase();
}

function ThumbnailIcon({ item, format }) {
  const postFormat = getPostFormat(item, format);

  if (postFormat === "video") {
    return (
      <span className={styles.video_time}>
        <svg>
          <use href={`${ICONS_SVG}#video_icon`}></use>
        </svg>
      </span>
    );
  }

  if (postFormat === "photo" || postFormat === "gallery" || postFormat === "photo-gallery") {
    let photoCount = item?.photo_count || item?.count || item?.gallery_count || 0;
    if (!photoCount || Number(photoCount) <= 0) photoCount = 1;

    return (
      <span className={styles.video_time}>
        <svg>
          <use href={`${ICONS_SVG}#ic_photo`}></use>
        </svg>
        {Number(photoCount)}
      </span>
    );
  }

  return null;
}

/**
 * HomeTopNewsWidgetUP
 *
 * dataConfig options:
 *   - show_live_tv     : "1" | "0" (default "1") — show live TV iframe
 *   - live_tv_url      : Live TV iframe URL
 *   - show_videos      : "1" | "0" (default "1") — show latest videos
 *   - video_title      : Video section heading (default "वीडियो")
 *   - show_ads         : "1" | "0" (default "1") — show ad slots
 *   - desktop_ad_id    : Desktop ad div ID
 *   - mobile_ad_id     : Mobile ad div ID
 *   - col1_big_count   : Items in col1 big news (default 1)
 *   - col1_small_count : Items in col1 small news (default 2)
 *   - col2_count       : Items in col2 briefs (default 5)
 */
export default function HomeTopNewsWidgetUP({
  title = "",
  items = [],
  dataConfig = {},
  videoItems = [],
}) {
  // ─── Config flags ───
  const globalAdsEnabled = useAdsEnabled();
  const showLiveTv = dataConfig.show_live_tv !== "0";
  const liveTvUrl = dataConfig.live_tv_url || "";
  const liveTvPageUrl = dataConfig.live_tv_page_url || "";
  const liveTvTitle = decodeHtml(dataConfig.live_tv_title || "LIVE TV");
  const showVideos = dataConfig.show_videos !== "0";
  const videoTitle = decodeHtml(dataConfig.video_title || "");
  const videoPageUrl = dataConfig.video_page_url || "";
  const showAds = globalAdsEnabled && dataConfig.show_ads !== "0";
  const mobileAdId = dataConfig.mobile_ad_id || "";

  const col1BigCount = Number(dataConfig.col1_big_count || 1);
  const col1SmallCount = Number(dataConfig.col1_small_count || 2);
  const col2Count = Number(dataConfig.col2_count || 5);

  // ─── Data splits ───
  const safeItems = Array.isArray(items) ? items : [];
  const col1BigItems = safeItems.slice(0, col1BigCount);
  const col1SmallItems = safeItems.slice(col1BigCount, col1BigCount + col1SmallCount);
  const col2Items = safeItems.slice(col1BigCount + col1SmallCount, col1BigCount + col1SmallCount + col2Count);
  const colThreeVideos = Array.isArray(videoItems) ? videoItems : [];

  // Build ItemList schema from all items
  const itemListSchema = safeItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: safeItems.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      "@id": item.url || item.permalink || getLink(item) || "",
      name: decodeHtml(item.title || item.post_title || ""),
    })).filter((item) => item["@id"] && item.name),
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
    <div className={styles.topNewsWidget_Wrapper}>
      {/* ─── Column 1: Big News + Small News ─── */}
      <div className={styles.colOne}>
        <div className={styles.liveNews_Wrapper}>
          {col1BigItems.map((item, idx) => {
            const itemTitle = decodeHtml(item.title || item.post_title || "");
            const link = getLink(item);
            const img = getImg(item);
            const desc = item.excerpt || item.description || item.summary || "";

            if (!itemTitle) return null;

            return (
              <div className={styles.bigNews_Wrap} key={item.id || item.post_id || idx}>
                <AppLink href={link} title={itemTitle}>
                  <div className={styles.card_title}>
                    <h3 className={styles.h3}>{itemTitle}</h3>
                  </div>
                  <div className={styles.card_desc}>
                    <div className={styles.imgwrap}>
                      {img ? (
                        <Image
                          width={350}
                          height={198}
                          src={img}
                          alt={itemTitle}
                          title={itemTitle}
                          unoptimized
                          style={{ width: "100%", height: "auto" }}
                        />
                      ) : null}
                      <ThumbnailIcon item={item} />
                    </div>
                    {desc && <p>{decodeHtml(desc)}</p>}
                  </div>
                </AppLink>
              </div>
            );
          })}

          {col1SmallItems.length > 0 && (
            <div className={styles.smallNews_Wrap}>
              {col1SmallItems.map((item, idx) => {
                const itemTitle = decodeHtml(item.title || item.post_title || "");
                const link = getLink(item);
                const catName = item.category?.name || item.category_name || item.cat_name || "";
                const catSlug = item.category?.slug || "";
                const catUrl = item.category_url || item.cat_url || (catSlug ? `/cities/${catSlug}` : "#");

                return (
                  <figure key={item.id || item.post_id || idx}>
                    {catName && (
                      <div className="catName">
                        <AppLink href={getHref(catUrl)}>{catName}</AppLink>
                      </div>
                    )}
                    <div className={styles.card_title}>
                      <h3 className={styles.h3}>
                        <AppLink href={link} title={itemTitle}>
                          {itemTitle}
                        </AppLink>
                      </h3>
                    </div>
                  </figure>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ─── Column 2: News Briefs ─── */}
      <div className={styles.colTwo}>
        <div className={styles.topNewsBriefs_Wrap}>
          <ul>
            {col2Items.map((item, idx) => {
              const itemTitle = decodeHtml(item.title || item.post_title || "");
              const link = getLink(item);
              const catName = item.category?.name || item.category_name || item.cat_name || "";
              const catSlug = item.category?.slug || "";
              const catUrl = item.category_url || item.cat_url || (catSlug ? `/cities/${catSlug}` : "#");

              return (
                <li key={item.id || item.post_id || idx}>
                  {catName && (
                    <div className="catName">
                      <AppLink href={getHref(catUrl)}>{catName}</AppLink>
                    </div>
                  )}
                  <div className={styles.card_title}>
                    <AppLink href={link} title={itemTitle}>
                      <h3 className={styles.h3}>{itemTitle}</h3>
                    </AppLink>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ─── Column 3: Ads + Live TV + Videos ─── */}
      <div className={styles.colThree}>
        {showAds && (
          <div className="adsCont showMobileOnly">
            <div id={mobileAdId}></div>
          </div>
        )}

        {showLiveTv && liveTvUrl && (
          <div className={styles.liveTvWebbx}>
            <div id="liveTviframe" className={styles.liveTvIframe}>
              <h2>
                <AppLink href={getHref(liveTvPageUrl)}>
                  <svg>
                    <use href={`${ICONS_SVG}#tv-icon`}></use>
                  </svg>
                  {liveTvTitle}
                </AppLink>
              </h2>
              <iframe
                id="vidgyor_iframe"
                title="live tv"
                src={liveTvUrl}
                width="100%"
                height="460"
                allowFullScreen
                allow="autoplay; fullscreen"
                style={{ minWidth: "200px", border: "none" }}
              />
            </div>
          </div>
        )}

        {showVideos && colThreeVideos.length > 0 && (
          <div className={styles.topNewsVideoWrap}>
            <div className="head">
              <h2 className="h2">
                <AppLink href={getHref(videoPageUrl)} title={videoTitle}>
                  {videoTitle}
                </AppLink>
              </h2>
            </div>
            <Splide
              options={{
                perPage: 1.6,
                gap: "10px",
                arrows: false,
                perMove: 1,
                focus: 0,
                omitEnd: true,
                breakpoints: {
                  1000: { perPage: 1.6 },
                  480: { perPage: 1.6, pagination: false },
                },
              }}
              className={styles.VideosliderHP}
            >
              {colThreeVideos.map((item, idx) => {
                const itemTitle = decodeHtml(item.title || item.post_title || "");
                const link = getLink(item);
                const img = getImg(item);

                return (
                  <SplideSlide key={item.id || item.post_id || idx}>
                    <figure>
                      <AppLink href={link} title={itemTitle}>
                        <div className={styles.imgThumb}>
                          {img ? (
                            <Image
                              width={260}
                              height={150}
                              src={img}
                              alt={itemTitle}
                              title={itemTitle}
                              unoptimized
                              style={{ width: "100%", height: "auto" }}
                            />
                          ) : null}
                          <ThumbnailIcon format="video" />
                        </div>
                        <div className={styles.card_title}>
                          <h3 className={styles.h3}>{itemTitle}</h3>
                        </div>
                      </AppLink>
                    </figure>
                  </SplideSlide>
                );
              })}
            </Splide>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
