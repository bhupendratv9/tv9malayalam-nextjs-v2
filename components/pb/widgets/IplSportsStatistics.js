import Image from "next/image";
import PropTypes from "prop-types";

const IMAGE_BASE = "https://images.tv9hindi.com/images";

const DEFAULT_VIEW_MORE = {
  most_runs: "https://www.tv9hindi.com/sports/cricket-news/series/ipl/orange-cap-holder",
  most_wickets: "https://www.tv9hindi.com/sports/cricket-news/series/ipl/purple-cap-holder",
  best_figures: "https://www.tv9hindi.com/sports/cricket-news/series/ipl/best-bowling-figures",
};

function urlSlug(name) {
  if (!name) return "";
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function splitPlayerName(name = "") {
  const parts = String(name).trim().split(/\s+/);
  if (parts.length <= 1) {
    return { firstName: "", lastName: parts[0] || "" };
  }
  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts.at(-1),
  };
}

function getStatsPayload(data, response) {
  const payload = data?.data || response?.data || data || response || {};
  return payload && typeof payload === "object" ? payload : {};
}

function getTeamShort(player = {}) {
  return player.for_team_short_name || player.team_short_name || "";
}

function getTeamName(player = {}) {
  return player.for_team_display_name || player.team_name || "";
}

function getPlayerProfileUrl(player = {}) {
  const playerId = player.player_id || "";
  const slug = urlSlug(player.player_name || "");
  if (!playerId || !slug) return "#";
  return `/sports/cricket-news/player-profile/${slug}-${playerId}`;
}

function getPlayerImageUrl(player = {}) {
  const playerId = player.player_id || "";
  const slug = urlSlug(player.player_name || "");
  if (!playerId || !slug) return "";
  return `${IMAGE_BASE}/player_images/players/${slug}-${playerId}.jpg`;
}

function getTeamFlagUrl(player = {}, size = "large_flags") {
  const teamSlug = urlSlug(getTeamName(player));
  if (!teamSlug) return "";
  return `${IMAGE_BASE}/${size}/${teamSlug}.png`;
}

function getCardStat(player, type) {
  if (type === "most_runs") return player.runs_scored || "";
  if (type === "most_wickets") return player.wickets || "";
  return player.best_bowling_figures || "";
}

function getTableStat(player, type) {
  return getCardStat(player, type);
}

function TopScorerCard({ player, title, type }) {
  if (!player) return null;

  const teamShort = getTeamShort(player);
  const teamName = getTeamName(player);
  const { firstName, lastName } = splitPlayerName(player.player_name || "");
  const playerImage = getPlayerImageUrl(player);
  const teamFlag = getTeamFlagUrl(player);

  return (
    <div className={`topScorer team_${teamShort}`}>
      <p className="catTitle">{title}</p>
      <p className="playerName">
        <a href={getPlayerProfileUrl(player)} title={player.player_name}>
          {firstName ? `${firstName} ` : ""}
          {lastName ? <strong>{lastName}</strong> : null}
        </a>
      </p>
      <p className="count">{getCardStat(player, type)}</p>
      {playerImage ? (
        <div className="playerImg">
          <Image
            width={147}
            height={148}
            src={playerImage}
            alt={player.player_name || ""}
            title={player.player_name || ""}
            unoptimized
          />
        </div>
      ) : null}
      {teamFlag ? (
        <div className="countryFlag">
          <Image
            width={24}
            height={24}
            src={teamFlag}
            alt={teamName}
            title={teamName}
            unoptimized
          />
        </div>
      ) : null}
    </div>
  );
}

