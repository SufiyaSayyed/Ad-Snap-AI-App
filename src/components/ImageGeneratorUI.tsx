import React from "react";

export default function ImageGeneratorUI() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a1240] via-[#162263] to-[#211f44] flex items-center justify-center overflow-hidden">
      {/* Galaxy BG */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Nebula and stars as gradients + optional SVG for planets */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900 via-indigo-800 to-blue-900 opacity-80"></div>
        <div className="absolute w-96 h-96 right-24 top-10 rounded-full bg-blue-700 opacity-30 blur-3xl"></div>
        {/* Star field using small white dots (for demo, minimal) */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <span
              key={i}
              className="absolute bg-white rounded-full opacity-60"
              style={{
                top: `${Math.random() * 98}%`,
                left: `${Math.random() * 98}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
              }}
            />
          ))}
        </div>
      </div>
      {/* Main Card */}
      <div className="relative z-10 flex flex-col items-center gap-4 p-10 rounded-3xl bg-white/10 border border-blue-500/30 backdrop-blur-xl shadow-lg max-w-lg w-full">
        <div className="text-cyan-300 text-lg tracking-widest mb-2 font-medium">
          PROMPT
        </div>
        {/* Prompt Preview */}
        <div className="rounded-xl overflow-hidden border-2 border-blue-400/40 shadow-inner mb-5 bg-gradient-to-b from-indigo-400/30 to-blue-800/30 backdrop-blur-lg w-full max-w-md">
          {/* Simulated sunset + mountain */}
          <div className="relative h-48 w-full flex items-end">
            {/* Pink/Orange sun */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-16 w-24 h-24 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full blur-sm opacity-80"></div>
            {/* Mountains */}
            <div className="absolute left-0 bottom-0 w-full h-3/4">
              <svg
                viewBox="0 0 400 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M0 100Q70 40 120 80Q180 100 240 60Q270 45 400 100V0H0Z"
                  fill="#1e2558"
                />
                <path
                  d="M70 100Q140 70 220 90Q280 110 360 80Q390 70 400 100V100H0Z"
                  fill="#272b67"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* Sparkle Icon (simulate with SVG) */}
        <div className="absolute right-24 top-32 pointer-events-none animate-pulse">
          <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
            <path
              d="M32 8L39 25L56 32L39 39L32 56L25 39L8 32L25 25L32 8Z"
              fill="#36d1ff"
              opacity="0.8"
            />
          </svg>
        </div>
        {/* Button */}
        <button className="px-8 py-3 mt-2 rounded-xl bg-cyan-400/80 hover:bg-cyan-500/80 transition font-semibold text-lg tracking-wide text-white shadow-lg ring-2 ring-cyan-500/40">
          GENERATE IMAGE
        </button>
      </div>
      {/* Planet - optional BG Decal */}
      <div className="absolute right-20 top-10 z-0">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/80 to-cyan-300/60 blur-md opacity-60" />
      </div>
    </div>
  );
}
