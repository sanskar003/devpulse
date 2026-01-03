import gsap from "gsap";
import { useNavigate } from "react-router-dom";

export const usePageTransition = () => {
  const navigate = useNavigate();
  const overlay = document.querySelector("[data-transition-overlay]");

  const transitionTo = (path: string) => {
    if (!overlay) return;

    const tl = gsap.timeline({
      onComplete: () => {
        navigate(path);

        // Entry animation for new page
        gsap.fromTo(
          "[data-page]",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
        );

        // Hide overlay again
        gsap.to(overlay, {
          scaleY: 0,
          duration: 0.5,
          ease: "power3.inOut",
        });
      },
    });

    // Exit animation
    tl.to(overlay, {
      scaleY: 1,
      duration: 0.5,
      ease: "power3.inOut",
    });
  };

  return transitionTo;
};