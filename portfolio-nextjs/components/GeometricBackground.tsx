export default function GeometricBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Grid lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating geometric shapes */}
      <div className="absolute right-[15%] top-[10%] h-20 w-20 rotate-12 border border-white/6 rounded-sm" />
      <div className="absolute right-[25%] top-[60%] h-14 w-14 -rotate-6 border border-white/8 rounded-sm" />
      <div className="absolute right-[8%] top-[45%] h-10 w-10 rotate-45 bg-white/3" />
      <div className="absolute left-[5%] top-[70%] h-16 w-16 rotate-12 border border-white/5 rounded-sm" />
      <div className="absolute right-[35%] top-[20%] h-8 w-8 rotate-30 bg-white/2" />
      <div className="absolute right-[10%] top-[75%] h-12 w-12 -rotate-12 border border-white/6 rounded-sm" />
    </div>
  );
}
