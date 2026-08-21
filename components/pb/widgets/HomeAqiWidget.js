import Image from "next/image";

export default function HomeAqiWidget() {
  return (
    <>
        <div className="widget-tab-links">
            <div className="tab-links">
                <a href="/aqi" className="active"><svg className="aqi_icon"><use href="tv9hindi-nextjs/images/icons.svg#wind_icon"></use></svg>AQI</a>
                <a href="/weather-forecast"><svg className="weather_icon"><use href="tv9hindi-nextjs/images/icons.svg#sun_icon"></use></svg>मौसम</a>
            </div>
        </div>

        <div className="inArticleAQIWidget_Wrapper">
            <div className="custom-heading">
                <h2 className="h2">आज AQI कितना है</h2>
                <div className="AQISearchDropdown">
                    <input autoComplete="off" placeholder="अपना शहर खोजें.." type="text" id="locationSearch" name="locationSearch" className="locationSearchInput"></input>
                    <div id="searchResults" style={{ display: "none" }}></div>
                </div>
            </div>   
            <div className="inArticleAQIContent_Wrapper moderateAQI">
                <a href="/aqi/new-delhi-air-quality-index-today">
                <div className="AQIRange_Wrap">
                    <div className="locationName" id="cityName">नई दिल्ली</div>
                    <div className="rangeInfo">
                        <div> 
                            <strong id="aqiValue">62</strong> 
                            <small>Aqi</small> 
                            <span id="aqiRange">range: 51-100</span> 
                        </div>
                    </div>
                </div>
                <div className="AQIDetail_Wrap">
                    <small>Air Quality Is</small>
                    <div className="AQICateg" id="aqiCategory">Moderate</div>
                </div>
                </a>
            </div>
            <div className="poweredBy">
                <a href="https://www.aqi.in/" target="_blank">
                    <span>powered by</span>
                    <Image width={53} height={26} src="https://static.tv9hindi.com/images/aqi-brand.png" alt="aqi brand" />
                </a>
                <div className="lastUpdatedTime" id="lastUpdated">Last Updated: 19 May 2026 | 04:00 PM</div>
            </div>
        </div>

        <style jsx>{`
        .inArticleAQIWidget_Wrapper{margin-bottom:.9375rem;border-radius:0 .875rem .875rem;border:1px solid #eaeaea;background:#fff;box-shadow:0 0 12px 0 rgba(96,113,121,.1);padding:.63rem;width:100%;position:relative;z-index:0;overflow:hidden}
        .inArticleAQIWidget_Wrapper::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background-image:url(https://images.tv9hindi.com/wp-content/themes/tv9bharavarsh/images/aqi-widet-bg-web.svg);background-size:contain;background-repeat:no-repeat;z-index:-1}
        .inArticleAQIWidget_Wrapper .custom-heading{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap}
        .inArticleAQIWidget_Wrapper .custom-heading .h2{color:#16191b;font-size:1.1875rem;font-weight:400;line-height:1.9375rem;text-transform:capitalize}
        .AQISearchDropdown .result-item{padding:10px;cursor:pointer;border-bottom:1px solid #ecebeb;font-size:.9375rem}
        .AQISearchDropdown .result-item:hover{background-color:#dbf1fd}
        .locationSearchInput{display:flex;width:10.3125rem;height:1.9375rem;justify-content:center;align-items:center;border-radius:.25rem;border:1px solid #cecece;background:#fff;padding:0 .94rem;color:#000;font-size:.875rem}
        #searchResults{border:1px solid #cecece;width:14.4375rem;max-height:200px;overflow-y:auto;display:none;background:#fff;position:absolute;z-index:1;border-radius:.25rem}
        #searchResults::-webkit-scrollbar{width:3px;height:0;display:block;border-radius:5px;background-color:#d9d9d9;border-radius:10px}
        #searchResults::-webkit-scrollbar-thumb{background:#22badc;border-radius:5px}
        .inArticleAQIWidget_Wrapper .poweredBy{position:absolute;bottom:.625rem;right:.625rem;text-align:right}
        .inArticleAQIWidget_Wrapper .poweredBy a{display:flex;align-items:end;text-decoration:none;width:100%;justify-content:end}
        .inArticleAQIWidget_Wrapper .poweredBy a span{margin-right:.3125rem;font-size:.6875rem;font-weight:400;letter-spacing:.00688rem;line-height:1;text-transform:uppercase}
        .inArticleAQIWidget_Wrapper .poweredBy img{display:block;width:1.875rem;height:.9375rem}
        .inArticleAQIWidget_Wrapper .lastUpdatedTime{color:#9d9d9d;font-size:.625rem;font-weight:400;line-height:1.25rem}
        .inArticleAQIContent_Wrapper a{display:flex;justify-content:center;align-items:end;margin-right:5rem}
        .inArticleAQIContent_Wrapper .AQIRange_Wrap{display:flex;align-items:center;text-align:center}
        .inArticleAQIContent_Wrapper .AQIRange_Wrap .locationName{color:#16191b;font-size:1.75rem;font-weight:400;line-height:1.9375rem;text-transform:capitalize;margin-right:1.94rem}
        .inArticleAQIContent_Wrapper .AQIRange_Wrap .rangeInfo{position:relative;width:12rem;height:8rem;margin:0 auto;display:flex;justify-content:center;align-items:flex-end;flex-wrap:wrap}
        .inArticleAQIContent_Wrapper.goodAQI .rangeInfo::before,.inArticleAQIContent_Wrapper.hazardousAQI .rangeInfo::before,.inArticleAQIContent_Wrapper.moderateAQI .rangeInfo::before,.inArticleAQIContent_Wrapper.poorAQI .rangeInfo::before,.inArticleAQIContent_Wrapper.severeAQI .rangeInfo::before,.inArticleAQIContent_Wrapper.unhealthyAQI .rangeInfo::before{content:'';position:absolute;width:100%;height:100%;background-repeat:no-repeat;background-size:100%;top:50%;left:50%;transform:translate(-50%,-50%)}
        .inArticleAQIContent_Wrapper.goodAQI .rangeInfo::before{background-image:url(https://images.tv9hindi.com/images/goodAQI.svg)}
        .inArticleAQIContent_Wrapper.moderateAQI .rangeInfo::before{background-image:url(https://static.tv9hindi.com/images/moderateAQI.svg)}
        .inArticleAQIContent_Wrapper.poorAQI .rangeInfo::before{background-image:url(https://images.tv9hindi.com/images/poorAQI.svg)}
        .inArticleAQIContent_Wrapper.unhealthyAQI .rangeInfo::before{background-image:url(https://static.tv9hindi.com/images/unhealthyAQI.svg)}
        .inArticleAQIContent_Wrapper.severeAQI .rangeInfo::before{background-image:url(https://images.tv9hindi.com/images/severeAQI.svg)}
        .inArticleAQIContent_Wrapper.hazardousAQI .rangeInfo::before{background-image:url(https://images.tv9hindi.com/images/hazardousAQI.svg)}
        .inArticleAQIContent_Wrapper .rangeInfo strong{display:block;color:#000;font-size:2.875rem;font-weight:700;line-height:1}
        .inArticleAQIContent_Wrapper .rangeInfo small{display:block;color:#000;font-size:1rem;font-weight:500;text-transform:uppercase}
        .inArticleAQIContent_Wrapper .rangeInfo span{display:block;color:#000;font-size:.9375rem;font-weight:400;text-transform:capitalize}
        .inArticleAQIContent_Wrapper .AQIDetail_Wrap{margin-left:1.94rem}
        .inArticleAQIContent_Wrapper .AQIDetail_Wrap small{display:block;color:#000;font-size:.9375rem;font-weight:500;display:block;margin-bottom:.44rem;text-align:center}
        .inArticleAQIContent_Wrapper .AQIDetail_Wrap .AQICateg{height:2rem;border-radius:.5rem;background:#afaeae;color:#000;font-size:1.25rem;font-weight:400;line-height:1.25rem;display:inline-flex;justify-content:center;align-items:center;padding:0 .625rem;position:relative}
        .inArticleAQIContent_Wrapper .AQIDetail_Wrap .AQICateg::before{content:'';width:1.25rem;height:1.25rem;background-repeat:no-repeat;margin-right:.3125rem;background-size:100%}
        .inArticleAQIContent_Wrapper.goodAQI .AQIDetail_Wrap .AQICateg{background:#ecffeb;color:#34a12b}
        .inArticleAQIContent_Wrapper.moderateAQI .AQIDetail_Wrap .AQICateg{background:#fffee2;color:#d4cc0f}
        .inArticleAQIContent_Wrapper.poorAQI .AQIDetail_Wrap .AQICateg{background:#ffeae2;color:#ff5f20}
        .inArticleAQIContent_Wrapper.unhealthyAQI .AQIDetail_Wrap .AQICateg{background:#ffeaf5;color:#fc0185}
        .inArticleAQIContent_Wrapper.severeAQI .AQIDetail_Wrap .AQICateg{background:#fbe4ff;color:#a302b9}
        .inArticleAQIContent_Wrapper.hazardousAQI .AQIDetail_Wrap .AQICateg{background:#ffe8e5;color:#ff1500}
        .inArticleAQIContent_Wrapper.goodAQI .AQIDetail_Wrap .AQICateg::before{background-image:url(https://static.tv9hindi.com/images/goodEmoji.svg)}
        .inArticleAQIContent_Wrapper.moderateAQI .AQIDetail_Wrap .AQICateg::before{background-image:url(https://static.tv9hindi.com/images/moderateEmoji.svg)}
        .inArticleAQIContent_Wrapper.poorAQI .AQIDetail_Wrap .AQICateg::before{background-image:url(https://static.tv9hindi.com/images/poorEmoji.svg)}
        .inArticleAQIContent_Wrapper.unhealthyAQI .AQIDetail_Wrap .AQICateg::before{background-image:url(https://static.tv9hindi.com/images/unhealthyEmoji.svg)}
        .inArticleAQIContent_Wrapper.severeAQI .AQIDetail_Wrap .AQICateg::before{background-image:url(https://static.tv9hindi.com/images/severeEmoji.svg)}
        .inArticleAQIContent_Wrapper.hazardousAQI .AQIDetail_Wrap .AQICateg::before{background-image:url(https://static.tv9hindi.com/images/hazardousEmoji.svg)}
        .widget-tab-links{display:flex;justify-content:space-between;align-items:center}
        .widget-tab-links .tab-links a svg{fill:#fff}
        .widget-tab-links .tab-links{border-radius:1.25rem 1.25rem 0rem 0rem;background:#000;display:flex;align-items:center;padding:2px 2px 0 2px;justify-content:space-between;border-bottom:2px solid #000}
        .widget-tab-links .tab-links a{color:#fff;font-size:1.125rem;font-weight:500;text-transform:uppercase;display:flex;align-items:center;justify-content:center;width:8rem;height:2.5rem}
        .widget-tab-links .tab-links a svg{width:1.5rem;height:1.5rem;display:block;margin-right:.5rem}
        .widget-tab-links .tab-links a svg.weather_icon{stroke:#fff}
        .widget-tab-links .tab-links a.active{color:#000;border-radius:1.125rem 1.125rem 0rem 0rem;background:#fff}
        .widget-tab-links .tab-links a.active svg.weather_icon{stroke:#000}
        .widget-tab-links .tab-links a.active svg.aqi_icon{fill:#000}
        @media(max-width:768px){
        .inArticleAQIWidget_Wrapper{border-radius:0 0 0.875rem 0.875rem;}
        .inArticleAQIWidget_Wrapper::before{background-image:url(https://images.tv9hindi.com/wp-content/themes/tv9bharavarsh/images/aqi-widet-bg-mob.svg);top:40px;background-size:auto;}
        .inArticleAQIWidget_Wrapper .custom-heading{margin:0 -10px 10px -10px;padding:0 .62rem .62rem;border-bottom:1px solid #e7e7e7;}
        .inArticleAQIContent_Wrapper a{margin-right:0;flex-wrap:wrap}
        .inArticleAQIContent_Wrapper .AQIRange_Wrap{flex-wrap:wrap}
        .inArticleAQIContent_Wrapper .AQIRange_Wrap .locationName{margin-right:0;margin-bottom:.625rem;width:100%}
        .inArticleAQIContent_Wrapper .AQIDetail_Wrap{margin-left:0;width:100%;display:flex;justify-content:center;align-items:center}
        .inArticleAQIContent_Wrapper .AQIDetail_Wrap small{margin-bottom:0;margin-right:.44rem;font-size:0.875rem}
        .inArticleAQIWidget_Wrapper .poweredBy{position:static;margin-top:1.19rem;text-align:center}
        .inArticleAQIWidget_Wrapper .poweredBy a{justify-content:center}
        .inArticleAQIContent_Wrapper .AQIRange_Wrap .rangeInfo{width:12rem;height:9rem;align-items:center;}
        .inArticleAQIContent_Wrapper .AQIDetail_Wrap .AQICateg{font-size:1.0625rem;}
        .inArticleAQIContent_Wrapper .AQIDetail_Wrap .AQICateg::before{width:1.16631rem;height:1.16631rem;}
        .widget-tab-links .tab-links{width:100%}
        .widget-tab-links .tab-links a{width:50%;}
        .locationSearchInput{width:10rem;}
        }
        `}</style>
    </>
  );
}