import { fetchTopNews } from "../services/topNewsService";
import { TopNews, TopNewsConnection, TopNewsEdge } from "../types/TopNews.type";

export const topNews = async (
  _: unknown,
  args: { category?: string; language?: string; country?: string; page?: number }
): Promise<TopNewsConnection> => {
  try {
    const articles: TopNews[] = await fetchTopNews({
      category: args.category,
      language: args.language,
      country: args.country,
      page: args.page ?? 1,
    });

    const edges: TopNewsEdge[] = articles.map((article, index) => ({
      cursor: Buffer.from(`${args.page ?? 1}-${index}`).toString("base64"),
      node: article,
    }));

    return {
      edges,
      pageInfo: {
        hasNextPage: edges.length > 0,
        endCursor: edges.length ? edges[edges.length - 1].cursor : null,
      },
    };
  } catch (error) {
    console.error("TopNews resolver error:", error);

    // ✅ Return empty connection instead of null
    return {
      edges: [],
      pageInfo: { hasNextPage: false, endCursor: null },
    };
  }
};