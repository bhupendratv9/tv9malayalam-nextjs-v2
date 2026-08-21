/**
 * Next.js Middleware — Spam/Bot Request Blocker
 * ==============================================
 * Runs at the edge BEFORE any page rendering or API call.
 * Blocks known spam paths, vulnerability scanners, and bot probes
 * to prevent wasted SSR cycles and Page Builder API calls.
 *
 * Returns 404 immediately for:
 *  - Known spam files (ads.txt, app-ads.txt, wp-login.php, etc.)
 *  - PHP/ASP/CGI file requests (we're a Next.js app, these are always invalid)
 *  - WordPress admin/plugin probes
 *  - Common vulnerability scanner paths
 */

import { NextResponse } from "next/server";

// ─── Exact paths to block (lowercase) ───
const BLOCKED_EXACT_PATHS = new Set([
  "/wp",
  "/wordpress",
  "/wp-login.php",
  "/wp-admin",
  "/wp-config.php",
  "/xmlrpc.php",
  "/wp-cron.php",
  "/wp-signup.php",
  "/wp-register.php",
  "/wp-includes/wlwmanifest.xml",
  "/wp-json",
  "/wp-json/",
  "/administrator",
  "/admin",
  "/phpmyadmin",
  "/pma",
  "/sellers.json",
  "/.env",
  "/.git/config",
  "/.git/HEAD",
  "/config.php",
  "/debug.php",
  "/info.php",
  "/phpinfo.php",
  "/test.php",
  "/shell.php",
  "/cmd.php",
  "/eval.php",
  "/cgi-bin",
  "/cgi-bin/",
  "/.well-known/security.txt",
]);

// ─── File extensions that should NEVER reach SSR ───
const BLOCKED_EXTENSIONS = /\.(php|asp|aspx|jsp|cgi|pl|py|rb|sh|bat|exe|dll|sql|bak|old|swp|env|ini|log|htaccess|htpasswd|DS_Store)$/i;

// ─── Path patterns that are clearly spam/bot probes ───
const BLOCKED_PATTERNS = [
  /^\/\d+/,                    // Paths starting with numbers (e.g., /0_15still)
  /\/[a-f0-9]{32,}/i,         // MD5/SHA hashes in URL
  /\/\.\.+/,                   // Directory traversal attempts
  /\/{2,}/,                    // Double slashes
];

// ─── Path prefixes to block ───
const BLOCKED_PREFIXES = [
  "/wp-",         // All WordPress paths (wp-admin, wp-login, etc.)
  "/wp/",         // WordPress content paths (wp/uploads, etc.)
  "/wordpress/",
  "/wordpress",
  "/.git/",
  "/.svn/",
  "/.hg/",
  "/vendor/",     // PHP composer
  "/node_modules/",
  "/cgi-bin/",
  "/phpmyadmin/",
  "/pma/",
  "/myadmin/",
  "/mysql/",
  "/db/",
  "/backup/",
  "/bak/",
  "/old/",
  "/temp/",
  "/tmp/",
];

export default function proxy(request) {
  const { pathname } = request.nextUrl;
  const pathLower = pathname.toLowerCase();

  // Helper — rewrite to Next.js 404 page (shows custom 404 with header/footer)
  function block() {
    const url = request.nextUrl.clone();
    url.pathname = "/404";
    return NextResponse.rewrite(url, { status: 404 });
  }

  // 1. Block exact known spam paths
  if (BLOCKED_EXACT_PATHS.has(pathLower)) {
    return block();
  }

  // 2. Block file extensions that don't belong in a Next.js app
  if (BLOCKED_EXTENSIONS.test(pathLower)) {
    return block();
  }

  // 3. Block spam URL patterns
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(pathLower)) {
      return block();
    }
  }

  // 4. Block known spam path prefixes
  for (const prefix of BLOCKED_PREFIXES) {
    if (pathLower.startsWith(prefix)) {
      return block();
    }
  }

  // Let everything else through
  return NextResponse.next();
}

// Only run middleware on paths that could hit our pages/rewrites.
// Exclude static assets and Next.js internals for performance.
export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - _next/data (data fetches for pre-rendered pages)
     * - favicon.ico
     * - public folder assets
     */
    "/((?!_next/static|_next/image|_next/data|favicon\\.ico|assets/).*)",
  ],
};
