import { useMemo } from "react";
import { decodeHtml } from "@/lib/helper/commonHelper";

/**
 * StaticDetailContent — renders static page content (About, Contact, Privacy, etc.)
 * Includes breadcrumb with BreadcrumbList schema.
 */

function normalizeStaticPage({ items = [], data = null, response = null }) {
  if (data && typeof data === "object" && !Array.isArray(data)) {
    if (data.data && typeof data.data === "object" && !Array.isArray(data.data)) return data.data;
    if (data.title || data.content_html || data.content) return data;
  }
  if (Array.isArray(items) && items.length > 0) {
    const first = items[0];
    if (first?.title || first?.content_html || first?.content) return first;
  }
  if (response && typeof response === "object") {
    if (response.data && typeof response.data === "object") return response.data;
    if (response.title || response.content_html || response.content) return response;
  }
  return null;
}

export default function StaticDetailContent({
  title = "",
  items = [],
  data = null,
  response = null,
  dataConfig = {},
  queryParams = {},
}) {
  const page = useMemo(
    () => normalizeStaticPage({ items, data, response }),
    [items, data, response]
  );

  const pageTitle = decodeHtml(page?.title || page?.post_title || title || "");
  const contentHtml = page?.content_html || page?.content || page?.body || "";
  const modifiedDate = page?.modified_gmt || page?.modified_at || "";
  const publishedDate = page?.created_gmt || page?.published_at || page?.date || "";

  if (!pageTitle && !contentHtml) {
    return <div className="pb-empty">Page not found.</div>;
  }

  return (
    <>
      <div className="staticPage_Content">
        {pageTitle && <h1 className="staticPage_Title">{pageTitle}</h1>}

        {contentHtml && (
          <div
            className="staticPage_Body"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        )}

        {(publishedDate || modifiedDate) && (
          <div className="staticPage_Meta">
            {modifiedDate && (
              <span className="lastUpdated">
                Last Updated: {new Date(modifiedDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
}
