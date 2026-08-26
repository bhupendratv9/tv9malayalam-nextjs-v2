import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./AqiFaq.module.css";
import {
  parseAqiCitySlug,
  resolveAqiCitySlug,
} from "@/lib/helper/aqiEvents";

const DEFAULT_AQI_BASE_API = "https://webapi.tv9.com/apis/aqi";

const AQI_CATEGORIES = [
  { min: 0, max: 50, category: "Good" },
  { min: 51, max: 100, category: "Moderate" },
  { min: 101, max: 150, category: "Poor" },
  { min: 151, max: 200, category: "Unhealthy" },
  { min: 201, max: 300, category: "Severe" },
  { min: 301, max: 2000, category: "Hazardous" },
];

const DEFAULT_FAQ_ITEMS = [
  {
    id: "aqi-today-kochi",
    question: "ഇന്ന് Kochi AQI എത്രയാണ്?",
    answer: [
      "Kochi AQI 42 വരെയെത്തി, ഇത് ഗുരുതരമായ വായു ഗുണനിലവാര അവസ്ഥയെ (Good) സൂചിപ്പിക്കുന്നു, പ്രധാനമായും PM2.5, PM10 പോലുള്ള മലിനീകരണ വസ്തുക്കളുടെ വർദ്ധനവ് മൂലമാണിത്.",
    ],
  },
  {
    id: "aqi-yesterday-kochi",
    question: "നാളെ Kochi AQI എത്രയാണ്?",
    answer: [
      "Sunday 23 August Kochi  AQI 116 ൽ എത്തി, ഇത് ഗുരുതരമായ വായു ഗുണനിലവാരത്തെ (Poor)സൂചിപ്പിക്കുന്നു, പ്രധാനമായും PM2.5, PM10 പോലുള്ള മലിനീകരണ വസ്തുക്കളുടെ വർദ്ധനവ് മൂലമാണ്. ",
    ],
  },
  {
    id: "bad-air-health-impact",
    question: "മോശം വായു ആരോഗ്യത്തിന് എങ്ങനെ ദോഷം ചെയ്യും?",
    answer: [
      "മോശം വായു ആരോഗ്യത്തെ ഗുരുതരമായി പ്രതികൂലമായി ബാധിക്കുന്നു, പ്രത്യേകിച്ച് വായുവിൽ PM2.5, PM10, സൾഫർ ഡൈ ഓക്സൈഡ്, നൈട്രജൻ ഓക്സൈഡുകൾ, ഓസോൺ തുടങ്ങിയ ദോഷകരമായ വസ്തുക്കൾ അടങ്ങിയിരിക്കുമ്പോൾ",
      "ശ്വസനവ്യവസ്ഥയെ ബാധിച്ചേക്കാം, ശ്വാസകോശത്തിൽ അസ്വസ്ഥത, ചുമ, ശ്വസിക്കാൻ ബുദ്ധിമുട്ട് എന്നിവ ഉണ്ടാകാം. ആസ്ത്മ, ബ്രോങ്കൈറ്റിസ് തുടങ്ങിയ രോഗങ്ങൾ വർദ്ധിക്കുന്നു. ദീർഘകാല മലിനീകരണം ക്രോണിക് ഒബ്സ്ട്രക്റ്റീവ് പൾമണറി ഡിസീസ് (COPD) ഉണ്ടാക്കാൻ കാരണമാകും. ദോഷകരമായ കണികകൾ രക്തപ്രവാഹത്തിൽ പ്രവേശിക്കുകയും ഹൃദയാഘാതം, ഉയർന്ന രക്തസമ്മർദ്ദം, പക്ഷാഘാതം എന്നിവയ്ക്കുള്ള സാധ്യത വർദ്ധിപ്പിക്കുകയും ചെയ്യും.",
      "മലിനീകരണവുമായി ദീർഘനേരം സമ്പർക്കം പുലർത്തുന്നത് ശരീരത്തിന്റെ പ്രതിരോധശേഷി ദുർബലപ്പെടുത്തുന്നു, ഇത് അണുബാധയ്ക്കുള്ള സാധ്യത വർദ്ധിപ്പിക്കുന്നു. മലിനീകരണത്തിൽ അടങ്ങിയിരിക്കുന്ന വിഷ കണികകൾ മാനസികാരോഗ്യത്തെ ബാധിക്കുകയും തലവേദന, ക്ഷോഭം, വിഷാദം എന്നിവയ്ക്ക് കാരണമാകും. ചില ഗവേഷണങ്ങൾ അനുസരിച്ച്, ഇത് ഓർമ്മശക്തിയെയും വൈജ്ഞാനിക ശേഷിയെയും പ്രതികൂലമായി ബാധിക്കും.",
      "ഗർഭിണികളിലെ വായുസഞ്ചാരം കുറയുന്നത് ഗര്‍ഭസ്ഥ ശിശുവിന്റെ വികാസത്തെ പ്രതികൂലമായി ബാധിക്കും. കുട്ടികളിൽ ശ്വാസകോശ വികസനം മന്ദഗതിയിലാകുകയും ശ്വസന പ്രശ്നങ്ങൾ വർദ്ധിക്കുകയും ചെയ്തേക്കാം. മലിനമായ വായു ചർമ്മത്തിൽ പ്രകോപനം, ചൊറിച്ചിൽ, അലർജി എന്നിവയ്ക്ക് കാരണമാകും. കണ്ണുകൾ കത്തുന്നതും ചുവപ്പിക്കുന്നതും വെള്ളമൂറുന്നതും ഒരു സാധാരണ പ്രശ്നമാണ്.",
      "ദീർഘനേരം വായു മലിനീകരണവുമായി സമ്പർക്കം പുലർത്തുന്നത് ശ്വാസകോശ അർബുദ സാധ്യത വർദ്ധിപ്പിക്കുന്നു. വായുവിന്റെ ഗുണനിലവാരം മോശമാകുന്നതിന്റെ ദീർഘകാല പ്രത്യാഘാതങ്ങൾ ആരോഗ്യത്തെ ഗുരുതരമായി ബാധിക്കുകയും ജീവിത നിലവാരവും ആയുർദൈർഘ്യവും കുറയ്ക്കുകയും ചെയ്യും. ഇതിൽ നിന്ന് സ്വയം പരിരക്ഷിക്കുന്നതിന്, മാസ്ക് ധരിക്കുക, ഇൻഡോർ എയർ പ്യൂരിഫയർ ഉപയോഗിക്കുക, മലിനീകരണം ഒഴിവാക്കാൻ നടപടികൾ സ്വീകരിക്കുക എന്നിവ ആവശ്യമാണ്.",
    ],
  },
  {
    id: "bad-air-precautions",
    question: "മോശം വായു എന്തുചെയ്യണം?",
    answer: [
      "   മലിനീകരണം കൂടുതലുള്ള സമയങ്ങളിൽ (പ്രത്യേകിച്ച് അതിരാവിലെയും വൈകുന്നേരവും) പുറത്തിറങ്ങുന്നത് ഒഴിവാക്കുക. പുറത്തുപോകേണ്ടിവന്നാൽ, N95 അല്ലെങ്കിൽ P100 പോലുള്ള ഗുണനിലവാരമുള്ള മാസ്ക് ധരിക്കുക. വീടിനുള്ളിൽ വ്യായാമം ചെയ്യുക, പ്രത്യേകിച്ച് കുട്ടികളും പ്രായമായവരും പുറത്തെ പ്രവർത്തനങ്ങൾ ഒഴിവാക്കുക. മലിനമായ വായു അകത്തേക്ക് വരുന്നത് തടയാൻ ജനലുകളും വാതിലുകളും അടച്ചിടുക. നിങ്ങളുടെ വീട്ടിലും ഓഫീസിലും, പ്രത്യേകിച്ച് ഉറങ്ങുന്ന സ്ഥലങ്ങളിലും ജോലിസ്ഥലങ്ങളിലും എയർ പ്യൂരിഫയറുകൾ സ്ഥാപിക്കുക. ഒരു എയർ പ്യൂരിഫയർ വാങ്ങുമ്പോൾ, HEPA ഫിൽട്ടർ ഉള്ള ഒരു ഉപകരണത്തിന് മുൻഗണന നൽകുക. നിങ്ങൾക്ക് ശ്വാസതടസ്സം, ചുമ അല്ലെങ്കിൽ നെഞ്ചുവേദന എന്നിവ അനുഭവപ്പെടുകയാണെങ്കിൽ ഉടൻ ഒരു ഡോക്ടറെ സമീപിക്കുക. കൂടുതൽ വെള്ളം കുടിക്കുകയും പേരക്ക, ഓറഞ്ച്, ചീര തുടങ്ങിയ ആന്റിഓക്‌സിഡന്റുകൾ അടങ്ങിയ പഴങ്ങളും പച്ചക്കറികളും ഭക്ഷണത്തിൽ ഉൾപ്പെടുത്തുകയും ചെയ്യുക.",
      " എയർ ക്വാളിറ്റി ഇൻഡക്സ് (AQI)  പരിശോധിക്കാൻ ആപ്പുകളോ വെബ്‌സൈറ്റുകളോ ഉപയോഗിക്കുക, അതനുസരിച്ച് നിങ്ങളുടെ ദിനചര്യ ആസൂത്രണം ചെയ്യുക. പൊടിയും മലിനീകരണവും കുറയ്ക്കുന്നതിന് നിങ്ങളുടെ വീട് പതിവായി വൃത്തിയാക്കുക. വായു ശുദ്ധീകരിക്കാൻ സഹായിക്കുന്ന സ്നേക്ക് പ്ലാന്റ്, പീസ് ലില്ലി തുടങ്ങിയ ഇൻഡോർ സസ്യങ്ങൾ ഉപയോഗിക്കുക. കാർപൂളിംഗ്, പൊതുഗതാഗതം ഉപയോഗിക്കുക, അല്ലെങ്കിൽ ഇലക്ട്രിക് വാഹനങ്ങൾ തിരഞ്ഞെടുക്കുക എന്നിവ പരിഗണിക്കുക. പുറത്ത് നിന്ന് വന്നതിന് ശേഷം മുഖം, കൈകൾ, മൂക്ക് എന്നിവ നന്നായി കഴുകുക. മാസ്കുകളും വസ്ത്രങ്ങളും പതിവായി വൃത്തിയാക്കുക.",
    ],
  },
  {
    id: "pm25-pm10-difference",
    question: " PM 2.5 PM10 ഉം തമ്മിലുള്ള വ്യത്യാസം എന്താണ്?",
    answer: [
      "PM 2.5 ഉം PM 10 ഉം വായുവിലെ കണികാ പദാർത്ഥങ്ങളാണ്, ഇവ മലിനീകരണത്തിന്റെ പ്രധാന ഘടകങ്ങളാണ്. അവ പ്രധാനമായും വലിപ്പം, ഉറവിടം, ആരോഗ്യപരമായ ഫലങ്ങൾ എന്നിവയിൽ വ്യത്യാസപ്പെട്ടിരിക്കുന്നു. പിഎം 10 വ്യാസം 10 മൈക്രോണിൽ താഴെയാണ്, അതേസമയം പിഎം 2.5 വ്യാസം 2.5 മൈക്രോണിൽ താഴെയാണ്, ഇത് പിഎമ്മിനേക്കാൾ സൂക്ഷ്മവും അപകടകരവുമാക്കുന്നു.",
      "സ്രോതസ്സുകളെക്കുറിച്ച് പറയുകയാണെങ്കിൽ, PM 10 റോഡ് പൊടി, നിർമ്മാണ പ്രവർത്തനങ്ങൾ, പൂമ്പൊടി എന്നിവയിൽ നിന്നാണ് വരുന്നത്, അതേസമയം PM 2.5 വാഹന പുക, കത്തുന്ന വൈക്കോൽ, വ്യാവസായിക ഉദ്‌വമനം എന്നിവയിൽ നിന്നാണ് വരുന്നത്. ആരോഗ്യപരമായ പ്രത്യാഘാതങ്ങളിൽ, PM 10 മൂക്കിനെയും തൊണ്ടയെയും ബാധിക്കുന്നു, അതേസമയം PM 2.5 ശ്വാസകോശത്തിലേക്കും രക്തപ്രവാഹത്തിലേക്കും പ്രവേശിക്കുന്നു, ഇത് ഹൃദയം, ശ്വാസകോശ പ്രശ്നങ്ങൾ പോലുള്ള ഗുരുതരമായ രോഗങ്ങൾക്ക് കാരണമാകുന്നു.",
      "PM 2.5 വായുവിൽ വളരെക്കാലം തങ്ങിനിൽക്കുകയും പുകമഞ്ഞ് രൂപപ്പെടുന്നതിൽ പ്രധാന പങ്ക് വഹിക്കുകയും അതുവഴി അതിന്റെ ആരോഗ്യപരമായ ആഘാതം വർദ്ധിപ്പിക്കുകയും ചെയ്യുന്നു.",
    ],
  },
];

