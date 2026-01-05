// src/pages/NotFound.tsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Glassmorphism card */}
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-12 shadow-2xl text-center max-w-lg">
        
        {/* Floating linear orb */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        
        {/* 404 headline */}
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-lg">
          404
        </h1>
        
        <h2 className="mt-4 text-3xl font-semibold tracking-wide">
          Lost in the Void
        </h2>
        
        <p className="mt-3 text-gray-300 leading-relaxed">
          The page you’re searching for doesn’t exist in this universe.  
          Maybe it’s still under construction, or perhaps it was never meant to be.
        </p>

        {/* Animated divider */}
        <div className="mt-6 h-px w-2/3 mx-auto bg-linear-to-r from-transparent via-pink-500 to-transparent animate-pulse"></div>

        {/* Call to action */}
        <Link
          to="/"
          className="mt-8 inline-block px-8 py-3 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transform transition-all duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}