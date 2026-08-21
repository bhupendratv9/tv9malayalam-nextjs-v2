import React from "react";
import Image from "next/image";
import { decodeHtml, getViewMoreUrl, getViewMoreLabel, ViewMoreLink } from "@/lib/helper/commonHelper";

export default function LiveTVNewsWidget({
  title = "टॉप स्टोरीज",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title);
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });

  const leftStories = items.slice(0, 3);
  const rightStories = items.slice(3, 9);

  const renderStory = (item, large = false) => {
    if (!item) return null;

    const image =
      item.thumbnail ||
      item.image ||
      item.thumb ||
      item.image_url;

    return (
      <figure key={item.id || item.url}>
        <div className="imgThumb">
          <a
            href={item.url || "#"}
            title={decodeHtml(item.title) || ""}
          >
            {image && (
              <Image
                src={image}
                alt={decodeHtml(item.title) || ""}
                title={decodeHtml(item.title) || ""}
                width={large ? 320 : 224}
                height={large ? 180 : 126}
                unoptimized
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            )}
          </a>
        </div>

        <div className="card-title">
          <div className="h3">
            <a
              href={item.url || "#"}
              title={decodeHtml(item.title) || ""}
            >
              {decodeHtml(item.title)}
            </a>
          </div>

          {(item.category || item.time) && (
            <div className="timestamp">
              {item.category && (
                <a href={item.category_url || "#"}>
                  {decodeHtml(item.category)}
                </a>
              )}

              {item.time && (
                <span style={{ marginLeft: "6px" }}>
                  {item.time}
                </span>
              )}
            </div>
          )}
        </div>
      </figure>
    );
  };

  return (
    <>
	<div className="liveTVTopNews_Wrapper">
      {/* Heading */}
      <div className="tv9common-heading">
        <h2 className="h2">
          <a href={viewMoreUrl} title={displayTitle}>
            {displayTitle}
          </a>
        </h2>

        <ViewMoreLink href={viewMoreUrl} label={viewMoreLabel} />
      </div>

      {/* News Grid */}
      <div className="topNewsGrid_Wrapper">
        {/* LEFT GRID */}
        <div className="leftGrid">
          {leftStories.map((item, idx) =>
            renderStory(item, idx === 0)
          )}
        </div>

        {/* RIGHT GRID */}
        <div className="rightGrid">
          {rightStories.map((item) =>
            renderStory(item, true)
          )}
        </div>
      </div>
    </div>
	<style jsx global>{`
		.liveTVTopNews_Wrapper{margin-bottom:2rem;}
		.liveTVTopNews_Wrapper .tv9common-heading::before{display:none;}
		.liveTVTopNews_Wrapper .topNewsGrid_Wrapper{display:grid;grid-template-columns:1fr 1fr;gap:1.88rem}
		.liveTVTopNews_Wrapper .topNewsGrid_Wrapper .leftGrid figure{display:grid;grid-template-columns:210px 1fr;gap:1.63rem}
		.liveTVTopNews_Wrapper .topNewsGrid_Wrapper .leftGrid figure:first-child{grid-template-columns:1fr;gap:1.25rem}
		.liveTVTopNews_Wrapper .topNewsGrid_Wrapper figure{margin-bottom:1.25rem;padding-bottom:1.25rem;border-bottom:1px solid #E6E6E6}
		.liveTVTopNews_Wrapper .topNewsGrid_Wrapper .imgThumb{position:relative;}
		.liveTVTopNews_Wrapper .topNewsGrid_Wrapper .imgThumb img{display:block;border-radius:0.5rem;width:100%;aspect-ratio:16/9;}
		.liveTVTopNews_Wrapper .topNewsGrid_Wrapper .card-title .h3{color:#000;font-size:1.125rem;font-weight:600;}
		.liveTVTopNews_Wrapper .topNewsGrid_Wrapper .timestamp{color:#595959;font-size:0.75rem;font-weight:500;text-transform:uppercase;}
		.liveTVTopNews_Wrapper .topNewsGrid_Wrapper .timestamp a{color:#b30606;margin-right:0.62rem;}
		.liveTVTopNews_Wrapper .topNewsGrid_Wrapper .leftGrid figure:first-child .card-title .h3{font-size:1.75rem;font-weight:700;line-height:2.625rem;}
		.liveTVTopNews_Wrapper .topNewsGrid_Wrapper .leftGrid figure:first-child .timestamp{display:none;}
		.liveTVTopNews_Wrapper .topNewsGrid_Wrapper .rightGrid figure{display:grid;grid-template-columns:132px 1fr;gap:1.25rem}
		.liveTVTopNews_Wrapper .topNewsGrid_Wrapper .rightGrid .card-title .h3{font-size:1rem;font-weight:500;}
		.liveTVTopNews_Wrapper .topNewsGrid_Wrapper .rightGrid figure:last-child{margin-bottom:0;padding-bottom:0;border-bottom:none;}
		@media(max-width:767px){
			.liveTVTopNews_Wrapper .topNewsGrid_Wrapper{grid-template-columns:1fr;gap:0}
			.liveTVTopNews_Wrapper .topNewsGrid_Wrapper .leftGrid figure:first-child{gap:0.62rem}
			.liveTVTopNews_Wrapper .topNewsGrid_Wrapper .leftGrid figure:first-child .card-title .h3{font-size:1.125rem;line-height:normal;}
			.liveTVTopNews_Wrapper .topNewsGrid_Wrapper .leftGrid figure{grid-template-columns:132px 1fr;gap:1.25rem}
			.liveTVTopNews_Wrapper .topNewsGrid_Wrapper .card-title .h3{font-size:1rem;font-weight:500;line-height:1.5rem}
		}
	`}</style>
	</>
  );
}