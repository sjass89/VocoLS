import { useEffect, useRef } from 'react';

const PALETTES = {
  agent: ['#1DE9B6', '#00E5FF'],
  patient: ['#E5E7EB', '#A1AAB3'],
  idle: ['#1DE9B6', '#00E5FF'],
};

/**
 * Real-time mock voice equalizer drawn on canvas.
 * `active` drives speech-like amplitude envelopes; `speaker` switches palette.
 * Props are read through a ref so the RAF loop never restarts.
 */
export default function Waveform({ active = false, speaker = 'agent', bars = 48, gap = 3, className = '' }) {
  const canvasRef = useRef(null);
  const live = useRef({ active, speaker });

  useEffect(() => {
    live.current = { active, speaker };
  }, [active, speaker]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const levels = new Float32Array(bars).fill(0.05);
    let raf = 0;
    let t = 0;
    let w = 0, h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const draw = () => {
      const { active: on, speaker: who } = live.current;
      t += 0.06;
      ctx.clearRect(0, 0, w, h);

      const bw = Math.max(1.5, (w - gap * (bars - 1)) / bars);
      // syllable-like envelope so it "talks" rather than buzzes
      const env = on ? 0.45 + 0.55 * Math.abs(Math.sin(t * 1.9)) * (0.6 + 0.4 * Math.sin(t * 0.7 + 1)) : 0;

      const [c1, c2] = PALETTES[on ? who : 'idle'] || PALETTES.agent;
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, c2);
      grad.addColorStop(0.5, c1);
      grad.addColorStop(1, c2);
      ctx.fillStyle = grad;
      ctx.globalAlpha = on ? 1 : 0.45;

      for (let i = 0; i < bars; i++) {
        const center = 1 - Math.abs(i - (bars - 1) / 2) / (bars / 2);
        const target = on
          ? 0.12 + env * (0.35 + 0.65 * Math.random()) * (0.35 + 0.65 * center) * (0.7 + 0.3 * Math.sin(i * 0.55 + t * 2.4))
          : 0.05 + 0.03 * Math.sin(i * 0.45 + t * 1.2);
        levels[i] += (target - levels[i]) * (on ? 0.32 : 0.08);
        const bh = Math.max(2, levels[i] * h);
        const x = i * (bw + gap);
        const y = (h - bh) / 2;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(x, y, bw, bh, bw / 2);
        else ctx.rect(x, y, bw, bh);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [bars, gap]);

  return <canvas ref={canvasRef} className={`block w-full ${className}`} aria-hidden />;
}
