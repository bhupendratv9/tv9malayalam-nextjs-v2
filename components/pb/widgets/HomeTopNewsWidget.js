import Image from "next/image";
import { getHref, decodeHtml } from "@/lib/helper/commonHelper";

function getImg(item) {
  return item?.thumbnail || item?.image || item?.thumb || item?.image_url || item?.featured_image || "";
}

function getLink(item) {
  const url = item?.permalink || item?.url || item?.link || "#";
  return getHref(url);
}

/**
 * HomeTopNewsWidget
 *
 * dataConfig options:
 *   - show_title       : "1" | "0" (default "0") — show H1 title
 *   - title_text       : Custom title text
 *   - title_url        : Title link
 *   - show_videos      : "1" | "0" (default "1") — show latest videos
 *   - video_title      : Video section heading (default "लेटेस्ट वीडियो")
 *   - show_live_tv     : "1" | "0" (default "1") — show live TV iframe
 *   - live_tv_url      : Live TV iframe URL
 *   - show_liveblog    : "1" | "0" (default "1") — show liveblog in col4
 *   - show_ads         : "1" | "0" (default "1") — show ad slots
 *   - desktop_ad_id    : Desktop ad div ID
 *   - mobile_ad_id     : Mobile ad div ID
 *   - col1_count       : Items in col1 (default 6)
 */
