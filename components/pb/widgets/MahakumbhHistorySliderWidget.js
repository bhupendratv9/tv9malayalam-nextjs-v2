import Image from "next/image";
import useSplide from "@/hooks/useSplide";
import PropTypes from "prop-types";

import "@splidejs/splide/css";


function decodeHtml(text) {
    if (!text || typeof text !== "string") return text;
    const map = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#039;": "'", "&apos;": "'" };
    return text
      .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
      .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
      .replace(/&amp;|&lt;|&gt;|&quot;|&#039;|&apos;/g, (m) => map[m]);
  }

export default function MahakumbhHistorySliderWidget({
    title = "",
    items = [],
    sectionUrl = "#",
    dataConfig = {},
  }) {
    const displayTitle = decodeHtml(title || dataConfig?.title || "") || "कुम्भ का इतिहास";

    const sliderRef = useSplide(
        {
            type: 'loop',
            perPage: 3,
            focus: 'center',
            flickMaxPages: 3,
            updateOnMove: true,
            pagination: false,
            throttle: 300,
            omitEnd: true,
            breakpoints: {
            1000: {
                perPage: 3,
                
            },
            480: {
                perPage: 1,
                pagination:false,
                
            },
        },
        },
        [items]
      );

    if (!items || items.length === 0) {
      return null;
    }

  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
      <symbol id="icPrev" viewBox="0 0 8 14">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.842941 7.71114L6.49994 13.3681L7.91394 11.9541L2.96394 7.00414L7.91394 2.05414L6.49994 0.640137L0.842941 6.29714C0.65547 6.48466 0.550154 6.73897 0.550154 7.00414C0.550154 7.2693 0.65547 7.52361 0.842941 7.71114Z"
          fill="#000"
        />
      </symbol>
      <symbol id="icNext" viewBox="0 0 8 14">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.15706 7.71114L1.50006 13.3681L0.0860596 11.9541L5.03606 7.00414L0.0860596 2.05414L1.50006 0.640137L7.15706 6.29714C7.34453 6.48466 7.44985 6.73897 7.44985 7.00414C7.44985 7.2693 7.34453 7.52361 7.15706 7.71114Z"
          fill="#000"
        />
      </symbol>
    </svg>
    <section className="history_Wrap">
    <div className="container">
        <div className="event_heading">
            <h2 className="h2">{displayTitle}</h2>
        </div>
            <div className="historyListing">
                <div ref={sliderRef} className="splide history_Slider">
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
                                const description = decodeHtml(
                                    row?.summary ||
                                    row?.description ||
                                    row?.excerpt ||
                                    row?.content ||
                                    ""
                                );
                                const cid = row?.id || row?.cid || "";
                                return (
                                    <div className="splide__slide" key={cid || idx}> 
                                        <a href={url} target="_blank" rel="noopener noreferrer" title={titleText}>
                                            {img ? (
                                                <Image
                                                    width={480}
                                                    height={720}
                                                    src={img}
                                                    alt={titleText}
                                                    title={titleText}
                                                    loading="lazy"
                                                    unoptimized
                                                    style={{ width: "100%", height: "auto" }}
                                                />
                                            ) : null}
                                        <div className="cardInfo_Wrapper">
                                            <span className="h3">{titleText}</span>
                                            <p>{description}</p>
                                        </div>
                                        </a>
                                    </div>
                                )
                            })}</div>
                    </div>
                    <div className="splide__arrows">
                        <button type="button" className="splide__arrow splide__arrow--prev" aria-label="Previous slide">
                            <svg><use xlinkHref="#icPrev" /></svg>
                        </button>
                        <button type="button" className="splide__arrow splide__arrow--next" aria-label="Next slide">
                            <svg><use xlinkHref="#icNext" /></svg>
                        </button>
                    </div>
                </div>
            </div>
    </div>
