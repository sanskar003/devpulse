import { fetchGNews } from "../services/gnewServices";
import { GNews, GNewsConnection, GNewsEdge } from "../types/GNews.type";

export const gNews = async (
  _: unknown,
  args: {
    category?: string;
    country?: string;
    first?: number;
    after?: string;
    search?: string;
  }
): Promise<GNewsConnection> => {
  const articles: GNews[] = await fetchGNews({
    category: args.category ?? "technology",
    country: args.country ?? "in",
    limit: 50, // fetch a large enough batch to paginate from
    publishedBefore: args.after ?? undefined,
    search: args.search ?? undefined,
  });

  // Sort newest first
  const sorted: GNews[] = articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Filter out articles newer than the cursor
  const filtered: GNews[] = args.after
    ? sorted.filter(
        (item) =>
          new Date(item.publishedAt).getTime() <
          new Date(args.after!).getTime()
      )
    : sorted;

  // Slice the next page
  const slice: GNews[] = filtered.slice(0, args.first ?? 5);

  // Build edges from sliced articles
  const edges: GNewsEdge[] = slice.map((article) => ({
    cursor: article.publishedAt,
    node: article,
  }));

  const endCursor = edges.length ? edges[edges.length - 1].cursor : null;

  return {
    edges,
    pageInfo: {
      hasNextPage: filtered.length > slice.length,
      endCursor,
    },
  };
};