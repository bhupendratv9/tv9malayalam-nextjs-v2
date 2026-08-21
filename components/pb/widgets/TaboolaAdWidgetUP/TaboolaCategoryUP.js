// app/components/TaboolaCategory.js

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TaboolaCategoryUP() {
  const pathname = usePathname();

  useEffect(() => {
    window._taboola = window._taboola || [];

    window._taboola.push({
      mode: "thumbnails-a",
      container: "taboola-below-category-thumbnails",
      placement: "Below Category Thumbnails",
      target_type: "mix",
    });

    window._taboola.push({ flush: true });
  }, [pathname]);

  return <div id="taboola-below-category-thumbnails"></div>;
}