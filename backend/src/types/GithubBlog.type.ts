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

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface GithubBlogConnection {
  edges: GithubBlogEdge[];
  pageInfo: PageInfo;
}