import Image from "next/image";
import AppLink from "@/components/AppLink";
import PropTypes from "prop-types";
import { decodeHtml } from "@/lib/helper/commonHelper";
import {
  DEFAULT_WEATHER_SITE,
  POPULAR_CITY_NAMES,
  WEATHER_ICON_BASE,
  buildPopularCityCards,
  buildWeatherCityUrl,
  getWeatherLabel,
  resolveWeatherIconSrc,
} from "@/lib/helper/weatherHelper";

const ICON_CLASS = "weather-card-icon";

function WeatherIconsSprite() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }} aria-hidden="true">
      <symbol viewBox="0 0 24 24" id="wind_icon">
        <path d="M11.5 20C10.6667 20 9.95833 19.7083 9.375 19.125C8.79167 18.5417 8.5 17.8333 8.5 17H10.5C10.5 17.2833 10.596 17.521 10.788 17.713C10.98 17.905 11.2173 18.0007 11.5 18C11.7827 17.9993 12.0203 17.9033 12.213 17.712C12.4057 17.5207 12.5013 17.2833 12.5 17C12.4987 16.7167 12.4027 16.4793 12.212 16.288C12.0213 16.0967 11.784 16.0007 11.5 16H2V14H11.5C12.3333 14 13.0417 14.2917 13.625 14.875C14.2083 15.4583 14.5 16.1667 14.5 17C14.5 17.8333 14.2083 18.5417 13.625 19.125C13.0417 19.7083 12.3333 20 11.5 20ZM2 10V8H15.5C15.9333 8 16.2917 7.85833 16.575 7.575C16.8583 7.29167 17 6.93333 17 6.5C17 6.06667 16.8583 5.70833 16.575 5.425C16.2917 5.14167 15.9333 5 15.5 5C15.0667 5 14.7083 5.14167 14.425 5.425C14.1417 5.70833 14 6.06667 14 6.5H12C12 5.51667 12.3377 4.68733 13.013 4.012C13.6883 3.33667 14.5173 2.99933 15.5 3C16.4827 3.00067 17.312 3.33833 17.988 4.013C18.664 4.68767 19.0013 5.51667 19 6.5C18.9987 7.48333 18.6613 8.31267 17.988 8.988C17.3147 9.66333 16.4853 10.0007 15.5 10H2ZM18.5 18V16C18.9333 16 19.2917 15.8583 19.575 15.575C19.8583 15.2917 20 14.9333 20 14.5C20 14.0667 19.8583 13.7083 19.575 13.425C19.2917 13.1417 18.9333 13 18.5 13H2V11H18.5C19.4833 11 20.3127 11.3377 20.988 12.013C21.6633 12.6883 22.0007 13.5173 22 14.5C21.9993 15.4827 21.662 16.312 20.988 16.988C20.314 17.664 19.4847 18.0013 18.5 18Z" />
      </symbol>
      <symbol viewBox="0 0 24 24" id="sun_icon">
        <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M6.34 17.66L4.93 19.07M19.07 4.93L17.66 6.34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
      <symbol viewBox="0 0 34 34" id="view_icon">
        <path d="M20.7763 18.497L20.7788 12.6069C20.7764 12.4973 20.7524 12.3892 20.7082 12.2889C20.6238 12.0866 20.463 11.9258 20.2607 11.8414C20.1604 11.7972 20.0523 11.7732 19.9427 11.7709L14.0526 11.7733C13.9427 11.7733 13.834 11.795 13.7325 11.8371C13.631 11.8792 13.5388 11.9408 13.4611 12.0185C13.3041 12.1754 13.2159 12.3882 13.2158 12.61C13.2157 12.8318 13.3038 13.0446 13.4606 13.2013C13.6174 13.3581 13.8301 13.4462 14.0519 13.4461L17.9335 13.4386L13.461 17.911C13.3048 18.0673 13.2169 18.2792 13.2168 18.5001C13.2167 18.7211 13.3044 18.9329 13.4606 19.0891C13.6167 19.2452 13.8285 19.3329 14.0495 19.3328C14.2704 19.3327 14.4823 19.2449 14.6386 19.0886L19.111 14.6161L19.1035 18.4977C19.103 18.6077 19.1243 18.7166 19.1662 18.8183C19.208 18.92 19.2695 19.0123 19.3473 19.0901C19.425 19.1678 19.5173 19.2293 19.619 19.2712C19.7207 19.313 19.8296 19.3343 19.9396 19.3338C20.0496 19.3342 20.1585 19.3128 20.2602 19.2709C20.3619 19.229 20.4543 19.1674 20.5321 19.0896C20.6099 19.0118 20.6715 18.9194 20.7135 18.8177C20.7554 18.716 20.7767 18.607 20.7763 18.497Z" />
      </symbol>
      <symbol viewBox="0 0 18 18" id="info_icon">
        <path d="M8.625 12.375H9.375V8.25H8.625V12.375ZM9 7.18275C9.131 7.18275 9.24075 7.1385 9.32925 7.05C9.41775 6.9615 9.46175 6.85175 9.46125 6.72075C9.46075 6.58975 9.4165 6.48025 9.3285 6.39225C9.2405 6.30425 9.131 6.26 9 6.2595C8.869 6.259 8.7595 6.30325 8.6715 6.39225C8.5835 6.48125 8.53925 6.591 8.53875 6.7215C8.53825 6.852 8.5825 6.9615 8.6715 7.05C8.7605 7.1385 8.87 7.18275 9 7.18275ZM9.00225 15.75C8.06875 15.75 7.19125 15.573 6.36975 15.219C5.54825 14.8645 4.8335 14.3835 4.2255 13.776C3.6175 13.1685 3.13625 12.4545 2.78175 11.634C2.42725 10.8135 2.25 9.93625 2.25 9.00225C2.25 8.06825 2.42725 7.19075 2.78175 6.36975C3.13575 5.54825 3.616 4.8335 4.2225 4.2255C4.829 3.6175 5.54325 3.13625 6.36525 2.78175C7.18725 2.42725 8.06475 2.25 8.99775 2.25C9.93075 2.25 10.8083 2.42725 11.6302 2.78175C12.4517 3.13575 13.1665 3.61625 13.7745 4.22325C14.3825 4.83025 14.8638 5.5445 15.2183 6.366C15.5728 7.1875 15.75 8.06475 15.75 8.99775C15.75 9.93075 15.573 10.8083 15.219 11.6302C14.865 12.4522 14.384 13.167 13.776 13.7745C13.168 14.382 12.454 14.8633 11.634 15.2183C10.814 15.5732 9.93675 15.7505 9.00225 15.75ZM9 15C10.675 15 12.0937 14.4187 13.2562 13.2562C14.4187 12.0937 15 10.675 15 9C15 7.325 14.4187 5.90625 13.2562 4.74375C12.0937 3.58125 10.675 3 9 3C7.325 3 5.90625 3.58125 4.74375 4.74375C3.58125 5.90625 3 7.325 3 9C3 10.675 3.58125 12.0937 4.74375 13.2562C5.90625 14.4187 7.325 15 9 15Z" fill="black" />
      </symbol>
      <symbol viewBox="0 0 25 24" id="close_icon">
        <path d="M18.5 6L6.5 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.5 6L18.5 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
      <symbol viewBox="0 0 23 21" id="direction_icon">
        <path fill="#4BA9FF" d="M10.064 1.516c.77-1.333 2.694-1.333 3.464 0l9.192 15.921c.995 1.723-.862 3.684-2.637 2.784l-7.382-3.746a2 2 0 00-1.81 0L3.509 20.22c-1.774.9-3.632-1.06-2.637-2.783l9.192-15.921z" />
      </symbol>
    </svg>
  );
}

