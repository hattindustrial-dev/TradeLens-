import { useState } from 'react'
import { SEQUENCES } from '../../data/rebuildSequences.js'
import { PUMP_PARTS } from '../../data/pumpData.js'

const SEQUENCE_OPTIONS = [
  {
    pumpType: 'ansi-centrifugal',
    variant: 'mechanical-seal',
    key: 'full',
    label: 'Full Rebuild',
    desc: 'Complete tear-down and reassembly — all systems',
    color: '#818cf8',
  },
  {
    pumpType: 'ansi-centrifugal',
    variant: 'mechanical-seal',
    key: 'seal',
    label: 'Seal Replacement',
    desc: 'Replace mechanical seal without full disassembly',
    color: '#22c55e',
  },
  {
    pumpType: 'ansi-centrifugal',
    variant: 'packed-box',
    key: 'seal',
    label: 'Repacking',
    desc: 'Replace stuffing box packing — packed box pumps',
    color: '#f59e0b',
  },
]

function PhaseChip({ phase }) {
  const colors = {
    disassembly: { bg: 'rgba(239,68,68,0.10)', text: '#fca5a5', label: 'Disassembly' },
    reassembly: { bg: 'rgba(34,197,94,0.10)', text: '#86efac', label: 'Reassembly' },
  }
  const c = colors[phase] || { bg: '#212524', text: '#7a8a82', label: phase }
  return (
    <span style={{
      fontSize: '0.62rem',
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: c.text,
      background: c.bg,
      padding: '2px 8px',
      borderRadius: 4,
    }}>
      {c.label}
    </span>
  )
}

function StepCard({ step, stepNumber, total }) {
  const involvedParts = (step.partIds || [])
    .map(id => PUMP_PARTS.find(p => p.id === id))
    .filter(Boolean)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Step header */}
      <div style={{
        background: '#191c1a',
        border: step.critical ? '1.5px solid rgba(239,68,68,0.30)' : '1.5px solid #2e3330',
        borderRadius: 14,
        overflow: 'hidden',
      }}>
        {/* Title bar */}
        <div style={{
          padding: '12px 14px',
          borderBottom: '1px solid #2e3330',
          background: step.critical ? 'rgba(239,68,68,0.05)' : 'transparent',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: '#404d47',
                  fontFamily: "'SF Mono', monospace",
                }}>
                  {stepNumber} / {total}
                </span>
                <PhaseChip phase={step.phase} />
                {step.critical && (
                  <span style={{
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: '#ef4444',
                    background: 'rgba(239,68,68,0.12)',
                    padding: '2px 7px',
                    borderRadius: 4,
                  }}>
                    ⚠ Critical
                  </span>
                )}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#dde8e2', margin: 0 }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#7a8a82', margin: '3px 0 0' }}>
                {step.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Action */}
        <div style={{ padding: '14px 14px 12px' }}>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#dde8e2', lineHeight: 1.7 }}>
            {step.action}
          </p>
        </div>
      </div>

      {/* Parts involved */}
      {involvedParts.length > 0 && (
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
            letterSpacing: '0.07em',
            color: '#7a8a82',
          }}>
            Parts Involved
          </div>
          {involvedParts.map((part, i) => (
            <div
              key={part.id}
              style={{
                padding: '10px 14px',
                borderBottom: i < involvedParts.length - 1 ? '1px solid #2e3330' : 'none',
              }}
            >
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#dde8e2' }}>
                  {part.name}
                </span>
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: '#f59e0b',
                  fontFamily: 'monospace',
                  background: 'rgba(245,158,11,0.08)',
                  padding: '1px 5px',
                  borderRadius: 3,
                }}>
                  {part.refNumbers[0]}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#7a8a82', lineHeight: 1.5 }}>
                {part.physical.shape}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Warnings */}
      {step.warnings && step.warnings.length > 0 && (
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
            letterSpacing: '0.07em',
            color: '#ef4444',
            marginBottom: 8,
          }}>
            ⚠ Watch Out
          </div>
          <ul style={{ margin: 0, paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {step.warnings.map((w, i) => (
              <li key={i} style={{ fontSize: '0.78rem', color: '#fca5a5', lineHeight: 1.55 }}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Check before next */}
      {step.checkBefore && (
        <div style={{
          background: 'rgba(34, 197, 94, 0.05)',
          border: '1.5px solid rgba(34, 197, 94, 0.20)',
          borderRadius: 12,
          padding: '12px 14px',
        }}>
          <div style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: '#22c55e',
            marginBottom: 7,
          }}>
            ✓ Verify Before Next Step
          </div>
          <p style={{ margin: 0, fontSize: '0.78rem', color: '#86efac', lineHeight: 1.55 }}>
            {step.checkBefore}
          </p>
        </div>
      )}
    </div>
  )
}

