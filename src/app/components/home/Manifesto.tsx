import { Reveal } from '../camera/Reveal';

const CHAPTERS = [
  {
    n: '01', tag: 'PRINCIPLE',
    title: 'Composition before decoration.',
    body: 'Every layout is a decision about what the eye finds first and what waits its turn. I start with hierarchy and negative space: structure earns attention, ornament only borrows it. A screen that reads clearly in silence keeps reading clearly under noise.',
    active: false,
  },
  {
    n: '02', tag: 'METHOD',
    title: 'Exposure is never automatic.',
    body: 'Typography, motion, color, and timing all behave like exposure controls: how loud, how quiet, how legible under pressure. I set every one of them by hand, because a system running on defaults eventually feels like nobody was behind the camera.',
    active: true,
  },
  {
    n: '03', tag: 'PRACTICE',
    title: 'Ship the whole system, not the shot.',
    body: 'A single screen is a portrait; a product is everything that happens between screens: how a component behaves across states, how motion carries intent from one interaction to the next. I design those connections as deliberately as the surfaces, because that is where a system holds together or falls apart.',
    active: false,
  },
];

export function Manifesto() {
  return (
    <section id="about" className="vf-manifesto" data-testid="manifesto-section">
      <div className="vf-manifesto-head">
        <span className="vf-meta-text">02 &middot; About / Manifesto</span>
        <span className="vf-meta-rule" style={{ maxWidth: 'none' }} />
        <span className="vf-meta-text">Three chapters &middot; Read 90s</span>
      </div>

      <div className="vf-manifesto-title-wrap">
        <div className="vf-inner">
          <Reveal as="h2" className="vf-section-title">
            A camera, not a canvas.<br /><span className="vf-italic">A short field manual.</span>
          </Reveal>
        </div>
      </div>

      <div className="vf-chapters">
        {CHAPTERS.map((c) => (
          <Reveal className="vf-chapter" key={c.n}>
            <div className="vf-chapter-num-col">
              <div className="vf-chapter-num-row">
                <span className="vf-chapter-num">{c.n}</span>
                <span className="vf-chapter-tag">Ch. {c.n} &middot; {c.tag}</span>
              </div>
            </div>
            <div className="vf-chapter-body-col">
              <h3 className="vf-chapter-title">{c.title}</h3>
              <p className="vf-chapter-text">{c.body}</p>
            </div>
            <div className="vf-chapter-side-col">
              <div className="vf-chapter-side">
                <span className={`vf-chapter-side-dot${c.active ? ' active' : ''}`} aria-hidden="true"></span>
                <span>{c.n} / 03</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
