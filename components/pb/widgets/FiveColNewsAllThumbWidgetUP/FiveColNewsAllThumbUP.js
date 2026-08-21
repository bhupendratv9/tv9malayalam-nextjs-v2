import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./FiveColNewsAllThumbUP.module.css";
import { decodeHtml, getViewMoreUrl, getViewMoreLabel } from "@/lib/helper/commonHelper";

function getImage(item) {
  return item.thumbnail || item.image || item.thumb || item.image_url || "";
}

export default function FiveColNewsAllThumbWidgetUP({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title) || "News";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });

  if (!items || items.length === 0) {
    return null;
  }

  const bigItem = items[0];
  const smallItems = items.slice(1, 5);

  const bigTitle = decodeHtml(bigItem?.title || bigItem?.headline || bigItem?.name || "");
  const bigUrl = bigItem?.url || bigItem?.permalink || "#";
  const bigImg = getImage(bigItem);
  const bigCid = bigItem?.id || bigItem?.cid || "";

  return (
    <div className={styles.newsWidgetCol_Wrapper}>
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
      <div className={styles.newsWidgetCol_Listing}>
        <div className={styles.bigNews_Wrapper}>
          <figure>
            <AppLink
              href={bigUrl}
              data-pos={1}
              data-widget={displayTitle}
              data-cid={bigCid}
              title={bigTitle}
            >
              <div className={styles.imgwrap}>
                {bigImg ? (
                  <Image
                    width={350}
                    height={198}
                    src={bigImg}
                    alt={bigTitle}
                    title={bigTitle}
                    unoptimized
                    style={{ width: "100%", height: "auto" }}
                  />
                ) : null}
              </div>
              <div className={styles.card_title}>
                <h3 className={styles.h3}>{bigTitle}</h3>
              </div>
            </AppLink>
          </figure>
        </div>
        <div className={styles.smallNews_Wrapper}>
          {smallItems.map((item, idx) => {
            const itemTitle = decodeHtml(item?.title || item?.headline || item?.name || "");
            const itemUrl = item?.url || item?.permalink || "#";
            const imgSrc = getImage(item);
            const cid = item?.id || item?.cid || "";

            return (
              <figure key={cid || idx}>
                <AppLink
                  href={itemUrl}
                  data-pos={idx + 2}
                  data-widget={displayTitle}
                  data-cid={cid}
                  title={itemTitle}
                >
                  <div className={styles.imgwrap}>
                    {imgSrc ? (
                      <Image
                        width={345}
                        height={194}
                        src={imgSrc}
                        alt={itemTitle}
                        title={itemTitle}
                        unoptimized
                        style={{ width: "100%", height: "auto" }}
                      />
                    ) : null}
                  </div>
                  <div className={styles.card_title}>
                    <h3 className={styles.h3}>{itemTitle}</h3>
                  </div>
                </AppLink>
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}
