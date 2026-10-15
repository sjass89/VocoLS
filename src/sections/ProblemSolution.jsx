import { motion } from 'framer-motion';
import {
  ArrowRight, Bot, CalendarX, Clock, Flame, PackageX, PhoneOutgoing, RefreshCw, Smile, TrendingUp, TriangleAlert, Zap,
} from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import { Reveal, SectionHeading } from '../components/ui';

const PROBLEMS = [
  { icon: CalendarX, title: 'Arbitrary 3-to-4 attempt caps', text: 'Traditional tracking vendors give up after a handful of unanswered dials, marking policies "Unable to Reach" and leaving funds blind.' },
  { icon: PackageX, title: 'Skipped follow-up questions', text: 'Human call centers rush scripts—failing to drill into new physicians, facility addresses, or hospitalization details when health changes occur.' },
  { icon: Clock, title: 'Stale life expectancy & valuation data', text: 'Unreached insureds and incomplete medical updates delay Attending Physician Statements (APS) and distort portfolio IRR.' },
  { icon: Flame, title: 'High per-attempt servicing overhead', text: 'Maintenance companies burn analyst hours playing phone tag with elderly insureds and secondary contacts across time zones.' },
];

const SOLUTIONS = [
  { icon: PhoneOutgoing, title: 'Persistent "Call-Until-Reached" engine', text: 'Zero attempt caps. VocoLS intelligently varies call times, days, and designated contact cascades until a live voice is reached.' },
  { icon: RefreshCw, title: 'Mandatory + dynamic follow-up questioning', text: 'Always asks 100% of required verification questions and dynamically branches into granular clinical and physician follow-ups.' },
  { icon: TrendingUp, title: 'Instant APS & mortality event triggers', text: 'Automatically captures new doctor names, clinic locations, and hospital stays—or immediately escalates potential mortality events.' },
  { icon: Smile, title: 'Direct portfolio & servicing write-back', text: 'Structured transcripts, audio recordings, and updated contact hierarchies sync directly into your policy administration system.' },
];

export default function ProblemSolution() {
  return (
    <section id="platform" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="The Platform"
          icon={Zap}
          title={<>Capped attempts leave portfolios blind. <span className="text-brand-gradient">VocoLS calls until reached.</span></>}
          description="Life settlement maintenance companies, funds, and investors cannot afford 'No Contact' dispositions or half-answered health questionnaires. VocoLS turns insured outreach into a relentless, audit-grade workflow."
        />

        <div className="relative mt-16 grid gap-6 lg:grid-cols-2 lg:gap-10">
          {/* connector */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <motion.div
              animate={{ boxShadow: ['0 0 0 0 rgba(0,229,255,0.5)', '0 0 0 18px rgba(0,229,255,0)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="grid h-14 w-14 place-items-center rounded-full border border-brand-cyan/40 bg-midnight"
            >
              <ArrowRight className="h-6 w-6 text-brand-cyan" />
            </motion.div>
          </div>

          <Reveal>
            <div className="h-full rounded-[1.25rem] border border-rose-400/15 bg-slate-card/50 p-7 backdrop-blur-md sm:p-9">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/[0.07] px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-rose-300">
                  <TriangleAlert className="h-3.5 w-3.5" /> Legacy Tracking
                </span>
                <span className="font-mono text-xs text-silver/60">3-attempt cap</span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-white">Capped outreach leaves asset risk hidden.</h3>
              <ul className="mt-7 space-y-5">
                {PROBLEMS.map((p) => (
                  <li key={p.title} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-rose-400/10 ring-1 ring-rose-400/20">
                      <p.icon className="h-5 w-5 text-rose-300" />
                    </span>
                    <div>
                      <p className="font-medium text-white">{p.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-silver">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-xl border border-white/5 bg-abyss/50 p-4">
                <div className="flex items-center justify-between text-xs text-silver">
                  <span>Policies closed as &ldquo;Unreached&rdquo; after 3 tries</span><span className="font-mono text-rose-300">34% unverified</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '66%' }} viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeOut' }} className="h-full rounded-full bg-linear-to-r from-rose-500/70 to-rose-300" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <SpotlightCard className="h-full p-7 shadow-[0_0_80px_-30px_rgba(0,229,255,0.4)] sm:p-9">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/[0.08] px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-brand-cyan">
                  <Bot className="h-3.5 w-3.5" /> The VocoLS Engine
                </span>
                <span className="font-mono text-xs text-brand-teal">calls until reached</span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-white">Persistent AI that never stops at attempt #3.</h3>
              <ul className="mt-7 space-y-5">
                {SOLUTIONS.map((s) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-brand-teal/20 to-brand-cyan/10 ring-1 ring-brand-cyan/25">
                      <s.icon className="h-5 w-5 text-brand-cyan" />
                    </span>
                    <div>
                      <p className="font-medium text-white">{s.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-silver">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-xl border border-brand-cyan/10 bg-abyss/50 p-4">
                <div className="flex items-center justify-between text-xs text-silver">
                  <span>Live contact &amp; full follow-up completion</span><span className="font-mono text-brand-teal">99.4% verified</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '99%' }} viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeOut' }} className="h-full rounded-full bg-linear-to-r from-brand-teal to-brand-cyan" />
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
