interface RetroGridProps {
  className?: string;
}

/** Decorative animated perspective grid, absolutely positioned to fill its
 * relative parent. Purely visual (aria-hidden) — the parent section is
 * responsible for `position: relative` and its own z-indexed content. */
export function RetroGrid({ className }: RetroGridProps) {
  return (
    <div className={`retro-grid${className ? ` ${className}` : ''}`} aria-hidden="true">
      <div className="retro-grid__plane">
        <div className="retro-grid__lines" />
      </div>
      <div className="retro-grid__fade" />
    </div>
  );
}
