import { useLayoutEffect, useRef, useState } from "react";

const FAQ_ITEMS = [
  {
    question: "सवाल- IPL में किसी भी टीम को एक मैच जीतने पर कितने पॉइंट्स मिलते हैं?",
    answer: "जवाब :- हर मैच के लिए 2 पॉइंट्स तय होते हैं. जीत दर्ज करने वाली टीम को 2 पॉइंट्स मिलते हैं.",
  },
  {
    question: "सवाल- क्या IPL में एक मैच के पॉइंट्स दोनों टीमों में बंट सकते हैं?",
    answer: "जवाब :- हां, अगर खराब मौसम या किसी अन्य वजह से मैच रद्द हो जाता है तो दोनों टीमों को 1-1 पॉइंट मिलता है.",
  },
  {
    question: "सवाल- पॉइंट्स टेबल में पहले स्थान पर रहने वाली टीम को क्या फायदा होता है?",
    answer: "जवाब :- लीग स्टेज में सबसे ज्यादा पॉइंट्स हासिल करने वाली टीम टेबल में पहले स्थान पर रहती है और प्लेऑफ में पहुंचती है. उसे फाइनल में पहुंचने के लिए 2 मौके मिलते हैं. अगर टीम क्वालिफायर 1 जीतती है तो फाइनल में जगह बनाती है और अगर हारती है तो उसे एलिमिनेटर के विजेता से टकराने का मौका मिलता है. पॉइंट्स टेबल में दूसरे नंबर पर रहने वाली टीम को भी यही फायदा मिलता है.",
  },
];

export default function IplPointTableFaqWidget() {
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
            <h2 className="h2">आईपीएल 2026 पॉइंट्स टेबल से जुड़े सवाल-जवाब</h2>
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
