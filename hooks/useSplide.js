import { useEffect, useRef } from "react";

export default function useSplide(options = {}, deps = []) {
  const rootRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    let timer = null;
    let isCancelled = false;

    function init() {
      if (isCancelled || !rootRef.current) return;

      if (instanceRef.current) {
        try {
          instanceRef.current.destroy(true);
        } catch (e) {}
        instanceRef.current = null;
      }

      if (typeof window === "undefined" || !window.Splide) {
        timer = setTimeout(init, 120);
        return;
      }

      instanceRef.current = new window.Splide(rootRef.current, options);
      instanceRef.current.mount();
    }

    init();

    return () => {
      isCancelled = true;
      if (timer) clearTimeout(timer);

      if (instanceRef.current) {
        try {
          instanceRef.current.destroy(true);
        } catch (e) {}
        instanceRef.current = null;
      }
    };
  }, deps);

  return rootRef;
}