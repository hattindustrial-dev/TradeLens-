import { useState } from 'react'
import { searchParts, SUBSYSTEM_COLORS, PUMP_PARTS } from '../../data/pumpData.js'

function SubsystemChip({ subsystem }) {
  const colors = { seal: '#22c55e', bearing: '#f59e0b', rotating: '#e85d04', stationary: '#818cf8' }
  const c = colors[subsystem] || '#7a8a82'
  return (
    <span style={{
      fontSize: '0.62rem',
      fontWeight: 700,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: c,
      background: c + '18',
      padding: '2px 7px',
      borderRadius: 4,
    }}>
      {subsystem}
    </span>
  )
}

export default function PartLookup({ pumpType, onSelectPart }) {
  const [query, setQuery] = useState('')
  const results = searchParts(query, pumpType)

  const showBrowse = query.trim().length === 0
  const browseList = PUMP_PARTS.filter(p => p.pumpTypes.includes(pumpType))

  return (
    <div style={{ padding: '16px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#dde8e2', marginBottom: 4 }}>
          Part Lookup
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#7a8a82' }}>
          Enter a reference number (e.g. "17A", "22") or type a part name
        </p>
      </div>

      {/* Search input */}
      <div style={{ position: 'relative' }}>
        <svg
          width="18" height="18" viewBox="0 0 18 18" fill="none"
          style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#7a8a82' }}
        >
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.8"/>
          <line x1="12" y1="12" x2="17" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Reference # or part name…"
          autoFocus
          style={{ paddingLeft: 40, paddingRight: query ? 40 : 16 }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#7a8a82',
              lineHeight: 1,
              fontSize: '1.2rem',
            }}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Results / browse */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {!showBrowse && results.length === 0 && (
          <div style={{
            padding: '20px',
            textAlign: 'center',
            color: '#404d47',
            fontSize: '0.82rem',
          }}>
            No parts found for "{query}"
            <br/>
            <span style={{ fontSize: '0.72rem', color: '#2e3330' }}>
              Try a shorter search or a different term
            </span>
          </div>
        )}

        {(showBrowse ? browseList : results).map(part => (
          <button
            key={part.id}
            onClick={() => onSelectPart(part)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              padding: '12px 14px',
              borderRadius: 10,
              border: '1.5px solid #2e3330',
              background: '#191c1a',
              textAlign: 'left',
              transition: 'all 0.15s',
              WebkitTapHighlightColor: 'transparent',
              minHeight: 52,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#dde8e2' }}>
                  {part.name}
                </span>
                <SubsystemChip subsystem={part.subsystem} />
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.7rem', color: '#7a8a82' }}>Ref:</span>
                {part.refNumbers.slice(0, 4).map(r => (
                  <span key={r} style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: '#f59e0b',
                    fontFamily: "'SF Mono', 'Fira Code', monospace",
                    background: 'rgba(245,158,11,0.08)',
                    padding: '1px 6px',
                    borderRadius: 3,
                  }}>
                    {r}
                  </span>
                ))}
              </div>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: '#404d47', flexShrink: 0, marginTop: 4 }}>
              <polyline points="5,2 10,7 5,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ))}

        {showBrowse && (
          <p style={{
            textAlign: 'center',
            fontSize: '0.7rem',
            color: '#2e3330',
            marginTop: 8,
          }}>
            Showing all {browseList.length} parts — search to filter
          </p>
        )}
      </div>
    </div>
  )
}
