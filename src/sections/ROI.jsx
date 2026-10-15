import { useEffect, useState } from 'react';
import { useMotionValueEvent, useSpring } from 'framer-motion';
import { ArrowRight, Calculator, Clock, DollarSign, PhoneCall, TrendingUp } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import { Button, Reveal, SectionHeading } from '../components/ui';

const AUTOMATION_RATE = 0.94; // share of outreach completed autonomously via persistent calling
const AVG_ATTEMPTS_UNTIL_REACHED = 4.8; // average dials across time windows to reach insured or contact
const UNREACHED_RECOVERY_RATE = 0.28; // share of policies previously failing 3-attempt caps now verified
const VALUE_PER_VERIFIED_POLICY = 45; // servicing & valuation accuracy value per newly reached touchpoint

function AnimatedNumber({ value, format }) {
  const spring = useSpring(value, { stiffness: 110, damping: 22 });
  const [display, setDisplay] = useState(format(value));
  useEffect(() => { spring.set(value); }, [value, spring]);
  useMotionValueEvent(spring, 'change', (v) => setDisplay(format(v)));
  return <span className="tabular-nums">{display}</span>;
}

const usd = (v) => `$${Math.round(v).toLocaleString('en-US')}`;
const num = (v) => Math.round(v).toLocaleString('en-US');

function Slider({ label, value, min, max, step = 1, onChange, suffix = '', prefix = '' }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <div className="flex items-center justify-between text-sm">
        <span className="text-silver">{label}</span>
        <span className="rounded-md border border-brand-cyan/20 bg-brand-cyan/[0.06] px-2 py-0.5 font-mono text-white tabular-nums">
          {prefix}{value.toLocaleString('en-US')}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range mt-3"
        style={{ '--val': `${pct}%` }}
      />
    </label>
  );
}

export default function ROI() {
  const [policies, setPolicies] = useState(1500);
  const [touchpoints, setTouchpoints] = useState(4);
  const [minutes, setMinutes] = useState(12);
  const [wage, setWage] = useState(32);

  const annualOutreachCycles = policies * touchpoints;
  const totalDials = annualOutreachCycles * AVG_ATTEMPTS_UNTIL_REACHED;
  const hoursSavedAnnually = ((annualOutreachCycles * minutes) / 60) * AUTOMATION_RATE;
  const laborSavedAnnually = hoursSavedAnnually * wage;
  const newlyReachedTouchpoints = annualOutreachCycles * UNREACHED_RECOVERY_RATE;
  const portfolioProtectionValue = newlyReachedTouchpoints * VALUE_PER_VERIFIED_POLICY;
  const annualImpact = laborSavedAnnually + portfolioProtectionValue;

  return (
    <section id="roi" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Portfolio ROI Calculator"
          icon={Calculator}
          title={<>See what persistent tracking is <span className="text-brand-gradient">worth to your portfolio</span></>}
          description="Estimate annual servicing labor saved and the portfolio value of eliminating 'Unreached' policies across your life settlement maintenance operation or fund."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <SpotlightCard className="h-full p-7 sm:p-9">
              <h3 className="font-display text-lg font-semibold text-white">Your portfolio parameters</h3>
              <div className="mt-7 space-y-7">
                <Slider label="Active policies under management" value={policies} min={100} max={10000} step={100} onChange={setPolicies} />
                <Slider label="Scheduled tracking cycles per year" value={touchpoints} min={1} max={12} step={1} onChange={setTouchpoints} suffix=" / yr" />
                <Slider label="Specialist minutes per outreach cycle (incl. retries)" value={minutes} min={5} max={25} onChange={setMinutes} suffix=" min" />
                <Slider label="Servicing specialist hourly cost" value={wage} min={20} max={65} onChange={setWage} prefix="$" suffix="/hr" />
              </div>
              <p className="mt-8 text-xs leading-relaxed text-silver/60">
                Models unlimited dial persistence (avg. {AVG_ATTEMPTS_UNTIL_REACHED} dials/cycle until live contact), {Math.round(AUTOMATION_RATE * 100)}% autonomous completion with full follow-up questioning, and recovery of {Math.round(UNREACHED_RECOVERY_RATE * 100)}% of policies typically abandoned under 3-attempt vendor caps.
              </p>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-[1.25rem] border border-brand-cyan/25 bg-linear-to-br from-brand-cyan/[0.1] via-slate-card/70 to-slate-card/70 p-7 backdrop-blur-md sm:p-9">
              <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-cyan/20 blur-3xl" />
              <p className="relative text-sm uppercase tracking-[0.18em] text-brand-cyan">Estimated annual portfolio impact</p>
              <p className="relative mt-3 font-display text-5xl font-semibold text-white sm:text-6xl">
                <AnimatedNumber value={annualImpact} format={usd} />
              </p>
              <p className="relative mt-2 text-silver">in annual servicing savings and verified portfolio intelligence</p>

              <div className="relative mt-9 grid gap-4 sm:grid-cols-2">
                <Stat icon={Clock} label="Specialist hours saved / yr" value={<AnimatedNumber value={hoursSavedAnnually} format={num} />} />
                <Stat icon={DollarSign} label="Servicing labor saved / yr" value={<AnimatedNumber value={laborSavedAnnually} format={usd} />} />
                <Stat icon={PhoneCall} label="Persistent dials executed / yr" value={<AnimatedNumber value={totalDials} format={num} />} />
                <Stat icon={TrendingUp} label="Previously 'Unreached' verified / yr" value={<AnimatedNumber value={newlyReachedTouchpoints} format={num} />} />
              </div>

              <Button href="#book" icon={ArrowRight} className="relative mt-9 w-full sm:w-auto">
                Request a Custom Portfolio Analysis
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-abyss/50 p-4 transition-colors hover:border-brand-cyan/30">
      <p className="flex items-center gap-1.5 text-xs text-silver">
        <Icon className="h-3.5 w-3.5 text-brand-cyan" /> {label}
      </p>
      <p className="mt-1.5 font-display text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
