import { useEffect, useState } from 'react';
import { useReveal } from './useReveal';

interface RollingCounterProps {
  target: number;
  digits?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/** One zero-padded digit rendered as a vertical strip of 0-9, translated so
 * the current value sits in view. Animating `value` changes the transform,
 * which CSS transitions into an odometer-style roll. */
function Digit({ value }: { value: number }) {
  return (
    <span className="digit-reel__cell" aria-hidden="true">
      <span className="digit-reel__strip" style={{ transform: `translateY(-${value * 10}%)` }}>
        {Array.from({ length: 10 }, (_, n) => (
          <span className="digit-reel__digit" key={n}>
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

/** Odometer-style counter: each digit rolls independently from 0 up to its
 * final value once the element scrolls into view. Reuses the same
 * IntersectionObserver hook as CountUp/Reveal; final value is exposed via
 * aria-label rather than read out digit-by-digit mid-roll. Respects
 * prefers-reduced-motion by rendering the settled value immediately. */
export function RollingCounter({
  target,
  digits,
  duration = 1400,
  prefix = '',
  suffix = '',
  className,
}: RollingCounterProps) {
  const [ref, visible] = useReveal<HTMLSpanElement>();
  const [value, setValue] = useState(0);
  const width = digits ?? String(target).length;

  useEffect(() => {
    if (!visible) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * easeOutExpo(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, duration]);

  const padded = String(Math.min(value, target)).padStart(width, '0');

  return (
    <span
      ref={ref}
      className={`digit-reel${className ? ` ${className}` : ''}`}
      role="img"
      aria-label={`${prefix}${target}${suffix}`}
    >
      {prefix && <span className="digit-reel__affix">{prefix}</span>}
      {padded.split('').map((d, i) => (
        <Digit key={i} value={Number(d)} />
      ))}
      {suffix && <span className="digit-reel__affix">{suffix}</span>}
    </span>
  );
}
