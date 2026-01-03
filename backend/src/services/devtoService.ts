import { DevTo } from "../types/DevTo.type";
import axios from "axios";
import type { AxiosError } from "axios";

const DevTo_BASE_URL = "https://dev.to/api";

export async function fetchDevToArticles(
  apiKey: string,
  tag?: string,
  state?: string,
  top?: number,
  first: number = 15,
  page: number = 1,
): Promise<DevTo[]> {
  try {
    const url =
      `${DevTo_BASE_URL}/articles?per_page=${first}&page=${page}` +
      (tag ? `&tag=${tag}` : "") +
      (state ? `&state=${state}` : "") +
      (top ? `&top=${top}` : "");

    const response = await axios.get(url, {
      headers: {
        "api-key": apiKey,
        Accept: "application/vnd.forem.api-v1+json",
      },
      timeout: 15000,
    });

    const data = response.data;
    console.log("data :", data);

    if (!Array.isArray(data)) {
      throw new Error("Unexpected DEV.to response format");
    }

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      url: item.url,
      publishedAt: item.published_at ?? item.published_timestamp ?? "",
      description: item.description ?? undefined,
      image: item.cover_image ?? item.social_image ?? null,
      user: { username: item.user?.username ?? "unknown" },
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const e = error as AxiosError;
      console.error("DEV.to API error:", e.message, e.response?.status);
      throw new Error(
        `DEV.to fetch failed: ${e.response?.status ?? "network error"}`
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("DEV.to fetch failed due to unexpected error");
    }
  }
}
