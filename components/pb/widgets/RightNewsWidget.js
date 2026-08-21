import Image from "next/image";
import { getHref, decodeHtml, getViewMoreUrl, getViewMoreLabel, ViewMoreLink } from "@/lib/helper/commonHelper";

function getImage(item) {
  return item.thumbnail || item.image || item.thumb || item.image_url || item.featured_media?.url || "";
}

export default function RightNewsWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title) || "ताजा खबरें";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl, fallback: "/latest-news" });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });
  const newsItems = Array.isArray(items) ? items.slice(0, 10) : [];

  return (
    <div className="rhs-newsWidgets">
      {/* Heading */}
      <div className="tv9common-heading">
        <span className="h2">
          <a href={viewMoreUrl} title={displayTitle}>{displayTitle}</a>
        </span>
        <ViewMoreLink href={viewMoreUrl} label={viewMoreLabel} />
      </div>

      {/* News items */}
      <div className="commonstory latest_articles_home">
        {newsItems.map((item, idx) => {
          const itemTitle = decodeHtml(item.title) || "";
          const itemUrl = getHref(item.url || item.permalink || "#");
          const imgSrc = getImage(item);
          const isVideo = item.post_format === "video";

          return (
            <figure className="smallstory" key={item.id || idx}>
              <a href={itemUrl} title={itemTitle}>
                <div className="card_title">
                  <span className="h3">{itemTitle}</span>
                </div>
                {imgSrc && (
                  <div className="imgThumb">
                    <Image
                      width={96}
                      height={54}
                      src={imgSrc}
                      alt={itemTitle}
                      title={itemTitle}
                      unoptimized
                    />
                    {isVideo && (
                      <span className="icon_Comn">
                        <svg><use href="#v_icon"></use></svg>
                      </span>
                    )}
                  </div>
                )}
              </a>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
