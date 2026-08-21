import Image from "next/image";

function decodeHtml(text) {
  if (!text || typeof text !== "string") return text;
  const map = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#039;": "'", "&apos;": "'" };
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&amp;|&lt;|&gt;|&quot;|&#039;|&apos;/g, (m) => map[m]);
}

function formatCurrentDate() {
  const now = new Date();
  const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
  const datePart = now.toLocaleDateString("en-US", options);
  const timePart = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  return `${datePart} ${timePart}`;
}

export default function CricketNewsBottomWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
}) {
  const displayTitle = decodeHtml(title) || "क्रिकेट न्यूज़";
  const viewMoreUrl = dataConfig.view_more_url || sectionUrl || "#";
  const currentDate = formatCurrentDate();

  console.log("CricketNewsBottomWidget items:", items);

  if (!items || items.length === 0) return null;

  // Remaining items from index 2 onward
  const restItems = items.slice(2);

  return (
    <div className="common_section topNews9" style={{ marginTop: "30px" }}>
      <div className="wrapper_section">
        {/* First figure (index 0) — big with image 360x203 */}
        {items[0] && (() => {
          const row = items[0];
          const url = row.url || row.permalink || "#";
          const titleText = decodeHtml(row.title || "");
          const img = row.image || row.thumbnail || row.thumb || row.image_url || "";
          const figId = String(row.id || row.post_id || "");

          return (
            <figure id={figId || null}>
              <div className="imgThumb">
                <a href={url} title={titleText}>
                  {img && (
                    <Image
                      src={img}
                      alt={titleText}
                      title={titleText}
                      width={360}
                      height={203}
                      unoptimized
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                </a>
              </div>
              <figcaption>
                <h3>
                  <a href={url} title={titleText}>{titleText}</a>
                </h3>
              </figcaption>
              <div className="time-stamp">
                <a className="catName" href={viewMoreUrl}>{row.category || "क्रिकेट"}</a>
                <span>{row.date || currentDate}</span>
              </div>
            </figure>
          );
        })()}

        {/* Second figure (index 1) — big with image 360x203 */}
        {items[1] && (() => {
          const row = items[1];
          const url = row.url || row.permalink || "#";
          const titleText = decodeHtml(row.title || "");
          const img = row.image || row.thumbnail || row.thumb || row.image_url || "";
          const figId = String(row.id || row.post_id || "");

          return (
            <figure id={figId || null}>
              <div className="imgThumb">
                <a href={url} title={titleText}>
                  {img && (
                    <Image
                      src={img}
                      alt={titleText}
                      title={titleText}
                      width={360}
                      height={203}
                      unoptimized
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                </a>
              </div>
              <figcaption>
                <h3>
                  <a href={url} title={titleText}>{titleText}</a>
                </h3>
              </figcaption>
              <div className="time-stamp">
                <a className="catName" href={viewMoreUrl}>{row.category || "क्रिकेट"}</a>
                <span>{row.date || currentDate}</span>
              </div>
            </figure>
          );
        })()}

        {/* Rest figures (index 2 onward) — small image 100x56 */}
        {restItems.map((row, idx) => {
          const url = row.url || row.permalink || "#";
          const titleText = decodeHtml(row.title || "");
          const img = row.image || row.thumbnail || row.thumb || row.image_url || "";
          const figId = String(row.id || row.post_id || "");

          return (
            <figure key={figId || idx} id={figId || null}>
              <div className="imgThumb">
                <a href={url} title={titleText}>
                  {img && (
                    <Image
                      src={img}
                      alt={titleText}
                      title={titleText}
                      width={100}
                      height={56}
                      unoptimized
                      loading="lazy"
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                </a>
              </div>
              <figcaption>
                <h3>
                  <a href={url} title={titleText}>{titleText}</a>
                </h3>
              </figcaption>
              <div className="time-stamp">
                <a className="catName" href={viewMoreUrl}>{row.category || "क्रिकेट"}</a>
                <span>{row.date || currentDate}</span>
              </div>
            </figure>
          );
        })}

        <a href={viewMoreUrl} className="viewMore"><span>view more</span></a>
      </div>
    </div>
  );
}
