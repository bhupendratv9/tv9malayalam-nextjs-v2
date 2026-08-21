"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import PropTypes from "prop-types";
import { getHref } from "@/lib/helper/commonHelper";
import {
  DEFAULT_WEATHER_SITE,
  WEATHER_API_BASE,
  buildTodaysWeatherInCityWidgetData,
  buildWeatherCityApiUrl,
  buildWeatherCityUrl,
  buildWeatherCityLookup,
  getPopularCityNames,
  resolvePopularCityDisplayName,
  resolveStationLocalizedName,
  resolveWeatherApiPayload,
  resolveWeatherIconSrc,
  resolveCityLocalizedName,
  stationNameToSlug,
} from "@/lib/helper/weatherHelper";
import styles from "./HomepageWeather.module.css";
import { ICONS_SVG } from "@/lib/constants";

const EMPTY_CITY_LABEL_MAP = Object.freeze({});

function parseExtraConfig(extraConfig) {
  if (!extraConfig) return {};
  if (typeof extraConfig === "string") {
    try {
      return JSON.parse(extraConfig);
    } catch {
      return {};
    }
  }
  return extraConfig;
}

function buildCityWeatherApiUrl(dataConfig = {}, citySlug = "") {
  const template = dataConfig.weather_api || dataConfig.weather_api_url || WEATHER_API_BASE;

  if (/\{default_city\}/i.test(template)) {
    return String(template).replace(/\{default_city\}/gi, citySlug);
  }

  if (dataConfig.weather_api || dataConfig.weather_api_url) {
    return buildWeatherCityApiUrl(template, citySlug);
  }

  return buildWeatherCityApiUrl(WEATHER_API_BASE, citySlug);
}

function formatDisplayTemperature(value) {
  const temp = Number(value);
  if (Number.isNaN(temp)) return "--";
  return `${Math.round(temp * 10) / 10}°C`;
}

function formatDisplayHumidity(value) {
  if (value === null || value === undefined || value === "") return "--";
  const humidity = Number(value);
  if (Number.isNaN(humidity)) return "--";
  return `${Math.round(humidity)}%`;
}

function getWeatherRecord(payload) {
  const source = payload?.data && typeof payload.data === "object" ? payload.data : payload;
  if (Array.isArray(source?.weatherdata)) return source.weatherdata[0] || null;
  if (Array.isArray(payload?.weatherdata)) return payload.weatherdata[0] || null;
  return null;
}

function formatEnglishLastUpdated(isoValue) {
  if (!isoValue) return "Last Update: -- (local time)";

  const parsed = new Date(isoValue);
  if (Number.isNaN(parsed.getTime())) return "Last Update: -- (local time)";

  const pad = (num) => String(num).padStart(2, "0");
  const formatted = `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())} ${pad(parsed.getHours())}:${pad(parsed.getMinutes())}`;

  return `Last Update: ${formatted} (local time)`;
}

function buildMainWeatherWidgetData(payload, siteName) {
  const resolvedPayload = resolveWeatherApiPayload(payload);
  const widgetData = buildTodaysWeatherInCityWidgetData(resolvedPayload, siteName, "en");
  const weatherRecord = getWeatherRecord(resolvedPayload);
  const weatherSource = getWeatherPayload(resolvedPayload);
  const lastUpdatedAt = weatherSource.lastupdated || weatherRecord?.last_updatedat;

  return {
    ...widgetData,
    lastUpdated: formatEnglishLastUpdated(lastUpdatedAt),
    current: widgetData.current
      ? {
          ...widgetData.current,
          condition: weatherRecord?.condition_text || widgetData.current.condition,
        }
      : widgetData.current,
  };
}

async function fetchCityWeatherSummary(
  citySlug,
  dataConfig,
  siteName,
  cityLanguage,
  fallbackName = "",
  englishCondition = false
) {
  const url = buildCityWeatherApiUrl(dataConfig, citySlug);
  if (!url) return null;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const json = await response.json();
    const weatherSource = getWeatherPayload(json);
    const widgetData = buildTodaysWeatherInCityWidgetData(json, siteName, cityLanguage);
    const weatherRecord = getWeatherRecord(json);
    if (!widgetData.current || !weatherRecord) return null;

    return {
      slug: citySlug,
      name: resolveApiCityDisplayName(weatherSource, cityLanguage, fallbackName),
      tempC: weatherRecord.temp_c,
      temp: formatDisplayTemperature(weatherRecord.temp_c),
      humidity: formatDisplayHumidity(weatherRecord.humidity),
      condition: englishCondition
        ? weatherRecord.condition_text || widgetData.current.condition
        : widgetData.current.condition,
      weatherIcon: widgetData.current.conditionIcon,
      ...(englishCondition
        ? {
            lastUpdated: formatEnglishLastUpdated(
              weatherSource.lastupdated || weatherRecord.last_updatedat
            ),
          }
        : {}),
    };
  } catch {
    return null;
  }
}

