import Link from "next/link";
import PropTypes from "prop-types";
import { getHref } from "@/lib/helper/commonHelper";

/**
 * Page-level breadcrumb using shared .breadcrumb styles.
 * items: [{ label, href? }] — last item is current page (no link unless href given)
 */
export default function Breadcrumb({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="breadcrumb" id="breadcrumbs">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const label = item?.label || "";
        if (!label) return null;

        if (isLast) {
          return (
            <span key={`${label}-${index}`} className="breadcrumb_last">
              {item.href ? (
                <Link href={getHref(item.href)} title={label}>
                  {label}
                </Link>
              ) : (
                label
              )}
            </span>
          );
        }

        return (
          <span key={`${label}-${index}`}>
            <Link href={getHref(item.href || "/")} title={label}>
              {label}
            </Link>
          </span>
        );
      })}
    </div>
  );
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ),
};
