"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import { decodeHtml } from "@/lib/helper/commonHelper";
import SearchDropdown from "@/components/pb/SearchDropdown";
import {
  DEFAULT_WEATHER_SITE,
  buildTodaysWeatherInCityWidgetData,
  fetchTodaysWeatherInCity,
  getWeatherLabel,
  resolveWeatherApiPayload,
  resolveWeatherIconSrc,
} from "@/lib/helper/weatherHelper";

const WEATHER_IMAGE_BASE = "https://static.tv9hindi.com/images/weather";
const DEFAULT_WEATHER_BG = `${WEATHER_IMAGE_BASE}/Rain-Thunder.jpg`;
const FALLBACK_WEATHER_BG = `${WEATHER_IMAGE_BASE}/Sunny.jpg`;
const DEFAULT_WEATHER_CITY = "New Delhi";

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

export default function WeatherForecastWidget({
  title = "",
  items = [],
  data = null,
  dataConfig = {},
  queryParams = {},
}) {
  const siteName = dataConfig.site_name || DEFAULT_WEATHER_SITE;
  const lang = dataConfig.lang || "hi";
  const cityLangKey = `city_${lang}`;
  const displayTitle =
    decodeHtml(dataConfig.title) ||
    decodeHtml(title) ||
    getWeatherLabel("weather-info", siteName);

  const weatherPayload = useMemo(() => resolveWeatherApiPayload(data), [data]);

  const ssrData = useMemo(
    () => buildTodaysWeatherInCityWidgetData(weatherPayload, siteName, lang),
    [weatherPayload, siteName, lang]
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

  const { cityName, current, lastUpdated, aqi = {}, apiCityName = "" } = widgetData;
  const aqiCityName = apiCityName || DEFAULT_WEATHER_CITY;

  if (!current) {
    return null;
  }

  const resolvedCityName = dataConfig.city_name || cityName || "नई दिल्ली";
  const currentTemp = Number.isNaN(Number(current.tempC))
    ? "--"
    : String(Math.round(Number(current.tempC)));
  const labels = {
    currentTemperatureLevel: getWeatherLabel("current-temperature-level", siteName),
    feelsLike: getWeatherLabel("feels-like", siteName),
    humidity: getWeatherLabel("humidity", siteName),
    poweredBy: getWeatherLabel("powered-by", siteName),
    weatherConditions: getWeatherLabel("weather-conditions", siteName, "मौसम की स्थिति"),
    aqi: getWeatherLabel("aqi", siteName, "वायु गुणवत्ता सूचकांक"),
    aqiIs: getWeatherLabel("aqi-is", siteName, "वायु गुणवत्ता सूचकांक है"),
  };

  return (
    <>
      <div className="weather-top-widget">
        <div className="container">
          <div className="custom-heading">
            <h1 className="h2">{displayTitle}</h1>
          </div>
          <div className="tab-links-wrap">
            <div className="tab-links">
              <a href="/aqi" id="openAQI" data-city={aqiCityName}>
                <svg className="aqi_icon">
                  <use href="#wind_icon" />
                </svg>
                AQI
              </a>

              <a href="/weather-forecast" className="active">
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
                <h2>
                  {resolvedCityName} {labels.weatherConditions}
                </h2>
                <span>{labels.currentTemperatureLevel}</span>
              </div>
              <div className="weather-conditions-body">
                <div className="weather-conditions-body-left">
                  <div className="weather-conditions-body-left__Left">
                    <WeatherImg
                      className="weather-condition-icon"
                      width={50}
                      height={50}
                      src={current.conditionIcon}
                    />
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
                    className="weather-temperature-level"
                    width={130}
                    height={224}
                    src={current.temperatureLevelIcon || `${WEATHER_IMAGE_BASE}/temperature-hot-level.svg`}
                  />
                </div>
              </div>
            </div>
            <div className="aqi-index-container">
              <a href="/aqi">
                <div className="aqi-index-header">
                  <h2>{labels.aqi}</h2>
                  <span className="view_icon">
                    <svg>
                      <use href="#view_icon" />
                    </svg>
                  </span>
                </div>
                <div className="aqi-index">
                  <div className="aqi-index-body">
                    <div className="aqi-count">
                      {aqi.aqi ?? "--"} <small>AQI</small>
                    </div>
                    <div className="aqi-index-sep" />
                    <div className="pm-index">
                      <span>
                        PM2.5 : <strong id="pm25">{aqi.pm25 ?? "--"}</strong>
                      </span>
                      <span>
                        PM10 : <strong id="pm10">{aqi.pm10 ?? "--"}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="aqi-index-footer">
                    {labels.aqiIs}:{" "}
                    <strong id="air_index">
                      {getWeatherLabel(String(current.uvCondition || ""), siteName, current.uvCondition || "")}
                    </strong>
                  </div>
                </div>
              </a>
            </div>
            <div className="lastUpdatedTime" id="lastUpdated">
              {lastUpdated}
            </div>
            <div className="poweredBy">
              <a href="https://www.aqi.in/" target="_blank" rel="noopener noreferrer">
                <span>{labels.poweredBy}</span>
                <WeatherImg
                  className="aqi-brand-logo"
                  width={53}
                  height={26}
                  src="https://static.tv9hindi.com/images/aqi-brand.png"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .weather-top-widget .custom-heading {
          margin-bottom: 1.56rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
        }
        .weather-top-widget .custom-heading .h2 {
          color: #000;
          font-size: 1.375rem;
          font-weight: 700;
          line-height: 1.875rem;
          text-transform: capitalize;
        }
        .weather-top-widget .tab-links-wrap {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .weather-top-widget .tab-links-wrap .tab-links {
          border-radius: 1.25rem 1.25rem 0 0;
          background: #000;
          display: flex;
          align-items: center;
          padding: 2px 2px 0 2px;
          justify-content: space-between;
        }
        .weather-top-widget .tab-links-wrap .tab-links a {
          color: #fff;
          font-size: 1.125rem;
          font-weight: 500;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 11.5625rem;
          height: 3.3125rem;
          text-decoration: none;
        }
        .weather-top-widget .tab-links-wrap .tab-links a.active {
          color: #000;
          border-radius: 1.125rem 1.125rem 0 0;
          background: #fff;
        }
        .weather-top-widget .tab-links-wrap .tab-links a svg {
          width: 1.5rem;
          height: 1.5rem;
          display: block;
          margin-right: 0.5rem;
        }
        .weather-top-widget .tab-links-wrap .tab-links a svg.aqi_icon {
          fill: #fff;
        }
        .weather-top-widget .tab-links-wrap .tab-links a svg.weather_icon {
          fill: #fff;
          stroke: #fff;
        }
        .weather-top-widget .tab-links-wrap .tab-links a.active svg.aqi_icon {
          fill: #000;
        }
        .weather-top-widget .tab-links-wrap .tab-links a.active svg.weather_icon {
          stroke: #000;
        }
        .weather-top-widget .search-dropdown {
          position: relative;
        }
        .weather-top-widget .search-dropdown .locationSearchInput {
          display: flex;
          width: 10.375rem;
          height: 2.5rem;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          border-radius: 1.25rem;
          border: 1px solid #d8d8d8;
          background: #fff;
          padding: 0.94rem;
          color: #000;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .weather-top-widget .search-dropdown .locationSearchInput::placeholder {
          color: #000;
        }
        .weather-top-widget .search-dropdown .searchResults {
          position: absolute;
          top: calc(100% + 0.5rem);
          right: 0;
          width: 20rem;
          max-height: 18rem;
          overflow: auto;
          background: #fff;
          border: 1px solid #d8d8d8;
          border-radius: 1rem;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          padding: 0.4rem;
          z-index: 8;
        }
        .weather-top-widget .search-dropdown .search-dropdown__item {
          display: block;
          padding: 0.65rem 0.75rem;
          border-radius: 0.75rem;
          text-decoration: none;
        }
        .weather-top-widget .search-dropdown .search-dropdown__item strong {
          display: block;
          font-size: 0.9375rem;
          font-weight: 700;
          color: #000;
          line-height: 1.2;
        }
        .weather-top-widget .search-dropdown .search-dropdown__item span {
          display: block;
          font-size: 0.75rem;
          color: #666;
          line-height: 1.3;
          margin-top: 0.18rem;
        }
        .weather-top-widget .search-dropdown .search-dropdown__item:hover {
          background: #f4f8fb;
        }

        .weatherResults_Wrapper {
          border-radius: 0 0.875rem 0.875rem;
          background: #fff;
          box-shadow: 0 0 12px 0 rgba(96, 113, 121, 0.1);
          width: 100%;
          height: 23.9375rem;
          position: relative;
          z-index: 0;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 5rem;
          align-items: center;
          padding: 2.38rem 4.12rem;
          margin-bottom: 1.75rem;
          overflow: hidden;
        }
        .weatherResults_Wrapper .current-weather-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        .weatherResults_Wrapper .current-weather-bg .weather-bg-image {
          object-fit: cover;
        }
        .weatherResults_Wrapper .weather-conditions-container .weather-conditions-header h2 {
          font-size: 1.75rem;
          font-weight: 700;
          line-height: 2.0625rem;
          text-transform: capitalize;
          color: #000;
          margin: 0;
        }
        .weatherResults_Wrapper .weather-conditions-container .weather-conditions-header span {
          font-size: 1.25rem;
          font-weight: 500;
          line-height: 2.0625rem;
          text-transform: capitalize;
          color: #000;
          display: block;
        }
        .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body {
          display: grid;
          grid-template-columns: 1fr 224px;
          align-items: center;
        }
        .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left {
          display: grid;
          grid-template-columns: 170px 1fr;
          gap: 2rem;
          align-items: center;
          position: relative;
        }
        .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left .line-seperator {
          width: 0.0625rem;
          height: 4.375rem;
          position: absolute;
          left: 185px;
        }
        .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left .line-seperator::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          background-image: url("https://static.tv9hindi.com/images/weather/line-seperator.png");
          background-size: cover;
          background-repeat: no-repeat;
          width: 0.0625rem;
          height: 4.375rem;
          z-index: 1;
        }
        .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left__Left {
          display: grid;
          grid-template-columns: 50px 1fr;
          gap: 0.5rem;
        }
        .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left__Left > span:first-of-type {
          display: inline-flex;
          align-items: center;
          line-height: 0;
        }
        .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left__Left .weather-condition-icon {
          width: 50px !important;
          height: 50px !important;
          display: block;
        }
        .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left__Left p {
          font-size: 4rem;
          font-weight: 700;
          line-height: 1;
          color: #000;
          margin: 0;
        }
        .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left__Left p sup {
          font-size: 1.5rem;
          font-weight: 500;
          text-transform: uppercase;
          color: #000;
        }
        .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left__Left > span:last-child {
          border-radius: 3.125rem;
          background: #fa4848;
          color: #fff;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          width: auto;
          height: 2.125rem;
          grid-column: span 2;
          padding: 0 10px;
        }
        .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left__Right p {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-transform: capitalize;
          color: #000;
        }
        .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left__Right span {
          font-size: 1rem;
          font-weight: 500;
          text-transform: capitalize;
          color: #000;
          display: block;
        }
        .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-right .weather-temperature-level {
          width: 130px !important;
          height: 224px !important;
          display: block;
          margin: 0 auto;
        }
        .weatherResults_Wrapper .aqi-index-container {
          border-radius: 0.625rem;
          background: #fa4848;
          padding: 2px;
        }
        .weatherResults_Wrapper .aqi-index-container a {
          text-decoration: none;
          color: inherit;
        }
        .weatherResults_Wrapper .aqi-index-container .aqi-index {
          border-radius: 0.625rem;
          border: 1px solid #fa4848;
          background: #fff;
          padding: 1.38rem 0;
        }
        .weatherResults_Wrapper .aqi-index-container .aqi-index-header {
          padding: 0.625rem;
          display: grid;
          grid-template-columns: 1fr 24px;
          gap: 1rem;
          align-items: center;
        }
        .weatherResults_Wrapper .aqi-index-container .aqi-index-header h2 {
          font-size: 1.125rem;
          font-weight: 600;
          text-transform: capitalize;
          color: #fff;
          margin: 0;
        }
        .weatherResults_Wrapper .aqi-index-container .aqi-index-header .view_icon {
          width: 1.50231rem;
          height: 1.50231rem;
          background: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .weatherResults_Wrapper .aqi-index-container .aqi-index-header .view_icon svg {
          width: 2.125rem;
          height: 2.125rem;
          fill: #fa4848;
        }
        .weatherResults_Wrapper .aqi-index-container .aqi-index-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          place-items: center;
          padding-bottom: 1.25rem;
          position: relative;
        }
        .weatherResults_Wrapper .aqi-index-container .aqi-index-body .aqi-count {
          font-size: 2.375rem;
          font-weight: 700;
          line-height: 2.0625rem;
          text-transform: capitalize;
          color: #000;
        }
        .weatherResults_Wrapper .aqi-index-container .aqi-index-body .aqi-count small {
          font-size: 1rem;
          font-weight: 500;
        }
        .weatherResults_Wrapper .aqi-index-container .aqi-index-body .aqi-index-sep {
          position: absolute;
          width: 0.0625rem;
          height: 3.75rem;
          left: 50%;
          transform: translateX(-50%);
        }
        .weatherResults_Wrapper .aqi-index-container .aqi-index-body .aqi-index-sep::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          background-image: url("https://static.tv9hindi.com/images/weather/line-seperator.png");
          background-size: cover;
          background-repeat: no-repeat;
          width: 0.0625rem;
          height: 3.75rem;
          z-index: 1;
        }
        .weatherResults_Wrapper .aqi-index-container .aqi-index-body .pm-index span {
          font-size: 1rem;
          font-weight: 500;
          display: block;
          text-transform: uppercase;
        }
        .weatherResults_Wrapper .aqi-index-container .aqi-index-body .pm-index strong {
          font-weight: 700;
          color: #271711;
          margin-left: 5px;
        }
        .weatherResults_Wrapper .aqi-index-container .aqi-index-footer {
          border-radius: 0.25rem;
          background: #e8f5fe;
          width: 16.875rem;
          height: 2.0625rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000;
          font-size: 0.875rem;
          font-weight: 500;
          margin: 0 auto;
        }
        .weatherResults_Wrapper .aqi-index-container .aqi-index-footer strong {
          font-weight: 700;
          color: #271711;
          text-transform: uppercase;
          margin-left: 5px;
        }
        .weatherResults_Wrapper .lastUpdatedTime {
          font-size: 0.75rem;
          font-weight: 400;
          line-height: 1.25rem;
          text-transform: capitalize;
          position: absolute;
          bottom: 1rem;
          left: 4rem;
        }
        .weatherResults_Wrapper .poweredBy {
          position: absolute;
          right: 1rem;
          bottom: 1rem;
        }
        .weatherResults_Wrapper .poweredBy a {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        .weatherResults_Wrapper .poweredBy span {
          margin-right: 0.62rem;
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: 0.0075rem;
          text-transform: uppercase;
        }
        .weatherResults_Wrapper .poweredBy .aqi-brand-logo {
          width: 53px !important;
          height: 26px !important;
          display: inline-block;
        }

        @media screen and (max-width: 767px) {
          .weather-top-widget .custom-heading {
            margin-bottom: 0.625rem;
          }
          .weather-top-widget .tab-links-wrap {
            flex-flow: column-reverse wrap;
          }
          .weather-top-widget .tab-links-wrap .tab-links {
            width: 100%;
            margin-top: 0.62rem;
          }
          .weather-top-widget .search-dropdown {
            width: 100%;
          }
          .weather-top-widget .search-dropdown .locationSearchInput {
            width: 100%;
          }
          .weather-top-widget .search-dropdown .searchResults {
            left: 0;
            right: auto;
            width: 100%;
          }
          .weatherResults_Wrapper {
            grid-template-columns: 1fr;
            height: auto;
            padding: 1rem;
            gap: 1rem;
            border-radius: 0 0 0.875rem 0.875rem;
          }
          .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body {
            grid-template-columns: 1fr;
          }
          .weatherResults_Wrapper .weather-conditions-container .weather-conditions-header {
            margin-bottom: 0.62rem;
            text-align: center;
          }
          .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left {
            grid-template-columns: 1fr;
            gap: 1rem;
            margin-bottom: 0.62rem;
            justify-items: center;
          }
          .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left__Left > span:last-child {
            font-size: 0.75rem;
            font-weight: 500;
            height: 1.5rem;
          }
          .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left__Right > div {
            text-align: center;
          }
          .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left__Right span {
            display: inline-block;
            margin-right: 5px;
          }
          .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left__Right span:last-child {
            margin-right: 0;
          }
          .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-left .line-seperator {
            display: none;
          }
          .weatherResults_Wrapper .weather-conditions-container .weather-conditions-body-right .weather-temperature-level {
            width: 77px !important;
            height: 132px !important;
          }
          .weatherResults_Wrapper .aqi-index-container .aqi-index-header h2 {
            font-size: 0.875rem;
            line-height: 1;
          }
          .weatherResults_Wrapper .aqi-index-container .aqi-index-header .view_icon {
            width: 1.5rem;
            height: 1.5rem;
          }
          .weatherResults_Wrapper .aqi-index-container .aqi-index {
            padding: 1rem 0;
          }
          .weatherResults_Wrapper .aqi-index-container .aqi-index-body .aqi-count {
            font-size: 1.375rem;
            line-height: 1;
          }
          .weatherResults_Wrapper .aqi-index-container .aqi-index-body .pm-index span {
            font-size: 0.875rem;
            line-height: 1.2;
          }
          .weatherResults_Wrapper .lastUpdatedTime {
            position: unset;
            font-size: 0.75rem;
            font-weight: 400;
            line-height: 1;
            text-align: center;
          }
          .weatherResults_Wrapper .poweredBy {
            position: unset;
            display: flex;
            justify-content: center;
          }
          .weatherResults_Wrapper .poweredBy span {
            font-size: 0.62rem;
            font-weight: 400;
            line-height: 1;
            margin-right: 5px;
          }
          .weatherResults_Wrapper .poweredBy .aqi-brand-logo {
            width: 28px !important;
            height: auto !important;
          }
        }
      `}</style>
    </>
  );
}

WeatherForecastWidget.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  dataConfig: PropTypes.object,
  queryParams: PropTypes.object,
};
