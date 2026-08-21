import Image from "next/image";
import { decodeHtml, getViewMoreUrl, getViewMoreLabel, ViewMoreLink } from "@/lib/helper/commonHelper";

export default function HomeWebStoriesWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title) || "விஷுவல் ஸ்டோரீஸ்";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl, fallback: "/webstories" });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });
  const stories = items.length > 0 ? items.slice(0, 4) : [];

  if (stories.length === 0) return null;

  return (
    <>
      <div className="webStoriesHome_Widget">
        <div className="tv9common-heading">
          <div className="h2">
            <a href={viewMoreUrl} title={displayTitle}>
              {displayTitle}
            </a>
          </div>
          <ViewMoreLink href={viewMoreUrl} label={viewMoreLabel} />
        </div>
        <div className="webStoriesGrid_Wrapper">
          {stories.map((item, idx) => {
            const imgSrc = item.image || item.thumbnail || item.image_url || item.thumb || "";
            const itemTitle = decodeHtml(item.title) || "";
            const itemUrl = item.url || "#";

            return (
              <figure key={item.id || idx}>
                <a href={itemUrl} title={itemTitle}>
                  {imgSrc && (
                    <div className="imgThumb">
                      <Image
                        width={228}
                        height={300}
                        className="lazy"
                        src={imgSrc}
                        alt={itemTitle}
                        title={itemTitle}
                        unoptimized
                        style={{ width: "100%", height: "auto" }}
                      />
                      <span className="webstory-icon">
                        <svg>
                          <use xlinkHref="#webstory-icon"></use>
                        </svg>
                      </span>
                    </div>
                  )}
                  <div className="card_title">
                    <span className="h3">{itemTitle}</span>
                  </div>
                </a>
              </figure>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .webStoriesGrid_Wrapper{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
        .webStoriesGrid_Wrapper figure{position:relative;overflow:hidden}
        .webStoriesGrid_Wrapper figure .imgThumb{position:relative;overflow:hidden;border-radius:10px;vertical-align:top;aspect-ratio:3/4;height:auto;width:100%}
        .webStoriesGrid_Wrapper figure .imgThumb .webstory-icon{position:absolute;top:10px;right:10px}
        .webStoriesGrid_Wrapper figure .imgThumb .webstory-icon svg{width:30px;height:30px}
        .webStoriesGrid_Wrapper figure .card_title{padding:50% 10px 10px 10px;left:0;right:0;border-radius:0 0 10px 10px;position:absolute;bottom:0;background:linear-gradient(to bottom,rgba(0,0,0,0) 0,rgba(0,0,0,0) 20%,rgba(0,0,0,.1) 30%,rgba(0,0,0,.8) 70%,#000 100%);display:flex;align-items:end;pointer-events:none;overflow:hidden}
        .webStoriesGrid_Wrapper figure .card_title .h3{color:#fff;font-weight:var(--font-weight-bold);white-space:initial;font-size:.9375rem;line-height:1.5rem;text-overflow:ellipsis;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;display:-webkit-box;margin-bottom:0}
        @media (max-width:767px){
        .webStoriesGrid_Wrapper{display:flex;flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;gap:10px}
        .webStoriesGrid_Wrapper::-webkit-scrollbar{display:none}
        .webStoriesGrid_Wrapper figure{width:65%;flex:0 0 auto}
        }
      `}</style>
    </>
  );
}
