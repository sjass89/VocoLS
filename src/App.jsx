import { useCallback, useEffect, useState } from 'react';
import CanvasBackground from './components/CanvasBackground';
import Header from './sections/Header';
import Hero from './sections/Hero';
import ProblemSolution from './sections/ProblemSolution';
import Capabilities from './sections/Capabilities';
import AudioPlayground from './sections/AudioPlayground';
import Roadmap from './sections/Roadmap';
import Security from './sections/Security';
import ROI from './sections/ROI';
import LeadCapture from './sections/LeadCapture';
import Footer from './sections/Footer';
import LegalPage from './pages/LegalPage';
import { LEGAL_DOCS } from './data/legalData';

const HASH_MAP = {
  privacy: 'privacy',
  'privacy-policy': 'privacy',
  terms: 'terms',
  'terms-of-service': 'terms',
  hipaa: 'hipaa',
  'hipaa-baa': 'hipaa',
  'security-overview': 'security',
  'security-doc': 'security',
  accessibility: 'accessibility',
  'accessibility-statement': 'accessibility',
  cookies: 'cookies',
  'cookie-settings': 'cookies',
  'cookie-policy': 'cookies',
};

export default function App() {
  const [view, setView] = useState('home'); // 'home' | 'legal'
  const [legalDoc, setLegalDoc] = useState('privacy');
  const [autoplayToken, setAutoplayToken] = useState(0);

  // Sync state with URL hash and path routing
  useEffect(() => {
    const handleUrlChange = () => {
      const hashKey = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      const pathKey = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
      const matched = HASH_MAP[hashKey] || HASH_MAP[pathKey];

      if (matched) {
        setLegalDoc(matched);
        setView('legal');
      } else if (!hashKey || ['top', 'platform', 'tracking', 'medsync', 'roadmap', 'security', 'roi', 'book', 'demo'].includes(hashKey)) {
        setView('home');
      }
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    handleUrlChange();

    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const handleOpenLegal = useCallback((docKey) => {
    const target = HASH_MAP[docKey] || docKey;
    setLegalDoc(target);
    setView('legal');
    const slug = LEGAL_DOCS[target]?.slug || target;
    window.history.pushState(null, '', `#${slug}`);
  }, []);

  const handleBackToHome = useCallback(() => {
    setView('home');
    window.history.pushState(null, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'VocoLS — Autonomous Voice AI Insured Tracking for Life Settlements';
  }, []);

  const handleSelectDoc = useCallback((docKey) => {
    const target = HASH_MAP[docKey] || docKey;
    setLegalDoc(target);
    const slug = LEGAL_DOCS[target]?.slug || target;
    window.history.pushState(null, '', `#${slug}`);
  }, []);

  // Hero "Listen to Audio Sample": scroll to the playground and start the first scenario
  const handleListen = useCallback(() => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setAutoplayToken(Date.now());
  }, []);

  if (view === 'legal') {
    return (
      <LegalPage
        currentDocId={legalDoc}
        onSelectDoc={handleSelectDoc}
        onBackToHome={handleBackToHome}
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <CanvasBackground />
      <Header />
      <main className="relative z-10">
        <Hero onListen={handleListen} />
        <ProblemSolution />
        <Capabilities />
        <AudioPlayground autoplayToken={autoplayToken} />
        <Roadmap />
        <Security />
        <ROI />
        <LeadCapture onOpenLegal={handleOpenLegal} />
      </main>
      <div className="relative z-10">
        <Footer onOpenLegal={handleOpenLegal} />
      </div>
    </div>
  );
}
