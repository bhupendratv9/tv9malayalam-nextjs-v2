"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./WeatherForecast.module.css";
import PropTypes from "prop-types";
import { decodeHtml, getHref } from "@/lib/helper/commonHelper";
import SearchDropdown from "@/components/pb/SearchDropdown";
import { fetchIndiaCityList } from "@/lib/helper/api/cityHelper";

import {
  DEFAULT_WEATHER_SITE,
  buildTodaysWeatherInCityWidgetData,
  buildWeatherCityUrl,
  fetchTodaysWeatherInCity,
  getWeatherLabel,
  resolveWeatherApiPayload,
  resolveWeatherIconSrc,
  stationNameToSlug,
} from "@/lib/helper/weatherHelper";
import { ICONS_SVG } from "@/lib/constants";

const WEATHER_IMAGE_BASE = "https://static.tv9hindi.com/images/weather";
const DEFAULT_WEATHER_BG = `${WEATHER_IMAGE_BASE}/Rain-Thunder.jpg`;
const FALLBACK_WEATHER_BG = `${WEATHER_IMAGE_BASE}/Sunny.jpg`;
const DEFAULT_WEATHER_CITY = "Chennai";

function getCityListKey(city = {}) {
  const slugFromPath = String(city?.slug || "")
    .split("/")
    .findLast(Boolean);
  return stationNameToSlug(slugFromPath || city?.city_name || city?.Station || "");
}

function resolveWeatherSearchHref(city = {}) {
  const slugFromPath = String(city?.slug || "")
    .split("/")
    .findLast(Boolean);
  const weatherPath = buildWeatherCityUrl(
    slugFromPath || city?.city_name || city?.Station || ""
  );

  // SearchDropdown uses plain <a href>, so path needs SITE_URL/basePath via getHref.
  return getHref(weatherPath);
}

function mergeCityLists(baseCities = [], fetchedCities = []) {
  const merged = new Map();

  baseCities.forEach((city) => {
    const key = getCityListKey(city);
    if (key) {
      merged.set(key, city);
    }
  });

  fetchedCities.forEach((city) => {
    const key = getCityListKey(city);
    if (!key) return;

    const existing = merged.get(key) || {};
    merged.set(key, { ...city, ...existing });
  });

  return Array.from(merged.values());
}

