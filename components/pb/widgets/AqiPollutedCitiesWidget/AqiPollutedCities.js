import PropTypes from "prop-types";
import AppLink from "@/components/AppLink";
import styles from "./AqiPollutedCities.module.css";

const DEFAULT_CITY_LANGUAGE = "hi";

function getCityUrlSlug(slug = "") {
  const parts = String(slug).split("/").filter(Boolean);
  return parts.at(-1) || slug;
}

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

function getLocalizedCityName(item = {}, language = DEFAULT_CITY_LANGUAGE) {
  const normalizedLanguage = String(language || DEFAULT_CITY_LANGUAGE)
    .trim()
    .toLowerCase();

  if (normalizedLanguage === "en") {
    return item.city_name || item.city_hi || item.city || "";
  }

  if (normalizedLanguage === "hi") {
    return item.city_hi || item.city_name || item.city || "";
  }

  const localizedKey = `city_${normalizedLanguage}`;
  return item[localizedKey] || item.city_hi || item.city_name || item.city || "";
}

function normalizeCityList(list = [], language = DEFAULT_CITY_LANGUAGE) {
  return list.map((item, index) => ({
    rank: index + 1,
    city: getLocalizedCityName(item, language),
    slug: getCityUrlSlug(item.slug),
    aqi: item.aqi ?? "",
    key: item.slug || `${item.city_name || item.city_hi || "city"}-${index}`,
  }));
}

function getCityLists(data, response, language = DEFAULT_CITY_LANGUAGE) {
  const sources = [data, data?.data, response, response?.data];

  for (const source of sources) {
    if (!source) continue;

    if (Array.isArray(source.highest) || Array.isArray(source.lowest)) {
      return {
        highest: normalizeCityList(source.highest || [], language),
        lowest: normalizeCityList(source.lowest || [], language),
      };
    }
  }

  return { highest: [], lowest: [] };
}

function CityTable({ cities = [], type = "highest" }) {
  if (!cities.length) {
    return null;
  }

  const tableClass =
    type === "lowest" ? styles.leastPollutedCityTable : styles.mostPollutedCityTable;

  return (
    <div className={`${styles.cityWiseTable_Ranking} ${tableClass}`}>
      <table>
        <thead>
          <tr>
            <th>தரவரிசை</th>
            <th>நகரம்</th>
            <th>AQI</th>
          </tr>
        </thead>

        <tbody>
          {cities.map((city) => (
            <tr key={city.key}>
              <td>{city.rank}</td>
              <td>
                <AppLink href={`/aqi/${city.slug}-air-quality-index-today`}>
                  {city.city}
                </AppLink>
              </td>
              <td>{city.aqi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

CityTable.propTypes = {
  cities: PropTypes.array,
  type: PropTypes.oneOf(["highest", "lowest"]),
};

export default function AqiPollutedCitiesWidget({
  data = null,
  response = null,
  dataConfig = {},
}) {
  const cityLanguage = resolveCityLanguage(dataConfig);
  const { highest: mostPollutedCities, lowest: leastPollutedCities } =
    getCityLists(data, response, cityLanguage);

  if (!mostPollutedCities.length && !leastPollutedCities.length) {
    return null;
  }

  const highestTitle =
    dataConfig.title_less_populated_city || "மிகவும் மாசுபட்ட நகரங்கள்";
  const lowestTitle =
    dataConfig.title_highest_populated_city || "குறைந்த மாசுபட்ட நகரங்கள்";

  return (
    <div className={styles.pollutedCitiesWidget_Wrapper}>
      <div className={styles.container}>
        {mostPollutedCities.length > 0 && (
          <div className={styles.pollutedCity_Wrap}>
            <div className={styles.custom_heading}>
              <h2 className={styles.h1}>{highestTitle}</h2>
            </div>
            <CityTable cities={mostPollutedCities} type="highest" />
          </div>
        )}

        {leastPollutedCities.length > 0 && (
          <div className={styles.pollutedCity_Wrap}>
            <div className={styles.custom_heading}>
              <h2 className={styles.h1}>{lowestTitle}</h2>
            </div>
            <CityTable cities={leastPollutedCities} type="lowest" />
          </div>
        )}
      </div>
    </div>
  );
}

AqiPollutedCitiesWidget.propTypes = {
  data: PropTypes.object,
  response: PropTypes.object,
  dataConfig: PropTypes.shape({
    highest_title: PropTypes.string,
    lowest_title: PropTypes.string,
  }),
};
