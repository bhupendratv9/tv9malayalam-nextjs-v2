import { useState } from "react";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./TopicInformation.module.css";
import { getHref } from "@/lib/helper/commonHelper";
import { ICONS_SVG } from "@/lib/constants";

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
  const imageUrl = topicData.meta?.author_image_url || topicData.image || "";
  const twitterUrl = topicData.meta?.topic_twitter_url?.[0] || "";
  const instagramUrl = topicData.meta?.topic_instagram_url?.[0] || "";
  const facebookUrl = topicData.meta?.topic_facebook_url?.[0] || "";
  const linkedinUrl = topicData.meta?.topic_linkedin_url?.[0] || "";

  // Check if image is a numeric ID (WordPress attachment ID) — skip rendering
  const hasImage = imageUrl && !/^\d+$/.test(imageUrl);
  const hasSocial = twitterUrl || instagramUrl || facebookUrl || linkedinUrl;

  const [expanded, setExpanded] = useState(false);

  return (

    <div className={styles.topicDetail_Wrapper}>
      {hasImage && (
      <div className={styles.topic_thumb}>
        <Image
          src={imageUrl}
          alt={name}
          height={170}
          width={170}
        />
      </div>
      )}
      <div className={styles.topic_details}>
        <h1 className={styles.h2}>{name}</h1>

        {description && (
          <>
            <div
              className={`${styles.topic_desc} ${expanded ? styles.expanded : styles.collapsed}`}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            {description.length > 150 && (
              <button
                className={styles.readMoreBtn}
                onClick={() => setExpanded((prev) => !prev)}
                aria-expanded={expanded}
              >
                {expanded ? "Read Less" : "Read More"}
              </button>
            )}
          </>
        )}

        {hasSocial && (
          <div className={styles.topic_social}>
            {facebookUrl && (
              <AppLink href={facebookUrl} target="_blank" rel="nofollow noopener" title="Facebook">
                <svg><use href={`${ICONS_SVG}#ic_fb`}></use></svg>
              </AppLink>
            )}
            {twitterUrl && (
              <AppLink href={twitterUrl} target="_blank" rel="nofollow noopener" title="Twitter">
                <svg><use href={`${ICONS_SVG}#ic_twit`}></use></svg>
              </AppLink>
            )}
            {instagramUrl && (
              <AppLink href={instagramUrl} target="_blank" rel="nofollow noopener" title="Instagram">
                <svg><use href={`${ICONS_SVG}#ic_insta`}></use></svg>
              </AppLink>
            )}
            {linkedinUrl && (
              <AppLink href={linkedinUrl} target="_blank" rel="nofollow noopener" title="LinkedIn">
                <svg><use href={`${ICONS_SVG}#ic_linkedin`}></use></svg>
              </AppLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
}