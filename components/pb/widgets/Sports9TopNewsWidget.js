import Image from "next/image";
import { useState, useEffect } from "react";

function decodeHtml(text) {
  if (!text || typeof text !== "string") return text;
  const map = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#039;": "'", "&apos;": "'" };
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&amp;|&lt;|&gt;|&quot;|&#039;|&apos;/g, (m) => map[m]);
}

/* ─── ICC Ranking Sub-Component (client-side fetch) ─── */

const FORMAT_TABS = [
  { key: "test", label: "Test Ranking" },
  { key: "odi", label: "ODI Ranking" },
  { key: "t20", label: "T20 Ranking" },
];

const SUB_TABS = [
  { key: "team", label: "Team", columns: ["Rank", "Team", "Rating"] },
  { key: "bat", label: "Batting", columns: ["Rank", "Player", "Points"] },
  { key: "bowl", label: "Bowling", columns: ["Rank", "Player", "Points"] },
  { key: "allrounder", label: "All Rounder", columns: ["Rank", "Player", "Points"] },
];

function IccRankingSection({ dataConfig = {} }) {
  const [rankingData, setRankingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFormat, setActiveFormat] = useState("test");
  const [activeSub, setActiveSub] = useState("team");

  const rankingUrl = dataConfig.ranking_endpoint || "https://webapi.tv9.com/cricket/en/static/ranking/number";
  const numRecords = Number(dataConfig.num_records) || 8;
  const widgetTitle = dataConfig.ranking_title || `ICC रैंकिंग ${new Date().getFullYear()}`;
  const titleUrl = dataConfig.ranking_title_url || "/sports/cricket-news/series/icc-team-ranking";
  const flagBaseUrl = dataConfig.flag_base_url || "https://images.tv9hindi.com/images/flags/";

  useEffect(() => {
    let cancelled = false;

    async function fetchRanking() {
      try {
        const res = await fetch(rankingUrl);
        if (!res.ok) throw new Error("Failed to fetch ranking");
        const json = await res.json();
        const data = json?.ranking || json?.data?.ranking || json;
        if (!cancelled) setRankingData(data);
      } catch (e) {
        console.error("IccRanking fetch error:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRanking();
    return () => { cancelled = true; };
  }, [rankingUrl]);

  if (loading) {
    return (
      <div className="ranking_table">
        <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>
      </div>
    );
  }

  if (!rankingData) return null;

  const dataKey = `${activeFormat}-${activeSub}`;
  const rows = Array.isArray(rankingData[dataKey]) ? rankingData[dataKey].slice(0, numRecords) : [];
  const currentSubTab = SUB_TABS.find((s) => s.key === activeSub);

  function slugify(str) {
    if (!str) return "";
    return str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  }

  return (
    <div className="common_section">
      <div className="tv9common-heading">
        <h2 className="h2">
          <a href={titleUrl} title={widgetTitle}>
            {widgetTitle}
          </a>
        </h2>
      </div>
      <div className="ranking_table">
        {/* Format Tabs */}
        <div className="tab_list">
          {FORMAT_TABS.map((tab) => (
            <div
              key={tab.key}
              className={`tab_item${activeFormat === tab.key ? " is--active" : ""}`}
              onClick={() => { setActiveFormat(tab.key); setActiveSub("team"); }}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* Sub Tabs */}
        <div className="tab_list tab_sub_list">
          {SUB_TABS.map((sub) => (
            <div
              key={sub.key}
              className={`tab_item${activeSub === sub.key ? " is--active" : ""}`}
              onClick={() => setActiveSub(sub.key)}
            >
              {sub.label}
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="ranking_table_content">
          <table>
            <thead>
              <tr>
                {currentSubTab.columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((row, idx) => {
                  if (activeSub === "team") {
                    const country = row.Country || row.country || "";
                    const flagSlug = slugify(country);
                    return (
                      <tr key={idx} className={flagSlug === "india" ? "india" : ""}>
                        <td>{row.no || idx + 1}</td>
                        <td>
                          <a title={country}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={`${flagBaseUrl}${flagSlug}.png`}
                              alt={country}
                              width={20}
                              height={14}
                              style={{ verticalAlign: "middle", marginRight: 5 }}
                            />
                            {country}
                          </a>
                        </td>
                        <td>{row.Rating || row.rating || ""}</td>
                      </tr>
                    );
                  }
                  const playerName = row["Player-name"] || row.player_name || row.name || "";
                  return (
                    <tr key={idx}>
                      <td>{row.no || idx + 1}</td>
                      <td><a title={playerName}>{playerName}</a></td>
                      <td>{row.Points || row.points || ""}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={3} style={{ textAlign: "center", padding: 10 }}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Sports9TopNewsWidget ─── */

export default function Sports9TopNewsWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
}) {
  const displayTitle = decodeHtml(title) || "स्पोर्ट्स समाचार";
  const viewMoreUrl = dataConfig.view_more_url || sectionUrl || "#";
  const viewMoreText = dataConfig.view_more_text || "और पढ़े";
  const first = items.length > 0 ? items[0] : null;
  const rest = items.length > 1 ? items.slice(1) : [];

  if (!items || items.length === 0) return null;

  return (
    <>
      <div className="sportsTwoCol_Wrapper">
        {/* ===== LEFT COLUMN: News Listing ===== */}
        <div className="left-column">
          <div className="Sports_TopNews">
            <div className="tv9common-heading">
              <h2 className="h2">
                <a href={viewMoreUrl} title={displayTitle}>
                  {displayTitle}
                </a>
              </h2>
              <a href={viewMoreUrl} className="view_more">
                View more
                <svg>
                  <use xlinkHref="#rgt-arrow"></use>
                </svg>
              </a>
            </div>
            <div className="spTopNews_Listing">
              {/* BIG STORY */}
              {first && (
                <figure>
                  <a href={first.url || "#"} title={decodeHtml(first.title) || ""}>
                    {(first.image || first.thumbnail || first.thumb || first.image_url) && (
                      <div className="imgThumb">
                        <Image
                          src={first.image || first.thumbnail || first.thumb || first.image_url}
                          alt={decodeHtml(first.title) || ""}
                          title={decodeHtml(first.title) || ""}
                          width={460}
                          height={259}
                          priority
                          unoptimized
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    )}
                    <div className="card_title">
                      <span className="h3">{decodeHtml(first.title)}</span>
                      {first.summary && <p>{decodeHtml(first.summary)}</p>}
                    </div>
                  </a>
                </figure>
              )}

              {/* SMALL STORIES */}
              {rest.map((row, idx) => (
                <figure key={row.id || idx}>
                  <a href={row.url || "#"} title={decodeHtml(row.title) || ""}>
                    {(row.image || row.thumbnail || row.thumb || row.image_url) && (
                      <div className="imgThumb">
                        <Image
                          src={row.image || row.thumbnail || row.thumb || row.image_url}
                          alt={decodeHtml(row.title) || ""}
                          title={decodeHtml(row.title) || ""}
                          width={219}
                          height={124}
                          unoptimized
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    )}
                    <div className="card_title">
                      <span className="h3">{decodeHtml(row.title)}</span>
                    </div>
                  </a>
                </figure>
              ))}
            </div>
            <div className="sports_heading">
              <a className="view_more" href={viewMoreUrl}>
                {viewMoreText}
                <svg>
                  <use xlinkHref="#rgt-arrow"></use>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ===== RIGHT COLUMN: ICC Ranking ===== */}
        <div className="right-column">
          <IccRankingSection dataConfig={dataConfig} />
        </div>
      </div>

      <style jsx>{`
        .Sports_TopNews{margin-bottom:20px}
        .spTopNews_Listing{display:grid;grid-template-columns:repeat(4,1fr);grid-gap:20px}
        .spTopNews_Listing figure:first-child{grid-row:1/3;grid-column:1/3}
        .spTopNews_Listing figure:first-child .h3{font-size:1.5rem;font-weight:700;line-height:32px;margin-bottom:10px}
        .spTopNews_Listing figure:first-child p{font-size:1rem;line-height:24px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
        .spTopNews_Listing .imgThumb img{display:block;width:100%;border-radius:8px;margin-bottom:10px}
        .spTopNews_Listing .card_title .h3{font-size:1rem;font-weight:500;line-height:22px;color:#000;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
        .Sports_TopNews .sports_heading{justify-content:end;margin-top:10px}
        @media(max-width:767px){
          .sportsTwoCol_Wrapper{grid-template-columns:1fr}
          .Sports_TopNews .sports_heading .h1{margin-bottom:10px}
          .spTopNews_Listing{grid-template-columns:auto}
          .spTopNews_Listing figure:first-child{grid-column:auto;grid-row:auto}
          .spTopNews_Listing figure a{display:flex;flex-direction:row-reverse}
          .spTopNews_Listing figure:first-child a{display:grid}
          .spTopNews_Listing .imgThumb{width:100px;margin-left:10px}
          .spTopNews_Listing .card_title{width:calc(100% - 110px)}
          .spTopNews_Listing figure:first-child .imgThumb{width:100%;margin-left:0}
          .spTopNews_Listing figure:first-child .card_title{width:100%}
          .spTopNews_Listing .imgThumb img{border-radius:4px;margin-bottom:0}
          .spTopNews_Listing figure:first-child .imgThumb{margin-bottom:10px}
        }
      `}</style>
      <style jsx global>{`
        .ranking_table{background:#FFFFFF;box-shadow:0px 0px 4px rgba(0,0,0,0.08);border-radius:8px;margin-bottom:20px}
        .ranking_table .tab_list{padding:10px;display:flex;justify-content:flex-start;border-bottom:1px solid #E5E5E5}
        .ranking_table .tab_sub_list{background:#FFFFFF;box-shadow:0px 3px 4px rgba(0,0,0,0.1);border-bottom:0}
        .ranking_table .tab_item{background:#F6F6F6;border-radius:20px;cursor:pointer;font-weight:500;font-size:12px;line-height:20px;text-transform:capitalize;color:#828282;padding:6px 12px;margin-right:8px;flex-grow:1;text-align:center}
        .ranking_table .tab_sub_list .tab_item{background:#fff;border-bottom:2px solid #fff;border-radius:0;color:#000}
        .ranking_table .tab_item:last-child{margin-right:0}
        .ranking_table .tab_item.is--active{background:#DC0000;color:#ffffff}
        .ranking_table .tab_sub_list .tab_item.is--active{border-bottom:2px solid #dc0000;background:#fff;color:#dc0000}
        .ranking_table table{color:#292929;font-size:12px;line-height:21px;overflow-x:auto;width:100%;border-collapse:collapse}
        .ranking_table table thead th,.ranking_table table tbody td{padding:0.5rem;text-align:left;font-size:14px}
        .ranking_table table tbody tr{border-bottom:1px solid #E5E5E5}
        .ranking_table table tbody td img{vertical-align:middle;margin-right:5px}
        .ranking_table table tbody tr.india{background:#E4F5FF;box-shadow:0px 3px 4px rgba(0,0,0,0.1);border-bottom:0}
        @media(min-width:1000px){
          .ranking_table .tab_item{padding:6px}
        }
      `}</style>
    </>
  );
}
