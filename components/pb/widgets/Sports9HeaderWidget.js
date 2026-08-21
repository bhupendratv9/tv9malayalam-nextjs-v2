const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
import { useState } from "react";
import Image from "next/image";


const DEFAULT_LANGUAGES = [
  { label: "News9", url: "https://www.news9live.com/" },
  { label: "ಕನ್ನಡ", url: "https://tv9kannada.com/" },
  { label: "తెలుగు", url: "https://tv9telugu.com/" },
  { label: "मराठी", url: "https://www.tv9marathi.com/" },
  { label: "ગુજરાતી", url: "https://tv9gujarati.com/" },
  { label: "বাংলা", url: "https://tv9bangla.com/" },
  { label: "ਪੰਜਾਬੀ", url: "https://tv9punjabi.com/" },
  { label: "தமிழ்", url: "https://www.tv9tamilnews.com/" },
  { label: "മലയാളം", url: "https://www.malayalamtv9.com/" },
  { label: "मनी9", url: "https://www.money9live.com/" },
  { label: "TV9-UP", url: "https://www.tv9up.com/" },
];

const DEFAULT_NAV_ITEMS = [
  { label: "क्रिकेट", url: SITE_URL+"/sports/cricket-news" },
  { label: "फुटबॉल", url: SITE_URL+"/topic/football" },
  { label: "टेनिस", url: SITE_URL+"/topic/tennis" },
  { label: "बैडमिंटन", url: SITE_URL+"/topic/badminton" },
  { label: "हॉकी", url: SITE_URL+"/topic/hockey" },
  { label: "कबड्डी", url: SITE_URL+"/topic/kabaddi" },
  { label: "वेब\u00a0स्टोरी", url: SITE_URL+"/webstories/sports" },
  { label: "IPL", url: SITE_URL+"/sports/cricket-news/series/ipl" },
];

const DEFAULT_MEGA_MENU = [
  {
    label: "राज्य", url: SITE_URL+"/state", children: [
      { label: "राजस्थान", url: SITE_URL+"/state/rajasthan" },
      { label: "महाराष्ट्र", url: SITE_URL+"/state/maharashtra" },
      { label: "पंजाब", url: SITE_URL+"/state/punjab" },
      { label: "हरियाणा", url: SITE_URL+"/state/haryana" },
      { label: "मध्य प्रदेश", url: SITE_URL+"/state/madhya-pradesh" },
      { label: "छत्तीसगढ़", url: SITE_URL+"/state/chhattisgarh" },
      { label: "बिहार", url: SITE_URL+"/state/bihar" },
      { label: "उत्तर प्रदेश", url: SITE_URL+"/state/uttar-pradesh" },
      { label: "दिल्ली NCR", url: SITE_URL+"/state/delhi-ncr" },
    ],
  },
  { label: "राशिफल", url: SITE_URL+"/religion/rashiphal" },
  {
    label: "मनोरंजन", url: SITE_URL+"/entertainment", children: [
      { label: "बॉलीवुड", url: SITE_URL+"/entertainment/bollywood-news" },
      { label: "टीवी", url: SITE_URL+"/entertainment/television" },
      { label: "OTT", url: SITE_URL+"/entertainment/ott" },
      { label: "साउथ सिनेमा", url: SITE_URL+"/entertainment/south-cinema" },
    ],
  },
  { label: "दुनिया", url: SITE_URL+"/world" },
  {
    label: "Sports9", url: SITE_URL+"/sports", children: [
      { label: "क्रिकेट", url: SITE_URL+"/sports/cricket-news" },
      { label: "IPL", url: SITE_URL+"/sports/cricket-news/series/ipl" },
      { label: "फुटबॉल", url: SITE_URL+"/topic/football" },
      { label: "टेनिस", url: SITE_URL+"/topic/tennis" },
    ],
  },
  { label: "हेल्थ", url: SITE_URL+"/health" },
  { label: "लाइफस्\u200Dटाइल", url: SITE_URL+"/lifestyle" },
  { label: "वीडियो", url: SITE_URL+"/videos" },
  { label: "फोटो", url: SITE_URL+"/photo-gallery" },
  { label: "ट्रेंडिंग", url: SITE_URL+"/trending" },
  { label: "देश", url: SITE_URL+"/india" },
  { label: "टेक्नोलॉजी", url: SITE_URL+"/technology" },
  { label: "ऑटो", url: SITE_URL+"/automobile" },
  { label: "बिज़नेस", url: SITE_URL+"/business" },
  { label: "धर्म", url: SITE_URL+"/religion" },
  { label: "एजुकेशन", url: SITE_URL+"/education" },
];

