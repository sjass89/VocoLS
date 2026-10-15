import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, CircleCheck, Play } from 'lucide-react';
import { Button, LiveDot } from '../components/ui';
import LiveAgentCard from './LiveAgentCard';

const HEADLINE = ['Persistent', 'AI', 'Insured', 'Tracking', 'for', 'Life', 'Settlement', 'Portfolios.'];
const ACCENT = new Set(['Insured', 'Tracking']);

const STATS = [
  { value: '∞ Dials', label: 'Calls until reached — zero attempt caps' },
  { value: '100%', label: 'Required & follow-up questions asked' },
  { value: '<600ms', label: 'Conversational response latency' },
  { value: '24/7', label: 'Insured & designated contact outreach' },
];

const INTEGRATIONS = [
  'Policy Admin Systems',
  'REST & Webhooks',
  'SFTP Portfolio Sync',
  'Designated Contact Cascade',
  'Attending Physician Capture',
  'HIPAA / SOC 2 Audit Logs',
  'SIP / PSTN Telephony',
  'Fund & Servicer Portals',
  'SSO / SAML',
];

export default function Hero({ onListen }) {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div>
          <motion.a
            href="#platform"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            className="group inline-flex items-center gap-2.5 rounded-full border border-brand-cyan/25 bg-brand-cyan/[0.07] py-1.5 pl-3 pr-2 text-xs font-medium text-white backdrop-blur transition-colors hover:border-brand-cyan/60 sm:text-[13px]"
          >
            <LiveDot />
            Built for Life Settlement Maintenance, Funds &amp; Investors
            <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-cyan/15 transition group-hover:bg-brand-cyan/30">
              <ChevronRight className="h-3.5 w-3.5 text-brand-cyan" />
            </span>
          </motion.a>

          <h1 className="mt-7 font-display text-[40px] font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[62px]">
            {HEADLINE.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`mr-[0.25em] inline-block ${ACCENT.has(word) ? 'text-brand-gradient' : ''}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-silver sm:text-lg"
          >
            Where traditional tracking services stop after 3 or 4 failed attempts, <strong className="font-medium text-white">VocoLS calls until someone is reached</strong>—and always asks every mandatory wellness question plus intelligent, real-time clinical follow-up questions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button href="#book" icon={ArrowRight} className="!px-7 !py-3.5">
              Schedule a Portfolio Demo
            </Button>
            <Button variant="secondary" onClick={onListen} iconLeft={Play} className="!px-7 !py-3.5">
              Listen to Tracking Call
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-silver"
          >
            {['Calls until live contact is made', 'Dynamic follow-up questioning', 'HIPAA & state privacy compliant'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CircleCheck className="h-4 w-4 text-brand-teal" /> {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <LiveAgentCard />
        </motion.div>
      </div>

      {/* stats */}
      <div className="mx-auto mt-24 max-w-7xl px-5 sm:px-6">
        <div className="glass grid grid-cols-2 divide-brand-cyan/10 rounded-2xl lg:grid-cols-4 lg:divide-x">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="px-6 py-6"
            >
              <p className="font-display text-3xl font-semibold text-white">
                <span className="text-brand-gradient">{s.value}</span>
              </p>
              <p className="mt-1 text-sm text-silver">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* integration marquee */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="text-xs uppercase tracking-[0.2em] text-silver/70">Interoperable with your servicing &amp; fund administration stack</p>
          <div className="mask-fade-x w-full overflow-hidden">
            <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
              {[...INTEGRATIONS, ...INTEGRATIONS].map((name, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-silver transition hover:border-brand-cyan/40 hover:text-white"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
