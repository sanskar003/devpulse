import { useState } from "react";
import DevToCard from "../components/DevToCard";
import VerticalSlider from "../components/VerticalSlider";

const DevToPage = () => {
  const [mode, setMode] = useState<"newest" | "trending" | "top">("newest");

  return (
    <div className="relative">
      {/* RIGHT SIDE VERTICAL SLIDER BUTTONS */}
      <div className="fixed right-6 top-1/2  flex flex-col gap-4 z-50">
        <VerticalSlider mode={mode} setMode={setMode} />
      </div>

      {/* CONTENT */}
      <DevToCard mode={mode} />
    </div>
  );
};

export default DevToPage;
