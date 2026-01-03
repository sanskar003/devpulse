export interface FreeCodeCamp {
  title: string;
  url: string;
  publishedAt: string;
  description?: string;
}

export interface FreeCodeCampEdge {
  cursor: string;
  node: FreeCodeCamp;
}

export interface FreeCodeCampConnection {
  edges: FreeCodeCampEdge[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}