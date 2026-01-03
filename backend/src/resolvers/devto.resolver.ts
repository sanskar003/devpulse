// src/resolvers/devto.resolver.ts
import { DevTo, DevToEdge, DevToConnection } from "../types/DevTo.type";
import { fetchDevToArticles } from "../services/devtoService";

export const devTo = async (
  _: unknown,
  args: { first?: number; page?: number; tag?: string; state?: string; top?: number  }
): Promise<DevToConnection> => {
  try {
    const apiKey = process.env.DEV_TO_API_KEY!;
    const page = args.page ?? 1;

    const articles: DevTo[] = await fetchDevToArticles(
        apiKey, 
        args.tag,
        args.state,
        args.top,
        args.first ?? 15, 
        page,
    );

    const edges: DevToEdge[] = articles.map((article, index) => ({
      cursor: Buffer.from(`${page}-${index}`).toString("base64"),
      node: article,
    }));

    return {
      edges,
       pageInfo: {
      hasNextPage: articles.length === (args.first ?? 15),
      endCursor: edges.length ? edges[edges.length - 1].cursor : null,
      nextPage: page + 1,
    },

    };
  } catch (error) {
    console.error("DevTo resolver error:", error);
    return { edges: [], pageInfo: { hasNextPage: false, endCursor: null , nextPage: 0} };
  }
};