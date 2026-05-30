import PumpTypeSVG from '../ui/PumpTypeSVG.jsx'
import { PUMP_TYPES } from '../../data/pumpData.js'

export default function PumpTypeStep({ pumpType, dispatch }) {
  return (
    <div style={{ padding: '16px 16px 0' }}>
      <div style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#dde8e2', marginBottom: 4 }}>
          Pump Type
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#7a8a82' }}>
          Select the type of pump you're working on
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {PUMP_TYPES.map(pt => {
          const active = pumpType === pt.id
          const isComingSoon = pt.id === 'gear' || pt.id === 'aodd'

          return (
            <button
              key={pt.id}
              onClick={() => !isComingSoon && dispatch({ type: 'SET_PUMP_TYPE', payload: pt.id })}
              disabled={isComingSoon}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 16px',
                minHeight: 72,
                borderRadius: 12,
                border: active
                  ? '2px solid #22c55e'
                  : isComingSoon
                  ? '1.5px solid #1e2220'
                  : '1.5px solid #2e3330',
                background: active
                  ? 'rgba(34, 197, 94, 0.08)'
                  : isComingSoon
                  ? '#141716'
                  : '#191c1a',
                transition: 'all 0.15s',
                textAlign: 'left',
                color: isComingSoon ? '#404d47' : 'inherit',
                WebkitTapHighlightColor: 'transparent',
                opacity: isComingSoon ? 0.5 : 1,
              }}
              aria-pressed={active}
            >
              <div style={{
                width: 46,
                height: 46,
                borderRadius: 10,
                background: active
                  ? 'rgba(34, 197, 94, 0.12)'
                  : '#212524',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: active ? '#22c55e' : '#7a8a82',
                flexShrink: 0,
                transition: 'all 0.15s',
              }}>
                <PumpTypeSVG type={pt.id} size={30} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <span style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: active ? '#22c55e' : isComingSoon ? '#404d47' : '#dde8e2',
                  }}>
                    {pt.label}
                  </span>
                  {isComingSoon && (
                    <span style={{
                      fontSize: '0.58rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: '#404d47',
                      background: '#1e2220',
                      padding: '2px 6px',
                      borderRadius: 3,
                    }}>
                      Soon
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#7a8a82', lineHeight: 1.4 }}>
                  {pt.desc}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
