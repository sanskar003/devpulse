
export const toggleTheme = () => {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");

};


export const applySavedTheme = () => {
  const theme = localStorage.getItem("theme") || "light";
  document.documentElement.classList.toggle("dark", theme === "dark");
};
