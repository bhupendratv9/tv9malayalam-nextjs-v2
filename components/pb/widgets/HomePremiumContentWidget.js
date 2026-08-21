import Image from "next/image";
import useSplide from "@/hooks/useSplide";
import { decodeHtml, getViewMoreUrl, getViewMoreLabel, ViewMoreLink } from "@/lib/helper/commonHelper";
import { getImg, getLink } from "@/lib/helper/widgetHelper";

export default function HomePremiumContentWidget({ items = [], title = "", dataConfig = {}, view_more_link = null, view_more_label = null }) {
  const displayTitle = decodeHtml(title) || "प्रीमियम कंटेंट";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl: null });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });

  const sliderRef = useSplide({
    perPage: 3,
    gap: '20px',
    pagination: false,
    perMove: 1,
    focus: 0,
    omitEnd: true,
    breakpoints: {
      1000: { perPage: 3 },
      480: { perPage: 1.4, arrows: false },
    },
  });

  return (
    <>
      <section className="premiumNewsWidget">
        <div className="widgethead">
          <h2 className="h2">
            {viewMoreUrl ? (
              <a href={viewMoreUrl} title={displayTitle}>
                {displayTitle} <svg><use href="/tv9hindi-nextjs/images/icons.svg#premiumIcon"></use></svg>
              </a>
            ) : (
              <span>{displayTitle} <svg><use href="/tv9hindi-nextjs/images/icons.svg#premiumIcon"></use></svg></span>
            )}
          </h2>
          {viewMoreUrl && viewMoreUrl !== "#" && (
            <ViewMoreLink href={viewMoreUrl} label={viewMoreLabel} iconId="/tv9hindi-nextjs/images/icons.svg#rgt-arrow" />
          )}
        </div>
        <div ref={sliderRef} className="splide premiumNewsSlider">
          <div className="splide__track">
            <div className="splide__list">
              {items.map((item, idx) => {
                const img = getImg(item);
                const itemTitle = decodeHtml(item.title || item.post_title || "");
                const link = getLink(item);

                return (
                  <div className="splide__slide" key={item.id || item.post_id || idx}>
                    <figure>
                      <a href={link} title={itemTitle}>
                        {img && (
                          <div className="imgwrap">
                            <Image
                              src={img}
                              width={260}
                              height={150}
                              alt={itemTitle}
                              title={itemTitle}
                              className="lazy"
                              unoptimized
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        )}
                        <div className="cardInfo_Wrap">
                          <div className="h3">{itemTitle}</div>
                        </div>
                      </a>
                    </figure>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="splide__arrows">
            <button className="splide__arrow splide__arrow--prev">
              <svg><use href="/tv9hindi-nextjs/images/icons.svg#icPrev"></use></svg>
            </button>
            <button className="splide__arrow splide__arrow--next">
              <svg><use href="/tv9hindi-nextjs/images/icons.svg#icNext"></use></svg>
            </button>
          </div>
        </div>
      </section>
      <style jsx>{`
      .premiumNewsWidget{padding: 20px 0;margin: 0 0 30px;background:#08192F;position: relative; overflow: hidden;max-height: 395px;border-radius:8px;}
      .premiumNewsWidget .widgethead {padding: 0 20px;display: flex;align-items: center;justify-content: space-between;margin-bottom: 15px;position: relative;width: 100%;}
      .premiumNewsWidget .widgethead .h2{font-weight: 700;font-size: 22px;line-height: 30px;padding-right: 10px;text-transform: capitalize;}
      .premiumNewsWidget .widgethead .h2 a,.premiumNewsWidget .widgethead .h2 span{color:#fff;display: flex;align-items: center;}
      .premiumNewsWidget .widgethead .h2 a svg,.premiumNewsWidget .widgethead .h2 span svg{width: 26px;height:21px;fill:#E2B45D;margin-left:5px;}
      .premiumNewsWidget .widgethead a.view_more{color:#E2B45D;border:1px solid #E2B45D;font-weight: 400;font-size: 14px;line-height: 20px;text-transform: capitalize;padding: 5px 10px 3px 10px;border-radius: 30px;display: flex;align-items: center;flex: 0 0 auto;}
      .premiumNewsWidget .widgethead a.view_more svg{fill:#E2B45D;width: 13px;height: 8px;margin-left: 3px;}
      .premiumNewsWidget .premiumNewsSlider{padding: 0 20px 25px 20px;}
      .premiumNewsWidget .premiumNewsSlider .splide__list {height: auto;}
      .premiumNewsWidget .premiumNewsSlider figure{border:1px solid #E2B45D;padding:10px;border-radius:4px;position: relative;margin-left:1px;}
      .premiumNewsWidget .premiumNewsSlider figure:before{content:"";background: linear-gradient(40.97deg, #CA9A44 4.19%, #F6DEB0 68.75%, #F8D18D 106.12%);position: absolute; top:0;left:0;right:0;height:110px;}
      .premiumNewsWidget .premiumNewsSlider figure a{color:#fff;display:block}
      .premiumNewsWidget .premiumNewsSlider figure .imgwrap{position: relative;border-radius: 4px;overflow: hidden;display:block;margin-bottom:5px;width:100%;aspect-ratio: 16 / 9;}
      .premiumNewsWidget .premiumNewsSlider .cardInfo_Wrap .h3{font-weight: 600;font-size: 16px;line-height: 26px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;min-height: 52px;}
      .premiumNewsWidget .splide__arrow{width:1.32338rem;height:.875rem;border:unset;background:0 0;opacity:1;top:98%;}
      .premiumNewsWidget .splide__arrow svg{width:1.32338rem;height:.875rem;fill:#FCC050;}
      .premiumNewsWidget .splide__arrow:disabled svg{fill:#ffffff;}
      .premiumNewsWidget .splide__arrow--next{right:20px;}
      .premiumNewsWidget .splide__arrow--prev{left:auto;right:55px}
      .premiumNewsWidget .splide__arrow--prev svg{transform:unset}
      @media (max-width: 767px) {
      .premiumNewsWidget{padding-top: 20px;margin-bottom:20px;}
      .premiumNewsWidget .widgethead{padding:0 10px 0 20px;}
      .premiumNewsWidget .widgethead .h2{font-size:16px;}
      .premiumNewsWidget .premiumNewsSlider{padding: 0 0 20px 20px;}
      }
      `}</style>
    </>
  );
}
