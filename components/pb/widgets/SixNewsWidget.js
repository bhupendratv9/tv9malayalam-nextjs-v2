import Image from "next/image";
import { decodeHtml, getViewMoreUrl, getViewMoreLabel, ViewMoreLink } from "@/lib/helper/commonHelper";

export default function SixNewsWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title) || "";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });
  const first = items.length > 0 ? items[0] : null;
  const rest = items.length > 1 ? items.slice(1, 6) : [];

  return (
    <section className="pb-entertainment-widget">
      {/* Heading */}
      {displayTitle && (
        <div className="tv9common-heading">
          <h2 className="h2">
            <a href={viewMoreUrl} title={displayTitle}>
              {displayTitle}
            </a>
          </h2>

          <ViewMoreLink href={viewMoreUrl} label={viewMoreLabel} />
        </div>
      )}

      <div>
        <div>
          <div className="commonstory three_plus_two_collum">

            {/* ===== BIG STORY ===== */}
            {first && (
              <figure className="bigstory three_plus_two_collum_list">
                <a
                  href={first.url || "#"}
                  title={decodeHtml(first.title) || ""}
                >
                  {(first.thumbnail || first.image || first.thumb || first.image_url) && (
                    <div className="imgThumb">
                      <Image
                        src={first.thumbnail || first.image || first.thumb || first.image_url}
                        alt={decodeHtml(first.title) || ""}
                        title={decodeHtml(first.title) || ""}
                        width={320}
                        height={180}
                        priority
                        unoptimized
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  )}

                  <div className="card_title">
                    <h3 className="h3">{decodeHtml(first.title)}</h3>
                  </div>
                </a>
              </figure>
            )}

            {/* ===== SMALL STORIES ===== */}
            {rest.map((row, idx) => (
              <figure
                className="smallstory three_plus_two_collum_list"
                key={row.id || idx}
              >
                <a
                  href={row.url || "#"}
                  title={decodeHtml(row.title) || ""}
                >
                  {(row.thumbnail || row.image || row.thumb || row.image_url) && (
                    <div className="imgThumb">
                      <Image
                        src={row.thumbnail || row.image || row.thumb || row.image_url}
                        alt={decodeHtml(row.title) || ""}
                        title={decodeHtml(row.title) || ""}
                        width={250}
                        height={140}
                        unoptimized
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  )}
                  <div className="card_title">
                    <h3 className="h3">{decodeHtml(row.title)}</h3>
                  </div>
                </a>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}