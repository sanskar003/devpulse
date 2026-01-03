import Masonry from "react-masonry-css";
import { useQuery } from "@apollo/client/react";
import { GET_GNEWS } from "../graphql/queries";
import LoadingSkeletonCard from "./LoadingSkeletonCard";
import type { GNewsConnection } from "../types/Gnews";
import DisplayError from "./DisplayError";
import { useState } from "react";
import DevLoadingSkeletonCard from "./DevLoadingSkeletonCard";

export default function GnewsCard({
  search,
  country,
}: {
  search: string;
  country: string;
}) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, loading, error, fetchMore } = useQuery<{
    gNews: GNewsConnection;
  }>(GET_GNEWS, {
    variables: {
      category: search ? undefined : "technology",
      search: search || undefined,
      country,
      first: 8,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (loading && !data) {
    return <LoadingSkeletonCard />;
  }

  if (error) {
    console.log("GNews error:", error);
    return <DisplayError />;
  }

  const articles = data?.gNews?.edges?.map((edge) => edge.node) ?? [];

  const breakpointColumnsObj = {
    default: 4,
    1600: 4,
    1100: 3,
    700: 2,
    500: 2,
    0: 1,
  };

  return (
    <div className="h-screen flex justify-center items-center px-1 sm:px-6 py-10">
      <h1 className="absolute -left-10 top-1/2 -translate-y-1/2 font-lamoric font-bold transform -rotate-90 text-7xl -z-10">
        gnews
      </h1>

      <div className="w-full sm:w-[80vw] h-[90vh] overflow-auto hide-scrollbar pt-6 sm:pt-0">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-2 sm:gap-6 p-2"
          columnClassName="flex flex-col gap-6"
        >
          {articles.map((article: any) => (
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

              <div className="p-3 sm:p-4  flex flex-col gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs tracking-wide text-emerald-600 dark:text-emerald-400 font-semibold">
                  {article.source || "GNews"}
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

                <p className="text-[13px] sm:text-sm text-zinc-700 dark:text-zinc-300">
                  {article.description}
                </p>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group  text-xs sm:text-lg mt-4 inline-flex w-full justify-between items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors font-semibold"
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

        {/* ⭐ Skeletons while loading more */}
        {isLoadingMore && (
          <div className="pb-15 sm:pb-10">
            <DevLoadingSkeletonCard />
          </div>
        )}

        {!isLoadingMore && data?.gNews?.pageInfo?.hasNextPage && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => {
                setIsLoadingMore(true);

                fetchMore({
                  variables: {
                    after: data?.gNews?.pageInfo?.endCursor,
                    first: 8,
                    category: search ? undefined : "technology",
                    search: search || undefined,
                    country,
                  },
                }).finally(() => setIsLoadingMore(false));
              }}
              className="px-6 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