function getAQICategory(aqi) {
  const value = Number(aqi);
  if (Number.isNaN(value)) return "Unknown";
  const match = AQI_CATEGORIES.find((item) => value >= item.min && value <= item.max);
  return match?.category || "Unknown";
}

function getCityAqiRecord(response) {
  if (!response || !Array.isArray(response.aqidata)) return null;
  return response.aqidata[0] || null;
}

function formatYesterdayFaqDate(isoValue) {
  if (!isoValue) return "";
  const parsed = new Date(isoValue);
  if (Number.isNaN(parsed.getTime())) return "";
  parsed.setDate(parsed.getDate() - 1);
  const weekday = parsed.toLocaleDateString("en-US", { weekday: "long" });
  const day = parsed.getDate();
  const month = parsed.toLocaleDateString("en-US", { month: "long" });
  return `${weekday} ${day} ${month}`;
}

function applyReplacements(text, pairs) {
  return pairs.reduce((out, [from, to]) => {
    if (from == null || to == null || to === "") return out;
    return out.split(from).join(String(to));
  }, text);
}

function fillCityFaqItems(live) {
  if (!live?.cityName) return DEFAULT_FAQ_ITEMS;

  const todayPairs = [
    ["Kochi", live.cityName],
    ["42", live.aqi],
    ["(Good)", `(${live.todayCategory})`],
  ];
  const yesterdayPairs = [
    ["Sunday 23 August", live.yesterdayDate],
    ["Kochi", live.cityName],
    ["116", live.yesterdayAqi],
    ["(Poor)", `(${live.yesterdayCategory})`],
  ];

  return DEFAULT_FAQ_ITEMS.map((item, index) => {
    if (index > 1) return item;
    const pairs = index === 0 ? todayPairs : yesterdayPairs;
    return {
      ...item,
      question: applyReplacements(item.question, pairs),
      answer: item.answer.map((text) => applyReplacements(text, pairs)),
    };
  });
}

