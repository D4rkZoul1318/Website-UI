import { Reveal } from '../camera/Reveal';
import { ROUTES } from '../../routes';

type WorkProject = {
  frame: string;
  n: string;
  title: string;
  oneLiner: string;
  category: string;
  role: string;
  year: string;
  tag: string;
  focal: string;
  ratio: string;
  url: string;
  image?: string;
  video?: string;
};

const PROJECTS: WorkProject[] = [
  {
    frame: 'A', n: '01',
    title: 'Bob Rides',
    oneLiner: 'Riders juggle three separate apps just to compare a fare. As sole designer, I built the single-screen aggregator that replaces them, a dark-mode-native system anchored by the market’s first 3D vehicle icon set.',
    category: 'Ride-hailing', role: 'Sole Designer', year: '2025', tag: 'Shipped',
    focal: '35mm', ratio: '16:9', url: ROUTES.bobRides,
    image: '/images/bob-thumbnail.webp',
  },
  {
    frame: 'B', n: '02',
    title: 'Rewind',
    oneLiner: 'Every control in a modern music app collapses to the same flat tap. I designed and built a hardware-metaphor player instead: disc rail, EQ knobs, click wheel, each one driving real audio through the Web Audio API.',
    category: 'Hardware UI', role: 'Designer & Builder', year: '2026', tag: 'Submitted',
    focal: '24mm', ratio: '4:3', url: ROUTES.rewindCaseStudy,
    video: '/videos/rewind-preview.mp4',
  },
  {
    frame: 'C', n: '03',
    title: 'UUCMS Redesign',
    oneLiner: 'A government student portal took 15 minutes to surface your own marks. I led the redesign, rebuilding the architecture around student goals instead of admin categories, down to two clicks.',
    category: 'EdTech', role: 'Product Designer', year: '2025', tag: 'Completed',
    focal: '50mm', ratio: '3:2', url: ROUTES.caseStudy,
    image: '/images/uucms-thumbnail.webp',
  },
];

export function SelectedWork() {
  return (
    <section id="work" className="vf-work" data-testid="work-section">
      <div className="vf-section-head">
        <div className="vf-section-head-main">
          <div className="vf-section-head-eyebrow">
            <span className="vf-meta-text">01 &middot; Selected / Work</span>
            <span className="vf-meta-rule" style={{ maxWidth: 200 }} />
            <span className="vf-meta-text">3 Frames &middot; 2024–2026</span>
          </div>
          <Reveal as="h2" className="vf-section-title">
            Frames in focus,<br /><span className="vf-italic">everything else falls out.</span>
          </Reveal>
        </div>
        <div className="vf-section-head-side">
          <p>Three shipped projects from the current roll. Full case studies one click away.</p>
        </div>
      </div>

      <div className="vf-work-list">
        {PROJECTS.map((p) => (
          <div className="vf-project-row" key={p.n}>
            <Reveal className="vf-project-media">
              <a href={p.url} className="vf-project-frame viewfinder-frame">
                <span className="tick-tr" aria-hidden="true"></span>
                <span className="tick-bl" aria-hidden="true"></span>
                {p.video ? (
                  <video src={p.video} autoPlay loop muted playsInline />
                ) : (
                  <img src={p.image} alt={p.title} loading="lazy" />
                )}
                <span className="vf-project-num" aria-hidden="true">{p.n}</span>
                <div className="vf-project-tag-tl">
                  <span className="vf-project-dot" aria-hidden="true"></span>
                  FRAME &middot; {p.frame}
                </div>
                <div className="vf-project-tag-tr">{p.focal}</div>
                <div className="vf-project-tag-bl">ratio {p.ratio}</div>
              </a>
            </Reveal>

            <Reveal className="vf-project-copy">
              <div className="vf-project-status">
                <span className="vf-project-status-dot" aria-hidden="true"></span>
                {p.tag}
              </div>
              <div className="vf-project-num-row">
                <span className="n">{p.n}</span>
                <span className="year">{p.year}</span>
              </div>
              <h3 className="vf-project-title"><a href={p.url}>{p.title}</a></h3>
              <p className="vf-project-oneliner">{p.oneLiner}</p>
              <div className="vf-chip-row">
                <span className="vf-chip">{p.category}</span>
                <span className="vf-chip">{p.role}</span>
                <span className="vf-chip">{p.tag}</span>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
