import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./RelatedPhotosWidget.module.css";
import { ICONS_SVG } from "@/lib/constants";
import { decodeHtml, getViewMoreUrl, getViewMoreLabel } from "@/lib/helper/commonHelper";

export default function RelatedPhotosWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title) || "Related Photos";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={styles.relatedPhotosWidget_Wrapper}>
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
      <div className={styles.photoGallery_Wrapper}>
        {items.slice(0, 4).map((row, idx) => {
          const itemTitle = decodeHtml(row?.title || row?.headline || row?.name || "");
          const itemUrl = row?.url || row?.permalink || "#";
          const img = row?.image || row?.thumbnail || row?.thumb || row?.image_url || "";
          const cid = row?.id || row?.cid || "";
          const imageCount = row?.gallery_count || row?.image_count || "";

          return (
            <figure key={cid || idx}>
              <div className={styles.imgwrap}>
                <AppLink
                  href={itemUrl}
                  data-pos={idx + 1}
                  data-widget={displayTitle}
                  data-cid={cid}
                  title={itemTitle}
                >
                  {img ? (
                    <Image
                      width={400}
                      height={225}
                      src={img}
                      alt={itemTitle}
                      title={itemTitle}
                      unoptimized
                    />
                  ) : null}
                </AppLink>
              </div>
              <div className={styles.card_title}>
                {imageCount && (
                  <div className={styles.media_info}>
                    <span>{imageCount} Images</span>
                    <svg>
                      <use href={`${ICONS_SVG}#ic_photo`}></use>
                    </svg>
                  </div>
                )}
                <h3 className={styles.h3}>
                  <AppLink href={itemUrl} title={itemTitle}>
                    {itemTitle}
                  </AppLink>
                </h3>
              </div>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
