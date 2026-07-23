import { Reveal } from '../camera/Reveal';

const PLATE = {
  img: '/images/about/eagle.webp',
  title: 'Crested Hawk-Eagle',
  caption: 'Patience is just focus with nowhere to be.',
};

export function Explorations() {
  return (
    <section id="explorations" className="vf-explorations" data-testid="editorial-section">
      <div className="vf-explorations-head">
        <div className="vf-explorations-head-main">
          <div className="vf-section-head-eyebrow">
            <span className="vf-meta-text">03 &middot; Explorations / Field notes</span>
          </div>
          <Reveal as="h2" className="vf-explorations-title">
            The instrument<br /><span className="vf-italic">is the argument.</span>
          </Reveal>
        </div>
        <div className="vf-explorations-head-side">
          <p>Field studies from the workshop — wildlife photography, camera parts, and the interfaces they inspire. Ongoing, never finished.</p>
        </div>
      </div>

      <div className="vf-explorations-body">
        <div className="vf-plate-rail">
          <span>PLATE</span>
          <span className="vf-plate-rail-mid">Sohum Bhatnagar &middot; Field Studies &middot; 2024–2025</span>
          <span>07</span>
        </div>

        <Reveal className="vf-explorations-photo-col">
          <div className="vf-explorations-frame viewfinder-frame">
            <span className="tick-tr" aria-hidden="true"></span>
            <span className="tick-bl" aria-hidden="true"></span>
            <img src={PLATE.img} alt={PLATE.title} loading="lazy" />
            <div className="vf-explorations-frame-shade" aria-hidden="true"></div>
            <div className="vf-project-tag-tl">
              <span className="vf-project-dot" aria-hidden="true"></span>
              Plate 07 &middot; {PLATE.title}
            </div>
            <div className="vf-project-tag-tr">300mm &middot; f/5.6 &middot; 1/1000</div>
            <div className="vf-explorations-frame-foot">
              <span>N 12.97&deg; &middot; E 77.59&deg;</span>
              <span>Roll 04 / 12</span>
            </div>
          </div>
        </Reveal>

        <div className="vf-explorations-notes-col">
          <Reveal>
            <span>Plate 07 &middot; Notes</span>
            <p>{PLATE.caption} The click of a mechanical shutter is a design decision. It commits. Screens rarely do — I try to design interfaces that behave the same way.</p>
          </Reveal>
          <Reveal>
            <div className="vf-exif">
              <div className="vf-exif-row"><span>Aperture</span><span>f/5.6</span></div>
              <div className="vf-exif-row"><span>Shutter</span><span>1/1000</span></div>
              <div className="vf-exif-row"><span>Focal</span><span>300mm</span></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
