"use client";
//import Image from "next/image";

export default function RashiphalSamachar() {
  return (
    <>
      <div className="horoscopeLanding_widget">
    <div className="widgetHead">
        <h2 className="h2"><span>राशि के अनुसार राशिफल</span></h2>
    </div>
    <div className="horoscopeLWidget_Thumbnails">
        <figure>
            <a href="/religion/rashiphal/aries">
                <div className="imgThumb"><img width="80" height="81" src="https://images.news9live.com/wp-content/uploads/2024/12/aries-icon.png" alt="मेष" /></div>
                <div className="card_title">
                    <div className="h3">मेष</div>
                    <div className="month_range">Mar 21 - Apr 19</div>
                </div>
            </a>
        </figure>
        <figure>
            <a href="/religion/rashiphal/taurus">
                <div className="imgThumb"><img width="80" height="81" src="https://images.news9live.com/wp-content/uploads/2024/12/taurus-icon.png" alt="वृषभ"/></div>
                <div className="card_title">
                    <div className="h3">वृषभ</div>
                    <div className="month_range">Apr 20 - May 20</div>
                </div>
            </a>
        </figure>
        <figure>
            <a href="/religion/rashiphal/gemini">
                <div className="imgThumb"><img width="80" height="81" src="https://images.news9live.com/wp-content/uploads/2024/12/gemini-icon.png" alt="मिथुन"/></div>
                <div className="card_title">
                    <div className="h3">मिथुन</div>
                    <div className="month_range">May 21 - Jun 20</div>
                </div>
            </a>
        </figure>
        <figure>
            <a href="/religion/rashiphal/cancer">
                <div className="imgThumb"><img width="80" height="81" src="https://images.news9live.com/wp-content/uploads/2024/12/cancer-icon.png" alt="कर्क"/></div>
                <div className="card_title">
                    <div className="h3">कर्क</div>
                    <div className="month_range">Jun 21 - Jul 22</div>
                </div>
            </a>
        </figure>
        <figure>
            <a href="/religion/rashiphal/leo">
                <div className="imgThumb"><img width="80" height="81" src="https://images.news9live.com/wp-content/uploads/2024/12/leo-icon.png" alt="सिंह"/></div>
                <div className="card_title">
                    <div className="h3">सिंह</div>
                    <div className="month_range">Jul 23 - Aug 22</div>
                </div>
            </a>
        </figure>
        <figure>
            <a href="/religion/rashiphal/virgo">
                <div className="imgThumb"><img width="80" height="81" src="https://images.news9live.com/wp-content/uploads/2024/12/virgo-icon.png" alt="कन्या"/></div>
                <div className="card_title">
                    <div className="h3">कन्या</div>
                    <div className="month_range">Aug 23 - Sep 22</div>
                </div>
            </a>
        </figure>
        <figure>
            <a href="/religion/rashiphal/libra">
                <div className="imgThumb"><img width="80" height="81" src="https://images.news9live.com/wp-content/uploads/2024/12/libra-icon.png" alt="तुला"/></div>
                <div className="card_title">
                    <div className="h3">तुला</div>
                    <div className="month_range">Sep 23 - Oct 22</div>
                </div>
            </a>
        </figure>
        <figure>
            <a href="/religion/rashiphal/scorpio">
                <div className="imgThumb"><img width="80" height="81" src="https://images.news9live.com/wp-content/uploads/2024/12/scorpio-icon.png" alt="वृश्चिक"/></div>
                <div className="card_title">
                    <div className="h3">वृश्चिक</div>
                    <div className="month_range">Oct 23 - Nov 21</div>
                </div>
            </a>
        </figure>
        <figure>
            <a href="/religion/rashiphal/sagittarius">
                <div className="imgThumb"><img width="80" height="81" src="https://images.news9live.com/wp-content/uploads/2024/12/sagitarius-icon.png" alt="धनु"/></div>
                <div className="card_title">
                    <div className="h3">धनु</div>
                    <div className="month_range">Nov 22 - Dec 21</div>
                </div>
            </a>
        </figure>
        <figure>
            <a href="/religion/rashiphal/capricorn">
                <div className="imgThumb"><img width="80" height="81" src="https://images.news9live.com/wp-content/uploads/2024/12/capricorn-icon.png" alt="मकर"/></div>
                <div className="card_title">
                    <div className="h3">मकर</div>
                    <div className="month_range">Dec 22 - Jan 19</div>
                </div>
            </a>
        </figure>
        <figure>
            <a href="/religion/rashiphal/aquarius">
                <div className="imgThumb"><img width="80" height="81" src="https://images.news9live.com/wp-content/uploads/2024/12/aquarius-icon.png" alt="कुंभ"/></div>
                <div className="card_title">
                    <div className="h3">कुंभ</div>
                    <div className="month_range">Jan 20 - Feb 18</div>
                </div>
            </a>
        </figure>
        <figure>
            <a href="/religion/rashiphal/pisces">
                <div className="imgThumb"><img width="80" height="81" src="https://images.news9live.com/wp-content/uploads/2024/12/pisces-icon.png" alt="मीन"/></div>
                <div className="card_title">
                    <div className="h3">मीन</div>
                    <div className="month_range">Feb 19 - Mar 20</div>
                </div>
            </a>
        </figure>
    </div>
</div>
      <style jsx>{`
.horoscopeLanding_widget{background:linear-gradient(180deg,#05103f .53%,#030a2e 67.91%,#00041c 125.24%);padding:2rem 2rem 3rem 2rem;position:relative;margin-bottom:1.88rem;overflow:hidden;}
.horoscopeLanding_widget::before{content:'';background-image:url(https://images.news9live.com/wp-content/uploads/2024/12/astrology/horoscope-bg.png);position:absolute;top:0;left:0;background-size:100% 100%;width:100%;height:27.4375rem;z-index:0}
.horoscopeLanding_widget .widgetHead{position:relative;display:flex;align-items:center;margin-bottom:1.5rem}
.horoscopeLanding_widget .widgetHead .h2{color:#fff;display:flex;align-items:baseline;justify-content:flex-start}
.horoscopeLanding_widget .widgetHead .h2 span{display:flex;align-items:center;font-size:1.5rem;line-height:1.75rem;font-weight:700;position: relative;padding-left:1.875rem;}
.horoscopeLanding_widget .widgetHead .h2 span::before{content:'';background-image:url(https://images.news9live.com/wp-content/uploads/2024/12/heading-icon.png);width:1.625rem;height:1.625rem;position:absolute;left:0}
.horoscopeLanding_widget .widgetHead .h2 small{font-size:.875rem;line-height:1.75rem;font-weight:400;margin-left:.3125rem}
.horoscopeLWidget_Thumbnails{display:grid;grid-template-columns:repeat(6,1fr);gap:1.38rem;position:relative;z-index:1}
.horoscopeLWidget_Thumbnails figure{text-align:center}
.horoscopeLWidget_Thumbnails .imgThumb{width:80px;height:81px;margin:0 auto .61rem auto;border-radius:50%;box-shadow: 0px 0px 22px 0px rgba(220, 66, 228, 0.34);}
.horoscopeLWidget_Thumbnails .imgThumb img{display:block;width:100%;}
.horoscopeLWidget_Thumbnails .card_title .h3{color:#fff;font-size:1.125rem;font-weight:600;line-height:1rem;text-transform:capitalize}
.horoscopeLWidget_Thumbnails .card_title .month_range{color:#b5a6f4;font-size:.75rem;font-weight:400;line-height:.75rem;text-transform:capitalize;padding:.61rem 0;border-bottom:1px solid #4d427b;display:inline-block}
.horoscopeLWidget_Thumbnails .card_title .month_range{display:none;}
@media(max-width:767px){
    .horoscopeLanding_widget{margin: 0 -0.625rem 1.88rem -0.625rem;padding:1rem 1rem 2rem 1rem}
    .horoscopeLanding_widget .widgetHead{display: flex;align-items: center;margin-bottom: 1.5rem;justify-content: center;}
    .horoscopeLanding_widget .widgetHead .h2{justify-content: center;flex-wrap: wrap;}
    .horoscopeLanding_widget .widgetHead .h2 span{font-size: 1.5625rem;line-height: 1.75rem;}
    .horoscopeLanding_widget .widgetHead .h2 small{display: block;width: 100%;text-align: center;}
    .horoscopeLWidget_Thumbnails{grid-template-columns: repeat(3,1fr);}
  }
      `}</style>
    </>
  );
}