const CLAUDE_MODEL = 'claude-sonnet-4-6'
const CLAUDE_API = 'https://api.anthropic.com/v1/messages'

const SYSTEM_PROMPT = `You are an expert industrial mechanic helping maintenance technicians identify parts in mechanical drawings and photographs.

When given an image of a mechanical drawing or photograph, identify what parts are visible. For each part found, respond with a JSON object in this exact format:
{
  "parts": [
    {
      "refNumber": "17B",
      "name": "Rotating Seal Face",
      "confidence": "high",
      "crossSectionNote": "appears as a small rectangle near the shaft centerline",
      "physicalNote": "precision-lapped flat ring, typically carbon or ceramic",
      "locationNote": "mounts on the shaft sleeve, rotates with the shaft"
    }
  ],
  "drawingType": "cross-section | exploded | photograph | unknown",
  "pumpType": "ansi-centrifugal | split-case | multistage | gear | aodd | unknown",
  "generalNote": "any overall context about the drawing or photograph"
}

Focus on ANSI centrifugal pump parts. Common reference numbers: 1 (casing), 2 (impeller), 4 (shaft), 5 (shaft sleeve), 12 (line bearing), 13 (thrust bearing), 14 (bearing housing), 17/17A/17B (seal components), 16 (gland), 18 (packing/rings), 19 (lantern ring).

Always respond with valid JSON only. No prose outside the JSON.`

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return corsResponse(null, 204, env)
    }

    if (request.method !== 'POST') {
      return corsResponse({ error: 'Method not allowed' }, 405, env)
    }

    const url = new URL(request.url)
    if (url.pathname !== '/decode') {
      return corsResponse({ error: 'Not found' }, 404, env)
    }

    let body
    try {
      body = await request.json()
    } catch {
      return corsResponse({ error: 'Invalid JSON body' }, 400, env)
    }

    const { image, mediaType, query } = body
    if (!image || !mediaType) {
      return corsResponse({ error: 'Missing image or mediaType' }, 400, env)
    }

    const userText = query
      ? `Please identify the parts in this image. The technician asks: "${query}"`
      : 'Please identify all parts visible in this image.'

    const claudeBody = {
      model: CLAUDE_MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: image },
            },
            { type: 'text', text: userText },
          ],
        },
      ],
    }

    let claudeRes
    try {
      claudeRes = await fetch(CLAUDE_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(claudeBody),
      })
    } catch (e) {
      return corsResponse({ error: 'Failed to reach Claude API' }, 502, env)
    }

    if (!claudeRes.ok) {
      const errText = await claudeRes.text()
      return corsResponse({ error: 'Claude API error', detail: errText }, claudeRes.status, env)
    }

    const claudeData = await claudeRes.json()
    const rawText = claudeData.content?.[0]?.text || '{}'

    let parsed
    try {
      parsed = JSON.parse(rawText)
    } catch {
      parsed = { parts: [], generalNote: rawText, drawingType: 'unknown', pumpType: 'unknown' }
    }

    return corsResponse(parsed, 200, env)
  },
}

function corsResponse(body, status, env) {
  const origin = env?.ALLOWED_ORIGIN || '*'
  const headers = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }
  return new Response(body !== null ? JSON.stringify(body) : null, { status, headers })
}
