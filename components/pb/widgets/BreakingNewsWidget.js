import Image from "next/image";

export default function BreakingNewsWidget({
  title = "Breaking News",
  sectionTitle = "Breaking News",
  sectionUrl = "#",
  items = [],
  videoIframe = "",
  finalVideoUrl = "",
}) {
  const first = items.length > 0 ? items[0] : null;
  const rest = items.length > 1 ? items.slice(1, 4) : [];

  const firstUrl = first?.permalink || first?.url || "#";
  const firstTitle = first?.title || "";
  const firstImg = first?.thumbnail || first?.image || "";

  const bgStyle = firstImg
    ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.7)), url(${firstImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }
    : {};

  return (
    <>
      <section className="tv9_breakingwidget">
        {first && (
          <div className="breakingBigstory" style={bgStyle}>
            <div className="imgWrp">
              {videoIframe ? (
                <div id="vidgyor_container">
                  <div
                    id="closeButtonContainer"
                    dangerouslySetInnerHTML={{ __html: videoIframe }}
                  />
                </div>
              ) : finalVideoUrl ? (
                <div id="vidgyor_container">
                  <div id="closeButtonContainer">
                    <iframe
                      id="vidgyor_iframe"
                      src={finalVideoUrl}
                      frameBorder="0"
                      width="100%"
                      height="460"
                      allowFullScreen
                      allow="autoplay; fullscreen; picture-in-picture"
                      scrolling="no"
                      referrerPolicy="strict-origin-when-cross-origin"
                      style={{
                        minWidth: "200px",
                        border: "none",
                        display: "block",
                      }}
                    ></iframe>
                  </div>
                </div>
              ) : firstImg ? (
                <Image
                  src={firstImg}
                  alt={firstTitle}
                  title={firstTitle}
                  width={670}
                  height={377}
                  unoptimized
                  priority
                  
                />
              ) : null}
            </div>

            <div className="breakingBigcontent">
              <h2>
                <a href={sectionUrl} title={title}>
                  {title}
                </a>
              </h2>

              <a href={firstUrl} title={firstTitle}>
                {firstTitle}
              </a>
            </div>
          </div>
        )}

        <div className="breakingBigstorylist">
          {rest.map((row, idx) => {
            const url = row?.permalink || row?.url || "#";
            const title2 = row?.title || "";
            const img = row?.thumbnail || row?.image || "";

            return (
              <figure key={row?.id || idx}>
                <a href={url} title={title2}>
                  {img ? (
                    <div className="imgWrp">
                      <Image
                        src={img}
                        alt={title2}
                        title={title2}
                        width={360}
                        height={203}
                        unoptimized
                        
                      />
                    </div>
                  ) : null}

                  <div className="card_title">
                    <p>{title2}</p>
                  </div>
                </a>
              </figure>
            );
          })}
        </div>
      </section>
    </>
  );
}