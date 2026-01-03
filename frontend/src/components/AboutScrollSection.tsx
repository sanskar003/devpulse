import MagnifyCard from "./SpotlightCard";

const AboutScrollSection = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      {/* Section heading */}
      <div className="mb-10">
        <h1 className="mt-3 text-3xl md:text-4xl font-haneen text-foreground">
          Why this project exists, and what it stands for.
        </h1>
      </div>

      {/* Bento grid */}
      <div
        className="
          grid gap-6
          md:grid-cols-3
          auto-rows-[minmax(180px,auto)]
        "
      >
        {/* HERO / OVERVIEW – spans 2 columns */}
        <MagnifyCard
          className="
            md:col-span-2
            bg-white/40 dark:bg-zinc-900/60
            border border-emerald-500/20
            rounded-3xl p-6 md:p-8
            backdrop-blur-xl
            flex flex-col justify-between
          "
        >
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-lamoric text-3xl md:text-4xl text-emerald-500">
              DevPulse at a glance
            </h2>
            <span className="text-xs px-3 py-1 rounded-xl sm:rounded-full  bg-emerald-500/10 text-white/70 border border-emerald-500/30">
              Solo-crafted · In progress
            </span>
          </div>

          <p className="mt-6 text-sm md:text-base text-foreground/80 tracking-tighter leading-snug max-w-xl">
            DevPulse curates developer updates from multiple sources into a single, focused stream.
            It&apos;s built for devs who care about signal over noise, thoughtful design, and
            clarity in how they consume information.
          </p>

          <div className="mt-6 text-xs md:text-sm text-foreground/60 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20">
              Latest feed
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20">
              Modular architecture
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20">
              Clarity-first UX
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20">
              Expressive visuals
            </span>
          </div>
        </MagnifyCard>

        {/* THE PROBLEM – tall card */}
        <MagnifyCard
          className="
            row-span-2
            bg-white/40 dark:bg-zinc-900/60
            border border-emerald-500/20
            rounded-3xl p-6 md:p-8
            backdrop-blur-xl
            flex flex-col justify-between 
          "
        >
          <div>
            <p className="text-xs uppercase  text-foreground">
              01 · The Problem
            </p>
            <h2 className="mt-3 font-lamoric text-2xl md:text-3xl text-emerald-500">
              Too many tabs, not enough signal.
            </h2>
            <p className="mt-4 text-sm md:text-base  text-foreground/80 tracking-tighter leading-snug">
              Developers jump between GitHub blogs, FreeCodeCamp updates, newsletters, and scattered feeds.
              The context switches pile up, the good stuff gets buried, and staying “up to date” starts
              feeling like a chore instead of a habit.
            </p>
          </div>

          <div className="mt-6 text-xs md:text-sm text-foreground/60 font-haneen">
            DevPulse is a response to this friction — not another feed, but a calmer, more intentional one.
          </div>
        </MagnifyCard>

        {/* THE STORY */}
        <MagnifyCard
          className="
            bg-white/40 dark:bg-zinc-900/60
            border border-emerald-500/20
            rounded-3xl p-6 md:p-8
            backdrop-blur-xl
            flex flex-col justify-between
          "
        >
          <div>
            <p className="text-xs uppercase  text-foreground">
              02 · The Story
            </p>
            <h2 className="mt-3 font-lamoric text-2xl text-emerald-500">
              Born from personal need.
            </h2>
            <p className="mt-4 text-sm md:text-base text-foreground/80 tracking-tighter leading-snug">
              DevPulse started as a private tool — a way to unify the sources I personally trust into
              one clean, daily rhythm. No growth hacks. No engagement tricks. Just a steady pulse
              of what actually matters for developers.
            </p>
          </div>

          <p className="mt-6 text-xs md:text-sm text-foreground/60 font-haneen">
            Every design and decision is shaped by that same intent: minimal noise, maximum clarity.
          </p>
        </MagnifyCard>

        {/* PHILOSOPHY */}
        <MagnifyCard
          className="
            bg-white/40 dark:bg-zinc-900/60
            border border-emerald-500/20
            rounded-3xl p-6 md:p-8
            backdrop-blur-xl
            flex flex-col justify-between
          "
        >
          <div>
            <p className="text-xs uppercase text-foreground">
              03 · Philosophy
            </p>
            <h2 className="mt-3 font-lamoric text-2xl text-emerald-500">
              Clarity, modularity, and intentional craft.
            </h2>
            <p className="mt-4 text-sm md:text-base text-foreground/80 tracking-tighter leading-snug">
              DevPulse is built like a good codebase: modular, transparent, and easy to extend.
              The UI leans on subtle motion and glassy layers — expressive, but never loud enough
              to get in the way of the content itself.
            </p>
          </div>

          <p className="mt-6 text-xs md:text-sm text-foreground/60 font-haneen">
            It&apos;s a solo project, but treated like a product — with respect for the people who will use it.
          </p>
        </MagnifyCard>
      </div>
    </section>
  );
};

export default AboutScrollSection;