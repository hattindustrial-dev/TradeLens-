import WeldSymbolSVG from '../ui/WeldSymbolSVG.jsx'
import { WELD_TYPES } from '../../data/weldData.js'

export default function WeldTypeStep({ weldType, dispatch }) {
  return (
    <div style={{ padding: '16px 16px 0' }}>
      <div style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#dde8e2', marginBottom: 4 }}>
          Weld Type
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#7a8a82' }}>
          Select the weld symbol from the drawing
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8,
      }}>
        {WELD_TYPES.map(wt => {
          const active = weldType === wt.id
          return (
            <button
              key={wt.id}
              onClick={() => dispatch({ type: 'SET_WELD_TYPE', payload: wt.id })}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: '12px 6px 10px',
                minHeight: 96,
                borderRadius: 12,
                border: active
                  ? '2px solid #f59e0b'
                  : '1.5px solid #2e3330',
                background: active
                  ? 'rgba(245, 158, 11, 0.10)'
                  : '#191c1a',
                transition: 'all 0.15s',
                color: active ? '#f59e0b' : '#7a8a82',
                WebkitTapHighlightColor: 'transparent',
              }}
              aria-pressed={active}
            >
              <WeldSymbolSVG type={wt.id} size={36} />
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: active ? '#f59e0b' : '#dde8e2',
                  lineHeight: 1.2,
                  marginBottom: 2,
                }}>
                  {wt.label}
                </div>
                <div style={{
                  fontSize: '0.58rem',
                  color: '#7a8a82',
                  lineHeight: 1.3,
                }}>
                  {wt.desc}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
