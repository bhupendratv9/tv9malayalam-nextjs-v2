import Image from "next/image";

export default function IplBannerWidget() {
  return (
    <>
      <div className="common_section">
                <div className="sports_heading"> 
                    <h1 className="h1"><span>IPL Schedule  2026</span></h1>

                    	                    <div className="C_search">
			                <div className="C_searchwrap">
			                  <select name="sports">
			                    <option value="all">Select Team</option>
			                    								            			<option value="RCB">रॉयल चैलेंजर्स बेंगलुरु</option>
								            										            			<option value="GT">गुजरात टाइटन्स</option>
								            										            			<option value="SRH">सनराइज़र्स हैदराबाद</option>
								            										            			<option value="RR">राजस्थान रॉयल्स</option>
								            										            			<option value="PBKS">पंजाब किंग्स</option>
								            										            			<option value="DC">दिल्ली कैपिटल्स</option>
								            										            			<option value="KKR">कोलकाता नाइट राइडर्स</option>
								            										            			<option value="CSK">चेन्नई सुपर किंग्स</option>
								            										            			<option value="MI">मुंबई इंडियंस</option>
								            										            			<option value="LSG">लखनऊ सुपर जायंट्स</option>
								            					                    
			                  </select>
			                </div>
			            </div>
			        
                </div>
				<style>{`
.Cri_upcoming-series{display:flex;flex-wrap: wrap;    justify-content: space-between;}
.Cri_upcoming-series figure{background: #FFFFFF;border: 1px solid #DDDDDD;border-radius: 8px;position: relative;width: 100%;margin-bottom: 15px; display: flex; overflow: hidden;flex-wrap: wrap;}
.Cri_upcoming-series figure a{ display:flex; width: 100%;flex-wrap: wrap;}
.Cri_upcoming-series .matchdate h3 span{ display:inline-block;  margin-left: 5px;}
.Cri_upcoming-series .matchdate p{ color: #6F767D; font-size: 12px; line-height: 20px;}
.Cri_upcoming-series .matchdate{background: #F1F8FF; border-right: 1px solid #EAEDF0; flex: 0 0 100%; padding: 10px; text-align: center; color: #100449; display: flex; align-items: center; justify-content: center;}
.Cri_upcoming-series .Cri_upcoming_match{ width: 100%; padding: 10px; flex: 1}
.Cri_upcoming-series .matchName{color: #000000;font-size: 14px;font-weight: 600;text-transform: uppercase;padding-bottom: 6px;line-height:19px; text-align:center; }
.Cri_upcoming-series .matchinfo {margin: 5px 0px 0px 0px; min-height: 60px; align-items: center; display: flex; justify-content: space-between; padding: 10px 10px 0 10px;  border-top: 1px solid #EAEDF0;}
.Cri_upcoming-series .matchinfo .team{display: flex; align-items: center; flex-wrap: wrap; justify-content: center; text-align: center;}
.Cri_upcoming-series .matchinfo .team .team_logo{text-align: center;  margin: 0 auto;}
.Cri_upcoming-series .matchinfo .team .team_logo img{width: 36px; height: 36px; border-radius: 50%;}
.Cri_upcoming-series .matchinfo .team .teamScore{padding: 0 5px;  width: 100%;}
.Cri_upcoming-series .matchinfo .team .teamScore p{font-weight: 500;font-size: 11px;line-height: 18px;text-transform: uppercase;color: #000000;}
.Cri_upcoming-series .matchinfo .team .teamScore:nth-child(odd){text-align: right;}
.Cri_upcoming-series .matchinfo .team-divider{position: relative;z-index: 0;}
.Cri_upcoming-series .matchinfo .team-divider span{font-weight: 600;font-size: 18px;line-height: 29px;text-transform: uppercase;color: #000000;background: #fff;margin: 0 10px;display: inline-block;} 
.Cri_upcoming-series .matchinfo .team-divider:before{position: absolute;left: 0;right: 0;height: 4px;width: 40px;border-top: solid 1px #000000;content: '';top: 50%;z-index: -1;}    
.Cri_upcoming-series .place{text-align: center;font-weight: 500;color: #6F767D; font-size:12px;line-height: 24px;}

@media(min-width:1000px){
	.Cri_upcoming-series{justify-content:flex-start; margin:0px -1%}
	.Cri_upcoming-series figure{width:48%; margin:0px 1% 15px;flex-wrap: unset;}  
  .Cri_upcoming-series .matchdate{    flex: 0 0 30%;}
   .Cri_upcoming-series .matchdate h3 span{ display: block; margin-left: 0px;}

    
}
`}</style>
<div className="Cri_upcoming-series" id="upcoming_card_wrapper">
    
    <figure className="figure_wrapper cshow RCB SRH  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Saturday<span> 28 March</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">बेंगलुरु बनाम हैदराबाद | मैच 1</div>

            	<div className="place">
                    <p>एम.चिन्नास्वामी स्टेडियम, बेंगलुरू</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>रॉयल चैलेंजर्स बेंगलुरु</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>सनराइज़र्स हैदराबाद</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow MI KKR  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Sunday<span> 29 March</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">मुंबई बनाम कोलकाता | मैच 2</div>

            	<div className="place">
                    <p>वानखेड़े स्टेडियम, मुम्बई</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>मुंबई इंडियंस</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>कोलकाता नाइट राइडर्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow RR CSK  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Monday<span> 30 March</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">राजस्थान बनाम चेन्नई | मैच 3</div>

            	<div className="place">
                    <p>बर्सापारा क्रिकेट स्टेडियम, गुवाहाटी</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>राजस्थान रॉयल्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>चेन्नई सुपर किंग्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow PBKS GT  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Tuesday<span> 31 March</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">पंजाब बनाम गुजरात | मैच 4</div>

            	<div className="place">
                    <p>महाराजा यादविन्द्र सिंह अंतर्राष्ट्रीय क्रिकेट स्टेडियम, मुल्लानपुर, मोहाली</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>पंजाब किंग्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>गुजरात टाइटन्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow LSG DC  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Wednesday<span> 01 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">लखनऊ बनाम दिल्ली | मैच 5</div>

            	<div className="place">
                    <p>भारत रत्न श्री अटल बिहारी वाजपई एकाना क्रिकेट स्टेडियम, लखनऊ</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>लखनऊ सुपर जायंट्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>दिल्ली कैपिटल्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow KKR SRH  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Thursday<span> 02 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">कोलकाता बनाम हैदराबाद | मैच 6</div>

            	<div className="place">
                    <p>ईडन गार्डन्स, कोलकाता</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>कोलकाता नाइट राइडर्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>सनराइज़र्स हैदराबाद</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow CSK PBKS  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Friday<span> 03 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">चेन्नई बनाम पंजाब | मैच 7</div>

            	<div className="place">
                    <p>एमए चिदंबरम स्टेडियम, चेन्नई</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>चेन्नई सुपर किंग्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>पंजाब किंग्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow DC MI  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Saturday<span> 04 April</span></h3>
                  <p>03:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">दिल्ली बनाम मुंबई | मैच 8</div>

            	<div className="place">
                    <p>अरुण जेटली स्टेडियम, दिल्ली</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>दिल्ली कैपिटल्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>मुंबई इंडियंस</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow GT RR  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Saturday<span> 04 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">गुजरात बनाम राजस्थान | मैच 9</div>

            	<div className="place">
                    <p>नरेंद्र मोदी स्टेडियम, अहमदाबाद</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>गुजरात टाइटन्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>राजस्थान रॉयल्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow SRH LSG  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Sunday<span> 05 April</span></h3>
                  <p>03:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">हैदराबाद बनाम लखनऊ | मैच 10</div>

            	<div className="place">
                    <p>राजीव गांधी अंतर्राष्ट्रीय स्टेडियम, हैदराबाद</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>सनराइज़र्स हैदराबाद</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>लखनऊ सुपर जायंट्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow RCB CSK  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Sunday<span> 05 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">बेंगलुरु बनाम चेन्नई | मैच 11</div>

            	<div className="place">
                    <p>एम.चिन्नास्वामी स्टेडियम, बेंगलुरू</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>रॉयल चैलेंजर्स बेंगलुरु</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>चेन्नई सुपर किंग्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow KKR PBKS  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Monday<span> 06 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">कोलकाता बनाम पंजाब | मैच 12</div>

            	<div className="place">
                    <p>ईडन गार्डन्स, कोलकाता</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>कोलकाता नाइट राइडर्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>पंजाब किंग्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow RR MI  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Tuesday<span> 07 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">राजस्थान बनाम मुंबई | मैच 13</div>

            	<div className="place">
                    <p>एसीए स्टेडियम, गुवाहाटी</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>राजस्थान रॉयल्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>मुंबई इंडियंस</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow DC GT  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Wednesday<span> 08 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">दिल्ली बनाम गुजरात | मैच 14</div>

            	<div className="place">
                    <p>अरुण जेटली स्टेडियम, दिल्ली</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>दिल्ली कैपिटल्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>गुजरात टाइटन्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow KKR LSG  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Thursday<span> 09 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">कोलकाता बनाम लखनऊ | मैच 15</div>

            	<div className="place">
                    <p>ईडन गार्डन्स, कोलकाता</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>कोलकाता नाइट राइडर्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>लखनऊ सुपर जायंट्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow RR RCB  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Friday<span> 10 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">राजस्थान बनाम बेंगलुरु | मैच 16</div>

            	<div className="place">
                    <p>एसीए स्टेडियम, गुवाहाटी</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>राजस्थान रॉयल्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>रॉयल चैलेंजर्स बेंगलुरु</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow PBKS SRH  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Saturday<span> 11 April</span></h3>
                  <p>03:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">पंजाब बनाम हैदराबाद | मैच 17</div>

            	<div className="place">
                    <p>न्यू अंतर्राष्ट्रीय क्रिकेट स्टेडियम, न्यू चंडीगढ़</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>पंजाब किंग्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>सनराइज़र्स हैदराबाद</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow CSK DC  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Saturday<span> 11 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">चेन्नई बनाम दिल्ली | मैच 18</div>

            	<div className="place">
                    <p>एमए चिदंबरम स्टेडियम, चेन्नई</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>चेन्नई सुपर किंग्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>दिल्ली कैपिटल्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow LSG GT  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Sunday<span> 12 April</span></h3>
                  <p>03:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">लखनऊ बनाम गुजरात | मैच 19</div>

            	<div className="place">
                    <p>भारत रत्न श्री अटल बिहारी वाजपई एकाना क्रिकेट स्टेडियम, लखनऊ</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>लखनऊ सुपर जायंट्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>गुजरात टाइटन्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow MI RCB  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Sunday<span> 12 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">मुंबई बनाम बेंगलुरु | मैच 20</div>

            	<div className="place">
                    <p>वानखेड़े स्टेडियम, मुम्बई</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>मुंबई इंडियंस</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>रॉयल चैलेंजर्स बेंगलुरु</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow SRH RR  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Monday<span> 13 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">हैदराबाद बनाम राजस्थान | मैच 21</div>

            	<div className="place">
                    <p>राजीव गांधी अंतर्राष्ट्रीय स्टेडियम, हैदराबाद</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>सनराइज़र्स हैदराबाद</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>राजस्थान रॉयल्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow CSK KKR  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Tuesday<span> 14 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">चेन्नई बनाम कोलकाता | मैच 22</div>

            	<div className="place">
                    <p>एमए चिदंबरम स्टेडियम, चेन्नई</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>चेन्नई सुपर किंग्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>कोलकाता नाइट राइडर्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow RCB LSG  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Wednesday<span> 15 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">बेंगलुरु बनाम लखनऊ | मैच 23</div>

            	<div className="place">
                    <p>एम.चिन्नास्वामी स्टेडियम, बेंगलुरू</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>रॉयल चैलेंजर्स बेंगलुरु</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>लखनऊ सुपर जायंट्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow MI PBKS  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Thursday<span> 16 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">मुंबई बनाम पंजाब | मैच 24</div>

            	<div className="place">
                    <p>वानखेड़े स्टेडियम, मुम्बई</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>मुंबई इंडियंस</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>पंजाब किंग्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow GT KKR  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Friday<span> 17 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">गुजरात बनाम कोलकाता | मैच 25</div>

            	<div className="place">
                    <p>नरेंद्र मोदी स्टेडियम, अहमदाबाद</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>गुजरात टाइटन्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>कोलकाता नाइट राइडर्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow RCB DC  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Saturday<span> 18 April</span></h3>
                  <p>03:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">बेंगलुरु बनाम दिल्ली | मैच 26</div>

            	<div className="place">
                    <p>एम.चिन्नास्वामी स्टेडियम, बेंगलुरू</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>रॉयल चैलेंजर्स बेंगलुरु</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>दिल्ली कैपिटल्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow SRH CSK  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Saturday<span> 18 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">हैदराबाद बनाम चेन्नई | मैच 27</div>

            	<div className="place">
                    <p>राजीव गांधी अंतर्राष्ट्रीय स्टेडियम, हैदराबाद</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>सनराइज़र्स हैदराबाद</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>चेन्नई सुपर किंग्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow KKR RR  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Sunday<span> 19 April</span></h3>
                  <p>03:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">कोलकाता बनाम राजस्थान | मैच 28</div>

            	<div className="place">
                    <p>ईडन गार्डन्स, कोलकाता</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>कोलकाता नाइट राइडर्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>राजस्थान रॉयल्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow PBKS LSG  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Sunday<span> 19 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">पंजाब बनाम लखनऊ | मैच 29</div>

            	<div className="place">
                    <p>न्यू अंतर्राष्ट्रीय क्रिकेट स्टेडियम, न्यू चंडीगढ़</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>पंजाब किंग्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>लखनऊ सुपर जायंट्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow GT MI  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Monday<span> 20 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">गुजरात बनाम मुंबई | मैच 30</div>

            	<div className="place">
                    <p>नरेंद्र मोदी स्टेडियम, अहमदाबाद</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>गुजरात टाइटन्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>मुंबई इंडियंस</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow SRH DC  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Tuesday<span> 21 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">हैदराबाद बनाम दिल्ली | मैच 31</div>

            	<div className="place">
                    <p>राजीव गांधी अंतर्राष्ट्रीय स्टेडियम, हैदराबाद</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>सनराइज़र्स हैदराबाद</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>दिल्ली कैपिटल्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow LSG RR  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Wednesday<span> 22 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">लखनऊ बनाम राजस्थान | मैच 32</div>

            	<div className="place">
                    <p>भारत रत्न श्री अटल बिहारी वाजपई एकाना क्रिकेट स्टेडियम, लखनऊ</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>लखनऊ सुपर जायंट्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>राजस्थान रॉयल्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow MI CSK  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Thursday<span> 23 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">मुंबई बनाम चेन्नई | मैच 33</div>

            	<div className="place">
                    <p>वानखेड़े स्टेडियम, मुम्बई</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>मुंबई इंडियंस</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>चेन्नई सुपर किंग्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow RCB GT  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Friday<span> 24 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">बेंगलुरु बनाम गुजरात | मैच 34</div>

            	<div className="place">
                    <p>एम.चिन्नास्वामी स्टेडियम, बेंगलुरू</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>रॉयल चैलेंजर्स बेंगलुरु</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>गुजरात टाइटन्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow DC PBKS  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Saturday<span> 25 April</span></h3>
                  <p>03:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">दिल्ली बनाम पंजाब | मैच 35</div>

            	<div className="place">
                    <p>अरुण जेटली स्टेडियम, दिल्ली</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>दिल्ली कैपिटल्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>पंजाब किंग्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow RR SRH  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Saturday<span> 25 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">राजस्थान बनाम हैदराबाद | मैच 36</div>

            	<div className="place">
                    <p>सवाई मानसिंह स्टेडियम, जयपुर</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>राजस्थान रॉयल्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>सनराइज़र्स हैदराबाद</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow CSK GT  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Sunday<span> 26 April</span></h3>
                  <p>03:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">चेन्नई बनाम गुजरात | मैच 37</div>

            	<div className="place">
                    <p>एमए चिदंबरम स्टेडियम, चेन्नई</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>चेन्नई सुपर किंग्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>गुजरात टाइटन्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow LSG KKR  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Sunday<span> 26 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">लखनऊ बनाम कोलकाता | मैच 38</div>

            	<div className="place">
                    <p>भारत रत्न श्री अटल बिहारी वाजपई एकाना क्रिकेट स्टेडियम, लखनऊ</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>लखनऊ सुपर जायंट्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>कोलकाता नाइट राइडर्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow DC RCB  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Monday<span> 27 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">दिल्ली बनाम बेंगलुरु | मैच 39</div>

            	<div className="place">
                    <p>अरुण जेटली स्टेडियम, दिल्ली</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>दिल्ली कैपिटल्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>रॉयल चैलेंजर्स बेंगलुरु</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow PBKS RR  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Tuesday<span> 28 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">पंजाब बनाम राजस्थान | मैच 40</div>

            	<div className="place">
                    <p>न्यू अंतर्राष्ट्रीय क्रिकेट स्टेडियम, न्यू चंडीगढ़</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>पंजाब किंग्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>राजस्थान रॉयल्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow MI SRH  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Wednesday<span> 29 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">मुंबई बनाम हैदराबाद | मैच 41</div>

            	<div className="place">
                    <p>वानखेड़े स्टेडियम, मुम्बई</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>मुंबई इंडियंस</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>सनराइज़र्स हैदराबाद</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow GT RCB  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Thursday<span> 30 April</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">गुजरात बनाम बेंगलुरु | मैच 42</div>

            	<div className="place">
                    <p>नरेंद्र मोदी स्टेडियम, अहमदाबाद</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>गुजरात टाइटन्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>रॉयल चैलेंजर्स बेंगलुरु</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow RR DC  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Friday<span> 01 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">राजस्थान बनाम दिल्ली | मैच 43</div>

            	<div className="place">
                    <p>सवाई मानसिंह स्टेडियम, जयपुर</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>राजस्थान रॉयल्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>दिल्ली कैपिटल्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow CSK MI  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Saturday<span> 02 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">चेन्नई बनाम मुंबई | मैच 44</div>

            	<div className="place">
                    <p>एमए चिदंबरम स्टेडियम, चेन्नई</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>चेन्नई सुपर किंग्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>मुंबई इंडियंस</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow SRH KKR  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Sunday<span> 03 May</span></h3>
                  <p>03:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">हैदराबाद बनाम कोलकाता | मैच 45</div>

            	<div className="place">
                    <p>राजीव गांधी अंतर्राष्ट्रीय स्टेडियम, हैदराबाद</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>सनराइज़र्स हैदराबाद</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>कोलकाता नाइट राइडर्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow GT PBKS  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Sunday<span> 03 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">गुजरात बनाम पंजाब | मैच 46</div>

            	<div className="place">
                    <p>नरेंद्र मोदी स्टेडियम, अहमदाबाद</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>गुजरात टाइटन्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>पंजाब किंग्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow MI LSG  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Monday<span> 04 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">मुंबई बनाम लखनऊ | मैच 47</div>

            	<div className="place">
                    <p>वानखेड़े स्टेडियम, मुम्बई</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>मुंबई इंडियंस</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>लखनऊ सुपर जायंट्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow DC CSK  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Tuesday<span> 05 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">दिल्ली बनाम चेन्नई | मैच 48</div>

            	<div className="place">
                    <p>अरुण जेटली स्टेडियम, दिल्ली</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>दिल्ली कैपिटल्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>चेन्नई सुपर किंग्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow SRH PBKS  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Wednesday<span> 06 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">हैदराबाद बनाम पंजाब | मैच 49</div>

            	<div className="place">
                    <p>राजीव गांधी अंतर्राष्ट्रीय स्टेडियम, हैदराबाद</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>सनराइज़र्स हैदराबाद</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>पंजाब किंग्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow LSG RCB  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Thursday<span> 07 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">लखनऊ बनाम बेंगलुरु | मैच 50</div>

            	<div className="place">
                    <p>भारत रत्न श्री अटल बिहारी वाजपई एकाना क्रिकेट स्टेडियम, लखनऊ</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>लखनऊ सुपर जायंट्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>रॉयल चैलेंजर्स बेंगलुरु</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow DC KKR  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Friday<span> 08 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">दिल्ली बनाम कोलकाता | मैच 51</div>

            	<div className="place">
                    <p>अरुण जेटली स्टेडियम, दिल्ली</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>दिल्ली कैपिटल्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>कोलकाता नाइट राइडर्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow RR GT  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Saturday<span> 09 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">राजस्थान बनाम गुजरात | मैच 52</div>

            	<div className="place">
                    <p>सवाई मानसिंह स्टेडियम, जयपुर</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>राजस्थान रॉयल्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>गुजरात टाइटन्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow CSK LSG  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Sunday<span> 10 May</span></h3>
                  <p>03:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">चेन्नई बनाम लखनऊ | मैच 53</div>

            	<div className="place">
                    <p>एमए चिदंबरम स्टेडियम, चेन्नई</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>चेन्नई सुपर किंग्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>लखनऊ सुपर जायंट्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow RCB MI  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Sunday<span> 10 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">बेंगलुरु बनाम मुंबई | मैच 54</div>

            	<div className="place">
                    <p>शहीद वीर नारायण सिंह अंतरराष्ट्रीय स्टेडियम, रायपुर</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>रॉयल चैलेंजर्स बेंगलुरु</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>मुंबई इंडियंस</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow PBKS DC  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Monday<span> 11 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">पंजाब बनाम दिल्ली | मैच 55</div>

            	<div className="place">
                    <p>हिमाचल प्रदेश क्रिकेट एसोसिएशन स्टेडियम, धर्मशाला</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>पंजाब किंग्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>दिल्ली कैपिटल्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow GT SRH  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Tuesday<span> 12 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">गुजरात बनाम हैदराबाद | मैच 56</div>

            	<div className="place">
                    <p>नरेंद्र मोदी स्टेडियम, अहमदाबाद</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>गुजरात टाइटन्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>सनराइज़र्स हैदराबाद</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow RCB KKR  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Wednesday<span> 13 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">बेंगलुरु बनाम कोलकाता | मैच 57</div>

            	<div className="place">
                    <p>शहीद वीर नारायण सिंह अंतरराष्ट्रीय स्टेडियम, रायपुर</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>रॉयल चैलेंजर्स बेंगलुरु</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>कोलकाता नाइट राइडर्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow PBKS MI  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Thursday<span> 14 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">पंजाब बनाम मुंबई | मैच 58</div>

            	<div className="place">
                    <p>हिमाचल प्रदेश क्रिकेट एसोसिएशन स्टेडियम, धर्मशाला</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>पंजाब किंग्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>मुंबई इंडियंस</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow LSG CSK  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Friday<span> 15 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">लखनऊ बनाम चेन्नई | मैच 59</div>

            	<div className="place">
                    <p>भारत रत्न श्री अटल बिहारी वाजपई एकाना क्रिकेट स्टेडियम, लखनऊ</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>लखनऊ सुपर जायंट्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>चेन्नई सुपर किंग्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow KKR GT  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Saturday<span> 16 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">कोलकाता बनाम गुजरात | मैच 60</div>

            	<div className="place">
                    <p>ईडन गार्डन्स, कोलकाता</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>कोलकाता नाइट राइडर्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>गुजरात टाइटन्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow PBKS RCB  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Sunday<span> 17 May</span></h3>
                  <p>03:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">पंजाब बनाम बेंगलुरु | मैच 61</div>

            	<div className="place">
                    <p>हिमाचल प्रदेश क्रिकेट एसोसिएशन स्टेडियम, धर्मशाला</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>पंजाब किंग्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>रॉयल चैलेंजर्स बेंगलुरु</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow DC RR  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Sunday<span> 17 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">दिल्ली बनाम राजस्थान | मैच 62</div>

            	<div className="place">
                    <p>अरुण जेटली स्टेडियम, दिल्ली</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>दिल्ली कैपिटल्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>राजस्थान रॉयल्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow CSK SRH  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Monday<span> 18 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">चेन्नई बनाम हैदराबाद | मैच 63</div>

            	<div className="place">
                    <p>एमए चिदंबरम स्टेडियम, चेन्नई</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>चेन्नई सुपर किंग्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>सनराइज़र्स हैदराबाद</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow RR LSG  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Tuesday<span> 19 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">राजस्थान बनाम लखनऊ | मैच 64</div>

            	<div className="place">
                    <p>सवाई मानसिंह स्टेडियम, जयपुर</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>राजस्थान रॉयल्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>लखनऊ सुपर जायंट्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow KKR MI  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Wednesday<span> 20 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">कोलकाता बनाम मुंबई | मैच 65</div>

            	<div className="place">
                    <p>ईडन गार्डन्स, कोलकाता</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>कोलकाता नाइट राइडर्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>मुंबई इंडियंस</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow GT CSK  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Thursday<span> 21 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">गुजरात बनाम चेन्नई | मैच 66</div>

            	<div className="place">
                    <p>नरेंद्र मोदी स्टेडियम, अहमदाबाद</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>गुजरात टाइटन्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/chennai-super-kings.png" alt="चेन्नई सुपर किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>चेन्नई सुपर किंग्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow SRH RCB  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Friday<span> 22 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">हैदराबाद बनाम बेंगलुरु | मैच 67</div>

            	<div className="place">
                    <p>राजीव गांधी अंतर्राष्ट्रीय स्टेडियम, हैदराबाद</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>सनराइज़र्स हैदराबाद</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>रॉयल चैलेंजर्स बेंगलुरु</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow LSG PBKS  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Saturday<span> 23 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">लखनऊ बनाम पंजाब | मैच 68</div>

            	<div className="place">
                    <p>भारत रत्न श्री अटल बिहारी वाजपई एकाना क्रिकेट स्टेडियम, लखनऊ</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/lucknow-super-giants.png" alt="लखनऊ सुपर जायंट्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>लखनऊ सुपर जायंट्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/punjab-kings.png" alt="पंजाब किंग्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>पंजाब किंग्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow MI RR  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Sunday<span> 24 May</span></h3>
                  <p>03:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">मुंबई बनाम राजस्थान | मैच 69</div>

            	<div className="place">
                    <p>वानखेड़े स्टेडियम, मुम्बई</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/mumbai-indians.png" alt="मुंबई इंडियंस" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>मुंबई इंडियंस</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>राजस्थान रॉयल्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow KKR DC  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Sunday<span> 24 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">कोलकाता बनाम दिल्ली | मैच 70</div>

            	<div className="place">
                    <p>ईडन गार्डन्स, कोलकाता</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/kolkata-knight-riders.png" alt="कोलकाता नाइट राइडर्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>कोलकाता नाइट राइडर्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/delhi-capitals.png" alt="दिल्ली कैपिटल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>दिल्ली कैपिटल्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow RCB GT  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Tuesday<span> 26 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">बेंगलुरु बनाम गुजरात | क्वालिफायर 1</div>

            	<div className="place">
                    <p>हिमाचल प्रदेश क्रिकेट एसोसिएशन स्टेडियम, धर्मशाला</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>रॉयल चैलेंजर्स बेंगलुरु</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>गुजरात टाइटन्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow SRH RR  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Wednesday<span> 27 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">हैदराबाद बनाम राजस्थान | एलिमिनेटर</div>

            	<div className="place">
                    <p>न्यू अंतर्राष्ट्रीय क्रिकेट स्टेडियम, न्यू चंडीगढ़</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/sunrisers-hyderabad.png" alt="सनराइज़र्स हैदराबाद" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>सनराइज़र्स हैदराबाद</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>राजस्थान रॉयल्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow GT RR  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Friday<span> 29 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">गुजरात बनाम राजस्थान | क्वालिफायर 2</div>

            	<div className="place">
                    <p>न्यू अंतर्राष्ट्रीय क्रिकेट स्टेडियम, न्यू चंडीगढ़</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>गुजरात टाइटन्स</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/rajasthan-royals.png" alt="राजस्थान रॉयल्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>राजस्थान रॉयल्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    
    <figure className="figure_wrapper cshow RCB GT  group-"> 

							<a title="Matches">
				
			<div className="matchdate">
                <div>
                	                  <h3>Sunday<span> 31 May</span></h3>
                  <p>07:30 pm IST</p>                  
                </div>
            </div>

			
            <div className="Cri_upcoming_match">

            	<div className="matchName">बेंगलुरु बनाम गुजरात | फाइनल</div>

            	<div className="place">
                    <p>नरेंद्र मोदी स्टेडियम, अहमदाबाद</p>
                </div>

                <div className="matchinfo">
                    <div className="team">
                      <div className="team_logo">
                                                <img src="https://images.tv9hindi.com/images/large_flags/ipl/royal-challengers-bengaluru.png" alt="रॉयल चैलेंजर्स बेंगलुरु" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>रॉयल चैलेंजर्स बेंगलुरु</p>
                      </div>
                    </div>
                    <div className="team-divider">
                      <span>vs</span>
                    </div>
                    <div className="team">
                      <div className="team_logo">
                                                    <img src="https://images.tv9hindi.com/images/large_flags/ipl/gujarat-titans.png" alt="गुजरात टाइटन्स" height="32" width="32" />
                      </div>
                      <div className="teamScore">
                        <p>गुजरात टाइटन्स</p>
                      </div>
                    </div>
                </div>

            </div>
        </a>
    </figure>
 

    </div>

				

				
								
				            </div>
    </>
  );
}