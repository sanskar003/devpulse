import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const link = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          devTo: {
            keyArgs: ["tag", "state", "top"],
            merge(existing = { edges: [] }, incoming) {
              return {
                ...incoming,
                edges: [...(existing.edges || []), ...incoming.edges],
              };
            },
          },

          gNews: {
            keyArgs: ["category", "country", "search"],
            merge(existing = {edges: [] }, incoming) {
              return {
                ...incoming,
                edges: [...(existing?.edges ?? []), ...incoming.edges],
              };
            },
          },
        },
      },
    },
  }),
});
