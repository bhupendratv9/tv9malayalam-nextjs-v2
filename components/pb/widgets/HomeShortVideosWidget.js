import Image from "next/image";

export default function HomeShortVideosWidget({
  title = "Short Videos",
  sectionTitle = "Short Videos",
  sectionUrl = "#",
  items = [],
}) {
  return (  
      <section className="shortvideosBox">
        <div className="tv9common-heading">
          <h2 className="h2">
            <a href={sectionUrl} title={sectionTitle}>
              {sectionTitle}
            </a>
          </h2>
          <a href={sectionUrl} className="view_more">
            View more
            <svg>
              <use href="tv9hindi-nextjs/images/icons.svg#rgt-arrow"></use>
            </svg>
          </a>
        </div>

        <div className="CarouselBox">
          <ul>
            {items.map((row, idx) => {
              const url = row?.permalink || row?.url || "#";
              const img = row?.thumbnail || row?.image || row?.thumb || row?.image_url || "";
              const text = row?.title || row?.headline || row?.name || "";
              const cid = row?.id || row?.cid || "";

              return (
                <li key={cid || idx}>
                  <div className="imgCont">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-pos={idx + 1}
                      data-widget={sectionTitle}
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
                          unoptimized
                          style={{ width: "100%", height: "auto" }}
                        />
                      ) : null}

                      <div className="sv_btn">
                        <svg>
                          <use href="tv9hindi-nextjs/images/icons.svg#ytShort"></use>
                        </svg>
                      </div>
                    </a>
                  </div>

                  <div className="textgraint">
                    <h3 className="h3">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={text}
                      >
                        {text}
                      </a>
                    </h3>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>    
  );
}