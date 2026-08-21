"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AppLink from "@/components/AppLink";
import { useScrollDirection } from "@/lib/hooks/useScrollDirection";
import { getHref } from "@/lib/helper/commonHelper";
import styles from "./MobileFooterStickyBottomNav.module.css";

const STATIC_CDN = process.env.NEXT_PUBLIC_STATIC_CDN_URL || "https://static.tv9hindi.com";

function getImageUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  // Ensure leading slash
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${STATIC_CDN}${path}`;
}

export default function MobileFooterStickyBottomNav({ bottomNavItems = [] }) {
  const scrollDirection = useScrollDirection();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(true);
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don't render if no items
  if (!bottomNavItems || bottomNavItems.length === 0) return null;

  return (
    <div
      data-bottom-panel
      className={`${styles.mstickyFooter_Wrapper} ${
        !hasScrolled || scrollDirection === "down" ? styles.hidden : ""
      }`}
    >
      <div className={styles.mstickyFooter_ListGrid}>
        {bottomNavItems.map((item) => (
          <div key={item.id} className={styles.mstickyFooter_Links}>
            <AppLink href={getHref(item.url)} title={item.title} target={item.target || undefined}>
              {item.image_url && (
                <div className={styles.imgWrap}>
                  <Image
                    src={getImageUrl(item.image_url)}
                    alt={item.title || ""}
                    width={24}
                    height={24}
                  />
                </div>
              )}
              <span>{item.title}</span>
            </AppLink>
          </div>
        ))}
      </div>
    </div>
  );
}
