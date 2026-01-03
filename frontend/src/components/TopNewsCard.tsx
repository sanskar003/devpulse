import Masonry from "react-masonry-css";
import { useQuery } from "@apollo/client/react";
import { GET_TOPNEWS} from "../graphql/queries";
import LoadingSkeletonCard from "./LoadingSkeletonCard";
import type { TopNewsConnection } from "../types/TopNews";
import DisplayError from "./DisplayError";

export default function TopNewsCard() {
  const { data, loading, error, fetchMore } = useQuery<{ topNews: TopNewsConnection }>(
    GET_TOPNEWS,
    {
      variables: { category: "technology", language: "en", page: 1 },
      notifyOnNetworkStatusChange: true,
    }
  );

  const articles = data?.topNews.edges.map(edge => edge.node) ?? [];

  const breakpointColumnsObj = {
    default: 4,
    1600: 4,
    1100: 3,
    700: 2,
    500: 2,
    0: 1,
  };

  if (loading && articles.length === 0) return <LoadingSkeletonCard />;
  if (error) return <DisplayError/>;


  return (
    <div className="h-screen flex justify-center items-center px-1 sm:px-6 py-10">


      <div className="w-full sm:w-[80vw] h-[90vh]  overflow-auto hide-scrollbar">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-2 sm:gap-6 p-2"
          columnClassName="flex flex-col gap-6"
        >
          {articles.map(article => (
            <div
              key={article.url}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-25 sm:h-48 object-cover"
                />
              )}

              <div className="p-4 flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wide text-emerald-600 dark:text-emerald-400 ">
                  TopNews
                </span>

                <h2 className="text-sm sm:text-xl font-light font-haneen text-foreground leading-snug">
                  {article.title}
                </h2>

                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>

                <p className="text-[13px] sm:text-sm text-zinc-700 dark:text-zinc-300 line-clamp-7">
                  {article.description}
                </p>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-xs sm:text-lg mt-4 inline-flex w-full justify-between items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors font-semibold"
                >
                  Read more
                  <img
                    src="/icons/navbar-uparrow.png"
                    alt="see"
                    className="w-3 sm:w-6 h-3 sm:h-6 bg-emerald-200 rounded-full transition-transform duration-300 group-hover:rotate-45"
                  />
                </a>
              </div>
            </div>
          ))}
        </Masonry>

     
      </div>
    </div>
  );
}