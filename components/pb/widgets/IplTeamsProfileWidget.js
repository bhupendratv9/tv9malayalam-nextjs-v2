import Image from "next/image";

export default function IplTeamsProfileWidget() {
  return (
    <>
      <style>{`
        .CplayersWrapper{margin-bottom:20px}
        .CplayersWrapper .Cplayer_listing{display:flex;flex-wrap:wrap}
        .CplayersWrapper .Cplayer_listing figure{width:100%;background:#fff;border:1px solid #e7e7e7;box-shadow:0 0 6px rgba(84,86,101,.12);border-radius:14px;margin-bottom:15px;position:relative;overflow:hidden;z-index:0;padding:0px 10px}
        .CplayersWrapper .Cplayer_listing figure:before{content:'';background:#E5EFFC;height:100px;width:100px;border-radius:50%;position:absolute;left:-50px;bottom:0px;z-index:-1}
        .CplayersWrapper .Cplayer_listing figure a{display:flex;align-items:center;justify-content:flex-start;min-height:100px}
        .CplayersWrapper .Cplayer_listing figure .CplayerImg{height:53px;width:53px;flex:0 0 53px;margin-right:10px}
        .CplayersWrapper .Cplayer_listing figure .CplayerImg img{display:block;border-radius:50%;border:2px solid #EFEFF0;width:100%;background:#fff}
        .CplayersWrapper .Cplayer_listing figure h3{font-weight:600;font-size:17px;line-height:22px;color:#1A385D}
        .CplayersWrapper .Cplayer_listing figure .CplayerDetails{width:calc(100% - 63px)}
        .CplayersWrapper .Cplayer_listing figure .CplayerDetails span{font-weight:500;font-size:14px;line-height:18px;color:#000000;display:inline-block;padding:6px 0px}
        .CplayersWrapper .Cplayer_listing figure .CplayerDetails span:first-child{width:100%}
        .CplayersWrapper .Cplayer_listing figure .CplayerDetails span.playerAge{width:30%;border-right:none}
        @media(min-width:1000px){
          .CplayersWrapper .Cplayer_listing figure{width:32%;margin-bottom:20px;margin-right:2%}
          .CplayersWrapper .Cplayer_listing figure:nth-child(3n+3){margin-right:0}
        }
      `}</style>
     <div className="CplayersWrapper">
            	<div className="Cplayer_listing">
                    

				
				
				                    <figure>
						<a href="/sports/cricket-news/player-profile/virat-kohli-3993" title="Virat Kohli">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/virat-kohli-3993.jpg" alt="Virat Kohli" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>विराट कोहली </h3>
						    <span>राईट हैंडेड बल्लेबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/josh-hazlewood-4255" title="Josh Hazlewood">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/josh-hazlewood-4255.jpg" alt="Josh Hazlewood" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>जोश हेजलवुड </h3>
						    <span>राईट-आर्म फ़ास्ट मीडियम गेंदबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/swapnil-singh-4602" title="Swapnil Singh">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/swapnil-singh-4602.jpg" alt="Swapnil Singh" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>स्वप्निल सिंह </h3>
						    <span>राईट हैंडेड बल्लेबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/bhuvneshwar-kumar-5132" title="Bhuvneshwar Kumar">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/bhuvneshwar-kumar-5132.jpg" alt="Bhuvneshwar Kumar" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>भुवनेश्वर कुमार </h3>
						    <span>राईट-आर्म मीडियम गेंदबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/jacob-duffy-57672" title="Jacob Duffy">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/jacob-duffy-57672.jpg" alt="Jacob Duffy" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>जेकब डफी </h3>
						    <span>राईट-आर्म फ़ास्ट मीडियम गेंदबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/krunal-pandya-63788" title="Krunal Pandya">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/krunal-pandya-63788.jpg" alt="Krunal Pandya" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>क्रुणाल पंड्या </h3>
						    <span>लेफ्ट हैंडेड बल्लेबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/jitesh-sharma-64724" title="Jitesh Sharma">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/jitesh-sharma-64724.jpg" alt="Jitesh Sharma" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>जितेश शर्मा </h3>
						    <span>राईट हैंडेड बल्लेबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/venkatesh-iyer-65430" title="Venkatesh Iyer">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/venkatesh-iyer-65430.jpg" alt="Venkatesh Iyer" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>वेंकटेश अय्यर </h3>
						    <span>लेफ्ट हैंडेड बल्लेबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/richard-gleeson-65630" title="Richard Gleeson">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/richard-gleeson-65630.jpg" alt="Richard Gleeson" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>रिचर्ड ग्लीसन </h3>
						    <span>राईट-आर्म फ़ास्ट मीडियम गेंदबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/phil-salt-65632" title="Phil Salt">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/phil-salt-65632.jpg" alt="Phil Salt" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>फिल सॉल्ट </h3>
						    <span>राईट हैंडेड बल्लेबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/rajat-patidar-65687" title="Rajat Patidar">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/rajat-patidar-65687.jpg" alt="Rajat Patidar" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>रजत पाटीदार </h3>
						    <span>राईट हैंडेड बल्लेबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/nuwan-thushara-66158" title="Nuwan Thushara">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/nuwan-thushara-66158.jpg" alt="Nuwan Thushara" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>नुवान तुषारा </h3>
						    <span>राइट-आर्म मीडियम फ़ास्ट गेंदबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/romario-shepherd-66243" title="Romario Shepherd">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/romario-shepherd-66243.jpg" alt="Romario Shepherd" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>रोमारियो शेफर्ड </h3>
						    <span>राईट हैंडेड बल्लेबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/tim-david-67402" title="Tim David">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/tim-david-67402.jpg" alt="Tim David" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>टिम डेविड </h3>
						    <span>राईट हैंडेड बल्लेबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/devdutt-padikkal-67589" title="Devdutt Padikkal">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/devdutt-padikkal-67589.jpg" alt="Devdutt Padikkal" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>देवदत्त पडिक्कल </h3>
						    <span>लेफ्ट हैंडेड बल्लेबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/yash-dayal-70155" title="Yash Dayal">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/yash-dayal-70155.jpg" alt="Yash Dayal" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>यश दयाल </h3>
						    <span>लेफ्ट-आर्म मीडियम फ़ास्ट गेंदबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/rasikh-salam-70296" title="Rasikh Salam">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/rasikh-salam-70296.jpg" alt="Rasikh Salam" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>रसिख दार </h3>
						    <span>राईट-आर्म मीडियम गेंदबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/jordan-cox-70925" title="Jordan Cox">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/jordan-cox-70925.jpg" alt="Jordan Cox" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>जॉर्डन कॉक्स </h3>
						    <span>राईट हैंडेड बल्लेबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/vicky-ostwal-88543" title="Vicky Ostwal">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/vicky-ostwal-88543.jpg" alt="Vicky Ostwal" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>विकी ओस्तवाल </h3>
						    <span>स्लो लेफ़्ट-आर्म ऑर्थोडॉक्स गेंदबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/mangesh-yadav-99932" title="Mangesh Yadav">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/mangesh-yadav-99932.jpg" alt="Mangesh Yadav" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>मंगेश यादव </h3>
						    <span>लेफ्ट हैंडेड बल्लेबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/suyash-sharma-100564" title="Suyash Sharma">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/suyash-sharma-100564.jpg" alt="Suyash Sharma" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>सुयश शर्मा </h3>
						    <span>लेग ब्रेक गूगली गेंदबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/vihaan-malhotra-109339" title="Vihaan Malhotra">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/vihaan-malhotra-109339.jpg" alt="Vihaan Malhotra" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>विहान मल्होत्रा </h3>
						    <span>लेफ्ट हैंडेड बल्लेबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/abhinandan-singh-126643" title="Abhinandan Singh">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/abhinandan-singh-126643.jpg" alt="Abhinandan Singh" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>अभिनंदन सिंह </h3>
						    <span>राइट-आर्म मीडियम फ़ास्ट गेंदबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/kanishk-chouhan-133195" title="Kanishk Chouhan">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/kanishk-chouhan-133195.jpg" alt="Kanishk Chouhan" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>कनिष्क चौहान </h3>
						    <span>राईट हैंडेड बल्लेबाज</span>						  </div>
						</a>
					</figure>
                                        <figure>
						<a href="/sports/cricket-news/player-profile/satvik-deswal-134795" title="Satvik Deswal">
						  <div className="CplayerImg">
						  	<img src="https://images.tv9hindi.com/images/player_images/players/satvik-deswal-134795.jpg" alt="Satvik Deswal" height="45" width="45" />
						  </div>                  
						  <div className="CplayerDetails">
						    <h3>सात्विक देसवाल </h3>
						    <span>लेफ्ट हैंडेड बल्लेबाज</span>						  </div>
						</a>
					</figure>
                    					 
                    
                </div>
            </div>
    </>
  );
}