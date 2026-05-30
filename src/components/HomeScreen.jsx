function WeldIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="6" y1="24" x2="42" y2="24" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="24" y1="24" x2="16" y2="38" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
      <polygon points="16,38 12,31 19,33" fill="#f59e0b"/>
      <polygon points="20,27 20,38 32,38" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round"/>
      <circle cx="24" cy="24" r="4" fill="none" stroke="#b45309" strokeWidth="1.5"/>
    </svg>
  )
}

function PumpIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Volute casing outline */}
      <path d="M8,38 L8,18 Q8,10 16,10 Q28,10 32,18 Q36,24 30,30 Q24,36 24,38 Z"
        fill="none" stroke="#22c55e" strokeWidth="2" strokeLinejoin="round"/>
      {/* Discharge nozzle */}
      <rect x="28" y="4" width="12" height="8" rx="2" fill="none" stroke="#22c55e" strokeWidth="2"/>
      <line x1="30" y1="10" x2="30" y2="12" stroke="#22c55e" strokeWidth="1.5"/>
      {/* Shaft centerline */}
      <line x1="34" y1="24" x2="44" y2="24" stroke="#7a8a82" strokeWidth="1.5" strokeDasharray="3,2"/>
      {/* Bearing housing */}
      <rect x="34" y="18" width="12" height="12" rx="3" fill="none" stroke="#22c55e" strokeWidth="2"/>
      {/* Impeller suggestion */}
      <circle cx="20" cy="24" r="6" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="2,2"/>
      <circle cx="20" cy="24" r="2" fill="#22c55e"/>
      {/* Reference callout lines */}
      <line x1="14" y1="14" x2="6" y2="8" stroke="#404844" strokeWidth="1"/>
      <line x1="38" y1="18" x2="44" y2="12" stroke="#404844" strokeWidth="1"/>
    </svg>
  )
}

const cardStyle = (color) => ({
  display: 'flex',
  flexDirection: 'column',
  background: '#191c1a',
  border: `1.5px solid ${color}30`,
  borderRadius: 16,
  padding: '20px',
  gap: 12,
  WebkitTapHighlightColor: 'transparent',
  transition: 'all 0.15s',
  textAlign: 'left',
  cursor: 'pointer',
  width: '100%',
})

export default function HomeScreen({ onSelect }) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '16px 16px',
      paddingBottom: 'max(16px, env(safe-area-inset-bottom, 16px))',
      gap: 14,
      overflowY: 'auto',
    }}>
      {/* Tagline */}
      <div style={{ paddingTop: 4, paddingBottom: 4 }}>
        <p style={{ fontSize: '0.8rem', color: '#7a8a82', lineHeight: 1.5 }}>
          Field reference for welders and maintenance tradespeople.
          Select a tool to get started.
        </p>
      </div>

      {/* Weld Decoder card */}
      <button style={cardStyle('#f59e0b')} onClick={() => onSelect('weld')}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            background: 'rgba(245, 158, 11, 0.10)',
            border: '1.5px solid rgba(245, 158, 11, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <WeldIcon />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 4,
            }}>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: '#dde8e2' }}>
                Weld Symbol Decoder
              </span>
              <span style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#f59e0b',
                background: 'rgba(245, 158, 11, 0.12)',
                padding: '3px 7px',
                borderRadius: 4,
              }}>
                Phase 1
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#7a8a82', lineHeight: 1.5, margin: 0 }}>
              Step through a weld symbol callout and get a plain-English explanation
              of the weld type, side, dimensions, and finishing requirements.
            </p>
          </div>
        </div>
        <div style={{
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          marginTop: 2,
        }}>
          {['CWB / CSA', 'AWS D1.1', 'Fillet', 'Groove', 'Plug', 'Supplementary'].map(tag => (
            <span key={tag} style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              color: '#b45309',
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.15)',
              padding: '3px 8px',
              borderRadius: 4,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </button>

      {/* Mechanical Drawing card */}
      <button style={cardStyle('#22c55e')} onClick={() => onSelect('mech')}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            background: 'rgba(34, 197, 94, 0.08)',
            border: '1.5px solid rgba(34, 197, 94, 0.20)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <PumpIcon />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 4,
            }}>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: '#dde8e2' }}>
                Mechanical Drawing
              </span>
              <span style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#22c55e',
                background: 'rgba(34, 197, 94, 0.10)',
                padding: '3px 7px',
                borderRadius: 4,
              }}>
                Phase 2
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#7a8a82', lineHeight: 1.5, margin: 0 }}>
              Look up pump parts by reference number, see what they look like in your hand,
              and follow step-by-step rebuild sequences.
            </p>
          </div>
        </div>
        <div style={{
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          marginTop: 2,
        }}>
          {['Part Lookup', 'Rebuild Guide', 'ANSI Centrifugal', 'Seal Replacement', 'Repacking'].map(tag => (
            <span key={tag} style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              color: '#15803d',
              background: 'rgba(34, 197, 94, 0.06)',
              border: '1px solid rgba(34, 197, 94, 0.15)',
              padding: '3px 8px',
              borderRadius: 4,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </button>

      {/* Bottom note */}
      <p style={{
        fontSize: '0.68rem',
        color: '#3d4d47',
        textAlign: 'center',
        lineHeight: 1.5,
        marginTop: 4,
      }}>
        More equipment types and camera decode coming in future phases
      </p>
    </div>
  )
}
