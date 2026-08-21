import React from "react";
import { decodeHtml } from "@/lib/helper/commonHelper";
export default function RashiphalCharacteristics({
    title = "",
    items = [],
    dataConfig = {},
}) {
  const img = dataConfig.image;
  const desc = dataConfig.description;
  
  return (
    <>
      <div className="characterWidget_Wrapper">
    <figure>
        <div className="img_wrap">
            <img src={img} alt={title || "rashiphal"}/>
        </div>
        <figcaption>
            <h2 className="h3">{decodeHtml(title)}</h2>
            <p>{decodeHtml(desc)}</p>
        </figcaption>
    </figure>
    </div>
      <style jsx>{`
      .characterWidget_Wrapper{border-radius:5.71875rem;border:2px dashed #f9b467;background:#fff7ee;padding:1rem 1.38rem;margin-bottom:1.88rem}
      .characterWidget_Wrapper figure{display:grid;grid-template-columns:80px 1fr;gap:.87rem;align-items:center}
      .characterWidget_Wrapper .img_wrap{background-color:#fff;filter:drop-shadow(0 4px 4px rgba(255, 218, 177, .8));width:80px;height:81px;border-radius:50%;display:flex;align-items:center;justify-content:center}
      .characterWidget_Wrapper .img_wrap img{display:block;width:66px;height:67px}
      .characterWidget_Wrapper figcaption .h3{color:#000;font-size:1.25rem;font-weight:700;line-height:1.5625rem;text-transform:capitalize;margin-bottom:.56rem}
      .characterWidget_Wrapper figcaption p{color:#000;font-size:1rem;font-weight:300;line-height:1.5rem;text-transform:capitalize}
      @media(max-width:767px){
      .characterWidget_Wrapper{border-radius: 0.625rem;}
      .characterWidget_Wrapper figure{align-items:center;justify-items:center;text-align:center;grid-template-columns:1fr;}
      }
      `}</style>
    </>
  );
}