export default function Sports9HeaderWidget({ dataConfig = {} }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const logoUrl = dataConfig.logo_url || "https://images.tv9hindi.com/images/sports9-logo.svg";
  const logoAlt = dataConfig.logo_alt || "Sports 9";
  const logoLink = dataConfig.logo_link || "/sports";
  const homeUrl = dataConfig.home_url || "/";
  const liveTvUrl = dataConfig.live_tv_url || "/live-tv";
  const languages = dataConfig.languages || DEFAULT_LANGUAGES;
  const navItems = dataConfig.nav_items || DEFAULT_NAV_ITEMS;
  const megaMenu = dataConfig.mega_menu || DEFAULT_MEGA_MENU;

  return (
    <>
      <header className="tv9_header sp9_header">
        {/* Language Bar */}
        <div className="language_menu">
          <div className="container">
            <a href={homeUrl} title="TV9 Hindi">
              <svg className="home_icon"><use xlinkHref="#ic_home"></use></svg>
            </a>
            {languages.map((lang, idx) => (
              <a
                key={idx}
                href={lang.url}
                title={lang.label}
                target="_blank"
                rel="nofollow noopener"
              >
                {lang.label}
              </a>
            ))}
          </div>
        </div>

        {/* Main Navbar */}
        <div className="tv9_navbar">
          <div className="container">
            <div className="sp9_logo">
              <a href={logoLink} title="Logo">
                <Image
                  src={logoUrl}
                  alt={logoAlt}
                  title={logoAlt}
                  width={45}
                  height={50}
                  unoptimized
                />
              </a>
            </div>

            <div className="sp9Navbar_Main">
              {navItems.map((item, idx) => (
                <a key={idx} href={item.url} title={item.label}>
                  {item.label}
                </a>
              ))}
            </div>

            <div className="tv9_navbarRHS">
              <a href={liveTvUrl} title="Live TV">
                <svg className="livetv_icon">
                  <use xlinkHref="#ic_livetv"></use>
                </svg>
              </a>

              {/* Hamburger */}
              <div
                title="Hamburger Menu"
                className="toggleNav"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="MenuBtn">
                  <i></i><i></i><i></i><i></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Category Navbar */}
        <div className="tv9_catnavbar onlyMobileADS">
          <div className="container">
            {navItems.map((item, idx) => (
              <a key={idx} href={item.url} title={item.label}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Mega Menu */}
        <div className={`menuNavigation${menuOpen ? " is-open" : ""}`}>
          <div className="container">
            <div className="megaMenu_Header">
              <div className="tv9_logo">
                <a href={homeUrl} title="Logo">
                  <Image
                    src="https://static.tv9hindi.com/images/TV9-Hindi-Logo.svg"
                    alt="TV9 Hindi"
                    title="TV9 Hindi"
                    width={47}
                    height={41}
                    unoptimized
                  />
                </a>
              </div>
              <div
                className="closeMenu"
                onClick={() => setMenuOpen(false)}
              >
                <svg className="close_icon">
                  <use xlinkHref="#close_menu"></use>
                </svg>
              </div>
            </div>
            <ul className="listItems">
              {megaMenu.map((item, idx) => (
                <li
                  key={idx}
                  className={item.children ? "hassubmenu" : ""}
                >
                  <a
                    className="catHead"
                    href={item.url}
                    title={item.label}
                    onClick={(e) => {
                      if (item.children) {
                        e.preventDefault();
                        setOpenSubmenu(openSubmenu === idx ? null : idx);
                      }
                    }}
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <ul className={`subItems${openSubmenu === idx ? " is-open" : ""}`}>
                      {item.children.map((child, cIdx) => (
                        <li key={cIdx}>
                          <a href={child.url} title={child.label}>
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <style jsx>{`
        .rhs-newsWidgets .commonstory .smallstory a {padding-bottom: 15px;margin-bottom: 15px;}
.ArticleBodyCont iframe[src*="youtube"], .ArticleBodyCont iframe[data-src*="youtube"],
.ArticleBodyCont iframe[src*="jwplayer"], .ArticleBodyCont iframe[data-src*="jwplayer"]{width: 100%;height: 100%;aspect-ratio:16/9}
.sp9_header .language_menu{background:#1a385d;border-color:#1a385d}
.sp9_header .language_menu a{color:#fff}
.sp9_header .language_menu a:first-child {font-weight: 700; }
.sp9_header .language_menu .home_icon{fill:#fff;width:19px;height:16px;vertical-align:text-top;}
.sp9_header .tv9_navbar{border-bottom:1px solid #ededed;margin-bottom:5px;}
.sp9_logo h1{display: none;}
.sp9_logo img{display:block;width:45px;height:50px;margin-right:10px}
.sp9Navbar_Main a{font-size:1rem;font-weight:500;margin:0 15px}
.breadcrumb{margin:10px 0}
.breadcrumb span{position:relative;font-weight:500;font-size:14px;line-height:22px;text-transform:capitalize;margin-right:3px}
.breadcrumb span a{color:#666}
.breadcrumb span::after{content:"";display:inline-block;width:6px;height:6px;border:solid #666;border-width:0 1px 1px 0;margin:-1px 0 0 3px;vertical-align:middle;-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-ms-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg)}
.breadcrumb span.breadcrumb_last::after{display:none}
.breadcrumb span.breadcrumb_last a{color:#000}
.sports_heading{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;margin-bottom:10px}
.sports_heading .h1{font-size:1.5rem;line-height:30px;font-weight:700;text-transform:capitalize;color:#471a81}
.sportsNav_Links{display:flex;flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;align-items:center;margin-bottom:5px}
.sportsNav_Links::-webkit-scrollbar{display:none}
.sportsNav_Links a{flex:0 0 auto;font-size:.875rem;line-height:20px;color:#4b4b4b;border:1px solid #d7d7d7;border-radius:50px;padding:5px 17px 3px 17px;margin-right:10px;display:block;text-transform:uppercase}
.sportsNav_Links a.active,.sportsNav_Links a:hover{color:#ff00a5;border-color:#ff00a5}
.Sports_TopNews{margin-bottom:20px}
.spTopNews_Listing{display:grid;grid-template-columns:repeat(4,1fr);grid-gap:20px}
.spTopNews_Listing figure:first-child{grid-row:1/3;grid-column:1/3}
.spTopNews_Listing figure:first-child .h3{font-size:1.5rem;font-weight:700;line-height:32px}
.spTopNews_Listing figure:first-child p{font-size:1rem;line-height:24px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.spTopNews_Listing .imgThumb img{display:block;width:100%;border-radius:8px;margin-bottom:10px}
.spTopNews_Listing .card_title .h3{font-size:1rem;font-weight:500;line-height:22px;color:#000;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.sportsTwoCol_Wrapper{display:flex;justify-content:flex-start;flex-wrap:wrap;margin-bottom:20px}
.left-column{width:calc(100% - 320px)}
.right-column{width:300px;margin-left:20px}
.specialStory_Wrapper{border-radius:8px;background:#1a385d;padding:20px;}
.specialStory_Wrapper .imgThumb img{margin-bottom:10px;border-radius:8px;border:2px solid rgba(255,255,255,.5);display:block;width:100%}
.specialStory_Wrapper .card_title .h3{font-size:1.125rem;font-weight:700;color:#fff;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.sports9_TagWrapper{margin-bottom:20px}
.sports9_TagWrapper{display:flex;flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;align-items:center}
.sports9_TagWrapper a{width:18.4%;margin-right:2%}
.sports9_TagWrapper a:last-child{margin-right:0}
.sports9_TagWrapper img{display:block;width:100%;border-radius:8px}
.sports_heading a.view_more{font-weight:700;font-size:.875rem;line-height:20px;color:#000;text-transform:capitalize}
.sports_heading a.view_more svg{width:13px;height:8px;margin-left:3px}
.sports9_Webstories{display:flex;flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;margin-bottom:20px}
.sports9_Webstories figure{position:relative;width:18.4%;margin-right:2%}
.sports9_Webstories figure:last-child{margin-right:0}
.sports9_Webstories .imgThumb img{border-radius:8px;border:1px solid #000;display:block;width:100%}
.sports9_Webstories .textgraint{padding:50% 10px 10px 10px;left:0;right:0;border-radius:0 0 8px 8px;position:absolute;bottom:0;background:linear-gradient(180deg,rgba(255,255,255,0) 26.39%,rgba(0,0,0,.88) 74.51%);display:flex;align-items:end;pointer-events:none}
.sports9_Webstories .icon_web{position:absolute;top:15px;right:15px}
.sports9_Webstories .icon_web svg{width:30px;height:30px}
.sports9_Webstories .textgraint .h3{color:#fff;font-weight:700;white-space:initial;font-size:1.125rem;line-height:26px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.sports9_VideoGallery{background:#000;color:#fff;padding:20px;margin-bottom:20px}
.sports9_VideoGallery .sports_heading .h1,.sports9_VideoGallery .sports_heading .h1 a,.sports9_VideoGallery .sports_heading a.view_more{color:#fff}
.sports9_VideoGallery a.view_more svg{fill:#fff}
.sp9VidGal_Wrapper{display:grid;grid-template-columns:repeat(4,1fr);grid-gap:20px}
.sp9VidGal_Wrapper figure:first-child{grid-row:1/3;grid-column:1/3}
.sp9VidGal_Wrapper .imgThumb{position:relative}
.sp9VidGal_Wrapper .imgThumb img{display:block;width:100%;border-radius:8px;margin-bottom:10px}
.sp9VidGal_Wrapper .sp9_vidIC{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex}
.sp9VidGal_Wrapper figure:first-child .sp9_vidIC svg{width:50px;height:52px}
.sp9VidGal_Wrapper .sp9_vidIC svg{width:30px;height:32px}
.sp9VidGal_Wrapper .card_title .h3{font-size:1rem;font-weight:600;line-height:24px;color:#fff;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.sp9VidGal_Wrapper figure:first-child .card_title .h3{font-size:1.75rem;font-weight:700;line-height:42px}
.sports9_YoutubeGallery{margin-bottom:20px;position:relative;padding:0 0 20px 0}
.sports9_YoutubeGallery::before{content:'';width:100%;height:193px;background:#fff1f2;position:absolute;bottom:0;left:0;z-index:-1}
.sp9YTGal_Wrapper{display:flex;flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;align-items:center;padding:0 20px}
.sp9YTGal_Wrapper figure{width:23.5%;margin-right:2%}
.sp9YTGal_Wrapper figure:last-child{margin-right:0}
.sp9YTGal_Wrapper .imgThumb{position:relative}
.sp9YTGal_Wrapper .imgThumb img{border-radius:8px 8px 0 0;width:100%;display:block}
.sp9YTGal_Wrapper .card_title{padding:10px;background-color:#fff;border-radius:0 0 8px 8px}
.sp9YTGal_Wrapper .card_title .h3{font-size:1rem;font-weight:600;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.sp9YTGal_Wrapper .sp9_ytIC{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex}
.sp9YTGal_Wrapper .sp9_ytIC svg{width:50px;height:50px}
.sports9_PhotoGallery{background:#00214a;color:#fff;padding:20px;margin-bottom:20px}
.sports9_PhotoGallery .sports_heading .h1,.sports9_PhotoGallery .sports_heading .h1 a,.sports9_PhotoGallery .sports_heading a.view_more{color:#fff}
.sports9_PhotoGallery a.view_more svg{fill:#fff}
.sp9PhotoGal_Wrapper{display:flex;flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;align-items:center}
.sp9PhotoGal_Wrapper figure{width:23.5%;margin-right:2%;border-radius:4px;background:#073976;padding:5px}
.sp9PhotoGal_Wrapper figure:last-child{margin-right:0}
.sp9PhotoGal_Wrapper .imgThumb{position:relative}
.sp9PhotoGal_Wrapper .imgThumb img{width:100%;display:block;border-radius:4px;margin-bottom:5px}
.sp9PhotoGal_Wrapper .photo-count{position:absolute;left:10px;bottom:10px;display:flex;align-items:center;color:#fff;font-size:.75rem;font-weight:500;line-height:1}
.sp9PhotoGal_Wrapper .photo-count svg{width:13px;height:13px;margin-right:5px}
.sp9PhotoGal_Wrapper .card_title{padding:5px}
.sp9PhotoGal_Wrapper .card_title .h3{font-size:1rem;font-weight:600;color:#fff;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.sp9TabNav_Wrapper{display:flex;flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;align-items:center;margin-bottom:20px}
.sp9TabNav_Wrapper figure{width:12.57%;margin-right:2%;border-radius:8px;border:1.5px solid #e9e9e9;background:#fff;text-align:center;padding:15px;cursor:pointer}
.sp9TabNav_Wrapper figure:last-child{margin-right:0}
.sp9TabNav_Wrapper .imgThumb{width:50px;height:50px;border:1px solid #e9e9e9;border-radius:100%;margin:0 auto 10px auto;display:flex;justify-content:center;align-items:center;background:#f9f9f9}
.sp9TabNav_Wrapper .imgThumb svg{width:27px;height:27px}
.sp9TabNav_Wrapper figure:hover{background:#f9f9f9}
.sp9TabNav_Wrapper figure:hover .imgThumb{background:#fff}
.sp9TabNav_Wrapper .card_title .h3{font-size:1.125rem;font-weight:500;line-height:32px}
.scrolltop{width:40px;height:40px;position:fixed;bottom:70px;right:15px;visibility:hidden;background-color:#1a385d;z-index:1;text-align:center;cursor:pointer;border-radius:50%}
.scrolltop:after{border-bottom-style:solid;border-bottom-width:2px;border-right-style:solid;border-right-width:2px;content:"";display:inline-block;height:12px;width:12px;border-color:#fff;-moz-transform:rotate(225deg);-ms-transform:rotate(225deg);-webkit-transform:rotate(225deg);transform:rotate(225deg);margin-top:16px}
@media(max-width:767px){
.sp9Navbar_Main{display:none}
.ListingPage_Wrapper.category-landing .sports_heading .h1,.ListingPage_Wrapper.subcategory .sports_heading .h1{margin-bottom:10px}
.left-column,.right-column{width:100%}
.right-column{margin-left:0;}
.spTopNews_Listing{grid-template-columns:auto}
.spTopNews_Listing figure:first-child{grid-column:auto;grid-row:auto}
.spTopNews_Listing figure a{display:flex;flex-direction:row-reverse}
.spTopNews_Listing figure:first-child a{display:grid}
.spTopNews_Listing .imgThumb{width:100px;margin-left:10px}
.spTopNews_Listing .card_title{width:calc(100% - 110px)}
.spTopNews_Listing figure:first-child .imgThumb{width:100%;margin-left:0}
.spTopNews_Listing figure:first-child .card_title{width:100%}
.spTopNews_Listing .imgThumb img{border-radius:4px;margin-bottom:0}
.spTopNews_Listing figure:first-child .imgThumb{margin-bottom:10px}
.spTopNews_Listing figure:first-child .h3{margin-bottom:10px}
.sports9_TagWrapper a{width:80%;margin-right:4%;flex:0 0 auto}
.sports9_TagWrapper::-webkit-scrollbar{display:none}
.sports9_Webstories figure{width:80%;margin-right:4%;flex:0 0 auto}
.sports9_Webstories::-webkit-scrollbar{display:none}
.sports9_VideoGallery{padding:15px}
.sp9VidGal_Wrapper{display:flex;flex-wrap:wrap;justify-content:space-between}
.sp9VidGal_Wrapper figure{width:46%}
.sp9VidGal_Wrapper figure:first-child{width:100%}
.sp9VidGal_Wrapper figure:first-child .imgThumb{width:100%;margin-bottom:10px}
.sp9VidGal_Wrapper .imgThumb img{border-radius:4px}
.sp9VidGal_Wrapper figure:first-child .card_title{width:100%}
.sp9YTGal_Wrapper figure{width:80%;margin-right:4%;flex:0 0 auto}
.sp9YTGal_Wrapper::-webkit-scrollbar{display:none}
.sports9_PhotoGallery{padding:15px}
.sp9PhotoGal_Wrapper figure{width:80%;margin-right:4%;flex:0 0 auto}
.sp9PhotoGal_Wrapper::-webkit-scrollbar{display:none}
.sp9TabNav_Wrapper figure{width:45%;margin-right:4%;flex:0 0 auto}
.sp9TabNav_Wrapper::-webkit-scrollbar{display:none}
.sp9_header .tv9_navbar{margin-bottom:0;}
.sp9_header .tv9_catnavbar{margin-bottom:5px;}
}
      `}</style>
    </>
  );
}
