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

/* ─── ICC Ranking Constants ─── */

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

export default function IccRankingWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
}) {
  const [rankingData, setRankingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFormat, setActiveFormat] = useState("test");
  const [activeSub, setActiveSub] = useState("team");

  const rankingUrl = dataConfig.ranking_endpoint || "https://webapi.tv9.com/cricket/en/static/ranking/number";
  const numRecords = Number(dataConfig.num_records) || 8;
  const widgetTitle = decodeHtml(title) || dataConfig.ranking_title || `ICC रैंकिंग ${new Date().getFullYear()}`;
  const titleUrl = dataConfig.ranking_title_url || sectionUrl || "/sports/cricket-news/series/icc-team-ranking";
  const flagBaseUrl = dataConfig.flag_base_url || "https://images.tv9hindi.com/images/flags/";

  console.log("IccRankingWidget items:", items);

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
    <>
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
