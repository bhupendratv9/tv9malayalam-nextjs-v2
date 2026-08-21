/**
 * /api/article/[id]
 * -----------------
 * Server-side proxy for fetching article detail data by ID.
 * Used by the InfiniteScrollArticle widget for client-side next-article loading.
 *
 * GET /api/article/12345
 * Returns the article JSON or 404.
 */

const NEXT_ARTICLE_API_URL = process.env.NEXT_ARTICLE_API_URL || "";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id || !/^\d+$/.test(id)) {
    return res.status(400).json({ error: "Invalid article ID" });
  }

  if (!NEXT_ARTICLE_API_URL) {
    return res.status(500).json({ error: "NEXT_ARTICLE_API_URL not configured" });
  }

  const articleUrl = NEXT_ARTICLE_API_URL.includes("{id}")
    ? NEXT_ARTICLE_API_URL.replace("{id}", id)
    : `${NEXT_ARTICLE_API_URL}/${id}`;

  try {
    const response = await fetch(articleUrl, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Article not found" });
    }

    const json = await response.json();

    // Validate response has data
    if (!json || (json.ok === false)) {
      return res.status(404).json({ error: "Article not found" });
    }

    // Cache for 2 minutes
    res.setHeader("Cache-Control", "public, s-maxage=120, stale-while-revalidate=300");
    return res.status(200).json(json);
  } catch (error) {
    console.error(`[api/article/${id}] Fetch error:`, error?.message || error);
    return res.status(502).json({ error: "Failed to fetch article" });
  }
}
