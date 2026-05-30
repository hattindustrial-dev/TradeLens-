import { useState, useRef } from 'react'
import { PUMP_PARTS } from '../../data/pumpData.js'
import { SUBSYSTEM_COLORS } from '../../data/pumpData.js'

const WORKER_URL = import.meta.env.VITE_WORKER_URL || 'https://tradelens-api.workers.dev'

function resizeImage(file, maxDim = 1120) {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
      const w = Math.round(img.width * scale)
      const h = Math.round(img.height * scale)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      canvas.getContext('2d').drawImage(img, 0, 0, w, h)
      canvas.toBlob(blob => {
        const reader = new FileReader()
        reader.onload = e => resolve({
          base64: e.target.result.split(',')[1],
          mediaType: 'image/jpeg',
          previewUrl: canvas.toDataURL('image/jpeg', 0.85),
        })
        reader.readAsDataURL(blob)
      }, 'image/jpeg', 0.85)
    }
    img.src = url
  })
}

function ConfidencePip({ level }) {
  const colors = { high: '#22c55e', medium: '#f59e0b', low: '#7a8a82' }
  return (
    <span style={{
      display: 'inline-block',
      width: 7, height: 7, borderRadius: '50%',
      background: colors[level] || '#7a8a82',
      marginRight: 5,
    }} />
  )
}

