"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import styles from "./CityWeatherCondition.module.css";
import PropTypes from "prop-types";
import { decodeHtml } from "@/lib/helper/commonHelper";
import {
  DEFAULT_WEATHER_SITE,
  WEATHER_ICON_BASE,
  buildCityWeatherConditionWidgetData,
  fetchCityWeatherCondition,
  getPressureThumbPercent,
  getUvBarState,
  getWeatherLabel,
  resolveWeatherApiPayload,
  resolveWeatherIconSrc,
} from "@/lib/helper/weatherHelper";
import { ICONS_SVG } from "@/lib/constants";

const ICONS = {
  windMill: `${WEATHER_ICON_BASE}/wind-mill.svg`,
  blowingSnow: `${WEATHER_ICON_BASE}/weather-blowing-snow.svg`,
  gustSpeed: `${WEATHER_ICON_BASE}/gust-speed.svg`,
  clouds: `${WEATHER_ICON_BASE}/clouds.svg`,
  rain: `${WEATHER_ICON_BASE}/rain.svg`,
  pressure: `${WEATHER_ICON_BASE}/pressure-guage.svg`,
  sun: `${WEATHER_ICON_BASE}/sun.svg`,
};

function WeatherImg({ src, width, height, className = "" }) {
  const resolvedSrc = src?.startsWith("http")
    ? src
    : resolveWeatherIconSrc(src);
  return (
    <Image
      src={resolvedSrc}
      width={width}
      height={height}
      alt=""
      className={className}
    />
  );
}

WeatherImg.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  className: PropTypes.string,
};

function DirectionIcon({ degree = 0 }) {
  return (
    <svg
      className={styles.direction_icon}
      width={23}
      height={21}
      style={{ transform: `rotate(${Number(degree) || 0}deg)` }}
    >
      <use href={`${ICONS_SVG}#direction_icon`}></use>
    </svg>
  );
}

