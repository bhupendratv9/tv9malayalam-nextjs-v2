import Image from "next/image";
import styles from "../DetailMainContentWidget/DetailMainContent.module.css";

export default function PhotoFormat({ article }) {
  const galleryImages = article?.gallery_images || [];

  if (!galleryImages.length) {
    return null;
  }

  return (
    <div className={styles.photoSummaryGrid}>
      {galleryImages.map((item, index) => (
        <div key={item.id || index}>
          <figure>
            <div className={styles.photoThumb}>
              <Image
                src={item.url}
                alt={item.caption || item.alt || ""}
                width={1280}
                height={720}
                priority={index === 0}
                unoptimized
              />

              <div
                className={styles.slideNum}
                data-photo-id={index + 1}
                data-title={item.caption}
                data-url={article.permalink}
              />
            </div>

            <figcaption>
              <div className={styles.slideNum}>
                <p>{item.caption}</p>
              </div>

              <span className={styles.photoCount}>
                <span>{index + 1}</span> / {galleryImages.length}
              </span>
            </figcaption>
          </figure>
        </div>
      ))}
    </div>
  );
}