function PartResultCard({ part }) {
  const dbPart = PUMP_PARTS.find(p =>
    p.refNumbers.includes(part.refNumber) ||
    p.name.toLowerCase() === part.name?.toLowerCase()
  )
  const subColor = dbPart ? (SUBSYSTEM_COLORS[dbPart.subsystem] || '#7a8a82') : '#7a8a82'

  return (
    <div style={{
      background: '#191c1a',
      border: `1.5px solid ${subColor}30`,
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '10px 14px',
        borderBottom: '1px solid #2e3330',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ConfidencePip level={part.confidence} />
          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#dde8e2' }}>
            {part.name}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          {part.refNumber && (
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              color: '#f59e0b',
              fontFamily: "'SF Mono', monospace",
              background: 'rgba(245,158,11,0.10)',
              padding: '2px 7px',
              borderRadius: 4,
            }}>
              {part.refNumber}
            </span>
          )}
          {dbPart && (
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              color: subColor,
              background: subColor + '18',
              padding: '2px 7px',
              borderRadius: 4,
            }}>
              {dbPart.subsystem}
            </span>
          )}
        </div>
      </div>

      {/* Notes */}
      <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {part.crossSectionNote && (
          <div style={{ fontSize: '0.78rem', color: '#a5b4fc', lineHeight: 1.5 }}>
            <span style={{ fontWeight: 700, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#818cf8', marginRight: 6 }}>
              In the drawing
            </span>
            {part.crossSectionNote}
          </div>
        )}
        {part.physicalNote && (
          <div style={{ fontSize: '0.78rem', color: '#86efac', lineHeight: 1.5 }}>
            <span style={{ fontWeight: 700, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#22c55e', marginRight: 6 }}>
              In your hand
            </span>
            {part.physicalNote}
          </div>
        )}
        {part.locationNote && (
          <div style={{ fontSize: '0.78rem', color: '#b0bdb7', lineHeight: 1.5 }}>
            <span style={{ fontWeight: 700, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#7a8a82', marginRight: 6 }}>
              Location
            </span>
            {part.locationNote}
          </div>
        )}

        {/* DB cross-link */}
        {dbPart && (
          <div style={{
            marginTop: 4,
            padding: '8px 10px',
            background: subColor + '0a',
            border: `1px solid ${subColor}25`,
            borderRadius: 8,
            fontSize: '0.72rem',
            color: '#7a8a82',
            lineHeight: 1.5,
          }}>
            <span style={{ color: subColor, fontWeight: 600 }}>Database match: </span>
            {dbPart.physical.shape}
          </div>
        )}
      </div>
    </div>
  )
}

export default function CameraDecode({ onBack }) {
  const [preview, setPreview] = useState(null)
  const [imageData, setImageData] = useState(null)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [result, setResult] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const fileRef = useRef(null)

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setStatus('idle')
    setResult(null)
    const processed = await resizeImage(file)
    setPreview(processed.previewUrl)
    setImageData({ base64: processed.base64, mediaType: processed.mediaType })
  }

  async function handleDecode() {
    if (!imageData) return
    setStatus('loading')
    setResult(null)
    setErrorMsg('')
    try {
      const res = await fetch(`${WORKER_URL}/decode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imageData.base64,
          mediaType: imageData.mediaType,
          query: query.trim() || undefined,
        }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `HTTP ${res.status}`)
      }
      const data = await res.json()
      setResult(data)
      setStatus('done')
    } catch (e) {
      setErrorMsg(e.message || 'Something went wrong')
      setStatus('error')
    }
  }

  function handleRetake() {
    setPreview(null)
    setImageData(null)
    setResult(null)
    setStatus('idle')
    setErrorMsg('')
    if (fileRef.current) fileRef.current.value = ''
  }

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
          marginBottom: 14,
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <polyline points="9,2 4,7 9,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back
      </button>

      {/* Title */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#dde8e2', marginBottom: 4 }}>
          Drawing Decode
        </h2>
        <p style={{ fontSize: '0.78rem', color: '#7a8a82', lineHeight: 1.5 }}>
          Photo a drawing or part — Claude will identify it and explain what it is.
        </p>
      </div>

      {/* Image capture / preview */}
      {!preview ? (
        <div style={{ marginBottom: 14 }}>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFile}
            style={{ display: 'none' }}
            id="camera-input"
          />
          <label
            htmlFor="camera-input"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              padding: '32px 20px',
              borderRadius: 14,
              border: '2px dashed #2e3330',
              background: '#191c1a',
              cursor: 'pointer',
              minHeight: 160,
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect x="4" y="10" width="32" height="24" rx="4" stroke="#f59e0b" strokeWidth="2"/>
              <circle cx="20" cy="22" r="7" stroke="#f59e0b" strokeWidth="2"/>
              <circle cx="20" cy="22" r="3" fill="#f59e0b" opacity="0.4"/>
              <path d="M14 10 L16 6 H24 L26 10" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="32" cy="14" r="2" fill="#f59e0b"/>
            </svg>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#dde8e2', marginBottom: 4 }}>
                Take a Photo or Upload
              </div>
              <div style={{ fontSize: '0.75rem', color: '#7a8a82' }}>
                Drawing cross-section, exploded view, or part in hand
              </div>
            </div>
          </label>

          {/* Also allow re-upload without camera */}
          <label
            htmlFor="camera-input-gallery"
            style={{ display: 'block', marginTop: 8 }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              style={{ display: 'none' }}
              id="camera-input-gallery"
            />
            <div style={{
              textAlign: 'center',
              fontSize: '0.75rem',
              color: '#404d47',
              padding: '6px',
              cursor: 'pointer',
            }}>
              or choose from gallery
            </div>
          </label>
        </div>
      ) : (
        <div style={{ marginBottom: 14 }}>
          <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', marginBottom: 8 }}>
            <img
              src={preview}
              alt="Selected"
              style={{ width: '100%', display: 'block', maxHeight: 280, objectFit: 'contain', background: '#0d0f0e' }}
            />
            <button
              onClick={handleRetake}
              style={{
                position: 'absolute',
                top: 8, right: 8,
                padding: '6px 10px',
                borderRadius: 8,
                border: '1px solid #2e3330',
                background: 'rgba(10,12,11,0.85)',
                color: '#7a8a82',
                fontSize: '0.72rem',
                fontWeight: 600,
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              Retake
            </button>
          </div>
        </div>
      )}

      {/* Optional query */}
      {preview && (
        <div style={{ marginBottom: 14 }}>
          <input
            type="text"
            placeholder='Optional: "what is ref 17B?" or "identify the seal parts"'
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 10,
              border: '1.5px solid #2e3330',
              background: '#191c1a',
              color: '#dde8e2',
              fontSize: '0.85rem',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      )}

      {/* Decode button */}
      {preview && status !== 'loading' && (
        <button
          onClick={handleDecode}
          style={{
            width: '100%',
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
            gap: 8,
            minHeight: 52,
            marginBottom: 16,
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="2"/>
            <line x1="12" y1="12" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Decode Drawing
        </button>
      )}

      {/* Loading */}
      {status === 'loading' && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          padding: '28px 0',
          marginBottom: 16,
        }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
            <circle cx="18" cy="18" r="15" stroke="#2e3330" strokeWidth="3"/>
            <path d="M18 3 A15 15 0 0 1 33 18" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          <div style={{ fontSize: '0.82rem', color: '#7a8a82' }}>Analysing image…</div>
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div style={{
          background: 'rgba(239,68,68,0.06)',
          border: '1.5px solid rgba(239,68,68,0.25)',
          borderRadius: 12,
          padding: '14px',
          marginBottom: 16,
          fontSize: '0.82rem',
          color: '#fca5a5',
          lineHeight: 1.5,
        }}>
          <div style={{ fontWeight: 700, color: '#ef4444', marginBottom: 4, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            ⚠ Error
          </div>
          {errorMsg}
          <button
            onClick={handleDecode}
            style={{
              display: 'block',
              marginTop: 10,
              padding: '8px 14px',
              borderRadius: 8,
              border: '1px solid rgba(239,68,68,0.3)',
              background: 'transparent',
              color: '#fca5a5',
              fontSize: '0.78rem',
              fontWeight: 600,
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            Try again
          </button>
        </div>
      )}

      {/* Results */}
      {status === 'done' && result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 24 }}>
          {/* Meta */}
          <div style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            marginBottom: 4,
          }}>
            {result.drawingType && result.drawingType !== 'unknown' && (
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#818cf8',
                background: 'rgba(129,140,248,0.10)',
                padding: '3px 8px',
                borderRadius: 4,
              }}>
                {result.drawingType}
              </span>
            )}
            {result.pumpType && result.pumpType !== 'unknown' && (
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: '#22c55e',
                background: 'rgba(34,197,94,0.10)',
                padding: '3px 8px',
                borderRadius: 4,
              }}>
                {result.pumpType}
              </span>
            )}
          </div>

          {result.generalNote && (
            <div style={{
              padding: '10px 14px',
              background: 'rgba(129,140,248,0.06)',
              border: '1px solid rgba(129,140,248,0.15)',
              borderRadius: 10,
              fontSize: '0.78rem',
              color: '#a5b4fc',
              lineHeight: 1.55,
            }}>
              {result.generalNote}
            </div>
          )}

          {result.parts && result.parts.length > 0 ? (
            result.parts.map((p, i) => (
              <PartResultCard key={i} part={p} />
            ))
          ) : (
            <div style={{ fontSize: '0.82rem', color: '#7a8a82', textAlign: 'center', padding: '16px 0' }}>
              No parts identified. Try a clearer image or add a specific question above.
            </div>
          )}

          {/* Decode another */}
          <button
            onClick={handleRetake}
            style={{
              marginTop: 8,
              width: '100%',
              padding: '13px',
              borderRadius: 12,
              border: '1.5px solid #2e3330',
              background: '#191c1a',
              color: '#dde8e2',
              fontSize: '0.88rem',
              fontWeight: 700,
              minHeight: 48,
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            Decode Another
          </button>
        </div>
      )}
    </div>
  )
}
