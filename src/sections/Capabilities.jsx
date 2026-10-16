import { motion } from 'framer-motion';
import { ArrowRightLeft, BellRing, Bot, CalendarCheck, Database, PhoneCall, Sparkles, Stethoscope, UserRound } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import { Reveal, SectionHeading } from '../components/ui';

function PersistenceVisual() {
  const attempts = [
    { name: 'Attempt #1–3 (Insured)', from: 'No Answer' },
    { name: 'Attempt #4–6 (Shifted)', from: 'Voicemail' },
    { name: 'Attempt #7 (Evening)', from: 'Dialing' },
  ];
  return (
    <div className="space-y-2">
      {attempts.map((r, i) => (
        <div key={r.name} className="flex min-w-0 items-center gap-2 text-xs sm:gap-3">
          <PhoneCall className="h-3.5 w-3.5 shrink-0 text-brand-cyan" />
          <span className="min-w-0 flex-1 truncate text-white sm:w-36 sm:flex-none">{r.name}</span>
          <span className="shrink-0 font-mono text-[11px] text-silver/50 line-through sm:text-xs">{r.from}</span>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
            className="hidden h-px flex-1 origin-left bg-linear-to-r from-brand-cyan/10 to-brand-cyan/60 sm:block"
          />
          <span className="shrink-0 rounded-md border border-brand-teal/30 bg-brand-teal/10 px-1.5 py-0.5 font-mono text-[11px] text-brand-teal sm:text-xs">
            {i === 2 ? 'REACHED' : 'Retry'}
          </span>
        </div>
      ))}
    </div>
  );
}

function FollowUpVisual() {
  const items = [
    { t: 'Q1: Any hospitalizations? → “Yes, last month.”', s: 'Core Question · Triggered Branch' },
    { t: 'Follow-up: Facility, Physician, Diagnosis & Rx captured', s: 'Dynamic Clinical Drill-Down · 100% Complete' },
  ];
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <motion.div
          key={it.t}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.2 }}
          className="flex min-w-0 items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2"
        >
          <BellRing className="h-3.5 w-3.5 shrink-0 text-brand-cyan" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-white">{it.t}</p>
            <p className="truncate text-[10px] text-silver/70">{it.s}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function TriageVisual() {
  return (
    <div className="flex min-w-0 items-center justify-between gap-2 pb-2 text-xs">
      <div className="flex shrink-0 flex-col items-center gap-1.5">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-cyan/10 ring-1 ring-brand-cyan/30"><Bot className="h-5 w-5 text-brand-cyan" /></span>
        <span className="text-silver">VocoLS AI</span>
      </div>
      <div className="relative h-px min-w-0 flex-1 bg-brand-cyan/20">
        <motion.span
          animate={{ left: ['0%', '100%'] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-cyan shadow-[0_0_12px_#00E5FF]"
        />
        <span className="absolute left-1/2 top-2 -translate-x-1/2 whitespace-nowrap rounded bg-amber-400/10 px-1.5 py-0.5 text-[10px] text-amber-300">Cascade / Alert</span>
      </div>
      <div className="flex shrink-0 flex-col items-center gap-1.5">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-teal/10 ring-1 ring-brand-teal/30"><UserRound className="h-5 w-5 text-brand-teal" /></span>
        <span className="text-silver">Case Mgr</span>
      </div>
    </div>
  );
}

function PortfolioSyncVisual() {
  return (
    <div className="flex min-w-0 items-center justify-between gap-2 text-xs sm:gap-3">
      <div className="min-w-0 flex-1 rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-2 sm:px-3">
        <p className="truncate text-[10px] uppercase tracking-wider text-silver/70">Servicer DB</p>
        <p className="truncate font-mono text-white">Pol #LS-9042 · due</p>
      </div>
      <motion.div className="shrink-0" animate={{ rotate: [0, 180, 360] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
        <ArrowRightLeft className="h-4 w-4 text-brand-cyan" />
      </motion.div>
      <div className="min-w-0 flex-1 rounded-lg border border-brand-cyan/20 bg-brand-cyan/[0.06] px-2.5 py-2 sm:px-3">
        <p className="truncate text-[10px] uppercase tracking-wider text-brand-cyan/80">VocoLS</p>
        <p className="truncate font-mono text-white">verified · APS ready</p>
      </div>
    </div>
  );
}

const CAPABILITIES = [
  {
    icon: CalendarCheck,
    tag: 'Zero Attempt Caps',
    title: 'Relentless "Call-Until-Reached" Persistence',
    text: 'Where standard tracking stops after 3 attempts, VocoLS continues calling across optimized time-of-day and day-of-week windows until the insured or designated contact is reached live.',
    chips: ['Unlimited attempts', 'Smart time-shifting', 'Designated contact cascade'],
    Visual: PersistenceVisual,
  },
  {
    icon: Stethoscope,
    tag: '100% Question Depth',
    title: 'Dynamic Clinical & Follow-Up Questioning',
    text: 'Never accepts vague answers. When an insured mentions a doctor visit, hospital stay, or therapy change, the AI automatically asks every required follow-up question to capture physician names, dates, and diagnoses.',
    chips: ['Mandatory script enforcement', 'Multi-level follow-ups', 'APS physician capture'],
    Visual: FollowUpVisual,
  },
  {
    icon: BellRing,
    tag: 'Cascade & Triage',
    title: 'Designated Contact & Mortality Escalation',
    text: 'Seamlessly pivots to authorized family members, POAs, or designated contacts when needed—and immediately alerts servicing teams or warm-transfers sensitive bereavement and claim events.',
    chips: ['Authorized contact tree', 'Warm human transfer', 'Immediate claim alerts'],
    Visual: TriageVisual,
  },
  {
    icon: Database,
    tag: 'Fund & Servicer Sync',
    title: 'Audit-Ready Servicing & Investor Reporting',
    text: 'Delivers time-stamped audio recordings, full transcripts, structured health deltas, and updated contact trees directly into life settlement maintenance platforms and fund data rooms.',
    chips: ['REST / SFTP sync', 'Structured health deltas', 'Valuation & LE ready'],
    Visual: PortfolioSyncVisual,
  },
];

export default function Capabilities() {
  return (
    <section id="tracking" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Persistent Insured Tracking"
          icon={Sparkles}
          title={<>Purpose-built for <span className="text-brand-gradient">life settlement servicing &amp; funds</span></>}
          description="Engineered specifically for life settlement maintenance companies, institutional funds, and portfolio investors—combining limitless dialing persistence with clinical-grade questioning."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="min-w-0">
              <SpotlightCard tilt maxTilt={4} className="group h-full min-w-0 p-6 sm:p-8">
                <div className="flex h-full min-w-0 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-brand-teal/20 to-brand-cyan/5 ring-1 ring-brand-cyan/25 transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(0,229,255,0.4)] group-hover:ring-brand-cyan/60">
                      <c.icon className="h-6 w-6 text-brand-cyan" />
                    </span>
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-silver">{c.tag}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-white">{c.title}</h3>
                  <p className="mt-2 leading-relaxed text-silver">{c.text}</p>
                  <div className="mt-6 min-w-0 overflow-hidden rounded-xl border border-brand-cyan/10 bg-abyss/50 p-3.5 sm:p-4">
                    <c.Visual />
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {c.chips.map((chip) => (
                      <span
                        key={chip}
                        className="cursor-default rounded-full border border-brand-cyan/15 bg-brand-cyan/[0.04] px-3 py-1 text-xs text-silver transition-all hover:-translate-y-0.5 hover:border-brand-cyan/50 hover:text-white"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
