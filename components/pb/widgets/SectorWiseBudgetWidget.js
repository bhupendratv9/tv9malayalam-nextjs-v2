import Image from "next/image";
import useSplide from "@/hooks/useSplide";

import "@splidejs/splide/css";

// helpers (same as your listing widgets)
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
    .replace(/&amp;|&lt;|&gt;|&quot;|&#039;|&apos;/g, (m) => map[m]);
}

export default function SectorWiseBudgetWidget({
  title = "",
  items = [], // 👈 IMPORTANT: array of slides
}) {
  const sliderRef = useSplide(
    {
      perPage: 4,
      arrows: true,
      pagination: false,
      gap: "31px",
      breakpoints: {
        1000: { perPage: 4 },
        480: { perPage: 1.1, gap: "20px" },
      },
    },
    [items.length]
  );

  return (
    <>
      <div className="sectorWiseBudget_NewsWrapper">
        <div className="section_heading">
          <h2 className="h2">{title}</h2>
        </div>

        <div
          ref={sliderRef}
          className="sectorBudget_Carousel splide"
        >
          {/* ARROWS */}
          <div className="splide__arrows">
            <button className="splide__arrow splide__arrow--prev">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <g clipPath="url(#clip0_2008_284)">
                <path
                    d="M9.09082 1.74996C9.40534 1.42211 9.41029 0.873707 9.08834 0.538998C8.76309 0.200857 8.24384 0.202574 7.92354 0.536424L2.66665 6.00075L7.92519 11.4668C8.24053 11.7946 8.76804 11.7998 9.08999 11.4642C9.41442 11.1269 9.41359 10.5871 9.09247 10.2533L5.00203 6.00075L9.09082 1.74996Z"
                    fill="#4C4C4C"
                />
                </g>
                <defs>
                <clipPath id="clip0_2008_284">
                    <rect
                    width="11.4286"
                    height="11.4286"
                    fill="white"
                    transform="matrix(-1 0 0 1 11.7143 0.285714)"
                    />
                </clipPath>
                </defs>
            </svg>
            </button>

            <button className="splide__arrow splide__arrow--next">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <g clipPath="url(#clip0_2008_280)">
                <path
                    d="M2.90918 1.74996C2.59466 1.42211 2.58971 0.873707 2.91166 0.538998C3.23691 0.200857 3.75616 0.202574 4.07646 0.536424L9.33335 6.00075L4.07481 11.4668C3.75947 11.7946 3.23196 11.7998 2.91001 11.4642C2.58558 11.1269 2.58641 10.5871 2.90753 10.2533L6.99797 6.00075L2.90918 1.74996Z"
                    fill="#4C4C4C"
                />
                </g>
                <defs>
                <clipPath id="clip0_2008_280">
                    <rect
                    width="11.4286"
                    height="11.4286"
                    fill="white"
                    transform="translate(0.285706 0.285714)"
                    />
                </clipPath>
                </defs>
            </svg>
            </button>
          </div>

          {/* TRACK */}
          <div className="splide__track">
            <div className="splide__list">
                
              {items.map((slide, idx) => {
                
                const bigTitle = decodeHtml(
                  slide?.title || slide?.post_title || ""
                );
                const smallDesc = decodeHtml(
                  slide?.excerpt || slide?.summary || ""
                );
                const Link = slide?.url || slide?.permalink || "";
                const imgUrl = slide?.image || slide?.thumbnail || "";
                const tagName = slide?.tag || slide?.topic || "Tax";

                return (
                  <div
                    className="splide__slide"
                    key={slide?.id || idx}
                  >
                    <div className="categoryWidget_Listing">
                      {/* BIG NEWS */}
                      {bigTitle && (
                        <div className="bigNews_Wrapper">
                          <figure>
                            <a href={Link} title={bigTitle}>
                              <div className="imgwrap">
                                {tagName && (
                                  <span className="tag">
                                    {tagName}
                                  </span>
                                )}

                                {imgUrl && (
                                  <Image
                                    src={imgUrl}
                                    alt={bigTitle}
                                    width={302}
                                    height={153}
                                    unoptimized
                                  />
                                )}
                              </div>

                              <div className="card_title">
                                <h3 className="h3">
                                  {bigTitle}
                                </h3>
                              </div>
                            </a>
                          </figure>
                        </div>
                      )}

                      {/* SMALL NEWS */}
                      {smallDesc && ( 
                        <div className="smallNews_Wrapper">
                              <figure>
                                <a href={Link} title={bigTitle}>
                                  <div className="card_title">
                                    <h3 className="h3">
                                      {smallDesc}
                                    </h3>
                                  </div>
                                </a>
                              </figure>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
    .section_heading{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:10px}
    .section_heading .h1{font-size:1.5rem;line-height:30px;font-weight:700;text-transform:capitalize;color:#000}
    .section_heading a.view_more{font-weight:700;font-size:.875rem;line-height:20px;color:#000;text-transform:capitalize}
    .section_heading a.view_more svg{width:13px;height:8px;margin-left:3px}
    .sectorWiseBudget_NewsWrapper{margin-bottom:2.5rem}
    .sectorBudget_Carousel .splide__pagination__page{opacity:1;background:#d9d9d9;height:8px;width:8px;margin:2px 6px}
    .sectorBudget_Carousel .splide__pagination__page.is-active{background:#000;height:7px;width:18px;border-radius:20px}
    .sectorBudget_Carousel .splide__arrow{top:-25px;width:1.875rem;height:1.875rem;border:1px solid #ece6e6;background:#fff;border-radius:50%}
    .sectorBudget_Carousel .splide__arrow svg{width:.71431rem;height:.71431rem}
    .sectorBudget_Carousel .splide__arrow--next{right:0}
    .sectorBudget_Carousel .splide__arrow--prev{left:auto;right:35px}
    .sectorBudget_Carousel .splide__arrow--prev svg{transform:unset}
    .sectorBudget_Carousel .splide__arrow:disabled{opacity:0}
    .sectorBudget_Carousel .imgwrap{position:relative}
    .sectorBudget_Carousel .imgwrap .tag{border-radius:0rem 0rem .625rem 0rem;background:#b00020;color:#fff;font-size:1rem;font-weight:500;line-height:1;padding:.6rem;position:absolute;left:0;top:0;width:auto;}
    .sectorBudget_Carousel .imgwrap img{aspect-ratio:16/9;display:block;width:100%}
    .sectorBudget_Carousel .bigNews_Wrapper figure{padding-bottom:.9375rem;margin-bottom:.9375rem;border-bottom:1px solid #d7d7d7}
    .sectorBudget_Carousel .bigNews_Wrapper .imgwrap img{margin-bottom:10px}
    .sectorBudget_Carousel .bigNews_Wrapper .card_title .h3{font-size:1.375rem;line-height:2.2rem;font-weight:600;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
    .sectorBudget_Carousel .smallNews_Wrapper figure{padding-bottom:.9375rem;margin-bottom:.9375rem;border-bottom:1px solid #d7d7d7}
    .sectorBudget_Carousel .smallNews_Wrapper figure:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
    .sectorBudget_Carousel .smallNews_Wrapper .card_title .h3{font-size:1.125rem;line-height:1.625rem;font-weight:500;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}
    `}</style>

    </>
  );
}