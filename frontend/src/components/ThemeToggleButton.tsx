import { Sun, Moon } from "lucide-react";
import { toggleTheme, applySavedTheme } from "../utils/theme";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    applySavedTheme();
    const theme = localStorage.getItem("theme") || "light";
    setIsDark(theme === "dark");
  }, []);

  const handleToggle = () => {
    toggleTheme();
    setIsDark(!isDark);

    // Animate the icon swap with rotation
    gsap.fromTo(
      iconRef.current,
      { rotate: 0, scale: 0.8, opacity: 0 },
      { rotate: 360, scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
    );
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-full bg-black/10 dark:bg-zinc-900/20 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-zinc-900/50 transition-colors duration-300"
    >
      <div ref={iconRef}>
        {isDark ? <Sun size={30} /> : <Moon size={30} />}
      </div>
    </button>
  );
};

export default ThemeToggle;