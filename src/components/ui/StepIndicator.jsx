const STEP_LABELS = ['Type', 'Side', 'Dims', 'Extra', 'Finish']

export default function StepIndicator({ step }) {
  const isResult = step === 5
  const activeStep = isResult ? 5 : step

  return (
    <div style={{
      padding: '12px 16px 8px',
      borderBottom: '1px solid #2e3330',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {STEP_LABELS.map((label, i) => {
          const done = i < activeStep
          const active = i === activeStep
          const isLast = i === STEP_LABELS.length - 1

          return (
            <div key={label} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  transition: 'all 0.2s',
                  background: done ? '#f59e0b' : active ? 'transparent' : 'transparent',
                  border: done ? 'none' : active ? '2px solid #f59e0b' : '2px solid #2e3330',
                  color: done ? '#0a0c0b' : active ? '#f59e0b' : '#404d47',
                  flexShrink: 0,
                }}>
                  {done ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <polyline points="2,6 5,9 10,3" stroke="#0a0c0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span style={{
                  fontSize: '0.6rem',
                  fontWeight: active ? 700 : 500,
                  color: done ? '#f59e0b' : active ? '#f59e0b' : '#404d47',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}>
                  {label}
                </span>
              </div>
              {!isLast && (
                <div style={{
                  flex: 1,
                  height: 2,
                  marginBottom: 16,
                  background: done ? '#f59e0b' : '#2e3330',
                  transition: 'background 0.2s',
                }} />
              )}
            </div>
          )
        })}
        {/* Result indicator */}
        <div style={{ display: 'flex', alignItems: 'center', flex: 'none' }}>
          <div style={{
            width: 2,
            height: 2,
            marginBottom: 16,
            background: isResult ? '#22c55e' : '#2e3330',
            marginLeft: 0,
          }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isResult ? '#22c55e' : 'transparent',
              border: isResult ? 'none' : '2px solid #2e3330',
              flexShrink: 0,
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1 L7.5 4.5 L11 5 L8.5 7.5 L9 11 L6 9.5 L3 11 L3.5 7.5 L1 5 L4.5 4.5 Z"
                  fill={isResult ? '#0a0c0b' : '#2e3330'}
                  stroke="none"
                />
              </svg>
            </div>
            <span style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              color: isResult ? '#22c55e' : '#404d47',
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
            }}>
              Read
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
