import { fetchFreeCodeCamp } from "../services/freecodecampService";
import type {
  FreeCodeCampConnection,
  FreeCodeCampEdge,
} from "../types/FreeCodeCamp.type";

export const freeCodeCamp = async (
  _: unknown,
  args: { first?: number; after?: string }
): Promise<FreeCodeCampConnection> => {
  const all = await fetchFreeCodeCamp();

  //Sort newest first
  const sorted = all.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  // Apply cursor filtering
  const filtered = args.after
    ? sorted.filter(
        (item) =>
          new Date(item.publishedAt).getTime() < new Date(args.after!).getTime()
      )
    : sorted;

  // Slice the next page
  const slice = filtered.slice(0, args.first ?? 10);

  // Build edges
  const edges: FreeCodeCampEdge[] = slice.map((post) => ({
    cursor: post.publishedAt,
    node: post,
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
