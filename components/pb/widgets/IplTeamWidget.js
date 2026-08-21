import Image from "next/image";

export default function IplTeamWidget() {
  return (
    <>
      <style>{`
        .CteamsWrapper .Cteam_listing{display:flex;flex-wrap:wrap}
        .CteamsWrapper .Cteam_listing figure{width:100%;background:#fff;border:1px solid #E5EFFC;box-shadow:0 0 6px rgba(229,239,252,0.35);border-radius:12px;padding:24px 10px;margin-bottom:15px;position:relative;overflow:hidden;z-index:0}
        .CteamsWrapper .Cteam_listing figure:before{content:'';background:#E5EFFC;height:100px;width:100px;border-radius:50%;position:absolute;left:-50px;bottom:0px;z-index:-1}
        .CteamsWrapper .Cteam_listing figure a{display:flex;align-items:center;justify-content:flex-start}
        .CteamsWrapper .Cteam_listing figure .imgWrap{margin-right:6px;border:1px solid #EFEFF0;border-radius:50%;width:50px}
        .CteamsWrapper .Cteam_listing figure .imgWrap img{display:block}
        .CteamsWrapper .Cteam_listing figure h3{font-weight:600;font-size:16px;line-height:17px;color:#1A385D;width:calc(100% - 56px)}
        @media(min-width:1000px){
          .CteamsWrapper .Cteam_listing figure{width:32%;margin-bottom:20px;margin-right:2%}
          .CteamsWrapper .Cteam_listing figure:nth-child(3n+3){margin-right:0}
        }
      `}</style>
      <section>
                <div className="CteamsWrapper">
                    <div className="Cteam_listing">
                                          <figure>
                        <a href="/sports/cricket-news/series/ipl/teams/royal-challengers-bengaluru-team-profile-1105" title="Matches">
                          <div className="imgWrap">
                            <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="50" width="50" />
                          </div>
                          <h3>रॉयल चैलेंजर्स बेंगलुरु</h3>
                        </a>
                      </figure>
                                          <figure>
                        <a href="/sports/cricket-news/series/ipl/teams/gujarat-titans-team-profile-2955" title="Matches">
                          <div className="imgWrap">
                            <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="50" width="50" />
                          </div>
                          <h3>गुजरात टाइटन्स</h3>
                        </a>
                      </figure>
                                          <figure>
                        <a href="/sports/cricket-news/series/ipl/teams/sunrisers-hyderabad-team-profile-1379" title="Matches">
                          <div className="imgWrap">
                            <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="50" width="50" />
                          </div>
                          <h3>सनराइज़र्स हैदराबाद</h3>
                        </a>
                      </figure>
                                          <figure>
                        <a href="/sports/cricket-news/series/ipl/teams/rajasthan-royals-team-profile-1110" title="Matches">
                          <div className="imgWrap">
                            <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="50" width="50" />
                          </div>
                          <h3>राजस्थान रॉयल्स</h3>
                        </a>
                      </figure>
                                          <figure>
                        <a href="/sports/cricket-news/series/ipl/teams/punjab-kings-team-profile-1107" title="Matches">
                          <div className="imgWrap">
                            <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="50" width="50" />
                          </div>
                          <h3>पंजाब किंग्स</h3>
                        </a>
                      </figure>
                                          <figure>
                        <a href="/sports/cricket-news/series/ipl/teams/delhi-capitals-team-profile-1109" title="Matches">
                          <div className="imgWrap">
                            <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="50" width="50" />
                          </div>
                          <h3>दिल्ली कैपिटल्स</h3>
                        </a>
                      </figure>
                                          <figure>
                        <a href="/sports/cricket-news/series/ipl/teams/kolkata-knight-riders-team-profile-1106" title="Matches">
                          <div className="imgWrap">
                            <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="50" width="50" />
                          </div>
                          <h3>कोलकाता नाइट राइडर्स</h3>
                        </a>
                      </figure>
                                          <figure>
                        <a href="/sports/cricket-news/series/ipl/teams/chennai-super-kings-team-profile-1108" title="Matches">
                          <div className="imgWrap">
                            <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="50" width="50" />
                          </div>
                          <h3>चेन्नई सुपर किंग्स</h3>
                        </a>
                      </figure>
                                          <figure>
                        <a href="/sports/cricket-news/series/ipl/teams/mumbai-indians-team-profile-1111" title="Matches">
                          <div className="imgWrap">
                            <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="50" width="50" />
                          </div>
                          <h3>मुंबई इंडियंस</h3>
                        </a>
                      </figure>
                                          <figure>
                        <a href="/sports/cricket-news/series/ipl/teams/lucknow-super-giants-team-profile-2954" title="Matches">
                          <div className="imgWrap">
                            <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="50" width="50" />
                          </div>
                          <h3>लखनऊ सुपर जायंट्स</h3>
                        </a>
                      </figure>
                                        </div>
                </div>
            </section>
    </>
  );
}