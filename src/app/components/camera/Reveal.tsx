import React, { forwardRef, useMemo } from 'react';
import { useReveal } from './useReveal';

type RevealVariant = 'scale' | 'rotate' | 'clip' | 'zoom';

interface RevealOwnProps {
  as?: keyof JSX.IntrinsicElements;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  [key: string]: unknown;
}

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') ref(node);
      else (ref as React.MutableRefObject<T | null>).current = node;
    });
  };
}

/** Fade/scale/rotate/clip-in-on-scroll wrapper — same IntersectionObserver
 * reveal system used across the homepage and every chapter page. Renders
 * whatever tag `as` specifies (default div) so it can be dropped directly
 * on headings, paragraphs, links, or containers without adding extra
 * wrapper DOM. Forwards refs so callers can still attach imperative
 * handlers (e.g. the homepage's wheel-driven navigation) to the element. */
export const Reveal = forwardRef<HTMLElement, RevealOwnProps>(function Reveal(
  { as = 'div', variant, delay, className, style, children, ...rest },
  forwardedRef
) {
  // clip-path-based reveals collapse the element to zero rendered area in
  // its pre-reveal state (inset(0 0 100% 0)), so intersection ratio can
  // never satisfy a nonzero threshold — a deadlock where the element can
  // never be observed as "intersecting" and so never reveals. threshold 0
  // still fires correctly on the zero-boundary transition.
  const [ref, visible] = useReveal<HTMLElement>(variant === 'clip' ? 0 : undefined);
  const cls = ['reveal' + (variant ? `--${variant}` : ''), visible ? 'visible' : '', className]
    .filter(Boolean)
    .join(' ');
  const setRefs = useMemo(() => mergeRefs(ref, forwardedRef), [ref, forwardedRef]);
  return React.createElement(
    as,
    {
      ref: setRefs,
      className: cls,
      style: delay ? { transitionDelay: `${delay}ms`, ...style } : style,
      ...rest,
    },
    children
  );
});

/** Stagger helper — mirrors the source's `[data-stagger]` grouping: index i
 * gets min(i * 60, 300)ms of delay. Use with Reveal's `delay` prop when
 * mapping over an array of sibling reveal items. */
export function staggerDelay(index: number) {
  return Math.min(index * 60, 300);
}
