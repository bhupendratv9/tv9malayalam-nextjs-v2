"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./WeatherForecast.module.css";
import PropTypes from "prop-types";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import SearchDropdown from "@/components/pb/SearchDropdown";
import { decodeHtml, getHref } from "@/lib/helper/commonHelper";
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
const DEFAULT_WEATHER_BG = `${WEATHER_IMAGE_BASE}/Mist.jpg`;
const FALLBACK_WEATHER_BG = `${WEATHER_IMAGE_BASE}/Sunny.jpg`;

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

export default function TodaysWeatherInCityWidget({
  title = "",
  items = [],
  data = null,
  dataConfig = {},
  queryParams = {},
}) {
  const weatherHref = `/weather-forecast`;
  const siteName = dataConfig.site_name || DEFAULT_WEATHER_SITE;
  const language = dataConfig.language || dataConfig.lang || "en";
  const cityLangKey = `city_${language}`;

  const ssrData = useMemo(
    () =>
      buildTodaysWeatherInCityWidgetData(
        resolveWeatherApiPayload(data),
        siteName,
        language
      ),
    [data, siteName, language]
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

  const { cityName, current, hourlySlides, lastUpdated } = widgetData;

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
    <div className={styles.WeatherTopMain_Widget}>
      <div className="container">
        <div className={styles.custom_heading} />
        <div className={styles.tabLinks_Wrap}>
          <div className={styles.tabLinks}>
            <AppLink href={getHref("/aqi")} id="openAQI" data-city="New delhi">
              <svg className={styles.aqi_icon}>
                <use href={`${ICONS_SVG}#wind_icon`} />
              </svg>
              AQI
            </AppLink>

            <AppLink href={weatherHref} className={styles.active} aria-current="page">
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
              <h1 className={styles.h2}>{heading}</h1>
              <span>{labels.currentTemperatureLevel}</span>
            </div>
            <div className={styles.weatherConditions_Body}>
              <div className={styles.weatherConditions_Body_Left}>
                <div className={styles.weatherConditions_Body_Left__Left}>
                  <WeatherImg width={50} height={50} src={current.conditionIcon} />
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
          <div className={styles.weatherHourly_Update}>
            <div className={styles.weatherHourly_Update_Header}>
              <h2>{labels.hourlyUpdate}</h2>
            </div>
            <div className={styles.weatherHourly_Update_Wrap}>
              <div className={styles.weatherHourly_Update_Body}>
                <Splide
                  hasTrack={false}
                  options={{
                    perPage: 6,
                    gap: "10px",
                    pagination: false,
                    perMove: 1,
                  }}
                  className={styles.hourlyForecastSlider}
                >
                  <SplideTrack>
                    {hourlySlides.map((slide) => (
                      <SplideSlide key={slide.key}>
                        <div className={styles.splideCard}>
                          <span>{slide.time}</span>
                          <Image
                            width={24}
                            height={24}
                            src={slide.icon}
                            alt=""
                          />
                          <strong>{slide.temp}</strong>
                        </div>
                      </SplideSlide>
                    ))}
                  </SplideTrack>
                </Splide>
              </div>
            </div>
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

TodaysWeatherInCityWidget.propTypes = {
  title: PropTypes.string,
  dataConfig: PropTypes.object,
  items: PropTypes.array,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  queryParams: PropTypes.object,
};
