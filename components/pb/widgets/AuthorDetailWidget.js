"use client";

import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { decodeHtml } from "@/lib/helper/commonHelper";

const IMAGE_SIZE = 150;

const DEFAULT_AUTHOR_ENDPOINT =
  "https://www.tv9hindi.com/pagecategory/author-detail/{author}";

function resolveAuthorEndpoint(endpoint = "", queryParams = {}) {
  if (!endpoint) return "";

  const authorSlug =
    queryParams.nameSlug || queryParams.authorSlug || queryParams.author || "";
  if (!authorSlug) return endpoint;

  return endpoint
    .replaceAll("{author}", authorSlug)
    .replaceAll("{nameSlug}", authorSlug);
}

function parseAuthorResponse(json) {
  if (!json || typeof json !== "object") return null;
  if (json.data && typeof json.data === "object" && !Array.isArray(json.data)) {
    return json.data;
  }
  if (Array.isArray(json) && json.length > 0) return json[0];
  if (json.display_name || json.slug || json.id) return json;
  return null;
}

function getContactEmail(author = {}) {
  const email = author.email || author.user_email || "";
  if (email) return email;

  const website = String(author.website || "");
  if (website.startsWith("mailto:")) return website.replace(/^mailto:/i, "");
  if (website.includes("@") && !website.startsWith("http")) return website;

  return "";
}

function getAuthorRecord(items = [], data = null) {
  if (data?.data && typeof data.data === "object" && !Array.isArray(data.data)) {
    return data.data;
  }
  if (data && typeof data === "object" && !Array.isArray(data)) {
    if (data.display_name || data.slug || data.id) return data;
  }
  if (Array.isArray(items) && items.length > 0) return items[0];
  return null;
}

function normalizeAuthor(author = {}) {
  const acf = author.acf || {};
  const name = decodeHtml(author.display_name || author.name || author.author_name || "");
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
  dataConfig = {},
  queryParams = {},
  section = {},
}) {
  const config = dataConfig?.endpoint ? dataConfig : section?.dataConfig || section?.data_config || {};
  const authorSlug =
    queryParams.nameSlug || queryParams.authorSlug || queryParams.author || "";
  const endpoint = useMemo(() => {
    const rawEndpoint = config.endpoint || DEFAULT_AUTHOR_ENDPOINT;
    return resolveAuthorEndpoint(rawEndpoint, { ...queryParams, nameSlug: authorSlug });
  }, [config.endpoint, authorSlug, queryParams]);

  const serverAuthor = useMemo(
    () => normalizeAuthor(getAuthorRecord(items, data)),
    [items, data]
  );

  const [author, setAuthor] = useState(serverAuthor);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (serverAuthor?.name) {
      setAuthor(serverAuthor);
      return;
    }

    if (!endpoint || !authorSlug) return;

    let cancelled = false;
    setLoading(true);

    fetch(endpoint, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (cancelled) return;
        const record = parseAuthorResponse(json);
        setAuthor(record ? normalizeAuthor(record) : null);
      })
      .catch(() => {
        if (!cancelled) setAuthor(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [endpoint, serverAuthor, authorSlug]);

  if (loading && !author?.name) return null;
  if (!author?.name) return null;

  const toggleId = `author-read-more-${author.slug || author.id || "default"}`;
  const showReadMore = author.bio && author.bio.length > 200;

  return (
    <div className="personInfo_Widget anchorDetailExpand">
      <div className="imgThumb">
        {author.image ? (
          <Image
            alt={author.name || title || "user"}
            src={author.image}
            height={IMAGE_SIZE}
            width={IMAGE_SIZE}
            loading="lazy"
            unoptimized
          />
        ) : null}
        <h1 className="h2">{author.name}</h1>
        {author.designation ? <h2 className="desig">{author.designation}</h2> : null}
        {author.email ? (
          <a href={`mailto:${author.email}`} className="mail">
            <svg aria-hidden="true">
              <use href="#ic-mail" />
            </svg>
            {author.email}
          </a>
        ) : null}
      </div>

      {author.bio ? (
        <div className="infoWrapper">
          <input
            type="checkbox"
            id={toggleId}
            className="anchorDetailExpand__toggle"
          />

          <div className="topicDesc">
            <p>{author.bio}</p>
          </div>

          {showReadMore ? (
            <label htmlFor={toggleId} className="appendMore">
              <span className="anchorDetailExpand__more">Read More</span>
              <span className="anchorDetailExpand__less">Read Less</span>
            </label>
          ) : null}
        </div>
      ) : null}

      <style jsx>{`
        .anchorDetailExpand {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }

        .infoWrapper {
          flex: 1;
          min-width: 0;
        }

        .anchorDetailExpand__toggle {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .topicDesc {
          max-height: 7.5rem;
          overflow: hidden;
          transition: max-height 0.35s ease;
        }

        .topicDesc :global(p) {
          margin: 0;
        }

        .anchorDetailExpand__toggle:checked ~ .topicDesc {
          max-height: 80rem;
        }

        .appendMore {
          display: block;
          margin-top: 0.5rem;
          color: #dc0000;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .appendMore:hover {
          text-decoration: underline;
        }

        .anchorDetailExpand__less {
          display: none;
        }

        .anchorDetailExpand__toggle:checked ~ .appendMore .anchorDetailExpand__more {
          display: none;
        }

        .anchorDetailExpand__toggle:checked ~ .appendMore .anchorDetailExpand__less {
          display: inline;
        }
      `}</style>
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
