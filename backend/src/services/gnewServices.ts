import axios from "axios"
import * as dotenv from "dotenv"

dotenv.config()

export async function fetchGNews({
  category = "technology",
  country,
  limit = 10,
  publishedBefore,
  search,
}: {
  category?: string;
  country?: string;
  limit?: number;
  publishedBefore?: string;
  search?: string;
}) {
  const base = search
    ? "https://gnews.io/api/v4/search"
    : "https://gnews.io/api/v4/top-headlines";
  
  const params = new URLSearchParams({
    category,
    lang: "en",
    max: limit.toString(),
    apikey: process.env.GNEWS_API_KEY!,
  });

  if(search) params.append("q", search);
  else params.append("category", category)

  if (country) params.append("country", country);
  if (publishedBefore) params.append("to", publishedBefore); // GNews supports `to` for end date

  const response = await axios.get(`${base}?${params.toString()}`);
  const news = response.data;

  return news.articles.map((article: any) => ({
    title: article.title,
    url: article.url,
    source: article.source.name,
    publishedAt: article.publishedAt,
    description: article.description,
    image: article.image,
  }));
}