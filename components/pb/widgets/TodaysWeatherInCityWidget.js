"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import useSplide from "@/hooks/useSplide";
import "@splidejs/splide/css";
import SearchDropdown from "@/components/pb/SearchDropdown";
import { decodeHtml } from "@/lib/helper/commonHelper";
import {
  DEFAULT_WEATHER_SITE,
  buildTodaysWeatherInCityWidgetData,
  fetchTodaysWeatherInCity,
  getWeatherLabel,
  resolveWeatherApiPayload,
  resolveWeatherIconSrc,
} from "@/lib/helper/weatherHelper";

const WEATHER_IMAGE_BASE = "https://static.tv9hindi.com/images/weather";
const DEFAULT_WEATHER_BG = `${WEATHER_IMAGE_BASE}/Mist.jpg`;
const FALLBACK_WEATHER_BG = `${WEATHER_IMAGE_BASE}/Sunny.jpg`;

function WeatherImg({ src, width, height, className = "", style }) {
  const resolvedSrc = src?.startsWith("http") ? src : resolveWeatherIconSrc(src);

  return (
    <Image
      src={resolvedSrc}
      width={width}
      height={height}
      alt=""
      className={className}
      style={style}
      unoptimized
    />
  );
}

WeatherImg.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

function WeatherBackgroundImage({ src: initialSrc = DEFAULT_WEATHER_BG }) {
  const [src, setSrc] = useState(initialSrc || DEFAULT_WEATHER_BG);

  useEffect(() => {
    setSrc(initialSrc || DEFAULT_WEATHER_BG);
  }, [initialSrc]);

  return (
    <Image
      src={src}
      alt=""
      fill
      className="weather-bg-image"
      sizes="100vw"
      unoptimized
      onError={() => setSrc(FALLBACK_WEATHER_BG)}
      style={{ objectFit: "cover" }}
    />
  );
}

WeatherBackgroundImage.propTypes = {
  src: PropTypes.string,
};

