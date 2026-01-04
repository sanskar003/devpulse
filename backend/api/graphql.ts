import { ApolloServer, HeaderMap } from "@apollo/server";
import { typeDefs } from "../src/schema/typeDefs";
import { resolvers } from "../src/schema/resolvers";

const server = new ApolloServer({ typeDefs, resolvers });
let started = false;

export default async function handler(req: any, res: any) {
  // ---- CORS ----
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // ---- Preflight ----
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // ---- Start Apollo once ----
  if (!started) {
    await server.start();
    started = true;
  }

  // ---- Convert headers to HeaderMap ----
  const headerMap = new HeaderMap();
  for (const [key, value] of Object.entries(req.headers || {})) {
    if (Array.isArray(value)) {
      for (const v of value) headerMap.set(key, String(v));
    } else if (value !== undefined) {
      headerMap.set(key, String(value));
    }
  }

  // ---- Execute GraphQL ----
  const response = await server.executeHTTPGraphQLRequest({
    httpGraphQLRequest: {
      method: req.method!,
      headers: headerMap,
      search: req.url?.split("?")[1] ?? "",
      body: req.body,
    },
    context: async () => ({}),
  });

  // ---- Status ----
  res.status(response.status || 200);

  // ---- Apollo response headers ----
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  // ---- Send body ----
  if (typeof response.body === "string") {
    res.end(response.body);
  } else {
    let out = "";
    for await (const chunk of response.body as any) out += chunk;
    res.end(out);
  }
}