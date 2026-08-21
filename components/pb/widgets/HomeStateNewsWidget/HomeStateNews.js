import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./HomeStateNews.module.css";
import { useState, useEffect, useCallback } from "react";
import { decodeHtml, getViewMoreUrl, getViewMoreLabel, ViewMoreLink } from "@/lib/helper/commonHelper";
import { getImg, getLink } from "@/lib/helper/widgetHelper";
import { ICONS_SVG } from "@/lib/constants";

function getPostFormat(item, override) {
  if (override) return override;
  return String(item?.post_format || "post").toLowerCase();
}

function ThumbnailIcon({ item, format }) {
  const postFormat = getPostFormat(item, format);

  if (postFormat === "video") {
    return (
      <span className={styles.icon_BG}>
        <svg><use href={`${ICONS_SVG}#v_icon`}></use></svg>
      </span>
    );
  }

  if (postFormat === "photo" || postFormat === "gallery" || postFormat === "photo-gallery") {
    return (
      <span className={styles.icon_BG}>
        <svg><use href={`${ICONS_SVG}#p_icon`}></use></svg>
      </span>
    );
  }

  return null;
}

export default function HomeStateNewsWidget({ items = [], title = "", dataConfig = {}, view_more_link = null, view_more_label = null }) {
  const displayTitle = decodeHtml(title) || "राज்யம்";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl: null, fallback: "/state" });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });
  const states = Array.isArray(dataConfig.states) ? dataConfig.states : [];

  const [activeIdx, setActiveIdx] = useState(-1); // -1 means show SSR items
  const [stateNews, setStateNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeViewMore, setActiveViewMore] = useState(viewMoreUrl);

  // Fetch news when a state tab is clicked
  const handleStateClick = useCallback((idx) => {
    const state = states[idx];
    if (!state) return;

    setActiveIdx(idx);
    setActiveViewMore(`/state/${state.key}`);
    setLoading(true);

    fetch(state.api_url, { headers: { Accept: "application/json" } })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        let fetched = [];
        if (Array.isArray(json)) fetched = json;
        else if (Array.isArray(json?.data)) fetched = json.data;
        else if (Array.isArray(json?.items)) fetched = json.items;
        else if (json?.data && typeof json.data === "object") fetched = [json.data];
        else if (json && typeof json === "object") fetched = [json];
        setStateNews(fetched);
      })
      .catch(() => setStateNews([]))
      .finally(() => setLoading(false));
  }, [states]);

  // Determine which items to display
  const displayItems = activeIdx === -1 ? items : stateNews;

  return (
    <div className={styles.stateNewsHome_Widget}>
      <div className="tv9common_heading">
        <h2 className="h2">
          {viewMoreUrl && viewMoreUrl !== "#" ? (
            <AppLink href={viewMoreUrl} title={displayTitle}>{displayTitle}</AppLink>
          ) : (
            displayTitle
          )}
        </h2>
        <ViewMoreLink href={activeViewMore} label={viewMoreLabel} />
      </div>
      <div className={styles.stateNewsWidget_Wrapper}>
        {/* State tabs */}
        {states.length > 0 && (
          <ul className={styles.stateLinks}>
            {states.map((state, idx) => (
              <li
                key={state.key || idx}
                className={activeIdx === idx ? styles.active : ""}
                onClick={() => handleStateClick(idx)}
              >
                {state.label}
              </li>
            ))}
          </ul>
        )}

        {/* News grid */}
        <div className={styles.newsGridWrapper}>
          {loading ? (
            <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#999" }}>Loading...</p>
          ) : (
            displayItems.map((item, idx) => {
              const img = getImg(item);
              const itemTitle = decodeHtml(item.title || item.post_title || "");
              const link = getLink(item);

              return (
                <figure key={item.id || item.post_id || idx}>
                  <AppLink href={link} title={itemTitle}>
                    {img && (
                      <div className={styles.imgThumb}>
                        <Image
                          width={320}
                          height={180}
                          src={img}
                          alt={itemTitle}
                          title={itemTitle}
                        />
                        <ThumbnailIcon item={item} />
                      </div>
                    )}
                    <div className={styles.card_title}>
                      <div className={styles.h3}>{itemTitle}</div>
                    </div>
                  </AppLink>
                </figure>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