export default function TodaysWeatherInCityWidget({
  title = "",
  items = [],
  data = null,
  dataConfig = {},
  queryParams = {},
}) {
  const weatherHref = `/weather-forecast`;
  const siteName = dataConfig.site_name || DEFAULT_WEATHER_SITE;
  const lang = dataConfig.lang || "hi";
  const cityLangKey = `city_${lang}`;

  const ssrData = useMemo(
    () => buildTodaysWeatherInCityWidgetData(resolveWeatherApiPayload(data), siteName, lang),
    [data, siteName, lang]
  );

  const weatherFetchKey = useMemo(
    () =>
      JSON.stringify({
        endpoint: dataConfig.endpoint,
        weather_api_url: dataConfig.weather_api_url,
        city_api_url: dataConfig.city_api_url,
        site_name: dataConfig.site_name,
        lang,
        city: queryParams?.city,
        citySlug: queryParams?.citySlug,
        nameSlug: queryParams?.nameSlug,
      }),
    [
      dataConfig.endpoint,
      dataConfig.weather_api_url,
      dataConfig.city_api_url,
      dataConfig.site_name,
      lang,
      queryParams?.city,
      queryParams?.citySlug,
      queryParams?.nameSlug,
    ]
  );

  const [widgetData, setWidgetData] = useState(ssrData);

  useEffect(() => {
    if (ssrData.current) {
      setWidgetData(ssrData);
    }
  }, [ssrData]);

  useEffect(() => {
    let cancelled = false;

    fetchTodaysWeatherInCity(dataConfig, queryParams, siteName, lang).then((result) => {
      if (!cancelled && result.current) {
        setWidgetData(result);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [weatherFetchKey, siteName, lang, dataConfig, queryParams]);

  const { cityName, current, hourlySlides, lastUpdated } = widgetData;

  const sliderRef = useSplide(
    {
      perPage: 6,
      gap: "10px",
      pagination: false,
      perMove: 1,
      focus: 0,
      omitEnd: true,
    },
    [hourlySlides.length, cityName]
  );

  if (!current) {
    return null;
  }

  const resolvedCityName = dataConfig.city_name || cityName || "नई दिल्ली";
  const heading =
    `${resolvedCityName}` + ` ${decodeHtml(dataConfig.title || title)}` ||
    `${resolvedCityName} ${getWeatherLabel("weather-conditions-detail", siteName)}`;

  const currentTemp = Number.isNaN(Number(current.tempC))
    ? "--"
    : String(Math.round(Number(current.tempC)));
  const labels = {
    currentTemperatureLevel: getWeatherLabel("current-temperature-level", siteName),
    feelsLike: getWeatherLabel("feels-like", siteName),
    humidity: getWeatherLabel("humidity", siteName),
    hourlyUpdate: getWeatherLabel("hourly-update", siteName),
    poweredBy: getWeatherLabel("powered-by", siteName),
  };

  return (
    <div className="weather-top-widget">
      <div className="container">
        <div className="custom-heading" />
        <div className="tab-links-wrap">
          <div className="tab-links">
            <a href="/aqi" id="openAQI" data-city="New delhi">
              <svg className="aqi_icon">
                <use href="#wind_icon" />
              </svg>
              AQI
            </a>

            <a href={weatherHref} className="active" aria-current="page">
              <svg className="weather_icon">
                <use href="#sun_icon" />
              </svg>
              मौसम
            </a>
          </div>
          <SearchDropdown
            items={items}
            placeholder={decodeHtml(dataConfig.search_placeholder) || "अपना शहर खोजें"}
            inputId="locationSearch"
            inputName="locationSearch"
            inputClassName="locationSearchInput"
            resultsClassName="searchResults"
            getSearchText={(item) =>
              [item?.city_name, item?.[cityLangKey], item?.state_name, item?.country_name]
                .filter(Boolean)
                .join(" ")
            }
            getItemKey={(item) => item?.slug || item?.city_name || ""}
            getItemHref={(item) => {
                const citySlug = String(item?.slug || "").split("/").findLast(Boolean);
                return citySlug
                  ? `/weather-forecast/${citySlug}-weather-update`
                  : "/weather-forecast";
            }}
            renderItem={(item) => (
              <>
                <strong>{item?.[cityLangKey] || item?.city_name}</strong>
                <span>{[item?.state_name, item?.country_name].filter(Boolean).join(", ")}</span>
              </>
            )}
          />
        </div>
        <div className="weatherResults_Wrapper">
          <div className="current-weather-bg">
            <WeatherBackgroundImage src={current.backgroundImage || DEFAULT_WEATHER_BG} />
          </div>
          <div className="weather-conditions-container">
            <div className="weather-conditions-header">
              <h1 className="h2">{heading}</h1>
              <span>{labels.currentTemperatureLevel}</span>
            </div>
            <div className="weather-conditions-body">
              <div className="weather-conditions-body-left">
                <div className="weather-conditions-body-left__Left">
                  <WeatherImg width={50} height={50} src={current.conditionIcon} />
                  <div>
                    <p>
                      {currentTemp}
                      <sup>°C</sup>
                    </p>
                  </div>
                  <span>{current.weatherCode}</span>
                </div>
                <div className="line-seperator" />
                <div className="weather-conditions-body-left__Right">
                  <div>
                    <p id="Weather-Code">{current.condition}</p>
                    <span>
                      {labels.feelsLike} <strong>{current.feelsLike}</strong>
                    </span>
                    <span>
                      {labels.humidity} <strong>{current.humidity}</strong>
                    </span>
                  </div>
                </div>
              </div>
              <div className="weather-conditions-body-right">
                <WeatherImg
                  width={130}
                  height={224}
                  src={current.temperatureLevelIcon || `${WEATHER_IMAGE_BASE}/temperature-hot-level.svg`}
                />
              </div>
            </div>
          </div>
          <div className="weather-hourly-update">
            <div className="weather-hourly-update-header">
              <h2>{labels.hourlyUpdate}</h2>
            </div>
            <div className="weather-hourly-update-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                <symbol viewBox="0 0 16 16" id="slide-arrow">
                  <g clipPath="url(#clip0_171_777)">
                    <path d="M3.87899 2.3333C3.45963 1.89618 3.45303 1.16497 3.88229 0.718694C4.31597 0.267839 5.0083 0.270127 5.43537 0.715261L12.4446 8.00103L5.43316 15.2891C5.0127 15.7262 4.30936 15.7331 3.88009 15.2857C3.44752 14.8359 3.44862 14.1162 3.87679 13.671L9.3307 8.00103L3.87899 2.3333Z" />
                  </g>
                  <defs>
                    <clipPath id="clip0_171_777">
                      <rect
                        width="15.2381"
                        height="15.2381"
                        fill="white"
                        transform="translate(0.380859 0.380981)"
                      />
                    </clipPath>
                  </defs>
                </symbol>
              </svg>
              <div className="weather-hourly-update-body">
                <div ref={sliderRef} className="splide hourlyForecastSlider">
                  <div className="splide__track">
                    <div className="splide__list">
                      {hourlySlides.map((slide) => (
                        <div className="splide__slide" key={slide.key}>
                          <span>{slide.time}</span>
                          <WeatherImg width={24} height={24} src={slide.icon} />
                          <strong>{slide.temp}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="splide__arrows">
                    <button type="button" className="splide__arrow splide__arrow--prev" aria-label="Previous">
                      <svg>
                        <use href="#slide-arrow" />
                      </svg>
                    </button>
                    <button type="button" className="splide__arrow splide__arrow--next" aria-label="Next">
                      <svg>
                        <use href="#slide-arrow" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lastUpdatedTime" id="lastUpdated">
            {lastUpdated}
          </div>
          <div className="poweredBy">
            <a href="https://www.aqi.in/" target="_blank" rel="noopener noreferrer">
              <span>{labels.poweredBy}</span>
              <WeatherImg
                width={53}
                height={26}
                src="https://static.tv9hindi.com/images/aqi-brand.png"
              />
            </a>
          </div>
        </div>
      </div>
      <style>{`
        .weather-top-widget .custom-heading{justify-content:start}
    .weather-top-widget .tab-links-wrap{display:flex;justify-content:space-between;align-items:center}
    .weather-top-widget .tab-links-wrap .tab-links{border-radius:1.25rem 1.25rem 0rem 0rem;background:#000;display:flex;align-items:center;padding:2px 2px 0 2px;justify-content:space-between}
    .weather-top-widget .tab-links-wrap .tab-links a{color:#fff;font-size:1.125rem;font-weight:500;text-transform:uppercase;display:flex;align-items:center;justify-content:center;width:11.5625rem;height:3.3125rem;text-decoration:none}
    .weather-top-widget .tab-links-wrap .tab-links a.active{color:#000;border-radius:1.125rem 1.125rem 0rem 0rem;background:#fff}
    .weather-top-widget .tab-links-wrap .tab-links a svg{width:1.5rem;height:1.5rem;display:block;margin-right:.5rem}
    .weather-top-widget .tab-links-wrap .tab-links a svg.aqi_icon{fill:#fff}
    .weather-top-widget .tab-links-wrap .tab-links a svg.weather_icon{fill:#fff;stroke:#fff}
    .weather-top-widget .tab-links-wrap .tab-links a.active svg.aqi_icon{fill:#000}
    .weather-top-widget .tab-links-wrap .tab-links a.active svg.weather_icon{stroke:#000}
    .weather-top-widget .search-dropdown{position:relative}
    .weather-top-widget .search-dropdown .locationSearchInput{display:flex;width:10.375rem;height:2.5rem;justify-content:center;align-items:center;flex-shrink:0;border-radius:1.25rem;border:1px solid #d8d8d8;background:#fff;padding:.94rem;color:#000;font-size:.875rem;font-weight:500}
    .weather-top-widget .search-dropdown .locationSearchInput::placeholder{color:#000}
    .weather-top-widget .search-dropdown .searchResults{position:absolute;top:calc(100% + .5rem);right:0;width:20rem;max-height:18rem;overflow:auto;background:#fff;border:1px solid #d8d8d8;border-radius:1rem;box-shadow:0 8px 24px rgba(0,0,0,.12);padding:.4rem;z-index:8}
    .weather-top-widget .search-dropdown .search-dropdown__item{display:block;padding:.65rem .75rem;border-radius:.75rem;text-decoration:none}
    .weather-top-widget .search-dropdown .search-dropdown__item strong{display:block;font-size:.9375rem;font-weight:700;color:#000;line-height:1.2}
    .weather-top-widget .search-dropdown .search-dropdown__item span{display:block;font-size:.75rem;color:#666;line-height:1.3;margin-top:.18rem}
    .weather-top-widget .search-dropdown .search-dropdown__item:hover{background:#f4f8fb}
    .weatherResults_Wrapper{border-radius:0rem .875rem .875rem .875rem;background:#fff;box-shadow:0 0 12px 0 rgba(96,113,121,.1);width:100%;height:23.9375rem;position:relative;z-index:0;display:grid;grid-template-columns:1fr 340px;gap:5rem;align-items:center;padding:2.38rem 4.12rem;margin-bottom:1.75rem;overflow:hidden}
    .weatherResults_Wrapper .current-weather-bg{position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1}
    .weatherResults_Wrapper .current-weather-bg img{width:100%;height:100%;object-fit:cover}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body{display:grid;grid-template-columns:1fr 224px;align-items:center}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left .line-seperator{width:.0625rem;height:4.375rem;position:absolute;left:185px}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left .line-seperator::before{content:"";position:absolute;top:0;left:0;background-image:url(https://static.tv9hindi.com/images/weather/line-seperator.png);background-size:cover;background-repeat:no-repeat;width:.0625rem;height:4.375rem;z-index:1}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-header .h2{font-size:1.75rem;font-weight:700;line-height:2.0625rem;text-transform:capitalize;color:#000}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-header span{font-size:1.25rem;font-weight:500;line-height:2.0625rem;text-transform:capitalize;color:#000}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body .weather-conditions-body-left{display:grid;grid-template-columns:170px 1fr;gap:2rem;align-items:center;position:relative}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body .weather-conditions-body-left__Left{display:grid;grid-template-columns:50px 1fr;gap:.5rem}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body .weather-conditions-body-left__Left img{width:50px;height:50px;display:block}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body .weather-conditions-body-left__Left p{font-size:4rem;font-weight:700;line-height:1;color:#000}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body .weather-conditions-body-left__Left p sup{font-size:1.5rem;font-weight:500;text-transform:uppercase;color:#000}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body .weather-conditions-body-left__Left span{border-radius:3.125rem;background:#fa4848;color:#fff;font-size:.875rem;font-weight:600;text-transform:uppercase;display:flex;align-items:center;justify-content:center;width:auto;height:2.125rem;grid-column:span 2;padding:0 10px}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body .weather-conditions-body-left__Right{display:grid;grid-template-columns:1fr;}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body .weather-conditions-body-left__Right p{font-size:1.25rem;font-weight:600;margin-bottom:.5rem;text-transform:capitalize;color:#000}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body .weather-conditions-body-left__Right span{font-size:1rem;font-weight:500;text-transform:capitalize;color:#000;display:block}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body .weather-conditions-body-right img{width:130px;height:224px;display:block;margin:0 auto}
    .weatherResults_Wrapper .aqi-index-container{border-radius:.625rem;background:#fa4848;padding:2px}
    .weatherResults_Wrapper .aqi-index-container .aqi-index{border-radius:.625rem;border:1px solid #fa4848;background:#fff;padding:1.38rem 0}
    .weatherResults_Wrapper .aqi-index-container .aqi-index-header{padding:.625rem;display:grid;grid-template-columns:1fr 24px;gap:1rem;align-items:center}
    .weatherResults_Wrapper .aqi-index-container .aqi-index-header h2{font-size:1.125rem;font-weight:600;text-transform:capitalize;color:#fff}
    .weatherResults_Wrapper .aqi-index-container .aqi-index-header .view_icon{width:1.50231rem;height:1.50231rem;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center}
    .weatherResults_Wrapper .aqi-index-container .aqi-index-header .view_icon svg{width:2.125rem;height:2.125rem;fill:#fa4848}
    .weatherResults_Wrapper .aqi-index-container .aqi-index-footer{border-radius:.25rem;background:#e8f5fe;width:16.875rem;height:2.0625rem;display:flex;align-items:center;justify-content:center;color:#000;font-size:.875rem;font-weight:500;margin:0 auto}
    .weatherResults_Wrapper .aqi-index-container .aqi-index-footer strong{font-weight:700;color:#271711;text-transform:uppercase;margin-left:5px}
    .weatherResults_Wrapper .aqi-index-container .aqi-index-body{display:grid;grid-template-columns:1fr 1fr;gap:1rem;align-items:center;justify-items:center;padding-bottom:1.25rem}
    .weatherResults_Wrapper .aqi-index-container .aqi-index-body .aqi-count{font-size:2.375rem;font-weight:700;line-height:2.0625rem;text-transform:capitalize;color:#000}
    .weatherResults_Wrapper .aqi-index-container .aqi-index-body .aqi-count small{font-size:1rem;font-weight:500}
    .weatherResults_Wrapper .aqi-index-container .aqi-index-body .aqi-index-sep{position:absolute;width:.0625rem;height:3.75rem}
    .weatherResults_Wrapper .aqi-index-container .aqi-index-body .aqi-index-sep::before{content:"";position:absolute;top:0;left:0;background-image:url(https://static.tv9hindi.com/images/weather/line-seperator.png);background-size:cover;background-repeat:no-repeat;width:.0625rem;height:3.75rem;z-index:1}
    .weatherResults_Wrapper .aqi-index-container .aqi-index-body .pm-index span{font-size:1rem;font-weight:500;display:block;text-transform:uppercase}
    .weatherResults_Wrapper .aqi-index-container .aqi-index-body .pm-index strong{font-weight:700;color:#271711;margin-left:5px}
    .weatherResults_Wrapper .lastUpdatedTime{font-size:.75rem;font-weight:400;line-height:1.25rem;text-transform:capitalize;position:absolute;bottom:1rem;left:4rem}
    .weatherResults_Wrapper .poweredBy{position:absolute;right:1rem;bottom:1rem}
    .weatherResults_Wrapper .poweredBy a{display:flex;align-items:center}
    .weatherResults_Wrapper .poweredBy span{margin-right:.62rem;font-size:.75rem;font-weight:400;letter-spacing:.0075rem;text-transform:uppercase}
    .weatherResults_Wrapper .weather-hourly-update{border-radius:.625rem;background:#000;padding:2px;max-height:162px;overflow:hidden}
    .weatherResults_Wrapper .weather-hourly-update-wrap .weather-hourly-update-body{border-radius:.625rem;border:1px solid #000;background:#fff;padding:1rem}
    .weatherResults_Wrapper .weather-hourly-update .weather-hourly-update-header{padding:.625rem}
    .weatherResults_Wrapper .weather-hourly-update .weather-hourly-update-header h2{font-size:1.125rem;font-weight:600;text-transform:capitalize;color:#fff}
    .weatherResults_Wrapper .weather-hourly-update .weather-hourly-update-body .splide__slide{display:flex;align-items:center;justify-content:center;flex-wrap:wrap}
    .weatherResults_Wrapper .weather-hourly-update .weather-hourly-update-body .splide__slide span{font-size:.75rem;font-weight:600;line-height:1.25rem}
    .weatherResults_Wrapper .weather-hourly-update .weather-hourly-update-body .splide__slide strong{font-size:1.125rem;font-weight:700;line-height:2.0625rem;color:#222121;width:100%;text-align:center}
    .weatherResults_Wrapper .weather-hourly-update .weather-hourly-update-body .splide__slide img{width:24px;height:24px;display:block}
    .weatherResults_Wrapper .weather-hourly-update .weather-hourly-update-body .splide__arrow{width:24px;height:24px;top:-40px;opacity:1;background:#000}
    .weatherResults_Wrapper .weather-hourly-update .weather-hourly-update-body .splide__arrow svg{width:12px;height:12px;display:block;fill:#fff}
    .weatherResults_Wrapper .weather-hourly-update .weather-hourly-update-body .splide__arrow--next{right:0}
    .weatherResults_Wrapper .weather-hourly-update .weather-hourly-update-body .splide__arrow--prev{left:auto;right:35px}
    @media screen and (max-width:767px){
    .weather-top-widget .custom-heading{margin-bottom:.625rem}
    .weatherResults_Wrapper .weather-hourly-update .weather-hourly-update-header h2{font-size:.875rem;line-height:1}
    .weatherResults_Wrapper .weather-hourly-update .weather-hourly-update-body .splide__arrow{top:-34px}
    .weatherResults_Wrapper{grid-template-columns:1fr;height:auto;padding:1rem;gap:1rem;border-radius:0rem 0rem .875rem .875rem}
    .weatherResults_Wrapper::before{border-radius:0rem 0rem .875rem .875rem}
    .weather-top-widget .tab-links-wrap{flex-wrap:wrap;flex-direction:column-reverse}
    .weather-top-widget .tab-links-wrap .tab-links{width:100%;margin-top:.62rem}
    .weather-top-widget .search-dropdown{width:100%}
    .weather-top-widget .search-dropdown .locationSearchInput{width:100%}
    .weather-top-widget .search-dropdown .searchResults{left:0;right:auto;width:100%}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body{grid-template-columns:1fr}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-header{margin-bottom:.62rem;text-align:center}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body .weather-conditions-body-left{grid-template-columns:1fr;gap:1rem;margin-bottom:.62rem;justify-items:center}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body .weather-conditions-body-left__Left span{font-size:.75rem;font-weight:500;height:1.5rem}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body .weather-conditions-body-left__Right>div{text-align:center}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body .weather-conditions-body-left__Right span{display:inline-block;margin-right:5px}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body .weather-conditions-body-left__Right span:last-child{margin-right:0}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left .line-seperator{display:none}
    .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body .weather-conditions-body-right img{width:77px;height:132px}
    .weatherResults_Wrapper .aqi-index-container .aqi-index-header h2{font-size:.875rem;line-height:1}
    .weatherResults_Wrapper .aqi-index-container .aqi-index-header .view_icon{width:1.5rem;height:1.5rem}
    .weatherResults_Wrapper .aqi-index-container .aqi-index{padding:1rem 0}
    .weatherResults_Wrapper .aqi-index-container .aqi-index-body .aqi-count{font-size:1.375rem;line-height:1}
    .weatherResults_Wrapper .aqi-index-container .aqi-index-body .pm-index span{font-size:.875rem;line-height:1.2}
    .weatherResults_Wrapper .lastUpdatedTime{position:unset;font-size:.75rem;font-weight:400;line-height:1;text-align:center}
    .weatherResults_Wrapper .poweredBy{position:unset;display:flex;justify-content:center}
    .weatherResults_Wrapper .poweredBy span{font-size:.62rem;font-weight:400;line-height:1;margin-right:5px}
    .weatherResults_Wrapper .poweredBy img{width:28px;display:inline-block}
    }
      `}</style>
    </div>
  );
}

TodaysWeatherInCityWidget.propTypes = {
  title: PropTypes.string,
  dataConfig: PropTypes.object,
  items: PropTypes.array,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  queryParams: PropTypes.object,
};
