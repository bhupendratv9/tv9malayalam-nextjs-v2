import Image from "next/image";
import { useState, useEffect } from "react";
import { decodeHtml } from "@/lib/helper/commonHelper";
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
  return (
    <div className="newsColumn">
      {columnItems.map((item, idx) => {
        const img = getImg(item);
        const itemTitle = decodeHtml(item.title || item.post_title || "");
        const link = getLink(item);

        return (
          <figure key={item.id || item.post_id || idx}>
            <a href={link} title={itemTitle}>
              {img && (
                <div className="imgThumb">
                  <Image
                    src={img}
                    width={320}
                    height={180}
                    loading="lazy"
                    alt={itemTitle}
                    title={itemTitle}
                    unoptimized
                  />
                </div>
              )}
              <div className="card_title">
                <div className="h3">{itemTitle}</div>
              </div>
            </a>
          </figure>
        );
      })}
    </div>
  );
}

function ColumnHeader({ label, link }) {
  if (!label) return null;
  return (
    <div className="tv9common-heading">
      <h2 className="h2">
        {link ? (
          <a href={link} title={label}>{label}</a>
        ) : (
          label
        )}
      </h2>
      {link && (
        <a href={link} className="view_more">
          View more <svg><use href="/tv9hindi-nextjs/images/icons.svg#rgt-arrow"></use></svg>
        </a>
      )}
    </div>
  );
}

export default function ThreeColumnNewsWidget({ items = [], title = "", dataConfig = {} }) {
  const displayTitle = decodeHtml(title) || "";
  const viewMoreUrl = dataConfig.view_more_url || "";

  // Second column
  const secondEndpoint = dataConfig.endpoint_second || "";
  const secondLabel = decodeHtml(dataConfig.endpoint_second_widget_label || "");
  const secondLink = dataConfig.endpoint_second_widget_link || "";

  // Third column
  const thirdEndpoint = dataConfig.endpoint_third || "";
  const thirdLabel = decodeHtml(dataConfig.endpoint_third_widget_label || "");
  const thirdLink = dataConfig.endpoint_third_widget_link || "";

  // Client-side fetches
  const secondItems = useClientFetch(secondEndpoint);
  const thirdItems = useClientFetch(thirdEndpoint);

  return (
    <div className="threeColNewsGridWrapper">
      {/* ─── First Column: SSR items ─── */}
      <div className="colNewsGrid">
        <ColumnHeader label={displayTitle} link={viewMoreUrl} />
        <NewsColumn columnItems={items} />
      </div>

      {/* ─── Second Column: Client-side from endpoint_second ─── */}
      {secondEndpoint && (
        <>
          <div className="border"></div>
          <div className="colNewsGrid">
            <ColumnHeader label={secondLabel} link={secondLink} />
            <NewsColumn columnItems={secondItems} />
          </div>
        </>
      )}

      {/* ─── Third Column: Client-side from endpoint_third ─── */}
      {thirdEndpoint && (
        <>
          <div className="border"></div>
          <div className="colNewsGrid">
            <ColumnHeader label={thirdLabel} link={thirdLink} />
            <NewsColumn columnItems={thirdItems} />
          </div>
        </>
      )}
    </div>
  );
}
