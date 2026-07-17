export function SpainFlagIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 30 20" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="España">
      <rect width="30" height="20" fill="#AA151B" />
      <rect y="5" width="30" height="10" fill="#F1BF00" />
      <g transform="translate(7.6,7)">
        <rect width="4.6" height="6" rx="0.5" fill="#AD1519" stroke="#F1BF00" strokeWidth="0.35" />
        <rect x="0.55" y="0.55" width="1.75" height="2.5" fill="#F1BF00" />
        <rect x="2.3" y="0.55" width="1.75" height="2.5" fill="#AD1519" />
        <rect x="0.55" y="3.15" width="3.5" height="2.3" fill="#F1BF00" />
      </g>
    </svg>
  )
}

export function UsaFlagIcon({ className = '' }) {
  const stripeHeight = 20 / 13
  const stripes = Array.from({ length: 13 }, (_, i) => (
    <rect key={i} x="0" y={i * stripeHeight} width="30" height={stripeHeight} fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'} />
  ))

  const stars = []
  const rows = [6, 5, 6, 5, 6, 5, 6]
  rows.forEach((cols, r) => {
    const y = 1.05 + r * 1.42
    const offset = cols === 6 ? 1.35 : 2.25
    for (let c = 0; c < cols; c += 1) {
      stars.push(<circle key={`${r}-${c}`} cx={offset + c * 1.8} cy={y} r="0.32" fill="#FFFFFF" />)
    }
  })

  return (
    <svg viewBox="0 0 30 20" className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="United States">
      <rect width="30" height="20" fill="#FFFFFF" />
      {stripes}
      <rect x="0" y="0" width="12" height="10.3" fill="#3C3B6E" />
      {stars}
    </svg>
  )
}
