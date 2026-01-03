import AboutScrollSections from "./AboutScrollSection";
import Footer from "./Footer";

export default function About() {
  return (
    <main className="px-6 sm:px-12 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-emerald-700/20 blur-3xl rounded-full" />
      </div>

      {/* HERO — Centered */}
      <section className="text-center max-w-3xl h-screen flex flex-col justify-center  mx-auto">
        <h1 className="font-lamoric text-6xl sm:text-7xl md:text-8xl pb-10 lg:pb-15 text-center">
          <span className="font-haneen text-emerald-400">dev</span>pulse
        </h1>

        <p className=" text-lg sm:text-2xl text-foreground/80 font-haneen leading-relaxed">
          DevPulse is a solo‑built project{" "}
          <span className="text-emerald-400"> — </span>
          <br /> crafted to bring clarity to the noise of tech news.
          <br /> <span className="text-emerald-400"> — </span> One pulse, many
          voices.
        </p>
      </section>

      <div>
        <AboutScrollSections />
      </div>

      {/* SECTION 4 — Transparency (Right Text, Left Grid) */}

      <div className="mt-20 min-h-screen mx-auto px-4 max-w-6xl">
        <h2 className="w-fit font-haneen  text-4xl">Transparency</h2>
        <p className="mt-10 sm:mt-4 text-md sm:text-xl  mx-auto w-1/1 sm:w-1/3 text-foreground/80 font-haneen leading-snug">
          DevPulse is built openly. Every API and library is chosen for clarity,
          scalability, and developer trust.
        </p>

        <section className=" mx-auto sm:gap-12 mt-24 ">
          <ul className="flex justify-center flex-wrap sm:flex-nowrap gap-2 sm:gap-4">
            {[
              {
                label: "APIs",
                value: [
                  { name: "Dev.to", url: "https://dev.to/msnmongare/getting-started-with-the-devto-api-a-beginners-guide-1ljo" },
                  { name: "GNews", url: "https://gnews.io" },
                  { name: "TopNews", url: "https://newsdata.io/" },
                  { name: "GitHub Blog RSS", url: "https://github.blog/" },
                  { name: "FreeCodeCamp RSS", url: "https://www.freecodecamp.org/news/tag/blog/" },
                ],
              },
              {
                label: "Frontend",
                value:
                  "React + TypeScript, Apollo / client, TailwindCSS, GSAP, React-router",
              },
              {
                label: "Backend",
                value:
                  "Nodejs, GraphQL, Apollo Server, Mongoose , Express, Rss-parser",
              },
              {
                label: "Other",
                value:
                  "Theme persistence, Responsive routing, Modular architecture, Custom design Components",
              },
            ].map((item, i) => (
              <li
                key={i}
                className="
                
                p-4 rounded-xl w-full flex flex-col justify-between min-h-80
                bg-zinc-200/50 dark:bg-zinc-900/40
                backdrop-blur-xl 
              "
              >
                <div className="text-emerald-600 dark:text-emerald-400 ">
                  <h1 className="font-lamoric text-2xl">{item.label}</h1>
                </div>

                <div className="flex flex-col text-end leading-6  font-haneen text-xl text-foreground/60">
                  {Array.isArray(item.value)
                    ? item.value.map((v, idx) => (
                        <a
                          key={idx}
                          href={v.url}
                          target="_blank"
                          className="hover:text-emerald-500 transition-colors underline-offset-4 hover:underline"
                        >
                          {v.name}
                        </a>
                      ))
                    : item.value
                        .split(",")
                        .map((v, idx) => <span key={idx}>{v.trim()}</span>)}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Signature */}
      <div className="py-10 text-center text-lg text-foreground/60 font-haneen">
        Crafted with intention by{" "}
        <span className="font-lamoric text-emerald-400">Sanskar</span>.
      </div>
      <Footer />
    </main>
  );
}
