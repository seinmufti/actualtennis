export default function Hero() {
  return (
    <header className="hero">
      <svg className="ball" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <clipPath id="ball-clip">
            <circle cx="32" cy="32" r="30" />
          </clipPath>
          <radialGradient id="ball-shine" cx="32%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#f7ff8a" />
            <stop offset="70%" stopColor="#c6de1a" />
            <stop offset="100%" stopColor="#8fa80c" />
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#ball-shine)" />
        <g
          clipPath="url(#ball-clip)"
          fill="none"
          stroke="#fffef2"
          strokeWidth="4"
          strokeLinecap="round"
        >
          <path d="M6 10c22 12 22 32 0 44" />
          <path d="M58 10c-22 12-22 32 0 44" />
        </g>
      </svg>
      <h1>Actual Tennis</h1>
    </header>
  )
}
