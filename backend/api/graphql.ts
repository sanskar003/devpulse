import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../src/schema/typeDefs";
import { resolvers } from "../src/schema/resolvers";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import * as dotenv from "dotenv"

dotenv.config()

const server = new ApolloServer({
    typeDefs,
    resolvers
})

export default startServerAndCreateNextHandler(server, {
    context: async (req, res) => {
            // Set CORS headers manually
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return {};
    }

    return {};

    }
})