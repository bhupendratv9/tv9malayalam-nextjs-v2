import React from "react";
import Image from "next/image";

function decodeHtml(text) {
  if (!text || typeof text !== "string") return text;

  const map = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
    "&apos;": "'",
  };

  return text
    .replace(/&#(\d+);/g, (_, code) =>
      String.fromCharCode(Number(code))
    )
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )
    .replace(
      /&amp;|&lt;|&gt;|&quot;|&#039;|&apos;/g,
      (m) => map[m]
    );
}

export default function LiveTVVideoWidget({
  title = "वीडियो",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
}) {
  const displayTitle = decodeHtml(title);

  const viewMoreUrl =
    dataConfig.view_more_url || sectionUrl || "#";

  const videos = items.slice(0, 6);

  return (
    <>
	<div className="ltVideoGallery_Wrapper">
      {/* Heading */}
      <div className="tv9common-heading">
        <h2 className="h2">
          <a href={viewMoreUrl} title={displayTitle}>
            {displayTitle}
          </a>
        </h2>

        <a
          href={viewMoreUrl}
          className="view-more"
          aria-label="video-view-more-btn"
        >
          <svg>
            <use href="#chev-right"></use>
          </svg>
        </a>
      </div>

      {/* Video Grid */}
      <div className="ltVideoGallery_Grid">
        {videos.map((item, idx) => {
          const image =
            item.thumbnail ||
            item.image ||
            item.thumb ||
            item.image_url;

          return (
            <figure key={item.id || item.url || idx}>
              <a
                href={item.url || "#"}
                title={decodeHtml(item.title) || ""}
              >
                <div className="imgThumb">
                  {image && (
                    <Image
                      src={image}
                      alt={decodeHtml(item.title) || ""}
                      title={decodeHtml(item.title) || ""}
                      width={260}
                      height={150}
                      unoptimized
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  )}

                  <span className="vid-icon">
                    <svg>
                      <use href="#play-icon"></use>
                    </svg>
                  </span>
                </div>

                <div className="card-title">
                  <div className="h3">
                    {decodeHtml(item.title)}
                  </div>

                  {(item.category || item.time) && (
                    <div className="timestamp">
                      {item.category && (
                        <span className="category">
                          {decodeHtml(item.category)}
                        </span>
                      )}

                      {item.time && (
                        <span
                          style={{
                            marginLeft: "6px",
                          }}
                        >
                          {item.time}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </a>
            </figure>
          );
        })}
      </div>
    </div>
	<style jsx global>{`
		.ltVideoGallery_Wrapper .tv9common-heading .h2{background-color:transparent;color:#000;}
		.ltVideoGallery_Wrapper .tv9common-heading::before{display:none;}
		.ltVideoGallery_Wrapper .tv9common-heading .view-more{width: 1.5rem;height: 1.5rem;display:flex;align-items:center;justify-content:center;}
		.ltVideoGallery_Wrapper .tv9common-heading .view-more svg{width:1.5rem;height:1.5rem;stroke:#000}
		.ltVideoGallery_Wrapper .ltVideoGallery_Grid{display:grid;grid-template-columns:repeat(3, 1fr);gap:1.25rem}
		.ltVideoGallery_Wrapper .ltVideoGallery_Grid figure{border-radius: 0.75rem;border: 1px solid #d7d7d7;background: #FFF;padding:0.31rem}
		.ltVideoGallery_Wrapper .ltVideoGallery_Grid .imgThumb{position:relative;margin-bottom:0.56rem;}
		.ltVideoGallery_Wrapper .ltVideoGallery_Grid .imgThumb img{display:block;width:100%;aspect-ratio:16/9;border-radius: 0.5rem;}
		.ltVideoGallery_Wrapper .ltVideoGallery_Grid .vid-icon{width: 2.125rem;height: 1.875rem;border-radius: 0 3.125rem 3.125rem 0;background: #000;position:absolute;left:0;bottom:0.75rem;display:flex;align-items: center;padding-left:0.45rem;}
		.ltVideoGallery_Wrapper .ltVideoGallery_Grid .vid-icon svg{width: 1.384rem;height: 1.384rem;stroke-opacity:1;}
		.ltVideoGallery_Wrapper .ltVideoGallery_Grid .card-title .h3{color: #000;font-size: 1rem;font-weight: 700;}
		@media(max-width:767px){
			.ltVideoGallery_Wrapper{margin:0 -0.62rem 2rem -0.62rem;padding:0.94rem;}
			.ltVideoGallery_Wrapper .ltVideoGallery_Grid{display: flex;flex-wrap: nowrap;overflow-x: auto;-webkit-overflow-scrolling: touch;}
			.ltVideoGallery_Wrapper .ltVideoGallery_Grid::-webkit-scrollbar{display:none;}
			.ltVideoGallery_Wrapper .ltVideoGallery_Grid figure{width:65%;flex:0 0 auto;}
		}
	`}</style>
	</>
  );
}