export interface GithubBlog {
  title: string;
  url: string;
  publishedAt: string;
  description?: string;
}

export interface GithubBlogEdge {
  cursor: string;
  node: GithubBlog;
}

export interface GithubBlogConnection {
  edges: GithubBlogEdge[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}

export interface GithubBlogQueryResult {
  githubBlog: GithubBlogConnection;
}