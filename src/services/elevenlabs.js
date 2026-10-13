/**
 * Client service for ElevenLabs Text-to-Speech integration.
 * Makes calls through the secure /api/tts backend proxy so keys are never exposed in browser bundles.
 */

export const VOICES = {
  AVA_LUCY: 'r5iFzIytiA1rzjhWFCjW', // Lucy - Friendly, Relaxed & Thoughtful (Ava Agent)
  PATIENT_JOSH: 'ZoiZ8fuDWInAcwPXaVeq', // Josh - Warm, Smooth and Steady (Male Patient)
  PATIENT_FEMALE: '56AoDkrOh6qfVPDXZ7Pt', // Cassidy - Crisp, Direct and Clear (Female Patient)
};

const audioCache = new Map();

/**
 * Synthesizes text to speech using ElevenLabs and returns a playable Blob URL.
 * Automatically caches results in memory.
 */
export async function synthesizeSpeech(text, voiceId = VOICES.AVA_LUCY) {
  const cacheKey = `${voiceId}:${text}`;
  if (audioCache.has(cacheKey)) {
    return audioCache.get(cacheKey);
  }

  const response = await fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voiceId }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Speech synthesis failed' }));
    throw new Error(err.error || 'Speech synthesis failed');
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  audioCache.set(cacheKey, url);
  return url;
}

/**
 * One-line helper to synthesize and immediately play speech.
 */
export async function playSpeech(text, voiceId = VOICES.AVA_LUCY) {
  const url = await synthesizeSpeech(text, voiceId);
  const audio = new Audio(url);
  await audio.play();
  return audio;
}
