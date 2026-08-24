import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./MostPopularCityWeather.module.css";
import PropTypes from "prop-types";
import { decodeHtml, getHref } from "@/lib/helper/commonHelper";
import {
  DEFAULT_WEATHER_SITE,
  getPopularCityNames,
  WEATHER_ICON_BASE,
  buildPopularCityCards,
  buildWeatherCityUrl,
  getWeatherLabel,
  resolveWeatherIconSrc,
} from "@/lib/helper/weatherHelper";
import { ICONS_SVG } from "@/lib/constants";

export default function MostPopularCityWeatherWidget({ title = "", items = [], dataConfig = {} }) {
  const siteName = dataConfig.site_name || DEFAULT_WEATHER_SITE;
  const language = dataConfig.language || dataConfig.lang || "en";
  const heading =
    decodeHtml(dataConfig.title) ||
    decodeHtml(title) ||
    getWeatherLabel("weather-most-popular-cities", siteName);
  const humidityLabel = getWeatherLabel("humidity", siteName);
  const cityNames = dataConfig.city_names || getPopularCityNames(siteName);
  const apiCities = buildPopularCityCards(items, cityNames, siteName, language);
  const cities = apiCities.length ? apiCities : [];

  return (    
      <div className={styles.WeatherInPopularCities}>
        <div className="container">
          <div className={styles.custom_heading}>
            <h2 className={styles.h2}>{heading}</h2>
          </div>

          <div className={styles.citiesThumb_Wrapper}>
            {cities.map((city) => (
              <div className={styles.cityCard} key={city.slug}>
                <AppLink href={getHref(buildWeatherCityUrl(city.slug))}>
                  <span className={styles.view_icon}>
                    <svg>
                      <use href={`${ICONS_SVG}#view_icon`} />
                    </svg>
                  </span>
                  <div className={styles.cityCard__Top}>
                    <h3>{city.name}</h3>
                    <p>{city.temp}</p>
                  </div>
                  <div className={styles.lineSeperator} />
                  <div className={styles.cityCard__Bottom}>
                    <p>
                      <Image
                        width={20}
                        height={20}
                        src={resolveWeatherIconSrc(city.weatherIcon)}
                        alt={city.condition}
                      />
                      {city.condition}
                    </p>
                    <p>
                      <Image
                        width={15}
                        height={15}
                        src={`${WEATHER_ICON_BASE}/humidity.svg`}
                        alt={humidityLabel}
                      />
                      {humidityLabel} {city.humidity}
                    </p>
                  </div>
                </AppLink>
              </div>
            ))}
          </div>
        </div>
      </div>    
  );
}

MostPopularCityWeatherWidget.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  dataConfig: PropTypes.object,
};
