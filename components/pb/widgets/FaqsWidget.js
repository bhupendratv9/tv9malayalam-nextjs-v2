'use client';

import { useLayoutEffect, useRef, useState } from "react";

const FAQ_ITEMS = [
  {
    question: "धरती पर कुंभ कहां-कहां लगता है?",
    answer: (
      <p>कुंभ का आयोजन धरती के चार तीर्थों में होता है. इनमें पहला तीर्थ प्रयागराज, दूसरा हरिद्वार, तीसरा उज्जैन और चौथा नासिक है.</p>
    ),
  },
  {
    question: "महाकुंभ 2025 में कब-कब हैं शाही स्नान?",
    answer: (
      <>
        <p><strong>महाकुंभ स्नान</strong></p>
        <ul>
          <li>पहला स्नान: 13 जनवरी 2025 (लोहड़ी)</li>
          <li>दूसरा स्नान: 14 जनवरी 2025 (मकर संक्रांति)</li>
          <li>तीसरा स्नान: 29 जनवरी 2025 (मौनी अमावस्या)</li>
          <li>चौथा स्नान: 2 फरवरी 2025 (वसंत पंचमी)</li>
          <li>पांचवां स्नान: 12 फरवरी 2025 (माघ पूर्णिमा)</li>
          <li>छठा स्नान: 26 फरवरी 2025 (महाशिवरात्रि)</li>
        </ul>
        <p><strong>महाकुंभ अमृत स्नान</strong></p>
        <ul>
          <li>पहला अमृत स्नान: 14 जनवरी 2025 (मकर संक्रांति)</li>
          <li>दूसरा अमृत स्नान: 29 जनवरी 2025 (मौनी अमावस्या)</li>
          <li>तीसरा अमृत स्नान: 2 फरवरी 2025 (वसंत पंचमी)</li>
        </ul>
      </>
    ),
  },
  {
    question: "कुंभ का आयोजन क्यों और कहां होता है?",
    answer: (
      <p>कुंभ को लेकर पौराणिक ग्रंथों में तीन कहानियां प्रचलित हैं. इनमें देवासुर संग्राम की कहानी सर्वमान्य है. समुंद्र मंथन के समय जब अमृत के लिए देवों और दानवों के बीच छीना झपटी शुरू हुई तो अमृत की कुछ बूंदे छलक कर धरती के चार स्थाों पर गिरी. उन्हीं स्थानों पर कुंभ का आयोजन होता है.</p>
    ),
  },
  {
    question: "कुंभ कब-कब लगता है?",
    answer: (
      <p>कुंभ 12 साल में एक बार लगता है. इसकी दो वजह बताई गई है. एक वजह खगोलीय है. इसमें देवगुरू वृहस्पति 12 वर्ष में एक चक्कर लगाते हैं. जैसे ही उनका चक्कर पूर्ण होता है मकर की संक्रांति हो जाती है. उसी दिन कुंभ का आयोजन होता है. दूसरी वजह पौराणिक मान्यता पर आधारित है. माना जाता है कि नागलोक से अमृत कलश लेकर स्वर्ग पहुंचने में जयंत को 12 दिन लगे थे. चूंकि देवों का एक दिन मानव के एक साल के बराबर होता है. इसलिए हर 12 साल पर कुंभ होता है.</p>
    ),
  },
  {
    question: "कुंभ में कल्पवास क्यों करना चाहिए?",
    answer: (
      <p>पौराणिक मान्यता के मुताबिक मकर संक्रांति के दिन खुद भगवान नारायण कुंभ नगरी में आकर कल्पवास करते हैं. ऐसे में सनातन धर्म को मानने वालों के लिए भी ऐसा करने की बात कही गई है. मान्यता है कि ऐसा करने से कल्पवासी खुद को जान पाता है और ऐसा होते ही मोक्ष की प्राप्ति हो जाती है.</p>
    ),
  },
  {
    question: "प्रयागराज में ही महाकुंभ क्यों लगता है?",
    answer: (
      <p>कुंभ का आयोजन धरती पर प्रयागराज, हरिद्वार, उज्जैन और नासिक चार स्थानों पर होता है. चूंकि प्रयागराज के त्रिवेणी में कुंभ लगता है और उस समय खुद भगवान नारायण भी त्रिवेणी में रहते हैं. इसलिए यहां लगने वाले कुंभ को महाकुंभ नाम दिया गया है.</p>
    ),
  },
  {
    question: "क्या पौराणिक ग्रंथों में कुंभ का वर्णन है?",
    answer: (
      <p>जी हां, कुंभ का वर्णन पौराणिक ग्रंथों में श्रीमद भागवत और स्कंद पुराण में मिलता है. इसके अलावा कई उत्तर पौराणिक ग्रंथों में मिलता है. इनमें रामायण और महाभारत शामिल है.</p>
    ),
  },
  {
    question: "पहली बार कुंभ का आयोजन कब हुआ?",
    answer: (
      <p>इस संबंध कोई ठोस जानकारी किसी भी पौराणिक ग्रंथ में नहीं है. हालांकि रामायण में भगवान राम के उज्जैन कुंभ में जाने का विवरण मिलता है. इससे यह माना जा सकता है कि त्रेता युग में कुंभ चलन में था. इसी प्रकार महाभारत के वन पर्व में भी जिक्र मिलता है. इसलिए मान सकते हैं कि द्वापर में भी कुंभ की महत्ता बहुत थी.</p>
    ),
  },
];

export default function FaqsWidget() {
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

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <section className="faqWrapper">
        <div className="container">
          <div className="Faq_wrap" id="faq-wrap">
            <div className="tv9common-heading">
              <h2 className="h2">FAQs</h2>
            </div>
            {FAQ_ITEMS.map((item, index) => (
              <div className="FaqItem" key={item.question}>
                <button
                  type="button"
                  className={`FaqHeading${activeIndex === index ? " active" : ""}`}
                  onClick={() => handleToggle(index)}
                >
                  {item.question}
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
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style>{`
        .faqWrapper{margin-bottom:3.125rem;}
        .Faq_wrap .tv9common-heading:before{content:none;}
        .Faq_wrap .FaqItem{margin-bottom:1.125rem;padding-bottom:1.125rem;border-bottom:1px solid #E6D9CE;}
        .Faq_wrap .FaqHeading{font-family:"Anek Devanagari",serif;cursor:pointer;width:100%;border:none;background:none;padding:0;text-align:left;font-size:1.25rem;line-height:1.875rem;transition:.4s;font-weight:600;color:#000;position:relative;padding-right:1.25rem;}
        .Faq_wrap .FaqHeading.active{margin-bottom:0.625rem;}
        .Faq_wrap .FaqHeading::after{content:"+";color:#000;font-weight:600;font-size:1.25rem;line-height:22px;position:absolute;right:5px;top:5px;height:1.25rem;width:1.25rem;border:2px solid #000;border-radius:100px;padding:1px;text-align:center;}
        .Faq_wrap .FaqHeading.active::after{content:"−";}
        .Faq_wrap .FaqItemContent{font-family:"Anek Devanagari",serif;width:100%;max-height:0;overflow:hidden;transition:max-height .5s ease-out,padding .5s ease-out;font-size:1.125rem;line-height:1.625rem;font-weight:400;padding-right:1.875rem;}
        .Faq_wrap .FaqItemContent p{margin-bottom:0.5rem;}
        .Faq_wrap .FaqItemContent ul{padding-left:1.25rem;}
        .Faq_wrap .FaqItemContent ul li{margin-bottom:0.94rem;list-style:decimal;}
      `}</style>
    </>
  );
}
