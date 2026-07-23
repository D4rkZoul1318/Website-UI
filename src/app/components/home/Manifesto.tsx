import { Reveal } from '../camera/Reveal';

const CHAPTERS = [
  {
    n: '01', tag: 'PRINCIPLE',
    title: 'Composition before decoration.',
    body: 'Structure earns attention; ornament borrows it. Every layout is a lens choice — where the eye lands, what falls out of frame, what stays in focus. I begin with hierarchy and negative space, not with textures.',
    active: false,
  },
  {
    n: '02', tag: 'METHOD',
    title: 'Exposure is a design decision.',
    body: 'Interfaces, like photographs, are governed by contrast. What is loud, what is quiet, what is legible under low light. I treat typography, motion, and color as exposure controls — each one deliberately set, never automatic.',
    active: true,
  },
  {
    n: '03', tag: 'PRACTICE',
    title: 'Ship the whole system, not the shot.',
    body: 'A single hero screen is a portrait; a product is a documentary. I design end-to-end — component libraries, motion grammars, and copy voice — so the work stays coherent long after the launch frame.',
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
