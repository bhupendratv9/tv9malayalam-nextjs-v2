import { useState, useEffect } from "react";

export default function TwoColumnIframes({ dataConfig = {} }) {
  const [isMounted, setIsMounted] = useState(false);

  const mainClass = dataConfig.mainClass || "";
  
  const iframeUrl_1 = dataConfig.iframe_url_1 || "";
  const iframeWidth_1 = dataConfig.width_1 || "100%";
  const iframeHeight_1 = dataConfig.height_1 || "409px";
  const iframeClassName_1 = dataConfig.className_1 || "autoResizeFrame";

  const iframeUrl_2 = dataConfig.iframe_url_2 || "";
  const iframeWidth_2 = dataConfig.width_2 || "100%";
  const iframeHeight_2 = dataConfig.height_2 || "553px";
  const iframeClassName_2 = dataConfig.className_2 || "autoResizeFrame";
  
  const borderStatus = dataConfig.borderStatus || "";
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || (!iframeUrl_1 && !iframeUrl_2)) {
    return null;
  }

  return (
    <>
	<div className="container">
	<div className={mainClass}>
      {iframeUrl_1 && (
        <iframe
          src={iframeUrl_1}
          title="iframe-1"
          className={iframeClassName_1}
          style={{
            width: iframeWidth_1,
            height: iframeHeight_1,
            border: 0,
            display: "block",
          }}
        />
      )}

      {iframeUrl_1 && iframeUrl_2 && (
        <>
          <div className="v-divider"></div>
          <div className="border"></div>
        </>
      )}

      {iframeUrl_2 && (
        <iframe
          src={iframeUrl_2}
          title="iframe-2"
          className={iframeClassName_2}
          style={{
            width: iframeWidth_2,
            height: iframeHeight_2,
            border: 0,
            display: "block",
          }}
        />
      )}
    </div>
	{borderStatus === "yes" && (
		<div className="border"></div>
	)}
	</div>
	</>
  );
}