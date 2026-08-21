import { useEffect, useRef } from "react";
import { useTaboolaEnabled } from "@/lib/helper/adsHelper";

export default function TaboolaAdsWidget({ dataConfig = {} }) {
  const taboolaEnabled = useTaboolaEnabled();
  const containerRef = useRef(null);
  const initialized = useRef(false);

  const mode = dataConfig.taboola_mode || "";
  const containerId = dataConfig.taboola_container || "taboola-below-article-thumbnails";
  const placement = dataConfig.taboola_placement || "";
  const targetType = dataConfig.taboola_target_type || "mix";
  const loaderUrl = dataConfig.taboola_loader_url || "";
  const delay = Number(dataConfig.taboola_delay) || 1000;

  if (!taboolaEnabled) return null;
  if (!loaderUrl || !mode || !placement) return null;

  useEffect(() => {
    if (initialized.current) return;
    if (!containerRef.current) return;
    initialized.current = true;

    // Push taboola config after delay
    setTimeout(() => {
      window._taboola = window._taboola || [];
      window._taboola.push({
        mode,
        container: containerId,
        placement,
        target_type: targetType,
      });
    }, delay);

    // Lazy-load taboola script on intersection
    const rootMargin = "0px 0px 1000px 0px";

    function loadTaboolaScript(url) {
      const script = document.createElement("script");
      script.type = "text/javascript";

      if (script.readyState) {
        script.onreadystatechange = function () {
          if (script.readyState === "loaded" || script.readyState === "complete") {
            script.onreadystatechange = null;
            window._taboola = window._taboola || [];
            setTimeout(() => { window._taboola.push({ flush: true }); }, 1000);
          }
        };
      } else {
        script.onload = function () {
          window._taboola = window._taboola || [];
          setTimeout(() => { window._taboola.push({ flush: true }); }, 1000);
        };
      }

      script.src = url;
      document.getElementsByTagName("head")[0].appendChild(script);
    }

    try {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadTaboolaScript(loaderUrl);
              const target = document.getElementById(containerId);
              if (target) observer.unobserve(target);
            }
          });
        },
        { rootMargin }
      );

      const target = document.getElementById(containerId);
      if (target) observer.observe(target);
    } catch (e) {
      // Fallback: load immediately
      loadTaboolaScript(loaderUrl);
    }

    // Push category auto
    window._taboola = window._taboola || [];
    window._taboola.push({ category: "auto" });
  }, [mode, containerId, placement, targetType, loaderUrl, delay]);

  return (
    <section className="taboola-ads-widget">
      <div id={containerId} ref={containerRef}></div>
    </section>
  );
}
