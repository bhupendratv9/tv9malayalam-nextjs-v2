"use client";
import React, { useState, useEffect } from "react";

const PLAYER_IMG_BASE = "https://images.tv9hindi.com/images/player_images/players/";
const FLAG_IMG_BASE   = "https://images.tv9hindi.com/images/flags/";

// Reusable client-side fetch hook — same pattern as other widgets in this project
function useClientFetch(url) {
    const [data, setData] = useState([]);
    useEffect(() => {
        if (!url) return;
        let cancelled = false;
        fetch(url, { headers: { Accept: "application/json" } })
            .then((res) => (res.ok ? res.json() : null))
            .then((json) => {
                if (!cancelled && json) {
                    const list = Array.isArray(json) ? json : (json?.items || json?.data || []);
                    setData(list);
                }
            })
            .catch(() => {});
        return () => { cancelled = true; };
    }, [url]);
    return data;
}

function slugify(str) {
    if (!str) return "";
    return str.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// Map API keys to display labels for the stats tables
const FORMAT_LABELS = [
    { key: "Test",                label: "Test"   },
    { key: "ODI",                 label: "ODI"    },
    { key: "T20I",                label: "T20I"   },
    { key: "Domestic-Firstclass", label: "FC"     },
    { key: "Domestic-Lista",      label: "List A" },
    { key: "Domestic-T20",        label: "T20"    },
];

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const yOffset = -50;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
    }
}

