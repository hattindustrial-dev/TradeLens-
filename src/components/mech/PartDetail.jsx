import { SUBSYSTEM_COLORS } from '../../data/pumpData.js'

function Section({ label, color, children }) {
  return (
    <div style={{
      background: '#191c1a',
      border: '1.5px solid #2e3330',
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '8px 14px',
        borderBottom: '1px solid #2e3330',
        fontSize: '0.68rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: color || '#7a8a82',
        background: color ? color + '0a' : 'transparent',
      }}>
        {label}
      </div>
      <div style={{ padding: '12px 14px', fontSize: '0.82rem', color: '#dde8e2', lineHeight: 1.65 }}>
        {children}
      </div>
    </div>
  )
}

function WarningBox({ warnings }) {
  if (!warnings || warnings.length === 0) return null
  return (
    <div style={{
      background: 'rgba(239, 68, 68, 0.06)',
      border: '1.5px solid rgba(239, 68, 68, 0.25)',
      borderRadius: 12,
      padding: '12px 14px',
    }}>
      <div style={{
        fontSize: '0.68rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: '#ef4444',
        marginBottom: 8,
      }}>
        ⚠ Watch Out
      </div>
      <ul style={{ margin: 0, paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {warnings.map((w, i) => (
          <li key={i} style={{ fontSize: '0.8rem', color: '#fca5a5', lineHeight: 1.5 }}>
            {w}
          </li>
        ))}
      </ul>
    </div>
  )
}

function BulletList({ items }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 5 }}>
      {items.map((item, i) => (
        <li key={i} style={{ color: '#b0bdb7', lineHeight: 1.5 }}>{item}</li>
      ))}
    </ul>
  )
}

export default function PartDetail({ part, onBack }) {
  if (!part) return null

  const subColor = SUBSYSTEM_COLORS[part.subsystem] || '#7a8a82'

  return (
    <div style={{ padding: '12px 16px 0' }}>
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          color: '#7a8a82',
          fontSize: '0.8rem',
          fontWeight: 600,
          padding: '6px 0',
          marginBottom: 12,
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <polyline points="9,2 4,7 9,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to search
      </button>

      {/* Part header */}
      <div style={{
        background: '#191c1a',
        border: `1.5px solid ${subColor}30`,
        borderRadius: 14,
        padding: '14px 16px',
        marginBottom: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#dde8e2', margin: 0, lineHeight: 1.3 }}>
            {part.name}
          </h2>
          <span style={{
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: subColor,
            background: subColor + '18',
            padding: '3px 8px',
            borderRadius: 4,
            flexShrink: 0,
          }}>
            {part.subsystem}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.72rem', color: '#7a8a82' }}>Ref numbers:</span>
          {part.refNumbers.map(r => (
            <span key={r} style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#f59e0b',
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              background: 'rgba(245,158,11,0.10)',
              padding: '2px 7px',
              borderRadius: 4,
            }}>
              {r}
            </span>
          ))}
        </div>

        {part.aliases && part.aliases.length > 0 && (
          <div style={{ marginTop: 8, fontSize: '0.7rem', color: '#404d47', lineHeight: 1.5 }}>
            Also called: {part.aliases.slice(0, 4).join(' · ')}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 16 }}>

        {/* In the drawing */}
        <Section label="In the Drawing — Cross-Section" color="#818cf8">
          <p style={{ margin: 0 }}>{part.crossSection.desc}</p>
          {part.crossSection.keyFeature && (
            <p style={{ margin: '8px 0 0', fontSize: '0.76rem', color: '#7a8a82', fontStyle: 'italic' }}>
              Key feature: {part.crossSection.keyFeature}
            </p>
          )}
        </Section>

        {/* In your hand */}
        <Section label="In Your Hand — Physical Part" color="#22c55e">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div>
              <span style={{ fontWeight: 700, color: '#22c55e', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Shape{' '}
              </span>
              {part.physical.shape}
            </div>
            <div>
              <span style={{ fontWeight: 700, color: '#22c55e', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Material{' '}
              </span>
              {part.physical.material}
            </div>
            {part.physical.size && (
              <div>
                <span style={{ fontWeight: 700, color: '#22c55e', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Size{' '}
                </span>
                {part.physical.size}
              </div>
            )}
            {part.physical.identifiers && (
              <div>
                <span style={{ fontWeight: 700, color: '#22c55e', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  How to identify{' '}
                </span>
                {part.physical.identifiers}
              </div>
            )}
          </div>
        </Section>

        {/* Location */}
        <Section label="Where It Lives in the Pump">
          {part.location}
        </Section>

        {/* Orientation */}
        {part.orientation && (
          <div style={{
            background: 'rgba(245, 158, 11, 0.06)',
            border: '1.5px solid rgba(245, 158, 11, 0.25)',
            borderRadius: 12,
            padding: '12px 14px',
          }}>
            <div style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#f59e0b',
              marginBottom: 8,
            }}>
              Orientation &amp; Direction
            </div>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#dde8e2', lineHeight: 1.65 }}>
              {part.orientation}
            </p>
          </div>
        )}

        {/* Warnings */}
        <WarningBox warnings={part.warnings} />

        {/* Common faults */}
        {part.commonFaults && part.commonFaults.length > 0 && (
          <Section label="Common Failure Modes">
            <BulletList items={part.commonFaults} />
          </Section>
        )}

        {/* Install note */}
        {part.installNote && (
          <Section label="Installation Notes" color="#f59e0b">
            {part.installNote}
          </Section>
        )}
      </div>
    </div>
  )
}
