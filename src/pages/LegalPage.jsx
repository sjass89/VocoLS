import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Printer,
  Mail,
  ShieldCheck,
  FileCheck2,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Lock,
} from 'lucide-react';
import Logo from '../components/Logo';
import { LEGAL_DOCS } from '../data/legalData';

export default function LegalPage({ currentDocId = 'privacy', onSelectDoc, onBackToHome }) {
  const [activeDocKey, setActiveDocKey] = useState(currentDocId);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (currentDocId && LEGAL_DOCS[currentDocId]) {
      setActiveDocKey(currentDocId);
    }
  }, [currentDocId]);

  const doc = LEGAL_DOCS[activeDocKey] || LEGAL_DOCS.privacy;
  const docKeys = Object.keys(LEGAL_DOCS);
  const currentIndex = docKeys.indexOf(activeDocKey);
  const nextDocKey = docKeys[(currentIndex + 1) % docKeys.length];
  const nextDoc = LEGAL_DOCS[nextDocKey];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${doc.title} — VocoRx Trust & Legal`;
  }, [activeDocKey, doc.title]);

  const handleSelect = (key) => {
    setActiveDocKey(key);
    setMobileMenuOpen(false);
    if (onSelectDoc) onSelectDoc(key);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen bg-abyss text-silver antialiased selection:bg-brand-cyan/30 selection:text-white">
      {/* Background ambient lighting */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-midnight/70 via-abyss to-abyss" />
      </div>

      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-brand-cyan/15 bg-midnight/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-6">
            <button
              onClick={onBackToHome}
              className="group flex items-center gap-2 rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan"
            >
              <Logo size="sm" />
            </button>
            <div className="hidden h-5 w-px bg-white/10 sm:block" />
            <span className="hidden items-center gap-2 rounded-full border border-brand-cyan/20 bg-brand-cyan/[0.05] px-3 py-1 text-xs font-medium text-brand-cyan sm:inline-flex">
              <ShieldCheck className="h-3.5 w-3.5" /> Trust & Legal Center
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              aria-label="Print document"
              className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-white transition hover:border-brand-cyan/40 hover:bg-white/[0.08] sm:inline-flex"
            >
              <Printer className="h-3.5 w-3.5 text-brand-cyan" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-teal to-brand-cyan px-4 py-2 text-xs font-semibold text-midnight shadow-[0_0_18px_rgba(0,229,255,0.25)] transition hover:shadow-[0_0_28px_rgba(0,229,255,0.5)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Site</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 text-white lg:hidden"
              aria-label="Toggle Document Menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Document Selector Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-brand-cyan/15 bg-midnight/95 px-5 py-4 lg:hidden"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-silver/60">
                Select Legal Document
              </p>
              <div className="flex flex-col gap-1">
                {docKeys.map((key) => {
                  const item = LEGAL_DOCS[key];
                  const Icon = item.icon;
                  const isActive = key === activeDocKey;
                  return (
                    <button
                      key={key}
                      onClick={() => handleSelect(key)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                        isActive
                          ? 'border border-brand-cyan/30 bg-brand-cyan/10 font-medium text-brand-cyan'
                          : 'text-silver hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.title}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        {/* Document Header Hero */}
        <div className="mb-12 rounded-2xl border border-brand-cyan/20 bg-linear-to-br from-slate-card/80 via-slate-card/60 to-abyss/90 p-6 backdrop-blur-xl sm:p-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)]">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 font-semibold uppercase tracking-wider text-brand-cyan">
              {doc.category}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-silver">
              Effective: {doc.effectiveDate}
            </span>
            <span className="rounded-full border border-brand-teal/30 bg-brand-teal/10 px-3 py-1 text-brand-teal">
              VitalGuard LLC Verified
            </span>
          </div>

          <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {doc.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-silver/90 sm:text-lg">
            {doc.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6 text-xs text-silver/70">
            <div>
              <span className="text-silver/40">Entity: </span>
              <strong className="text-white font-medium">VitalGuard LLC</strong> (d/b/a VocoRx)
            </div>
            <div className="hidden h-3 w-px bg-white/10 sm:block" />
            <div>
              <span className="text-silver/40">Jurisdiction: </span>
              <span className="text-silver">United States (HIPAA / State Pharmacy Board Compliant)</span>
            </div>
            <div className="hidden h-3 w-px bg-white/10 sm:block" />
            <div>
              <span className="text-silver/40">Questions: </span>
              <a href="mailto:legal@vocorx.ai" className="text-brand-cyan hover:underline">
                legal@vocorx.ai
              </a>
            </div>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* Left Navigation Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl border border-brand-cyan/15 bg-slate-card/60 p-5 backdrop-blur-xl">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-silver/60">
                  Trust & Legal Documents
                </p>
                <nav className="flex flex-col gap-1.5" aria-label="Legal Documents Navigation">
                  {docKeys.map((key) => {
                    const item = LEGAL_DOCS[key];
                    const Icon = item.icon;
                    const isActive = key === activeDocKey;
                    return (
                      <button
                        key={key}
                        onClick={() => handleSelect(key)}
                        className={`group flex items-center justify-between rounded-xl px-3.5 py-3 text-left text-sm transition-all ${
                          isActive
                            ? 'border border-brand-cyan/40 bg-brand-cyan/[0.12] font-semibold text-white shadow-[0_0_15px_rgba(0,229,255,0.15)]'
                            : 'border border-transparent text-silver hover:border-white/10 hover:bg-white/[0.04] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            className={`h-4 w-4 transition-colors ${
                              isActive ? 'text-brand-cyan' : 'text-silver/50 group-hover:text-brand-cyan'
                            }`}
                          />
                          <span className="truncate">{item.title}</span>
                        </div>
                        {isActive && (
                          <ChevronRight className="h-4 w-4 text-brand-cyan" />
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* In-Page Quick Outline */}
              <div className="rounded-2xl border border-white/5 bg-slate-card/40 p-5 text-xs">
                <p className="mb-3 font-semibold uppercase tracking-wider text-silver/60">
                  Document Outline
                </p>
                <ul className="space-y-2">
                  {doc.sections.map((sec) => (
                    <li key={sec.id}>
                      <a
                        href={`#${sec.id}`}
                        className="block truncate text-silver/80 transition hover:text-brand-cyan"
                      >
                        {sec.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Compliance Support Card */}
              <div className="rounded-2xl border border-brand-teal/20 bg-linear-to-br from-brand-teal/[0.08] to-transparent p-5 text-xs">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <FileCheck2 className="h-4 w-4 text-brand-teal" />
                  <span>Request Custom BAA</span>
                </div>
                <p className="mt-2 leading-relaxed text-silver">
                  Enterprise health systems and multi-location retail chains can execute custom BAAs with our legal team.
                </p>
                <a
                  href="mailto:compliance@vocorx.ai?subject=Enterprise%20BAA%20Request%20-%20VocoRx"
                  className="mt-3 inline-flex items-center gap-1.5 font-medium text-brand-cyan hover:underline"
                >
                  <Mail className="h-3 w-3" />
                  <span>compliance@vocorx.ai</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Right Document Sections Body */}
          <article className="space-y-8">
            {doc.sections.map((sec, idx) => (
              <section
                key={sec.id}
                id={sec.id}
                className="scroll-mt-28 rounded-2xl border border-white/[0.07] bg-slate-card/50 p-6 backdrop-blur-md transition hover:border-brand-cyan/20 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {sec.heading}
                  </h2>
                  <span className="font-mono text-xs text-silver/40">§ 0{idx + 1}</span>
                </div>

                <div className="mt-5 space-y-4 text-sm leading-relaxed text-silver sm:text-base whitespace-pre-line">
                  {sec.content}
                </div>
              </section>
            ))}

            {/* Next Document Navigation Card */}
            <div className="mt-12 rounded-2xl border border-brand-cyan/25 bg-linear-to-r from-midnight via-slate-card to-abyss p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-cyan">
                    Continue Reading
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-white">
                    {nextDoc.title}
                  </h3>
                  <p className="mt-1 text-xs text-silver max-w-md">
                    {nextDoc.summary}
                  </p>
                </div>
                <button
                  onClick={() => handleSelect(nextDocKey)}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-cyan/15 border border-brand-cyan/40 px-5 py-3 text-sm font-semibold text-brand-cyan transition hover:bg-brand-cyan hover:text-midnight hover:shadow-[0_0_24px_rgba(0,229,255,0.4)]"
                >
                  <span>Read {nextDoc.title}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Bottom Entity Footer */}
            <div className="border-t border-white/10 pt-8 text-center text-xs text-silver/50">
              <p>
                VitalGuard LLC · VocoRx Autonomous Healthcare Voice Systems · 100 Enterprise Way, Suite 400, Wilmington, DE 19801
              </p>
              <p className="mt-1">
                For legal correspondence, please contact{' '}
                <a href="mailto:legal@vocorx.ai" className="text-brand-cyan hover:underline">
                  legal@vocorx.ai
                </a>
              </p>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
