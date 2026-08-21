"use client";
import { useEffect, useRef, useState, useId } from "react";
import { useAdsEnabled, useGptEnabled, isDeviceMatch } from "@/lib/helper/adsHelper";

export default function CustomAdWidget({
  dataConfig = {},
  config = {},
}) {
  const adsEnabled = useAdsEnabled();
  const gptEnabled = useGptEnabled();
  const adRef = useRef(null);
  const loadedRef = useRef(false);
  const [deviceOk, setDeviceOk] = useState(false);

  const slotId = dataConfig?.adSlotId || dataConfig?.ad_slot_id || config?.adSlotId || "";
  const divId = dataConfig?.adDivId || dataConfig?.ad_div_id || config?.adDivId || "";
  const width = Number(dataConfig?.adWidth || dataConfig?.ad_width || config?.adWidth || 300);
  const height = Number(dataConfig?.adHeight || dataConfig?.ad_height || config?.adHeight || 250);
  const device = dataConfig?.adDevice || dataConfig?.ad_device || config?.adDevice || "all";
  const extraClass = dataConfig?.adClass || dataConfig?.ad_class || config?.adClass || "";

  // If no slotId or divId, don't render anything
  if (!slotId || !divId) return null;

  const deviceClass = device === "desktop" ? "onlyWebADS"
    : device === "mobile" ? "onlyMobileADS"
    : "";

  // Check device on mount
  useEffect(() => {
    setDeviceOk(isDeviceMatch(device));
  }, [device]);

  // Only call GPT if device matches and slot not already defined for this divId
  useEffect(() => {
    if (!slotId || !divId || !deviceOk || !adsEnabled || !gptEnabled || loadedRef.current) return;
    loadedRef.current = true;

    window.googletag = window.googletag || { cmd: [] };
    window.googletag.cmd.push(function () {
      // Check if this div already has a slot associated
      const existingSlots = window.googletag.pubads().getSlots();
      const alreadyDefined = existingSlots.some(
        (s) => s.getSlotElementId() === divId
      );
      if (alreadyDefined) return;

      const slot = window.googletag.defineSlot(slotId, [width, height], divId);
      if (slot) {
        slot.addService(window.googletag.pubads());
        window.googletag.enableServices();
        window.googletag.display(divId);
      }
    });
  }, [slotId, divId, width, height, deviceOk, adsEnabled, gptEnabled]);

  if (!adsEnabled || !gptEnabled) return null;

  return (
    <div className={`adsCont ${deviceClass} ${extraClass}`.trim()} ref={adRef}>
      <div id={divId} />
    </div>
  );
}
