import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js/auto";
import { decodeHtml } from "@/lib/helper/commonHelper";
import {
  parseAqiCitySlug,
  resolveAqiCitySlug,
  subscribeAqiCityChange,
} from "@/lib/helper/aqiEvents";

const DEFAULT_AQI_BASE_API = "https://webapi.tv9.com/apis/aqi";

const PARAMETER_OPTIONS = [
  { value: "aqi", label: "AQI" },
  { value: "pm25", label: "PM2.5" },
  { value: "pm10", label: "PM10" },
  { value: "co", label: "CO" },
  { value: "so2", label: "SO2" },
  { value: "no2", label: "NO2" },
  { value: "o3", label: "O3" },
];

const COLOR_SCHEMES = {
  aqi: ["#00e400", "#ffff00", "#ff7e00", "#ff0000", "#8f3f97", "#7e0023"],
  pm25: ["#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722"],
  pm10: ["#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39"],
  co: ["#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4"],
  so2: ["#FF5722", "#FF7043", "#FF8A65", "#FFAB91", "#FFCCBC", "#FBE9E7"],
  no2: ["#795548", "#8D6E63", "#A1887F", "#BCAAA4", "#D7CCC8", "#EFEBE9"],
  o3: ["#607D8B", "#78909C", "#90A4AE", "#B0BEC5", "#CFD8DC", "#ECEFF1"],
};

function getAQIColor(value) {
  if (value <= 50) return "#00e400";
  if (value <= 100) return "#ffff00";
  if (value <= 150) return "#ff7e00";
  if (value <= 200) return "#ff0000";
  if (value <= 300) return "#8f3f97";
  return "#7e0023";
}

