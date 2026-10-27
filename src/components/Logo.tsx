/**
 * Watson mark: a lens (the magnifying glass) whose "W" is drawn as a
 * five-node evidence graph — classic deduction meets link analysis.
 */
export function LogoMark({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="wm-lens" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.55" stopColor="#C9D8FF" />
          <stop offset="1" stopColor="#82A9F5" />
        </linearGradient>
      </defs>
      <circle cx="14.5" cy="14.5" r="10" stroke="url(#wm-lens)" strokeWidth="2" />
      <path d="M21.8 21.8l6 6" stroke="url(#wm-lens)" strokeWidth="2.8" strokeLinecap="round" />
      <path
        d="M9 11.2l2.75 7 2.75-4.9 2.75 4.9L20 11.2"
        stroke="#FFFFFF"
        strokeWidth="1.3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <g fill="#82A9F5">
        <circle cx="9" cy="11.2" r="1.35" />
        <circle cx="11.75" cy="18.2" r="1.35" />
        <circle cx="14.5" cy="13.3" r="1.6" fill="#FFFFFF" />
        <circle cx="17.25" cy="18.2" r="1.35" />
        <circle cx="20" cy="11.2" r="1.35" />
      </g>
    </svg>
  )
}

export function Logo({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      <span className="font-semibold leading-none tracking-[-0.03em] text-paper" style={{ fontSize: size * 0.72 }}>
        Watson
      </span>
    </span>
  )
}
