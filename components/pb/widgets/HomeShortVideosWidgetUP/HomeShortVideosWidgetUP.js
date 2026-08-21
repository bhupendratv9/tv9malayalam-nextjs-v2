import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./HomeShortVideosWidgetUP.module.css";
import { ICONS_SVG } from "@/lib/constants";
import { decodeHtml, getViewMoreUrl, getViewMoreLabel } from "@/lib/helper/commonHelper";

export default function HomeShortVideosWidgetUP({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title) || "Short Videos";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={styles.shortvideosHomepage_Widget}>
      <div className={styles.common_heading}>
        <h2 className={styles.h2}>
          {viewMoreUrl && viewMoreUrl !== "#" ? (
            <AppLink href={viewMoreUrl} title={displayTitle}>
              {displayTitle}
            </AppLink>
          ) : (
            displayTitle
          )}
        </h2>
      </div>
      <div className={styles.shortWidget_Thumbs}>
        {items.map((row, idx) => {
          const url = row?.url || row?.permalink || "#";
          const titleText = decodeHtml(row?.title || row?.headline || row?.name || "");
          const img =
            row?.image ||
            row?.thumbnail ||
            row?.thumb ||
            row?.image_url ||
            "";
          const cid = row?.id || row?.cid || "";

          return (
            <figure key={cid || idx}>
              <AppLink
                href={url}
                data-pos={idx + 1}
                data-widget={displayTitle}
                data-cid={cid}
                title={titleText}
              >
                <div className={styles.imgwrap}>
                  {img ? (
                    <Image
                      width={228}
                      height={300}
                      src={img}
                      alt={titleText}
                      title={titleText}
                      unoptimized
                      style={{ width: "100%", height: "auto" }}
                    />
                  ) : null}
                  <svg className={styles.playIcon}>
                    <use href={`${ICONS_SVG}#ic_shortvideo`}></use>
                  </svg>
                </div>
              </AppLink>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
