import AppLink from "@/components/AppLink";
import Image from "next/image";
import styles from "./ArticleFourNews.module.css";
import {
  decodeHtml,
  getHref,
  getViewMoreUrl,
  getViewMoreLabel,
  ViewMoreLink,
} from "@/lib/helper/commonHelper";
import { ICONS_SVG } from "@/lib/constants";

export default function ArticleFourNewsWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title) || "";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });
  const allItems = items.slice(0, 4);

  if (!allItems.length) return null;

  return (
    <div className={styles.fourNewsWidget_Wrapper}>
      {displayTitle && (
        <div className="tv9common_heading">
          <h2 className="h2">
            {viewMoreUrl && viewMoreUrl !== "#" ? (
              <AppLink href={viewMoreUrl} title={displayTitle}>
                {displayTitle}
              </AppLink>
            ) : (
              displayTitle
            )}
          </h2>
          <ViewMoreLink href={viewMoreUrl} label={viewMoreLabel} />
        </div>
      )}
      <div className={styles.newsGridWrapper}>
        {allItems.map((item, idx) => {
          const img = item.thumbnail || item.image || item.thumb || item.image_url || "";
          const itemTitle = decodeHtml(item.title || item.post_title || "");
          const url = getHref(item.url || item.permalink || item.link || "#");
          const postFormat = (item.post_format || "").toLowerCase();

          return (
            <figure key={item.id || idx}>
              <AppLink href={url} title={itemTitle}>
                {img && (
                  <div className={styles.imgThumb}>
                    <Image
                      width={280}
                      height={157}
                      src={img}
                      alt={itemTitle}
                      title={itemTitle}
                      unoptimized
                    />
                    {postFormat === "video" && (
                      <div className={styles.icon_BG}>
                        <svg width="10" height="12">
                          <use href={`${ICONS_SVG}#v_icon`}></use>
                        </svg>
                      </div>
                    )}
                    {(postFormat === "photo" || postFormat === "gallery") && (
                      <div className={styles.icon_BG}>
                        <svg width="10" height="12">
                          <use href={`${ICONS_SVG}#p_icon`}></use>
                        </svg>
                      </div>
                    )}
                  </div>
                )}
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
