import { CONTOURS, FINISHES } from '../../data/weldData.js'

const CONTOUR_SVG = {
  none: (
    <svg width="44" height="28" viewBox="0 0 44 28" fill="none" aria-hidden="true">
      <line x1="6" y1="14" x2="38" y2="14" stroke="currentColor" strokeWidth="2" strokeDasharray="4,3" strokeLinecap="round"/>
      <text x="22" y="13" textAnchor="middle" fontSize="8" fill="currentColor" fontFamily="system-ui" dy="4">—</text>
    </svg>
  ),
  flush: (
    <svg width="44" height="28" viewBox="0 0 44 28" fill="none" aria-hidden="true">
      {/* Base metal lines */}
      <line x1="4" y1="20" x2="18" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="26" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      {/* Weld face — flush */}
      <line x1="18" y1="20" x2="26" y2="20" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Fillet triangle below */}
      <polygon points="18,20 18,28 26,28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.4"/>
    </svg>
  ),
  convex: (
    <svg width="44" height="28" viewBox="0 0 44 28" fill="none" aria-hidden="true">
      <line x1="4" y1="20" x2="18" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="26" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18,20 Q22,10 26,20" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <polygon points="18,20 18,28 26,28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.4"/>
    </svg>
  ),
  concave: (
    <svg width="44" height="28" viewBox="0 0 44 28" fill="none" aria-hidden="true">
      <line x1="4" y1="20" x2="18" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="26" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18,20 Q22,26 26,20" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <polygon points="18,20 18,28 26,28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.4"/>
    </svg>
  ),
}

function OptionGrid({ options, value, onSelect, renderIcon }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${Math.min(options.length, 4)}, 1fr)`,
      gap: 8,
    }}>
      {options.map(opt => {
        const active = value === opt.id
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: '12px 6px 10px',
              minHeight: 76,
              borderRadius: 10,
              border: active ? '2px solid #f59e0b' : '1.5px solid #2e3330',
              background: active ? 'rgba(245, 158, 11, 0.10)' : '#191c1a',
              transition: 'all 0.15s',
              color: active ? '#f59e0b' : '#7a8a82',
              WebkitTapHighlightColor: 'transparent',
            }}
            aria-pressed={active}
            title={opt.desc}
          >
            {renderIcon && renderIcon(opt.id, active)}
            <div style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              color: active ? '#f59e0b' : '#dde8e2',
              textAlign: 'center',
              lineHeight: 1.2,
            }}>
              {opt.label}
            </div>
            <div style={{
              fontSize: '0.58rem',
              color: '#7a8a82',
              textAlign: 'center',
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {opt.desc}
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default function ContourFinishStep({ contour, finish, dispatch }) {
  return (
    <div style={{ padding: '16px 16px 0' }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#dde8e2', marginBottom: 4 }}>
          Contour & Finish
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#7a8a82' }}>
          Weld face profile and method of finishing
        </p>
      </div>

      {/* Contour */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          fontSize: '0.78rem',
          fontWeight: 700,
          color: '#7a8a82',
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          marginBottom: 10,
        }}>
          Contour
        </div>
        <OptionGrid
          options={CONTOURS}
          value={contour}
          onSelect={id => dispatch({ type: 'SET_CONTOUR', payload: id })}
          renderIcon={(id) => CONTOUR_SVG[id]}
        />
      </div>

      {/* Finish method */}
      <div>
        <div style={{
          fontSize: '0.78rem',
          fontWeight: 700,
          color: '#7a8a82',
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          marginBottom: 10,
        }}>
          Finish Method
        </div>
        <OptionGrid
          options={FINISHES}
          value={finish}
          onSelect={id => dispatch({ type: 'SET_FINISH', payload: id })}
          renderIcon={(id, active) => (
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: active ? 'rgba(245, 158, 11, 0.15)' : '#212524',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem',
              fontWeight: 800,
              color: active ? '#f59e0b' : '#404d47',
              fontFamily: "'SF Mono', 'Fira Code', monospace",
            }}>
              {id === 'none' ? '—' : id}
            </div>
          )}
        />
      </div>

      {/* Note */}
      <div style={{
        marginTop: 16,
        padding: '10px 14px',
        background: '#191c1a',
        border: '1px solid #2e3330',
        borderRadius: 8,
        fontSize: '0.72rem',
        color: '#7a8a82',
        lineHeight: 1.5,
      }}>
        <strong style={{ color: '#dde8e2' }}>Note:</strong> A finish method is only valid when
        a contour is also specified. Contour without finish = welder's discretion.
      </div>
    </div>
  )
}
