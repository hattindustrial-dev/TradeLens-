import { WELD_TYPES } from '../../data/weldData.js'

function DimField({ label, hint, field, value, dispatch, unit }) {
  return (
    <div>
      <label style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 6,
      }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#dde8e2' }}>{label}</span>
        <span style={{ fontSize: '0.72rem', color: '#7a8a82' }}>{hint}</span>
      </label>
      <div style={{ position: 'relative' }}>
        <input
          type="number"
          min="0"
          step="0.1"
          value={value}
          onChange={e => dispatch({ type: 'SET_DIM', field, payload: e.target.value })}
          placeholder="—"
          style={{ paddingRight: unit ? 48 : 16 }}
        />
        {unit && (
          <span style={{
            position: 'absolute',
            right: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: '#7a8a82',
            pointerEvents: 'none',
          }}>
            {unit}
          </span>
        )}
      </div>
    </div>
  )
}

export default function DimensionsStep({ state, dispatch }) {
  const { weldType, size, length, pitch, angle, rootOpening, unit } = state
  const wt = WELD_TYPES.find(w => w.id === weldType)
  const dims = wt?.dims ?? {}

  const unitLabel = unit === 'mm' ? 'mm' : 'in'

  return (
    <div style={{ padding: '16px 16px 0' }}>
      <div style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#dde8e2', marginBottom: 4 }}>
          Dimensions
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#7a8a82' }}>
          Enter values from the weld symbol. Leave blank if not shown.
        </p>
      </div>

      {/* Unit toggle */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        padding: '10px 14px',
        background: '#191c1a',
        border: '1.5px solid #2e3330',
        borderRadius: 10,
      }}>
        <span style={{ fontSize: '0.82rem', color: '#7a8a82' }}>Units</span>
        <div style={{
          display: 'flex',
          background: '#212524',
          border: '1px solid #2e3330',
          borderRadius: 7,
          padding: 2,
          gap: 2,
        }}>
          {['mm', 'in'].map(u => (
            <button
              key={u}
              onClick={() => dispatch({ type: 'SET_UNIT', payload: u })}
              style={{
                padding: '6px 16px',
                borderRadius: 5,
                fontSize: '0.8rem',
                fontWeight: 700,
                background: unit === u ? '#f59e0b' : 'transparent',
                color: unit === u ? '#0a0c0b' : '#7a8a82',
                transition: 'all 0.15s',
              }}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {(dims.size !== false) && (
          <DimField
            label="Size"
            hint={weldType === 'fillet'
              ? 'Leg size (left of symbol)'
              : weldType === 'plug'
              ? 'Hole diameter'
              : weldType === 'spot'
              ? 'Weld nugget Ø'
              : weldType === 'surfacing'
              ? 'Overlay thickness'
              : 'Weld size'}
            field="size"
            value={size}
            dispatch={dispatch}
            unit={unitLabel}
          />
        )}

        {dims.length && (
          <DimField
            label="Length"
            hint="Weld length (right of dash)"
            field="length"
            value={length}
            dispatch={dispatch}
            unit={unitLabel}
          />
        )}

        {dims.pitch && (
          <DimField
            label="Pitch"
            hint={unit === 'mm' ? 'Centre-to-centre' : 'Center-to-center'}
            field="pitch"
            value={pitch}
            dispatch={dispatch}
            unit={unitLabel}
          />
        )}

        {dims.angle && (
          <DimField
            label={weldType === 'plug' ? 'Hole Taper Angle' : 'Groove Angle'}
            hint="Included angle"
            field="angle"
            value={angle}
            dispatch={dispatch}
            unit="°"
          />
        )}

        {dims.root && (
          <DimField
            label="Root Opening"
            hint="Gap at root face"
            field="rootOpening"
            value={rootOpening}
            dispatch={dispatch}
            unit={unitLabel}
          />
        )}
      </div>

      {/* Intermittent weld note */}
      {dims.pitch && (
        <div style={{
          marginTop: 16,
          padding: '10px 14px',
          background: 'rgba(245, 158, 11, 0.07)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          borderRadius: 8,
          fontSize: '0.75rem',
          color: '#b45309',
          lineHeight: 1.5,
        }}>
          <strong>Intermittent weld:</strong> enter both Length and Pitch to indicate stitch welding.
          Leave blank for a continuous weld.
        </div>
      )}
    </div>
  )
}
