import React from "react";
import { decodeHtml } from "@/lib/helper/commonHelper";

export default function ElectionAboutConstituency({
  title = "",
  dataConfig = {},
  }) {
    const displayTitle  = decodeHtml(title) || "";
    const AboutConstTitle = decodeHtml(dataConfig.title) || displayTitle;
    const Description = decodeHtml(dataConfig.description) || "";
  return (
    <>
      <div className="electionHD">
        <h1 className="h2">{AboutConstTitle}</h1>
      </div>
      <div className="landingPage_About1">
      <p>{Description}</p>
      </div>
      <style jsx>{`
      .electionHD {display: flex;align-items: center;justify-content: space-between;margin-bottom: .94rem;
      .searDescription h2{font-size: 22px;line-height: 30px;margin-bottom:10px;}
      .searDescription ul li{font-size: 1.25rem;line-height: 1.875rem;margin-bottom: 0.9375rem;}
      .landingPage_About {margin-top: 2.5rem;}
      .landingPage_About p,.landingPage_About1 p {color: #000;font-size: 1.125rem;font-weight: 500;line-height: 2.25rem;margin-bottom: 10px;}
      `}</style>
    </>
  );
}