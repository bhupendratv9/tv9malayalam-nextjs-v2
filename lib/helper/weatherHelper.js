import weatherLabelsData from "./weatherLabels.json";

export const DEFAULT_WEATHER_SITE = "tv9tamilnews";
export const WEATHER_ICON_BASE = "https://static.tv9hindi.com/images/weather";
export const WEATHER_FORECAST_SLUG_SUFFIX = "-weather-update";
export const DEFAULT_WEATHER_CITY_SLUG = "chennai";
export const WEATHER_API_BASE = "https://webapi.tv9.com/apis/aqi/weather";

const POPULAR_CITY_NAMES_BY_SITE = {
  tv9hindi: [
    "New Delhi",
    "Mumbai",
    "Kolkata",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
  ],
  tv9tamilnews: [
    "Chennai",
    "Madurai",
    "Coimbatore",
    "Salem",
    "Vellore",
    "Tiruppur",
    "Erode",
    "Puducherry",
  ],
  tv9telugu: [
    "Hyderabad",
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Warangal",
    "Tirupati",
    "Kakinada",
  ],
  tv9marathi: [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Nashik",
    "Aurangabad",
    "Solapur",
    "Kolhapur",
    "Thane",
  ],
};

export function getPopularCityNames(siteName = DEFAULT_WEATHER_SITE) {
  const normalizedSite = String(siteName || DEFAULT_WEATHER_SITE).trim() || DEFAULT_WEATHER_SITE;
  return (
    POPULAR_CITY_NAMES_BY_SITE[normalizedSite] ||
    POPULAR_CITY_NAMES_BY_SITE[DEFAULT_WEATHER_SITE] ||
    []
  );
}

export const POPULAR_CITY_NAMES = getPopularCityNames(DEFAULT_WEATHER_SITE);

export function resolveStationLocalizedName(record = {}, language = "en") {
  const lang = String(language || "en").trim().toLowerCase() || "en";
  const station = record.Station || record.station || record.city_name || "";

  if (!station) return "";

  if (lang === "en") {
    return station;
  }

  if (lang === "hi") {
    return record.Station_hi || record.station_hi || record.city_hi || station;
  }

  const stationLangKey = `Station_${lang}`;
  const stationLangKeyLower = `station_${lang}`;
  const cityLangKey = `city_${lang}`;

  return (
    record[stationLangKey] ||
    record[stationLangKeyLower] ||
    record[cityLangKey] ||
    station
  );
}

export function resolvePopularCityDisplayName(
  englishName,
  language = "en",
  apiRecord = null
) {
  const name = String(englishName || "").trim();
  if (!name) return "";

  if (apiRecord) {
    return resolveStationLocalizedName(apiRecord, language) || name;
  }

  return name;
}

const labelsBySite = Array.isArray(weatherLabelsData)
  ? weatherLabelsData[0] || {}
  : weatherLabelsData;

export function getWeatherLabels(siteName = DEFAULT_WEATHER_SITE) {
  return labelsBySite[siteName] || labelsBySite[DEFAULT_WEATHER_SITE] || {};
}

export function getWeatherLabel(key, siteName = DEFAULT_WEATHER_SITE, fallback = "") {
  const labels = getWeatherLabels(siteName);
  return labels[key] || fallback || key;
}

export function translateWeatherText(value, siteName = DEFAULT_WEATHER_SITE) {
  if (!value) return "";
  const labels = getWeatherLabels(siteName);
  return labels[value] || value;
}

