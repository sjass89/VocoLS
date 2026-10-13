import { useCallback, useEffect, useRef, useState } from 'react';
import { useMotionValue } from 'framer-motion';

const WORD_MS = 340;

/** Estimated on-screen duration (ms) of a transcript line. */
export const estimateLine = (line) =>
  line.speaker === 'system' ? 1400 : Math.max(1600, line.text.split(/\s+/).length * WORD_MS);

export const estimateScript = (lines) => lines.reduce((sum, l) => sum + estimateLine(l), 0);

const AGENT_PREFS = ['Samantha', 'Google US English', 'Microsoft Aria', 'Microsoft Jenny', 'Microsoft Zira', 'Karen', 'Serena'];
const PATIENT_PREFS = ['Daniel', 'Google UK English Male', 'Microsoft Guy', 'Microsoft David', 'Alex', 'Fred', 'Tom'];

function pickVoice(voices, prefs, exclude) {
  const en = voices.filter((v) => v.lang?.toLowerCase().startsWith('en'));
  for (const p of prefs) {
    const match = en.find((v) => v.name.includes(p) && v !== exclude);
    if (match) return match;
  }
  return en.find((v) => v !== exclude) || en[0] || null;
}

/**
 * Plays a scripted call. Uses the browser's Web Speech API (two distinct voices)
 * when available and unmuted; otherwise runs a timed "silent" simulation so the
 * UI (waveform, transcript, progress) always works out of the box.
 *
 * To use real recorded audio, swap the utterance block for an <audio> element per line.
 */
export function useCallPlayback() {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [status, setStatus] = useState('idle'); // idle | playing | paused | done
  const [lineIndex, setLineIndex] = useState(-1);
  const [speaker, setSpeaker] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(!supported);
  const progress = useMotionValue(0);

  const session = useRef(0);
  const timer = useRef(0);
  const raf = useRef(0);
  const voices = useRef([]);
  const mutedRef = useRef(muted);

  useEffect(() => {
    mutedRef.current = muted;
    if (muted && supported) window.speechSynthesis.cancel();
  }, [muted, supported]);

  const halt = useCallback(() => {
    session.current += 1;
    clearTimeout(timer.current);
    cancelAnimationFrame(raf.current);
    if (supported) window.speechSynthesis.cancel();
  }, [supported]);

  useEffect(() => {
    if (!supported) return undefined;
    const load = () => { voices.current = window.speechSynthesis.getVoices(); };
    load();
    window.speechSynthesis.addEventListener?.('voiceschanged', load);
    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', load);
      halt();
    };
  }, [supported, halt]);

  const play = useCallback(
    (lines, from = 0) => {
      halt();
      const id = session.current;
      const durations = lines.map(estimateLine);
      const total = durations.reduce((a, b) => a + b, 0);
      const offsets = durations.map((_, i) => durations.slice(0, i).reduce((a, b) => a + b, 0));
      setStatus('playing');

      const run = (i) => {
        if (id !== session.current) return;
        if (i >= lines.length) {
          setStatus('done');
          setSpeaker(null);
          progress.set(1);
          setElapsed(Math.round(total / 1000));
          return;
        }
        const line = lines[i];
        const start = performance.now();
        let finished = false;
        setLineIndex(i);
        setSpeaker(line.speaker);

        const tick = () => {
          if (id !== session.current) return;
          const ms = offsets[i] + Math.min(durations[i] * 0.98, performance.now() - start);
          progress.set(ms / total);
          const s = Math.floor(ms / 1000);
          setElapsed((prev) => (prev === s ? prev : s));
          raf.current = requestAnimationFrame(tick);
        };
        cancelAnimationFrame(raf.current);
        tick();

        const next = () => {
          if (finished || id !== session.current) return;
          finished = true;
          cancelAnimationFrame(raf.current);
          progress.set((offsets[i] + durations[i]) / total);
          setSpeaker(null);
          timer.current = setTimeout(() => run(i + 1), 380);
        };

        if (line.speaker === 'system' || mutedRef.current || !supported) {
          timer.current = setTimeout(next, durations[i]);
          return;
        }

        const u = new SpeechSynthesisUtterance(line.text);
        const agentVoice = pickVoice(voices.current, AGENT_PREFS);
        const voice = line.speaker === 'agent' ? agentVoice : pickVoice(voices.current, PATIENT_PREFS, agentVoice);
        if (voice) u.voice = voice;
        u.lang = voice?.lang || 'en-US';
        u.rate = line.speaker === 'agent' ? 1.04 : 1;
        u.pitch = line.speaker === 'agent' ? 1.08 : 0.88;
        u.onend = next;
        u.onerror = next;
        // watchdog in case a browser never fires onend
        timer.current = setTimeout(next, durations[i] * 2.6 + 1500);
        window.speechSynthesis.speak(u);
      };

      run(from);
    },
    [halt, progress, supported]
  );

  const pause = useCallback(() => {
    halt();
    setStatus('paused');
    setSpeaker(null);
  }, [halt]);

  const stop = useCallback(() => {
    halt();
    setStatus('idle');
    setSpeaker(null);
    setLineIndex(-1);
    setElapsed(0);
    progress.set(0);
  }, [halt, progress]);

  return { status, lineIndex, speaker, elapsed, progress, play, pause, stop, muted, setMuted, supported };
}
