import { generateExplanation, buildSummary } from '../../utils/generateExplanation.js'
import { useState } from 'react'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        padding: '6px 12px',
        borderRadius: 7,
        border: '1.5px solid #2e3330',
        background: copied ? 'rgba(34,197,94,0.12)' : '#212524',
        color: copied ? '#22c55e' : '#7a8a82',
        fontSize: '0.72rem',
        fontWeight: 600,
        transition: 'all 0.15s',
      }}
    >
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <polyline points="2,6 5,9 10,3" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M3,8 L2,8 Q1,8 1,7 L1,2 Q1,1 2,1 L7,1 Q8,1 8,2 L8,3"
              stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
          Copy
        </>
      )}
    </button>
  )
}

export default function ResultStep({ state, standard, dispatch }) {
  const explanation = generateExplanation(state, standard)
  const summary = buildSummary(state, standard)

  return (
    <div style={{ padding: '16px 16px 0' }}>
      {/* Result header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
      }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'rgba(34, 197, 94, 0.12)',
          border: '2px solid #22c55e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <polyline points="3,9 7,13 15,5" stroke="#22c55e" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#dde8e2' }}>Weld Decoded</div>
          <div style={{ fontSize: '0.72rem', color: '#7a8a82' }}>
            {standard === 'CWB' ? 'CWB / CSA W59' : 'AWS D1.1'} standard
          </div>
        </div>
      </div>

      {/* Explanation card */}
      <div style={{
        background: '#191c1a',
        border: '1.5px solid #2e3330',
        borderRadius: 14,
        padding: '16px',
        marginBottom: 14,
        position: 'relative',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#f59e0b',
          }}>
            Plain-English Read
          </span>
          <CopyButton text={explanation} />
        </div>

        <p style={{
          fontSize: '0.92rem',
          color: '#dde8e2',
          lineHeight: 1.65,
          margin: 0,
        }}>
          {explanation}
        </p>
      </div>

      {/* Summary table */}
      <div style={{
        background: '#191c1a',
        border: '1.5px solid #2e3330',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
      }}>
        <div style={{
          padding: '10px 14px',
          borderBottom: '1px solid #2e3330',
          fontSize: '0.7rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#7a8a82',
        }}>
          Symbol Summary
        </div>
        {summary.map((row, i) => (
          <div
            key={row.label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              padding: '9px 14px',
              borderBottom: i < summary.length - 1 ? '1px solid #2e3330' : 'none',
              gap: 8,
            }}
          >
            <span style={{ fontSize: '0.78rem', color: '#7a8a82', flexShrink: 0 }}>{row.label}</span>
            <span style={{
              fontSize: '0.82rem',
              color: '#dde8e2',
              fontWeight: 500,
              textAlign: 'right',
            }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* New decode button */}
      <button
        onClick={() => dispatch({ type: 'RESET' })}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: 12,
          border: '1.5px solid #f59e0b',
          background: 'transparent',
          color: '#f59e0b',
          fontSize: '0.95rem',
          fontWeight: 700,
          letterSpacing: '0.02em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          WebkitTapHighlightColor: 'transparent',
          marginBottom: 8,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3 9 A6 6 0 1 1 6 14.2" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round"/>
          <polyline points="3,6 3,9 6,9" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Decode Another Weld
      </button>
    </div>
  )
}
