import StepIndicator from './ui/StepIndicator.jsx'
import WeldTypeStep from './steps/WeldTypeStep.jsx'
import SideStep from './steps/SideStep.jsx'
import DimensionsStep from './steps/DimensionsStep.jsx'
import SupplementaryStep from './steps/SupplementaryStep.jsx'
import ContourFinishStep from './steps/ContourFinishStep.jsx'
import ResultStep from './steps/ResultStep.jsx'

function canAdvance(state) {
  if (state.step === 0) return !!state.weldType
  if (state.step === 1) return !!state.side
  return true
}

function NavButtons({ state, dispatch }) {
  const isFirst = state.step === 0
  const isLast = state.step === 4
  const ok = canAdvance(state)

  return (
    <div style={{
      padding: '12px 16px',
      paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))',
      borderTop: '1px solid #2e3330',
      background: '#111413',
      flexShrink: 0,
      display: 'flex',
      gap: 10,
    }}>
      <button
        onClick={() => dispatch({ type: 'PREV' })}
        disabled={isFirst}
        style={{
          flex: isFirst ? 0 : 1,
          padding: '15px 20px',
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
          transition: 'all 0.15s',
          opacity: isFirst ? 0 : 1,
          pointerEvents: isFirst ? 'none' : 'auto',
          minHeight: 52,
          WebkitTapHighlightColor: 'transparent',
        }}
        aria-label="Previous step"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <polyline points="10,4 6,8 10,12" stroke="currentColor" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back
      </button>

      <button
        onClick={() => dispatch({ type: 'NEXT' })}
        disabled={!ok}
        style={{
          flex: 3,
          padding: '15px 20px',
          borderRadius: 12,
          border: 'none',
          background: ok ? '#f59e0b' : '#212524',
          color: ok ? '#0a0c0b' : '#404d47',
          fontSize: '0.95rem',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          transition: 'all 0.15s',
          minHeight: 52,
          WebkitTapHighlightColor: 'transparent',
          letterSpacing: '0.01em',
        }}
        aria-label={isLast ? 'Generate explanation' : 'Next step'}
      >
        {isLast ? (
          <>
            Decode
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="2"/>
              <polyline points="5,8 8,5 11,8" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 8 8)"/>
            </svg>
          </>
        ) : (
          <>
            Next
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <polyline points="6,4 10,8 6,12" stroke="currentColor" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </button>
    </div>
  )
}

const STEP_COMPONENTS = [
  WeldTypeStep,
  SideStep,
  DimensionsStep,
  SupplementaryStep,
  ContourFinishStep,
]

export default function WeldDecoder({ state, dispatch }) {
  const isResult = state.step === 5

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: '#0a0c0b',
    }}>
      <StepIndicator step={state.step} />

      {/* Scrollable content */}
      <div
        key={state.step}
        style={{
          flex: 1,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          paddingBottom: 16,
        }}
      >
        {isResult ? (
          <ResultStep state={state} standard={state.standard} dispatch={dispatch} />
        ) : (
          (() => {
            const Step = STEP_COMPONENTS[state.step]
            return Step ? (
              <Step
                state={state}
                weldType={state.weldType}
                side={state.side}
                supplementary={state.supplementary}
                contour={state.contour}
                finish={state.finish}
                dispatch={dispatch}
              />
            ) : null
          })()
        )}
      </div>

      {/* Nav buttons — hide on result screen */}
      {!isResult && <NavButtons state={state} dispatch={dispatch} />}
    </div>
  )
}
