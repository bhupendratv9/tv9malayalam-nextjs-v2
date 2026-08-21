import Image from "next/image";




// category-listing-common-widget == > CategoryListingCommonWidget
export default function BudgetTaxCalculatorWidget() {
  return (
    <>           <style>{`
      .widget-list {
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 10px;
}
.gridTemplateThreeCols {display: grid;grid-template-columns: 1fr 1fr 356px;gap: 20px;}
.gridTemplateCols{display:grid;grid-template-columns:1fr 356px;gap:20px}
.gridTemplateCols .colLHS{display:grid;grid-template-columns:1fr 1fr;gap:1.38rem}
/*--Budget Announcement Start-- */
.budgetAnnouncement_Wrapper{margin-bottom:2.5rem}
.budgetAnnouncement_Wrapper .announcementGrid{border-radius: 0.3125rem;background:#f4f4f4;padding:1.19rem 1.25rem;height:625px;overflow-y:auto}
.budgetAnnouncement_Wrapper .announcementGrid::-webkit-scrollbar{width:.3125rem;height:0;display:block;}
.budgetAnnouncement_Wrapper .announcementGrid::-webkit-scrollbar-thumb{background:#ccc;border-radius:1.25rem}
.budgetAnnouncement_Wrapper .announcementGrid .announcementItem{border-radius: 0.625rem;background: #fff;padding:0.62rem;margin-bottom:0.62rem;display:flex;gap:0.3125rem}
.budgetAnnouncement_Wrapper .announcementGrid .announcementItem:last-child{margin-bottom:0;}
.budgetAnnouncement_Wrapper .announcementGrid .announcementItem::before{content:'';width:30px;height:30px;background-image:url(https://static.tv9hindi.com/wp-content/uploads/2026/01/announcement-ico.png);background-repeat:no-repeat;background-size:contain}
.budgetAnnouncement_Wrapper .announcementGrid .announcementItem > div{width:calc(100% - 35px)}
.budgetAnnouncement_Wrapper .announcementGrid .announcementItem .announcementItem-title{color:#000;font-size: 0.9375rem;font-weight: 600;line-height: 1.625rem;text-transform: uppercase;}
.budgetAnnouncement_Wrapper .announcementGrid .announcementItem .announcementItem-desc{font-size: 0.875rem;font-weight: 400;line-height: 1.5rem;margin-bottom:1rem;}
.budgetAnnouncement_Wrapper .announcementGrid .announcementItem ul{padding-left:1.25rem;list-style-type:disc;}
.budgetAnnouncement_Wrapper .announcementGrid .announcementItem ul li{font-size: 0.875rem;font-weight: 400;line-height: 1.5rem;margin-bottom:.5rem;}
.budgetAnnouncement_Wrapper .announcementGrid .announcementItem ul li:last-child{margin-bottom:0;}
/*--Budget Announcement End-- */
.taxCalculator_Wrapper {background-color: #f4f4f4;height: fit-content;margin-bottom: 2.5rem;border-radius: 0.3125rem;}
/*--Cheaper Costlier Start-- */
.cheaperCostlier_Widget{margin-bottom:2.5rem}
.cheaperCostlier_Wrapper{display:grid;grid-template-columns:1fr 1fr;}
.cheaperCostlier_Wrapper .cheaperNews_Wrap{border-radius: 0.3125rem;background: #E5F4EF;padding:.62rem 0.3125rem .62rem .62rem;position:relative;}
.cheaperCostlier_Wrapper .cheaperCostlier_Head{border-radius:1.875rem;color:#000;font-size:1.125rem;font-weight:600;line-height:2.5rem;text-transform:uppercase;margin-bottom:0.62rem;}
.cheaperCostlier_Wrapper .cheaperCostlier_Head svg{width:1.5rem;height:1.5rem;margin-right:.3125rem;vertical-align:middle}
.cheaperCostlier_Wrapper .cheaperNews_Wrap ul,.cheaperCostlier_Wrapper .costlierNews_Wrap ul{list-style:none;height:555px;overflow-y:auto;padding-right:0.3125rem}
.cheaperCostlier_Wrapper .cheaperNews_Wrap ul::-webkit-scrollbar{height:0;width:0.3125rem;display:block;background-color:#ABD4C6;border-radius:1.25rem;}
.cheaperCostlier_Wrapper .cheaperNews_Wrap ul::-webkit-scrollbar-thumb{background:#769c6d;border-radius:1.25rem}
.cheaperCostlier_Wrapper .cheaperNews_Wrap ul li,.cheaperCostlier_Wrapper .costlierNews_Wrap ul li{font-size: 0.9375rem;font-weight: 600;line-height:1.3125rem;margin-bottom:.62rem;display:flex;border-radius: 0.625rem;background: #FFF;padding:0.75rem}
.cheaperCostlier_Wrapper .cheaperNews_Wrap ul li:last-child,.cheaperCostlier_Wrapper .costlierNews_Wrap ul li:last-child{margin-bottom:0;}
.cheaperCostlier_Wrapper .cheaperNews_Wrap ul li::before,.cheaperCostlier_Wrapper .costlierNews_Wrap ul li::before{content:"";width:1.25rem;height:1.25rem;border-radius:1.25rem;margin-right:.62rem;flex-shrink:0;background-repeat:no-repeat;background-size:70%;background-position:center;}
.cheaperCostlier_Wrapper .cheaperNews_Wrap ul li::before{background-color:#1B8501;background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M6 2.5V9.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M9.5 6L6 9.5L2.5 6' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");}
.cheaperCostlier_Wrapper .costlierNews_Wrap ul li::before{background-color:#DB0129;background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M6 9.5V2.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M9.5 6L6 2.5L2.5 6' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");}
.cheaperCostlier_Wrapper .costlierNews_Wrap{border-radius: 0.3125rem;background: #FDEBEA;padding:.62rem 0.3125rem .62rem .62rem;position:relative;}
.cheaperCostlier_Wrapper .costlierNews_Wrap ul::-webkit-scrollbar{width:.3125rem;height:0;display:block;background-color:#E4BCB9;border-radius:1.25rem}
.cheaperCostlier_Wrapper .costlierNews_Wrap ul::-webkit-scrollbar-thumb{background:#c73751;border-radius:1.25rem}
/*--Cheaper Costlier End-- */
    @media(max-width:768px){
        .gridTemplateThreeCols, .gridTemplateTwoCols {grid-template-columns: 1fr;gap: 0;}
        .gridTemplateCols .colLHS{grid-template-columns:1fr;gap:0}
        .budgetAnnouncement_Wrapper table td,.budgetAnnouncement_Wrapper table th{padding:1rem}
        .cheaperCostlier_Wrapper{grid-template-columns:1fr}
    }

      `}</style>


      <svg style={{ display: "none" }}>
    <symbol viewBox="0 0 24 24" fill="none" id="trade-down">
        <circle cx="12" cy="12" r="12" fill="#BCE5D8" />
        <path d="M4.66667 11.0833V15.6667H9.25" stroke="#1B8501" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.66668 15.6667L9.25001 11.0833C10.0591 10.2743 10.4635 9.86984 10.96 9.82511C11.0421 9.81768 11.1246 9.81768 11.2067 9.82511C11.7032 9.86984 12.1076 10.2743 12.9167 11.0833C13.7257 11.8924 14.1302 12.2968 14.6267 12.3415C14.7087 12.349 14.7913 12.349 14.8734 12.3415C15.3698 12.2968 15.7743 11.8924 16.5833 11.0833L19.3333 8.33332" stroke="#1B8501" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </symbol>
    <symbol viewBox="0 0 24 24" fill="none" id="trade-up">
        <circle cx="12" cy="12" r="12" fill="#FFD3D2" />
        <path d="M19.3333 12.9167V8.33334H14.75" stroke="#DB0129" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19.3333 8.33334L14.75 12.9167C13.9409 13.7257 13.5365 14.1302 13.04 14.1749C12.9579 14.1823 12.8754 14.1823 12.7933 14.1749C12.2968 14.1302 11.8924 13.7257 11.0833 12.9167C10.2743 12.1076 9.86979 11.7032 9.37335 11.6585C9.29128 11.651 9.2087 11.651 9.12663 11.6585C8.63019 11.7032 8.22567 12.1076 7.41666 12.9167L4.66666 15.6667" stroke="#DB0129" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </symbol>
</svg>
    
      <div className="gridTemplateThreeCols">
    {/* <!--Budget Announcement Start--> */}
    <div className="budgetAnnouncement_Wrapper">
        <div className="section_heading">
            <h2 className="h2"><a href="/business/budget/highlights">प्रमुख घोषणाएँ</a></h2>
        </div>
        <div className="announcementGrid">
            <div className="announcementItem">
                <div>
                    <a href="https://www.tv9hindi.com/business/budget/highlights">
                        <h3 className="announcementItem-title">बजट के बाद शेयर बाजार में गिरावट</h3>
                        <div className="announcementItem-desc">
                            <p>बजट के बाद शेयर बाजार में बड़ी गिरावट देखी गई है. बाजार में 2 हजार से अधिक अंकों की गिरावट आई है.</p>
                        </div>
                    </a>

                </div>
            </div>
            <div className="announcementItem">
                <div>
                    <a href="https://www.tv9hindi.com/business/budget/highlights">
                        <h3 className="announcementItem-title">कुरियर के जरिए सामान भेजना</h3>
                        <div className="announcementItem-desc">
                            <p>वित्त मंत्री निर्मला सीतारमण कहा कि कुरियर के जरिए सामान भेजना सस्ता होगा.</p>
                        </div>
                    </a>

                </div>
            </div>
            <div className="announcementItem">
                <div>
                    <a href="https://www.tv9hindi.com/business/budget/highlights">
                        <h3 className="announcementItem-title">7 गंभीर रोगों की दवा होगी सस्ती</h3>
                        <div className="announcementItem-desc">
                            <p>वित्त मंत्री निर्मला सीतारमण कहा कि कैंसर और मधुमेह समेत 7 गंभीर रोगों की दवाइयां सस्ती की जाएंगी.</p>
                        </div>
                    </a>

                </div>
            </div>
            <div className="announcementItem">
                <div>
                    <a href="https://www.tv9hindi.com/business/budget">
                        <h3 className="announcementItem-title">LRS के टैक्स दरों में कमी</h3>
                        <div className="announcementItem-desc">
                            <p>वित्त मंत्री निर्मला सीतारमण ने अपने 9वें बजट भाषण में कहा, "मैं लिबरलाइज्ड रेमिटेंस स्कीम, जिसे LRS के नाम से जाना जाता है, के तहत शिक्षा और मेडिकल मकसद से TCS दर को 5% से घटाकर 2% करने का प्रस्ताव करती हूं."</p>
                        </div>
                    </a>

                </div>
            </div>
            <div className="announcementItem">
                <div>
                    <a href="https://www.tv9hindi.com/business/budget">
                        <h3 className="announcementItem-title">कॉरपोरेट, CBDT की संयुक्त समिति</h3>
                        <div className="announcementItem-desc">
                            <p>वित्त मंत्री निर्मला सीतारमण कहा कि कॉरपोरेट, CBDT की संयुक्त समिति बना जाएगी.</p>
                        </div>
                    </a>

                </div>
            </div>
            <div className="announcementItem">
                <div>
                    <a href="https://www.tv9hindi.com/business/budget">
                        <h3 className="announcementItem-title">मेडिकल टूरिज्म हब बनाने पर फोकस</h3>
                        <div className="announcementItem-desc">
                            <p>वित्त मंत्री निर्मला सीतारमण ने कहा, "भारत को मेडिकल टूरिज्म हब के तौर पर बढ़ावा देने के लिए, मैं राज्यों को 5 रीजनल हब स्थापित करने में मदद करने के लिए एक योजना का प्रस्ताव करती हूं."</p>
                        </div>
                    </a>

                </div>
            </div>
            <div className="announcementItem">
                <div>
                    <a href="https://www.tv9hindi.com/business/budget">
                        <h3 className="announcementItem-title">इनकम छुपाने वालों को अब सजा नहीं</h3>
                        <div className="announcementItem-desc">
                            <p>वित्त मंत्री निर्मला सीतारमण कहा कि इनकम छुपाने वालों पर अब सजा नहीं मिलेगी, बल्कि 30 फीसदी जुर्माना भरना होगा. </p>
                        </div>
                    </a>

                </div>
            </div>
            <div className="announcementItem">
                <div>
                    <a href="https://www.tv9hindi.com/business/budget">
                        <h3 className="announcementItem-title">इनकम छुपाने वालों को अब सजा नहीं</h3>
                        <div className="announcementItem-desc">
                            <p>वित्त मंत्री निर्मला सीतारमण कहा कि इनकम छुपाने वालों पर अब सजा नहीं मिलेगी, बल्कि 30 फीसदी जुर्माना भरना होगा. </p>
                        </div>
                    </a>

                </div>
            </div>
            <div className="announcementItem">
                <div>
                    <a href="https://www.tv9hindi.com/business/budget">
                        <h3 className="announcementItem-title">ITR 1-2 में 31 जुलाई तक रिटर्न</h3>
                        <div className="announcementItem-desc">
                            <p>वित्त मंत्री निर्मला सीतारमण कहा कि ITR 1-2 में 31 जुलाई तक रिटर्न कर सकते हैं. सामान्य फीस के साथ रिवाइज रिटर्न किया जा सकता है.</p>
                        </div>
                    </a>

                </div>
            </div>
            <div className="announcementItem">
                <div>
                    <a href="https://www.tv9hindi.com/business/budget">
                        <h3 className="announcementItem-title">सस्ता होगा विदेश यात्रा</h3>
                        <div className="announcementItem-desc">
                            <p>वित्त मंत्री निर्मला सीतारमण ने विदेश यात्रा सस्ती करते हुए कहा कि विदेश यात्रा पैकेज पर लगने वाले टैक्स में कमी लाई जाएगी.</p>
                        </div>
                    </a>

                </div>
            </div>
        </div>
    </div>
    {/* <!--Budget Announcement end--> */}
    <div>
        <div className="section_heading">
            <h2 className="h2">Tax Calculator</h2>
        </div>
  <div className="taxCalculator_Wrapper">
  <iframe
    src="https://e.tv9hindi.com/calculate-tax-iframe.html"
    title="Tax Calculator"
    style={{
      width: "100%",
      height: "600px",
      border: "none",
      display: "block"
    }}
  />
</div>
    </div>
    {/* <!--Cheaper Costlier Start--> */}
    <div className="cheaperCostlier_Widget">
        <div className="section_heading">
            <h2 className="h2">बजट 2026 - सस्ता महंगा</h2>
        </div>
        <div className="cheaperCostlier_Wrapper">
            <div className="cheaperNews_Wrap">
                <div className="cheaperCostlier_Head">
                    <svg>
                        <use href="#trade-down"></use>
                    </svg>क्या हुआ सस्ता</div>
                <ul>
                    <li>CNG गैस</li>
                    <li>कैंसर की दवा</li>
                    <li>माइक्रोवेव-ओवन</li>
                    <li>एयरक्रॉफ्ट से जुड़ी चीजें</li>
                    <li>बैटरी</li>
                    <li>सोलर से जुड़ी चीजें</li>
                    <li>कपड़ा निर्यात</li>
                    <li>चमड़ा</li>
                    <li>जूता</li>
                    <li>बीड़ी</li>
                    <li>विदेश में पढ़ाई</li>
                    <li>विदेश यात्रा</li>
                </ul>
            </div>
            <div className="costlierNews_Wrap">
                <div className="cheaperCostlier_Head">
                    <svg>
                        <use href="#trade-up"></use>
                    </svg>क्या हुआ महंगा</div>
                <ul>
                    <li>वायदा कारोबार</li>
                    <li>खनिज</li>
                    <li>स्क्रैप</li>
                    <li>शराब</li>
                </ul>
            </div>
        </div>
    </div>
    {/* <!--Cheaper Costlier end--> */}



</div>
    </>
  );
}