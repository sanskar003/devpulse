import Parser from "rss-parser";
import type { GithubBlog } from "../types/GithubBlog.type";

const parser = new Parser();

export async function fetchGithubBlog(): Promise<GithubBlog[]> {
  const response = await parser.parseURL("https://github.blog/feed/");
  console.log(response);
  
  return response.items.map(item => ({
    title: item.title ?? "",
    url: item.link ?? "",
    publishedAt: item.pubDate ?? "",
    description: item.contentSnippet ?? "",
  }));
}