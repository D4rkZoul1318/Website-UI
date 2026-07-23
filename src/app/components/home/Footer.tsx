import { Reveal } from '../camera/Reveal';

const DIRECTORY = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

const ELSEWHERE = [
  { href: 'https://www.linkedin.com/in/sohum-bhatnagar-9b2301276/', label: 'LinkedIn' },
  { href: 'https://www.behance.net/sohumbhatnagar', label: 'Behance' },
  { href: 'https://www.artstation.com/sohum1311', label: 'ArtStation' },
];

export function Footer() {
  return (
    <footer id="contact" className="vf-footer" data-testid="footer">
      <div className="vf-footer-top">
        <div className="vf-footer-eyebrow">
          <span>03 &middot; Contact / Shutter release</span>
          <span className="rule" />
          <span>End of frame</span>
        </div>

        <Reveal as="h2" className="vf-footer-title">
          Let&rsquo;s make<br />something <span className="vf-italic">worth</span><br />keeping.
        </Reveal>

        <Reveal className="vf-footer-ctas">
          <a href="mailto:sohum1311@gmail.com" className="vf-btn-terracotta" data-testid="footer-cta-mail">
            sohum1311@gmail.com<span className="arrow">↗</span>
          </a>
          <a href="mailto:sohum1311@gmail.com?subject=Apprenticeship" className="vf-footer-link-underline" data-testid="footer-cta-role">
            Or, talk about a role
          </a>
        </Reveal>
      </div>

      <div className="vf-footer-cols">
        <div className="vf-footer-col-status">
          <span className="vf-footer-col-label">Currently</span>
          <div className="vf-footer-status-row">
            <span className="vf-footer-status-dot vf-blink" aria-hidden="true"></span>
            <span className="vf-footer-status-text" data-testid="currently-status">Open to roles &amp; apprenticeships.</span>
          </div>
          <p className="vf-footer-location">Based in Bengaluru &middot; Working globally</p>
        </div>

        <div className="vf-footer-col-directory">
          <span className="vf-footer-col-label">Directory</span>
          <ul className="vf-footer-list">
            {DIRECTORY.map((l) => (
              <li key={l.href}><a href={l.href}>→ {l.label}</a></li>
            ))}
          </ul>
        </div>

        <div className="vf-footer-col-elsewhere">
          <span className="vf-footer-col-label">Elsewhere</span>
          <ul className="vf-footer-list">
            {ELSEWHERE.map((l) => (
              <li key={l.href}><a href={l.href} target="_blank" rel="noopener noreferrer">↗ {l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="vf-footer-bottom">
        <div className="vf-footer-ghost" aria-hidden="true">SB &middot; 00</div>
        <div className="vf-footer-fine">
          <span>&copy; 2026 Sohum Bhatnagar</span>
          <span>Set in Bricolage Grotesque &amp; JetBrains Mono</span>
          <span>Built as a viewfinder, not a canvas.</span>
        </div>
      </div>
    </footer>
  );
}
