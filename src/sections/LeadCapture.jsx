import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Building2, CircleCheck, Layers, LoaderCircle, Mail, Rocket, User } from 'lucide-react';
import Waveform from '../components/Waveform';
import { Button, Eyebrow, Reveal } from '../components/ui';

const PORTFOLIO_OPTIONS = ['Under 250 policies', '250–1,000 policies', '1,000–5,000 policies', '5,000–15,000 policies', '15,000+ policies'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Field({ icon: Icon, label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-silver">{label}</span>
      <div
        className={`group flex items-center gap-3 rounded-xl border bg-abyss/60 px-4 transition-all focus-within:shadow-[0_0_0_4px_rgba(0,229,255,0.1)] ${
          error ? 'border-rose-400/60' : 'border-white/10 focus-within:border-brand-cyan/60 hover:border-brand-cyan/30'
        }`}
      >
        <Icon className="h-4 w-4 shrink-0 text-silver/60 transition-colors group-focus-within:text-brand-cyan" />
        {children}
      </div>
      {error && <span className="mt-1 block text-xs text-rose-300">{error}</span>}
    </label>
  );
}

export default function LeadCapture({ onOpenLegal }) {
  const [form, setForm] = useState({ name: '', organization: '', portfolioSize: '', email: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.organization.trim()) e.organization = 'Please enter your company or fund name';
    if (!form.portfolioSize) e.portfolioSize = 'Select portfolio size';
    if (!EMAIL_RE.test(form.email)) e.email = 'Enter a valid work email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('success');
  };

  const inputCls = 'w-full bg-transparent py-3.5 text-sm text-white placeholder:text-silver/40 focus:outline-none';

  return (
    <section id="book" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-brand-cyan/25 bg-linear-to-br from-midnight via-slate-card/80 to-abyss p-7 shadow-[0_40px_120px_-40px_rgba(0,229,255,0.45)] sm:p-12 lg:p-16">
            <div aria-hidden className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_top_left,#000_10%,transparent_60%)]" />
            <div aria-hidden className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-teal/15 blur-3xl" />
            <div aria-hidden className="absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-brand-cyan/15 blur-3xl" />

            <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
              <div>
                <Eyebrow icon={Rocket}>30-Day Portfolio Pilot</Eyebrow>
                <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[54px]">
                  Eliminate &ldquo;Unreached&rdquo; Policies on <span className="text-brand-gradient">Autopilot.</span>
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-silver">
                  Test VocoLS on your hardest-to-reach cohort or full servicing queue. We call until someone is reached and ask every mandatory and clinical follow-up question.
                </p>
                <ul className="mt-8 space-y-3 text-sm">
                  {[
                    'Custom questionnaire & dynamic follow-up logic tuning',
                    'Unlimited dial attempts across insureds & designated contacts',
                    'BAA & NDA executed before any policy data is shared',
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2.5 text-white/90">
                      <CircleCheck className="h-4 w-4 text-brand-teal" /> {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 max-w-sm opacity-80">
                  <Waveform active speaker="agent" bars={40} className="h-10" />
                </div>
              </div>

              <div className="glass relative rounded-2xl p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex min-h-[420px] flex-col items-center justify-center text-center"
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                        className="grid h-16 w-16 place-items-center rounded-full bg-brand-teal/15 ring-1 ring-brand-teal/50 shadow-[0_0_40px_rgba(29,233,182,0.4)]"
                      >
                        <CircleCheck className="h-8 w-8 text-brand-teal" />
                      </motion.span>
                      <h3 className="mt-6 font-display text-2xl font-semibold text-white">You&apos;re on the pilot list, {form.name.split(' ')[0]}!</h3>
                      <p className="mt-3 max-w-sm text-silver">
                        Our life settlement servicing specialists will reach out to <span className="text-white">{form.email}</span> within one business day to configure your tracking pilot.
                      </p>
                      <button
                        onClick={() => { setStatus('idle'); setForm({ name: '', organization: '', portfolioSize: '', email: '' }); }}
                        className="mt-8 text-sm text-brand-cyan underline-offset-4 hover:underline"
                      >
                        Submit another request
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-white">Book a portfolio pilot</h3>
                        <p className="mt-1 text-sm text-silver">For maintenance companies, funds &amp; institutional investors.</p>
                      </div>
                      <Field icon={User} label="Full name" error={errors.name}>
                        <input className={inputCls} placeholder="Jordan Vance, Managing Director" value={form.name} onChange={update('name')} autoComplete="name" />
                      </Field>
                      <Field icon={Building2} label="Company / Fund / Servicer name" error={errors.organization}>
                        <input className={inputCls} placeholder="Meridian Life Settlement Partners" value={form.organization} onChange={update('organization')} autoComplete="organization" />
                      </Field>
                      <Field icon={Layers} label="Policies under management / tracking" error={errors.portfolioSize}>
                        <select className={`${inputCls} cursor-pointer appearance-none ${form.portfolioSize ? '' : 'text-silver/40'}`} value={form.portfolioSize} onChange={update('portfolioSize')}>
                          <option value="" disabled className="bg-midnight">Select portfolio size…</option>
                          {PORTFOLIO_OPTIONS.map((o) => (
                            <option key={o} value={o} className="bg-midnight text-white">{o}</option>
                          ))}
                        </select>
                      </Field>
                      <Field icon={Mail} label="Work email" error={errors.email}>
                        <input type="email" className={inputCls} placeholder="you@settlementfund.com" value={form.email} onChange={update('email')} autoComplete="email" />
                      </Field>
                      <Button type="submit" icon={status === 'loading' ? undefined : ArrowRight} iconLeft={status === 'loading' ? LoaderCircle : undefined} disabled={status === 'loading'} className={`w-full !py-4 text-base ${status === 'loading' ? '[&_svg]:animate-spin' : ''}`}>
                        {status === 'loading' ? 'Scheduling…' : 'Schedule Portfolio Pilot'}
                      </Button>
                      <p className="text-center text-xs text-silver/60">
                        By submitting, you agree to our{' '}
                        <a
                          href="#privacy"
                          onClick={(e) => {
                            if (onOpenLegal) {
                              e.preventDefault();
                              onOpenLegal('privacy');
                            }
                          }}
                          className="text-silver underline-offset-2 hover:text-white hover:underline cursor-pointer"
                        >
                          Privacy Policy
                        </a>
                        . We never sell your data.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
