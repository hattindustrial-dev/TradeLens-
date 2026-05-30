const ICONS = {
  'ansi-centrifugal': (
    <>
      {/* Volute casing */}
      <path d="M6,34 L6,18 Q6,8 14,8 Q26,8 30,18 Q34,24 28,30 Q22,36 22,36 L6,36 Z"
        fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
      {/* Discharge nozzle up */}
      <rect x="22" y="2" width="10" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2"/>
      {/* Bearing housing */}
      <rect x="30" y="15" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
      {/* Shaft line */}
      <line x1="30" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2"/>
      {/* Impeller */}
      <circle cx="18" cy="22" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2"/>
      <circle cx="18" cy="22" r="2" fill="currentColor"/>
    </>
  ),
  'split-case': (
    <>
      {/* Upper casing half */}
      <path d="M4,20 L4,10 Q4,6 8,6 L32,6 Q36,6 36,10 L36,20"
        fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      {/* Lower casing half */}
      <path d="M4,20 L4,30 Q4,34 8,34 L32,34 Q36,34 36,30 L36,20"
        fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      {/* Split line */}
      <line x1="4" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,2"/>
      {/* Shaft through bearings */}
      <line x1="4" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Bearing ends */}
      <rect x="0" y="16" width="6" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="34" y="16" width="6" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="2"/>
      {/* Double-suction impeller suggestion */}
      <ellipse cx="20" cy="20" rx="8" ry="5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2"/>
    </>
  ),
  'multistage': (
    <>
      {/* Stage casings */}
      {[4, 14, 24].map(x => (
        <rect key={x} x={x} y="10" width="10" height="20" rx="2"
          fill="none" stroke="currentColor" strokeWidth="2"/>
      ))}
      {/* Stage connections */}
      <line x1="14" y1="16" x2="14" y2="24" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="24" y1="16" x2="24" y2="24" stroke="currentColor" strokeWidth="1.5"/>
      {/* Shaft */}
      <line x1="2" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="2" strokeDasharray="3,2"/>
      {/* Bearing housing */}
      <rect x="34" y="16" width="6" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="2"/>
    </>
  ),
  'gear': (
    <>
      {/* Left gear */}
      <circle cx="14" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="14" cy="20" r="2.5" fill="currentColor"/>
      {/* Gear teeth suggestion */}
      {[0,45,90,135,180,225,270,315].map((a, i) => {
        const r = Math.PI * a / 180
        const x1 = 14 + 8 * Math.cos(r)
        const y1 = 20 + 8 * Math.sin(r)
        const x2 = 14 + 11 * Math.cos(r)
        const y2 = 20 + 11 * Math.sin(r)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      })}
      {/* Right gear */}
      <circle cx="28" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="28" cy="20" r="2.5" fill="currentColor"/>
      {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map((a, i) => {
        const r = Math.PI * a / 180
        const x1 = 28 + 8 * Math.cos(r)
        const y1 = 20 + 8 * Math.sin(r)
        const x2 = 28 + 11 * Math.cos(r)
        const y2 = 20 + 11 * Math.sin(r)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      })}
      {/* Housing */}
      <rect x="4" y="10" width="32" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,2"/>
    </>
  ),
  'aodd': (
    <>
      {/* Left chamber */}
      <ellipse cx="10" cy="20" rx="8" ry="12" fill="none" stroke="currentColor" strokeWidth="2"/>
      {/* Right chamber */}
      <ellipse cx="30" cy="20" rx="8" ry="12" fill="none" stroke="currentColor" strokeWidth="2"/>
      {/* Centre air manifold */}
      <rect x="16" y="14" width="8" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
      {/* Air inlet */}
      <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <polygon points="20,8 17,13 23,13" fill="currentColor"/>
      {/* Diaphragm lines */}
      <line x1="16" y1="20" x2="10" y2="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2"/>
      <line x1="24" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2"/>
    </>
  ),
}

export default function PumpTypeSVG({ type, size = 40 }) {
  const icon = ICONS[type]
  if (!icon) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: 'currentColor' }}
      aria-hidden="true"
    >
      {icon}
    </svg>
  )
}
