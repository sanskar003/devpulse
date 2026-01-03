import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function DevLoadingSkeletonCard() {
  const spinnerRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Terminal spinner frames
    const frames = ["|", "/", "-", "\\"];
    let index = 0;

    const spinnerTl = gsap.timeline({ repeat: -1 });
    spinnerTl.to({}, {
      duration: 0.1,
      repeat: -1,
      onRepeat: () => {
        if (spinnerRef.current) {
          spinnerRef.current.textContent = frames[index % frames.length];
          index++;
        }
      }
    });

    // Smooth fade-in
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );

    // Soft text pulse
    gsap.to(textRef.current, {
      opacity: 0.55,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      spinnerTl.kill();
      gsap.killTweensOf(cardRef.current);
      gsap.killTweensOf(textRef.current);
    };
  }, []);

  return (
    <div className="h-[5vh] w-full flex justify-center items-center">
      <div
        ref={cardRef}
        className="
          px-5 py-3
          bg-white dark:bg-zinc-950/70
          border border-emerald-500/30
          rounded-lg backdrop-blur-md
          shadow-lg
          flex items-center gap-3
        "
      >
        {/* Spinner */}
        <span
          ref={spinnerRef}
          className="font-mono text-emerald-400 text-lg leading-none"
        >
          |
        </span>

        {/* Text */}
        <span
          ref={textRef}
          className="font-mono text-emerald-700 dark:text-emerald-200 text-sm tracking-wide"
        >
          loading feed…
        </span>
      </div>
    </div>
  );
}