function resolveCityHref(cityValue) {
  return getHref(buildWeatherCityUrl(cityValue));
}

function resolveConfigCities(dataConfig = {}) {
  const extraConfig = parseExtraConfig(dataConfig.extra_config);
  const cityList =
    extraConfig.POPULAR_CITY_NAMES ||
    extraConfig.popularCityNames ||
    extraConfig.popular_city_names ||
    dataConfig.POPULAR_CITY_NAMES ||
    dataConfig.popularCityNames ||
    dataConfig.city_names;
  if (Array.isArray(cityList)) return cityList;

  if (typeof cityList === "string") {
    try {
      const parsed = JSON.parse(cityList);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return cityList
        .split(",")
        .map((city) => city.trim())
        .filter(Boolean);
    }
  }

  return [];
}

function resolveCityLanguage(dataConfig = {}, extraConfig = {}) {
  return (
    dataConfig.language ||
    dataConfig.lang ||
    dataConfig.city_display_language ||
    dataConfig.cityDisplayLanguage ||
    extraConfig.language ||
    extraConfig.lang ||
    extraConfig.city_display_language ||
    extraConfig.cityDisplayLanguage ||
    dataConfig.city_language ||
    dataConfig.cityLanguage ||
    extraConfig.city_language ||
    extraConfig.cityLanguage ||
    "en"
  );
}

function getCityLabelMap(extraConfig = {}, cityLanguage = "en") {
  const languageKey = `city_names_${cityLanguage}`;
  return extraConfig[languageKey] || extraConfig.city_labels || EMPTY_CITY_LABEL_MAP;
}

function buildWeatherFetchConfig(dataConfig = {}) {
  return {
    weather_api: dataConfig.weather_api,
    weather_api_url: dataConfig.weather_api_url,
  };
}

function resolveApiCityDisplayName(source = {}, cityLanguage = "en", fallback = "") {
  const lang = String(cityLanguage || "en").trim().toLowerCase();

  if (lang === "en") {
    return source.city_name || source.city_en || fallback;
  }

  return resolveCityLocalizedName(source, lang) || fallback || source.city_name || "";
}

function getWeatherPayload(payload) {
  if (payload?.data && typeof payload.data === "object") return payload.data;
  return payload || {};
}

function resolveCityDisplayName(city, cityLanguage = "en", labelMap = {}, apiLookup = null) {
  if (typeof city === "object" && city !== null) {
    return (
      resolveStationLocalizedName(city, cityLanguage) ||
      resolveCityLocalizedName(city, cityLanguage) ||
      city.name ||
      city.city ||
      ""
    );
  }

  const englishName = String(city).trim();
  const slug = stationNameToSlug(englishName);
  const mapped =
    labelMap[englishName] ||
    labelMap[slug] ||
    labelMap[englishName.toLowerCase()];

  if (typeof mapped === "string") return mapped;
  if (mapped && typeof mapped === "object") {
    return mapped[cityLanguage] || mapped.name || englishName;
  }

  const apiRecord = apiLookup?.get(englishName.toLowerCase()) || null;
  return resolvePopularCityDisplayName(englishName, cityLanguage, apiRecord) || englishName;
}

function buildPopularCityOptions(
  popularCityNames = [],
  cityLanguage = "en",
  labelMap = {},
  apiLookup = null
) {
  if (!Array.isArray(popularCityNames) || !popularCityNames.length) {
    return [];
  }

  return popularCityNames
    .map((city) => {
      if (typeof city === "string") {
        const slug = stationNameToSlug(city);
        const name = resolveCityDisplayName(city, cityLanguage, labelMap, apiLookup);
        return {
          name,
          slug,
          url: resolveCityHref(city),
        };
      }

      const slug = stationNameToSlug(city?.slug || city?.name || city?.city || "");
      const name = resolveCityDisplayName(city, cityLanguage, labelMap, apiLookup);

      return {
        name,
        slug,
        url: getHref(city?.url || buildWeatherCityUrl(slug)),
      };
    })
    .filter((city) => city.name && city.slug && city.url);
}

