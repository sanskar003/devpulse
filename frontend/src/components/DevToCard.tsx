import Masonry from "react-masonry-css";
import { useQuery } from "@apollo/client/react";
import { GET_DEVTO_ARTICLES } from "../graphql/queries";
import LoadingSkeletonCard from "./LoadingSkeletonCard";
import type {
  GetDevToArticlesData,
  GetDevToArticlesVars,
} from "../types/DevTo";
import { useState } from "react";
import DevLoadingSkeletonCard from "./DevLoadingSkeletonCard";
import DisplayError from "./DisplayError";

export default function DevToCard({
  tag,
  mode = "newest",
}: {
  tag?: string;
  mode?: "newest" | "trending" | "top";
}) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Convert mode → API variables
  let state: string | undefined;
  let top: number | undefined;

  if (mode === "newest") state = "fresh";
  if (mode === "trending") state = "rising";
  if (mode === "top") top = 15;

  // ⭐ THIS STAYS — DO NOT REMOVE IT
  const { data, loading, error, fetchMore } = useQuery<
    GetDevToArticlesData,
    GetDevToArticlesVars
  >(GET_DEVTO_ARTICLES, {
    variables: { first: 8, page: 1, tag, state, top },
    notifyOnNetworkStatusChange: true,
  });

  const articles = data?.devTo.edges.map((edge) => edge.node) ?? [];

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
    <div className="h-screen flex justify-center items-center px-1 sm:px-6  py-10">
      <h1 className="absolute -left-10 top-1/2 -translate-y-1/2 font-lamoric font-bold transform -rotate-90 text-7xl -z-10">
        dev.to
      </h1>

      <div className="w-full sm:w-[80vw] h-[90vh] overflow-auto hide-scrollbar">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-2 sm:gap-6 p-2"
          columnClassName="flex flex-col gap-6"
        >
          {articles.map((article: any) => (
            <div
              key={article.id}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-25 sm:h-48 object-cover"
                />
              )}

              <div className="p-3 sm:p-4  flex flex-col gap-1.5 sm:gap-2">
                <span className="text-[8px] sm:text-xs uppercase tracking-wide text-indigo-600 dark:text-indigo-400 font-semibold">
                  {article.user?.username || "Dev.to"}
                </span>

                <h2 className="text-xs sm:text-xl font-light font-haneen text-foreground leading-snug">
                  {article.title}
                </h2>

                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>

                <p className="text-[12px] sm:text-sm text-zinc-700 dark:text-zinc-300">
                  {article.description}
                </p>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-xs sm:text-lg mt-4 inline-flex w-full justify-between items-center gap-2 text-indigo-500 hover:text-indigo-400 transition-colors font-semibold"
                >
                  Read more
                  <img
                    src="/icons/navbar-uparrow.png"
                    alt="see"
                    className="w-3 sm:w-6 h-3 sm:h-6 bg-contain bg-indigo-200 rounded-full transition-transform duration-300 group-hover:rotate-45"
                  />
                </a>
              </div>
            </div>
          ))}

        </Masonry>

          {/* ⭐ Skeletons while loading more */}
          {isLoadingMore && 
            <div className="pb-15 sm:pb-10">
              <DevLoadingSkeletonCard/>
            </div>
          }
        {/* ⭐ Load More button */}
        {!isLoadingMore && data?.devTo.pageInfo.hasNextPage && (
          <div className="mt-6 flex justify-center sm:justify-end pb-15 sm:pb-5">
            <button
              onClick={() => {
                setIsLoadingMore(true);

                // ⭐ NO updateQuery — Apollo handles merging automatically
                fetchMore({
                  variables: {
                    page: data?.devTo.pageInfo.nextPage,
                    first: 8,
                    tag,
                    state,
                    top,
                  },
                }).finally(() => setIsLoadingMore(false));
              }}
              className="px-2 py-1 font-mono rounded-md text-sm sm:text-lg bg-emerald-400  text-black   border border-emerald-500/40
              dark:hover:bg-black dark:hover:text-emerald-400 hover:bg-white hover:text-emerald-600 transition-all duration-300  cursor-pointer">
              feed.next()
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
