import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";
import * as dotenv from "dotenv";

dotenv.config();

async function startServer() {
  // Create Apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start Apollo server
  const { url } = await startStandaloneServer(server, {
    listen: { port: 5000 },
  });

  console.log(`🚀 Server ready at: ${url}`);
}

// Call the function
startServer();
