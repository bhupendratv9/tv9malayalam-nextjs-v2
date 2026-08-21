/**
 * AMP Page Builder
 * ================
 * Assembles the full AMP HTML document from sections, meta, schemas, and analytics.
 *
 * Helpers:
 *   - ampMeta.js      → OG / meta tags
 *   - ampSchemas.js   → JSON-LD structured data
 *   - ampAnalytics.js → amp-analytics (GA4, GTM, Chartbeat, ComScore)
 *   - ampUtils.js     → esc(), getValue(), sanitizeAmpHtml(), etc.
 *   - CssAMP.js       → AMP custom CSS string
 */
import { ampCss } from "../../../components/pb/amp/widgets/CssAMP";
import { esc } from "./ampUtils";
import { splitSections } from "../../../layout/DefaultLayoutAMP";
import { renderSectionAmp } from "../../../components/pb/WidgetRegistryAMP";
import { buildMetaTags } from "./ampMeta";
import { buildSchemaScripts } from "./ampSchemas";
import { buildAnalyticsTags, hasAnalytics } from "./ampAnalytics";

const SITE_LANGUAGE = process.env.NEXT_PUBLIC_SITE_LANGUAGE || "hi";

export function buildAmpHtml({ meta = {}, schemas = [], sections = [], settings = {}, queryParams = {}, siteSettings = {} }) {

  const {
    headerSections,
    contentSections,
    footerSections,
  } = splitSections(sections);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const canonical = meta?.canonical || "";
  const faviconUrl = siteSettings?.favicon_url || "";

  const title = esc(meta?.meta_title || meta?.title || meta?.og_title || siteSettings?.default_meta_title || "");
  const description = esc(meta?.meta_description || meta?.desc || meta?.og_description || siteSettings?.default_meta_description || "");
  const keywords = esc(meta?.meta_keywords || meta?.keywords || "");

  // Delegates
  const metaTags = buildMetaTags(meta, settings, siteSettings);
  const schemaScripts = buildSchemaScripts(schemas, meta, settings, siteSettings, sections);
  const analyticsHtml = buildAnalyticsTags(siteSettings);
  const needsAnalyticsScript = hasAnalytics(siteSettings);

  // Sections
  const headerHtml = headerSections
    .map((section) => renderSectionAmp(section, queryParams, meta, siteSettings))
    .join("");

  const footerHtml = footerSections
    .map((section) => renderSectionAmp(section, queryParams, meta, siteSettings))
    .join("");

  const contentHtml = `
      <div class="container">
        ${contentSections
          .map((section) => renderSectionAmp(section, queryParams, meta, siteSettings))
          .join("")}
      </div>`;

  // Final HTML
  return `<!doctype html>
<html \u26A1 lang="${SITE_LANGUAGE}">
<head>
  <meta charset="utf-8">
  <title>${title}</title>

  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywords}">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">

  ${metaTags}

  ${canonical ? `<link rel="canonical" href="${esc(canonical)}">` : ""}
  ${faviconUrl ? `<link rel="icon" href="${esc(faviconUrl)}">` : ""}

  ${schemaScripts}

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anek+Devanagari:wght@100..800&display=swap" rel="stylesheet">

  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"></script>
  <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
  <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
  <script async custom-element="amp-social-share" src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"></script>
  <script async custom-element="amp-sticky-ad" src="https://cdn.ampproject.org/v0/amp-sticky-ad-1.0.js"></script>
  <script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
  <script async custom-element="amp-jwplayer" src="https://cdn.ampproject.org/v0/amp-jwplayer-0.1.js"></script>
  ${needsAnalyticsScript ? `<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>` : ""}

  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>

  <style amp-custom>
${ampCss}
  </style>
</head>

<body>
  ${analyticsHtml}
  ${headerHtml}
  <main role="main">
    ${contentHtml}
  </main>
  ${footerHtml}
  <amp-sticky-ad layout="nodisplay">
    <amp-ad width="320" height="50" type="doubleclick" data-slot="/6355419/Travel/Europe/France/Paris"></amp-ad>
  </amp-sticky-ad>
</body>
</html>`;
}
