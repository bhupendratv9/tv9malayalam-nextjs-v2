import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSmoothScrollAnchor, decodeHtml } from "@/lib/helper/commonHelper";

import AppLink from "@/components/AppLink";
import styles from "./AqiIndex.module.css";
import { ICONS_SVG } from "@/lib/constants";

const IMAGE_BASE = "https://images.tv9hindi.com/images";

const DEFAULT_CITY_NAME = "Chennai";
const CITY_SLUG_SUFFIX = "-air-quality-index-today";
const DEFAULT_CITY_LANGUAGE = "hi";

function resolveCityLanguage(dataConfig = {}) {
  return String(
    dataConfig.city_display_language ||
      dataConfig.city_language ||
      dataConfig.language ||
      dataConfig.lang ||
      DEFAULT_CITY_LANGUAGE
  )
    .trim()
    .toLowerCase();
}

function getLocalizedCityName(city = {}, language = DEFAULT_CITY_LANGUAGE) {
  const normalizedLanguage = String(language || DEFAULT_CITY_LANGUAGE)
    .trim()
    .toLowerCase();

  if (normalizedLanguage === "en") {
    return city.city_name || city.city_hi || "";
  }

  if (normalizedLanguage === "hi") {
    return city.city_hi || city.city_name || "";
  }

  const localizedKey = `city_${normalizedLanguage}`;
  return city[localizedKey] || city.city_hi || city.city_name || "";
}

function getCitySearchText(city = {}, language = DEFAULT_CITY_LANGUAGE) {
  const localizedName = getLocalizedCityName(city, language);

  return [
    city.city_name,
    city.city_hi,
    localizedName,
    city.state_name,
    city.country_name,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

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
  {
    id: "good",
    className: "goodAQI",
    label: "Good",
    range: "0-50",
    color: "#59b61f",
  },
  {
    id: "moderate",
    className: "moderateAQI",
    label: "Moderate",
    range: "51-100",
    color: "#d4cc0f",
  },
  {
    id: "poor",
    className: "poorAQI",
    label: "Poor",
    range: "101-150",
    color: "#ff5f20",
  },
  {
    id: "unhealthy",
    className: "unhealthyAQI",
    label: "Unhealthy",
    range: "151-200",
    color: "#fc0185",
  },
  {
    id: "severe",
    className: "severeAQI",
    label: "Severe",
    range: "201-300",
    color: "#a302b9",
  },
  {
    id: "hazardous",
    className: "hazardousAQI",
    label: "Hazardous",
    range: "301-500+",
    color: "#fa140a",
  },
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
    item.color ||
    item.bg_color ||
    item.background_color ||
    SCALE_COLORS[className] ||
    "";
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
        String(city.city_name || "").toLowerCase() ===
        String(cityName).toLowerCase(),
    ) || null
  );
}

