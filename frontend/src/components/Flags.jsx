export function EnglishFlag() {
  const stripeHeight = 24 / 13
  return (
    <svg className="lang-flag" viewBox="0 0 32 24" aria-hidden="true">
      {Array.from({ length: 13 }, (_, index) => (
        <rect
          key={index}
          y={index * stripeHeight}
          width="32"
          height={stripeHeight + 0.2}
          fill={index % 2 === 0 ? '#B22234' : '#fff'}
        />
      ))}
      <rect width="12.8" height="12.9" fill="#3C3B6E" />
      {[
        [2.2, 2.1],
        [4.8, 2.1],
        [7.4, 2.1],
        [10, 2.1],
        [3.5, 4.2],
        [6.1, 4.2],
        [8.7, 4.2],
        [2.2, 6.3],
        [4.8, 6.3],
        [7.4, 6.3],
        [10, 6.3],
        [3.5, 8.4],
        [6.1, 8.4],
        [8.7, 8.4],
        [4.8, 10.5],
        [7.4, 10.5],
      ].map(([cx, cy], index) => (
        <circle key={index} cx={cx} cy={cy} r="0.55" fill="#fff" />
      ))}
    </svg>
  )
}

function KurdistanRay(index) {
  const angle = (index * 360) / 21 - 90
  const rad = (angle * Math.PI) / 180
  const inner = 3.2
  const outer = 5.8
  const spread = (360 / 21 / 2) * (Math.PI / 180)
  const x1 = 16 + Math.cos(rad) * inner
  const y1 = 12 + Math.sin(rad) * inner
  const x2 = 16 + Math.cos(rad - spread) * outer
  const y2 = 12 + Math.sin(rad - spread) * outer
  const x3 = 16 + Math.cos(rad + spread) * outer
  const y3 = 12 + Math.sin(rad + spread) * outer
  return `M${x1} ${y1} L${x2} ${y2} L${x3} ${y3} Z`
}

export function KurdishFlag() {
  return (
    <svg className="lang-flag" viewBox="0 0 32 24" aria-hidden="true">
      <rect width="32" height="8" y="0" fill="#EE2A35" />
      <rect width="32" height="8" y="8" fill="#fff" />
      <rect width="32" height="8" y="16" fill="#00843D" />
      <g fill="#FCD116">
        {Array.from({ length: 21 }, (_, index) => (
          <path key={index} d={KurdistanRay(index)} />
        ))}
      </g>
      <circle cx="16" cy="12" r="3.1" fill="#FCD116" />
      <circle cx="16" cy="12" r="2.35" fill="#EE2A35" />
    </svg>
  )
}

export function ArabicFlag() {
  return (
    <svg className="lang-flag" viewBox="0 0 32 24" aria-hidden="true">
      <rect width="32" height="8" y="0" fill="#E4002B" />
      <rect width="32" height="8" y="8" fill="#fff" />
      <rect width="32" height="8" y="16" fill="#000" />
      <text
        x="16"
        y="12.4"
        textAnchor="middle"
        fill="#007A3D"
        fontSize="3.6"
        fontFamily="Tahoma, Arial, sans-serif"
        fontWeight="700"
      >
        الله أكبر
      </text>
    </svg>
  )
}
