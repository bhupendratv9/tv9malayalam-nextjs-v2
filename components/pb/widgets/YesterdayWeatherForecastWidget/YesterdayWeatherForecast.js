"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { decodeHtml } from "@/lib/helper/commonHelper";
import Image from "next/image";
import styles from "./YesterdayWeatherForecast.module.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import {
  DEFAULT_WEATHER_SITE,
  WEATHER_ICON_BASE,
  buildDayWiseForecastWidgetData,
  fetchWeatherDayWiseForecast,
  getWeatherLabel,
  resolveWeatherApiPayload,
  resolveWeatherIconSrc,
} from "@/lib/helper/weatherHelper";

const UI_ICONS = {
  temperature: `${WEATHER_ICON_BASE}/temperature-sensor.svg`,
  humidity: `${WEATHER_ICON_BASE}/humidity-sensor.svg`,
  precipitation: `${WEATHER_ICON_BASE}/icon-precipitation.svg`,
  sunrise: `${WEATHER_ICON_BASE}/icon-sunrise.svg`,
  sunset: `${WEATHER_ICON_BASE}/icon-sunset.svg`,
  uv: `${WEATHER_ICON_BASE}/uv.svg`,
  wind: `${WEATHER_ICON_BASE}/wind.svg`,
};

function resolveIconSrc(icon) {
  if (!icon) return resolveWeatherIconSrc("1.svg");
  if (String(icon).startsWith("http")) return icon;
  return resolveWeatherIconSrc(icon);
}

function WeatherIcon({ src, width, height, alt = "" }) {
  return (
    <Image
      width={width}
      height={height}
      src={resolveIconSrc(src)}
      alt={alt}
    />
  );
}

WeatherIcon.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  alt: PropTypes.string,
};

function drawArcProgress(canvas, percent, thickness = 2) {
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height;
  const radius = canvas.width / 2 - thickness / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const startAngle = Math.PI;
  const endAngle = Math.PI * (1 + percent / 100);

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI);
  ctx.strokeStyle = "#FBF4F4";
  ctx.lineWidth = thickness;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.strokeStyle = "#FE8838";
  ctx.lineWidth = thickness;
  ctx.stroke();
}

function ArcProgressCanvas({ percent }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawArcProgress(canvasRef.current, percent);
    }
  }, [percent]);

  return <canvas ref={canvasRef} width={100} height={50} />;
}

ArcProgressCanvas.propTypes = {
  percent: PropTypes.number.isRequired,
};

function ForecastCard({ day, isActive, onSelect }) {
  return (
    <button
      type="button"
      className={[styles.forecastCard, isActive && styles.active].filter(Boolean).join(" ")}
      onClick={onSelect}
    >
      <div className={styles.forecastCard__Header}>
        <div className={styles.forecastCard__Header__Day}>{day.dayLabel}</div>
      </div>
      <div className={styles.forecastCard__Body}>
        <div className={styles.forecastCard__Body__Icon}>
          <WeatherIcon src={day.icon} width={40} height={40} alt="" />
        </div>
        <div className={styles.forecastCard__Body__Temp}>
          <div className={styles.forecastCard__Body__Temp__Value}>
            <WeatherIcon src={UI_ICONS.temperature} width={28} height={28} alt="" />
            {day.temp}
          </div>
          <div className={styles.forecastCard__Body__Temp__Value}>
            <WeatherIcon src={UI_ICONS.humidity} width={28} height={28} alt="" />
            {day.humidity}
          </div>
        </div>
      </div>
    </button>
  );
}

