/**
 * AMP Breadcrumb Widget
 * Renders breadcrumb navigation from the breadcrumb array in section data.
 */
import { esc } from "../../../../lib/server/amp/ampUtils";

export function renderBreadcrumbAmp(section, queryParams, meta, siteSettings = {}) {
  const data = section?.data || {};
  const breadcrumb = data?.breadcrumb || data?.data?.breadcrumb || [];

  if (!Array.isArray(breadcrumb) || breadcrumb.length === 0) return "";

  const items = breadcrumb.map((item) => {
    const name = esc(item?.name || "");
    const url = item?.url || "#";
    return `<span><a href="${esc(url)}" title="${name}">${name}</a></span>`;
  }).join("");

  return `<div id="breadcrumbs" class="breadcrumb">${items}</div>`;
}
