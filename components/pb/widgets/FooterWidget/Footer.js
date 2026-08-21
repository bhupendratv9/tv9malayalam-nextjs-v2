import AppLink from "@/components/AppLink";
import Image from "next/image";
import styles from "./Footer.module.css";
import { SITE_URL, getHref } from "@/lib/helper/commonHelper";
import { useSiteSettings } from "@/lib/SiteContext";
import { ICONS_SVG } from "@/lib/constants";

export default function FooterWidget() {
  const { siteSettings } = useSiteSettings();
  const year = new Date().getFullYear();

  // From siteSettings API
  const logoUrl = siteSettings?.logo_url || "";
  const siteName = siteSettings?.site_name || "";
  const footerText = siteSettings?.footer_text || "";
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

  // App store URLs (suggested keys to add to siteSettings API)
  const playStoreUrl = siteSettings?.play_store_url || "";
  const appStoreUrl = siteSettings?.app_store_url || "";

  return (
    <footer className={styles.tv9_footer}>
      <div className={styles.tv9_footerlinks}>
        <div className={styles.container}>
          <div className={styles.footer_LHS}>
            <div className={styles.fsocial}>
              {logoUrl && (
                <AppLink href={`${SITE_URL}`}>
                  <Image
                    width={69}
                    height={67}
                    src={logoUrl}
                    alt={siteName}
                    title={siteName}
                    style={{ width: "69", height: "67" }}
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
          </div>

          {(playStoreUrl || appStoreUrl) && (
            <div className={styles.dowoloadBtn}>
              <span>Download App</span>
              <div className={styles.download_links}>
                {playStoreUrl && (
                  <AppLink href={playStoreUrl} target="_blank" rel="nofollow noopener" title="Google Play Store">
                    <Image width={120} height={37} src="https://static.tv9hindi.com/images/googleplay.png" alt="Google Play Store" title="Google Play Store" />
                  </AppLink>
                )}
                {appStoreUrl && (
                  <AppLink href={appStoreUrl} target="_blank" rel="nofollow noopener" title="App Store">
                    <Image width={120} height={37} src="https://static.tv9hindi.com/images/appstore.png" alt="App Store" title="App Store" />
                  </AppLink>
                )}
              </div>
            </div>
          )}
        </div>
        {footerText && <div className={styles.copyright}>{footerText}</div>}
      </div>
    </footer>
  );
}
