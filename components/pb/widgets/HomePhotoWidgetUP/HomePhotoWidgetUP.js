import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./HomePhotoWidgetUP.module.css";
import { ICONS_SVG } from "@/lib/constants";
import { decodeHtml, getViewMoreUrl, getViewMoreLabel } from "@/lib/helper/commonHelper";

export default function HomePhotoWidgetUP({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title) || "Photos Gallery";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={styles.photoGalleryHP_Widget}>
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

          let photoCount =
            row?.photo_count || row?.count || row?.gallery_count || 0;

          if (!photoCount || Number(photoCount) <= 0) {
            photoCount = 1;
          }

          return (
            <figure key={cid || idx}>
              <div className={styles.imgwrap}>
                <AppLink href={url} title={titleText}>
                  {img ? (
                    <Image
                      width={400}
                      height={225}
                      src={img}
                      alt={titleText}
                      title={titleText}
                      unoptimized
                      style={{ width: "100%", height: "auto" }}
                    />
                  ) : null}
                </AppLink>
              </div>
              <div className={styles.card_title}>
                <div className={styles.media_info}>
                  <span>{Number(photoCount)} Images</span>
                  <svg>
                    <use href={`${ICONS_SVG}#ic_photo`}></use>
                  </svg>
                </div>
                <h3 className={styles.h3}>
                  <AppLink
                    href={url}
                    data-pos={idx + 1}
                    data-widget={displayTitle}
                    data-cid={cid}
                    title={titleText}
                  >
                    {titleText}
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
