import Image from "next/image";
import AppLink from "@/components/AppLink";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import styles from "./HomePhotoSlider.module.css";
import { decodeHtml, getViewMoreUrl, getViewMoreLabel, ViewMoreLink } from "@/lib/helper/commonHelper";
import { ICONS_SVG } from "@/lib/constants";

export default function HomePhotoSliderWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title) || "Photo Gallery";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });

  return (
    <div className={styles.photoGallery_Wrapper}>
      <div className={styles.tv9common_heading}>
        <h2 className={styles.h2}>
          {viewMoreUrl && viewMoreUrl !== "#" ? (
            <AppLink href={viewMoreUrl} title={displayTitle}>
              {displayTitle}
            </AppLink>
          ) : (
            displayTitle
          )}
        </h2>

        <ViewMoreLink href={viewMoreUrl} label={viewMoreLabel} className={styles.view_more} />
      </div>
      <Splide
      options={{
          perPage: 3.5,
          gap: "20px",
          arrows: false,
          perMove: 1,
          focus  : 0,
          omitEnd: true,
          breakpoints: {
          1000: { perPage: 3.5 },
          480: { perPage: 1.4, pagination: false },
          },
      }}
      className={styles.photoGallerySlider}
      >
        {items.map((row, idx) => {
          const url = row?.url || row?.permalink || "#";
          const titleText = decodeHtml(row?.title || row?.headline || row?.name || "");
          const img =
            row?.image ||
            row?.thumbnail ||
            row?.thumb ||
            row?.image_url ||
            "";
          const cid = row?.id || row?.cid || "";

          let photoCount =
            row?.photo_count || row?.count || row?.gallery_count || 0;

          if (!photoCount || Number(photoCount) <= 0) {
            photoCount = 1;
          }

          return (
            <SplideSlide key={cid || idx}>
              <figure>
                <AppLink
                    href={url}
                    data-pos={idx + 1}
                    data-widget={displayTitle}
                    data-cid={cid}
                    title={titleText}
                  >
                    <div className={styles.imgThumb}>
                      {img ? (
                        <Image
                          src={img}
                          width={260}
                          height={150}
                          alt={titleText}
                          title={titleText}
                          unoptimized
                          style={{ width: "100%", height: "auto" }}
                        />
                      ) : null}

                      <span className={`${styles.icon_BG} ${styles.photo_count}`}>
                        <svg><use href={`${ICONS_SVG}#photos`}></use></svg>
                        {Number(photoCount)}
                      </span>
                    </div>

                    <div className={styles.card_title}>
                      <h3 className={styles.h3}>{titleText}</h3>
                    </div>
                  </AppLink>
              </figure>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
}