function WeatherCardIcon({ src, size, alt = "" }) {
  return (
    <Image
      className={`${ICON_CLASS} ${ICON_CLASS}--${size}`}
      width={size === "lg" ? 20 : 15}
      height={size === "lg" ? 20 : 15}
      src={src}
      alt={alt}
      unoptimized
    />
  );
}

WeatherCardIcon.propTypes = {
  src: PropTypes.string,
  size: PropTypes.oneOf(["lg", "sm"]),
  alt: PropTypes.string,
};

export default function MostPopularCityWeatherWidget({ title = "", items = [], dataConfig = {} }) {
  const siteName = dataConfig.site_name || DEFAULT_WEATHER_SITE;
  const heading =
    decodeHtml(dataConfig.title) ||
    decodeHtml(title) ||
    getWeatherLabel("weather-most-popular-cities", siteName);
  const humidityLabel = getWeatherLabel("humidity", siteName);
  const cityNames = dataConfig.city_names || POPULAR_CITY_NAMES;
  const apiCities = buildPopularCityCards(items, cityNames, siteName);
  const cities = apiCities.length ? apiCities : [];

  return (
    <>
      <div className="weather-in-popular-cities">
        <div className="container">
          <div className="custom-heading">
            <h2 className="h2">{heading}</h2>
          </div>

          <div className="citiesThumb_Wrapper">
            {cities.map((city) => (
              <div className="city-card" key={city.slug}>
                <AppLink href={buildWeatherCityUrl(city.slug)}>
                  <span className="view_icon">
                    <svg>
                      <use href="#view_icon" />
                    </svg>
                  </span>
                  <div className="city-card__top">
                    <h3>{city.name}</h3>
                    <p>{city.temp}</p>
                  </div>
                  <div className="line-seperator" />
                  <div className="city-card__bottom">
                    <p>
                      <WeatherCardIcon
                        size="lg"
                        src={resolveWeatherIconSrc(city.weatherIcon)}
                        alt={city.condition}
                      />
                      {city.condition}
                    </p>
                    <p>
                      <WeatherCardIcon
                        size="sm"
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
      <WeatherIconsSprite />
      <style>{`
        .weather-in-popular-cities {
          position: relative;
          overflow: hidden;
          margin-bottom: 1.75rem;
        }
        .weather-in-popular-cities .container {
          position: relative;
          z-index: 1;
        }
        .weather-in-popular-cities::before {
          background-image: url(https://static.tv9hindi.com/images/citybgL.png);
          content: "";
          width: 56.625rem;
          height: 52.25rem;
          flex-shrink: 0;
          position: absolute;
          bottom: -230px;
          left: -170px;
          z-index: 0;
        }
        .weather-in-popular-cities .custom-heading {
          margin-bottom: 1.56rem;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }
        .weather-in-popular-cities .custom-heading .h2 {
          color: #000;
          font-size: 1.375rem;
          font-weight: 700;
          line-height: 1.875rem;
          text-transform: capitalize;
        }
        .citiesThumb_Wrapper {
          width: 75.25rem;
          height: auto;
          border-radius: 1.25rem;
          border: 2px solid #fff;
          background: rgba(255, 255, 255, 0.6);
          margin: 0 auto 4.38rem;
          padding: 3.5rem 2.44rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.19rem;
          position: relative;
        }
        .citiesThumb_Wrapper .city-card {
          border-radius: 0.75rem;
          border: 1px solid #d2f1ff;
          background: linear-gradient(90deg, #fff 0%, #ceefff 100%);
          position: relative;
          text-align: center;
        }
        .citiesThumb_Wrapper .city-card a {
          display: block;
          padding: 1rem;
        }
        .citiesThumb_Wrapper .city-card .view_icon {
          position: absolute;
          right: 5px;
          top: 5px;
          background: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.5rem;
          height: 1.5rem;
        }
        .citiesThumb_Wrapper .city-card .view_icon svg {
          width: 1.25rem;
          height: 1.25rem;
          fill: currentColor;
        }
        .citiesThumb_Wrapper .city-card .city-card__top h3 {
          font-size: 1.125rem;
          font-weight: 600;
          line-height: 2.0625rem;
          text-transform: capitalize;
          color: #000;
        }
        .citiesThumb_Wrapper .city-card .city-card__top p {
          font-size: 1.75rem;
          font-weight: 700;
          line-height: 2.0625rem;
          text-transform: capitalize;
          color: #08d;
        }
        .citiesThumb_Wrapper .city-card .line-seperator {
          width: 9.375rem;
          height: 0.0625rem;
          background: linear-gradient(
            90deg,
            #fff 0%,
            #5f94ae 50.48%,
            #fff 100%
          );
          margin: 0.625rem auto;
        }
        .citiesThumb_Wrapper .city-card .city-card__bottom p {
          font-size: 0.8125rem;
          font-weight: 500;
          text-transform: capitalize;
          color: #000;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: center;
        }
        .citiesThumb_Wrapper .city-card .city-card__bottom p > span {
          display: inline-flex !important;
          align-items: center;
          line-height: 0;
          flex-shrink: 0;
        }
        .citiesThumb_Wrapper .city-card .city-card__bottom .weather-card-icon {
          display: block;
          flex-shrink: 0;
        }
        .citiesThumb_Wrapper .city-card .city-card__bottom .weather-card-icon--lg {
          width: 20px !important;
          height: 20px !important;
        }
        .citiesThumb_Wrapper .city-card .city-card__bottom .weather-card-icon--sm {
          width: 15px !important;
          height: 15px !important;
        }
        @media screen and (max-width: 767px) {
          .weather-in-popular-cities .custom-heading .h2 {
            text-align: center;
          }
          .citiesThumb_Wrapper {
            width: 100%;
            grid-template-columns: 1fr;
            padding: 1.25rem 0.75rem;
            gap: 0.88rem;
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </>
  );
}

MostPopularCityWeatherWidget.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  dataConfig: PropTypes.object,
};