export default function RebuildGuide({ pumpType, variant }) {
  const [selected, setSelected] = useState(null)
  const [stepIdx, setStepIdx] = useState(0)

  // Filter options relevant to this pump/variant
  const options = SEQUENCE_OPTIONS.filter(o =>
    o.pumpType === pumpType &&
    (!variant || o.variant === variant || (variant === 'packed-box' && o.variant === 'packed-box'))
  )

  if (!selected) {
    return (
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ marginBottom: 14 }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#dde8e2', marginBottom: 4 }}>
            Rebuild Guide
          </h2>
          <p style={{ fontSize: '0.8rem', color: '#7a8a82' }}>
            Choose the rebuild scope for your situation
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {options.map(opt => (
            <button
              key={`${opt.variant}-${opt.key}`}
              onClick={() => {
                const seq = SEQUENCES[opt.pumpType]?.[opt.variant]?.[opt.key]
                if (seq) { setSelected(seq); setStepIdx(0) }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '16px',
                minHeight: 72,
                borderRadius: 12,
                border: `1.5px solid ${opt.color}30`,
                background: '#191c1a',
                textAlign: 'left',
                WebkitTapHighlightColor: 'transparent',
                transition: 'all 0.15s',
              }}
            >
              <div style={{
                width: 10,
                height: 44,
                borderRadius: 4,
                background: opt.color,
                flexShrink: 0,
              }} />
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#dde8e2', marginBottom: 4 }}>
                  {opt.label}
                </div>
                <div style={{ fontSize: '0.76rem', color: '#7a8a82' }}>{opt.desc}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: '#404d47', marginLeft: 'auto', flexShrink: 0 }}>
                <polyline points="5,2 10,7 5,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Active guide
  const steps = selected.steps
  const step = steps[stepIdx]
  const isFirst = stepIdx === 0
  const isLast = stepIdx === steps.length - 1

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Guide header */}
      <div style={{
        padding: '10px 16px',
        borderBottom: '1px solid #2e3330',
        background: '#111413',
        flexShrink: 0,
      }}>
        <button
          onClick={() => setSelected(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: '#7a8a82',
            fontSize: '0.78rem',
            fontWeight: 600,
            marginBottom: 6,
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <polyline points="8,2 3,6 8,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Change sequence
        </button>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#dde8e2' }}>
          {selected.label}
        </div>
        {/* Progress bar */}
        <div style={{
          marginTop: 8,
          height: 3,
          background: '#2e3330',
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${((stepIdx + 1) / steps.length) * 100}%`,
            background: '#22c55e',
            borderRadius: 2,
            transition: 'width 0.3s',
          }} />
        </div>
      </div>

      {/* Disclaimer (step 0 only) */}
      {stepIdx === 0 && (
        <div style={{
          margin: '10px 16px 0',
          padding: '10px 14px',
          background: 'rgba(129, 140, 248, 0.06)',
          border: '1px solid rgba(129, 140, 248, 0.15)',
          borderRadius: 10,
          fontSize: '0.7rem',
          color: '#a5b4fc',
          lineHeight: 1.5,
          flexShrink: 0,
        }}>
          {selected.disclaimer}
        </div>
      )}

      {/* Step content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px 16px 0',
        WebkitOverflowScrolling: 'touch',
      }}>
        <StepCard step={step} stepNumber={stepIdx + 1} total={steps.length} />
        <div style={{ height: 16 }} />
      </div>

      {/* Navigation */}
      <div style={{
        padding: '12px 16px',
        paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))',
        borderTop: '1px solid #2e3330',
        background: '#111413',
        display: 'flex',
        gap: 10,
        flexShrink: 0,
      }}>
        <button
          onClick={() => { setStepIdx(i => Math.max(i - 1, 0)); }}
          disabled={isFirst}
          style={{
            flex: 1,
            padding: '15px',
            borderRadius: 12,
            border: '1.5px solid #2e3330',
            background: '#191c1a',
            color: isFirst ? '#2e3330' : '#dde8e2',
            fontSize: '0.9rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            pointerEvents: isFirst ? 'none' : 'auto',
            opacity: isFirst ? 0 : 1,
            minHeight: 52,
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <polyline points="9,2 4,7 9,12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        {isLast ? (
          <button
            onClick={() => setSelected(null)}
            style={{
              flex: 3,
              padding: '15px',
              borderRadius: 12,
              border: 'none',
              background: '#22c55e',
              color: '#0a0c0b',
              fontSize: '0.95rem',
              fontWeight: 800,
              minHeight: 52,
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            Complete ✓
          </button>
        ) : (
          <button
            onClick={() => { setStepIdx(i => Math.min(i + 1, steps.length - 1)); }}
            style={{
              flex: 3,
              padding: '15px',
              borderRadius: 12,
              border: 'none',
              background: '#f59e0b',
              color: '#0a0c0b',
              fontSize: '0.95rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              minHeight: 52,
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            Next Step
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <polyline points="5,2 10,7 5,12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
