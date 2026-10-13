import { useEffect, useRef } from 'react';

/**
 * Interactive ambient background:
 *  - drifting particle mesh that repels from / links to the cursor
 *  - slow-moving "digital soundwave" ribbons that ripple near the cursor
 *  - soft cyan ambient glow that eases toward the pointer
 * Fixed, full-viewport, pointer-events: none. DPR-aware, pauses when tab hidden,
 * and renders a single static frame when the user prefers reduced motion.
 */
export default function CanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0, dpr = 1, raf = 0, t = 0;
    let particles = [];
    const mouse = { x: 0, y: 0, active: false };
    const glow = { x: 0, y: 0 };
    const LINK = 130;
    const MOUSE_RADIUS = 170;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(120, Math.floor((w * h) / 13000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        ox: 0, // displacement from cursor (eases back to 0)
        oy: 0,
        r: Math.random() * 1.3 + 0.5,
      }));
      if (!glow.x) { glow.x = w * 0.7; glow.y = h * 0.3; }
    };

    const drawGlow = () => {
      const tx = mouse.active ? mouse.x : w * 0.65 + Math.cos(t * 0.6) * w * 0.15;
      const ty = mouse.active ? mouse.y : h * 0.35 + Math.sin(t * 0.8) * h * 0.1;
      glow.x += (tx - glow.x) * 0.04;
      glow.y += (ty - glow.y) * 0.04;
      const radius = Math.max(w, h) * 0.55;
      const g = ctx.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, radius);
      g.addColorStop(0, 'rgba(0, 229, 255, 0.075)');
      g.addColorStop(0.45, 'rgba(29, 233, 182, 0.025)');
      g.addColorStop(1, 'rgba(5, 10, 21, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    const drawWaves = () => {
      const ribbons = 3;
      for (let k = 0; k < ribbons; k++) {
        const baseY = h * 0.8 + k * 16;
        const amp = 16 + k * 7;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 6) {
          const near = mouse.active ? Math.exp(-((x - mouse.x) ** 2) / (2 * 160 * 160)) : 0;
          const vertical = mouse.active ? Math.max(0, 1 - Math.abs(mouse.y - baseY) / (h * 0.6)) : 0;
          const y =
            baseY +
            Math.sin(x * 0.006 + t * 2.2 + k * 1.3) * amp * Math.sin(x * 0.0016 + t * 0.7 + k) +
            Math.sin(x * 0.045 + t * 9) * near * vertical * 22;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        const a = 0.14 - k * 0.035;
        grad.addColorStop(0, 'rgba(29,233,182,0)');
        grad.addColorStop(0.3, `rgba(29,233,182,${a})`);
        grad.addColorStop(0.7, `rgba(0,229,255,${a})`);
        grad.addColorStop(1, 'rgba(0,229,255,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }
    };

    const drawParticles = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;

        if (mouse.active) {
          const dx = p.x + p.ox - mouse.x;
          const dy = p.y + p.oy - mouse.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < MOUSE_RADIUS) {
            const force = ((MOUSE_RADIUS - d) / MOUSE_RADIUS) * 2.2;
            p.ox += (dx / d) * force;
            p.oy += (dy / d) * force;
          }
        }
        p.ox *= 0.92;
        p.oy *= 0.92;
      }

      // links
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const ax = a.x + a.ox, ay = a.y + a.oy;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = ax - (b.x + b.ox), dy = ay - (b.y + b.oy);
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const alpha = (1 - Math.sqrt(d2) / LINK) * 0.16;
            ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(b.x + b.ox, b.y + b.oy);
            ctx.stroke();
          }
        }
        // cursor links
        if (mouse.active) {
          const d = Math.hypot(ax - mouse.x, ay - mouse.y);
          if (d < MOUSE_RADIUS * 1.25) {
            ctx.strokeStyle = `rgba(29, 233, 182, ${(1 - d / (MOUSE_RADIUS * 1.25)) * 0.35})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x + p.ox, p.y + p.oy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(160, 245, 255, 0.55)';
        ctx.fill();
      }
    };

    const frame = () => {
      t += 0.005;
      ctx.clearRect(0, 0, w, h);
      drawGlow();
      drawWaves();
      drawParticles();
      if (!reduced) raf = requestAnimationFrame(frame);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) raf = requestAnimationFrame(frame);
    };

    resize();
    frame();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* vignette to keep content legible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,10,21,0.75)_100%)]" />
    </div>
  );
}
