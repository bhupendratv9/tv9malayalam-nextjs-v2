import AppLink from "@/components/AppLink";
import Image from "next/image";
import styles from "./AuthorList.module.css";
import { decodeHtml, getHref, getViewMoreUrl, getViewMoreLabel, ViewMoreLink } from "@/lib/helper/commonHelper";

const IMAGE_SIZE = 170;

function normalizeAuthor(item = {}) {
  const acf = item.acf || {};
  const slug = item.slug || item.name_slug || "";
  const name = decodeHtml(
    acf.author_hindi_name ||
      item.display_name ||
      item.name ||
      item.author_name ||
      ""
  );
  const designation = decodeHtml(
    acf.post_in_tv9 ||
      item.designation ||
      item.role ||
      ""
  );
  const image =
    acf.user_image ||
    item.image ||
    item?.avatar_urls?.[96] ||
    "";
  const url = item.url || item.link || item.permalink || (slug ? `/author/${slug}` : "#");

  return {
    id: item.id || item.ID || null,
    name,
    designation,
    image,
    url: getHref(url),
    slug,
  };
}

function AuthorCard({ author }) {
  if (!author?.name) return null;

  return (
    <figure id={author.id ? String(author.id) : undefined}>
      <AppLink href={author.url || "#"}>
        <div className={styles.img_wrap}>
          {author.image ? (
            <Image
              alt={author.name || "user"}
              src={author.image}
              height={IMAGE_SIZE}
              width={IMAGE_SIZE}
            />
          ) : null}
        </div>
        <div className={styles.card_title}>
          <h3>{author.name}</h3>
          {author.designation ? <span>{author.designation}</span> : null}
        </div>
      </AppLink>
    </figure>
  );
}

/**
 * Extract authors from items array.
 * API response can be:
 *   - items = [{ authors: [...] }]  (nested)
 *   - items = [author1, author2, ...] (flat)
 */
function extractAuthors(items = []) {
  if (!Array.isArray(items) || !items.length) return [];

  // Nested format: items[0].authors
  if (items[0]?.authors && Array.isArray(items[0].authors)) {
    return items[0].authors;
  }

  // Flat format: items are authors directly
  if (items[0]?.display_name || items[0]?.slug || items[0]?.author_name) {
    return items;
  }

  return items;
}

export default function AuthorListWidget({
  title = "",
  items = [],
  sectionUrl = "#",
  dataConfig = {},
  view_more_link = null,
  view_more_label = null,
}) {
  const displayTitle = decodeHtml(dataConfig.title || title) || "Authors";
  const viewMoreUrl = getViewMoreUrl({ view_more_link, dataConfig, sectionUrl });
  const viewMoreLabel = getViewMoreLabel({ view_more_label });

  const rawAuthors = extractAuthors(items);
  const authors = rawAuthors
    .map((item) => normalizeAuthor(item))
    .filter((author) => author.name);

  if (!authors.length) return null;

  return (
    <>
      <div className="tv9common_heading">
        <h1 className="h2">
          {viewMoreUrl && viewMoreUrl !== "#" ? (
            <AppLink href={viewMoreUrl} title={displayTitle}>{displayTitle}</AppLink>
          ) : (
            displayTitle
          )}
        </h1>
        <ViewMoreLink href={viewMoreUrl} label={viewMoreLabel} />
      </div>
      <div className={styles.authorsListing_Wrapper} id="category-ajax-posts">
        {authors.map((author) => (
          <AuthorCard key={author.id || author.slug || author.url} author={author} />
        ))}
      </div>
    </>
  );
}
