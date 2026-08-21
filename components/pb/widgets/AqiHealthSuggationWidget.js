import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import { decodeHtml } from "@/lib/helper/commonHelper";
import {
  cityNameToApiSlug,
  DEFAULT_AQI_CITY_SLUG,
  parseAqiCitySlug,
  resolveAqiCitySlug,
  subscribeAqiCityChange,
} from "@/lib/helper/aqiEvents";

const DEFAULT_AQI_BASE_API = "https://webapi.tv9.com/apis/aqi";
const IMAGE_BASE = "https://images.tv9hindi.com/images/aqi-images";
const DEFAULT_CITY_HI = "नई दिल्ली";
const DEFAULT_HEALTH_ADVICE_SUFFIX = "में रहने वाले लोगों के लिए स्वास्थ्य सलाह";
const DEFAULT_PER_DAY_TEXT = "प्रतिदिन जितनी सिगरेट के बराबर";
const DEFAULT_WEEKLY_TEXT = "साप्ताहिक सिगरेट के बराबर";
const DEFAULT_YEARLY_TEXT = "वार्षिक सिगरेट के बराबर";
const DEFAULT_CONTENT_TEXT1 = "इस जगह की हवा में सांस लेना प्रतिदिन";
const DEFAULT_CONTENT_TEXT2 = "सिगरेट पीने जितना हानिकारक है।";
const DEFAULT_DISCLAIMER_TEXT =
  "सिगरेट-समतुल्य अनुमान पिछले 24 घंटों में PM2.5 के औसत स्तर पर आधारित है और यह मानकर चलता है कि इस दौरान लगातार एक्सपोज़र हुआ है।";

const AQI_CATEGORIES = [
  { min: 0, max: 50, category: "Good", range: "0-50" },
  { min: 51, max: 100, category: "Moderate", range: "51-100" },
  { min: 101, max: 150, category: "Poor", range: "101-150" },
  { min: 151, max: 200, category: "Unhealthy", range: "151-200" },
  { min: 201, max: 300, category: "Severe", range: "201-300" },
  { min: 301, max: 2000, category: "Hazardous", range: "301-500+" },
];

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

function formatCigaretteValue(value) {
  if (value == null || value === "") return "--";
  return value;
}

function getCityAqiRecord(response) {
  if (!response || !Array.isArray(response.aqidata)) return null;
  return response.aqidata[0] || null;
}

function getFallbackCityLabel(citySlug) {
  if (!citySlug || citySlug === DEFAULT_AQI_CITY_SLUG) {
    return DEFAULT_CITY_HI;
  }

  return citySlug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
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
    console.error("Error fetching AQI health advice data:", error);
    return null;
  }
}

export default function AqiHealthSuggationWidget({
  dataConfig = {},
  queryParams = {},
}) {
  const titleSuffix =
    decodeHtml(dataConfig.health_advice_title) || DEFAULT_HEALTH_ADVICE_SUFFIX;
  const perDayText = decodeHtml(dataConfig.per_day_text) || DEFAULT_PER_DAY_TEXT;
  const weeklyText = decodeHtml(dataConfig.weekly_text) || DEFAULT_WEEKLY_TEXT;
  const yearlyText = decodeHtml(dataConfig.yearly_text) || DEFAULT_YEARLY_TEXT;
  const contentText1 = decodeHtml(dataConfig.content_text1) || DEFAULT_CONTENT_TEXT1;
  const contentText2 = decodeHtml(dataConfig.content_text2) || DEFAULT_CONTENT_TEXT2;
  const disclaimerText =
    decodeHtml(dataConfig.disclaimer_text || dataConfig.disclaimer) ||
    DEFAULT_DISCLAIMER_TEXT;

  const aqiBaseApi = dataConfig.aqi_base_api || DEFAULT_AQI_BASE_API;
  const [citySlug, setCitySlug] = useState(() => resolveAqiCitySlug(queryParams));
  const [aqiResponse, setAqiResponse] = useState(null);

  const cityRecord = useMemo(() => getCityAqiRecord(aqiResponse), [aqiResponse]);
  const cityHi =
    aqiResponse?.city_hi ||
    cityRecord?.city_hi ||
    getFallbackCityLabel(citySlug);
  const aqiCategory = useMemo(
    () => getAQICategory(cityRecord?.aqi),
    [cityRecord?.aqi]
  );

  const cigarettesDay = formatCigaretteValue(cityRecord?.cigarettesday);
  const cigarettesWeek = formatCigaretteValue(cityRecord?.cigarettesweek);
  const cigarettesYear = formatCigaretteValue(cityRecord?.cigarettesyear);

  const headingTitle = `${cityHi} ${titleSuffix}`;

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
      const city = event.detail?.city;
      if (!city) return;
      setCitySlug(cityNameToApiSlug(city));
    });
  }, [queryParams?.city]);

  return (
    <div className="healthWrapper">
      <div className="container">
        <div className="healthadvice">
          <Image
            src={`${IMAGE_BASE}/healthadvice-icon.svg`}
            alt={aqiCategory.category}
            width={60}
            height={60}
          />
        </div>

        <div className="AQIHeading_Wrap">
          <h2 className="h1">{headingTitle}</h2>
        </div>

        <div className="dailyHealthWrap">
          <div className="imageWrap">
            <Image
              src={`${IMAGE_BASE}/cigarette.png`}
              alt={`${aqiCategory.category}(${aqiCategory.range})`}
              width={300}
              height={300}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <div className="healthWrap">
            <div className="healthupdate">
              <figure>
                <div className="numbers">{cigarettesDay}</div>
                <div className="text">{perDayText}</div>
              </figure>
              <figure>
                <div className="numbers">{cigarettesWeek}</div>
                <div className="text">{weeklyText}</div>
              </figure>
              <figure>
                <div className="numbers">{cigarettesYear}</div>
                <div className="text">{yearlyText}</div>
              </figure>
            </div>

            <span>
              {contentText1} {cigarettesDay} {contentText2}
            </span>

            <p>Disclaimer: {disclaimerText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

AqiHealthSuggationWidget.propTypes = {
  dataConfig: PropTypes.object,
  queryParams: PropTypes.object,
};
