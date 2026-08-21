import React from "react";
import Image from "next/image";
import { decodeHtml } from "@/lib/helper/commonHelper";

function getImg(item) {
  return item?.thumbnail || item?.image || item?.thumb || item?.image_url || item?.featured_image || "";
}

function getLink(item) {
  return item?.permalink || item?.url || item?.link || "#";
}

export default function RashiphalRelatedNewsWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  }) {
    const displayTitle  = decodeHtml(title) || "";
    const viewMoreUrl   = dataConfig.view_more_url || sectionUrl || "#";
    const viewMoreLabel = dataConfig.view_more_label || "View More";
    const newsData = items.length > 0 ? items.slice(0, 8) : [];
    
    const handleLoadMore = () => {
      // your logic here
    };

  return (
    <>
      <div className="horoscopeNews_Widget">
          <div className="tv9common-heading">
            <h2 className="h2"><a href={viewMoreUrl}>{displayTitle}</a></h2>
          </div>
          <div className="horoscopeNews_Listing">
            {newsData.map((news, index) => (
              <figure key={index}>
                <a href={news.url} title={decodeHtml(news?.title)}>
                    <div className="imgThumb">
                      <Image
                        src={news.image}
                        alt={decodeHtml(news?.title)}
                        title={decodeHtml(news?.title)}
                        width={320}
                        height={180}
                      />
                    </div>
                  <div className="card_title"><div className="h3">{decodeHtml(news?.title)}</div></div>
                </a>
              </figure>
            ))}
          </div>

          <div className="loadMoreBtn_v2 viewMoreBtn">
            <button
              type="button"
              className="load-more-btn"
              onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        
      </div>
      <style jsx>{`
        .loadMoreBtn_v2 {
          width: 150px;
          margin: 0 auto;
          text-align: center;
        }
          .horoscopeNews_Widget{margin-bottom:1.88rem;}
          .horoscopeNews_Widget .tv9common-heading{margin-bottom:1.25rem;padding-bottom:0;}
          .horoscopeNews_Widget .horoscopeNews_Listing{display:grid;grid-template-columns:repeat(3, 1fr);gap:20px}
          .horoscopeNews_Widget .horoscopeNews_Listing .imgThumb img{border-radius:4px;display:block;width:100%;aspect-ratio:16/9;margin-bottom:0.63rem;}
          .horoscopeNews_Widget .horoscopeNews_Listing .card_title .h3{font-size: 16px;line-height: 26px;font-weight: 600;}
          .horoscopeNews_Widget .horoscopeNews_Listing .load-more-btn{grid-column: span 3;}
          .load-more-btn{background:none;cursor:pointer;font-weight: 600;font-size: 13px;line-height: 24px;text-transform: uppercase;color: #DC0000;display:flex;justify-content:center;width:115px;margin:0 auto;border:0;align-items:Center;padding-bottom:10px}
          .load-more-btn::after{content: "";display: inline-block;width: 6px;height: 6px;border: solid #dc0000;border-width: 0 2px 2px 0;margin: -1px 0 0 3px;vertical-align: middle;-webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);-ms-transform: rotate(-45deg);-o-transform: rotate(-45deg);transform: rotate(-45deg);}
          .horoscopeNews_Widget .horoscopeNews_Listing figure .imgThumb{position: relative;}
          @media(max-width:767px){
              .horoscopeNews_Widget .horoscopeNews_Listing{grid-template-columns:1fr;gap:0}
              .horoscopeNews_Widget .horoscopeNews_Listing figure{margin-bottom:0.63rem;padding-bottom:0.63rem;border-bottom:1px solid #E7E7E7;}
              .horoscopeNews_Widget .horoscopeNews_Listing figure a{display:grid;grid-template-columns:100px 1fr;gap:0.63rem;}
              .horoscopeNews_Widget .horoscopeNews_Listing .imgThumb img{margin-bottom:0;}
              .horoscopeNews_Widget .horoscopeNews_Listing .load-more-btn{grid-column: span 1;}
              .horoscopeNews_Widget .horoscopeNews_Listing figure:first-child{border-bottom:none;}
              .horoscopeNews_Widget .horoscopeNews_Listing figure:first-child a{grid-template-columns: 1fr;}
              .horoscopeNews_Widget .horoscopeNews_Listing figure:first-child .card_title .h3{font-size: 20px;
              line-height: 32px;font-weight: 700;}
          }
        `}</style>
    </>
  );
}