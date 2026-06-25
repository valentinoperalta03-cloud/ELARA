export default function ElaraLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ELARA"
    >
      <defs>
        <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      {/* Diamond / rhombus outline */}
      <path
        d="M34,5 L52,19 L34,33 L16,19 Z"
        stroke="url(#diamondGrad)"
        strokeWidth="1.4"
        fill="none"
        strokeLinejoin="round"
      />
      {/* ELARA text */}
      <text
        x="0"
        y="25"
        fontFamily="Syne, system-ui, sans-serif"
        fontWeight="700"
        fontSize="20"
        letterSpacing="-0.4"
        fill="white"
      >
        ELARA
      </text>
    </svg>
  )
}
