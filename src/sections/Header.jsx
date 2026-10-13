import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import Logo from '../components/Logo';
import { Button } from '../components/ui';

export const NAV = [
  { label: 'Platform', href: '#platform' },
  { label: 'MedSync Automation', href: '#medsync' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Security & HIPAA', href: '#security' },
  { label: 'ROI', href: '#roi' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const sections = NAV.map((n) => document.querySelector(n.href)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const highlight = hovered ?? active;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled ? 'glass shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)]' : 'border border-transparent'
        }`}
      >
        <a href="#top" className="shrink-0" aria-label="VocoRx home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 xl:flex" onMouseLeave={() => setHovered(null)}>
          {NAV.map((item) => (
            <li key={item.href} className="relative">
              <a
                href={item.href}
                onMouseEnter={() => setHovered(item.href)}
                className={`relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  highlight === item.href ? 'text-white' : 'text-silver hover:text-white'
                }`}
              >
                {item.label}
              </a>
              {highlight === item.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full border border-brand-cyan/25 bg-brand-cyan/[0.08]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <Button href="#book" variant="contrast" icon={ArrowRight} className="!px-5 !py-2.5">
              Book Enterprise Demo
            </Button>
          </span>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-brand-cyan/20 text-white transition hover:border-brand-cyan/60 hover:bg-brand-cyan/10 xl:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="glass mx-auto mt-2 max-w-7xl rounded-2xl p-4 xl:hidden"
          >
            <ul className="flex flex-col">
              {NAV.map((item, i) => (
                <motion.li key={item.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-base text-white transition hover:bg-brand-cyan/10"
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 text-brand-cyan" />
                  </a>
                </motion.li>
              ))}
            </ul>
            <Button href="#book" onClick={() => setOpen(false)} icon={ArrowRight} className="mt-3 w-full">
              Book Enterprise Demo
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
