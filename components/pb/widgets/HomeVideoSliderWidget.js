import Image from "next/image";
import useSplide from "@/hooks/useSplide";
import { decodeHtml, getViewMoreUrl, getViewMoreLabel, ViewMoreLink } from "@/lib/helper/commonHelper";

export default function HomeVideoSliderWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title) || "Video Gallery";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });

  const sliderRef = useSplide(
    {
      perPage: 3.5,
      gap: "20px",
      arrows: false,
      perMove: 1,
      focus: 0,
      omitEnd: true,
      breakpoints: {
        1000: { perPage: 3.5 },
        480: { perPage: 1.4, pagination: false },
      },
    },
    [items]
  );

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="tv9_sliderWidget tv9_videoWrapper">
      <div className="tv9common-heading">
        <h2 className="h2">
          <a href={viewMoreUrl} title={displayTitle}>
            {displayTitle}
          </a>
        </h2>

        <ViewMoreLink href={viewMoreUrl} label={viewMoreLabel} />
      </div>

      <div ref={sliderRef} className="splide tv9_CommonSlider js-tv9-splide">
        <div className="splide__track">
          <div className="splide__list">
            {items.map((row, idx) => {
              const url = row?.url || row?.permalink || "#";
              const titleText = decodeHtml(row?.title || row?.headline || row?.name || "");
              const img =
                row?.image ||
                row?.thumbnail ||
                row?.thumb ||
                row?.image_url ||
                "";
              const cid = row?.id || row?.cid || "";

              return (
                <figure className="splide__slide" key={cid || idx}>
                  <a
                    href={url}
                    data-pos={idx + 1}
                    data-widget={displayTitle}
                    data-cid={cid}
                    title={titleText}
                  >
                    <div className="imgThumb">
                      {img ? (
                        <Image
                          src={img}
                          width={260}
                          height={150}
                          alt={titleText}
                          title={titleText}
                          unoptimized
                          style={{ width: "100%", height: "auto" }}
                        />
                      ) : null}

                      <span className="icon_Comn video_time">
                        <svg>
                          <use xlinkHref="#video_icon"></use>
                        </svg>
                      </span>
                    </div>

                    <div className="card_title">
                      <h3 className="h3">{titleText}</h3>
                    </div>
                  </a>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
