import { useState } from "react";

import { FLAG_BASE_URL } from "@/lib/constants";

function slugify(str) {
  if (!str) return "";
  return str.toLowerCase().replace(/women/gi, "").trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const d = new Date(parts[2], parts[0] - 1, parts[1]);
      return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

function formatTime(timeStr) {
  if (!timeStr) return "";
  // timeStr is like "13:30"
  try {
    const [h, m] = timeStr.split(":");
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const h12 = hour % 12 || 12;
    return `${String(h12).padStart(2, "0")}:${m} ${ampm}`;
  } catch {
    return timeStr;
  }
}

function getMonth(dateStr) {
  if (!dateStr) return null;
  try {
    const parts = dateStr.split("/");
    if (parts.length === 3) return parseInt(parts[0], 10);
    return null;
  } catch {
    return null;
  }
}

export default function IccScheduleDataWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
}) {
  const [activeMatchType, setActiveMatchType] = useState("all");
  const [activeMonth, setActiveMonth] = useState("all");

  // Data is at items[0].matches
  const allMatches = Array.isArray(items?.[0]?.matches)
    ? items[0].matches
    : [];

  // Build unique month tabs from series_start_date (same as PHP: array_unique(array_column($scheduledMatchesContent, 'series_start_date')))
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const seenMonths = new Set();
  const monthTabs = [];
  allMatches.forEach((match) => {
    const dateStr = match?.series_start_date || match?.matchdate_ist || "";
    const m = getMonth(dateStr);
    if (m !== null && !seenMonths.has(m)) {
      seenMonths.add(m);
      monthTabs.push(m);
    }
  });

  // Filter matches based on both matchtype AND month (same logic as WordPress JS)
  const filteredMatches = allMatches.filter((match) => {
    if (!match) return false;
    const matchType = (match.matchtypes || "").toUpperCase();
    const matchMonth = getMonth(match.matchdate_ist);

    const typeMatch = activeMatchType === "all" || matchType === activeMatchType.toUpperCase();
    const monthMatch = activeMonth === "all" || String(matchMonth) === String(activeMonth);

    return typeMatch && monthMatch;
  });

  if (!allMatches || allMatches.length === 0) {
    return (
      <div className="common_section">
        <div className="common-heading">
          <h1><span><span>क्रिकेट मैच</span> शेड्यूल 2026</span></h1>
        </div>
        <div className="no-data-available">
          <span>No Match Available</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="common_section">
        <div className="common-heading">
          <h1><span><span>क्रिकेट मैच</span> शेड्यूल 2026</span></h1>
        </div>

        <style jsx>{`
          .upcomingMatch .card_wrapper{overflow-y:auto;height:600px;padding-right:6px}
          .upcomingMatch .card_wrapper::-webkit-scrollbar{width:3px}
          .upcomingMatch .card_wrapper::-webkit-scrollbar-track{background:#E7E7E7;border-radius:10px}
          .upcomingMatch .card_wrapper::-webkit-scrollbar-thumb{background:#A3A3A3;border-radius:10px}
          .upcomingMatch .card_wrapper::-webkit-scrollbar-thumb:hover{background:#ab1111}
          .card_wrapper{display:flex;flex-wrap:wrap;justify-content:space-between}
          .card_wrapper figure{background:#FFFFFF;border:1px solid #DDDDDD;border-radius:8px;position:relative;width:100%;margin-bottom:15px;padding:8px 0}
          .card_wrapper .matchName{color:#000000;font-size:12px;font-weight:600;text-transform:uppercase;padding-bottom:6px;line-height:19px;text-align:center}
          .card_wrapper .matchName span{color:#000;text-transform:uppercase}
          .card_wrapper .datetime{padding-bottom:6px;font-weight:600;color:#dc0000;font-size:14px;line-height:22px;text-align:center;border-bottom:1px dashed #D9D9D9;text-transform:uppercase}
          .card_wrapper .datetime .timeformat{font-weight:400;font-size:10px;line-height:16px;text-transform:uppercase;color:#707070}
          .card_wrapper .matchinfo{margin:5px 0;min-height:60px;align-items:center;display:flex;justify-content:space-between;padding:0 15px}
          .card_wrapper .matchinfo .team{display:flex;align-items:center}
          .card_wrapper .matchinfo .team .team_logo{vertical-align:middle;align-items:center;display:flex}
          .card_wrapper .matchinfo .team .team_logo img{margin-right:5px;vertical-align:middle}
          .card_wrapper .matchinfo .team .teamScore p{font-weight:500;font-size:11px;line-height:18px;text-transform:uppercase;color:#000000;margin:0}
          .card_wrapper .matchinfo .team .teamScore:nth-child(odd){text-align:right;padding-right:5px}
          .card_wrapper .matchinfo .team-divider{position:relative;z-index:0}
          .card_wrapper .matchinfo .team-divider span{font-weight:600;font-size:18px;line-height:29px;text-transform:uppercase;color:#000000;background:#fff;margin:0 10px;display:inline-block}
          .card_wrapper .matchinfo .team-divider:before{position:absolute;left:0;right:0;height:4px;width:40px;border-top:solid 1px #000000;content:'';top:50%;z-index:-1}
          .card_wrapper .place{text-align:center;font-weight:500;color:#737373;font-size:11px;line-height:18px}
          .match_filter_wrap{display:inline-block;margin-bottom:0;position:relative;width:100%}
          .by_cat_filter,.by_month_filter{background:#f1f5f9;border-radius:8px;margin:0 10px 6px 0;padding:5px;width:200px;float:left;box-sizing:border-box}
          .by_month_filter{width:calc(100% - 210px);margin-right:0}
          .filter_tabs{display:flex;flex-wrap:nowrap;overflow-y:hidden;overflow-x:auto;white-space:nowrap}
          .by_cat_filter a,.by_month_filter a{color:#4b4b4b;font-size:14px;line-height:32px;padding:0 12px;margin:0;position:relative;white-space:nowrap;text-decoration:none}
          .by_cat_filter a.tag_active,.by_cat_filter a.tag_active:hover,.by_month_filter a.tag_active,.by_month_filter a.tag_active:hover{background:#1450d2;color:#fff;border-radius:6px}
          .by_cat_filter a:hover,.by_month_filter a:hover{background:#e9edf1;color:#4b4b4b;border-radius:6px}
          .by_cat_filter a::after,.by_month_filter a::after{background:#d8dce0;content:"";position:absolute;right:-1px;height:14px;width:1px;top:10px}
          .by_cat_filter a.tag_active::after,.by_cat_filter a:last-child::after,.by_month_filter a.tag_active::after,.by_month_filter a:last-child::after{width:0}
          .filter_tabs::-webkit-scrollbar{height:2px;width:0;display:none}
          .filter_tabs::-webkit-scrollbar-track{background:#101f35}
          .filter_tabs::-webkit-scrollbar-thumb{background:#ccc}
          .filter_tabs::-webkit-scrollbar-thumb:hover{background:#ccc}
          .no-data-available{font-size:18px;padding:15px;text-align:center;font-weight:600;text-transform:uppercase;width:100%}
          @media(min-width:1000px){
            .upcomingMatch .card_wrapper{height:unset;overflow-y:unset;justify-content:flex-start;padding-right:0}
            .card_wrapper figure{width:32.5%}
          }
        `}</style>

        <div className="match_filter_wrap">
          {/* Match Type Filter */}
          <div className="by_cat_filter">
            <div className="filter_tabs">
              <a
                href="#"
                className={`matchtype-filter${activeMatchType === "all" ? " tag_active" : ""}`}
                onClick={(e) => { e.preventDefault(); setActiveMatchType("all"); }}
              >
                All
              </a>
              <a
                href="#"
                className={`matchtype-filter${activeMatchType === "odi" ? " tag_active" : ""}`}
                onClick={(e) => { e.preventDefault(); setActiveMatchType("odi"); }}
              >
                ODI
              </a>
              <a
                href="#"
                className={`matchtype-filter${activeMatchType === "test" ? " tag_active" : ""}`}
                onClick={(e) => { e.preventDefault(); setActiveMatchType("test"); }}
              >
                Test
              </a>
              <a
                href="#"
                className={`matchtype-filter${activeMatchType === "t20" ? " tag_active" : ""}`}
                onClick={(e) => { e.preventDefault(); setActiveMatchType("t20"); }}
              >
                T20
              </a>
            </div>
          </div>

          {/* Month Filter */}
          <div className="by_month_filter">
            <div className="filter_tabs">
              <a
                href="#"
                className={`month-filter${activeMonth === "all" ? " tag_active" : ""}`}
                onClick={(e) => { e.preventDefault(); setActiveMonth("all"); }}
              >
                All
              </a>
              {monthTabs.map((m) => (
                <a
                  key={m}
                  href="#"
                  className={`month-filter${String(activeMonth) === String(m) ? " tag_active" : ""}`}
                  onClick={(e) => { e.preventDefault(); setActiveMonth(String(m)); }}
                >
                  {monthNames[m - 1]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="card_wrapper">
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match, idx) => {
              const teama = match.teama || "";
              const teamb = match.teamb || "";
              const teamaEng = match.teama_eng || "";
              const teambEng = match.teamb_eng || "";
              const matchNumber = match.matchnumber || "";
              const matchDateIst = match.matchdate_ist || "";
              const matchTimeIst = match.matchtime_ist || "";
              const venue = match.venue || "";

              const team1FlagSlug = slugify(teamaEng);
              const team2FlagSlug = slugify(teambEng);

              const team1Flag = `${FLAG_BASE_URL}${team1FlagSlug || "TBD"}.png`;
              const team2Flag = `${FLAG_BASE_URL}${team2FlagSlug || "TBD"}.png`;

              return (
                <figure className="result-box" key={match.match_Id || idx}>
                  <div className="matchName">
                    {teama} AND {teamb} | <span>{matchNumber}</span>
                  </div>

                  <div className="datetime">
                    {formatDate(matchDateIst)}{" "}
                    <span className="timeformat">{formatTime(matchTimeIst)} IST</span>
                  </div>

                  <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={team1Flag}
                          alt={teama}
                          width={44}
                          height={44}
                          onError={(e) => { e.target.onerror = null; e.target.src = `${FLAG_BASE_URL}TBD.png`; }}
                        />
                      </div>
                      <div className="teamScore">
                        <p>{teama}</p>
                      </div>
                    </div>

                    <div className="team-divider">
                      <span>vs</span>
                    </div>

                    <div className="team">
                      <div className="teamScore">
                        <p>{teamb}</p>
                      </div>
                      <div className="team_logo">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={team2Flag}
                          alt={teamb}
                          width={44}
                          height={44}
                          onError={(e) => { e.target.onerror = null; e.target.src = `${FLAG_BASE_URL}TBD.png`; }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="place">
                    <p>{venue}</p>
                  </div>
                </figure>
              );
            })
          ) : (
            <div className="no-data-available">
              <span>No Match Available</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
