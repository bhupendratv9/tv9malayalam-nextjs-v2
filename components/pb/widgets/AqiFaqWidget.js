import PropTypes from "prop-types";

const DEFAULT_FAQ_ITEMS = [
  {
    id: "aqi-today-delhi",
    question: "आज नई दिल्ली का AQI क्या है",
    answer: [
      "नई दिल्ली में AQI 72 तक पहुंच गया, जो (Moderate) वायु गुणवत्ता की स्थिति को दर्शाता है, जिसका मुख्य कारण PM2.5 और PM10 जैसे प्रदूषकों में वृद्धि है।",
    ],
  },
  {
    id: "aqi-yesterday-delhi",
    question: "कल नई दिल्ली का AQI क्या था?",
    answer: [
      "मंगलवार 26 मई को, नई दिल्ली में AQI 129 तक पहुंच गया, जो (Poor) वायु गुणवत्ता की स्थिति को दर्शाता है, जिसका मुख्य कारण PM2.5 और PM10 जैसे प्रदूषकों में वृद्धि है।",
    ],
  },
  {
    id: "bad-air-health-impact",
    question: "ख़राब हवा कैसे स्वास्थ्य को नुकसान पहुंचाती है?",
    answer: [
      "ख़राब हवा स्वास्थ्य पर गंभीर नकारात्मक प्रभाव डालती है, खासकर जब हवा में पीएम2.5, पीएम10, सल्फर डाइऑक्साइड, नाइट्रोजन ऑक्साइड, और ओजोन जैसे हानिकारक तत्व मौजूद हों।",
      "श्वसन तंत्र पर प्रभाव पड़ सकता है, जिससे फेफड़ों में जलन, खांसी, और सांस लेने में कठिनाई हो सकती है। दमा (अस्थमा) और ब्रोंकाइटिस जैसी बीमारियां बढ़ जाती हैं।",
      "लंबे समय तक प्रदूषण के संपर्क में रहने से शरीर की प्रतिरोधक क्षमता कमजोर हो जाती है, जिससे संक्रमण का खतरा बढ़ता है।",
      "गर्भवती महिलाओं में ख़राब हवा से गर्भस्थ शिशु के विकास पर नकारात्मक प्रभाव पड़ सकता है।",
      "लंबे समय तक वायु प्रदूषण के संपर्क में रहने से फेफड़ों का कैंसर होने का खतरा बढ़ जाता है।",
    ],
  },
  {
    id: "bad-air-precautions",
    question: "ख़राब हवा के होने पर क्या करना चाहिये?",
    answer: [
      "अत्यधिक प्रदूषण के समय बाहर जाने से बचें। यदि बाहर जाना ज़रूरी हो, तो N95 या P100 जैसे गुणवत्ता वाले मास्क पहनें।",
      "घर और ऑफिस में एयर प्यूरीफायर लगाएं, खासकर HEPA फिल्टर वाले।",
      "अधिक पानी पिएं और एंटीऑक्सिडेंट्स युक्त फल और सब्जियां खाएं।",
      "AQI चेक करने के लिए ऐप्स या वेबसाइट का उपयोग करें और उसी अनुसार अपनी दिनचर्या बनाएं।",
    ],
  },
  {
    id: "pm25-pm10-difference",
    question: "PM 2.5 और PM10 लेवल में क्या अंतर है?",
    answer: [
      "PM 2.5 और PM10 हवा में मौजूद कणीय पदार्थ (Particulate Matter) हैं।",
      "PM10 का व्यास 10 माइक्रोन तक होता है, जबकि PM2.5 का व्यास 2.5 माइक्रोन या उससे छोटा होता है।",
      "PM2.5 अधिक महीन और खतरनाक होता है क्योंकि यह फेफड़ों और रक्तप्रवाह में प्रवेश कर सकता है।",
      "PM10 सड़क की धूल और निर्माण कार्य से निकलता है, जबकि PM2.5 वाहनों के धुएं और औद्योगिक उत्सर्जन से बनता है।",
    ],
  },
];

export default function AqiFaqWidget({
  title = "FAQ'S",
  dataConfig = {},
}) {
  const heading = dataConfig.title || title || "FAQ'S";

  return (
    <>
      <div className="faqWidget_Wrapper" id="faqWrap">
        <div className="container">
          <div className="AQIHeading_Wrap">
            <h2 className="h1">{heading}</h2>
          </div>

          <div className="faqWidgetItems_List">
            {DEFAULT_FAQ_ITEMS.map((item, index) => (
              <details
                key={item.id}
                name="aqi-faq-accordion"
                className="FaqItem"
                open={index === 0}
              >
                <summary className="FaqHeading">
                  <span>{item.question}</span>
                </summary>

                <div className="FaqItemContent">
                  {item.answer.map((text, idx) => (
                    <p key={`${item.id}-${idx}`}>{text}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .faqWidget_Wrapper{padding:3rem 0}
        .faqWidget_Wrapper .faqWidgetItems_List{border-radius:.875rem;background:#fff;box-shadow:0 0 12px 0 rgba(96,113,121,.1);padding:2.62rem 3.75rem}
        #faqWrap .FaqItem{margin-bottom:1.125rem;padding-bottom:1.125rem;border-bottom:1px solid #e7eef1}
        #faqWrap .FaqItem:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
        #faqWrap .FaqHeading{cursor:pointer;width:100%;border:none;background:none;text-align:left;font-size:1.125rem;line-height:1.125rem;transition:.4s;font-weight:600;color:#000;position:relative;display:flex;justify-content:space-between;align-items:center;list-style:none}
        #faqWrap .FaqHeading::-webkit-details-marker{display:none}
        #faqWrap .FaqHeading::marker{content:""}
        #faqWrap .FaqHeading span{width:calc(100% - 30px)}
        #faqWrap .FaqHeading::after{content:'\\002B';color:#000;font-weight:600;font-size:1.25rem;line-height:22px;height:1.25rem;width:1.25rem;border:2px solid #000;border-radius:100px;padding:1px;display:flex;justify-content:center;align-items:center;flex-shrink:0}
        #faqWrap details[open] > .FaqHeading::after{content:"\\2212"}
        #faqWrap .FaqItemContent{width:100%;max-height:none;overflow:visible;font-size:1rem;line-height:2.25rem;font-weight:400;color:#494949;padding-top:.5rem}
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

AqiFaqWidget.propTypes = {
  title: PropTypes.string,
  dataConfig: PropTypes.shape({
    title: PropTypes.string,
  }),
};
