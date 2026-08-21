import Image from "next/image";

export default function Money9HomeWidget({
  title,
  sectionUrl,
  dataConfig = {},
  items = [],
  section = {},
}) {
  const config = section?.data_config || dataConfig || {};

  const limit =
    section?.limit_count ||
    config?.limit_count ||
    6;

  const newsItems = Array.isArray(items) ? items : [];

  const logo =
    config.logo ||
    "https://images.money9live.com/wp-content/uploads/2024/08/logo.svg";

  const viewMoreUrl = config.cat5_url || sectionUrl || "#";

  const heading = title || section?.title_override || "";

  const getImage = (item) =>
    item?.image ||
    item?.thumbnail ||
    item?.thumb ||
    item?.image_url ||
    null;

  // 🔥 FLAT CATEGORY BUILDER
  const categories = [
    {
      url: config.cat1_url,
      label: config.cat1_label,
      icon: config.cat1_icon,
      active: true,
    },
    {
      url: config.cat2_url,
      label: config.cat2_label,
      icon: config.cat2_icon,
    },
    {
      url: config.cat3_url,
      label: config.cat3_label,
      icon: config.cat3_icon,
    },
    {
      url: config.cat4_url,
      label: config.cat4_label,
      icon: config.cat4_icon,
    },
  ].filter((c) => c.url && c.label);

  return (
    <>
      <div className="money9widget">
        {/* HEADER */}
        <div className="headWrap">
          <div className="logo_wrap">
            <a href={sectionUrl} target="_blank" rel="noopener noreferrer">
              <Image src={logo} alt="logo" width={50} height={50} unoptimized />
            </a>
          </div>

          {/* CATEGORIES (FLAT CMS) */}
          <div className="money9CateLink">
            {categories.map((cat, idx) => (
              <a
                key={idx}
                href={cat.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`cateLink ${cat.active ? "active" : ""}`}
              >
                {cat.icon && (
                  <svg>
                    <use xlinkHref={`tv9hindi-nextjs/images/icons.svg#${cat.icon}`}></use>
                  </svg>
                )}
                {cat.label}
              </a>
            ))}

            {/* MORE */}
            {config.cat5_url && (
              <a
                href={config.cat5_url}
                target="_blank"
                rel="noopener noreferrer"
                className="cateLink"
              >
                {config.cat5_label || "More"} <span className="more"></span>
              </a>
            )}
          </div>
        </div>

        {/* HEADING */}
        {heading?.trim() && (
          <div className="tv9common-heading">
            <h2 className="h2">
              <a href={viewMoreUrl}>{heading}</a>
            </h2>
          </div>
        )}

        {/* NEWS LIST */}
        <div className="money9NewsList">
          {newsItems.slice(0, limit).map((item, idx) => (
            <figure key={item.id || idx}>
              <a
                target="_blank"
                rel="nofollow noopener noreferrer"
                href={item.url}
                title={item.title}
                data-pos={idx + 1}
                data-widget="Money9 Live"
              >
                {getImage(item) && (
                  <div className="imgwrap">
                    <Image
                      src={getImage(item)}
                      alt={item.title}
                      width={320}
                      height={180}
                      loading="lazy"
                      unoptimized
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                )}

                <div className="card_title">
                  <h3 className="h3">{item.title}</h3>
                </div>
              </a>
            </figure>
          ))}
        </div>

        {/* VIEW MORE */}
        <a
          href={viewMoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="view_more"
        >
          View more
        </a>
      </div>

      <style jsx>{`
      .money9widget{background:#f5e4d5;border-radius:.75rem;padding:1.25rem;margin-bottom:1.25rem}
      .money9widget .headWrap{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem}
      .money9widget .headWrap .logo_wrap{display:block;height:56px;width:50px}
      .money9widget .headWrap .money9CateLink{display:flex;justify-content:flex-start;align-items:center;flex-wrap:wrap;border-bottom:1px solid #d3ad8b;padding-bottom:.5rem}
      .money9widget .headWrap .money9CateLink .cateLink{cursor:pointer;font-size:1rem;font-weight:500;color:#000;text-transform:capitalize;margin-right:1rem;display:flex;-webkit-tap-highlight-color:transparent;align-items:center;line-height:1.375rem}
      .money9widget .headWrap .money9CateLink .cateLink:last-child{margin-right:0}
      .money9widget .headWrap .money9CateLink .cateLink:hover{color:#b00020}
      .money9widget .headWrap .money9CateLink .cateLink:hover svg{fill:#b00020}
      .money9widget .headWrap .money9CateLink .cateLink svg{vertical-align:sub;margin-right:5px;width:1.875rem;height:1.875rem}
      .money9widget .headWrap .money9CateLink .cateLink .more{position:relative;width:8px;height:8px;margin-left:.3125rem}
      .money9widget .headWrap .money9CateLink .cateLink .more::after,.money9widget .headWrap .money9CateLink .cateLink .more::before{content:'';position:absolute;background-color:#000}
      .money9widget .headWrap .money9CateLink .cateLink:hover .more::after,.money9widget .headWrap .money9CateLink .cateLink:hover .more::before{background-color:#b00020}
      .money9widget .headWrap .money9CateLink .cateLink .more::before{top:50%;left:0;width:100%;height:2px;transform:translateY(-50%)}
      .money9widget .headWrap .money9CateLink .cateLink .more::after{top:0;left:50%;width:2px;height:100%;transform:translateX(-50%)}
      .money9widget .money9NewsList{display:flex;justify-content:flex-start;flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch}
      .money9widget .money9NewsList figure{position:relative;width:32.5%;margin-right:1rem;padding:0 .9375rem .9375rem;z-index:0}
      .money9widget .money9NewsList figure::after{content:"";background:#240006;position:absolute;bottom:0;left:0;right:0;height:189px;z-index:-1}
      .money9widget .money9NewsList figure:last-child{margin-right:0}
      .money9widget .money9NewsList .imgwrap{display:block;width:100%;aspect-ratio:16/9;margin-bottom:.9375rem;position:relative;overflow:hidden}
      .money9widget .money9NewsList .card_title .h3{font-size:1.125rem;line-height:1.625rem;font-weight:500;color:#fff;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;max-height:75px}
      .money9widget a.view_more{font-weight:400;font-size:.875rem;line-height:1.25rem;color:#000;text-transform:capitalize;border:1px solid #000;padding:5px 10px;border-radius:30px;display:block;margin:.9375rem auto 0;max-width:114px}
      .money9widget a.view_more::after{content:"⟶";margin-left:5px}
      @media (max-width:768px){
      .money9widget .headWrap .logo_wrap{height:40px;width:40px;margin-right:1.25rem}
      .money9widget .headWrap .money9CateLink{display:flex;flex-wrap:nowrap;overflow-x:auto;margin-top:1rem;width:calc(100% - 60px)}
      .money9widget .headWrap .money9CateLink .cateLink{flex:0 0 auto}
      .money9widget .headWrap .money9CateLink::-webkit-scrollbar{display:none}
      .money9widget .money9NewsList figure{width:64.5%;flex:0 0 auto}
      .money9widget .money9NewsList figure::after{height:145px}
      .money9widget .headWrap .money9CateLink .cateLink{font-size:.875rem}
      .money9widget .headWrap .money9CateLink .cateLink svg{height:1.375rem;width:1.375rem}
      }
      `}</style>
    </>
  );
}