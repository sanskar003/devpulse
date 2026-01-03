export interface DevTo {
  id: number;
  title: string;
  url: string;
  description?: string | null;
  publishedAt?: string | null;
  coverImage?: string | null;
  socialImage?: string | null;
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