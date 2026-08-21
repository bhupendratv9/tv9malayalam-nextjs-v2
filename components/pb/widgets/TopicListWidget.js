import { useState, useCallback, useEffect } from "react";
import AppLink from "@/components/AppLink";
import { decodeHtml, getHref } from "@/lib/helper/commonHelper";
import { parseEndpoint } from "@/lib/helper/widgetHelper";

function extractTopics(json) {
  if (!json) return [];
  if (json?.data?.topics && Array.isArray(json.data.topics)) return json.data.topics;
  if (Array.isArray(json?.topics)) return json.topics;
  if (Array.isArray(json?.data)) return json.data;
  if (Array.isArray(json)) return json;
  return [];
}

/**
 * TopicListWidget — Displays all topics with load more.
 */
export default function TopicListWidget({
  title = "",
  items = [],
  data = null,
  dataConfig = {},
}) {
  const displayTitle = decodeHtml(dataConfig.title || title) || "Topics List";
  const endpoint = dataConfig?.endpoint || "";
  const parsed = parseEndpoint(endpoint);
  const pageSize = parsed ? parsed.limit : 20;

  // Extract initial topics
  const initialTopics = data?.topics
    || data?.data?.topics
    || (Array.isArray(items) && items[0]?.topics ? items[0].topics : null)
    || (Array.isArray(items) && items[0]?.name ? items : null)
    || [];

  const [allTopics, setAllTopics] = useState(initialTopics.length > 0 ? initialTopics : []);
  const [currentOffset, setCurrentOffset] = useState(parsed ? parsed.offset + pageSize : pageSize);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(!!parsed);

  // Sync when items arrive from client-side fetch
  useEffect(() => {
    const topics = data?.topics
      || data?.data?.topics
      || (Array.isArray(items) && items[0]?.topics ? items[0].topics : null)
      || (Array.isArray(items) && items[0]?.name ? items : null)
      || [];
    if (topics.length > 0 && allTopics.length === 0) {
      setAllTopics(topics);
    }
  }, [items, data]);

  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore || !parsed) return;
    setLoading(true);

    const url = `${parsed.base}${currentOffset}_${pageSize}${parsed.trailing}`;

    fetch(url, { headers: { Accept: "application/json" } })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        const newTopics = extractTopics(json);
        if (newTopics.length === 0) {
          setHasMore(false);
        } else {
          setAllTopics((prev) => [...prev, ...newTopics]);
          setCurrentOffset((prev) => prev + pageSize);
          if (newTopics.length < pageSize) {
            setHasMore(false);
          }
        }
      })
      .catch(() => setHasMore(false))
      .finally(() => setLoading(false));
  }, [loading, hasMore, parsed, currentOffset, pageSize]);

  if (!allTopics.length) return null;

  return (
    <div className="topicList_Section">
      <div className="tv9common-heading">
        <h1 className="h2">{displayTitle}</h1>
      </div>
      <div className="topicLinks_Wrapper">
        <ul>
          {allTopics.map((item, idx) => {
            const name = decodeHtml(item.name || item.title || "");
            const url = getHref(item.link || item.url || `/topic/${item.slug || ""}`);
            const id = item.id || idx;

            if (!name) return null;

            return (
              <li key={id} id={String(id)}>
                <AppLink href={url} title={name}>
                  {name}
                </AppLink>
              </li>
            );
          })}
        </ul>
      </div>

      {hasMore && (
        <div className="loadMore_Wrapper" style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
          <button
            className="loadMore_Btn"
            onClick={handleLoadMore}
            disabled={loading}
            style={{
              background: "#dc0000",
              color: "#fff",
              border: "none",
              padding: "10px 30px",
              borderRadius: "4px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
