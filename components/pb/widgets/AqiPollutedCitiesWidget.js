import PropTypes from "prop-types";

function getCityUrlSlug(slug = "") {
  const parts = String(slug).split("/").filter(Boolean);
  return parts.at(-1) || slug;
}

function normalizeCityList(list = []) {
  return list.map((item, index) => ({
    rank: index + 1,
    city: item.city_hi || item.city_name || item.city || "",
    slug: getCityUrlSlug(item.slug),
    aqi: item.aqi ?? "",
    key: item.slug || `${item.city_name || item.city_hi || "city"}-${index}`,
  }));
}

function getCityLists(data, response) {
  const sources = [data, data?.data, response, response?.data];

  for (const source of sources) {
    if (!source) continue;

    if (Array.isArray(source.highest) || Array.isArray(source.lowest)) {
      return {
        highest: normalizeCityList(source.highest || []),
        lowest: normalizeCityList(source.lowest || []),
      };
    }
  }

  return { highest: [], lowest: [] };
}

function CityTable({ cities = [] }) {
  if (!cities.length) {
    return null;
  }

  return (
    <div className="cityWiseTable_Ranking">
      <table>
        <thead>
          <tr>
            <th>रैंक</th>
            <th>शहर</th>
            <th>AQI</th>
          </tr>
        </thead>

        <tbody>
          {cities.map((city) => (
            <tr key={city.key}>
              <td>{city.rank}</td>
              <td>
                <a href={`/aqi/${city.slug}-air-quality-index-today`}>
                  {city.city}
                </a>
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
};

export default function AqiPollutedCitiesWidget({
  data = null,
  response = null,
  dataConfig = {},
}) {
  const { highest: mostPollutedCities, lowest: leastPollutedCities } =
    getCityLists(data, response);

  if (!mostPollutedCities.length && !leastPollutedCities.length) {
    return null;
  }

  const highestTitle =
    dataConfig.title_less_populated_city || "सर्वाधिक प्रदूषित शहर";
  const lowestTitle =
    dataConfig.title_highest_populated_city || "सबसे कम प्रदूषित शहर";

  return (
    <div className="pollutedCitiesWidget_Wrapper">
      <div className="container">
        {mostPollutedCities.length > 0 && (
          <div className="pollutedCity_Wrap">
            <div className="AQIHeading_Wrap">
              <h2 className="h1">{highestTitle}</h2>
            </div>
            <CityTable cities={mostPollutedCities} />
          </div>
        )}

        {leastPollutedCities.length > 0 && (
          <div className="pollutedCity_Wrap">
            <div className="AQIHeading_Wrap">
              <h2 className="h1">{lowestTitle}</h2>
            </div>
            <CityTable cities={leastPollutedCities} />
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
