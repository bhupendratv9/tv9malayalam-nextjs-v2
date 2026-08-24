import PropTypes from "prop-types";
import AppLink from "@/components/AppLink";
import Image from "next/image";
import styles from "./AqiTopCity.module.css";
import { ICONS_SVG } from "@/lib/constants";
import { getHref } from "@/lib/helper/commonHelper";
const IMAGE_BASE = "https://images.tv9hindi.com/images";
const IMAGE_SLUG_OVERRIDES = {
  ahmedabad: "ahemdabad",
};

const DEFAULT_TOP_CITIES = [
  {
    id: "chennai",
    cityName: "Chennai",
    slug: "chennai",
    title: "ചെന്നൈ",
    image: `${IMAGE_BASE}/chennai.svg`,
    alt: "ചെന്നൈ",
  },
  {
    id: "kochi",
    cityName: "Kochi",
    slug: "kochi",
    title: "കൊച്ചി",
    image: `${IMAGE_BASE}/Kochi.svg`,
    alt: "കൊച്ചി",
  },
  {
    id: "thrissur",
    cityName: "Thrissur",
    slug: "thrissur",
    title: "തൃശൂർ",
    image: `${IMAGE_BASE}/Thrissur.svg`,
    alt: "തൃശൂർ",
  },
  {
    id: "kannur",
    cityName: "Kannur",
    slug: "kannur",
    title: "കണ്ണൂർ",
    image: `${IMAGE_BASE}/Kannur.svg`,
    alt: "കണ്ണൂർ",
  },
  {
    id: "thiruvanthapuram",
    cityName: "Thiruvanthapuram",
    slug: "thiruvanthapuram",
    title: "തിരുവനന്തപുരം",
    image: `${IMAGE_BASE}/Thiruvanthapuram.svg`,
    alt: "തിരുവനന്തപുരം",
  },
  {
    id: "bengaluru",
    cityName: "Bengaluru",
    slug: "bengaluru",
    title: "ബെംഗളൂരു",
    image: `${IMAGE_BASE}/Bengalur.svg`,
    alt: "ബെംഗളൂരു",
  },
  {
    id: "mysuru",
    cityName: "Mysuru",
    slug: "mysuru",
    title: "മൈസൂർ",
    image: `${IMAGE_BASE}/Mysuru.svg`,
    alt: "മൈസൂർ",
  },
  {
    id: "kollam",
    cityName: "Kollam",
    slug: "kollam",
    title: "കൊല്ലം",
    image: `${IMAGE_BASE}/kOLLAM.svg`,
    alt: "കൊല്ലം",
  },
  {
    id: "kozhikode",
    cityName: "Kozhikode",
    slug: "kozhikode",
    title: "കോഴിക്കോട്",
    image: `${IMAGE_BASE}/Kozhikode.svg`,
    alt: "കോഴിക്കോട്",
  },
  {
    id: "pathanamthitta",
    cityName: "Pathanamthitta",
    slug: "pathanamthitta",
    title: "പത്തനംതിട്ട",
    image: `${IMAGE_BASE}/Pathanamthitta.svg`,
    alt: "പത്തനംതിട്ട",
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
              <AppLink href={getHref(`/aqi/${city.slug}-air-quality-index-today`)}>
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
