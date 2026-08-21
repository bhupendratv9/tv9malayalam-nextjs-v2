import AppLink from "@/components/AppLink";
import Image from "next/image";
import styles from "./RightNews.module.css";
import { getHref, decodeHtml, getViewMoreUrl, getViewMoreLabel, ViewMoreLink } from "@/lib/helper/commonHelper";
import { ICONS_SVG } from "@/lib/constants";

function getImage(item) {
  return item.thumbnail || item.image || item.thumb || item.image_url || item.featured_media?.url || "";
}

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

export default function RightNewsWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title) || "சமீபத்திய செய்திகள்";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl, fallback: "/latest-news" });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });
  const newsItems = Array.isArray(items) ? items.slice(0, 10) : [];

  return (
    <div className={styles.rhsLatestNews_Wrapper}>
      {/* Heading */}
      <div className="tv9common_heading">
        <div className="h2">
          <AppLink href={viewMoreUrl} title={displayTitle}>{displayTitle}</AppLink>
        </div>
        <ViewMoreLink href={viewMoreUrl} label={viewMoreLabel} />
      </div>

      {/* News items */}
      <div className={styles.newsColumn}>
        {newsItems.map((item, idx) => {
          const itemTitle = decodeHtml(item.title) || "";
          const itemUrl = getHref(item.url || item.permalink || "#");
          const imgSrc = getImage(item);

          return (
            <figure key={item.id || idx}>
              <AppLink href={itemUrl} title={itemTitle}>
                {imgSrc && (
                  <div className={styles.imgThumb}>
                    <Image
                      width={320}
                      height={180}
                      src={imgSrc}
                      alt={itemTitle}
                      title={itemTitle}
                    />
                    <ThumbnailIcon item={item} />
                  </div>
                )}
                <div className={styles.card_title}>
                  <span className={styles.h3}><LiveBlink item={item} />{itemTitle}</span>
                </div>
              </AppLink>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
