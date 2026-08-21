import Link from "next/link";
import Head from "next/head";
import { useSiteSettings } from "../lib/SiteContext";
import { buildBreadcrumbSchema, buildBreadcrumbTrail } from "../lib/schemas/BreadcrumbSchema";

/**
 * Breadcrumb — Reusable breadcrumb component with BreadcrumbList schema.
 *
 * Props:
 *   - items: intermediate breadcrumb links [{ label, url }]
 *   - current: current page title (last item, no link)
 *   - showSchema: whether to inject JSON-LD in <head> (default false — let page builder handle it)
 *
 * Usage:
 *   <Breadcrumb items={[{ label: "Sports", url: "/sports" }]} current="Cricket News" />
 *   <Breadcrumb current="Privacy Policy" showSchema />
 */
export default function Breadcrumb({ items = [], current = "", showSchema = false }) {
  const { siteSettings } = useSiteSettings();

  const trail = buildBreadcrumbTrail(siteSettings, items, current);

  return (
    <>
      {showSchema && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                buildBreadcrumbSchema(null, { siteSettings, breadcrumbs: trail })
              ),
            }}
          />
        </Head>
      )}

      <nav className="breadcrumb" aria-label="Breadcrumb">
        {trail.map((item, idx) => {
          const isLast = idx === trail.length - 1;
          if (isLast || !item.url) {
            return (
              <span key={idx} className="breadcrumb_last">
                {item.name}
              </span>
            );
          }
          return (
            <span key={idx}>
              <Link href={item.url} title={item.name}>
                {item.name}
              </Link>
            </span>
          );
        })}
      </nav>
    </>
  );
}
