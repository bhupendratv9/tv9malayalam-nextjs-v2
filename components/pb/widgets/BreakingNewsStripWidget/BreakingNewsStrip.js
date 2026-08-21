"use client";

import AppLink from "@/components/AppLink";
import styles from "./BreakingNewsStrip.module.css";
import { decodeHtml } from "@/lib/helper/commonHelper";

function getUrl(item) {
  return item.url || item.permalink || item.link || "#";
}

function getTitle(item) {
  return item.title || item.headline || item.name || item.post_title || "";
}

/**
 * Extract the first post from various API response structures.
 * Handles: items[], data.items[0].posts[], data.posts[], etc.
 */
function resolvePost(items, data) {
  // 1. If items has normalized posts directly (server-side resolved)
  if (items && items.length > 0) {
    if (items[0]?.posts && Array.isArray(items[0].posts)) {
      return items[0].posts[0] || null;
    }
    if (items[0]?.items && Array.isArray(items[0].items) && items[0].items[0]?.posts) {
      return items[0].items[0].posts[0] || null;
    }
    if (items[0]?.title || items[0]?.permalink || items[0]?.thumbnail) {
      return items[0];
    }
  }

  // 2. From data prop (client-side fetch)
  if (data?.data?.items?.[0]?.posts?.[0]) return data.data.items[0].posts[0];
  if (data?.data?.posts?.[0]) return data.data.posts[0];
  if (data?.items?.[0]?.posts?.[0]) return data.items[0].posts[0];
  if (data?.posts?.[0]) return data.posts[0];
  if (Array.isArray(data?.items) && data.items[0]) return data.items[0];
  if (Array.isArray(data) && data[0]) return data[0];

  return null;
}

export default function BreakingNewsStrip({
  title = "",
  items = [],
  data = null,
  section = null,
  dataConfig = {},
}) {
  // Extract metadata (text_column5/text_column6) from the raw API structure
  // These fields are siblings to `posts` inside items[0].items[0]
  const rawItems = items?.[0]?.items?.[0]
    || data?.data?.items?.[0]?.items?.[0]
    || data?.items?.[0]?.items?.[0]
    || section?.data?.data?.items?.[0]?.items?.[0]
    || {};
  const apiLabel = rawItems.text_column5 || "";
  const apiColor = rawItems.text_column6 || "";

  const label = apiLabel || decodeHtml(title) || dataConfig.label || "Breaking News";
  const isBlack = apiColor === "black" || (!apiColor && dataConfig.theme === "black");
  const bgColor = apiColor && apiColor !== "black" ? apiColor : "";

  const post = resolvePost(items, data || section?.data);

  if (!post) {
    return null;
  }

  const postTitle = decodeHtml(getTitle(post));
  const postUrl = getUrl(post);

  return (
    <div className={`${styles.tv9BreakingBar}${isBlack ? " " + styles.breakingBlack : ""}`} style={bgColor ? { backgroundColor: bgColor } : undefined}>
      <div className={styles.breakingLabel}>
        <span>{label}</span>
      </div>
      <div className={styles.breakingNewsList}>
        <AppLink href={postUrl} title={postTitle}>
          <i className={styles.blinker}></i> {postTitle}
        </AppLink>
      </div>
    </div>
  );
}
