import Image from "next/image";
import { decodeHtml } from "@/lib/helper/commonHelper";
import { getImg, getLink } from "@/lib/helper/widgetHelper";

export default function VideoGalleryWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  }) {
  const displayTitle  = decodeHtml(title) || "";
  const viewMoreUrl   = dataConfig.view_more_url || sectionUrl || "#";
  const viewMoreLabel = dataConfig.view_more_label || "View More";
  const first = items.length > 0 ? items[0] : null;
  const rest = items.length > 1 ? items.slice(1, 9) : [];
  const bgColor = dataConfig.bgColor || "";
  return (
    <>
    <div className="videoGallery_Wrapper">
        <div className="electionHD">
          <h2 className="h2">
            <a href={viewMoreUrl} title={displayTitle}>
              {displayTitle}
            </a>
          </h2>

          <a href={viewMoreUrl} className="read_more">
            {viewMoreLabel}
            <svg>
              <use href="#rgt-arrow"></use>
            </svg>
          </a>
        </div>

        <div className="VidGal_Container">
          {/* FIRST BIG ITEM */}
          {first && (
            <figure>
              <a href={getLink(first)} title={decodeHtml(first?.title)}>
                {getImg(first) && (
                  <div className="imgThumb">
                    <Image
                      src={getImg(first)}
                      alt={decodeHtml(first?.title)}
                      width={640}
                      height={360}
                      unoptimized
                      style={{ width: "100%", height: "auto" }}
                    />
                    <span className="sp9_vidIC">
                      <svg>
                        <use href="#spvid-icon"></use>
                      </svg>
                    </span>
                  </div>
                )}
                <div className="card_title">
                  <span className="h3">
                    {decodeHtml(first?.title)}
                  </span>
                </div>
              </a>
            </figure>
          )}

          {/* REST ITEMS */}
          {rest.length > 0 &&
            rest.map((row, idx) => {
              const img = getImg(row);
              const itemTitle = decodeHtml(
                row?.title || row?.post_title || ""
              );
              const link = getLink(row);

              return (
                <figure key={row?.id || row?.post_id || idx}>
                  <a href={link} title={itemTitle}>
                    {img && (
                      <div className="imgThumb">
                        <Image
                          src={img}
                          alt={itemTitle}
                          width={320}
                          height={180}
                          unoptimized
                          style={{ width: "100%", height: "auto" }}
                        />
                        <span className="sp9_vidIC">
                          <svg>
                            <use href="#spvid-icon"></use>
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

      {/* SVG ICON */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "none" }}
      >
        <symbol viewBox="0 0 50 52" id="spvid-icon">
          <circle cx="25" cy="26" r="24" fill="rgba(0,0,0,0.6)" />
          <path d="M20 16L38 26L20 36V16Z" fill="#fff" />
        </symbol>
      </svg>
    <style jsx>{`
      .videoGallery_Wrapper {
        background: ${bgColor};
        color: #fff;
        padding: 20px;
        margin-bottom: 1.88rem;
    }

    .videoGallery_Wrapper .electionHD .h2 a,
    .videoGallery_Wrapper .electionHD a.read_more {
        color: #fff
    }

    .videoGallery_Wrapper a.read_more svg {
        fill: #fff
    }

    .VidGal_Container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 20px
    }

    .VidGal_Container figure:first-child {
        grid-row: 1/3;
        grid-column: 1/3
    }

    .VidGal_Container .imgThumb {
        position: relative
    }

    .VidGal_Container .imgThumb img {
        display: block;
        width: 100%;
        border-radius: 8px;
        margin-bottom: 10px
    }

    .VidGal_Container .sp9_vidIC {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex
    }

    .VidGal_Container figure:first-child .sp9_vidIC svg {
        width: 50px;
        height: 52px
    }

    .VidGal_Container .sp9_vidIC svg {
        width: 30px;
        height: 32px
    }

    .VidGal_Container .card_title .h3 {
        font-size: 1.125rem;
        font-weight: 600;
        line-height: 24px;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical
    }

    .VidGal_Container figure:first-child .card_title .h3 {
        font-size: 1.75rem;
        font-weight: 700;
        line-height: 42px
    }

    @media(max-width:767px) {
        .videoGallery_Wrapper {
            margin: 0 -10px 1.88rem -10px;
            padding: 15px;
        }

        .VidGal_Container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between
        }

        .VidGal_Container figure {
            width: 46%
        }

        .VidGal_Container figure:first-child {
            width: 100%
        }

        .VidGal_Container figure:first-child .imgThumb {
            width: 100%;
            margin-bottom: 10px
        }

        .VidGal_Container .imgThumb img {
            border-radius: 4px
        }

        .VidGal_Container figure:first-child .card_title {
            width: 100%
        }
    }
    `}</style>
    </>

  );
}