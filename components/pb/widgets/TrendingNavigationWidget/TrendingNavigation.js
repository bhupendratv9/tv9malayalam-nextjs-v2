import { getHref, decodeHtml } from "@/lib/helper/commonHelper";
import AppLink from "@/components/AppLink";
import styles from "./TrendingNavigation.module.css";
import { ICONS_SVG } from "@/lib/constants";

export default function TrendingNavigationWidget({ trendingItems = [], dataConfig = {} }) {
  const safeItems = Array.isArray(trendingItems) ? trendingItems : [];

  if (!safeItems.length) return null;

  return (
    <div className={styles.TrendStripwrap}>
      <div className={styles.container}>
        <svg className={styles.trending_icon} width={16} height={24}>
          <use href={`${ICONS_SVG}#ic_trending`}></use>
        </svg>
        <ul className={styles.TrendStripLink}>
          {safeItems.map((item, index) => {
            const itemTitle = decodeHtml(item.title || "");
            const href = getHref(item.url || "#");
            const target = item.target || dataConfig.link_target || undefined;

            if (!itemTitle) return null;

            return (
              <li key={item.id || index}>
                <AppLink
                  href={href}
                  target={target}
                  title={itemTitle}
                  rel={target === "_blank" ? "nofollow noopener" : undefined}
                >
                  {itemTitle}
                </AppLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
