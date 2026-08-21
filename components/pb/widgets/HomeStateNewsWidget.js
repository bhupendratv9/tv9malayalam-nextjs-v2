import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { decodeHtml, getViewMoreUrl, getViewMoreLabel, ViewMoreLink } from "@/lib/helper/commonHelper";

function getImg(item) {
  return item?.thumbnail || item?.image || item?.thumb || item?.image_url || item?.featured_image || "";
}

function getLink(item) {
  return item?.permalink || item?.url || item?.link || "#";
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
    <>
      <div className="stateNewsHome_Widget">
        <div className="tv9common-heading">
          <h2 className="h2">
            <a href={viewMoreUrl} title={displayTitle}>{displayTitle}</a>
          </h2>
          <ViewMoreLink href={activeViewMore} label={viewMoreLabel} />
        </div>
        <div className="stateNewsWidget_Wrapper">
          {/* State tabs */}
          {states.length > 0 && (
            <ul className="stateLinks">
              {states.map((state, idx) => (
                <li
                  key={state.key || idx}
                  className={`nav ${activeIdx === idx ? "active" : ""}`}
                  onClick={() => handleStateClick(idx)}
                >
                  {state.label}
                </li>
              ))}
            </ul>
          )}

          {/* News grid */}
          <div className="newsGridWrapper">
            {loading ? (
              <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#999" }}>Loading...</p>
            ) : (
              displayItems.map((item, idx) => {
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
              })
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
      .stateNewsHome_Widget{margin-bottom:1.25rem}
      .stateNewsWidget_Wrapper .stateLinks{display:flex;flex-wrap:nowrap;overflow-x:auto;overflow-y:hidden;align-items:center;-webkit-overflow-scrolling:touch;margin-bottom:.9375rem;list-style:none;padding:0}
      .stateNewsWidget_Wrapper .stateLinks::-webkit-scrollbar{display:none}
      .stateNewsWidget_Wrapper .stateLinks li.nav{padding:2px 10px;font-size:.875rem;color:#4B4B4B;cursor:pointer;border:1px solid #D7D7D7;border-radius:50px;margin-right:.625rem;white-space:nowrap}
      .stateNewsWidget_Wrapper .stateLinks li:last-child{margin-right:0}
      .stateNewsWidget_Wrapper .stateLinks li.active{border-color:#dc0000;color:#dc0000}
      .stateNewsWidget_Wrapper .stateLinks li:hover{border-color:#dc0000;color:#dc0000}
      .stateNewsWidget_Wrapper .newsGridWrapper{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
      .stateNewsWidget_Wrapper .newsGridWrapper .imgThumb{width:100%;border-radius:4px;aspect-ratio:16/9;position:relative;overflow:hidden;display:block;height:max-content;margin-bottom:.625rem}
      .stateNewsWidget_Wrapper .newsGridWrapper .card_title .h3{font-size:1rem;font-weight:700;line-height:1.625rem;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;line-clamp:3;-webkit-box-orient:vertical}
      @media (max-width:767px){
      .stateNewsWidget_Wrapper .newsGridWrapper{grid-template-columns:1fr;gap:0}
      .stateNewsWidget_Wrapper .newsGridWrapper figure{margin-bottom:.9375rem;padding-bottom:.9375rem;border-bottom:1px solid #D7D7D7}
      .stateNewsWidget_Wrapper .newsGridWrapper figure:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
      .stateNewsWidget_Wrapper .newsGridWrapper figure a{display:grid;grid-template-columns:1fr 90px;gap:10px}
      .stateNewsWidget_Wrapper .newsGridWrapper .imgThumb{order:2;position:relative;height:max-content}
      .stateNewsWidget_Wrapper .newsGridWrapper .imgThumb img{margin-bottom:0}
      .stateNewsWidget_Wrapper .newsGridWrapper .card_title .h3{font-size:.9375rem;font-weight:600;line-height:1.375rem;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:3;line-clamp:3;display:-webkit-box;-webkit-box-orient:vertical}
      .stateNewsWidget_Wrapper .newsGridWrapper figure:first-child{padding-bottom:0;border-bottom:none}
      .stateNewsWidget_Wrapper .newsGridWrapper figure:first-child a{grid-template-columns:1fr}
      .stateNewsWidget_Wrapper .newsGridWrapper figure:first-child .imgThumb{order:unset}
      .stateNewsWidget_Wrapper .newsGridWrapper figure:first-child .card_title .h3{font-size:1.25rem;line-height:1.875rem;font-weight:700}
      }
      `}</style>
    </>
  );
}
