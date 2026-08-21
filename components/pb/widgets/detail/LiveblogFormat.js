import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "../DetailMainContentWidget/DetailMainContent.module.css";

export default function LiveblogFormat({ article, config }) {
  const title = article.title || "";
  const excerpt = article.excerpt || "";
  const contentHtml = article.content_html || "";
  const mainImage = article.featured_media?.url || "";
  const imageCaption = article.postmeta?.image_caption || title;
  const permalink = article.permalink || "#";

  return (
    <>
      {mainImage && (
        <div className={styles.featuredImage}>
          <AppLink href={permalink} title={title}>
            <Image
              src={mainImage}
              alt={title}
              title={title}
              width={1280}
              height={720}
              id="main-img"
              unoptimized
              priority
              style={{ width: "100%", height: "auto" }}
            />
          </AppLink>
          {imageCaption && (
            <div className={styles.image_caption}><span>{imageCaption}</span></div>
          )}
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </>
  );
}
