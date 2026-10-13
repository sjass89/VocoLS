import { motion } from 'framer-motion';

export function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  type,
  icon: Icon,
  iconLeft: IconLeft,
  disabled,
  ...rest
}) {
  const base =
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-[box-shadow,background-color,border-color,color] duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-abyss disabled:opacity-60 disabled:cursor-not-allowed';
  const variants = {
    primary:
      'bg-linear-to-r from-brand-teal to-brand-cyan text-midnight shadow-[0_0_18px_rgba(0,229,255,0.25)] hover:shadow-[0_0_36px_rgba(0,229,255,0.6)]',
    secondary:
      'border border-brand-cyan/50 bg-brand-cyan/[0.04] text-white hover:border-brand-cyan hover:bg-brand-cyan/10 hover:shadow-[0_0_26px_rgba(0,229,255,0.28)]',
    contrast:
      'bg-white text-midnight hover:bg-brand-cyan hover:shadow-[0_0_30px_rgba(0,229,255,0.65)]',
  };
  const Comp = href ? motion.a : motion.button;

  return (
    <Comp
      href={href}
      onClick={onClick}
      type={href ? undefined : type || 'button'}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {variant !== 'secondary' && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/40 opacity-0 blur-sm transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100"
        />
      )}
      {IconLeft && <IconLeft className="relative h-4 w-4" />}
      <span className="relative">{children}</span>
      {Icon && <Icon className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
    </Comp>
  );
}

export function Eyebrow({ children, icon: Icon }) {
  return (
    <motion.span
      whileHover={{ scale: 1.04 }}
      className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/20 bg-brand-cyan/[0.06] px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-brand-cyan backdrop-blur transition-colors hover:border-brand-cyan/50"
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </motion.span>
  );
}

export function Reveal({ children, delay = 0, y = 26, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, icon, title, description, align = 'center' }) {
  const alignCls = align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left';
  return (
    <Reveal className={`flex max-w-3xl flex-col gap-5 ${alignCls}`}>
      {eyebrow && <Eyebrow icon={icon}>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
        {title}
      </h2>
      {description && <p className="text-base leading-relaxed text-silver sm:text-lg">{description}</p>}
    </Reveal>
  );
}

export function LiveDot({ color = 'bg-brand-cyan' }) {
  return (
    <span className="relative flex h-2 w-2">
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-70`} />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${color}`} />
    </span>
  );
}
