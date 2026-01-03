import { useState, useRef, useEffect } from "react";
import CountryDropdown from "./CountryDropdown";

type NewsSearchBarProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
};

const NewsSearchBar = ({
  search,
  setSearch,
  country,
  setCountry,
}: NewsSearchBarProps) => {

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent){
      if(containerRef.current && !containerRef.current.contains(e.target as Node))
        setOpen(false)
      }

      if(open){
        document.addEventListener("mousedown", handleClickOutside)
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
  }, [open])

  return (
    <div
      ref={containerRef}
      className="
        absolute top-3.5 sm:top-6 right-2 sm:right-6
        flex flex-col sm:flex-row items-end gap-2 sm:gap-3
        z-20
      "
    >
      {/* Search Icon + Expanding Input */}
      <div
        className={`
          flex items-center gap-3 transition-all duration-300
          ${open ? "w-72 md:w-96" : "w-10"}
        `}
      >
        {/* Icon Button */}
        <button
          onClick={() => setOpen(true)}
          className="
            flex items-center justify-center
            w-8 sm:w-10 h-8 sm:h-10 rounded-full
            dark:bg-zinc-600/60 bg-zinc-100/60
            backdrop-blur-xl border border-emerald-400
            shadow-sm dark:shadow-none
            hover:scale-105 transition cursor-pointer 
          "
        >
          <img
            src="/icons/gnews-searchIcon.png"
            alt="search"
            className="w-5 sm:w-7 h-5 sm:h-7"
          />
        </button>

        {/* Expanding Search Input */}
        {open && (
          <div
            className="
              relative flex-1
              animate-[fadeIn_0.2s_ease-out]
            "
          >
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setOpen(false);
              }} 
              placeholder="Search news by topic or keyword"
              className="
                w-full px-4 py-3 rounded-full
                bg-white/60 dark:bg-zinc-900/60
                backdrop-blur-xl border border-zinc-300/40 dark:border-zinc-700/40
                focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                outline-none transition-all
                text-xs sm:text-sm text-foreground
              "
            />

            {/* Close Button */}
            <button
              onClick={() => {
                setOpen(false);
                setSearch("");
              }}
              className="
                absolute right-4 top-1/2 -translate-y-1/2
                text-zinc-500 dark:text-zinc-400
                hover:text-red-500 transition cursor-pointer
              "
            >
              <img
                className="w-5 h-5"
                src="/icons/newSearchBar-closeIcon.png"
                alt="x"
              />
            </button>
          </div>
        )}
      </div>

      {/* Country Selector (only visible when open) */}
      {open && (
        <CountryDropdown
          country={country}
          setCountry={setCountry}
        ></CountryDropdown>
      )}

      <h1 className="hidden sm:block absolute -right-5 top-20  font-lamoric font-bold transform rotate-90 text-2xl ">
        search
      </h1>
    </div>
  );
};

export default NewsSearchBar;
