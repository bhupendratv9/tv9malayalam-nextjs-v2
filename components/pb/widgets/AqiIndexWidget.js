import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSmoothScrollAnchor, decodeHtml } from "@/lib/helper/commonHelper";

const IMAGE_BASE = "https://images.tv9hindi.com/images";

const DEFAULT_CITY_NAME = "New Delhi";
const CITY_SLUG_SUFFIX = "-air-quality-index-today";

const AQI_CATEGORIES = [
  { min: 0, max: 50, category: "Good", range: "0-50" },
  { min: 51, max: 100, category: "Moderate", range: "51-100" },
  { min: 101, max: 150, category: "Poor", range: "101-150" },
  { min: 151, max: 200, category: "Unhealthy", range: "151-200" },
  { min: 201, max: 300, category: "Severe", range: "201-300" },
  { min: 301, max: 2000, category: "Hazardous", range: "301-500+" },
];

const SCALE_COLORS = {
  goodAQI: "#59b61f",
  moderateAQI: "#d4cc0f",
  poorAQI: "#ff5f20",
  unhealthyAQI: "#fc0185",
  severeAQI: "#a302b9",
  hazardousAQI: "#fa140a",
};

const LABEL_CLASS_MAP = {
  good: "goodAQI",
  moderate: "moderateAQI",
  poor: "poorAQI",
  unhealthy: "unhealthyAQI",
  severe: "severeAQI",
  hazardous: "hazardousAQI",
};

const DEFAULT_AQI_RANGE_SCALE = [
  { id: "good", className: "goodAQI", label: "Good", range: "0-50", color: "#59b61f" },
  { id: "moderate", className: "moderateAQI", label: "Moderate", range: "51-100", color: "#d4cc0f" },
  { id: "poor", className: "poorAQI", label: "Poor", range: "101-150", color: "#ff5f20" },
  { id: "unhealthy", className: "unhealthyAQI", label: "Unhealthy", range: "151-200", color: "#fc0185" },
  { id: "severe", className: "severeAQI", label: "Severe", range: "201-300", color: "#a302b9" },
  { id: "hazardous", className: "hazardousAQI", label: "Hazardous", range: "301-500+", color: "#fa140a" },
];

function formatRange(item = {}) {
  if (item.range) return String(item.range);
  if (item.range_label) return String(item.range_label);

  const min = item.min ?? item.min_aqi;
  const max = item.max ?? item.max_aqi;

  if (min != null && max != null) {
    return max >= 500 ? `${min}-500+` : `${min}-${max}`;
  }

  return "";
}

function getClassName(item = {}) {
  if (item.className || item.class_name || item.css_class) {
    return item.className || item.class_name || item.css_class;
  }

  const key = String(item.slug || item.type || item.label || item.name || "")
    .trim()
    .toLowerCase();

  return LABEL_CLASS_MAP[key] || "";
}

function parseRangeDisplay(range, index) {
  const parts = String(range).split("-").filter(Boolean);
  if (!parts.length) return { min: "", max: "" };

  const max = parts.length > 1 ? parts.slice(1).join("-") : parts[0];
  const min = index === 0 ? parts[0] : "";

  return { min, max };
}

function normalizeRangeScaleItem(item = {}, index = 0) {
  const label =
    item.label ||
    item.type ||
    item.name ||
    item.category ||
    item.aqi_type ||
    "";
  const range = formatRange(item);
  const className = getClassName(item);

  if (!label || !range || !className) {
    return null;
  }

  const color =
    item.color || item.bg_color || item.background_color || SCALE_COLORS[className] || "";
  const { min, max } = parseRangeDisplay(range, index);

  return {
    id: item.id || className || `scale-${index}`,
    className,
    label,
    range,
    color,
    min,
    max,
  };
}

function generateCitySlug(cityName = "") {
  return (
    String(cityName)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z-]/g, "") + CITY_SLUG_SUFFIX
  );
}

function getAQICategory(aqi) {
  const value = Number(aqi);
  if (Number.isNaN(value)) {
    return { category: "Unknown", range: "N/A" };
  }

  for (const item of AQI_CATEGORIES) {
    if (value >= item.min && value <= item.max) {
      return item;
    }
  }

  return { category: "Unknown", range: "N/A" };
}

