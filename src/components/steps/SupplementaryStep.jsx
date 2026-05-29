import { SUPPLEMENTARY } from '../../data/weldData.js'

const ICONS = {
  allaround: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="2.5"/>
    </svg>
  ),
  field: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <line x1="14" y1="24" x2="14" y2="4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <polygon points="14,4 26,9 14,14" fill="currentColor"/>
    </svg>
  ),
  backing: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="2.2"/>
      <text x="14" y="19" textAnchor="middle" fontSize="7" fontWeight="700"
        fill="currentColor" fontFamily="system-ui">B</text>
    </svg>
  ),
  meltthrough: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="8" fill="currentColor"/>
    </svg>
  ),
  spacer: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <line x1="4" y1="14" x2="24" y2="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="4" y1="10" x2="4" y2="18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="24" y1="10" x2="24" y2="18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  ),
}

export default function SupplementaryStep({ supplementary, dispatch }) {
  return (
    <div style={{ padding: '16px 16px 0' }}>
      <div style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#dde8e2', marginBottom: 4 }}>
          Supplementary Symbols
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#7a8a82' }}>
          Tap all that appear on the drawing. All are optional.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {SUPPLEMENTARY.map(sym => {
          const active = supplementary.includes(sym.id)
          return (
            <button
              key={sym.id}
              onClick={() => dispatch({ type: 'TOGGLE_SUPP', payload: sym.id })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 16px',
                minHeight: 68,
                borderRadius: 12,
                border: active ? '2px solid #f59e0b' : '1.5px solid #2e3330',
                background: active ? 'rgba(245, 158, 11, 0.10)' : '#191c1a',
                transition: 'all 0.15s',
                textAlign: 'left',
                WebkitTapHighlightColor: 'transparent',
              }}
              aria-pressed={active}
            >
              {/* Icon */}
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: active ? 'rgba(245, 158, 11, 0.15)' : '#212524',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: active ? '#f59e0b' : '#7a8a82',
                flexShrink: 0,
                transition: 'all 0.15s',
              }}>
                {ICONS[sym.id]}
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: active ? '#f59e0b' : '#dde8e2',
                  marginBottom: 3,
                }}>
                  {sym.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#7a8a82', lineHeight: 1.4 }}>
                  {sym.desc}
                </div>
              </div>

              {/* Check indicator */}
              <div style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                border: active ? 'none' : '2px solid #2e3330',
                background: active ? '#f59e0b' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.15s',
              }}>
                {active && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <polyline points="2,6 5,9 10,3" stroke="#0a0c0b" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {supplementary.length === 0 && (
        <p style={{
          marginTop: 14,
          fontSize: '0.78rem',
          color: '#404d47',
          textAlign: 'center',
          fontStyle: 'italic',
        }}>
          No supplementary symbols — tap any that apply
        </p>
      )}
    </div>
  )
}
