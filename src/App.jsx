import { useCallback, useState } from 'react';
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

export default function App() {
  const [autoplayToken, setAutoplayToken] = useState(0);

  // Hero "Listen to Audio Sample": scroll to the playground and start the first scenario
  const handleListen = useCallback(() => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setAutoplayToken(Date.now());
  }, []);

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
        <LeadCapture />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
