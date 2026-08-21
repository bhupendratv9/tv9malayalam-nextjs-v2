"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MobileStickyAd.module.css";

/**
 * Sticky ad that always stays visible.
 * It floats above any other bottom-fixed panel (footer nav or recommended news)
 * by measuring those panels via data attributes and adjusting its own `bottom`.
 */
export default function MobileStickyAd() {
  const [bottom, setBottom] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    function measure() {
      // Find all bottom-fixed panels that are currently translated into view.
      // We identify them by a shared data attribute set on each panel wrapper.
      const panels = document.querySelectorAll(
        "[data-bottom-panel]"
      );

      let maxHeight = 0;
      panels.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const visibleHeight = window.innerHeight - rect.top;
        if (visibleHeight > 0) {
          maxHeight = Math.max(maxHeight, visibleHeight);
        }
      });

      setBottom(maxHeight);
    }

    function scheduleMeasure() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(measure);
    }

    // Re-measure on scroll (panels animate on scroll) and on resize
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure, { passive: true });

    // Also observe DOM mutations so we catch panels mounting/unmounting
    const observer = new MutationObserver(scheduleMeasure);
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["class"] });

    measure(); // initial

    return () => {
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className={`${styles.mStickyAD_Wrapper} showMobileOnly`}
      style={{ bottom }}
    />
  );
}
