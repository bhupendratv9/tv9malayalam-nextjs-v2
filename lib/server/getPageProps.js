/**
 * getPageProps — Server-only helper for getServerSideProps.
 * Fetches page data and returns it as a single `pageData` prop.
 * Returns { notFound: true } when API returns ok:false or page has no content.
 * This triggers pages/404.js which has full header/footer via getStaticProps.
 *
 * Usage:
 *   import { getPageProps } from "../../lib/server/getPageProps";
 *   export async function getServerSideProps({ query }) {
 *     return getPageProps(PAGE_IDS.HOME, { query });
 *   }
 */

import { buildHomePageData } from "./homePageBuilder";

export async function getPageProps(pageId, { query = {}, extraProps = {}, allowEmpty = false } = {}) {
  const queryParams = query || {};

  try {
    const pageData = await buildHomePageData(pageId, { queryParams });

    // If page builder returned no sections and no meta, treat as 404
    if (!allowEmpty && pageData) {
      const hasSections = pageData.sections && pageData.sections.length > 0;
      const hasMeta = pageData.meta?.meta_title || pageData.meta?.meta_description;

      if (!hasSections && !hasMeta) {
        return { notFound: true };
      }
    }

    return {
      props: {
        pageData: pageData || {},
        queryParams,
        ...extraProps,
      },
    };
  } catch (error) {
    console.error(`[getPageProps] Error fetching page ${pageId}:`, error?.message || error);
    return { notFound: true };
  }
}
