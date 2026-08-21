import AppLink from "@/components/AppLink";
import Image from "next/image";
import styles from "./HomeShortVideos.module.css";
import { decodeHtml, getViewMoreUrl, getViewMoreLabel, ViewMoreLink } from "@/lib/helper/commonHelper";
import { ICONS_SVG } from "@/lib/constants";

export default function HomeShortVideosWidget({
  title = "Short Videos",
  sectionTitle = "Short Videos",
  sectionUrl = "#",
  items = [],
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title || sectionTitle) || "Short Videos";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl, fallback: "/videos/short-videos" });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });

  return (  
      <div className={styles.shortVideosWidget}>
        <div className="tv9common_heading">
          <h2 className="h2">
            {viewMoreUrl && viewMoreUrl !== "#" ? (
              <AppLink href={viewMoreUrl} title={displayTitle}>
                {displayTitle}
              </AppLink>
            ) : (
              displayTitle
            )}
          </h2>
          <ViewMoreLink href={viewMoreUrl} label={viewMoreLabel} />
        </div>

        <div className={styles.SVGrid_Wrapper}>
          {items.slice(0, 4).map((row, idx) => {
            const url = row?.permalink || row?.url || "#";
            const img = row?.thumbnail || row?.image || row?.thumb || row?.image_url || "";
            const text = decodeHtml(row?.title || row?.headline || row?.name || "");
            const cid = row?.id || row?.cid || "";

            return (
              <figure key={cid || idx}>
                <div className={styles.img_wrap}>
                  <AppLink
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-pos={idx + 1}
                    data-widget={displayTitle}
                    data-cid={cid}
                    title={text}
                  >
                    {img ? (
                      <Image
                        src={img}
                        width={228}
                        height={300}
                        alt={text}
                        title={text}
                      />
                    ) : null}

                    <div className={styles.sv_btn}>
                      <svg>
                        <use href={`${ICONS_SVG}#ytShort`}></use>
                      </svg>
                    </div>
                  </AppLink>
                </div>

                <div className={styles.textgraint}>
                  <h3 className={styles.h3}>
                    <AppLink
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={text}
                    >
                      {text}
                    </AppLink>
                  </h3>
                </div>
              </figure>
            );
          })}
        </div>
      </div>    
  );
}