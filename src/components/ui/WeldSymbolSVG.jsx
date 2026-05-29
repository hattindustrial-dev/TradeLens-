/* Weld symbol icons — 40×40 viewBox, stroke-based */

const SYMBOLS = {
  fillet: (
    <polygon
      points="7,9 7,33 33,33"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
  ),
  vgroove: (
    <polyline
      points="7,9 20,31 33,9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
  ),
  bevel: (
    <>
      <line x1="15" y1="9" x2="15" y2="31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="15" y1="31" x2="33" y2="9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </>
  ),
  square: (
    <>
      <line x1="13" y1="9" x2="13" y2="31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="27" y1="9" x2="27" y2="31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </>
  ),
  ugroove: (
    <path
      d="M9,9 L9,24 Q20,36 31,24 L31,9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  jgroove: (
    <path
      d="M20,9 L20,24 Q20,36 31,24 L31,9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  flarev: (
    <>
      <path d="M8,9 Q8,30 20,32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32,9 Q32,30 20,32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </>
  ),
  flarebevel: (
    <>
      <line x1="14" y1="9" x2="14" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32,9 Q32,30 14,32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </>
  ),
  plug: (
    <circle cx="20" cy="20" r="11" fill="none" stroke="currentColor" strokeWidth="2.5"/>
  ),
  slot: (
    <rect x="7" y="13" width="26" height="14" rx="7" fill="none" stroke="currentColor" strokeWidth="2.5"/>
  ),
  spot: (
    <circle cx="20" cy="20" r="9" fill="currentColor"/>
  ),
  seam: (
    <>
      <line x1="6" y1="15" x2="34" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="6" y1="25" x2="34" y2="25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </>
  ),
  surfacing: (
    <path
      d="M5,28 Q10,18 15,28 Q20,38 25,28 Q30,18 35,28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
}

export default function WeldSymbolSVG({ type, size = 40, color = 'currentColor' }) {
  const symbol = SYMBOLS[type]
  if (!symbol) return null

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
      aria-hidden="true"
    >
      {symbol}
    </svg>
  )
}
