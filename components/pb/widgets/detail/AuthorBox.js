import Image from "next/image";

/**
 * AuthorBox — reusable author section for all detail formats.
 *
 * Props:
 * @param {string} authorName
 * @param {string} authorUrl
 * @param {string} authorImage
 * @param {string} updatedText - formatted date string
 * @param {string} googleBadgeUrl
 * @param {string} googleBadgeImage
 */
export default function AuthorBox({
  authorName = "",
  authorUrl = "#",
  authorImage = "",
  updatedText = "",
  googleBadgeUrl = "#",
  googleBadgeImage = "",
}) {
  return (
    <section className="author-box">
      <figure>
        <div className="author-pic">
          <div className="author_thumb">
            <a href={authorUrl} title={`Posts by ${authorName}`} rel="author">
              {authorImage && (
                <Image src={authorImage} width={45} height={45} alt={authorName} unoptimized />
              )}
            </a>
          </div>
        </div>
        <figcaption>
          <a href={authorUrl} title={`Posts by ${authorName}`} rel="author">{authorName}</a>
          {updatedText && <span> Updated on:<span> {updatedText}</span></span>}
        </figcaption>
      </figure>
      <div className="d-flex">
        {googleBadgeImage && (
          <div className="google_badge_icon">
            <a href={googleBadgeUrl} target="_blank" title="google" rel="nofollow noreferrer">
              <Image src={googleBadgeImage} alt="Google News Badge" width={134} height={42} unoptimized />
            </a>
          </div>
        )}
        <div className="sharebox" id="share">
          Share
          <span><svg><use href="#shareIcon" /></svg></span>
        </div>
      </div>
    </section>
  );
}
