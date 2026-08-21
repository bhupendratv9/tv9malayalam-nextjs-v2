import PropTypes from "prop-types";

const IMAGE_BASE = "https://images.tv9hindi.com/images";
const IMAGE_SLUG_OVERRIDES = {
  ahmedabad: "ahemdabad",
};

const DEFAULT_TOP_CITIES = [
  {
    id: "new-delhi",
    cityName: "New Delhi",
    slug: "new-delhi",
    title: "नई दिल्ली",
    image: `${IMAGE_BASE}/delhi.svg`,
    alt: "Delhi NCR",
  },
  {
    id: "mumbai",
    cityName: "Mumbai",
    slug: "mumbai",
    title: "मुंबई",
    image: `${IMAGE_BASE}/mumbai.svg`,
    alt: "Mumbai",
  },
  {
    id: "kolkata",
    cityName: "Kolkata",
    slug: "kolkata",
    title: "कोलकाता",
    image: `${IMAGE_BASE}/kolkata.svg`,
    alt: "Kolkata",
  },
  {
    id: "pune",
    cityName: "Pune",
    slug: "pune",
    title: "पुणे",
    image: `${IMAGE_BASE}/pune.svg`,
    alt: "Pune",
  },
  {
    id: "ahmedabad",
    cityName: "Ahmedabad",
    slug: "ahmedabad",
    title: "अहमदाबाद",
    image: `${IMAGE_BASE}/ahemdabad.svg`,
    alt: "Ahemdabad",
  },
  {
    id: "lucknow",
    cityName: "Lucknow",
    slug: "lucknow",
    title: "लखनऊ",
    image: `${IMAGE_BASE}/lucknow.svg`,
    alt: "Lucknow",
  },
  {
    id: "varanasi",
    cityName: "Varanasi",
    slug: "varanasi",
    title: "वाराणसी",
    image: `${IMAGE_BASE}/varanasi.svg`,
    alt: "Varanasi",
  },
  {
    id: "agra",
    cityName: "Agra",
    slug: "agra",
    title: "आगरा",
    image: `${IMAGE_BASE}/agra.svg`,
    alt: "Agra",
  },
  {
    id: "surat",
    cityName: "Surat",
    slug: "surat",
    title: "सूरत",
    image: `${IMAGE_BASE}/surat.svg`,
    alt: "Surat",
  },
  {
    id: "srinagar",
    cityName: "Srinagar",
    slug: "srinagar",
    title: "श्रीनगर",
    image: `${IMAGE_BASE}/srinagar.svg`,
    alt: "Srinagar",
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
    dataConfig.title || title || "सबसे लोकप्रिय शहरों में AQI";

  if (!topCities.length) {
    return null;
  }

  return (
    <div className="cityAQIThumb_Wrapper">
      <div className="container">
        <div className="AQIHeading_Wrap">
          <h2 className="h1">
            {heading} <svg><use href="#aqi_wind" /></svg>
          </h2>
        </div>

        <div className="cityWise_Thumbs">
          {topCities.map((city) => (
            <figure key={city.id} data-city={city.cityName || city.title}>
              <a href={`/aqi/${city.slug}-air-quality-index-today`}>
                <div className="imgThumb">
                  <img
                    width="83"
                    height="83"
                    src={city.image}
                    alt={city.alt || city.title}
                  />
                </div>
                <div className="cardTitle">{city.title}</div>
              </a>
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
