export interface TopNews {
    title: string;
    url: string;
    publishedAt: string;
    description?: string;
    image?:string;
}

export interface TopNewsEdge {
    cursor: string;
    node: TopNews;
}

export interface PageInfo {
    hasNextPage: boolean;
    endCursor: string | null;
}

export interface TopNewsConnection {
    edges: TopNewsEdge[];
    pageInfo: PageInfo;
}