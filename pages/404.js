/**
 * Custom 404 Page
 * Renders when Next.js returns notFound:true.
 * Fetches siteSettings at build time so header/footer render correctly.
 */
import AppLink from "@/components/AppLink";
import MetaHead from "../components/MetaHead";
import HeaderWidgetUP from "../components/pb/widgets/HeaderWidgetUP/HeaderUP";
import FooterWidgetUP from "../components/pb/widgets/FooterWidgetUP/FooterUP";
import { SiteProvider } from "../lib/SiteContext";

function FallbackContent() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "/";

  return (
    <main
      className="notFound_Wrapper container"
      style={{
        textAlign: "center",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          fontSize: "170px",
          lineHeight: "1",
          fontWeight: "700",
          color: "#dc0000",
          margin: "0 0 10px",
        }}
      >
        404
      </h1>

      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          margin: "0 0 16px",
        }}
      >
        Page Not Found
      </h2>

      <p
        style={{
          fontSize: "1rem",
          color: "#666",
          margin: "0 0 30px",
          maxWidth: "500px",
        }}
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <AppLink
        href={siteUrl}
        style={{
          display: "inline-block",
          padding: "12px 30px",
          background: "#dc0000",
          color: "#fff",
          borderRadius: "4px",
          fontWeight: "600",
          fontSize: "1rem",
          textDecoration: "none",
        }}
      >
        Go to Homepage
      </AppLink>
    </main>
  );
}

export default function Custom404({ siteSettings = {}, navItems = [], trendingItems = [] }) {
  const siteName = siteSettings?.site_name || process.env.NEXT_PUBLIC_SITE_NAME || "Tv9up";

  return (
    <SiteProvider siteSettings={siteSettings} settings={{}}>
      <MetaHead
        meta={{
          meta_title: `Page Not Found | ${siteName}`,
          meta_description:
            "The requested page could not be found. Please return to the homepage.",
          robots: "noindex,follow",
        }}
        siteSettings={siteSettings}
      />

      <HeaderWidgetUP navItems={navItems} />

      <FallbackContent />

      <FooterWidgetUP />
    </SiteProvider>
  );
}

export async function getStaticProps() {
  let siteSettings = {};
  let navItems = [];
  let trendingItems = [];

  try {
    const { fetchPageBuilderPage, fetchGlobalSettings } = await import("../lib/server/pageBuilder");
    const { fetchNavMenu, fetchTrendingMenu } = await import("../lib/server/fetchNavMenu");

    const [pb, nav, trending] = await Promise.all([
      fetchPageBuilderPage("home-page"),
      fetchNavMenu(),
      fetchTrendingMenu(),
    ]);

    const globalSettings = await fetchGlobalSettings();
    siteSettings = globalSettings || pb?.site_settings || {};
    navItems = nav || [];
    trendingItems = trending || [];
  } catch (e) {
    console.error("[404] Failed to fetch data:", e?.message || e);
  }

  return {
    props: {
      siteSettings,
      navItems,
      trendingItems,
    },
    revalidate: 300,
  };
}
