/**
 * Analytics Module
 * ================
 * Modular analytics setup for GA4, DataLayer, ComScore, etc.
 * Each tracker is a separate file. This index exports the head/body scripts.
 *
 * Usage in _app.js or _document.js:
 *   import { AnalyticsHead, AnalyticsBody } from "../lib/analytics";
 */

export { default as AnalyticsHead } from "./AnalyticsHead";
export { default as AnalyticsBody } from "./AnalyticsBody";

export { default as DataLayer } from "./DataLayer";
