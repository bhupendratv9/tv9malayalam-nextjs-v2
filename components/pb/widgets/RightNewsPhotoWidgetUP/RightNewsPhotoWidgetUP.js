import AppLink from "@/components/AppLink";
import Image from "next/image";
import styles from "./RightNewsPhotoWidgetUP.module.css";
import { ICONS_SVG } from "@/lib/constants";
import { decodeHtml, getViewMoreUrl, getViewMoreLabel } from "@/lib/helper/commonHelper";

function getImage(item) {
  return item.thumbnail || item.image || item.thumb || item.image_url || item.featured_media?.url || "";
}

export default function RightNewsPhotoWidgetUP({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title) || "photo gallery";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl, fallback: "/photo-gallery" });
  const viewMoreLabel = getViewMoreLabel({ view_more_label, fallback: "More photo gallery" });
  const newsItems = Array.isArray(items) ? items.slice(0, 5) : [];

  if (!newsItems || newsItems.length === 0) {
    return null;
  }

  return (
    <div className={styles.rhsLatestPhotos_Wrapper}>
      <div className="common_heading">
        <div className="h2">
          <AppLink href={viewMoreUrl}>{displayTitle}</AppLink>
        </div>
      </div>
      <div className={styles.newsColumn}>
        {newsItems.map((item, idx) => {
          const itemTitle = decodeHtml(item.title || item.headline || item.name || "");
          const itemUrl = item.url || item.permalink || "#";
          const imgSrc = getImage(item);
          const cid = item.id || item.cid || "";

          return (
            <figure key={cid || idx}>
              <AppLink
                href={itemUrl}
                data-pos={idx + 1}
                data-widget={displayTitle}
                data-cid={cid}
                title={itemTitle}
              >
                <div className={styles.imgThumb}>
                  {imgSrc ? (
                    <Image
                      width={320}
                      height={180}
                      src={imgSrc}
                      alt={itemTitle}
                      title={itemTitle}
                      unoptimized
                    />
                  ) : null}
                  <span className="icon_BG">
                    <svg>
                      <use href={`${ICONS_SVG}#ic_photo`}></use>
                    </svg>
                  </span>
                </div>
                <div className={styles.card_title}>
                  <div className={styles.h3}>{itemTitle}</div>
                </div>
              </AppLink>
            </figure>
          );
        })}
        <div className="viewMoreBtn">
          <AppLink href={viewMoreUrl}>{viewMoreLabel}</AppLink>
        </div>
      </div>
    </div>
  );
}
