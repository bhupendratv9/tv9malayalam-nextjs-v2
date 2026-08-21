import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./RelatedVideosWidget.module.css";
import { ICONS_SVG } from "@/lib/constants";
import { decodeHtml, getViewMoreUrl, getViewMoreLabel } from "@/lib/helper/commonHelper";

export default function RelatedVideosWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title) || "More Videos";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={styles.relatedVideosWidget_Wrapper}>
      <div className="common_heading">
        <h2 className="h2">
          {viewMoreUrl && viewMoreUrl !== "#" ? (
            <AppLink href={viewMoreUrl} title={displayTitle}>
              {displayTitle}
            </AppLink>
          ) : (
            displayTitle
          )}
        </h2>
      </div>
      <div className={styles.flexFlow_Wrapper}>
        {items.slice(0, 4).map((row, idx) => {
          const itemTitle = decodeHtml(row?.title || row?.headline || row?.name || "");
          const itemUrl = row?.url || row?.permalink || "#";
          const img = row?.image || row?.thumbnail || row?.thumb || row?.image_url || "";
          const cid = row?.id || row?.cid || "";

          return (
            <figure key={cid || idx}>
              <AppLink
                href={itemUrl}
                data-pos={idx + 1}
                data-widget={displayTitle}
                data-cid={cid}
                title={itemTitle}
              >
                <div className={styles.imgwrap}>
                  {img ? (
                    <Image
                      width={216}
                      height={134}
                      src={img}
                      alt={itemTitle}
                      title={itemTitle}
                      unoptimized
                    />
                  ) : null}
                  <svg className={styles.playIcon}>
                    <use href={`${ICONS_SVG}#ic_play`}></use>
                  </svg>
                </div>
                <div className={styles.card_title}>
                  <h3 className={styles.h3}>
                    {itemTitle}
                  </h3>
                </div>
              </AppLink>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
