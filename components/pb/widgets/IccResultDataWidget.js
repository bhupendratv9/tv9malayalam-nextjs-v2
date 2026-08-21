import React from "react";

const FLAG_BASE_URL = "https://images.tv9hindi.com/images/large_flags/";

function slugify(str) {
    if (!str) return "";
    return str.toLowerCase().replace(/women/gi, "").trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default function IccResultDataWidget({
    title = "",
    items = [],
    dataConfig = {},
}) { 
    // items = [{ matches: [...] }, ...]  — flatten all groups into one array
    const matchList = Array.isArray(items)
        ? items.flatMap((group) => (Array.isArray(group?.matches) ? group.matches : []))
        : [];

    const filterTabs = [
        { label: "All",  value: "all"  },
        { label: "ODI",  value: "ODI"  },
        { label: "Test", value: "Test" },
        { label: "T20",  value: "T20"  },
    ];

    const [activeFilter, setActiveFilter] = React.useState("all");
    const [activeMonth, setActiveMonth]   = React.useState("all");

    // Build unique month tabs from matchdate_ist (format: "M/D/YYYY")
    const monthTabs = React.useMemo(() => {
        const seen = new Set();
        const tabs = [];
        matchList.forEach((m) => {
            const date = m?.matchdate_ist;
            if (!date) return;
            const parts = date.split("/");
            if (parts.length < 3) return;
            const month = parseInt(parts[0], 10);
            const year  = parseInt(parts[2], 10);
            const key   = `${month}-${year}`;
            if (!seen.has(key)) {
                seen.add(key);
                const label = new Date(year, month - 1, 1).toLocaleString("en-US", {
                    month: "short",
                    year: "numeric",
                });
                tabs.push({ label, value: key, month, year });
            }
        });
        return tabs.sort((a, b) => b.year - a.year || b.month - a.month);
    }, [matchList]);

    // Apply both filters together
    const filteredMatches = matchList.filter((m) => {
        const typeMatch =
            activeFilter === "all" ||
            (m?.matchtype || "").toLowerCase() === activeFilter.toLowerCase();

        let monthMatch = true;
        if (activeMonth !== "all") {
            const parts = (m?.matchdate_ist || "").split("/");
            if (parts.length >= 3) {
                monthMatch = `${parseInt(parts[0], 10)}-${parseInt(parts[2], 10)}` === activeMonth;
            } else {
                monthMatch = false;
            }
        }

        return typeMatch && monthMatch;
    });

    // Flag URL using English team name — same as IccScheduleDataWidget
    const getFlagUrl = (teamNameEng) => `${FLAG_BASE_URL}${slugify(teamNameEng) || "TBD"}.png`;

    // Scorecard URL from matchfile
    const getScorecardUrl = (match) =>
        match?.matchfile ? `/sports/cricket-news/${match.matchfile}.html` : "#";

    return (
        <>
            <div className="common_section">
                <div className="common-heading">
                    <h1>
                        <span>
                            <span>क्रिकेट मैच</span> रिजल्ट 2026
                        </span>
                    </h1>
                </div>

                <style jsx>{`
                    .card_wrapper {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                    }
                    .card_wrapper figure {
                        background: #fff;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        position: relative;
                        width: 100%;
                        margin-bottom: 15px;
                        padding: 8px 0;
                    }
                    .matchName {
                        color: #000;
                        font-size: 12px;
                        font-weight: 600;
                        text-transform: uppercase;
                        padding-bottom: 6px;
                        line-height: 19px;
                        text-align: center;
                    }
                    .matchName span {
                        text-transform: capitalize;
                    }
                    .datetime {
                        padding-bottom: 6px;
                        font-weight: 600;
                        color: #dc0000;
                        font-size: 14px;
                        line-height: 22px;
                        text-align: center;
                        border-bottom: 1px dashed #d9d9d9;
                    }
                    .timeformat {
                        font-weight: 400;
                        font-size: 10px;
                        color: #707070;
                        margin-left: 5px;
                    }
                    .matchinfo {
                        margin: 5px 0;
                        min-height: 60px;
                        align-items: center;
                        display: flex;
                        justify-content: space-between;
                        padding: 0 15px;
                    }
                    .team {
                        display: flex;
                        align-items: center;
                        gap: 6px;
                    }
                    .team_logo {
                        display: flex;
                        align-items: center;
                    }
                    .team_logo img {
                        vertical-align: middle;
                    }
                    .teamScore p {
                        font-weight: 500;
                        font-size: 11px;
                        line-height: 18px;
                        text-transform: uppercase;
                        color: #000;
                        margin: 0;
                    }
                    .team-divider span {
                        font-weight: 600;
                        font-size: 18px;
                    }
                    .place {
                        text-align: center;
                        font-weight: 500;
                        color: #737373;
                        font-size: 11px;
                        line-height: 24px;
                    }
                    .place p {
                        margin: 0;
                    }
                    .filter_tabs {
                        display: flex;
                        gap: 10px;
                        flex-wrap: wrap;
                        margin-bottom: 15px;
                    }
                    .filter_btn {
                        border: 1px solid #ddd;
                        background: #fff;
                        padding: 6px 12px;
                        cursor: pointer;
                        border-radius: 4px;
                        font-size: 13px;
                        font-weight: 500;
                    }
                    .filter_btn.active {
                        background: #dc0000;
                        color: #fff;
                        border-color: #dc0000;
                    }
                    .card_wrapper .result_card {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-width: 200px;
                        margin-top: 10px;
                    }
                    .card_wrapper .result_card a {
                        text-decoration: none;
                    }
                    .card_wrapper .result_card span {
                        background: rgba(220, 0, 0, 0.08);
                        border: 1px solid rgba(220, 0, 0, 0.8);
                        border-radius: 20px;
                        font-weight: 500;
                        font-size: 11px;
                        line-height: 18px;
                        text-transform: capitalize;
                        color: #dc0000;
                        padding: 4px 10px;
                        display: block;
                    }
                    .no-data-available {
                        text-align: center;
                        padding: 20px;
                        color: #737373;
                        font-size: 14px;
                    }
                    @media (min-width: 1000px) {
                        .card_wrapper figure {
                            width: 31.33%;
                            margin-right: 1%;
                            margin-left: 1%;
                        }
                    }
                `}</style>

                <div className="match_filter_wrap">
                    {/* Month filter — auto-generated from match dates */}
                    <div className="by_month_filter">
                        <div className="filter_tabs">
                            <button
                                className={`filter_btn${activeMonth === "all" ? " active" : ""}`}
                                onClick={() => setActiveMonth("all")}
                            >
                                All
                            </button>
                            {monthTabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    className={`filter_btn${activeMonth === tab.value ? " active" : ""}`}
                                    onClick={() => setActiveMonth(tab.value)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Match type filter */}
                    <div className="by_cat_filter">
                        <div className="filter_tabs">
                            {filterTabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    className={`filter_btn${activeFilter === tab.value ? " active" : ""}`}
                                    onClick={() => setActiveFilter(tab.value)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {filteredMatches.length > 0 ? (
                    <div className="card_wrapper">
                        {filteredMatches.map((match, index) => (
                            <figure key={match?.match_Id || index} className="result-box">
                                <a href={getScorecardUrl(match)} title="Full Scorecard">

                                    {/* Series name | Match number */}
                                    <div className="matchName">
                                        {match?.seriesname_short || match?.seriesname}
                                        {match?.matchnumber && (
                                            <> | <span>{match.matchnumber}</span></>
                                        )}
                                    </div>

                                    {/* Date and time */}
                                    <div className="datetime">
                                        {match?.matchdate_ist}
                                        {match?.matchtime_ist && (
                                            <span className="timeformat">{match.matchtime_ist} IST</span>
                                        )}
                                    </div>

                                    {/* Venue */}
                                    {match?.venue && (
                                        <div className="place">
                                            <p>{match.venue}</p>
                                        </div>
                                    )}

                                    {/* Teams */}
                                    <div className="matchinfo">
                                        {/* Team A — left */}
                                        <div className="team">
                                            <div className="team_logo">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={getFlagUrl(match?.teama_eng || match?.teama)}
                                                    alt={match?.teama || ""}
                                                    width={44}
                                                    height={44}
                                                    onError={(e) => { e.target.onerror = null; e.target.src = `${FLAG_BASE_URL}TBD.png`; }}
                                                />
                                            </div>
                                            <div className="teamScore">
                                                <p>{match?.teama}</p>
                                            </div>
                                        </div>

                                        <div className="team-divider">
                                            <span>VS</span>
                                        </div>

                                        {/* Team B — right */}
                                        <div className="team">
                                            <div className="teamScore">
                                                <p>{match?.teamb}</p>
                                            </div>
                                            <div className="team_logo">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={getFlagUrl(match?.teamb_eng || match?.teamb)}
                                                    alt={match?.teamb || ""}
                                                    width={44}
                                                    height={44}
                                                    onError={(e) => { e.target.onerror = null; e.target.src = `${FLAG_BASE_URL}TBD.png`; }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Match result */}
                                    {match?.matchresult && (
                                        <div className="place">
                                            <p>{match.matchresult}</p>
                                        </div>
                                    )}

                                    <div className="result_card">
                                        <span>Full Scorecard</span>
                                    </div>
                                </a>
                            </figure>
                        ))}
                    </div>
                ) : (
                    <div className="no-data-available">
                        <span>No Match Available</span>
                    </div>
                )}
            </div>
        </>
    );
}
