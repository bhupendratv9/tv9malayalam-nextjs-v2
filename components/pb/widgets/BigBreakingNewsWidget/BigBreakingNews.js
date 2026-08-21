"use client";

import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./BigBreakingNews.module.css";
import { decodeHtml, getViewMoreUrl } from "@/lib/helper/commonHelper";
import { ICONS_SVG } from "@/lib/constants";

function getImage(item) {
  return item.thumbnail || item.image || item.thumb || item.image_url || "";
}

function getUrl(item) {
  return item.url || item.permalink || item.link || "#";
}

function getTitle(item) {
  return item.title || item.headline || item.name || item.post_title || "";
}

/**
 * Extract posts from various API response structures.
 * Handles: items[], data.items[0].posts[], data.posts[], etc.
 */
function resolvePosts(items, data) {
  // 1. If items has normalized posts directly (server-side resolved)
  if (items && items.length > 0) {
    // Check if items[0] has nested posts (API structure: items[0].posts)
    if (items[0]?.posts && Array.isArray(items[0].posts)) {
      return items[0].posts;
    }
    // Check if items[0] has nested items with posts (data object passed as item)
    if (items[0]?.items && Array.isArray(items[0].items) && items[0].items[0]?.posts) {
      return items[0].items[0].posts;
    }
    // Items are already flat posts
    if (items[0]?.title || items[0]?.permalink || items[0]?.thumbnail) {
      return items;
    }
  }

  // 2. From data prop (client-side fetch)
  if (data?.data?.items?.[0]?.posts) return data.data.items[0].posts;
  if (data?.data?.posts) return data.data.posts;
  if (data?.items?.[0]?.posts) return data.items[0].posts;
  if (data?.posts) return data.posts;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data)) return data;

  return [];
}

function handleShare(title, url) {
  if (!url || url === "#") return;

  if (navigator.share) {
    navigator
      .share({ title, url })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Share failed:", err);
        }
      });
  } else {
    // Fallback: open WhatsApp share in popup (same as detail page)
    const shareText = encodeURIComponent(title);
    const shareUrl = encodeURIComponent(url);
    const whatsappUrl =
      "https://api.whatsapp.com/send?text=To know more on %22" +
      shareText +
      "%22, click the link - " +
      shareUrl +
      "%3Futm_source%3Dreferral%26utm_medium%3DWA%26utm_campaign%3Dsocial_share";
    window.open(whatsappUrl, "Whatsapp", "width=640,height=580");
  }
}

export default function BigBreakingNews({
  title = "",
  items = [],
  data = null,
  section = null,
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const posts = resolvePosts(items, data || section?.data);

  // Extract metadata (text_column5/text_column6) from the raw API structure
  // These fields are siblings to `posts` inside items[0].items[0]
  const rawItems = items?.[0]?.items?.[0]
    || data?.data?.items?.[0]?.items?.[0]
    || data?.items?.[0]?.items?.[0]
    || section?.data?.data?.items?.[0]?.items?.[0]
    || {};
  const apiLabel = rawItems.text_column5 || "";
  const apiColor = rawItems.text_column6 || "";

  const topLabel = apiLabel || decodeHtml(title) || dataConfig.label || "BIG Breaking";
  const isBlack = apiColor === "black" || (!apiColor && dataConfig.theme === "black");
  const bgColor = apiColor && apiColor !== "black" ? apiColor : "";

  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl });
  const topLink = viewMoreUrl || dataConfig.labelUrl || "#";

  if (!posts || posts.length === 0) {
    return null;
  }

  // First item is the main/big story
  const bigItem = posts[0];
  // Next 3 items are secondary stories
  const smallItems = posts.slice(1, 4);

  const bigTitle = decodeHtml(getTitle(bigItem));
  const bigUrl = getUrl(bigItem);
  const bigImg = getImage(bigItem);
  const bigCid = bigItem?.id || bigItem?.cid || "";
  const bigSummary = decodeHtml(bigItem?.summary || bigItem?.description || bigItem?.excerpt || "");
  const mainStoryText = bigTitle;
  const videoUrl = bigItem?.videoUrl || bigItem?.video_url || dataConfig.videoUrl || "";

  return (
    <div
      className={`${styles.commonBreaking_Wrapper}${isBlack ? " " + styles.breakingBlack : ""}`}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      <div className={styles.bigStoryWrap}>
        <div className={styles.cardTitle}>
          <div className={styles.breakinghead}>
            <div className={styles.h2}>
              <i className={styles.blinker}></i>
              <AppLink href={topLink} title={topLabel}>
                <span>{topLabel}</span>
              </AppLink>
            </div>
            <button
              type="button"
              className={styles.shareIcon}
              onClick={() => handleShare(bigTitle, bigUrl)}
              aria-label="Share this article"
            >
              <span>
                <svg aria-hidden="true" focusable="false">
                  <use href={`${ICONS_SVG}#shareIcon`}></use>
                </svg>
              </span>
            </button>
          </div>

          <div className={styles.h3}>
            <AppLink
              href={bigUrl}
              data-pos={1}
              data-widget={topLabel}
              data-cid={bigCid}
              title={bigTitle}
            >
              {mainStoryText}
            </AppLink>
          </div>
        </div>

        {videoUrl ? (
          <div className={styles.imgThumb}>
            <iframe
              src={videoUrl}
              width={466}
              height={261}
              allowFullScreen
              allow="autoplay; encrypted-media"
              title={bigTitle}
              loading="lazy"
            />
          </div>
        ) : (
          <div className={styles.imgThumb}>
            <AppLink
              href={bigUrl}
              data-pos={1}
              data-widget={topLabel}
              data-cid={bigCid}
              title={bigTitle}
            >
              {bigImg ? (
                <Image
                  width={466}
                  height={261}
                  src={bigImg}
                  alt={bigTitle}
                  title={bigTitle}
                  unoptimized
                  style={{ width: "100%", height: "auto" }}
                />
              ) : null}
            </AppLink>
          </div>
        )}
      </div>

      {smallItems.length > 0 && (
        <div className={styles.bigStoryList_Wrap}>
          {smallItems.map((item, idx) => {
            const itemTitle = decodeHtml(getTitle(item));
            const itemUrl = getUrl(item);
            const imgSrc = getImage(item);
            const cid = item?.id || item?.cid || "";

            return (
              <div className={styles.smallStory_Card} key={cid || idx}>
                <AppLink
                  href={itemUrl}
                  data-pos={idx + 2}
                  data-widget={topLabel}
                  data-cid={cid}
                  title={itemTitle}
                >
                  <div className={styles.imgThumb}>
                    {imgSrc ? (
                      <Image
                        width={360}
                        height={203}
                        src={imgSrc}
                        alt={itemTitle}
                        title={itemTitle}
                        unoptimized
                        style={{ width: "100%", height: "auto" }}
                      />
                    ) : null}
                  </div>
                  <div className={styles.cardTitle}>
                    <div className={styles.h3}>{itemTitle}</div>
                  </div>
                </AppLink>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
