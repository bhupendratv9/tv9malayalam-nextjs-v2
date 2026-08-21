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
                    width={320}
                    height={180}
                    loading="lazy"
                    src={img}
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

export default function TwoColumnNewsWidget({ items = [], title = "", dataConfig = {} }) {
  const displayTitle = decodeHtml(title) || "";
  const viewMoreUrl = dataConfig.view_more_url || "";

  // Second column config
  const secondEndpoint = dataConfig.endpoint_second || "";
  const secondLabel = decodeHtml(dataConfig.endpoint_second_widget_label || "");
  const secondLink = dataConfig.endpoint_second_widget_link || "";

  // Client-side fetch for second column
  const secondItems = useClientFetch(secondEndpoint);

  // First column: bound to items from SSR
  const leftItems = items.slice(0, 2);
  const rightItems = items.slice(2, 6);

  return (
    <div className="twoColNewsGridWrapper">
      {/* ─── First Column: SSR items ─── */}
      <div className="colNewsGrid">
        {displayTitle && (
          <div className="tv9common-heading">
            <h2 className="h2">
              {viewMoreUrl ? (
                <a href={viewMoreUrl} title={displayTitle}>{displayTitle}</a>
              ) : (
                displayTitle
              )}
            </h2>
            {viewMoreUrl && (
              <a href={viewMoreUrl} className="view_more">
                View more
                <svg><use href="/tv9hindi-nextjs/images/icons.svg#rgt-arrow"></use></svg>
              </a>
            )}
          </div>
        )}
        <div className="newsGridWrapper">
          <div className="newsColLeft">
            {leftItems.map((item, idx) => {
              const img = getImg(item);
              const itemTitle = decodeHtml(item.title || item.post_title || "");
              const link = getLink(item);

              return (
                <figure key={item.id || item.post_id || idx}>
                  <a href={link} title={itemTitle}>
                    {img && (
                      <div className="imgThumb">
                        <Image
                          width={320}
                          height={180}
                          loading="lazy"
                          src={img}
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
          <div className="newsColRight">
            {rightItems.map((item, idx) => {
              const img = getImg(item);
              const itemTitle = decodeHtml(item.title || item.post_title || "");
              const link = getLink(item);

              return (
                <figure key={item.id || item.post_id || idx}>
                  <a href={link} title={itemTitle}>
                    {img && (
                      <div className="imgThumb">
                        <Image
                          width={320}
                          height={180}
                          loading="lazy"
                          src={img}
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
        </div>
      </div>

      {/* ─── Second Column: Client-side from endpoint_second ─── */}
      {secondEndpoint && (
        <div className="colNewsGrid">
          {secondLabel && (
            <div className="tv9common-heading">
              <h2 className="h2">
                {secondLink ? (
                  <a href={secondLink} title={secondLabel}>{secondLabel}</a>
                ) : (
                  secondLabel
                )}
              </h2>
              {secondLink && (
                <a href={secondLink} className="view_more">
                  View more
                  <svg><use href="/tv9hindi-nextjs/images/icons.svg#rgt-arrow"></use></svg>
                </a>
              )}
            </div>
          )}
          <NewsColumn columnItems={secondItems} />
        </div>
      )}
    </div>
  );
}
