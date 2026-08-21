import { useState, useEffect } from "react";

export default function ElectionsIframes({ dataConfig = {} }) {
  const [isMounted, setIsMounted] = useState(false);

  const iframeUrl = dataConfig.iframe_url || "";
  const iframeWidth = dataConfig.width || "";
  const iframeHeight = dataConfig.height || "";
  const iframeClassName = dataConfig.className || "";
  const borderStatus = dataConfig.borderStatus || "";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!iframeUrl || !isMounted) return null;

  return (
    <>
		<div className="container">
		<section className="cricket-slider-widget">
		  <div className="cricket-slider-iframe-wrap">
			<iframe
			  src={iframeUrl}
			  width={iframeWidth}
			  height={iframeHeight}
			  className={iframeClassName}
			  frameBorder="0"
			  scrolling="no"
			  allowFullScreen
			  loading="lazy"
			  style={{ border: "none", display: "block" }}
			  title="Cricket Slider"
			/>
		  </div>
		</section>
		{borderStatus === "yes" && (
		  <div className="border"></div>
		)}
		</div>
	</>
  );
}