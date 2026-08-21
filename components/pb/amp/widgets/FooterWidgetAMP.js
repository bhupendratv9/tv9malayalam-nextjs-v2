import { esc } from "../../../../lib/server/amp/ampUtils";
import { GOOGLE_PLAY_BADGE, APP_STORE_BADGE } from "../../../../lib/constants";

export function renderFooterAmp(section, queryParams, meta, siteSettings = {}) {
  const siteUrl = esc(process.env.NEXT_PUBLIC_SITE_URL || "/");
  const siteName = esc(siteSettings?.site_name || "TV9UP");
  const logoUrl = esc(siteSettings?.logo_url || "");
  const facebookUrl = esc(siteSettings?.facebook_url || "");
  const twitterUrl = esc(siteSettings?.twitter_url || "");
  const instagramUrl = esc(siteSettings?.instagram_url || "");
  const youtubeUrl = esc(siteSettings?.youtube_url || "");
  const playStoreUrl = esc(siteSettings?.play_store_url || "");
  const appStoreUrl = esc(siteSettings?.app_store_url || "");
  const footerText = esc(siteSettings?.footer_text || `Copyright \u00A9 ${new Date().getFullYear()} ${siteName}. All Rights Reserved.`);
  const breadcrumbHome = siteSettings?.breadcrumb_home_title || "Home";

  // Footer links from siteSettings
  let footerLinks = [];
  try {
    const raw = siteSettings?.footer_links_json;
    if (raw) footerLinks = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch { /* ignore */ }

  // Network sites from siteSettings
  let networkSites = [];
  try {
    const raw = siteSettings?.network_sites_json;
    if (raw) networkSites = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch { /* ignore */ }

  // Nav items from siteSettings
  let navItems = [];
  try {
    const raw = siteSettings?.nav_menu_json;
    if (raw) {
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      navItems = parsed?.items || parsed || [];
    }
  } catch { /* ignore */ }

  return `
<footer class="tv9_footer">
  <div class="tv9_footerlinks">
    <div class="container">
      <div class="footer_LHS">
        <div class="fsocial">
          ${logoUrl ? `<amp-img width="69" height="60" src="${logoUrl}" alt="${siteName}" title="${siteName}" layout="fixed"></amp-img>` : ""}
          <div class="fsocial_links"><span>Follow US ON</span>
            <ul>
              ${facebookUrl ? `<li><a title="FaceBook" href="${facebookUrl}" target="_blank" rel="nofollow noopener"><svg><use href="#ic_fb"></use></svg></a></li>` : ""}
              ${twitterUrl ? `<li><a title="Twitter" href="${twitterUrl}" target="_blank" rel="nofollow noopener"><svg><use href="#ic_twit"></use></svg></a></li>` : ""}
              ${instagramUrl ? `<li><a title="Instagram" href="${instagramUrl}" target="_blank" rel="nofollow noopener"><svg><use href="#ic_insta"></use></svg></a></li>` : ""}
              ${youtubeUrl ? `<li><a title="Youtube" href="${youtubeUrl}" target="_blank" rel="nofollow noopener"><svg class="yt_icon"><use href="#ic_ytube"></use></svg></a></li>` : ""}
            </ul>
          </div>
        </div>
        ${(playStoreUrl || appStoreUrl) ? `
        <div class="download_links">
          ${playStoreUrl ? `<a rel="nofollow noopener" href="${playStoreUrl}" target="_blank"><amp-img width="120" height="36" src="${esc(GOOGLE_PLAY_BADGE)}" alt="Play Store" title="Play Store" layout="intrinsic"></amp-img></a>` : ""}
          ${appStoreUrl ? `<a rel="nofollow noopener" href="${appStoreUrl}" target="_blank"><amp-img width="120" height="36" src="${esc(APP_STORE_BADGE)}" alt="App Store" title="App Store" layout="intrinsic"></amp-img></a>` : ""}
        </div>
        ` : ""}
      </div>
      <div class="footer_RHS">
        ${footerLinks.length > 0 ? `
        <div class="footer_navlinks">
          ${footerLinks.map((link) => `<a href="${esc(link.url || "#")}" title="${esc(link.label || "")}">${esc(link.label || "")}</a>`).join(" ")}
        </div>
        ` : ""}
        ${networkSites.length > 0 ? `
        <div class="footer_netlinks"><strong>Network Sites:</strong>
          <ul>
            ${networkSites.map((site) => `<li><a href="${esc(site.url || "#")}" title="${esc(site.title || site.label || "")}" target="_blank" rel="nofollow noopener">${esc(site.label || "")}</a></li>`).join("")}
          </ul>
        </div>
        ` : ""}
        <div class="copyright">${footerText}</div>
      </div>
    </div>
  </div>
</footer>

<amp-sidebar id="sidebar" class="menuNavigation" layout="nodisplay" side="right" role="menu">
  <div class="container">
    <div class="megaMenu_Header">
      <div class="navHead">Menu</div>
      <div on="tap:sidebar.close" aria-label="Click to close sidebar" role="button" tabindex="0" class="closeMenu">
        <svg class="close_icon"><use href="#close_menu"></use></svg>
      </div>
    </div>
    <amp-accordion class="listItems" expand-single-section>
      ${navItems.map((item) => `
      <section>
        <h4><a class="catHead" title="${esc(item.label || item.title || "")}" href="${esc(siteUrl)}${esc(item.url || item.href || "#")}">${esc(item.label || item.title || "")}</a></h4>
        <ul class="subItems"></ul>
      </section>
      `).join("")}
    </amp-accordion>
  </div>
</amp-sidebar>

<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol viewbox="0 0 25 24" id="close_menu">
    <path d="M18.5 6L6.5 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M6.5 6L18.5 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </symbol>
  <symbol viewBox="0 0 23 23" id="ic_fb">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 11.5642C0 17.2816 4.15246 22.0359 9.58333 23V14.6941H6.70833V11.5H9.58333V8.94413C9.58333 6.06913 11.4358 4.47254 14.0559 4.47254C14.8858 4.47254 15.7809 4.6 16.6108 4.72746V7.66667H15.1417C13.7358 7.66667 13.4167 8.36912 13.4167 9.26421V11.5H16.4833L15.9725 14.6941H13.4167V23C18.8475 22.0359 23 17.2826 23 11.5642C23 5.20375 17.825 0 11.5 0C5.175 0 0 5.20375 0 11.5642Z" fill="#666666"/>
  </symbol>
  <symbol viewBox="0 0 48 48" id="ic_twit">
    <g clip-path="url(#clip0_918_16)">
      <path d="M24.0002 47.8C37.1446 47.8 47.8002 37.1444 47.8002 24C47.8002 10.8556 37.1446 0.200012 24.0002 0.200012C10.8558 0.200012 0.200195 10.8556 0.200195 24C0.200195 37.1444 10.8558 47.8 24.0002 47.8Z" fill="#666766"/>
      <path d="M12.6 12.9L21.1 25L12.5 35.1H14.8L22.1 26.5L28.2 35.1H35.5L26.2 21.8L33.7 12.9H31.4L25.1 20.3L19.9 12.9H12.6Z" fill="white"/>
      <path d="M16.0996 14.8H18.8996L31.9996 33.2H29.0996L16.0996 14.8Z" fill="#666766"/>
    </g>
  </symbol>
  <symbol viewBox="0 0 23 23" id="ic_insta">
    <path d="M11.5 7.72506C9.4213 7.72506 7.72492 9.42145 7.72492 11.5002C7.72492 13.5789 9.4213 15.2753 11.5 15.2753C13.5787 15.2753 15.2751 13.5789 15.2751 11.5002C15.2751 9.42145 13.5787 7.72506 11.5 7.72506ZM22.8225 11.5002C22.8225 9.93688 22.8366 8.38776 22.7488 6.82731C22.661 5.01481 22.2476 3.40621 20.9222 2.08082C19.594 0.7526 17.9882 0.341956 16.1757 0.254163C14.6124 0.16637 13.0633 0.18053 11.5028 0.18053C9.93956 0.18053 8.39044 0.16637 6.82999 0.254163C5.01749 0.341956 3.4089 0.755432 2.08351 2.08082C0.755286 3.40905 0.344641 5.01481 0.256848 6.82731C0.169055 8.39059 0.183215 9.93971 0.183215 11.5002C0.183215 13.0606 0.169055 14.6126 0.256848 16.173C0.344641 17.9855 0.758118 19.5941 2.08351 20.9195C3.41173 22.2477 5.01749 22.6584 6.82999 22.7462C8.39327 22.8339 9.94239 22.8198 11.5028 22.8198C13.0661 22.8198 14.6152 22.8339 16.1757 22.7462C17.9882 22.6584 19.5968 22.2449 20.9222 20.9195C22.2504 19.5913 22.661 17.9855 22.7488 16.173C22.8395 14.6126 22.8225 13.0634 22.8225 11.5002ZM11.5 17.3087C8.28566 17.3087 5.69152 14.7145 5.69152 11.5002C5.69152 8.2858 8.28566 5.69166 11.5 5.69166C14.7144 5.69166 17.3085 8.2858 17.3085 11.5002C17.3085 14.7145 14.7144 17.3087 11.5 17.3087ZM17.5464 6.81031C16.7959 6.81031 16.1899 6.20426 16.1899 5.45377C16.1899 4.70328 16.7959 4.09723 17.5464 4.09723C18.2969 4.09723 18.9029 4.70328 18.9029 5.45377C18.9032 5.63198 18.8682 5.80848 18.8001 5.97316C18.732 6.13785 18.6321 6.28748 18.5061 6.41349C18.3801 6.5395 18.2305 6.63942 18.0658 6.70751C17.9011 6.7756 17.7246 6.81054 17.5464 6.81031Z" fill="#666666"/>
  </symbol>
  <symbol viewBox="0 0 26 18" id="ic_ytube">
    <path d="M25.4584 3.50708C25.3112 3.02231 25.0244 2.58342 24.6286 2.23708C24.2215 1.88008 23.7227 1.62471 23.1791 1.49508C21.1446 1.00008 12.9936 1.00008 12.9936 1.00008C9.5955 0.964389 6.19827 1.12135 2.82106 1.47008C2.27743 1.60929 1.7795 1.87036 1.37156 2.23008C0.970725 2.58608 0.680392 3.02508 0.528725 3.50608C0.164392 5.31782 -0.0126254 7.15742 5.82636e-05 9.00008C-0.0129417 10.8411 0.163642 12.6801 0.528725 14.4941C0.677142 14.9731 0.966392 15.4101 1.36831 15.7631C1.77022 16.1161 2.27073 16.3711 2.82106 16.5061C4.88264 17.0001 12.9936 17.0001 12.9936 17.0001C16.3959 17.0358 19.7975 16.8789 23.1791 16.5301C23.7227 16.4004 24.2215 16.1451 24.6286 15.7881C25.0243 15.4418 25.3107 15.0029 25.4573 14.5181C25.8312 12.707 26.0129 10.8667 26.0001 9.02308C26.0282 7.17168 25.8466 5.32264 25.4584 3.50608V3.50708ZM10.4022 12.4241V5.57708L17.1839 9.00108L10.4022 12.4241Z" fill="#666666"/>
  </symbol>
</svg>
  `;
}
