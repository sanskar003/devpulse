export interface GNews {
  title: string;
  url: string;
  source: string;
  publishedAt: string;
  description?: string;
  image?: string;
}

export interface GNewsEdge {
  cursor: string;
  node: GNews;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface GNewsConnection {
  edges: GNewsEdge[];
  pageInfo: PageInfo;
}