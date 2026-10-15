/**
 * VocoLS typographic logo — mirrors the brand mark:
 * "Voco" electric cyan, "LS" white with a cyan gradient strike, silver tracked subline.
 */
export default function Logo({ size = 'md', showTagline = true, className = '' }) {
  const sizes = {
    sm: { word: 'text-2xl', tag: 'text-[6.5px] tracking-[0.22em]', bar: 'h-[2px]' },
    md: { word: 'text-[28px]', tag: 'text-[7.5px] tracking-[0.24em]', bar: 'h-[2.5px]' },
    lg: { word: 'text-5xl', tag: 'text-[12px] tracking-[0.26em]', bar: 'h-[4px]' },
  };
  const s = sizes[size];

  return (
    <span className={`inline-flex flex-col leading-none select-none ${className}`} aria-label="VocoLS — Voice AI for Life Settlements">
      <span className={`font-display font-semibold ${s.word} tracking-[-0.02em]`}>
        <span className="text-brand-gradient">Voco</span>
        <span className="relative text-white">
          LS
          <span
            aria-hidden
            className={`absolute left-[48%] -right-[16%] top-[56%] ${s.bar} rounded-full bg-linear-to-r from-brand-teal via-brand-cyan/80 to-brand-cyan/10 shadow-[0_0_8px_rgba(0,229,255,0.7)]`}
          />
        </span>
      </span>
      {showTagline && (
        <span className={`mt-1 font-display font-medium uppercase text-silver ${s.tag}`}>
          Voice AI for Life Settlements
        </span>
      )}
    </span>
  );
}
