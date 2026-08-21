import React from "react";

// Decode HTML entities
function decodeHtml(text) {
  if (!text || typeof text !== "string") return text;

  const map = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
    "&apos;": "'",
  };

  return text
    .replace(/&#(\d+);/g, (_, code) =>
      String.fromCharCode(Number(code))
    )
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )
    .replace(
      /&amp;|&lt;|&gt;|&quot;|&#039;|&apos;/g,
      (m) => map[m]
    );
}

// Get title safely
function getTitle(item) {
  return decodeHtml(
    item?.title || item?.post_title || ""
  );
}

export default function LiveTVPlayerWidget({
  title = "TV9 BHARATVARSH LIVE TV",
  dataConfig = {},
}) {
  const displayTitle = decodeHtml(title);

  const liveTvUrl =
    dataConfig.live_tv_url ||
    "https://static.vidgyor.com/player/account/tv9/html/tv9_v12.html?videoId=aca8e80cceddb_live&accountId=62bafd8513ddad0009e72496&piv=0&pip=1&pipconf=r,20,20,180,320,108,192";

  return (
    <>
      <div
        className="liveTVPlayer_Wrapper"
        id="livetv_div"
        data-active="livetv_show"
        data-livetv-embed=""
        data-livetv-title={displayTitle}
      >
        {/* Heading */}
        <div className="tv9common-heading">
          <h1 className="h2" id="livetvh1">
            {displayTitle}
          </h1>

          <span className="sharePage" id="sharePage">
            <svg>
              <use href="#share-icon"></use>
            </svg>
          </span>
        </div>

        {/* Video Player */}
        <div
          id="liveTvMobile"
          className="LiveTVPlayer embedvideo"
        >
          <div className="float_media">
            <button className="video-close-btn">
              ×
            </button>

            <div id="vidgyor_container">
              <div id="closeButtonContainer">
                <iframe
                  title={displayTitle}
                  id="vidgyor_iframe"
                  src={liveTvUrl}
                  frameBorder="0"
                  width="100%"
                  height="460"
                  style={{ border: "none" }}
                  scrolling="no"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
		<style jsx global>{`
			.liveTVPlayer_Wrapper{margin-bottom:1rem;}
			.liveTVPlayer_Wrapper .tv9common-heading::before{display:none;}
			.liveTVPlayer_Wrapper .tv9common-heading .sharePage{width:2.5rem;height:2.5rem;background-color:#E6E6E6;border-radius:2.5rem;display:flex;justify-content:center;align-items:center;cursor:pointer;}
			.liveTVPlayer_Wrapper .tv9common-heading .sharePage svg{width:1.25rem;height:1.25rem;}
			.liveTVPlayer_Wrapper .LiveTVPlayer,.liveTVPlayer_Wrapper .LiveTVPlayer iframe{border-radius:0.75rem;background-color:#fff;}
			.liveTVPlayer_Wrapper .LiveTVPlayer iframe{width:100%;height:100%;aspect-ratio:16/9;}
			.embedvideo.video-bottom-fixed .float_media{position:fixed;bottom:20px;right:20px;width:380px;height:213px;z-index:1000;transform:translateY(100%);-webkit-animation:fade-in-up .5s ease forwards;animation:fade-in-up .5s ease forwards}
			@-webkit-keyframes fade-in-up{
			0%{opacity:0}
			100%{transform:translateY(0);opacity:1}
			}
			@keyframes fade-in-up{
			0%{opacity:0}
			100%{transform:translateY(0);opacity:1}
			}
			.scrollT .embedvideo.video-top-fixed .float_media{position: fixed;top: 85px;left: 0;width: 100%;z-index: 1000;transition: .5s ease-in-out;}
			.scrollB .embedvideo.video-top-fixed .float_media{position: fixed;top: 35px;left: 0;width: 100%;z-index: 1000;transition: .5s ease-in-out;}
			.video-close-btn{display:none;position:absolute;top:-34px;right:0;z-index:1001;background:rgba(0,0,0,.7);color:#fff;border:none;border-radius:50%;width:32px;height:32px;font-size:20px;font-family:sans-serif;line-height:inherit;justify-content:center;align-items:center;cursor:pointer}
			.embedvideo.video-bottom-fixed .video-close-btn{display:flex;}
			@media(max-width:767px){
				.embedvideo.video-top-fixed,.embedvideo.video-top-fixed iframe{border-radius:0;}
				.embedvideo.video-top-fixed .float_media{position:fixed;top:35px;left:0;width:100%;z-index:1000;-webkit-animation:fadeInDown .5s ease-in-out;animation:fadeInDown .5s ease-in-out}
				@-webkit-keyframes fadeInDown{
				0%{opacity:0;transform:translateY(-40px)}
				100%{opacity:1;transform:translateY(0)}
				}
				@keyframes fadeInDown{
				0%{opacity:0;transform:translateY(-40px)}
				100%{opacity:1;transform:translateY(0)}
				}
			}
		`}</style>
	</>
  );
}