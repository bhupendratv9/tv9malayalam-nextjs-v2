import AppLink from "@/components/AppLink";
import Image from "next/image";
import styles from "./HomeTopNews.module.css";
import { getHref, decodeHtml } from "@/lib/helper/commonHelper";
import { getImg, getLink } from "@/lib/helper/widgetHelper";
import { ICONS_SVG } from "@/lib/constants";
import { useAdsEnabled } from "@/lib/helper/adsHelper";

function getPostFormat(item, override) {
  if (override) return override;
  return String(item?.post_format || "post").toLowerCase();
}

function ThumbnailIcon({ item, format }) {
  const postFormat = getPostFormat(item, format);

  if (postFormat === "video") {
    return (
      <span className={styles.icon_BG}>
        <svg><use href={`${ICONS_SVG}#v_icon`}></use></svg>
      </span>
    );
  }

  if (postFormat === "photo" || postFormat === "gallery" || postFormat === "photo-gallery") {
    return (
      <span className={styles.icon_BG}>
        <svg><use href={`${ICONS_SVG}#p_icon`}></use></svg>
      </span>
    );
  }

  return null;
}

function LiveBlink({ item, format }) {
  const postFormat = getPostFormat(item, format);

  if (postFormat !== "live-blog") return null;

  return (
    <i
      className="blinker"
      style={{
        animation: item?.is_live === true ? undefined : "none",
      }}
    ></i>
  );
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
  latestNewsItems = [],
  photoGalleryItems = [],
}) {
  // ─── Config flags ───
  const globalAdsEnabled = useAdsEnabled();
  const showTitle = dataConfig.show_title === "1";
  const titleText = decodeHtml(dataConfig.title_text || title || "");
  const titleUrl = dataConfig.title_url ? getLink({ url: dataConfig.title_url }) : "";
  const showVideos = dataConfig.show_videos !== "0";
  const videoTitle = dataConfig.video_title || "லேட்டஸ்ட் வீடியோ";
  const showLiveTv = dataConfig.show_live_tv !== "0";
  const liveTvUrl = dataConfig.live_tv_url || "";
  const showLiveblog = dataConfig.show_liveblog !== "0";
  const showAds = globalAdsEnabled && dataConfig.show_ads !== "0";
  const desktopAdId = dataConfig.desktop_ad_id || "desktop_rhs_sidebar_1";
  const mobileAdId = dataConfig.mobile_ad_id || "mobile_masterhead_300x250";
  const col1Count = Number(dataConfig.col1_count || 6);

  // Column 3 config
  const showLatestNews = dataConfig.show_latest_news !== "0";
  const latestNewsTitle = decodeHtml(dataConfig.latest_news_title || "சமீபத்திய செய்திகள்");
  const latestNewsUrl = dataConfig.latest_news_url || "/latest-news";

  // Column 4 config
  const showPhotoGallery = dataConfig.show_photo_gallery !== "0";
  const photoGalleryTitle = decodeHtml(dataConfig.photo_gallery_title || "போட்டோ கேலரி");
  const photoGalleryUrl = dataConfig.photo_gallery_url || "/photo-gallery";

  // ─── Data splits ───
  const safeItems = Array.isArray(items) ? items : [];
  const colOneItems = safeItems.slice(0, col1Count);
  const colTwoItems = safeItems.slice(col1Count);
  const colThreeVideos = Array.isArray(videoItems) ? videoItems : [];
  const safeLiveblog = Array.isArray(liveblogItems) ? liveblogItems : [];
  const safeLatestNews = Array.isArray(latestNewsItems) ? latestNewsItems : [];
  const safePhotoGallery = Array.isArray(photoGalleryItems) ? photoGalleryItems : [];

  return (
    <div className="container">
      {/* Optional H1 Title */}
      {showTitle && titleText && (
        <div className="tv9common_heading">
          <h1 className="h2">
            {titleUrl ? <AppLink href={titleUrl} title={titleText}>{titleText}</AppLink> : titleText}
          </h1>
        </div>
      )}

      <div className={styles.homepageTop_Widget}>

        {/* ─── Column 1: Main News ─── */}
        <div className={`${styles.widgetColumns} ${styles.colOne}`}>
          <div className={styles.newsColumn}>
            {colOneItems.map((item, idx) => {
              const img = getImg(item, idx === 0 ? 320 : 140);
              const itemTitle = decodeHtml(item.title || item.post_title || "");
              const link = getLink(item);

              if (!itemTitle) return null;

              return (
                <figure key={item.id || item.post_id || idx}>
                  <AppLink href={link} title={itemTitle}>
                    {img && (
                      <div className={styles.imgThumb}>
                        <Image
                          width={320}
                          height={180}
                          src={img}
                          alt={itemTitle}
                          preload={idx === 0}
                          fetchPriority={idx === 0 ? "high" : "auto"}
                          loading={idx === 0 ? "eager" : "lazy"}
                        />
                        <ThumbnailIcon item={item} />
                      </div>
                    )}
                    <div className={styles.card_title}>
                      {idx === 0 ? <h1 className={styles.h3}>{itemTitle}</h1> : <div className={styles.h3}><LiveBlink item={item} />{itemTitle}</div>}
                    </div>
                  </AppLink>
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
        <div className={`${styles.widgetColumns} ${styles.colTwo}`}>
          <div className={styles.newsColumn}>
            {colTwoItems.map((item, idx) => {
              const img = getImg(item, 140);
              const itemTitle = decodeHtml(item.title || item.post_title || "");
              const link = getLink(item);

              return (
                <figure key={item.id || item.post_id || idx}>
                  <AppLink href={link} title={itemTitle}>
                    {img && (
                      <div className={styles.imgThumb}>
                        <Image width={320} height={180} src={img} alt={itemTitle} unoptimized />
                        <ThumbnailIcon item={item} />
                      </div>
                    )}
                    <div className={styles.card_title}>
                      <div className={styles.h3}><LiveBlink item={item} />{itemTitle}</div>
                    </div>
                  </AppLink>
                </figure>
              );
            })}
          </div>
        </div>

        {/* ─── Column 3: Latest News ─── */}
        <div className={`${styles.widgetColumns} ${styles.colThree}`}>
          {showLiveTv && liveTvUrl && (
            <div className={styles.liveTvWebbx}>
              <h2>
                <AppLink href={getHref("/live-tv")}>
                  <svg width="22" height="23"><use href={`${ICONS_SVG}#ic_livetv`}></use></svg>
                  LIVE TV
                </AppLink>
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
            <div className={styles.newsColumn}>
              <div className={styles.tv9common_heading}>
                <h2 className={styles.h2}>
                  <AppLink href={getHref("/videos")}>{videoTitle}</AppLink>
                </h2>
              </div>
              {colThreeVideos.map((item, idx) => {
                const img = getImg(item, 140);
                const itemTitle = decodeHtml(item.title || item.post_title || "");
                const link = getLink(item);

                return (
                  <figure key={item.id || item.post_id || `v-${idx}`}>
                    <AppLink href={link} title={itemTitle}>
                      {img && (
                        <div className={styles.imgThumb}>
                          <Image width={320} height={180} src={img} alt={itemTitle} unoptimized />
                          <ThumbnailIcon format="video" />
                        </div>
                      )}
                      <div className={styles.card_title}>
                        <div className={styles.h3}><LiveBlink item={item} />{itemTitle}</div>
                      </div>
                    </AppLink>
                  </figure>
                );
              })}
            </div>
          )}

          {showLatestNews && safeLatestNews.length > 0 && (
            <div className={styles.newsColumn}>
              <div className={styles.tv9common_heading}>
                <h2 className={styles.h2}>
                  <AppLink href={getHref(latestNewsUrl)}>{latestNewsTitle}</AppLink>
                </h2>
              </div>
              {safeLatestNews.map((item, idx) => {
                const img = getImg(item, 140);
                const itemTitle = decodeHtml(item.title || item.post_title || "");
                const link = getLink(item);

                return (
                  <figure key={item.id || item.post_id || `ln-${idx}`}>
                    <AppLink href={link} title={itemTitle}>
                      {img && (
                        <div className={styles.imgThumb}>
                          <Image width={320} height={180} src={img} alt={itemTitle} unoptimized />
                          <ThumbnailIcon item={item} />
                        </div>
                      )}
                      <div className={styles.card_title}>
                        <div className={styles.h3}><LiveBlink item={item} />{itemTitle}</div>
                      </div>
                    </AppLink>
                  </figure>
                );
              })}
            </div>
          )}
        </div>

        {/* ─── Column 4: Ads + Photo Gallery ─── */}
        <div className={`${styles.widgetColumns} ${styles.colFour}`}>
          {showAds && (
            <div className="adsCont onlyWebADS">
              <div id={desktopAdId}></div>
            </div>
          )}

          {showLiveblog && safeLiveblog.length > 0 && (
            <div className={styles.rhsLiveblog_Wrapper}>
              <div className={styles.tv9common_heading}>
                <div className={styles.live_blog_post}><i className={styles.blinker}></i>Live</div>
              </div>
              <div className={styles.liveBlog_Wrapper}>
                <AppLink href={getLink(safeLiveblog[0])}>
                  <span className={styles.h3}>{decodeHtml(safeLiveblog[0]?.title || "")}</span>
                </AppLink>
                <ul className={styles.liveBlog_list}>
                  {safeLiveblog.slice(0, 5).map((item, idx) => (
                    <li className={styles.liveBlog_list_post} key={item.id || item.post_id || idx}>
                      <div className={styles.timestamp}>
                        <span className={styles.blog_time}>{item.date || item.publish_date || item.created_gmt || ""}</span>
                      </div>
                      <div className={styles.h3}>{decodeHtml(item.title || item.post_title || "")}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {showPhotoGallery && safePhotoGallery.length > 0 && (
            <div className={styles.newsColumn}>
              <div className={styles.tv9common_heading}>
                <h2 className={styles.h2}>
                  <AppLink href={getHref(photoGalleryUrl)}>{photoGalleryTitle}</AppLink>
                </h2>
              </div>
              {safePhotoGallery.map((item, idx) => {
                const img = getImg(item, 140);
                const itemTitle = decodeHtml(item.title || item.post_title || "");
                const link = getLink(item);

                return (
                  <figure key={item.id || item.post_id || `pg-${idx}`}>
                    <AppLink href={link} title={itemTitle}>
                      {img && (
                        <div className={styles.imgThumb}>
                          <Image width={320} height={180} src={img} alt={itemTitle} unoptimized />
                          <ThumbnailIcon format="photo" />
                        </div>
                      )}
                      <div className={styles.card_title}>
                        <div className={styles.h3}><LiveBlink item={item} />{itemTitle}</div>
                      </div>
                    </AppLink>
                  </figure>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}