export default function CricketPlayerBiography({
    title = "",
    items = [],
    dataConfig = {},
}) {
    const [activeTab, setActiveTab]     = useState("playerInfo");
    const [bioExpanded, setBioExpanded] = useState(false);

    // News data fetched client-side from dataConfig.endpoint
    const rawEndpoint2 = dataConfig.endpoint2 || "";
    const newsItems    = useClientFetch(rawEndpoint2);

    // items is an array; player data is at items[0]
    const player = Array.isArray(items) && items.length > 0 ? items[0] : null;

    if (!player) {
        return <div className="common_section team-profile"><p>No player data available.</p></div>;
    }

    const slug         = slugify(player?.player_name || player?.name || "");
    const playerId     = player?.player_id || "";
    const playerImgSrc = `${PLAYER_IMG_BASE}${slug}-${playerId}.jpg`;
    const teamSlug     = slugify(player?.team_name_eng || player?.team_name || "");
    const flagSrc      = `${FLAG_IMG_BASE}${teamSlug}.png`;

    // Build share URL and title dynamically from player data
    const shareUrl   = typeof window !== "undefined"
        ? window.location.href
        : `/sports/cricket-news/player-profile/${slug}-${playerId}`;
    const shareTitle = player?.name
        ? `${player.name} Profile - ${player.name} ICC रैंकिंग, करियर, बैटिंग, बोलिंग आंकड़े, लेटेस्ट न्यूज़ हिंदी में`
        : "";

    const handleShare = () => {
        if (typeof navigator === "undefined" || typeof navigator.share === "undefined") {
            console.warn("Web Share API not available in this browser.");
            return;
        }
        navigator.share({ title: shareTitle, url: shareUrl, text: "" })
            .catch((err) => { console.warn("Share cancelled or failed:", err); });
    };

    // Bio HTML from API (encoded HTML entities)
    const bioHtml = player?.Bio || "";

    // Build batting & bowling rows
    const battingRows = FORMAT_LABELS.map(({ key, label }) => {
        const entry   = player[key];
        const batting = Array.isArray(entry) ? entry[0]?.Batting : null;
        return { label, batting };
    });

    const bowlingRows = FORMAT_LABELS.map(({ key, label }) => {
        const entry   = player[key];
        const bowling = Array.isArray(entry) ? entry[0]?.Bowling : null;
        return { label, bowling };
    });

    const tabs = [
        { id: "playerInfo",   label: "Player Info"   },
        { id: "battingStats", label: "Batting Stats"  },
        { id: "bowlingStats", label: "Bowling Stats"  },
        { id: "news",         label: "News"           },
    ];

    return (
        <>
            <div className="common_section team-profile">
                <style>{`
                    .playerProfile_WidgetWrapper{background-color:#E5F2FF;border:1px solid #CEE4F8;border-radius:8px;padding:20px;margin-bottom:20px;display:flex;justify-content:flex-start;position:relative}
                    .playerProfile_WidgetWrapper .playerDetails_Wrap{display:flex;justify-content:flex-start;width:400px;margin-right:25px;position:relative;padding-right:25px}
                    .playerProfile_WidgetWrapper .playerDetails_Wrap::after{content:'';width:1px;height:80%;background-color:#CEE4F8;right:0;position:absolute;top:50%;transform:translateY(-50%)}
                    .playerProfile_WidgetWrapper .playerDetails_Wrap .playerImg{width:140px;height:140px;margin-right:20px}
                    .playerProfile_WidgetWrapper .playerDetails_Wrap .playerImg img{display:block;border:1px solid #E6E6E6;border-radius:50%;height:auto;width:100%}
                    .playerProfile_WidgetWrapper .playerDetails_Wrap .playerInfo{width:calc(100% - 160px)}
                    .playerProfile_WidgetWrapper .playerDetails_Wrap .playerInfo .playerName{display:flex;align-items:center;margin-bottom:8px}
                    .playerProfile_WidgetWrapper .playerDetails_Wrap .playerInfo .playerDetails{padding-left:0}
                    .playerProfile_WidgetWrapper .playerDetails_Wrap .playerInfo .h2{font-size:1.2rem;line-height:1.5625rem;font-weight:700;color:#00214A}
                    .playerProfile_WidgetWrapper .playerDetails_Wrap .playerInfo img{display:block;margin-left:10px;width:25px;height:25px}
                    .playerProfile_WidgetWrapper .playerDetails_Wrap .playerInfo strong{display:block;font-size:1rem;line-height:1.875rem;font-weight:600;color:#000}
                    .playerProfile_WidgetWrapper .playerDetails_Wrap .playerInfo span{display:block;font-size:0.875rem;line-height:1.875rem;font-weight:400;color:#000}
                    .playerProfile_WidgetWrapper .playerDescription_Wrap{width:calc(100% - 425px)}
                    .playerProfile_WidgetWrapper .playerDescription_Wrap .playerDesc{overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:5;display:-webkit-box;-webkit-box-orient:vertical;text-align:left}
                    .playerProfile_WidgetWrapper .playerDescription_Wrap .playerDesc.expanded{-webkit-line-clamp:unset;display:block}
                    .playerProfile_WidgetWrapper .playerDescription_Wrap .appendMore{color:#dc0000;font-size:0.90rem;font-weight:400;line-height:30px;cursor:pointer}
                    .playerProfile_WidgetWrapper .playerDescription_Wrap .appendMore::after{content:"";display:inline-block;width:6px;height:6px;border:solid #dc0000;border-width:0 1px 1px 0;margin:-3px 0 0 5px;vertical-align:middle;transform:rotate(45deg)}
                    .share_profile{position:absolute;right:20px;bottom:20px}
                    .share_profile span{display:flex;align-items:center;cursor:pointer;font-size:0.875rem;color:#000}
                    .share_profile svg{width:18px;height:18px;fill:none;stroke:#000;margin-left:5px}
                    @media(max-width:767px){
                        .playerProfile_WidgetWrapper{flex-wrap:wrap}
                        .playerProfile_WidgetWrapper .playerDetails_Wrap{width:100%;margin-right:0;margin-bottom:15px;padding-bottom:15px;border-bottom:1px solid #CEE4F8;padding-right:0}
                        .playerProfile_WidgetWrapper .playerDetails_Wrap::after{display:none}
                        .playerProfile_WidgetWrapper .playerDescription_Wrap{width:100%}
                        .playerProfile_WidgetWrapper .playerDetails_Wrap .playerImg{width:100px;height:100px}
                        .playerProfile_WidgetWrapper .playerDetails_Wrap .playerInfo{width:calc(100% - 120px)}
                        .playerProfile_WidgetWrapper .playerDetails_Wrap .playerInfo strong,.playerProfile_WidgetWrapper .playerDetails_Wrap .playerInfo span{font-size:0.875rem;line-height:1.5rem}
                        .playerProfile_WidgetWrapper .playerDetails_Wrap .playerInfo .h2{font-size:1.2rem;line-height:1.5rem;margin-bottom:5px}
                        .playerProfile_WidgetWrapper .playerDetails_Wrap .playerInfo img{width:22px;height:22px}
                    }
                    .team-profile .profileTabs{margin-bottom:20px;float:none}
                    .team-profile .profileTabs .tabList{display:flex;justify-content:flex-start;border-bottom:none;margin-bottom:20px}
                    .team-profile .profileTabs .tabList button{background-color:inherit;border:0;outline:0;cursor:pointer;padding:10px 0;margin-right:15px;font-size:14px;color:#000;font-weight:400;text-transform:capitalize}
                    .team-profile .profileTabs .tabList button:last-child{margin-right:0}
                    .team-profile .profileTabs .tabList button.active{border-bottom:2px solid #dc0000;font-weight:600;color:#dc0000}
                    .team-profile .profileTabs .tabcontent{display:none;width:100%;border:1px solid #E6E6E6;border-radius:8px;overflow:hidden}
                    .team-profile .profileTabs .tabcontent.active{display:block}
                    .team-profile .profileTabs .tabcontent .h2{background-color:#eee;padding:12px 10px;font-size:15px;font-weight:700}
                    .team-profile .profileTabs table{width:100%;border-collapse:collapse;font-size:15px;background:#fff;border:none}
                    .team-profile .profileTabs table thead tr{background:#eee;color:#000}
                    .team-profile .profileTabs table thead tr:last-child{background-color:#F8F8F8}
                    .profileTabs table thead tr th,.team-profile .profileTabs table tbody tr td{padding:12px 10px;text-align:center;border:none;font-size:15px}
                    .team-profile .profileTabs table tbody tr td{border-right:1px solid #E6E6E6;border-bottom:1px solid #E6E6E6}
                    .team-profile .profileTabs table tbody tr td:last-child{border-right:none}
                    .team-profile .profileTabs table tbody tr:last-child td{border-bottom:none}
                    .team-profile .profileTabs table tbody tr td:first-child{font-weight:600}
                    .team-profile .profileTabs table tbody tr:nth-child(even){background-color:#fff}
                    #battingStats table thead tr:last-child th,#bowlingStats table thead tr:last-child th{text-align:center}
                    #battingStats table tr th:first-child,#battingStats table tr td:first-child,#bowlingStats table tr th:first-child,#bowlingStats table tr td:first-child{position:sticky;z-index:0;left:0}
                    #battingStats table thead th:first-child,#bowlingStats table thead th:first-child{background-color:#F8F8F8}
                    #battingStats table tbody td:first-child,#bowlingStats table tbody td:first-child{background-color:#fff}
                    .table-responsive{overflow-x:auto}
                    /* News tab */
                    
                    .topNews9 .wrapper_section{display:grid;grid-template-columns:1fr;gap:0}
                    .topNews9 figure{display:grid;grid-template-columns:120px 1fr;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid #E6E6E6}
                    .topNews9 figure:last-child{border-bottom:none}
                    .topNews9 figure .imgThumb img{display:block;width:120px;height:68px;object-fit:cover;border-radius:4px}
                    .topNews9 figure figcaption h3{font-size:14px;font-weight:600;line-height:20px;color:#000;margin:0 0 4px 0}
                    .topNews9 figure figcaption h3 a{color:#000;text-decoration:none}
                    .topNews9 figure figcaption h3 a:hover{color:#dc0000}
                    .topNews9 .time-stamp{font-size:12px;color:#737373;margin-top:4px}
                    .topNews9 .time-stamp a{color:#dc0000;font-weight:500;margin-right:8px;text-decoration:none}
                    .topNews9 .viewMore{display:block;text-align:center;margin-top:16px;color:#dc0000;font-weight:600;font-size:13px;text-decoration:none}
                    .topNews9 .no-news{padding:20px;text-align:center;color:#737373}
                    .common_section .wrapper_section figure{background:#FFFFFF;box-shadow:0px 0px 4px rgba(0,0,0,0.08);border-radius:4px;padding:10px;display:flex;flex-direction:row-reverse;margin-bottom:10px;flex-wrap:wrap}
                    .common_section .wrapper_section figure .imgThumb{width:100px;margin-left:10px;position:relative;height:min-content;aspect-ratio:16/9;object-fit:cover}
                    .common_section .wrapper_section figure .imgThumb img{border-radius:4px;display:block;height:56px;width:100%}
                    .common_section .wrapper_section figure .imgThumb video{border-radius:4px}
                    .common_section .wrapper_section figcaption{width:calc(100% - 110px)}
                    .common_section .wrapper_section figcaption h3 a{font-weight:500;font-size:16px;line-height:26px;color:#292929;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}
                    .common_section .wrapper_section figure:first-child{flex-wrap:wrap;padding:0}
                    .common_section .wrapper_section figure:first-child .imgThumb{width:100%;margin-left:0}
                    .common_section .wrapper_section figure:first-child .imgThumb img{border-radius:4px 4px 0 0;height:inherit;aspect-ratio:16/9}
                    .common_section .wrapper_section figure:first-child figcaption{width:100%;padding:10px 15px}
                    .common_section .wrapper_section figure:first-child figcaption h3 a{font-weight:600;font-size:18px;line-height:28px;color:#000}
                    .common_section.topNews9 .wrapper_section figure:first-child .bigDesc{padding:15px;width:100%}
                    .common_section.topNews9 .wrapper_section figure:first-child h3 a,.common_section.topNews9 .wrapper_section figure:first-child h2 a{font-weight:600;font-size:18px;line-height:28px;color:#000}
                    .common_section.topNews9 .wrapper_section figure:first-child h2 a{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}
                `}</style>

                {/* ── Player profile card ── */}
                <div className="playerProfile_WidgetWrapper">
                    <div className="playerDetails_Wrap">
                        <div className="playerImg">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={playerImgSrc}
                                alt={player?.name || ""}
                                height="140"
                                width="140"
                                onError={(e) => { e.target.onerror = null; e.target.src = `${PLAYER_IMG_BASE}default.jpg`; }}
                            />
                        </div>
                        <div className="playerInfo">
                            <div className="playerName">
                                <h1 className="h2">{player?.name}</h1>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={flagSrc}
                                    alt={player?.team_name || ""}
                                    height="28"
                                    width="28"
                                    onError={(e) => { e.target.onerror = null; e.target.style.display = "none"; }}
                                />
                            </div>
                            <div className="abtplayer">
                                <strong>{player?.skill}</strong>
                            </div>
                            <div className="playerDetails">
                                {player?.bowling_style && <span>{player.bowling_style}</span>}
                                {player?.age           && <span>{player.age} yrs.</span>}
                            </div>
                        </div>
                    </div>

                    {/* Bio / description */}
                    {bioHtml && (
                        <div className="playerDescription_Wrap">
                            <div
                                className={`playerDesc${bioExpanded ? " expanded" : ""}`}
                                dangerouslySetInnerHTML={{ __html: bioHtml }}
                            />
                            <span className="appendMore" onClick={() => setBioExpanded((v) => !v)}>
                                {bioExpanded ? "Read Less" : "Read More"}
                            </span>
                        </div>
                    )}

                    <div className="share_profile">
                        <span id="share" onClick={handleShare}>
                            Share
                            <svg><use href="#share-icon"></use></svg>
                        </span>
                    </div>
                </div>

                {/* ── Tabs ── */}
                <div className="profileTabs">
                    <div className="tabList">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`tablinks${activeTab === tab.id ? " active" : ""}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Player Info tab */}
                    <div id="playerInfo" className={`tabcontent${activeTab === "playerInfo" ? " active" : ""}`}>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr><th colSpan="2">निजी जानकारी</th></tr>
                                </thead>
                                <tbody>
                                    {player?.date_of_birth  && <tr><td>Born</td><td>{player.date_of_birth}</td></tr>}
                                    {player?.place_of_birth && <tr><td>Birth Place</td><td>{player.place_of_birth}</td></tr>}
                                    {player?.age            && <tr><td>Current age</td><td>{player.age} yrs.</td></tr>}
                                    {player?.skill          && <tr><td>Role</td><td>{player.skill}</td></tr>}
                                    {player?.batting_style  && <tr><td>Batting style</td><td>{player.batting_style}</td></tr>}
                                    {player?.bowling_style  && <tr><td>Bowling style</td><td>{player.bowling_style}</td></tr>}
                                    {player?.team_name      && <tr><td>Team</td><td>{player.team_name}</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Batting Stats tab */}
                    <div id="battingStats" className={`tabcontent${activeTab === "battingStats" ? " active" : ""}`}>
                        <div className="h2">बल्लेबाजी के आंकड़े</div>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th width="60"></th>
                                        <th>M</th><th>I</th><th>N/O</th><th>R</th><th>BF</th>
                                        <th>Avg</th><th>S/R</th><th>HS</th>
                                        <th>200s</th><th>100s</th><th>50s</th><th>4s</th><th>6s</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {battingRows.map(({ label, batting }) => (
                                        <tr key={label}>
                                            <td>{label}</td>
                                            <td>{batting?.matches           ?? "-"}</td>
                                            <td>{batting?.innings           ?? "-"}</td>
                                            <td>{batting?.not_outs          ?? "-"}</td>
                                            <td>{batting?.runs              ?? "-"}</td>
                                            <td>{batting?.balls_faced       ?? "-"}</td>
                                            <td>{batting?.average           ?? "-"}</td>
                                            <td>{batting?.strike_rate       ?? "-"}</td>
                                            <td>{batting?.["Highest Score"] ?? "-"}</td>
                                            <td>{batting?.two_hundreds      ?? "-"}</td>
                                            <td>{batting?.hundreds          ?? "-"}</td>
                                            <td>{batting?.fifties           ?? "-"}</td>
                                            <td>{batting?.fours             ?? "-"}</td>
                                            <td>{batting?.sixes             ?? "-"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Bowling Stats tab */}
                    <div id="bowlingStats" className={`tabcontent${activeTab === "bowlingStats" ? " active" : ""}`}>
                        <div className="h2">गेंदबाजी के आंकड़े</div>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th width="60"></th>
                                        <th>M</th><th>I</th><th>O</th><th>Balls</th><th>Maiden</th>
                                        <th>R</th><th>W</th><th>AVG</th><th>S/R</th><th>E/R</th>
                                        <th>Best</th><th>5 WKT</th><th>10 WKT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bowlingRows.map(({ label, bowling }) => (
                                        <tr key={label}>
                                            <td>{label}</td>
                                            <td>{bowling?.matches       ?? "-"}</td>
                                            <td>{bowling?.innings       ?? "-"}</td>
                                            <td>{bowling?.overs         ?? "-"}</td>
                                            <td>{bowling?.balls_bowled  ?? "-"}</td>
                                            <td>{bowling?.maidens       ?? "-"}</td>
                                            <td>{bowling?.runs          ?? "-"}</td>
                                            <td>{bowling?.wickets       ?? "-"}</td>
                                            <td>{bowling?.average       ?? "-"}</td>
                                            <td>{bowling?.strike_rate   ?? "-"}</td>
                                            <td>{bowling?.economy_rate  ?? "-"}</td>
                                            <td>{bowling?.Best          ?? "-"}</td>
                                            <td>{bowling?.five_wk_hauls ?? "-"}</td>
                                            <td>{bowling?.ten_wk_hauls  ?? "-"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* News tab — data fetched from dataConfig.endpoint */}
                    <div id="news" className={`tabcontent${activeTab === "news" ? " active" : ""}`}>
                        <div className="common_section topNews9">
                            <div className="wrapper_section" id="category-ajax-posts">
                                {newsItems.length > 0 ? (
                                    newsItems.map((news) => {
                                        const newsUrl   = news?.permalink || news?.url || news?.link || "#";
                                        const newsTitle = news?.title || news?.post_title || "";
                                        const newsImg   = news?.thumbnail || news?.image || news?.featured_image || news?.thumb || "";
                                        const newsDate  = news?.date || news?.post_date || "";
                                        const newsCat   = news?.category || news?.cat_name || "";
                                        const newsCatUrl = news?.category_url || news?.cat_url || "/sports/cricket-news";
                                        const newsId    = news?.id || news?.post_id || Math.random();

                                        return (
                                            <figure key={newsId} id={`news-${newsId}`}>
                                                <div className="imgThumb">
                                                    <a href={newsUrl} title={newsTitle}>
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={newsImg}
                                                            alt={newsTitle}
                                                            title={newsTitle}
                                                            width="360"
                                                            height="203"
                                                            loading="lazy"
                                                            onError={(e) => { e.target.onerror = null; e.target.style.display = "none"; }}
                                                        />
                                                    </a>
                                                </div>
                                                <figcaption>
                                                    <h3>
                                                        <a href={newsUrl} title={newsTitle}>{newsTitle}</a>
                                                    </h3>
                                                </figcaption>
                                                <div className="time-stamp">
                                                    {newsCat && (
                                                        <a className="catName" href={newsCatUrl}>{newsCat}</a>
                                                    )}
                                                    {newsDate && <span>{newsDate}</span>}
                                                </div>
                                            </figure>
                                        );
                                    })
                                ) : (
                                    <div className="no-news">
                                        {rawEndpoint2 ? "Loading news..." : "No news available."}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
