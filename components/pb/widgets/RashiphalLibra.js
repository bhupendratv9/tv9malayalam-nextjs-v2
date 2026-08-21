"use client";
import { useEffect } from "react";
//import Image from "next/image";

export default function RashiphalLibra() {

   useEffect(() => {
    // Dropdown change
    const dropdown = document.getElementById("sunsignDropdown");
    if (dropdown) {
      const handleChange = function () {
        window.location.href = this.value;
      };
      dropdown.addEventListener("change", handleChange);

      // cleanup
      return () => {
        dropdown.removeEventListener("change", handleChange);
      };
    }
  }, []);

  useEffect(() => {
    // Tab function
    window.openHoro = function (evt, horoType) {
      let tabcontent = document.getElementsByClassName("tabcontent");
      for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      let tablinks = document.getElementsByClassName("tablinks");
      for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      const activeTab = document.getElementById(horoType);
      if (activeTab) activeTab.style.display = "block";

      evt.currentTarget.className += " active";
    };

    // default open
    const defaultBtn = document.getElementById("defaultOpen");
    if (defaultBtn) {
      defaultBtn.click();
    }
  }, []);

  return (
    <>
      <div className="horoscopeDetail_widget">
      <div className="tv9common-heading">
        <div className="h3"></div>

        <div className="sunsignSelect">
          <select
            id="sunsignDropdown"
            defaultValue="/religion/rashiphal/libra"
            onChange={(e) => (window.location.href = e.target.value)}
          >
            <option value="/religion/rashiphal/aries">मेष</option>
            <option value="/religion/rashiphal/taurus">वृषभ</option>
            <option value="/religion/rashiphal/gemini">मिथुन</option>
            <option value="/religion/rashiphal/cancer">कर्क</option>
            <option value="/religion/rashiphal/leo">सिंह</option>
            <option value="/religion/rashiphal/virgo">कन्या</option>
            <option value="/religion/rashiphal/libra">तुला</option>
            <option value="/religion/rashiphal/scorpio">वृश्चिक</option>
            <option value="/religion/rashiphal/sagittarius">धनु</option>
            <option value="/religion/rashiphal/capricorn">मकर</option>
            <option value="/religion/rashiphal/aquarius">कुंभ</option>
            <option value="/religion/rashiphal/pisces">मीन</option>
          </select>
        </div>
      </div>

      <div className="horoscopeDetail_Wrapper defaultOpen_yearlyHoro">
        <div className="sunSign_NameWrap">
          <figure>
            <div className="img_wrap">
              <img
                src="https://static.news9live.com/wp-content/uploads/2024/12/libra-icon.png"
                alt="Libra"
              />
            </div>
            <figcaption>
              <h1 className="h3">
                तुला <span>राशिफल</span>
              </h1>
            </figcaption>
          </figure>
        </div>

        <div className="horoscopeInfoTabs">
          <button className="tablinks active">दैनिक</button>
          <button className="tablinks">मासिक</button>
          <button className="tablinks">वार्षिक</button>
        </div>

        {/* Daily */}
        <div id="dailyHoro" className="tabcontent" style={{ display: "block" }}>
          <div className="predictionDate">
            आज का भविष्यफल <span>| 04 Jun 2026</span>
          </div>
          <div className="predDesc">
            तुला राशि वाले जातकों की पौ बारह है...{" "}
            <a href="https://www.tv9hindi.com/religion/rashiphal/aaj-ka-rashifal-04-june-2026-thursday-daily-horoscope-today-auspicious-day-for-aries-taurus-and-12-zodiac-signs-3808297.html#libra">
              Read More
            </a>
          </div>
        </div>

        {/* Monthly */}
        <div id="monthlyHoro" className="tabcontent" style={{ display: "none" }}>
          <div className="predictionDate">
            इस महीने का भविष्यफल{" "}
            <span>| 01 Jun 2026 to 30 Jun 2026</span>
          </div>
          <div className="predDesc">
            22 जून को गुरुदेव का कर्क राशि में जाना...{" "}
            <a href="https://www.tv9hindi.com/religion/rashiphal/june-horoscope-rashifal-2026-what-every-zodiac-sign-can-expect-in-career-love-health-3800340.html">
              Read More
            </a>
          </div>
        </div>

        {/* Yearly */}
        <div id="yearlyHoro" className="tabcontent" style={{ display: "none" }}>
          <div className="predictionDate">
            इस वर्ष का भविष्यफल{" "}
            <span>| 01 Jan 2026 to 31 Dec 2026</span>
          </div>
          <div className="predDesc">
            तुला राशि वालों के लिए साल की शुरुआत...{" "}
            <a href="https://www.tv9hindi.com/religion/rashiphal/libra-rashifal-horoscope-prediction-for-2026-career-money-business-health-3605392.html">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
      <style jsx>{`
      .horoscopeDetail_Wrapper{border-radius:0rem 0rem .625rem .625rem;background:#f8f6ff;padding:1.62rem 1.94rem;margin-bottom:1.88rem}
.horoscopeDetail_widget .tv9common-heading::before{display:none;}
.horoscopeDetail_widget .tv9common-heading .h3{font-size:0.875rem;}
.horoscopeDetail_widget .sunsignSelect{position:relative}
.horoscopeDetail_widget .sunsignSelect select{border-radius:.375rem;border:1px solid #e8eafb;background-color:#fff;cursor:pointer;padding:.62rem;color:#000;font-size:.875rem;font-weight:400;line-height:1rem;text-transform:uppercase;position:relative;display:flex;align-items:center}
.horoscopeDetail_Wrapper .sunSign_NameWrap{padding-bottom:.87rem;border-bottom:1px solid #dfd9f8;margin-bottom:1.25rem}
.horoscopeDetail_Wrapper .sunSign_NameWrap figure{display:flex;justify-content:center;align-items:center}
.horoscopeDetail_Wrapper .sunSign_NameWrap .img_wrap{width:80px;height:81px;margin-right:15px}
.horoscopeDetail_Wrapper .sunSign_NameWrap .img_wrap img{display:block;width:100%}
.horoscopeDetail_Wrapper .sunSign_NameWrap figcaption .h3{color:#190388;font-size:1.625rem;font-weight:600;line-height:2.225rem;text-transform:capitalize}
.horoscopeDetail_Wrapper .sunSign_NameWrap figcaption span{display:block}
.horoscopeDetail_Wrapper .sunSign_NameWrap figcaption small{color:#242424;font-size:.875rem;font-weight:400;line-height:.75rem;text-transform:capitalize}
.horoscopeInfoTabs{display:flex;justify-content:center;align-items:center}
.horoscopeInfoTabs .tablinks{border-radius:1.25rem;border:1px solid #d8d1ff;background:#f8f6ff;color:#000;font-size:.875rem;font-weight:400;line-height:.75rem;text-transform:capitalize;padding:.5rem 1.06rem;margin:0 .5rem;cursor:pointer}
.horoscopeInfoTabs .tablinks.active,.horoscopeInfoTabs .tablinks:hover{background-color:#190388;color:#fff;border-color:#190388;}
.horoscopeDetail_Wrapper .tabcontent{display:none}
.horoscopeDetail_Wrapper .tabcontent .predictionDate{color: #16027b;font-size: 1.125rem;font-weight: 600;line-height: .75rem;text-transform: capitalize;margin: 1.25rem auto;text-align: center;}
.horoscopeDetail_Wrapper .tabcontent .predictionDate span{color:#232323;font-weight:600;line-height: 26px;}
.horoscopeDetail_Wrapper .tabcontent .predDesc{color:#000;text-align:center;font-size:1.125rem;font-weight:300;line-height:1.5625rem;text-transform:capitalize}
.horoscopeDetail_Wrapper .tabcontent .predDesc a{color:#190388;font-size:1rem;font-weight:400;line-height:1.5625rem;text-transform:capitalize}
@media(max-width:767px){
.horoscopeDetail_Wrapper{padding:1.62rem 0.94rem;margin:0 -0.625rem 1.88rem -0.625rem}
.horoscopeDetail_Wrapper .sunSign_NameWrap figcaption .h3{font-size:1.5rem;line-height:1.625rem;}
.horoscopeDetail_Wrapper .sunSign_NameWrap figcaption small{font-size:.75rem;}
.horoscopeInfoTabs .tablinks{margin:0 0.3125rem;}
}
      `}</style>
    </>
  );
}
