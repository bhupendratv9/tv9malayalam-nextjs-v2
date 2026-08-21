import { useState } from "react";

function decodeHtml(text) {
  if (!text || typeof text !== "string") return text;
  const map = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#039;": "'", "&apos;": "'" };
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&amp;|&lt;|&gt;|&quot;|&#039;|&apos;/g, (m) => map[m]);
}

function urlSlug(name) {
  if (!name) return "";
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Hindi to English team name mapping for image URLs
const TEAM_NAME_MAP = {
  "भारत": "india",
  "इंग्लैंड": "england",
  "पाकिस्तान": "pakistan",
  "दक्षिण अफ्रीका": "south-africa",
  "न्यूज़ीलैंड": "new-zealand",
  "ऑस्ट्रेलिया": "australia",
  "वेस्ट इंडीज़": "west-indies",
  "श्रीलंका": "sri-lanka",
  "बांग्लादेश": "bangladesh",
  "अफ़ग़ानिस्तान": "afghanistan",
  "ज़िम्बाब्वे": "zimbabwe",
  "आयरलैंड": "ireland",
  "चेन्नई सुपर किंग्स": "chennai-super-kings",
  "राजस्थान रॉयल्स": "rajasthan-royals",
  "कोलकाता नाइट राइडर्स": "kolkata-knight-riders",
  "मुंबई इंडियंस": "mumbai-indians",
  "दिल्ली कैपिटल्स": "delhi-capitals",
  "सनराइज़र्स हैदराबाद": "sunrisers-hyderabad",
  "रॉयल चैलेंजर्स बेंगलुरु": "royal-challengers-bengaluru",
  "पंजाब किंग्स": "punjab-kings",
  "गुजरात टाइटन्स": "gujarat-titans",
  "लखनऊ सुपर जायंट्स": "lucknow-super-giants",
};

function getTeamSlug(name) {
  if (!name) return "";
  // Check Hindi mapping first
  const mapped = TEAM_NAME_MAP[name];
  if (mapped) return mapped;
  // Try English slug
  const slug = urlSlug(name);
  if (slug) return slug;
  // Fallback: check partial matches
  for (const [hindi, english] of Object.entries(TEAM_NAME_MAP)) {
    if (name.includes(hindi) || hindi.includes(name)) return english;
  }
  return "TBD";
}

// ─── Match Header ────────────────────────────────────────────────────────────
function MatchHeader({ match }) {
  if (!match) return null;

  const venue = match.venue || "";
  const date = match.date || match.start_date || "";
  const result = match.result || match.status_note || "";
  const matchName = match.name || match.short_name || "";
  const teams = match.teams || match.participants || [];
  const manOfMatch = match.man_of_the_match || match.player_of_match || null;

  return (
    <section className="fullScore_card_new">
      <figure>
        <div className="resultwrap">
          <span className="tresult">{match.status === "live" ? "Live" : "Result"}</span>
        </div>
        {(venue || date) && (
          <div className="datetime">
            <p>{[matchName, venue, date].filter(Boolean).join(", ")}</p>
          </div>
        )}
        <div className="matchinfo">
          <div className="right-info">
            {teams.map((team, idx) => (
              <div className={`team ${team.is_batting ? "" : "notplay"}`} key={team.id || idx}>
                <div className="team-name">
                  <div className="team_logo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      width={30}
                      height={30}
                      alt={team.name || ""}
                      src={`https://images.tv9hindi.com/images/large_flags/${getTeamSlug(team.name)}.png`}
                    />
                  </div>
                  <p>{team.name || team.short_name || ""}</p>
                </div>
                <div className="teamScore">
                  <h3>{team.score || ""}</h3>
                  {team.overs && <h6>({team.overs}) ov</h6>}
                </div>
              </div>
            ))}
            {result && <div className="matchResult"><p>{decodeHtml(result)}</p></div>}
          </div>
          {manOfMatch && (
            <div className="left-info">
              <div className="playerinfo">
                <div className="ptext">
                  <h4 className="player_award">प्लेयर ऑफ़ द मैच</h4>
                  <h5 className="player_name">{manOfMatch.name || ""}</h5>
                  <h6 className="player_run">{manOfMatch.team || ""}</h6>
                </div>
              </div>
            </div>
          )}
        </div>
      </figure>
    </section>
  );
}

// ─── Batting Table ───────────────────────────────────────────────────────────
function BattingTable({ innings }) {
  const batsmen = innings?.batsmen || innings?.batting || [];
  const extras = innings?.extras || {};
  const total = innings?.total || {};
  const fallOfWickets = innings?.fall_of_wickets || [];
  const didNotBat = innings?.did_not_bat || [];

  if (!batsmen.length) return null;

  return (
    <div className="table_container">
      <div className="table_wrap_batsmen">
        <table className="table_detail">
          <thead>
            <tr className="tableheading">
              <th>Batter</th>
              <th>R</th>
              <th>B</th>
              <th>4s</th>
              <th>6s</th>
              <th>SR</th>
            </tr>
          </thead>
          <tbody>
            {batsmen.map((b, idx) => (
              <tr key={idx} className={b.is_out ? "out" : ""}>
                <td>
                  <div className="fcolspan">
                    {b.is_out ? b.name : <strong>{b.name}</strong>}
                    <p className="pclass">{b.is_out ? b.how_out || "" : <strong>नाबाद</strong>}</p>
                  </div>
                </td>
                <td>{b.is_out ? b.runs : <strong>{b.runs}</strong>}</td>
                <td>{b.is_out ? b.balls : <strong>{b.balls}</strong>}</td>
                <td>{b.is_out ? b.fours : <strong>{b.fours}</strong>}</td>
                <td>{b.is_out ? b.sixes : <strong>{b.sixes}</strong>}</td>
                <td>{b.is_out ? b.strike_rate : <strong>{b.strike_rate}</strong>}</td>
              </tr>
            ))}
            {extras && (
              <tr>
                <td>
                  <div className="fcolspan">
                    Extras
                    <p className="pclass">
                      (b {extras.byes || 0},lb {extras.leg_byes || 0},w {extras.wides || 0},nb {extras.no_balls || 0})
                    </p>
                  </div>
                </td>
                <td>{extras.total || 0}</td>
                <td></td><td></td><td></td><td></td>
              </tr>
            )}
            <tr className="tableheading">
              <td>
                <div className="fcolspan">
                  <strong>कुल</strong>
                  <strong>{total.overs || ""} (RR: {total.run_rate || ""})</strong>
                </div>
              </td>
              <td><strong>{total.score || ""}</strong></td>
              <td></td><td></td><td></td><td></td>
            </tr>
          </tbody>
        </table>
      </div>

      {didNotBat.length > 0 && (
        <div className="batting_bstatus">
          <div className="batting-blabel">
            <h4>कुल बल्लेबाज़ी नहीं की: <span>{didNotBat.map((p) => p.name || p).join(", ")}</span></h4>
          </div>
        </div>
      )}

      {fallOfWickets.length > 0 && (
        <div className="batting_bstatus">
          <div className="batting-blabel">
            <h4>विकेट पतन: </h4>
            {fallOfWickets.map((fw, idx) => (
              <span key={idx}>
                <label>{fw.wicket_number || idx + 1} - {fw.score || ""}</label>
                <span>({fw.batsman || ""}, {fw.over || ""} ov)</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Bowling Table ───────────────────────────────────────────────────────────
function BowlingTable({ innings }) {
  const bowlers = innings?.bowlers || innings?.bowling || [];
  if (!bowlers.length) return null;

  return (
    <div className="table_wrap_bowling">
      <table className="table_detail">
        <thead>
          <tr className="tableheading">
            <th>Bowler</th>
            <th>O</th>
            <th>M</th>
            <th>R</th>
            <th>W</th>
            <th>ER</th>
          </tr>
        </thead>
        <tbody>
          {bowlers.map((b, idx) => (
            <tr key={idx}>
              <td><div className="fcolspan">{b.name || ""}</div></td>
              <td>{b.overs || ""}</td>
              <td>{b.maidens || 0}</td>
              <td>{b.runs || ""}</td>
              <td>{b.wickets || ""}</td>
              <td>{b.economy || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Innings Tab ─────────────────────────────────────────────────────────────
function InningsTab({ innings }) {
  if (!innings || !innings.length) return <p>No innings data available.</p>;

  const [activeIdx, setActiveIdx] = useState(0);
  const active = innings[activeIdx];

  return (
    <div>
      <div className="tab_list">
        {innings.map((inn, idx) => (
          <div
            key={idx}
            className={`tab_item ${activeIdx === idx ? "is--active" : ""}`}
            onClick={() => setActiveIdx(idx)}
          >
            {inn.team_name || inn.name || `Innings ${idx + 1}`}
          </div>
        ))}
      </div>
      <div className="tab_content">
        <div className="tab_content-item is--active">
          <BattingTable innings={active} />
          <BowlingTable innings={active} />
        </div>
      </div>
    </div>
  );
}

// ─── Main Widget ─────────────────────────────────────────────────────────────
export default function FullScorecardWidget({ dataConfig = {}, data = null, response = null, matchData = null }) {
  const raw = matchData || data || response || null;

  // Normalize: API returns { dataArr: { Matchdetail, Innings, Teams, ... } }
  const dataArr = raw?.dataArr || raw?.data?.dataArr || raw || null;

  if (!dataArr || (!dataArr.Matchdetail && !dataArr.Innings)) {
    return <div className="pb-empty">Scorecard data not available.</div>;
  }

  const matchDetail = dataArr.Matchdetail || {};
  const rawInnings = dataArr.Innings || [];
  const teamsData = dataArr.Teams || {};

  // Build player lookup: { playerId: { Name_Full, Name_Short } }
  const allPlayers = {};
  Object.values(teamsData).forEach((team) => {
    if (team.Players) {
      Object.entries(team.Players).forEach(([pid, pdata]) => {
        allPlayers[pid] = pdata;
      });
    }
  });

  function getPlayerName(playerId) {
    const p = allPlayers[playerId];
    if (!p) return playerId || "";
    return p.Name_Short || p.Name_Full || playerId;
  }

  // Match info
  const teamHomeId = matchDetail.Team_Home || "";
  const teamAwayId = matchDetail.Team_Away || "";
  const venue = matchDetail.Venue?.Name || "";
  const seriesName = matchDetail.Series?.Name || "";
  const matchNumber = matchDetail.Match?.Number || "";
  const matchDate = matchDetail.Match?.Date || "";
  const result = matchDetail.Result || "";
  const equation = matchDetail.Equation || "";
  const statusId = matchDetail.Status_Id || "";

  const teamHomeName = teamsData[teamHomeId]?.Name_Full || "";
  const teamAwayName = teamsData[teamAwayId]?.Name_Full || "";

  // Awards / Man of the match
  const awards = Array.isArray(matchDetail.Awards) ? matchDetail.Awards : [];
  const manOfMatch = awards.length > 0 ? {
    name: awards[0].Player_Name || "",
    team: awards[0].Team_Name || "",
  } : null;

  // Group innings by batting team (for header scores)
  const teamScores = {};
  if (Array.isArray(rawInnings)) {
    rawInnings.forEach((inn) => {
      const btId = inn.Battingteam || "";
      if (!teamScores[btId]) teamScores[btId] = [];
      teamScores[btId].push({
        total: inn.Total || "0",
        wickets: inn.Wickets || "0",
        overs: inn.Overs || "0",
      });
    });
  }

  // Build teams array for header (first batting team first)
  const firstBatTeamId = rawInnings.length > 0 ? rawInnings[0].Battingteam : teamHomeId;
  const secondBatTeamId = firstBatTeamId === teamHomeId ? teamAwayId : teamHomeId;

  const teams = [firstBatTeamId, secondBatTeamId].map((tid) => {
    const scores = teamScores[tid] || [];
    return {
      id: tid,
      name: teamsData[tid]?.Name_Full || "",
      short_name: teamsData[tid]?.Name_Short || "",
      score: scores.map((s) => `${s.total}/${s.wickets}`).join(" & "),
      overs: scores.length > 0 ? scores[scores.length - 1].overs : "",
    };
  });

  // Normalize innings for scorecard tabs
  const innings = Array.isArray(rawInnings) ? rawInnings.map((inn, idx) => {
    const battingTeamName = teamsData[inn.Battingteam]?.Name_Full || "";

    const batsmen = Array.isArray(inn.Batsmen) ? inn.Batsmen.map((b) => {
      const name = getPlayerName(b.Batsman);
      const howout = b.Howout || "";
      const isOut = howout !== "" && howout !== "not out" && howout !== "नाबाद" && howout !== "बल्लेबाज़ी";
      return {
        name,
        runs: b.Runs || "0",
        balls: b.Balls || "0",
        fours: b.Fours || "0",
        sixes: b.Sixes || "0",
        strike_rate: b.Strikerate || "0",
        how_out: b.Howout_short || howout,
        is_out: isOut,
      };
    }) : [];

    const bowlers = Array.isArray(inn.Bowlers) ? inn.Bowlers.map((b) => ({
      name: getPlayerName(b.Bowler),
      overs: b.Overs || "0",
      maidens: b.Maidens || "0",
      runs: b.Runs || "0",
      wickets: b.Wickets || "0",
      economy: b.Economyrate || "0",
    })) : [];

    const totalExtras = Number(inn.Byes || 0) + Number(inn.Legbyes || 0) + Number(inn.Wides || 0) + Number(inn.Noballs || 0) + Number(inn.Penalty || 0);

    const fallOfWickets = Array.isArray(inn.FallofWickets)
      ? inn.FallofWickets.map((fw) => ({
          wicket_number: fw.Wicket_No || fw.Wicket || "",
          score: fw.Score || "",
          batsman: getPlayerName(fw.Batsman),
          over: fw.Overs || "",
        }))
      : [];

    return {
      team_name: battingTeamName,
      batsmen,
      bowlers,
      extras: {
        total: String(totalExtras),
        byes: inn.Byes || "0",
        leg_byes: inn.Legbyes || "0",
        wides: inn.Wides || "0",
        no_balls: inn.Noballs || "0",
        penalty: inn.Penalty || "0",
      },
      total: {
        score: `${inn.Total || "0"}/${inn.Wickets || "0"}`,
        overs: inn.Overs || "",
        run_rate: inn.Runrate || "",
      },
      fall_of_wickets: fallOfWickets,
      did_not_bat: [],
    };
  }) : [];

  const match = {
    name: [seriesName, matchNumber].filter(Boolean).join(", "),
    venue,
    date: matchDate,
    result: equation || result,
    teams,
    man_of_the_match: manOfMatch,
    status: statusId === "117" ? "live" : result ? "completed" : "upcoming",
  };

  const title = `${teamHomeName} Vs ${teamAwayName} Match Full Scorecard, ${seriesName}`;

  return (
    <>
      <div className="common_section teamsWrapper">
        {title && (
          <div className="sports_heading">
            <h1 className="h1">{decodeHtml(title)}</h1>
          </div>
        )}

        <div className="cricket-full-score-widget">
          <MatchHeader match={match} />

          <section>
            <div className="Scoreboard_Tab tab">
              <div className="tab_list head_list">
                <div className="tab_item is--active">स्कोरकार्ड</div>
              </div>
              <div className="tab_content sub_list">
                <div className="tab_content-item is--active">
                  <InningsTab innings={innings} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style jsx global>{`
.sports_heading{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:10px}
.sports_heading .h1{font-size:1.5rem;line-height:30px;font-weight:700;text-transform:capitalize;color:#471a81}
.sports_heading a.view_more{font-weight:700;font-size:.875rem;line-height:20px;color:#000;text-transform:capitalize}
.sports_heading a.view_more svg{width:13px;height:8px;margin-left:3px}
.fullScore_card_new {/* margin-bottom: 20px; */}
.fullScore_card_new figure {background: #E5F2FF;border-radius: 14px 14px 0px 0px;width: 100%;/* margin-bottom: 15px; */padding: 8px 20px 0px 20px;position: relative;border: 1px solid #CEE4F8;}
.fullScore_card_new .resultwrap{ display: flex; justify-content: space-between;}
.fullScore_card_new .resultwrap .tresult{font-size: 14px;line-height: 21px;font-weight: 600;}
.fullScore_card_new .resultwrap .tresult.live{ color:#DC0000;}
.fullScore_card_new .resultwrap .sharesbtn{font-size: 14px;line-height: 21px;font-weight: 500; display: flex; align-items: center;cursor: pointer;}
.fullScore_card_new .resultwrap .sharesbtn svg{ width: 18px; height: 18px; margin-left:5px;}
.fullScore_card_new .datetime {font-weight:500; color: #4c4c4c; font-size: 14px; line-height:24px; text-align: center; display: flex; margin-bottom: 10px;}
.fullScore_card_new .datetime .timeformat {padding-left: 3px; border-left: 2px solid #BECCFF; margin-left: 3px;}
.fullScore_card_new .matchName{ color: #00214A; font-size: 20px; line-height:40px;}
.fullScore_card_new .matchinfo{display:flex;flex-wrap: wrap;margin: 0px -20px;border-top: 1px solid #cee4f8;}
.fullScore_card_new .team{display: flex;width: 100%;justify-content: space-between; font-size:15px; font-weight: 600;}
.fullScore_card_new .team-name p,.fullScore_card_new .teamScore h3{font-size:15px; font-weight: 600;}
.fullScore_card_new .team-name,.fullScore_card_new .teamScore{ display: flex;}
.fullScore_card_new .team.notplay{ color: #666666;}
.fullScore_card_new .team-name .teammobilename{ display:block;}
.fullScore_card_new .team-name .teamwebname{ display:none;}

.fullScore_card_new .teamScore h6{margin-left: 5px;font-size: 16px;}
.fullScore_card_new .team_logo{ margin-right: 10px;}
.fullScore_card_new .right-info{flex: 1 1 auto; flex-basis: calc(100% - 0%);padding: 10px 20px 10px 20px;border-bottom: 1px solid #cee4f8;}
.fullScore_card_new .left-info{width: 30%;padding: 10px 20px 10px 20px; flex: 1 1 auto;}
.fullScore_card_new .matchResult{ text-align: center; font-size:14px;}
.fullScore_card_new .playerinfo{ display: flex; justify-content:space-between; align-items: center;}
.fullScore_card_new .playerinfo .ptext .player_award{font-size: 14px;line-height: 21px;font-weight: 500;}
.fullScore_card_new .playerinfo .ptext .player_name{font-size: 16px;line-height: 29px;font-weight: 700;}
.fullScore_card_new .playerinfo .ptext .player_run{font-size: 14px;line-height: 21px;font-weight: 600;}
.fullScore_card_new .playerinfo .pimg{ border-radius:50%;}


.Scoreboard_Tab .tab_list{display: flex; flex-wrap: nowrap; overflow-x: auto; -webkit-overflow-scrolling: touch;  align-items: center; }
.Scoreboard_Tab .head_list{display: flex;padding: 10px 20px;border-bottom: 1px solid #cee4f8; border-left: 1px solid #cee4f8;   border-right: 1px solid #cee4f8;
    background: #E5F2FF; border-radius: 0px 0px 15px 15px;}
.Scoreboard_Tab .head_list .tab_item{border-bottom: 2px solid #fff0; border-radius: 0; color: #000; font-size: 16px;margin-right: 13px; font-weight: 500; cursor:pointer}  
.Scoreboard_Tab .head_list .tab_item.is--active {   border-bottom: 2px solid #dc0000; color: #dc0000;}
.Scoreboard_Tab .tab_content-item.is--active { display: block;}
.Scoreboard_Tab .tab_content-item {display: none;}  
.Scoreboard_Tab .sub_list .tab_list .tab_item {border: 1px solid #CECECE;border-radius: 50px;padding: 6px 16px; margin-top: 10px; font-weight: 500; margin: 10px;color: #CECECE; font-size:14px; cursor: pointer; flex: 0 0 auto;}
.Scoreboard_Tab .sub_list .tab_list .tab_item.is--active { color: #4C4C4C;border: 1px solid #4C4C4C;}
.Scoreboard_Tab .tab_content-item .Sports_TopNews{ margin-top:10px;}
.table_container{border:1px solid #E6E6E6;border-radius: 15px;margin-bottom: 15px;}
.table_detail {width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size:15px;}
.table_detail .tableheading{ background: #f3f3f3}
.table_detail .tableheading th:first-child,.table_detail .tableheading td:first-child{text-align: left;font-weight:700;padding-left: 20px;}
.table_detail thead th:first-child{ border-radius:15px 0px 0px 0px;}
.table_detail thead th:last-child{ border-radius:0px 15px 0px 0px;}
.table_detail .tableheading th,.table_detail tr td{ padding: .3rem; text-align: center; font-size: 15px}
.table_detail tr td{border-top: 1px solid #E6E6E6;}
.table_detail tr td:first-child{padding-left: 20px;}
.icon-pop a{width: 24px; height: 24px; display: inline-flex; border: 1px solid #D9D9D9; border-radius: 50%; align-items: center; justify-content: center; margin-left:5px; position: relative;}
.icon-pop a svg{ width: 14px; height:12px; }
.icon-pop a:hover .player_pop_box{ display: block;}
.player_pop_box{position: absolute; background: #000; color: #fff; top: 28px; padding: 5px 10px; min-width: 150px;  border-radius: 4px; display: none; z-index: 9;}
.player_pop_box:after {content: '';bottom: 100%; border: 6px solid transparent; height: 0; width: 0; border-bottom-color: #2b2e34ed; margin-left: -5px; position: absolute;}

.player_pop_box p{ display: flex; justify-content: space-between;}
.table_detail .fcolspan{ display: flex; justify-content: space-between; flex-wrap: wrap;}
.table_detail .fcolspan .pclass{text-align: left; font-size: 13px;  width: 100%; color: #666;}
.table_wrap_bowling .table_detail{ margin-bottom: 0px;}
.table_wrap_bowling .table_detail thead th:first-child,.table_wrap_bowling .table_detail thead th:last-child{ border-radius: inherit;}
.batting_bstatus {margin: 18px 20px;font-size: 15px;line-height: 28px;}
.batting-blabel{display: flex;     flex-wrap: wrap;}
.batting-blabel h4{ margin-right: 10px;}
.batting-blabel h4 strong{ margin-right: 10px;}
.batting-blabel h4 span{ font-weight: 400;}
.batting-blabel .icon-pop{display: inline-flex;}
.batting_bstatus .batting-blabel label {font-size: 14px; font-weight: 700; letter-spacing: 0; color: #000; padding: 0px 5px;}



.commentary_wrap{border:1px solid #E6E6E6;border-radius: 15px;margin-bottom: 15px;overflow: hidden; font-size:15px;}
.commentary_wrap .commentary-heading h2{background: #f3f3f3;font-size: 14px;line-height:40px;padding:0px 20px;}
.commentary_wrap .bollbyboll figure{display: flex;border-bottom: 1px solid #E6E6E6;padding: 10px 20px; align-items: flex-start;}
.commentary_wrap .bollbyboll figure:last-child{ border: inherit;}
.commentary_wrap .bollbyboll .overdata{display: grid; margin-right: 10px;}
.commentary_wrap .bollbyboll .overdata:first-child span{text-align: center;}
.commentary_wrap .bollbyboll .overdata .run {border-radius: 4px;min-width:50px; text-align: center; font-weight: 600;    font-size: 16px;
    line-height: 33px; text-transform: capitalize; color: #4C4C4C; display: block; border: 1px solid #BBBBBB;    padding: 0px 5px;}
.commentary_wrap .bollbyboll .overdata .run.four{color: #039B00;border: 1px solid #039B00;}    
.commentary_wrap .bollbyboll .overdata .run.six{ color: #5600C6;border: 1px solid #5600C6;}    
.commentary_wrap .bollbyboll .overdata .run.out{color: #DC0000;border: 1px solid #DC0000;} 
.commentary_wrap.bollbyboll .overtext{font-weight: 500; font-size:15px;}
.commentary_wrap .per_overboll{padding: 0px 20px;background: #F1F5F9;}
.commentary_wrap .total_score{display: flex;justify-content: space-between;flex-wrap: wrap;border-bottom: 1px solid #fff;margin: 0px -20px;padding:5px 20px 5px 20px;}
.commentary_wrap .total_score p{font-size: 14px;line-height:27px;font-weight: 600;}
.commentary_wrap .total_score p span{font-weight: 400; margin-left:5px;}
.commentary_wrap .total_score p:nth-child(even){ text-align: right;}
.commentary_wrap .perOver_score{display: flex;justify-content: space-between;flex-wrap: wrap;padding: 6px 0px;}
.commentary_wrap .perOver_score p{flex: 0 0 50%;line-height: 28px; font-size:15px}
.commentary_wrap .perOver_score p span:first-child{ margin-right:5px;}
.commentarybtn{display: flex;justify-content: center;position: relative;z-index: 9;}
.commentarybtn a{display: flex;justify-content: center;background: #1A385D;font-size:16px;color: #fff;padding: 10px 35px;border-radius: 10px;margin-bottom: 15px;}
.matchsummarywrap{ position: relative;}
.matchsummarywrap:after {background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0) -40%, #fff);bottom: 0px;content: "";height: 280px;left: 0;position: absolute;visibility: visible;width: 100%;z-index: 0;}

@media(min-width:1000px){

	.fullScore_card_new .right-info{flex: 1 1 auto; flex-basis: calc(100% - 30%);border-right: 1px solid #cee4f8; border-bottom:none;}
	.fullScore_card_new .matchResult{ text-align: right;}
	.fullScore_card_new .team-name p,.fullScore_card_new .teamScore h3{font-size:18px; font-weight: 600;}
	.fullScore_card_new .team-name .teamwebname {display:block;}
	.fullScore_card_new .team-name .teammobilename {display: none;}
	.table_detail .fcolspan .pclass{font-size: 14px; width: inherit;}
}

.Sports_TopNews {margin-bottom: 20px; }
.spTopNews_Listing {display: grid; grid-template-columns: repeat(4, 1fr); grid-gap: 20px }
.spTopNews_Listing figure:first-child {grid-row: 1/3; grid-column: 1/3 }
.spTopNews_Listing figure:first-child .h3 {font-size: 1.5rem; font-weight: 700; line-height: 32px;margin-bottom: 10px;}
.spTopNews_Listing figure:first-child p {font-size: 1rem; line-height: 24px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical }
.spTopNews_Listing .imgThumb img {display: block; width: 100%; border-radius: 8px; margin-bottom: 10px }
.spTopNews_Listing .card_title .h3 {font-size: 1rem; font-weight: 500; line-height: 22px; color: #000; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical }
.Sports_TopNews .sports_heading{ justify-content:end; margin-top:10px; }
@media(max-width:767px) {
    .Sports_TopNews .sports_heading .h1 {margin-bottom: 10px; }
    .spTopNews_Listing {grid-template-columns: auto; }
    .spTopNews_Listing figure:first-child {grid-column: auto; grid-row: auto; }
    .spTopNews_Listing figure a {display: flex; flex-direction: row-reverse; }
    .spTopNews_Listing figure:first-child a {display: grid; }
    .spTopNews_Listing .imgThumb {width: 100px; margin-left: 10px; }
    .spTopNews_Listing .card_title {width: calc(100% - 110px); }
    .spTopNews_Listing figure:first-child .imgThumb {width: 100%; margin-left: 0; }
    .spTopNews_Listing figure:first-child .card_title {width: 100%; }
    .spTopNews_Listing .imgThumb img {border-radius: 4px; margin-bottom: 0; }
    .spTopNews_Listing figure:first-child .imgThumb {margin-bottom: 10px; } 
}

      `}</style>
    </>
  );
}
