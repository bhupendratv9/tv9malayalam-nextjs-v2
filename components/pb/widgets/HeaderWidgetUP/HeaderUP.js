
'use client';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import { getHref, SITE_URL } from "@/lib/helper/commonHelper";
import styles from "./HeaderUP.module.css";
import GoogleSingleSignInUP from "../GoogleSingleSignInWidgetUP/GoogleSingleSignInUP";
import TopCitiesNavbarWidgetUP from "../TopCitiesNavbarWidgetUP/TopCitiesNavbarUP";
import { ICONS_SVG, HEADER_NAV_ITEMS_UP } from "@/lib/constants";
import { useSiteSettings } from "@/lib/SiteContext";

// Joins truthy class names — avoids nested template literals
const cx = (...classes) => classes.filter(Boolean).join(' ');

// Icon mapping by URL path for nav items from API
const ICON_MAP = {
  "/": "IconHome",
  "/politics": "IconPolitics",
  "/crime": "IconCrime",
  "/cities": "IconCities",
  "/short-videos": "IconVideo",
  "/videos/short-videos": "IconVideo",
  "/videos": "IconVideo",
  "/photo-gallery": "IconPhoto",
  "/photos": "IconPhoto",
};

// Navigation items — use API data if available, fall back to constants
const mapApiItems = (items) =>
  items.map((item) => ({
    label: item.title || "",
    href: item.url || "#",
    icon: ICON_MAP[item.url] || "IconHome",
  }));

