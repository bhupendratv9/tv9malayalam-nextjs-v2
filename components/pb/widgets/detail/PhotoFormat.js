import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "../DetailMainContentWidget/DetailMainContent.module.css";
import { ICONS_SVG } from "@/lib/constants";

const SOCIAL_LINKS = [
  { key: "twitter", className: "tw_icon", iconId: "icTwitter", title: "Twitter" },
  { key: "facebook", className: "fb_icon", iconId: "icFacebook", title: "facebook" },
  { key: "Whatsapp", className: "wh_icon", iconId: "icWhatsapp-solid", title: "Whatsapp" },
];

function socialfun(linkUrlBase, linkTitle, postTitle) {
  const linkTitle1 = linkTitle.toLowerCase();
  const linkTitleCC = linkTitle.charAt(0).toUpperCase() + linkTitle.slice(1);
  const linkAltText = postTitle;
  let tmphref = "";

  if (linkTitle1 === "facebook") {
    tmphref = "https://www.facebook.com/dialog/share?href=" + linkUrlBase + "%3Futm_source%3Dreferral%26utm_medium%3DFB%26utm_campaign%3Dsocial_share&app_id=966242223397117";
  }
  if (linkTitle1 === "twitter") {
    tmphref = "https://twitter.com/share?url=" + linkUrlBase + "%3Futm_source%3Dreferral%26utm_medium%3DTW%26utm_campaign%3Dsocial_share";
  }
  if (linkTitle1 === "whatsapp") {
    tmphref = "https://api.whatsapp.com/send?text=To know more on %22" + linkAltText + "%22, click the link - " + linkUrlBase + "%3Futm_source%3Dreferral%26utm_medium%3DWA%26utm_campaign%3Dsocial_share";
  }
  return !window.open(tmphref, linkTitleCC, "width=640,height=580");
}

function SocialShare({ url, title }) {
  return (
    <div className={styles.article_socialShare}>
      {SOCIAL_LINKS.map(({ key, className, iconId, title: linkTitle }) => (
        <a
          key={key}
          href={url}
          className={`${styles[className]} ${key === "twitter" ? "twitBtn" : key === "facebook" ? "fBtn" : "whatsBtn"}`}
          onClick={(e) => { e.preventDefault(); socialfun(url, key, title); }}
          title={linkTitle}
          target="_blank"
          alt={title}
        >
          <svg><use href={`${ICONS_SVG}#${iconId}`}></use></svg>
        </a>
      ))}
    </div>
  );
}
export default function PhotoFormat({ article }) {
  const galleryImages = article?.gallery_images || [];

  if (!galleryImages.length) {
    return null;
  }

  return (
    <div className={styles.photo_summary}>
      {galleryImages.map((item, index) => (
        <div key={item.id || index} className={styles.photoCard_Wrapper}>
          <figure>
            <div className={styles.imgwrap}>
              <Image
                src={item.url}
                alt={item.caption || item.alt || ""}
                width={1280}
                height={1280}
                priority={index === 0}
              />

              <div
                className={styles.slideNum}
                data-photo-id={index + 1}
                data-title={item.caption}
                data-url={article.permalink}
              />
              <div class="image_caption"></div>
            </div>

            <div className={styles.cardInfo_Wrapper}>
              <div className={`${styles.photoDesc} ${styles.slideNum}`}>
                <p>{item.caption}</p>
              </div>
              <div className={styles.cardAction}>
                <div className={styles.photoCount}>
                  <span>{index + 1}</span> / {galleryImages.length}
                </div>
                <SocialShare url={article.canonical} title={item.caption || article.title || ""} />
              </div>
            </div>
          </figure>

          {/* Desktop Ad after 1st & 3rd image */}
          {/*
			  (index === 0 || index === 2) && (
            <div className="adsCont Topads onlyWebADS">
              <div
                id={
                  index === 0
                    ? "desktop_top_ads_lhs"
                    : "desktop_top_ads_lhs2"
                }
              />
            </div>
          ) */}

          {/* Mobile Ad after 2nd & 4th image */}
          {/*(index === 1 || index === 3) && (
            <div className="adsCont onlyMobileADS">
              <div
                id={
                  index === 1
                    ? "mobile_top_300x250"
                    : "mobile_medium_300x250"
                }
              />
            </div>
          )*/}
        </div>
      ))}
    </div>
  );
}