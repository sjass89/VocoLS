import { motion } from 'framer-motion';
import { ArrowRightLeft, BellRing, Bot, CalendarCheck, Database, Pill, Sparkles, Stethoscope, UserRound } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import { Reveal, SectionHeading } from '../components/ui';

function MedSyncVisual() {
  const rx = [
    { name: 'Lisinopril', from: '10/19' },
    { name: 'Atorvastatin', from: '10/22' },
    { name: 'Metformin', from: '10/28' },
  ];
  return (
    <div className="space-y-2">
      {rx.map((r, i) => (
        <div key={r.name} className="flex items-center gap-3 text-xs">
          <Pill className="h-3.5 w-3.5 text-brand-cyan" />
          <span className="w-24 text-white">{r.name}</span>
          <span className="font-mono text-silver/50 line-through">{r.from}</span>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
            className="h-px flex-1 origin-left bg-linear-to-r from-brand-cyan/10 to-brand-cyan/60"
          />
          <span className="rounded-md border border-brand-teal/30 bg-brand-teal/10 px-1.5 py-0.5 font-mono text-brand-teal">10/24</span>
        </div>
      ))}
    </div>
  );
}

function RefillVisual() {
  const items = [
    { t: 'Refill ready — reply 1 to confirm', s: 'Outbound · SMS + Voice' },
    { t: '“Yes, refill my Synthroid.”', s: 'Inbound · authorized' },
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
          className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2"
        >
          <BellRing className="h-3.5 w-3.5 text-brand-cyan" />
          <div className="min-w-0">
            <p className="truncate text-xs text-white">{it.t}</p>
            <p className="text-[10px] text-silver/70">{it.s}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function TriageVisual() {
  return (
    <div className="flex items-center justify-between gap-2 text-xs">
      <div className="flex flex-col items-center gap-1.5">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-cyan/10 ring-1 ring-brand-cyan/30"><Bot className="h-5 w-5 text-brand-cyan" /></span>
        <span className="text-silver">AI Agent</span>
      </div>
      <div className="relative h-px flex-1 bg-brand-cyan/20">
        <motion.span
          animate={{ left: ['0%', '100%'] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-cyan shadow-[0_0_12px_#00E5FF]"
        />
        <span className="absolute left-1/2 top-2 -translate-x-1/2 whitespace-nowrap rounded bg-amber-400/10 px-1.5 py-0.5 text-[10px] text-amber-300">DDI detected</span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-teal/10 ring-1 ring-brand-teal/30"><UserRound className="h-5 w-5 text-brand-teal" /></span>
        <span className="text-silver">PharmD</span>
      </div>
    </div>
  );
}

function PmsVisual() {
  return (
    <div className="flex items-center justify-between gap-3 text-xs">
      <div className="flex-1 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
        <p className="text-[10px] uppercase tracking-wider text-silver/70">PMS</p>
        <p className="font-mono text-white">Rx#48213 · due</p>
      </div>
      <motion.div animate={{ rotate: [0, 180, 360] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
        <ArrowRightLeft className="h-4 w-4 text-brand-cyan" />
      </motion.div>
      <div className="flex-1 rounded-lg border border-brand-cyan/20 bg-brand-cyan/[0.06] px-3 py-2">
        <p className="text-[10px] uppercase tracking-wider text-brand-cyan/80">VocoRx</p>
        <p className="font-mono text-white">synced · 120ms</p>
      </div>
    </div>
  );
}

const CAPABILITIES = [
  {
    icon: CalendarCheck,
    tag: 'Flagship',
    title: 'Autonomous MedSync Outreach',
    text: 'Synchronizes multiple prescriptions into a single pick-up or delivery date—calling, confirming, and short-filling automatically.',
    chips: ['Anchor-date logic', 'Short-fill proration', 'Batch dialing'],
    Visual: MedSyncVisual,
  },
  {
    icon: BellRing,
    tag: 'Inbound + Outbound',
    title: 'Refill Authorization & Reminders',
    text: 'Handles inbound refill confirmations and outbound ready-for-pickup notifications without tying up staff.',
    chips: ['Voice + SMS', 'Smart retry windows', 'Will-call recovery'],
    Visual: RefillVisual,
  },
  {
    icon: Stethoscope,
    tag: 'Safety-first',
    title: 'Clinical Escalation Triage',
    text: 'Seamlessly warm-transfers complex drug interactions or side-effect questions to the on-duty pharmacist—with full context.',
    chips: ['Intent guardrails', 'Warm transfer', 'Call summary'],
    Visual: TriageVisual,
  },
  {
    icon: Database,
    tag: 'Interoperability',
    title: 'Enterprise PMS Integration',
    text: 'Real-time, bidirectional sync with major pharmacy management systems so every outcome lands on the patient profile.',
    chips: ['HL7 / FHIR', 'Write-back', 'Multi-store'],
    Visual: PmsVisual,
  },
];

export default function Capabilities() {
  return (
    <section id="medsync" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="MedSync Automation"
          icon={Sparkles}
          title={<>Flagship capabilities built for <span className="text-brand-gradient">pharmacy workflows</span></>}
          description="Purpose-built for retail, compounding, and specialty pharmacy—not a generic call-center bot retrofitted for healthcare."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <SpotlightCard tilt maxTilt={4} className="group h-full p-7 sm:p-8">
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br from-brand-teal/20 to-brand-cyan/5 ring-1 ring-brand-cyan/25 transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(0,229,255,0.4)] group-hover:ring-brand-cyan/60">
                      <c.icon className="h-6 w-6 text-brand-cyan" />
                    </span>
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-silver">{c.tag}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-white">{c.title}</h3>
                  <p className="mt-2 leading-relaxed text-silver">{c.text}</p>
                  <div className="mt-6 rounded-xl border border-brand-cyan/10 bg-abyss/50 p-4">
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
