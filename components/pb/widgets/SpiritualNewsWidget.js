import Image from "next/image";
//import { useState, useEffect } from "react";
import { decodeHtml } from "@/lib/helper/commonHelper";
import { getImg, getLink } from "@/lib/helper/widgetHelper";


export default function SpiritualNewsWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
}) {
  const displayTitle = decodeHtml(title) || "";
  const viewMoreUrl = dataConfig.view_more_url || sectionUrl || "#";
  const first = items.length > 0 ? items[0] : null;
  const rest = items.length > 1 ? items.slice(1, 9) : [];

  
  //console.log('Rhs items->', rhsItems);
  return (
    <>
      <div className="spiritualNews_Widget">
        
          
            <div className="tv9common-heading">
              <h2 className="h2">
                <a href={viewMoreUrl} title={displayTitle}>
                  {displayTitle}
                </a>
              </h2>
            </div>

            <div className="spiritualNews_WidgetWrap">
              {/* Big Story */}
              {first && (
                <div className="bigNews_Wrap">
                  <figure>
                    <a
                      href={getLink(first)}
                      title={decodeHtml(first.title) || ""}
                    >
                      {getImg(first) && (
                        <div className="img_wrap">
                          <Image
                            src={getImg(first)}
                            alt={decodeHtml(first.title) || ""}
                            title={decodeHtml(first.title) || ""}
                            width={376}
                            height={212}
                            priority
                            unoptimized
                            style={{ width: "100%", height: "auto" }}
                          />
                        </div>
                      )}
                      <div className="card_title">
                        <div className="h3">{decodeHtml(first.title)}</div>
                        {first.summary && (
                          <div className="desc">{decodeHtml(first.summary)}</div>
                        )}
                      </div>
                    </a>
                  </figure>
                </div>
              )}

              {/* Small Stories */}
              {rest.length > 0 && (
                <div className="smallNews_Wrap">
                  {rest.map((row, idx) => {
                    const img = getImg(row);
                    const itemTitle = decodeHtml(row.title || row.post_title || "");
                    const link = getLink(row);

                    return (
                      <figure key={row.id || row.post_id || idx}>
                        <a href={link} title={itemTitle}>
                          {img && (
                            <div className="img_wrap">
                              <Image
                                src={img}
                                alt={itemTitle}
                                title={itemTitle}
                                width={185}
                                height={105}
                                unoptimized
                                style={{ width: "100%", height: "auto" }}
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
              )}
            </div>
      </div>

      <style jsx>{`
        :root{--horoscopenewswidget-bg:#f8f8f8;}
      .theme-dark{--horoscopenewswidget-bg:#2e2e2e}
      .spiritualNews_Widget{margin-bottom:1.88rem;}
      .spiritualNews_Widget .tv9common-heading{margin-bottom:1.25rem;}
      .spiritualNews_Widget .bigNews_Wrap{margin-bottom:1.28rem}
      .spiritualNews_Widget .bigNews_Wrap figure a{display:grid;grid-template-columns:376px 1fr;gap:1.25rem}
      .spiritualNews_Widget .bigNews_Wrap .img_wrap img{display:block;width:100%;aspect-ratio:16/9}
      .spiritualNews_Widget .bigNews_Wrap .card_title .h3{color:#000;font-size:1.375rem;font-weight:700;line-height:2rem}
      .spiritualNews_Widget .bigNews_Wrap .card_title .desc{color:#000;font-size:1rem;font-weight:300;line-height:1.625rem;text-transform:capitalize;margin-top:1.12rem}
      .spiritualNews_WidgetWrap .smallNews_Wrap{display:grid;grid-template-columns:repeat(4, 1fr);gap:1.25rem}
      .spiritualNews_WidgetWrap .smallNews_Wrap .img_wrap img{display:block;width:100%;aspect-ratio:16/9;margin-bottom:.64rem}
      .spiritualNews_WidgetWrap .smallNews_Wrap .card_title .h3{color:#000;font-size:.875rem;font-weight:700;line-height:1.375rem;text-transform:capitalize;text-overflow:ellipsis;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;display:-webkit-box}
      @media(max-width:767px){
          .spiritualNews_Widget .bigNews_Wrap figure a{grid-template-columns:1fr;gap:0.63rem}
          .spiritualNews_Widget .bigNews_Wrap .card_title .desc{display:none;}
          .spiritualNews_WidgetWrap .smallNews_Wrap{grid-template-columns:repeat(2, 1fr);gap:0.9375rem}
      }
      `}</style>
    </>
  );
}
