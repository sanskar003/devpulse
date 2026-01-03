export interface DevToUser {
  username: string;
}

export interface DevTo {
  id: number;
  title: string;
  url: string;
  publishedAt: string;
  description?: string | null;
  image?: string | null;
  user: DevToUser;
}

export interface DevToEdge {
  cursor: string;
  node: DevTo;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
  nextPage?: number;
}

export interface DevToConnection {
  edges: DevToEdge[];
  pageInfo: PageInfo;
}

export interface GetDevToArticlesData {
  devTo: DevToConnection;
}

export interface GetDevToArticlesVars {
  first: number;
  page: number;
  tag?: string;
  state?: string;
  top?: number;
}