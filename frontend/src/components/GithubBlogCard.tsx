import Masonry from "react-masonry-css";
import type {
  GithubBlogQueryResult,
  GithubBlogEdge,
} from "../types/GithubBlog";
import { GET_GITHUBBLOG } from "../graphql/queries";
import { useQuery } from "@apollo/client/react";
import LoadingSkeletonCard from "./LoadingSkeletonCard";
import DisplayError from "./DisplayError";

const GithubBlogCard = () => {
  const { data, loading, error } = useQuery<GithubBlogQueryResult>(
    GET_GITHUBBLOG,
    { variables: { first: 10 } }
  );

  if (loading) return <LoadingSkeletonCard />;
  if (error) return <DisplayError/>;

  const edges = data?.githubBlog.edges ?? [];

  const breakpointColumnsObj = {
    default: 4,
    1600: 4,
    1100: 3,
    700: 2,
    500: 2,
    0: 1,
  };

  return (
    <div className="h-screen flex justify-center items-center  px-1 sm:px-6 py-10">
      <h1 className="absolute -left-40 top-1/2 -translate-y-1/2 font-lamoric font-bold transform -rotate-90 text-7xl -z-10">
        githubBlog
      </h1>
      <h1 className="absolute -right-35 top-1/2 -translate-y-1/2 font-lamoric font-bold transform rotate-90 text-7xl -z-10">
        top <span className="text-emerald-400">10</span> posts
      </h1>

      <div className="w-full sm:w-[80vw] h-[90vh] overflow-auto hide-scrollbar">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-2 sm:gap-6 p-2"
          columnClassName="flex flex-col gap-2 sm:gap-6"
        >
          {edges.map(({ node }: GithubBlogEdge) => (
            <div
              className="border rounded-xl py-2 sm:py-4 px-1.5 sm:px-3 w-full font-mono  backdrop-blur-md 
                       shadow-sm shadow-emerald-200/50 transition-all duration-300 
                       hover:shadow-md
               bg-white dark:bg-[#0d1117]
               border-zinc-200 dark:border-zinc-800
               text-zinc-800 dark:text-[#c9d1d9]"
              key={node.url}
            >
              <h1 className="text-sm sm:text-xl font-semibold mb-2 text-zinc-800 dark:text-[#8b949e] leading-snug">
                {node.title}
              </h1>
              <h1 className="text-xs mb-2 text-zinc-500 dark:text-[#6e7681]">
                {new Date(node.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </h1>
              <h1
                className="text-[12px] sm:text-sm whitespace-pre-wrap p-1 sm:p-2 rounded-md
                 bg-zinc-100 text-zinc-700
                 dark:bg-[#161b22] dark:text-[#c9d1d9]"
              >
                {node.description}
              </h1>
              <a
                href={node.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4  text-xs sm:text-lg inline-flex w-full justify-between items-center gap-2
               text-emerald-600 hover:text-emerald-500
               dark:text-[#2ea44f] dark:hover:text-green-400
               transition-colors font-semibold group"
              >
                View on GitHub
                <img
                  src="/icons/navbar-uparrow.png"
                  alt="see"
                  className="w-3 sm:w-6 h-3 sm:h-6 bg-emerald-300 rounded-full transition-transform duration-300 group-hover:rotate-45"
                />
              </a>
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default GithubBlogCard;
