import Image from "next/image";
import { useState, useEffect } from "react";
import { decodeHtml } from "@/lib/helper/commonHelper";

function getImg(item) {
  return item?.thumbnail || item?.image || item?.thumb || item?.image_url || item?.featured_image || "";
}

function getLink(item) {
  return item?.permalink || item?.url || item?.link || "#";
}

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

export default function RightSidebarElectionNewsWidget({
  title      = "",
  items      = [],
  dataConfig = {},
}) {
  const displayTitle = decodeHtml(title) || "";
  const first = items.length > 0 ? items[0] : null;
  const rest = items.length > 1 ? items.slice(1, 9) : [];

  // RHS news widget config
  const rhsEndpoint = dataConfig.endpoint_second || "";
  const rhsLabel = decodeHtml(dataConfig.endpoint_second_widget_label || "");
  const rhsLink = dataConfig.endpoint_second_widget_link || "#";
  const PostFormat = dataConfig.postformat || "";

  // Client-side fetch for RHS column
  const rhsItems = useClientFetch(rhsEndpoint);
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
      <symbol id="v_icon" viewBox="0 0 10 12">
        <path d="M0.916656 0.75L9.08332 6L0.916656 11.25V0.75Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
      </symbol>
    </svg>
      <div className="chunavi-news">
            <div className="tv9common-heading">
              <h2 className="h2">
                  {displayTitle}
              </h2>
            </div>
              {/* Big Story */}
              {first && (
                <div className="bigNews_Wrapper">
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
                            width={320}
                            height={180}
                            unoptimized
                            style={{ width: "100%", height: "auto" }}
                          />
                          {PostFormat?.toLowerCase().trim() === "video" && (
                          <span className="icon_Comn"><svg><use href="#v_icon"></use></svg></span>
                          )}
                        </div>
                      )}
                      <div className="card_title">
                        <span className="h3">{decodeHtml(first.title)}</span>
                      </div>
                    </a>
                  </figure>
                </div>
              )}

              {/* Small Stories */}
              {rest.length > 0 && (
                <div className="smallstory">
                  {rest.map((row, idx) => {
                    const img = getImg(row);
                    const itemTitle = decodeHtml(row.title || row.post_title || "");
                    const link = getLink(row);

                    return (
                      <figure key={row.id || row.post_id || idx}>
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
                                width={320}
                                height={180}
                                unoptimized
                                style={{ width: "100%", height: "auto" }}
                              />
                              {PostFormat?.toLowerCase().trim() === "video" && (
                                <span className="icon_Comn"><svg><use href="#v_icon"></use></svg></span>
                              )}
                            </div>
                          )}
                        </a>
                      </figure>
                    );
                  })}
                </div>
              )}
            
          

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

      <style jsx>{`
        .chunavi-news {padding:0.625rem 0;}
        .chunavi-news .tv9common-heading:before{content:none;}
        .chunavi-news .bigNews_Wrapper{padding-bottom: 0.94rem;}
        .chunavi-news .bigNews_Wrapper .imgThumb {margin-bottom: 0.625rem;position: relative;}
        .chunavi-news .bigNews_Wrapper .imgThumb img {position: relative;display: block;aspect-ratio: 16/9;border-radius: 4px;width: 100%;}
        .chunavi-news .bigNews_Wrapper .card_title .h3{font-size:18px;font-weight:700;line-height:26px;display: block;}
        .chunavi-news .smallstory figure a {border-bottom: 1px solid #d7d7d7;display: flex;justify-content: space-between;padding: 0px 0px 15px 0px;margin-bottom: 15px;}
        .chunavi-news .smallstory figure a .h3 {font-size: 15px;font-weight: 600;line-height: 22px;display: block;}
        .chunavi-news .smallstory figure .imgThumb {max-width: 90px;margin-left: 10px;width: 100%;position: relative;}
        .chunavi-news .smallstory figure .imgThumb img {width: 100%;border-radius: 4px;aspect-ratio: 16/9;position: relative;display: block;height: min-content;}
        .chunavi-news .smallstory figure:last-child a{border-bottom:none;}
        .chunavi-video{padding:0.625rem 0;}
        .chunavi-video .tv9common-heading:before{content:none;}
        .chunavi-video .bigNews_Wrapper{padding-bottom: 0.94rem;}
        .chunavi-video .bigNews_Wrapper .imgThumb {margin-bottom: 0.625rem;position: relative;}
        .chunavi-video .bigNews_Wrapper .imgThumb img {position: relative;display: block;aspect-ratio: 16/9;border-radius: 4px;width: 100%;}
        .chunavi-video .bigNews_Wrapper .card_title .h3{font-size:18px;font-weight:700;line-height:26px;display: block;}
        .chunavi-video .smallstory figure a {border-bottom: 1px solid #d7d7d7;display: flex;justify-content: space-between;padding: 0px 0px 15px 0px;margin-bottom: 15px;}
        .chunavi-video .smallstory figure a .h3 {font-size: 15px;font-weight: 600;line-height: 22px;display: block;}
        .chunavi-video .smallstory figure .imgThumb {max-width: 90px;margin-left: 10px;width: 100%;position: relative;}
        .chunavi-video .smallstory figure .imgThumb img {width: 100%;border-radius: 4px;aspect-ratio: 16/9;position: relative;display: block;height: min-content;}
        .icon_Comn {background: #E21B22;height: 20px;width: 24px;justify-content: center;border-radius: 4px;left: 0;bottom: 0;position: absolute;display: flex;
            align-items: center;}
        .icon_Comn svg {height: 14px;width: 14px;fill: #E21B22;margin-right: 0;}
        .chunavi-video .smallstory figure:last-child a{border-bottom:0;}
      `}</style>
    </>
  );
}
