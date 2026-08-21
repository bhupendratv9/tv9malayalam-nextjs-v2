import { useState, useEffect } from "react";

export default function CricketSlider({ dataConfig = {} }) {
  const [isMounted, setIsMounted] = useState(false);
  const iframeUrl = dataConfig.iframe_url || "";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!iframeUrl || !isMounted) return null;

  return (
    <><div className="container">
	<section className="cricket-slider-widget">
      <div className="cricket-slider-iframe-wrap">
        <iframe
          src={iframeUrl}
          width="100%"
          height="140"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          loading="lazy"
          style={{ border: "none", display: "block" }}
          title="Cricket Slider"
        />
      </div>
    </section>
	</div>
	</>
  );
}
