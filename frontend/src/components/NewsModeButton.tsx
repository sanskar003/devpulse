export default function NewsModeButton({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-6 py-2 rounded-full font-haneen text-lg transition-all duration-300
        backdrop-blur-md border 
        ${active 
          ? "bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/20 scale-[1.03]"
          : "bg-white/40 dark:bg-zinc-800/40 text-foreground border-zinc-300 dark:border-zinc-700 hover:bg-white/60 dark:hover:bg-zinc-800/60"
        }
      `}
    >
      <span className="flex items-center gap-2">
        {children}
        <img
          src="/icons/navbar-uparrow.png"
          className={`
            w-4 h-4 transition-transform duration-300
            ${active ? "rotate-45" : "group-hover:rotate-45"}
          `}
        />
      </span>
    </button>
  );
}