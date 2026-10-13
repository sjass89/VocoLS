import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, CircleCheck, Gauge, PhoneCall, ShieldCheck, Target, User } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import Waveform from '../components/Waveform';
import { LiveDot } from '../components/ui';

const SCRIPT = [
  { speaker: 'agent', text: 'Hi Sarah, calling from Main St Pharmacy to confirm your 30-day refill... For your privacy, can you confirm your date of birth?' },
  { speaker: 'patient', text: 'Sure — March 14th, 1962.' },
  { speaker: 'agent', text: 'Thank you! Your lisinopril and atorvastatin are due. I can sync your metformin too, so all three are ready Thursday the 24th. Does that work?' },
  { speaker: 'patient', text: "That's perfect. Can I pick up after 5?" },
  { speaker: 'agent', text: "Done — pickup is set for 5:30 PM Thursday, and I've texted you a confirmation." },
  { speaker: 'system', text: 'PMS updated · 3 Rx synced · Pickup 10/24 · 5:30 PM' },
];

const TASKS = [
  { label: 'Identity verified (DOB)', at: 2 },
  { label: '3 prescriptions synchronized', at: 3 },
  { label: 'Pickup scheduled · Thu 10/24', at: 5 },
  { label: 'PMS write-back complete', at: 6 },
];

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export default function LiveAgentCard() {
  const [idx, setIdx] = useState(0);
  const [chars, setChars] = useState(0);
  const [latency, setLatency] = useState(482);
  const [seconds, setSeconds] = useState(0);

  const line = SCRIPT[idx];
  const typing = chars < line.text.length;
  const isLast = idx === SCRIPT.length - 1;
  const step = typing ? idx : idx + 1; // tasks complete after a line finishes

  // typewriter + script loop
  useEffect(() => {
    const t = typing
      ? setTimeout(() => setChars((c) => c + (line.speaker === 'system' ? 3 : 1)), line.speaker === 'agent' ? 22 : 30)
      : setTimeout(() => {
          if (isLast) { setIdx(0); setSeconds(0); } else setIdx((i) => i + 1);
          setChars(0);
        }, isLast ? 3800 : 900);
    return () => clearTimeout(t);
  }, [chars, typing, isLast, line.speaker]);

  // live metrics
  useEffect(() => {
    const a = setInterval(() => setLatency(380 + Math.round(Math.random() * 200)), 1300);
    const b = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);

  const history = SCRIPT.slice(Math.max(0, idx - 2), idx);
  const speaking = typing && line.speaker !== 'system';

  return (
    <div className="relative">
      {/* halo */}
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(0,229,255,0.18),transparent)] blur-2xl" />

      <SpotlightCard tilt maxTilt={5} className="p-5 shadow-[0_30px_80px_-30px_rgba(0,229,255,0.35)] sm:p-6">
        {/* header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-linear-to-br from-brand-teal/25 to-brand-cyan/10 ring-1 ring-brand-cyan/30">
              <PhoneCall className="h-5 w-5 text-brand-cyan" />
            </div>
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-cyan">
                <LiveDot /> Live Agent Simulation
              </p>
              <p className="text-sm text-white">Outbound MedSync · Sarah M. · ***-4821</p>
            </div>
          </div>
          <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-white tabular-nums">{fmt(seconds)}</span>
        </div>

        {/* waveform */}
        <div className="mt-5 rounded-xl border border-brand-cyan/10 bg-abyss/60 px-4 py-3">
          <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-wider">
            <span className={`flex items-center gap-1.5 ${speaking ? 'text-white' : 'text-silver/60'}`}>
              {line.speaker === 'patient' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5 text-brand-cyan" />}
              {speaking ? (line.speaker === 'agent' ? 'VocoRx Agent speaking' : 'Patient speaking') : 'Listening…'}
            </span>
            <span className="text-silver/60">16 kHz · Opus</span>
          </div>
          <Waveform active={speaking} speaker={line.speaker} bars={44} className="h-14" />
        </div>

        {/* transcript */}
        <div className="mt-4 flex h-[176px] flex-col justify-end gap-2.5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_22%)]" aria-live="polite">
          <AnimatePresence initial={false}>
            {history.map((l, i) => (
              <Bubble key={`line-${idx - history.length + i}`} line={l} faded />
            ))}
            <Bubble key={`line-${idx}`} line={{ ...line, text: line.text.slice(0, chars) }} cursor={typing} />
          </AnimatePresence>
        </div>

        {/* tasks */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {TASKS.map((t) => {
            const done = step >= t.at;
            return (
              <div
                key={t.label}
                className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[11.5px] transition-all duration-500 ${
                  done ? 'border-brand-teal/30 bg-brand-teal/[0.07] text-white' : 'border-white/5 bg-white/[0.02] text-silver/60'
                }`}
              >
                <CircleCheck className={`h-3.5 w-3.5 shrink-0 transition-colors ${done ? 'text-brand-teal' : 'text-silver/30'}`} />
                <span className="truncate">{t.label}</span>
              </div>
            );
          })}
        </div>

        {/* metrics */}
        <div className="mt-4 grid grid-cols-3 divide-x divide-brand-cyan/10 rounded-xl border border-brand-cyan/10 bg-abyss/50">
          <Metric icon={Gauge} label="Latency" value={<><span className="text-brand-cyan">{latency}</span>ms</>} sub="< 600ms target" />
          <Metric icon={ShieldCheck} label="Compliance" value="HIPAA" sub="PHI encrypted" />
          <Metric icon={Target} label="Task Completion" value="99.2%" sub="trailing 30 days" />
        </div>
      </SpotlightCard>

      {/* floating chips */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1 }}
        className="glass absolute -right-3 -top-5 hidden animate-float rounded-xl px-3.5 py-2.5 text-xs sm:block lg:-right-8"
      >
        <p className="text-silver">Staff hours saved today</p>
        <p className="font-display text-lg font-semibold text-white">+4.2 hrs</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3 }}
        className="glass absolute -bottom-6 -left-3 hidden items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs [animation-delay:1.5s] sm:flex lg:-left-10 animate-float"
      >
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-teal/15"><CircleCheck className="h-4 w-4 text-brand-teal" /></span>
        <div>
          <p className="text-silver">Calls completed</p>
          <p className="font-semibold text-white">1,284 this week</p>
        </div>
      </motion.div>
    </div>
  );
}

function Bubble({ line, faded, cursor }) {
  const isAgent = line.speaker === 'agent';
  const isSystem = line.speaker === 'system';
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: faded ? 0.5 : 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className={`flex ${isAgent || isSystem ? 'justify-start' : 'justify-end'}`}
    >
      {isSystem ? (
        <div className="flex w-full items-center gap-2 rounded-lg border border-brand-teal/25 bg-brand-teal/[0.08] px-3 py-2 font-mono text-[11px] text-brand-teal">
          <CircleCheck className="h-3.5 w-3.5 shrink-0" /> {line.text}
        </div>
      ) : (
        <div
          className={`max-w-[88%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${
            isAgent ? 'rounded-tl-sm border border-brand-cyan/20 bg-brand-cyan/[0.08] text-white' : 'rounded-tr-sm bg-white/[0.06] text-white/90'
          }`}
        >
          <span className={`mb-0.5 block text-[10px] font-semibold uppercase tracking-wider ${isAgent ? 'text-brand-cyan' : 'text-silver'}`}>
            {isAgent ? 'VocoRx Agent' : 'Sarah'}
          </span>
          {line.text}
          {cursor && <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-brand-cyan" />}
        </div>
      )}
    </motion.div>
  );
}

function Metric({ icon: Icon, label, value, sub }) {
  return (
    <div className="px-3 py-3">
      <p className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-silver/70">
        <Icon className="h-3 w-3" /> {label}
      </p>
      <p className="mt-1 font-display text-base font-semibold text-white tabular-nums sm:text-lg">{value}</p>
      <p className="text-[10px] text-silver/60">{sub}</p>
    </div>
  );
}
