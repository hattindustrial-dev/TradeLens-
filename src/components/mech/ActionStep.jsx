const ACTIONS = [
  {
    id: 'camera',
    label: 'Drawing Decode',
    desc: 'Photo a drawing or part — Claude will identify it, explain what it looks like in hand, and tell you where it goes.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="7" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
        <circle cx="14" cy="16" r="5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="14" cy="16" r="2" fill="currentColor" opacity="0.4"/>
        <path d="M9 7 L10.5 4 H17.5 L19 7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="22" cy="11" r="1.5" fill="currentColor"/>
      </svg>
    ),
    color: '#f59e0b',
    badge: 'AI',
  },
  {
    id: 'lookup',
    label: 'Part Lookup',
    desc: 'Enter a reference number or describe a part to identify it, see what it looks like in your hand, and get orientation and installation notes.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2.2"/>
        <line x1="18" y1="18" x2="26" y2="26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="12" y1="9" x2="12" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    color: '#818cf8',
  },
  {
    id: 'rebuild',
    label: 'Rebuild Guide',
    desc: 'Step-by-step disassembly and reassembly sequence with part descriptions, critical orientation notes, and what to check at each step.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
        <polyline points="4,16 7,20 4,24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="12" y1="20" x2="24" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="9" cy="10" r="2" fill="currentColor" opacity="0.4"/>
        <rect x="14" y="4" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    color: '#22c55e',
  },
]

export default function ActionStep({ action, dispatch }) {
  return (
    <div style={{ padding: '16px 16px 0' }}>
      <div style={{ marginBottom: 14 }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#dde8e2', marginBottom: 4 }}>
          What do you need?
        </h2>
        <p style={{ fontSize: '0.8rem', color: '#7a8a82' }}>
          Choose the type of help you need right now
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ACTIONS.map(a => {
          const active = action === a.id
          return (
            <button
              key={a.id}
              onClick={() => dispatch({ type: 'SET_ACTION', payload: a.id })}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                padding: '16px',
                minHeight: 80,
                borderRadius: 12,
                border: active ? `2px solid ${a.color}` : '1.5px solid #2e3330',
                background: active ? `${a.color}12` : '#191c1a',
                transition: 'all 0.15s',
                textAlign: 'left',
                WebkitTapHighlightColor: 'transparent',
              }}
              aria-pressed={active}
            >
              <div style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                background: active ? `${a.color}18` : '#212524',
                border: `1px solid ${active ? a.color + '40' : '#2e3330'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: active ? a.color : '#7a8a82',
                flexShrink: 0,
                transition: 'all 0.15s',
              }}>
                {a.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 6,
                }}>
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: active ? a.color : '#dde8e2',
                  }}>
                    {a.label}
                  </span>
                  {a.badge && (
                    <span style={{
                      fontSize: '0.58rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      color: '#f59e0b',
                      background: 'rgba(245,158,11,0.15)',
                      padding: '2px 6px',
                      borderRadius: 4,
                    }}>
                      {a.badge}
                    </span>
                  )}
                </div>
                <div style={{
                  fontSize: '0.76rem',
                  color: '#7a8a82',
                  lineHeight: 1.55,
                }}>
                  {a.desc}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
