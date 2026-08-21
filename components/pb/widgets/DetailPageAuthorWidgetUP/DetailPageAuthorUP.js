import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./DetailPageAuthorUP.module.css";
import { ICONS_SVG } from "@/lib/constants";

export default function DetailPageAuthorWidget({
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
    const url =
      shareUrl ||
      (typeof window !== "undefined" ? window.location.href : "");
    const title =
      shareTitle ||
      (typeof document !== "undefined" ? document.title : "");
    const text = shareText || "";

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // User cancelled or share failed
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch {
        // Clipboard not available
      }
    }
  }

  return (
    <div className={styles.article_author}>
      <div className={styles.AuthorInfo}>
        <figure>
          <div className={styles.coauthors_list}>
            <div className={styles.authorThumb}>
              <AppLink
                href={authorUrl}
                title={`Posts by ${authorName}`}
                rel="author"
              >
                {authorImage && (
                  <Image
                    src={authorImage}
                    width={30}
                    height={30}
                    alt={authorName}
                  />
                )}
                <span>{authorName}</span>
              </AppLink>
            </div>
          </div>

          <figcaption>
            {updatedText && (
              <span className={styles.label}>
                Updated on: {updatedText}
              </span>
            )}
          </figcaption>
        </figure>
      </div>

      <div className="flexAlignCenter">
        {googleBadgeImage && (
          <div className="google_badge_icon">
            <AppLink
              href={googleBadgeUrl}
              target="_blank"
              rel="nofollow noreferrer"
              title="Google News"
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

        <button
          type="button"
          className={styles.sharebox}
          onClick={handleShare}
          aria-label="Share this article"
        >
          <div>Share</div>
          <span>
            <svg>
              <use href={`${ICONS_SVG}#shareIcon`} />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}