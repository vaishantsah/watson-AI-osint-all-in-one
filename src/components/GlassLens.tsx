/**
 * The one bold moment of the app: a glass magnifier with a cold blue glow.
 * `active` makes the glow breathe while a search is running.
 */
export function GlassLens({ size = 148, active = false }: { size?: number; active?: boolean }) {
  return (
    <div className="relative" style={{ width: size * 1.28, height: size * 1.28 }}>
      {/* glow behind the glass */}
      <div
        className={`absolute rounded-full bg-gas-500/35 blur-3xl ${active ? 'motion-safe:animate-pulse' : ''}`}
        style={{ left: size * 0.1, top: size * 0.1, width: size * 0.9, height: size * 0.9 }}
      />
      <svg viewBox="0 0 160 160" width={size * 1.28} height={size * 1.28} className="relative" aria-hidden>
        <defs>
          <radialGradient id="gl-glass" cx="42%" cy="36%" r="70%">
            <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
            <stop offset="0.55" stopColor="#82a9f5" stopOpacity="0.08" />
            <stop offset="1" stopColor="#000" stopOpacity="0.5" />
          </radialGradient>
          <linearGradient id="gl-rim" x1="20" y1="18" x2="118" y2="116" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="0.45" stopColor="#aac3f5" />
            <stop offset="1" stopColor="#3d5a99" />
          </linearGradient>
          <linearGradient id="gl-handle" x1="104" y1="104" x2="146" y2="146" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2f3a52" />
            <stop offset="1" stopColor="#10151f" />
          </linearGradient>
        </defs>

        {/* handle */}
        <path d="M108 108l34 34" stroke="url(#gl-handle)" strokeWidth="15" strokeLinecap="round" />
        <path d="M110 110l30 30" stroke="#fff" strokeOpacity="0.12" strokeWidth="2" strokeLinecap="round" />

        {/* glass */}
        <circle cx="68" cy="68" r="50" fill="url(#gl-glass)" />
        <circle cx="68" cy="68" r="50" fill="none" stroke="url(#gl-rim)" strokeWidth="7" />
        <circle cx="68" cy="68" r="45.5" fill="none" stroke="#fff" strokeOpacity="0.1" />

        {/* the W graph seen through the lens */}
        <path d="M44 56l12 26 12-18 12 18 12-26" fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        <g fill="#82a9f5">
          <circle cx="44" cy="56" r="4.5" />
          <circle cx="56" cy="82" r="4.5" />
          <circle cx="68" cy="64" r="5.5" fill="#ffffff" />
          <circle cx="80" cy="82" r="4.5" />
          <circle cx="92" cy="56" r="4.5" />
        </g>

        {/* specular highlight */}
        <path d="M34 50a38 38 0 0 1 26-26" stroke="#fff" strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}
