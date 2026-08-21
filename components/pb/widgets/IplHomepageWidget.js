import Image from "next/image";
import { useState, useEffect } from "react";
import { decodeHtml } from "@/lib/helper/commonHelper";
import { getImg, getLink } from "@/lib/helper/widgetHelper";

function urlSlug(name) {
  if (!name) return "";
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function useClientFetch(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    fetch(url, { headers: { Accept: "application/json" } })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => { if (!cancelled) setData(json); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [url]);
  return data;
}

// ─── Points Table Component ──────────────────────────────────────────────────
function PointsTable({ standingsData }) {
  if (!standingsData) return null;

  // standingsData can be an object with group keys or an array
  let groups = {};
  if (Array.isArray(standingsData)) {
    groups = { default: standingsData };
  } else if (typeof standingsData === "object") {
    groups = standingsData;
  }

  const groupKeys = Object.keys(groups);
  if (groupKeys.length === 0) return null;

  // Show first group's top 5 teams
  const firstGroup = groups[groupKeys[0]] || [];
  const teams = firstGroup.slice(0, 5);

  return (
    <div className="t20wcPtable">
      <div className="tab-content" id="standings">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Teams</th>
                <th>M</th>
                <th>W</th>
                <th>L</th>
                <th>N/R</th>
                <th>NRR</th>
                <th>PTS</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={team.id || idx}>
                  <td>
                    <a
                      href={`/sports/cricket-news/series/ipl/teams/${urlSlug(team.name)}-team-profile-${team.id}`}
                      title={team.name || ""}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="teamLogo"
                        src={`https://images.tv9hindi.com/images/large_flags/${urlSlug(team.name)}.png`}
                        width={20}
                        height={20}
                        alt={team.name || ""}
                      />
                      <span>{team.short_name || team.name || ""}</span>
                    </a>
                  </td>
                  <td>{team.events_played ?? team.matches ?? "-"}</td>
                  <td>{team.wins ?? "-"}</td>
                  <td>{team.lost ?? team.losses ?? "-"}</td>
                  <td>{team.no_result ?? "-"}</td>
                  <td>{team.net_run_rate ?? "-"}</td>
                  <td>{team.points ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Stats Card Components ───────────────────────────────────────────────────
function TopScorerCard({ label, capImg, capAlt, player, linkHref }) {
  if (!player) return null;
  const nameParts = (player.name || "").split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <div className="statsCard topScorer">
      <a href={linkHref}>
        <div className="col">
          <p className="catTitle">{label}</p>
          <div className="countryFlag">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img width={30} height={22} src={capImg} alt={capAlt} title={capAlt} />
          </div>
        </div>
        <div className="flexEnd">
          <p className="playerName">{firstName} <strong>{lastName}</strong></p>
          <p className="count">{player.value ?? ""}</p>
        </div>
      </a>
    </div>
  );
}

function InterestingFacts({ tracker }) {
  if (!tracker) return null;
  const sixes = tracker.sixesteam?.[0]?.title_value;
  const fours = tracker.foursteam?.[0]?.title_value;
  const centuries = tracker.hundredsteam?.[0]?.title_value;
  const fifties = tracker.fiftiesteam?.[0]?.title_value;

  if (!sixes && !fours && !centuries && !fifties) return null;

  return (
    <div className="statsCard intFacts">
      <div className="h2">interesting facts so far</div>
      <div className="intFacts_Wrap">
        {sixes && <div className="factsCat"><span>sixes</span><strong>{sixes}</strong></div>}
        {fours && <div className="factsCat"><span>fours</span><strong>{fours}</strong></div>}
        {centuries && <div className="factsCat"><span>Centuries</span><strong>{centuries}</strong></div>}
        {fifties && <div className="factsCat"><span>Fifties</span><strong>{fifties}</strong></div>}
      </div>
    </div>
  );
}

// ─── Main Widget ─────────────────────────────────────────────────────────────
export default function IplHomepageWidget({ items = [], dataConfig = {}, title = "" }) {
  const first = items.length > 0 ? items[0] : null;
  const rest = items.slice(1);
  const displayTitle = decodeHtml(title) || "IPL 2026";
  const titleUrl = dataConfig.view_more_url || "";

  // Client-side API fetches
  const standingsData = useClientFetch(dataConfig.standings || "");
  const trackerData = useClientFetch(dataConfig.tournament_tracker || "");

  // Extract top run scorer and wicket taker from tracker
  const topRunScorer = trackerData?.runs?.[0] || null;
  const topWicketTaker = trackerData?.wickets?.[0] || null;

  return (
    <>
      <div className="iplWidget_Wrapper">
        <div className="widget_NavBar">
          <div className="nav-logo">
            {titleUrl ? (
              <a href={titleUrl} title={displayTitle}><h2>{displayTitle}</h2></a>
            ) : (
              <h2>{displayTitle}</h2>
            )}
          </div>
          <div className="nav-links">
            <a href="/sports/cricket-news/series/ipl">
              <svg><use href="/tv9hindi-nextjs/images/icons.svg#ic_notebook"></use></svg>
              <span>News</span>
            </a>
            <a href="/sports/cricket-news/series/schedule/ipl-2026-13469">
              <svg><use href="/tv9hindi-nextjs/images/icons.svg#ic_calender"></use></svg>
              <span>Schedule</span>
            </a>
            <a href="/sports/cricket-news/series/ipl/results">
              <svg><use href="/tv9hindi-nextjs/images/icons.svg#ic_book"></use></svg>
              <span>Results</span>
            </a>
            <a href="/sports/cricket-news/series/ipl/teams">
              <svg><use href="/tv9hindi-nextjs/images/icons.svg#ic_user"></use></svg>
              <span>Teams</span>
            </a>
          </div>
        </div>

        <div className="widgetNews_Wrapper">
          <div className="topicNews_Cont">
            {/* Big news - first item */}
            <div className="bigNews_Wrap">
              {first && (
                <figure>
                  <a href={getLink(first)} title={decodeHtml(first.title || first.post_title || "")}>
                    {getImg(first) && (
                      <div className="imgThumb">
                        <Image
                          width={330}
                          height={187}
                          src={getImg(first)}
                          alt={decodeHtml(first.title || first.post_title || "")}
                          title={decodeHtml(first.title || first.post_title || "")}
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="card_title">
                      <h3 className="h3">{decodeHtml(first.title || first.post_title || "")}</h3>
                    </div>
                  </a>
                </figure>
              )}
            </div>
            {/* Small news - remaining items */}
            <div className="smallNews_Wrap">
              {rest.map((item, idx) => (
                <figure key={item.id || item.post_id || idx}>
                  <a href={getLink(item)} title={decodeHtml(item.title || item.post_title || "")}>
                    <div className="card_title">
                      <h3 className="h3">{decodeHtml(item.title || item.post_title || "")}</h3>
                    </div>
                  </a>
                </figure>
              ))}
            </div>
          </div>

          {/* Points Table */}
          <div className="iplPtable_Wrapper">
            <div className="h2">
              <a href="/sports/cricket-news/series/ipl/points-table">
                {displayTitle} Points Table
              </a>
            </div>
            <PointsTable standingsData={standingsData} />
            <span className="seeMore">
              <a href="/sports/cricket-news/series/ipl/points-table">See More</a>
            </span>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="widgetBottom_Wrapper">
          <TopScorerCard
            label="Most Runs"
            capImg="https://images.tv9hindi.com/wp-content/uploads/2025/03/orangecap.png"
            capAlt="IPL 2026 Most Runs"
            player={topRunScorer}
            linkHref="/sports/cricket-news/series/ipl/orange-cap-holder"
          />
          <TopScorerCard
            label="Most Wickets"
            capImg="https://images.tv9hindi.com/wp-content/uploads/2025/03/purplecap.png"
            capAlt="IPL 2026 Most Wickets"
            player={topWicketTaker}
            linkHref="/sports/cricket-news/series/ipl/purple-cap-holder"
          />
          <InterestingFacts tracker={trackerData} />
        </div>

        <div id="mobBG"></div>
      </div>

      <style jsx global>{`
      .iplWidget_Wrapper{background-color:#19398a;padding:15px 15px 70px 15px;margin-bottom:100px;position:relative;z-index:0}
      .iplWidget_Wrapper::before{content:"";background-image:url(https://images.tv9hindi.com/wp-content/themes/tv9bharavarsh/cricket/images/ipl/bg-left-web.svg);background-repeat:no-repeat;position:absolute;left:20px;bottom:-30px;width:174px;height:199px;z-index:-1;transform:rotate(60deg)}
      .iplWidget_Wrapper::after{content:"";background-image:url(https://images.tv9hindi.com/wp-content/themes/tv9bharavarsh/cricket/images/ipl/bg-right-web.svg);background-repeat:no-repeat;position:absolute;right:0;bottom:0;width:340px;height:240px;z-index:-1}
      .iplWidget_Wrapper .widget_NavBar{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:20px}
      .iplWidget_Wrapper .widget_NavBar .nav-logo h2{color:#fff;margin-bottom:.5rem;font-size:1.6875rem;font-weight:800;text-transform:uppercase}
      .iplWidget_Wrapper .widget_NavBar .nav-links{display:flex;flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;align-items:center}
      .iplWidget_Wrapper .widget_NavBar .nav-links a{flex:0 0 auto;font-size:.875rem;line-height:20px;color:#fff;border:1px solid #fff;border-radius:50px;padding:5px 10px;margin-right:10px;display:flex;align-items:center;text-transform:uppercase}
      .iplWidget_Wrapper .widget_NavBar .nav-links a:last-child{margin-right:0}
      .iplWidget_Wrapper .widget_NavBar .nav-links svg{width:20px;height:20px;fill:transparent;margin-right:5px;stroke:#fff}
      .iplWidget_Wrapper .widget_NavBar .nav-links span{width:calc(100% - 25px)}
      .iplWidget_Wrapper .widgetNews_Wrapper{display:grid;grid-template-columns:1fr 310px;grid-gap:15px;margin-bottom:10px}
      .iplWidget_Wrapper .widgetNews_Wrapper .topicNews_Cont{display:grid;grid-template-columns:330px 1fr;grid-gap:15px}
      .iplWidget_Wrapper .widgetNews_Wrapper .topicNews_Cont .bigNews_Wrap .imgThumb img{width:100%;display:block;border-radius:4px;margin-bottom:10px}
      .iplWidget_Wrapper .widgetNews_Wrapper .topicNews_Cont .bigNews_Wrap .card_title .h3{font-size:1.25rem;line-height:30px;font-weight:700;color:#fff;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}
      .iplWidget_Wrapper .widgetNews_Wrapper .topicNews_Cont .smallNews_Wrap figure{margin-bottom:.9375rem;padding-bottom:.9375rem;border-bottom:1px solid #274ca6}
      .iplWidget_Wrapper .widgetNews_Wrapper .topicNews_Cont .smallNews_Wrap figure:last-child{border-bottom:none;padding-bottom:0;margin-bottom:0}
      .iplWidget_Wrapper .widgetNews_Wrapper .topicNews_Cont .smallNews_Wrap .card_title .h3{font-size:.9375rem;line-height:22px;font-weight:600;color:#fff;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical}
      .iplWidget_Wrapper .iplPtable_Wrapper .h2,.iplWidget_Wrapper .iplPtable_Wrapper .h2 a{font-size:1rem;line-height:1.5625rem;font-weight:700;color:#fff;margin-bottom:5px}
      .iplWidget_Wrapper .iplPtable_Wrapper .t20wcPtable{border-radius:8px;border:1px solid #274ca6;overflow:hidden}
      .iplWidget_Wrapper .iplPtable_Wrapper .tab-content{background:rgba(25,57,138,.8)}
      .iplWidget_Wrapper .iplPtable_Wrapper .t20wcPtable table{width:100%;border-collapse:collapse;border-spacing:0}
      .iplWidget_Wrapper .iplPtable_Wrapper .t20wcPtable table tr{border-bottom:1px solid #274ca6}
      .iplWidget_Wrapper .iplPtable_Wrapper .t20wcPtable table tbody tr:last-child{border-bottom:none}
      .iplWidget_Wrapper .iplPtable_Wrapper .t20wcPtable table td,.iplWidget_Wrapper .iplPtable_Wrapper .t20wcPtable table th{color:#fff;font-size:.8125rem;line-height:1.5256rem;padding:4px 8px;text-align:center}
      .iplWidget_Wrapper .iplPtable_Wrapper .t20wcPtable table td:first-child,.iplWidget_Wrapper .iplPtable_Wrapper .t20wcPtable table th:first-child{text-align:left}
      .iplWidget_Wrapper .iplPtable_Wrapper .t20wcPtable table td a{display:inline-flex;align-items:center;color:#fff;vertical-align:middle}
      .teamLogo{height:20px;width:20px;vertical-align:middle;margin-right:5px}
      .iplWidget_Wrapper .iplPtable_Wrapper .t20wcPtable table td span{margin:0 0 0 5px}
      .iplWidget_Wrapper .widgetBottom_Wrapper{display:grid;grid-template-columns:1fr 1fr 440px;grid-gap:15px;position:absolute;left:50%;transform:translateX(-50%);width:97%}
      .iplWidget_Wrapper .widgetBottom_Wrapper .statsCard{background-color:#0e2a6f;padding:10px;border:1px solid #274ca6;border-radius:8px;position:relative}
      .iplWidget_Wrapper .widgetBottom_Wrapper .topScorer .col{display:flex;justify-content:space-between;margin-bottom:28px}
      .iplWidget_Wrapper .widgetBottom_Wrapper .topScorer .catTitle{font-size:1rem;font-weight:600;color:#fff;text-transform:uppercase}
      .iplWidget_Wrapper .widgetBottom_Wrapper .topScorer .countryFlag{height:38px;width:38px;background:#fff;border-radius:50px;display:flex;align-items:center;justify-content:center}
      .iplWidget_Wrapper .widgetBottom_Wrapper .topScorer .countryFlag img{height:22px;width:30px}
      .iplWidget_Wrapper .widgetBottom_Wrapper .topScorer .flexEnd{display:flex;justify-content:space-between;align-items:flex-end}
      .iplWidget_Wrapper .widgetBottom_Wrapper .topScorer .playerName{font-size:.8rem;font-weight:500;color:#fff;text-transform:uppercase;display:block}
      .iplWidget_Wrapper .widgetBottom_Wrapper .topScorer .playerName strong{width:100%;display:block;font-size:1.2rem;font-weight:700}
      .iplWidget_Wrapper .widgetBottom_Wrapper .topScorer .count{color:#ef4123;font-size:2.5rem;line-height:40px;font-weight:700}
      .iplWidget_Wrapper .widgetBottom_Wrapper .intFacts .h2{font-size:1rem;line-height:1.5625rem;font-weight:700;color:#fff;text-align:center;text-transform:uppercase}
      .iplWidget_Wrapper .widgetBottom_Wrapper .intFacts .intFacts_Wrap{display:grid;grid-template-columns:auto auto auto auto;grid-gap:10px}
      .iplWidget_Wrapper .widgetBottom_Wrapper .intFacts .intFacts_Wrap .factsCat{border:1px solid #274ca6;border-radius:8px;background:linear-gradient(180deg,#071e55 .5%,#10054a 34.49%,#0f2d77 34.5%,#0c013e 97.5%);padding:5px}
      .iplWidget_Wrapper .widgetBottom_Wrapper .intFacts .intFacts_Wrap .factsCat span,.iplWidget_Wrapper .widgetBottom_Wrapper .intFacts .intFacts_Wrap .factsCat strong{display:block;text-align:center}
      .iplWidget_Wrapper .widgetBottom_Wrapper .intFacts .intFacts_Wrap .factsCat span{font-size:1rem;line-height:1.5625rem;text-transform:uppercase;color:#fff}
      .iplWidget_Wrapper .widgetBottom_Wrapper .intFacts .intFacts_Wrap .factsCat strong{font-size:2.5rem;line-height:50px;color:#ef4123}
      .iplWidget_Wrapper .widgetNews_Wrapper .topicNews_Cont .bigNews_Wrap .imgThumb{position:relative}
      .iplWidget_Wrapper .widgetNews_Wrapper .topicNews_Cont .bigNews_Wrap .imgThumb img{width:100%;display:block;border-radius:4px;margin-bottom:10px}
      .iplWidget_Wrapper .iplPtable_Wrapper .t20wcPtable table tbody tr:nth-child(1),.iplWidget_Wrapper .iplPtable_Wrapper .t20wcPtable table tbody tr:nth-child(2),.iplWidget_Wrapper .iplPtable_Wrapper .t20wcPtable table tbody tr:nth-child(3),.iplWidget_Wrapper .iplPtable_Wrapper .t20wcPtable table tbody tr:nth-child(4){background:#021c5b}
      .seeMore{display:flex;align-items:center;justify-content:center;margin-top:.5rem}
      .seeMore a{background:#0e2a6f;color:#fff;padding:6px 15px;border-radius:20px;display:block;font-size:.875rem;line-height:18px}
      .iplWidget_Wrapper .widget_NavBar .nav-logo{display:flex;align-items:center}
      @media only screen and (max-width:999px){
      .iplWidget_Wrapper{padding-bottom:40px;margin-bottom:20px}
      .iplWidget_Wrapper .widget_NavBar{justify-content:space-between}
      .iplWidget_Wrapper .widget_NavBar .nav-links::-webkit-scrollbar{display:none}
      .iplWidget_Wrapper .widgetBottom_Wrapper,.iplWidget_Wrapper .widgetNews_Wrapper,.iplWidget_Wrapper .widgetNews_Wrapper .topicNews_Cont{grid-template-columns:auto;grid-gap:0}
      .iplWidget_Wrapper .widgetNews_Wrapper .topicNews_Cont{grid-gap:unset}
      .iplWidget_Wrapper .widgetNews_Wrapper .topicNews_Cont .bigNews_Wrap figure{margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #675d99}
      .iplWidget_Wrapper .widgetNews_Wrapper .topicNews_Cont .smallNews_Wrap figure,.iplWidget_Wrapper .widgetNews_Wrapper .topicNews_Cont .smallNews_Wrap figure:last-child{margin-bottom:10px;padding-bottom:10px}
      .iplWidget_Wrapper .widgetBottom_Wrapper{position:unset;transform:none;grid-gap:10px;width:100%}
      .iplWidget_Wrapper .widgetBottom_Wrapper .statsCard{width:100%}
      .iplWidget_Wrapper .widgetBottom_Wrapper .topScorer .catTitle{margin-bottom:15px}
      .iplWidget_Wrapper .widgetBottom_Wrapper .intFacts .intFacts_Wrap{grid-template-columns:1fr 1fr}
      .iplWidget_Wrapper::before{background-image:url(https://images.tv9hindi.com/wp-content/themes/tv9bharavarsh/cricket/images/ipl/bg-red-mobile.svg);width:83px;height:73px;left:0;top:-25px;transform:rotate(36deg)}
      .iplWidget_Wrapper::after{background-image:url(https://images.tv9hindi.com/wp-content/themes/tv9bharavarsh/cricket/images/ipl/bg-yellow-mobile.svg);width:84px;height:60px;right:12px;top:-20px;transform:rotate(26deg)}
      #mobBG{background-image:url(https://images.tv9hindi.com/wp-content/themes/tv9bharavarsh/cricket/images/ipl/sparkel-bottom-bg-mob.svg);background-repeat:no-repeat;width:100px;height:62px;position:absolute;right:0;bottom:0;background-size:cover;z-index:-1}
      .iplWidget_Wrapper .widgetBottom_Wrapper .topScorer .col{margin-bottom:5px}
      }
      @media (max-width:575.98px){
      .iplWidget_Wrapper .widget_NavBar{justify-content:center}
      }
      `}</style>
    </>
  );
}
