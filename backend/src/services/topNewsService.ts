import type { TopNews } from "../types/TopNews.type";
import axios from "axios";
import * as dotenv from "dotenv"

dotenv.config()

// services/topNewsService.ts
export async function fetchTopNews({
  category = "technology",
  language = "en",
  country = "in",
  page = 1,
}: {
  category?: string;
  language?:string;
  country?:string;
  page?: number;
}): Promise<TopNews[]> {
  try {
    const response = await axios.get(
      `https://newsdata.io/api/1/latest?apikey=${process.env.NEWSDATA_IO_API_KEY}&category=${category}&removeduplicate=1&language=${language}&country=${country}`
    );

    const data = response.data;
    console.log(data)

    return (data.results || []).map((item: any) => ({
      title: item.title,
      url: item.link,
      publishedAt: item.pubDate,
      description: item.description,
      image: item.image_url,
    }));
  } catch (error) {
    console.error("TopNews fetch error:", error);
    return [];
  }
}