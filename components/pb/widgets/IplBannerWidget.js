import Image from "next/image";
import PropTypes from "prop-types";

const DEFAULT_BANNER_URL =
  "https://static.malayalamtv9.com/uploads/2026/02/IPL-2026.jpg.jpeg";

const DEFAULT_NAV_ITEMS = [
  {
    label: "News",
    url: "https://www.malayalamtv9.com/sports/cricket-news/series/ipl",
    active: true,
  },
  {
    label: "Schedule",
    url: "https://www.malayalamtv9.com/sports/cricket-news/series/schedule/ipl-2026-13469",
  },
  {
    label: "Result",
    url: "https://www.malayalamtv9.com/sports/cricket-news/series/ipl/results",
  },
  {
    label: "Teams",
    url: "https://www.malayalamtv9.com/sports/cricket-news/series/ipl/teams",
  },
  {
    label: "Points Table",
    url: "https://www.malayalamtv9.com/sports/cricket-news/series/ipl/points-table",
  },
  {
    label: "Stats",
    url: "https://www.malayalamtv9.com/sports/cricket-news/series/ipl/orange-cap-holder",
  },
];

export default function IplBannerWidget({ dataConfig = {} }) {
  const bannerUrl = dataConfig.bannerUrl || DEFAULT_BANNER_URL;
  const bannerWidth = Number(dataConfig.bannerWidth) || 300;
  const bannerHeight = Number(dataConfig.bannerHeight) || 60;
  const bannerAlt = dataConfig.bannerAlt || "IPL 2026";

  const navItems =
    Array.isArray(dataConfig.nav_items) && dataConfig.nav_items.length > 0
      ? dataConfig.nav_items
      : DEFAULT_NAV_ITEMS;

  return (
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
        <Image
          width={bannerWidth}
          height={bannerHeight}
          src={bannerUrl}
          alt={bannerAlt}
          unoptimized
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <div className="sportsNav_Wrapper">
        {navItems.map((item, idx) => {
          const label = item?.label || item?.title || "";
          const url = item?.url || item?.link || "#";
          const isActive = Boolean(item?.active);

          if (!label) return null;

          return (
            <a
              key={item?.id || url || idx}
              href={url}
              className={isActive ? "active" : undefined}
            >
              {label}
            </a>
          );
        })}
      </div>
    </div>
  );
}

IplBannerWidget.propTypes = {
  dataConfig: PropTypes.shape({
    bannerUrl: PropTypes.string,
    bannerWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bannerHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bannerAlt: PropTypes.string,
    nav_items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string,
        link: PropTypes.string,
        active: PropTypes.bool,
      })
    ),
  }),
};
