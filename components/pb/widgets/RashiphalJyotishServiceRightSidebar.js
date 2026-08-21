import Image from "next/image";
import useSplide from "@/hooks/useSplide";

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

export default function RashiphalJyotishServiceRightSidebar({
  title = "",
  items = [],
  dataConfig = {},
}) {
  const desc = decodeHtml(dataConfig?.description || "");

  // ✅ fallback static data
  const sliderData = items.length
    ? items
    : [
        { href: "/astrology/kundli-details", title: "आपकी कुंडली", image: "https://images.tv9hindi.com/wp-content/uploads/2025/12/astro-kundali.png" },
        { href: "/astrology/planets-for-you", title: "आपके ग्रह", image: "https://images.tv9hindi.com/wp-content/uploads/2025/12/astro-grah.png" },
        { href: "/astrology/career-prediction", title: "करियर भविष्य", image: "https://images.tv9hindi.com/wp-content/uploads/2025/12/astro-career.png" },
        { href: "/astrology/marriage-prediction", title: "विवाह भविष्य", image: "https://images.tv9hindi.com/wp-content/uploads/2025/12/astro-vivah.png" },
        { href: "/astrology/health-prediction", title: "स्वास्थ्य भविष्य", image: "https://images.tv9hindi.com/wp-content/uploads/2025/12/astro-health.png" },
        { href: "/astrology/financial-prediction", title: "आर्थिक भविष्य", image: "https://images.tv9hindi.com/wp-content/uploads/2025/12/astro-wealth.png" },
        { href: "/astrology/real-sunsign", title: "वास्तविक सूर्य राशि", image: "https://images.tv9hindi.com/wp-content/uploads/2025/12/astro-grah.png" },
        { href: "/astrology/nakshatra-birthday", title: "नक्षत्र जन्मदिन", image: "https://images.tv9hindi.com/wp-content/uploads/2025/12/astro-nakshatra.png" },
      ];

  // ✅ chunk into slides (4 cards per slide)
  const chunk = (arr, size) =>
    arr.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);

  const slides = chunk(sliderData, 4);

  // ✅ useSplide hook (your system)
  const sliderRef = useSplide(
    {
      perPage: 1,
      gap: "10px",
      arrows: false,
      pagination: true,
    },
    [slides.length]
  );

  if (!slides.length) return null;

  return (
    <>
      <div className="astroServicesRHS_Wrapper">
        <div className="widgetLogo">
          <img
            width="50"
            height="38"
            src="https://images.tv9hindi.com/wp-content/uploads/2025/12/tv9-icon-1.png"
            alt="TV9"
          />
        </div>

        <div className="widgetTitle">{title}</div>
        {desc && <div className="widgetDesc">{desc}</div>}

        <div ref={sliderRef} className="splide astroServices_Slider">
          <div className="splide__track">
            <div className="splide__list">
              {slides.map((group, idx) => (
                <div className="splide__slide" key={idx}>
                  <div className="gridCol_Wrapper">
                    {group.map((item, i) => (
                      <div
                        className="card-wrapper"
                        key={item?.id || i}
                        data-redirect={item.href}
                      >
                        <div className="imgThumb">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={50}
                            height={50}
                            unoptimized
                          />
                        </div>
                        <div className="card-title">
                          {item.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
      .astroServicesRHS_Wrapper{border-radius:10px;border:1px dashed #FFCA8E;background:#FFF7EE;padding:1.25rem;margin-bottom:1.25rem}
      .astroServicesRHS_Wrapper .widgetLogo{display:flex;justify-content:center;align-items:center;margin-bottom:1.25rem;}
      .astroServicesRHS_Wrapper .widgetTitle{color:#000;font-size:1.5rem;font-weight:700;line-height:1;text-align:center;margin-bottom:0.9375rem}
      .astroServicesRHS_Wrapper .widgetDesc{color:#000;text-align:center;font-size:0.875rem;line-height:1.25rem;margin-bottom:1.375rem}
      .astroServicesRHS_Wrapper .gridCol_Wrapper{display:grid;grid-template-columns:repeat(2, 1fr);gap:1rem;padding-bottom:0.3125rem}
      .astroServicesRHS_Wrapper .card-wrapper{border-radius:0.625rem;background:#FFF;box-shadow:0 2px 2px 0 rgba(255, 218, 177, 0.60);text-align:center;padding:1rem 1rem 1.5rem 1rem}
      .astroServicesRHS_Wrapper .card-wrapper .imgThumb{width:62px;height:62px;border:1px solid #FFCA8E;border-radius:62px;margin:0 auto 0.9375rem auto;display:flex;justify-content:center;align-items:center;}
      .astroServicesRHS_Wrapper .card-wrapper .imgThumb img{width:50px;height:50px;border-radius:50px;display:block;}
      .astroServicesRHS_Wrapper .card-wrapper .card-title{color:#000;font-size:1rem;line-height:1.375rem;font-weight:500}
      .astroServices_Slider{padding-bottom:1.6825rem;height:fit-content}
      .astroServices_Slider .splide__pagination{bottom:0}
      .astroServices_Slider .splide__pagination__page{opacity:1;background:#BCBCBC;width:0.375rem;height:0.375rem;margin:0 3px}
      .astroServices_Slider .splide__pagination__page.is-active{background:#626262;width:0.875rem;height:0.375rem;border-radius:1.25rem;transform:unset}
      `}</style>
    </>
  );
}