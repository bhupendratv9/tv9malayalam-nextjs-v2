"use client";

import { memo, useMemo, useState } from "react";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import PropTypes from "prop-types";
import {
  DEFAULT_WEATHER_SITE,
  buildHotColdWidgetData,
  buildWeatherCityUrl,
  getHotColdHeadingLabels,
  getHotColdTableLabels,
} from "@/lib/helper/weatherHelper";

const ICON_CLASS = "weather-table-icon";
const TAB_HOTTEST = "hottest";
const TAB_COLDEST = "coldest";

const WeatherTableIcon = memo(function WeatherTableIcon({ src, alt = "" }) {
  return (
    <Image
      className={ICON_CLASS}
      width={20}
      height={20}
      src={src}
      alt={alt}
      unoptimized
    />
  );
});

WeatherTableIcon.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

const CityWeatherTable = memo(function CityWeatherTable({
  cities,
  lastUpdated,
  labels,
  variant = TAB_HOTTEST,
}) {
  return (
    <>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>{labels.rank}</th>
              <th>{labels.city}</th>
              <th>{labels.temperature}</th>
              <th>{labels.status}</th>
              <th>{labels.weatherCondition}</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => (
              <tr key={`${city.slug}-${city.rank}`}>
                <td>{city.rank}</td>
                <td>
                  <AppLink href={buildWeatherCityUrl(city.slug)}>{city.name}</AppLink>
                </td>
                <td>
                  <span className={`temp temp--${variant}`}>{city.temp}</span>
                </td>
                <td>{city.status}</td>
                <td>
                  <WeatherTableIcon src={city.icon} alt={city.condition} />
                  {city.condition}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {lastUpdated ? <div className="lastUpdatedTime">{lastUpdated}</div> : null}
    </>
  );
});

CityWeatherTable.propTypes = {
  cities: PropTypes.array,
  lastUpdated: PropTypes.string,
  labels: PropTypes.shape({
    rank: PropTypes.string,
    city: PropTypes.string,
    temperature: PropTypes.string,
    status: PropTypes.string,
    weatherCondition: PropTypes.string,
  }),
  variant: PropTypes.oneOf([TAB_HOTTEST, TAB_COLDEST]),
};

export default function MostHotColdCityWidget({ items = [], dataConfig = {} }) {
  const [activeTab, setActiveTab] = useState(TAB_HOTTEST);
  const siteName = dataConfig.site_name || DEFAULT_WEATHER_SITE;

  const hottestCityTitle = dataConfig.most_hottest_city_title || "";
  const coldestCityTitle = dataConfig.most_coolest_city_title || "";

  const { tableLabels, headingLabels, tableData } = useMemo(
    () => ({
      tableLabels: getHotColdTableLabels(siteName),
      headingLabels: getHotColdHeadingLabels(siteName),
      tableData: buildHotColdWidgetData(items, siteName),
    }),
    [items, siteName]
  );

  const heading =
    activeTab === TAB_COLDEST
      ? coldestCityTitle || headingLabels.coldestHeading
      : hottestCityTitle || headingLabels.hottestHeading;

  return (
    <>
      <div className="hottest-coldest-indian-cities">
        <div className="container">
          <div className="custom-heading">
            <h2 className="h2">{heading}</h2>
            <div className="custom-heading__sub">
              <div className="filter-table" />
              <div className="tab" role="tablist" aria-label={heading}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === TAB_HOTTEST}
                  className={`tablinks${activeTab === TAB_HOTTEST ? " active" : ""}`}
                  onClick={() => setActiveTab(TAB_HOTTEST)}
                >
                  {headingLabels.hottestLabel}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === TAB_COLDEST}
                  className={`tablinks${activeTab === TAB_COLDEST ? " active" : ""}`}
                  onClick={() => setActiveTab(TAB_COLDEST)}
                >
                  {headingLabels.coldestLabel}
                </button>
              </div>
            </div>
          </div>

          <div
            role="tabpanel"
            hidden={activeTab !== TAB_HOTTEST}
            className={`tabcontent${activeTab === TAB_HOTTEST ? " tabcontent--active" : ""}`}
          >
            <CityWeatherTable
              cities={tableData.hottestTableRows}
              lastUpdated={tableData.hottestLastUpdated}
              labels={tableLabels}
              variant={TAB_HOTTEST}
            />
          </div>

          <div
            role="tabpanel"
            hidden={activeTab !== TAB_COLDEST}
            className={`tabcontent tabcontent--coldest${activeTab === TAB_COLDEST ? " tabcontent--active" : ""}`}
          >
            <CityWeatherTable
              cities={tableData.coldestTableRows}
              lastUpdated={tableData.coldestLastUpdated}
              labels={tableLabels}
              variant={TAB_COLDEST}
            />
          </div>
        </div>
      </div>

      <style>{`
        .hottest-coldest-indian-cities {
          margin-bottom: 1.75rem;
          padding: 3rem 0;
          background: #fff;
        }
        .hottest-coldest-indian-cities .container {
          max-width: 75.25rem;
          margin: 0 auto;
        }
        .hottest-coldest-indian-cities .custom-heading {
          margin-bottom: 1.56rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        .hottest-coldest-indian-cities .custom-heading .h2 {
          color: #000;
          font-size: 1.375rem;
          font-weight: 700;
          line-height: 1.875rem;
          text-transform: capitalize;
        }
        .hottest-coldest-indian-cities .custom-heading__sub {
          display: flex;
          align-items: center;
          gap: 0.94rem;
        }
        .hottest-coldest-indian-cities .custom-heading__sub .tab {
          border-radius: 1.25rem;
          background: #0094f0;
          padding: 2px;
          display: flex;
          align-items: center;
        }
        .hottest-coldest-indian-cities .custom-heading__sub .tab .tablinks {
          background: transparent;
          color: #fff;
          font-size: 0.875rem;
          font-weight: 500;
          text-transform: capitalize;
          border: none;
          padding: 0 1rem;
          cursor: pointer;
          line-height: 2.125rem;
          white-space: nowrap;
        }
        .hottest-coldest-indian-cities .custom-heading__sub .tab .tablinks.active {
          background: #fff;
          color: #000;
          border-radius: 1.25rem;
          font-weight: 600;
        }
        .hottest-coldest-indian-cities .tabcontent {
          display: none;
          padding: 1.25rem 1.25rem 2.25rem;
          border-radius: 1.25rem;
          background: #f2f6f8;
        }
        .hottest-coldest-indian-cities .tabcontent--active {
          display: block;
        }
        .hottest-coldest-indian-cities .tabcontent table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }
        .hottest-coldest-indian-cities .tabcontent table th {
          font-size: 1.125rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #000;
          padding: 1rem;
          text-align: left;
        }
        .hottest-coldest-indian-cities .tabcontent table tbody tr:nth-child(odd) {
          background: #fff;
          border-radius: 1rem;
        }
        .hottest-coldest-indian-cities .tabcontent table tbody tr:nth-child(odd) td:first-child {
          border-radius: 1rem 0 0 1rem;
        }
        .hottest-coldest-indian-cities .tabcontent table tbody tr:nth-child(odd) td:last-child {
          border-radius: 0 1rem 1rem 0;
        }
        .hottest-coldest-indian-cities .tabcontent table td {
          font-size: 1rem;
          font-weight: 400;
          color: #000;
          padding: 1rem;
          text-align: left;
        }
        .hottest-coldest-indian-cities .tabcontent table td .temp {
          width: 5.75rem;
          height: 2rem;
          border-radius: 0.3125rem;
          background: #fa4848;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 500;
        }
        .hottest-coldest-indian-cities .tabcontent table td .temp--coldest {
          background: #789df5;
        }
        .hottest-coldest-indian-cities .tabcontent table td > span {
          display: inline-flex;
          align-items: center;
          vertical-align: middle;
          margin-right: 0.5rem;
          line-height: 0;
        }
        .hottest-coldest-indian-cities .tabcontent table td .weather-table-icon {
          width: 20px !important;
          height: 20px !important;
          display: inline-block;
          vertical-align: middle;
        }
        .hottest-coldest-indian-cities .tabcontent .lastUpdatedTime {
          margin-top: 1rem;
          text-align: right;
          font-size: 0.75rem;
          font-weight: 400;
          line-height: 1.25rem;
          color: #9d9d9d;
        }
        @media screen and (max-width: 767px) {
          .hottest-coldest-indian-cities .container {
            width: 100%;
          }
          .hottest-coldest-indian-cities .custom-heading {
            justify-content: center;
            margin-bottom: 1rem;
          }
          .hottest-coldest-indian-cities .custom-heading .h2 {
            margin-bottom: 0.9375rem;
          }
          .hottest-coldest-indian-cities .tabcontent table {
            white-space: nowrap;
            table-layout: auto;
          }
        }
      `}</style>
    </>
  );
}

MostHotColdCityWidget.propTypes = {
  items: PropTypes.array,
  dataConfig: PropTypes.object,
};
