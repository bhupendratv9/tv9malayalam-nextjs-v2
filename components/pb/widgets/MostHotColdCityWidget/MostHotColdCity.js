"use client";

import { memo, useMemo, useState } from "react";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./MostHotColdCity.module.css";
import PropTypes from "prop-types";
import { getHref } from "@/lib/helper/commonHelper";
import {
  DEFAULT_WEATHER_SITE,
  buildHotColdWidgetData,
  buildWeatherCityUrl,
  getHotColdHeadingLabels,
  getHotColdTableLabels,
} from "@/lib/helper/weatherHelper";

const TAB_HOTTEST = "hottest";
const TAB_COLDEST = "coldest";

const CityWeatherTable = memo(function CityWeatherTable({
  cities,
  lastUpdated,
  labels,
  variant = TAB_HOTTEST,
}) {
  return (
    <>
      <div className={styles.tableResponsive}>
        <table className={styles.table}>
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
                  <AppLink href={getHref(buildWeatherCityUrl(city.slug))}>{city.name}</AppLink>
                </td>
                <td>
                  <span
                    className={`${styles.temp} ${styles[`temp_${variant}`]}`}
                  >
                    {city.temp}
                  </span>
                </td>
                <td>{city.status}</td>
                <td>
                  <Image
                    width={20}
                    height={20}
                    src={city.icon}
                    alt={city.condition}
                  />
                  {city.condition}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {lastUpdated ? (
        <div className={styles.lastUpdatedTime}>{lastUpdated}</div>
      ) : null}
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
  const language = dataConfig.language || "en";
  const hottestCityTitle = dataConfig.most_hottest_city_title || "";
  const coldestCityTitle = dataConfig.most_coolest_city_title || "";

  const { tableLabels, headingLabels, tableData } = useMemo(
    () => ({
      tableLabels: getHotColdTableLabels(siteName),
      headingLabels: getHotColdHeadingLabels(siteName),
      tableData: buildHotColdWidgetData(items, siteName, language),
    }),
    [items, language, siteName],
  );

  const heading =
    activeTab === TAB_COLDEST
      ? coldestCityTitle || headingLabels.coldestHeading
      : hottestCityTitle || headingLabels.hottestHeading;

  return (
    
      <div className={styles.hottestColdestIndianCities}>
        <div className={styles.container}>
          <div className={styles.custom_heading}>
            <h2 className={styles.h2}>{heading}</h2>
            <div className={styles.custom_heading__sub}>
              <div className={styles.tab} role="tablist" aria-label={heading}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === TAB_HOTTEST}
                  className={`${styles.tabLinks} ${activeTab === TAB_HOTTEST ? styles.isActive : ""}`}
                  onClick={() => setActiveTab(TAB_HOTTEST)}
                >
                  {headingLabels.hottestLabel}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === TAB_COLDEST}
                  className={`${styles.tabLinks} ${activeTab === TAB_COLDEST ? styles.isActive : ""}`}
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
            className={[
              styles.tabcontent,
              activeTab === TAB_HOTTEST && styles.tabcontentActive,
            ]
              .filter(Boolean)
              .join(" ")}
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
            className={[
              styles.tabcontent,
              activeTab === TAB_COLDEST && styles.tabcontentActive,
            ]
              .filter(Boolean)
              .join(" ")}
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
  );
}

MostHotColdCityWidget.propTypes = {
  items: PropTypes.array,
  dataConfig: PropTypes.object,
};
