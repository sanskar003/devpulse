import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { applySavedTheme } from "../utils/theme";
import ThemeToggle from "./ThemeToggleButton";

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [, setIsDark] = useState(false);

  //links
  const rigtNavLink = [
    { label: "devTo", to: "/devto" },
    { label: "ffcBlog", to: "/freecodecamp" },
    { label: "githubBlog", to: "/githubblog" },
  ];

  const leftNavLink = [
    // { label: "topNews", to: "/topnews" },
    { label: "gNews", to: "/gnews" },
    { label: "home", to: "/" },
  ];

  // Updated toggleMenu to consider screen width and animate accordingly
  const toggleMenu = () => {
    if (!navRef.current) return;

    const isMobile = window.innerWidth <= 640; // Tailwind sm breakpoint ~640px
    const openWidth = isMobile ? "95vw" : "96vw";
    const openHeight = isMobile ? "90vh" : "95vh";
    const closeWidth = isMobile ? "15vw" : "5vw";
    const closeHeight = isMobile ? "7vh" : "7vh";

    if (!isOpen) {
      gsap.to(navRef.current, {
        width: openWidth,
        height: openHeight,
        duration: 0.6,
        ease: "sine.inOut",
        onComplete: () => {
          if (cardsRef.current.length) {
            gsap.fromTo(
              cardsRef.current,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.15,
              }
            );
          }
        },
      });
      setIsOpen(true);
    } else {
      gsap.to(navRef.current, {
        width: closeWidth,
        height: closeHeight,
        duration: 0.6,
        ease: "sine.inOut",
      });
      setIsOpen(false);
    }
  };

  // Set refs for cards dynamically
  const setCardRef = (el: HTMLDivElement | null, i: number) => {
    if (el) cardsRef.current[i] = el;
  };

  // Restore saved theme on first load
  useEffect(() => {
    applySavedTheme();
    const theme = localStorage.getItem("theme") || "light";
    setIsDark(theme === "dark");
  }, []);

  // Close menu if window resized larger than mobile to avoid stuck open state on desktop after resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640 && isOpen) {
        toggleMenu();
      }
      // Clear GSAP inline styles so Tailwind classes apply correctly
      if (navRef.current) {
        gsap.set(navRef.current, { clearProps: "width,height" });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <div className="fixed p-2 sm:p-5 z-99">
      <div
        ref={navRef}
        className={`w-[15vw] sm:w-[5vw] h-[7vh] border rounded-2xl 
                   bg-emerald-500/50 backdrop-blur-xl relative overflow-hidden 
                   transition-colors duration-500`}
      >
        {/* Menu Icon */}
        <div
          className="absolute top-2.5 left-3 sm:top-3 sm:left-6 md:left-2 lg:left-6 cursor-pointer text-white"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && toggleMenu()
          }
        >
          {isOpen ? (
            <img
              className=""
              src="/icons/navbar-menuclose.png"
              alt="Close menu icon"
            />
          ) : (
            <img src="/icons/navbar-menuopen.png" alt="Open menu icon" />
          )}
        </div>

        {/* Expanded Content */}
        {isOpen && (
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-end justify-end h-full gap-4 rounded-2xl md:gap-6 text-white text-xl sm:text-2xl p-3 sm:p-5">
            {/* Theme toggle button */}
            <div className="absolute top-5 sm:top-10 right-5 sm:right-10 p-2  rounded-md ">
              <ThemeToggle />
            </div>

            {/* NEWS Card */}
            <div
              ref={(el) => setCardRef(el, 0)}
              className="card flex flex-col justify-between p-3 rounded-xl w-full md:w-1/1 h-auto md:h-2/3 text-start opacity-0"
            >
              <h1 className="font-lamoric text-3xl sm:text-[4em]">NEWS</h1>
              <div className="flex flex-col md:flex-row gap-2 text-xl sm:text-5xl md:text-6xl text-foreground font-haneen">
                <div className="w-full md:w-1/2 flex flex-col gap-2">
                  {rigtNavLink.map((item, i) => (
                    <Link
                      to={item.to}
                      key={i}
                      onClick={() => {
                        if (isOpen) toggleMenu();
                      }}
                      className="group relative border h-10 sm:h-20 flex justify-between items-center px-2 rounded-2xl cursor-pointer overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-between w-full transition-all duration-300 group-hover:text-black">
                        <h2>{item.label}</h2>
                        <img
                          className="w-5 sm:w-10 h-5 sm:h-10 transition-all duration-300 group-hover:rotate-45"
                          src="/icons/navbar-uparrow.png"
                          alt="see"
                        />
                      </span>
                      <span className="absolute inset-0 bg-white/50 scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500"></span>
                    </Link>
                  ))}
                </div>

                <div className="w-full md:w-1/2 flex flex-col gap-2">
                  {leftNavLink.map((item, i) => (
                    <Link
                      to={item.to}
                      key={i}
                      onClick={() => {
                        if (isOpen) toggleMenu();
                      }}
                      className="group relative border h-10 sm:h-20 flex justify-between items-center px-2 rounded-2xl cursor-pointer overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-between w-full transition-all duration-300 group-hover:text-black">
                        <h2>{item.label}</h2>
                        <img
                          className="w-5 sm:w-10 h-5 sm:h-10 transition-all duration-300 group-hover:rotate-45"
                          src="/icons/navbar-uparrow.png"
                          alt="see"
                        />
                      </span>
                      <span className="absolute inset-0 bg-white/50 scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500"></span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ABOUT Card */}
            <div
              ref={(el) => setCardRef(el, 1)}
              className="card flex flex-col justify-between p-3 rounded-xl w-full md:w-1/2 h-auto md:h-2/3 text-start opacity-0"
            >
              <h1 className="font-lamoric text-3xl sm:text-[4em]">ABOUT</h1>
              <Link
                to={"/about"}
                onClick={() => {
                  if (isOpen) toggleMenu();
                }}
              >
                <h1 className="font-lamoric text-xl sm:text-6xl md:text-7xl text-black flex justify-between items-center group bg-stone-100/40 hover:bg-stone-200/30 transition-all duration-300 cursor-pointer px-2 rounded-2xl">
                  <span>
                    <span className="font-haneen text-emerald-400">dev</span>
                    pulse
                  </span>
                  <img
                    className="w-5 sm:w-13 h-5 sm:h-13 transition-all duration-300 group-hover:rotate-45"
                    src="/icons/navbar-uparrow.png"
                    alt="see"
                  />
                </h1>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
