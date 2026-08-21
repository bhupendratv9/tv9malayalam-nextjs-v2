import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import { decodeHtml, getHref } from "@/lib/helper/commonHelper";
import { getImg, getLink, parseEndpoint, extractItems } from "@/lib/helper/widgetHelper";

export default function ShortVideoLandingWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(title) || "Short Videos";
  const endpoint = dataConfig?.endpoint || "";
  const parsed = parseEndpoint(endpoint);
  const pageSize = parsed ? parsed.limit : 10;

  const [allItems, setAllItems] = useState(Array.isArray(items) && items.length > 0 ? items : []);
  const [currentOffset, setCurrentOffset] = useState(parsed ? parsed.offset + pageSize : pageSize);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(!!parsed);

  // Sync items when they arrive from client-side fetch (client_only widgets)
  useEffect(() => {
    if (Array.isArray(items) && items.length > 0 && allItems.length === 0) {
      setAllItems(items);
    }
  }, [items]);

  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore || !parsed) {
      console.log("[ShortVideo LoadMore] blocked:", { loading, hasMore, parsed: !!parsed });
      return;
    }
    setLoading(true);

    const url = `${parsed.base}${currentOffset}_${pageSize}${parsed.trailing}`;
    console.log("[ShortVideo LoadMore] fetching:", url);

    fetch(url, { headers: { Accept: "application/json" } })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        const newItems = extractItems(json);
        if (newItems.length === 0) {
          setHasMore(false);
        } else {
          setAllItems((prev) => [...prev, ...newItems]);
          setCurrentOffset((prev) => prev + pageSize);
          if (newItems.length < pageSize) {
            setHasMore(false);
          }
        }
      })
      .catch(() => setHasMore(false))
      .finally(() => setLoading(false));
  }, [loading, hasMore, parsed, currentOffset, pageSize]);

  if (!allItems.length) return null;

  return (
    <section className="svLandingWidget">
      <div className="tv9common-heading">
        <h1 className="h2">
          <AppLink href={getHref(view_more_link || sectionUrl || "/videos/short-videos")}>
            {displayTitle}
          </AppLink>
        </h1>
      </div>

      <div className="sv_ListWrap">
        {allItems.map((item, idx) => {
          const img = getImg(item);
          const link = getLink(item);
          const itemTitle = decodeHtml(item?.title || item?.post_title || "");

          return (
            <figure key={item?.id || item?.post_id || idx}>
              <div className="imgCont">
                <AppLink href={link} title={itemTitle}>
                  {img && (
                    <Image
                      src={img}
                      alt={itemTitle}
                      width={228}
                      height={405}
                      loading="lazy"
                      style={{ width: "100%", height: "auto" }}
                      unoptimized
                    />
                  )}
                  <div className="svIcon_btn">
                    <svg width="20" height="20" viewBox="0 0 26 25">
                      <path fillRule="evenodd" clipRule="evenodd" d="M2.98565 0.152008H25.1765V1.98637H2.64991V24.5669H0.815544L0.766608 2.37594C0.763735 1.1485 1.7581 0.152008 2.98554 0.152008H2.98565ZM23.2527 5.04563H25.087L25.1284 20.0101C25.1353 22.5248 23.0988 24.5669 20.5843 24.5669H5.61969V22.7326H20.8048C22.1567 22.7326 23.2527 21.6367 23.2527 20.2849V5.04563ZM11.003 17.4371C10.3381 17.8508 9.33065 17.4378 9.26735 16.6573C9.26479 16.6255 9.26351 16.5936 9.26352 16.5617V8.09999C9.26352 8.06775 9.2648 8.03584 9.26735 8.00435C9.33076 7.22382 10.3381 6.81084 11.003 7.22456L16.886 10.9522C18.1287 11.6946 18.2085 12.8648 16.886 13.7095L11.003 17.4371ZM11.1075 9.26775V15.3939L15.5918 12.3308L11.1075 9.26775V9.26775ZM5.26522 7.29743C4.99953 7.29743 4.74472 7.19189 4.55684 7.00401C4.36896 6.81614 4.26342 6.56132 4.26342 6.29563C4.26342 6.02993 4.36896 5.77511 4.55684 5.58724C4.74472 5.39936 4.99953 5.29382 5.26522 5.29382C5.81852 5.29382 6.26703 5.74233 6.26703 6.29563C6.26703 6.56132 6.16149 6.81614 5.97361 7.00401C5.78573 7.19189 5.53092 7.29743 5.26522 7.29743Z" fill="white"/>
                    </svg>
                  </div>
                </AppLink>
              </div>
              <div className="textgraint">
                <h3 className="h3">
                  <AppLink href={link} title={itemTitle}>{itemTitle}</AppLink>
                </h3>
              </div>
            </figure>
          );
        })}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="loadMore_Wrapper">
          <button className="loadMore_Btn" onClick={handleLoadMore} disabled={loading}>
            {loading ? "Loading..." : (dataConfig?.load_more_label || "Load More")}
          </button>
        </div>
      )}

      <style jsx>{`
        .svLandingWidget{margin-bottom:20px}
        .sv_ListWrap{display:grid;gap:20px;grid-template-columns:repeat(5,1fr);margin-bottom:20px}
        .sv_ListWrap figure{position:relative;width:100%}
        .sv_ListWrap .imgCont{position:relative}
        .sv_ListWrap .imgCont :global(img){border-radius:10px;vertical-align:top;aspect-ratio:9/16;object-fit:cover}
        .textgraint{padding:50% 10px 10px;left:0;right:0;border-radius:0 0 10px 10px;position:absolute;bottom:0;background:linear-gradient(to bottom,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 20%,rgba(0,0,0,0.1) 30%,rgba(0,0,0,0.8) 70%,#000 100%);display:flex;align-items:end;pointer-events:none}
        .textgraint .h3 :global(a){color:#fff;font-weight:700;font-size:15px;line-height:24px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
        .svIcon_btn{position:absolute;top:0;left:0;width:40px;height:35px;background:#dc0000;display:flex;justify-content:center;align-items:center;border-radius:10px 0 0;box-shadow:0 4px 11px rgba(0,0,0,.21),0 5px 8px rgba(0,0,0,.08)}
        .loadMore_Wrapper{display:flex;justify-content:center;padding:20px 0}
        .loadMore_Btn{background:#dc0000;color:#fff;border:none;padding:10px 30px;border-radius:4px;font-size:1rem;font-weight:600;cursor:pointer;transition:background 0.2s}
        .loadMore_Btn:hover{background:#b00000}
        .loadMore_Btn:disabled{background:#999;cursor:not-allowed}
        @media(max-width:768px){.sv_ListWrap{grid-template-columns:repeat(2,1fr);gap:10px}}
      `}</style>
    </section>
  );
}
