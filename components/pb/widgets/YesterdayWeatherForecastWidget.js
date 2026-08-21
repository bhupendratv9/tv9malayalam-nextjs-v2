"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { decodeHtml } from "@/lib/helper/commonHelper";
import Image from "next/image";
import useSplide from "@/hooks/useSplide";
import "@splidejs/splide/css";
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
      unoptimized
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
      className={`forecastCard${isActive ? " active" : ""}`}
      onClick={onSelect}
    >
      <div className="forecastCard__header">
        <div className="forecastCard__header__day">{day.dayLabel}</div>
      </div>
      <div className="forecastCard__body">
        <div className="forecastCard__body__icon">
          <WeatherIcon src={day.icon} width={40} height={40} alt="" />
        </div>
        <div className="forecastCard__body__temp">
          <div className="forecastCard__body__temp__value">
            <WeatherIcon src={UI_ICONS.temperature} width={28} height={28} alt="" />
            {day.temp}
          </div>
          <div className="forecastCard__body__temp__value">
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
    <div className={`weather-forecast-day-wise__detail${isVisible ? "" : " hide"}`}>
      <div className="date">
        <span>{day.dayLabel}</span>
        <strong>
          {day.dateDay} <span>{day.dateMonth}</span>
        </strong>
      </div>
      <div className="line-seperator-vertical" />
      <div className="weather-condition">
        <WeatherIcon src={day.icon} width={40} height={40} alt="" />
        <div className="weather-condition__text">
          <p>{day.condition}</p>
          <span>{day.conditionNote}</span>
        </div>
      </div>
      <div className="line-seperator-vertical" />
      <div className="weather-info">
        <div className="weather-info__value">
          <WeatherIcon src={UI_ICONS.temperature} width={28} height={28} alt="" />
          <div className="weather-info__value__text">
            <p>{day.highLow}</p>
          </div>
        </div>
        <div className="weather-info__value">
          <WeatherIcon src={UI_ICONS.humidity} width={28} height={28} alt="" />
          <div className="weather-info__value__text">
            <p>
              {labels.humidity} {day.humidityDetail}
            </p>
          </div>
        </div>
        <div className="weather-info__value">
          <WeatherIcon src={UI_ICONS.precipitation} width={28} height={28} alt="" />
          <div className="weather-info__value__text">
            <p>
              {labels.precipitation} {day.precipitation}
            </p>
          </div>
        </div>
      </div>
      <div className="line-seperator-vertical" />
      <div className="twilight">
        <div className="twilight__value">
          <WeatherIcon src={UI_ICONS.sunrise} width={20} height={20} alt="" />
          <div className="twilight__value__text">
            <span>{labels.sunrise}</span>
            <strong>{day.sunrise}</strong>
          </div>
        </div>
        <div className="arc-progress">
          <ArcProgressCanvas percent={day.arcPercent} />
          <div className="arc-label">{day.daylightLabel}</div>
        </div>
        <div className="twilight__value">
          <WeatherIcon src={UI_ICONS.sunset} width={20} height={20} alt="" />
          <div className="twilight__value__text">
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
    <div className="weather-forecast-day-wise__table">
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

