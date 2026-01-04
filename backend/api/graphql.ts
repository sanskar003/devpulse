import { ApolloServer, HeaderMap } from "@apollo/server";
import { typeDefs } from "../src/schema/typeDefs";
import { resolvers } from "../src/schema/resolvers";

console.log("🔵 [BOOT] graphql.ts loaded by Vercel");

const server = new ApolloServer({ typeDefs, resolvers });
let started = false;

export default async function handler(req: any, res: any) {
  console.log("🟢 [REQUEST] Incoming request:", {
    method: req.method,
    url: req.url,
  });

  // ---- CORS ----
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // ---- Preflight ----
  if (req.method === "OPTIONS") {
    console.log("🟡 [CORS] OPTIONS preflight received");
    res.status(200).end();
    return;
  }

  // ---- Start Apollo once ----
  if (!started) {
    console.log("🟣 [APOLLO] Starting Apollo Server...");
    await server.start();
    started = true;
    console.log("🟣 [APOLLO] Apollo Server started");
  }

  // ---- Convert headers to HeaderMap ----
  console.log("🔵 [HEADERS] Converting incoming headers");
  const headerMap = new HeaderMap();
  for (const [key, value] of Object.entries(req.headers || {})) {
    if (Array.isArray(value)) {
      for (const v of value) headerMap.set(key, String(v));
    } else if (value !== undefined) {
      headerMap.set(key, String(value));
    }
  }

  // ---- Execute GraphQL ----
  console.log("🟠 [GRAPHQL] Executing GraphQL request...");
  const response = await server.executeHTTPGraphQLRequest({
    httpGraphQLRequest: {
      method: req.method!,
      headers: headerMap,
      search: req.url?.split("?")[1] ?? "",
      body: req.body,
    },
    context: async () => {
      console.log("🟢 [CONTEXT] Building context");
      return {};
    },
  });

  console.log("🟠 [GRAPHQL] Response status:", response.status);

  // ---- Status ----
  res.status(response.status || 200);

  // ---- Apollo response headers ----
  console.log("🔵 [HEADERS] Setting Apollo response headers");
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  // ---- Send body ----
  console.log("🟢 [RESPONSE] Sending response body...");
  if (typeof response.body === "string") {
    res.end(response.body);
  } else {
    let out = "";
    for await (const chunk of response.body as any) out += chunk;
    res.end(out);
  }

  console.log("🟢 [DONE] Request completed");
}