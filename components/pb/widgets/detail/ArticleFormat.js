import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "../DetailMainContentWidget/DetailMainContent.module.css";
import { getHref } from "@/lib/helper/commonHelper";

export default function ArticleFormat({
  article = {},
  config = {},
}) {
  const title = article.title || "";
  const contentHtml = article.content_html || "";
  const mainImage = article.featured_media?.url || "";
  const imageCaption = article.postmeta?.image_caption || title;
  const permalink = article.permalink || "#";

  return (
    <>
      {mainImage && (
        <div className={styles.featuredImage}>
          <AppLink href={getHref(permalink)} title={title}>
            <Image
              src={mainImage}
              alt={title}
              title={title}
              width={1280}
              height={720}
              id="main-img"
              priority
              unoptimized
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </AppLink>
          {imageCaption && (
            <div className={styles.image_caption}>
              <span>{imageCaption}</span>
            </div>
          )}
        </div>
      )}

      {contentHtml && (
        <div
          dangerouslySetInnerHTML={{
            __html: contentHtml,
          }}
        />
      )}
    </>
  );
}
