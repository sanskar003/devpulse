import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../src/schema/typeDefs";
import { resolvers } from "../src/schema/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

let serverStarted = false;

export default async function handler(
  req: any,
  res: any
) {
  // ---- CORS ----
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // ---- Preflight ----
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // ---- Start Apollo once ----
  if (!serverStarted) {
    await server.start();
    serverStarted = true;
  }

  // ---- Handle request ----
  const response = await server.executeHTTPGraphQLRequest({
    httpGraphQLRequest: {
      method: req.method!,
      headers: req.headers as any,
      search: req.url?.split("?")[1] ?? "",
      body: req.body,
    },
    context: async () => ({}),
  });

  res.status(response.status || 200);

  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });

  res.send(response.body);
}
