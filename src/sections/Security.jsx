import { motion } from 'framer-motion';
import { Eye, FileCheck2, Fingerprint, KeyRound, Lock, ServerCog, ShieldCheck, Activity, UserCog } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import { Reveal, SectionHeading } from '../components/ui';

const BADGES = [
  { icon: ShieldCheck, title: 'HIPAA Compliant', text: 'Signed BAA, PHI minimization, and safeguards mapped to the Security Rule.', stat: 'BAA' },
  { icon: Lock, title: 'End-to-End Encryption', text: 'TLS 1.3 in transit and AES-256 at rest for audio, transcripts, and metadata.', stat: 'AES-256' },
  { icon: FileCheck2, title: 'SOC 2 Type II Alignment', text: 'Controls designed around SOC 2 Trust Services Criteria with continuous monitoring.', stat: 'SOC 2' },
  { icon: Activity, title: '99.99% Uptime SLA', text: 'Multi-region, redundant telephony and inference with automatic failover.', stat: '99.99%' },
];

const CONTROLS = [
  { icon: Fingerprint, label: 'Patient identity verification' },
  { icon: UserCog, label: 'Role-based access & SSO' },
  { icon: Eye, label: 'Immutable audit logs' },
  { icon: KeyRound, label: 'Customer-managed keys' },
  { icon: ServerCog, label: 'US-only data residency' },
];

export default function Security() {
  return (
    <section id="security" className="relative py-24 sm:py-32">
      <div aria-hidden className="absolute inset-x-0 top-1/2 -z-10 h-[500px] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.08),transparent_65%)]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Security & HIPAA"
          icon={ShieldCheck}
          title={<>Enterprise-ready from <span className="text-brand-gradient">the first call</span></>}
          description="Built for regulated healthcare environments, with the controls your compliance, IT, and legal teams expect."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BADGES.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <SpotlightCard tilt maxTilt={6} className="group h-full p-6 text-center">
                <div className="relative mx-auto grid h-20 w-20 place-items-center">
                  <motion.span
                    aria-hidden
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border border-dashed border-brand-cyan/30"
                  />
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-linear-to-br from-brand-teal/25 to-brand-cyan/5 ring-1 ring-brand-cyan/40 transition-shadow duration-300 group-hover:shadow-[0_0_30px_rgba(0,229,255,0.5)]">
                    <b.icon className="h-6 w-6 text-brand-cyan" />
                  </span>
                </div>
                <p className="mt-5 font-mono text-xs uppercase tracking-widest text-brand-teal">{b.stat}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-white">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver">{b.text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="glass mt-8 flex flex-wrap items-center justify-center gap-3 rounded-2xl px-5 py-5">
            {CONTROLS.map((c) => (
              <motion.span
                key={c.label}
                whileHover={{ y: -2 }}
                className="inline-flex cursor-default items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-silver transition-colors hover:border-brand-cyan/40 hover:text-white"
              >
                <c.icon className="h-4 w-4 text-brand-cyan" /> {c.label}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
