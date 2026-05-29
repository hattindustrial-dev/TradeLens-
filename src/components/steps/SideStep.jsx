import { SIDES } from '../../data/weldData.js'

function SideDiagram({ sideId }) {
  const showArrow = sideId === 'arrow' || sideId === 'both'
  const showOther = sideId === 'other' || sideId === 'both'

  return (
    <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true">
      {/* Reference line */}
      <line x1="8" y1="30" x2="72" y2="30" stroke="#404844" strokeWidth="2" strokeLinecap="round"/>
      {/* Arrow line */}
      <line x1="40" y1="30" x2="26" y2="50" stroke="#404844" strokeWidth="1.5" strokeLinecap="round"/>
      <polygon points="26,50 22,43 29,44" fill="#404844"/>

      {/* Arrow side weld symbol (below) */}
      {showArrow && (
        <polygon points="30,34 30,50 46,50" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round"/>
      )}
      {/* Other side weld symbol (above) */}
      {showOther && (
        <polygon points="30,26 30,10 46,10" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round"/>
      )}

      {/* All-around circle at junction */}
      <circle cx="40" cy="30" r="4" fill="none" stroke="#2e3330" strokeWidth="1.5"/>
    </svg>
  )
}

export default function SideStep({ side, dispatch }) {
  return (
    <div style={{ padding: '16px 16px 0' }}>
      <div style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#dde8e2', marginBottom: 4 }}>
          Weld Side
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#7a8a82' }}>
          Where is the weld symbol relative to the reference line?
        </p>
      </div>

      {/* Reference line legend */}
      <div style={{
        background: '#191c1a',
        border: '1.5px solid #2e3330',
        borderRadius: 10,
        padding: '10px 14px',
        marginBottom: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <svg width="110" height="44" viewBox="0 0 110 44" fill="none" aria-hidden="true">
          {/* Tail */}
          <line x1="6" y1="22" x2="34" y2="22" stroke="#7a8a82" strokeWidth="1.5" strokeDasharray="4,3"/>
          {/* Reference line */}
          <line x1="34" y1="22" x2="90" y2="22" stroke="#7a8a82" strokeWidth="1.5"/>
          {/* Arrow */}
          <line x1="55" y1="22" x2="38" y2="38" stroke="#7a8a82" strokeWidth="1.5" strokeLinecap="round"/>
          <polygon points="38,38 34,31 41,32" fill="#7a8a82"/>
          {/* All-around circle */}
          <circle cx="55" cy="22" r="5" fill="none" stroke="#7a8a82" strokeWidth="1.2"/>
          {/* Field weld flag */}
          <line x1="90" y1="22" x2="90" y2="8" stroke="#7a8a82" strokeWidth="1.5"/>
          <polygon points="90,8 104,12 90,16" fill="#7a8a82"/>
          {/* Labels */}
          <text x="6" y="13" fill="#404d47" fontSize="7" fontFamily="system-ui">TAIL</text>
          <text x="58" y="17" fill="#404d47" fontSize="7" fontFamily="system-ui">REFLINE</text>
          <text x="34" y="44" fill="#404d47" fontSize="7" fontFamily="system-ui">ARROW</text>
          <text x="88" y="7" fill="#404d47" fontSize="7" fontFamily="system-ui">FIELD⚑</text>
        </svg>
        <div style={{ fontSize: '0.7rem', color: '#7a8a82', lineHeight: 1.5 }}>
          Symbol <strong style={{ color: '#dde8e2' }}>below</strong> = arrow side<br/>
          Symbol <strong style={{ color: '#dde8e2' }}>above</strong> = other side
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {SIDES.map(s => {
          const active = side === s.id
          return (
            <button
              key={s.id}
              onClick={() => dispatch({ type: 'SET_SIDE', payload: s.id })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 16px',
                minHeight: 72,
                borderRadius: 12,
                border: active ? '2px solid #f59e0b' : '1.5px solid #2e3330',
                background: active ? 'rgba(245, 158, 11, 0.10)' : '#191c1a',
                transition: 'all 0.15s',
                textAlign: 'left',
                WebkitTapHighlightColor: 'transparent',
              }}
              aria-pressed={active}
            >
              <SideDiagram sideId={s.id} />
              <div>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: active ? '#f59e0b' : '#dde8e2',
                  marginBottom: 3,
                }}>
                  {s.label}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#7a8a82' }}>{s.desc}</div>
                <div style={{
                  fontSize: '0.72rem',
                  color: active ? '#f59e0b' : '#404d47',
                  marginTop: 2,
                  fontStyle: 'italic',
                }}>
                  {s.note}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
