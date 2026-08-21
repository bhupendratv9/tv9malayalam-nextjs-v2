import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./SixNews.module.css";
import {
  decodeHtml,
  getHref,
  getViewMoreUrl,
  getViewMoreLabel,
  ViewMoreLink,
} from "@/lib/helper/commonHelper";
import { ICONS_SVG } from "@/lib/constants";

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

export default function SixNewsWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title) || "";
  const viewMoreUrl = getViewMoreUrl({
    view_more_link,
    dataConfig,
    sectionUrl,
  });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });
  const allItems = items.slice(0, 6);

  return (
    <div className={styles.homepageSixNewsGrid_Wrapper}>
      {/* Heading */}
      {displayTitle && (
        <div className="tv9common_heading">
          <h2 className="h2">
            <AppLink href={viewMoreUrl} title={displayTitle}>
              {displayTitle}
            </AppLink>
          </h2>
          <ViewMoreLink href={viewMoreUrl} label={viewMoreLabel} />
        </div>
      )}

      <div className={styles.newsGridListing}>
        {allItems.map((item, idx) => (
          <figure key={item.id || idx}>
            <AppLink href={getHref(item.url || item.permalink || item.link || "#")} title={decodeHtml(item.title) || ""}>
              {(item.thumbnail || item.image || item.thumb || item.image_url) && (
                <div className={styles.imgThumb}>
                  <Image
                    src={
                      item.thumbnail || item.image || item.thumb || item.image_url
                    }
                    alt={decodeHtml(item.title) || ""}
                    title={decodeHtml(item.title) || ""}
                    width={320}
                    height={180}
                  />
                  <ThumbnailIcon item={item} />
                </div>
              )}
              <div className={styles.card_title}>
                <h3 className={styles.h3}><LiveBlink item={item} />{decodeHtml(item.title)}</h3>
              </div>
            </AppLink>
          </figure>
        ))}
      </div>
    </div>
  );
}
