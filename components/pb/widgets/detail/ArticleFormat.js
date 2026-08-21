import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "../DetailMainContentWidget/DetailMainContent.module.css";

export default function ArticleFormat({
  article = {},
  config = {},
}) {
  const {
    title = "",
    content_html = "",
    permalink = "#",
    featured_media,
    postmeta,
  } = article;

  const mainImage = featured_media?.url || "";
  const imageCaption = postmeta?.image_caption || title;

  return (
    <>
      {mainImage && (
        <>
          <div className={styles.featured_image}>
            <AppLink href={permalink} title={title}>
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
          </div>
        </>
      )}

      {imageCaption && (
        <div className={styles.image_caption}>
          <span>{imageCaption}</span>
        </div>
      )}

      {content_html && (
        <div
          dangerouslySetInnerHTML={{
            __html: content_html,
          }}
        />
      )}
    </>
  );
}