function WeatherImg({ src, width, height, className = "", style }) {
  const resolvedSrc = src?.startsWith("http") ? src : resolveWeatherIconSrc(src);

  return (
    <Image
      src={resolvedSrc}
      width={width}
      height={height}
      alt=""
      style={style}
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
      sizes="100vw"
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
  const language = dataConfig.language || dataConfig.lang || "en";
  const cityLangKey = `city_${language}`;
  const displayTitle =
    decodeHtml(dataConfig.title) ||
    decodeHtml(title) ||
    getWeatherLabel("weather-info", siteName);

  const weatherPayload = useMemo(() => resolveWeatherApiPayload(data), [data]);

  const ssrData = useMemo(
    () => buildTodaysWeatherInCityWidgetData(weatherPayload, siteName, language),
    [weatherPayload, siteName, language]
  );

  const weatherFetchKey = useMemo(
    () =>
      JSON.stringify({
        endpoint: dataConfig.endpoint,
        weather_api_url: dataConfig.weather_api_url,
        city_api_url: dataConfig.city_api_url,
        site_name: dataConfig.site_name,
        language: dataConfig.language,
        lang: dataConfig.lang,
        city: queryParams?.city,
        citySlug: queryParams?.citySlug,
        nameSlug: queryParams?.nameSlug,
      }),
    [
      dataConfig.endpoint,
      dataConfig.weather_api_url,
      dataConfig.city_api_url,
      dataConfig.site_name,
      dataConfig.language,
      dataConfig.lang,
      queryParams?.city,
      queryParams?.citySlug,
      queryParams?.nameSlug,
    ]
  );

  const [widgetData, setWidgetData] = useState(ssrData);
  const [cityList, setCityList] = useState(() => (Array.isArray(items) ? items : []));

  useEffect(() => {
    if (ssrData.current) {
      setWidgetData(ssrData);
    }
  }, [ssrData]);

  useEffect(() => {
    let cancelled = false;

    const baseCityList = Array.isArray(items) ? items : [];
    setCityList(baseCityList);

    fetchIndiaCityList().then((result) => {
      if (!cancelled && Array.isArray(result) && result.length) {
        setCityList(mergeCityLists(baseCityList, result));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [items]);

  useEffect(() => {
    let cancelled = false;

    fetchTodaysWeatherInCity(dataConfig, queryParams, siteName, language).then((result) => {
      if (!cancelled && result.current) {
        setWidgetData(result);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [weatherFetchKey, siteName, language, dataConfig, queryParams]);

  const { cityName, current, lastUpdated, aqi = {}, apiCityName = "" } = widgetData;
  const aqiCityName = apiCityName || DEFAULT_WEATHER_CITY;

  if (!current) {
    return null;
  }

  const resolvedCityName = dataConfig.city_name || cityName || "chennai";
  const currentTemp = Number.isNaN(Number(current.tempC))
    ? "--"
    : String(Math.round(Number(current.tempC)));
  const labels = {
    currentTemperatureLevel: getWeatherLabel("current-temperature-level", siteName),
    feelsLike: getWeatherLabel("feels-like", siteName),
    humidity: getWeatherLabel("humidity", siteName),
    poweredBy: getWeatherLabel("powered-by", siteName),
    weatherConditions: getWeatherLabel("weather-conditions", siteName, "வானிலை நிலவரம்"),
    aqi: getWeatherLabel("aqi", siteName, "वायु गुणवत्ता सूचकांक"),
    aqiIs: getWeatherLabel("aqi-is", siteName, "वायु गुणवत्ता सूचकांक है"),
  };

  return (
    <div className={styles.WeatherTopMain_Widget}>
      <div className="container">
        <div className={styles.custom_heading}>
          <h1 className={styles.h2}>{displayTitle}</h1>
        </div>
        <div className={styles.tabLinks_Wrap}>
          <div className={styles.tabLinks}>
            <AppLink href="/aqi" id="openAQI" data-city={aqiCityName}>
              <svg className={styles.aqi_icon}>
                <use href={`${ICONS_SVG}#wind_icon`} />
              </svg>
              AQI
            </AppLink>

            <AppLink href="/weather-forecast" className={styles.active}>
              <svg className={styles.weather_icon}>
                <use href={`${ICONS_SVG}#sun_icon`} />
              </svg>
              வானிலை
            </AppLink>
          </div>
          <SearchDropdown
            items={cityList}
            placeholder={decodeHtml(dataConfig.search_placeholder) || "உங்கள் நகரத்தைத் தேடுங்கள்"}
            inputId="locationSearch"
            inputName="locationSearch"
            inputClassName={styles.locationSearchInput}
            resultsClassName={styles.searchResults}
            getSearchText={(item) =>
              [item?.city_name, item?.[cityLangKey], item?.state_name, item?.country_name]
                .filter(Boolean)
                .join(" ")
            }
            getItemKey={(item) => item?.slug || item?.city_name || ""}
            getItemHref={resolveWeatherSearchHref}
            renderItem={(item) => (
              <>
                <strong>{item?.[cityLangKey] || item?.city_name}</strong>
                <span>{[item?.state_name, item?.country_name].filter(Boolean).join(", ")}</span>
              </>
            )}
          />
        </div>
        <div className={styles.weatherResults_Wrapper}>
          <div className={styles.currentWeather_BG}>
            <WeatherBackgroundImage src={current.backgroundImage || DEFAULT_WEATHER_BG} />
          </div>
          <div className={styles.weatherConditions_Wrapper}>
            <div className={styles.weatherConditions_Header}>
              <h2>
                {resolvedCityName} {labels.weatherConditions}
              </h2>
              <span>{labels.currentTemperatureLevel}</span>
            </div>
            <div className={styles.weatherConditions_Body}>
              <div className={styles.weatherConditions_Body_Left}>
                <div className={styles.weatherConditions_Body_Left__Left}>
                  <WeatherImg
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
                <div className={styles.lineSeperator} />
                <div className={styles.weatherConditions_Body_Left__Right}>
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
              <div className={styles.weatherConditions_Body_Right}>
                <WeatherImg
                  width={130}
                  height={224}
                  src={current.temperatureLevelIcon || `${WEATHER_IMAGE_BASE}/temperature-hot-level.svg`}
                />
              </div>
            </div>
          </div>
          <div className={styles.aqiIndex_Wrapper}>
            <AppLink href="/aqi">
              <div className={styles.aqiIndex_Header}>
                <h2>{labels.aqi}</h2>
                <span className={styles.view_icon}>
                  <svg>
                    <use href={`${ICONS_SVG}#view_icon`} />
                  </svg>
                </span>
              </div>
              <div className={styles.aqiIndex}>
                <div className={styles.aqiIndex_Body}>
                  <div className={styles.aqiCount}>
                    {aqi.aqi ?? "--"} <small>AQI</small>
                  </div>
                  <div className={styles.aqiIndex_Sep} />
                  <div className={styles.pmIndex}>
                    <span>
                      PM2.5 : <strong id="pm25">{aqi.pm25 ?? "--"}</strong>
                    </span>
                    <span>
                      PM10 : <strong id="pm10">{aqi.pm10 ?? "--"}</strong>
                    </span>
                  </div>
                </div>
                <div className={styles.aqiIndex_Footer}>
                  {labels.aqiIs}:{" "}
                  <strong id="air_index">
                    {getWeatherLabel(String(current.uvCondition || ""), siteName, current.uvCondition || "")}
                  </strong>
                </div>
              </div>
            </AppLink>
          </div>
          <div className={styles.lastUpdatedTime} id="lastUpdated">
            {lastUpdated}
          </div>
          <div className={styles.poweredBy}>
            <AppLink href="https://www.aqi.in/" target="_blank" rel="noopener noreferrer">
              <span>{labels.poweredBy}</span>
              <WeatherImg
                width={53}
                height={26}
                src="https://static.tv9hindi.com/images/aqi-brand.png"
              />
            </AppLink>
          </div>
        </div>
      </div>
    </div>
  );
}

WeatherForecastWidget.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  dataConfig: PropTypes.object,
  queryParams: PropTypes.object,
};
