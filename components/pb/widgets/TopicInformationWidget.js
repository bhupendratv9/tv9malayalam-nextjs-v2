import Image from "next/image";
import { getHref } from "@/lib/helper/commonHelper";

export default function TopicInformationWidget({
  items = [],
  data = null,
  dataConfig = {},
}) {
  // Normalize: data can come as { data: {...} } or items[0]
  const topicData = data?.data || data || (Array.isArray(items) && items.length > 0 ? items[0] : null);

  if (!topicData || typeof topicData !== "object") {
    return null;
  }

  const name = topicData.name || "";
  const description = topicData.meta?.topic_description?.[0] || topicData.description || "";
  const topicLink = getHref(topicData.link || "#");
  const imageUrl = topicData.meta?.author_image_url?.[0] || topicData.image || "";
  const twitterUrl = topicData.meta?.topic_twitter_url?.[0] || "";
  const instagramUrl = topicData.meta?.topic_instagram_url?.[0] || "";
  const facebookUrl = topicData.meta?.topic_facebook_url?.[0] || "";
  const linkedinUrl = topicData.meta?.topic_linkedin_url?.[0] || "";

  // Check if image is a numeric ID (WordPress attachment ID) — skip rendering
  const hasImage = imageUrl && !/^\d+$/.test(imageUrl);

  return (
    <div className="topicDetail_Wrapper">
      <div className="topicInfo_Widget topicExpand">
        {hasImage && (
          <div className="imgThumb">
            <Image
              src={imageUrl}
              alt={name}
              height={170}
              width={170}
              unoptimized
            />
          </div>
        )}

        {/* <input
          type="checkbox"
          id="topic-read-more"
          className="topicExpand__toggle"
        /> */}

        <div className="infoWrapper">
          <h1 className="h2">{name}</h1>

          {description && (
            <div className="topicDesc">
              <p>{description}</p>
            </div>
          )}

          {/* Social links */}
          {(twitterUrl || instagramUrl || facebookUrl || linkedinUrl) && (
            <div className="topicSocial">
              {facebookUrl && (
                <a href={facebookUrl} target="_blank" rel="nofollow noopener" title={`${name} Facebook`}>
                  <svg width="24" height="24"><use href="#ic_fb"></use></svg>
                </a>
              )}
              {twitterUrl && (
                <a href={twitterUrl} target="_blank" rel="nofollow noopener" title={`${name} Twitter`}>
                  <svg width="24" height="24"><use href="#ic_twit"></use></svg>
                </a>
              )}
              {instagramUrl && (
                <a href={instagramUrl} target="_blank" rel="nofollow noopener" title={`${name} Instagram`}>
                  <svg width="24" height="24"><use href="#ic_insta"></use></svg>
                </a>
              )}
              {linkedinUrl && (
                <a href={linkedinUrl} target="_blank" rel="nofollow noopener" title={`${name} LinkedIn`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>

        {description && description.length > 200 && (
          <label htmlFor="topic-read-more" className="appendMore">
            <span className="topicExpand__more">Read More</span>
            <span className="topicExpand__less">Read Less</span>
          </label>
        )}
      </div>
    </div>
  );
}
