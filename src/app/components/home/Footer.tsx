import { useLocation } from 'react-router-dom';
import { Reveal } from '../camera/Reveal';
import { ROUTES } from '../../routes';
import { ContactForm } from '../ContactForm';
import { handleHashLinkClick } from '../../lib/scrollToHash';

// Work/Contact are same-page anchors on the homepage; prefixing the route
// makes them work as "go home, then scroll" links from every other page too
// (App.tsx's useHashScroll handles the scroll-into-view once we land there;
// handleHashLinkClick below handles clicking them while already on Home).
const DIRECTORY = [
  { href: `${ROUTES.home}#work`, label: 'Work' },
  { href: ROUTES.explorations, label: 'Explorations' },
  { href: ROUTES.about, label: 'About' },
  { href: `${ROUTES.home}#contact`, label: 'Contact' },
];

type FooterProps = {
  /** The red "email me" CTA button + role blurb — homepage only. */
  showEmailCta?: boolean;
  /** Behance link in Elsewhere; other pages show a mail link instead. */
  showBehance?: boolean;
};

export function Footer({ showEmailCta = true, showBehance = true }: FooterProps) {
  const location = useLocation();
  const elsewhere = [
    { href: 'https://www.linkedin.com/in/sohum-bhatnagar-9b2301276/', label: 'LinkedIn' },
    showBehance
      ? { href: 'https://www.behance.net/sohumbhatnagar', label: 'Behance' }
      : { href: 'mailto:sohum1311@gmail.com', label: 'Email' },
    { href: 'https://www.artstation.com/sohum1311', label: 'ArtStation' },
  ];

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

        {showEmailCta && (
          <Reveal className="vf-footer-ctas">
            <a href="mailto:sohum1311@gmail.com" className="vf-btn-terracotta" data-testid="footer-cta-mail">
              sohum1311@gmail.com<span className="arrow">↗</span>
            </a>
            <span className="vf-footer-link-underline" data-testid="footer-cta-role">
              Or, talk about a role, a programme, or a collaboration
            </span>
          </Reveal>
        )}
      </div>

      <div style={{ padding: '40px 24px 0' }}>
        <ContactForm />
      </div>

      <div className="vf-footer-cols">
        <div className="vf-footer-col-status">
          <span className="vf-footer-col-label">Currently</span>
          <div className="vf-footer-status-row">
            <span className="vf-footer-status-dot vf-blink" aria-hidden="true"></span>
            <span className="vf-footer-status-text" data-testid="currently-status">Open to product &amp; interaction design roles, master&rsquo;s programmes, and collaborations.</span>
          </div>
          <p className="vf-footer-location">Based in Bengaluru &middot; Working globally</p>
        </div>

        <div className="vf-footer-col-directory">
          <span className="vf-footer-col-label">Directory</span>
          <ul className="vf-footer-list">
            {DIRECTORY.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={(e) => handleHashLinkClick(e, l.href, location.pathname)}>→ {l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="vf-footer-col-elsewhere">
          <span className="vf-footer-col-label">Elsewhere</span>
          <ul className="vf-footer-list">
            {elsewhere.map((l) => {
              const isMail = l.href.startsWith('mailto:');
              return (
                <li key={l.href}>
                  <a href={l.href} target={isMail ? undefined : '_blank'} rel={isMail ? undefined : 'noopener noreferrer'}>
                    ↗ {l.label}
                  </a>
                </li>
              );
            })}
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
