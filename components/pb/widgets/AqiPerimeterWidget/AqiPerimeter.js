import { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { decodeHtml } from "@/lib/helper/commonHelper";
import styles from "./AqiPerimeter.module.css";
import {
  parseAqiCitySlug,
  resolveAqiCitySlug,
  subscribeAqiCityChange,
} from "@/lib/helper/aqiEvents";
import { ICONS_SVG } from "@/lib/constants";

const DEFAULT_AQI_BASE_API = "https://webapi.tv9.com/apis/aqi";
const DEFAULT_CITY_LANGUAGE = "hi";
const ICON_BASE = ICONS_SVG;

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

const MAIN_POLLUTANTS = [
  {
    key: "pm25",
    headClass: "pm25",
    label: "Particulate Matter",
    code: "(PM2.5)",
    unit: "µg/m³",
    icon: `${ICON_BASE}#pm25_icon`,
  },
  {
    key: "pm10",
    headClass: "pm10",
    label: "Particulate Matter",
    code: "(PM10)",
    unit: "µg/m³",
    icon: `${ICON_BASE}#pm10_icon`,
  },
  {
    key: "co",
    headClass: "co",
    label: "Carbon Monoxide",
    code: "(CO)",
    unit: "ppb",
    icon: `${ICON_BASE}#co_icon`,
  },
  {
    key: "so2",
    headClass: "so2",
    label: "Sulfur Dioxide",
    code: "(SO2)",
    unit: "ppb",
    icon: `${ICON_BASE}#so2_icon`,
  },
  {
    key: "no2",
    headClass: "no2",
    label: "Nitrogen Dioxide",
    code: "(NO2)",
    unit: "ppb",
    icon: `${ICON_BASE}#no2_icon`,
  },
  {
    key: "o3",
    headClass: "o3",
    label: "Ozone",
    code: "(O3)",
    unit: "ppb",
    icon: `${ICON_BASE}#o3_icon`,
  },
];

function formatPollutantValue(value) {
  if (value == null || value === "") return "--";
  return value;
}

function getCityAqiRecord(response) {
  if (!response || !Array.isArray(response.aqidata)) return null;
  return response.aqidata[0] || null;
}

function normalizeNearbyCities(nearby = [], language = DEFAULT_CITY_LANGUAGE) {
  if (!Array.isArray(nearby)) return [];

  return nearby.map((row, index) => ({
    id: `${row.city_name || row.city_hi || "city"}-${index}`,
    rank: index + 1,
    city: getLocalizedCityName(row, language),
    aqi: row.aqi ?? "--",
  }));
}

async function fetchAqiCityData(citySlug, aqiBaseApi) {
  if (!citySlug || !aqiBaseApi) return null;

  try {
    const response = await fetch(`${aqiBaseApi}/${citySlug}`, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching AQI perimeter data:", error);
    return null;
  }
}

export default function AqiPerimeterWidget({
  title = "",
  dataConfig = {},
  queryParams = {},
}) {
  const aqiBaseApi = dataConfig.aqi_base_api || DEFAULT_AQI_BASE_API;
  const cityLanguage = resolveCityLanguage(dataConfig);
  const [citySlug, setCitySlug] = useState(() => resolveAqiCitySlug(queryParams));
  const [aqiResponse, setAqiResponse] = useState(null);

  const mainPollutantsTitle =
    decodeHtml(dataConfig.main_pollutants_title) ||
     "मुख्य वायु प्रदूषक";

  const nearbyPollutedTitle =
    decodeHtml(dataConfig.nearby_polluted_title) ||
    "आसपास के सबसे प्रदूषित स्थान";

  const cityData = useMemo(() => getCityAqiRecord(aqiResponse), [aqiResponse]);
  const nearbyCities = useMemo(
    () => normalizeNearbyCities(cityData?.nearby, cityLanguage),
    [cityData, cityLanguage]
  );

  const loadData = useCallback(
    async (slug) => {
      if (!slug) return;
      const data = await fetchAqiCityData(slug, aqiBaseApi);
      setAqiResponse(data);
    },
    [aqiBaseApi]
  );

  useEffect(() => {
    if (queryParams?.city) {
      setCitySlug(parseAqiCitySlug(queryParams.city));
    }
  }, [queryParams?.city]);

  useEffect(() => {
    if (!citySlug) return;
    loadData(citySlug);
  }, [citySlug, loadData]);

  useEffect(() => {
    if (queryParams?.city) return;

    return subscribeAqiCityChange((event) => {
      setCitySlug(parseAqiCitySlug(event.detail?.city));
    });
  }, [queryParams?.city]);

  return (
    <>
      <div className={styles.AQIperimeterWrap}>
        <div className={styles.container}>
          <div className={styles.AQIperimeterReport}>
            <div className={styles.custom_heading}>
              <h2 className={styles.h1}>{mainPollutantsTitle}</h2>
            </div>

            <div className={styles.perimeterCard}>
              {MAIN_POLLUTANTS.map((pollutant) => (
                <div className={styles.airNumBx} key={pollutant.key}>
                  <div className={`${styles.airHead} ${styles[pollutant.headClass]}`}>
                    {pollutant.label} <span>{pollutant.code}</span>
                  </div>
                  <div className={styles.value}>
                    <svg width={42} height={42}>
                      <use href={pollutant.icon}></use>
                    </svg>
                    <div>
                      {formatPollutantValue(cityData?.[pollutant.key])}
                      <span>{pollutant.unit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.AQIperimeterReport}>
            <div className={styles.custom_heading}>
              <h2 className={styles.h1}>{nearbyPollutedTitle}</h2>
            </div>

            <div className={styles.tableBox}>
              <table>
                <thead>
                  <tr>
                    <th>{dataConfig.rank_label}</th>
                    <th>{dataConfig.city_label}</th>
                    <th>AQI</th>  
                  </tr>
                </thead>

                <tbody>
                  {nearbyCities.length > 0 ? (
                    nearbyCities.map((row) => (
                      <tr key={row.id}>
                        <td>{row.rank}</td>
                        <td>{row.city}</td>
                        <td>
                          <span className={styles[`aqi_${row.rank}`]}>{row.aqi}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} style={{ textAlign: "center" }}>
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .AQIperimeterWrap{margin-bottom:4rem}
        .AQIperimeterWrap .container{width:75.25rem;display:grid;grid-template-columns:repeat(2,1fr);gap:2.5rem;position:relative;z-index:1}
        .AQIperimeterReport .AQIHeading_Wrap{display:flex;justify-content:flex-start;align-items:center;margin-bottom:1.56rem}
        .AQIperimeterReport .AQIHeading_Wrap .h1{color:#16191b;font-size:1.375rem;font-weight:700;line-height:1.875rem;text-transform:capitalize}
        .AQIperimeterReport .perimeterCard{display:grid;grid-template-columns:repeat(2,1fr);gap:30px;background:#fff;border-radius:1.25rem;padding:2.625rem 2.25rem}
        .AQIperimeterReport .perimeterCard .airNumBx{border:1px solid #ebebeb;border-radius:20px}
        .AQIperimeterReport .airHead{padding:1rem;border-radius:20px 20px 0 0;text-align:center;font-size:.875rem;font-weight:600}
        .AQIperimeterReport .airHead span{display:block;font-size:1.25rem}
        .AQIperimeterReport .value{font-size:2.5rem;font-weight:700;text-align:center;padding:1.25rem}
        .AQIperimeterReport .value span{font-size:1.25rem}
        .AQIperimeterReport .pm25{background:#fbe4ef}
        .AQIperimeterReport .pm10{background:#ffe7d8}
        .AQIperimeterReport .co{background:#e5f8e7}
        .AQIperimeterReport .so2{background:#f7f7d4}
        .AQIperimeterReport .no2{background:#eaf5ff}
        .AQIperimeterReport .o3{background:#fff7d8}
        .AQIperimeterReport .table-box{background:#fff;border-radius:1.25rem;padding:1.25rem 1.25rem .5rem 1.25rem}
        .AQIperimeterReport .table-box table{width:100%;border-collapse:collapse;font-size:15px}
        .AQIperimeterReport .table-box table th{text-align:left;padding:.625rem 1rem;font-weight:600;font-size:1.125rem;text-transform:uppercase}
        .AQIperimeterReport .table-box table th:last-child{text-align:center}
        .AQIperimeterReport .table-box table td{padding:.75rem .9375rem;font-size:1rem;font-weight:500}
        .AQIperimeterReport .table-box table tbody tr:nth-child(odd){background-color:#f2f6f8;border-radius:.875rem}
        .AQIperimeterReport .table-box table tbody tr:nth-child(odd) td:first-child{border-top-left-radius:.875rem;border-bottom-left-radius:.875rem}
        .AQIperimeterReport .table-box table tbody tr:nth-child(odd) td:last-child{border-top-right-radius:.875rem;border-bottom-right-radius:.875rem}
        .AQIperimeterReport .table-box table td span{padding:6px 14px;border-radius:.625rem;color:#fff;font-weight:600;font-size:1rem;display:block;text-align:center;line-height:1.25rem}
        .AQIperimeterReport .aqi-1{background:#8e2de2}
        .AQIperimeterReport .aqi-2{background:#d62839}
        .AQIperimeterReport .aqi-3{background:#ff7f50}
        .AQIperimeterReport .aqi-4{background:#f7a400}
        .AQIperimeterReport .aqi-5{background:#8f00ff}
        .AQIperimeterReport .aqi-6{background:#f93822}
        .AQIperimeterReport .aqi-7{background:#8f00ff}
        .AQIperimeterReport .aqi-8{background:#f97316}
        .AQIperimeterReport .aqi-9{background:#fbbf24}
        @media(max-width:767px){
          .AQIperimeterWrap{margin-bottom:2rem}
          .AQIperimeterWrap .container{width:100%;grid-template-columns:1fr;gap:1.5rem;padding:0 1rem}
          .AQIperimeterReport .AQIHeading_Wrap{justify-content:center}
          .AQIperimeterReport .perimeterCard{grid-template-columns:1fr 1fr;gap:.875rem;padding:1.5rem .75rem;border-radius:1rem}
          .AQIperimeterReport .airNumBx{border-radius:16px}
          .AQIperimeterReport .airHead{font-size:.75rem;padding:.75rem}
          .AQIperimeterReport .airHead span{font-size:1rem}
          .AQIperimeterReport .value{font-size:1.75rem;padding:.75rem}
          .AQIperimeterReport .value span{font-size:1rem}
          .AQIperimeterReport .table-box{padding:1rem;border-radius:1rem}
          .AQIperimeterReport .table-box table{font-size:14px}
          .AQIperimeterReport .table-box table th{font-size:1rem;padding:.5rem .5rem}
          .AQIperimeterReport .table-box table td{padding:.6rem .5rem;font-size:.9rem;line-height:1.375rem}
          .AQIperimeterReport .table-box table tbody tr:nth-child(odd) td:first-child{border-top-left-radius:.75rem;border-bottom-left-radius:.75rem}
          .AQIperimeterReport .table-box table tbody tr:nth-child(odd) td:last-child{border-top-right-radius:.75rem;border-bottom-right-radius:.75rem}
          .AQIperimeterReport .table-box table td span{padding:5px 10px;font-size:.85rem;border-radius:.5rem}
        }
      `}</style>
    </>
  );
}

AqiPerimeterWidget.propTypes = {
  title: PropTypes.string,
  dataConfig: PropTypes.shape({
    title: PropTypes.string,
    main_pollutants_title: PropTypes.string,
    nearby_polluted_title: PropTypes.string,
    aqi_base_api: PropTypes.string,
    language: PropTypes.string,
    lang: PropTypes.string,
    city_language: PropTypes.string,
    city_display_language: PropTypes.string,
  }),
  queryParams: PropTypes.object,
};
