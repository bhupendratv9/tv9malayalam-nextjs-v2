import AppLink from "@/components/AppLink";
import Image from "next/image";
import styles from "./SubCategoryCommon.module.css";
import { decodeHtml, getViewMoreUrl, getViewMoreLabel } from "@/lib/helper/commonHelper";

function getImage(item) {
  return item.thumbnail || item.image || item.thumb || item.image_url || "";
}

export default function SubCategoryCommon({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title) || "News";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl });

  if (!items || items.length === 0) {
    return null;
  }

  const displayItems = items.slice(0, 3);
  const bigItem = displayItems[0];
  const smallItems = displayItems.slice(1, 3);

  const bigTitle = decodeHtml(bigItem?.title || bigItem?.headline || bigItem?.name || "");
  const bigUrl = bigItem?.url || bigItem?.permalink || "#";
  const bigImg = getImage(bigItem);
  const bigCid = bigItem?.id || bigItem?.cid || "";
  const bigSummary = decodeHtml(bigItem?.summary || bigItem?.description || bigItem?.excerpt || "");

  return (
    <div className={styles.commonsubCateg_Section}>
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
      <div className={styles.bigNews_Wrapper}>
        <figure>
          <div className={styles.imgwrap}>
            <AppLink
              href={bigUrl}
              data-pos={1}
              data-widget={displayTitle}
              data-cid={bigCid}
              title={bigTitle}
            >
              {bigImg ? (
                <Image
                  width={350}
                  height={197}
                  src={bigImg}
                  alt={bigTitle}
                  title={bigTitle}
                  unoptimized
                  style={{ width: "100%", height: "auto" }}
                />
              ) : null}
            </AppLink>
          </div>
          <div className={styles.card_title}>
            <h3 className={styles.h3}>
              <AppLink
                href={bigUrl}
                data-pos={1}
                data-widget={displayTitle}
                data-cid={bigCid}
                title={bigTitle}
              >
                {bigTitle}
              </AppLink>
            </h3>
            {bigSummary ? <p>{bigSummary}</p> : null}
          </div>
        </figure>
      </div>
      {smallItems.length > 0 && (
        <div className={styles.commonStory_Wrapper}>
          {smallItems.map((item, idx) => {
            const itemTitle = decodeHtml(item?.title || item?.headline || item?.name || "");
            const itemUrl = item?.url || item?.permalink || "#";
            const imgSrc = getImage(item);
            const cid = item?.id || item?.cid || "";

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
                    {imgSrc ? (
                      <Image
                        width={220}
                        height={124}
                        src={imgSrc}
                        alt={itemTitle}
                        title={itemTitle}
                        unoptimized
                        style={{ width: "100%", height: "auto" }}
                      />
                    ) : null}
                  </AppLink>
                </div>
                <div className={styles.card_title}>
                  <h3 className={styles.h3}>
                    <AppLink
                      href={itemUrl}
                      data-pos={idx + 2}
                      data-widget={displayTitle}
                      data-cid={cid}
                      title={itemTitle}
                    >
                      {itemTitle}
                    </AppLink>
                  </h3>
                </div>
              </figure>
            );
          })}
        </div>
      )}
    </div>
  );
}
