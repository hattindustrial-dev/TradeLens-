import { useReducer } from 'react'
import Header from './components/Header.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import WeldDecoder from './components/WeldDecoder.jsx'
import MechDecoder from './components/MechDecoder.jsx'

// ── Weld decoder state ────────────────────────────────────────────────────────
const weldInitial = {
  step: 0,
  standard: 'CWB',
  unit: 'mm',
  weldType: null,
  side: null,
  size: '',
  length: '',
  pitch: '',
  angle: '',
  rootOpening: '',
  supplementary: [],
  contour: 'none',
  finish: 'none',
}

function weldReducer(state, action) {
  switch (action.type) {
    case 'SET_STANDARD':
      return { ...state, standard: action.payload, unit: action.payload === 'CWB' ? 'mm' : 'in' }
    case 'SET_UNIT':
      return { ...state, unit: action.payload }
    case 'SET_WELD_TYPE':
      return { ...state, weldType: action.payload }
    case 'SET_SIDE':
      return { ...state, side: action.payload }
    case 'SET_DIM':
      return { ...state, [action.field]: action.payload }
    case 'TOGGLE_SUPP': {
      const existing = state.supplementary
      return {
        ...state,
        supplementary: existing.includes(action.payload)
          ? existing.filter(s => s !== action.payload)
          : [...existing, action.payload],
      }
    }
    case 'SET_CONTOUR':
      return { ...state, contour: action.payload }
    case 'SET_FINISH':
      return { ...state, finish: action.payload }
    case 'NEXT':
      return { ...state, step: Math.min(state.step + 1, 5) }
    case 'PREV':
      return { ...state, step: Math.max(state.step - 1, 0) }
    case 'RESET':
      return { ...weldInitial, standard: state.standard, unit: state.unit }
    default:
      return state
  }
}

export default function App() {
  const [mode, setMode] = useReducer((_, m) => m, null)
  const [weldState, weldDispatch] = useReducer(weldReducer, weldInitial)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header
        standard={weldState.standard}
        mode={mode}
        onBack={() => setMode(null)}
        dispatch={weldDispatch}
      />

      {mode === null && <HomeScreen onSelect={setMode} />}
      {mode === 'weld' && <WeldDecoder state={weldState} dispatch={weldDispatch} />}
      {mode === 'mech' && <MechDecoder />}
    </div>
  )
}
