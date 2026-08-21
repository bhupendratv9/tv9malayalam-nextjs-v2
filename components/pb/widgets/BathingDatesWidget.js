

import Image from "next/image";

export default function BathingDatesWidget() {
  return (
    <>
<section className="mahakumbh_snanDate">
    <div className="container">
            <div className="event_heading">
                <h2 className="h2">स्नान तिथियाँ</h2>
            </div>
            <div className="snamDate_Wrap">
                <figure>
                    <a href="https://www.tv9hindi.com/religion/mahakumbh-202-ist-shahi-snan-date-paush-purnima-shahi-snan-subh-muhurat-3008288.html" target="_blank">
                        <div className="imgWrap">
                            <Image src="https://images.tv9hindi.com/wp-content/uploads/2025/01/snan-img-1.png" alt="पौष पूर्णिमा" width={300} height={225} loading="lazy" style={{ width: "100%", height: "auto" }} />
                        </div>
                        <div className="cardTitle">
                            <span className="h3">पौष पूर्णिमा</span>
                            <span className="dateWrap">13 जनवरी 2025</span>
                        </div>
                    </a>
                </figure>
                <figure>
                    <a href="https://www.tv9hindi.com/religion/mahakumbh-2025-2nd-shahi-snan-date-makar-sankranti-shahi-snan-subh-muhurat-3008372.html" target="_blank">
                        <div className="imgWrap">
                            <Image src="https://images.tv9hindi.com/wp-content/uploads/2025/01/snan-img-2.png" alt="मकर संक्रांति" width={300} height={225} loading="lazy" style={{ width: "100%", height: "auto" }} />
                        </div>
                        <div className="cardTitle">
                            <span className="h3">मकर संक्रांति</span>
                            <span className="dateWrap">14 जनवरी 2025</span>
                        </div>
                    </a>
                </figure>
                <figure>
                    <a href="https://www.tv9hindi.com/religion/mahakumbh-2025-mauni-amavasya-shahi-snan-date-and-subh-muhurat-3009512.html" target="_blank">
                        <div className="imgWrap">
                            <Image src="https://images.tv9hindi.com/wp-content/uploads/2025/01/snan-img-3.png" alt="मौनी अमावस्या" width={300} height={225} loading="lazy" style={{ width: "100%", height: "auto" }} />
                        </div>
                        <div className="cardTitle">
                            <span className="h3">मौनी अमावस्या</span>
                            <span className="dateWrap">29 जनवरी 2025</span>
                        </div>
                    </a>
                </figure>
                <figure>
                    <a href="https://www.tv9hindi.com/religion/mahakumbh-2025-basant-panchami-shahi-snan-date-and-subh-muhurat-3009609.html" target="_blank">
                        <div className="imgWrap">
                            <Image src="https://images.tv9hindi.com/wp-content/uploads/2025/01/snan-img-4.png" alt="वसन्त पञ्चमी" width={300} height={225} loading="lazy" style={{ width: "100%", height: "auto" }} />
                        </div>
                        <div className="cardTitle">
                            <span className="h3">वसन्त पञ्चमी</span>
                            <span className="dateWrap">03 फरवरी 2025</span>
                        </div>
                    </a>
                </figure>
                <figure>
                    <a href="https://www.tv9hindi.com/religion/mahakumbh-2025-magh-purnima-shahi-snan-date-story-subh-muhurat-3009741.html" target="_blank">
                        <div className="imgWrap">
                            <Image src="https://images.tv9hindi.com/wp-content/uploads/2025/01/snan-img-5.png" alt="माघी पूर्णिमा" width={300} height={225} loading="lazy" style={{ width: "100%", height: "auto" }} />
                        </div>
                        <div className="cardTitle">
                            <span className="h3">माघी पूर्णिमा</span>
                            <span className="dateWrap">12 फरवरी 2025</span>
                        </div>
                    </a>
                </figure>
                <figure>
                    <a href="https://www.tv9hindi.com/religion/mahakumbh-2025-shahi-snan-maha-shivratri-shahi-snan-date-and-subh-muhurat-3009910.html" target="_blank">
                        <div className="imgWrap">
                            <Image src="https://images.tv9hindi.com/wp-content/uploads/2025/01/snan-img-6.png" alt="महाशिवरात्रि" width={300} height={225} loading="lazy" style={{ width: "100%", height: "auto" }} />
                        </div>
                        <div className="cardTitle">
                            <span className="h3">महाशिवरात्रि</span>
                            <span className="dateWrap">26 फरवरी 2025</span>
                        </div>
                    </a>
                </figure>
            </div>
    </div>
</section>

<style>{`
     .mahakumbh_snanDate{padding:2.5rem 0;background: #F0E5E5 url(https://images.tv9hindi.com/wp-content/uploads/2025/01/wave-img.png);background-repeat: no-repeat;background-position: bottom left;background-size:100%;margin-bottom:3.125rem;}
    .mahakumbh_snanDate .snamDate_Wrap {display: grid;grid-template-columns: repeat(6, 1fr);grid-gap: 20px;}
    .mahakumbh_snanDate .snamDate_Wrap figure {background: #fff;border-radius: 12px;text-align: center;}
.mahakumbh_snanDate .snamDate_Wrap figure .imgWrap img {border-radius: 12px 12px 0 0;width: 100%;height:100%;display:block;aspect-ratio:4/3;object-fit: cover;}
.mahakumbh_snanDate .snamDate_Wrap figure .cardTitle{padding:0.375rem 1rem 1rem;}
.mahakumbh_snanDate .snamDate_Wrap figure .cardTitle .h3 {font-family: "Rozha One", serif;font-size: 1.25rem;font-weight: 400;line-height: 1.75rem;display: block;margin-bottom:0.3125rem;}
.mahakumbh_snanDate .snamDate_Wrap figure .cardTitle .dateWrap {font-family: "Anek Devanagari", serif;background: #FBD6D6;padding:0.5rem 1.125rem 0.1875rem 1.125rem;text-align: center;font-size: 0.875rem;font-weight: 600;line-height: 1.125rem;text-transform: uppercase;border-radius: 8px;}
@media(max-width: 768px) {
    .mahakumbh_snanDate .snamDate_Wrap {grid-template-columns: repeat(2, 1fr);grid-gap: 15px;}
}

    
`}</style>
</>
  );
}