function pickCity(name, cityList = [], language = DEFAULT_CITY_LANGUAGE) {
  if (!name) return null;

  const needle = String(name).split(",")[0].trim().toLowerCase();
  let hit = cityList.find(
    (city) =>
      String(city.city_name || "").toLowerCase() === needle ||
      String(city.city_hi || "").toLowerCase() === needle ||
      String(getLocalizedCityName(city, language) || "").toLowerCase() === needle,
  );

  if (hit) return hit;

  return (
    cityList.find((city) => getCitySearchText(city, language).includes(needle)) || null
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
    (city) => generateCitySlug(city.city_name) === normalized,
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

function buildDisplayTitle(
  cityData,
  dataConfigTitle,
  isCityPage,
  language = DEFAULT_CITY_LANGUAGE
) {
  if (isCityPage && cityData) {
    const localizedCityName = getLocalizedCityName(cityData, language);
    return `${localizedCityName} में आज का वायु गुणवत्ता सूचकांक - ${cityData.city_name} Air Quality Index (AQI) Today`;
  }

  return decodeHtml(dataConfigTitle) || "एयर क्वालिटी इंडेक्स - (AQI) आज";
}

function resolveRangeScaleItems({
  items = [],
  data = null,
  response = null,
  dataConfig = {},
}) {
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
    normalizeRangeScaleItem(item, index),
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
    [items, data, response],
  );
  const cityLanguage = resolveCityLanguage(dataConfig);

  const initialCity = useMemo(
    () => resolveActiveCity(cityList, queryParams),
    [cityList, queryParams],
  );

  const [activeCity, setActiveCity] = useState(initialCity);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const isCityPage = Boolean(queryParams?.city);
  const rangeScaleItems = resolveRangeScaleItems({
    items,
    data,
    response,
    dataConfig,
  });
  const searchPlaceholder =
    decodeHtml(dataConfig.search_placeholder) || "உங்கள் நகரத்தை அறி...";

  const aqiCategory = useMemo(
    () => getAQICategory(activeCity?.aqi),
    [activeCity?.aqi],
  );

  const displayTitle = buildDisplayTitle(
    activeCity,
    dataConfig.title || title,
    isCityPage,
    cityLanguage,
  );

  const wrapperClassName = `${styles.AQIContent_Wrapper} ${styles[categoryToClassName(aqiCategory.category)]}`;

  const filteredCities = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query || !cityList.length) return [];

    return cityList.filter((city) => getCitySearchText(city, cityLanguage).includes(query));
  }, [searchQuery, cityList, cityLanguage]);

  const navigateToCity = useCallback(
    (cityName) => {
      if (!cityName) return;
      router.push(`/aqi/${generateCitySlug(cityName)}`);
    },
    [router],
  );

  useEffect(() => {
    setActiveCity(initialCity);
  }, [initialCity]);

  useEffect(() => {
    if (isCityPage || !cityList.length) return;
    try {
      const storedCity = localStorage.getItem("aqiCity");
      if (!storedCity) return;

      const hit = pickCity(storedCity, cityList, cityLanguage);
      if (!hit) return;

      setActiveCity(hit);
      setSearchQuery(storedCity);
    } catch (e) {
      console.warn("LocalStorage not accessible", e);
    }
  }, [isCityPage, cityList, cityLanguage]);

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
      (city) => getCitySearchText(city, cityLanguage).includes(query),
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
    <div className={styles.AQI_Main_Widget}>
      <div className="container">
        <div className={styles.custom_heading}>
          <h1 className={styles.h1}>{displayTitle}</h1>
        </div>

        <div className={styles.tabLinks_Wrap}>
          <div className={styles.tabLinks}>
            <button
              type="button"
              role="tab"
              aria-selected="true"
              id="openAQI"
              data-city="New delhi"
              className={styles.active}
            >
              <svg className={styles.aqi_icon}><use href={`${ICONS_SVG}#wind_icon`}></use></svg>
              AQI
            </button>
            <AppLink href="/weather-forecast">
              <svg className={styles.weather_icon}><use href={`${ICONS_SVG}#sun_icon`}></use></svg>
              வானிலை
            </AppLink>
          </div>
          <div className={styles.searchDropdown} ref={searchRef}>
            <input
              autoComplete="off"
              placeholder={searchPlaceholder}
              type="text"
              id="locationSearch"
              name="locationSearch"
              className={styles.locationSearchInput}
              value={searchQuery}
              onChange={handleSearchInput}
              onKeyDown={handleSearchKeyDown}
            />
            {showResults && filteredCities.length > 0 && (
              <div id="searchResults" className={styles.searchResults} style={{ display: "block" }}>
                {filteredCities.map((city) => (
                  <button
                    key={city.slug || city.city_name}
                    type="button"
                    className={styles.resultItem}
                    onClick={() => handleSearchSelect(city)}
                  >
                    {city.state_name
                      ? `${getLocalizedCityName(city, cityLanguage)}, ${city.state_name}`
                      : getLocalizedCityName(city, cityLanguage)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={wrapperClassName} id="AQIContent_Wrapper">
          <div className={styles.AQIRange_Wrap}>
            <div className={styles.locationName} id="cityName">
              {getLocalizedCityName(activeCity, cityLanguage) || DEFAULT_CITY_NAME}
            </div>
            <div className={styles.rangeInfo}>
              <div>
                <strong id="aqiValue" className={styles.aqiValue}>{activeCity?.aqi ?? "-"}</strong>
                <small className={styles.aqiText}>Aqi</small>
                <span id="aqiRange" className={styles.aqiRange}>range: {aqiCategory.range}</span>
              </div>
            </div>
          </div>

          <div className={styles.rangeScale_Wrapper}>
            <div className={styles.colorBar}>
              {rangeScaleItems.map((segment) => (
                <div className={styles.segment} key={segment.id}>
                  <span>{segment.label}</span>
                  <div className={styles.rangeBar} style={{ backgroundColor: segment.color }} />
                  <div className={styles.range}>
                    <span className={styles.min}>
                      <span>{segment.min}</span>
                    </span>
                    <span className={styles.max}>{segment.max}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.AQIDetail_Wrap}>
            <small>Air Quality Is</small>
            <div className={styles.AQICateg} id="aqiCategory">
              {aqiCategory.category}
            </div>
            <div className={styles.PMIndex_Wrap}>
              <div className={styles.PM_Index}>
                <div className={styles.pm}>
                  <span>PM 2.5</span>
                  <strong id="pm25Value">{activeCity?.pm25 ?? "-"}</strong>
                </div>
                <div className={styles.pm}>
                  <span>PM 10</span>
                  <strong id="pm10Value">{activeCity?.pm10 ?? "-"}</strong>
                </div>
              </div>
              <div className={styles.AQI_Caricature} />
            </div>
          </div>

          <div className={styles.lastUpdatedTime} id="lastUpdated">
            {activeCity?.last_updatedat
              ? `Last Updated: ${formatLastUpdated(activeCity.last_updatedat)}`
              : ""}
          </div>

          <div className={styles.poweredBy}>
            <AppLink
              href="https://www.aqi.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>powered by</span>
              <Image
                src={`${IMAGE_BASE}/aqi-brand.png`}
                alt="AQI Brand"
                width={53}
                height={26}
              />
            </AppLink>
          </div>
        </div>
      </div>
    </div>
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
