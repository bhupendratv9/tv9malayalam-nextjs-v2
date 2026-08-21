export const AQI_CITY_CHANGE_EVENT = "aqi:city-change";
export const AQI_CITY_SLUG_SUFFIX = "-air-quality-index-today";
export const DEFAULT_AQI_CITY_SLUG = "new-delhi";

export function cityNameToApiSlug(cityName = "") {
  return String(cityName)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z-]/g, "");
}

export function parseAqiCitySlug(city = "") {
  const normalized = String(city || "")
    .toLowerCase()
    .trim()
    .replace(AQI_CITY_SLUG_SUFFIX, "");

  return normalized || DEFAULT_AQI_CITY_SLUG;
}

export function getStoredAqiCitySlug() {
  if (globalThis.window === undefined) return null;

  try {
    const storedCity = localStorage.getItem("aqiCity");
    return storedCity ? cityNameToApiSlug(storedCity) : null;
  } catch {
    return null;
  }
}

export function resolveAqiCitySlug(queryParams = {}) {
  if (queryParams?.city) {
    return parseAqiCitySlug(queryParams.city);
  }

  return getStoredAqiCitySlug() || DEFAULT_AQI_CITY_SLUG;
}

export function emitAqiCityChange(city) {
  if (typeof globalThis.window === "undefined" || !city) return;

  globalThis.window.dispatchEvent(
    new CustomEvent(AQI_CITY_CHANGE_EVENT, {
      detail: { city },
    })
  );
}

export function subscribeAqiCityChange(handler) {
  if (typeof globalThis.window === "undefined") {
    return () => {};
  }

  const listener = (event) => handler(event);

  globalThis.window.addEventListener(AQI_CITY_CHANGE_EVENT, listener);

  return () => {
    globalThis.window.removeEventListener(AQI_CITY_CHANGE_EVENT, listener);
  };
}
