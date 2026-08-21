import React from "react";
import { decodeHtml } from "@/lib/helper/commonHelper";

const PLAYER_IMG_BASE = "https://images.tv9hindi.com/images/player_images/players/";

function slugify(str) {
    if (!str) return "";
    return str.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default function IccTeamProfile({
    title = "",
    items = [],
    dataConfig = {},
}) {
    const displayTitle = decodeHtml(title) || "";

    // items = [{ playerdata: [...] }]
    const playerList = Array.isArray(items?.[0]?.playerdata)
        ? items[0].playerdata
        : Array.isArray(items)
        ? items.flatMap((g) => (Array.isArray(g?.playerdata) ? g.playerdata : []))
        : [];

    // Profile URL: /sports/cricket-news/player-profile/<slug>-<id>
    const getProfileUrl = (player) => {
        const slug = slugify(player?.player_name_eng || player?.short_name || "");
        return `/sports/cricket-news/player-profile/${slug}-${player?.id}`;
    };

    // Image URL: https://images.tv9hindi.com/images/player_images/players/<slug>-<id>.jpg
    const getPlayerImg = (player) => {
        const slug = slugify(player?.player_name_eng || player?.short_name || "");
        return `${PLAYER_IMG_BASE}${slug}-${player?.id}.jpg`;
    };

    return (
        <>
            <style>{`
                .playersWrapper{margin-bottom:20px}
                .playersWrapper .player_listing{display:flex;flex-wrap:wrap}
                .playersWrapper .player_listing figure{width:48%;margin-right:4%;background:#fff;border:1px solid #e7e7e7;box-shadow:0 0 6px rgba(84,86,101,.12);border-radius:14px;margin-bottom:15px;position:relative;overflow:hidden;text-align:center;z-index:0}
                .playersWrapper .player_listing figure:nth-child(2n+2){margin-right:0}
                .playersWrapper .player_listing figure:before{content:'';background:rgba(220,0,0,.3);height:125px;width:125px;border-radius:50%;position:absolute;top:-80px;z-index:-1;transform:translateX(-50%)}
                .playersWrapper .player_listing figure .playerImg{height:65px;width:65px;margin:20px auto 10px auto}
                .playersWrapper .player_listing figure .playerImg img{display:block;border-radius:50%;border:2px solid rgba(220,0,0,.3);width:100%;background:#fff}
                .playersWrapper .player_listing figure h3{font-weight:600;font-size:15px;line-height:22px;color:#000}
                .playersWrapper .player_listing figure p{font-weight:500;font-size:12px;line-height:18px;color:#7a8a8e;margin-bottom:4px}
                .playersWrapper .player_listing figure .playerDetails{border-top:1px solid #eeeded;display:flex;align-items:center;justify-content:space-evenly}
                .playersWrapper .player_listing figure .playerDetails span{font-weight:500;font-size:12px;line-height:18px;color:#7a8a8e;text-align:center;display:inline-block;padding:6px}
                .playersWrapper .player_listing figure .playerDetails span:first-child{width:100%}
                .playersWrapper .player_listing figure .playerDetails span.playerAge{width:30%;border-right:none}
                .playersWrapper .no-data{text-align:center;padding:20px;color:#737373;font-size:14px;width:100%}
                .wct20 .playersWrapper .player_listing figure:before{background:rgba(0,176,227,1)}
                .wct20 .playersWrapper .player_listing figure .playerImg img{border:2px solid rgba(0,176,227,.3)}
                .wct20 .playersWrapper .player_listing figure h3{color:#10044A}
                @media(min-width:1000px){
                    .playersWrapper .player_listing figure{width:23.5%;margin-bottom:20px;margin-right:2%}
                    .playersWrapper .player_listing figure:nth-child(2n+2){margin-right:2%}
                    .playersWrapper .player_listing figure:nth-child(4n+4){margin-right:0}
                    .playersWrapper .player_listing figure .playerDetails span{width:50%}
                }
            `}</style>

            <div className="common_section playersWrapper">
                <div className="common-heading">
                    <h1>{displayTitle}</h1>
                </div>

                <div className="player_listing">
                    {playerList.length > 0 ? (
                        playerList.map((player) => (
                            <figure key={player?.id}>
                                <a
                                    href={getProfileUrl(player)}
                                    title={player?.short_name || player?.name || ""}
                                >
                                    <div className="playerImg">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={getPlayerImg(player)}
                                            alt={player?.short_name || player?.name || ""}
                                            height="45"
                                            width="45"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://images.tv9hindi.com/images/player_images/players/default.jpg";
                                            }}
                                        />
                                    </div>
                                    <h3>{player?.short_name || player?.name}</h3>
                                    <p>{player?.skill_name || ""}</p>
                                    <div className="playerDetails">
                                        {player?.is_captain && (
                                            <span>Captain</span>
                                        )}
                                        {player?.is_keeper && (
                                            <span>Wicket-Keeper</span>
                                        )}
                                    </div>
                                </a>
                            </figure>
                        ))
                    ) : (
                        <div className="no-data">
                            <span>No Players Available</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
