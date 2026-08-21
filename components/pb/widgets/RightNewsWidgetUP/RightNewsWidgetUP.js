import AppLink from "@/components/AppLink";
import Image from "next/image";
import styles from "./RightNewsWidgetUP.module.css";
import { decodeHtml, getViewMoreUrl, getViewMoreLabel } from "@/lib/helper/commonHelper";

function getImage(item) {
  return item.thumbnail || item.image || item.thumb || item.image_url || item.featured_media?.url || "";
}

export default function RightNewsWidgetUP({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title) || "Latest News";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });
  const newsItems = Array.isArray(items) ? items.slice(0, 10) : [];

  if (!newsItems || newsItems.length === 0) {
    return null;
  }

  return (
    <div className={styles.rhsLatestNews_Wrapper}>
      <div className="common_heading">
        <div className="h2">
          {viewMoreUrl && viewMoreUrl !== "#" ? (
            <AppLink href={viewMoreUrl} title={displayTitle}>
              {displayTitle}
            </AppLink>
          ) : (
            displayTitle
          )}
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
                </div>
                <div className={styles.card_title}>
                  <span className={styles.h3}>{itemTitle}</span>
                </div>
              </AppLink>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
