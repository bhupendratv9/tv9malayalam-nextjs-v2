export function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function decodeHtml(text) {
  if (!text || typeof text !== "string") return text;
  const map = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#039;": "'", "&apos;": "'" };
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&amp;|&lt;|&gt;|&quot;|&#039;|&apos;/g, (m) => map[m]);
}

export function getValue(obj, path, defaultValue = null) {
  if (!obj || typeof obj !== "object") return defaultValue;

  if (typeof path === "string") {
    return Object.prototype.hasOwnProperty.call(obj, path)
      ? obj[path]
      : defaultValue;
  }

  let current = obj;
  for (const key of path) {
    if (
      current &&
      typeof current === "object" &&
      Object.prototype.hasOwnProperty.call(current, key)
    ) {
      current = current[key];
    } else {
      return defaultValue;
    }
  }

  return current ?? defaultValue;
}

export function normalizeArticleInput({
  items = [],
  data = [],
  item = null,
  response = null,
}) {
  if (Array.isArray(data) && data.length > 0) return data[0];

  if (data && typeof data === "object" && !Array.isArray(data)) {
    if (Array.isArray(data.data) && data.data.length > 0) return data.data[0];
    if (data.data && typeof data.data === "object" && !Array.isArray(data.data)) return data.data;
    if (data.item && typeof data.item === "object" && !Array.isArray(data.item)) return data.item;
    if (data.title || data.content_html || data.permalink || data.id) return data;
  }

  if (Array.isArray(items) && items.length > 0) return items[0];
  if (item && typeof item === "object" && !Array.isArray(item)) return item;

  if (response && typeof response === "object" && !Array.isArray(response)) {
    if (Array.isArray(response.data) && response.data.length > 0) return response.data[0];
    if (response.data && typeof response.data === "object" && !Array.isArray(response.data)) return response.data;
    if (response.item && typeof response.item === "object" && !Array.isArray(response.item)) return response.item;
    if (response.title || response.content_html || response.permalink || response.id) return response;
  }

  return null;
}

export function formatIstDate(dateString) {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;

    const formatted = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);

    return `${formatted} IST`;
  } catch {
    return dateString;
  }
}

export function buildTags(article = {}) {
  const topicTerms = getValue(article, ["taxonomies", "topic"], []);
  const categoryTerms = getValue(article, ["taxonomies", "category"], []);

  const source =
    Array.isArray(topicTerms) && topicTerms.length > 0
      ? topicTerms
      : Array.isArray(categoryTerms) && categoryTerms.length > 0
      ? categoryTerms
      : [];

  return source
    .filter((item) => item && typeof item === "object" && item.name)
    .map((item) => ({
      name: String(item.name || ""),
      slug: String(item.slug || ""),
    }));
}
export function sanitizeAmpHtml(html) {
  if (!html) return "";

  let output = String(html);

  /* =========================
     STEP 1: DECODE HTML ENTITIES
  ========================= */
  output = output
    .replace(/\\u003C/g, "<")
    .replace(/\\u003E/g, ">")
    .replace(/\\u0022/g, '"')
    .replace(/\\u0027/g, "'")
    .replace(/\\n/g, "\n");

  /* =========================
     STEP 2: AUTO PARAGRAPH
  ========================= */
  output = output
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      // skip if already HTML tag
      if (/^<\/?(h\d|ul|ol|li|p|blockquote)/i.test(line)) {
        return line;
      }
      return `<p>${line}</p>`;
    })
    .join("");

  // remove unsafe blocks
  output = output
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[\s\S]*?>[\s\S]*?<\/object>/gi, "")
    .replace(/<embed[\s\S]*?>[\s\S]*?<\/embed>/gi, "")
    .replace(/<form[\s\S]*?>[\s\S]*?<\/form>/gi, "");

  // remove inline events and unsafe attributes
  output = output
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "")
    .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "")
    .replace(/\sstyle\s*=\s*"[^"]*"/gi, "")
    .replace(/\sstyle\s*=\s*'[^']*'/gi, "")
    .replace(/\sclass\s*=\s*"[^"]*"/gi, "")
    .replace(/\sclass\s*=\s*'[^']*'/gi, "");

  // convert figure images first
  output = output.replace(
    /<img\b([^>]*)src=["']([^"']+)["']([^>]*)alt=["']([^"']*)["']([^>]*)>/gi,
    (_m, _a, src, _b, alt) =>
      `<amp-img src="${esc(src)}" alt="${esc(alt)}" width="800" height="450" layout="responsive"></amp-img>`
  );

  output = output.replace(
    /<img\b([^>]*)alt=["']([^"']*)["']([^>]*)src=["']([^"']+)["']([^>]*)>/gi,
    (_m, _a, alt, _b, src) =>
      `<amp-img src="${esc(src)}" alt="${esc(alt)}" width="800" height="450" layout="responsive"></amp-img>`
  );

  output = output.replace(
    /<img\b([^>]*)src=["']([^"']+)["']([^>]*)>/gi,
    (_m, _a, src) =>
      `<amp-img src="${esc(src)}" alt="" width="800" height="450" layout="responsive"></amp-img>`
  );

  /* =========================
     REMOVE DIV BUT KEEP CONTENT
  ========================= */
  output = output
    .replace(/<\/?div[^>]*>/gi, ""); // 🔥 unwrap div

  // remove empty wrappers only if truly empty
   output = output
    .replace(/<p>\s*<\/p>/gi, "")
    .replace(/\n+/g, "\n");

  return output.trim();
}