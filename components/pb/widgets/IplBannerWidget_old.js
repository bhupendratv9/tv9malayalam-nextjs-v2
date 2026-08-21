import Image from "next/image";

export default function IplBannerWidget() {
  return (
    <>
      <div className="sports_bannerwrap">
        <style>{`
          .sports_bannerwrap{display:flex;justify-content:space-between}
          .sportsNav_Wrapper{display:flex;flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;align-items:center;padding:10px}
          .sportsNav_Wrapper::-webkit-scrollbar{display:none}
          .sportsNav_Wrapper a{flex:0 0 auto;font-size:.875rem;line-height:20px;color:#4b4b4b;border:1px solid #d7d7d7;border-radius:50px;padding:5px 17px 3px 17px;margin-right:5px;display:block;text-transform:uppercase}
          .sportsNav_Wrapper a.active,.sportsNav_Wrapper a:hover{color:#ff00a5;border-color:#ff00a5}
          @media(min-width:1000px){.sportsNav_Wrapper{padding:0px}}
        `}</style>
    <div className="bannerImg">
        <Image width="300" height="60" src="https://static.malayalamtv9.com/uploads/2026/02/IPL-2026.jpg.jpeg" alt="IPL 2026" />
    </div>

    <div className="sportsNav_Wrapper">
        <a href="https://www.malayalamtv9.com/sports/cricket-news/series/ipl" className="active">News</a>
        <a href="https://www.malayalamtv9.com/sports/cricket-news/series/schedule/ipl-2026-13469">Schedule</a>
        <a href="https://www.malayalamtv9.com/sports/cricket-news/series/ipl/results">Result</a>
        <a href="https://www.malayalamtv9.com/sports/cricket-news/series/ipl/teams">Teams</a>
        <a href="https://www.malayalamtv9.com/sports/cricket-news/series/ipl/points-table">Points Table</a>

          <a href="https://www.malayalamtv9.com/sports/cricket-news/series/ipl/orange-cap-holder">Stats</a> 
    </div>
</div>
    </>
  );
}