/**
 * Schema Builder
 * ==============
 * Generates JSON-LD structured data for different schema types.
 * The page builder returns a list of active schemas per page.
 * This module builds the actual JSON-LD output based on schema_type.
 *
 * Usage:
 *   import { buildSchemas } from "../lib/schemas";
 *   const schemaScripts = buildSchemas(schemas, { meta, settings, siteSettings, pageUrl });
 */

import { buildOrganizationSchema } from "./OrganizationSchema";
import { buildWebPageSchema } from "./WebPageSchema";
import { buildNewsArticleSchema } from "./NewsArticleSchema";
import { buildBreadcrumbSchema } from "./BreadcrumbSchema";
import { buildVideoObjectSchema } from "./VideoObjectSchema";
import { buildImageGallerySchema } from "./ImageGallerySchema";
import { buildLiveBlogSchema } from "./LiveBlogSchema";
import { buildWebSiteSchema } from "./WebSiteSchema";
import { buildSiteNavigationElementSchema } from "./SiteNavigationElementSchema";
import { buildNewsMediaOrganizationSchema } from "./NewsMediaOrganizationSchema";
import { buildProfilePageSchema } from "./ProfilePageSchema";

/**
 * Map of schema_type → builder function
 * Each builder receives (schema, context) and returns a JSON-LD object or null.
 */
const SCHEMA_BUILDERS = {
  Organization: buildOrganizationSchema,
  WebPage: buildWebPageSchema,
  NewsArticle: buildNewsArticleSchema,
  BreadcrumbList: buildBreadcrumbSchema,
  VideoObject: buildVideoObjectSchema,
  ImageGallery: buildImageGallerySchema,
  LiveBlogPosting: buildLiveBlogSchema,
  WebSite: buildWebSiteSchema,
  SiteNavigationElement: buildSiteNavigationElementSchema,
  NewsMediaOrganization: buildNewsMediaOrganizationSchema,
  ProfilePage: buildProfilePageSchema,
};

/**
 * Build all active schemas for a page.
 *
 * @param {Array} schemas - Schema list from page builder API
 * @param {Object} context - { meta, settings, siteSettings, articleMeta, pageUrl }
 * @returns {Array} Array of JSON-LD objects ready to be rendered as <script type="application/ld+json">
 */
export function buildSchemas(schemas = [], context = {}) {
  if (!Array.isArray(schemas) || schemas.length === 0) return [];

  const results = [];

  for (const schema of schemas) {
    if (!schema.is_active) continue;

    // If the schema has an override_json, use it directly
    if (schema.override_json) {
      const parsed = typeof schema.override_json === "string"
        ? tryParse(schema.override_json)
        : schema.override_json;
      if (parsed) results.push(parsed);
      continue;
    }

    // If the schema has a template_json, use it directly
    if (schema.template_json) {
      const parsed = typeof schema.template_json === "string"
        ? tryParse(schema.template_json)
        : schema.template_json;
      if (parsed) results.push(parsed);
      continue;
    }

    // Otherwise, build from the registered builder
    const builder = SCHEMA_BUILDERS[schema.schema_type];
    if (builder) {
      const result = builder(schema, context);
      if (result) results.push(result);
    }
  }

  return results;
}

function tryParse(str) {
  try { return JSON.parse(str); } catch { return null; }
}
