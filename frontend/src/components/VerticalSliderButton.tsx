import { forwardRef } from "react";

type VerticalSliderButtonProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

const VerticalSliderButton = forwardRef<
  HTMLSpanElement,
  VerticalSliderButtonProps
>(({ icon, label, active, onClick }, labelRef) => {
  return (
    <button
      onClick={onClick}
      className={`
          group flex items-center gap-2 md:gap-4 w-full px-2 py-2.5 rounded-xl
          transition-all duration-300 cursor-pointer
          ${
            active
              ? " bg-emerald-400/20 text-emerald-900 dark:text-white shadow-[0_0_12px_-2px_rgba(16,185,129,0.4)]"
              : " hover:bg-white/10 hover:border-white/90"
          }
        `}
    >
      {/* ICON CONTAINER */}
      <span
        className={`
            w-5 sm:w-8 h-5 sm:h-8 flex items-center justify-center rounded-xl shrink-0
            bg-white/80 backdrop-blur-md mx-2 sm:mx-0
            shadow-sm transition-all duration-300
            group-hover:scale-105
            ${active ? " md:scale-110 shadow-emerald-400/40" : ""}
          `}
      >
        {icon}
      </span>

      {/* LABEL */}
      <span
        ref={labelRef}
        className="hidden md:inline text-sm font-medium opacity-0 -translate-x-2 text-foreground">
        {label}
      </span>
    </button>
  );
});

export default VerticalSliderButton;