</section>
<style>     
    {`    
    .event_heading{margin-bottom:2.5rem;}
.event_heading .h2{font-family: "Rozha One", serif;font-weight: 400;font-size:4.5rem;line-height:4.5rem;position: relative;display: grid;grid-template-columns: 30px max-content 30px;
  grid-gap: 20px;align-items: center;justify-content: center;}
.event_heading .h2,.event_heading .h2 a{color:#801800;}
.event_heading .h2:after,.event_heading .h2:before {content: "\\0950";display: block;font-size:1.875rem;line-height:1.875rem;color:#801800;}
@media (max-width: 767px) {
  .event_heading{margin-bottom:1.25rem;}
  .event_heading .h2{font-size:2.5rem;line-height:2.5rem;}
}    
.history_Wrap{background:#FBF6F6;padding:2.5rem;margin-bottom:3.125rem;}
.history_Wrap .historyListing{margin-bottom: 1.25rem;}
.history_Wrap .historyListing .history_Slider {padding: 0 0 0.94rem 0;position: relative;}
.history_Wrap .historyListing .history_Slider:before{content:'';position:absolute;background:#fff;border-radius:12px;margin: 0 auto;width: 50%;height: 400px;left: 0;right: 0;top: 10%;}
.history_Wrap .historyListing .history_Slider .splide__slide{display:flex;align-items: start;justify-content: center;}
.history_Wrap .historyListing .history_Slider .splide__slide img {aspect-ratio: 4 / 3;display: block;width: 100%;border-radius: 8px;transition: transform 400ms;transform: scale(0.8);transform-origin: center center;}
.history_Wrap .historyListing .history_Slider .splide__slide .cardInfo_Wrapper{padding:0 3.125rem;margin-top:-20px;}
.history_Wrap .historyListing .history_Slider .splide__slide .cardInfo_Wrapper .h3{font-family: "Anek Devanagari", serif;font-size: 1.25rem;font-weight: 600;line-height: 1.875rem;text-transform: capitalize;color:#801800;margin-bottom:0.3125rem;display:block;}
.history_Wrap .historyListing .history_Slider .splide__slide .cardInfo_Wrapper p{font-family: "Anek Devanagari", serif;display:none;font-size:0.875rem;font-weight:500;line-height:1.25rem;}
.history_Wrap .historyListing .history_Slider .splide__slide.is-active .cardInfo_Wrapper {margin-top: 10px;padding:0;}
.history_Wrap .historyListing .history_Slider .splide__slide.is-active .cardInfo_Wrapper p{display:block;}
.history_Wrap .historyListing .history_Slider .splide__slide.is-active img {transform: scale(1);}
.history_Wrap .historyListing .history_Slider .splide__arrows{position:absolute;width: 130px;transform: translate(-50%,-50%);left:50%;top:50%;}
.history_Wrap .historyListing .history_Slider .splide__arrow{width:2.8125rem;height:2.8125rem;background:#000;opacity: 1;}
.history_Wrap .historyListing .history_Slider .splide__arrow:hover{background:#801801;}
.history_Wrap .historyListing .history_Slider .splide__arrow svg{width:1.32338rem;height:.875rem;fill:#fff;}
.history_Wrap .historyListing .history_Slider .splide__arrow--next{right:-170px;}
.history_Wrap .historyListing .history_Slider .splide__arrow--prev{left:-170px;}
.history_Wrap .historyListing .history_Slider .splide__arrow--prev svg{transform:unset}
@media (max-width: 1400px) {
    .history_Wrap .historyListing .history_Slider .splide__arrow--next{right:-160px;}
    .history_Wrap .historyListing .history_Slider .splide__arrow--prev{left:-160px;}
    .history_Wrap .historyListing .history_Slider:before{height:400px;}
}

@media(max-width:768px){
    .history_Wrap{padding:1.5rem;}
    .history_Wrap .historyListing .history_Slider:before{content:none;}
    .history_Wrap .historyListing .history_Slider .splide__arrow--next{right:-100px;}
.history_Wrap .historyListing .history_Slider .splide__arrow--prev{left:-100px;}
}
  `} 
</style>
</>
  );
}

MahakumbhHistorySliderWidget.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  sectionUrl: PropTypes.string,
  dataConfig: PropTypes.object,
};