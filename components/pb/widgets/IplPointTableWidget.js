import Image from "next/image";
import PropTypes from "prop-types";

const IMAGE_BASE = "https://images.tv9hindi.com/images/large_flags/ipl";
const DEFAULT_VIEW_MORE_URL =
  "https://www.tv9hindi.com/sports/cricket-news/series/ipl/points-table";

function decodeHtml(text) {
  if (!text || typeof text !== "string") return text;
  const map = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#039;": "'", "&apos;": "'" };
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&amp;|&lt;|&gt;|&quot;|&#039;|&apos;/g, (m) => map[m]);
}

function urlSlug(name) {
  if (!name) return "";
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getStandings(data, response) {
  const sources = [data, data?.data, response, response?.data];

  for (const source of sources) {
    if (Array.isArray(source?.standings)) {
      return source.standings;
    }
  }

  return [];
}

function getQualifySuffix(row = {}) {
  return String(row.is_qualified).toLowerCase() === "true" ? " (Q)" : "";
}

function getTeamProfileUrl(row = {}) {
  const teamId = row.id || "";
  const slug = urlSlug(row.name || row.name_eng || "");
  if (!teamId || !slug) return "#";
  return `/sports/cricket-news/series/ipl/teams/${slug}-team-profile-${teamId}`;
}

function getTeamFlagUrl(row = {}) {
  const slug = urlSlug(row.name || row.name_eng || "");
  if (!slug) return "";
  return `${IMAGE_BASE}/${slug}.png`;
}

function getDisplayStandings(standings, limit = 6) {
  return standings
    .filter((row) => {
      const position = Number(row.position || row.prev_position || 0);
      return position >= 1 && position <= limit;
    })
    .sort(
      (a, b) =>
        Number(a.position || a.prev_position || 0) -
        Number(b.position || b.prev_position || 0)
    )
    .slice(0, limit);
}

export default function IplPointTableWidget({
  title = "",
  data = null,
  response = null,
  dataConfig = {},
}) {
  const displayTitle = decodeHtml(title || dataConfig.title || "") || "आईपीएल 2026 पॉइंट्स टेबल";
  const viewMoreUrl = dataConfig.view_more_url || DEFAULT_VIEW_MORE_URL;
  const displayLimit = Number(dataConfig.display_limit) || 6;
  const standings = getDisplayStandings(getStandings(data, response), displayLimit);

  if (!standings.length) {
    return null;
  }

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol viewBox="0 0 13 9" id="rgt-arrow">
          <path d="M7.76244 8.40347C7.59551 8.25946 7.51538 8.08543 7.52205 7.88141C7.52929 7.67738 7.61637 7.50336 7.78331 7.35934L10.1413 5.3251H0.834671C0.598181 5.3251 0.399808 5.25597 0.239551 5.11771C0.0798503 4.97993 0 4.80903 0 4.60501C0 4.40098 0.0798503 4.22984 0.239551 4.09158C0.399808 3.95381 0.598181 3.88492 0.834671 3.88492H10.1413L7.76244 1.83267C7.59551 1.68865 7.51204 1.51751 7.51204 1.31924C7.51204 1.12146 7.59551 0.950559 7.76244 0.806541C7.92937 0.662524 8.12775 0.590515 8.35756 0.590515C8.58682 0.590515 8.78491 0.662524 8.95185 0.806541L12.7705 4.10095C12.8539 4.17295 12.9132 4.25096 12.9482 4.33497C12.9827 4.41898 13 4.509 13 4.60501C13 4.70102 12.9827 4.79103 12.9482 4.87504C12.9132 4.95905 12.8539 5.03706 12.7705 5.10907L8.93098 8.42147C8.77796 8.55349 8.58682 8.6195 8.35756 8.6195C8.12775 8.6195 7.92937 8.54749 7.76244 8.40347Z" />
        </symbol>
      </svg>

      <div className="Ctable_wrapper iplPointTableCls">
        <style>{`
          a{color:#000;text-decoration:none}
          .Ctable_wrapper{margin-bottom:20px}
          .Ctable_wrapper .Cgroup_table{background:#FFFFFF;border-radius:8px;margin-bottom:20px;overflow-x:scroll;white-space:nowrap;border:1px solid #19398A}
          .Ctable_wrapper .Cgroup_table h4{font-weight:600;font-size:15px;line-height:24px;text-transform:capitalize;color:#000000;text-align:center;margin-bottom:6px}
          .Ctable_wrapper .Cgroup_table .Crank_table{color:#000;width:100%;border-collapse:collapse}
          .Ctable_wrapper .Cgroup_table .Crank_table thead{padding:8px 10px}
          .Ctable_wrapper .Cgroup_table .Crank_table thead tr th{background:#19398A;color:#fff;font-size:14px;font-weight:600;line-height:22px;text-transform:uppercase}
          .Ctable_wrapper .Cgroup_table .Crank_table thead tr th:after{content:attr(data-mobtitle)}
          .Ctable_wrapper .Cgroup_table .Crank_table tbody tr td{font-weight:500;font-size:13px;line-height:20px;color:#292929;border-bottom:1px solid #ffffff;text-align:center}
          .Ctable_wrapper .Cgroup_table .Crank_table tbody tr:last-child td{border-bottom:none}
          .Ctable_wrapper .Cgroup_table .Crank_table thead tr th,.Ctable_wrapper .Crank_table tbody tr td{padding:8px 10px}
          .Ctable_wrapper .Cgroup_table .Crank_table thead tr th:first-child{border-radius:8px 0 0 0px;text-align:left;text-transform:capitalize}
          .Ctable_wrapper .Cgroup_table .Crank_table thead tr th:last-child{border-radius:0 8px 0px 0}
          .Ctable_wrapper .Cgroup_table .Crank_table tbody tr td a{display:flex;align-items:center;font-weight:700}
          .Ctable_wrapper .Cgroup_table .Crank_table tbody tr td .teamNameMob{display:inline}
          .Ctable_wrapper .Cgroup_table .Crank_table tbody tr td .teamNameWeb{display:none}
          .Ctable_wrapper .Cgroup_table .Crank_table tbody tr td img{margin-right:5px;height:27px;width:27px;vertical-align:middle}
          .Ctable_wrapper .Cgroup_table .Crank_table tbody tr:nth-child(-n+4){background:#ebf5ff}
          .Ctable_wrapper .Cgroup_table .Crank_table tbody tr td img{display:none}
          .iplPointTableCls .sports_heading .h2{font-size:18px}
          @media(min-width:1000px){
            .Ctable_wrapper .Cgroup_table{overflow-x:inherit}
            .Ctable_wrapper .Cgroup_table .Crank_table thead tr th:after{content:attr(data-webtitle)}
            .Ctable_wrapper .Cgroup_table .Crank_table tbody tr td img{display:block}
            .Ctable_wrapper .Cgroup_table .Crank_table tbody tr td .teamNameMob{display:none}
            .Ctable_wrapper .Cgroup_table .Crank_table tbody tr td .teamNameWeb{display:inline}
            .iplPointTableCls .sports_heading .h2{font-size:24px}
          }
        `}</style>
        <div className="sports_heading">
          <h2 className="h2">{displayTitle}</h2>
          <a href={viewMoreUrl} className="view_more">
            See More <svg><use href="#rgt-arrow" /></svg>
          </a>
        </div>
        <div className="Cgroup_table">
          <div className="Cpoint_data">
            <table className="Crank_table">
              <thead>
                <tr className="Ctable_header">
                  <th>Team</th>
                  <th>M</th>
                  <th>W</th>
                  <th>L</th>
                  <th>P</th>
                  <th>Nr</th>
                  <th>Nrr</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((row) => {
                  const teamName = row.name || row.name_eng || "";
                  const qualify = getQualifySuffix(row);
                  const teamUrl = getTeamProfileUrl(row);
                  const teamFlag = getTeamFlagUrl(row);

                  return (
                    <tr key={row.id || row.position}>
                      <td>
                        <a
                          href={teamUrl}
                          title={teamName}
                          data-mobtitle={`${row.short_name || ""}${qualify}`}
                          data-webtitle={`${teamName}${qualify}`}
                        >
                          {teamFlag ? (
                            <Image
                              src={teamFlag}
                              alt={teamName}
                              width={27}
                              height={27}
                              unoptimized
                            />
                          ) : null}
                          <span className="teamNameMob">
                            {row.short_name || teamName}
                          </span>
                          <span className="teamNameWeb">
                            {teamName}
                          </span>
                        </a>
                      </td>
                      <td>{row.events_played ?? "-"}</td>
                      <td>{row.wins ?? "-"}</td>
                      <td>{row.lost ?? "-"}</td>
                      <td>{row.points ?? "-"}</td>
                      <td>{row.no_result ?? "-"}</td>
                      <td>{row.net_run_rate ?? "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

IplPointTableWidget.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object,
  response: PropTypes.object,
  dataConfig: PropTypes.shape({
    title: PropTypes.string,
    view_more_url: PropTypes.string,
    display_limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};
