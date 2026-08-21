"use client";
import { useEffect, useRef } from "react";
import { useGptEnabled } from "@/lib/helper/adsHelper";

/**
 * GptScript — Dynamically loads the Google Publisher Tag (GPT) script.
 * Only loads when both ads_enabled and gpt_enabled are "1" in siteSettings.
 * If disabled, the script is never injected into the page.
 */
export default function GptScript() {
  const gptEnabled = useGptEnabled();
  const loaded = useRef(false);

  useEffect(() => {
    if (!gptEnabled || loaded.current) return;
    loaded.current = true;

    // Initialize googletag command queue
    window.googletag = window.googletag || { cmd: [] };

    // Inject the GPT script
    const script = document.createElement("script");
    script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
    script.async = true;
    document.head.appendChild(script);
  }, [gptEnabled]);

  return null;
}
