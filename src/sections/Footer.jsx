import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import Logo from '../components/Logo';
import { NAV } from './Header';

const COLUMNS = [
  { title: 'Platform', links: NAV.map((n) => ({ label: n.label, href: n.href })) },
  {
    title: 'Enterprise',
    links: [
      { label: 'Book Enterprise Demo', href: '#book' },
      { label: 'Audio Playground', href: '#demo' },
      { label: 'Integrations', href: '#medsync' },
      { label: 'Partner Program', href: '#' },
      { label: 'Contact Sales', href: 'mailto:sales@vocorx.ai' },
    ],
  },
  {
    title: 'Trust & Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'HIPAA & BAA', href: '#security' },
      { label: 'Security Overview', href: '#security' },
      { label: 'Accessibility', href: '#' },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-brand-cyan/10 bg-abyss/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo size="md" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-silver">
              The autonomous Voice AI digital employee for retail, compounding, and specialty pharmacies.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-teal/25 bg-brand-teal/[0.06] px-3 py-1.5 text-xs text-brand-teal">
              <ShieldCheck className="h-3.5 w-3.5" /> HIPAA-ready · BAA available
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="group inline-flex items-center gap-1 text-sm text-silver transition-colors hover:text-brand-cyan">
                        {l.label}
                        <ArrowUpRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-white/5 pt-8 text-xs leading-relaxed text-silver/60">
          <p>
            VocoRx is a product of VitalGuard LLC. VocoRx does not provide medical advice, diagnosis, or treatment; clinical
            questions are escalated to licensed pharmacists. All product names, logos, and brands referenced are property of their respective owners.
            Performance metrics shown are illustrative and vary by deployment.
          </p>
          <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row">
            <p>© {year} VitalGuard LLC. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Cookie Settings</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
