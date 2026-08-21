/**
 * ComScore Beacon Script
 */
import Script from "next/script";
import { isTrackerEnabled, getTrackerValue } from "./config";

export default function ComScore({ siteSettings = {} }) {
  const enabled = isTrackerEnabled("comscore", siteSettings);
  const c2 = getTrackerValue("comscore", "c2", siteSettings) || siteSettings?.comscore_c2 || "";

  if (!enabled || !c2) return null;

  return (
    <Script id="comscore" strategy="afterInteractive">
      {`var _comscore = _comscore || [];
      _comscore.push({ c1: "2", c2: "${c2}" });
      (function() {
        var s = document.createElement("script"), el = document.getElementsByTagName("script")[0];
        s.async = true; s.src = "https://sb.scorecardresearch.com/beacon.js";
        el.parentNode.insertBefore(s, el);
      })();`}
    </Script>
  );
}