ForecastCard.propTypes = {
  day: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function resolveDayDetailLabels(siteName = DEFAULT_WEATHER_SITE) {
  return {
    humidity: getWeatherLabel("humi", siteName),
    precipitation: getWeatherLabel("perc", siteName),
    sunrise: getWeatherLabel("sunrise", siteName),
    sunset: getWeatherLabel("sunset", siteName),
  };
}

function DayDetailPanel({ day, isVisible, siteName = DEFAULT_WEATHER_SITE }) {
  const labels = useMemo(() => resolveDayDetailLabels(siteName), [siteName]);

  return (
    <div className={[styles.weatherForecastDayWise__Detail,!isVisible && styles.hide,]
    .filter(Boolean)
    .join(" ")}
    >
      <div className={styles.date}>
        <span>{day.dayLabel}</span>
        <strong>
          {day.dateDay} <span>{day.dateMonth}</span>
        </strong>
      </div>
      <div className={styles.lineSeperator_Vertical} />
      <div className={styles.weatherCondition}>
        <WeatherIcon src={day.icon} width={40} height={40} alt="" />
        <div className={styles.weatherCondition__Text}>
          <p>{day.condition}</p>
          <span>{day.conditionNote}</span>
        </div>
      </div>
      <div className={styles.lineSeperator_Vertical} />
      <div className={styles.weatherInfo}>
        <div className={styles.weatherInfo__Value}>
          <WeatherIcon src={UI_ICONS.temperature} width={28} height={28} alt="" />
          <div className={styles.weatherInfo__Value__Text}>
            <p>{day.highLow}</p>
          </div>
        </div>
        <div className={styles.weatherInfo__Value}>
          <WeatherIcon src={UI_ICONS.humidity} width={28} height={28} alt="" />
          <div className={styles.weatherInfo__Value__Text}>
            <p>
              {labels.humidity} {day.humidityDetail}
            </p>
          </div>
        </div>
        <div className={styles.weatherInfo__Value}>
          <WeatherIcon src={UI_ICONS.precipitation} width={28} height={28} alt="" />
          <div className={styles.weatherInfo__Value__Text}>
            <p>
              {labels.precipitation} {day.precipitation}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.lineSeperator_Vertical} />
      <div className={styles.twilight}>
        <div className={styles.twilightValue}>
          <WeatherIcon src={UI_ICONS.sunrise} width={20} height={20} alt="" />
          <div className={styles.twilightValue__Text}>
            <span>{labels.sunrise}</span>
            <strong>{day.sunrise}</strong>
          </div>
        </div>
        <div className={styles.arcProgress}>
          <ArcProgressCanvas percent={day.arcPercent} />
          <div className={styles.arcLabel}>{day.daylightLabel}</div>
        </div>
        <div className={styles.twilightValue}>
          <WeatherIcon src={UI_ICONS.sunset} width={20} height={20} alt="" />
          <div className={styles.twilightValue__Text}>
            <span>{labels.sunset}</span>
            <strong>{day.sunset}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

DayDetailPanel.propTypes = {
  day: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
  siteName: PropTypes.string,
};

function resolveHourlyTableLabels(dataConfig = {}, siteName = DEFAULT_WEATHER_SITE) {
  return {
    time: decodeHtml(dataConfig.time_text) || getWeatherLabel("time", siteName),
    weatherCondition:
      decodeHtml(dataConfig.weather_condition_text) || getWeatherLabel("weather-condition", siteName),
    temperature: decodeHtml(dataConfig.temperature_text) || getWeatherLabel("temperature", siteName),
    humidity: decodeHtml(dataConfig.humidity_text) || getWeatherLabel("humidity", siteName),
    uvIndex: decodeHtml(dataConfig.uvIndex_text) || getWeatherLabel("uv", siteName),
    windSpeedDirection:
      decodeHtml(dataConfig.wind_speed_direction_text) || getWeatherLabel("wind-speed-dir", siteName),
  };
}

function HourlyForecastTable({ days, activeDayIndex, dataConfig = {}, siteName = DEFAULT_WEATHER_SITE }) {
  const headers = useMemo(
    () => resolveHourlyTableLabels(dataConfig, siteName),
    [dataConfig, siteName]
  );

  return (
    <div className={styles.weatherForecastDayWise__Table}>
      <table>
        <thead>
          <tr>
            <th>{headers.time}</th>
            <th>{headers.weatherCondition}</th>
            <th>
              <WeatherIcon src={UI_ICONS.temperature} width={15} height={15} alt="" />
              {headers.temperature}
            </th>
            <th>{headers.humidity}</th>
            <th>
              <WeatherIcon src={UI_ICONS.uv} width={15} height={15} alt="" />
              {headers.uvIndex}
            </th>
            <th>
              <WeatherIcon src={UI_ICONS.wind} width={15} height={15} alt="" />
              {headers.windSpeedDirection}
            </th>
          </tr>
        </thead>{days.map((day, index) => (
          <tbody
            key={`${day.dateDay}-${day.dateMonth}`}
            style={{ display: activeDayIndex === index ? "table-row-group" : "none" }}
          >
            {(day.hourly || []).map((row) => (
              <tr key={`${day.dayLabel}-${row.time}`}>
                <td>{row.time}</td>
                <td>
                  <WeatherIcon src={row.icon} width={20} height={20} alt="" />
                  {row.condition}
                </td>
                <td>{row.temperature}</td>
                <td>{row.humidity}</td>
                <td>{row.uv}</td>
                <td>{row.wind}</td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}

HourlyForecastTable.propTypes = {
  days: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeDayIndex: PropTypes.number.isRequired,
  dataConfig: PropTypes.object,
  siteName: PropTypes.string,
};

const SPLIDE_OPTIONS = {
  type: "slide",
  perPage: 5,
  gap: "10px",
  pagination: false,
  perMove: 1,
  focus: 0,
  omitEnd: true,
  arrows: true,
  rewind: false,
  breakpoints: {
    1000: { perPage: 5 },
    480: { perPage: 1.5, arrows: false },
  },
};

function DayForecastSlider({ forecastDays, activeDayIndex, onSelectDay }) {
  return (
    <div className={styles.weatherForecastDayWise__Slider}>
      <Splide
        className="daywiseSlider"
        options={SPLIDE_OPTIONS}
        aria-label="Weather forecast days"
      >
        {forecastDays.map((day, index) => (
          <SplideSlide key={`${day.dayLabel}-${index}`}>
            <ForecastCard
              day={day}
              isActive={activeDayIndex === index}
              onSelect={() => onSelectDay(index)}
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

DayForecastSlider.propTypes = {
  forecastDays: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeDayIndex: PropTypes.number.isRequired,
  onSelectDay: PropTypes.func.isRequired,
};

export default function YesterdayWeatherForecastWidget({
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
      buildDayWiseForecastWidgetData(
        resolveWeatherApiPayload(data, items),
        siteName,
        language
      ),
    [data, items, language, siteName]
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
    ]
  );

  const [widgetData, setWidgetData] = useState(ssrData);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const { cityName, forecastDays } = widgetData;

  useEffect(() => {
    if (ssrData.forecastDays.length) {
      setWidgetData(ssrData);
    }
  }, [ssrData]);

  useEffect(() => {
    if (ssrData.forecastDays.length) return;

    let cancelled = false;

    fetchWeatherDayWiseForecast(dataConfig, queryParams, siteName, language).then((result) => {
      if (!cancelled && result.forecastDays.length) {
        setWidgetData(result);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [weatherFetchKey, language, siteName, ssrData.forecastDays.length, dataConfig, queryParams]);

  useEffect(() => {
    setActiveDayIndex(0);
  }, [forecastDays.length, cityName]);

  const resolvedCityName = dataConfig.city_name || cityName || "नई दिल्ली";
  const customTitle = decodeHtml(dataConfig.title || title);
  const heading =
    (customTitle
      ? `${resolvedCityName} ${customTitle}`
      : "") ||
    `${resolvedCityName} ${getWeatherLabel("7-days-weather", siteName)}`;

  if (!forecastDays.length) {
    return null;
  }

  return (    
      <div className={styles.weatherForecastDayWise}>
        <div className={styles.container}>
          <div className={styles.custom_heading}>
            <h2 className={styles.h2}>{heading}</h2>
          </div>
          <div className={styles.weatherForecastDayWise_Body}>
            <DayForecastSlider
              forecastDays={forecastDays}
              activeDayIndex={activeDayIndex}
              onSelectDay={setActiveDayIndex}
            />

            {forecastDays.map((day, index) => (
              <DayDetailPanel
                key={`detail-${day.dayLabel}-${index}`}
                day={day}
                isVisible={activeDayIndex === index}
                siteName={siteName}
              />
            ))}

            <HourlyForecastTable
              days={forecastDays}
              activeDayIndex={activeDayIndex}
              dataConfig={dataConfig}
              siteName={siteName}
            />
          </div>
        </div>
      </div>
  );
}

YesterdayWeatherForecastWidget.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  dataConfig: PropTypes.object,
  queryParams: PropTypes.object,
};
