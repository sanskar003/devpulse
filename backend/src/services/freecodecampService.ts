import Parser from "rss-parser";
import { FreeCodeCamp } from "../types/FreeCodeCamp.type";

const parser = new Parser();

export async function fetchFreeCodeCamp(): Promise<FreeCodeCamp[]> {
  try {
    const response = await parser.parseURL("https://www.freecodecamp.org/news/rss/");
    return response.items.map(item => ({
      title: item.title ?? "",
      url: item.link ?? "",
      publishedAt: item.pubDate ?? "",
      description: item.contentSnippet ?? "",
    }));
  } catch (err) {
    console.error("FreeCodeCamp RSS error:", err);
    return []; // ✅ never return null
  }
}