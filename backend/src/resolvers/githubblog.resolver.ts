import { fetchGithubBlog } from "../services/githubBlogService";
import type {
  GithubBlogConnection,
  GithubBlogEdge,
} from "../types/GithubBlog.type";

export const githubBlog = async (
  _: unknown,
  args: {
    first?: number;
    after?: string;
  }
): Promise<GithubBlogConnection> => {
  const all = await fetchGithubBlog();

  //Sort newest first
  const sorted = all.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Filter out posts newer than the cursor
  const filtered = args.after
    ? sorted.filter(
        (item) =>
          new Date(item.publishedAt).getTime() < new Date(args.after!).getTime()
      )
    : sorted;

  // Slice the next page
  const slice = filtered.slice(0, args.first ?? 5);

  // Build edges
  const edges: GithubBlogEdge[] = slice.map((post) => ({
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
