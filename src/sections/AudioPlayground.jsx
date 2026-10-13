import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AudioLines, Bot, CircleCheck, Headphones, Pause, Play, RotateCcw, User, Volume2, VolumeX } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import Waveform from '../components/Waveform';
import { LiveDot, Reveal, SectionHeading } from '../components/ui';
import { SCENARIOS } from '../data/scenarios';
import { estimateScript, useCallPlayback } from '../hooks/useCallPlayback';

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export default function AudioPlayground({ autoplayToken }) {
  const [activeId, setActiveId] = useState(SCENARIOS[0].id);
  const scenario = SCENARIOS.find((s) => s.id === activeId);
  const pb = useCallPlayback();
  const { play, stop } = pb;
  const transcriptRef = useRef(null);
  const totalSec = useMemo(() => Math.round(estimateScript(scenario.lines) / 1000), [scenario]);

  // "Listen to Audio Sample" in hero
  useEffect(() => {
    if (!autoplayToken) return;
    setActiveId(SCENARIOS[0].id);
    play(SCENARIOS[0].lines);
  }, [autoplayToken, play]);

  // keep transcript pinned to latest line (without scrolling the page)
  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [pb.lineIndex]);

  const select = (s) => {
    setActiveId(s.id);
    play(s.lines);
  };

  const toggle = () => {
    if (pb.status === 'playing') pb.pause();
    else if (pb.status === 'paused') play(scenario.lines, Math.max(0, pb.lineIndex));
    else play(scenario.lines);
  };

  const visible = pb.status === 'idle' ? [] : scenario.lines.slice(0, pb.lineIndex + 1);
  const speaking = pb.status === 'playing' && pb.speaker && pb.speaker !== 'system';
  const isPlaying = pb.status === 'playing';

  return (
    <section id="demo" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Audio Playground"
          icon={Headphones}
          title={<>Hear VocoRx <span className="text-brand-gradient">handle real pharmacy calls</span></>}
          description="Toggle between automated call scenarios to hear how the agent verifies identity, syncs prescriptions, and escalates clinical questions."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[minmax(0,360px)_1fr]">
          {/* scenario list */}
          <Reveal className="flex flex-col gap-3" y={16}>
            {SCENARIOS.map((s) => {
              const active = s.id === activeId;
              return (
                <motion.button
                  key={s.id}
                  onClick={() => select(s)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-colors ${
                    active ? 'border-brand-cyan/50 bg-brand-cyan/[0.08]' : 'border-white/[0.06] bg-slate-card/50 hover:border-brand-cyan/30'
                  }`}
                >
                  {active && <motion.span layoutId="scenario-glow" className="absolute inset-y-3 left-0 w-1 rounded-r-full bg-linear-to-b from-brand-teal to-brand-cyan shadow-[0_0_12px_#00E5FF]" />}
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ring-1 transition ${active ? 'bg-brand-cyan/15 ring-brand-cyan/50' : 'bg-white/[0.03] ring-white/10 group-hover:ring-brand-cyan/30'}`}>
                    <s.icon className={`h-5 w-5 ${active ? 'text-brand-cyan' : 'text-silver group-hover:text-brand-cyan'}`} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-white">{s.title}</span>
                    <span className="block truncate text-xs text-silver">{s.subtitle}</span>
                  </span>
                  <span className="shrink-0">
                    {active && isPlaying ? (
                      <AudioLines className="h-5 w-5 animate-pulse text-brand-cyan" />
                    ) : (
                      <Play className="h-4 w-4 text-silver/60 transition group-hover:text-brand-cyan" />
                    )}
                  </span>
                </motion.button>
              );
            })}
            <p className="px-1 pt-2 text-xs leading-relaxed text-silver/60">
              {pb.supported
                ? "Demo voice uses your browser's speech engine to approximate VocoRx's neural voice. Patient data is fictional."
                : 'Audio is unavailable in this browser — the call runs as a silent visual simulation. Patient data is fictional.'}
            </p>
          </Reveal>

          {/* player */}
          <Reveal delay={0.1} y={16}>
            <SpotlightCard className="p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-cyan">
                    {isPlaying ? <LiveDot /> : <span className="h-2 w-2 rounded-full bg-silver/40" />}
                    {isPlaying ? 'Call in progress' : pb.status === 'done' ? 'Call completed' : pb.status === 'paused' ? 'Paused' : 'Ready'}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-white">{scenario.title}</h3>
                  <p className="text-sm text-silver">{scenario.pharmacy} → {scenario.patient}</p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-silver">Voice: Ava · Neural</span>
                  <span className="rounded-full border border-brand-teal/30 bg-brand-teal/10 px-2.5 py-1 text-brand-teal">HIPAA</span>
                </div>
              </div>

              {/* visualizer */}
              <div className="relative mt-6 overflow-hidden rounded-2xl border border-brand-cyan/10 bg-abyss/70 px-4 py-6 sm:px-6">
                <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
                <div className="relative mb-3 flex items-center justify-between text-[11px] uppercase tracking-wider">
                  <span className={`flex items-center gap-1.5 ${speaking ? 'text-white' : 'text-silver/60'}`}>
                    {pb.speaker === 'patient' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5 text-brand-cyan" />}
                    {speaking ? (pb.speaker === 'agent' ? 'Agent' : 'Patient') : pb.speaker === 'system' ? 'Writing to PMS…' : 'Idle'}
                  </span>
                  <span className="font-mono text-silver/60 tabular-nums">{fmt(pb.elapsed)} / {fmt(totalSec)}</span>
                </div>
                <Waveform active={!!speaking} speaker={pb.speaker || 'agent'} bars={72} gap={3} className="relative h-28 sm:h-32" />
              </div>

              {/* controls */}
              <div className="mt-5 flex items-center gap-4">
                <motion.button
                  onClick={toggle}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-linear-to-br from-brand-teal to-brand-cyan text-midnight shadow-[0_0_28px_rgba(0,229,255,0.45)] transition-shadow hover:shadow-[0_0_44px_rgba(0,229,255,0.7)]"
                >
                  {isPlaying ? <Pause className="h-6 w-6" fill="currentColor" /> : <Play className="ml-0.5 h-6 w-6" fill="currentColor" />}
                </motion.button>
                <div className="flex-1">
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div style={{ scaleX: pb.progress }} className="h-full origin-left rounded-full bg-linear-to-r from-brand-teal to-brand-cyan" />
                  </div>
                </div>
                <motion.button
                  whileHover={{ rotate: -90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => { stop(); }}
                  aria-label="Reset"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-silver transition hover:border-brand-cyan/50 hover:text-white"
                >
                  <RotateCcw className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => pb.supported && pb.setMuted((m) => !m)}
                  disabled={!pb.supported}
                  aria-label={pb.muted ? 'Unmute' : 'Mute'}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-silver transition hover:border-brand-cyan/50 hover:text-white disabled:opacity-40"
                >
                  {pb.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </motion.button>
              </div>

              {/* transcript + outcomes */}
              <div className="mt-6 grid gap-4 md:grid-cols-[1fr_220px]">
                <div ref={transcriptRef} className="thin-scroll h-64 space-y-3 overflow-y-auto rounded-xl border border-white/5 bg-abyss/40 p-4" aria-live="polite">
                  {visible.length === 0 && (
                    <div className="grid h-full place-items-center text-center text-sm text-silver/60">
                      <div>
                        <AudioLines className="mx-auto mb-2 h-6 w-6 text-brand-cyan/60" />
                        Press play to start the simulated call.
                      </div>
                    </div>
                  )}
                  <AnimatePresence initial={false}>
                    {visible.map((l, i) => (
                      <motion.div
                        key={`${scenario.id}-${i}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${l.speaker === 'patient' ? 'justify-end' : 'justify-start'}`}
                      >
                        {l.speaker === 'system' ? (
                          <div className="flex w-full items-start gap-2 rounded-lg border border-brand-teal/25 bg-brand-teal/[0.08] px-3 py-2 font-mono text-[11.5px] text-brand-teal">
                            <CircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {l.text}
                          </div>
                        ) : (
                          <div
                            className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed transition-shadow ${
                              l.speaker === 'agent' ? 'rounded-tl-sm border border-brand-cyan/20 bg-brand-cyan/[0.08] text-white' : 'rounded-tr-sm bg-white/[0.06] text-white/90'
                            } ${i === pb.lineIndex && speaking ? 'shadow-[0_0_20px_rgba(0,229,255,0.25)]' : ''}`}
                          >
                            <span className={`mb-0.5 block text-[10px] font-semibold uppercase tracking-wider ${l.speaker === 'agent' ? 'text-brand-cyan' : 'text-silver'}`}>
                              {l.speaker === 'agent' ? 'VocoRx Agent' : scenario.patient}
                            </span>
                            {l.text}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="rounded-xl border border-white/5 bg-abyss/40 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-silver/70">Call outcomes</p>
                  <ul className="mt-3 space-y-2.5">
                    {scenario.outcomes.map((o, i) => {
                      const threshold = Math.floor(((i + 1) / scenario.outcomes.length) * (scenario.lines.length - 1));
                      const done = pb.status === 'done' || (pb.status !== 'idle' && pb.lineIndex > threshold);
                      return (
                        <li key={o} className={`flex items-center gap-2 text-sm transition-colors duration-500 ${done ? 'text-white' : 'text-silver/40'}`}>
                          <CircleCheck className={`h-4 w-4 shrink-0 transition-colors duration-500 ${done ? 'text-brand-teal' : 'text-silver/20'}`} />
                          {o}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