async function fetchAqiCityData(citySlug, aqiBaseApi) {
  if (!citySlug || !aqiBaseApi) return null;
  try {
    const response = await fetch(`${aqiBaseApi}/${citySlug}`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("[AqiFaq] Error fetching AQI data:", error);
    return null;
  }
}

export default function AqiFaqWidget({
  title = "FAQ'S",
  dataConfig = {},
  queryParams = {},
}) {
  const heading = dataConfig.title || title || "FAQ'S";
  const aqiBaseApi = dataConfig.aqi_base_api || DEFAULT_AQI_BASE_API;

  const [citySlug, setCitySlug] = useState(() => resolveAqiCitySlug(queryParams));
  const [aqiResponse, setAqiResponse] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const loadData = useCallback(
    async (slug) => {
      if (!slug) return;
      const data = await fetchAqiCityData(slug, aqiBaseApi);
      setAqiResponse(data);
    },
    [aqiBaseApi]
  );

  useEffect(() => {
    if (queryParams?.city) {
      setCitySlug(parseAqiCitySlug(queryParams.city));
    }
  }, [queryParams?.city]);

  useEffect(() => {
    if (!citySlug) return;
    loadData(citySlug);
  }, [citySlug, loadData]);

  const faqItems = useMemo(() => {
    const record = getCityAqiRecord(aqiResponse);
    const cityName = aqiResponse?.city_name || "";
    if (!record || !cityName) return DEFAULT_FAQ_ITEMS;

    const aqi = record.aqi;
    const yesterdayAqi = record.yesterday_aqi;
    const yesterdayDate = formatYesterdayFaqDate(aqiResponse.lastupdated);

    return fillCityFaqItems({
      cityName,
      aqi,
      yesterdayAqi,
      todayCategory: getAQICategory(aqi),
      yesterdayCategory: getAQICategory(yesterdayAqi),
      yesterdayDate,
    });
  }, [aqiResponse]);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.faqWidget_Wrapper}>
      <div className={styles.container}>
        <div className={styles.custom_heading}>
          <h2 className={styles.h1}>{heading}</h2>
        </div>

        <div className={styles.faqWidgetItems_List}>
          {faqItems.map((item, index) => (
            <div className={styles.FaqItem} key={item.id || index}>
              <h3
                className={`${styles.FaqHeading} ${
                  activeIndex === index ? styles.active : ""
                }`}
                onClick={() => toggleFaq(index)}
              >
                <span>{item.question}</span>
              </h3>

              <div
                className={`${styles.FaqItemContent} ${
                  activeIndex === index ? styles.open : ""
                }`}
              >
                {item.answer.map((text, idx) => (
                  <p key={`${item.id}-${idx}`}>{text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

AqiFaqWidget.propTypes = {
  title: PropTypes.string,
  dataConfig: PropTypes.shape({
    title: PropTypes.string,
    aqi_base_api: PropTypes.string,
  }),
  queryParams: PropTypes.object,
};
