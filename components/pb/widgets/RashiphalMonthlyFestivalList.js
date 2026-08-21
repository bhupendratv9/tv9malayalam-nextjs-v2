import { useState } from "react";
import useSplide from "@/hooks/useSplide";

const MONTH_NAMES = {
  january: "जनवरी",
  february: "फरवरी",
  march: "मार्च",
  april: "अप्रैल",
  may: "मई",
  june: "जून",
  july: "जुलाई",
  august: "अगस्त",
  september: "सितंबर",
  october: "अक्टूबर",
  november: "नवंबर",
  december: "दिसंबर",
};


export default function RashiphalMonthlyFestivalList({
  title = "इस महीने के प्रमुख त्योहार",
  items = {}, // { january: [], february: [] }
  dataConfig = {},
}) {
  const monthKeys = Object.keys(MONTH_NAMES);
  // ✅ default current month
  const [currentIndex, setCurrentIndex] = useState(
    new Date().getMonth()
  );

const festivalData = Object.keys(items || {}).length
  ? items
  : {
    january: [
        {
          date: "Jan 1",
          name: "Chandra Darshana",
          tithi: "Pausha, Shukla Pratipada",
          desc: "Moon sighting",
        },
        {
          date: "Jan 3",
          name: "Vinayaka Chaturthi",
          tithi: "Pausha, Shukla Chaturthi",
          desc: "Worship of Lord Ganesha",
        },
        {
          date: "Jan 6",
          name: "Guru Gobind Singh Jayanti",
          tithi: "Pausha, Shukla Saptami",
          desc: "Birth anniversary of Sikh Guru",
        },
        {
          date: "Jan 13",
          name: "Lohri",
          tithi: "Solar Calendar",
          desc: "Punjabi harvest festival",
        },
        {
          date: "Jan 14",
          name: "Makar Sankranti",
          tithi: "Solar transition",
          desc: "Harvest festival; Sun enters Capricorn",
        },
        {
          date: "Jan 14",
          name: "Pongal",
          tithi: "Solar Calendar",
          desc: "Tamil harvest festival",
        },
        {
          date: "Jan 26",
          name: "Republic Day",
          tithi: "Fixed Date",
          desc: "National celebration in India",
        },
    ],
    february: [
        {
            date: "Feb 1",
            name: "Ganesha Jayanti",
            tithi: "Magha, Shukla Chaturthi",
            desc: "Birth anniversary of Lord Ganesha",
        },
        {
            date: "Feb 2",
            name: "Vasant Panchami",
            tithi: "Magha, Shukla Panchami",
            desc: "Worship of Saraswati, start of spring",
        },
        {
            date: "Feb 4",
            name: "Ratha Saptami",
            tithi: "Magha, Shukla Saptami",
            desc: "Worship of the Sun God",
        },
        {
            date: "Feb 5",
            name: "Bhishma Ashtami",
            tithi: "Magha, Shukla Ashtami",
            desc: "Observing Bhishma’s vow",
        },
        {
            date: "Feb 12",
            name: "Guru Ravidas Jayanti",
            tithi: "Magha, Shukla Purnima",
            desc: "Birth anniversary of Guru Ravidas",
        },
        {
            date: "Feb 14",
            name: "Valentine's Day",
            tithi: "Fixed Date",
            desc: "Celebration of love",
        },
        {
            date: "Feb 19",
            name: "Shivaji Maharaj Jayanti",
            tithi: "Fixed Date",
            desc: "Birth anniversary of Maratha King Shivaji",
        },
        {
            date: "Feb 26",
            name: "Maha Shivaratri",
            tithi: "Phalguna, Krishna Chaturdashi",
            desc: "Night worship of Lord Shiva",
        },
    ],
    march: [
        {
            date: "Mar 1",
            name: "Ramakrishna Jayanti",
            tithi: "Phalguna, Shukla Dwitiya",
            desc: "Birth of Ramakrishna Paramahamsa",
        },
        {
            date: "Mar 7",
            name: "Masik Durgashtami",
            tithi: "Phalguna, Shukla Ashtami",
            desc: "Monthly worship of Goddess Durga",
        },
        {
            date: "Mar 13",
            name: "Holika Dahan",
            tithi: "Phalguna, Shukla Purnima",
            desc: "Bonfire ritual before Holi",
        },
        {
            date: "Mar 14",
            name: "Holi",
            tithi: "Phalguna, Krishna Pratipada",
            desc: "Festival of colors",
        },
        {
            date: "Mar 14",
            name: "Dol Purnima",
            tithi: "Phalguna, Shukla Purnima",
            desc: "Bengal’s version of Holi",
        },
        {
            date: "Mar 20",
            name: "Vernal Equinox",
            tithi: "Astronomical",
            desc: "Equal day and night",
        },
        {
            date: "Mar 22",
            name: "Sheetala Ashtami",
            tithi: "Chaitra, Krishna Ashtami",
            desc: "Worship of Goddess Sheetala",
        },
        {
            date: "Mar 30",
            name: "Ugadi",
            tithi: "Chaitra, Shukla Pratipada",
            desc: "Telugu and Kannada New Year",
        },
    ],
    april: [
        {
            date: "Apr 1",
            name: "Vinayaka Chaturthi",
            tithi: "Chaitra, Shukla Chaturthi",
            desc: "Worship of Lord Ganesha",
        },
        {
            date: "Apr 6",
            name: "Rama Navami",
            tithi: "Chaitra, Shukla Navami",
            desc: "Birth anniversary of Lord Rama",
        },
        {
            date: "Apr 10",
            name: "Mahavir Jayanti",
            tithi: "Chaitra, Shukla Trayodashi",
            desc: "Birth anniversary of Lord Mahavir",
        },
        {
            date: "Apr 12",
            name: "Hanuman Jayanti",
            tithi: "Chaitra, Shukla Purnima",
            desc: "Birth of Lord Hanuman",
        },
        {
            date: "Apr 14",
            name: "Tamil New Year (Puthandu)",
            tithi: "Solar Calendar",
            desc: "Tamil New Year",
        },
        {
            date: "Apr 14",
            name: "Vishu",
            tithi: "Solar Calendar",
            desc: "Kerala New Year",
        },
        {
            date: "Apr 14",
            name: "Baisakhi",
            tithi: "Solar Calendar",
            desc: "Punjabi harvest festival",
        },
        {
            date: "Apr 30",
            name: "Akshaya Tritiya",
            tithi: "Vaishakha, Shukla Tritiya",
            desc: "Auspicious day for new beginnings",
        },
    ],
    may: [
        {
            date: "May 1",
            name: "International Worker's Day",
            tithi: "Fixed Date",
            desc: "Celebrating workers worldwide",
        },
        {
            date: "May 5",
            name: "Sita Navami",
            tithi: "Vaishakha, Shukla Navami",
            desc: "Birth anniversary of Goddess Sita",
        },
        {
            date: "May 7",
            name: "Rabindranath Tagore Jayanti",
            tithi: "Fixed Date",
            desc: "Birth of Tagore",
        },
        {
            date: "May 8",
            name: "Mohini Ekadashi",
            tithi: "Vaishakha, Shukla Ekadashi",
            desc: "Fasting for Lord Vishnu",
        },
        {
            date: "May 12",
            name: "Buddha Purnima",
            tithi: "Vaishakha, Shukla Purnima",
            desc: "Enlightenment of Gautama Buddha",
        },
        {
            date: "May 16",
            name: "Sankashti Chaturthi",
            tithi: "Jyeshtha, Krishna Chaturthi",
            desc: "Fasting for Lord Ganesha",
        },
        {
            date: "May 23",
            name: "Apara Ekadashi",
            tithi: "Jyeshtha, Krishna Ekadashi",
            desc: "Observance for Lord Vishnu",
        },
        {
            date: "May 27",
            name: "Shani Jayanti",
            tithi: "Jyeshtha, Krishna Amavasya",
            desc: "Birth anniversary of Shani Dev",
        },
    ],

    june: [
        {
            date: "June 1",
            name: "Skanda Sashti",
            tithi: "Jyeshtha, Shukla Shashthi",
            desc: "Worship of Lord Murugan",
        },
        {
            date: "June 5",
            name: "Ganga Dussehra",
            tithi: "Jyeshtha, Shukla Dashami",
            desc: "Worship of the Ganges River",
        },
        {
            date: "June 6",
            name: "Nirjala Ekadashi",
            tithi: "Jyeshtha, Shukla Ekadashi",
            desc: "Fasting without water for Lord Vishnu",
        },
        {
            date: "June 9",
            name: "Vaikasi Visakam",
            tithi: "Vishakha Nakshatra",
            desc: "Birth anniversary of Lord Murugan",
        },
        {
            date: "June 10",
            name: "Jyeshtha Purnima Vrat",
            tithi: "Jyeshtha, Shukla Purnima",
            desc: "Sacred bathing and charity",
        },
        {
            date: "June 11",
            name: "Kabirdas Jayanti",
            tithi: "Jyeshtha, Shukla Purnima",
            desc: "Birth anniversary of poet Kabirdas",
        },
        {
            date: "June 15",
            name: "Mithuna Sankranti",
            tithi: "Solar Calendar",
            desc: "Sun enters Gemini",
        },
        {
            date: "June 21",
            name: "International Yoga Day",
            tithi: "Fixed Date",
            desc: "Celebration of yoga",
        },
        {
            date: "June 26",
            name: "Ashadha Navratri Begins",
            tithi: "Ashadha, Shukla Pratipada",
            desc: "Nine-day worship of Goddess Durga",
        },
        {
            date: "June 27",
            name: "Jagannath Rath Yatra",
            tithi: "Ashadha, Shukla Dwitiya",
            desc: "Chariot festival of Lord Jagannath",
        },
    ],
    july: [
        {
            date: "July 6",
            name: "Devshayani Ekadashi",
            tithi: "Ashadha, Shukla Ekadashi",
            desc: "Lord Vishnu's cosmic sleep begins",
        },
        {
            date: "July 10",
            name: "Guru Purnima",
            tithi: "Ashadha, Shukla Purnima",
            desc: "Honoring spiritual teachers",
        },
        {
            date: "July 14",
            name: "First Shravan Somwar Vrat",
            tithi: "First Monday in Shravana",
            desc: "Worship of Lord Shiva",
        },
        {
            date: "July 17",
            name: "Kalashtami",
            tithi: "Shravana, Krishna Ashtami",
            desc: "Worship of Lord Bhairava",
        },
        {
            date: "July 21",
            name: "Kamika Ekadashi",
            tithi: "Shravana, Krishna Ekadashi",
            desc: "Observance for spiritual purification",
        },
        {
            date: "July 22",
            name: "Pradosh Vrat",
            tithi: "Shravana, Krishna Trayodashi",
            desc: "Evening worship for Lord Shiva",
        },
        {
            date: "July 24",
            name: "Hariyali Amavasya",
            tithi: "Shravana, Krishna Amavasya",
            desc: "New moon worship with greenery",
        },
        {
            date: "July 27",
            name: "Hariyali Teej",
            tithi: "Shravana, Shukla Tritiya",
            desc: "Celebrated by married women",
        },
        {
            date: "July 28",
            name: "Nag Panchami",
            tithi: "Shravana, Shukla Panchami",
            desc: "Worship of serpents",
        },
        {
            date: "July 30",
            name: "Kalki Jayanti",
            tithi: "Shravana, Shukla Shashthi",
            desc: "Birth anniversary of Lord Kalki",
        },
    ],
    august: [
        {
            date: "Aug 3",
            name: "Friendship Day",
            tithi: "1st Sunday of August",
            desc: "Celebration of friendships",
        },
        {
            date: "Aug 5",
            name: "Shravana Putrada Ekadashi",
            tithi: "Shravana, Shukla Ekadashi",
            desc: "Fasting for progeny and well-being",
        },
        {
            date: "Aug 8",
            name: "Varalakshmi Vrat",
            tithi: "Shravana, Shukla Friday",
            desc: "Observed by married women",
        },
        {
            date: "Aug 9",
            name: "Raksha Bandhan",
            tithi: "Shravana, Shukla Purnima",
            desc: "Celebration of sibling bonds",
        },
        {
            date: "Aug 14",
            name: "Balarama Jayanti",
            tithi: "Bhadrapada, Krishna Shashthi",
            desc: "Birth anniversary of Lord Balarama",
        },
        {
            date: "Aug 15",
            name: "Independence Day",
            tithi: "Fixed Date",
            desc: "India’s national celebration",
        },
        {
            date: "Aug 15",
            name: "Janmashtami *Smarta",
            tithi: "Bhadrapada, Krishna Ashtami",
            desc: "Birth of Lord Krishna",
        },
        {
            date: "Aug 19",
            name: "Aja Ekadashi",
            tithi: "Bhadrapada, Krishna Ekadashi",
            desc: "Observance for Lord Vishnu",
        },
        {
            date: "Aug 27",
            name: "Ganesh Chaturthi",
            tithi: "Bhadrapada, Shukla Chaturthi",
            desc: "Birthday of Lord Ganesha",
        },
        {
            date: "Aug 31",
            name: "Radha Ashtami",
            tithi: "Bhadrapada, Shukla Ashtami",
            desc: "Birth of Goddess Radha",
        },
    ],
    september: [
        {
            date: "Sept 2",
            name: "Parsva Ekadashi",
            tithi: "Bhadrapada, Shukla Ekadashi",
            desc: "Observance for Lord Vishnu",
        },
        {
            date: "Sept 5",
            name: "Onam",
            tithi: "Simha, Shravana Nakshatra",
            desc: "Kerala’s harvest festival",
        },
        {
            date: "Sept 5",
            name: "Teacher's Day",
            tithi: "Fixed Date",
            desc: "Honoring educators",
        },
        {
            date: "Sept 6",
            name: "Ganesh Visarjan",
            tithi: "Bhadrapada, Shukla Chaturdashi",
            desc: "Immersion of Lord Ganesha’s idols",
        },
        {
            date: "Sept 14",
            name: "Mahalakshmi Vrat Ends",
            tithi: "Ashwina, Krishna Ashtami",
            desc: "Conclusion of Mahalakshmi fasting",
        },
        {
            date: "Sept 16",
            name: "Vishwakarma Puja",
            tithi: "Kanya Sankranti",
            desc: "Worship of Lord Vishwakarma",
        },
        {
            date: "Sept 17",
            name: "Indira Ekadashi",
            tithi: "Ashwina, Krishna Ekadashi",
            desc: "Fasting for Lord Vishnu",
        },
        {
            date: "Sept 19",
            name: "Sarva Pitru Amavasya",
            tithi: "Ashwina, Krishna Amavasya",
            desc: "Last day of Shraddha (ancestor worship)",
        },
        {
            date: "Sept 22",
            name: "Navratri Begins",
            tithi: "Ashwina, Shukla Pratipada",
            desc: "Start of nine-day Durga Puja",
        },
        {
            date: "Sept 30",
            name: "Durga Ashtami",
            tithi: "Ashwina, Shukla Ashtami",
            desc: "Worship of Goddess Durga",
        },
    ],
    october: [
        {
            date: "Oct 2",
            name: "Vijayadashami (Dussehra)",
            tithi: "Ashwina, Shukla Dashami",
            desc: "Triumph of good over evil",
        },
        {
            date: "Oct 6",
            name: "Sharad Purnima",
            tithi: "Ashwina, Shukla Purnima",
            desc: "Moonlit night for prosperity",
        },
        {
            date: "Oct 10",
            name: "Karwa Chauth",
            tithi: "Kartika, Krishna Chaturthi",
            desc: "Fast for marital bliss",
        },
        {
            date: "Oct 18",
            name: "Dhanteras",
            tithi: "Kartika, Krishna Trayodashi",
            desc: "Start of Diwali festivities",
        },
        {
            date: "Oct 20",
            name: "Diwali (Lakshmi Puja)",
            tithi: "Kartika, Krishna Amavasya",
            desc: "Festival of lights",
        },
        {
            date: "Oct 22",
            name: "Govardhan Puja",
            tithi: "Kartika, Shukla Pratipada",
            desc: "Worship of Lord Krishna",
        },
        {
            date: "Oct 23",
            name: "Bhai Dooj",
            tithi: "Kartika, Shukla Dwitiya",
            desc: "Celebration of sibling bonds",
        },
        {
            date: "Oct 27",
            name: "Chhath Puja",
            tithi: "Kartika, Shukla Shashthi",
            desc: "Worship of the Sun God",
        },
    ],
    november: [
        {
            date: "Nov 1",
            name: "Devutthana Ekadashi",
            tithi: "Kartika, Shukla Ekadashi",
            desc: "Lord Vishnu awakens from cosmic sleep",
        },
        {
            date: "Nov 2",
            name: "Tulasi Vivah",
            tithi: "Kartika, Shukla Dwadashi",
            desc: "Ritual marriage of Tulasi plant",
        },
        {
            date: "Nov 5",
            name: "Dev Diwali",
            tithi: "Kartika, Shukla Purnima",
            desc: "Festival of lights in Varanasi",
        },
        {
            date: "Nov 5",
            name: "Guru Nanak Jayanti",
            tithi: "Kartika, Shukla Purnima",
            desc: "Birth of Guru Nanak",
        },
        {
            date: "Nov 15",
            name: "Vrishchika Sankranti",
            tithi: "Solar Calendar",
            desc: "Sun enters Scorpio",
        },
        {
            date: "Nov 19",
            name: "Darsha Amavasya",
            tithi: "Margashirsha, Krishna Amavasya",
            desc: "New moon observance",
        },
        {
            date: "Nov 25",
            name: "Vivah Panchami",
            tithi: "Margashirsha, Shukla Panchami",
            desc: "Marriage anniversary of Rama & Sita",
        },
    ],
    december: [
        {
            date: "Dec 1",
            name: "Mokshada Ekadashi",
            tithi: "Margashirsha, Shukla Ekadashi",
            desc: "Observed for spiritual upliftment",
        },
        {
            date: "Dec 4",
            name: "Dattatreya Jayanti",
            tithi: "Margashirsha, Shukla Purnima",
            desc: "Celebrating Lord Dattatreya",
        },
        {
            date: "Dec 18",
            name: "Masik Shivaratri",
            tithi: "Pausha, Krishna Chaturdashi",
            desc: "Night worship of Lord Shiva",
        },
        {
            date: "Dec 21",
            name: "Winter Solstice",
            tithi: "Astronomical Event",
            desc: "Shortest day of the year",
        },
        {
            date: "Dec 24",
            name: "Vinayaka Chaturthi",
            tithi: "Pausha, Shukla Chaturthi",
            desc: "Worship of Lord Ganesha",
        },
        {
            date: "Dec 27",
            name: "Guru Gobind Singh Jayanti",
            tithi: "Pausha, Shukla Saptami",
            desc: "Birth anniversary of Sikh Guru",
        },
        {
            date: "Dec 31",
            name: "Vaikuntha Ekadashi",
            tithi: "Pausha, Shukla Ekadashi",
            desc: "Gateway to spiritual salvation",
        },
    ],

    };

  const currentKey = monthKeys[currentIndex];
  const currentData = festivalData[currentKey] || [];

  // ✅ Splide
  const sliderRef = useSplide(
    {
      perPage: 1,
      arrows: false,
      pagination: true,
      drag: true,
    },
    [currentKey]
  );

  // ✅ month change
  const changeMonth = (dir) => {
    setCurrentIndex((prev) => {
      const next = (prev + dir + 12) % 12;
      return next;
    });
  };

  // ✅ chunk rows into slides (6 rows per slide)
  const chunk = (arr, size) =>
    arr.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);

  const slides = chunk(currentData, 8);

  if (!monthKeys.length) return null;

  return (
    <>
      {/* SVG Icons */}
      <svg style={{ display: "none" }}>
        <symbol id="IconNext" viewBox="0 0 16 16">
          <path
            d="M6.38 4.11L10.27 8L6.38 11.89"
            stroke="#180F40"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="IconPrev" viewBox="0 0 16 16">
          <path
            d="M9.62 4.11L5.73 8L9.62 11.89"
            stroke="#180F40"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
      </svg>

      <div className="festivalCalender_Widget">
        <div className="tv9common-heading">
          <h2 className="h2">{title}</h2>

          {/* Month Switch */}
          <div className="monthSelector">
            <button
              className="nav-button"
              onClick={() => changeMonth(-1)}
            >
              <svg>
                <use href="#IconPrev" />
              </svg>
            </button>

            <span className="month">
              {MONTH_NAMES[currentKey]}
            </span>

            <button
              className="nav-button"
              onClick={() => changeMonth(1)}
            >
              <svg>
                <use href="#IconNext" />
              </svg>
            </button>
          </div>
        </div>

        {/* Splide */}
        <div ref={sliderRef} className="splide festivalSlider">
          <div className="splide__track">
            <div className="splide__list">
              {slides.map((group, idx) => (
                <div className="splide__slide" key={idx}>
                  <div className="festivalCal_TableWrap">
                    <table>
                      <thead>
                        <tr>
                          <th>तारीख</th>
                          <th>त्योहार/अवसर</th>
                          <th>तिथि/नक्षत्र</th>
                          <th>अतिरिक्त जानकारी</th>
                        </tr>
                      </thead>

                      <tbody>
                        {group.map((row, i) => (
                          <tr key={i}>
                            <td>{row.date}</td>
                            <td>{row.name}</td>
                            <td>{row.tithi}</td>
                            <td>{row.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .festivalCalender_Widget{margin-bottom:1.88rem;}
        .festivalCalender_Widget .tv9common-heading{margin-bottom:1.25rem;}
        .festivalCalender_Widget .tv9common-heading::before{display:none;}
        .festivalCalender_Widget .monthSelector{display:flex;align-items:center}
        .festivalCalender_Widget .monthSelector .nav-button{width:1.25rem;height:1.25rem;background-color:#d1c6ff;border-radius:50%;border:none;cursor:pointer;position:relative;display:flex;align-items:center;justify-content:center}
        .festivalCalender_Widget .monthSelector .nav-button svg{fill:none;width:1rem;height:1rem;}
        .festivalCalender_Widget .monthSelector .month{min-width:85px;text-align:center;font-size:1.125rem;font-weight:500;text-transform:uppercase;color: #000;}
        .festivalCal_TableWrap{border-radius:0rem 0rem .625rem .625rem;border:1px solid #e8eafb;background:#fff;box-shadow:0 4px 4px 0 rgba(174,175,175,.12);overflow:auto}
        .festivalCal_TableWrap table{width:100%;border-collapse:collapse}
        .festivalCal_TableWrap table tr:nth-child(even){background:#f5f5f5;}
        .festivalCal_TableWrap table td,.festivalCal_TableWrap table th{padding:0.9375rem;font-size:1rem;text-align:left;border-right:1px solid #e8eafb;white-space: nowrap;}
        .festivalCal_TableWrap table td:last-child,.festivalCal_TableWrap table th:last-child{border-right:none}
        .festivalCal_TableWrap table th{background:#190388;color:#fff;text-transform:uppercase;font-weight:600}
        .festivalCal_TableWrap table td{font-weight:400}
        .festivalCal_TableWrap table td:first-child{font-weight:600}
        `}</style>
    </>
  );
}