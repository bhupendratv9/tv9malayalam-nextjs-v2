import Image from "next/image";
import { decodeHtml } from "@/lib/helper/commonHelper";

export default function OneBigEightSmallWidget({
  title = "",
  sectionTitle = "",
  sectionUrl = "#",
  items = [],
  dataConfig = {},
}) {
  const displayTitle = decodeHtml(title || sectionTitle) || "";
  const viewMoreUrl = dataConfig.view_more_url || sectionUrl || "#";
  const first = items.length > 0 ? items[0] : null;
  const rest = items.length > 1 ? items.slice(1, 9) : [];

  return (
    <>
      <section className="tv9_landingStories">
        {displayTitle && (
          <div className="tv9common-heading">
            <h1 className="h2">
              <a href={viewMoreUrl} title={displayTitle}>
                {displayTitle}
              </a>
            </h1>
          </div>
        )}

        <div className="topWidget_WithoutAD">
          <div className="leftColumn">
            <div className="commonstory">
              {first && (
                <figure className="bigstory">
                  <a
                    href={first.permalink || first.url || "#"}
                    title={decodeHtml(first.title) || ""}
                  >
                    <h2 className="h3">{decodeHtml(first.title) || ""}</h2>

                    {(first.thumbnail || first.image || first.thumb || first.image_url) ? (
                      <div className="imgThumb">
                        <Image
                          src={first.thumbnail || first.image || first.thumb || first.image_url}
                          width={320}
                          height={180}
                          alt={decodeHtml(first.title) || ""}
                          title={decodeHtml(first.title) || ""}
                          unoptimized
                          priority
                        />
                      </div>
                    ) : null}
                  </a>
                </figure>
              )}
            </div>
          </div>

          <div className="rightColumn">
            <div className="commonstory">
              {rest.map((row, idx) => {
                const img = row.thumbnail || row.image || row.thumb || row.image_url || "";

                return (
                  <figure className="smallstory" key={row.id || idx}>
                    <a
                      href={row.permalink || row.url || "#"}
                      title={decodeHtml(row.title) || ""}
                    >
                      {img ? (
                        <div className="imgThumb">
                          <Image
                            src={img}
                            width={320}
                            height={180}
                            alt={decodeHtml(row.title) || ""}
                            title={decodeHtml(row.title) || ""}
                            unoptimized
                          />
                        </div>
                      ) : null}

                      <div className="card_title">
                        <h3 className="h3">{decodeHtml(row.title) || ""}</h3>
                      </div>
                    </a>
                  </figure>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}