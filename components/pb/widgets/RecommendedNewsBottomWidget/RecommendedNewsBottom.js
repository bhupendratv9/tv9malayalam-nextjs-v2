"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./RecommendedNewsBottom.module.css";
import { decodeHtml } from "@/lib/helper/commonHelper";
import { ICONS_SVG } from "@/lib/constants";

function getImage(item) {
  return item.thumbnail || item.image || item.thumb || item.image_url || "";
}

/**
 * Normalize a URL to its pathname for comparison,
 * so we can reliably match the current page URL against item URLs.
 */
function getPathname(url) {
  if (!url || typeof url !== "string") return "";
  try {
    // Use window.location.origin as base so relative URLs resolve correctly
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const parsed = new URL(url, base);
    return parsed.pathname.replace(/\/$/, "");
  } catch {
    // Fallback: treat the value as a raw path
    return url.replace(/\/$/, "");
  }
}

export default function RecommendedNewsBottom({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    // Capture the current page pathname to filter out the active story
    setCurrentPath(getPathname(window.location.pathname));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isClosed) return;
      const scrollY = window.scrollY;
      const atTop = scrollY === 0;
      const atBottom =
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 10;
      setIsVisible(!atTop && !atBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClosed]);

  const handleClose = () => {
    setIsVisible(false);
    setIsClosed(true);
  };

  // Filter out the currently open story from recommended items
  const filteredItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    if (!currentPath) return items;

    return items.filter((item) => {
      const itemUrl = item?.url || item?.permalink || "";
      const itemPath = getPathname(itemUrl);
      return itemPath !== currentPath;
    });
  }, [items, currentPath]);

  if (filteredItems.length === 0) {
    return null;
  }

  const displayTitle = decodeHtml(title) || "Recommended News";
  const displayItems = filteredItems.slice(0, 4);

  return (
    <div
      className={`${styles.recommendedNews_Wrapper} ${isVisible ? styles.visible : ""}`}
    >
      <button className={styles.btnClose} onClick={handleClose} aria-label="Close">
        <svg width={16} height={16}>
          <use href={`${ICONS_SVG}#close_menu`}></use>
        </svg>
      </button>
      <div className={styles.recommendedNews_Grid}>
        {displayItems.map((item, idx) => {
          const itemTitle = decodeHtml(
            item?.title || item?.headline || item?.name || ""
          );
          const itemUrl = item?.url || item?.permalink || "#";
          const imgSrc = getImage(item);
          const cid = item?.id || item?.cid || "";

          return (
            <figure key={cid || idx}>
              <AppLink
                className={styles.newsCard}
                href={itemUrl}
                data-pos={idx + 1}
                data-widget={displayTitle}
                data-cid={cid}
                title={itemTitle}
              >
                <div className={styles.imgThumb}>
                  {imgSrc ? (
                    <Image
                      width={100}
                      height={56}
                      src={imgSrc}
                      alt={itemTitle}
                      title={itemTitle}
                      unoptimized
                      style={{ width: "100%", height: "auto" }}
                    />
                  ) : null}
                </div>
                <div className={styles.card_title}>
                  <h3>{itemTitle}</h3>
                </div>
              </AppLink>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
