import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./DetailPageAuthor.module.css";
import { ICONS_SVG } from "@/lib/constants";

export default function DetailPageAuthor({
  authorUrl = "#",
  authorName = "",
  authorImage = "",
  updatedText = "",
  googleBadgeUrl = "#",
  googleBadgeImage = "",
  shareTitle = "",
  shareText = "",
  shareUrl = "",
}) {
  async function handleShare() {
    const url = shareUrl || (typeof window !== "undefined" ? window.location.href : "");
    const title = shareTitle || (typeof document !== "undefined" ? document.title : "");
    const text = shareText || "";

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        // user cancelled or share failed — silently ignore
      }
    } else {
      // Fallback: copy URL to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch {
        // clipboard not available
      }
    }
  }

  return (
    <section className={styles.authorBox}>
      <figure>
        <div className={styles.authorPhoto}>
          <div className={styles.authorThumb}>
            <AppLink href={authorUrl} title={`Posts by ${authorName}`} rel="author">
              {authorImage && (
                <Image
                  src={authorImage}
                  width={45}
                  height={45}
                  alt={authorName}
                />
              )}
            </AppLink>
          </div>
        </div>
        <figcaption>
          <AppLink href={authorUrl} title={`Posts by ${authorName}`} rel="author">
            {authorName}
          </AppLink>
          {" | "}
          {updatedText && (
            <span>Updated on:<span> {updatedText}</span></span>
          )}
        </figcaption>
      </figure>
      <div className="dFlex">
        {googleBadgeImage && (
          <div className="google_badge_icon">
            <AppLink
              href={googleBadgeUrl}
              target="_blank"
              title="google"
              rel="nofollow noreferrer"
            >
              <Image
                src={googleBadgeImage}
                alt="Google News Badge"
                width={134}
                height={42}
                unoptimized
              />
            </AppLink>
          </div>
        )}
        <div className={styles.sharebox} onClick={handleShare} role="button" aria-label="Share this article">
          Share
          <span>
            <svg>
              <use href={`${ICONS_SVG}#shareIcon`} />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
