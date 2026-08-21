import { useMemo } from "react";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import Link from "next/link";
import styles from "./DetailMainContent.module.css";
import ArticleFormat from "../detail/ArticleFormat";
import VideoFormat from "../detail/VideoFormat";
import PhotoFormat from "../detail/PhotoFormat";
import DetailPageAuthorUP from "../DetailPageAuthorWidgetUP/DetailPageAuthorUP";
import { getValue, formatIstDate, normalizeArticleInput, buildTags } from "@/lib/helper/widgetHelper";
import { decodeHtml } from "@/lib/helper/commonHelper";
import { ICONS_SVG } from "@/lib/constants";

export default function DetailMainContentWidget({
  items = [],
  data = [],
  item = null,
  response = null,
  config = {},
  dataConfig = {},
}) {
  const article = useMemo(
    () => normalizeArticleInput({ items, data, item, response }),
    [items, data, item, response],
  );

  if (!article || typeof article !== "object") {
    return <div className="pb-empty">Article not found.</div>;
  }

  const title = decodeHtml(String(getValue(article, "title", "")));
  const excerpt = decodeHtml(String(getValue(article, "excerpt", "")));
  const permalink = String(getValue(article, "permalink", "#"));
  const modifiedGmt = String(getValue(article, "modified_at", ""));
  const createdGmt = String(getValue(article, "published_at", ""));
  const postFormat = String(
    getValue(article, "post_format", "post"),
  ).toLowerCase();

  const authorId = getValue(article, ["author", "id"], "");
  const authorObj = getValue(article, "author", {});
  const authorName = String(authorObj?.display_name || "");
  const authorUrl = String(authorObj?.link || "#");
  const authorImage = String(authorObj?.image || "");

  const googleBadgeUrl = String(
    config?.google_badge_url || dataConfig?.google_badge_url || "#",
  );
  const googleBadgeImage = String(
    config?.google_badge_image || dataConfig?.google_badge_image || "",
  );
  const googleStickyImage = String(
    config?.google_sticky_image || dataConfig?.google_sticky_image || "",
  );

  const liveTvUrl = String(
    config?.live_tv_url || dataConfig?.live_tv_url || "https://www.tv9hindi.com/live-tv",
  );
  const youtubeUrl = String(
    config?.youtube_url || dataConfig?.youtube_url || "https://www.youtube.com/@TV9UPUK?sub_confirmation=1",
  );
  const facebookUrl = String(
    config?.facebook_url || dataConfig?.facebook_url || "https://www.facebook.com/Tv9UttarPradesh/",
  );
  const twitterUrl = String(
    config?.twitter_url || dataConfig?.twitter_url || "https://x.com/tv9uttarpradesh?lang=en",
  );

  const updatedText = formatIstDate(modifiedGmt || createdGmt);
  const tags = buildTags(article);

  // Select format component based on post_format
  let FormatComponent = ArticleFormat;
  if (postFormat === "video") FormatComponent = VideoFormat;
  else if (
    postFormat === "photo" ||
    postFormat === "gallery" ||
    postFormat === "photo-gallery"
  )
    FormatComponent = PhotoFormat;

  return (
    <>
      <div className={styles.articleBody}>
        <h1 className={styles.articleHD}>{title}</h1>
        {excerpt && <div className={styles.excerpt}> <h2 className={styles.short_desc}>{excerpt}</h2> </div>}
       
        {/* Author box */}
        <DetailPageAuthorUP
          authorUrl={authorUrl}
          authorName={authorName}
          authorImage={authorImage}
          updatedText={updatedText}
          googleBadgeUrl={googleBadgeUrl}
          googleBadgeImage={googleBadgeImage}
        />

        {/* Format-specific content (article / video / photo) */}
        <FormatComponent
          article={article}
          config={{ ...config, ...dataConfig }}
        />

        {/* Google sticky badge */}
        {googleStickyImage && (
          <div className={styles.googlePrefStickyMob}>
            <Link
              href={googleBadgeUrl}
              target="_blank"
              title="google"
              rel="nofollow noreferrer"
            >
              <Image
                width={200}
                height={60}
                src={googleStickyImage}
                alt="google button"
                unoptimized
              />
            </Link>
          </div>

        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className={styles.tagsWrapper}>
            {tags.map((tag, index) => (
              <Link
                href={`/topic/${encodeURIComponent(tag.slug || tag.name)}`}
                rel="topic"
                key={`${tag.slug}-${index}`}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Follow us + Live TV */}
        <div className={styles.flexWrap}>
          <div className={styles.followUs}>
            <span>Follow Us</span>
            <div className={styles.socialLinks}>
              <AppLink
                href={youtubeUrl}
                target="_blank"
                title="Youtube"
                rel="noreferrer"
              >
                <svg>
                  <use href={`${ICONS_SVG}#icon_youtube`} />
                </svg>
              </AppLink>
              <AppLink
                href={facebookUrl}
                target="_blank"
                title="Facebook"
                rel="noreferrer"
              >
                <svg>
                  <use href={`${ICONS_SVG}#fb-follow`} />
                </svg>
              </AppLink>
              <AppLink
                href={twitterUrl}
                target="_blank"
                title="twitter follow"
                rel="noreferrer"
              >
                <svg className={styles.whatsapp}>
                  <use href={`${ICONS_SVG}#icTwitter`} />
                </svg>
              </AppLink>
            </div>
          </div>
          <div className={styles.liveTVBadge}>
            <AppLink href={liveTvUrl}>
              <i className={styles.blinker} />
              <span>LIVE</span>
              <span>TV</span>
            </AppLink>
          </div>
        </div>
	      <div className="common_border"></div>
      </div>
    </>
  );
}