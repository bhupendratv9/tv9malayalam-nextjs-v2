import Image from "next/image";
import AppLink from "@/components/AppLink";
import styles from "./FooterUP.module.css";
import { SITE_URL, getHref } from "@/lib/helper/commonHelper";
import { useSiteSettings } from "@/lib/SiteContext";
import { ICONS_SVG, GOOGLE_PLAY_BADGE, APP_STORE_BADGE } from "@/lib/constants";

export default function FooterUP() {
  const { siteSettings } = useSiteSettings();
  const year = new Date().getFullYear();

  // From siteSettings API
  const logoUrl = siteSettings?.logo_url || "";
  const siteName = siteSettings?.site_name || "TV9UP";
  const footerText = siteSettings?.footer_text || `Copyright \u00A9 ${year} TV9UP. All Rights Reserved.`;
  const twitterUrl = siteSettings?.twitter_url || "";
  const youtubeUrl = siteSettings?.youtube_url || "";
  const facebookUrl = siteSettings?.facebook_url || "";
  const instagramUrl = siteSettings?.instagram_url || "";

  // Parse footer_links_json from siteSettings
  let footerLinks = [];
  try {
    const raw = siteSettings?.footer_links_json;
    if (raw) footerLinks = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch { /* ignore parse errors */ }

  // Parse network_sites_json from siteSettings
  let networkSites = [];
  try {
    const raw = siteSettings?.network_sites_json;
    if (raw) networkSites = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch { /* ignore parse errors */ }

  // App store URLs
  const playStoreUrl = siteSettings?.play_store_url || "";
  const appStoreUrl = siteSettings?.app_store_url || "";

  return (
    <footer className={styles.tv9_footer}>
      <div className={styles.tv9_footerlinks}>
        <div className={styles.container}>
          <div className={styles.footer_LHS}>
            <div className={styles.fsocial}>
              {logoUrl && (
                <AppLink href={SITE_URL || "/"}>
                  <Image
                    width={69}
                    height={60}
                    src={logoUrl}
                    alt={siteName}
                    title={siteName}
                  />
                </AppLink>
              )}
              <div className={styles.fsocial_links}>
                <span>Follow US ON</span>
                <ul>
                  {facebookUrl && (
                    <li>
                      <AppLink title="FaceBook" href={facebookUrl} target="_blank" rel="nofollow noopener">
                        <svg><use href={`${ICONS_SVG}#ic_fb`}></use></svg>
                      </AppLink>
                    </li>
                  )}
                  {twitterUrl && (
                    <li>
                      <AppLink title="Twitter" href={twitterUrl} target="_blank" rel="nofollow noopener">
                        <svg><use href={`${ICONS_SVG}#ic_twit`}></use></svg>
                      </AppLink>
                    </li>
                  )}
                  {instagramUrl && (
                    <li>
                      <AppLink title="Instagram" href={instagramUrl} target="_blank" rel="nofollow noopener">
                        <svg><use href={`${ICONS_SVG}#ic_insta`}></use></svg>
                      </AppLink>
                    </li>
                  )}
                  {youtubeUrl && (
                    <li>
                      <AppLink title="Youtube" href={youtubeUrl} target="_blank" rel="nofollow noopener">
                        <svg className="yt_icon"><use href={`${ICONS_SVG}#ic_ytube`}></use></svg>
                      </AppLink>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            {(playStoreUrl || appStoreUrl) && (
              <div className={styles.download_links}>
                {playStoreUrl && (
                  <AppLink href={playStoreUrl} target="_blank" rel="nofollow noopener" title="Google Play Store">
                    <Image width={120} height={37} src={GOOGLE_PLAY_BADGE} alt="Google Play Store" title="Google Play Store" />
                  </AppLink>
                )}
                {appStoreUrl && (
                  <AppLink href={appStoreUrl} target="_blank" rel="nofollow noopener" title="App Store">
                    <Image width={120} height={37} src={APP_STORE_BADGE} alt="App Store" title="App Store" />
                  </AppLink>
                )}
              </div>
            )}
          </div>

          <div className={styles.footer_RHS}>
            {footerLinks.length > 0 && (
              <div className={styles.footer_navlinks}>
                {footerLinks.map((link, idx) => {
                  const href = getHref(link.url || "#");
                  const isExternal = href.startsWith("http") && !href.includes(SITE_URL);
                  return (
                    <AppLink
                      key={idx}
                      href={href}
                      title={link.label}
                      {...(isExternal ? { target: "_blank", rel: "nofollow noopener" } : {})}
                    >
                      {link.label}
                    </AppLink>
                  );
                })}
              </div>
            )}

            {networkSites.length > 0 && (
              <div className={styles.footer_netlinks}>
                <strong>Network Sites:</strong>
                <ul>
                  {networkSites.map((site, idx) => (
                    <li key={idx}>
                      <AppLink
                        href={site.url || "#"}
                        title={site.label || site.title || ""}
                        target="_blank"
                        rel="nofollow noopener"
                      >
                        {site.label || site.title || ""}
                      </AppLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {footerText && <div className={styles.copyright}>{footerText}</div>}
          </div>
        </div>
      </div>
    </footer>
  );
}
