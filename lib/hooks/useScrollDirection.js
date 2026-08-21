"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns "up" | "down" based on scroll direction.
 * @param {number} threshold - minimum px delta before direction changes (default 5)
 */
export function useScrollDirection(threshold = 5) {
  const [direction, setDirection] = useState("up");
  const lastScrollY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (Math.abs(delta) < threshold) return;

      setDirection(delta > 0 ? "down" : "up");
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return direction;
}
