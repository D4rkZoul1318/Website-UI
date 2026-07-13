import React from 'react';
import { useReveal } from './useReveal';

type RevealVariant = 'scale' | 'rotate' | 'clip' | 'zoom';

interface RevealOwnProps {
  as?: keyof JSX.IntrinsicElements;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  children?: React.ReactNode;
}

type RevealProps = RevealOwnProps & Omit<React.HTMLAttributes<HTMLElement>, keyof RevealOwnProps>;

/** Fade/scale/rotate/clip-in-on-scroll wrapper — same IntersectionObserver
 * reveal system used across the homepage and every chapter page. Renders
 * whatever tag `as` specifies (default div) so it can be dropped directly
 * on headings, paragraphs, or containers without adding extra wrapper DOM. */
export function Reveal({ as = 'div', variant, delay, className, style, children, ...rest }: RevealProps) {
  const [ref, visible] = useReveal();
  const cls = ['reveal' + (variant ? `--${variant}` : ''), visible ? 'visible' : '', className]
    .filter(Boolean)
    .join(' ');
  return React.createElement(
    as,
    {
      ref,
      className: cls,
      style: delay ? { transitionDelay: `${delay}ms`, ...style } : style,
      ...rest,
    },
    children
  );
}

/** Stagger helper — mirrors the source's `[data-stagger]` grouping: index i
 * gets min(i * 60, 300)ms of delay. Use with Reveal's `delay` prop when
 * mapping over an array of sibling reveal items. */
export function staggerDelay(index: number) {
  return Math.min(index * 60, 300);
}
