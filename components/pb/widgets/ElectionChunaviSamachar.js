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

export default function ElectionChunaviSamachar({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
}) {
  const displayTitle = decodeHtml(title) || "";
  const viewMoreUrl = dataConfig.view_more_url || sectionUrl || "#";
  const first = items.length > 0 ? items[0] : null;
  const rest = items.length > 1 ? items.slice(1, 9) : [];

  // RHS news widget config
  const rhsEndpoint = dataConfig.endpoint_second || "";
  const rhsLabel = decodeHtml(dataConfig.endpoint_second_widget_label || "");
  const rhsLink = dataConfig.endpoint_second_widget_link || "#";

  // Client-side fetch for RHS column
  const rhsItems = useClientFetch(rhsEndpoint);

  return (
    <>
      <div className="stateNews_ElecWrapper chunaviSamachar">
        <div className="tv9wrapperMain">
          <div className="main-col">
            <div className="electionHD">
              <h2 className="h2">
                <a href={viewMoreUrl} title={displayTitle}>
                  {displayTitle}
                </a>
              </h2>
            </div>

            <div className="news_widget">
              {/* Big Story */}
              {first && (
                <div className="bigStoryWrapper">
                  <figure>
                    <a
                      href={getLink(first)}
                      title={decodeHtml(first.title) || ""}
                    >
                      {getImg(first) && (
                        <div className="imgThumb">
                          <Image
                            src={getImg(first)}
                            alt={decodeHtml(first.title) || ""}
                            title={decodeHtml(first.title) || ""}
                            width={501}
                            height={282}
                            priority
                            unoptimized
                            style={{ width: "100%", height: "auto" }}
                          />
                        </div>
                      )}
                      <div className="info_wrap">
                        <h3 className="h2">{decodeHtml(first.title)}</h3>
                        {first.summary && (
                          <p>{decodeHtml(first.summary)}</p>
                        )}
                      </div>
                    </a>
                  </figure>
                </div>
              )}

              {/* Small Stories */}
              {rest.length > 0 && (
                <div className="smallStoryWrapper">
                  {rest.map((row, idx) => {
                    const img = getImg(row);
                    const itemTitle = decodeHtml(row.title || row.post_title || "");
                    const link = getLink(row);

                    return (
                      <figure key={row.id || row.post_id || idx}>
                        <a href={link} title={itemTitle}>
                          {img && (
                            <div className="imgThumb">
                              <Image
                                src={img}
                                alt={itemTitle}
                                title={itemTitle}
                                width={225}
                                height={128}
                                unoptimized
                                style={{ width: "100%", height: "auto" }}
                              />
                            </div>
                          )}
                          <div className="info_wrap">
                            <h3 className="h2">{itemTitle}</h3>
                          </div>
                        </a>
                      </figure>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ─── RHS Column: Dynamic news from endpoint_second ─── */}
          <div className="rhs-col">
            <div className="adsCont desktop onlyWebADS">
              <div id="desktop_rhs_sidebar"></div>
            </div>
            <div className="adsCont onlyMobileADS">
              <div id="mobile_top_300x250"></div>
            </div>

            <div className="rhs-newsWidgets">
              {rhsLabel && (
                <div className="tv9common-heading">
                  <span className="h2">
                    <a href={rhsLink} title={rhsLabel}>{rhsLabel}</a>
                  </span>
                  <a href={rhsLink} className="view_more">
                    View more
                    <svg><use xlinkHref="#rgt-arrow"></use></svg>
                  </a>
                </div>
              )}

              <div className="commonstory featured-home">
                {rhsItems.slice(0, 5).map((item, idx) => {
                  const img = getImg(item);
                  const itemTitle = decodeHtml(item.title || item.post_title || "");
                  const link = getLink(item);

                  return (
                    <figure className="smallstory" key={item.id || item.post_id || idx}>
                      <a href={link} title={itemTitle}>
                        <div className="card_title">
                          <span className="h3">{itemTitle}</span>
                        </div>
                        {img && (
                          <div className="imgThumb">
                            <Image
                              src={img}
                              alt={itemTitle}
                              title={itemTitle}
                              width={96}
                              height={54}
                              loading="lazy"
                              unoptimized
                            />
                          </div>
                        )}
                      </a>
                    </figure>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stateNews_ElecWrapper {
          margin-bottom: 1.88rem;
        }
        .stateNews_ElecWrapper .tv9wrapperMain {
          display: flex;
          gap: 1.25rem;
        }
        .stateNews_ElecWrapper .main-col {
          flex: 1;
        }
        .stateNews_ElecWrapper .rhs-col {
          width: 300px;
          flex-shrink: 0;
        }
        .stateNews_ElecWrapper .bigStoryWrapper figure a {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
        }
        .stateNews_ElecWrapper .bigStoryWrapper .imgThumb {
          width: 501px;
          margin-right: 20px;
          margin-bottom: 2rem;
        }
        .stateNews_ElecWrapper .bigStoryWrapper .imgThumb img {
          display: block;
          width: 100%;
          border-radius: 0.25rem;
        }
        .stateNews_ElecWrapper .bigStoryWrapper .info_wrap {
          width: calc(100% - 521px);
        }
        .stateNews_ElecWrapper .bigStoryWrapper .info_wrap .h2 {
          color: #000;
          font-size: 1.9rem;
          font-weight: 700;
          line-height: 2.5rem;
          margin-bottom: 0.94rem;
        }
        .stateNews_ElecWrapper .bigStoryWrapper .info_wrap p {
          color: #000;
          font-size: 1.2rem;
          font-weight: 500;
          line-height: 2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 5;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
        .stateNews_ElecWrapper .smallStoryWrapper {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
        }
        .stateNews_ElecWrapper .smallStoryWrapper figure {
          width: 23.5%;
          margin: 0 2% 2% 0;
        }
        .stateNews_ElecWrapper .smallStoryWrapper figure:nth-child(4n+4) {
          margin-right: 0;
        }
        .stateNews_ElecWrapper .smallStoryWrapper .imgThumb img {
          width: 100%;
          display: block;
          border-radius: 0.25rem;
          margin-bottom: 0.73rem;
        }
        .stateNews_ElecWrapper .smallStoryWrapper .info_wrap .h2 {
          color: #000;
          font-size: 1.125rem;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
        @media (max-width: 767px) {
          .stateNews_ElecWrapper .tv9wrapperMain {
            flex-direction: column;
          }
          .stateNews_ElecWrapper .rhs-col {
            width: 100%;
          }
          .stateNews_ElecWrapper .bigStoryWrapper .imgThumb {
            width: 100%;
            margin-right: 0;
            margin-bottom: 0.62rem;
          }
          .stateNews_ElecWrapper .bigStoryWrapper .info_wrap {
            width: 100%;
          }
          .stateNews_ElecWrapper.chunaviSamachar .bigStoryWrapper .info_wrap p {
            display: none;
          }
          .stateNews_ElecWrapper .smallStoryWrapper {
            flex-wrap: nowrap;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            margin-bottom: 1.88rem;
          }
          .stateNews_ElecWrapper .smallStoryWrapper::-webkit-scrollbar {
            display: none;
          }
          .stateNews_ElecWrapper .smallStoryWrapper figure {
            width: 80%;
            margin-right: 4%;
            flex: 0 0 auto;
          }
          .stateNews_ElecWrapper .smallStoryWrapper figure:nth-child(4n+4) {
            margin-right: 4%;
          }
          .stateNews_ElecWrapper .smallStoryWrapper figure:last-child {
            margin-right: 0;
          }
          .stateNews_ElecWrapper .smallStoryWrapper .info_wrap .h2 {
            overflow: unset;
            -webkit-line-clamp: unset;
          }
        }
      `}</style>
    </>
  );
}
