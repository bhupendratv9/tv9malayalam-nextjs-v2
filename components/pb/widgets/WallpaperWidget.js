import Image from "next/image";
import PropTypes from "prop-types";


function decodeHtml(text) {
  if (!text || typeof text !== "string") return text;
  const map = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#039;": "'", "&apos;": "'" };
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&amp;|&lt;|&gt;|&quot;|&#039;|&apos;/g, (m) => map[m]);
}

/**
 * WallpaperWidget — hero banner and logo for event landing pages.
 *
 * @param {object} dataConfig - Page builder config (srcUrl, altText, width, height)
 */
const DEFAULT_BANNER_URL =
  "https://images.tv9hindi.com/wp-content/uploads/2025/01/mahakumbh_banner.png";

export default function WallpaperWidget({ dataConfig = {} }) {
  const config = dataConfig;
  const bannerUrl = decodeHtml(config.bannerUrl) || DEFAULT_BANNER_URL;

  return (
    <>
      <section className="MainWrapper">
        <div className="eventMain_banner">
          <div className="mainContent">
            <div className="logoImg">
              <Image
                src={decodeHtml(config.srcUrl)}
                alt={decodeHtml(config.altText)}
                title={decodeHtml(config.altText)}
                width={decodeHtml(config.width)}
                height={decodeHtml(config.height)}
                priority
                style={{ width: "100%", height: "auto" }}
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>
      <style>{`
        .MainWrapper{margin-bottom:3.125rem}
        .eventMain_banner{background-image:url('${bannerUrl}');background-repeat:no-repeat;height:600px;display:flex;justify-content:center;align-items:center;background-size:cover;position:relative;}
        .eventMain_banner .mainContent .logoImg{display:flex;justify-content:center;width:634px;}
        .mainContent .sponsorsWrap{display:flex;align-items:flex-start;justify-content:center;padding-top:0.94rem;}
        .mainContent .sponsorsWrap figure{margin-right:14px;padding-right:14px;border-right:1px solid #000;text-align:center;z-index:9;}
        .mainContent .sponsorsWrap figure:last-child{border-right:0;margin-right:0;padding-right:0;}
        .mainContent .sponsorsWrap figure span{color:#000;font-size:13px;font-weight:600;margin-bottom:8px;display:block;line-height:17px;font-style:italic;}
        .mainContent .sponsorsWrap figure .sponserAds{display:flex;justify-content:center;}
        .mainContent .sponsorsWrap figure .sponserAds div{margin-right:15px;}
        .mainContent .sponsorsWrap figure .sponserAds div:last-child{margin-right:0;}
        .mainContent .sponsorsWrap figure .sponserAds div a img{max-width:inherit;display:block;}
        .onlyWeb{display:block;}
        .onlyMobile{display:none;}
        @media (max-width: 1400px) {
          .eventMain_banner{height:475px;}
          .eventMain_banner .mainContent .logoImg{width:450px;}
          .eventMain_banner .mainContent .logoImg img{width:100%;}
        }
        @media (max-width: 767px) {
          .onlyWeb{display:none;}
          .onlyMobile{display:block;}
          .eventMain_banner{background-size:cover;height:390px;}
          .mainContent .sponsorsWrap{margin-bottom:1.25rem;}
          .eventMain_banner .mainContent .logoImg{width:300px;}
          .eventMain_banner:before,.eventMain_banner:after{content:none;}
        }
      `}</style>
    </>
  );
}

WallpaperWidget.propTypes = {
  dataConfig: PropTypes.shape({
    srcUrl: PropTypes.string,
    bannerUrl: PropTypes.string,
    altText: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};
