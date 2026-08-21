import Image from "next/image";

export default function HomeAstroServicesWidget() {
  return (
    <>
        <div className="astro-services-wrapper">
            <h2 className="astro-title">ज्योतिष सेवाएं</h2>
            <div className="astro-desc">
            जन्म कुंडली के गहन अध्ययन से करियर, विवाह, स्वास्थ्य की सटीक भविष्यवाणियां और
            मांगलिक, पितृ दोष आदि का ज्योतिषीय समाधान प्राप्त करें
            </div>
            <div className="astro-service-grid">
                <div className="astro-card" data-redirect="/astrology/kundli-details">
                    <div className="imgThumb">
                        <Image width={50} height={50} src="https://images.tv9hindi.com/wp-content/uploads/2025/12/astro-kundali.png" alt="आपकी कुंडली" />
                    </div>
                    <div className="title" title="आपकी कुंडली">आपकी कुंडली</div>
                </div>

                <div className="astro-card" data-redirect="/astrology/planets-for-you">
                    <div className="imgThumb">
                        <Image width={50} height={50} src="https://images.tv9hindi.com/wp-content/uploads/2025/12/astro-grah.png" alt="आपके ग्रह" />
                    </div>
                    <div className="title" title="आपके ग्रह">आपके ग्रह</div>
                </div>

                <div className="astro-card" data-redirect="/astrology/career-prediction">
                    <div className="imgThumb">
                        <Image width={50} height={50} src="https://images.tv9hindi.com/wp-content/uploads/2025/12/astro-career.png" alt="करियर भविष्य" />
                    </div>
                    <div className="title" title="करियर भविष्य">करियर भविष्य</div>
                </div>

                <div className="astro-card" data-redirect="/astrology/marriage-prediction">
                    <div className="imgThumb">
                        <Image width={50} height={50} src="https://images.tv9hindi.com/wp-content/uploads/2025/12/astro-vivah.png" alt="विवाह भविष्य" />
                    </div>
                    <div className="title" title="विवाह भविष्य">विवाह भविष्य</div>
                </div>

                <div className="astro-card" data-redirect="/astrology/health-prediction">
                    <div className="imgThumb">
                        <Image width={50} height={50} src="https://images.tv9hindi.com/wp-content/uploads/2025/12/astro-health.png" alt="स्वास्थ्य भविष्य" />
                    </div>
                    <div className="title" title="स्वास्थ्य भविष्य">स्वास्थ्य भविष्य</div>
                </div>

                <div className="astro-card" data-redirect="/astrology/financial-prediction">
                    <div className="imgThumb">
                        <Image width={50} height={50} src="https://images.tv9hindi.com/wp-content/uploads/2025/12/astro-wealth.png" alt="आर्थिक भविष्य" />
                    </div>
                    <div className="title" title="आर्थिक भविष्य">आर्थिक भविष्य</div>
                </div>
            </div>

            <div className="astro-viewmore">
                <a href="/religion/rashiphal" title="View More">View More</a>
            </div>
        </div>
        <style jsx>{`
        .astro-services-wrapper{background: linear-gradient(0deg, #FFD5CF -21.85%, #FFF3E6 55.52%); padding: 25px 20px; border-radius: 10px; text-align: center; max-width: 1320px; margin: auto; border: 1px dashed #FFCA8E; margin-bottom: 30px; position: relative; overflow: hidden;}
        .astro-services-wrapper::before { content: ""; position: absolute; left: -172px; top: 0; width: 344px; height: 100%; background: url("https://static.tv9hindi.com/wp-content/themes/default/images/left-zodiac.svg") no-repeat left center; background-size: contain; opacity: 0.5; pointer-events: none; animation: zodiacRotate 60s linear infinite; transform-origin: center center;}
        @keyframes zodiacRotate { from {transform: rotate(0deg); }
        to {     transform: rotate(360deg); }
        }
        .astro-services-wrapper::after { content: ""; position: absolute; right: 10px; top: 20px; width: 178px; height: 302px; background: url("https://static.tv9hindi.com/wp-content/themes/default/images/right-sun.svg") no-repeat center; background-size: contain; opacity: 0.5; pointer-events: none;}
        .astro-title { font-size: 32px; font-weight: 700; margin-bottom: 10px; line-height: 42px;}
        .astro-desc { font-size: 18px; color: #333; max-width: 700px; margin: auto; margin-bottom: 20px; line-height: 24px;}
        .astro-service-grid { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;}
        .astro-card { background: #fff; border-radius: 12px; padding: 15px; width: 122px; text-align: center; transition: .3s; border: 0.7px solid rgba(255, 225, 216, 1); position: relative; box-shadow: 0px 2px 2px rgba(255, 175, 154, 0.3);}
        .astro-card::after { content: ""; position: absolute; inset: 6px; border-radius: 14px; border: 1px dashed #FFCA8E; pointer-events: none;}
        .astro-card:hover { transform: translateY(-4px);}
        .astro-card .imgThumb {width: 72px; height: 72px; border: 1px solid #FFCA8E; border-radius: 62px; display: flex; justify-content: center; align-items: center; margin: 0 auto 10px auto;}
        .astro-card .imgThumb img {width: 60px; height: 60px; border-radius: 50px; display: block;}
        .astro-card .title {color: #000; font-size: 1rem; line-height: 0.75rem; font-weight: 500;}
        .astro-services-wrapper .astro-viewmore { margin-top: 20px;}
        .astro-services-wrapper .astro-viewmore a { color: #ff0000; font-size: 14px; text-decoration: none; font-weight: 500; position: relative;}
        .astro-services-wrapper .astro-viewmore a::after { content: ""; border-left: 6px solid #ff0000; border-top: 4px solid transparent; border-bottom: 4px solid transparent; display: inline-block; margin-left: 6px;}
        @media (max-width:600px) { .astro-services-wrapper::before {top: -170px; }
        .astro-service-grid { gap: 10px; }
        }
        `}</style>
    </>
  );
}