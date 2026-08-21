import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./HomeVideoWidgetUP.module.css";
import { ICONS_SVG } from "@/lib/constants";
import { decodeHtml, getViewMoreUrl, getViewMoreLabel } from "@/lib/helper/commonHelper";

export default function HomeVideoWidgetUP({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title) || "Videos";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });

  if (!items || items.length === 0) {
    return null;
  }

  const leadItem = items[0];
  const smallItems = items.slice(1, 5);

  const leadTitle = decodeHtml(leadItem?.title || leadItem?.headline || leadItem?.name || "");
  const leadUrl = leadItem?.url || leadItem?.permalink || "#";
  const leadImg = leadItem?.image || leadItem?.thumbnail || leadItem?.thumb || leadItem?.image_url || "";
  const leadCid = leadItem?.id || leadItem?.cid || "";
  const leadCatName = leadItem?.category_name || leadItem?.cat_name || "";
  const leadCatUrl = leadItem?.category_url || leadItem?.cat_url || "#";

  return (
    <div className={styles.videoGalleryHP_Widget}>
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
      <div className={styles.videoGallery_Wrapper}>
        <div className={styles.leadNews_Wrapper}>
          <figure>
            <div className={styles.imgwrap}>
              <AppLink
                href={leadUrl}
                data-pos={1}
                data-widget={displayTitle}
                data-cid={leadCid}
                title={leadTitle}
              >
                {leadImg ? (
                  <Image
                    width={800}
                    height={452}
                    src={leadImg}
                    alt={leadTitle}
                    title={leadTitle}
                    unoptimized
                    style={{ width: "100%", height: "auto" }}
                  />
                ) : null}
                <svg className={styles.playIcon}>
                  <use href={`${ICONS_SVG}#ic_play`}></use>
                </svg>
              </AppLink>
            </div>
            <div className={styles.card_title}>
              {leadCatName && (
                <div className={styles.catName}>
                  <AppLink href={leadCatUrl} title={leadCatName}>
                    {leadCatName}
                  </AppLink>
                </div>
              )}
              <h3 className={styles.h3}>
                <AppLink href={leadUrl} title={leadTitle}>
                  {leadTitle}
                </AppLink>
              </h3>
            </div>
          </figure>
        </div>
        <div className={styles.commonStory_Wrapper}>
          {smallItems.map((row, idx) => {
            const itemTitle = decodeHtml(row?.title || row?.headline || row?.name || "");
            const itemUrl = row?.url || row?.permalink || "#";
            const img = row?.image || row?.thumbnail || row?.thumb || row?.image_url || "";
            const cid = row?.id || row?.cid || "";
            const catName = row?.category_name || row?.cat_name || "";
            const catUrl = row?.category_url || row?.cat_url || "#";

            return (
              <figure key={cid || idx}>
                <div className={styles.imgwrap}>
                  <AppLink
                    href={itemUrl}
                    data-pos={idx + 2}
                    data-widget={displayTitle}
                    data-cid={cid}
                    title={itemTitle}
                  >
                    {img ? (
                      <Image
                        width={167}
                        height={102}
                        src={img}
                        alt={itemTitle}
                        title={itemTitle}
                        unoptimized
                      />
                    ) : null}
                    <svg className={styles.playIcon}>
                      <use href={`${ICONS_SVG}#ic_play`}></use>
                    </svg>
                  </AppLink>
                </div>
                <div className={styles.card_title}>
                  {catName && (
                    <div className={styles.catName}>
                      <AppLink href={catUrl} title={catName}>
                        {catName}
                      </AppLink>
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
    </div>
  );
}