function StatsTable({ rows, type }) {
  if (!rows.length) return null;

  return (
    <table>
      <tbody>
        {rows.map((player, idx) => {
          const teamFlag = getTeamFlagUrl(player, "flags");
          return (
            <tr key={player.player_id || `${player.player_name}-${idx}`}>
              <td>{idx + 2}</td>
              <td>
                <a href={getPlayerProfileUrl(player)} title={player.player_name}>
                  {player.player_name}
                </a>
              </td>
              <td>
                {teamFlag ? (
                  <Image
                    width={25}
                    height={25}
                    src={teamFlag}
                    alt={getTeamName(player)}
                    unoptimized
                  />
                ) : null}
              </td>
              <td>{getTableStat(player, type)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function StatSection({ title, type, players, viewMoreUrl }) {
  if (!Array.isArray(players) || players.length === 0) return null;

  const featured = players[0];
  const tableRows = players.slice(1, 5);

  return (
    <figure>
      <TopScorerCard player={featured} title={title} type={type} />
      <div className="table_list">
        <StatsTable rows={tableRows} type={type} />
        {viewMoreUrl ? (
          <div className="table-viewmore">
            <a href={viewMoreUrl}>View Full Table</a>
          </div>
        ) : null}
      </div>
    </figure>
  );
}

export default function IplSportsStatistics({
  data = null,
  response = null,
  dataConfig = {},
}) {
  const statsData = getStatsPayload(data, response);

  const mostRuns = Array.isArray(statsData.most_runs) ? statsData.most_runs : [];
  const mostWickets = Array.isArray(statsData.most_wickets) ? statsData.most_wickets : [];
  const bestFigures = Array.isArray(statsData.best_figures) ? statsData.best_figures : [];

  const sections = [
    {
      key: "most_runs",
      title: dataConfig.most_runs_title || "Most Runs",
      type: "most_runs",
      players: mostRuns,
      viewMoreUrl: dataConfig.most_runs_view_more_url || DEFAULT_VIEW_MORE.most_runs,
    },
    {
      key: "most_wickets",
      title: dataConfig.most_wickets_title || "Most Wickets",
      type: "most_wickets",
      players: mostWickets,
      viewMoreUrl: dataConfig.most_wickets_view_more_url || DEFAULT_VIEW_MORE.most_wickets,
    },
    {
      key: "best_figures",
      title: dataConfig.best_figures_title || "Best Bowling",
      type: "best_figures",
      players: bestFigures,
      viewMoreUrl: dataConfig.best_figures_view_more_url || DEFAULT_VIEW_MORE.best_figures,
    },
  ].filter((section) => section.players.length > 0);

  if (!sections.length) {
    return null;
  }

  return (
    <>
      <style>{`
        .statistics_wrapper{display:flex;justify-content:flex-start;border-radius:8px;margin-bottom:20px}
        .statistics_wrapper figure{width:32%;margin-right:2%;border-radius:8px;border:1.5px solid #e9e9e9;background:#fff;margin-bottom:20px}
        .statistics_wrapper figure:last-child{margin-right:0}
        .statistics_wrapper .topScorer{min-height:170px;padding:20px;position:relative;overflow:hidden;border-radius:8px 8px 0 0;z-index:0;margin:-1px}
        .statistics_wrapper .topScorer .catTitle{font-size:1rem;font-weight:600;color:#fff;text-transform:uppercase;margin-bottom:8px}
        .statistics_wrapper .topScorer .playerName a,.statistics_wrapper .topScorer .teamName a{font-size:1rem;font-weight:500;color:#fff;text-transform:uppercase;display:block;margin-bottom:18px}
        .statistics_wrapper .topScorer .playerName strong,.statistics_wrapper .topScorer .teamName strong{width:100%;display:block;font-size:1.4rem;font-weight:700}
        .statistics_wrapper .topScorer .count,.statistics_wrapper .topScorer .rank{color:#ffed12;font-size:2.5rem;font-weight:700}
        .statistics_wrapper .points_table .points{color:#ffed12;font-size:1.125rem;font-weight:700}
        .statistics_wrapper .topScorer .playerImg{position:absolute;right:10px;bottom:25px;height:80px;width:80px;border-radius:50%;border:2px solid #fff;background:#D9D9D9;overflow:hidden}
        .statistics_wrapper .topScorer .playerImg img{display:block;width:100%;height:100%;aspect-ratio:1/1;object-fit:cover;border-radius:50%}
        .statistics_wrapper .topScorer .countryFlag{position:absolute;right:15px;top:15px}
        .statistics_wrapper .points_table .teamFlag{position:absolute;top:50%;right:20px;transform:translateY(-50%)}
        .statistics_wrapper .points_table .teamFlag img{display:block;width:100%;max-width:100px}
        .statistics_wrapper .table_list{padding:10px 0 20px 0;position:relative}
        .statistics_wrapper .table_list table{width:100%;border-collapse:collapse}
        .statistics_wrapper .table_list table td{padding:8px;font-size:0.9rem;line-height:1;font-weight:600}
        .statistics_wrapper .table_list table td a{display:flex;align-items:center}
        .statistics_wrapper .table_list table td span{font-size:.875rem}
        .statistics_wrapper .table_list table td:nth-child(2){font-weight:500}
        .statistics_wrapper .table_list table td:nth-child(3){font-weight:400}
        .statistics_wrapper .table_list img{vertical-align:middle;margin-right:5px}
        .statistics_wrapper .topScorer .flexBox{display:flex;justify-content:space-between;align-items:baseline}
        .statistics_wrapper .table-viewmore{position:absolute;left:0px;right:0px;text-align:center;bottom:-12px}
        .statistics_wrapper .table-viewmore a{background:#fff;line-height:21px;border:1px solid #e9e9e9;font-size:14px;padding:5px 10px;border-radius:30px}
        .statistics_wrapper .team_CSK{background:#ffcb05}.statistics_wrapper .team_CSK::after{border-top:170px solid #141c2e;content:'';border-left:170px solid transparent;position:absolute;top:0;right:0;z-index:-1}
        .statistics_wrapper .team_SRH{background:#f26522}.statistics_wrapper .team_SRH::after{border-top:170px solid #712324;content:'';border-left:170px solid transparent;position:absolute;top:0;right:0;z-index:-1}
        .statistics_wrapper .team_KKR{background:#ecc542}.statistics_wrapper .team_KKR::after{border-top:170px solid #28204a;content:'';border-left:170px solid transparent;position:absolute;top:0;right:0;z-index:-1}
        .statistics_wrapper .team_DC{background:#b9251c}.statistics_wrapper .team_DC::after{border-top:170px solid #0d1a30;content:'';border-left:170px solid transparent;position:absolute;top:0;right:0;z-index:-1}
        .statistics_wrapper .team_LSG{background:#F60232}.statistics_wrapper .team_LSG::after{border-top:170px solid #0248bb;content:'';border-left:170px solid transparent;position:absolute;top:0;right:0;z-index:-1}
        .statistics_wrapper .team_MI{background:#2d6ab1}.statistics_wrapper .team_MI::after{border-top:170px solid #133165;content:'';border-left:170px solid transparent;position:absolute;top:0;right:0;z-index:-1}
        .statistics_wrapper .team_PBKS{background:#d71920}.statistics_wrapper .team_PBKS::after{border-top:170px solid #283765;content:'';border-left:170px solid transparent;position:absolute;top:0;right:0;z-index:-1}
        .statistics_wrapper .team_RR{background:#eb83b5}.statistics_wrapper .team_RR::after{border-top:170px solid #042856;content:'';border-left:170px solid transparent;position:absolute;top:0;right:0;z-index:-1}
        .statistics_wrapper .team_GT{background:#77c7f2}.statistics_wrapper .team_GT::after{border-top:170px solid #0d1a30;content:'';border-left:170px solid transparent;position:absolute;top:0;right:0;z-index:-1}
        .statistics_wrapper .team_RCB{background:#2b2a29}.statistics_wrapper .team_RCB::after{border-top:170px solid #36181b;content:'';border-left:170px solid transparent;position:absolute;top:0;right:0;z-index:-1}
        .statistics_wrapper .team_CAN{background:#EE2627}.statistics_wrapper .team_IND{background:#0A60C5}.statistics_wrapper .team_IRE{background:#34914D}.statistics_wrapper .team_PAK{background:#13301A}.statistics_wrapper .team_USA{background:#17193A}.statistics_wrapper .team_AUS{background:#082833}.statistics_wrapper .team_ENG{background:#FE2E3A}.statistics_wrapper .team_NAM{background:#233D6D}.statistics_wrapper .team_OMA{background:#D21D26}.statistics_wrapper .team_SCO{background:#59225E}.statistics_wrapper .team_AFG{background:#1753CF}.statistics_wrapper .team_NZ{background:#009FB2}.statistics_wrapper .team_PNG{background:#383D41}.statistics_wrapper .team_UGA{background:#E1C91C}.statistics_wrapper .team_WI{background:#6C1F33}.statistics_wrapper .team_BAN{background:#006A4E}.statistics_wrapper .team_SA{background:#046039}.statistics_wrapper .team_SL{background:#10274C}.statistics_wrapper .team_NEP{background:#035BB8}.statistics_wrapper .team_NED{background:#1C2336}
        .statistics_wrapper .team_CAN::after,.statistics_wrapper .team_IND::after,.statistics_wrapper .team_IRE::after,.statistics_wrapper .team_PAK::after,.statistics_wrapper .team_USA::after,.statistics_wrapper .team_AUS::after,.statistics_wrapper .team_ENG::after,.statistics_wrapper .team_NAM::after,.statistics_wrapper .team_OMA::after,.statistics_wrapper .team_SCO::after,.statistics_wrapper .team_AFG::after,.statistics_wrapper .team_NZ::after,.statistics_wrapper .team_PNG::after,.statistics_wrapper .team_UGA::after,.statistics_wrapper .team_WI::after,.statistics_wrapper .team_BAN::after,.statistics_wrapper .team_SA::after,.statistics_wrapper .team_SL::after,.statistics_wrapper .team_NEP::after,.statistics_wrapper .team_NED::after{content:'';border-left:170px solid transparent;position:absolute;top:0;right:0;z-index:-1}
        .statistics_wrapper .team_CAN::after{border-top:170px solid #1A191D}.statistics_wrapper .team_IND::after{border-top:170px solid #F27600}.statistics_wrapper .team_IRE::after{border-top:170px solid #11213C}.statistics_wrapper .team_PAK::after{border-top:170px solid #2E8836}.statistics_wrapper .team_USA::after{border-top:170px solid #E20014}.statistics_wrapper .team_AUS::after{border-top:170px solid #FCED18}.statistics_wrapper .team_ENG::after{border-top:170px solid #001A4C}.statistics_wrapper .team_NAM::after{border-top:170px solid #1D9EF0}.statistics_wrapper .team_OMA::after{border-top:170px solid #257249}.statistics_wrapper .team_SCO::after{border-top:170px solid #142F60}.statistics_wrapper .team_AFG::after{border-top:170px solid #D91914}.statistics_wrapper .team_NZ::after{border-top:170px solid #C7D4D9}.statistics_wrapper .team_PNG::after{border-top:170px solid #FFB550}.statistics_wrapper .team_UGA::after{border-top:170px solid #D72835}.statistics_wrapper .team_WI::after{border-top:170px solid #F5EC75}.statistics_wrapper .team_BAN::after{border-top:170px solid #F42A41}.statistics_wrapper .team_SA::after{border-top:170px solid #F7D734}.statistics_wrapper .team_SL::after{border-top:170px solid #3984D9}.statistics_wrapper .team_NEP::after{border-top:170px solid #FF2522}.statistics_wrapper .team_NED::after{border-top:170px solid #FD7430}
        @media(max-width:767px){
          .statistics_wrapper{flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;align-items:center}
          .statistics_wrapper::-webkit-scrollbar{display:none}
          .statistics_wrapper figure{width:80%;flex:0 0 auto;margin-right:4%}
          .statistics_wrapper .topScorer .playerName a,.statistics_wrapper .topScorer .teamName a{font-size:0.8rem}
          .statistics_wrapper .topScorer .playerName strong,.statistics_wrapper .topScorer .teamName strong{font-size:1.2rem}
          .statistics_wrapper .topScorer .count,.statistics_wrapper .topScorer .rank{font-size:1.9rem}
        }
      `}</style>
      <div className="spCommon_Section">
        <div className="statistics_wrapper">
          {sections.map((section) => (
            <StatSection
              key={section.key}
              title={section.title}
              type={section.type}
              players={section.players}
              viewMoreUrl={section.viewMoreUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
}

IplSportsStatistics.propTypes = {
  data: PropTypes.object,
  response: PropTypes.object,
  dataConfig: PropTypes.shape({
    most_runs_title: PropTypes.string,
    most_runs_view_more_url: PropTypes.string,
    most_wickets_title: PropTypes.string,
    most_wickets_view_more_url: PropTypes.string,
    best_figures_title: PropTypes.string,
    best_figures_view_more_url: PropTypes.string,
  }),
};

TopScorerCard.propTypes = {
  player: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.string,
};

StatsTable.propTypes = {
  rows: PropTypes.array,
  type: PropTypes.string,
};

StatSection.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  players: PropTypes.array,
  viewMoreUrl: PropTypes.string,
};
