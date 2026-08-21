'use client';

import { useLayoutEffect, useRef, useState } from "react";

const FAQ_ITEMS = [
  {
    question: "1. आज नई दिल्ली का तापमान कितना है?",
    answer: "आज नई दिल्ली का तापमान करीब 36°C है.",
  },
  {
    question: "2. आज नई दिल्ली का न्यूनतम तापमान कितना रहेगा?",
    answer: "नई दिल्ली में आज न्यूनतम तापमान 30°C रहने की संभावना है.",
  },
  {
    question: "3. आज नई दिल्ली का अधिकतम तापमान कितना रहेगा?",
    answer: "नई दिल्ली में आज अधिकतम तापमान 42°C रहने की संभावना है.",
  },
  {
    question: "4. नई दिल्ली में कल तापमान कितना रहेगा?",
    answer: "कल नई दिल्ली में तापमान न्यूनतम 31°C और अधिकतम 41°C रहने की संभावना है.",
  },
  {
    question: "5. कल नई दिल्ली में सूर्योदय कितने बजे होगा?",
    answer: "नई दिल्ली में कल सूर्योदय 05:22 AM बजे होगा.",
  },
  {
    question: "6. कल नई दिल्ली में सूर्यास्त कितने बजे होगा?",
    answer: "नई दिल्ली में कल सूर्यास्त 07:20 PM बजे होगा.",
  },
  {
    question: "7. क्या नई दिल्ली में कल बारिश होगी?",
    answer: "कल नई दिल्ली में बारिश होने की संभावना 2 प्रतिशत है.",
  },
];

export default function WeatherFaqWidget() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [heights, setHeights] = useState([]);
  const contentRefs = useRef([]);

  const measureHeights = () => {
    setHeights(
      contentRefs.current.map((el) => (el ? el.scrollHeight : 0))
    );
  };

  useLayoutEffect(() => {
    measureHeights();
    window.addEventListener("resize", measureHeights);
    return () => window.removeEventListener("resize", measureHeights);
  }, []);

  const handleHeadingClick = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <div className="faqWidget_Wrapper" id="faqWrap">
        <div className="container">
          <div className="custom-heading">
            <h2 className="h2">अक्सर पूछे जाने वाले सवाल</h2>
          </div>
          <div className="faqWidgetItems_List">
            {FAQ_ITEMS.map((item, index) => (
              <div className="FaqItem" key={item.question}>
                <button
                  type="button"
                  className={`FaqHeading${activeIndex === index ? " active" : ""}`}
                  onClick={() => handleHeadingClick(index)}
                >
                  <span>{item.question}</span>
                </button>
                <div
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  className="FaqItemContent"
                  style={{
                    maxHeight:
                      activeIndex === index && heights[index]
                        ? `${heights[index]}px`
                        : undefined,
                  }}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`.faqWidget_Wrapper{padding:1rem 0;margin-bottom:1.75rem}
    .faqWidget_Wrapper .faqWidgetItems_List{border-radius:.875rem;background:#fff;box-shadow:0 0 12px 0 rgba(96,113,121,.1);padding:2.62rem 3.75rem}
    #faqWrap .FaqItem{margin-bottom:1.125rem;padding-bottom:1.125rem;border-bottom:1px solid #e7eef1}
    #faqWrap .FaqItem:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
    #faqWrap .FaqHeading{cursor:pointer;width:100%;border:none;background:none;text-align:left;font-size:1.125rem;line-height:1.125rem;transition:.4s;font-weight:600;color:#000;position:relative;display:flex;justify-content:space-between;align-items:center;list-style:none}
    #faqWrap .FaqHeading::-webkit-details-marker{display:none}
    #faqWrap .FaqHeading::marker{content:""}
    #faqWrap .FaqHeading span{width:calc(100% - 30px)}
    #faqWrap .FaqHeading::after{content:'\\002B';color:#000;font-weight:600;font-size:1.25rem;line-height:22px;height:1.25rem;width:1.25rem;border:2px solid #000;border-radius:100px;padding:1px;display:flex;justify-content:center;align-items:center;flex-shrink:0}
    #faqWrap .FaqHeading.active::after{content:"\\2212"}
    #faqWrap .FaqItemContent{width:100%;max-height:0;overflow:hidden;transition:max-height .5s ease-out;font-size:1rem;line-height:2.25rem;font-weight:400;color:#494949;padding-top:.5rem}
    #faqWrap .FaqItemContent p{margin-bottom:.5rem}
    #faqWrap .FaqItemContent p:last-child{margin-bottom:0}
    @media(max-width:767px){
      .faqWidget_Wrapper .faqWidgetItems_List{padding:2rem 1rem}
      #faqWrap .FaqHeading{font-size:.9375rem;line-height:1.125rem}
      #faqWrap .FaqItemContent{font-size:.875rem;line-height:1.3125rem}
    }
  `}</style>
    </>
  );
}
