import { useEffect, useState } from 'react';
import { useMotionValueEvent, useSpring } from 'framer-motion';
import { ArrowRight, Calculator, Clock, DollarSign, PhoneCall, TrendingUp } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import { Button, Reveal, SectionHeading } from '../components/ui';

const AUTOMATION_RATE = 0.85; // share of outreach VocoRx completes without staff
const ATTEMPTS_PER_PATIENT = 1.6; // dials incl. retries / voicemail, per month
const RECOVERED_FILL_RATE = 0.06; // extra fills recovered via adherence outreach
const GROSS_PROFIT_PER_FILL = 14;

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
  const [locations, setLocations] = useState(5);
  const [patients, setPatients] = useState(250);
  const [minutes, setMinutes] = useState(6);
  const [wage, setWage] = useState(22);

  const calls = locations * patients * ATTEMPTS_PER_PATIENT;
  const hoursSaved = ((calls * minutes) / 60) * AUTOMATION_RATE;
  const laborSaved = hoursSaved * wage;
  const recovered = locations * patients * RECOVERED_FILL_RATE * GROSS_PROFIT_PER_FILL;
  const annual = (laborSaved + recovered) * 12;

  return (
    <section id="roi" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="ROI Calculator"
          icon={Calculator}
          title={<>See what autopilot is <span className="text-brand-gradient">worth to your pharmacy</span></>}
          description="Adjust the inputs to estimate monthly staff hours returned and the combined labor + adherence impact across your locations."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <SpotlightCard className="h-full p-7 sm:p-9">
              <h3 className="font-display text-lg font-semibold text-white">Your pharmacy</h3>
              <div className="mt-7 space-y-7">
                <Slider label="Number of locations" value={locations} min={1} max={150} onChange={setLocations} />
                <Slider label="MedSync / refill patients per location" value={patients} min={50} max={1500} step={10} onChange={setPatients} />
                <Slider label="Avg. minutes per manual call" value={minutes} min={2} max={15} onChange={setMinutes} suffix=" min" />
                <Slider label="Technician hourly cost" value={wage} min={15} max={45} onChange={setWage} prefix="$" suffix="/hr" />
              </div>
              <p className="mt-8 text-xs leading-relaxed text-silver/60">
                Assumes {ATTEMPTS_PER_PATIENT} dial attempts per patient/month, {Math.round(AUTOMATION_RATE * 100)}% autonomous completion, and{' '}
                {Math.round(RECOVERED_FILL_RATE * 100)}% recovered fills at ${GROSS_PROFIT_PER_FILL} gross profit. Illustrative estimate only.
              </p>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-[1.25rem] border border-brand-cyan/25 bg-linear-to-br from-brand-cyan/[0.1] via-slate-card/70 to-slate-card/70 p-7 backdrop-blur-md sm:p-9">
              <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-cyan/20 blur-3xl" />
              <p className="relative text-sm uppercase tracking-[0.18em] text-brand-cyan">Estimated annual impact</p>
              <p className="relative mt-3 font-display text-5xl font-semibold text-white sm:text-6xl">
                <AnimatedNumber value={annual} format={usd} />
              </p>
              <p className="relative mt-2 text-silver">in recovered labor and adherence revenue per year</p>

              <div className="relative mt-9 grid gap-4 sm:grid-cols-2">
                <Stat icon={Clock} label="Staff hours returned / mo" value={<AnimatedNumber value={hoursSaved} format={num} />} />
                <Stat icon={DollarSign} label="Labor savings / mo" value={<AnimatedNumber value={laborSaved} format={usd} />} />
                <Stat icon={PhoneCall} label="Calls automated / mo" value={<AnimatedNumber value={calls * AUTOMATION_RATE} format={num} />} />
                <Stat icon={TrendingUp} label="Adherence revenue / mo" value={<AnimatedNumber value={recovered} format={usd} />} />
              </div>

              <Button href="#book" icon={ArrowRight} className="relative mt-9 w-full sm:w-auto">
                Get a custom ROI analysis
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
