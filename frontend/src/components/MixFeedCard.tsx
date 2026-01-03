import Masonry from "react-masonry-css";
import { useQuery } from "@apollo/client/react";
import { GET_MIXFEED } from "../graphql/queries";
import LoadingSkeletonCard from "./LoadingSkeletonCard";
import type { MixFeedQueryResult } from "../types/MixFeed";

export default function MixFeed() {
  const { data, loading, error, fetchMore } = useQuery<MixFeedQueryResult>(
    GET_MIXFEED,
    { variables: { first: 10 } }
  );

  if (loading) return <LoadingSkeletonCard />;
  if (error) return <p className="text-red-500">Error loading MixFeed.</p>;

  // Collect edges from all feeds
  const fccEdges = (data?.freeCodeCamp.edges ?? []).map((e) => ({
    ...e,
    source: "freeCodeCamp",
  }));

  const ghEdges = (data?.githubBlog.edges ?? []).map((e) => ({
    ...e,
    source: "githubBlog",
  }));

  const gNewsEdges = (data?.gNews.edges ?? []).map((e) => ({
    ...e,
    source: "gNews",
  }));

  const merged = [...fccEdges, ...ghEdges, ...gNewsEdges].sort(
    (a, b) =>
      new Date(b.node.publishedAt).getTime() -
      new Date(a.node.publishedAt).getTime()
  );

  const sourceSymbols: Record<string, string> = {
    freeCodeCamp: "/public/icons/freecodecampIcon.png", // your FFC logo
    githubBlog: "public/icons/githubIcon.png", // GitHub logo
    gNews: "/public/icons/gnewsioIcon.png", // News icon
  };

  const breakpointColumnsObj = {
    default: 4,
    1600: 4,
    1100: 4,
    700: 2,
    500: 1,
  };
  console.log("GNews pageInfo:", data?.gNews.pageInfo);
  return (
    <div className="h-screen flex justify-center items-center px-6 py-10">
      <h1 className="absolute -left-50 top-1/2 -translate-y-1/2 font-lamoric font-bold transform -rotate-90 text-7xl -z-10">
        MixFeed
      </h1>

      <div className="w-[80vw] h-[90vh] overflow-auto hide-scrollbar">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-6 p-2"
          columnClassName="flex flex-col gap-6"
        >
          {merged.map(({ node, source }) => (
            <div
              key={node.url}
              className="relative border rounded-2xl p-6 bg-card dark:bg-zinc-800/50 backdrop-blur-md shadow-sm shadow-emerald-200/50 transition-all duration-300 hover:shadow-md"
            >
              <h3 className="text-xl font-light font-haneen text-foreground group-hover:text-emerald-400 transition-colors">
                {node.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {new Date(node.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p className="text-foreground/80 mt-2">{node.description}</p>
              <a
                href={node.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 inline-flex w-full justify-between items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors font-semibold"
              >
                Read more
                <p className="flex gap-3">
                  {/* Symbol badge */}
                  <img
                    src={sourceSymbols[source]}
                    alt={source}
                    className=" w-6 h-6 object-contain bg-white/70 rounded-full"
                  />
                  <img
                    src="/icons/navbar-uparrow.png"
                    alt="see"
                    className="w-6 h-6 bg-emerald-200 rounded-full transition-transform duration-300 group-hover:rotate-45"
                  />
                </p>
              </a>
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}
