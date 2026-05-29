const css = {
  header: {
    background: '#111413',
    borderBottom: '1px solid #2e3330',
    padding: '0 16px',
    paddingTop: 'env(safe-area-inset-top, 0px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
    flexShrink: 0,
    gap: 12,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    width: 32,
    height: 32,
    flexShrink: 0,
  },
  logoText: {
    fontWeight: 800,
    fontSize: '1.1rem',
    letterSpacing: '-0.02em',
    color: '#dde8e2',
    lineHeight: 1,
  },
  logoSub: {
    fontSize: '0.65rem',
    fontWeight: 500,
    color: '#7a8a82',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  toggle: {
    display: 'flex',
    background: '#212524',
    border: '1.5px solid #2e3330',
    borderRadius: 8,
    padding: 3,
    gap: 2,
    flexShrink: 0,
  },
  toggleBtn: (active) => ({
    padding: '6px 12px',
    borderRadius: 6,
    fontSize: '0.8rem',
    fontWeight: 700,
    letterSpacing: '0.03em',
    transition: 'all 0.15s',
    background: active ? '#f59e0b' : 'transparent',
    color: active ? '#0a0c0b' : '#7a8a82',
    lineHeight: 1,
  }),
}

export default function Header({ standard, dispatch }) {
  return (
    <header style={css.header}>
      <div style={css.logo}>
        <svg style={css.logoIcon} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="6" fill="#1a1e1c"/>
          <line x1="4" y1="16" x2="28" y2="16" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="16" y1="16" x2="10" y2="26" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round"/>
          <polygon points="10,26 7.5,21 12,22.5" fill="#f59e0b"/>
          <polygon points="13,19 13,25 20,25" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinejoin="round"/>
          <circle cx="16" cy="16" r="2.5" fill="none" stroke="#22c55e" strokeWidth="1.5"/>
        </svg>
        <div>
          <div style={css.logoText}>TradeLens</div>
          <div style={css.logoSub}>Weld Decoder</div>
        </div>
      </div>

      <div style={css.toggle} role="group" aria-label="Welding standard">
        {['CWB', 'AWS'].map(std => (
          <button
            key={std}
            style={css.toggleBtn(standard === std)}
            onClick={() => dispatch({ type: 'SET_STANDARD', payload: std })}
            aria-pressed={standard === std}
          >
            {std}
          </button>
        ))}
      </div>
    </header>
  )
}