function SliderArrows() {
  return (
    <div className="splide__arrows">
      <button type="button" className="splide__arrow splide__arrow--prev" aria-label="Previous slide">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M9.09082 1.74996C9.40534 1.42211 9.41029 0.873707 9.08834 0.538998C8.76309 0.200857 8.24384 0.202574 7.92354 0.536424L2.66665 6.00075L7.92519 11.4668C8.24053 11.7946 8.76804 11.7998 9.08999 11.4642C9.41442 11.1269 9.41359 10.5871 9.09247 10.2533L5.00203 6.00075L9.09082 1.74996Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <button type="button" className="splide__arrow splide__arrow--next" aria-label="Next slide">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M2.90918 1.74996C2.59466 1.42211 2.58971 0.873707 2.91166 0.538998C3.23691 0.200857 3.75616 0.202574 4.07646 0.536424L9.33335 6.00075L4.07481 11.4668C3.75947 11.7946 3.23196 11.7998 2.91001 11.4642C2.58558 11.1269 2.58641 10.5871 2.90753 10.2533L6.99797 6.00075L2.90918 1.74996Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}

function DayForecastSlider({ forecastDays, activeDayIndex, onSelectDay }) {
  const sliderRef = useSplide(
    {
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
    },
    [forecastDays.length]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      globalThis.dispatchEvent(new Event("resize"));
    }, 200);
    return () => clearTimeout(timer);
  }, [forecastDays.length]);

  return (
    <div className="weather-forecast-day-wise__slider">
      <div ref={sliderRef} className="splide daywiseSlider">
        <SliderArrows />
        <div className="splide__track">
          <div className="splide__list">
            {forecastDays.map((day, index) => (
              <div key={`${day.dayLabel}-${index}`} className="splide__slide">
                <ForecastCard
                  day={day}
                  isActive={activeDayIndex === index}
                  onSelect={() => onSelectDay(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
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
  const ssrData = useMemo(
    () => buildDayWiseForecastWidgetData(resolveWeatherApiPayload(data, items), siteName),
    [data, items, siteName]
  );

  const weatherFetchKey = useMemo(
    () =>
      JSON.stringify({
        endpoint: dataConfig.endpoint,
        weather_api_url: dataConfig.weather_api_url,
        site_name: dataConfig.site_name,
        city: queryParams?.city,
        citySlug: queryParams?.citySlug,
        nameSlug: queryParams?.nameSlug,
      }),
    [
      dataConfig.endpoint,
      dataConfig.weather_api_url,
      dataConfig.site_name,
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

    fetchWeatherDayWiseForecast(dataConfig, queryParams, siteName).then((result) => {
      if (!cancelled && result.forecastDays.length) {
        setWidgetData(result);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [weatherFetchKey, siteName, ssrData.forecastDays.length, dataConfig, queryParams]);

  useEffect(() => {
    setActiveDayIndex(0);
  }, [forecastDays.length, cityName]);

  const resolvedCityName = dataConfig.city_name || cityName || "नई दिल्ली";
  const heading =
    decodeHtml(dataConfig.title || title) ||
    `${resolvedCityName} ${getWeatherLabel("7-days-weather", siteName)}`;

  if (!forecastDays.length) {
    return null;
  }

  return (
    <>
      <div className="weather-forecast-day-wise">
        <div className="container">
          <div className="custom-heading">
            <h2 className="h2">{cityName ? `${cityName}  ` : ""}{heading}</h2>
          </div>
          <div className="weather-forecast-day-wise-body">
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
      <style>{`
    .weather-forecast-day-wise__detail.hide{display:none;}
    .weather-forecast-day-wise{margin-bottom:1.75rem;}
    .weather-forecast-day-wise .container{max-width:75.25rem;margin:0 auto;width:100%;}
    .weather-forecast-day-wise .custom-heading{display:flex;align-items:center;justify-content:space-between;margin-bottom:0.62rem;padding-bottom:0.62rem;border-bottom:1px solid #D4D4D4;}
    .weather-forecast-day-wise .custom-heading .h2{color:#000;font-size:1.375rem;font-weight:700;line-height:1.875rem;margin:0;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider{position:relative;padding:0 3rem 1rem;overflow:visible;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .daywiseSlider.splide{position:relative;width:100%;visibility:visible;overflow:visible;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .daywiseSlider .splide__track{overflow:hidden;padding-bottom:0.75rem;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .daywiseSlider .splide__slide{overflow:visible;height:auto;box-sizing:border-box;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .daywiseSlider .splide__arrow{width:2.5rem;height:2.5rem;background:rgba(255,255,255,0.92);border:1px solid #e0e0e0;border-radius:50%;opacity:1;box-shadow:0 1px 4px rgba(0,0,0,0.08);z-index:4;color:#333;top:50%;transform:translateY(-50%);}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .daywiseSlider .splide__arrow svg{width:0.875rem;height:0.875rem;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .daywiseSlider .splide__arrow--prev{left:-3rem !important;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .daywiseSlider .splide__arrow--next{right:-3rem !important;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .daywiseSlider .splide__arrow:disabled{opacity:0.35;cursor:not-allowed;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .forecastCard{position:relative;display:grid;grid-template-columns:1fr auto;grid-template-rows:auto auto;grid-template-areas:"day temp" "icon temp";align-items:center;width:100%;background:#fff;border-radius:1.125rem;border:1px solid #D7EAF4;padding:0.69rem;z-index:0;cursor:pointer;overflow:hidden;box-sizing:border-box;font:inherit;color:inherit;text-align:inherit;appearance:none;-webkit-appearance:none;margin:0;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .forecastCard::before{content:"";width:100%;height:3.625rem;background-image:url(https://static.tv9hindi.com/images/weather/line-pattern-bg.svg);background-repeat:no-repeat;background-size:cover;position:absolute;top:0;left:0;z-index:0;pointer-events:none;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .forecastCard .forecastCard__header{grid-area:day;display:flex;justify-content:space-between;align-items:center;margin-bottom:0;padding-bottom:0;border-bottom:none;position:relative;z-index:1;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .forecastCard .forecastCard__header__day{font-size:1rem;font-weight:600;line-height:1.125rem;color:#0B0A0A;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .forecastCard .forecastCard__body{display:contents;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .forecastCard .forecastCard__body__icon{grid-area:icon;display:flex;align-items:center;line-height:0;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .forecastCard .forecastCard__body__icon > span{display:flex;align-items:center;line-height:0;width:40px;height:40px;flex-shrink:0;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .forecastCard .forecastCard__body__icon img{width:40px;height:40px;display:block;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .forecastCard .forecastCard__body__temp{grid-area:temp;display:flex;flex-direction:column;align-items:flex-end;justify-content:center;gap:0.15rem;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .forecastCard .forecastCard__body__temp__value{display:flex;align-items:center;font-size:1rem;font-weight:700;line-height:1.2;color:#222121;white-space:nowrap;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .forecastCard .forecastCard__body__temp__value > span{display:inline-flex;align-items:center;line-height:0;flex-shrink:0;margin-right:0.62rem;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .forecastCard .forecastCard__body__temp__value img{width:28px;height:28px;display:block;margin-right:0;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .forecastCard.active{background:#0181D0;color:#fff;overflow:visible;border-color:#0181D0;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .forecastCard.active::before{display:none;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .forecastCard.active::after{content:"";position:absolute;bottom:-8px;left:50%;transform:translateX(-50%) rotate(45deg);width:20px;height:20px;background-color:#0181D0;border-radius:4px;z-index:2;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .forecastCard.active .forecastCard__header__day{color:#fff;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .forecastCard.active .forecastCard__body__temp__value{color:#fff;}
    .weather-forecast-day-wise .weather-forecast-day-wise__slider .forecastCard.active .forecastCard__body__temp__value img{filter:brightness(0) invert(1);}
    .weather-forecast-day-wise__detail{border-radius:1.25rem;background:linear-gradient(90deg,#0181D0 28.37%,#1BB5D0 100%);padding:1.8rem 2.5rem;margin-top:0.62rem;display:flex;align-items:center;justify-content:space-between;margin-bottom:1.75rem;}
    .weather-forecast-day-wise__detail .line-seperator-vertical{position:relative;background:linear-gradient(90deg,#D8F1FE 0%,#7FCDF5 50.48%,#D8F1FE 100%);width:0.0625rem;height:4.6875rem;}
    .weather-forecast-day-wise__detail .line-seperator-vertical::before{display:none;}
    .weather-forecast-day-wise__detail .date span{font-size:1.0625rem;font-weight:500;line-height:1.625rem;color:#fff;}
    .weather-forecast-day-wise__detail .date strong{font-size:1.75rem;font-weight:700;line-height:1.625rem;color:#fff;display:block;}
    .weather-forecast-day-wise__detail .weather-condition{display:grid;grid-template-columns:40px 1fr;gap:0.44rem;max-width:22rem;}
    .weather-forecast-day-wise__detail .weather-condition > span{display:flex;align-items:center;line-height:0;width:40px;height:40px;}
    .weather-forecast-day-wise__detail .weather-condition img{width:40px;height:40px;display:block;}
    .weather-forecast-day-wise__detail .weather-condition .weather-condition__text p{font-size:1.125rem;font-weight:600;text-transform:capitalize;color:#fff;}
    .weather-forecast-day-wise__detail .weather-condition .weather-condition__text span{font-size:0.875rem;font-weight:500;line-height:1.1875rem;color:#fff;}
    .weather-forecast-day-wise__detail .weather-info .weather-info__value{display:flex;align-items:center;}
    .weather-forecast-day-wise__detail .weather-info .weather-info__value__text p{font-size:0.875rem;font-weight:600;line-height:1.5625rem;color:#fff;}
    .weather-forecast-day-wise__detail .weather-info .weather-info__value > span{display:inline-flex;align-items:center;line-height:0;flex-shrink:0;margin-right:0.62rem;}
    .weather-forecast-day-wise__detail .weather-info .weather-info__value img{width:28px;height:28px;margin-right:0;display:block;filter:brightness(0) invert(1);}
    .weather-forecast-day-wise__detail .weather-info .weather-info__value:last-child img{width:20px;height:20px;}
    .weather-forecast-day-wise__detail .twilight{display:grid;grid-template-columns:repeat(3,1fr);align-items:center;gap:1rem;}
    .weather-forecast-day-wise__detail .twilight .twilight__value{display:grid;grid-template-columns:20px 1fr;gap:0.44rem;}
    .weather-forecast-day-wise__detail .twilight .twilight__value > span{display:flex;align-items:center;line-height:0;width:20px;height:20px;}
    .weather-forecast-day-wise__detail .twilight .twilight__value img{width:20px;height:20px;display:block;}
    .weather-forecast-day-wise__detail .twilight .twilight__value__text span{font-size:0.875rem;font-weight:500;line-height:1.1875rem;color:#fff;display:block;}
    .weather-forecast-day-wise__detail .twilight .twilight__value__text strong{font-size:1rem;font-weight:600;line-height:1.1875rem;color:#fff;display:block;}
    .arc-label{text-align:center;font-size:0.75rem;font-weight:500;line-height:1.1875rem;margin-top:-10px;color:#fff;}
    .weather-forecast-day-wise__table{width:100%;overflow:auto;max-height:538px;}
    .weather-forecast-day-wise__table table{width:100%;border-collapse:collapse;margin-bottom:1rem;}
    .weather-forecast-day-wise__table table thead{background:#f2f6f8;position:sticky;top:0;}
    .weather-forecast-day-wise__table table tbody tr:nth-child(odd){background:#fff;border-radius:1rem;}
    .weather-forecast-day-wise__table table tbody tr:nth-child(odd) td:first-child{border-radius:1rem 0 0 1rem;}
    .weather-forecast-day-wise__table table tbody tr:nth-child(odd) td:last-child{border-radius:0 1rem 1rem 0;}
    .weather-forecast-day-wise__table table th{font-size:1.125rem;font-weight:700;text-transform:uppercase;color:#000;padding:1rem;white-space:nowrap;text-align:center;}
    .weather-forecast-day-wise__table table td{font-size:1rem;font-weight:400;color:#000;padding:1rem;text-align:center;white-space:nowrap;}
    .weather-forecast-day-wise__table table th > span,.weather-forecast-day-wise__table table td > span{display:inline-flex;align-items:center;line-height:0;vertical-align:middle;margin-right:0.62rem;}
    .weather-forecast-day-wise__table table th img,.weather-forecast-day-wise__table table td img{display:block;vertical-align:middle;}
    .weather-forecast-day-wise__table table th img{width:15px;height:15px;}
    .weather-forecast-day-wise__table table td img{width:20px;height:20px;margin-right:0;}
    .weather-forecast-day-wise__table table tbody td:nth-child(3){font-weight:700;}
    @media screen and (max-width: 767px) {
        .weather-forecast-day-wise__detail{flex-wrap:wrap;flex-direction:column;padding:1.2rem;margin-bottom:1rem;}
        .weather-forecast-day-wise__detail .line-seperator-vertical{width:100%;height:0.0625rem;margin:0.625rem 0;}
        .weather-forecast-day-wise__detail .date{display:flex;align-items:center;width:100%;}
        .weather-forecast-day-wise__detail .date span{margin-right:0.62rem;}
        .weather-forecast-day-wise__detail .weather-info{display:flex;width:100%;flex-wrap:wrap;gap:0.62rem;}
        .weather-forecast-day-wise__detail .weather-info .weather-info__value{width:48%;}
        .weather-forecast-day-wise__detail .twilight{gap:0.62rem;}
        .weather-forecast-day-wise__detail .twilight .twilight__value__text strong{font-size:0.875rem;}
        .weather-forecast-day-wise .weather-forecast-day-wise__slider{padding:0 0 0.75rem;}
        .weather-forecast-day-wise__slider .splide__arrow{display:none;}
    }
`}</style>
    </>
  );
}

YesterdayWeatherForecastWidget.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  dataConfig: PropTypes.object,
  queryParams: PropTypes.object,
};
