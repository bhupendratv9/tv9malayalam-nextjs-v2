import AppLink from "@/components/AppLink";
import Head from "next/head";
import { useSiteSettings } from "../../../lib/SiteContext";

/**
 * BreadcrumbWidget — renders visual breadcrumb + JSON-LD schema.
 *
 * Data sources (priority order):
 *   1. dataConfig.breadcrumb_items (static JSON from page builder config)
 *   2. data.breadcrumb / data.data.breadcrumb (from API response)
 *   3. items[0].breadcrumb (from detail widget data)
 *
 * dataConfig.breadcrumb_items format:
 *   [{"name": "Home", "url": "/"}, {"name": "Politics", "url": "/politics"}]
 *
 * Page builder fields for this widget:
 *   {
 *     "key": "breadcrumb_items",
 *     "label": "Breadcrumb Items (JSON)",
 *     "type": "json",
 *     "placeholder": "[{\"name\":\"Home\",\"url\":\"/\"},{\"name\":\"Category\",\"url\":\"/category\"}]"
 *   }
 */
export default function BreadcrumbWidget({
  items = [],
  data = null,
  dataConfig = {},
  queryParams = {},
}) {
  const { siteSettings } = useSiteSettings();
  const homeTitle = siteSettings?.breadcrumb_home_title || siteSettings?.site_name || "Home";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  // Priority 1: Static breadcrumb from page builder dataConfig (individual fields or JSON)
  let breadcrumb = [];

  // Check individual text fields: breadcrumb_1_name, breadcrumb_1_url, etc.
  for (let i = 1; i <= 5; i++) {
    const name = (dataConfig?.[`breadcrumb_${i}_name`] || "").trim();
    const url = (dataConfig?.[`breadcrumb_${i}_url`] || "").trim();
    if (name) {
      breadcrumb.push({ name, url });
    }
  }

  // Fallback: check JSON format
  if (!breadcrumb.length && dataConfig?.breadcrumb_items) {
    try {
      const raw = dataConfig.breadcrumb_items;
      breadcrumb = typeof raw === "string" ? JSON.parse(raw) : raw;
    } catch { /* ignore */ }
  }

  // Priority 2: From API response (detail/category page data)
  if (!breadcrumb.length) {
    breadcrumb = data?.breadcrumb
      || data?.data?.breadcrumb
      || (Array.isArray(items) && items[0]?.breadcrumb ? items[0].breadcrumb : null)
      || [];
  }

  // Priority 3: Build from queryParams (category/subcategory) if nothing else available
  if (!breadcrumb.length && queryParams?.category) {
    breadcrumb = [
      { name: homeTitle, url: siteUrl || "/" },
      { name: queryParams.category, url: `${siteUrl}/${queryParams.category}` },
    ];
    if (queryParams.subcategory) {
      breadcrumb.push({
        name: queryParams.subcategory,
        url: `${siteUrl}/${queryParams.category}/${queryParams.subcategory}`,
      });
    }
  }

  if (!Array.isArray(breadcrumb) || !breadcrumb.length) return null;

  // Build trail: first item uses siteSettings home title, filter empty names
  const trail = breadcrumb
    .filter((item) => (item.name || "").trim())
    .map((item, idx) => {
      const name = idx === 0 ? (item.name || homeTitle) : (item.name || item.label || "");
      let url = item.url || item.link || "";
      // Prepend siteUrl if relative path
      if (url && !url.startsWith("http")) {
        url = url.startsWith("/") ? `${siteUrl}${url}` : `${siteUrl}/${url}`;
      }
      return { name, url };
    });

  const lastIdx = trail.length - 1;

  // JSON-LD schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(index < lastIdx && item.url ? { item: item.url } : {}),
    })),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <div id="breadcrumbs" className="breadcrumb">
        {trail.map((item, idx) => {
          const isLast = idx === lastIdx;

          if (isLast) {
            return (
              <span key={idx} className="breadcrumb_last">
                {item.name}
              </span>
            );
          }

          return (
            <span key={idx}>
              <AppLink href={item.url || "#"} title={item.name}>
                {item.name}
              </AppLink>
            </span>
          );
        })}
      </div>
    </>
  );
}
