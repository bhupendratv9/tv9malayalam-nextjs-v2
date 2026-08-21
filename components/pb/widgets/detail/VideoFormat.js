import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "../DetailMainContentWidget/DetailMainContent.module.css";
import { JWPLAYER_BASE_URL, JWPLAYER_PLAYER_ID } from "../../../../lib/constants";
import { useSiteSettings } from "../../../../lib/SiteContext";

export default function VideoFormat({ article, config }) {
  const { siteSettings } = useSiteSettings();
  const jwPlayerId = siteSettings?.jwplayer_player_id || JWPLAYER_PLAYER_ID;
  const title = article.title || "";
  const excerpt = article.excerpt || "";
  const contentHtml = article.content_html || "";
  const mainImage = article.featured_media?.url || "";
  const permalink = article.permalink || "#";

  const embedType = article.postmeta?.embed_type?.toLowerCase() || "";
  const videoEmbedUrl = article.postmeta?.video_embed_url || "";
  const videoDuration = article.postmeta?.video_duration || "";
  
  // Build video player URL based on embed type
  let videoSrc = "";
  if (embedType === "jwplayer" && videoEmbedUrl) {
    videoSrc = `${JWPLAYER_BASE_URL}/${videoEmbedUrl}-${jwPlayerId}.html`;
  } else if (videoEmbedUrl && videoEmbedUrl.startsWith("http")) {
    videoSrc = videoEmbedUrl;
  }
  
  const videoWrapRef = useRef(null);
  const [isPip, setIsPip] = useState(false);
  const [pipDismissed, setPipDismissed] = useState(false);

  useEffect(() => {
    if (!videoSrc || pipDismissed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show PiP when the original player is out of view (scrolled past)
        setIsPip(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    const el = videoWrapRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [videoSrc, pipDismissed]);

  const handlePipClose = () => {
    setPipDismissed(true);
    setIsPip(false);
  };

  return (
    <>
     {videoSrc ? (
        <>
          {/* Original in-page player */}
          <div ref={videoWrapRef} className={styles.videoPlayer_Wrap}>
            <iframe
              src={videoSrc}
              width="100%"
              height="400px"
              allowFullScreen
              allow="autoplay; fullscreen; encrypted-media"
              title={title}
              className={styles.videoPlayer_Wrap_Iframe}
            />
          </div>

          {/* PiP player — bottom-right sticky */}
          {isPip && (
            <div className={styles.pipContainer}>
              <button
                className={styles.pipClose}
                onClick={handlePipClose}
                aria-label="Close mini player"
              >
                &#x2715;
              </button>
              <iframe
                src={videoSrc}
                width="100%"
                height="100%"
                allowFullScreen
                allow="autoplay; fullscreen; encrypted-media"
                title={title}
              />
            </div>
          )}
        </>
      ) : mainImage ? (
        <div className={styles.featuredImage}>
          <a href={permalink} title={title}>
            <Image
              src={mainImage}
              alt={title}
              title={title}
              width={1280}
              height={720}
              id="main-img"
              priority
            />
          </a>
        </div>
      ) : null}

      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </>
  );
}
