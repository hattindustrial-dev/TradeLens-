import { useReducer } from 'react'
import PumpTypeStep from './mech/PumpTypeStep.jsx'
import VariantStep from './mech/VariantStep.jsx'
import ActionStep from './mech/ActionStep.jsx'
import PartLookup from './mech/PartLookup.jsx'
import PartDetail from './mech/PartDetail.jsx'
import RebuildGuide from './mech/RebuildGuide.jsx'
import CameraDecode from './mech/CameraDecode.jsx'
import { PUMP_TYPES } from '../data/pumpData.js'

const STEPS = {
  PUMP_TYPE: 'pump_type',
  VARIANT: 'variant',
  ACTION: 'action',
  LOOKUP: 'lookup',
  PART_DETAIL: 'part_detail',
  REBUILD: 'rebuild',
  CAMERA: 'camera',
}

const initial = {
  step: STEPS.PUMP_TYPE,
  pumpType: null,
  variant: null,
  action: null,
  selectedPart: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PUMP_TYPE': {
      const pt = PUMP_TYPES.find(p => p.id === action.payload)
      return {
        ...state,
        pumpType: action.payload,
        step: pt?.hasVariants ? STEPS.VARIANT : STEPS.ACTION,
      }
    }
    case 'SET_VARIANT':
      return { ...state, variant: action.payload, step: STEPS.ACTION }
    case 'SET_ACTION': {
      const stepMap = { lookup: STEPS.LOOKUP, rebuild: STEPS.REBUILD, camera: STEPS.CAMERA }
      return {
        ...state,
        action: action.payload,
        step: stepMap[action.payload] ?? STEPS.LOOKUP,
      }
    }
    case 'SELECT_PART':
      return { ...state, selectedPart: action.payload, step: STEPS.PART_DETAIL }
    case 'BACK_FROM_PART':
      return { ...state, selectedPart: null, step: STEPS.LOOKUP }
    case 'BACK': {
      if (state.step === STEPS.VARIANT) return { ...state, step: STEPS.PUMP_TYPE, pumpType: null }
      if (state.step === STEPS.ACTION) {
        const pt = PUMP_TYPES.find(p => p.id === state.pumpType)
        return { ...state, step: pt?.hasVariants ? STEPS.VARIANT : STEPS.PUMP_TYPE, variant: null }
      }
      if (state.step === STEPS.LOOKUP || state.step === STEPS.REBUILD || state.step === STEPS.CAMERA) {
        return { ...state, step: STEPS.ACTION, action: null }
      }
      if (state.step === STEPS.PART_DETAIL) {
        return { ...state, selectedPart: null, step: STEPS.LOOKUP }
      }
      return state
    }
    case 'RESET':
      return initial
    default:
      return state
  }
}

const WIZARD_STEPS = [STEPS.PUMP_TYPE, STEPS.VARIANT, STEPS.ACTION]

function canGoBack(step) {
  return step !== STEPS.PUMP_TYPE
}

function canAdvance(state) {
  if (state.step === STEPS.PUMP_TYPE) return !!state.pumpType
  if (state.step === STEPS.VARIANT) return !!state.variant
  if (state.step === STEPS.ACTION) return !!state.action
  return false
}

function getStepNumber(step, pumpType) {
  const pt = PUMP_TYPES.find(p => p.id === pumpType)
  const hasVariant = pt?.hasVariants
  if (step === STEPS.PUMP_TYPE) return { current: 1, total: hasVariant ? 3 : 2 }
  if (step === STEPS.VARIANT) return { current: 2, total: 3 }
  if (step === STEPS.ACTION) return { current: hasVariant ? 3 : 2, total: hasVariant ? 3 : 2 }
  return null
}

