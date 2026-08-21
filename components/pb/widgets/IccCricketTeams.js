import { FLAG_BASE_URL } from "@/lib/constants";

function slugify(str) {
  if (!str) return "";
  return str.toLowerCase().replace(/women/gi, "").trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default function IccCricketTeams({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
}) {
  const displayTitle = title || "Cricket Teams";

  // Data is at items[0].teams
  const teams = Array.isArray(items?.[0]?.teams)
    ? items[0].teams
    : Array.isArray(items?.teams)
    ? items.teams
    : [];

  if (!teams || teams.length === 0) return null;

  return (
    <>
      <style>{`
        .teamsWrapper .team_listing{display:flex;flex-wrap:wrap}
        .teamsWrapper .team_listing figure{width:48%;margin-right:4%;background:#fff;border:1px solid #e7e7e7;box-shadow:0 0 6px rgba(84,86,101,.12);border-radius:12px;padding:10px;margin-bottom:15px;position:relative;overflow:hidden}
        .teamsWrapper .team_listing figure:before{content:'';background:rgba(220,0,0,.15);height:36px;width:40px;border-radius:50%;position:absolute;right:-10px;bottom:-17px}
        .teamsWrapper .team_listing figure .arrow_icon{fill:#dc0000;width:18px;height:18px;position:absolute;right:4px;bottom:0;cursor:pointer}
        .teamsWrapper .team_listing figure a{display:flex;align-items:center;justify-content:flex-start}
        .teamsWrapper .team_listing figure:nth-child(2n+2){margin-right:0}
        .teamsWrapper .team_listing figure .imgWrap{margin-right:6px;border:3px solid #e4e4e4;border-radius:50%}
        .teamsWrapper .team_listing figure .imgWrap img{display:block}
        .teamsWrapper .team_listing figure h3{font-weight:600;font-size:14px;line-height:17px;color:#000;width:72%}
        .wct20 .teamsWrapper .team_listing figure:before{background:rgba(0,176,227,.15)}
        .wct20 .teamsWrapper .team_listing figure .arrow_icon{fill:#00B0E3}
        @media(min-width:1000px){
          .teamsWrapper .team_listing figure{width:23.5%;margin-bottom:20px;margin-right:2%}
          .teamsWrapper .team_listing figure:nth-child(2n+2){margin-right:2%}
          .teamsWrapper .team_listing figure:nth-child(4n+4){margin-right:0}
        }
      `}</style>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol viewBox="0 0 48 48" id="rgtArrow">
          <path d="M22.5861 34.586L31.1721 26H12.0001V22H31.1721L22.5861 13.414L25.4141 10.586L38.8281 24L25.4141 37.414L22.5861 34.586Z" />
        </symbol>
      </svg>
      <div className="common_section teamsWrapper">
        <div className="common-heading">
          <h1>{displayTitle}</h1>
        </div>
        <div className="team_listing">
          {teams.map((team, idx) => {
            const country = team?.Country || team?.name || "";
            const countryEng = team?.Country_eng || team?.name || country;
            const teamId = team?.team_id || team?.id || "";
            const flagSlug = slugify(countryEng);
            const flagUrl = `${FLAG_BASE_URL}${flagSlug || "TBD"}.png`;
            const profileUrl = `/sports/cricket-news/series/teams/${slugify(country)}-team-profile-${teamId}`;

            return (
              <figure key={teamId || idx}>
                <a href={profileUrl} title={country}>
                  <div className="imgWrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={flagUrl}
                      alt={country}
                      height={35}
                      width={35}
                      onError={(e) => { e.target.onerror = null; e.target.src = `${FLAG_BASE_URL}TBD.png`; }}
                    />
                  </div>
                  <h3>{country}</h3>
                </a>
                <svg className="arrow_icon">
                  <use href="#rgtArrow"></use>
                </svg>
              </figure>
            );
          })}
        </div>
      </div>
    </>
  );
}
