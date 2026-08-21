import MetaHead from "../../components/MetaHead";
import { cachedFetch } from "../../lib/server/fileCache";
import { SHORT_VIDEO_API_URL } from "../../lib/constants";
import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./ShortVideoDetailPage.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";
const SHORT_VIDEO_API = process.env.SHORT_VIDEO_API_BASE_URL || SHORT_VIDEO_API_URL;

if (!process.env.SHORT_VIDEO_API_BASE_URL) {
  console.warn(
    "[ShortVideoDetailPage] WARNING: SHORT_VIDEO_API_BASE_URL environment variable is not set. " +
      "Using fallback from constants."
  );
}


function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr + "Z");
    if (isNaN(d.getTime())) return dateStr;
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d) + " IST";
  } catch {
    return dateStr;
  }
}

export default function ShortVideoDetailPage({ videoData, meta, prevSlug, nextSlug }) {
  const router = useRouter();
  const videoRef = useRef(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [mounted, setMounted] = useState(false);
  const touchStartY = useRef(0);
  const isNavigating = useRef(false);

  useEffect(() => {
    setMounted(true);
    // Reset play state on each video load
    setIsPlaying(true);
    setDetailOpen(false);

    const savedMute = sessionStorage.getItem("sv_muted");
    const shouldMute = savedMute !== "false";
    setIsMuted(shouldMute);

    const vid = videoRef.current;
    if (vid) {
      vid.muted = true;
      vid.play().then(() => {
        vid.muted = shouldMute;
        setIsPlaying(true);
      }).catch(() => {
        vid.muted = true;
        setIsMuted(true);
        setIsPlaying(false);
      });
    }
  }, [videoData]);

  if (!videoData) {
    return <div style={{ padding: 40, textAlign: "center", color: "#666" }}>Video not found.</div>;
  }

  const title = videoData.title || "";
  const contentHtml = videoData.content_html || "";
  const thumbnail = videoData.thumbnail_full || videoData.thumbnail || "";
  const embedType = videoData.embed_type?.toLowerCase() || "";
  const videoEmbedUrl = videoData.video_embed_url || "";
  const authorName = videoData.author?.display_name || "";
  const createdAt = videoData.created_gmt || "";
  const permalink = videoData.permalink || "";
  const videoId = videoData.id || "";

  // Build mp4 URL from JWPlayer (only if video_embed_url is a valid short ID)
  const isValidJwId = videoEmbedUrl && /^[a-zA-Z0-9]{6,12}$/.test(videoEmbedUrl);
  const isYoutube = embedType === "youtube" || embedType === "yt";
  const isValidYtId = videoEmbedUrl && /^[a-zA-Z0-9_-]{11}$/.test(videoEmbedUrl);

  let mp4Url = "";
  let youtubeEmbedUrl = "";

  if (isYoutube && (isValidYtId || videoEmbedUrl.startsWith("http"))) {
    // YouTube embed
    youtubeEmbedUrl = isValidYtId
      ? `https://www.youtube.com/embed/${videoEmbedUrl}?autoplay=1&mute=1&playsinline=1&rel=0`
      : videoEmbedUrl;
  } else if (embedType === "jwplayer" && isValidJwId) {
    mp4Url = `https://cdn.jwplayer.com/videos/${videoEmbedUrl}.mp4`;
  } else if (videoEmbedUrl && videoEmbedUrl.startsWith("http")) {
    mp4Url = videoEmbedUrl;
  }

  const shareText = encodeURIComponent(`${title} via @tv9hindi ${permalink}?utm_source=short_video_share`);
  const whatsappUrl = `https://web.whatsapp.com/send?text=${shareText}`;

  // Play/Pause toggle
  const togglePlayPause = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {});
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  }, []);

  // Mute/Unmute toggle — persists across videos
  const toggleMute = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
    sessionStorage.setItem("sv_muted", String(vid.muted));
  }, []);

  // Navigate to another video
  const navigateTo = useCallback((slug) => {
    if (!slug || isNavigating.current) return;
    isNavigating.current = true;
    router.push(`/ShortVideoDetail/ShortVideoDetailPage?slug=${slug}`, `/videos/short-videos/${slug}`, { shallow: false });
  }, [router]);

  // Swipe detection
  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 60) {
      if (diff > 0 && prevSlug) navigateTo(prevSlug); // swipe up → prev (newer)
      else if (diff < 0 && nextSlug) navigateTo(nextSlug); // swipe down → next (older)
    }
  }, [nextSlug, prevSlug, navigateTo]);

  // Mouse wheel
  const wheelTimer = useRef(null);
  const handleWheel = useCallback((e) => {
    if (wheelTimer.current) return;
    if (Math.abs(e.deltaY) > 40) {
      if (e.deltaY > 0 && prevSlug) navigateTo(prevSlug);
      else if (e.deltaY < 0 && nextSlug) navigateTo(nextSlug);
      wheelTimer.current = setTimeout(() => { wheelTimer.current = null; }, 800);
    }
  }, [nextSlug, prevSlug, navigateTo]);

  // Arrow keys
  useEffect(() => {
    isNavigating.current = false;
    const handleKey = (e) => {
      if (e.key === "ArrowDown" && prevSlug) navigateTo(prevSlug);
      else if (e.key === "ArrowUp" && nextSlug) navigateTo(nextSlug);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextSlug, prevSlug, navigateTo]);

  // Reset navigating flag on route change complete
  useEffect(() => {
    const handleRouteChange = () => { isNavigating.current = false; };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router]);

  return (
    <>
      <MetaHead
        meta={meta}
        settings={{ "og:image": meta?.og_image || "" }}
      />

      <div
        className={styles["sv-page"]}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        {/* Video — full screen */}
        <div className={styles["sv-video-container"]} onClick={togglePlayPause}>
          {mp4Url ? (
            <video
              ref={videoRef}
              key={videoId}
              className={styles["sv-video"]}
              preload="metadata"
              playsInline
              loop
              autoPlay
              controlsList="nodownload"
            >
              <source src={`${mp4Url}#t=0.5`} type="video/mp4" />
            </video>
          ) : youtubeEmbedUrl ? (
            <iframe
              className={styles["sv-video"]}
              src={youtubeEmbedUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            />
          ) : thumbnail ? (
            <img className={styles["sv-video"]} src={thumbnail} alt={title} />
          ) : null}

          {/* Play/Pause indicator */}
          {mounted && !isPlaying && (
            <div className={styles["sv-play-indicator"]}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="#fff">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}

          {/* Three-dot — top right */}
          <div className={styles["sv-dots"]} onClick={(e) => { e.stopPropagation(); setDetailOpen(!detailOpen); }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </div>

          {/* Bottom overlay — title + icons */}
          <div className={styles["sv-overlay"]}>
            <div className={styles["sv-overlay-icons"]}>
              <a href={SITE_URL} className={styles["sv-icon"]} onClick={(e) => e.stopPropagation()}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
              </a>
              <div className={styles["sv-icon"]} onClick={(e) => { e.stopPropagation(); toggleMute(); }}>
                {mounted && !isMuted ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                )}
              </div>
              <a href={whatsappUrl} target="_blank" rel="nofollow noopener" className={styles["sv-icon"]} onClick={(e) => e.stopPropagation()}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <div className={styles["sv-icon"]} onClick={(e) => e.stopPropagation()}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
                </svg>
              </div>
            </div>
            <div className={styles["sv-overlay-title"]}>
              <h1>{title}</h1>
            </div>
          </div>

          {/* Nav arrows — right side */}
          {nextSlug && (
            <div className={`${styles["sv-nav"]} ${styles["sv-nav-up"]}`} onClick={() => navigateTo(nextSlug)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M7 14l5-5 5 5z" /></svg>
            </div>
          )}
          {prevSlug && (
            <div className={`${styles["sv-nav"]} ${styles["sv-nav-down"]}`} onClick={() => navigateTo(prevSlug)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M7 10l5 5 5-5z" /></svg>
            </div>
          )}
        </div>

        {/* Detail panel — slides up on three-dot click */}
        <div
          className={[styles["sv-detail-panel"], detailOpen && styles.open]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={styles["sv-detail-close"]} onClick={() => setDetailOpen(false)}>✕</div>
          <h2 className={styles["sv-detail-title"]}>{title}</h2>
          {contentHtml && (
            <div className={styles["sv-detail-desc"]} dangerouslySetInnerHTML={{ __html: contentHtml }} />
          )}
          <div className={styles["sv-detail-meta"]}>
            {authorName && <span>{authorName}</span>}
            {createdAt && <span>{formatDate(createdAt)}</span>}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const slug = query?.slug || "";

  if (!slug) {
    return { notFound: true };
  }

  const apiUrl = `${SHORT_VIDEO_API}/${slug}`;

  try {
    const json = await cachedFetch(apiUrl, { ttl: 60, key: `shortvideo_${slug}` });

    if (!json?.ok || !json?.data) {
      return { notFound: true };
    }

    const videoData = json.data;
    const apiMeta = json.meta || videoData.meta || {};

    // Build meta matching MetaHead expected fields
    const title = videoData.title || "Short Video";
    const description = videoData.content_html?.replace(/<[^>]+>/g, "").trim().slice(0, 160) || "";
    const canonical = videoData.permalink || videoData.canonical || "";
    const ogImage = videoData.thumbnail_full || videoData.thumbnail || "";

    const meta = {
      meta_title: apiMeta.meta_title || title,
      meta_description: apiMeta.meta_description || description,
      meta_keywords: apiMeta.meta_keywords || apiMeta.keywords || "",
      news_keywords: apiMeta.news_keywords || "",
      canonical: apiMeta.canonical || canonical,
      og_title: apiMeta.og_title || title,
      og_description: apiMeta.og_description || description,
      og_image: apiMeta.og_image || ogImage,
    };

    return {
      props: {
        videoData,
        meta,
        prevSlug: videoData.previous_post?.slug || null,
        nextSlug: videoData.next_post?.slug || null,
      },
    };
  } catch (error) {
    console.error(`[ShortVideoDetail] Failed to fetch (${slug}):`, error?.message || error);
    return { notFound: true };
  }
}
