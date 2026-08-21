import useSplide from "@/hooks/useSplide";

// Static zodiac data — each entry drives one slide figure
const ZODIAC_SIGNS = [
    { slug: "aries",       label: "मेष",     range: "Mar 21 - Apr 19", img: "https://images.news9live.com/wp-content/uploads/2024/12/aries-icon.png"       },
    { slug: "taurus",      label: "वृषभ",    range: "Apr 20 - May 20", img: "https://images.news9live.com/wp-content/uploads/2024/12/taurus-icon.png"      },
    { slug: "gemini",      label: "मिथुन",   range: "May 21 - Jun 20", img: "https://images.news9live.com/wp-content/uploads/2024/12/gemini-icon.png"      },
    { slug: "cancer",      label: "कर्क",    range: "Jun 21 - Jul 22", img: "https://images.news9live.com/wp-content/uploads/2024/12/cancer-icon.png"      },
    { slug: "leo",         label: "सिंह",    range: "Jul 23 - Aug 22", img: "https://images.news9live.com/wp-content/uploads/2024/12/leo-icon.png"         },
    { slug: "virgo",       label: "कन्या",   range: "Aug 23 - Sep 22", img: "https://images.news9live.com/wp-content/uploads/2024/12/virgo-icon.png"       },
    { slug: "libra",       label: "तुला",    range: "Sep 23 - Oct 22", img: "https://images.news9live.com/wp-content/uploads/2024/12/libra-icon.png"       },
    { slug: "scorpio",     label: "वृश्चिक", range: "Oct 23 - Nov 21", img: "https://images.news9live.com/wp-content/uploads/2024/12/scorpio-icon.png"     },
    { slug: "sagittarius", label: "धनु",     range: "Nov 22 - Dec 21", img: "https://images.news9live.com/wp-content/uploads/2024/12/sagitarius-icon.png"  },
    { slug: "capricorn",   label: "मकर",     range: "Dec 22 - Jan 19", img: "https://images.news9live.com/wp-content/uploads/2024/12/capricorn-icon.png"   },
    { slug: "aquarius",    label: "कुंभ",    range: "Jan 20 - Feb 18", img: "https://images.news9live.com/wp-content/uploads/2024/12/aquarius-icon.png"    },
    { slug: "pisces",      label: "मीन",     range: "Feb 19 - Mar 20", img: "https://images.news9live.com/wp-content/uploads/2024/12/pisces-icon.png"      },
];

export default function HoroscopeSlider({
    title = "2026 का आपका राशिफल",
    items = [],
    dataConfig = {},
}) {
    // Use the project's useSplide hook — handles retry, destroy, and cleanup
    const sliderRef = useSplide({
        perPage:    8,
        pagination: false,
        arrows:     true,
        perMove:    1,
        focus:      0,
        omitEnd:    true,
        breakpoints: {
            1000: { perPage: 8 },
            480:  { perPage: 3.5 },
        },
    });

    return (
        <>
            <div className="horoscopeSlider_Wrapper">
                <div className="tv9common-heading">
                    <h2 className="h2">{title}</h2>
                </div>

                {/* Only the root + splide__track + splide__list needed — Splide builds the rest */}
                <div ref={sliderRef} className="splide sunSign_Slider">
                    <div className="splide__track">
                        <ul className="splide__list">
                            {ZODIAC_SIGNS.map((sign) => (
                                <li key={sign.slug} className="splide__slide">
                                    <a href={`/religion/rashiphal/${sign.slug}`}>
                                        <div className="imgThumb">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={sign.img}
                                                alt={sign.label}
                                                width="80"
                                                height="81"
                                            />
                                        </div>
                                        <div className="card_title">
                                            <div className="h3">{sign.label}</div>
                                            <div className="month_range">{sign.range}</div>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .horoscopeSlider_Wrapper{margin-bottom:1.88rem}
                .horoscopeSlider_Wrapper .tv9common-heading{justify-content:center;margin-bottom:1.25rem;}
                .horoscopeSlider_Wrapper .tv9common-heading::before{display:none;}
                .horoscopeSlider_Wrapper .sunSign_Slider li{text-align:center;list-style:none;}
                .horoscopeSlider_Wrapper .sunSign_Slider .imgThumb{background-color:#fff;filter:drop-shadow(0 4px 4px rgba(17,1,101,.25));width:78px;height:79px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto .75rem auto}
                .horoscopeSlider_Wrapper .sunSign_Slider .imgThumb img{display:block;width:66px;height:67px}
                .horoscopeSlider_Wrapper .sunSign_Slider .card_title .h3{color:#2f2f2f;font-size:1rem;font-weight:600;line-height:1rem;text-transform:capitalize}
                .horoscopeSlider_Wrapper .sunSign_Slider .card_title .month_range{color:#a4a4a4;font-size:.75rem;font-style:normal;font-weight:400;line-height:.75rem;text-transform:capitalize;margin-top:.5rem;}
                .horoscopeSlider_Wrapper .sunSign_Slider .splide__arrow{background:#fff;opacity:1;filter:drop-shadow(0 4px 4px rgba(17,1,101,.25));top:32%}
                .horoscopeSlider_Wrapper .sunSign_Slider .splide__arrow:disabled{opacity:.3}
                .horoscopeSlider_Wrapper .sunSign_Slider .splide__arrow svg{fill:#8b8b8b;}
                .horoscopeSlider_Wrapper .sunSign_Slider .splide__arrow--prev{left:0}
                .horoscopeSlider_Wrapper .sunSign_Slider .splide__arrow--next{right:0}
                @media(max-width:767px){
                    .horoscopeSlider_Wrapper{margin:0 -0.625rem 1.88rem -0.625rem;}
                    .horoscopeSlider_Wrapper .sunSign_Slider .splide__arrow{display:none;}
                }
            `}</style>
        </>
    );
}