export function stationNameToSlug(station = "") {
  return String(station)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function parseWeatherCitySlug(city = "") {
  const normalized = String(city || "")
    .toLowerCase()
    .trim()
    .replace(WEATHER_FORECAST_SLUG_SUFFIX, "");

  return normalized || DEFAULT_WEATHER_CITY_SLUG;
}

export function resolveWeatherCitySlug(queryParams = {}) {
  if (queryParams?.city) {
    return parseWeatherCitySlug(queryParams.city);
  }

  if (queryParams?.citySlug) {
    return parseWeatherCitySlug(queryParams.citySlug);
  }

  if (queryParams?.nameSlug) {
    return parseWeatherCitySlug(queryParams.nameSlug);
  }

  return DEFAULT_WEATHER_CITY_SLUG;
}

export function needsWeatherCitySlug(endpoint = "") {
  const normalized = String(endpoint || "").trim().replace(/\/+$/, "");
  if (!normalized.includes("/apis/aqi/weather")) return false;

  const weatherPath = normalized.split("/apis/aqi/weather")[1] || "";
  return !weatherPath || weatherPath === "/";
}

export function buildWeatherCityApiUrl(
  baseUrl = WEATHER_API_BASE,
  citySlug = DEFAULT_WEATHER_CITY_SLUG
) {
  const normalized = String(baseUrl || WEATHER_API_BASE).trim().replace(/\/+$/, "");
  const slug = citySlug || DEFAULT_WEATHER_CITY_SLUG;

  if (!needsWeatherCitySlug(normalized)) {
    return normalized;
  }

  return `${normalized}/${slug}`;
}

export function formatWeatherTemperature(value) {
  const temp = Number(value);
  if (Number.isNaN(temp)) return "--";
  return `${Math.round(temp)}°C`;
}

function formatForecastSliderTemperature(value) {
  const temp = Number(value);
  if (Number.isNaN(temp)) return "--";
  return `${Math.trunc(temp)}°C`;
}

function formatForecastSliderHumidity(value) {
  if (value === null || value === undefined) return "--";
  const humidity = Number(value);
  if (Number.isNaN(humidity)) return "--";
  return `${Math.trunc(humidity)}%`;
}

export function formatWeatherLastUpdated(isoValue, siteName = DEFAULT_WEATHER_SITE) {
  if (!isoValue) return "";

  const parsed = new Date(isoValue);
  if (Number.isNaN(parsed.getTime())) return "";

  const pad = (num) => String(num).padStart(2, "0");
  const formatted = `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())} ${pad(parsed.getHours())}:${pad(parsed.getMinutes())}`;
  const prefix = getWeatherLabel("last-updated", siteName);
  const localTime = getWeatherLabel("local-time", siteName);

  return `${prefix}: ${formatted} (${localTime})`;
}

export function buildWeatherCityUrl(station = "") {
  const slug = stationNameToSlug(station);
  if (!slug) return "/weather-forecast";
  return `/weather-forecast/${slug}${WEATHER_FORECAST_SLUG_SUFFIX}`;
}

export function resolveWeatherIconSrc(iconValue) {
  if (!iconValue) return `${WEATHER_ICON_BASE}/1.svg`;

  const value = String(iconValue);
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `${WEATHER_ICON_BASE}/${value}`;
}

function resolveHotColdCityName(record = {}, language = "en") {
  return resolveStationLocalizedName(record, language);
}

export function mapHotColdApiRow(
  record,
  siteName = DEFAULT_WEATHER_SITE,
  language = "en"
) {
  if (!record?.Station) return null;

  return {
    rank: record.rn || 0,
    slug: stationNameToSlug(record.Station),
    name: resolveHotColdCityName(record, language),
    temp: formatWeatherTemperature(record.temp),
    status: translateWeatherText(record.weather, siteName),
    icon: resolveWeatherIconSrc(record.condition_icon),
    condition: translateWeatherText(record.condition_text, siteName),
  };
}

export function getHotColdTableLabels(siteName = DEFAULT_WEATHER_SITE) {
  return {
    rank: getWeatherLabel("rank", siteName),
    city: getWeatherLabel("city", siteName),
    temperature: getWeatherLabel("temperature", siteName),
    status: getWeatherLabel("status", siteName),
    weatherCondition: getWeatherLabel("weather-condition", siteName),
  };
}

export function getHotColdHeadingLabels(siteName = DEFAULT_WEATHER_SITE) {
  const indiaLabel = getWeatherLabel("india", siteName);
  const hottestLabel = getWeatherLabel("hottest", siteName);
  const coldestLabel = getWeatherLabel("coldest", siteName);
  const cityLabel = getWeatherLabel("city", siteName);

  return {
    hottestLabel,
    coldestLabel,
    hottestHeading: `${indiaLabel} ${hottestLabel} ${cityLabel}`,
    coldestHeading: `${indiaLabel} ${coldestLabel} ${cityLabel}`,
  };
}

export function buildHotColdWidgetData(
  items = [],
  siteName = DEFAULT_WEATHER_SITE,
  language = "en"
) {
  const payload = Array.isArray(items) ? items[0] || {} : {};
  const hotcities = Array.isArray(payload.hotcities) ? payload.hotcities : [];
  const coldcities = Array.isArray(payload.coldcities) ? payload.coldcities : [];

  return {
    hottestTableRows: hotcities
      .map((item) => mapHotColdApiRow(item, siteName, language))
      .filter(Boolean),
    coldestTableRows: coldcities
      .map((item) => mapHotColdApiRow(item, siteName, language))
      .filter(Boolean),
    hottestLastUpdated: formatWeatherLastUpdated(hotcities[0]?.lastupdated, siteName),
    coldestLastUpdated: formatWeatherLastUpdated(coldcities[0]?.lastupdated, siteName),
  };
}

function normalizeWeatherCityRecord(record = {}) {
  if (!record || typeof record !== "object") return null;

  const station = record.Station || record.station || record.city_name || "";
  if (!station) return null;

  return {
    station,
    stationHi: record.Station_hi || record.station_hi || record.city_hi || station,
    raw: record,
    temperature: Number(record.Temperature ?? record.temperature ?? record.temp),
    weatherIcon: record["Weather-icon"] || record.weather_icon || record.icon || "1.svg",
    weatherCode: record["Weather-Code"] || record.weather_code || record.condition_text || "",
    humidity: record.Humidity ?? record.humidity,
  };
}

function getWeatherCityList(response) {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  if (Array.isArray(response.data)) return response.data;
  return [];
}

export function buildWeatherCityLookup(response) {
  const lookup = new Map();

  getWeatherCityList(response).forEach((record) => {
    const station = record?.Station || record?.station || record?.city_name || "";
    if (!station) return;
    lookup.set(String(station).toLowerCase(), record);
  });

  return lookup;
}

export function buildPopularCityCards(
  cities = [],
  selectedCityNames,
  siteName = DEFAULT_WEATHER_SITE,
  language = "en"
) {
  const cityList = getWeatherCityList(cities);
  const lookup = new Map();
  const resolvedCityNames = selectedCityNames || getPopularCityNames(siteName);

  cityList.forEach((record) => {
    const city = normalizeWeatherCityRecord(record);
    if (!city) return;
    lookup.set(city.station.toLowerCase(), city);
  });

  return resolvedCityNames
    .map((name) => lookup.get(String(name).toLowerCase()))
    .filter(Boolean)
    .map((city) => ({
      slug: stationNameToSlug(city.station),
      name: resolvePopularCityDisplayName(city.station, language, city.raw),
      temp: formatWeatherTemperature(city.temperature),
      weatherIcon: city.weatherIcon,
      condition: translateWeatherText(city.weatherCode, siteName),
      humidity:
        city.humidity === null || city.humidity === undefined
          ? "--"
          : `${city.humidity}%`,
    }));
}

function unwrapWeatherDetailPayload(payload) {
  if (!payload) return null;
  if (Array.isArray(payload)) return unwrapWeatherDetailPayload(payload[0]);
  if (payload.daily_forecast || payload.weatherdata) return payload;
  if (payload.data && typeof payload.data === "object") {
    return unwrapWeatherDetailPayload(payload.data);
  }
  return null;
}

export function resolveWeatherApiPayload(data, items = []) {
  const candidates = [data];
  if (Array.isArray(items) && items.length === 1) candidates.push(items[0]);
  if (Array.isArray(items) && items.length) candidates.push(items);

  for (const candidate of candidates) {
    if (candidate && unwrapWeatherDetailPayload(candidate)) {
      return candidate;
    }
  }

  return data ?? (Array.isArray(items) && items.length ? items[0] : null);
}

function hasCurrentWeatherRecord(record) {
  if (!record || typeof record !== "object") return false;
  return (
    record.temp_c !== null &&
    record.temp_c !== undefined &&
    !Number.isNaN(Number(record.temp_c))
  );
}

function formatHourlyTemperature(value) {
  const temp = Number(value);
  if (Number.isNaN(temp)) return "--";
  return `${Math.round(temp * 10) / 10}°C`;
}

function formatWindSpeedDirection(windKph, windDir) {
  const speed = Number(windKph);
  if (Number.isNaN(speed)) return "--";
  return `${speed} kmph / ${windDir || ""}`.trim();
}

function parseForecastDateParts(dateValue) {
  if (!dateValue) return { dateDay: "", dateMonth: "" };
  const parts = String(dateValue).trim().split(/\s+/);
  return {
    dateDay: parts[0] || "",
    dateMonth: parts[1] || "",
  };
}

function buildForecastConditionNote(condition, humidity, siteName = DEFAULT_WEATHER_SITE) {
  const template = getWeatherLabel("expected-and-humidity", siteName);
  if (template && condition && humidity !== null && humidity !== undefined) {
    const humidityValue = String(Math.trunc(Number(humidity)));
    return template
      .replaceAll("%s", condition)
      .replaceAll("%d", humidityValue)
      .replaceAll("%%", "%");
  }
  return condition || "";
}

export function mapHourlyForecastRow(row = {}, siteName = DEFAULT_WEATHER_SITE) {
  return {
    time: row.displaytime || "",
    icon: row.condition_icon || "",
    condition: translateWeatherText(row.condition_text, siteName),
    temperature: formatHourlyTemperature(row.temp_c),
    humidity: row.humidity === null || row.humidity === undefined ? "--" : `${row.humidity}%`,
    uv: row.uv === null || row.uv === undefined ? "--" : String(row.uv),
    wind: formatWindSpeedDirection(row.wind_kph, row.wind_dir),
  };
}

export function mapDailyForecastDay(day = {}, siteName = DEFAULT_WEATHER_SITE) {
  const { dateDay, dateMonth } = parseForecastDateParts(day.date);
  const condition = translateWeatherText(day.condition_text, siteName);
  const humidity = day.avghumidity;

  return {
    dayLabel: translateWeatherText(day.displaydate, siteName),
    icon: day.condition_icon || "",
    temp: formatForecastSliderTemperature(day.avgtemp_c),
    humidity: formatForecastSliderHumidity(humidity),
    dateDay,
    dateMonth,
    condition,
    conditionNote: buildForecastConditionNote(condition, humidity, siteName),
    highLow: `${formatWeatherTemperature(day.maxtemp_c)} / ${formatWeatherTemperature(day.mintemp_c)}`,
    humidityDetail: humidity === null || humidity === undefined ? "--" : `${humidity}%`,
    precipitation: `${Number(day.totalprecip_mm ?? 0).toFixed(2)} mm`,
    sunrise: day.sunrise || "",
    sunset: day.sunset || "",
    arcPercent: Number(day.day_completed_percentage) || 0,
    daylightLabel: day.day_duration || "",
    hourly: Array.isArray(day.hourly_forecast)
      ? day.hourly_forecast.map((row) => mapHourlyForecastRow(row, siteName))
      : [],
  };
}

export function mapCurrentWeatherData(record = {}, siteName = DEFAULT_WEATHER_SITE) {
  if (!hasCurrentWeatherRecord(record)) return null;

  return {
    tempC: record.temp_c,
    temp: formatWeatherTemperature(record.temp_c),
    humidity: record.humidity === null || record.humidity === undefined ? "--" : `${record.humidity}%`,
    condition: translateWeatherText(record.condition_text, siteName),
    conditionIcon: resolveWeatherIconSrc(record.condition_icon),
    feelsLike: formatWeatherTemperature(record.feelslike_c),
    uv: record.uv,
    uvCondition: record.uv_condition || "",
    windKph: record.wind_kph,
    windDir: record.wind_dir,
    windDegree: record.wind_degree,
    gustKph: record.gust_kph,
    cloud: record.cloud,
    visKm: record.vis_km,
    pressureMb: record.pressure_mb,
    precipMm: record.precip_mm,
    weatherCode: translateWeatherText(record.weathercode, siteName),
    backgroundImage: record.condition_bg || "",
    temperatureLevelIcon: record.weathericon || "",
    lastUpdated: record.last_updatedat || "",
  };
}

function formatWeatherMetric(value, decimals = 1) {
  const num = Number(value);
  if (Number.isNaN(num)) return "--";
  return num.toFixed(decimals);
}

function buildWindDescription(windKph, gustKph, siteName = DEFAULT_WEATHER_SITE) {
  const template = getWeatherLabel("wind-description", siteName);
  if (!template) return "";
  const wind = Number(windKph);
  const gust = Number(gustKph);
  if (Number.isNaN(wind) || Number.isNaN(gust)) return "";
  return template.replace("%.1f", wind.toFixed(1)).replace("%.1f", gust.toFixed(1));
}

function buildCloudDescription(visKm, cloudPercent, siteName = DEFAULT_WEATHER_SITE) {
  const template = getWeatherLabel("cloud-description", siteName);
  if (!template) return "";
  return template
    .replace("%d", String(Math.round(Number(visKm) || 0)))
    .replace("%d", String(Math.round(Number(cloudPercent) || 0)))
    .replaceAll("%%", "%");
}

function buildPrecipitationDescription(precipMm, siteName = DEFAULT_WEATHER_SITE) {
  const template = getWeatherLabel("precipitation-desc", siteName);
  if (!template) return "";
  return template.replace("%.2f", Number(precipMm ?? 0).toFixed(2));
}

function buildPressureDescription(pressureMb, siteName = DEFAULT_WEATHER_SITE) {
  const template = getWeatherLabel("pressure-description", siteName);
  if (!template) return "";
  return template.replace("%d", String(Math.round(Number(pressureMb) || 0)));
}

function buildUvDescription(uv, siteName = DEFAULT_WEATHER_SITE) {
  const template = getWeatherLabel("present-uv-index", siteName);
  if (!template) return "";
  const uvNum = Number(uv);
  if (Number.isNaN(uvNum)) return "";
  return template.replace("%.1f", uvNum.toFixed(1));
}

export function getUvBarState(uvIndex) {
  const uv = Number(uvIndex);
  if (Number.isNaN(uv)) {
    return { leftPercent: 0, thumbColor: "#6dd400" };
  }
  if (uv <= 2) return { leftPercent: 5, thumbColor: "#6dd400" };
  if (uv <= 5) return { leftPercent: 25, thumbColor: "#f7e400" };
  if (uv <= 7) return { leftPercent: 50, thumbColor: "#f88800" };
  if (uv <= 10) return { leftPercent: 75, thumbColor: "#f70000" };
  return { leftPercent: 90, thumbColor: "#b400f7" };
}

export function getPressureThumbPercent(pressureMb, min = 990, max = 1020) {
  const value = Number(pressureMb);
  if (Number.isNaN(value)) return 0;
  return ((value - min) / (max - min)) * 100;
}

export function mapCityWeatherConditionData(record = {}, siteName = DEFAULT_WEATHER_SITE) {
  if (!hasCurrentWeatherRecord(record)) return null;

  const windKph = record.wind_kph;
  const gustKph = record.gust_kph;
  const cloud = Number(record.cloud) || 0;
  const visKm = record.vis_km;
  const precipMm = record.precip_mm ?? 0;
  const pressureMb = record.pressure_mb;
  const uv = record.uv;
  const uvCondition = translateWeatherText(record.uv_condition, siteName) || record.uv_condition || "";

  return {
    windSpeed: formatWeatherMetric(windKph),
    gustSpeed: formatWeatherMetric(gustKph),
    windDegree: Number.isNaN(Number(record.wind_degree)) ? "--" : String(Math.round(Number(record.wind_degree))),
    windDir: record.wind_dir || "",
    cloudCover: `${cloud}%`,
    visibility: Number.isNaN(Number(visKm)) ? "--" : String(visKm),
    precipitation: formatWeatherMetric(precipMm, Number(precipMm) % 1 === 0 ? 0 : 1),
    pressure: Number.isNaN(Number(pressureMb)) ? "--" : String(Math.round(Number(pressureMb))),
    uvIndex: formatWeatherMetric(uv),
    uvCondition,
    windDescription: buildWindDescription(windKph, gustKph, siteName),
    cloudDescription: buildCloudDescription(visKm, cloud, siteName),
    precipitationDescription: buildPrecipitationDescription(precipMm, siteName),
    pressureDescription: buildPressureDescription(pressureMb, siteName),
    uvDescription: buildUvDescription(uv, siteName),
  };
}

export function buildCityWeatherConditionWidgetData(
  payload,
  siteName = DEFAULT_WEATHER_SITE,
  lang = "en"
) {
  const source = unwrapWeatherDetailPayload(payload);

  if (!source) {
    return { cityName: "", conditions: null };
  }

  const weatherRecord = Array.isArray(source.weatherdata) ? source.weatherdata[0] : null;

  return {
    cityName: resolveCityLocalizedName(source, lang),
    conditions: mapCityWeatherConditionData(weatherRecord, siteName),
  };
}

export function buildDayWiseForecastWidgetData(
  payload,
  siteName = DEFAULT_WEATHER_SITE,
  lang = "en"
) {
  const source = unwrapWeatherDetailPayload(payload);

  if (!source) {
    return {
      cityName: "",
      forecastDays: [],
    };
  }

  const dailyForecast = Array.isArray(source.daily_forecast) ? source.daily_forecast : [];

  return {
    cityName: resolveCityLocalizedName(source, lang),
    forecastDays: dailyForecast.map((day) => mapDailyForecastDay(day, siteName)),
  };
}

const weatherPayloadRequests = new Map();

async function fetchWeatherCityPayload(url) {
  if (!url) return null;

  const cached = weatherPayloadRequests.get(url);
  if (cached) return cached;

  const request = fetch(url)
    .then((response) => (response.ok ? response.json() : null))
    .catch(() => null);

  weatherPayloadRequests.set(url, request);
  return request;
}

export function resolveWeatherForecastEndpoint(dataConfig = {}, queryParams = {}) {
  const base = dataConfig.weather_api_url || dataConfig.endpoint || WEATHER_API_BASE;
  if (!base) return "";
  return buildWeatherCityApiUrl(base, resolveWeatherCitySlug(queryParams));
}

export function resolveCityLocalizedName(source = {}, lang = "en") {
  const normalizedLang = String(lang || "en").trim().toLowerCase() || "en";
  const localizedKey = `city_${normalizedLang}`;

  if (normalizedLang === "hi") {
    return source.city_hi || source.city_name || "";
  }

  if (normalizedLang === "en") {
    return source.city_name || source.city_hi || "";
  }

  return (
    source[localizedKey] ||
    source.city_name ||
    source.city_hi ||
    ""
  );
}

function formatHourlySliderTemperature(value) {
  const temp = Number(value);
  if (Number.isNaN(temp)) return "--";
  const rounded = Math.round(temp * 10) / 10;
  return `${rounded}°`;
}

export function filterHourlyForecastRows(rows = []) {
  if (!Array.isArray(rows)) return [];

  return rows.filter(
    (row) =>
      row &&
      typeof row === "object" &&
      Object.keys(row).length > 0 &&
      (row.displaytime || row.time || row.temp_c !== undefined)
  );
}

export function buildTodaysWeatherInCityWidgetData(
  payload,
  siteName = DEFAULT_WEATHER_SITE,
  lang = "en"
) {
  const source = unwrapWeatherDetailPayload(payload);

  if (!source) {
    return {
      cityName: "",
      current: null,
      hourlySlides: [],
      lastUpdated: "",
      aqi: {},
      apiCityName: "",
    };
  }

  const weatherRecord = Array.isArray(source.weatherdata) ? source.weatherdata[0] : null;
  const current = mapCurrentWeatherData(weatherRecord, siteName);
  const hourlySlides = filterHourlyForecastRows(source.hourly_forecast).map((row, index) => ({
    key: row.time || `${row.displaytime || "hour"}-${index}`,
    time: row.displaytime || "",
    icon: resolveWeatherIconSrc(row.condition_icon),
    temp: formatHourlySliderTemperature(row.temp_c),
  }));

  return {
    cityName: resolveCityLocalizedName(source, lang),
    current,
    hourlySlides,
    lastUpdated: formatWeatherLastUpdated(
      source.lastupdated || weatherRecord?.last_updatedat,
      siteName
    ),
    aqi: Array.isArray(source.aqidata) ? source.aqidata[0] || {} : {},
    apiCityName: source.city_name || "",
  };
}

export async function fetchTodaysWeatherInCity(
  dataConfig = {},
  queryParams = {},
  siteName = DEFAULT_WEATHER_SITE,
  lang = "en"
) {
  const url = resolveWeatherForecastEndpoint(dataConfig, queryParams);
  if (!url) {
    return buildTodaysWeatherInCityWidgetData(null, siteName, lang);
  }

  const json = await fetchWeatherCityPayload(url);
  return buildTodaysWeatherInCityWidgetData(json, siteName, lang);
}

export async function fetchCityWeatherCondition(
  dataConfig = {},
  queryParams = {},
  siteName = DEFAULT_WEATHER_SITE,
  lang = "en"
) {
  const url = resolveWeatherForecastEndpoint(dataConfig, queryParams);
  if (!url) {
    return buildCityWeatherConditionWidgetData(null, siteName, lang);
  }

  const json = await fetchWeatherCityPayload(url);
  return buildCityWeatherConditionWidgetData(json, siteName, lang);
}

export async function fetchWeatherDayWiseForecast(
  dataConfig = {},
  queryParams = {},
  siteName = DEFAULT_WEATHER_SITE,
  lang = "en"
) {
  const url = resolveWeatherForecastEndpoint(dataConfig, queryParams);
  if (!url) {
    return buildDayWiseForecastWidgetData(null, siteName, lang);
  }

  const json = await fetchWeatherCityPayload(url);
  return buildDayWiseForecastWidgetData(json, siteName, lang);
}
