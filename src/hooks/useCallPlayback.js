import { useCallback, useEffect, useRef, useState } from 'react';
import { useMotionValue } from 'framer-motion';

const WORD_MS = 340;

/** Estimated on-screen duration (ms) of a transcript line if no audio file exists. */
export const estimateLine = (line) =>
  line.speaker === 'system' ? 1400 : Math.max(1600, line.text.split(/\s+/).length * WORD_MS);

export const estimateScript = (lines) => lines.reduce((sum, l) => sum + estimateLine(l), 0);

const AGENT_PREFS = ['Samantha', 'Google US English', 'Microsoft Aria', 'Microsoft Jenny', 'Microsoft Zira', 'Karen', 'Serena'];
const PATIENT_MALE_PREFS = ['Daniel', 'Google UK English Male', 'Microsoft Guy', 'Microsoft David', 'Alex', 'Fred', 'Tom'];
const PATIENT_FEMALE_PREFS = ['Victoria', 'Google UK English Female', 'Microsoft Zira', 'Karen', 'Samantha', 'Serena', 'Microsoft Jenny'];

function pickVoice(voices, prefs, exclude) {
  const en = voices.filter((v) => v.lang?.toLowerCase().startsWith('en'));
  for (const p of prefs) {
    const match = en.find((v) => v.name.includes(p) && v !== exclude);
    if (match) return match;
  }
  return en.find((v) => v !== exclude) || en[0] || null;
}

/**
 * Plays a scripted call.
 * 1. Primary: Uses high-definition pre-generated ElevenLabs audio files (HTML5 Audio).
 * 2. Fallback: Browser's Web Speech API if audio files are not yet generated or fail to load.
 * 3. Silent simulation: Runs accurately if muted or audio is unsupported.
 */
export function useCallPlayback() {
  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [status, setStatus] = useState('idle'); // idle | playing | paused | done
  const [lineIndex, setLineIndex] = useState(-1);
  const [speaker, setSpeaker] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [isRealAudio, setIsRealAudio] = useState(false);
  const progress = useMotionValue(0);

  const session = useRef(0);
  const timer = useRef(0);
  const raf = useRef(0);
  const currentAudio = useRef(null);
  const voices = useRef([]);
  const mutedRef = useRef(muted);

  useEffect(() => {
    mutedRef.current = muted;
    if (currentAudio.current) {
      currentAudio.current.muted = muted;
    }
    if (muted && speechSupported) {
      window.speechSynthesis.cancel();
    }
  }, [muted, speechSupported]);

  const halt = useCallback(() => {
    session.current += 1;
    clearTimeout(timer.current);
    cancelAnimationFrame(raf.current);
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current.src = '';
      currentAudio.current = null;
    }
    if (speechSupported) window.speechSynthesis.cancel();
  }, [speechSupported]);

  useEffect(() => {
    if (!speechSupported) return undefined;
    const load = () => { voices.current = window.speechSynthesis.getVoices(); };
    load();
    window.speechSynthesis.addEventListener?.('voiceschanged', load);
    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', load);
      halt();
    };
  }, [speechSupported, halt]);

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
          const currentProgress = currentAudio.current && currentAudio.current.duration
            ? offsets[i] + (currentAudio.current.currentTime * 1000)
            : offsets[i] + Math.min(durations[i] * 0.98, performance.now() - start);

          progress.set(Math.min(1, currentProgress / total));
          const s = Math.floor(currentProgress / 1000);
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
          timer.current = setTimeout(() => run(i + 1), 320);
        };

        // System lines are silent UI updates (e.g. PMS write-back)
        if (line.speaker === 'system' || mutedRef.current) {
          timer.current = setTimeout(next, durations[i]);
          return;
        }

        // 1. Try real recorded ElevenLabs audio if URL is provided
        if (line.audioUrl) {
          const audio = new Audio(line.audioUrl);
          currentAudio.current = audio;
          audio.muted = mutedRef.current;

          let hasStarted = false;

          audio.onplay = () => {
            hasStarted = true;
            setIsRealAudio(true);
          };

          audio.onended = () => {
            currentAudio.current = null;
            next();
          };

          audio.onerror = () => {
            // If real audio file isn't found (e.g. 404 before generation), fallback to browser speech
            setIsRealAudio(false);
            if (!hasStarted) {
              fallbackToSpeech();
            } else {
              next();
            }
          };

          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Browser autoplay blocked or file missing -> fallback
              fallbackToSpeech();
            });
          }
          return;
        }

        // 2. Fallback to Web Speech API
        function fallbackToSpeech() {
          if (!speechSupported) {
            timer.current = setTimeout(next, durations[i]);
            return;
          }

          const u = new SpeechSynthesisUtterance(line.text);
          const agentVoice = pickVoice(voices.current, AGENT_PREFS);
          const patientPrefs = line.gender === 'female' ? PATIENT_FEMALE_PREFS : PATIENT_MALE_PREFS;
          const voice = line.speaker === 'agent' ? agentVoice : pickVoice(voices.current, patientPrefs, agentVoice);
          if (voice) u.voice = voice;
          u.lang = voice?.lang || 'en-US';
          u.rate = line.speaker === 'agent' ? 1.04 : 1;
          u.pitch = line.speaker === 'agent' ? 1.08 : (line.gender === 'female' ? 1.05 : 0.88);
          u.onend = next;
          u.onerror = next;
          timer.current = setTimeout(next, durations[i] * 2.6 + 1500);
          window.speechSynthesis.speak(u);
        }

        fallbackToSpeech();
      };

      run(from);
    },
    [halt, progress, speechSupported]
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

  return {
    status,
    lineIndex,
    speaker,
    elapsed,
    progress,
    play,
    pause,
    stop,
    muted,
    setMuted,
    supported: speechSupported,
    isRealAudio,
  };
}
