import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Glass card with a mouse-tracking cyan spotlight border + surface glow,
 * and optional 3D tilt that follows the pointer.
 */
export default function SpotlightCard({ children, className = '', tilt = false, maxTilt = 7, ...rest }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    if (tilt && e.pointerType !== 'touch') {
      ry.set((x / r.width - 0.5) * maxTilt * 2);
      rx.set(-(y / r.height - 0.5) * maxTilt * 2);
    }
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    ref.current?.style.setProperty('--mx', '-1000px');
    ref.current?.style.setProperty('--my', '-1000px');
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={tilt ? { rotateX: srx, rotateY: sry, transformPerspective: 1100 } : undefined}
      className={`spotlight ${className}`}
      {...rest}
    >
      <div className="relative z-[1] h-full">{children}</div>
    </motion.div>
  );
}
