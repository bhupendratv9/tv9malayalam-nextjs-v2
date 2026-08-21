"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
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
  const resolvedSrc = src?.startsWith("http") ? src : resolveWeatherIconSrc(src);
  return (
    <Image
      src={resolvedSrc}
      width={width}
      height={height}
      alt=""
      className={className}
      unoptimized
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
      className="direction_icon"
      width="23"
      height="21"
      viewBox="0 0 23 21"
      aria-hidden="true"
      style={{ transform: `rotate(${Number(degree) || 0}deg)` }}
    >
      <path
        fill="#4BA9FF"
        d="M10.064 1.516c.77-1.333 2.694-1.333 3.464 0l9.192 15.921c.995 1.723-.862 3.684-2.637 2.784l-7.382-3.746a2 2 0 00-1.81 0L3.509 20.22c-1.774.9-3.632-1.06-2.637-2.783l9.192-15.921z"
      />
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
    <div className="progress-wrapper">
      <div className="progress-bar">
        <div
          className="thumb"
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
    <div className="uv-bar">
      <div className="uv-label">{uvLabel}</div>
      <div
        className="uv-thumb"
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
  const ssrData = useMemo(
    () => buildCityWeatherConditionWidgetData(resolveWeatherApiPayload(data, items), siteName),
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

  useEffect(() => {
    if (ssrData.conditions) {
      setWidgetData(ssrData);
    }
  }, [ssrData]);

  useEffect(() => {
    if (ssrData.conditions) return;

    let cancelled = false;

    fetchCityWeatherCondition(dataConfig, queryParams, siteName).then((result) => {
      if (!cancelled && result.conditions) {
        setWidgetData(result);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [weatherFetchKey, siteName, ssrData.conditions, dataConfig, queryParams]);

  const { cityName, conditions } = widgetData;

  if (!conditions) {
    return null;
  }

  const resolvedCityName = dataConfig.city_name || cityName || "नई दिल्ली";
  const heading =
    decodeHtml(dataConfig.title || title) ||
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
    <>
      <div className="weather-parameters-wrapper">
        <div className="container">
          <div className="custom-heading">
            <h2 className="h2">{heading}</h2>
          </div>
          <div className="weather-parameters">
            <div className="weather-parameter-left">
              <div className="weather-parameter-card">
                <div className="weather-parameter-card__top">
                  <WeatherImg src={ICONS.windMill} width={120} height={120} />
                  <div className="card-info">
                    <div className="card-info__left">
                      <p>{labels.windSpeed}</p>
                      <span>
                        <strong>{conditions.windSpeed}</strong> Km/H
                      </span>
                    </div>
                    <div className="card-info__right" />
                  </div>
                </div>
                <div className="line-seperator-horizontal" />
                <div className="weather-parameter-card__bottom">
                  <div className="card-info">
                    <div className="card-info__left">
                      <p>{labels.gustSpeed}</p>
                      <div className="flex-align-center">
                        <WeatherImg src={ICONS.blowingSnow} width={24} height={24} />
                        <WeatherImg src={ICONS.gustSpeed} width={18} height={18} />
                      </div>
                      <span>
                        <strong>{conditions.gustSpeed}</strong> Km/H
                      </span>
                    </div>
                    <div className="line-seperator-vertical" />
                    <div className="card-info__right">
                      <p>{labels.direction}</p>
                      <div className="flex-align-center">
                        <DirectionIcon degree={conditions.windDegree} />
                      </div>
                      <span>
                        <strong>{conditions.windDegree}°</strong>
                        {conditions.windDir}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="weather-parameter-card__footer">{conditions.windDescription}</div>
              </div>
            </div>

            <div className="weather-parameter-mid">
              <div className="weather-parameter-card">
                <div className="weather-parameter-card__top">
                  <WeatherImg src={ICONS.clouds} width={80} height={80} />
                </div>
                <div className="weather-parameter-card__bottom">
                  <div className="card-info">
                    <div className="card-info__left">
                      <p>{labels.cloudCover}</p>
                      <span>
                        <strong>{conditions.cloudCover}</strong>
                      </span>
                    </div>
                    <div className="line-seperator-vertical" />
                    <div className="card-info__right">
                      <p>{labels.visibility}</p>
                      <span>
                        <strong>{conditions.visibility}</strong> Km
                      </span>
                    </div>
                  </div>
                </div>
                <div className="weather-parameter-card__footer">{conditions.cloudDescription}</div>
              </div>

              <div className="weather-parameter-card">
                <div className="weather-parameter-card__header">
                  <p>{labels.precipitation}</p>
                </div>
                <div className="weather-parameter-card__body">
                  <div className="card-info card-info--compact">
                    <div className="card-info__left">
                      <WeatherImg src={ICONS.rain} width={80} height={80} />
                    </div>
                    <div className="card-info__right">
                      <span>
                        <strong>{conditions.precipitation}</strong> mm
                      </span>
                    </div>
                  </div>
                </div>
                <div className="weather-parameter-card__footer">{conditions.precipitationDescription}</div>
              </div>
            </div>

            <div className="weather-parameter-right">
              <div className="weather-parameter-card">
                <div className="weather-parameter-card__header">
                  <p>{labels.pressure}</p>
                </div>
                <div className="weather-parameter-card__body">
                  <div className="card-info">
                    <div className="card-info__left">
                      <WeatherImg src={ICONS.pressure} width={80} height={80} />
                    </div>
                    <div className="line-seperator-vertical" />
                    <div className="card-info__right">
                      <span>
                        <strong>{conditions.pressure}</strong> mb
                      </span>
                      {getPressureStatusLabel(conditions.pressure) ? (
                        <span className="textBtn">{getPressureStatusLabel(conditions.pressure)}</span>
                      ) : null}
                    </div>
                  </div>
                  <PressureBar pressure={conditions.pressure} />
                </div>
                <div className="weather-parameter-card__footer">{conditions.pressureDescription}</div>
              </div>

              <div className="weather-parameter-card">
                <div className="weather-parameter-card__header">
                  <p>{labels.uvIndex}</p>
                </div>
                <div className="weather-parameter-card__body">
                  <div className="card-info">
                    <div className="card-info__left">
                      <WeatherImg src={ICONS.sun} width={80} height={80} />
                    </div>
                    <div className="line-seperator-vertical" />
                    <div className="card-info__right">
                      <p>{labels.uvIndex}</p>
                      <span>
                        <strong>{conditions.uvIndex}</strong>
                      </span>
                    </div>
                  </div>
                  <UvBar uvIndex={conditions.uvIndex} uvLabel={conditions.uvCondition} />
                </div>
                <div className="weather-parameter-card__footer">{conditions.uvDescription}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
    .weather-parameters-wrapper{margin-bottom:1.75rem;}
    .weather-parameters-wrapper .container{max-width:75.25rem;margin:0 auto;width:100%;}
    .weather-parameters-wrapper .custom-heading{display:flex;align-items:center;justify-content:space-between;margin-bottom:0.62rem;padding-bottom:0.62rem;border-bottom:1px solid #D4D4D4;}
    .weather-parameters-wrapper .custom-heading .h2{color:#000;font-size:1.375rem;font-weight:700;line-height:1.875rem;margin:0;}
    .weather-parameters{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;width:100%;max-width:75.25rem;height:auto;margin:0 auto;align-items:stretch;}
    .weather-parameter-left,.weather-parameter-mid,.weather-parameter-right{display:flex;flex-direction:column;gap:1.2rem;min-height:0;}
    .weather-parameters .weather-parameter-card{border-radius:1.25rem;border:1px solid #d4e3ee;background:#fff;position:relative;overflow:hidden;z-index:0;display:flex;flex-direction:column;height:100%;min-height:0;}
    .weather-parameter-mid .weather-parameter-card,.weather-parameter-right .weather-parameter-card{flex:1;}
    .weather-parameter-left .weather-parameter-card{flex:1;}
    .weather-parameters .weather-parameter-mid .weather-parameter-card__header,.weather-parameters .weather-parameter-right .weather-parameter-card__header{flex-shrink:0;}
    .weather-parameters .weather-parameter-card::before{content:"";width:100%;height:8.1875rem;background-image:url(https://static.tv9hindi.com/images/weather/line-pattern-bg.svg);background-repeat:no-repeat;background-size:cover;position:absolute;top:0;left:0;z-index:-1;}
    .weather-parameters .weather-parameter-left .weather-parameter-card::before{height:18.5625rem;}
    .weather-parameters .weather-parameter-card .weather-parameter-card__top img{width:120px;height:120px;margin:2.31rem auto 3.12rem auto;display:block;}
    .weather-parameters .weather-parameter-card .card-info{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;align-items:center;justify-items:center;position:relative;}
    .weather-parameters .weather-parameter-card .card-info p{margin:0;font-size:1rem;font-weight:400;line-height:1.25rem;color:#000;display:flex;align-items:center;}
    .weather-parameters .weather-parameter-card .card-info span{font-size:.875rem;font-weight:400;line-height:1.125rem;color:#000;}
    .weather-parameters .weather-parameter-card .card-info span strong{font-size:1.75rem;font-weight:700;line-height:2.0625rem;color:#000;}
    .weather-parameters .weather-parameter-card .card-info .direction_icon{width:23px;height:21px;display:block;}
    .weather-parameters .weather-parameter-card .line-seperator-horizontal{width:15.625rem;height:.0625rem;background:linear-gradient(90deg,#fff 0,#7d7d7d 50.48%,#fff 100%);margin:1.44rem auto;}
    .weather-parameters .weather-parameter-card .weather-parameter-card__footer{font-size:.75rem;font-weight:500;line-height:1.5;color:#000;border-radius:0 0 1.25rem 1.25rem;background:#d7eaf4;text-align:center;padding:0.5rem 1rem;margin-top:auto;flex-shrink:0;width:100%;min-height:3.25rem;display:flex;align-items:center;justify-content:center;box-sizing:border-box;}
    .flex-align-center{display:flex;align-items:center;gap:.5rem;margin:.5rem 0;justify-content:center;}
    .line-seperator-vertical{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:.0625rem;height:4.6875rem;z-index:1;}
    .line-seperator-vertical::before{content:"";position:absolute;top:0;left:0;background-image:url(https://static.tv9hindi.com/images/weather/line-seperator.png);background-size:cover;background-repeat:no-repeat;width:.0625rem;height:4.6875rem;}
    .weather-parameters .weather-parameter-mid .weather-parameter-card:first-child::before,.weather-parameters .weather-parameter-right .weather-parameter-card:first-child::before{height:8.1875rem;}
    .weather-parameters .weather-parameter-mid img,.weather-parameters .weather-parameter-right img{width:70px;height:70px;display:block;}
    .weather-parameters .weather-parameter-mid .weather-parameter-card__top img{width:80px;height:80px;margin:1rem auto 1.56rem auto;display:block;}
    .weather-parameters .weather-parameter-mid .weather-parameter-card__header,.weather-parameters .weather-parameter-right .weather-parameter-card__header{display:grid;grid-template-columns:1fr 18px;gap:1.2rem;align-items:center;padding:1.3rem 1.8rem;position:relative;}
    .weather-parameters .weather-parameter-mid .weather-parameter-card__header p,.weather-parameters .weather-parameter-right .weather-parameter-card__header p{margin:0;font-size:1rem;font-weight:600;line-height:1.125rem;color:#000;text-transform:capitalize;}
    .weather-parameters .weather-parameter-card .card-info span.textBtn{font-size:1rem;font-weight:400;line-height:1.125rem;color:#000;border-radius:1.25rem;background:#FFCC00;display:inline-flex;align-items:center;justify-content:center;width:auto;height:1.75rem;padding:0 0.625rem;margin-top:0.5rem;}
    .weather-parameters .weather-parameter-card .weather-parameter-card__body{padding:0 1.8rem 1.3rem;flex:1;display:flex;flex-direction:column;justify-content:center;}
    .weather-parameters .weather-parameter-card .weather-parameter-card__body .progress-wrapper{width:12.9375rem;height:0.8125rem;margin:0.5rem auto 0;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
    .weather-parameters .weather-parameter-card .weather-parameter-card__body .progress-wrapper .progress-bar{position:relative;width:100%;height:6px;border-radius:6px;background:linear-gradient(to right,#4caf50 0,#cddc39 20%,#ffc107 40%,#ff9800 50%,#e91e63 70%,#9c27b0 85%,#f44336 100%);}
    .weather-parameters .weather-parameter-card .weather-parameter-card__body .progress-wrapper .progress-bar .thumb{position:absolute;top:50%;width:13px;height:13px;background:#fff;border:4px solid #ff9800;border-radius:50%;transform:translate(-50%,-50%);box-sizing:border-box;}
    .weather-parameters .weather-parameter-card .weather-parameter-card__bottom{padding:0 1.8rem 1.3rem;flex:1;display:flex;flex-direction:column;justify-content:center;}
    .weather-parameters .weather-parameter-mid .weather-parameter-card:first-child .weather-parameter-card__top{flex-shrink:0;}
    .weather-parameters .weather-parameter-mid .weather-parameter-card:first-child .weather-parameter-card__bottom{flex:1;}
    .weather-parameters .weather-parameter-mid .weather-parameter-card__body .card-info,.weather-parameters .weather-parameter-right .weather-parameter-card__body .card-info{min-height:5.5rem;flex:1;}
    .weather-parameters .weather-parameter-mid .weather-parameter-card__body .card-info--compact,.weather-parameters .weather-parameter-right .weather-parameter-card__body .card-info--compact{min-height:5.5rem;}
    .weather-parameters .weather-parameter-mid .weather-parameter-card__body .card-info__left,.weather-parameters .weather-parameter-right .weather-parameter-card__body .card-info__left{display:flex;align-items:center;justify-content:center;}
    .weather-parameters .weather-parameter-mid .weather-parameter-card__body .card-info__right,.weather-parameters .weather-parameter-right .weather-parameter-card__body .card-info__right{text-align:center;}
    .uv-bar{position:relative;width:12.8125rem;height:1.5rem;border-radius:6px;background:linear-gradient(to right,#6dd400 0,#f7e400 25%,#f88800 50%,#f70000 75%,#b400f7 100%);display:flex;align-items:center;justify-content:center;color:#fff;margin:0.5rem auto 0;flex-shrink:0;}
    .uv-bar .uv-thumb{position:absolute;top:-4px;height:32px;width:4px;border:1px solid #fff;border-radius:3px;transform:translateX(-50%);}
    .uv-bar .uv-label{position:relative;color:#fff;font-size:0.875rem;font-weight:400;text-transform:capitalize;z-index:1;}
    @media screen and (max-width: 767px) {
      .weather-parameters{grid-template-columns:1fr;}
      .weather-parameters .weather-parameter-card .line-seperator-horizontal{width:100%;}
    }
`}</style>
    </>
  );
}

CityWeatherConditionWidget.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  dataConfig: PropTypes.object,
  queryParams: PropTypes.object,
};
