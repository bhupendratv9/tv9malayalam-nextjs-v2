import Image from "next/image";
import { decodeHtml } from "@/lib/helper/commonHelper";

/* ─── Main Sports9TopNewsWidget ─── */

export default function IplSports9TopNewsWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
}) {
  const displayTitle = decodeHtml(title) || "स्पोर्ट्स समाचार";
  const viewMoreUrl = dataConfig.view_more_url || sectionUrl || "#";
  const viewMoreText = dataConfig.view_more_text || "और पढ़े";
  const first = items.length > 0 ? items[0] : null;
  const rest = items.length > 1 ? items.slice(1) : [];

  if (!items || items.length === 0) return null;

  return (
    <>
      
        <div class="common_section">
            	<div class="sports_heading"> 
					<h1 class="h1">{displayTitle}</h1>
                </div>
            </div>
          <div className="Sports_TopNews">
            <div className="spTopNews_Listing">
              {/* BIG STORY */}
              {first && (
                <figure>
                  <a href={first.url || "#"} title={decodeHtml(first.title) || ""}>
                    {(first.image || first.thumbnail || first.thumb || first.image_url) && (
                      <div className="imgThumb">
                        <Image
                          src={first.image || first.thumbnail || first.thumb || first.image_url}
                          alt={decodeHtml(first.title) || ""}
                          title={decodeHtml(first.title) || ""}
                          width={460}
                          height={259}
                          priority
                          unoptimized
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    )}
                    <div className="card_title">
                      <span className="h3">{decodeHtml(first.title)}</span>
                      {first.summary && <p>{decodeHtml(first.summary)}</p>}
                    </div>
                  </a>
                </figure>
              )}

              {/* SMALL STORIES */}
              {rest.map((row, idx) => (
                <figure key={row.id || idx}>
                  <a href={row.url || "#"} title={decodeHtml(row.title) || ""}>
                    {(row.image || row.thumbnail || row.thumb || row.image_url) && (
                      <div className="imgThumb">
                        <Image
                          src={row.image || row.thumbnail || row.thumb || row.image_url}
                          alt={decodeHtml(row.title) || ""}
                          title={decodeHtml(row.title) || ""}
                          width={219}
                          height={124}
                          unoptimized
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    )}
                    <div className="card_title">
                      <span className="h3">{decodeHtml(row.title)}</span>
                    </div>
                  </a>
                </figure>
              ))}
            </div>
            <div className="sports_heading">
              <a className="view_more" href={viewMoreUrl}>
                {viewMoreText}
                <svg>
                  <use xlinkHref="#rgt-arrow"></use>
                </svg>
              </a>
            </div>
          </div>
        

      <style jsx>{`
        .Sports_TopNews {margin-bottom: 20px; }
    .spTopNews_Listing {display: grid; grid-template-columns: repeat(4, 1fr); grid-gap: 20px }
    .spTopNews_Listing figure:first-child {grid-row: 1/3; grid-column: 1/3 }
    .spTopNews_Listing figure:first-child .h3 {font-size: 1.5rem; font-weight: 700; line-height: 32px;margin-bottom: 10px;}
    .spTopNews_Listing figure:first-child p {font-size: 1rem; line-height: 24px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical }
    .spTopNews_Listing .imgThumb img {display: block; width: 100%; border-radius: 8px; margin-bottom: 10px }
    .spTopNews_Listing .card_title .h3 {font-size: 1rem; font-weight: 500; line-height: 22px; color: #000; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical }
    .Sports_TopNews .sports_heading{ justify-content:end; margin-top:10px; }
    @media(max-width:767px) {
        .Sports_TopNews .sports_heading .h1 {margin-bottom: 10px; }
        .spTopNews_Listing {grid-template-columns: auto; }
        .spTopNews_Listing figure:first-child {grid-column: auto; grid-row: auto; }
        .spTopNews_Listing figure a {display: flex; flex-direction: row-reverse; }
        .spTopNews_Listing figure:first-child a {display: grid; }
        .spTopNews_Listing .imgThumb {width: 100px; margin-left: 10px; }
        .spTopNews_Listing .card_title {width: calc(100% - 110px); }
        .spTopNews_Listing figure:first-child .imgThumb {width: 100%; margin-left: 0; }
        .spTopNews_Listing figure:first-child .card_title {width: 100%; }
        .spTopNews_Listing .imgThumb img {border-radius: 4px; margin-bottom: 0; }
        .spTopNews_Listing figure:first-child .imgThumb {margin-bottom: 10px; } 
    }
      `}</style>
      <style jsx global>{`
        .ranking_table{background:#FFFFFF;box-shadow:0px 0px 4px rgba(0,0,0,0.08);border-radius:8px;margin-bottom:20px}
        .ranking_table .tab_list{padding:10px;display:flex;justify-content:flex-start;border-bottom:1px solid #E5E5E5}
        .ranking_table .tab_sub_list{background:#FFFFFF;box-shadow:0px 3px 4px rgba(0,0,0,0.1);border-bottom:0}
        .ranking_table .tab_item{background:#F6F6F6;border-radius:20px;cursor:pointer;font-weight:500;font-size:12px;line-height:20px;text-transform:capitalize;color:#828282;padding:6px 12px;margin-right:8px;flex-grow:1;text-align:center}
        .ranking_table .tab_sub_list .tab_item{background:#fff;border-bottom:2px solid #fff;border-radius:0;color:#000}
        .ranking_table .tab_item:last-child{margin-right:0}
        .ranking_table .tab_item.is--active{background:#DC0000;color:#ffffff}
        .ranking_table .tab_sub_list .tab_item.is--active{border-bottom:2px solid #dc0000;background:#fff;color:#dc0000}
        .ranking_table table{color:#292929;font-size:12px;line-height:21px;overflow-x:auto;width:100%;border-collapse:collapse}
        .ranking_table table thead th,.ranking_table table tbody td{padding:0.5rem;text-align:left;font-size:14px}
        .ranking_table table tbody tr{border-bottom:1px solid #E5E5E5}
        .ranking_table table tbody td img{vertical-align:middle;margin-right:5px}
        .ranking_table table tbody tr.india{background:#E4F5FF;box-shadow:0px 3px 4px rgba(0,0,0,0.1);border-bottom:0}
        @media(min-width:1000px){
          .ranking_table .tab_item{padding:6px}
        }
      `}</style>
    </>
  );
}
