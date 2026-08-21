import { cachedFetch } from "@/lib/server/fileCache";

export const INDIA_AQI_CITIES_API_URL =
  "https://webapi.tv9.com/apis/aqi/generic_aqi_alldetailed_country_India";

const cityListRequests = new Map();

function normalizeIndiaAqiCityList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

export async function fetchIndiaCityList(options = {}) {
  const {
    url = INDIA_AQI_CITIES_API_URL,
    ttl = 300,
    key = "india_aqi_city_list",
  } = options;

  if (!url) return [];

  const requestKey = `${key}:${url}`;
  const cachedRequest = cityListRequests.get(requestKey);
  if (cachedRequest) return cachedRequest;

  const request = cachedFetch(url, { ttl, key })
    .then((payload) => normalizeIndiaAqiCityList(payload))
    .catch((error) => {
      console.error("[fetchIndiaCityList] Error:", error?.message || error);
      return [];
    })
    .finally(() => {
      cityListRequests.delete(requestKey);
    });

  cityListRequests.set(requestKey, request);
  return request;
}
