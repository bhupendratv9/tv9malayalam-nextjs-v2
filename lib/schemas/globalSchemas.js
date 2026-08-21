/**
 * Global Schemas
 * ==============
 * Generates JSON-LD schemas that should appear on ALL pages when enabled
 * via siteSettings keys from the Page Builder global settings API.
 *
 * siteSettings keys (all default to "0" / disabled):
 *   - schema_webpage_enabled: "1" | "0"     → WebPage schema on every page
 *   - schema_organization_enabled: "1" | "0" → Organization schema on every page
 *   - schema_website_enabled: "1" | "0"      → WebSite schema (with SearchAction)
 *   - schema_navigation_enabled: "1" | "0"   → SiteNavigationElement schema
 *   - schema_news_media_org_enabled: "1" | "0" → NewsMediaOrganization schema
 *
 * These are rendered in addition to any page-specific schemas from the page builder.
 * Duplicate @type schemas are deduplicated (global schema is skipped if page already has it).
 */

import { buildOrganizationSchema } from "./OrganizationSchema";
import { buildWebPageSchema } from "./WebPageSchema";
import { buildWebSiteSchema } from "./WebSiteSchema";
import { buildSiteNavigationElementSchema } from "./SiteNavigationElementSchema";
import { buildNewsMediaOrganizationSchema } from "./NewsMediaOrganizationSchema";
import { buildProfilePageSchema } from "./ProfilePageSchema";
import { buildLiveBlogSchema } from "./LiveBlogSchema";
import { buildBreadcrumbSchema } from "./BreadcrumbSchema";

/**
 * Map of siteSettings key → { builder, schemaType }
 */
const GLOBAL_SCHEMA_CONFIG = [
  {
    key: "schema_webpage_enabled",
    schemaType: "WebPage",
    builder: buildWebPageSchema,
  },
  {
    key: "schema_organization_enabled",
    schemaType: "Organization",
    builder: buildOrganizationSchema,
  },
  {
    key: "schema_website_enabled",
    schemaType: "WebSite",
    builder: buildWebSiteSchema,
  },
  {
    key: "schema_navigation_enabled",
    schemaType: "SiteNavigationElement",
    builder: buildSiteNavigationElementSchema,
  },
  {
    key: "schema_news_media_org_enabled",
    schemaType: "NewsMediaOrganization",
    builder: buildNewsMediaOrganizationSchema,
  },
  {
    key: "schema_profile_page_enabled",
    schemaType: "ProfilePage",
    builder: buildProfilePageSchema,
  },
  {
    key: "schema_liveblog_enabled",
    schemaType: "LiveBlogPosting",
    builder: buildLiveBlogSchema,
  },
  {
    key: "schema_breadcrumb_enabled",
    schemaType: "BreadcrumbList",
    builder: buildBreadcrumbSchema,
  },
];

/**
 * Build global schemas based on siteSettings flags.
 *
 * @param {Object} context - { meta, settings, siteSettings, articleMeta, sections }
 * @param {Array} existingSchemas - Already-built page-specific schemas (to avoid duplicates)
 * @returns {Array} Array of JSON-LD objects for global schemas
 */
export function buildGlobalSchemas(context = {}, existingSchemas = []) {
  const { siteSettings = {} } = context;
  const results = [];

  // Collect @type values from existing page-specific schemas to avoid duplicates
  const existingTypes = new Set(
    existingSchemas.map((s) => s["@type"]).filter(Boolean)
  );

  for (const config of GLOBAL_SCHEMA_CONFIG) {
    // Check if this global schema is enabled in siteSettings
    if (siteSettings[config.key] !== "1") continue;

    // Skip if page already has this schema type (page-specific takes priority)
    if (existingTypes.has(config.schemaType)) continue;

    // Build the schema
    const schema = config.builder({}, context);
    if (schema) {
      results.push(schema);
    }
  }

  return results;
}