function getParameterColors(parameter, values = []) {
  const scheme = COLOR_SCHEMES[parameter] || COLOR_SCHEMES.aqi;

  if (parameter === "aqi") {
    return values.map((value) => getAQIColor(value));
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;

  return values.map((value) => {
    const ratio = range > 0 ? (value - min) / range : 0;
    const colorIndex = Math.floor(ratio * (scheme.length - 1));
    return scheme[colorIndex] || scheme[0];
  });
}

function getYAxisMax(parameter, maxValue) {
  if (parameter === "pm25" || parameter === "pm10") {
    return Math.max(300, maxValue * 1.2);
  }
  if (parameter === "co") {
    return Math.max(150, maxValue * 1.2);
  }
  if (parameter === "o3") {
    return Math.max(50, maxValue * 1.5);
  }
  if (parameter === "so2" || parameter === "no2") {
    return Math.max(10, maxValue * 2);
  }

  return 400;
}

function formatGraphDate(date) {
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getDateRange(lastUpdated) {
  const end = lastUpdated ? new Date(lastUpdated) : new Date();

  if (Number.isNaN(end.getTime())) {
    const now = new Date();
    return {
      startDate: formatGraphDate(new Date(now.getTime() - 24 * 60 * 60 * 1000)),
      endDate: formatGraphDate(now),
    };
  }

  const start = new Date(end.getTime() - 24 * 60 * 60 * 1000);

  return {
    startDate: formatGraphDate(start),
    endDate: formatGraphDate(end),
  };
}

async function fetchAQIData(citySlug, aqiBaseApi) {
  if (!citySlug || !aqiBaseApi) return null;

  try {
    const response = await fetch(`${aqiBaseApi}/${citySlug}`, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching AQI data:", error);
    return null;
  }
}

export default function AqiLastReportsWidget({
  title = "",
  dataConfig = {},
  queryParams = {},
}) {
  const aqiBaseApi = dataConfig.aqi_base_api || DEFAULT_AQI_BASE_API;
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const parameterRef = useRef("aqi");

  const [parameter, setParameter] = useState("aqi");
  const [citySlug, setCitySlug] = useState(() => resolveAqiCitySlug(queryParams));
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [minValue, setMinValue] = useState("--");
  const [maxValue, setMaxValue] = useState("--");

  const heading =
    decodeHtml(dataConfig.title) ||
    decodeHtml(title) ||
    "प्रति घंटे का AQI डेटा (पिछले 24 घंटे)";

  const dateRange = useMemo(
    () => getDateRange(aqiData?.lastupdated),
    [aqiData?.lastupdated]
  );
  const cityName = aqiData?.city_hi || aqiData?.city_name || (loading ? "Loading..." : "--");

  const updateChart = useCallback((data, selectedParameter) => {
    const chart = chartInstanceRef.current;
    if (!chart || !data?.aqihourly?.length) return;

    const hourlyData = data.aqihourly;
    const labels = hourlyData.map((item) => item.hourlabel);
    const values = hourlyData.map((item) => Number(item[selectedParameter]) || 0);
    const colors = getParameterColors(selectedParameter, values);
    const min = Math.min(...values);
    const max = Math.max(...values);

    setMinValue(min);
    setMaxValue(max);

    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    chart.data.datasets[0].backgroundColor = colors;
    chart.options.scales.y.max = getYAxisMax(selectedParameter, max);
    chart.update();
  }, []);

  const loadData = useCallback(async (slug) => {
    if (!slug) return;

    setLoading(true);
    const data = await fetchAQIData(slug, aqiBaseApi);
    setAqiData(data);
    setLoading(false);
  }, [aqiBaseApi]);

  const handleParameterChange = (event) => {
    const value = event.target.value;
    parameterRef.current = value;
    setParameter(value);
  };

  useEffect(() => {
    if (!chartInstanceRef.current || !aqiData) return;
    updateChart(aqiData, parameter);
  }, [aqiData, parameter, updateChart]);

  useEffect(() => {
    if (queryParams?.city) {
      setCitySlug(parseAqiCitySlug(queryParams.city));
    }
  }, [queryParams?.city]);

  useEffect(() => {
    if (!citySlug) return;
    loadData(citySlug);
  }, [citySlug, loadData]);

  useEffect(() => {
    if (!chartRef.current) return;

    let chartInstance = null;

    chartInstance = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
            borderRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title(context) {
                return context[0]?.label || "";
              },
              label(context) {
                const currentParameter = parameterRef.current.toUpperCase();
                return `${currentParameter}: ${context.parsed.y}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: "#555",
              callback(_value, index) {
                if (index % 2 !== 0) return "";
                const labels = chartInstance?.data?.labels;
                return labels?.[index] != null ? String(labels[index]) : "";
              },
            },
          },
          y: {
            beginAtZero: true,
            max: 400,
          },
        },
      },
    });

    chartInstanceRef.current = chartInstance;

    return () => {
      chartInstanceRef.current?.destroy();
      chartInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    let resizeTimeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        chartInstanceRef.current?.resize();
      }, 120);
    };

    globalThis.window?.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimeout);
      globalThis.window?.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (queryParams?.city) return;

    return subscribeAqiCityChange((event) => {
      setCitySlug(parseAqiCitySlug(event.detail?.city));
    });
  }, [queryParams?.city]);

  return (
    <>
      <div className="AQIDataWrap">
        <div className="container">
          <div className="AQIHeading_Wrap">
            <h2 className="h1">{heading}</h2>

            <div className="CateHours">
              <div className="custom-select" role="presentation">
                <select
                  name="parameter"
                  aria-label="Parameter select"
                  value={parameter}
                  onChange={handleParameterChange}
                >
                  {PARAMETER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="graphWrap">
            <div className="graphHead">
              <h2>{cityName}</h2>

              <div className="AQIdataUpdate">
                <div className="updateNumbx">
                  <div className="AQInubx min">
                    <span>{minValue}</span> <span>Min.</span>
                  </div>
                </div>

                <div className="updateNumbx">
                  <div className="AQInubx max">
                    <span>{maxValue}</span> <span>Max.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rotatetitle">{parameter.toUpperCase()}</div>

            <div className="chart-wrapper">
              <canvas aria-label="AQI bar chart" role="img" ref={chartRef} />
            </div>

            <div className="graphFoot">
              <span>{dateRange.startDate}</span>
              <span className="time">Time</span>
              <span>{dateRange.endDate}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .AQIDataWrap{margin-bottom:4rem}
        .AQIDataWrap .container{width:75.25rem}
        .AQIDataWrap .AQIHeading_Wrap{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.56rem}
        .AQIDataWrap .AQIHeading_Wrap .h1{color:#16191b;font-size:1.375rem;font-weight:700;line-height:1.875rem;text-transform:capitalize}
        .AQIDataWrap .AQIHeading_Wrap .CateHours{display:flex;align-items:center;gap:1rem}
        .AQIDataWrap .AQIHeading_Wrap .CateHours select{width:14.4375rem;height:2.625rem;border-radius:.25rem;border:1px solid #cecece;background:#fff url(https://images.tv9hindi.com/images/aqi-images/arrow-down.svg) no-repeat right .75rem center;padding:.625rem 2.5rem .625rem .5rem;color:#000;font-size:.9375rem;text-transform:uppercase;appearance:none;-webkit-appearance:none;-moz-appearance:none;cursor:pointer}
        .AQIDataWrap .graphWrap{background:#fff;position:relative;padding:2rem 4.0625rem}
        .AQIDataWrap .graphWrap .graphHead{display:flex;justify-content:space-between}
        .AQIDataWrap .graphWrap .rotatetitle{position:absolute;top:50%;left:3rem;transform:rotate(180deg) translateY(-50%);transform-origin:left top;font-size:.75rem;text-transform:uppercase;writing-mode:vertical-lr;line-height:1}
        .AQIDataWrap .graphHead h2{font-weight:600;font-size:26px}
        .AQIDataWrap .graphHead .AQIdataUpdate{display:flex;gap:12px;margin-bottom:14px;align-items:center}
        .AQIDataWrap .graphHead .AQIdataUpdate .updateNumbx .AQInubx{padding:8px 10px;border-radius:4px;color:#fff;font-weight:600;font-size:1.25rem;margin-bottom:.25rem;display:inline-block;line-height:1}
        .AQIDataWrap .graphHead .AQIdataUpdate .updateNumbx .AQInubx span{font-weight:400;font-size:.875rem}
        .AQIDataWrap .graphHead .min{background:#c64a8f}
        .AQIDataWrap .graphHead .max{background:#8a0f14}
        .AQIDataWrap .graphWrap .chart-wrapper{position:relative;width:100%;height:340px}
        .AQIDataWrap .graphWrap .chart-wrapper canvas{width:100%!important;height:100%!important;display:block;-webkit-backface-visibility:hidden;backface-visibility:hidden;will-change:transform}
        .AQIDataWrap .graphWrap .graphFoot{display:flex;justify-content:space-between;align-items:center;margin-top:12px;color:#888;font-size:12px}
        .AQIDataWrap .graphWrap .graphFoot .time{color:#000}
        @media(max-width:767px){
          .AQIDataWrap{margin-bottom:2rem}
          .AQIDataWrap .container{width:100%;padding:0 1rem}
          .AQIDataWrap .AQIHeading_Wrap{flex-direction:column;gap:1rem;align-items:center}
          .AQIDataWrap .AQIHeading_Wrap select{width:14.4375rem;height:2.5rem;font-size:.875rem;padding:.5rem 2rem .5rem .5rem;background-size:15px;background-position:right .75rem center}
          .AQIDataWrap .graphWrap{padding:1.25rem 1rem}
          .AQIDataWrap .graphWrap .graphHead{flex-direction:column;gap:1rem}
          .AQIDataWrap .graphHead h2{font-size:20px}
          .AQIDataWrap .graphHead .AQIdataUpdate{gap:10px;flex-wrap:wrap}
          .AQIDataWrap .graphHead .AQIdataUpdate .updateNumbx .AQInubx{font-size:1rem;padding:6px 8px}
          .AQIDataWrap .graphHead .AQIdataUpdate .updateNumbx .AQInubx span{font-size:.75rem}
          .AQIDataWrap .graphWrap .rotatetitle{left:.75rem;font-size:.625rem}
          .AQIDataWrap .graphWrap .chart-wrapper{height:240px}
          .AQIDataWrap .graphWrap .graphFoot{font-size:10px;margin-top:8px}
          .AQIDataWrap .graphWrap .graphFoot .time{font-size:10px}
        }
      `}</style>
    </>
  );
}

AqiLastReportsWidget.propTypes = {
  title: PropTypes.string,
  dataConfig: PropTypes.shape({
    title: PropTypes.string,
    aqi_base_api: PropTypes.string,
  }),
  queryParams: PropTypes.object,
};
