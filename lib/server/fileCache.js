/**
 * File-based cache for API responses (server-only).
 * Falls back to direct fetch if fs is not available (browser bundle).
 */

let fs, path, crypto;
try {
  fs = eval("require")("fs");
  path = eval("require")("path");
  crypto = eval("require")("crypto");
} catch (e) {
  // Browser environment — fs not available
}

const CACHE_DIR = typeof process !== "undefined" && process.cwd
  ? (path ? path.resolve(process.cwd(), ".cache") : "")
  : "";

function ensureCacheDir() {
  if (!fs || !CACHE_DIR) return;
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

function getCacheKey(url, customKey) {
  if (customKey) return customKey.replace(/[^a-zA-Z0-9_-]/g, "_");
  if (!crypto) return url.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 60);
  const hash = crypto.createHash("md5").update(url).digest("hex");
  const urlPath = new URL(url).pathname.replace(/\//g, "_").slice(0, 40);
  return `${urlPath}_${hash}`;
}

/**
 * Fetch with file-based caching.
 * On server: checks .cache/ dir for cached response.
 * On browser (fallback): just does a normal fetch.
 * Set DISABLE_CACHE=true in .env to bypass caching entirely.
 */
export async function cachedFetch(url, options = {}) {
  const { ttl = 300, headers = {}, key = null } = options;
  const cacheDisabled = process.env.DISABLE_CACHE === "true";

  // If fs not available (browser) or cache disabled, skip cache
  if (!fs || !CACHE_DIR || cacheDisabled) {
    const res = await fetch(url, { headers: { Accept: "application/json", "User-Agent": "TV9-NextJS/1.0", ...headers } });
    if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${url}`);
    return await res.json();
  }

  ensureCacheDir();

  const cacheKey = getCacheKey(url, key);
  const cacheFile = path.join(CACHE_DIR, `${cacheKey}.json`);

  // Check if cached file exists and is still valid
  if (fs.existsSync(cacheFile)) {
    try {
      const stat = fs.statSync(cacheFile);
      const ageInSeconds = (Date.now() - stat.mtimeMs) / 1000;
      if (ageInSeconds < ttl) {
        return JSON.parse(fs.readFileSync(cacheFile, "utf-8"));
      }
    } catch {
      // Cache read failed, proceed with fresh fetch
    }
  }

  // Fetch fresh data
  const res = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": "TV9-NextJS/1.0", ...headers },
  });

  if (!res.ok) {
    // If fetch fails but we have stale cache, return stale
    if (fs.existsSync(cacheFile)) {
      try {
        return JSON.parse(fs.readFileSync(cacheFile, "utf-8"));
      } catch {
        // stale cache also broken
      }
    }
    throw new Error(`Fetch failed: ${res.status} ${url}`);
  }

  const data = await res.json();

  // Write to cache
  try {
    fs.writeFileSync(cacheFile, JSON.stringify(data), "utf-8");
  } catch {
    // Cache write failed, non-critical
  }

  return data;
}