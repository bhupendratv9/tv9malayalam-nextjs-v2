"use client";

import styles from "./AuthorDetail.module.css";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import Image from "next/image";
import { decodeHtml } from "@/lib/helper/commonHelper";

function getContactEmail(author = {}) {
  const email = author.email || author.user_email || "";
  if (email) return email;

  const website = String(author.website || "");

  if (website.startsWith("mailto:")) {
    return website.replace(/^mailto:/i, "");
  }

  if (website.includes("@") && !website.startsWith("http")) {
    return website;
  }

  return "";
}

function getAuthorRecord(items = [], data = null) {
  if (
    data?.data &&
    typeof data.data === "object" &&
    !Array.isArray(data.data)
  ) {
    return data.data;
  }

  if (data && typeof data === "object" && !Array.isArray(data)) {
    if (data.display_name || data.slug || data.id) {
      return data;
    }
  }

  if (Array.isArray(items) && items.length > 0) {
    return items[0];
  }

  return null;
}

function normalizeAuthor(author = {}) {
  const acf = author.acf || {};

  const name = decodeHtml(
    author.display_name || author.name || author.author_name || ""
  );

  let designation = decodeHtml(
    acf.post_in_tv9 || author.designation || author.role || ""
  );

  let bio = decodeHtml(author.description || "");

  if (!designation && bio) {
    const dotIndex = bio.search(/[.。]/);

    if (dotIndex > 0 && dotIndex < 120) {
      designation = bio.slice(0, dotIndex).trim();
      bio = bio.slice(dotIndex + 1).trim();
    }
  }

  const image =
    author.avatar_url ||
    acf.user_image ||
    author.image ||
    author?.avatar_urls?.[96] ||
    "";

  return {
    id: author.id || author.ID || null,
    name,
    slug: author.slug || "",
    designation,
    bio: bio || decodeHtml(author.description || ""),
    image,
    email: getContactEmail(author),
  };
}

export default function AuthorDetailWidget({
  title = "",
  items = [],
  data = null,
}) {
  const author = useMemo(
    () => normalizeAuthor(getAuthorRecord(items, data)),
    [items, data]
  );

  const [expanded, setExpanded] = useState(false);

  if (!author?.name) return null;

  const showReadMore = Boolean(author.bio && author.bio.length > 150);

  return (
    <div className={styles.author_profile_wrap}>
      <div className={styles.author_profile}>
        <div className={styles.author_details}>
          <h1 className={styles.h2}>{author.name}</h1>

          {author.bio ? (
            <>
              <div
                className={`${styles.author_desc} ${
                  expanded ? styles.expanded : styles.collapsed
                }`}
              >
                <p>{author.bio}</p>
              </div>

              {showReadMore && (
                <button
                  type="button"
                  className={styles.readMoreBtn}
                  onClick={() => setExpanded((prev) => !prev)}
                  aria-expanded={expanded}
                >
                  {expanded ? "Read Less" : "Read More"}
                </button>
              )}
            </>
          ) : null}
        </div>

        {author.image ? (
          <div className={styles.author_thumb}>
            <Image
              src={author.image}
              alt={author.name || title || "Author"}
              width={160}
              height={160}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

AuthorDetailWidget.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  data: PropTypes.object,
  dataConfig: PropTypes.object,
  queryParams: PropTypes.object,
  section: PropTypes.object,
};