import React from "react";
import Image from "next/image";

function decodeHtml(text) {
  if (!text || typeof text !== "string") return text;

  const map = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
    "&apos;": "'",
  };

  return text
    .replace(/&#(\d+);/g, (_, code) =>
      String.fromCharCode(Number(code))
    )
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )
    .replace(
      /&amp;|&lt;|&gt;|&quot;|&#039;|&apos;/g,
      (m) => map[m]
    );
}

export default function LiveTVLiveblogWidget({
  title = "Live Blog",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
}) {
  const displayTitle = decodeHtml(title);

  return (
    <>
	<div class="liveTVLiveBlog_Wrapper">
    <div class="live_blog_post"><i class="blinker"></i>Live Blog</div>
    <div class="liveBlog_Wrapper"> 
        <a href="https://www.tv9hindi.com/india/aaj-ki-taaja-khabar-live-updates-latest-news-hindi-samachar-daily-breaking-29-may-2026-3802217.html">
            <span class="h3">कनाडा के साथ फ्री ट्रेड एग्रीमेन्ट नहीं: MEA </span>
        </a>
        <ul class="liveBlog_list">
                        <li class="liveBlog_list-post">
                <div class="timestamp"><span class="blog-time">29 May 2026 03:20 PM</span></div>
                <h3 class="h3">आखिर सच्चाई क्या है? नीट पेपर लीक मामले पर सुप्रीम कोर्ट का सवाल</h3>
            </li>
                        <li class="liveBlog_list-post">
                <div class="timestamp"><span class="blog-time">29 May 2026 03:14 PM</span></div>
                <h3 class="h3">UP में बढ़ रहे गन कल्चर को लेकर HC में सुनवाई पूरी</h3>
            </li>
                        <li class="liveBlog_list-post">
                <div class="timestamp"><span class="blog-time">29 May 2026 03:04 PM</span></div>
                <h3 class="h3">दिल्लीः NEET-UG परीक्षा के लिए DTC में मुफ्त यात्रा</h3>
            </li>
                        <li class="liveBlog_list-post">
                <div class="timestamp"><span class="blog-time">29 May 2026 02:37 PM</span></div>
                <h3 class="h3">ट्विशा डेथ केसः गिरिबाला और समर्थ को 5 दिन की रिमांड</h3>
            </li>
                        <li class="liveBlog_list-post">
                <div class="timestamp"><span class="blog-time">29 May 2026 01:44 PM</span></div>
                <h3 class="h3">विनेश फोगाट को सुप्रीम कोर्ट से बड़ी राहत</h3>
            </li>
                                </ul>
  </div>
</div>
	<style jsx global>{`
	.liveTVLiveBlog_Wrapper{margin-bottom:1.25rem;}
	.liveTVLiveBlog_Wrapper .live_blog_post{font-size:1rem;text-transform:uppercase;border-radius:3.125rem;background:#B30000;color:#fff;font-weight:600;width:8.0625rem;height:2.125rem;display:flex;align-items:center;justify-content:center;margin-bottom:0.88rem;}
	.liveTVLiveBlog_Wrapper .live_blog_post .blinker{animation:pulse-white 2s infinite;background:rgb(255 255 255);box-shadow:0 0 0 0 rgb(255 255 255);height:8px;width:8px}
	.liveTVLiveBlog_Wrapper .liveBlog_Wrapper .h3{font-size:1.125rem;font-weight:600}
	.liveTVLiveBlog_Wrapper .liveBlog_Wrapper .liveBlog_list{width:100%;margin-top:10px;padding-left:15px;position:relative}
	.liveTVLiveBlog_Wrapper .liveBlog_Wrapper .liveBlog_list li{position:relative;padding-top:15px;list-style:none}
	.liveTVLiveBlog_Wrapper .liveBlog_Wrapper .liveBlog_list li:first-child{padding-top:0}
	.liveTVLiveBlog_Wrapper .liveBlog_Wrapper .liveBlog_list li:first-child:after{top:10px}
	.liveTVLiveBlog_Wrapper .liveBlog_Wrapper .liveBlog_list li:last-child{border-bottom:0}
	.liveTVLiveBlog_Wrapper .liveBlog_Wrapper .liveBlog_list li:before{content:'';border-left:1px dashed #000;position:absolute;top:3px;left:-12px;width:1px;height:100%}
	.liveTVLiveBlog_Wrapper .liveBlog_Wrapper .liveBlog_list li::after{content:'';width:0.625rem;height:0.625rem;position:absolute;top:25px;left:-16px;border-radius:10px;background:#dc0000;box-sizing:border-box}
	.liveTVLiveBlog_Wrapper .liveBlog_Wrapper .liveBlog_list li .h3{font-size:1rem;line-height:24px;font-weight:500}
	.liveTVLiveBlog_Wrapper .liveBlog_Wrapper .liveBlog_list .timestamp span{color:#5a5858;font-size:0.75rem;font-weight:500;margin-bottom:0.94rem;border-radius:3.125rem;border:1px solid #5a5858;display:inline-block;padding:0 10px}

	`}</style>
	</>
  );
}