function HomepageWeather({ dataConfig = {}, data = null, items = [] }) {
  const extraConfigSource = dataConfig.extra_config;
  const extraConfigKey =
    typeof extraConfigSource === "string"
      ? extraConfigSource
      : JSON.stringify(extraConfigSource || {});

  const extraConfig = useMemo(
    () => parseExtraConfig(extraConfigSource),
    [extraConfigKey]
  );
  const weatherForecastNavTitle = dataConfig.weather_forecast_nav_title || "Weather Forecast";
  const aqiNavTitle = dataConfig.aqi_nav_title || "Air Quality Index";
  const h2Title = dataConfig.h2_title || "Weather Forecast";
  const pTitle = dataConfig.p_title || "Weather Forecast";
  const siteName = dataConfig.site_name || dataConfig.site || DEFAULT_WEATHER_SITE;
  const cityLanguage = resolveCityLanguage(dataConfig, extraConfig);
  const cityLabelMap = useMemo(
    () => getCityLabelMap(extraConfig, cityLanguage),
    [extraConfig, cityLanguage]
  );
  const popularCityNames = useMemo(() => {
    const configured = resolveConfigCities(dataConfig);
    if (configured.length) return configured;
    const site = dataConfig.site_name || dataConfig.site || DEFAULT_WEATHER_SITE;
    return getPopularCityNames(site);
  }, [
    dataConfig.extra_config,
    dataConfig.POPULAR_CITY_NAMES,
    dataConfig.popularCityNames,
    dataConfig.city_names,
    dataConfig.site_name,
    dataConfig.site,
  ]);
  const cityApiLookup = useMemo(
    () => buildWeatherCityLookup(items?.length ? items : data),
    [items, data]
  );
  const popularCities = useMemo(
    () => buildPopularCityOptions(popularCityNames, cityLanguage, cityLabelMap, cityApiLookup),
    [popularCityNames, cityLanguage, cityLabelMap, cityApiLookup]
  );
  const weatherApi =
    dataConfig.weather_api || dataConfig.weather_api_url || WEATHER_API_BASE;
  const weatherFetchConfig = useMemo(
    () => buildWeatherFetchConfig(dataConfig),
    [weatherApi]
  );
  const weatherSource = data?.data || data || {};
  const defaultCitySlug = stationNameToSlug(
    dataConfig.default_city || extraConfig.default_city || popularCities[0]?.slug || ""
  );
  const sidebarCardCities = useMemo(
    () =>
      popularCities
        .filter((city) => city.slug !== defaultCitySlug)
        .slice(0, 3),
    [popularCities, defaultCitySlug]
  );
  const sidebarCardCityKey = useMemo(
    () => sidebarCardCities.map((city) => city.slug).join("|"),
    [sidebarCardCities]
  );
  const sidebarCardCitiesRef = useRef(sidebarCardCities);
  sidebarCardCitiesRef.current = sidebarCardCities;
  const selectedCity =
    popularCities.find((city) => city.slug === defaultCitySlug) || popularCities[0];
  const defaultCityDisplay =
    resolveApiCityDisplayName(weatherSource, cityLanguage, "") ||
    selectedCity?.name ||
    resolveCityDisplayName(
      dataConfig.default_city || extraConfig.default_city || "",
      cityLanguage,
      cityLabelMap,
      cityApiLookup
    );
  const selectedCitySlug = selectedCity?.slug || "";
  const mainCityFallbackName = selectedCity?.name || defaultCitySlug;

  const ssrMainWeather = useMemo(
    () => buildMainWeatherWidgetData(data, siteName),
    [data, siteName]
  );

  const [mainWeather, setMainWeather] = useState(ssrMainWeather);
  const [cityWeatherCards, setCityWeatherCards] = useState([]);

  useEffect(() => {
    setMainWeather(ssrMainWeather);
  }, [ssrMainWeather]);

  const hasSsrCurrentWeather = Boolean(ssrMainWeather.current);

  useEffect(() => {
    if (!defaultCitySlug || hasSsrCurrentWeather) return undefined;

    let cancelled = false;

    fetchCityWeatherSummary(
      defaultCitySlug,
      weatherFetchConfig,
      siteName,
      cityLanguage,
      mainCityFallbackName,
      true
    ).then(
      (result) => {
        if (cancelled || !result) return;
        setMainWeather({
          current: {
            tempC: result.tempC,
            temp: result.temp,
            condition: result.condition,
            conditionIcon: result.weatherIcon,
            humidity: result.humidity,
          },
          lastUpdated: result.lastUpdated,
        });
      }
    );

    return () => {
      cancelled = true;
    };
  }, [
    defaultCitySlug,
    hasSsrCurrentWeather,
    weatherApi,
    siteName,
    cityLanguage,
    mainCityFallbackName,
  ]);

  useEffect(() => {
    if (!sidebarCardCityKey) {
      setCityWeatherCards([]);
      return undefined;
    }

    let cancelled = false;
    const cities = sidebarCardCitiesRef.current;

    Promise.all(
      cities.map(async (city) => {
        const summary = await fetchCityWeatherSummary(
          city.slug,
          weatherFetchConfig,
          siteName,
          cityLanguage,
          city.name
        );

        if (!summary) {
          return {
            slug: city.slug,
            name: city.name,
            url: city.url,
            temp: "--",
            condition: "",
            weatherIcon: resolveWeatherIconSrc("1"),
            humidity: "--",
          };
        }

        return {
          ...summary,
          name: summary.name || city.name,
          url: city.url,
        };
      })
    ).then((cards) => {
      if (!cancelled) {
        setCityWeatherCards(cards);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [sidebarCardCityKey, weatherApi, siteName, cityLanguage]);

  const currentWeather = mainWeather?.current;
  const mainTempRaw =
    currentWeather?.tempC !== null && currentWeather?.tempC !== undefined
      ? Number(currentWeather.tempC)
      : Number(String(currentWeather?.temp || "").replace("°C", ""));
  const mainTempValue = Number.isNaN(mainTempRaw)
    ? "--"
    : String(Math.round(mainTempRaw));
  const mainHumidity = currentWeather?.humidity || "--";
  const mainCondition = currentWeather?.condition || "";
  const mainWeatherIcon = currentWeather?.conditionIcon || resolveWeatherIconSrc("1");
  const lastUpdatedText =
    mainWeather?.lastUpdated || "Last Update: -- (local time)";
  const handleCityChange = (event) => {
    const city = popularCities.find((item) => item.slug === event.target.value);
    if (city?.url) {
      globalThis.location.href = city.url;
    }
  };
  return (
    <>
      <div className={styles.widget_tab_links}>
        <div className={styles.tabLinks}>
          <AppLink href={getHref("/weather-forecast")} className={styles.active}>
            <svg className={styles.weather_icon}>
              <use href={`${ICONS_SVG}#sun_icon`}></use>
            </svg>
            {weatherForecastNavTitle}
          </AppLink>
          <AppLink href={getHref("/aqi")}>
            <svg className={styles.aqi_icon}>
              <use href={`${ICONS_SVG}#wind_icon`}></use>
            </svg>
            {aqiNavTitle}
          </AppLink>
        </div>
      </div>
      <div className={styles.weather_WidgetWrap}>
        <div className={styles.weather_resultCard}>
          <div className={styles.weather_Header}>
            <div className={styles.city_name}>
              <div className={styles.cityWeather}>
                <AppLink href={getHref(buildWeatherCityUrl(defaultCitySlug))}>
                  <h2>{defaultCityDisplay}{h2Title}</h2>
                </AppLink>
              </div>
              <p>{pTitle}</p>
            </div>
            {popularCities.length > 0 ? (
              <div className={styles.select_city}>
                <select
                  name="citylist"
                  id="citylist"
                  className={styles.dropdown}
                  value={selectedCitySlug}
                  onChange={handleCityChange}
                  aria-label="city list"
                >
                  {popularCities.map((city) => (
                    <option key={city.slug} value={city.slug}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
          </div>
          <div className={styles.weatherDetailWrap}>
            <div className={styles.weatherMain}>
              <div className={styles.icon}>
                <Image
                  height={50}
                  width={50}
                  src={mainWeatherIcon}
                  alt={mainCondition || "Weather"}
                  unoptimized
                />
              </div>
              <div className={styles.temp}>
                <h2>
                  {mainTempValue}
                  {mainTempValue === "--" ? null : <sup>°C</sup>}
                </h2>
                <span className={styles.status}>{mainCondition}</span>
                <div className={styles.details} style={{ display: "none" }}>
                  <p>
                    <svg>
                      <use href={`${ICONS_SVG}#drop_icon`}></use>
                    </svg>
                    {mainHumidity}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.weatherCards}>
              {cityWeatherCards.map((city) => (
                <div className={styles.citiescard} key={city.slug}>
                  <AppLink href={city.url}>
                    <div className={styles.cardHead}>
                      <div className={styles.h4}>{city.name}</div>
                      <span className={styles.view_icon}>
                        <svg>
                          <use href={`${ICONS_SVG}#viewIcon`}></use>
                        </svg>
                      </span>
                    </div>
                    <div className={styles.weatherInfo}>
                      <Image
                        height={38}
                        width={38}
                        src={city.weatherIcon}
                        alt={city.condition || city.name}
                        unoptimized
                      />
                      <div className={styles.details}>
                        <span
                          style={{ display: "none" }}
                          className={styles.status}
                        >
                          {city.condition}
                        </span>
                        <p>
                          <svg>
                            <use href={`${ICONS_SVG}#temp_icon`}></use>
                          </svg>
                          {city.temp}
                        </p>
                        <p>
                          <svg>
                            <use href={`${ICONS_SVG}#drop_icon`}></use>
                          </svg>
                          {city.humidity}
                        </p>
                      </div>
                    </div>
                  </AppLink>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.lastUpdatedTime}>{lastUpdatedText}</div>
        </div>
      </div>
    </>
  );
}

HomepageWeather.propTypes = {
  dataConfig: PropTypes.object,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  items: PropTypes.array,
};

export default HomepageWeather;
