import { motion } from 'framer-motion';
import { Activity, CircleCheck, Map, PhoneIncoming, Radio } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import { LiveDot, Reveal, SectionHeading } from '../components/ui';

const PHASES = [
  {
    phase: 'Phase 1',
    status: 'Live',
    statusCls: 'border-brand-teal/40 bg-brand-teal/10 text-brand-teal',
    dot: 'bg-brand-teal',
    icon: Radio,
    title: 'Persistent Insured & Contact Tracking Engine',
    text: 'Unlimited-attempt outbound outreach to insureds and designated contacts with mandatory & dynamic clinical follow-ups.',
    items: ['Dial-until-reached persistence', 'Dynamic medical & MD follow-ups', 'Designated contact cascading', 'Servicer & fund DB write-back'],
    progress: 100,
  },
  {
    phase: 'Phase 2',
    status: 'Upcoming',
    statusCls: 'border-brand-cyan/40 bg-brand-cyan/10 text-brand-cyan',
    dot: 'bg-brand-cyan',
    icon: PhoneIncoming,
    title: 'Automated HIPAA Auth & APS Coordinator',
    text: 'Streamlines HIPAA authorization renewals and coordinates Attending Physician Statement (APS) retrieval directly from newly identified clinics.',
    items: ['SMS/email HIPAA e-signature capture', 'Physician office verification calls', 'Automated APS request dispatch', 'Inbound insured callback concierge'],
    progress: 65,
  },
  {
    phase: 'Phase 3',
    status: 'Enterprise',
    statusCls: 'border-violet-400/40 bg-violet-400/10 text-violet-300',
    dot: 'bg-violet-400',
    icon: Activity,
    title: 'Continuous Mortality & LE Intelligence Suite',
    text: 'Real-time portfolio health delta scoring, obituary/mortality cross-verification, and automated underwriting triggers for institutional funds.',
    items: ['Structured health delta signals', 'Automated LE re-underwriting triggers', 'Multi-source mortality verification', 'Fund & investor data-room feeds'],
    progress: 30,
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Platform Roadmap"
          icon={Map}
          title={<>One voice layer. <span className="text-brand-gradient">Complete life settlement portfolio intelligence.</span></>}
          description="VocoLS is the foundational outreach engine for modern policy servicing—connecting persistent voice verification with automated medical record retrieval and fund analytics."
        />

        <div className="relative mt-20">
          {/* timeline rail */}
          <div aria-hidden className="absolute left-0 right-0 top-[22px] hidden h-px bg-white/10 lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 0.45 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: 'easeOut' }}
              className="h-full origin-left bg-linear-to-r from-brand-teal via-brand-cyan to-brand-cyan/0"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {PHASES.map((p, i) => (
              <Reveal key={p.phase} delay={i * 0.12}>
                <div className="mb-6 hidden items-center gap-3 lg:flex">
                  <span className={`relative grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-midnight`}>
                    {p.status === 'Live' ? <LiveDot color={p.dot} /> : <span className={`h-2 w-2 rounded-full ${p.dot}`} />}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-silver/70">{p.phase}</span>
                </div>
                <SpotlightCard tilt maxTilt={4} className="h-full p-7">
                  <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/[0.04] ring-1 ring-white/10">
                        <p.icon className="h-5 w-5 text-brand-cyan" />
                      </span>
                      <span className={`rounded-full border px-3 py-1 text-xs font-medium ${p.statusCls}`}>
                        <span className="lg:hidden">{p.phase} · </span>{p.status}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-xl font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-silver">{p.text}</p>
                    <ul className="mt-6 space-y-2.5">
                      {p.items.map((it) => (
                        <li key={it} className="flex items-center gap-2.5 text-sm text-white/90">
                          <CircleCheck className={`h-4 w-4 shrink-0 ${p.progress === 100 ? 'text-brand-teal' : 'text-silver/40'}`} />
                          {it}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-7">
                      <div className="flex justify-between text-[11px] uppercase tracking-wider text-silver/60">
                        <span>Readiness</span><span>{p.progress}%</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${p.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.3 + i * 0.1 }}
                          className="h-full rounded-full bg-linear-to-r from-brand-teal to-brand-cyan"
                        />
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
