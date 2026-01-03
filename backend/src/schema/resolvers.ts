import { gNews } from "../resolvers/gnews.resolver";
import { githubBlog } from "../resolvers/githubblog.resolver";
import { freeCodeCamp } from "../resolvers/freecodecamp.resolver";
import { topNews } from "../resolvers/topnews.resolver";
import { devTo } from "../resolvers/devto.resolver";

export const resolvers = {
  Query: {
    gNews,
    githubBlog,
    freeCodeCamp,
    topNews,
    devTo
  },
};
