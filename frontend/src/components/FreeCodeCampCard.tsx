import Masonry from "react-masonry-css";
import { useQuery } from "@apollo/client/react";
import { GET_FREECODECAMP } from "../graphql/queries";
import type { FreeCodeCampQueryResult, FreeCodeCampEdge } from "../types/FreeCodeCamp";
import LoadingSkeletonCard from "./LoadingSkeletonCard";
import DisplayError from "./DisplayError";

export default function FreeCodeCampCard() {
  const { data, loading, error } = useQuery<FreeCodeCampQueryResult>(
    GET_FREECODECAMP,
    { variables: { first: 10 } }
  );

  if (loading) return <LoadingSkeletonCard />;
  if (error) {
  console.error("Apollo error:", error);
  return (
    <DisplayError/>
  );
}

  const edges = data?.freeCodeCamp.edges ?? [];

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
      <h1 className="absolute -left-50 top-1/2 -translate-y-1/2 font-lamoric font-bold transform -rotate-90 text-7xl -z-10">
        freecodecamp
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
          {edges.map(({ node }: FreeCodeCampEdge) => (
            <div
              key={node.url}
              className="relative border rounded-2xl px-2 sm:px-4 py-3 sm:py-4 
                       bg-card dark:bg-zinc-800 backdrop-blur-md border-emerald-400
                       shadow-sm shadow-emerald-200/50 transition-all duration-300 
                       hover:shadow-md"
            >
              <h3 className="text-sm sm:text-xl font-light font-haneen text-foreground leasing-snug group-hover:text-emerald-400 transition-colors">
                {node.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {new Date(node.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p className="text-foreground/80 text-[13px] sm:text-sm mt-2">{node.description}</p>
              <a
                href={node.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-xs sm:text-lg mt-4 inline-flex w-full justify-between items-center gap-2 text-emerald-500 
                         hover:text-emerald-400 transition-colors font-semibold"
              >
                Read more
                <img
                  src="/icons/navbar-uparrow.png"
                  alt="see"
                  className="w-3 sm:w-6 h-3 sm:h-6 bg-emerald-200 rounded-full transition-transform duration-300 group-hover:rotate-45"
                />
              </a>
            </div>
          ))}
        </Masonry>

       
      </div>
    </div>
  );
}