function getCityData(cityName, cityList = []) {
  if (!cityName || !Array.isArray(cityList)) return null;

  return (
    cityList.find(
      (city) =>
        String(city.city_name || "").toLowerCase() === String(cityName).toLowerCase()
    ) || null
  );
}

function pickCity(name, cityList = []) {
  if (!name) return null;

  const needle = String(name).split(",")[0].trim().toLowerCase();
  let hit = cityList.find(
    (city) =>
      String(city.city_name || "").toLowerCase() === needle ||
      String(city.city_hi || "").toLowerCase() === needle
  );

  if (hit) return hit;

  return (
    cityList.find((city) =>
      String(city.city_name || "")
        .toLowerCase()
        .includes(needle)
    ) || null
  );
}

function resolveCityList({ items = [], data = null, response = null }) {
  const sources = [items, data, response, data?.data, response?.data];

  for (const source of sources) {
    if (Array.isArray(source) && source.length && source[0]?.city_name) {
      return source;
    }
  }

  return [];
}

function findCityByPageSlug(cityList = [], pageSlug = "") {
  if (!pageSlug || !cityList.length) return null;

  const normalized = String(pageSlug).toLowerCase().trim();
  const byGeneratedSlug = cityList.find(
    (city) => generateCitySlug(city.city_name) === normalized
  );
  if (byGeneratedSlug) return byGeneratedSlug;

  const baseSlug = normalized.replace(CITY_SLUG_SUFFIX, "");
  return (
    cityList.find((city) => {
      const citySlug = String(city.city_name || "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z-]/g, "");
      return citySlug === baseSlug;
    }) || null
  );
}

function resolveActiveCity(cityList = [], queryParams = {}) {
  if (queryParams?.city) {
    return (
      findCityByPageSlug(cityList, queryParams.city) ||
      getCityData(DEFAULT_CITY_NAME, cityList)
    );
  }

  return getCityData(DEFAULT_CITY_NAME, cityList);
}

function categoryToClassName(category = "") {
  return `${String(category).toLowerCase()}AQI`;
}

function formatLastUpdated(dateStr) {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "";

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  const time = date
    .toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");

  return `${day} ${month} ${year} | ${time}`;
}

function buildDisplayTitle(cityData, dataConfigTitle, isCityPage) {
  if (isCityPage && cityData) {
    const cityHi = cityData.city_hi || cityData.city_name;
    return `${cityHi} में आज का वायु गुणवत्ता सूचकांक - ${cityData.city_name} Air Quality Index (AQI) Today`;
  }

  return decodeHtml(dataConfigTitle) || "एयर क्वालिटी इंडेक्स - (AQI) आज";
}

function resolveRangeScaleItems({ items = [], data = null, response = null, dataConfig = {} }) {
  const sources = [
    dataConfig.range_scale,
    dataConfig.scales,
    dataConfig.scale,
    items,
    data?.range_scale,
    data?.scales,
    data?.scale,
    data?.items,
    data?.data,
    response?.range_scale,
    response?.scales,
    response?.scale,
    response?.items,
    response?.data,
  ];

  for (const source of sources) {
    if (!Array.isArray(source) || !source.length) continue;

    const scales = source
      .map((item, index) => normalizeRangeScaleItem(item, index))
      .filter(Boolean);

    if (scales.length) {
      return scales;
    }
  }

  return DEFAULT_AQI_RANGE_SCALE.map((item, index) =>
    normalizeRangeScaleItem(item, index)
  );
}


export default function AqiIndexWidget({
  title = "",
  items = [],
  data = null,
  response = null,
  dataConfig = {},
  queryParams = {},
}) {
  useSmoothScrollAnchor(120);
  const router = useRouter();
  const searchRef = useRef(null);

  const cityList = useMemo(
    () => resolveCityList({ items, data, response }),
    [items, data, response]
  );

  const initialCity = useMemo(
    () => resolveActiveCity(cityList, queryParams),
    [cityList, queryParams]
  );

  const [activeCity, setActiveCity] = useState(initialCity);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const isCityPage = Boolean(queryParams?.city);
  const rangeScaleItems = resolveRangeScaleItems({ items, data, response, dataConfig });
  const searchPlaceholder = decodeHtml(dataConfig.search_placeholder) || "अपना शहर खोजें...";

  const aqiCategory = useMemo(
    () => getAQICategory(activeCity?.aqi),
    [activeCity?.aqi]
  );

  const displayTitle = buildDisplayTitle(
    activeCity,
    dataConfig.title || title,
    isCityPage
  );

  const wrapperClassName = `AQIContent_Wrapper ${categoryToClassName(aqiCategory.category)}`;

  const filteredCities = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query || !cityList.length) return [];

    return cityList.filter((city) =>
      String(city.city_name || "")
        .toLowerCase()
        .includes(query)
    );
  }, [searchQuery, cityList]);

  const navigateToCity = useCallback(
    (cityName) => {
      if (!cityName) return;
      router.push(`/aqi/${generateCitySlug(cityName)}`);
    },
    [router]
  );

  useEffect(() => {
    setActiveCity(initialCity);
  }, [initialCity]);

  useEffect(() => {
    if (isCityPage || !cityList.length) return;
    try {
      const storedCity = localStorage.getItem("aqiCity");
      if (!storedCity) return;

      const hit = pickCity(storedCity, cityList);
      if (!hit) return;

      setActiveCity(hit);
      setSearchQuery(storedCity);
    } catch (e) {
      console.warn("LocalStorage not accessible", e);
    }
  }, [isCityPage, cityList]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!searchRef.current?.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearchInput = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    setShowResults(Boolean(value.trim()));
  };

  const handleSearchKeyDown = (event) => {
    if (event.key !== "Enter") return;

    const query = searchQuery.toLowerCase().trim();
    if (!query) return;

    const matchedCity = cityList.find(
      (city) =>
        String(city.city_name || "").toLowerCase() === query
    );

    if (matchedCity) {
      navigateToCity(matchedCity.city_name);
    }
  };

  const handleSearchSelect = (city) => {
    if (!city?.city_name) return;
    navigateToCity(city.city_name);
  };

  return (
    <>
      <div className="tv9AQI_WidgetWrap">
        <div className="container">
          <div className="custom-heading">
            <h1 className="h1">{displayTitle}</h1>
          </div>

          <div className="tab-links-wrap">
            <div className="tab-links">
              <button
                type="button"
                role="tab"
                aria-selected="true"
                id="openAQI"
                data-city="New delhi"
                className="active"
              >
                <svg className="aqi_icon">
                  <use href="#wind_icon" />
                </svg>
                AQI
              </button>
              <a href="/weather-forecast">
                <svg className="weather_icon">
                  <use href="#sun_icon" />
                </svg>
                मौसम
              </a>
            </div>
            <div className="AQISearchDropdown" ref={searchRef}>
              <input
                autoComplete="off"
                placeholder={searchPlaceholder}
                type="text"
                id="locationSearch"
                name="locationSearch"
                className="locationSearchInput"
                value={searchQuery}
                onChange={handleSearchInput}
                onKeyDown={handleSearchKeyDown}
              />
              {showResults && filteredCities.length > 0 && (
                <div id="searchResults" style={{ display: "block" }}>
                  {filteredCities.map((city) => (
                    <button
                      key={city.slug || city.city_name}
                      type="button"
                      className="result-item"
                      onClick={() => handleSearchSelect(city)}
                    >
                      {city.state_name
                        ? `${city.city_name}, ${city.state_name}`
                        : city.city_name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={wrapperClassName} id="AQIContent_Wrapper">
            <div className="AQIRange_Wrap">
              <div className="locationName" id="cityName">
                {activeCity?.city_hi || activeCity?.city_name || DEFAULT_CITY_NAME}
              </div>
              <div className="rangeInfo">
                <div>
                  <strong id="aqiValue">{activeCity?.aqi ?? "-"}</strong>
                  <small>Aqi</small>
                  <span id="aqiRange">range: {aqiCategory.range}</span>
                </div>
              </div>
            </div>

            <div className="rangeScale_Wrapper">
              <div className="color-bar">
                {rangeScaleItems.map((segment) => (
                  <div className="segment" key={segment.id}>
                    <span>{segment.label}</span>
                    <div
                      className="rangeBar"
                      style={{ backgroundColor: segment.color }}
                    />
                    <div className="range">
                      <span className="min">
                        <span>{segment.min}</span>
                      </span>
                      <span className="max">{segment.max}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="AQIDetail_Wrap">
              <small>Air Quality Is</small>
              <div className="AQICateg" id="aqiCategory">
                {aqiCategory.category}
              </div>
              <div className="PMIndex_Wrap">
                <div className="PM_Index">
                  <div className="pm">
                    <span>PM 2.5</span>
                    <strong id="pm25Value">{activeCity?.pm25 ?? "-"}</strong>
                  </div>
                  <div className="pm">
                    <span>PM 10</span>
                    <strong id="pm10Value">{activeCity?.pm10 ?? "-"}</strong>
                  </div>
                </div>
                <div className="AQI_Caricature" />
              </div>
            </div>

            <div className="lastUpdatedTime" id="lastUpdated">
              {activeCity?.last_updatedat
                ? `Last Updated: ${formatLastUpdated(activeCity.last_updatedat)}`
                : ""}
            </div>

            <div className="poweredBy">
              <a href="https://www.aqi.in/" target="_blank" rel="noopener noreferrer">
                <span>powered by</span>
                <Image
                  src={`${IMAGE_BASE}/aqi-brand.png`}
                  alt="AQI Brand"
                  width={53}
                  height={26}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol viewBox="0 0 24 24" id="wind_icon">
          <path d="M11.5 20C10.6667 20 9.95833 19.7083 9.375 19.125C8.79167 18.5417 8.5 17.8333 8.5 17H10.5C10.5 17.2833 10.596 17.521 10.788 17.713C10.98 17.905 11.2173 18.0007 11.5 18C11.7827 17.9993 12.0203 17.9033 12.213 17.712C12.4057 17.5207 12.5013 17.2833 12.5 17C12.4987 16.7167 12.4027 16.4793 12.212 16.288C12.0213 16.0967 11.784 16.0007 11.5 16H2V14H11.5C12.3333 14 13.0417 14.2917 13.625 14.875C14.2083 15.4583 14.5 16.1667 14.5 17C14.5 17.8333 14.2083 18.5417 13.625 19.125C13.0417 19.7083 12.3333 20 11.5 20ZM2 10V8H15.5C15.9333 8 16.2917 7.85833 16.575 7.575C16.8583 7.29167 17 6.93333 17 6.5C17 6.06667 16.8583 5.70833 16.575 5.425C16.2917 5.14167 15.9333 5 15.5 5C15.0667 5 14.7083 5.14167 14.425 5.425C14.1417 5.70833 14 6.06667 14 6.5H12C12 5.51667 12.3377 4.68733 13.013 4.012C13.6883 3.33667 14.5173 2.99933 15.5 3C16.4827 3.00067 17.312 3.33833 17.988 4.013C18.664 4.68767 19.0013 5.51667 19 6.5C18.9987 7.48333 18.6613 8.31267 17.988 8.988C17.3147 9.66333 16.4853 10.0007 15.5 10H2ZM18.5 18V16C18.9333 16 19.2917 15.8583 19.575 15.575C19.8583 15.2917 20 14.9333 20 14.5C20 14.0667 19.8583 13.7083 19.575 13.425C19.2917 13.1417 18.9333 13 18.5 13H2V11H18.5C19.4833 11 20.3127 11.3377 20.988 12.013C21.6633 12.6883 22.0007 13.5173 22 14.5C21.9993 15.4827 21.662 16.312 20.988 16.988C20.314 17.664 19.4847 18.0013 18.5 18Z" />
        </symbol>
        <symbol viewBox="0 0 24 24" id="sun_icon">
          <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M6.34 17.66L4.93 19.07M19.07 4.93L17.66 6.34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
      </svg>
      
      <style>{`
        .AQISearchDropdown{position:relative}
        .locationSearchInput{display:flex;width:14.4375rem;height:2.625rem;justify-content:center;align-items:center;flex-shrink:0;border-radius:.25rem;border:1px solid #cecece;background:#fff;padding:.94rem;color:#000;font-size:.9375rem}
        .locationSearchInput::placeholder{color:#000}
        #searchResults{border:1px solid #cecece;width:14.4375rem;max-height:200px;overflow-y:auto;background:#fff;position:absolute;z-index:1;border-radius:.25rem;top:100%;right:0}
        .AQISearchDropdown .result-item{display:block;width:100%;text-align:left;padding:10px;cursor:pointer;border:0;border-bottom:1px solid #ecebeb;font-size:.9375rem;background:#fff;font-family:inherit;color:#000}
        .AQISearchDropdown .result-item:hover{background-color:#dbf1fd}
        #searchResults::-webkit-scrollbar{width:3px;height:0;display:block;border-radius:5px;background-color:#d9d9d9}
        #searchResults::-webkit-scrollbar-thumb{background:#22badc;border-radius:5px}
        .tv9AQI_WidgetWrap .tab-links-wrap{display:flex;justify-content:space-between;align-items:center}
        .tv9AQI_WidgetWrap .tab-links-wrap .tab-links{border-radius:1.25rem 1.25rem 0 0;background:#000;display:flex;align-items:center;padding:2px 2px 0;justify-content:space-between}
        .tv9AQI_WidgetWrap .tab-links-wrap .tab-links a,.tv9AQI_WidgetWrap .tab-links-wrap .tab-links button{color:#fff;font-size:1.125rem;font-weight:500;text-transform:uppercase;display:flex;align-items:center;justify-content:center;width:11.5625rem;height:3.3125rem;background:none;border:0;cursor:pointer;font-family:inherit;padding:0;text-decoration:none}
        .tab-links-wrap .tab-links a svg,.tab-links-wrap .tab-links button svg{width:1.5rem;height:1.5rem;display:block;margin-right:.5rem;fill:#fff}
        .tab-links-wrap .tab-links a svg.weather_icon,.tab-links-wrap .tab-links button svg.weather_icon{stroke:#fff}
        .tv9AQI_WidgetWrap .tab-links-wrap .tab-links a.active,.tv9AQI_WidgetWrap .tab-links-wrap .tab-links button.active{color:#000;border-radius:1.125rem 1.125rem 0 0;background:#fff}
        .tab-links-wrap .tab-links a.active svg.aqi_icon,.tab-links-wrap .tab-links button.active svg.aqi_icon{fill:#000}
        .tv9AQI_WidgetWrap{padding-bottom:3.26rem}
        .tv9AQI_WidgetWrap .AQIHeading_Wrap{justify-content:space-between}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper{border-radius:0 .875rem .875rem;background-color:#fff;box-shadow:0 0 12px 0 rgba(96,113,121,.1);width:100%;height:23.9375rem;position:relative;z-index:0;display:flex;justify-content:center;align-items:center}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background-image:url(https://images.tv9hindi.com/images/aqi-bg.svg);background-size:cover;background-repeat:no-repeat;z-index:-1}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .AQIRange_Wrap{width:35%;text-align:center}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .AQIDetail_Wrap{width:45%}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .AQIRange_Wrap .locationName{color:#16191b;font-family:Prata,serif;font-size:1.75rem;font-weight:400;line-height:1.9375rem;text-transform:capitalize;margin-bottom:1.06rem}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .AQIDetail_Wrap small{color:#000;font-size:1.25rem;font-weight:500;display:block;margin-bottom:.44rem}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .AQIDetail_Wrap .AQICateg{height:2.8125rem;border-radius:.5rem;background:#afaeae;color:#000;font-family:Prata,serif;font-size:1.625rem;font-weight:400;line-height:1.25rem;display:inline-flex;justify-content:center;align-items:center;margin-bottom:2.12rem;padding:0 .625rem;position:relative}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .AQIDetail_Wrap .AQICateg::before{content:'';width:28px;height:28px;background-repeat:no-repeat;margin-right:.3125rem;background-size:100%}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.goodAQI .AQIDetail_Wrap .AQICateg{background:#ecffeb;color:#34a12b}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.moderateAQI .AQIDetail_Wrap .AQICateg{background:#fffee2;color:#d4cc0f}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.poorAQI .AQIDetail_Wrap .AQICateg{background:#ffeae2;color:#ff5f20}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.unhealthyAQI .AQIDetail_Wrap .AQICateg{background:#ffeaf5;color:#fc0185}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.severeAQI .AQIDetail_Wrap .AQICateg{background:#fbe4ff;color:#a302b9}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.hazardousAQI .AQIDetail_Wrap .AQICateg{background:#ffe8e5;color:#ff1500}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.goodAQI .AQIDetail_Wrap .AQICateg::before{background-image:url(https://images.tv9hindi.com/images/goodEmoji.svg)}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.moderateAQI .AQIDetail_Wrap .AQICateg::before{background-image:url(https://images.tv9hindi.com/images/moderateEmoji.svg)}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.poorAQI .AQIDetail_Wrap .AQICateg::before{background-image:url(https://images.tv9hindi.com/images/poorEmoji.svg)}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.unhealthyAQI .AQIDetail_Wrap .AQICateg::before{background-image:url(https://images.tv9hindi.com/images/unhealthyEmoji.svg)}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.severeAQI .AQIDetail_Wrap .AQICateg::before{background-image:url(https://images.tv9hindi.com/images/severeEmoji.svg)}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.hazardousAQI .AQIDetail_Wrap .AQICateg::before{background-image:url(https://images.tv9hindi.com/images/hazardousEmoji.svg)}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .PMIndex_Wrap{display:flex;justify-content:flex-start;align-items:center}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .PMIndex_Wrap .PM_Index{border-radius:.5rem;background:rgba(255,255,255,.8);box-shadow:0 0 8px 0 rgba(96,113,121,.25);padding:1rem 1.1rem;display:grid;grid-template-columns:repeat(2,1fr);gap:1.04rem}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .PMIndex_Wrap .PM_Index .pm{border-radius:.25rem;border:1px solid #e2e2e2;background:#fff}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .PMIndex_Wrap .PM_Index .pm span{padding:.69rem 2.05rem .47rem 1.92rem;background-color:#e9f5fb;display:block;color:#0d0d0d;text-align:center;font-size:1.25rem;font-weight:500;line-height:1.125rem}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .PMIndex_Wrap .PM_Index .pm strong{display:block;color:#0d0d0d;font-size:1.9375rem;font-weight:700;line-height:1.625rem;padding:.69rem 2.19rem .59rem 2.06rem}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .poweredBy{position:absolute;right:30px;bottom:30px}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .poweredBy a{display:flex;align-items:center}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .poweredBy span{margin-right:.62rem;font-size:.75rem;font-weight:400;letter-spacing:.0075rem;text-transform:uppercase}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .rangeInfo{position:relative;width:16.48806rem;height:11rem;margin:0 auto;display:flex;justify-content:center;align-items:flex-end;flex-wrap:wrap}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .rangeInfo strong{display:block;color:#000;font-size:4rem;font-weight:700;line-height:1}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .rangeInfo small{display:block;color:#000;font-size:1.5rem;font-weight:500;text-transform:uppercase}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .rangeInfo span{display:block;color:#000;font-size:1.25rem;font-weight:400;text-transform:capitalize;margin-top:.625rem}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.goodAQI .rangeInfo::before,.tv9AQI_WidgetWrap .AQIContent_Wrapper.hazardousAQI .rangeInfo::before,.tv9AQI_WidgetWrap .AQIContent_Wrapper.moderateAQI .rangeInfo::before,.tv9AQI_WidgetWrap .AQIContent_Wrapper.poorAQI .rangeInfo::before,.tv9AQI_WidgetWrap .AQIContent_Wrapper.severeAQI .rangeInfo::before,.tv9AQI_WidgetWrap .AQIContent_Wrapper.unhealthyAQI .rangeInfo::before{content:'';position:absolute;width:100%;height:100%;background-repeat:no-repeat;background-size:100%;top:50%;left:50%;transform:translate(-50%,-50%)}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.goodAQI .rangeInfo::before{background-image:url(https://images.tv9hindi.com/images/goodAQI.svg)}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.moderateAQI .rangeInfo::before{background-image:url(https://static.tv9hindi.com/images/moderateAQI.svg)}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.poorAQI .rangeInfo::before{background-image:url(https://images.tv9hindi.com/images/poorAQI.svg)}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.unhealthyAQI .rangeInfo::before{background-image:url(https://static.tv9hindi.com/images/unhealthyAQI.svg)}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.severeAQI .rangeInfo::before{background-image:url(https://images.tv9hindi.com/images/severeAQI.svg)}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.hazardousAQI .rangeInfo::before{background-image:url(https://images.tv9hindi.com/images/hazardousAQI.svg)}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .AQI_Caricature{position:relative;width:10.71681rem;height:8.76831rem;margin-left:.9375rem}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.goodAQI .AQI_Caricature::before,.tv9AQI_WidgetWrap .AQIContent_Wrapper.hazardousAQI .AQI_Caricature::before,.tv9AQI_WidgetWrap .AQIContent_Wrapper.moderateAQI .AQI_Caricature::before,.tv9AQI_WidgetWrap .AQIContent_Wrapper.poorAQI .AQI_Caricature::before,.tv9AQI_WidgetWrap .AQIContent_Wrapper.severeAQI .AQI_Caricature::before,.tv9AQI_WidgetWrap .AQIContent_Wrapper.unhealthyAQI .AQI_Caricature::before{content:'';position:absolute;background-size:contain;width:100%;height:100%;background-repeat:no-repeat}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.goodAQI .AQI_Caricature::before{background-image:url(https://images.tv9hindi.com/images/good-boy.svg)}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.moderateAQI .AQI_Caricature::before{background-image:url(https://images.tv9hindi.com/images/moderate-boy.svg)}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.poorAQI .AQI_Caricature::before{background-image:url(https://images.tv9hindi.com/images/poor-boy.svg)}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.unhealthyAQI .AQI_Caricature::before{background-image:url(https://images.tv9hindi.com/images/unhealthy-boy.svg)}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.severeAQI .AQI_Caricature::before{background-image:url(https://images.tv9hindi.com/images/severe-boy.svg)}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper.hazardousAQI .AQI_Caricature::before{background-image:url(https://images.tv9hindi.com/images/hazardous-boy.svg)}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .lastUpdatedTime{color:#9d9d9d;font-size:.75rem;font-weight:400;line-height:1.25rem;transform:rotate(-90deg);position:absolute;right:-95px}
        @media(max-width:767px){
        .AQIHeading_Wrap{flex-wrap:wrap}
        .tv9AQI_WidgetWrap .AQIHeading_Wrap{justify-content:center}
        .AQIHeading_Wrap .locationSearchInput{margin-top:.625rem}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper{height:40.375rem;align-items:flex-start;padding:.8rem;flex-wrap:wrap;padding-bottom:40.375rem;}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper::before{background-image:url(https://images.tv9hindi.com/images/aqi-bg-mob.svg);background-size:cover}
        .rangeScale_Wrapper{position:unset;display:flex;width:100%;justify-content:center;margin-bottom:.9375rem;}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .AQIDetail_Wrap,.tv9AQI_WidgetWrap .AQIContent_Wrapper .AQIRange_Wrap{width:100%;text-align:center}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .AQIDetail_Wrap{position:relative}
        .rangeScale_Wrapper .color-bar{width:100%}
        .rangeScale_Wrapper .segment span{font-size:.6875rem}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .AQIDetail_Wrap .AQICateg{margin:0 auto 1.25rem auto}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .lastUpdatedTime{position:static;transform:unset;display:flex;justify-content:center;width:100%;margin-top:0.3125rem;}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .AQI_Caricature{position:absolute;width:5.4575rem;height:4.46519rem;top:32px;left:50%;transform:translateX(-50%);margin-left:0;display:flex;justify-content:center;align-items:center}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .PMIndex_Wrap .PM_Index .pm span{font-size:1.125rem}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .PMIndex_Wrap .PM_Index .pm strong{font-size:1.75rem}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .PMIndex_Wrap{display:block}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .AQIDetail_Wrap small{margin-bottom:5.46519rem}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .AQIRange_Wrap .locationName{margin-bottom:.63rem;font-size:1.625rem;line-height:1}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .poweredBy{position:static}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .poweredBy span{font-size:0.62rem;margin-right:0;}
        .tv9AQI_WidgetWrap .AQIContent_Wrapper .poweredBy img{width:28px;}
        }
        `}</style>
    </>
  );
}

AqiIndexWidget.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  data: PropTypes.object,
  response: PropTypes.object,
  queryParams: PropTypes.object,
  dataConfig: PropTypes.shape({
    title: PropTypes.string,
    search_placeholder: PropTypes.string,
    range_scale: PropTypes.array,
    scales: PropTypes.array,
    scale: PropTypes.array,
  }),
};
