import { useState, useEffect } from "react";

export default function TestComponent({ dataConfig = {} }) {
  const [isMounted, setIsMounted] = useState(false);

  const testUrl = dataConfig.api_base || "";
  const testwdith= dataConfig.width || "";
  const testHeight = dataConfig.height || "";

 
  useEffect(() => {
    setIsMounted(true);
  }, []);

  //if (!iframeUrl || !isMounted) return null;

  return (
    <section className="cricket-slider-widget">
      <div className="cricket-slider-iframe-wrap">
        <iframe
          src={testUrl}
          width={testwdith }
          height={testHeight}
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          loading="lazy"
          style={{ border: "none", display: "block" }}
          title="Cricket Slider"
        />
      </div>
    </section>
  );
}
