import Image from "next/image";

export default function IplResultWidget() {
  return (
    <>
       <div className="common_section">
                <div className="sports_heading"> 
                    <h1 className="h1"><span>IPL </span>2026 Results</h1>
				
                    	                    <div className="C_search">
			                <div className="C_searchwrap">
			                  <select name="sports">
			                    <option value="all">Select Team</option>
			                    								            			<option value="RCB">Royal Challengers Bengaluru</option>
								            										            			<option value="GT">Gujarat Titans</option>
								            										            			<option value="SRH">Sunrisers Hyderabad</option>
								            										            			<option value="RR">Rajasthan Royals</option>
								            										            			<option value="PBKS">Punjab Kings</option>
								            										            			<option value="DC">Delhi Capitals</option>
								            										            			<option value="KKR">Kolkata Knight Riders</option>
								            										            			<option value="CSK">Chennai Super Kings</option>
								            										            			<option value="MI">Mumbai Indians</option>
								            										            			<option value="LSG">Lucknow Super Giants</option>
								            					                    
			                  </select>
			                </div>
			            </div>	
					
                </div>


                <style>{`
.Cri_result_series{display:flex;flex-wrap: wrap;    justify-content: space-between;}
.Cri_result_series figure{background: #FFFFFF;border: 1px solid #DDDDDD;border-radius: 8px;position: relative;width: 100%;margin-bottom: 15px; display: flex;overflow: hidden;}
.Cri_result_series figure a{ display:flex; width: 100%;flex-wrap: wrap;}
.Cri_result_series .mresultwarp{background: #F1F8FF;border-right: 1px solid #EAEDF0; flex: 0 0 100%; padding: 5px; text-align: center; color: #000; display: flex; align-items: center; justify-content: center;    font-size: 12px;
    line-height: 17px;}
.Cri_result_series .mresultwarp p{ color: #00214A;font-weight: 700;}
.Cri_result_series .mresultwarp p:not(:first-child)::before{ content: ""; width: 7px; height: 7px; border-radius: 50%; background: #C1C1C1; display: inline-flex; margin: 0px 7px;}
.Cri_result_series .Cri_result_match{ width: 100%; flex: 1}
.Cri_result_series .matchinfo { min-height: 60px; align-items: center; display: flex; justify-content: space-between; padding:10px;  border-bottom: 1px solid #EAEDF0;}
.Cri_result_series .matchinfo .team {display: flex; width: 40%; flex: 1; justify-content: space-between; align-items: center;}
.Cri_result_series .matchinfo .team .team_logo{align-items: center; display: flex; width: 40px;}
.Cri_result_series .matchinfo .team .team_logo img{width:40px; height:40px; border-radius: 50%;}
.Cri_result_series .matchinfo .team .teamScore{width: calc(100% - 45px); padding: 0 5px;}
.Cri_result_series .matchinfo .team .teamScore:nth-child(odd){text-align: right;}
.Cri_result_series .matchinfo .team .teamScore p{font-weight: 500;font-size: 11px;line-height: 18px;text-transform: uppercase;color: #000000;}
.Cri_result_series .matchinfo .team .teamScore h3 {font-weight: 700; font-size: 16px; line-height: 22px; text-transform: uppercase; color: #000000;}
.Cri_result_series .matchinfo .team .teamScore h6 {font-weight: 500; font-size: 11px; line-height: 18px; text-transform: uppercase; color: #707070;}
.Cri_result_series .matchinfo .team-divider{position: relative;z-index: 0;}
.Cri_result_series .matchinfo .team-divider span{font-weight: 600;font-size: 18px;line-height: 29px;text-transform: uppercase;color: #000000;background: #fff;margin: 0 10px;display: inline-block;} 
.Cri_result_series .matchinfo .team-divider:before{position: absolute;left: 0;right: 0;height: 4px;width: 40px;border-top: solid 1px #000000;content: '';top: 50%;z-index: -1;}    
.Cri_result_series .place{text-align: center;font-weight: 500;color: #737373; font-size:12px;line-height: 24px;}
.load-more-btn {background: 0; cursor: pointer; font-weight: 600; font-size: 13px; line-height: 24px; text-transform: uppercase; color: #dc0000; display: flex; justify-content: center; width: 115px; margin: 0 auto; border: 0; align-items: Center; padding-bottom: 10px; }
.load-more-btn::after {content: ""; display: inline-block; width: 6px; height: 6px; border: solid #dc0000; border-width: 0 2px 2px 0; margin: -1px 0 0 3px; vertical-align: middle; -webkit-transform: rotate(-45deg); -moz-transform: rotate(-45deg); -ms-transform: rotate(-45deg); -o-transform: rotate(-45deg); transform: rotate(-45deg); }
@media(min-width:1000px){
	.Cri_result_series {justify-content: flex-start; margin: 0 -0.5%;}
	.Cri_result_series figure{width: 32.33%; margin-right: .5%;  margin-left: .5%;}
}
`}</style>
<div className="Cri_result_series">


<figure className="cshow figure_wrapper RCB GT" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/royal-challengers-bengaluru-vs-gujarat-titans-full-scorecard-live-cricket-score-ipl-2026-match-270968.html">

            <div className="mresultwarp">                
        
        <p>फाइनल</p> 
        <p> अहमदाबाद</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>बेंगलुरु</p>
                                              <h3>161/5 </h3>
                          <h6>18.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>गुजरात</p>
                                              <h3>155/8 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>रॉयल चैलेंजर्स बेंगलुरु ने गुजरात टाइटन्स को  5 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure className="cshow figure_wrapper GT RR" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/gujarat-titans-vs-rajasthan-royals-full-scorecard-live-cricket-score-ipl-2026-match-270967.html">

            <div className="mresultwarp">                
        
        <p>क्वालिफायर 2</p> 
        <p> न्यू चंडीगढ़</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>गुजरात</p>
                                              <h3>219/3 </h3>
                          <h6>18.4 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>राजस्थान</p>
                                              <h3>214/6 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="गुजरात टाइटन्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>गुजरात टाइटन्स ने राजस्थान रॉयल्स को  7 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure className="cshow figure_wrapper SRH RR" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/sunrisers-hyderabad-vs-rajasthan-royals-full-scorecard-live-cricket-score-ipl-2026-match-270966.html">

            <div className="mresultwarp">                
        
        <p>एलिमिनेटर</p> 
        <p> न्यू चंडीगढ़</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>हैदराबाद</p>
                                              <h3>196/10 </h3>
                          <h6>19.2 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>राजस्थान</p>
                                              <h3>243/8 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="सनराइज़र्स हैदराबाद" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>राजस्थान रॉयल्स ने सनराइज़र्स हैदराबाद को  47 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure className="cshow figure_wrapper RCB GT" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/royal-challengers-bengaluru-vs-gujarat-titans-full-scorecard-live-cricket-score-ipl-2026-match-270965.html">

            <div className="mresultwarp">                
        
        <p>क्वालिफायर 1</p> 
        <p> धर्मशाला</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>बेंगलुरु</p>
                                              <h3>254/5 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>गुजरात</p>
                                              <h3>162/10 </h3>
                          <h6>19.3 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>रॉयल चैलेंजर्स बेंगलुरु ने गुजरात टाइटन्स को  92 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure className="cshow figure_wrapper KKR DC" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/kolkata-knight-riders-vs-delhi-capitals-full-scorecard-live-cricket-score-ipl-2026-match-270341.html">

            <div className="mresultwarp">                
        
        <p>मैच 70</p> 
        <p> कोलकाता</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>कोलकाता</p>
                                              <h3>163/10 </h3>
                          <h6>18.4 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>दिल्ली</p>
                                              <h3>203/5 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="कोलकाता नाइट राइडर्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>दिल्ली कैपिटल्स ने कोलकाता नाइट राइडर्स को  40 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure className="cshow figure_wrapper MI RR" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/mumbai-indians-vs-rajasthan-royals-full-scorecard-live-cricket-score-ipl-2026-match-270340.html">

            <div className="mresultwarp">                
        
        <p>मैच 69</p> 
        <p> मुम्बई</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>मुंबई</p>
                                              <h3>175/9 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>राजस्थान</p>
                                              <h3>205/8 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="मुंबई इंडियंस" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>राजस्थान रॉयल्स ने मुंबई इंडियंस को  30 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure className="cshow figure_wrapper LSG PBKS" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/lucknow-super-giants-vs-punjab-kings-full-scorecard-live-cricket-score-ipl-2026-match-270339.html">

            <div className="mresultwarp">                
        
        <p>मैच 68</p> 
        <p> लखनऊ</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>लखनऊ</p>
                                              <h3>196/6 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>पंजाब</p>
                                              <h3>200/3 </h3>
                          <h6>18.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="लखनऊ सुपर जायंट्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>पंजाब किंग्स ने लखनऊ सुपर जायंट्स को  7 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure className="cshow figure_wrapper SRH RCB" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/sunrisers-hyderabad-vs-royal-challengers-bengaluru-full-scorecard-live-cricket-score-ipl-2026-match-270338.html">

            <div className="mresultwarp">                
        
        <p>मैच 67</p> 
        <p> हैदराबाद</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>हैदराबाद</p>
                                              <h3>255/4 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>बेंगलुरु</p>
                                              <h3>200/4 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="सनराइज़र्स हैदराबाद" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>सनराइज़र्स हैदराबाद ने रॉयल चैलेंजर्स बेंगलुरु को  55 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure className="cshow figure_wrapper GT CSK" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/gujarat-titans-vs-chennai-super-kings-full-scorecard-live-cricket-score-ipl-2026-match-270308.html">

            <div className="mresultwarp">                
        
        <p>मैच 66</p> 
        <p> अहमदाबाद</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>गुजरात</p>
                                              <h3>229/4 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>चेन्नई</p>
                                              <h3>140/10 </h3>
                          <h6>13.4 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="गुजरात टाइटन्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>गुजरात टाइटन्स ने चेन्नई सुपर किंग्स को  89 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure className="cshow figure_wrapper KKR MI" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/kolkata-knight-riders-vs-mumbai-indians-full-scorecard-live-cricket-score-ipl-2026-match-270336.html">

            <div className="mresultwarp">                
        
        <p>मैच 65</p> 
        <p> कोलकाता</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>कोलकाता</p>
                                              <h3>148/6 </h3>
                          <h6>18.5 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>मुंबई</p>
                                              <h3>147/8 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="कोलकाता नाइट राइडर्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>कोलकाता नाइट राइडर्स ने मुंबई इंडियंस को  4 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure className="cshow figure_wrapper RR LSG" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/rajasthan-royals-vs-lucknow-super-giants-full-scorecard-live-cricket-score-ipl-2026-match-270335.html">

            <div className="mresultwarp">                
        
        <p>मैच 64</p> 
        <p> जयपुर</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>राजस्थान</p>
                                              <h3>225/3 </h3>
                          <h6>19.1 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>लखनऊ</p>
                                              <h3>220/5 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="राजस्थान रॉयल्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>राजस्थान रॉयल्स ने लखनऊ सुपर जायंट्स को  7 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure className="cshow figure_wrapper CSK SRH" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/chennai-super-kings-vs-sunrisers-hyderabad-full-scorecard-live-cricket-score-ipl-2026-match-270334.html">

            <div className="mresultwarp">                
        
        <p>मैच 63</p> 
        <p> चेन्नई</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>चेन्नई</p>
                                              <h3>180/7 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>हैदराबाद</p>
                                              <h3>181/5 </h3>
                          <h6>19.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="चेन्नई सुपर किंग्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>सनराइज़र्स हैदराबाद ने चेन्नई सुपर किंग्स को  5 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure className="cshow figure_wrapper DC RR" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/delhi-capitals-vs-rajasthan-royals-full-scorecard-live-cricket-score-ipl-2026-match-270333.html">

            <div className="mresultwarp">                
        
        <p>मैच 62</p> 
        <p> दिल्ली</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>दिल्ली</p>
                                              <h3>197/5 </h3>
                          <h6>19.2 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>राजस्थान</p>
                                              <h3>193/8 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="दिल्ली कैपिटल्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>दिल्ली कैपिटल्स ने राजस्थान रॉयल्स को  5 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure className="cshow figure_wrapper PBKS RCB" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/punjab-kings-vs-royal-challengers-bengaluru-full-scorecard-live-cricket-score-ipl-2026-match-270332.html">

            <div className="mresultwarp">                
        
        <p>मैच 61</p> 
        <p> धर्मशाला</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>पंजाब</p>
                                              <h3>199/8 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>बेंगलुरु</p>
                                              <h3>222/4 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="पंजाब किंग्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>रॉयल चैलेंजर्स बेंगलुरु ने पंजाब किंग्स को  23 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure className="cshow figure_wrapper KKR GT" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/kolkata-knight-riders-vs-gujarat-titans-full-scorecard-live-cricket-score-ipl-2026-match-270331.html">

            <div className="mresultwarp">                
        
        <p>मैच 60</p> 
        <p> कोलकाता</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>कोलकाता</p>
                                              <h3>247/2 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>गुजरात</p>
                                              <h3>218/4 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="कोलकाता नाइट राइडर्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>कोलकाता नाइट राइडर्स ने गुजरात टाइटन्स को  29 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper LSG CSK" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/lucknow-super-giants-vs-chennai-super-kings-full-scorecard-live-cricket-score-ipl-2026-match-270330.html">

            <div className="mresultwarp">                
        
        <p>मैच 59</p> 
        <p> लखनऊ</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>लखनऊ</p>
                                              <h3>188/3 </h3>
                          <h6>16.4 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>चेन्नई</p>
                                              <h3>187/5 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="लखनऊ सुपर जायंट्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>लखनऊ सुपर जायंट्स ने चेन्नई सुपर किंग्स को  7 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper PBKS MI" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/punjab-kings-vs-mumbai-indians-full-scorecard-live-cricket-score-ipl-2026-match-270329.html">

            <div className="mresultwarp">                
        
        <p>मैच 58</p> 
        <p> धर्मशाला</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>पंजाब</p>
                                              <h3>200/8 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>मुंबई</p>
                                              <h3>205/4 </h3>
                          <h6>19.5 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="पंजाब किंग्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>मुंबई इंडियंस ने पंजाब किंग्स को  6 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper RCB KKR" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/royal-challengers-bengaluru-vs-kolkata-knight-riders-full-scorecard-live-cricket-score-ipl-2026-match-270328.html">

            <div className="mresultwarp">                
        
        <p>मैच 57</p> 
        <p> रायपुर</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>बेंगलुरु</p>
                                              <h3>194/4 </h3>
                          <h6>19.1 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>कोलकाता</p>
                                              <h3>192/4 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>रॉयल चैलेंजर्स बेंगलुरु ने कोलकाता नाइट राइडर्स को  6 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper GT SRH" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/gujarat-titans-vs-sunrisers-hyderabad-full-scorecard-live-cricket-score-ipl-2026-match-270327.html">

            <div className="mresultwarp">                
        
        <p>मैच 56</p> 
        <p> अहमदाबाद</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>गुजरात</p>
                                              <h3>168/5 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>हैदराबाद</p>
                                              <h3>86/10 </h3>
                          <h6>14.5 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="गुजरात टाइटन्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>गुजरात टाइटन्स ने सनराइज़र्स हैदराबाद को  82 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper PBKS DC" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/punjab-kings-vs-delhi-capitals-full-scorecard-live-cricket-score-ipl-2026-match-270326.html">

            <div className="mresultwarp">                
        
        <p>मैच 55</p> 
        <p> धर्मशाला</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>पंजाब</p>
                                              <h3>210/5 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>दिल्ली</p>
                                              <h3>216/7 </h3>
                          <h6>19.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="पंजाब किंग्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>दिल्ली कैपिटल्स ने पंजाब किंग्स को  3 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper RCB MI" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/royal-challengers-bengaluru-vs-mumbai-indians-full-scorecard-live-cricket-score-ipl-2026-match-270325.html">

            <div className="mresultwarp">                
        
        <p>मैच 54</p> 
        <p> रायपुर</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>बेंगलुरु</p>
                                              <h3>167/8 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>मुंबई</p>
                                              <h3>166/7 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>रॉयल चैलेंजर्स बेंगलुरु ने मुंबई इंडियंस को  2 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper CSK LSG" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/chennai-super-kings-vs-lucknow-super-giants-full-scorecard-live-cricket-score-ipl-2026-match-270324.html">

            <div className="mresultwarp">                
        
        <p>मैच 53</p> 
        <p> चेन्नई</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>चेन्नई</p>
                                              <h3>208/5 </h3>
                          <h6>19.2 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>लखनऊ</p>
                                              <h3>203/8 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="चेन्नई सुपर किंग्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>चेन्नई सुपर किंग्स ने लखनऊ सुपर जायंट्स को  5 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper RR GT" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/rajasthan-royals-vs-gujarat-titans-full-scorecard-live-cricket-score-ipl-2026-match-270323.html">

            <div className="mresultwarp">                
        
        <p>मैच 52</p> 
        <p> जयपुर</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>राजस्थान</p>
                                              <h3>152/10 </h3>
                          <h6>16.3 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>गुजरात</p>
                                              <h3>229/4 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="राजस्थान रॉयल्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>गुजरात टाइटन्स ने राजस्थान रॉयल्स को  77 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper DC KKR" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/delhi-capitals-vs-kolkata-knight-riders-full-scorecard-live-cricket-score-ipl-2026-match-270322.html">

            <div className="mresultwarp">                
        
        <p>मैच 51</p> 
        <p> दिल्ली</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>दिल्ली</p>
                                              <h3>142/8 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>कोलकाता</p>
                                              <h3>147/2 </h3>
                          <h6>14.2 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="दिल्ली कैपिटल्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>कोलकाता नाइट राइडर्स ने दिल्ली कैपिटल्स को  8 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper LSG RCB" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/lucknow-super-giants-vs-royal-challengers-bengaluru-full-scorecard-live-cricket-score-ipl-2026-match-270321.html">

            <div className="mresultwarp">                
        
        <p>मैच 50</p> 
        <p> लखनऊ</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>लखनऊ</p>
                                              <h3>209/3 </h3>
                          <h6>19.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>बेंगलुरु</p>
                                              <h3>203/6 </h3>
                          <h6>19.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="लखनऊ सुपर जायंट्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>लखनऊ सुपर जायंट्स ने रॉयल चैलेंजर्स बेंगलुरु को 9 रन से हराया (डीएलएस मेथड)</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper SRH PBKS" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/sunrisers-hyderabad-vs-punjab-kings-full-scorecard-live-cricket-score-ipl-2026-match-270320.html">

            <div className="mresultwarp">                
        
        <p>मैच 49</p> 
        <p> हैदराबाद</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>हैदराबाद</p>
                                              <h3>235/4 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>पंजाब</p>
                                              <h3>202/7 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="सनराइज़र्स हैदराबाद" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>सनराइज़र्स हैदराबाद ने पंजाब किंग्स को  33 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper DC CSK" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/delhi-capitals-vs-chennai-super-kings-full-scorecard-live-cricket-score-ipl-2026-match-270319.html">

            <div className="mresultwarp">                
        
        <p>मैच 48</p> 
        <p> दिल्ली</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>दिल्ली</p>
                                              <h3>155/7 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>चेन्नई</p>
                                              <h3>159/2 </h3>
                          <h6>17.3 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="दिल्ली कैपिटल्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>चेन्नई सुपर किंग्स ने दिल्ली कैपिटल्स को  8 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper MI LSG" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/mumbai-indians-vs-lucknow-super-giants-full-scorecard-live-cricket-score-ipl-2026-match-270318.html">

            <div className="mresultwarp">                
        
        <p>मैच 47</p> 
        <p> मुम्बई</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>मुंबई</p>
                                              <h3>229/4 </h3>
                          <h6>18.4 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>लखनऊ</p>
                                              <h3>228/5 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="मुंबई इंडियंस" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>मुंबई इंडियंस ने लखनऊ सुपर जायंट्स को  6 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper GT PBKS" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/gujarat-titans-vs-punjab-kings-full-scorecard-live-cricket-score-ipl-2026-match-270317.html">

            <div className="mresultwarp">                
        
        <p>मैच 46</p> 
        <p> अहमदाबाद</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>गुजरात</p>
                                              <h3>167/6 </h3>
                          <h6>19.5 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>पंजाब</p>
                                              <h3>163/9 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="गुजरात टाइटन्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>गुजरात टाइटन्स ने पंजाब किंग्स को  4 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper SRH KKR" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/sunrisers-hyderabad-vs-kolkata-knight-riders-full-scorecard-live-cricket-score-ipl-2026-match-270316.html">

            <div className="mresultwarp">                
        
        <p>मैच 45</p> 
        <p> हैदराबाद</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>हैदराबाद</p>
                                              <h3>165/10 </h3>
                          <h6>19.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>कोलकाता</p>
                                              <h3>169/3 </h3>
                          <h6>18.2 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="सनराइज़र्स हैदराबाद" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>कोलकाता नाइट राइडर्स ने सनराइज़र्स हैदराबाद को  7 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper CSK MI" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/chennai-super-kings-vs-mumbai-indians-full-scorecard-live-cricket-score-ipl-2026-match-270315.html">

            <div className="mresultwarp">                
        
        <p>मैच 44</p> 
        <p> चेन्नई</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>चेन्नई</p>
                                              <h3>160/2 </h3>
                          <h6>18.1 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>मुंबई</p>
                                              <h3>159/7 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="चेन्नई सुपर किंग्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>चेन्नई सुपर किंग्स ने मुंबई इंडियंस को  8 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper RR DC" data-matchtype="T20" data-matchmonth="5">
      <a href="/sports/cricket-news/rajasthan-royals-vs-delhi-capitals-full-scorecard-live-cricket-score-ipl-2026-match-270314.html">

            <div className="mresultwarp">                
        
        <p>मैच 43</p> 
        <p> जयपुर</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>राजस्थान</p>
                                              <h3>225/6 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>दिल्ली</p>
                                              <h3>226/3 </h3>
                          <h6>19.1 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="राजस्थान रॉयल्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>दिल्ली कैपिटल्स ने राजस्थान रॉयल्स को  7 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper GT RCB" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/gujarat-titans-vs-royal-challengers-bengaluru-full-scorecard-live-cricket-score-ipl-2026-match-270313.html">

            <div className="mresultwarp">                
        
        <p>मैच 42</p> 
        <p> अहमदाबाद</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>गुजरात</p>
                                              <h3>158/6 </h3>
                          <h6>15.5 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>बेंगलुरु</p>
                                              <h3>155/10 </h3>
                          <h6>19.2 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="गुजरात टाइटन्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>गुजरात टाइटन्स ने रॉयल चैलेंजर्स बेंगलुरु को  4 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper MI SRH" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/mumbai-indians-vs-sunrisers-hyderabad-full-scorecard-live-cricket-score-ipl-2026-match-270312.html">

            <div className="mresultwarp">                
        
        <p>मैच 41</p> 
        <p> मुम्बई</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>मुंबई</p>
                                              <h3>243/5 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>हैदराबाद</p>
                                              <h3>249/4 </h3>
                          <h6>18.4 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="मुंबई इंडियंस" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>सनराइज़र्स हैदराबाद ने मुंबई इंडियंस को  6 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper PBKS RR" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/punjab-kings-vs-rajasthan-royals-full-scorecard-live-cricket-score-ipl-2026-match-270311.html">

            <div className="mresultwarp">                
        
        <p>मैच 40</p> 
        <p> न्यू चंडीगढ़</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>पंजाब</p>
                                              <h3>222/4 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>राजस्थान</p>
                                              <h3>228/4 </h3>
                          <h6>19.2 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="पंजाब किंग्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>राजस्थान रॉयल्स ने पंजाब किंग्स को  6 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper DC RCB" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/delhi-capitals-vs-royal-challengers-bengaluru-full-scorecard-live-cricket-score-ipl-2026-match-270310.html">

            <div className="mresultwarp">                
        
        <p>मैच 39</p> 
        <p> दिल्ली</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>दिल्ली</p>
                                              <h3>75/10 </h3>
                          <h6>16.3 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>बेंगलुरु</p>
                                              <h3>77/1 </h3>
                          <h6>6.3 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="दिल्ली कैपिटल्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>रॉयल चैलेंजर्स बेंगलुरु ने दिल्ली कैपिटल्स को  9 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper LSG KKR" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/lucknow-super-giants-vs-kolkata-knight-riders-full-scorecard-live-cricket-score-ipl-2026-match-270309.html">

            <div className="mresultwarp">                
        
        <p>मैच 38</p> 
        <p> लखनऊ</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>लखनऊ</p>
                                              <h3>155/8 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>कोलकाता</p>
                                              <h3>155/7 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="लखनऊ सुपर जायंट्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>Kolkata Knight Riders tied with Lucknow Super Giants (Kolkata Knight Riders won the Super Over by 2 wickets)</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper CSK GT" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/chennai-super-kings-vs-gujarat-titans-full-scorecard-live-cricket-score-ipl-2026-match-270337.html">

            <div className="mresultwarp">                
        
        <p>मैच 37</p> 
        <p> चेन्नई</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>चेन्नई</p>
                                              <h3>158/7 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>गुजरात</p>
                                              <h3>162/2 </h3>
                          <h6>16.4 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="चेन्नई सुपर किंग्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>गुजरात टाइटन्स ने चेन्नई सुपर किंग्स को  8 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper RR SRH" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/rajasthan-royals-vs-sunrisers-hyderabad-full-scorecard-live-cricket-score-ipl-2026-match-270307.html">

            <div className="mresultwarp">                
        
        <p>मैच 36</p> 
        <p> जयपुर</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>राजस्थान</p>
                                              <h3>228/6 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>हैदराबाद</p>
                                              <h3>229/5 </h3>
                          <h6>18.3 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="राजस्थान रॉयल्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>सनराइज़र्स हैदराबाद ने राजस्थान रॉयल्स को  5 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper DC PBKS" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/delhi-capitals-vs-punjab-kings-full-scorecard-live-cricket-score-ipl-2026-match-270306.html">

            <div className="mresultwarp">                
        
        <p>मैच 35</p> 
        <p> दिल्ली</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>दिल्ली</p>
                                              <h3>264/2 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>पंजाब</p>
                                              <h3>265/4 </h3>
                          <h6>18.5 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="दिल्ली कैपिटल्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>पंजाब किंग्स ने दिल्ली कैपिटल्स को  6 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper RCB GT" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/royal-challengers-bengaluru-vs-gujarat-titans-full-scorecard-live-cricket-score-ipl-2026-match-270305.html">

            <div className="mresultwarp">                
        
        <p>मैच 34</p> 
        <p> बेंगलुरू</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>बेंगलुरु</p>
                                              <h3>206/5 </h3>
                          <h6>18.5 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>गुजरात</p>
                                              <h3>205/3 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>रॉयल चैलेंजर्स बेंगलुरु ने गुजरात टाइटन्स को  5 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper MI CSK" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/mumbai-indians-vs-chennai-super-kings-full-scorecard-live-cricket-score-ipl-2026-match-270304.html">

            <div className="mresultwarp">                
        
        <p>मैच 33</p> 
        <p> मुम्बई</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>मुंबई</p>
                                              <h3>104/10 </h3>
                          <h6>19.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>चेन्नई</p>
                                              <h3>207/6 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="मुंबई इंडियंस" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>चेन्नई सुपर किंग्स ने मुंबई इंडियंस को  103 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper LSG RR" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/lucknow-super-giants-vs-rajasthan-royals-full-scorecard-live-cricket-score-ipl-2026-match-270303.html">

            <div className="mresultwarp">                
        
        <p>मैच 32</p> 
        <p> लखनऊ</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>लखनऊ</p>
                                              <h3>119/10 </h3>
                          <h6>18.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>राजस्थान</p>
                                              <h3>159/6 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="लखनऊ सुपर जायंट्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>राजस्थान रॉयल्स ने लखनऊ सुपर जायंट्स को  40 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper SRH DC" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/sunrisers-hyderabad-vs-delhi-capitals-full-scorecard-live-cricket-score-ipl-2026-match-270302.html">

            <div className="mresultwarp">                
        
        <p>मैच 31</p> 
        <p> हैदराबाद</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>हैदराबाद</p>
                                              <h3>242/2 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>दिल्ली</p>
                                              <h3>195/9 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="सनराइज़र्स हैदराबाद" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>सनराइज़र्स हैदराबाद ने दिल्ली कैपिटल्स को  47 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper GT MI" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/gujarat-titans-vs-mumbai-indians-full-scorecard-live-cricket-score-ipl-2026-match-270301.html">

            <div className="mresultwarp">                
        
        <p>मैच 30</p> 
        <p> अहमदाबाद</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>गुजरात</p>
                                              <h3>100/10 </h3>
                          <h6>15.5 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>मुंबई</p>
                                              <h3>199/5 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="गुजरात टाइटन्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>मुंबई इंडियंस ने गुजरात टाइटन्स को  99 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper PBKS LSG" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/punjab-kings-vs-lucknow-super-giants-full-scorecard-live-cricket-score-ipl-2026-match-270300.html">

            <div className="mresultwarp">                
        
        <p>मैच 29</p> 
        <p> न्यू चंडीगढ़</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>पंजाब</p>
                                              <h3>254/7 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>लखनऊ</p>
                                              <h3>200/5 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="पंजाब किंग्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>पंजाब किंग्स ने लखनऊ सुपर जायंट्स को  54 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper KKR RR" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/kolkata-knight-riders-vs-rajasthan-royals-full-scorecard-live-cricket-score-ipl-2026-match-270299.html">

            <div className="mresultwarp">                
        
        <p>मैच 28</p> 
        <p> कोलकाता</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>कोलकाता</p>
                                              <h3>161/6 </h3>
                          <h6>19.4 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>राजस्थान</p>
                                              <h3>155/9 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="कोलकाता नाइट राइडर्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>कोलकाता नाइट राइडर्स ने राजस्थान रॉयल्स को  4 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper SRH CSK" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/sunrisers-hyderabad-vs-chennai-super-kings-full-scorecard-live-cricket-score-ipl-2026-match-270298.html">

            <div className="mresultwarp">                
        
        <p>मैच 27</p> 
        <p> हैदराबाद</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>हैदराबाद</p>
                                              <h3>194/9 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>चेन्नई</p>
                                              <h3>184/8 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="सनराइज़र्स हैदराबाद" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>सनराइज़र्स हैदराबाद ने चेन्नई सुपर किंग्स को  10 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper RCB DC" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/royal-challengers-bengaluru-vs-delhi-capitals-full-scorecard-live-cricket-score-ipl-2026-match-270297.html">

            <div className="mresultwarp">                
        
        <p>मैच 26</p> 
        <p> बेंगलुरू</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>बेंगलुरु</p>
                                              <h3>175/8 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>दिल्ली</p>
                                              <h3>179/4 </h3>
                          <h6>19.5 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>दिल्ली कैपिटल्स ने रॉयल चैलेंजर्स बेंगलुरु को  6 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper GT KKR" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/gujarat-titans-vs-kolkata-knight-riders-full-scorecard-live-cricket-score-ipl-2026-match-270296.html">

            <div className="mresultwarp">                
        
        <p>मैच 25</p> 
        <p> अहमदाबाद</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>गुजरात</p>
                                              <h3>181/5 </h3>
                          <h6>19.4 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>कोलकाता</p>
                                              <h3>180/10 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="गुजरात टाइटन्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>गुजरात टाइटन्स ने कोलकाता नाइट राइडर्स को  5 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper MI PBKS" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/mumbai-indians-vs-punjab-kings-full-scorecard-live-cricket-score-ipl-2026-match-270295.html">

            <div className="mresultwarp">                
        
        <p>मैच 24</p> 
        <p> मुम्बई</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>मुंबई</p>
                                              <h3>195/6 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>पंजाब</p>
                                              <h3>198/3 </h3>
                          <h6>16.3 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="मुंबई इंडियंस" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>पंजाब किंग्स ने मुंबई इंडियंस को  7 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper RCB LSG" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/royal-challengers-bengaluru-vs-lucknow-super-giants-full-scorecard-live-cricket-score-ipl-2026-match-270294.html">

            <div className="mresultwarp">                
        
        <p>मैच 23</p> 
        <p> बेंगलुरू</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>बेंगलुरु</p>
                                              <h3>149/5 </h3>
                          <h6>15.1 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>लखनऊ</p>
                                              <h3>146/10 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>रॉयल चैलेंजर्स बेंगलुरु ने लखनऊ सुपर जायंट्स को  5 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper CSK KKR" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/chennai-super-kings-vs-kolkata-knight-riders-full-scorecard-live-cricket-score-ipl-2026-match-270293.html">

            <div className="mresultwarp">                
        
        <p>मैच 22</p> 
        <p> चेन्नई</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>चेन्नई</p>
                                              <h3>192/5 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>कोलकाता</p>
                                              <h3>160/7 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="चेन्नई सुपर किंग्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>चेन्नई सुपर किंग्स ने कोलकाता नाइट राइडर्स को  32 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper SRH RR" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/sunrisers-hyderabad-vs-rajasthan-royals-full-scorecard-live-cricket-score-ipl-2026-match-270292.html">

            <div className="mresultwarp">                
        
        <p>मैच 21</p> 
        <p> हैदराबाद</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>हैदराबाद</p>
                                              <h3>216/6 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>राजस्थान</p>
                                              <h3>159/10 </h3>
                          <h6>19.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="सनराइज़र्स हैदराबाद" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>सनराइज़र्स हैदराबाद ने राजस्थान रॉयल्स को  57 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper MI RCB" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/mumbai-indians-vs-royal-challengers-bengaluru-full-scorecard-live-cricket-score-ipl-2026-match-270067.html">

            <div className="mresultwarp">                
        
        <p>मैच 20</p> 
        <p> मुम्बई</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>मुंबई</p>
                                              <h3>222/5 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>बेंगलुरु</p>
                                              <h3>240/4 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="मुंबई इंडियंस" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>रॉयल चैलेंजर्स बेंगलुरु ने मुंबई इंडियंस को  18 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper LSG GT" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/lucknow-super-giants-vs-gujarat-titans-full-scorecard-live-cricket-score-ipl-2026-match-270066.html">

            <div className="mresultwarp">                
        
        <p>मैच 19</p> 
        <p> लखनऊ</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>लखनऊ</p>
                                              <h3>164/8 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>गुजरात</p>
                                              <h3>165/3 </h3>
                          <h6>18.4 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="लखनऊ सुपर जायंट्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>गुजरात टाइटन्स ने लखनऊ सुपर जायंट्स को  7 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper CSK DC" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/chennai-super-kings-vs-delhi-capitals-full-scorecard-live-cricket-score-ipl-2026-match-270065.html">

            <div className="mresultwarp">                
        
        <p>मैच 18</p> 
        <p> चेन्नई</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>चेन्नई</p>
                                              <h3>212/2 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>दिल्ली</p>
                                              <h3>189/10 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="चेन्नई सुपर किंग्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>चेन्नई सुपर किंग्स ने दिल्ली कैपिटल्स को  23 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper PBKS SRH" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/punjab-kings-vs-sunrisers-hyderabad-full-scorecard-live-cricket-score-ipl-2026-match-270064.html">

            <div className="mresultwarp">                
        
        <p>मैच 17</p> 
        <p> न्यू चंडीगढ़</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>पंजाब</p>
                                              <h3>223/4 </h3>
                          <h6>18.5 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>हैदराबाद</p>
                                              <h3>219/6 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="पंजाब किंग्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>पंजाब किंग्स ने सनराइज़र्स हैदराबाद को  6 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper RR RCB" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/rajasthan-royals-vs-royal-challengers-bengaluru-full-scorecard-live-cricket-score-ipl-2026-match-270063.html">

            <div className="mresultwarp">                
        
        <p>मैच 16</p> 
        <p> गुवाहाटी</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>राजस्थान</p>
                                              <h3>202/4 </h3>
                          <h6>18.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>बेंगलुरु</p>
                                              <h3>201/8 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="राजस्थान रॉयल्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>राजस्थान रॉयल्स ने रॉयल चैलेंजर्स बेंगलुरु को  6 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper KKR LSG" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/kolkata-knight-riders-vs-lucknow-super-giants-full-scorecard-live-cricket-score-ipl-2026-match-270062.html">

            <div className="mresultwarp">                
        
        <p>मैच 15</p> 
        <p> कोलकाता</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>कोलकाता</p>
                                              <h3>181/4 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>लखनऊ</p>
                                              <h3>182/7 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="कोलकाता नाइट राइडर्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>लखनऊ सुपर जायंट्स ने कोलकाता नाइट राइडर्स को  3 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper DC GT" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/delhi-capitals-vs-gujarat-titans-full-scorecard-live-cricket-score-ipl-2026-match-270061.html">

            <div className="mresultwarp">                
        
        <p>मैच 14</p> 
        <p> दिल्ली</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>दिल्ली</p>
                                              <h3>209/8 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>गुजरात</p>
                                              <h3>210/4 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="दिल्ली कैपिटल्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>गुजरात टाइटन्स ने दिल्ली कैपिटल्स को 1 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper RR MI" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/rajasthan-royals-vs-mumbai-indians-full-scorecard-live-cricket-score-ipl-2026-match-270060.html">

            <div className="mresultwarp">                
        
        <p>मैच 13</p> 
        <p> गुवाहाटी</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>राजस्थान</p>
                                              <h3>150/3 </h3>
                          <h6>11.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>मुंबई</p>
                                              <h3>123/9 </h3>
                          <h6>11.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="राजस्थान रॉयल्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>राजस्थान रॉयल्स ने मुंबई इंडियंस को  27 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper KKR PBKS" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/kolkata-knight-riders-vs-punjab-kings-full-scorecard-live-cricket-score-ipl-2026-match-270059.html">

            <div className="mresultwarp">                
        
        <p>मैच 12</p> 
        <p> कोलकाता</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>कोलकाता</p>
                                      </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>पंजाब</p>
                                      </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="कोलकाता नाइट राइडर्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>मैच रद्द</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper RCB CSK" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/royal-challengers-bengaluru-vs-chennai-super-kings-full-scorecard-live-cricket-score-ipl-2026-match-270058.html">

            <div className="mresultwarp">                
        
        <p>मैच 11</p> 
        <p> बेंगलुरू</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>बेंगलुरु</p>
                                              <h3>250/3 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>चेन्नई</p>
                                              <h3>207/10 </h3>
                          <h6>19.4 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>रॉयल चैलेंजर्स बेंगलुरु ने चेन्नई सुपर किंग्स को  43 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper SRH LSG" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/sunrisers-hyderabad-vs-lucknow-super-giants-full-scorecard-live-cricket-score-ipl-2026-match-270057.html">

            <div className="mresultwarp">                
        
        <p>मैच 10</p> 
        <p> हैदराबाद</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>हैदराबाद</p>
                                              <h3>156/9 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>लखनऊ</p>
                                              <h3>160/5 </h3>
                          <h6>19.5 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="सनराइज़र्स हैदराबाद" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>लखनऊ सुपर जायंट्स ने सनराइज़र्स हैदराबाद को  5 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper GT RR" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/gujarat-titans-vs-rajasthan-royals-full-scorecard-live-cricket-score-ipl-2026-match-270056.html">

            <div className="mresultwarp">                
        
        <p>मैच 9</p> 
        <p> अहमदाबाद</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>गुजरात</p>
                                              <h3>204/8 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>राजस्थान</p>
                                              <h3>210/6 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="गुजरात टाइटन्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>राजस्थान रॉयल्स ने गुजरात टाइटन्स को  6 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper DC MI" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/delhi-capitals-vs-mumbai-indians-full-scorecard-live-cricket-score-ipl-2026-match-270055.html">

            <div className="mresultwarp">                
        
        <p>मैच 8</p> 
        <p> दिल्ली</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>दिल्ली</p>
                                              <h3>164/4 </h3>
                          <h6>18.1 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>मुंबई</p>
                                              <h3>162/6 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="दिल्ली कैपिटल्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>दिल्ली कैपिटल्स ने मुंबई इंडियंस को  6 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper CSK PBKS" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/chennai-super-kings-vs-punjab-kings-full-scorecard-live-cricket-score-ipl-2026-match-270054.html">

            <div className="mresultwarp">                
        
        <p>मैच 7</p> 
        <p> चेन्नई</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>चेन्नई</p>
                                              <h3>209/5 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>पंजाब</p>
                                              <h3>210/5 </h3>
                          <h6>18.4 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="चेन्नई सुपर किंग्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>पंजाब किंग्स ने चेन्नई सुपर किंग्स को  5 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper KKR SRH" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/kolkata-knight-riders-vs-sunrisers-hyderabad-full-scorecard-live-cricket-score-ipl-2026-match-270053.html">

            <div className="mresultwarp">                
        
        <p>मैच 6</p> 
        <p> कोलकाता</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>कोलकाता</p>
                                              <h3>161/10 </h3>
                          <h6>16.0 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>हैदराबाद</p>
                                              <h3>226/8 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="कोलकाता नाइट राइडर्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>सनराइज़र्स हैदराबाद ने कोलकाता नाइट राइडर्स को  65 रन से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper LSG DC" data-matchtype="T20" data-matchmonth="4">
      <a href="/sports/cricket-news/lucknow-super-giants-vs-delhi-capitals-full-scorecard-live-cricket-score-ipl-2026-match-267886.html">

            <div className="mresultwarp">                
        
        <p>मैच 5</p> 
        <p> लखनऊ</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>लखनऊ</p>
                                              <h3>141/10 </h3>
                          <h6>18.4 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>दिल्ली</p>
                                              <h3>145/4 </h3>
                          <h6>17.1 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="लखनऊ सुपर जायंट्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>दिल्ली कैपिटल्स ने लखनऊ सुपर जायंट्स को  6 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper PBKS GT" data-matchtype="T20" data-matchmonth="3">
      <a href="/sports/cricket-news/punjab-kings-vs-gujarat-titans-full-scorecard-live-cricket-score-ipl-2026-match-267885.html">

            <div className="mresultwarp">                
        
        <p>मैच 4</p> 
        <p> मोहाली</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>पंजाब</p>
                                              <h3>165/7 </h3>
                          <h6>19.1 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>गुजरात</p>
                                              <h3>162/6 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="पंजाब किंग्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>पंजाब किंग्स ने गुजरात टाइटन्स को  3 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper RR CSK" data-matchtype="T20" data-matchmonth="3">
      <a href="/sports/cricket-news/rajasthan-royals-vs-chennai-super-kings-full-scorecard-live-cricket-score-ipl-2026-match-267884.html">

            <div className="mresultwarp">                
        
        <p>मैच 3</p> 
        <p> गुवाहाटी</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>राजस्थान</p>
                                              <h3>128/2 </h3>
                          <h6>12.1 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>चेन्नई</p>
                                              <h3>127/10 </h3>
                          <h6>19.4 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="राजस्थान रॉयल्स" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>राजस्थान रॉयल्स ने चेन्नई सुपर किंग्स को  8 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper MI KKR" data-matchtype="T20" data-matchmonth="3">
      <a href="/sports/cricket-news/mumbai-indians-vs-kolkata-knight-riders-full-scorecard-live-cricket-score-ipl-2026-match-267883.html">

            <div className="mresultwarp">                
        
        <p>मैच 2</p> 
        <p> मुम्बई</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>मुंबई</p>
                                              <h3>224/4 </h3>
                          <h6>19.1 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>कोलकाता</p>
                                              <h3>220/4 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="मुंबई इंडियंस" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>मुंबई इंडियंस ने कोलकाता नाइट राइडर्स को  6 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    



<figure style={{display:"none"}} className="cshow figure_wrapper RCB SRH" data-matchtype="T20" data-matchmonth="3">
      <a href="/sports/cricket-news/royal-challengers-bengaluru-vs-sunrisers-hyderabad-full-scorecard-live-cricket-score-ipl-2026-match-267882.html">

            <div className="mresultwarp">                
        
        <p>मैच 1</p> 
        <p> बेंगलुरू</p>                
      </div>

      <div className="Cri_result_match">
            <div className="matchinfo">

                              <div className="team">
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="40" width="40" />
                  </div>
                  <div className="teamScore">
                    <p>बेंगलुरु</p>
                                              <h3>203/4 </h3>
                          <h6>15.4 ov</h6>
                                            </div>
                </div>

                <div className="team-divider">
                  <span>vs</span>
                </div>

                <div className="team">
                  <div className="teamScore">
                    <p>हैदराबाद</p>
                                              <h3>201/9 </h3>
                          <h6>20.0 ov</h6>
                                            </div>
                  <div className="team_logo">
                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="40" width="40" />
                  </div>
                </div>
              
            </div>
            
            <div className="place">
                  <p>रॉयल चैलेंजर्स बेंगलुरु ने सनराइज़र्स हैदराबाद को  6 विकेट से हराया</p>
              </div>
        </div>
      </a>
    </figure>
    

    <input type="hidden" name="cricLoadId" id="cricLoadId" value="14" />
    <input type="hidden" name="totalCricAvilable" id="totalCricAvilable" value="74" />

  	<a href="#" className="load-more-btn load_more cric-load" id="cric-load">Load more </a>
		
		
</div>

                
            </div>
    </>
  );
}