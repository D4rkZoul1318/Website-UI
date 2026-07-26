import { useEffect, useState } from 'react';
import { Reveal, staggerDelay } from '../camera/Reveal';
import { ROUTES } from '../../routes';
import { Footer } from '../home/Footer';

/* VIEWFINDER — an alternate homepage exploration reconstructed from a
 * frame-sampled screen recording of an "Emergent" preview pane, not from
 * the live source itself. Lives at /viewfinder, separate from the
 * shipped CameraHome, so the two can be compared side by side.
 *
 * Content confidence follows the source doc's own grading:
 *  - plain text below is CONFIRMED (read directly off multiple frames)
 *  - anything visually built to fill an unmeasured value carries an
 *    inline comment saying so — none of that is claimed as accurate,
 *    it's there to look at and replace once the real source is checked.
 *
 * Work section: the three cards are the three real, shipped case studies
 * already in this repo (Bob Rides, UUCMS, Rewind) — copy and metadata
 * pulled directly from CameraHome.tsx's PROJECTS array, not invented, and
 * each card links out to its real route. This replaced the source doc's
 * placeholder cards (one of which had an illegible, GAP-flagged title).
 */

const WORK_CARDS = [
  {
    frame: 'A',
    focal: '35MM',
    ratio: '16:9',
    num: '01',
    numLabel: '01 · 2025',
    title: 'Bob Rides — a 3D vehicle icon system for ride-hailing.',
    desc: 'A live ride-hailing aggregator that compares Uber, Ola, and Rapido in one screen — sole designer across a full 3D vehicle icon system and a dark-mode-native token system.',
    tags: ['MOBILE UX', 'RIDE-HAILING', '3D ICONS'],
    tag: 'SHIPPED',
    url: ROUTES.bobRides,
    visual: { type: 'triptych' as const, images: ['/images/bob-images/Bike.webp', '/images/bob-images/Auto.webp', '/images/bob-images/Car.webp'] },
  },
  {
    frame: 'B',
    focal: '50MM',
    ratio: '3:2',
    num: '02',
    numLabel: '02 · 2025',
    title: 'UUCMS Redesign — from 12 steps to 4 for Karnataka’s student portal.',
    desc: 'A redesign of UUCMS, the official student portal for Karnataka’s Department of Higher Education, used by students across the state each term.',
    tags: ['EDTECH', 'RESPONSIVE WEB', 'INFORMATION ARCHITECTURE'],
    tag: 'COMPLETED',
    url: ROUTES.caseStudy,
    visual: { type: 'image' as const, src: '/images/redesigned-dashboard.webp' },
  },
  {
    frame: 'C',
    focal: '24MM',
    ratio: '4:3',
    num: '03',
    numLabel: '03 · 2026',
    title: 'Rewind — a hardware-inspired browser music player.',
    desc: 'A nostalgic, hardware-inspired browser music player with spatial audio — built for the Figma Config Makeathon 2026 using the Web Audio API.',
    tags: ['HARDWARE UI', 'MAKEATHON', 'WEB AUDIO API'],
    tag: 'SUBMITTED',
    url: ROUTES.rewindCaseStudy,
    visual: { type: 'image' as const, src: '/images/rewind/instrument.webp' },
  },
];

const CHAPTERS = [
  {
    num: '01',
    label: 'CH.01 · PRINCIPLE',
    title: 'Composition before decoration.',
    body: 'Structure earns attention; ornament borrows it. Every layout is a lens choice — where the eye lands, what falls out of frame, what stays in focus. I begin with hierarchy and negative space, not with textures.',
  },
  {
    num: '02',
    label: 'CH.02 · METHOD',
    title: 'Exposure is a design decision.',
    body: 'Interfaces, like photographs, are governed by contrast. What is loud, what is quiet, what is legible under low light. I treat typography, motion, and color as exposure controls — each one deliberately set, never automatic.',
  },
  {
    num: '03',
    label: 'CH.03 · PRACTICE',
    title: 'Ship the whole system, not the shot.',
    // GAP: this sentence is truncated at the frame edge in every sampled
    // timestamp in the source — left exactly as confirmed, not completed.
    body: 'A single hero screen is a portrait; a product is a—',
  },
];

function useIstClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date());
    setTime(format());
    const id = window.setInterval(() => setTime(format()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export default function Viewfinder() {
  const clock = useIstClock();

  return (
    <div className="viewfinder-theme">
      <nav className="vf-nav" aria-label="Primary">
        <a href="#hero" className="vf-nav-mark">
          <span className="dot" />
          SB / VIEWFINDER
        </a>
        <ul className="vf-nav-links">
          <li><a href="#work">01 WORK</a></li>
          <li><a href="#about">02 ABOUT</a></li>
          <li><a href="#explorations">03 EXPLORATIONS</a></li>
          <li><a href="#contact">04 CONTACT</a></li>
        </ul>
        <div className="vf-nav-right">
          <span className="vf-nav-clock">IST · {clock}</span>
          <span className="vf-nav-status"><span className="dot" /> <span className="label">AVAILABLE</span></span>
        </div>
      </nav>

      <div className="vf-subbar">
        <span>00 / HOME · VIEWFINDER</span>
        <span className="vf-subbar-rule" />
        <span>F/2.8 · 1/250 · ISO 200</span>
        <span className="vf-subbar-rec"><span className="dot" /> REC · PORTFOLIO 2025</span>
      </div>

      <section id="hero" className="vf-hero">
        <div className="vf-hero-rings" aria-hidden="true" />
        <div className="vf-hero-grid">
          <div className="vf-hero-headline">
            <span className="vf-crosshair" aria-hidden="true" />
            <h1 className="vf-hero-name">
              Sohum
              <br />
              Bhatnagar
              <span className="vf-hero-looking">is looking.</span>
            </h1>
            <p className="vf-hero-body">
              Multidisciplinary work spanning UI/UX, 3D visual production, brand design, and
              AI-assisted workflows — I design complex digital products end-to-end, from the
              first sketch to the shipped system.
            </p>
            <div className="vf-hero-cta">
              <a className="vf-cta-pill" href="#work">FOCUS / SELECTED WORK →</a>
              <a className="vf-text-link" href="#contact">OR, GET IN TOUCH</a>
            </div>
            <p className="vf-fold">—— SCROLL · SHUTTER OPEN</p>
          </div>

          <div className="vf-dial-col">
            <div className="vf-dial" aria-hidden="true">
              <span className="vf-dial-center" />
            </div>
            <div className="vf-dial-labels">
              {/* GAP: the two flanking labels beside the dial's center dot
                  were illegible at capture resolution. */}
              <span>IRIS</span>
              <span>OPEN</span>
            </div>
            <p className="vf-dial-frame">FRAME · <b>001 / 128</b></p>
            <p className="vf-dial-desc">
              Designer, photographer, and storyteller interested in how people interact with
              systems.
            </p>
          </div>
        </div>
      </section>

      <div className="vf-marquee" aria-hidden="true">
        <div className="vf-marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <div className="vf-marquee-item" key={i}>
              {Array.from({ length: 4 }).map((_, j) => (
                <span key={j}>
                  3D Visual Production <span className="vf-marquee-dot">·</span> Brand Design
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="work" className="vf-section">
        <div className="vf-wrap">
          <div className="vf-section-top">
            <div>
              <div className="vf-section-head">
                01 · SELECTED / WORK <span className="rule" />
              </div>
              <h2 className="vf-section-headline">
                Frames in focus,
                <em>everything else falls out.</em>
              </h2>
            </div>
            <p className="vf-section-caption">
              THREE SHIPPED FRAMES FROM THE CURRENT ROLL. FULL CASE STUDIES ONE CLICK AWAY.
            </p>
          </div>

          {WORK_CARDS.map((card, i) => (
            <Reveal as="div" className="vf-work-card" delay={staggerDelay(i)} key={card.frame}>
              <a className="vf-frame" href={card.url}>
                {card.visual.type === 'image' ? (
                  <img className="vf-frame-photo" src={card.visual.src} alt="" loading="lazy" decoding="async" />
                ) : (
                  <div className="vf-frame-triptych">
                    {card.visual.images.map((src) => (
                      <img key={src} src={src} alt="" loading="lazy" decoding="async" />
                    ))}
                  </div>
                )}
                <div className="vf-frame-grid" />
                <span className="vf-frame-corner">FRAME · {card.frame}</span>
                <span className="vf-frame-focal">{card.focal}</span>
                <span className="vf-frame-ratio">RATIO {card.ratio}</span>
                <span className="vf-frame-crosshair" />
                <span className="vf-frame-num">{card.num}</span>
              </a>
              <div className="vf-work-copy">
                <div className="vf-work-tag"><span className="sq" />CASE STUDY · {card.tag}</div>
                <div className="vf-work-num">{card.numLabel}</div>
                <h3 className="vf-work-title"><a href={card.url}>{card.title}</a></h3>
                <p className="vf-work-desc">{card.desc}</p>
                <div className="vf-work-tags">
                  {card.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
                <a className="vf-text-link vf-text-link--on-dark vf-work-view" href={card.url}>VIEW CASE STUDY →</a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="about" className="vf-section">
        <div className="vf-wrap">
          <div className="vf-section-top">
            <div>
              <div className="vf-section-head">
                02 · ABOUT / MANIFESTO <span className="rule" />
              </div>
              <h2 className="vf-section-headline">
                A camera, not a canvas.
                <em>A short field manual.</em>
              </h2>
            </div>
            <p className="vf-section-caption">THREE CHAPTERS · READ 90S</p>
          </div>

          {CHAPTERS.map((ch, i) => (
            <Reveal as="div" className="vf-chapter" delay={staggerDelay(i)} key={ch.num}>
              <div className="vf-chapter-num">{ch.num}</div>
              <div>
                <div className="vf-chapter-label">{ch.label}</div>
                <h3 className="vf-chapter-title">{ch.title}</h3>
                <p className="vf-chapter-body">{ch.body}</p>
                <div className="vf-chapter-foot">
                  <div className="vf-chapter-dots">
                    {CHAPTERS.map((_, j) => <span key={j} className={j === i ? 'is-active' : ''} />)}
                  </div>
                  {ch.num} / 03
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="explorations" className="vf-section">
        <div className="vf-wrap">
          <div className="vf-section-top">
            <div>
              <div className="vf-section-head">
                03 · EXPLORATIONS / FIELD NOTES <span className="rule" />
              </div>
              <h2 className="vf-section-headline">
                The instrument
                <em>is the argument.</em>
              </h2>
            </div>
            <p className="vf-section-caption">
              Field studies from the workshop — camera parts, mechanical objects, and the
              interfaces they inspire. Ongoing, never finished.
            </p>
          </div>

          <Reveal as="div" className="vf-plate">
            <div className="vf-plate-strip">
              PLATE · 07 · SOHUM BHATNAGAR · FIELD STUDIES · 2024
            </div>
            <div className="vf-plate-photo">
              {/* Stand-in graphic — no matching lens-barrel product photo
                  exists in the repo's assets; replace with the real plate
                  photo before shipping. */}
              <div className="vf-plate-photo-art"><div className="vf-lens-art" /></div>
              <div className="vf-plate-overlay-top">
                <span>PLATE 07 · LENS BARREL</span>
                <span>50MM · F/1.8 · 1/500</span>
              </div>
              <div className="vf-plate-overlay-bottom">
                <span>N 28.61° · E 77.20°</span>
                <span>ROLL 04 / 12</span>
              </div>
            </div>
            <div className="vf-plate-notes">
              <div>
                <div className="vf-plate-notes-head">PLATE 07 · NOTES</div>
                <p className="vf-plate-quote">
                  "The click of a mechanical shutter is a design decision. It commits. Screens
                  rarely do — I try to design interfaces that behave the same way."
                </p>
              </div>
              <div className="vf-plate-specs">
                <div>APERTURE<b>F/1.8</b></div>
                <div>SHUTTER<b>1/500</b></div>
                <div>ISO<b>400</b></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="vf-section vf-contact">
        <div className="vf-wrap">
          <div className="vf-section-head">
            04 · CONTACT / SHUTTER RELEASE <span className="rule" /> END OF FRAME
          </div>
          <Reveal as="h2" className="vf-contact-headline">
            <span className="vf-contact-line">Let's make something</span>
            <span className="vf-contact-line"><em>worth</em></span>
            <span className="vf-contact-line">keeping.</span>
          </Reveal>
          <Reveal className="vf-contact-cta" delay={staggerDelay(1)}>
            <a className="vf-cta-pill vf-cta-pill--accent" href="mailto:hello@sohum.design">
              HELLO@SOHUM.DESIGN →
            </a>
            <a className="vf-text-link vf-text-link--on-dark" href="mailto:sohum1311@gmail.com">OR, TALK ABOUT A ROLE</a>
          </Reveal>
        </div>
      </section>

      <div className="camera-theme">
        <Footer showEmailCta={false} showBehance={false} />
      </div>
    </div>
  );
}