export default function HomeTopNewsWidget({
  title = "",
  items = [],
  dataConfig = {},
  videoItems = [],
  liveblogItems = [],
}) {
  // ─── Config flags ───
  const showTitle = dataConfig.show_title === "1";
  const titleText = decodeHtml(dataConfig.title_text || title || "");
  const titleUrl = dataConfig.title_url ? getLink({ url: dataConfig.title_url }) : "";
  const showVideos = dataConfig.show_videos !== "0";
  const videoTitle = dataConfig.video_title || "लेटेस्ट वीडियो";
  const showLiveTv = dataConfig.show_live_tv !== "0";
  const liveTvUrl = dataConfig.live_tv_url || "";
  const showLiveblog = dataConfig.show_liveblog !== "0";
  const showAds = dataConfig.show_ads !== "0";
  const desktopAdId = dataConfig.desktop_ad_id || "desktop_rhs_sidebar_1";
  const mobileAdId = dataConfig.mobile_ad_id || "mobile_masterhead_300x250";
  const col1Count = Number(dataConfig.col1_count || 6);

  // ─── Data splits ───
  const safeItems = Array.isArray(items) ? items : [];
  const colOneItems = safeItems.slice(0, col1Count);
  const colTwoItems = safeItems.slice(col1Count);
  const colThreeVideos = Array.isArray(videoItems) ? videoItems : [];
  const safeLiveblog = Array.isArray(liveblogItems) ? liveblogItems : [];

  return (
    <>
      <div className="homepageTop_Widget">
        {/* Optional H1 Title */}
        {showTitle && titleText && (
          <div className="tv9common-heading homeTopHD">
            <h1 className="h2">
              {titleUrl ? <a href={titleUrl} title={titleText}>{titleText}</a> : titleText}
            </h1>
          </div>
        )}

        {/* ─── Column 1: Main News ─── */}
        <div className="widgetColumns colOne">
          <div className="newsColumn">
            {colOneItems.map((item, idx) => {
              const img = getImg(item);
              const itemTitle = decodeHtml(item.title || item.post_title || "");
              const link = getLink(item);

              if (!itemTitle) return null;

              return (
                <figure key={item.id || item.post_id || idx}>
                  <a href={link} title={itemTitle}>
                    {img && (
                      <div className="imgThumb">
                        <Image
                          width={320}
                          height={180}
                          src={img}
                          alt={itemTitle}
                          unoptimized
                          {...(idx === 0 ? { priority: true } : {})}
                        />
                      </div>
                    )}
                    <div className="card_title">
                      {idx === 0 ? <h1 className="h3">{itemTitle}</h1> : <h3 className="h3">{itemTitle}</h3>}
                    </div>
                  </a>
                </figure>
              );
            })}
            {showAds && (
              <div className="adsCont onlyMobileADS">
                <div id={mobileAdId}></div>
              </div>
            )}
          </div>
        </div>

        {/* ─── Column 2: More News ─── */}
        <div className="widgetColumns colTwo">
          <div className="newsColumn">
            {colTwoItems.map((item, idx) => {
              const img = getImg(item);
              const itemTitle = decodeHtml(item.title || item.post_title || "");
              const link = getLink(item);

              return (
                <figure key={item.id || item.post_id || idx}>
                  <a href={link} title={itemTitle}>
                    {img && (
                      <div className="imgThumb">
                        <Image width={320} height={180} src={img} alt={itemTitle} unoptimized />
                      </div>
                    )}
                    <div className="card_title">
                      <h3 className="h3">{itemTitle}</h3>
                    </div>
                  </a>
                </figure>
              );
            })}
          </div>
        </div>

        {/* ─── Column 3: Live TV + Latest Videos ─── */}
        <div className="widgetColumns colThree">
          {showLiveTv && liveTvUrl && (
            <div className="liveTvWebbx">
              <h2>
                <a href={`${SITE_URL}/live-tv`}>
                  <svg width="22" height="23"><use href="#ic_livetv"></use></svg>
                  LIVE TV
                </a>
              </h2>
              <div id="liveTviframe">
                <iframe
                  id="vidgyor_iframe"
                  title="live tv"
                  src={liveTvUrl}
                  width="100%"
                  height="460"
                  allowFullScreen
                  allow="autoplay; fullscreen"
                  style={{ minWidth: "200px", border: "none" }}
                />
              </div>
            </div>
          )}

          {showVideos && colThreeVideos.length > 0 && (
            <div className="newsColumn">
              <div className="tv9common-heading">
                <h2 className="h2"><a href={`${SITE_URL}/videos`}>{videoTitle}</a></h2>
              </div>
              {colThreeVideos.map((item, idx) => {
                const img = getImg(item);
                const itemTitle = decodeHtml(item.title || item.post_title || "");
                const link = getLink(item);

                return (
                  <figure key={item.id || item.post_id || `v-${idx}`}>
                    <a href={link} title={itemTitle}>
                      {img && (
                        <div className="imgThumb">
                          <Image width={320} height={180} src={img} alt={itemTitle} unoptimized />
                          <span className="icon_Comn"><svg><use href="#v_icon"></use></svg></span>
                        </div>
                      )}
                      <div className="card_title">
                        <h3 className="h3">{itemTitle}</h3>
                      </div>
                    </a>
                  </figure>
                );
              })}
            </div>
          )}
        </div>

        {/* ─── Column 4: Ads + Live Blog ─── */}
        <div className="widgetColumns colFour">
          {showAds && (
            <div className="adsCont onlyWebADS">
              <div id={desktopAdId}></div>
            </div>
          )}

          {showLiveblog && safeLiveblog.length > 0 && (
            <div className="rhsLiveblog_Wrapper">
              <div className="tv9common-heading">
                <div className="live_blog_post"><i className="blinker"></i>Live</div>
              </div>
              <div className="liveBlog_Wrapper">
                <a href={getLink(safeLiveblog[0])}>
                  <span className="h3">{decodeHtml(safeLiveblog[0]?.title || "")}</span>
                </a>
                <ul className="liveBlog_list">
                  {safeLiveblog.slice(0, 5).map((item, idx) => (
                    <li className="liveBlog_list-post" key={item.id || item.post_id || idx}>
                      <div className="timestamp">
                        <span className="blog-time">{item.date || item.publish_date || item.created_gmt || ""}</span>
                      </div>
                      <h3 className="h3">{decodeHtml(item.title || item.post_title || "")}</h3>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .homeTopHD{grid-column:1/-1;margin-bottom:0}
        .homepageTop_Widget{display:grid;gap:0.94rem;grid-template-columns:1fr 1fr 1fr 300px;margin-bottom:1.875rem}
        .homepageTop_Widget .newsColumn{position:sticky;top:0;display:flex;justify-content:space-between;flex-wrap:wrap}
        .homepageTop_Widget .newsColumn figure{margin-bottom:.625rem;padding-bottom:.625rem;border-bottom:1px solid #d7d7d7;width:100%}
        .homepageTop_Widget .colOne .newsColumn figure:first-child{margin-bottom:0;border-bottom:0}
        .homepageTop_Widget .newsColumn figure:last-child{padding-bottom:0;border-bottom:none;margin-bottom:0}
        .homepageTop_Widget .newsColumn figure a{display:grid;grid-template-columns:1fr 90px;gap:10px}
        .homepageTop_Widget .newsColumn .imgThumb{order:2;position:relative;overflow:hidden;display:block;aspect-ratio:16/9;width:100%;border-radius:4px}
        .homepageTop_Widget .newsColumn .card_title .h3{font-size:.9375rem;font-weight:600;line-height:1.375rem;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:3;display:-webkit-box;-webkit-box-orient:vertical;margin:0}
        .homepageTop_Widget .colOne .newsColumn figure:first-child a{grid-template-columns:1fr}
        .homepageTop_Widget .colOne .newsColumn figure:first-child .imgThumb{order:unset}
        .homepageTop_Widget .colOne .newsColumn figure:first-child .card_title .h3{font-size:1.25rem;font-weight:700;line-height:1.875rem}
        .homepageTop_Widget .colOne .newsColumn figure:nth-of-type(2),.homepageTop_Widget .colOne .newsColumn figure:nth-of-type(3){width:48%}
        .homepageTop_Widget .colOne .newsColumn figure:nth-of-type(2) a,.homepageTop_Widget .colOne .newsColumn figure:nth-of-type(3) a{grid-template-columns:1fr}
        .homepageTop_Widget .colOne .newsColumn figure:nth-of-type(2) .imgThumb,.homepageTop_Widget .colOne .newsColumn figure:nth-of-type(3) .imgThumb{order:unset}
        .homepageTop_Widget .adsCont{height:300px}
        .homepageTop_Widget .newsColumn figure .icon_Comn{position:absolute;background:#e21b22;height:20px;width:24px;justify-content:center;border-radius:4px;left:0;bottom:0;display:flex;align-items:center}
        .homepageTop_Widget .newsColumn figure .icon_Comn svg{height:14px;width:14px;fill:#fff;margin:0}
        .rhsLiveblog_Wrapper .tv9common-heading:before{display:none}
        .rhsLiveblog_Wrapper .tv9common-heading .live_blog_post{font-size:0.875rem;text-transform:uppercase;line-height:15px;border-radius:20px;background:#dc0000;color:#fff;padding:5px 10px;display:flex;align-items:center;font-weight:500}
        .rhsLiveblog_Wrapper .tv9common-heading .live_blog_post .blinker{animation:pulse-white 2s infinite;background:#fff;box-shadow:0 0 0 0 #fff;height:8px;width:8px;border-radius:50%;margin:0 8px 0 0}
        .rhsLiveblog_Wrapper .liveBlog_Wrapper .h3{font-size:16px;font-weight:600}
        .rhsLiveblog_Wrapper .liveBlog_Wrapper .liveBlog_list{width:100%;margin-top:10px;padding-left:15px;max-height:200px;overflow-y:auto;position:relative}
        .rhsLiveblog_Wrapper .liveBlog_Wrapper .liveBlog_list::-webkit-scrollbar{width:4px}
        .rhsLiveblog_Wrapper .liveBlog_Wrapper .liveBlog_list::-webkit-scrollbar-track{background:#e9e9e9;border-radius:10px}
        .rhsLiveblog_Wrapper .liveBlog_Wrapper .liveBlog_list::-webkit-scrollbar-thumb{background:silver;border-radius:10px}
        .rhsLiveblog_Wrapper .liveBlog_Wrapper .liveBlog_list li{position:relative;padding-top:15px;border-bottom:1px solid #D7D7D7;list-style:none}
        .rhsLiveblog_Wrapper .liveBlog_Wrapper .liveBlog_list li:first-child{padding-top:0}
        .rhsLiveblog_Wrapper .liveBlog_Wrapper .liveBlog_list li:last-child{border-bottom:0}
        .rhsLiveblog_Wrapper .liveBlog_Wrapper .liveBlog_list li:before{content:"";border-left:2px dotted #D7D7D7;position:absolute;top:3px;left:-12px;width:1px;height:100%}
        .rhsLiveblog_Wrapper .liveBlog_Wrapper .liveBlog_list li::after{content:"";width:7px;height:7px;position:absolute;top:17px;left:-14px;border-radius:10px;background:#dc0000}
        .rhsLiveblog_Wrapper .liveBlog_Wrapper .liveBlog_list li .h3{margin-bottom:10px;font-size:15px;line-height:24px;font-weight:500}
        .rhsLiveblog_Wrapper .liveBlog_Wrapper .liveBlog_list .timestamp span{color:#666;font-size:13px;line-height:1;font-weight:300;margin-bottom:10px;display:block}
        @media screen and (max-width:767px){
          .homepageTop_Widget{grid-template-columns:1fr}
          .rhsLiveblog_Wrapper .liveBlog_Wrapper .liveBlog_list{max-height:max-content}
        }
      `}</style>
    </>
  );
}
