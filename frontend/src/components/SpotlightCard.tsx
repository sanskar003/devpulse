import React, { useState, type ReactNode, type MouseEvent } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      className={`
        relative overflow-hidden rounded-3xl
        ${isInside ? "cursor-none" : "cursor-auto"}
        ${className}
      `}
    >
      {/* Spotlight Layer */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isInside ? 1 : 0,
          filter: `brightness(${isInside ? 1 : 0.5})`,
          background: `radial-gradient(
            150px circle at ${pos.x}px ${pos.y}px,
            rgba(16, 185, 129, 0.25),
            transparent 60%
          )`,
        }}
      />

      {/* Content */}
      <div
        className={`
          relative z-10 transition-colors duration-300
          ${isInside ? "text-emerald-400" : "text-gray-800"}
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;