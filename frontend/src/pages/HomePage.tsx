import HomeActionButton from "../components/HomeActionButton";

const HomePage = () => {
  return (
    <div
      className="bg-[url('/images/background/mainSectionBgLight.svg')] dark:bg-[url('/images/background/mainSectionBgDark.svg')] bg-cover bg-center 
      relative min-h-screen flex flex-col justify-center items-center px-4 
      bg-background text-foreground transition-colors duration-500"
    >
      {/* Title */}
      <h1 className="font-lamoric text-6xl sm:text-7xl md:text-8xl pb-10 lg:pb-15 text-center">
        <span className="font-haneen text-emerald-400">dev</span>pulse
      </h1>

      {/* Subtitle */}
      <h2 className="font-lamoric text-xl sm:text-3xl md:text-4xl pb-5 lg:pb-10 w-full sm:w-3/4 md:w-1/2 text-left">
        Track the pulse <br /> <span>of the</span> <br /> dev world
      </h2>

      {/* Description */}
      <h3
        className="font-haneen text-xl sm:text-2xl md:text-3xl 
                     w-full sm:w-3/4 md:w-1/2 text-right"
      >
        Curated blogs, tools, and news from across the developer ecosystem all
        in one clean, distraction-free site.
      </h3>

      {/* CTA Button */}
      <div className="absolute right-5 sm:right-20 md:right-20 lg:right-80">
        <HomeActionButton />
      </div>
    </div>
  );
};

export default HomePage;
