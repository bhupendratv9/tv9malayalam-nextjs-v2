import React from "react";
import Image from "next/image";
import { decodeHtml } from "@/lib/helper/commonHelper";
import { getImg, getLink } from "@/lib/helper/widgetHelper";

export default function ElectionRelatedNewsWidget({
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
      <div className="evtRelatedNews_Wrapper">
          <div className="tv9common-heading">
            <h2 className="h2">{displayTitle}</h2>
          </div>
          <div className="evtRelatedNews_Listing">
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
                  <div className="card_title"><h3 className="h3">{decodeHtml(news?.title)}</h3></div>
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
        .evtRelatedNews_Listing{display:flex;justify-content:flex-start;flex-wrap:wrap}
        .evtRelatedNews_Listing figure{width:23.5%;margin:0 2% 2% 0}
        .evtRelatedNews_Listing figure:nth-child(4n+4){margin-right:0}
        .evtRelatedNews_Listing .imgThumb{margin-bottom:10px;position:relative}
        .evtRelatedNews_Listing .imgThumb img{width:100%;display:block;border-radius:4px}
        .evtRelatedNews_Listing .imgThumb .icon_Comn {background: #E21B22;height: 20px;width: 24px;justify-content: center;    border-radius: 4px;left: 0;bottom: 0;}
        .evtRelatedNews_Listing .imgThumb .icon_Comn svg {height: 14px;width: 14px;fill: #e21b22;margin-right: 0;}
        .evtRelatedNews_Listing .card_title .h3{color:#000;font-size:1rem;font-weight:600;line-height:1.625rem}
        .evtRelatedNews_Listing .load-more-btn{background:0 0;cursor:pointer;font-weight:600;font-size:13px;line-height:24px;text-transform:uppercase;color:#dc0000;display:flex;justify-content:center;max-width:100%;width:100%;margin:0 auto;border:0;align-items:Center}
        .evtRelatedNews_Listing .load-more-btn::after{display: none;}
        .evtRelatedNews_Listing .load-more-btn span{font-weight:400;font-size:.875rem;line-height:20px;color:#dc0000;text-transform:capitalize;border:1px solid #d7d7d7;padding:3px 10px;border-radius:30px;background:#fff;display:flex;align-items:center;flex:0 0 auto;width:auto}
        .evtRelatedNews_Listing .load-more-btn svg{width:1.5rem;height:1.5rem;fill:none}
        .loadMoreBtn_v2 {
          width: 150px;
          margin: 0 auto;
          text-align: center;
        }
        @media(max-width:767px){
        .evtRelatedNews_Listing figure{margin-bottom:10px;margin-right:0;width:100%;border-bottom:1px solid #e7e7e7;padding-bottom:10px}
        .evtRelatedNews_Listing figure:first-child{border-bottom:none;padding-bottom:0}
        .evtRelatedNews_Listing figure:first-child a{display:block}
        .evtRelatedNews_Listing figure:first-child .imgThumb{max-width:100%;margin-left:0;margin-bottom:10px}
        .evtRelatedNews_Listing figure:first-child .card_title{width:100%}
        .evtRelatedNews_Listing figure:first-child .card_title .h3{font-size:1.25rem;line-height:32px;font-weight:700}
        .evtRelatedNews_Listing figure a{display:flex;flex-direction:row-reverse}
        .evtRelatedNews_Listing .imgThumb{max-width:90px;margin-left:10px;width:100%;margin-bottom:0;height:min-content;}
        .evtRelatedNews_Listing .card_title{width:calc(100% - 100px)}
        }
        `}</style>
    </>
  );
}