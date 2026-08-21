import { useState, useEffect, useRef } from "react";
import { getWidgetComponent } from "./widgetRegistry";
import { getHref } from "../../lib/helper/commonHelper";
import { useAdsEnabled, useTaboolaEnabled, useGptEnabled } from "../../lib/helper/adsHelper";

// Widget types that are ad-related and should be hidden when ads are disabled
const AD_WIDGET_TYPES = new Set([
  "custom-ads-widget",
  "top-ad-widget",
  "taboola-ads-widget",
]);

// ---------------------------------------------------------------------------
// Client-side item normalization (mirrors server-side mapItemsForPublic)
// ---------------------------------------------------------------------------

function normalizeItem(item) {
  if (!item || typeof item !== "object") return item;
  // Destructure duplicate keys so they don't appear in output
  const { permalink, thumbnail, link, image_url, featured_image, post_title, post_id, ID, featured_media, post_url, full_url, canonical_url, ...rest } = item;
  const rawUrl = item.url || permalink || link || post_url || full_url || canonical_url || "";
  return {
    ...rest,
    id: item.id || post_id || ID || null,
    title: item.title || post_title || "",
    url: getHref(rawUrl),
    image: item.image || image_url || featured_image || thumbnail || featured_media?.url || "",
    summary: item.summary || item.description || item.excerpt || item.short_desc || "",
    category: item.category || item.category_name || "",
    date: item.date || item.date_info || item.publish_date || item.created_gmt || item.modified_gmt || "",
  };
}

function normalizeItems(items) {
  if (!Array.isArray(items)) return [];
  return items.map(normalizeItem);
}

/**
 * Normalize the raw API response — ensures posts/items nested inside data
 * also have proper URL fields. Widgets may read from data.data.posts, data.posts, etc.
 */
function normalizeDataResponse(json) {
  if (!json || typeof json !== "object") return json;

  const result = { ...json };

  // Normalize top-level arrays
  if (Array.isArray(result.posts)) result.posts = normalizeItems(result.posts);
  if (Array.isArray(result.items)) result.items = normalizeItems(result.items);

  // Normalize nested data object
  if (result.data && typeof result.data === "object" && !Array.isArray(result.data)) {
    result.data = { ...result.data };
    if (Array.isArray(result.data.posts)) result.data.posts = normalizeItems(result.data.posts);
    if (Array.isArray(result.data.items)) result.data.items = normalizeItems(result.data.items);
    // Single data object (detail response)
    if (result.data.url || result.data.permalink || result.data.link) {
      result.data = normalizeItem(result.data);
    }
  } else if (Array.isArray(result.data)) {
    result.data = normalizeItems(result.data);
  }

  return result;
}

/**
 * RenderWidget — renders a single widget section.
 *
 * Rendering modes based on flags (all optional, defaults to normal SSR):
 *
 *   client_only=0, lazy=0 → Normal SSR render (default)
 *   client_only=1, lazy=0 → Client-only: nothing in source, renders immediately on mount
 *   client_only=0, lazy=1 → Lazy SSR: HTML rendered in source (SEO-friendly), hydrates when scrolled into viewport
 *   client_only=1, lazy=1 → Client-only + lazy: nothing in source, renders only when scrolled into viewport
 *
 *   _placeholder: "ad" | "skeleton" → show placeholder while loading (client_only modes)
 *   _hidden: "1"      → don't render at all (disabled from backend)
 */
export default function RenderWidget({
  section,
  queryParams = {},
  isAmp = false,
}) {
  if (!section || typeof section !== "object") return null;

  const dataConfig = section.dataConfig || {};

  // Hidden — backend can disable a widget without removing it
  if (dataConfig._hidden === "1" || section.hidden === 1) return null;

  // ─── Ad widget gating — hide ad widgets when globally disabled ───
  const adsEnabled = useAdsEnabled();
  const taboolaEnabled = useTaboolaEnabled();
  const gptEnabled = useGptEnabled();

  if (AD_WIDGET_TYPES.has(section.type)) {
    if (!adsEnabled) return null;
    if (section.type === "taboola-ads-widget" && !taboolaEnabled) return null;
    if ((section.type === "custom-ads-widget" || section.type === "top-ad-widget") && !gptEnabled) return null;
  }

  const WidgetComponent = getWidgetComponent(section?.type);
  if (!WidgetComponent) return null;

  const isClientOnly = section.clientOnly === 1 || section.clientOnly === "1" || dataConfig._clientOnly === "1";
  const isLazy = section.lazy === 1 || section.lazy === "1" || dataConfig._lazy === "1";
  const placeholder = dataConfig._placeholder || section.placeholder || "";

  // ─── Mode 1: Normal SSR (client_only=0, lazy=0) ───
  if (!isClientOnly && !isLazy) {
    return (
      <WidgetComponent
        {...section}
        queryParams={queryParams}
        section={section}
        isAmp={isAmp}
      />
    );
  }

  // ─── Mode 2: Lazy SSR (client_only=0, lazy=1) ───
  // Render full HTML server-side (visible in source code / SEO crawlable),
  // but wrap in a container that defers hydration until scrolled into viewport.
  if (!isClientOnly && isLazy) {
    return (
      <LazySSRWidget
        section={section}
        queryParams={queryParams}
        isAmp={isAmp}
        WidgetComponent={WidgetComponent}
      />
    );
  }

  // ─── Mode 3 & 4: Client-only (client_only=1) ───
  // Nothing in source code. Fetches data on the client.
  // If lazy=1, waits for viewport intersection before rendering.
  // If lazy=0, renders immediately on mount.
  return (
    <ClientOnlyWidget
      section={section}
      queryParams={queryParams}
      isAmp={isAmp}
      isLazy={isLazy}
      placeholder={placeholder}
      WidgetComponent={WidgetComponent}
    />
  );
}

