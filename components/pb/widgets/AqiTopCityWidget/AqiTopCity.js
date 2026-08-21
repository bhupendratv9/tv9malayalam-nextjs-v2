import PropTypes from "prop-types";
import AppLink from "@/components/AppLink";
import Image from "next/image";
import styles from "./AqiTopCity.module.css";
import { ICONS_SVG } from "@/lib/constants";
const IMAGE_BASE = "https://images.tv9hindi.com/images";
const IMAGE_SLUG_OVERRIDES = {
  ahmedabad: "ahemdabad",
};

const DEFAULT_TOP_CITIES = [
  {
    id: "chennai",
    cityName: "Chennai",
    slug: "chennai",
    title: "சென்னை",
    image: `${IMAGE_BASE}/chennai.svg`,
    alt: "சென்னை",
  },
  {
    id: "madurai",
    cityName: "Madurai",
    slug: "madurai",
    title: "மதுரை",
    image: `${IMAGE_BASE}/Madurai.svg`,
    alt: "மதுரை",
  },
  {
    id: "coimbatore",
    cityName: "Coimbatore",
    slug: "coimbatore",
    title: "கோயம்புத்தூர்",
    image: `${IMAGE_BASE}/Coimbatore.svg`,
    alt: "கோயம்புத்தூர்",
  },
  {
    id: "salem",
    cityName: "Salem",
    slug: "salem",
    title: "சேலம்",
    image: `${IMAGE_BASE}/Salem.svg`,
    alt: "சேலம்",
  },
  {
    id: "vellore",
    cityName: "Vellore",
    slug: "vellore",
    title: "வேலூர்",
    image: `${IMAGE_BASE}/Vellore.svg`,
    alt: "வேலூர்",
  },
  {
    id: "tiruppur",
    cityName: "Tiruppur",
    slug: "tiruppur",
    title: "திருப்பூர்",
    image: `${IMAGE_BASE}/Tiruppur.svg`,
    alt: "திருப்பூர்",
  },
  {
    id: "erode",
    cityName: "Erode",
    slug: "erode",
    title: "ஈரோடு",
    image: `${IMAGE_BASE}/Erode.svg`,
    alt: "ஈரோடு",
  },
  {
    id: "puducherry",
    cityName: "Puducherry",
    slug: "puducherry",
    title: "புதுச்சேரி",
    image: `${IMAGE_BASE}/Puducherry.svg`,
    alt: "புதுச்சேரி",
  },
  {
    id: "karur",
    cityName: "Karur",
    slug: "karur",
    title: "கரூர்",
    image: `${IMAGE_BASE}/Karur.svg`,
    alt: "கரூர்",
  },
  {
    id: "cuddalore",
    cityName: "Cuddalore",
    slug: "cuddalore",
    title: "கடலூர்",
    image: `${IMAGE_BASE}/Cuddalore.svg`,
    alt: "கடலூர்",
  },
];

function getCityUrlSlug(slug = "") {
  const parts = String(slug).split("/").filter(Boolean);
  return parts.at(-1) || String(slug).trim();
}

function normalizeTopCity(item = {}, index = 0) {
  const slug = getCityUrlSlug(
    item.slug || item.city_slug || item.url_slug || item.id || ""
  );
  const imageSlug = IMAGE_SLUG_OVERRIDES[slug] || slug;

  return {
    id: item.id || slug || `city-${index}`,
    cityName: item.city_name || item.cityName || item.name || "",
    title:
      item.city_hi ||
      item.title ||
      item.name ||
      item.city_name ||
      "",
    slug,
    image:
      item.image ||
      item.img ||
      item.image_url ||
      (slug ? `${IMAGE_BASE}/${imageSlug}.svg` : ""),
    alt: item.alt || item.city_name || item.city_hi || item.title || "",
  };
}

function resolveTopCities({ items = [], data = null, response = null, dataConfig = {} }) {
  const sources = [
    dataConfig.cities,
    items,
    data?.cities,
    data?.items,
    data?.data,
    response?.cities,
    response?.items,
    response?.data,
  ];

  for (const source of sources) {
    if (!Array.isArray(source) || !source.length) continue;

    const cities = source
      .map((item, index) => normalizeTopCity(item, index))
      .filter((city) => city.title && city.slug);

    if (cities.length) {
      return cities;
    }
  }

  return DEFAULT_TOP_CITIES;
}

export default function AqiTopCityWidget({
  title = "",
  items = [],
  data = null,
  response = null,
  dataConfig = {},
}) {
  const topCities = resolveTopCities({ items, data, response, dataConfig });
  const heading =
    dataConfig.title || title || "பிரபலமான நகரங்களில் AQI";

  if (!topCities.length) {
    return null;
  }

  return (
    <div className={styles.cityAQIThumb_Wrapper}>
      <div className="container">
        <div className={styles.custom_heading}>
          <h2 className={styles.h1}>
            {heading} <svg width={25} height={23}><use href={`${ICONS_SVG}#aqi_wind`}></use>
            </svg>
          </h2>
        </div>

        <div className={styles.cityWise_Thumbs}>
          {topCities.map((city) => (
            <figure key={city.id} data-city={city.cityName || city.title}>
              <AppLink href={`/aqi/${city.slug}-air-quality-index-today`}>
                <div className={styles.imgThumb}>
                  <Image
                    width={83}
                    height={83}
                    src={city.image}
                    alt={city.alt || city.title}
                  />
                </div>
                <div className={styles.cardTitle}>{city.title}</div>
              </AppLink>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

AqiTopCityWidget.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  data: PropTypes.object,
  response: PropTypes.object,
  dataConfig: PropTypes.shape({
    title: PropTypes.string,
    cities: PropTypes.array,
  }),
};
