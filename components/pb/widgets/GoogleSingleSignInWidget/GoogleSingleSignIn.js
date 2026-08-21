"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import AppLink from "@/components/AppLink";
import Script from "next/script";
import { SITE_URL } from "@/lib/helper/commonHelper";
import { useSiteSettings } from "@/lib/SiteContext";
import { GOOGLE_SSO_CLIENT_ID, SSO_LOGIN_URL, TV9_NETWORK_LOGO, DEFAULT_USER_IMAGE, ICONS_SVG } from "@/lib/constants";
import styles from "./GoogleSingleSignIn.module.css";

const LOCAL_STORAGE_KEY = "user";
const LOCAL_STORAGE_EXPIRY_KEY = "user_expiry";

export default function GoogleSingleSignIn() {
  const { siteSettings } = useSiteSettings();
  const chartbeatTriggeredRef = useRef(false);
  const clientId = siteSettings?.google_sso_client_id || GOOGLE_SSO_CLIENT_ID;
  const clientIdRef = useRef(clientId);
  clientIdRef.current = clientId;

  // Network sites for language switcher
  let networkSites = [];
  try {
    const raw = siteSettings?.network_sites_json;
    if (raw) networkSites = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch { /* ignore */ }

  useEffect(() => {
    const body = document.body;
    const slidingDiv = document.querySelector(`.${styles.gSigninWidget_Wrapper}`);
    const slideOverlay = document.getElementById("loginOverlay");
    const gSignInBtn = document.getElementById("GSignIn");
    const closeWidgetBtn = document.getElementById("closeWidget");

    if (!slidingDiv || !slideOverlay || !gSignInBtn || !closeWidgetBtn) return;

    function openWidget(event) {
      event.stopPropagation();
      body.style.overflow = "hidden";
      slideOverlay.style.display = "block";
      requestAnimationFrame(() => {
        slideOverlay.style.opacity = "1";
        slidingDiv.style.right = "0";
      });
    }

    function closeWidget() {
      slidingDiv.style.right = "-400px";
      slideOverlay.style.opacity = "0";
      setTimeout(() => {
        slideOverlay.style.display = "none";
        body.style.overflow = "visible";
      }, 300);
    }

    function handleDocClick(event) {
      if (!slidingDiv.contains(event.target) && event.target !== gSignInBtn) {
        closeWidget();
      }
    }

    function stopProp(event) {
      event.stopPropagation();
    }

    function triggerChartbeatLogin() {
      if (chartbeatTriggeredRef.current) return;
      chartbeatTriggeredRef.current = true;
      window._cbq = window._cbq || [];
      window._cbq.push(["_acct", "lgdin"]);
    }

    function updateUserDetailsInHTML(user) {
      const userNameEl = document.getElementById("user-name");
      const userImageEl = document.getElementById("user-image");
      const logoutBtn = document.getElementById("logout-button");

      if (userNameEl) userNameEl.textContent = user.name;

      if (user.picture) {
        if (userImageEl) { userImageEl.src = user.picture; userImageEl.style.display = "block"; }
        const guserImage = document.getElementById("guser-image");
        if (guserImage) { guserImage.src = user.picture; guserImage.style.display = "block"; }
        const gdefaultLogin = document.getElementById("gdefault-login");
        if (gdefaultLogin) gdefaultLogin.style.display = "none";
        setTimeout(triggerChartbeatLogin, 1000);
      } else {
        const useElement = document.querySelector("#gdefault-login use");
        if (useElement && useElement.getAttribute("href") === "#sign_in") {
          useElement.setAttribute("href", "#signed_in");
        }
      }

      const btnSignin = document.getElementById("btn-signin");
      const signinInfo = document.getElementById("signin-info");
      const profileInfo = document.getElementById("profile-info");
      const langContainer = document.getElementById("lang-container");

      if (btnSignin) btnSignin.style.display = "none";
      if (signinInfo) signinInfo.style.display = "none";
      if (profileInfo) profileInfo.style.display = "block";
      if (langContainer) langContainer.style.display = "block";
      if (logoutBtn) logoutBtn.style.display = "";
    }

    function handleCredentialResponse(response) {
      const domain = window.location.hostname;

      fetch(SSO_LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential, domain }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "User authenticated") {
            const userDetails = {
              name: data.name,
              email: data.email,
              picture: data.picture,
              id: data.shortsub,
              sub: data.sub,
            };

            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userDetails));
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 30);
            localStorage.setItem(LOCAL_STORAGE_EXPIRY_KEY, expiryDate.toISOString());

            updateUserDetailsInHTML(userDetails);
            closeWidget();

            const pendingAstroRedirect = localStorage.getItem("astro_redirect_after_login");
            if (pendingAstroRedirect && pendingAstroRedirect.indexOf("/astrology/") === 0) {
              localStorage.removeItem("astro_redirect_after_login");
              setTimeout(() => { window.location.href = pendingAstroRedirect; }, 500);
              return;
            }

            const currentPath = window.location.pathname;
            if (currentPath.includes("/astrology/") || currentPath.includes("/religion/")) {
              setTimeout(() => { window.location.reload(); }, 500);
            }
          } else {
            console.error("Authentication failed");
          }
        })
        .catch((err) => console.error("SSO Error:", err));
    }

    function logout() {
      document.cookie = "temp_kundli_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
      localStorage.removeItem("temp_kundli_id");
      localStorage.removeItem("selected_kundli_id");

      if (window.AstroStorage && typeof window.AstroStorage.logout === "function") {
        window.AstroStorage.logout();
        return;
      }

      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem(LOCAL_STORAGE_EXPIRY_KEY);

      const userNameEl = document.getElementById("user-name");
      const userImageEl = document.getElementById("user-image");
      const logoutBtn = document.getElementById("logout-button");
      const btnSignin = document.getElementById("btn-signin");
      const signinInfo = document.getElementById("signin-info");
      const profileInfo = document.getElementById("profile-info");
      const langContainer = document.getElementById("lang-container");

      if (userNameEl) userNameEl.textContent = "Sign In";
      if (userImageEl) { userImageEl.src = ""; userImageEl.style.display = "none"; }
      if (logoutBtn) logoutBtn.style.display = "none";
      if (btnSignin) btnSignin.style.display = "block";
      if (signinInfo) signinInfo.style.display = "block";
      if (profileInfo) profileInfo.style.display = "none";
      if (langContainer) langContainer.style.display = "none";

      const guserImage = document.getElementById("guser-image");
      const gdefaultLogin = document.getElementById("gdefault-login");
      if (guserImage) guserImage.style.display = "none";
      if (gdefaultLogin) gdefaultLogin.style.display = "block";

      if (window.google?.accounts?.id) {
        window.google.accounts.id.renderButton(
          document.getElementById("btn-signin"),
          { theme: "outline", size: "large", type: "standard", text: "signin_with", logo_alignment: "left", shape: "pill", width: "320" }
        );
      }

      closeWidget();
    }

    const langSelect = document.getElementById("langSelect");
    function handleLangChange() {
      if (langSelect) window.location.href = langSelect.value;
    }

    gSignInBtn.addEventListener("click", openWidget);
    closeWidgetBtn.addEventListener("click", closeWidget);
    document.addEventListener("click", handleDocClick);
    slidingDiv.addEventListener("click", stopProp);
    if (langSelect) langSelect.addEventListener("change", handleLangChange);

    // Check existing login
    const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "null");
    const expiry = localStorage.getItem(LOCAL_STORAGE_EXPIRY_KEY);

    if (user && expiry && new Date() < new Date(expiry)) {
      updateUserDetailsInHTML(user);
    }

    // Initialize Google SSO after delay
    const initTimeout = setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "null");
      const storedExpiry = localStorage.getItem(LOCAL_STORAGE_EXPIRY_KEY);

      if (!storedUser || !storedExpiry || new Date() >= new Date(storedExpiry)) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        localStorage.removeItem(LOCAL_STORAGE_EXPIRY_KEY);

        const resolvedClientId = clientIdRef.current;
        if (resolvedClientId && window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: resolvedClientId,
            callback: handleCredentialResponse,
            close_on_tap_outside: true,
            context: "use",
            ux_mode: "popup",
            itp_support: true,
            privacy_policy_url: `${SITE_URL}/privacy-policy`,
            terms_of_service_url: `${SITE_URL}/terms-and-conditions`,
          });

          window.google.accounts.id.renderButton(
            document.getElementById("btn-signin"),
            { theme: "outline", size: "large", type: "standard", text: "signin_with", logo_alignment: "left", shape: "pill", width: "320" }
          );
        }
      }

      const logoutBtn = document.getElementById("logout-button");
      if (logoutBtn) logoutBtn.addEventListener("click", logout);
    }, 7000);

    return () => {
      gSignInBtn.removeEventListener("click", openWidget);
      closeWidgetBtn.removeEventListener("click", closeWidget);
      document.removeEventListener("click", handleDocClick);
      slidingDiv.removeEventListener("click", stopProp);
      if (langSelect) langSelect.removeEventListener("change", handleLangChange);
      clearTimeout(initTimeout);
    };
  }, []);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="lazyOnload"
      />

      <div id="loginOverlay" className={styles.loginOverlay}></div>
      <div className={styles.gSigninWidget_Wrapper}>
        <div id="closeWidget" className={styles.closeWidget}>
          <svg className={styles.close_icon} width={24} height={24}>
            <use href={`${ICONS_SVG}#close_menu`}></use>
          </svg>
        </div>
        <div className={styles.logoWrapper}>
          <Image
            width={120}
            height={60}
            src={TV9_NETWORK_LOGO}
            alt="TV9 Network"
          />
        </div>
        <div className={styles.loginProfile}>
          <div className={styles.profileImg}>
            <Image
              width={70}
              height={70}
              loading="lazy"
              id="user-image"
              src={DEFAULT_USER_IMAGE}
              alt="User"
            />
          </div>
          <div className={styles.profileName} id="user-name">Sign In</div>
          <button className={styles.signInButton} id="btn-signin">
            <svg>
              <use href={`${ICONS_SVG}#gIC`}></use>
            </svg>
            <span>Continue with Google</span>
          </button>
          <div className={styles.loginInfo} id="signin-info">
            <p>
              By signing in or creating an account, you agree with Associated Broadcasting Company&apos;s{" "}
              <AppLink href={`${SITE_URL}/terms-and-conditions`} target="_blank">Terms &amp; Conditions</AppLink>
              {" "}and{" "}
              <AppLink href={`${SITE_URL}/privacy-policy`} target="_blank">Privacy Policy</AppLink>.
            </p>
          </div>
          <div className={styles.profileInfo} id="profile-info" style={{ display: "none" }}>
            <p>Manage your account, explore personalized content, save or bookmark stories, discover our newsletters and more.</p>
          </div>
        </div>

        {networkSites.length > 0 && (
          <div className={styles["custom-select"]} id="lang-container" style={{ display: "none" }}>
            <select id="langSelect" className={styles.langselect} defaultValue={SITE_URL}>
              {networkSites.map((site, idx) => (
                <option key={idx} value={site.url}>{site.label}</option>
              ))}
            </select>
          </div>
        )}

        <button className={styles.logOutBtn} id="logout-button" style={{ display: "none" }}>
          <svg>
            <use href={`${ICONS_SVG}#logout`}></use>
          </svg>
          <span>logout</span>
        </button>
      </div>
    </>
  );
}
