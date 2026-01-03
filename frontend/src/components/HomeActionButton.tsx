import { useRef } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const HomeActionButton = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate()

  const onEnter = () => {
    const glow = glowRef.current;
    const btn = btnRef.current;
    if (!glow || !btn) return;

    gsap.to(glow, {
      opacity: 1,
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.to(btn, {
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    const glow = glowRef.current;
    const btn = btnRef.current;
    if (!glow || !btn) return;

    gsap.to(glow, {
      opacity: 0,
      duration: 0.35,
      ease: "power2.inOut",
    });
    gsap.to(btn, {
      duration: 0.25,
      ease: "power2.inOut",
    });
  };

  const handleClick = () => {
    navigate("/devto")
  }

  return (
    <div className="relative inline-block">
      {/* Radial glow aura */}
      <div
        ref={glowRef}
        className="absolute -inset-3 rounded-2xl
                   bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.45),rgba(16,185,129,0.45),transparent_50%)]
                   blur-xl opacity-0 z-0 pointer-events-none"
      />

      {/* Button */}
      <button
        ref={btnRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={handleClick}
        className="relative z-10 cursor-pointer px-3 py-2 rounded-2xl
                   font-haneen text-foreground text-lg sm:text-xl md:text-2xl lg:text-3xl
                   border border-emerald-400/40 hover:bg-transparent hover:border-transparent bg-background/80 backdrop-blur-md
                   transition-all duration-300"
      >
        dev NEWS
      </button>
    </div>
  );
};

export default HomeActionButton;
