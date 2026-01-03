import type { FreeCodeCampConnection } from "./FreeCodeCamp";
import type { GithubBlogConnection } from "./GithubBlog";
import type { GNewsConnection } from "./Gnews";

export interface MixFeedQueryResult {
  freeCodeCamp: FreeCodeCampConnection;
  githubBlog: GithubBlogConnection;
  gNews: GNewsConnection;
}