//'use client';

import Image from "next/image";
import useSplide from "@/hooks/useSplide";

import "@splidejs/splide/css";

import { decodeHtml } from "@/lib/helper/commonHelper";
import { getImg, getLink } from "@/lib/helper/widgetHelper";

export default function PhotoContentSliderWidget({
  title = "",
  items = [], // 👈 IMPORTANT: array of slides
}) {

    const sliderRef = useSplide({
        perPage: 2,
        gap: "40px",
        arrows: true,
        perMove: 1,
        focus: 0,
        omitEnd: true,
        pagination: false,
        breakpoints: {
            1000: {
                perPage: 2,
            },
            480: {
                perPage: 1.2,
                pagination: false,
                gap: "20px",
            },
        },
    },
    [items.length]
);

    return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
      <symbol id="icprev" viewBox="0 0 8 14">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.842941 7.71114L6.49994 13.3681L7.91394 11.9541L2.96394 7.00414L7.91394 2.05414L6.49994 0.640137L0.842941 6.29714C0.65547 6.48466 0.550154 6.73897 0.550154 7.00414C0.550154 7.2693 0.65547 7.52361 0.842941 7.71114Z"
          fill="#000"
        />
      </symbol>
      <symbol id="icnext" viewBox="0 0 8 14">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.15706 7.71114L1.50006 13.3681L0.0860596 11.9541L5.03606 7.00414L0.0860596 2.05414L1.50006 0.640137L7.15706 6.29714C7.34453 6.48466 7.44985 6.73897 7.44985 7.00414C7.44985 7.2693 7.34453 7.52361 7.15706 7.71114Z"
          fill="#000"
        />
      </symbol>
    </svg>
    <section className="pramukakhade_Wrap">
    <div className="container">
        <div className="event_heading">
            {/* <h2 className="h2">प्रमुख अखाड़ा</h2> */}
            <h2 className="h2">{title}</h2>
        </div>
        <div className="pramukakhade_listing">
            
            <div ref={sliderRef} className="splide akhadaSlider">
                <div className="splide__track">
                    <div className="splide__list">
                        {console.log('slider ITems->',items)}
                        {items.map((slide, idx) => {
                          const Title = decodeHtml(
                            slide?.title || slide?.post_title || ""
                          );

                          const Desc = decodeHtml(
                            slide?.excerpt || slide?.summary || ""
                          );

                          const Link = slide?.url || slide?.permalink || "#";

                          const img = getImg(slide); // ✅ FIXED (use helper correctly)

                          return (
                            <figure className="splide__slide" key={slide?.id || idx}>
                              <a href={Link} title={Title} target="_blank">
                                <div className="imgThumb">
                                  {img && (
                                    <Image
                                      src={img}
                                      alt={Title}
                                      width={308}
                                      height={217}
                                      unoptimized
                                    />
                                  )}
                                </div>

                                <div className="card_title">
                                  {Desc && <p>{Desc}</p>}
                                  <h3 className="h3">{Title}</h3>
                                </div>
                              </a>
                            </figure>
                          );
                        })}
                    </div>           
                </div>
                <div className="splide__arrows">
                    <button className="splide__arrow splide__arrow--prev">
                        <svg><use xlinkHref="#icprev" /></svg>
                    </button>
                    <button className="splide__arrow splide__arrow--next">
                        <svg><use xlinkHref="#icnext" /></svg>
                    </button>
            </div>
            </div> 
        </div>
    </div>
</section>
      <style>{`
        .pramukakhade_Wrap{margin-bottom:3.125rem;}
        .pramukakhade_Wrap .container{background:url(https://images.tv9hindi.com/wp-content/uploads/2025/01/akhada-bg.png);background-repeat:no-repeat;background-size:cover;}
        .pramukakhade_Wrap .pramukakhade_listing .akhadaSlider{padding-bottom:2.5rem;}
        .pramukakhade_Wrap .pramukakhade_listing .akhadaSlider .splide__list{height:auto;}
        .pramukakhade_Wrap .pramukakhade_listing .akhadaSlider figure a{display:flex;padding:1.875rem;border-radius:12px;background:#fff;border:1px solid #F4F4F4;}
        .pramukakhade_Wrap .pramukakhade_listing .akhadaSlider figure .imgThumb{width:185px;margin-right:1.25rem;}
        .pramukakhade_Wrap .pramukakhade_listing .akhadaSlider figure .imgThumb img{display:block;width:100%;border-radius:4px;aspect-ratio:16/9;}
        .pramukakhade_Wrap .pramukakhade_listing .akhadaSlider .card_title{width:calc(100% - 205px);font-family:"Anek Devanagari",serif;}
        .pramukakhade_Wrap .pramukakhade_listing .akhadaSlider .card_title p{font-size:0.875rem;font-weight:400;line-height:1.375rem;border-bottom:1px solid #E9E9E9;padding-bottom:0.9375rem;margin-bottom:0.9375rem;}
        .pramukakhade_Wrap .pramukakhade_listing .akhadaSlider .card_title .h3{font-weight:600;font-size:1rem;line-height:1.625rem;color:#801800;}
        .pramukakhade_Wrap .pramukakhade_listing .akhadaSlider .card_title span{font-weight:600;font-size:0.875rem;line-height:1.25rem;color:#000;}
        .pramukakhade_Wrap .pramukakhade_listing .akhadaSlider .splide__arrows{background:#fff;border-radius:50px;position:absolute;width:130px;height:68px;transform:translate(-50%);left:50%;border:1px solid #F4F4F4;}
        .pramukakhade_Wrap .pramukakhade_listing .akhadaSlider .splide__arrow{width:2.8125rem;height:2.8125rem;background:#F6F6F6;opacity:1;}
        .pramukakhade_Wrap .pramukakhade_listing .akhadaSlider .splide__arrow svg{width:1.32338rem;height:.875rem;}
        .pramukakhade_Wrap .pramukakhade_listing .akhadaSlider .splide__arrow--prev svg{transform:unset;}
        @media (max-width: 767px) {
          .pramukakhade_Wrap .pramukakhade_listing .akhadaSlider figure a{flex-wrap:wrap;padding:0.9375rem;}
          .pramukakhade_Wrap .pramukakhade_listing .akhadaSlider figure .imgThumb{width:100%;margin-right:0;margin-bottom:1.25rem;}
          .pramukakhade_Wrap .pramukakhade_listing .akhadaSlider .card_title{width:100%;}
        }
      `}</style>
        </>
    );
}