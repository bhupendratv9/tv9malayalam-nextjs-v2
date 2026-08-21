import { useMemo } from "react";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import Link from "next/link";
import styles from "./DetailMainContent.module.css";
import ArticleFormat from "../detail/ArticleFormat";
import VideoFormat from "../detail/VideoFormat";
import PhotoFormat from "../detail/PhotoFormat";
import DetailPageAuthor from "../DetailPageAuthorWidget/DetailPageAuthor";
import { getValue, formatIstDate, normalizeArticleInput, buildTags } from "@/lib/helper/widgetHelper";
import { decodeHtml, getHref } from "@/lib/helper/commonHelper";
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
  const modifiedGmt = String(getValue(article, "modified_at", ""));
  const createdGmt = String(getValue(article, "published_at", ""));
  const postFormat = String(
    getValue(article, "post_format", "post"),
  ).toLowerCase();

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
    config?.live_tv_url || dataConfig?.live_tv_url || "#",
  );
  const youtubeUrl = String(
    config?.youtube_url || dataConfig?.youtube_url || "#",
  );
  const googleNewsUrl = String(
    config?.google_news_url || dataConfig?.google_news_url || "#",
  );
  const whatsappUrl = String(
    config?.whatsapp_url || dataConfig?.whatsapp_url || "#",
  );

  const updatedText = formatIstDate(modifiedGmt || createdGmt);
  const tags = buildTags(article);

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
      <div className={styles.detailPage_Content}>
        <h1 className={styles.articleHD}>{title}</h1>
        {excerpt && <h2 className={styles.short_desc}>{excerpt}</h2>}

        <DetailPageAuthor
          authorUrl={authorUrl}
          authorName={authorName}
          authorImage={authorImage}
          updatedText={updatedText}
          googleBadgeUrl={googleBadgeUrl}
          googleBadgeImage={googleBadgeImage}
        />

        <FormatComponent
          article={article}
          config={{ ...config, ...dataConfig }}
        />

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

        {tags.length > 0 && (
          <div className={styles.tagsWrapper}>
            {tags.map((tag, index) => (
              <AppLink
                href={getHref(`/topic/${encodeURIComponent(tag.slug || tag.name)}`)}
                rel="topic"
                key={`${tag.slug}-${index}`}
              >
                {tag.name}
              </AppLink>
            ))}
          </div>
        )}

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
                href={googleNewsUrl}
                target="_blank"
                title="Google News"
                rel="noreferrer"
              >
                <svg>
                  <use href={`${ICONS_SVG}#icon_googleNews`} />
                </svg>
              </AppLink>
              <AppLink
                href={whatsappUrl}
                target="_blank"
                title="whatsapp follow"
                rel="noreferrer"
              >
                <svg className={styles.whatsapp}>
                  <use href={`${ICONS_SVG}#whats_iconff`} />
                </svg>
              </AppLink>
            </div>
          </div>
          <div className={styles.liveTVBadge}>
            <AppLink href={getHref(liveTvUrl)}>
              <i className={styles.blinker} />
              <span>LIVE</span>
              <span>TV</span>
            </AppLink>
          </div>
        </div>
      </div>
    </>
  );
}
