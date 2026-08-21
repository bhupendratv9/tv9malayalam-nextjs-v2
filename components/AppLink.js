/**
 * AppLink — Configurable link component.
 *
 * Switches between Next.js <Link> (client-side navigation) and plain <a> (full reload)
 * based on the NEXT_PUBLIC_USE_LINK_NAVIGATION env variable.
 *
 * Usage:
 *   import AppLink from "@/components/AppLink";
 *   <AppLink href="/sports" title="Sports">விளையாட்டு</AppLink>
 *
 * Config (.env):
 *   NEXT_PUBLIC_USE_LINK_NAVIGATION=1   → Uses Next.js <Link> (SPA, no reload, .json fetches)
 *   NEXT_PUBLIC_USE_LINK_NAVIGATION=0   → Uses plain <a> (full reload, ads re-fire)
 *   (not set)                           → Defaults to <a> (full reload)
 */

import Link from "next/link";

const USE_LINK = process.env.NEXT_PUBLIC_USE_LINK_NAVIGATION === "1";

export default function AppLink({ href, children, ...props }) {
  if (USE_LINK) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
