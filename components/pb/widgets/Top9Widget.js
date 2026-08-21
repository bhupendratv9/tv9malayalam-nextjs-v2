import Image from "next/image";
import { useEffect, useState } from "react";

function SafeImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}) {
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt || ""}
      width={width}
      height={height}
      className={className}
      priority={priority}
      unoptimized
      style={{
        width: "100%",
        height: "auto",
      }}
    />
  );
}

function ClientOnlyIframe({ src, className = "", style = {} }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !src) {
    return <div className={className} style={style} />;
  }

  return (
    <iframe
      src={src}
      className={className}
      style={style}
      loading="lazy"
      title="Live Score"
    />
  );
}

export default function HomepageTopWidget({
  title = "Main",
  items = [],
  videoTitle = "लेटेस्ट वीडियो",
  videoItems = [],
  liveScoreIframe = "https://e.tv9hindi.com/hi/tv9hindi/cricket/slider-v3",
  liveBlog = null,
  quizBanner = null,
}) {
  const safeItems = Array.isArray(items) ? items : [];
  const safeVideoItems = Array.isArray(videoItems) ? videoItems : [];

  const col1Big = safeItems[0] || null;
  const col1Small = safeItems.slice(1, 5);
  const col2Items = safeItems.slice(5, 13);
  const videos = safeVideoItems.slice(0, 6);

  return (
    <section className="homepageTop_Widget">
      <div className="columns col1">
        <div className="commonstory">
          {col1Big && (
            <figure className="bigstory">
              <a
                href={col1Big.permalink || col1Big.url || "#"}
                title={col1Big.title || ""}
                data-pos="1"
                data-widget={title}
                data-cid={col1Big.id || ""}
              >
                {(col1Big.thumbnail || col1Big.image) && (
                  <div className="imgThumb">
                    <SafeImage
                      src={col1Big.thumbnail || col1Big.image}
                      alt={col1Big.title || ""}
                      width={320}
                      height={180}
                      priority
                    />
                  </div>
                )}

                <div className="card_title">
                  <h1 className="h3">{col1Big.title || ""}</h1>
                </div>
              </a>
            </figure>
          )}

          <div className="adsCont onlyMobileADS">
            <div id="mobile_masterhead_300x250"></div>
          </div>

          {col1Small.map((item, idx) => (
            <figure className="smallstory" key={item.id || idx}>
              <a
                href={item.permalink || item.url || "#"}
                title={item.title || ""}
                data-pos={idx + 2}
                data-widget={title}
                data-cid={item.id || ""}
              >
                <div className="card_title">
                  <h3 className="h3">{item.title || ""}</h3>
                </div>

                {(item.thumbnail || item.image) && (
                  <div className="imgThumb">
                    <SafeImage
                      src={item.thumbnail || item.image}
                      alt={item.title || ""}
                      width={320}
                      height={180}
                    />
                  </div>
                )}
              </a>
            </figure>
          ))}

          {/* <figure className="liveScoreCard">
            <ClientOnlyIframe
              src={liveScoreIframe}
              className="autoResizeFrame"
              style={{
                width: "100%",
                border: 0,
                display: "block",
                height: "88px",
              }}
            />
          </figure> */}
        </div>
      </div>

      <div className="columns col2">
        <div className="commonstory">
          {col2Items.map((item, idx) => (
            <figure className="smallstory" key={item.id || idx}>
              <a
                href={item.permalink || item.url || "#"}
                title={item.title || ""}
                data-pos={idx + 6}
                data-widget={title}
                data-cid={item.id || ""}
              >
                <div className="card_title">
                  <h3 className="h3">{item.title || ""}</h3>
                </div>

                {(item.thumbnail || item.image) && (
                  <div className="imgThumb">
                    <SafeImage
                      src={item.thumbnail || item.image}
                      alt={item.title || ""}
                      width={90}
                      height={50}
                      className="lazy"
                    />
                  </div>
                )}
              </a>
            </figure>
          ))}
        </div>
      </div>

      <div className="columns col3">
        <div className="adsCont mobile">
          <div id="mobile_top_300x250"></div>
        </div>

          <div className="liveTvWebbx">
            <h2>
              <a href="https://www.tv9hindi.com/live-tv">
                <svg><use href="tv9hindi-nextjs/images/icons.svg#tv-icon"></use></svg>LIVE TV
              </a>
            </h2>
            <div id="liveTviframe">
              <iframe
                id="vidgyor_iframe"
                title="live tv"
                className="lazy"
                data-src="https://static.vidgyor.com/player/account/tv9/html/tv9_v12.html?videoId=fb2784828496c_live&accountId=62bafd8513ddad0009e72496&mute=1&piv=0&pip=0&pipconf=r,20,20,180,320,108,192&autoplay=1"
                src="https://static.vidgyor.com/player/account/tv9/html/tv9_v12.html?videoId=fb2784828496c_live&accountId=62bafd8513ddad0009e72496&mute=1&piv=0&pip=0&pipconf=r,20,20,180,320,108,192&autoplay=1"
                width="100%"
                height="460"
                allowFullScreen
                allow="autoplay; fullscreen"
                style={{ minWidth: "200px", border: "none" }}
              />
            </div>
          </div>

        <div className="commonstory">
          <div className="tv9common-heading">
            <h2 className="h2">
              <a href="/videos">{videoTitle}</a>
            </h2>
          </div>

          {videos.map((item, idx) => (
            <figure className="smallstory" key={item.id || idx}>
              <a
                href={item.permalink || item.url || "#"}
                title={item.title || ""}
                data-pos={idx + 1}
                data-widget={title}
                data-cid={item.id || ""}
              >
                <div className="card_title">
                  <h3 className="h3">{item.title || ""}</h3>
                </div>

                {(item.thumbnail || item.image) && (
                  <div className="imgThumb">
                    <SafeImage
                      src={item.thumbnail || item.image}
                      alt={item.title || ""}
                      width={320}
                      height={180}
                    />
                    <span className="icon_Comn">
                      <svg>
                        <use href="tv9hindi-nextjs/images/icons.svg#v_icon"></use>
                      </svg>
                    </span>
                  </div>
                )}
              </a>
            </figure>
          ))}
        </div>
      </div>

      <div className="columns col4">
        <div className="adsCont desktop">
          <div id="desktop_rhs_sidebar_1"></div>
        </div>

        {liveBlog && (
          <div className="rhsLiveblog_Wrapper">
            <div className="tv9common-heading">
              <div className="live_blog_post">
                <i className="blinker"></i>Live
              </div>
            </div>

            <div className="liveBlog_Wrapper">
              <a href={liveBlog.url || "#"}>
                <span className="h3">{liveBlog.title || ""}</span>
              </a>

              <ul className="liveBlog_list">
                {(Array.isArray(liveBlog.posts) ? liveBlog.posts : []).map(
                  (post, idx) => (
                    <li className="liveBlog_list-post" key={idx}>
                      <div className="timestamp">
                        <span className="blog-time">{post.time || ""}</span>
                      </div>
                      <h3 className="h3">{post.title || ""}</h3>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        )}

        {quizBanner && (
          <div className="tv9_banner">
            <a
              href={quizBanner.url || "#"}
              title={quizBanner.title || "banner"}
            >
              {(quizBanner.image || quizBanner.thumbnail) && (
                <SafeImage
                  src={quizBanner.image || quizBanner.thumbnail}
                  alt={quizBanner.title || ""}
                  width={320}
                  height={68}
                />
              )}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
