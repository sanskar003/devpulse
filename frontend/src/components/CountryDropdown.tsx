import { useState } from "react";
import { ChevronDownCircle } from "lucide-react";

type CountryDropdownProps = {
  country: string;
  setCountry: (c: string) => void;
};

const countries = [
  { code: "in", label: "India", flag: "/icons/countryFlag/IndiaFlag.png" },
  { code: "us", label: "United States", flag: "/icons/countryFlag/UsaFlag.png" },
  { code: "gb", label: "United Kingdom", flag: "/icons/countryFlag/UkFlag.png" },
  { code: "au", label: "Australia", flag: "/icons/countryFlag/AustraliaFlag.png" },
  { code: "ca", label: "Canada", flag: "/icons/countryFlag/CanadaFlag.png" },
];

export default function CountryDropdown({ country, setCountry }: CountryDropdownProps) {
  const [open, setOpen] = useState(false);

  const selected = countries.find((c) => c.code === country);

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="
          flex items-center gap-2 px-4 py-3 rounded-full
          bg-white/60 dark:bg-zinc-900/60
          backdrop-blur-xl border border-zinc-300/40 dark:border-zinc-700/40
          shadow-sm dark:shadow-none
          text-sm text-foreground
          focus:ring-2 focus:ring-emerald-500 focus:border-transparent
          transition-all
        "
      >
        <img src={selected?.flag} alt="" className="w-5 h-5 rounded-sm" />
        {selected?.label}

        {/* REACT DD ICON */}
         <ChevronDownCircle
          className={`
            text-zinc-600 dark:text-zinc-300 ml-1
            transition-transform duration-300
            ${open ? "rotate-180" : "rotate-0"}
          `}
          size={18}
        />


      </button>

      {/* Dropdown Panel */}
      {open && (
        <div
          className="
            absolute right-0 mt-2 w-48 rounded-xl overflow-hidden
            bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl
            border border-zinc-300/40 dark:border-zinc-700/40
            shadow-lg dark:shadow-none
            animate-[fadeIn_0.15s_ease-out]
            z-50
          "
        >
          {countries.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                setCountry(c.code);
                setOpen(false);
              }}
              className="
                w-full flex items-center gap-3 px-4 py-3 text-left
                hover:bg-emerald-500/20 dark:hover:bg-emerald-500/20
                transition-all
              "
            >
              <img src={c.flag} alt="" className="w-5 h-5 rounded-sm" />
              <span className="text-sm">{c.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}