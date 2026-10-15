/**
 * Client service for ElevenLabs Text-to-Speech integration.
 * Makes calls through the secure /api/tts backend proxy so keys are never exposed in browser bundles.
 */

export const VOICES = {
  AVA_AGENT: 'OYq3gdwlWVVaI8ECjSk1', // Female Agent (Briseida)
  INSURED_MALE: 'PXMcl9zGUnc9w7DofLWk', // Male Insured/Contact (Mark Vale)
  INSURED_FEMALE: 'lnnkVRtB3hSBA22O4kcA', // Female Insured/Contact (Lina)
};

const audioCache = new Map();

/**
 * Synthesizes text to speech using ElevenLabs and returns a playable Blob URL.
 * Automatically caches results in memory.
 */
export async function synthesizeSpeech(text, voiceId = VOICES.AVA_AGENT) {
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
export async function playSpeech(text, voiceId = VOICES.AVA_AGENT) {
  const url = await synthesizeSpeech(text, voiceId);
  const audio = new Audio(url);
  await audio.play();
  return audio;
}