export default function HeaderUP({ navItems, topCitiesItems }) {
  const NAV_ITEMS =
    Array.isArray(navItems) && navItems.length > 0
      ? mapApiItems(navItems)
      : HEADER_NAV_ITEMS_UP;
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();
  const { siteSettings } = useSiteSettings();

  const logoUrl = siteSettings?.logo_url || "";
  const siteName = siteSettings?.site_name || "TV9UP";
  const siteTitle = siteSettings?.englishtitle || siteName;
  const ssoEnabled = siteSettings?.sso_enabled === "1" || siteSettings?.sso_enabled === true;

  const activeHref = NAV_ITEMS
  .filter(({ href }) => {
    if (!href) return false;

    let linkPath = href;

    // Strip base URL if present
    if (typeof href === "string" && href.startsWith(SITE_URL)) {
      linkPath = href.replace(SITE_URL, "") || "/";
    }

    // Ignore external URLs
    if (linkPath.startsWith("http")) return false;

    if (!linkPath.startsWith("/")) {
      linkPath = `/${linkPath}`;
    }

    if (linkPath === "/") {
      return pathname === "/";
    }

    return (
      pathname === linkPath ||
      pathname.startsWith(`${linkPath}/`)
    );
  })
  .reduce(
    (best, item) =>
      !best || item.href.length > best.href.length ? item : best,
    null
  )?.href;

  const isHomepage = pathname === '/';

  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  // Helper function to check if a link is active
  const isActiveLink = (href) => {
    if (!href) return false;

    // Strip base URL if present to get the path
    let linkPath = href;
    if (typeof href === 'string' && href.startsWith(SITE_URL)) {
      linkPath = href.replace(SITE_URL, '') || '/';
    }

    // Skip external URLs that don't belong to our site
    if (linkPath.startsWith('http')) return false;

    // Ensure linkPath starts with /
    if (!linkPath.startsWith('/')) {
      linkPath = '/' + linkPath;
    }

    // Exact match for home
    if (linkPath === '/') {
      return pathname === '/';
    }

    // Match exact or any sub-path
    return pathname === linkPath ||
           pathname.startsWith(linkPath + '/') ||
           pathname.startsWith(linkPath + '?');
  };

  useEffect(() => {
    const handleScroll = () => {
      // language_menu is roughly 36px tall; go sticky once it scrolls out of view
      setIsSticky(window.scrollY > 36);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSubmenu = (index, e) => {
    e.stopPropagation();
    setOpenSubmenu((prev) => (prev === index ? null : index));
  };


  return (
    <>
      <div className={styles.language_menu}>
        <div className={styles.container}>
          <AppLink
            href="https://www.tv9hindi.com/"
            title="हिन्दी "
            rel="nofollow noopener"
            target="_blank"
          >
            हिन्दी
          </AppLink>
          <AppLink
            href="https://www.news9live.com/"
            title="English"
            target="_blank"
            rel="nofollow noopener"
          >
            News9
          </AppLink>
          <AppLink
            href="https://tv9kannada.com/"
            title="ಕನ್ನಡ"
            target="_blank"
            rel="nofollow noopener"
          >
            ಕನ್ನಡ
          </AppLink>
          <AppLink
            href="https://tv9telugu.com/"
            title="తెలుగు"
            target="_blank"
            rel="nofollow noopener"
          >
            తెలుగు
          </AppLink>
          <AppLink
            href="https://www.tv9marathi.com/"
            title="मराठी"
            target="_blank"
            rel="nofollow noopener"
          >
            मराठी
          </AppLink>
          <AppLink
            href="https://tv9gujarati.com/"
            title="ગુજરાતી"
            target="_blank"
            rel="nofollow noopener"
          >
            ગુજરાતી
          </AppLink>
          <AppLink
            href="https://tv9bangla.com/"
            title="বাংলা"
            target="_blank"
            rel="nofollow noopener"
          >
            বাংলা
          </AppLink>
          <AppLink
            href="https://tv9punjabi.com/"
            title="ਪੰਜਾਬੀ"
            target="_blank"
            rel="nofollow noopener"
          >
            ਪੰਜਾਬੀ
          </AppLink>
          <AppLink
            href="https://www.tv9tamilnews.com/"
            title="தமிழ்"
            target="_blank"
            rel="nofollow noopener"
          >
            தமிழ்
          </AppLink>
          <AppLink
            href="https://www.malayalamtv9.com/"
            title="മലയാളം"
            target="_blank"
            rel="nofollow noopener"
          >
            മലയാളം
          </AppLink>
          <AppLink
            href="https://www.money9live.com/"
            title="मनी9"
            target="_blank"
            rel="nofollow noopener"
          >
            मनी9
          </AppLink>
        </div>
      </div>
      <header className={cx(styles.main_header, isSticky && styles.sticky)}>
        <div className={styles.container}>
          <div className={styles.logo_wrap}>
            <AppLink href={SITE_URL || "/"} title="logo">
              {isHomepage && (
                <h1 title={siteTitle} style={{ display: "none" }}>
                  {siteTitle}
                </h1>
              )}
              {logoUrl && (
                <Image
                  width={52}
                  height={46}
                  src={logoUrl}
                  alt={siteName}
                  title={siteName}
                />
              )}
            </AppLink>
          </div>
          <div className={styles.tv9_catnavbar}>
            <div className={styles.navigation}>
              <ul className={styles.menu}>
                {NAV_ITEMS.map((item) => (
                  <li
                    key={item.href}
                    className={cx(
                      styles.menuItem,
                      activeHref === item.href && styles.current_menuItem
                    )}
                  >
                    <AppLink
                      href={getHref(item.href)}
                      title={item.label}
                      aria-current={activeHref === item.href ? "page" : undefined}
                    >
                      <svg>
                        <use href={`${ICONS_SVG}#${item.icon}`}></use>
                      </svg>
                      {item.href === '/' ? <span>{item.label}</span> : item.label}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.rhsNav_Menu}>
            {ssoEnabled && (
              <div id="GSignIn" className={styles.googleSignIn}>
                <svg width={28} height={28}>
                  <use href={`${ICONS_SVG}#sign_in`}></use>
                </svg>
              </div>
            )}
            <div
                title="Hamburger Menu"
                className={styles.hamburgerMenu}
                onClick={() => setMegaMenuOpen(true)}
              >
              <svg width={24} height={24}>
                <use href={`${ICONS_SVG}#ic_menu`}></use>
              </svg>
            </div>
          </div>
        </div>
      </header>

      {megaMenuOpen && (
        <div
          className={styles.menuOverlay}
          onClick={() => setMegaMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`${styles.menuNavigation}${megaMenuOpen ? ` ${styles.active}` : ""}`}
      >
        <div className={styles.container}>
          <div className={styles.megaMenu_Header}>
            <div className={styles.navHead}>Menu</div>
            <div onClick={() => setMegaMenuOpen(false)}>
              <svg className={styles.close_icon}>
                <use href={`${ICONS_SVG}#close_menu`}></use>
              </svg>
            </div>
          </div>
          <div className={styles.search_box}>
            <form
              action="#"
              method="post"
              id="headerSearch"
              className={styles.search}
            >
              <input
                autoComplete="off"
                placeholder="Search .."
                type="text"
                id="searchText2"
                name="searchText2"
                className={styles.s_input}
              />
              <button
                name="a"
                id="clickSearchValue"
                type="submit"
                aria-label="search"
                disabled=""
                className={styles.s_button}
              >
                <i className={styles.search_icon}></i>
              </button>
            </form>
          </div>
          <ul className={styles.listItems}>
            {NAV_ITEMS.map((item, index) => (
              <li
                key={item.href}
                className={item.subItems ? styles.hassubmenu : ""}
                onClick={
                  item.subItems ? (e) => toggleSubmenu(index, e) : undefined
                }
              >
                <AppLink
                  className={styles.catHead}
                  title={item.label}
                  href={getHref(item.href)}
                  onClick={
                    item.subItems ? (e) => e.stopPropagation() : undefined
                  }
                >
                  {item.label}
                </AppLink>
                {item.subItems && (
                  <>
                    <span
                      className={openSubmenu === index ? styles.arrowOpen : ""}
                    ></span>
                    <ul
                      className={`${styles.subItems}${openSubmenu === index ? ` ${styles.subItemsOpen}` : ""}`}
                    >
                      {item.subItems.map((sub) => (
                        <li key={sub.href}>
                          <AppLink title={sub.label} href={sub.href}>
                            {sub.label}
                          </AppLink>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Google SSO */}
      {ssoEnabled && <GoogleSingleSignInUP />}

      {isHomepage && <TopCitiesNavbarWidgetUP navItems={topCitiesItems} />}
    </>
  );
}
