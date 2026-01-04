import { ApolloServer, HeaderMap } from "@apollo/server";
import { typeDefs } from "../src/schema/typeDefs";
import { resolvers } from "../src/schema/resolvers";

const server = new ApolloServer({ typeDefs, resolvers });
let started = false;

export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Start Apollo once
  if (!started) {
    await server.start();
    started = true;
  }

  // Convert req.headers → HeaderMap
  const headerMap = new HeaderMap();
  for (const [key, value] of Object.entries(req.headers || {})) {
    if (Array.isArray(value)) {
      for (const v of value) headerMap.set(key, String(v));
    } else if (value !== undefined) {
      headerMap.set(key, String(value));
    }
  }

  const response = await server.executeHTTPGraphQLRequest({
    httpGraphQLRequest: {
      method: req.method,
      headers: headerMap,
      body: req.body,
      search: req.url?.split("?")[1] ?? "",
    },
    context: async () => ({}),
  });

  // Status
  res.status(response.status || 200);

  // Apollo response headers
  response.headers?.forEach((value: string, key: string) => {
    res.setHeader(key, value);
  });

  // Body
  if (typeof response.body === "string") {
    return res.send(response.body);
  }

  let out = "";
  for await (const chunk of response.body as any) out += chunk;
  return res.send(out);
}