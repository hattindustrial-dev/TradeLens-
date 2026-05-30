import { PUMP_TYPES } from '../../data/pumpData.js'

const VARIANT_ICONS = {
  'mechanical-seal': (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {/* Two rings touching — seal face schematic */}
      <rect x="8" y="10" width="5" height="8" rx="1" stroke="currentColor" strokeWidth="2"/>
      <rect x="15" y="10" width="5" height="8" rx="1" stroke="currentColor" strokeWidth="2" strokeDasharray="2,1"/>
      {/* Spring */}
      <path d="M20,14 Q22,12 24,14 Q26,16 24,14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Shaft line */}
      <line x1="2" y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth="1" strokeDasharray="3,2" opacity="0.4"/>
    </svg>
  ),
  'packed-box': (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {/* Packing stack */}
      <rect x="8" y="8" width="12" height="4" rx="1" stroke="currentColor" strokeWidth="1.8"/>
      <rect x="8" y="13" width="12" height="4" rx="1" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.2"/>
      <rect x="8" y="18" width="12" height="4" rx="1" stroke="currentColor" strokeWidth="1.8"/>
      {/* Shaft */}
      <line x1="2" y1="14" x2="8" y2="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2"/>
      <line x1="20" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2"/>
    </svg>
  ),
  'single-stage': (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="2"/>
      <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2"/>
      <line x1="2" y1="14" x2="6" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="22" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  'two-stage': (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="9" cy="14" r="6" stroke="currentColor" strokeWidth="2"/>
      <circle cx="9" cy="14" r="2" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1,1"/>
      <circle cx="21" cy="14" r="6" stroke="currentColor" strokeWidth="2"/>
      <circle cx="21" cy="14" r="2" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1,1"/>
      <line x1="2" y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" opacity="0.5"/>
    </svg>
  ),
}

export default function VariantStep({ pumpType, variant, dispatch }) {
  const pumpDef = PUMP_TYPES.find(p => p.id === pumpType)
  if (!pumpDef || !pumpDef.variants.length) return null

  return (
    <div style={{ padding: '16px 16px 0' }}>
      <div style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#dde8e2', marginBottom: 4 }}>
          Sealing Configuration
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#7a8a82' }}>
          How is the shaft sealed where it exits the casing?
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {pumpDef.variants.map(v => {
          const active = variant === v.id
          return (
            <button
              key={v.id}
              onClick={() => dispatch({ type: 'SET_VARIANT', payload: v.id })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '16px',
                minHeight: 76,
                borderRadius: 12,
                border: active ? '2px solid #22c55e' : '1.5px solid #2e3330',
                background: active ? 'rgba(34, 197, 94, 0.08)' : '#191c1a',
                transition: 'all 0.15s',
                textAlign: 'left',
                WebkitTapHighlightColor: 'transparent',
              }}
              aria-pressed={active}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 10,
                background: active ? 'rgba(34, 197, 94, 0.12)' : '#212524',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: active ? '#22c55e' : '#7a8a82',
                flexShrink: 0,
              }}>
                {VARIANT_ICONS[v.id]}
              </div>

              <div>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: active ? '#22c55e' : '#dde8e2',
                  marginBottom: 4,
                }}>
                  {v.label}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#7a8a82' }}>
                  {v.desc}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Help card */}
      <div style={{
        marginTop: 16,
        padding: '12px 14px',
        background: '#191c1a',
        border: '1px solid #2e3330',
        borderRadius: 10,
        fontSize: '0.75rem',
        color: '#7a8a82',
        lineHeight: 1.6,
      }}>
        <strong style={{ color: '#dde8e2' }}>Not sure which type?</strong>
        {' '}Look at the shaft where it exits the back of the casing. A{' '}
        <strong style={{ color: '#dde8e2' }}>mechanical seal</strong> has a bolted gland plate
        flush to the casing with no adjustment. A{' '}
        <strong style={{ color: '#dde8e2' }}>packed box</strong> has a gland follower with
        two nuts that can be tightened — and the shaft leaks a steady drip by design.
      </div>
    </div>
  )
}