DirectionIcon.propTypes = {
  degree: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

function getPressureStatusLabel(pressure) {
  const value = Number(pressure);
  if (Number.isNaN(value)) return "";
  if (value >= 1000 && value <= 1015) return "Normal";
  if (value < 1000) return "Low";
  return "High";
}

function getPressureThumbBorderColor(pressure) {
  const percent = getPressureThumbPercent(pressure);
  if (percent <= 20) return "#4caf50";
  if (percent <= 40) return "#ffc107";
  if (percent <= 50) return "#ff9800";
  if (percent <= 70) return "#e91e63";
  if (percent <= 85) return "#9c27b0";
  return "#f44336";
}

function PressureBar({ pressure }) {
  const thumbPercent = getPressureThumbPercent(pressure);
  const thumbBorderColor = getPressureThumbBorderColor(pressure);
  return (
    <div className={styles.progress_wrapper}>
      <div className={styles.progress_bar}>
        <div
          className={styles.thumb}
          style={{ left: `${thumbPercent}%`, borderColor: thumbBorderColor }}
        />
      </div>
    </div>
  );
}

PressureBar.propTypes = {
  pressure: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

function UvBar({ uvIndex, uvLabel }) {
  const { leftPercent, thumbColor } = getUvBarState(uvIndex);
  return (
    <div className={styles.uvBar}>
      <div className={styles.uvLabel}>{uvLabel}</div>
      <div
        className={styles.uvThumb}
        style={{ left: `${leftPercent}%`, backgroundColor: thumbColor }}
      />
    </div>
  );
}

UvBar.propTypes = {
  uvIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  uvLabel: PropTypes.string,
};

export default function CityWeatherConditionWidget({
  title = "",
  items = [],
  data = null,
  dataConfig = {},
  queryParams = {},
}) {
  const siteName = dataConfig.site_name || DEFAULT_WEATHER_SITE;
  const language = dataConfig.language || "en";
  const ssrData = useMemo(
    () =>
      buildCityWeatherConditionWidgetData(
        resolveWeatherApiPayload(data, items),
        siteName,
        language,
      ),
    [data, items, language, siteName],
  );

  const weatherFetchKey = useMemo(
    () =>
      JSON.stringify({
        endpoint: dataConfig.endpoint,
        weather_api_url: dataConfig.weather_api_url,
        site_name: dataConfig.site_name,
        language: dataConfig.language,
        city: queryParams?.city,
        citySlug: queryParams?.citySlug,
        nameSlug: queryParams?.nameSlug,
      }),
    [
      dataConfig.endpoint,
      dataConfig.weather_api_url,
      dataConfig.site_name,
      dataConfig.language,
      queryParams?.city,
      queryParams?.citySlug,
      queryParams?.nameSlug,
    ],
  );

  const [widgetData, setWidgetData] = useState(ssrData);

  useEffect(() => {
    if (ssrData.conditions) {
      setWidgetData(ssrData);
    }
  }, [ssrData]);

  useEffect(() => {
    if (ssrData.conditions) return;

    let cancelled = false;

    fetchCityWeatherCondition(dataConfig, queryParams, siteName, language).then(
      (result) => {
        if (!cancelled && result.conditions) {
          setWidgetData(result);
        }
      },
    );

    return () => {
      cancelled = true;
    };
  }, [weatherFetchKey, language, siteName, ssrData.conditions, dataConfig, queryParams]);

  const { cityName, conditions } = widgetData;

  if (!conditions) {
    return null;
  }

  const resolvedCityName = dataConfig.city_name || cityName || "नई दिल्ली";
  const customTitle = decodeHtml(dataConfig.title || title);
  const heading =
    (customTitle
      ? `${resolvedCityName} ${customTitle}`
      : "") ||
    `${resolvedCityName} ${getWeatherLabel("weather-conditions-detail", siteName)}`;

  const labels = {
    windSpeed: getWeatherLabel("wind-speed", siteName),
    gustSpeed: getWeatherLabel("gust-speed", siteName),
    direction: getWeatherLabel("direction", siteName),
    cloudCover: getWeatherLabel("cloud-cover", siteName),
    visibility: getWeatherLabel("visibility", siteName),
    precipitation: getWeatherLabel("precipitation", siteName),
    pressure: getWeatherLabel("pressure", siteName),
    uvIndex: getWeatherLabel("uv-index", siteName),
  };

  return (
    <div className={styles.weatherParameters_Wrapper}>
      <div className="container">
        <div className={styles.custom_heading}>
          <h2 className={styles.h2}>{heading}</h2>
        </div>
        <div className={styles.weatherParameters}>
          <div className={styles.weatherParameter_Left}>
            <div className={styles.weatherParameter_Card}>
              <div className={styles.weatherParameter_Card__Top}>
                <WeatherImg src={ICONS.windMill} width={120} height={120} />
                <div className={styles.cardInfo}>
                  <div className={styles.cardInfo__Left}>
                    <p>{labels.windSpeed}</p>
                    <span>
                      <strong>{conditions.windSpeed}</strong> Km/H
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.lineSeperator_Horizontal} />
              <div className={styles.weatherParameter_Card__Bottom}>
                <div className={styles.cardInfo}>
                  <div className={styles.cardInfo__Left}>
                    <p>{labels.gustSpeed}</p>
                    <div className={styles.flexAlign_Center}>
                      <WeatherImg
                        src={ICONS.blowingSnow}
                        width={24}
                        height={24}
                      />
                      <WeatherImg
                        src={ICONS.gustSpeed}
                        width={18}
                        height={18}
                      />
                    </div>
                    <span>
                      <strong>{conditions.gustSpeed}</strong> Km/H
                    </span>
                  </div>
                  <div className={styles.lineSeperator_Vertical} />
                  <div className={styles.cardInfo__Right}>
                    <p>{labels.direction}</p>
                    <div className={styles.flexAlign_Center}>
                      <DirectionIcon degree={conditions.windDegree} />
                    </div>
                    <span>
                      <strong>{conditions.windDegree}°</strong>
                      {conditions.windDir}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.weatherParameter_Card__Footer}>
                {conditions.windDescription}
              </div>
            </div>
          </div>

          <div className={styles.weatherParameter_Mid}>
            <div className={styles.weatherParameter_Card}>
              <div className={styles.weatherParameter_Card__Top}>
                <WeatherImg src={ICONS.clouds} width={80} height={80} />
              </div>
              <div className={styles.weatherParameter_Card__Bottom}>
                <div className={styles.cardInfo}>
                  <div className={styles.cardInfo__Left}>
                    <p>{labels.cloudCover}</p>
                    <span>
                      <strong>{conditions.cloudCover}</strong>
                    </span>
                  </div>
                  <div className={styles.lineSeperator_Vertical} />
                  <div className={styles.cardInfo__Right}>
                    <p>{labels.visibility}</p>
                    <span>
                      <strong>{conditions.visibility}</strong> Km
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.weatherParameter_Card__Footer}>
                {conditions.cloudDescription}
              </div>
            </div>

            <div className={styles.weatherParameter_Card}>
              <div className={styles.weatherParameter_Card__Header}>
                <p>{labels.precipitation}</p>
              </div>
              <div className={styles.weatherParameter_Card__Body}>
                <div className={styles.cardInfo}>
                  <div className={styles.cardInfo__Left}>
                    <WeatherImg src={ICONS.rain} width={80} height={80} />
                  </div>
                  <div className={styles.cardInfo__Right}>
                    <span>
                      <strong>{conditions.precipitation}</strong> mm
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.weatherParameter_Card__Footer}>
                {conditions.precipitationDescription}
              </div>
            </div>
          </div>

          <div className={styles.weatherParameter_Right}>
            <div className={styles.weatherParameter_Card}>
              <div className={styles.weatherParameter_Card__Header}>
                <p>{labels.pressure}</p>
              </div>
              <div className={styles.weatherParameter_Card__Body}>
                <div className={styles.cardInfo}>
                  <div className={styles.cardInfo__Left}>
                    <WeatherImg src={ICONS.pressure} width={80} height={80} />
                  </div>
                  <div className={styles.lineSeperator_Vertical} />
                  <div className={styles.cardInfo__Right}>
                    <span>
                      <strong>{conditions.pressure}</strong> mb
                    </span>
                    {getPressureStatusLabel(conditions.pressure) ? (
                      <span className="textBtn">
                        {getPressureStatusLabel(conditions.pressure)}
                      </span>
                    ) : null}
                  </div>
                </div>
                <PressureBar pressure={conditions.pressure} />
              </div>
              <div className={styles.weatherParameter_Card__Footer}>
                {conditions.pressureDescription}
              </div>
            </div>

            <div className={styles.weatherParameter_Card}>
              <div className={styles.weatherParameter_Card__Header}>
                <p>{labels.uvIndex}</p>
              </div>
              <div className={styles.weatherParameter_Card__Body}>
                <div className={styles.cardInfo}>
                  <div className={styles.cardInfo__Left}>
                    <WeatherImg src={ICONS.sun} width={80} height={80} />
                  </div>
                  <div className={styles.lineSeperator_Vertical} />
                  <div className={styles.cardInfo__Right}>
                    <p>{labels.uvIndex}</p>
                    <span>
                      <strong>{conditions.uvIndex}</strong>
                    </span>
                  </div>
                </div>
                <UvBar
                  uvIndex={conditions.uvIndex}
                  uvLabel={conditions.uvCondition}
                />
              </div>
              <div className={styles.weatherParameter_Card__Footer}>
                {conditions.uvDescription}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CityWeatherConditionWidget.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  dataConfig: PropTypes.object,
  queryParams: PropTypes.object,
};
