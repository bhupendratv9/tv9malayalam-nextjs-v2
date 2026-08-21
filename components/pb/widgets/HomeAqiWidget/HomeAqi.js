import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./HomeAqi.module.css";
import { ICONS_SVG } from "@/lib/constants";
import { getHref } from "@/lib/helper/commonHelper";

export default function HomeAqiWidget() {
  return (
    <>
        <div className={styles.widget_tab_links}>
            <div className={styles.tabLinks}>
                <AppLink href={getHref("/aqi")} className={styles.active}><svg className="aqi_icon"><use href={`${ICONS_SVG}#wind_icon`}></use></svg>AQI</AppLink>
                <AppLink href={getHref("/weather-forecast")}><svg className={styles.weather_icon}><use href={`${ICONS_SVG}#sun_icon`}></use></svg>வானிலை</AppLink>
            </div>
        </div>

        <div className={styles.inArticleAQIWidget_Wrapper}>
            <div className={styles.custom_heading}>
                <h2 className={styles.h2}>आज AQI कितना है</h2>
                <div className={styles.AQISearchDropdown}>
                    <input autoComplete="off" placeholder="अपना शहर खोजें.." type="text" id="locationSearch" name="locationSearch" className={styles.locationSearchInput}></input>
                    <div className={styles.searchResults} id="searchResults" style={{ display: "none" }}></div>
                </div>
            </div>   
            <div className={`${styles.inArticleAQIContent_Wrapper} ${styles.moderateAQI}`}>
                <AppLink href={getHref("/aqi/new-delhi-air-quality-index-today")}>
                    <div className={styles.AQIRange_Wrap}>
                        <div className={styles.locationName} id="cityName">नई दिल्ली</div>
                        <div className={styles.rangeInfo}>
                            <div> 
                                <strong id="aqiValue">62</strong> 
                                <small>Aqi</small> 
                                <span id="aqiRange">range: 51-100</span> 
                            </div>
                        </div>
                    </div>
                    <div className={styles.AQIDetail_Wrap}>
                        <small>Air Quality Is</small>
                        <div className={styles.AQICateg} id="aqiCategory">Moderate</div>
                    </div>
                </AppLink>
            </div>
            <div className={styles.poweredBy}>
                <AppLink href="https://www.aqi.in/" target="_blank">
                    <span>powered by</span>
                    <Image width={53} height={26} src="https://static.tv9hindi.com/images/aqi-brand.png" alt="aqi brand" />
                </AppLink>
                <div className={styles.lastUpdatedTime} id="lastUpdated">Last Updated: 19 May 2026 | 04:00 PM</div>
            </div>
        </div>
    </>
  );
}