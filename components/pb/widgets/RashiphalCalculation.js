"use client";
import { useEffect } from "react";
//import Image from "next/image";

export default function RashiphalCalculation() {

   useEffect(() => {
    if (typeof window === "undefined") return;

    fetch("https://www.tv9hindi.com/wp-content/themes/default/microsites/astrology/compcalc.json")
      .then((response) => response.json())
      .then((data) => {
        const signSelectA = document.getElementById("signSelectA");
        const signSelectB = document.getElementById("signSelectB");
        const imgA = document.getElementById("imgA");
        const imgB = document.getElementById("imgB");
        const percentageElement = document.getElementById("compatibilityPercentage");

        if (!signSelectA || !signSelectB || !imgA || !imgB || !percentageElement) return;

        function populateSunSigns(selectElement, imgElement) {
          data.sunSigns.forEach((sign) => {
            const option = document.createElement("option");
            option.value = sign.name;
            option.textContent = `${sign.hindiName} (${sign.name})`;
            selectElement.appendChild(option);
          });

          function updateImage() {
            const selectedSign = data.sunSigns.find(
              (s) => s.name === selectElement.value
            );

            if (selectedSign) {
              imgElement.src = selectedSign.image;
              imgElement.alt = selectedSign.hindiName;
            }

            updateCompatibilityPercentage();
          }

          selectElement.addEventListener("change", updateImage);

          updateImage();
        }

        function updateCompatibilityPercentage() {
          const signA = signSelectA.value;
          const signB = signSelectB.value;

          if (signA && signB) {
            const key1 = `${signA}-${signB}`;
            const key2 = `${signB}-${signA}`;

            const compatibility =
              data.compatibility[key1] ||
              data.compatibility[key2] ||
              0;

            animatePercentageChange(compatibility);
          }
        }

        function animatePercentageChange(target) {
          let current = 0;
          const step = 5;

          const animate = () => {
            current += step;
            if (current < target) {
              percentageElement.textContent = `${current}%`;
              requestAnimationFrame(animate);
            } else {
              percentageElement.textContent = `${target}%`;
            }
          };

          animate();
        }

        populateSunSigns(signSelectA, imgA);
        populateSunSigns(signSelectB, imgB);

        // default values
        signSelectA.value = "Libra";
        signSelectB.value = "Libra";

        signSelectA.dispatchEvent(new Event("change"));
        signSelectB.dispatchEvent(new Event("change"));
      })
      .catch((err) => {
        console.error("Error fetching JSON:", err);
      });
  }, []);

  return (
    <>
      <div className="compCalc_Widget">
    <div className="tv9common-heading">
        <h2 className="h2"> किस राशि के साथ आपकी जोड़ी है हिट!</h2>
    </div>
    <div className="calculation_wrapper">
        <div className="sunSign_Wrap">
            <div className="sunSignSelect_Wrap sunSignA">
                <div className="img_wrap">
                    <img id="imgA" width="80" height="81" src="https://static.news9live.com/wp-content/uploads/2024/12/libra-icon.png" alt="तुला"/>
                </div>
                <select id="signSelectA" className="signselect" aria-label="Select the first sun sign">
                    
                <option value="Aries">मेष (Aries)</option><option value="Taurus">वृषभ (Taurus)</option><option value="Gemini">मिथुन (Gemini)</option><option value="Cancer">कर्क (Cancer)</option><option value="Leo">सिंह (Leo)</option><option value="Virgo">कन्या (Virgo)</option><option value="Libra">तुला (Libra)</option><option value="Scorpio">वृश्चिक (Scorpio)</option><option value="Sagittarius">धनु (Sagittarius)</option><option value="Capricorn">मकर (Capricorn)</option><option value="Aquarius">कुंभ (Aquarius)</option><option value="Pisces">मीन (Pisces)</option></select>
            </div>
            <div className="addition">
                <svg>
                  <use href="#IconPlus" />
                </svg>
            </div>
            <div className="sunSignSelect_Wrap sunSignB">
                <div className="img_wrap">
                    <img id="imgB" width="80" height="81" src="https://static.news9live.com/wp-content/uploads/2024/12/leo-icon.png" alt="सिंह"/>
                </div>
                <select id="signSelectB" className="signselect" aria-label="Select the second sun sign">
                    
                <option value="Aries">मेष (Aries)</option><option value="Taurus">वृषभ (Taurus)</option><option value="Gemini">मिथुन (Gemini)</option><option value="Cancer">कर्क (Cancer)</option><option value="Leo">सिंह (Leo)</option><option value="Virgo">कन्या (Virgo)</option><option value="Libra">तुला (Libra)</option><option value="Scorpio">वृश्चिक (Scorpio)</option><option value="Sagittarius">धनु (Sagittarius)</option><option value="Capricorn">मकर (Capricorn)</option><option value="Aquarius">कुंभ (Aquarius)</option><option value="Pisces">मीन (Pisces)</option></select>
            </div>
        </div>
        <div className="equals"></div>
        <div className="resultWrap">
            <strong id="compatibilityPercentage">85%</strong>
                    </div>
    </div>
</div>
      <style jsx>{`
      .compCalc_Widget{background:#f8f8f8;position:relative;padding:1.56rem;margin-bottom:1.88rem}
.compCalc_Widget .tv9common-heading{justify-content:center}
.compCalc_Widget .tv9common-heading::before{display:none;}
.compCalc_Widget .tv9common-heading .h2{color:#190388;background-color:transparent;padding-right:0;}
.compCalc_Widget::before{content:'';background-image:url(https://images.news9live.com/wp-content/uploads/2024/12/cc-left-bg-1.png);width:6.8125rem;height:6.125rem;position:absolute;left:0;top:0}
.compCalc_Widget::after{content:'';background-image:url(https://images.news9live.com/wp-content/uploads/2024/12/cc-right-bg-1.png);width:5rem;height:4.75rem;position:absolute;right:0;bottom:0}
.compCalc_Widget .calculation_wrapper{position:relative;z-index:1;display:flex;justify-content:center;align-items:center}
.compCalc_Widget .calculation_wrapper .sunSign_Wrap{border-radius:.625rem;border:1px solid #e8eafb;background:#fff;padding:1.25rem;display:flex;justify-content:space-between;align-items:center;min-height:6.25rem}
.compCalc_Widget .calculation_wrapper .sunSignSelect_Wrap{display:flex;justify-content:flex-start;align-items:center}
.compCalc_Widget .calculation_wrapper .sunSignSelect_Wrap .img_wrap img{width:60px;height:60px;display:block;margin-right:.62rem}
.compCalc_Widget .calculation_wrapper .sunSignSelect_Wrap .signselect{border-radius:.625rem;border:1px solid #e8eafb;background:#fff;padding:.62rem;cursor:pointer;color:#000;font-size:1rem;}
.compCalc_Widget .calculation_wrapper .sunSignSelect_Wrap.sunSignB{flex-direction:row-reverse}
.compCalc_Widget .calculation_wrapper .sunSignSelect_Wrap.sunSignB .img_wrap img{margin-left:.62rem;margin-right:0}
.compCalc_Widget .calculation_wrapper .resultWrap{border-radius:.625rem;border:1px solid #e8eafb;background:#fff;padding:1.25rem;min-height:6.25rem;display:flex;justify-content:center;align-items:center;min-width:11.5rem}
.compCalc_Widget .calculation_wrapper .resultWrap strong{color:#16027b;font-size:2rem;font-weight:600;line-height:.75rem;text-transform:capitalize}
.compCalc_Widget .calculation_wrapper .resultWrap small{color:#464343;font-size:.875rem;font-weight:300;line-height:.75rem;text-transform:capitalize;margin-left:.41rem}
.compCalc_Widget .calculation_wrapper .sunSign_Wrap .addition svg{width:1.375rem;height:1.375rem;margin:0 .62rem}
.compCalc_Widget .calculation_wrapper .equals{position: relative;margin:0 .94rem}
.compCalc_Widget .calculation_wrapper .equals::after{content:'';background-image:url(https://static.tv9hindi.com/wp-content/uploads/2025/04/sign-equal.png);width:1.375rem;height:1.375rem;display:block;}
@media(max-width:767px){
    .compCalc_Widget{margin:0 -0.625rem 1.88rem -0.625rem}
    .compCalc_Widget .tv9common-heading .h2{text-align:center;}
    .compCalc_Widget .calculation_wrapper{flex-wrap:wrap;}
    .compCalc_Widget .calculation_wrapper .sunSign_Wrap{display:block;width: 100%;text-align: center;}
    .compCalc_Widget .calculation_wrapper .sunSignSelect_Wrap .img_wrap img{margin-bottom:0;margin-right:0.62rem;}
    .compCalc_Widget .calculation_wrapper .resultWrap{width:100%;min-height:unset;}
    .compCalc_Widget .calculation_wrapper .equals{margin:0.3125rem 0}
    .compCalc_Widget .calculation_wrapper .equals::after{background-image:url(https://static.tv9hindi.com/wp-content/uploads/2025/04/tabler_arrow-down.png);}
    .compCalc_Widget .calculation_wrapper .sunSign_Wrap .addition svg{margin:.62rem}
    .compCalc_Widget .calculation_wrapper .sunSignSelect_Wrap.sunSignB .img_wrap img{margin-bottom:0;margin-right:0.62rem;margin-left: 0;}
    .compCalc_Widget .calculation_wrapper .sunSignSelect_Wrap .signselect{width: calc(100% - 70px);}
    .compCalc_Widget .calculation_wrapper .sunSignSelect_Wrap.sunSignB{flex-direction:inherit;}
}
      `}</style>
    </>
  );
}