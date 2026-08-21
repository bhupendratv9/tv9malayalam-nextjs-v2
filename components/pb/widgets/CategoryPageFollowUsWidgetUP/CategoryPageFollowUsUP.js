import styles from "./CategoryPageFollowUsUP.module.css";
import AppLink from "@/components/AppLink";
import { ICONS_SVG } from "@/lib/constants";

export default function CategoryPageFollowUsWidgetUP() {
  return (
    <div className={styles.followUs_Links}>
      <div className={styles.h2}>Follow us on social media</div>
      <div className={styles.followBtn}>
        <AppLink
          className={styles.tw_icon}
          href="https://x.com/tv9uttarpradesh?lang=en"
          title="Twitter"
          target="_blank"
          rel="nofollow noopener"
        >
          <svg>
            <use href={`${ICONS_SVG}#icTwitter`}></use>
          </svg>
        </AppLink>
        <AppLink
          className={styles.fb_icon}
          href="https://www.facebook.com/Tv9UttarPradesh/"
          title="FaceBook"
          target="_blank"
          rel="nofollow noopener"
        >
          <svg>
            <use href={`${ICONS_SVG}#icFacebook`}></use>
          </svg>
        </AppLink>
        <AppLink
          className={styles.in_icon}
          href="https://www.instagram.com/tv9uttarpradesh"
          title="Instagram"
          target="_blank"
          rel="nofollow noopener"
        >
          <svg>
            <use href={`${ICONS_SVG}#icInstagram`}></use>
          </svg>
        </AppLink>
        <AppLink
          className={styles.yt_icon}
          href="https://www.youtube.com/@TV9UPUK"
          title="Youtube"
          target="_blank"
          rel="nofollow noopener"
        >
          <svg>
            <use href={`${ICONS_SVG}#icYoutube`}></use>
          </svg>
        </AppLink>
      </div>
    </div>
  );
}
