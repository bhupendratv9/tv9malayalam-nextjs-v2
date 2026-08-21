import PropTypes from "prop-types";

const DEFAULT_AQI_SCALE = [
  { id: "good", className: "goodAQI", range: "0-50", label: "Good" },
  { id: "moderate", className: "moderateAQI", range: "51-100", label: "Moderate" },
  { id: "poor", className: "poorAQI", range: "101-150", label: "Poor" },
  {
    id: "unhealthy",
    className: "unhealthyAQI",
    range: "151-200",
    label: "Unhealthy",
  },
  { id: "severe", className: "severeAQI", range: "201-300", label: "Severe" },
  {
    id: "hazardous",
    className: "hazardousAQI",
    range: "301-500+",
    label: "Hazardous",
  },
];

const LABEL_CLASS_MAP = {
  good: "goodAQI",
  moderate: "moderateAQI",
  poor: "poorAQI",
  unhealthy: "unhealthyAQI",
  severe: "severeAQI",
  hazardous: "hazardousAQI",
};

function formatRange(item = {}) {
  if (item.range) return String(item.range);
  if (item.range_label) return String(item.range_label);

  const min = item.min ?? item.min_aqi;
  const max = item.max ?? item.max_aqi;

  if (min != null && max != null) {
    return max >= 500 ? `${min}-500+` : `${min}-${max}`;
  }

  return "";
}

function getClassName(item = {}) {
  if (item.className || item.class_name || item.css_class) {
    return item.className || item.class_name || item.css_class;
  }

  const key = String(item.slug || item.type || item.label || item.name || "")
    .trim()
    .toLowerCase();

  return LABEL_CLASS_MAP[key] || "";
}

function normalizeScaleItem(item = {}, index = 0) {
  const label =
    item.label ||
    item.type ||
    item.name ||
    item.category ||
    item.aqi_type ||
    "";
  const range = formatRange(item);
  const className = getClassName(item);

  if (!label || !range || !className) {
    return null;
  }

  return {
    id: item.id || className || `scale-${index}`,
    className,
    range,
    label,
  };
}

function resolveScaleItems({ items = [], data = null, response = null, dataConfig = {} }) {
  const sources = [
    dataConfig.scales,
    dataConfig.scale,
    items,
    data?.scales,
    data?.scale,
    data?.items,
    data?.data,
    response?.scales,
    response?.scale,
    response?.items,
    response?.data,
  ];

  for (const source of sources) {
    if (!Array.isArray(source) || !source.length) continue;

    const scales = source
      .map((item, index) => normalizeScaleItem(item, index))
      .filter(Boolean);

    if (scales.length) {
      return scales;
    }
  }

  return DEFAULT_AQI_SCALE;
}

export default function AqiScaleWidget({
  title = "",
  items = [],
  data = null,
  response = null,
  dataConfig = {},
}) {
  const scaleItems = resolveScaleItems({ items, data, response, dataConfig });
  const heading =
    dataConfig.title || title || "वायु गुणवत्ता सूचकांक पैमाना";

  if (!scaleItems.length) {
    return null;
  }

  return (
    <div className="AQIScaleWidget_Wrapper">
      <div className="container">
        <div className="AQIHeading_Wrap">
          <h2 className="h1">{heading}</h2>
        </div>

        <ul className="AQIScale_Thumbs">
          {scaleItems.map((scale) => (
            <li key={scale.id} className={scale.className}>
              <div className="AQInfo">
                <strong>{scale.range}</strong>
                <small>AQI</small>
                <div className="AQIType">{scale.label}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

AqiScaleWidget.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  data: PropTypes.object,
  response: PropTypes.object,
  dataConfig: PropTypes.shape({
    title: PropTypes.string,
    scales: PropTypes.array,
    scale: PropTypes.array,
  }),
};
