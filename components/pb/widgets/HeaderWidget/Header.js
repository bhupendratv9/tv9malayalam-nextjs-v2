import { useEffect, useState } from "react";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import { useRouter } from "next/router";
import { DEFAULT_NAV_ITEMS, ICONS_SVG } from "../../../../lib/constants";
import { useSiteSettings } from "../../../../lib/SiteContext";
import { getHref, SITE_URL } from "@/lib/helper/commonHelper";
import styles from "./Header.module.css";
import GoogleSingleSignIn from "../GoogleSingleSignInWidget/GoogleSingleSignIn";

const megaMenuItems = [
  { label: "சமீபத்திய செய்திகள்", href: "/latest-news" },
  { label: "தமிழ்நாடு", href: "/tamil-nadu" },
  { label: "இந்தியா", href: "/india" },
  { label: "உலகம்", href: "/world" },
  { label: "விளையாட்டு", href: "/sports" },
  { label: "பொழுதுபோக்கு", href: "/entertainment" },
  { label: "லைஃப்ஸ்டைல்", href: "/lifestyle" },
  { label: "வணிகம்", href: "/business" },
  { label: "டெக்னாலஜி", href: "/technology" },
  { label: "ஆன்மீகம்", href: "/religion" },
  { label: "வைரல்", href: "/trending" },
  { label: "ஹெஃல்த்", href: "/health" },
  { label: "ஷார்ட் வீடியோஸ்", href: "/videos/short-videos" },
  { label: "வலை கதைகள்", href: "/web-stories" },
  { label: "போட்டோ கேலரி", href: "/photo-gallery" },
];

export default function HeaderWidget({ navItems }) {
  const { siteSettings } = useSiteSettings();
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);
  const logoUrl = siteSettings?.logo_url || "https://appstatic.tv9tamil.com/images/logo.jpg";
  const siteName = siteSettings?.site_name || "TV9 Tamil";
  // Use API data if available, otherwise fall back to defaults
  const menuItems =
    Array.isArray(navItems) && navItems.length > 0
      ? navItems
      : DEFAULT_NAV_ITEMS;

  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  // Helper function to check if a link is active
  const isActiveLink = (href) => {
    if (!href) return false;
    const currentPath = router.asPath;
    
    // Extract just the pathname from the href (remove SITE_URL if present)
    let linkPath = href;
    if (typeof href === 'string' && href.startsWith(SITE_URL)) {
      linkPath = href.replace(SITE_URL, '');
    }
    
    // Ensure linkPath starts with /
    if (!linkPath.startsWith('/')) {
      linkPath = '/' + linkPath;
    }
    
    // Exact match for home
    if (linkPath === '/') {
      return currentPath === '/';
    }
    
    // Check if current path starts with the link path
    // Also check for exact match with trailing slash
    return currentPath === linkPath || 
           currentPath.startsWith(linkPath + '/') ||
           currentPath.startsWith(linkPath + '?');
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
      <header className={styles.tv9_header}>
        <div className={styles.language_menu}>
          <div className={styles.container}>
            <AppLink
              href="https://www.tv9hindi.com/"
              title="हिन्दी"
              target="_blank"
              rel="nofollow noopener"
            >
              हिन्दी
            </AppLink>
            <AppLink
              href="https://www.news9live.com/"
              title="News9"
              rel="nofollow noopener"
              target="_blank"
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
            <AppLink
              href="https://www.tv9up.com/"
              title="TV9-UP"
              target="_blank"
              rel="nofollow noopener"
            >
              TV9-UP
            </AppLink>
          </div>
        </div>
        <div className={`${styles.tv9_navbar}${isSticky ? ` ${styles.sticky}` : ""}`}>
          <div className={styles.container}>
            <div className={styles.tv9_logo}>
              <AppLink href={`${SITE_URL}`}>
                <Image
                  width={80}
                  height={72}
                  src={logoUrl}
                  alt="Tamil News, முக்கியச் செய்திகள், Online Tamil News, Tamil News Live, Tamil nadu News, தமிழ் நியூஸ்"
                  title="Tamil News, முக்கியச் செய்திகள், Online Tamil News, Tamil News Live, Tamil nadu News, தமிழ் நியூஸ்"
                  style={{ width: "auto", height: "auto" }}
                />
              </AppLink>
            </div>
            <div className={styles.tv9_navbarRHS}>
              <AppLink
                href={`${SITE_URL}/weather-forecast`}
                title="Weather"
                className={styles.weather_icon}
              >
                <svg width={24} height={24}>
                  <use href={`${ICONS_SVG}#weather_icon`}></use>
                </svg>
              </AppLink>
              <AppLink
                href={`${SITE_URL}/aqi`}
                title="AQI"
                className={styles.aqi_icon}
              >
                AQI
              </AppLink>
              <div id="GSignIn" className={styles.googleSignIn}>
                <svg id="gdefault-login" width={28} height={28}>
                  <use href={`${ICONS_SVG}#sign_in`}></use>
                </svg>
              </div>
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
        </div>

        {/* Google SSO Starts */}
        <GoogleSingleSignIn />
        {/* Google SSO Ends */}

        <div className={`${styles.tv9_catnavbar}${isSticky ? ` ${styles.sticky}` : ""}`}>
          <div className={styles.container}>
            <a 
              href={`${SITE_URL}`} 
              title="Home"
              className={router.asPath === '/' ? styles.active : ''}
            >
              <svg width={23} height={20} className={styles.home_icon}>
                <use href={`${ICONS_SVG}#ic_home`}></use>
              </svg>
            </a>
            {menuItems.map((item, index) => (
              <a
                key={item.id || index}
                href={getHref(item.url)}
                title={item.title}
                target={item.target || undefined}
                rel={item.target === "_blank" ? "nofollow noopener" : undefined}
                className={isActiveLink(item.url) ? styles.active : ''}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </header>

      <div
        className={`${styles.menuNavigation}${megaMenuOpen ? ` ${styles.active}` : ""}`}
      >
        <div className={styles.container}>
          <div className={styles.megaMenu_Header}>
            <div className={styles.tv9_logo}>
              <AppLink href={`${SITE_URL}`} title="TV9 Tamil">
                <Image
                  width={80}
                  height={72}
                  src={logoUrl}
                  alt={siteName}
                  title={siteName}
                  style={{ width: "auto", height: "auto" }}
                />
              </AppLink>
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
            <div onClick={() => setMegaMenuOpen(false)}>
              <svg className={styles.close_icon}>
                <use href={`${ICONS_SVG}#close_menu`}></use>
              </svg>
            </div>
          </div>
          <ul className={styles.listItems}>
            {megaMenuItems.map((item, index) => (
              <li
                key={item.href}
                className={item.subItems ? styles.hassubmenu : ""}
                onClick={
                  item.subItems ? (e) => toggleSubmenu(index, e) : undefined
                }
              >
                <a
                  className={styles.catHead}
                  title={item.label}
                  href={item.href}
                  onClick={
                    item.subItems ? (e) => e.stopPropagation() : undefined
                  }
                >
                  {item.label}
                </a>
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
                          <a title={sub.label} href={sub.href}>
                            {sub.label}
                          </a>
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
    </>
  );
}