/**
 * LazySSRWidget — SSR renders the widget (data in source code),
 * but defers interactive hydration until scrolled into viewport.
 * This is ideal for below-the-fold widgets that still need SEO visibility.
 */
function LazySSRWidget({ section, queryParams, isAmp, WidgetComponent }) {
  const [hydrated, setHydrated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHydrated(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Always render the widget HTML (for SSR / source code).
  // Before hydration, wrap in a div that suppresses client interactivity.
  return (
    <div ref={ref} data-lazy-ssr={hydrated ? "hydrated" : "pending"}>
      <WidgetComponent
        {...section}
        queryParams={queryParams}
        section={section}
        isAmp={isAmp}
      />
    </div>
  );
}

/**
 * ClientOnlyWidget — renders nothing server-side (no source code output).
 * Fetches data on client and normalizes URLs.
 * If lazy=true, waits for viewport intersection before fetching/rendering.
 * If lazy=false, fetches immediately on mount.
 */
function ClientOnlyWidget({ section, queryParams, isAmp, isLazy, placeholder, WidgetComponent }) {
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(!isLazy);
  const [fetchedData, setFetchedData] = useState(null);
  const ref = useRef(null);

  // Wait for client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lazy: observe intersection before rendering
  useEffect(() => {
    if (!isLazy || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isLazy, mounted]);

  // Fetch data client-side if items are empty (server skipped data for client_only)
  useEffect(() => {
    if (!mounted || !inView) return;
    const hasData = (section.items && section.items.length > 0) || section.data;
    if (hasData) return;

    const endpoint = section.dataConfig?.endpoint;
    if (!endpoint) return;

    fetch(endpoint, { headers: { Accept: "application/json" } })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!json) return;
        let items = [];
        if (Array.isArray(json)) items = json;
        else if (Array.isArray(json?.data?.posts)) items = json.data.posts;
        else if (Array.isArray(json?.data)) items = json.data;
        else if (Array.isArray(json?.items)) items = json.items;
        else if (json?.data && typeof json.data === "object") items = [json.data];
        // Normalize items (same as server-side mapItemsForPublic)
        items = normalizeItems(items);
        // Also normalize posts inside raw data so widgets reading data.data.posts get correct URLs
        const normalizedData = normalizeDataResponse(json);
        setFetchedData({ items, data: normalizedData });
      })
      .catch(() => {});
  }, [mounted, inView, section]);

  const shouldRender = mounted && inView;

  if (!shouldRender) {
    return <Placeholder type={placeholder} ref={ref} />;
  }

  // Merge fetched data into section props
  const sectionWithData = fetchedData
    ? { ...section, items: fetchedData.items, data: fetchedData.data }
    : section;

  return (
    <div ref={ref}>
      <WidgetComponent
        {...sectionWithData}
        queryParams={queryParams}
        section={sectionWithData}
        isAmp={isAmp}
      />
    </div>
  );
}

import { forwardRef } from "react";

const Placeholder = forwardRef(function Placeholder({ type }, ref) {
  if (type === "ad") {
    return <div ref={ref} className="adsCont" style={{ minHeight: 250 }} />;
  }
  if (type === "skeleton") {
    return <div ref={ref} className="widget-skeleton" style={{ minHeight: 200, background: "#f0f0f0", borderRadius: 8 }} />;
  }
  // Default: invisible placeholder for intersection observer
  return <div ref={ref} style={{ minHeight: 1 }} />;
});
