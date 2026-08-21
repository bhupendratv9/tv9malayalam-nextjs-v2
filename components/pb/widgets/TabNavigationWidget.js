/* eslint-disable react/jsx-no-target-blank */
"use client";

import Image from "next/image";
import { useState } from "react";

export default function TabNavigationWidget() {
  const [activeTab, setActiveTab] = useState("train");

  return (
    <section className="routeinfo_Wrap">
      <div className="container">
        <div className="event_heading">
          <h2 className="h2">कुम्भ कैसे पहुंचे</h2>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "none" }}
          aria-hidden="true"
        >
          <symbol id="icTrain" viewBox="0 0 30 30">
            <path
              d="M6.25 18.895V7.5C6.25 6.68417 6.48458 6.02833 6.95375 5.5325C7.42292 5.03667 8.05792 4.65667 8.85875 4.3925C9.65958 4.12833 10.5908 3.95583 11.6525 3.875C12.7142 3.79417 13.83 3.7525 15 3.75C16.215 3.75 17.3517 3.79125 18.41 3.87375C19.4683 3.95625 20.3946 4.12833 21.1888 4.39C21.9829 4.65167 22.6083 5.03125 23.065 5.52875C23.5217 6.02625 23.75 6.68333 23.75 7.5V18.895C23.75 19.8992 23.4 20.7512 22.7 21.4512C22.0008 22.1504 21.1492 22.5 20.145 22.5L22.02 24.375V25H20.9612L18.4613 22.5H11.5387L9.03875 25H7.98125V24.375L9.85625 22.5C8.85125 22.5 7.99917 22.15 7.3 21.45C6.6 20.7517 6.25 19.9 6.25 18.895ZM7.5 13.75H14.375V8.17375H7.5V13.75ZM15.625 13.75H22.5V8.17375H15.625V13.75ZM10.62 19.52C11.0208 19.52 11.3542 19.3887 11.62 19.1262C11.8858 18.8633 12.0192 18.5321 12.02 18.1313C12.0208 17.7304 11.8896 17.3967 11.6262 17.13C11.3629 16.8633 11.0312 16.73 10.6313 16.73C10.2313 16.73 9.8975 16.8613 9.63 17.1238C9.3625 17.3863 9.22917 17.7179 9.23 18.1187C9.23083 18.5196 9.36208 18.8533 9.62375 19.12C9.88542 19.3867 10.2175 19.52 10.62 19.52ZM19.37 19.52C19.7708 19.52 20.1042 19.3887 20.37 19.1262C20.6358 18.8633 20.7692 18.5321 20.77 18.1313C20.7708 17.7304 20.6396 17.3967 20.3763 17.13C20.1129 16.8633 19.7812 16.73 19.3813 16.73C18.9812 16.73 18.6475 16.8613 18.38 17.1238C18.1133 17.3863 17.98 17.7179 17.98 18.1187C17.98 18.5196 18.1113 18.8533 18.3738 19.12C18.6363 19.3867 18.9679 19.52 19.3687 19.52"
              fill="#801800"
            />
          </symbol>

          <symbol id="icAir" viewBox="0 0 28 28">
            <path
              d="M25.6667 18.9116V16.7008L16.3334 9.33325V4.66659C16.3334 4.04775 16.0875 3.45425 15.65 3.01667C15.2124 2.57908 14.6189 2.33325 14 2.33325C13.3812 2.33325 12.7877 2.57908 12.3501 3.01667C11.9125 3.45425 11.6667 4.04775 11.6667 4.66659V9.45575L2.33337 16.8233V18.9104L11.6667 15.6321V20.9999L8.16671 23.3333V25.6666L14 23.3333L19.8334 25.6666V23.3333L16.3334 20.9999V15.5341L25.6667 18.9116Z"
              fill="#801800"
            />
          </symbol>

          <symbol id="icBus" viewBox="0 0 28 28">
            <path
              d="M24.5 7.02442C24.5035 6.85409 24.4919 5.31525 22.9834 3.83359C21.4982 2.37525 20.0002 2.33325 19.8334 2.33325H8.16204C7.88321 2.33325 6.42021 2.40675 5.00271 3.85225C3.54204 5.34092 3.50004 6.83542 3.50004 6.99992V10.4999H2.33337V13.9999H3.50004V20.9999C3.50004 21.8563 3.97371 22.6018 4.66671 23.0078V24.4999C4.66671 24.8093 4.78962 25.1061 5.00842 25.3249C5.22721 25.5437 5.52395 25.6666 5.83337 25.6666H7.00004C7.30946 25.6666 7.60621 25.5437 7.825 25.3249C8.04379 25.1061 8.16671 24.8093 8.16671 24.4999V23.3333H19.8334V24.4999C19.8334 24.8093 19.9563 25.1061 20.1751 25.3249C20.3939 25.5437 20.6906 25.6666 21 25.6666H22.1667C22.4761 25.6666 22.7729 25.5437 22.9917 25.3249C23.2105 25.1061 23.3334 24.8093 23.3334 24.4999V23.0101C23.6873 22.8071 23.9815 22.5144 24.1864 22.1615C24.3912 21.8086 24.4994 21.408 24.5 20.9999V13.9999H25.6667V10.4999H24.5V7.02442ZM10.5 4.66659H17.5V6.99992H10.5V4.66659ZM7.58337 20.9999C7.11909 20.9998 6.67388 20.8152 6.3457 20.4868C6.01751 20.1584 5.83322 19.713 5.83337 19.2488C5.83353 18.7845 6.01811 18.3393 6.34652 18.0111C6.67493 17.6829 7.12026 17.4986 7.58454 17.4988C8.04882 17.4989 8.49403 17.6835 8.82222 18.0119C9.15041 18.3403 9.3347 18.7856 9.33454 19.2499C9.33439 19.7142 9.1498 20.1594 8.82139 20.4876C8.49299 20.8158 8.04766 21.0001 7.58337 20.9999ZM12.8334 15.1666H5.83337V9.33325H12.8334V15.1666ZM20.4167 20.9999C19.9524 20.9998 19.5072 20.8152 19.179 20.4868C18.8508 20.1584 18.6666 19.713 18.6667 19.2488C18.6669 18.7845 18.8514 18.3393 19.1799 18.0111C19.5083 17.6829 19.9536 17.4986 20.4179 17.4988C20.8822 17.4989 21.3274 17.6835 21.6556 18.0119C21.9837 18.3403 22.168 18.7856 22.1679 19.2499C22.1677 19.7142 21.9831 20.1594 21.6547 20.4876C21.3263 20.8158 20.881 21.0001 20.4167 20.9999ZM22.1667 15.1666H15.1667V9.33325H22.1667V15.1666Z"
              fill="#801800"
            />
          </symbol>
        </svg>

        <div className="routeInfo_Detail">
          <div className="routeInfoTabs">
            <button
              className={`tablinks${activeTab === "train" ? " active" : ""}`}
              type="button"
              onClick={() => setActiveTab("train")}
              id="defaultOpen"
            >
              <span className="icons">
                <svg>
                  <use href="#icTrain"></use>
                </svg>
              </span>{' '}
              ट्रेन
            </button>
            <button
              className={`tablinks${activeTab === "bus" ? " active" : ""}`}
              type="button"
              onClick={() => setActiveTab("bus")}
            >
              <span className="icons">
                <svg>
                  <use href="#icBus"></use>
                </svg>
              </span>{' '}
              बस
            </button>

          </div>
          <div
            id="train"
            className="tabcontent"
            style={{ display: activeTab === "train" ? "block" : "none" }}
          >
            <div className="flexWrap">
              <div className="routeDetail">
                <h3>ट्रेन</h3>
                <ul>
                  <li>
                    <a
                      href="https://www.tv9hindi.com/lifestyle/maha-kumbh-2025-these-trains-running-from-chennai-to-prayagraj-3039896.html"
                      target="_blank"
                    >
                      चेन्नई से कुंभ मेले तक ट्रेन यात्रा
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tv9hindi.com/lifestyle/mahakumbh-2025-hyderabad-to-prayagraj-trains-running-time-ticket-price-3040112.html"
                      target="_blank"
                    >
                      हैदराबाद से कुंभ मेले तक ट्रेन यात्रा
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tv9hindi.com/lifestyle/mahakumbh-best-trains-to-reach-prayagraj-from-bengaluru-what-is-fare-and-time-table-3039800.html"
                      target="_blank"
                    >
                      बेंगलूरु से कुंभ मेले तक ट्रेन यात्रा
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tv9hindi.com/lifestyle/mumbai-to-prayagraj-from-trains-for-kumbh-mela-3038999.html"
                      target="_blank"
                    >
                      मुंबई से कुंभ मेले तक ट्रेन यात्रा
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tv9hindi.com/lifestyle/mahakumbh-2025-pune-to-prayagraj-train-timings-and-ticket-price-details-3040310.html"
                      target="_blank"
                    >
                      पुणे से कुंभ मेले तक ट्रेन यात्रा
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tv9hindi.com/lifestyle/mahakumbh-trains-running-between-ahmedabad-to-prayagraj-3039988.html"
                      target="_blank"
                    >
                      अहमदाबाद से कुंभ मेले तक ट्रेन यात्रा
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tv9hindi.com/lifestyle/mahakumbh-trains-run-between-surat-and-prayagraj-see-complete-schedule-3040392.html"
                      target="_blank"
                    >
                      सूरत से कुंभ मेले तक ट्रेन यात्रा
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tv9hindi.com/lifestyle/mahakumbh-complete-plan-of-train-journey-from-kolkata-to-prayagraj-3038877.html"
                      target="_blank"
                    >
                      कोलकाता से कुंभ मेले तक ट्रेन यात्रा
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tv9hindi.com/lifestyle/journey-to-reach-maha-kumbh-mela-33-trains-from-delhi-to-prayagraj-3038845.html"
                      target="_blank"
                    >
                      दिल्ली से कुंभ मेले तक ट्रेन यात्रा
                    </a>
                  </li>
                </ul>
              </div>
              <div className="imgWrap">
                <Image
                  src="https://images.tv9hindi.com/wp-content/uploads/2022/04/Prayagraj-Railway-Station.jpg"
                  alt="प्रयागराज रेलवे स्टेशन"
                  width={540}
                  height={303}
                  loading="lazy"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>

          <div
            id="bus"
            className="tabcontent"
            style={{ display: activeTab === "bus" ? "block" : "none" }}
          >
            <div className="flexWrap">
              <div className="routeDetail">
                <h3>बस</h3>
                <ul>
                  <li>
                    <a
                      href="https://www.tv9hindi.com/lifestyle/bus-from-ranchi-to-prayagraj-for-mauni-amavasya-snan-in-mahakumbh-3076893.html"
                      target="_blank"
                    >
                      रांची से प्रयागराज
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tv9hindi.com/lifestyle/bus-from-patna-to-prayagraj-for-mahakumbh-3076800.html"
                      target="_blank"
                    >
                      पटना से प्रयागराज
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tv9hindi.com/lifestyle/bus-from-bhopal-to-prayagraj-for-mauni-amavasya-in-mahakumbh-3077004.html"
                      target="_blank"
                    >
                      भोपाल से प्रयागराज
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tv9hindi.com/lifestyle/bus-from-noida-to-prayagraj-for-mauni-amavasya-in-mahakumbh-3077166.html"
                      target="_blank"
                    >
                      नोएडा से प्रयागराज
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tv9hindi.com/lifestyle/bus-from-meerut-to-prayagraj-for-mauni-amavasya-in-mahakumbh-3077214.html"
                      target="_blank"
                    >
                      मेरठ से प्रयागराज
                    </a>
                  </li>
                </ul>
              </div>
              <div className="imgWrap">
                <Image
                  src="https://images.tv9hindi.com/wp-content/uploads/2024/12/saffron-bus.jpg"
                  alt="सफ्रॉन बस"
                  width={540}
                  height={303}
                  loading="lazy"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .routeinfo_Wrap{margin-bottom:3.125rem;}
        .routeinfo_Wrap .routeInfoTabs{display:flex;justify-content:center;align-items:center;margin-bottom:2.5rem;}
        .routeinfo_Wrap .routeInfoTabs .tablinks{font-family:"Anek Devanagari",serif;border-radius:0.75rem;background:#FBF6F6;border:1px solid #FBF6F6;color:#000;font-size:1.125rem;font-weight:600;line-height:1.5rem;text-transform:capitalize;padding:0.625rem;margin:0 .5rem;cursor:pointer;display:flex;align-items:center;width:145px;}
        .routeinfo_Wrap .routeInfoTabs .tablinks .icons{background:#fff;border-radius:8px;display:flex;justify-content:center;align-items:center;height:3.5rem;width:3.5rem;margin-right:0.625rem;}
        .routeinfo_Wrap .routeInfoTabs .tablinks .icons svg{height:1.375rem;width:1.375rem;}
        .routeinfo_Wrap .routeInfoTabs .tablinks.active,
        .routeinfo_Wrap .routeInfoTabs .tablinks:hover{border:1px solid #801800;}
        .routeinfo_Wrap .routeInfo_Detail .tabcontent{display:none;}
        .routeinfo_Wrap .routeInfo_Detail .tabcontent .flexWrap{display:flex;}
        .routeinfo_Wrap .routeInfo_Detail .tabcontent .flexWrap .routeDetail{width:calc(100% - 560px);}
        .routeinfo_Wrap .routeInfo_Detail .tabcontent .flexWrap .routeDetail h3{font-family:"Anek Devanagari",serif;font-size:1.5rem;font-weight:600;color:#801800;line-height:1.875rem;margin-bottom:0.3125rem;}
        .routeinfo_Wrap .routeInfo_Detail .tabcontent .flexWrap .routeDetail p{font-family:"Anek Devanagari",serif;font-size:1.125rem;font-weight:500;line-height:1.5rem;margin-bottom:1.25rem;}
        .routeinfo_Wrap .routeInfo_Detail .tabcontent .flexWrap .routeDetail ul{display:flex;flex-wrap:wrap;margin-top:0.5rem;}
        .routeinfo_Wrap .routeInfo_Detail .tabcontent .flexWrap .routeDetail ul li{font-family:"Anek Devanagari",serif;width:50%;font-size:1rem;font-weight:500;margin-bottom:0.625rem;position:relative;padding-left:1.375rem;}
        .routeinfo_Wrap .routeInfo_Detail .tabcontent .flexWrap .routeDetail ul li:before{content:'\\2192';position:absolute;left:0;top:4px;font-size:1rem;font-weight:600;line-height:1rem;}
        .routeinfo_Wrap .routeInfo_Detail .tabcontent .flexWrap .imgWrap{width:540px;margin-left:1.25rem;}
        .routeinfo_Wrap .routeInfo_Detail .tabcontent .flexWrap .imgWrap img{width:100%;border-radius:12px;aspect-ratio:16/9;height:auto;}
        @media(max-width:768px){
          .routeinfo_Wrap .routeInfoTabs .tablinks{margin:0 0.3125rem;}
          .routeinfo_Wrap .routeInfo_Detail .tabcontent .flexWrap{flex-wrap:wrap;flex-direction:column-reverse;}
          .routeinfo_Wrap .routeInfo_Detail .tabcontent .flexWrap .routeDetail{width:100%;}
          .routeinfo_Wrap .routeInfo_Detail .tabcontent .flexWrap .routeDetail ul li{width:100%;}
          .routeinfo_Wrap .routeInfo_Detail .tabcontent .flexWrap .imgWrap{width:100%;margin-left:0;margin-bottom:1.25rem;}
          .routeinfo_Wrap .routeInfoTabs .tablinks .icons{width:2.5rem;height:2.5rem;}
        }
      `}</style>
    </section>
  );
}