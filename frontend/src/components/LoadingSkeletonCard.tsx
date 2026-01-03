import Masonry from "react-masonry-css";

const LoadingSkeletonCard = () => {
  const placeholders = Array.from({ length: 8 });

  const breakpointColumnsObj = {
    default: 4,
    1600: 4,
    1100: 4,
    700: 2,
    500: 1,
  };

  return (
    <div className="h-screen flex justify-center items-center px-6 py-10">
      <div className="w-[80vw] h-[90vh] overflow-auto hide-scrollbar">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-6 p-2"
          columnClassName="flex flex-col gap-6"
        >
          {placeholders.map((_, i) => {
            const randomHeight = Math.floor(Math.random() * 3) + 1;

            return (
              <div
                key={i}
                className="opacity-0 translate-y-6 animate-fadeInUp
                           border border-emerald-400/20 dark:border-emerald-400/20
                           rounded-xl p-6 w-full
                           bg-white/20 dark:bg-emerald-300/50
                           backdrop-blur-md shadow-lg relative overflow-hidden"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                {/* Simulated image */}
                <div
                  className={`relative overflow-hidden w-full rounded-md mb-4 ${
                    randomHeight === 1
                      ? "h-40"
                      : randomHeight === 2
                      ? "h-56"
                      : "h-72"
                  } bg-linear-to-r from-emerald-200/40 to-emerald-400/40 dark:from-zinc-600 dark:to-zinc-800`}
                >
                  <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/40 to-transparent" />
                </div>

                {/* Simulated title */}
                <div className="relative overflow-hidden h-4 w-3/4 rounded mb-2 bg-linear-to-r from-emerald-200/40 to-emerald-400/40 dark:from-zinc-600 dark:to-zinc-800">
                  <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/40 to-transparent" />
                </div>

                {/* Simulated description lines */}
                {Array.from({ length: randomHeight + 1 }).map((_, j) => (
                  <div
                    key={j}
                    className={`relative overflow-hidden h-3 ${
                      j % 2 === 0 ? "w-full" : "w-5/6"
                    } rounded mb-2 bg-linear-to-r from-emerald-200/40 to-emerald-400/40 dark:from-zinc-600 dark:to-zinc-800`}
                  >
                    <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-white/40 to-transparent" />
                  </div>
                ))}
              </div>
            );
          })}
        </Masonry>
      </div>
    </div>
  );
};

export default LoadingSkeletonCard;