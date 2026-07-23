const WORDS = [
  'UI · UX',
  '3D Visual Production',
  'Brand Design',
  'AI-Assisted Workflows',
  'Design Systems',
  'Motion',
  'Art Direction',
  'Photography',
];

export function Marquee() {
  const loop = [...WORDS, ...WORDS];
  return (
    <div className="vf-marquee" data-testid="marquee">
      <div className="marquee-track vf-marquee-track">
        {loop.map((w, i) => (
          <div className="vf-marquee-item" key={`${w}-${i}`}>
            <span>{w}</span>
            <span className="vf-marquee-dot" style={{ background: i % 2 === 0 ? 'var(--ink)' : 'var(--terracotta)' }} aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
