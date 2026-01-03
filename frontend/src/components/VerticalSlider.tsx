import { useRef } from "react";
import gsap from "gsap";
import VerticalSliderButton from "./VerticalSliderButton";

import newestIcon from "../../src/assets/icons/verticalSliderIcon/newestIcon.png";
import starTopIcon from "../../src/assets/icons/verticalSliderIcon/starTopIcon.png";
import flameTrendingIcon from "../../src/assets/icons/verticalSliderIcon/flameTrendingIcon.png";

type VerticalSliderProps = {
  mode: "newest" | "trending" | "top";
  setMode: (mode: "newest" | "trending" | "top") => void;
};

export default function VerticalSlider({ mode, setMode }: VerticalSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<HTMLSpanElement[]>([]);

  const onEnter = () => {
    gsap.to(sliderRef.current, {
      width: "200px",
      duration: 0.35,
      ease: "power3.out",
    });

    gsap.to(labelRefs.current, {
      opacity: 1,
      x: 0,
      duration: 0.25,
      stagger: 0.05,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    gsap.to(sliderRef.current, {
      width: "72px",
      duration: 0.35,
      ease: "power3.inOut",
    });

    gsap.to(labelRefs.current, {
      opacity: 0,
      x: -10,
      duration: 0.25,
      stagger: 0.05,
      ease: "power3.inOut",
    });
  };

  return (
    <div
      ref={sliderRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="
  /* MOBILE DEFAULT — bottom bar */
  fixed bottom-4 left-1/2 -translate-x-1/2
  flex flex-row gap-3
  bg-linear-to-b from-emerald-700/40 via-emerald-800/30 to-emerald-900/40
  backdrop-blur-xl
  shadow-xl shadow-black/20 rounded-2xl
  px-3 py-2
  w-[12em] h-fit
  overflow-hidden z-10 transition-all duration-300

  /* DESKTOP OVERRIDE — right vertical slider */
  md:top-1/2 md:right-10 md:-translate-y-1/2 md:left-auto md:translate-x-0
  md:flex-col md:w-[72px] md:py-4
"
    >
      <VerticalSliderButton
        icon={<img src={newestIcon}  />}
        label="Newest"
        active={mode === "newest"}
        onClick={() => setMode("newest")}
        ref={(el) => {
          labelRefs.current[0] = el!;
        }}
      />

      <VerticalSliderButton
        icon={<img src={flameTrendingIcon} />}
        label="Trending"
        active={mode === "trending"}
        onClick={() => setMode("trending")}
        ref={(el) => {
          labelRefs.current[1] = el!;
        }}
      />

      <VerticalSliderButton
        icon={<img src={starTopIcon} />}
        label="Top"
        active={mode === "top"}
        onClick={() => setMode("top")}
        ref={(el) => {
          labelRefs.current[2] = el!;
        }}
      />
    </div>
  );
}