export default function MechDecoder() {
  const [state, dispatch] = useReducer(reducer, initial)

  const isWizardStep = WIZARD_STEPS.includes(state.step)
  const stepNum = getStepNumber(state.step, state.pumpType)

  const isFullScreen = state.step === STEPS.REBUILD || state.step === STEPS.CAMERA

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Wizard progress header */}
      {isWizardStep && stepNum && (
        <div style={{
          padding: '10px 16px 10px',
          borderBottom: '1px solid #2e3330',
          background: '#111413',
          flexShrink: 0,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
            fontSize: '0.72rem',
            color: '#7a8a82',
          }}>
            <span>Step {stepNum.current} of {stepNum.total}</span>
            {state.pumpType && (
              <span style={{ color: '#22c55e', fontWeight: 600 }}>
                {PUMP_TYPES.find(p => p.id === state.pumpType)?.label}
              </span>
            )}
          </div>
          <div style={{
            height: 2,
            background: '#2e3330',
            borderRadius: 2,
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${(stepNum.current / stepNum.total) * 100}%`,
              background: '#22c55e',
              borderRadius: 2,
              transition: 'width 0.2s',
            }} />
          </div>
        </div>
      )}

      {/* Scrollable content */}
      <div style={{
        flex: 1,
        overflowY: isFullScreen ? 'hidden' : 'auto',
        display: isFullScreen ? 'flex' : 'block',
        flexDirection: isFullScreen ? 'column' : undefined,
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
        paddingBottom: isWizardStep ? 0 : 16,
      }}>
        {state.step === STEPS.PUMP_TYPE && (
          <PumpTypeStep pumpType={state.pumpType} dispatch={dispatch} />
        )}
        {state.step === STEPS.VARIANT && (
          <VariantStep pumpType={state.pumpType} variant={state.variant} dispatch={dispatch} />
        )}
        {state.step === STEPS.ACTION && (
          <ActionStep action={state.action} dispatch={dispatch} />
        )}
        {state.step === STEPS.LOOKUP && (
          <PartLookup
            pumpType={state.pumpType}
            onSelectPart={part => dispatch({ type: 'SELECT_PART', payload: part })}
          />
        )}
        {state.step === STEPS.PART_DETAIL && (
          <PartDetail
            part={state.selectedPart}
            onBack={() => dispatch({ type: 'BACK_FROM_PART' })}
          />
        )}
        {state.step === STEPS.REBUILD && (
          <RebuildGuide pumpType={state.pumpType} variant={state.variant} />
        )}
        {state.step === STEPS.CAMERA && (
          <CameraDecode onBack={() => dispatch({ type: 'BACK' })} />
        )}
      </div>

      {/* Wizard nav buttons (wizard steps only) */}
      {isWizardStep && (
        <div style={{
          padding: '12px 16px',
          paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))',
          borderTop: '1px solid #2e3330',
          background: '#111413',
          flexShrink: 0,
          display: 'flex',
          gap: 10,
        }}>
          {canGoBack(state.step) && (
            <button
              onClick={() => dispatch({ type: 'BACK' })}
              style={{
                flex: 1,
                padding: '15px',
                borderRadius: 12,
                border: '1.5px solid #2e3330',
                background: '#191c1a',
                color: '#dde8e2',
                fontSize: '0.9rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                minHeight: 52,
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <polyline points="9,2 4,7 9,12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
          )}

          {state.step === STEPS.ACTION && canAdvance(state) && (
            <button
              onClick={() => dispatch({ type: 'SET_ACTION', payload: state.action })}
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              Continue
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <polyline points="5,2 10,7 5,12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Back nav for lookup / part detail */}
      {(state.step === STEPS.LOOKUP) && (
        <div style={{
          padding: '12px 16px',
          paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))',
          borderTop: '1px solid #2e3330',
          background: '#111413',
          flexShrink: 0,
        }}>
          <button
            onClick={() => dispatch({ type: 'BACK' })}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 12,
              border: '1.5px solid #2e3330',
              background: '#191c1a',
              color: '#dde8e2',
              fontSize: '0.88rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              minHeight: 48,
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <polyline points="9,2 4,7 9,12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Action Select
          </button>
        </div>
      )}
    </div>
  )
}
