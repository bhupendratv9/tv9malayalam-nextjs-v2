import Image from "next/image";

export default function CricketScorecardWidget() {
  return (
    <>
      <div className="common_section teamsWrapper">
                <div className="sports_heading">
					                    <h1 className="h1">Pakistan Vs Australia Match Full Scorecard, Australia in Pakistan, 3 ODI Series, 2026</h1>
                </div>
				<style>{`
					.sports_heading{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:10px}
					.sports_heading .h1{font-size:1.5rem;line-height:30px;font-weight:700;text-transform:capitalize;color:#471a81}
					.sports_heading a.view_more{font-weight:700;font-size:.875rem;line-height:20px;color:#000;text-transform:capitalize}
.sports_heading a.view_more svg{width:13px;height:8px;margin-left:3px}
				`}</style>
								
							<style>{`
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
.table_detail .fcolspan .pclassName{text-align: left; font-size: 13px;  width: 100%; color: #666;}
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
.commentary_wrap .bollbyboll .overdata .run.\\34{color: #039B00;border: 1px solid #039B00;}    
.commentary_wrap .bollbyboll .overdata .run.\\36{ color: #5600C6;border: 1px solid #5600C6;}    
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
	.table_detail .fcolspan .pclassName{font-size: 14px; width: inherit;}
	
		
}

`}</style>
 <style>{`
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
				<div className="cricket-full-score-widget" id="cricket-full-score-widget">
				<section className="fullScore_card_new"><figure><div className="resultwrap"><span className="tresult">Result</span>
					 <span className="sharesbtn" id="share">Share<svg><use href="#share-icon"></use></svg></span>				
					 </div> 
        <div className="datetime">
          <p>पहला वनडे, रावलपिंडी क्रिकेट स्टेडियम, रावलपिंडी, 30 May, 2026</p>          
        </div>
       
        <div className="matchinfo">
            <div className="right-info">
                <div className="team notplay">
                    <div className="team-name">
                        <div className="team_logo">
                            <img width="30" height="30" alt="ऑस्ट्रेलिया" src="https://images.tv9hindi.com/images/large_flags/australia.png" />                       </div>
                        <p className="teamwebname">ऑस्ट्रेलिया</p><p className="teammobilename">ऑस्ट्रेलिया</p>
                    </div>
                    <div className="teamScore"><h3 id="scorecard-270975-1-0">200/10</h3> <h6>(44.1) ov</h6></div>
                </div>
                <div className="team ">
                    <div className="team-name">
                        <div className="team_logo">
                            <img width="30" height="30" alt="पाकिस्तान" src="https://images.tv9hindi.com/images/large_flags/pakistan.png" />
                        </div>
                        <p className="teamwebname">पाकिस्तान</p><p className="teammobilename">पाकिस्तान</p>
                    </div>
                    <div className="teamScore"><h3 id="scorecard-270975-6-0">202/5</h3> <h6>(42.3) ov</h6></div>
                </div>
                <div className="matchResult"><p>पाकिस्तान ने ऑस्ट्रेलिया को  5 विकेट से हराया</p></div>
            </div><div className="left-info">
               <div className="playerinfo">
                 <div className="ptext">
                    <h4 className="player_award">प्लेयर ऑफ़ द मैच</h4>
                    <h5 className="player_name">अराफात मिन्हास,</h5>
                    <h6 className="player_run">पाकिस्तान</h6>
                  </div>
                  <div className="pimg">
                    <img width="70" height="70" alt="पाकिस्तान" src="https://images.tv9hindi.com/images/large_flags/pakistan.png" />
                  </div>

               </div>
            </div></div>
      </figure>
    </section>
<section>
<div className="Scoreboard_Tab tab">
        <div className="tab_list head_list">
		  <div className="tab_item is--active">स्कोरकार्ड</div><div className="tab_item">मैच का सार</div><div className="tab_item">कॉमेंट्री</div>
          <div className="tab_item">न्यूज़</div>
        </div>
		
<div className="tab_content sub_list"> 
            <div className="tab_content-item tab is--active">
            <div className="tab_list"><div className="tab_item is--active">पाकिस्तान</div><div className="tab_item">ऑस्ट्रेलिया</div></div>
			
            <div className="tab_content"><div className="tab_content-item is--active">
                <div id="inningtab2">
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
                                        <tbody><tr className="out"><td><div className="fcolspan">एस फरहान <p className="pclassName">c एम शॉर्ट b टी सांघा</p></div></td>
                                                        <td>28</td>
                                                        <td>33</td>
                                                        <td>3</td>
                                                        <td>0</td>
                                                        <td>84.84</td>
                                                        </tr><tr className="out"><td><div className="fcolspan">एम सदाक़त <p className="pclassName">c एम शॉर्ट b एम कुहेनमैन</p></div></td>
                                                        <td>8</td>
                                                        <td>14</td>
                                                        <td>1</td>
                                                        <td>0</td>
                                                        <td>57.14</td>
                                                        </tr><tr className="out"><td><div className="fcolspan">बी आजम <p className="pclassName">b एन एलिस</p></div></td>
                                                        <td>69</td>
                                                        <td>94</td>
                                                        <td>4</td>
                                                        <td>1</td>
                                                        <td>73.40</td>
                                                        </tr><tr className="out"><td><div className="fcolspan">जी घोरी <p className="pclassName">lbw b एन एलिस</p></div></td>
                                                        <td>65</td>
                                                        <td>92</td>
                                                        <td>8</td>
                                                        <td>0</td>
                                                        <td>70.65</td>
                                                        </tr><tr className=""><td><div className="fcolspan"><strong>ए मिन्हास </strong><p className="pclassName"><strong> नाबाद</strong></p></div></td><td><strong>18</strong></td>
                                                        <td><strong>17</strong></td>
                                                        <td><strong>2</strong></td>
                                                        <td><strong>1</strong></td>
                                                        <td><strong>105.88</strong></td>
                                                        </tr><tr className="out"><td><div className="fcolspan">ए सलमान <p className="pclassName">lbw b एम लबुशेन</p></div></td>
                                                        <td>6</td>
                                                        <td>4</td>
                                                        <td>1</td>
                                                        <td>0</td>
                                                        <td>150</td>
                                                        </tr><tr className=""><td><div className="fcolspan"><strong>ए समद </strong><p className="pclassName"><strong> नाबाद</strong></p></div></td><td><strong>1</strong></td>
                                                        <td><strong>1</strong></td>
                                                        <td><strong>0</strong></td>
                                                        <td><strong>0</strong></td>
                                                        <td><strong>100</strong></td>
                                                        </tr><tr>
                            <td>
                              <div className="fcolspan">Extras <p className="pclassName">(b 0,lb 1,w 6,nb 0,Penalty 0)</p>
                              </div>
                            </td>
                            <td>7</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr> 
						  <tr className="tableheading">
                            <td>
                              <div className="fcolspan">
                                <strong>कुल</strong>
                                <strong>42.3 (RR: 4.75)</strong>
                              </div>
                            </td>
                            <td>
                              <strong>202/5</strong>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                                        </tbody>
                                    </table>
                    </div>
                    <div className="batting_bstatus">
                    <div className="batting-blabel">
                        <h4>कुल बल्लेबाज़ी नहीं की:  <span>शादाब</span>, <span>एस अफरीदी</span>, <span>एच रऊफ</span>, <span>ए अहमद</span>
                        </h4>
                      </div><div className="batting-blabel">
                                    <h4>विकेट पतन: </h4><label>1 - 25</label>
                                        <span>(एम सदाक़त, 5.2 ov)</span><label>2 - 49</label>
                                        <span>(एस फरहान, 12.2 ov)</span><label>3 - 176</label>
                                        <span>(बी आजम, 38.2 ov)</span><label>4 - 185</label>
                                        <span>(जी घोरी, 40.3 ov)</span><label>5 - 195</label>
                                        <span>(ए सलमान, 42.1 ov)</span></div>
                    </div>
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
                                    <tbody><tr>
                                            <td><div className="fcolspan">एन एलिस</div></td>
                                            <td>7</td>
                                            <td>0</td>
                                            <td>45</td>
                                            <td>2</td>
                                            <td>6.42</td>
                                        </tr><tr>
                                            <td><div className="fcolspan">बिली स्टेनलेक</div></td>
                                            <td>6</td>
                                            <td>0</td>
                                            <td>37</td>
                                            <td>0</td>
                                            <td>6.16</td>
                                        </tr><tr>
                                            <td><div className="fcolspan">एम कुहेनमैन</div></td>
                                            <td>10</td>
                                            <td>1</td>
                                            <td>29</td>
                                            <td>1</td>
                                            <td>2.90</td>
                                        </tr><tr>
                                            <td><div className="fcolspan">टी सांघा</div></td>
                                            <td>10</td>
                                            <td>3</td>
                                            <td>31</td>
                                            <td>1</td>
                                            <td>3.10</td>
                                        </tr><tr>
                                            <td><div className="fcolspan">एम शॉर्ट</div></td>
                                            <td>3</td>
                                            <td>0</td>
                                            <td>11</td>
                                            <td>0</td>
                                            <td>3.66</td>
                                        </tr><tr>
                                            <td><div className="fcolspan">एम रेनशॉ</div></td>
                                            <td>5</td>
                                            <td>0</td>
                                            <td>33</td>
                                            <td>0</td>
                                            <td>6.60</td>
                                        </tr><tr>
                                            <td><div className="fcolspan">एम लबुशेन</div></td>
                                            <td>1.3</td>
                                            <td>0</td>
                                            <td>15</td>
                                            <td>1</td>
                                            <td>10.00</td>
                                        </tr>
                                    </tbody>
                                </table>
					</div>
					
                  </div>                  
                </div>
              </div><div className="tab_content-item">
                <div id="inningtab">
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
                                        <tbody><tr className="out"><td><div className="fcolspan">ए कैरी <p className="pclassName">c ए सलमान b ए अहमद</p></div></td>
                                                        <td>19</td>
                                                        <td>24</td>
                                                        <td>4</td>
                                                        <td>0</td>
                                                        <td>79.16</td>
                                                        </tr><tr className="out"><td><div className="fcolspan">एम शॉर्ट <p className="pclassName">st जी घोरी b ए मिन्हास</p></div></td>
                                                        <td>55</td>
                                                        <td>76</td>
                                                        <td>6</td>
                                                        <td>0</td>
                                                        <td>72.36</td>
                                                        </tr><tr className="out"><td><div className="fcolspan">जे इंगलिस <p className="pclassName">lbw b ए मिन्हास</p></div></td>
                                                        <td>13</td>
                                                        <td>22</td>
                                                        <td>1</td>
                                                        <td>0</td>
                                                        <td>59.09</td>
                                                        </tr><tr className="out"><td><div className="fcolspan">एम लबुशेन <p className="pclassName">lbw b ए मिन्हास</p></div></td>
                                                        <td>0</td>
                                                        <td>2</td>
                                                        <td>0</td>
                                                        <td>0</td>
                                                        <td>0</td>
                                                        </tr><tr className="out"><td><div className="fcolspan">सी ग्रीन <p className="pclassName">b ए मिन्हास</p></div></td>
                                                        <td>0</td>
                                                        <td>3</td>
                                                        <td>0</td>
                                                        <td>0</td>
                                                        <td>0</td>
                                                        </tr><tr className="out"><td><div className="fcolspan">एम रेनशॉ <p className="pclassName">b ए अहमद</p></div></td>
                                                        <td>61</td>
                                                        <td>63</td>
                                                        <td>5</td>
                                                        <td>1</td>
                                                        <td>96.82</td>
                                                        </tr><tr className="out"><td><div className="fcolspan">ओ पीक <p className="pclassName">c जी घोरी b ए सलमान</p></div></td>
                                                        <td>7</td>
                                                        <td>16</td>
                                                        <td>1</td>
                                                        <td>0</td>
                                                        <td>43.75</td>
                                                        </tr><tr className="out"><td><div className="fcolspan">एम कुहेनमैन <p className="pclassName">c बी आजम b एच रऊफ</p></div></td>
                                                        <td>24</td>
                                                        <td>40</td>
                                                        <td>2</td>
                                                        <td>0</td>
                                                        <td>60</td>
                                                        </tr><tr className="out"><td><div className="fcolspan">एन एलिस <p className="pclassName">b ए मिन्हास</p></div></td>
                                                        <td>8</td>
                                                        <td>14</td>
                                                        <td>0</td>
                                                        <td>0</td>
                                                        <td>57.14</td>
                                                        </tr><tr className="out"><td><div className="fcolspan">टी सांघा <p className="pclassName">b एस अफरीदी</p></div></td>
                                                        <td>0</td>
                                                        <td>4</td>
                                                        <td>0</td>
                                                        <td>0</td>
                                                        <td>0</td>
                                                        </tr><tr className=""><td><div className="fcolspan"><strong>बिली स्टेनलेक </strong><p className="pclassName"><strong> नाबाद</strong></p></div></td><td><strong>0</strong></td>
                                                        <td><strong>1</strong></td>
                                                        <td><strong>0</strong></td>
                                                        <td><strong>0</strong></td>
                                                        <td><strong>0</strong></td>
                                                        </tr><tr>
                            <td>
                              <div className="fcolspan">Extras <p className="pclassName">(b 0,lb 6,w 7,nb 0,Penalty 0)</p>
                              </div>
                            </td>
                            <td>13</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr> 
						  <tr className="tableheading">
                            <td>
                              <div className="fcolspan">
                                <strong>कुल</strong>
                                <strong>44.1 (RR: 4.53)</strong>
                              </div>
                            </td>
                            <td>
                              <strong>200/10</strong>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                                        </tbody>
                                    </table>
                    </div>
                    <div className="batting_bstatus">
                    <div className="batting-blabel">
                        <h4>कुल बल्लेबाज़ी नहीं की:  
                        </h4>
                      </div><div className="batting-blabel">
                                    <h4>विकेट पतन: </h4><label>1 - 34</label>
                                        <span>(ए कैरी, 7 ov)</span><label>2 - 62</label>
                                        <span>(जे इंगलिस, 13.3 ov)</span><label>3 - 62</label>
                                        <span>(एम लबुशेन, 13.5 ov)</span><label>4 - 68</label>
                                        <span>(सी ग्रीन, 15.2 ov)</span><label>5 - 123</label>
                                        <span>(एम शॉर्ट, 26.1 ov)</span><label>6 - 145</label>
                                        <span>(ओ पीक, 30.5 ov)</span><label>7 - 179</label>
                                        <span>(एम रेनशॉ, 38.1 ov)</span><label>8 - 199</label>
                                        <span>(एन एलिस, 42.5 ov)</span><label>9 - 200</label>
                                        <span>(टी सांघा, 43.5 ov)</span><label>10 - 200</label>
                                        <span>(एम कुहेनमैन, 44.1 ov)</span></div>
                    </div>
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
                                    <tbody><tr>
                                            <td><div className="fcolspan">एस अफरीदी</div></td>
                                            <td>6</td>
                                            <td>0</td>
                                            <td>19</td>
                                            <td>1</td>
                                            <td>3.16</td>
                                        </tr><tr>
                                            <td><div className="fcolspan">एच रऊफ</div></td>
                                            <td>5.1</td>
                                            <td>0</td>
                                            <td>24</td>
                                            <td>1</td>
                                            <td>4.64</td>
                                        </tr><tr>
                                            <td><div className="fcolspan">ए अहमद</div></td>
                                            <td>10</td>
                                            <td>0</td>
                                            <td>44</td>
                                            <td>2</td>
                                            <td>4.40</td>
                                        </tr><tr>
                                            <td><div className="fcolspan">ए मिन्हास</div></td>
                                            <td>10</td>
                                            <td>1</td>
                                            <td>32</td>
                                            <td>5</td>
                                            <td>3.20</td>
                                        </tr><tr>
                                            <td><div className="fcolspan">शादाब</div></td>
                                            <td>8</td>
                                            <td>0</td>
                                            <td>54</td>
                                            <td>0</td>
                                            <td>6.75</td>
                                        </tr><tr>
                                            <td><div className="fcolspan">ए सलमान</div></td>
                                            <td>5</td>
                                            <td>0</td>
                                            <td>21</td>
                                            <td>1</td>
                                            <td>4.20</td>
                                        </tr>
                                    </tbody>
                                </table>
					</div>
					
                  </div>                  
                </div>
              </div>
            </div>			
            </div> 
            <div className="tab_content-item tab summary_tab">
             <span style={{display:"none"}}><div className="tab_list"><div className="tab_item is--active">पाकिस्तान</div><div className="tab_item">ऑस्ट्रेलिया</div></div></span>
			
            <div className="tab_content summary_tab_content"><div className="tab_content-item is--active">
                <div id="inningtab1" className="matchsummarywrap"><div className="score-Short-wrap">                                
                            <div className="scorecontain"><div className="teamscore">
                                <p>पाकिस्तान<span> • 202/5 (42.3 overs)</span></p>
                                </div>
                                <div className="playerscore">
                                    <div className="playerscore_list">
                                    <p>
                                        <span>बी आजम</span>
                                        <span>69&nbsp;(94)</span>
                                    </p>
                                    <p>
                                        <span>जी घोरी</span>
                                        <span>65&nbsp;(92)</span>
                                    </p>
                                    </div>
                                    <div className="playerscore_list">
                                    <p>
                                        <span>एन एलिस</span>
                                        <span>2/45 (7)</span>
                                    </p>
                                    <p>
                                       <span>एम कुहेनमैन</span>
                                        <span>1/29 (10)</span>
                                    </p>
                                    </div>
                                </div><div className="teamscore">
                                <p>ऑस्ट्रेलिया<span> • 200/10 (44.1 overs)</span></p>
                                </div>
                                <div className="playerscore">
                                    <div className="playerscore_list">
                                    <p>
                                        <span>एम रेनशॉ</span>
                                        <span>61&nbsp;(63)</span>
                                    </p>
                                    <p>
                                        <span>एम शॉर्ट</span>
                                        <span>55&nbsp;(76)</span>
                                    </p>
                                    </div>
                                    <div className="playerscore_list">
                                    <p>
                                        <span>ए मिन्हास</span>
                                        <span>5/32 (10)</span>
                                    </p>
                                    <p>
                                       <span>ए अहमद</span>
                                        <span>2/44 (10)</span>
                                    </p>
                                    </div>
                                </div></div>
                        </div>
                        <style>{`
                            .score-Short-wrap .h2{ font-size: 15px; font-weight: 700; line-height: 30px;}
                            .score-Short-wrap .scorecontain{ border: 1px solid #E6E6E6; border-radius: 15px; margin-bottom: 15px; overflow: hidden; font-size: 13px;}
                            .score-Short-wrap .playerscore{ display: flex;}
                            .score-Short-wrap .playerscore .playerscore_list{ flex: 0 0 50%; border-right: 1px solid #E6E6E6;}
                            .score-Short-wrap .playerscore .playerscore_list:last-child{ border-right:none;}                           
							.score-Short-wrap .playerscore p {padding: 5px 10%;display: flex;justify-content: space-between;border-bottom: 1px solid #E6E6E6;}
                            .score-Short-wrap .playerscore p:last-child{border-bottom:none;}
                            .score-Short-wrap .teamscore p{background: #f3f3f3; font-size: 14px; line-height: 40px; padding: 0px 20px; font-weight: 700;}
							.Scoreboard_Tab .tab_content-item .score-Short-wrap {    margin-top: 15px; }
                        `}</style><div className="commentary_main">
                    <div className="commentary_wrap">
                      <div className="commentary-heading">
                        <h2>कॉमेंट्री</h2>
                      </div>
					  <div className="ball-summary"></div><div className="ball-wrapper"><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>42.3</span><span className="run 6">6</span>
									</div>
									<p className="overtext">छक्का!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>42.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>42.1</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! एल बी डब्ल्यू बोल्ड मार्नस लबुशेन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>4 Runs </span></p>
												<p>Score after 42 overs : <span>195/4
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>ए मिन्हास</span><span>12&nbsp;(16)</span></p>
                          <p><span>ए सलमान</span><span>6&nbsp;(3)</span></p>
                        </div>
                        <div>												
												  <p><span>एम रेनशॉ</span><span>5-0-33-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.6</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>11 Runs </span></p>
												<p>Score after 41 overs : <span>191/4
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>ए सलमान</span><span>6&nbsp;(3)</span></p>
                          <p><span>ए मिन्हास</span><span>8&nbsp;(10)</span></p>
                        </div>
                        <div>												
												  <p><span>एन एलिस</span><span>7-0-45-2</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.5</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.4</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.3</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! एल बी डब्ल्यू बोल्ड नाथन एलिस|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.1</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>3 Runs </span></p>
												<p>Score after 40 overs : <span>180/3
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>ए मिन्हास</span><span>3&nbsp;(8)</span></p>
                          <p><span>जी घोरी</span><span>65&nbsp;(91)</span></p>
                        </div>
                        <div>												
												  <p><span>एम कुहेनमैन</span><span>10-1-29-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>2 Runs </span></p>
												<p>Score after 39 overs : <span>177/3
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>ए मिन्हास</span><span>1&nbsp;(4)</span></p>
                          <p><span>जी घोरी</span><span>64&nbsp;(89)</span></p>
                        </div>
                        <div>												
												  <p><span>एन एलिस</span><span>6-0-34-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>38.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>38.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>38.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">क���ई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>38.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>38.2</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! बोल्ड नाथन एलिस|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>38.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>7 Runs </span></p>
												<p>Score after 38 overs : <span>175/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जी घोरी</span><span>63&nbsp;(88)</span></p>
                          <p><span>बी आजम</span><span>69&nbsp;(93)</span></p>
                        </div>
                        <div>												
												  <p><span>एम कुहेनमैन</span><span>9-1-26-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>37.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>37.5</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>37.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div></div>
					  <div className="commentarybtn" style={{display:"none"}}>
                        <a href="#" id="selectSecondTab">पूरी कॉमेंट्री पढ़ें</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div><div className="tab_content-item">
                <div id="inningtab" className="matchsummarywrap"><div className="commentary_main">
                    <div className="commentary_wrap">
                      <div className="commentary-heading">
                        <h2>कॉमेंट्री</h2>
                      </div>
					  <div className="ball-summary"></div><div className="ball-wrapper"><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>44.1</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! कॉट बाबर आजम बोल्ड हारिस रऊफ|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>1 Runs </span></p>
												<p>Score after 44 overs : <span>200/9
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>बिली स्टेनलेक</span><span>0&nbsp;(1)</span></p>
                          <p><span>एम कुहेनमैन</span><span>24&nbsp;(39)</span></p>
                        </div>
                        <div>												
												  <p><span>एस अफरीदी</span><span>6-0-19-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>43.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>43.5</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! बोल्ड शाहीन अफरीदी|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>43.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>43.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>43.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>43.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>0 Runs </span></p>
												<p>Score after 43 overs : <span>199/8
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>टी सांघा</span><span>0&nbsp;(1)</span></p>
                          <p><span>एम कुहेनमैन</span><span>23&nbsp;(37)</span></p>
                        </div>
                        <div>												
												  <p><span>ए मिन्हास</span><span>10-1-32-5</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>42.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>42.5</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! बोल्ड अराफात मिन्हास|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>42.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>42.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>42.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>42.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>5 Runs </span></p>
												<p>Score after 42 overs : <span>199/7
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एन एलिस</span><span>8&nbsp;(9)</span></p>
                          <p><span>एम कुहेनमैन</span><span>23&nbsp;(37)</span></p>
                        </div>
                        <div>												
												  <p><span>शादाब</span><span>8-0-54-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.2</span><span className="run 1 extra">1lb</span>
									</div>
									<p className="overtext">लेग बाई|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>1 Runs </span></p>
												<p>Score after 41 overs : <span>194/7
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम कुहेनमैन</span><span>22&nbsp;(34)</span></p>
                          <p><span>एन एलिस</span><span>5&nbsp;(6)</span></p>
                        </div>
                        <div>												
												  <p><span>ए मिन्हास</span><span>9-0-32-4</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>9 Runs </span></p>
												<p>Score after 40 overs : <span>193/7
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम कुहेनमैन</span><span>22&nbsp;(29)</span></p>
                          <p><span>एन एलिस</span><span>4&nbsp;(5)</span></p>
                        </div>
                        <div>												
												  <p><span>शादाब</span><span>7-0-50-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.6</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.5</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.2</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div></div>
					  <div className="commentarybtn" style={{display:"none"}}>
                        <a href="#" id="selectSecondTab">पूरी कॉमेंट्री पढ़ें</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>			
            </div> 
            <div className="tab_content-item tab commentary_tab">
            <div className="tab_list"><div className="tab_item is--active">पाकिस्तान</div><div className="tab_item">ऑस्ट्रेलिया</div></div>
			
            <div className="tab_content commentary_tab_content"><div className="tab_content-item is--active">
                <div id="inningtab3"><div className="commentary_main">
                    <div className="commentary_wrap">
                      <div className="commentary-heading">
                        <h2>कॉमेंट्री</h2>
                      </div>
					  <div className="ball-summary"></div><div className="ball-wrapper"><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>42.3</span><span className="run 6">6</span>
									</div>
									<p className="overtext">छक्का!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>42.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>42.1</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! एल बी डब्ल्यू बोल्ड मार्नस लबुशेन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>4 Runs </span></p>
												<p>Score after 42 overs : <span>195/4
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>ए मिन्हास</span><span>12&nbsp;(16)</span></p>
                          <p><span>ए सलमान</span><span>6&nbsp;(3)</span></p>
                        </div>
                        <div>												
												  <p><span>एम रेनशॉ</span><span>5-0-33-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.6</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>11 Runs </span></p>
												<p>Score after 41 overs : <span>191/4
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>ए सलमान</span><span>6&nbsp;(3)</span></p>
                          <p><span>ए मिन्हास</span><span>8&nbsp;(10)</span></p>
                        </div>
                        <div>												
												  <p><span>एन एलिस</span><span>7-0-45-2</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.5</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.4</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.3</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! एल बी डब्ल्यू बोल्ड नाथन एलिस|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.1</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>3 Runs </span></p>
												<p>Score after 40 overs : <span>180/3
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>ए मिन्हास</span><span>3&nbsp;(8)</span></p>
                          <p><span>जी घोरी</span><span>65&nbsp;(91)</span></p>
                        </div>
                        <div>												
												  <p><span>एम कुहेनमैन</span><span>10-1-29-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>2 Runs </span></p>
												<p>Score after 39 overs : <span>177/3
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>ए मिन्हास</span><span>1&nbsp;(4)</span></p>
                          <p><span>जी घोरी</span><span>64&nbsp;(89)</span></p>
                        </div>
                        <div>												
												  <p><span>एन एलिस</span><span>6-0-34-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>38.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>38.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>38.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">क���ई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>38.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>38.2</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! बोल्ड नाथन एलिस|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>38.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>7 Runs </span></p>
												<p>Score after 38 overs : <span>175/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जी घोरी</span><span>63&nbsp;(88)</span></p>
                          <p><span>बी आजम</span><span>69&nbsp;(93)</span></p>
                        </div>
                        <div>												
												  <p><span>एम कुहेनमैन</span><span>9-1-26-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>37.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>37.5</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>37.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>37.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>37.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>37.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>8 Runs </span></p>
												<p>Score after 37 overs : <span>168/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जी घोरी</span><span>57&nbsp;(83)</span></p>
                          <p><span>बी आजम</span><span>68&nbsp;(92)</span></p>
                        </div>
                        <div>												
												  <p><span>एम लबुशेन</span><span>1-0-8-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>36.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>36.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>36.4</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>36.3</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>36.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>36.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>4 Runs </span></p>
												<p>Score after 36 overs : <span>160/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जी घोरी</span><span>56&nbsp;(82)</span></p>
                          <p><span>बी आजम</span><span>61&nbsp;(87)</span></p>
                        </div>
                        <div>												
												  <p><span>टी सांघा</span><span>10-3-31-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>35.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>35.5</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>35.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>35.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>35.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>35.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>16 Runs </span></p>
												<p>Score after 35 overs : <span>156/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>बी आजम</span><span>60&nbsp;(85)</span></p>
                          <p><span>जी घोरी</span><span>53&nbsp;(78)</span></p>
                        </div>
                        <div>												
												  <p><span>एम रेनशॉ</span><span>4-0-29-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>34.6</span><span className="run 6">6</span>
									</div>
									<p className="overtext">छक्का!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>34.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>34.4</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>34.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>34.2</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>34.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>1 Runs </span></p>
												<p>Score after 34 overs : <span>140/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जी घोरी</span><span>44&nbsp;(74)</span></p>
                          <p><span>बी आजम</span><span>53&nbsp;(83)</span></p>
                        </div>
                        <div>												
												  <p><span>टी सांघा</span><span>9-3-27-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>33.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>33.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>33.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>33.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>33.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>33.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>4 Runs </span></p>
												<p>Score after 33 overs : <span>139/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>बी आजम</span><span>52&nbsp;(80)</span></p>
                          <p><span>जी घोरी</span><span>44&nbsp;(71)</span></p>
                        </div>
                        <div>												
												  <p><span>एम शॉर्ट</span><span>3-0-11-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>32.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>32.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>32.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>32.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>32.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>32.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>0 Runs </span></p>
												<p>Score after 32 overs : <span>135/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>बी आजम</span><span>50&nbsp;(77)</span></p>
                          <p><span>जी घोरी</span><span>42&nbsp;(68)</span></p>
                        </div>
                        <div>												
												  <p><span>टी सांघा</span><span>8-3-26-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>31.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>31.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>31.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>31.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>31.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>31.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>5 Runs </span></p>
												<p>Score after 31 overs : <span>135/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जी घोरी</span><span>42&nbsp;(68)</span></p>
                          <p><span>बी आजम</span><span>50&nbsp;(71)</span></p>
                        </div>
                        <div>												
												  <p><span>एम कुहेनमैन</span><span>8-1-19-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>30.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>30.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>30.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>30.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>30.2</span><span className="run 3">3</span>
									</div>
									<p className="overtext">3 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>30.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>6 Runs </span></p>
												<p>Score after 30 overs : <span>130/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जी घोरी</span><span>41&nbsp;(65)</span></p>
                          <p><span>बी आजम</span><span>46&nbsp;(68)</span></p>
                        </div>
                        <div>												
												  <p><span>बिली स्टेनलेक</span><span>6-0-37-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>29.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>29.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>29.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>29.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>29.2</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>29.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>6 Runs </span></p>
												<p>Score after 29 overs : <span>124/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>बी आजम</span><span>45&nbsp;(66)</span></p>
                          <p><span>जी घोरी</span><span>36&nbsp;(61)</span></p>
                        </div>
                        <div>												
												  <p><span>टी सांघा</span><span>7-2-26-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>28.6</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>28.5</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>28.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>28.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>28.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>28.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>6 Runs </span></p>
												<p>Score after 28 overs : <span>118/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जी घोरी</span><span>35&nbsp;(59)</span></p>
                          <p><span>बी आजम</span><span>40&nbsp;(62)</span></p>
                        </div>
                        <div>												
												  <p><span>बिली स्टेनलेक</span><span>5-0-31-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>27.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>27.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>27.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>27.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>27.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>27.1</span><span className="run 1 extra">1lb</span>
									</div>
									<p className="overtext">लेग बाई|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>27.1</span><span className="run 3 extra">3wd</span>
									</div>
									<p className="overtext">3 वाईड्स!</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>3 Runs </span></p>
												<p>Score after 27 overs : <span>112/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जी घोरी</span><span>34&nbsp;(55)</span></p>
                          <p><span>बी आजम</span><span>39&nbsp;(60)</span></p>
                        </div>
                        <div>												
												  <p><span>टी सांघा</span><span>6-2-20-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>26.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>26.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>26.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>26.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>26.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>26.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>9 Runs </span></p>
												<p>Score after 26 overs : <span>109/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जी घोरी</span><span>33&nbsp;(51)</span></p>
                          <p><span>बी आजम</span><span>37&nbsp;(58)</span></p>
                        </div>
                        <div>												
												  <p><span>बिली स्टेनलेक</span><span>4-0-26-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>25.6</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>25.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>25.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>25.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>25.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>25.1</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>0 Runs </span></p>
												<p>Score after 25 overs : <span>100/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जी घोरी</span><span>28&nbsp;(49)</span></p>
                          <p><span>बी आजम</span><span>33&nbsp;(54)</span></p>
                        </div>
                        <div>												
												  <p><span>टी सांघा</span><span>5-2-17-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>24.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>24.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>24.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>24.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>24.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>24.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>1 Runs </span></p>
												<p>Score after 24 overs : <span>100/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>बी आजम</span><span>33&nbsp;(54)</span></p>
                          <p><span>जी घोरी</span><span>28&nbsp;(43)</span></p>
                        </div>
                        <div>												
												  <p><span>एम कुहेनमैन</span><span>7-1-14-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>23.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>23.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>23.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>23.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>23.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>23.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>11 Runs </span></p>
												<p>Score after 23 overs : <span>99/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>बी आजम</span><span>33&nbsp;(53)</span></p>
                          <p><span>जी घोरी</span><span>27&nbsp;(38)</span></p>
                        </div>
                        <div>												
												  <p><span>एन एलिस</span><span>5-0-32-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>22.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>22.5</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>22.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>22.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>22.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>22.1</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>22.1</span><span className="run 2 extra">2wd</span>
									</div>
									<p className="overtext">2 वाईड्स!</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>2 Runs </span></p>
												<p>Score after 22 overs : <span>88/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>बी आजम</span><span>29&nbsp;(51)</span></p>
                          <p><span>जी घोरी</span><span>22&nbsp;(34)</span></p>
                        </div>
                        <div>												
												  <p><span>एम कुहेनमैन</span><span>6-1-13-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>21.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>21.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>21.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>21.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>21.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>21.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>3 Runs </span></p>
												<p>Score after 21 overs : <span>86/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>बी आजम</span><span>28&nbsp;(46)</span></p>
                          <p><span>जी घोरी</span><span>21&nbsp;(33)</span></p>
                        </div>
                        <div>												
												  <p><span>एन एलिस</span><span>4-0-21-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>20.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>20.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>20.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>20.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>20.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>20.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>3 Runs </span></p>
												<p>Score after 20 overs : <span>83/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जी घोरी</span><span>19&nbsp;(29)</span></p>
                          <p><span>बी आजम</span><span>27&nbsp;(44)</span></p>
                        </div>
                        <div>												
												  <p><span>एम रेनशॉ</span><span>3-0-13-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>19.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>19.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>19.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>19.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>19.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>19.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>4 Runs </span></p>
												<p>Score after 19 overs : <span>80/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जी घोरी</span><span>17&nbsp;(24)</span></p>
                          <p><span>बी आजम</span><span>26&nbsp;(43)</span></p>
                        </div>
                        <div>												
												  <p><span>एम शॉर्ट</span><span>2-0-7-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>18.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>18.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>18.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>18.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>18.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>18.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>7 Runs </span></p>
												<p>Score after 18 overs : <span>76/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>बी आजम</span><span>24&nbsp;(41)</span></p>
                          <p><span>जी घोरी</span><span>15&nbsp;(20)</span></p>
                        </div>
                        <div>												
												  <p><span>एम रेनशॉ</span><span>2-0-10-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>17.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>17.5</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>17.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>17.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>17.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>17.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>10 Runs </span></p>
												<p>Score after 17 overs : <span>69/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>बी आजम</span><span>18&nbsp;(37)</span></p>
                          <p><span>जी घोरी</span><span>14&nbsp;(18)</span></p>
                        </div>
                        <div>												
												  <p><span>टी सांघा</span><span>4-1-17-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>16.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>16.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>16.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>16.3</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>16.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>16.1</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>3 Runs </span></p>
												<p>Score after 16 overs : <span>59/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>बी आजम</span><span>17&nbsp;(36)</span></p>
                          <p><span>जी घोरी</span><span>5&nbsp;(13)</span></p>
                        </div>
                        <div>												
												  <p><span>एम रेनशॉ</span><span>1-0-3-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>15.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>15.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>15.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>15.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>15.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>15.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>4 Runs </span></p>
												<p>Score after 15 overs : <span>56/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जी घोरी</span><span>3&nbsp;(11)</span></p>
                          <p><span>बी आजम</span><span>16&nbsp;(32)</span></p>
                        </div>
                        <div>												
												  <p><span>टी सांघा</span><span>3-1-7-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>14.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>14.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>14.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>14.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>14.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>14.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>3 Runs </span></p>
												<p>Score after 14 overs : <span>52/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जी घोरी</span><span>1&nbsp;(8)</span></p>
                          <p><span>बी आजम</span><span>14&nbsp;(29)</span></p>
                        </div>
                        <div>												
												  <p><span>एम शॉर्ट</span><span>1-0-3-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>13.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>13.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>13.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>13.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>13.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>13.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>0 Runs </span></p>
												<p>Score after 13 overs : <span>49/2
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जी घोरी</span><span>0&nbsp;(4)</span></p>
                          <p><span>बी आजम</span><span>12&nbsp;(27)</span></p>
                        </div>
                        <div>												
												  <p><span>टी सांघा</span><span>2-1-3-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>12.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>12.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>12.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>12.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>12.2</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! कॉट मैथ्यू शॉर्ट बोल्ड तनवीर सांघा|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>12.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>5 Runs </span></p>
												<p>Score after 12 overs : <span>49/1
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एस फरहान</span><span>28&nbsp;(31)</span></p>
                          <p><span>बी आजम</span><span>12&nbsp;(27)</span></p>
                        </div>
                        <div>												
												  <p><span>एम कुहेनमैन</span><span>5-1-11-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>11.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>11.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>11.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>11.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>11.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>11.1</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>3 Runs </span></p>
												<p>Score after 11 overs : <span>44/1
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>बी आजम</span><span>11&nbsp;(25)</span></p>
                          <p><span>एस फरहान</span><span>24&nbsp;(27)</span></p>
                        </div>
                        <div>												
												  <p><span>टी सांघा</span><span>1-0-3-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>10.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>10.5</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>10.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>10.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>10.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>10.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>0 Runs </span></p>
												<p>Score after 10 overs : <span>41/1
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>बी आजम</span><span>9&nbsp;(20)</span></p>
                          <p><span>एस फरहान</span><span>23&nbsp;(26)</span></p>
                        </div>
                        <div>												
												  <p><span>एम कुहेनमैन</span><span>4-1-6-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>9.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>9.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>9.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>9.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>9.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>9.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>7 Runs </span></p>
												<p>Score after 9 overs : <span>41/1
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>बी आजम</span><span>9&nbsp;(14)</span></p>
                          <p><span>एस फरहान</span><span>23&nbsp;(26)</span></p>
                        </div>
                        <div>												
												  <p><span>एन एलिस</span><span>3-0-18-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>8.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>8.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>8.4</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>8.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>8.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>8.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>2 Runs </span></p>
												<p>Score after 8 overs : <span>34/1
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>बी आजम</span><span>7&nbsp;(11)</span></p>
                          <p><span>एस फरहान</span><span>18&nbsp;(23)</span></p>
                        </div>
                        <div>												
												  <p><span>एम कुहेनमैन</span><span>3-0-6-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>7.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>7.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>7.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>7.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>7.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>7.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>5 Runs </span></p>
												<p>Score after 7 overs : <span>32/1
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>बी आजम</span><span>6&nbsp;(6)</span></p>
                          <p><span>एस फरहान</span><span>17&nbsp;(22)</span></p>
                        </div>
                        <div>												
												  <p><span>बिली स्टेनलेक</span><span>3-0-17-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>6.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>6.5</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>6.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>6.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>6.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>6.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>2 Runs </span></p>
												<p>Score after 6 overs : <span>27/1
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>बी आजम</span><span>2&nbsp;(4)</span></p>
                          <p><span>एस फरहान</span><span>16&nbsp;(18)</span></p>
                        </div>
                        <div>												
												  <p><span>एम कुहेनमैन</span><span>2-0-4-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>5.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>5.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>5.4</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>5.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>5.2</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! कॉट मैथ्यू शॉर्ट बोल्ड मैथ्यू कुहेनमैन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>5.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>5 Runs </span></p>
												<p>Score after 5 overs : <span>25/0
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एस फरहान</span><span>16&nbsp;(18)</span></p>
                          <p><span>एम सदाक़त</span><span>8&nbsp;(12)</span></p>
                        </div>
                        <div>												
												  <p><span>बिली स्टेनलेक</span><span>2-0-12-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>4.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>4.5</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>4.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>4.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>4.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>4.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>2 Runs </span></p>
												<p>Score after 4 overs : <span>20/0
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एस फरहान</span><span>12&nbsp;(14)</span></p>
                          <p><span>एम सदाक़त</span><span>7&nbsp;(10)</span></p>
                        </div>
                        <div>												
												  <p><span>एम कुहेनमैन</span><span>1-0-2-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>3.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>3.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>3.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>3.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>3.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>3.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>6 Runs </span></p>
												<p>Score after 3 overs : <span>18/0
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एस फरहान</span><span>11&nbsp;(9)</span></p>
                          <p><span>एम सदाक़त</span><span>6&nbsp;(9)</span></p>
                        </div>
                        <div>												
												  <p><span>एन एलिस</span><span>2-0-11-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>2.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>2.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>2.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>2.3</span><span className="run 3">3</span>
									</div>
									<p className="overtext">3 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>2.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>2.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>7 Runs </span></p>
												<p>Score after 2 overs : <span>12/0
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एस फरहान</span><span>7&nbsp;(7)</span></p>
                          <p><span>एम सदाक़त</span><span>4&nbsp;(5)</span></p>
                        </div>
                        <div>												
												  <p><span>बिली स्टेनलेक</span><span>1-0-7-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>1.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>1.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>1.4</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>1.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>1.3</span><span className="run 1 extra">1wd</span>
									</div>
									<p className="overtext">वाइड!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>1.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>1.1</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>5 Runs </span></p>
												<p>Score after 1 overs : <span>5/0
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम सदाक़त</span><span>4&nbsp;(5)</span></p>
                          <p><span>एस फरहान</span><span>1&nbsp;(1)</span></p>
                        </div>
                        <div>												
												  <p><span>एन एलिस</span><span>1-0-5-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>0.6</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>0.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>0.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>0.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>0.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>0.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div></div>					  
                    </div>
                  </div>
                </div>
              </div><div className="tab_content-item">
                <div id="inningtab"><div className="commentary_main">
                    <div className="commentary_wrap">
                      <div className="commentary-heading">
                        <h2>कॉमेंट्री</h2>
                      </div>
					  <div className="ball-summary"></div><div className="ball-wrapper"><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>44.1</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! कॉट बाबर आजम बोल्ड हारिस रऊफ|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>1 Runs </span></p>
												<p>Score after 44 overs : <span>200/9
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>बिली स्टेनलेक</span><span>0&nbsp;(1)</span></p>
                          <p><span>एम कुहेनमैन</span><span>24&nbsp;(39)</span></p>
                        </div>
                        <div>												
												  <p><span>एस अफरीदी</span><span>6-0-19-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>43.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>43.5</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! बोल्ड शाहीन अफरीदी|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>43.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>43.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>43.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>43.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>0 Runs </span></p>
												<p>Score after 43 overs : <span>199/8
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>टी सांघा</span><span>0&nbsp;(1)</span></p>
                          <p><span>एम कुहेनमैन</span><span>23&nbsp;(37)</span></p>
                        </div>
                        <div>												
												  <p><span>ए मिन्हास</span><span>10-1-32-5</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>42.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>42.5</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! बोल्ड अराफात मिन्हास|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>42.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>42.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>42.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>42.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>5 Runs </span></p>
												<p>Score after 42 overs : <span>199/7
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एन एलिस</span><span>8&nbsp;(9)</span></p>
                          <p><span>एम कुहेनमैन</span><span>23&nbsp;(37)</span></p>
                        </div>
                        <div>												
												  <p><span>शादाब</span><span>8-0-54-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.2</span><span className="run 1 extra">1lb</span>
									</div>
									<p className="overtext">लेग बाई|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>41.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>1 Runs </span></p>
												<p>Score after 41 overs : <span>194/7
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम कुहेनमैन</span><span>22&nbsp;(34)</span></p>
                          <p><span>एन एलिस</span><span>5&nbsp;(6)</span></p>
                        </div>
                        <div>												
												  <p><span>ए मिन्हास</span><span>9-0-32-4</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>40.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>9 Runs </span></p>
												<p>Score after 40 overs : <span>193/7
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम कुहेनमैन</span><span>22&nbsp;(29)</span></p>
                          <p><span>एन एलिस</span><span>4&nbsp;(5)</span></p>
                        </div>
                        <div>												
												  <p><span>शादाब</span><span>7-0-50-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.6</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.5</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.2</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>39.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>5 Runs </span></p>
												<p>Score after 39 overs : <span>184/7
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम कुहेनमैन</span><span>16&nbsp;(27)</span></p>
                          <p><span>एन एलिस</span><span>1&nbsp;(1)</span></p>
                        </div>
                        <div>												
												  <p><span>ए अहमद</span><span>10-0-44-2</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>38.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>38.5</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>38.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>38.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>38.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>38.1</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! बोल्ड अबरार अहमद|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>6 Runs </span></p>
												<p>Score after 38 overs : <span>179/6
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम कुहेनमैन</span><span>12&nbsp;(23)</span></p>
                          <p><span>एम रेनशॉ</span><span>61&nbsp;(62)</span></p>
                        </div>
                        <div>												
												  <p><span>शादाब</span><span>6-0-41-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>37.6</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>37.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>37.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>37.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>37.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>37.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>6 Runs </span></p>
												<p>Score after 37 overs : <span>173/6
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम रेनशॉ</span><span>59&nbsp;(60)</span></p>
                          <p><span>एम कुहेनमैन</span><span>8&nbsp;(19)</span></p>
                        </div>
                        <div>												
												  <p><span>ए अहमद</span><span>9-0-39-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>36.6</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>36.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>36.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>36.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>36.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>36.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>7 Runs </span></p>
												<p>Score after 36 overs : <span>167/6
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम रेनशॉ</span><span>54&nbsp;(56)</span></p>
                          <p><span>एम कुहेनमैन</span><span>7&nbsp;(17)</span></p>
                        </div>
                        <div>												
												  <p><span>शादाब</span><span>5-0-35-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>35.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>35.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>35.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>35.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>35.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>35.1</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>7 Runs </span></p>
												<p>Score after 35 overs : <span>160/6
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम रेनशॉ</span><span>48&nbsp;(51)</span></p>
                          <p><span>एम कुहेनमैन</span><span>6&nbsp;(16)</span></p>
                        </div>
                        <div>												
												  <p><span>ए अहमद</span><span>8-0-33-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>34.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>34.5</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>34.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>34.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>34.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>34.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>3 Runs </span></p>
												<p>Score after 34 overs : <span>153/6
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम रेनशॉ</span><span>43&nbsp;(47)</span></p>
                          <p><span>एम कुहेनमैन</span><span>4&nbsp;(14)</span></p>
                        </div>
                        <div>												
												  <p><span>एच रऊफ</span><span>5-0-24-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>33.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>33.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>33.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>33.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>33.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>33.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>2 Runs </span></p>
												<p>Score after 33 overs : <span>150/6
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम कुहेनमैन</span><span>3&nbsp;(11)</span></p>
                          <p><span>एम रेनशॉ</span><span>41&nbsp;(44)</span></p>
                        </div>
                        <div>												
												  <p><span>ए सलमान</span><span>5-0-21-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>32.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>32.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>32.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>32.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>32.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>32.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>2 Runs </span></p>
												<p>Score after 32 overs : <span>148/6
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम कुहेनमैन</span><span>2&nbsp;(7)</span></p>
                          <p><span>एम रेनशॉ</span><span>40&nbsp;(42)</span></p>
                        </div>
                        <div>												
												  <p><span>एच रऊफ</span><span>4-0-21-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>31.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>31.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>31.5</span><span className="run 1 extra">1wd</span>
									</div>
									<p className="overtext">वाइड!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>31.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>31.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>31.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>31.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>6 Runs </span></p>
												<p>Score after 31 overs : <span>146/6
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम कुहेनमैन</span><span>1&nbsp;(1)</span></p>
                          <p><span>एम रेनशॉ</span><span>40&nbsp;(42)</span></p>
                        </div>
                        <div>												
												  <p><span>ए सलमान</span><span>4-0-19-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>30.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>30.5</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! कॉट गाज़ी घोरी बोल्ड आगा सलमान|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>30.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>30.3</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>30.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>30.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>4 Runs </span></p>
												<p>Score after 30 overs : <span>140/5
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>ओ पीक</span><span>3&nbsp;(12)</span></p>
                          <p><span>एम रेनशॉ</span><span>39&nbsp;(41)</span></p>
                        </div>
                        <div>												
												  <p><span>एस अफरीदी</span><span>5-0-18-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>29.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>29.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>29.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>29.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>29.3</span><span className="run 1 extra">1wd</span>
									</div>
									<p className="overtext">वाइड!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>29.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>29.1</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>8 Runs </span></p>
												<p>Score after 29 overs : <span>136/5
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>ओ पीक</span><span>3&nbsp;(10)</span></p>
                          <p><span>एम रेनशॉ</span><span>36&nbsp;(37)</span></p>
                        </div>
                        <div>												
												  <p><span>ए सलमान</span><span>3-0-13-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>28.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>28.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>28.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>28.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>28.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>28.1</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>28.1</span><span className="run 1 extra">1wd</span>
									</div>
									<p className="overtext">वाइड!</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>2 Runs </span></p>
												<p>Score after 28 overs : <span>128/5
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>ओ पीक</span><span>2&nbsp;(7)</span></p>
                          <p><span>एम रेनशॉ</span><span>30&nbsp;(34)</span></p>
                        </div>
                        <div>												
												  <p><span>एस अफरीदी</span><span>4-0-14-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>27.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>27.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>27.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>27.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>27.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>27.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>3 Runs </span></p>
												<p>Score after 27 overs : <span>126/5
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम रेनशॉ</span><span>29&nbsp;(32)</span></p>
                          <p><span>ओ पीक</span><span>1&nbsp;(3)</span></p>
                        </div>
                        <div>												
												  <p><span>ए मिन्हास</span><span>8-0-31-4</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>26.6</span><span className="run 2 extra">2lb</span>
									</div>
									<p className="overtext">2 लेग बाईज|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>26.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>26.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>26.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>26.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>26.1</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! स्टंप गाज़ी घोरी बोल्ड अराफात मिन्हास|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>7 Runs </span></p>
												<p>Score after 26 overs : <span>123/4
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम रेनशॉ</span><span>29&nbsp;(30)</span></p>
                          <p><span>एम शॉर्ट</span><span>55&nbsp;(75)</span></p>
                        </div>
                        <div>												
												  <p><span>ए अहमद</span><span>7-0-26-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>25.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>25.5</span><span className="run 6">6</span>
									</div>
									<p className="overtext">छक्का!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>25.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>25.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>25.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>25.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>4 Runs </span></p>
												<p>Score after 25 overs : <span>116/4
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम शॉर्ट</span><span>54&nbsp;(72)</span></p>
                          <p><span>एम रेनशॉ</span><span>23&nbsp;(27)</span></p>
                        </div>
                        <div>												
												  <p><span>ए मिन्हास</span><span>7-0-30-3</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>24.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>24.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>24.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>24.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>24.2</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>24.1</span><span className="run 1 extra">1lb</span>
									</div>
									<p className="overtext">लेग बाई|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>4 Runs </span></p>
												<p>Score after 24 overs : <span>112/4
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम रेनशॉ</span><span>23&nbsp;(26)</span></p>
                          <p><span>एम शॉर्ट</span><span>51&nbsp;(67)</span></p>
                        </div>
                        <div>												
												  <p><span>ए अहमद</span><span>6-0-19-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>23.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>23.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>23.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>23.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>23.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>23.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>6 Runs </span></p>
												<p>Score after 23 overs : <span>108/4
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम शॉर्ट</span><span>49&nbsp;(65)</span></p>
                          <p><span>एम रेनशॉ</span><span>21&nbsp;(22)</span></p>
                        </div>
                        <div>												
												  <p><span>शादाब</span><span>4-0-28-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>22.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>22.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>22.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>22.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>22.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>22.1</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>1 Runs </span></p>
												<p>Score after 22 overs : <span>102/4
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम शॉर्ट</span><span>48&nbsp;(63)</span></p>
                          <p><span>एम रेनशॉ</span><span>16&nbsp;(18)</span></p>
                        </div>
                        <div>												
												  <p><span>ए सलमान</span><span>2-0-5-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>21.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>21.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>21.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>21.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>21.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>21.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>4 Runs </span></p>
												<p>Score after 21 overs : <span>101/4
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम रेनशॉ</span><span>15&nbsp;(17)</span></p>
                          <p><span>एम शॉर्ट</span><span>48&nbsp;(58)</span></p>
                        </div>
                        <div>												
												  <p><span>शादाब</span><span>3-0-22-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>20.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>20.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>20.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>20.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>20.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>20.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>4 Runs </span></p>
												<p>Score after 20 overs : <span>97/4
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम रेनशॉ</span><span>13&nbsp;(15)</span></p>
                          <p><span>एम शॉर्ट</span><span>46&nbsp;(54)</span></p>
                        </div>
                        <div>												
												  <p><span>ए सलमान</span><span>1-0-4-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>19.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>19.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>19.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>19.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>19.2</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>19.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>6 Runs </span></p>
												<p>Score after 19 overs : <span>93/4
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम रेनशॉ</span><span>9&nbsp;(9)</span></p>
                          <p><span>एम शॉर्ट</span><span>46&nbsp;(54)</span></p>
                        </div>
                        <div>												
												  <p><span>शादाब</span><span>2-0-18-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>18.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>18.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>18.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>18.3</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>18.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>18.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>3 Runs </span></p>
												<p>Score after 18 overs : <span>87/4
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम शॉर्ट</span><span>42&nbsp;(51)</span></p>
                          <p><span>एम रेनशॉ</span><span>7&nbsp;(6)</span></p>
                        </div>
                        <div>												
												  <p><span>ए मिन्हास</span><span>6-0-27-3</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>17.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>17.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>17.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>17.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>17.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>17.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>17.1</span><span className="run 1 extra">1wd</span>
									</div>
									<p className="overtext">वाइड!</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>12 Runs </span></p>
												<p>Score after 17 overs : <span>84/4
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम रेनशॉ</span><span>6&nbsp;(5)</span></p>
                          <p><span>एम शॉर्ट</span><span>41&nbsp;(46)</span></p>
                        </div>
                        <div>												
												  <p><span>शादाब</span><span>1-0-12-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>16.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>16.5</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>16.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>16.3</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>16.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>16.1</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>5 Runs </span></p>
												<p>Score after 16 overs : <span>72/4
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम रेनशॉ</span><span>3&nbsp;(3)</span></p>
                          <p><span>एम शॉर्ट</span><span>32&nbsp;(42)</span></p>
                        </div>
                        <div>												
												  <p><span>ए मिन्हास</span><span>5-0-24-3</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>15.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>15.5</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>15.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>15.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>15.2</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! बोल्ड अराफात मिन्हास|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>15.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>5 Runs </span></p>
												<p>Score after 15 overs : <span>67/3
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>सी ग्रीन</span><span>0&nbsp;(2)</span></p>
                          <p><span>एम शॉर्ट</span><span>30&nbsp;(40)</span></p>
                        </div>
                        <div>												
												  <p><span>ए अहमद</span><span>5-0-15-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>14.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>14.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>14.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>14.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>14.2</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>14.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>2 Runs </span></p>
												<p>Score after 14 overs : <span>62/3
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>सी ग्रीन</span><span>0&nbsp;(1)</span></p>
                          <p><span>एम शॉर्ट</span><span>25&nbsp;(35)</span></p>
                        </div>
                        <div>												
												  <p><span>ए मिन्हास</span><span>4-0-19-2</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>13.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>13.5</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! एल बी डब्ल्यू बोल्ड अराफात मिन्हास|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>13.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>13.3</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! एल बी डब्ल्यू बोल्ड अराफात मिन्हास|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>13.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>13.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>4 Runs </span></p>
												<p>Score after 13 overs : <span>60/1
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम शॉर्ट</span><span>24&nbsp;(34)</span></p>
                          <p><span>जे इंगलिस</span><span>12&nbsp;(20)</span></p>
                        </div>
                        <div>												
												  <p><span>ए अहमद</span><span>4-0-10-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>12.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>12.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>12.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>12.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>12.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>12.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>2 Runs </span></p>
												<p>Score after 12 overs : <span>56/1
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जे इंगलिस</span><span>10&nbsp;(17)</span></p>
                          <p><span>एम शॉर्ट</span><span>22&nbsp;(31)</span></p>
                        </div>
                        <div>												
												  <p><span>ए मिन्हास</span><span>3-0-17-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>11.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>11.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>11.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>11.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>11.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>11.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>3 Runs </span></p>
												<p>Score after 11 overs : <span>54/1
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम शॉर्ट</span><span>21&nbsp;(27)</span></p>
                          <p><span>जे इंगलिस</span><span>9&nbsp;(15)</span></p>
                        </div>
                        <div>												
												  <p><span>ए अहमद</span><span>3-0-6-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>10.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>10.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>10.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>10.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>10.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>10.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>10 Runs </span></p>
												<p>Score after 10 overs : <span>51/1
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जे इंगलिस</span><span>7&nbsp;(11)</span></p>
                          <p><span>एम शॉर्ट</span><span>20&nbsp;(25)</span></p>
                        </div>
                        <div>												
												  <p><span>ए मिन्हास</span><span>2-0-15-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>9.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>9.5</span><span className="run 2">2</span>
									</div>
									<p className="overtext">2 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>9.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>9.3</span><span className="run 3">3</span>
									</div>
									<p className="overtext">3 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>9.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>9.1</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>2 Runs </span></p>
												<p>Score after 9 overs : <span>41/1
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जे इंगलिस</span><span>4&nbsp;(8)</span></p>
                          <p><span>एम शॉर्ट</span><span>13&nbsp;(22)</span></p>
                        </div>
                        <div>												
												  <p><span>ए अहमद</span><span>2-0-3-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>8.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>8.6</span><span className="run 1 extra">1wd</span>
									</div>
									<p className="overtext">वाइड!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>8.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>8.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>8.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>8.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>8.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>5 Runs </span></p>
												<p>Score after 8 overs : <span>39/1
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>जे इंगलिस</span><span>4&nbsp;(5)</span></p>
                          <p><span>एम शॉर्ट</span><span>12&nbsp;(19)</span></p>
                        </div>
                        <div>												
												  <p><span>ए मिन्हास</span><span>1-0-5-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>7.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>7.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>7.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>7.3</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>7.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>7.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>1 Runs </span></p>
												<p>Score after 7 overs : <span>34/1
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>ए कैरी</span><span>19&nbsp;(24)</span></p>
                          <p><span>एम शॉर्ट</span><span>11&nbsp;(18)</span></p>
                        </div>
                        <div>												
												  <p><span>ए अहमद</span><span>1-0-1-1</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>6.6</span><span className="run  out">W</span>
									</div>
									<p className="overtext">विकेट! कॉट आगा सलमान बोल्ड अबरार अहमद|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>6.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>6.4</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>6.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>6.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>6.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>8 Runs </span></p>
												<p>Score after 6 overs : <span>33/0
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>ए कैरी</span><span>19&nbsp;(22)</span></p>
                          <p><span>एम शॉर्ट</span><span>10&nbsp;(14)</span></p>
                        </div>
                        <div>												
												  <p><span>एच रऊफ</span><span>3-0-19-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>5.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>5.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>5.4</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>5.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>5.2</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>5.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>9 Runs </span></p>
												<p>Score after 5 overs : <span>25/0
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>ए कैरी</span><span>11&nbsp;(16)</span></p>
                          <p><span>एम शॉर्ट</span><span>10&nbsp;(14)</span></p>
                        </div>
                        <div>												
												  <p><span>एस अफरीदी</span><span>3-0-12-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>4.6</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>4.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>4.4</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>4.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>4.2</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>4.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>4 Runs </span></p>
												<p>Score after 4 overs : <span>16/0
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम शॉर्ट</span><span>10&nbsp;(14)</span></p>
                          <p><span>ए कैरी</span><span>2&nbsp;(10)</span></p>
                        </div>
                        <div>												
												  <p><span>एच रऊफ</span><span>2-0-11-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>3.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>3.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>3.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>3.3</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>3.3</span><span className="run 1 extra">1wd</span>
									</div>
									<p className="overtext">वाइड!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>3.2</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>3.1</span><span className="run 1 extra">1lb</span>
									</div>
									<p className="overtext">लेग बाई|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>3 Runs </span></p>
												<p>Score after 3 overs : <span>12/0
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>ए कैरी</span><span>1&nbsp;(8)</span></p>
                          <p><span>एम शॉर्ट</span><span>9&nbsp;(10)</span></p>
                        </div>
                        <div>												
												  <p><span>एस अफरीदी</span><span>2-0-3-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>2.6</span><span className="run 1 extra">1lb</span>
									</div>
									<p className="overtext">लेग बाई|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>2.5</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>2.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>2.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>2.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>2.1</span><span className="run 1">1</span>
									</div>
									<p className="overtext">1 रन|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>8 Runs </span></p>
												<p>Score after 2 overs : <span>9/0
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>एम शॉर्ट</span><span>8&nbsp;(6)</span></p>
                          <p><span>ए कैरी</span><span>0&nbsp;(6)</span></p>
                        </div>
                        <div>												
												  <p><span>एच रऊफ</span><span>1-0-8-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>1.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>1.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>1.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>1.3</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>1.2</span><span className="run 4">4</span>
									</div>
									<p className="overtext">चौका!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>1.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="per_overboll">
						                    <div className="total_score">
												<p>Runs Scored <span>1 Runs </span></p>
												<p>Score after 1 overs : <span>1/0
											</span></p></div>	
											<div className="perOver_score">
                        <div>											
                          <p><span>ए कैरी</span><span>0&nbsp;(6)</span></p>
                          <p><span>एम शॉर्ट</span><span>0&nbsp;(0)</span></p>
                        </div>
                        <div>												
												  <p><span>एस अफरीदी</span><span>1-0-1-0</span></p>
                        </div>
												
											</div>	
										</div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>0.6</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>0.5</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>0.4</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>0.4</span><span className="run 1 extra">1wd</span>
									</div>
									<p className="overtext">वाइड!</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>0.3</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>0.2</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div><div className="bollbyboll"><figure>
									<div className="overdata">
										<span>0.1</span><span className="run 0">0</span>
									</div>
									<p className="overtext">कोई रन नहीं|</p>
                            </figure></div></div>					  
                    </div>
                  </div>
                </div>
              </div>
            </div>			
            </div><div className="tab_content-item">
            <div className="Sports_TopNews" id="Sports_TopNews"><div className="spTopNews_Listing"><figure><a href="https://www.tv9hindi.com/sports/cricket-news/mohammad-siraj-may-be-out-from-india-vs-afghanistan-test-due-to-injury-gurnoor-brar-3808370.html"> <div className="imgThumb"><img width="219" height="124" src="https://images.tv9hindi.com/wp-content/uploads/2026/06/mohammad-siraj-may-be-out-from-india-vs-afghanistan-test.jpeg" alt="IND vs AFG: मोहम्मद सिराज होने वाले हैं टीम इंडिया से बाहर? ये है बड़ी वजह" title="IND vs AFG: मोहम्मद सिराज होने वाले हैं टीम इंडिया से बाहर? ये है बड़ी वजह" /></div><div className="card_title"><h3 className="h3">IND vs AFG: मोहम्मद सिराज होने वाले हैं टीम इंडिया से बाहर? ये है बड़ी वजह</h3><p>मोहम्मद सिराज का अफगानिस्तान के खिलाफ टेस्ट मैच खेलना मुश्किल है. ये खिलाड़ी आईपीएल 2026 के फाइनल के दौरान चोटिल हो गया था. उन्हें दाएं कंधे में दर्द की शिकायत हुई थी.</p></div></a></figure><figure><a href="https://www.tv9hindi.com/photo-gallery/sports-photos/fifa-world-cup-2026-11-july-might-set-the-scene-for-messi-vs-ronaldo-3808484.html"> <div className="imgThumb"><img width="219" height="124" src="https://images.tv9hindi.com/wp-content/uploads/2026/06/messi-ronaldo-4-300x169.jpg" alt="FIFA World Cup 2026 में कब होगी मेसी- रोनाल्डो की टक्कर? दोनों का हो सकता है आखिरी मैच" title="FIFA World Cup 2026 में कब होगी मेसी- रोनाल्डो की टक्कर? दोनों का हो सकता है आखिरी मैच" /></div><div className="card_title"><h3 className="h3">FIFA World Cup 2026 में कब होगी मेसी- रोनाल्डो की टक्कर? दोनों का हो सकता है आखिरी मैच</h3></div></a></figure><figure><a href="https://www.tv9hindi.com/sports/cricket-news/smriti-mandhana-shafali-verma-out-of-form-in-t20-series-against-england-ahead-of-womens-t20-world-cup-2026-3808382.html"> <div className="imgThumb"><img width="219" height="124" src="https://images.tv9hindi.com/wp-content/uploads/2026/06/shafali-smriti-photo-300x169.jpeg" alt="Women’s T20 World Cup 2026: स्मृति मंधाना- शेफाली वर्मा की जो है परेशानी, वही है टीम इंडिया की सबसे बड़ी मुश्किल" title="Women’s T20 World Cup 2026: स्मृति मंधाना- शेफाली वर्मा की जो है परेशानी, वही है टीम इंडिया की सबसे बड़ी मुश्किल" /></div><div className="card_title"><h3 className="h3">Women’s T20 World Cup 2026: स्मृति मंधाना- शेफाली वर्मा की जो है परेशानी, वही है टीम इंडिया की सबसे बड़ी मुश्किल</h3></div></a></figure><figure><a href="https://www.tv9hindi.com/sports/cricket-news/vidarbha-t20-league-vaibhav-sooryavanshi-ipl-team-mate-shubham-dubey-shine-with-bat-umesh-yadav-praful-hinge-3808316.html"> <div className="imgThumb"><img width="219" height="124" src="https://images.tv9hindi.com/wp-content/uploads/2026/06/shubham-dubey-300x169.jpg" alt="Vidarbha T20 League: 11 बार मैदान के बाहर मारी गेंद, वैभव सूर्यवंशी के साथी ने 33 गेंदों में हाहाकारी पारी खेलकर जिताया मैच" title="Vidarbha T20 League: 11 बार मैदान के बाहर मारी गेंद, वैभव सूर्यवंशी के साथी ने 33 गेंदों में हाहाकारी पारी खेलकर जिताया मैच" /></div><div className="card_title"><h3 className="h3">Vidarbha T20 League: 11 बार मैदान के बाहर मारी गेंद, वैभव सूर्यवंशी के साथी ने 33 गेंदों में हाहाकारी पारी खेलकर जिताया मैच</h3></div></a></figure><figure><a href="https://www.tv9hindi.com/sports/cricket-news/ind-vs-afg-team-india-practice-ahead-of-test-match-against-afghanistan-in-new-chandigarh-video-3808225.html"> <div className="imgThumb"><img width="219" height="124" src="https://images.tv9hindi.com/wp-content/uploads/2026/06/india-test-300x169.jpeg" alt="IND vs AFG: अफगानिस्तान के खिलाफ टेस्ट मैच की टीम इंडिया ऐसे कर रही तैयारी, दूसरी बार होगा ऐसा, VIDEO" title="IND vs AFG: अफगानिस्तान के खिलाफ टेस्ट मैच की टीम इंडिया ऐसे कर रही तैयारी, दूसरी बार होगा ऐसा, VIDEO" /></div><div className="card_title"><h3 className="h3">IND vs AFG: अफगानिस्तान के खिलाफ टेस्ट मैच की टीम इंडिया ऐसे कर रही तैयारी, दूसरी बार होगा ऐसा, VIDEO</h3></div></a></figure><figure><a href="https://www.tv9hindi.com/state/uttar-pradesh/virat-kohli-vrindavan-visit-shri-vrindavan-mahimamritam-book-premanand-maharaj-3807904.html"> <div className="imgThumb"><img width="219" height="124" src="https://images.tv9hindi.com/wp-content/uploads/2026/06/mathura-news-300x169.jpg" alt="Virat Kohli Vrindavan Visit: 500 साल पुराना ग्रंथ, वृंदावन की महिमा… विराट कोहली के हाथ में ये कौन सी किताब?" title="Virat Kohli Vrindavan Visit: 500 साल पुराना ग्रंथ, वृंदावन की महिमा… विराट कोहली के हाथ में ये कौन सी किताब?" /></div><div className="card_title"><h3 className="h3">Virat Kohli Vrindavan Visit: 500 साल पुराना ग्रंथ, वृंदावन की महिमा… विराट कोहली के हाथ में ये कौन सी किताब?</h3></div></a></figure><figure><a href="https://www.tv9hindi.com/photo-gallery/cricket-photos/harmanpreet-kaur-most-international-matches-played-in-women-cricket-ahead-of-t20-world-cup-2026-3808183.html"> <div className="imgThumb"><img width="219" height="124" src="https://images.tv9hindi.com/wp-content/uploads/2026/06/harmanpreet-kaur-2-1-300x169.jpg" alt="Women’s T20 World Cup 2026: इस वर्ल्ड रिकॉर्ड के साथ उतरेंगी हरमनप्रीत कौर, ऐसा करने वाली बनेंगी पहली खिलाड़ी" title="Women’s T20 World Cup 2026: इस वर्ल्ड रिकॉर्ड के साथ उतरेंगी हरमनप्रीत कौर, ऐसा करने वाली बनेंगी पहली खिलाड़ी" /></div><div className="card_title"><h3 className="h3">Women’s T20 World Cup 2026: इस वर्ल्ड रिकॉर्ड के साथ उतरेंगी हरमनप्रीत कौर, ऐसा करने वाली बनेंगी पहली खिलाड़ी</h3></div></a></figure><figure><a href="https://www.tv9hindi.com/sports/cricket-news/eng-w-vs-ind-w-england-won-in-3rd-womens-t20i-with-highest-successful-run-chase-on-her-soil-india-won-t20-series-3808028.html"> <div className="imgThumb"><img width="219" height="124" src="https://images.tv9hindi.com/wp-content/uploads/2026/06/india-won-series-300x169.jpg" alt="ENG W vs IND W, 3rd T20I: इंग्लैंड में सबसे सफल रन चेज का बना रिकॉर्ड, 2-1 से हुआ सीरीज का फैसला" title="ENG W vs IND W, 3rd T20I: इंग्लैंड में सबसे सफल रन चेज का बना रिकॉर्ड, 2-1 से हुआ सीरीज का फैसला" /></div><div className="card_title"><h3 className="h3">ENG W vs IND W, 3rd T20I: इंग्लैंड में सबसे सफल रन चेज का बना रिकॉर्ड, 2-1 से हुआ सीरीज का फैसला</h3></div></a></figure><figure><a href="https://www.tv9hindi.com/sports/cricket-news/india-tour-of-new-zealand-2026-schedule-announced-from-22-october-to-1st-december-12-match-played-in-40-days-3808116.html"> <div className="imgThumb"><img width="219" height="124" src="https://images.tv9hindi.com/wp-content/uploads/2026/06/india-tour-of-nz-2026-300x169.jpg" alt="40 दिन में 12 मैच… न्यूजीलैंड ने टीम इंडिया के खिलाफ शेड्यूल का किया ऐलान, 7 साल में पहली बार होगा ऐसा" title="40 दिन में 12 मैच… न्यूजीलैंड ने टीम इंडिया के खिलाफ शेड्यूल का किया ऐलान, 7 साल में पहली बार होगा ऐसा" /></div><div className="card_title"><h3 className="h3">40 दिन में 12 मैच… न्यूजीलैंड ने टीम इंडिया के खिलाफ शेड्यूल का किया ऐलान, 7 साल में पहली बार होगा ऐसा</h3></div></a></figure></div></div></div></div>
<style>{`.fullScore_card_new .team_logo img{display:block;}.fullScore_card_new .team {margin-bottom:10px;}`}</style>
</div>
</section>                </div>

                <style>{`
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

        
            </div>
    </>
  );
}