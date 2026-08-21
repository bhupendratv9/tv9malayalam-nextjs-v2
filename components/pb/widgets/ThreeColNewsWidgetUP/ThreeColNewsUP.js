import Image from "next/image";
import { useState, useEffect } from "react";
import AppLink from "@/components/AppLink";
import styles from "./ThreeColNewsUP.module.css";
import { decodeHtml, getHref } from "@/lib/helper/commonHelper";
import { getImg, getLink } from "@/lib/helper/widgetHelper";

function useClientFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;

    fetch(url, { headers: { Accept: "application/json" } })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (cancelled) return;
        let items = [];
        if (Array.isArray(json)) items = json;
        else if (Array.isArray(json?.data)) items = json.data;
        else if (Array.isArray(json?.items)) items = json.items;
        else if (json?.data && typeof json.data === "object") items = [json.data];
        else if (json && typeof json === "object") items = [json];
        setData(items);
      })
      .catch(() => {});

    return () => { cancelled = true; };
  }, [url]);

  return data;
}

function NewsColumn({ columnItems }) {
  if (!columnItems || columnItems.length === 0) return null;

  const bigItem = columnItems[0];
  const smallItems = columnItems.slice(1, 3);

  const bigTitle = decodeHtml(bigItem?.title || bigItem?.post_title || "");
  const bigLink = getLink(bigItem);
  const bigImg = getImg(bigItem);

  return (
    <div className={styles.categoryWidget_Listing}>
      <div className={styles.bigNews_Wrapper}>
        <figure>
          <div className={styles.imgwrap}>
            <AppLink href={bigLink} title={bigTitle}>
              {bigImg ? (
                <Image
                  src={bigImg}
                  width={413}
                  height={232}
                  loading="lazy"
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
              <AppLink href={bigLink} title={bigTitle}>
                {bigTitle}
              </AppLink>
            </h3>
          </div>
        </figure>
      </div>
      <div className={styles.smallNews_Wrapper}>
        {smallItems.map((item, idx) => {
          const itemTitle = decodeHtml(item?.title || item?.post_title || "");
          const link = getLink(item);
          const img = getImg(item);

          return (
            <figure key={item.id || item.post_id || idx}>
              <div className={styles.imgwrap}>
                <AppLink href={link} title={itemTitle}>
                  {img ? (
                    <Image
                      src={img}
                      width={100}
                      height={56}
                      loading="lazy"
                      alt={itemTitle}
                      title={itemTitle}
                      unoptimized
                    />
                  ) : null}
                </AppLink>
              </div>
              <div className={styles.card_title}>
                <h3 className={styles.h3}>
                  <AppLink href={link} title={itemTitle}>
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

function ColumnHeader({ label, link }) {
  if (!label) return null;
  return (
    <div className="common_heading">
      <h2 className="h2">
        {link ? (
          <AppLink href={link} title={label}>{label}</AppLink>
        ) : (
          label
        )}
      </h2>
    </div>
  );
}

export default function ThreeColNewsWidgetUP({
  items = [],
  title = "",
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
}) {
  // First column — data from main endpoint, label/link from widget props
  const firstEndpoint = dataConfig.endpoint || "";
  const firstLabel = decodeHtml(title) || "";
  const firstLink = getHref(view_more_link || sectionUrl || "");

  // Second column
  const secondEndpoint = dataConfig.endpoint_second || "";
  const secondLabel = decodeHtml(dataConfig.endpoint_second_widget_label || "");
  const secondLink = getHref(dataConfig.endpoint_second_widget_link || "");

  // Third column
  const thirdEndpoint = dataConfig.endpoint_third || "";
  const thirdLabel = decodeHtml(dataConfig.endpoint_third_widget_label || "");
  const thirdLink = getHref(dataConfig.endpoint_third_widget_link || "");

  // Client-side fetches
  const firstItems = useClientFetch(firstEndpoint);
  const secondItems = useClientFetch(secondEndpoint);
  const thirdItems = useClientFetch(thirdEndpoint);

  // Use fetched data for first column, fallback to SSR items
  const colOneItems = firstItems.length > 0 ? firstItems : items;

  return (
    <div className={styles.threeColNews_Wrapper}>
      {/* ─── First Column: from main endpoint ─── */}
      <div className={styles.commonCategoryNews_Widget}>
        <ColumnHeader label={firstLabel} link={firstLink} />
        <NewsColumn columnItems={colOneItems} />
      </div>

      {/* ─── Second Column: from endpoint_second ─── */}
      {secondEndpoint && (
        <div className={styles.commonCategoryNews_Widget}>
          <ColumnHeader label={secondLabel} link={secondLink} />
          <NewsColumn columnItems={secondItems} />
        </div>
      )}

      {/* ─── Third Column: from endpoint_third ─── */}
      {thirdEndpoint && (
        <div className={styles.commonCategoryNews_Widget}>
          <ColumnHeader label={thirdLabel} link={thirdLink} />
          <NewsColumn columnItems={thirdItems} />
        </div>
      )}
    </div>
  );
}
