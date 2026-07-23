import type { ReactNode } from 'react';

interface ClippedTabProps {
  active?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/** Browser-tab-style button: rounded top corners with a concave notch at
 * each base corner so an active tab reads as "merging" into the bar behind
 * it, the way a Chrome tab does. Purely a shape/style primitive — behavior
 * (active state, click handling) stays with the caller. */
export function ClippedTab({ active, children, className, onClick, style }: ClippedTabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`clipped-tab${active ? ' active' : ''}${className ? ` ${className}` : ''}`}
      style={style}
    >
      <span className="clipped-tab__notch clipped-tab__notch--left" aria-hidden="true" />
      <span className="clipped-tab__label">{children}</span>
      <span className="clipped-tab__notch clipped-tab__notch--right" aria-hidden="true" />
    </button>
  );
}
