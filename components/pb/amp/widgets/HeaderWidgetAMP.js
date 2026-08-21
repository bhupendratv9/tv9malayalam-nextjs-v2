import { esc } from "../../../../lib/server/amp/ampUtils";

export function renderHeaderAmp(section, queryParams, meta, siteSettings = {}) {
  const logoUrl = esc(siteSettings?.logo_url || "");
  const siteName = esc(siteSettings?.site_name || "TV9UP");
  const siteUrl = esc(process.env.NEXT_PUBLIC_SITE_URL || "/");

  return `
    <header class="main_header">
      <div class="container">
        <div class="logo_wrap">
          <a href="${siteUrl}" title="${siteName}">
            ${logoUrl ? `<amp-img class="logo" src="${logoUrl}" width="52" height="46" alt="${siteName}" layout="fixed"></amp-img>` : `<span>${siteName}</span>`}
          </a>
        </div>
        <div class="rhsNav_Menu">
          <div title="Navigation Menu" id="toggleNav">
            <span on="tap:sidebar.toggle" aria-label="Click to open sidebar" role="button" tabindex="0" class="MenuBtn">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </span>
          </div>
        </div>
      </div>
    </header>
  `;
}
