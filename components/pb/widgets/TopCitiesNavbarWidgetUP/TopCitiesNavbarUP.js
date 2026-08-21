"use client";

import { useState, useEffect } from "react";
import styles from "./TopCitiesNavbarUP.module.css";
import AppLink from "@/components/AppLink";
import { getHref } from "@/lib/helper/commonHelper";

// Default fallback cities (used when API fails or returns empty)
const DEFAULT_CITIES = [
  { title: "लखनऊ", url: "/cities/lucknow" },
  { title: "वाराणसी", url: "/cities/varanasi" },
  { title: "कानपुर", url: "/cities/kanpur" },
  { title: "प्रयागराज", url: "/cities/prayagraj" },
  { title: "आगरा", url: "/cities/agra" },
  { title: "मेरठ", url: "/cities/meerut" },
  { title: "गाजियाबाद", url: "/cities/ghaziabad" },
  { title: "नोएडा", url: "/cities/noida" },
  { title: "गोरखपुर", url: "/cities/gorakhpur" },
  { title: "सहारनपुर", url: "/cities/saharanpur" },
];

export default function TopCitiesNavbarWidgetUP({ navItems }) {
  const [cities, setCities] = useState(
    Array.isArray(navItems) && navItems.length > 0 ? navItems : DEFAULT_CITIES
  );

  useEffect(() => {
    // If navItems already provided via props, skip fetch
    if (Array.isArray(navItems) && navItems.length > 0) return;

    const menuUrl = process.env.NEXT_PUBLIC_TOP_CITIES_MENU_URL;
    if (!menuUrl) return;

    let cancelled = false;

    fetch(menuUrl, { headers: { Accept: "application/json" } })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (cancelled) return;
        let items = [];
        if (Array.isArray(json)) items = json;
        else if (Array.isArray(json?.data)) items = json.data;
        else if (Array.isArray(json?.items)) items = json.items;

        if (items.length > 0) {
          setCities(items);
        }
      })
      .catch(() => {});

    return () => { cancelled = true; };
  }, [navItems]);

  return (
    <div className={styles.topCities_Wrapper}>
      <div className={styles.container}>
        <span className={styles.label}>TOP CITIES</span>
        <ul className={styles.city_list}>
          {cities.map((item, idx) => {
            const label = item.title || item.label || item.name || "";
            const href = getHref(item.url || item.href || item.link || "#");

            return (
              <li key={item.id || idx}>
                <AppLink href={href} title={label}>
                  {label}
                </AppLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
