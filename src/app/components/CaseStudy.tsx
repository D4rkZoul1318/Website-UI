import { useEffect, useRef, useState } from 'react';
import { Navbar } from './Navbar';
import { Linkedin } from 'lucide-react';

const font = 'Outfit, sans-serif';
const nearBlack = '#1A1A1A';
const grey = '#6B6B6B';
const bgColor = '#F9F9F7';
const cardBg = '#EEEEEA';
const warmBg = '#F2F0EB';
const radius = 12;

function FadeUp({ children, stagger = 0 }: { children: React.ReactNode; stagger?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, stagger * 100);
    return () => clearTimeout(timer);
  }, [stagger]);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <span
      style={{
        fontSize: 12,
        color: grey,
        letterSpacing: 3,
        textTransform: 'uppercase' as const,
        fontFamily: font,
        fontWeight: 400,
      }}
    >
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h2
      style={{
        fontSize: 48,
        fontWeight: 700,
        color: nearBlack,
        fontFamily: font,
        lineHeight: 1.15,
        margin: 0,
      }}
    >
      {children}
    </h2>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        backgroundColor: cardBg,
        borderRadius: radius,
        padding: '32px 28px',
        fontFamily: font,
      }}
    >
      <div style={{ fontSize: 40, fontWeight: 700, color: nearBlack, lineHeight: 1.1 }}>
        {value}
      </div>
      <div style={{ fontSize: 14, color: grey, marginTop: 8, fontWeight: 400 }}>{label}</div>
    </div>
  );
}

// Behance icon SVG
function BehanceIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s3-7 7-7 7 7 7 7-3 7-7 7-7-7-7-7z" style={{ display: 'none' }} />
      <rect x="1" y="6" width="11" height="12" rx="2" style={{ display: 'none' }} />
      <path d="M3 9h5a2 2 0 0 1 0 4H3V9z" />
      <path d="M3 13h5.5a2.5 2.5 0 0 1 0 5H3v-5z" />
      <path d="M15 7h6" />
      <path d="M21 13.5a4 4 0 1 0-1 2.5h-5" />
    </svg>
  );
}

export default function CaseStudy() {
  useEffect(() => {
    document.title = 'UUCMS Redesign — Sohum Bhatnagar';
  }, []);

  return (
    <div style={{ backgroundColor: bgColor, fontFamily: font, minHeight: '100vh' }}>
      <Navbar />

      {/* Section 1 — Hero */}
      <section
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '160px 32px 100px',
        }}
      >
        <FadeUp stagger={0}>
          <SectionLabel>UI/UX Redesign · 2025</SectionLabel>
        </FadeUp>
        <FadeUp stagger={1}>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: nearBlack,
              fontFamily: font,
              lineHeight: 1.1,
              margin: '20px 0 0',
            }}
          >
            UUCMS Student Portal
          </h1>
        </FadeUp>
        <FadeUp stagger={2}>
          <p
            style={{
              fontSize: 24,
              fontWeight: 300,
              color: grey,
              fontFamily: font,
              maxWidth: 700,
              lineHeight: 1.5,
              margin: '24px 0 0',
            }}
          >
            Redesigning a government university portal to reduce task completion time from 15 minutes
            to under 60 seconds.
          </p>
        </FadeUp>
        <div style={{ display: 'flex', gap: 16, marginTop: 40, flexWrap: 'wrap' }}>
          {['15 min → 60 sec', '2-click navigation', 'Student-first IA'].map((pill, i) => (
            <FadeUp key={pill} stagger={3 + i}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '10px 24px',
                  border: '1px solid #B0B0B0',
                  borderRadius: 999,
                  fontSize: 14,
                  color: grey,
                  fontFamily: font,
                  fontWeight: 400,
                }}
              >
                {pill}
              </span>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Section 2 — Overview */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'start',
          }}
        >
          <FadeUp>
            <div>
              <h2
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: nearBlack,
                  fontFamily: font,
                  margin: '0 0 24px',
                  lineHeight: 1.2,
                }}
              >
                The Problem
              </h2>
              <p
                style={{
                  fontSize: 18,
                  color: grey,
                  fontFamily: font,
                  lineHeight: 1.7,
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                UUCMS is the official student portal for Karnataka's Department of Higher Education.
                Despite being a primary academic tool, finding marks required navigating through an
                admin-centric structure that had no logical connection to how students think. What
                should have taken seconds took 10–15 minutes — and for students less familiar with
                technology, it was impossible without help.
              </p>
            </div>
          </FadeUp>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { value: '15 min', label: 'Average time to find results' },
              { value: '12', label: 'Columns in the original marks table' },
              { value: '0', label: 'Back buttons on the original portal' },
            ].map((stat, i) => (
              <FadeUp key={stat.label} stagger={i}>
                <StatCard value={stat.value} label={stat.label} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Research */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
        <FadeUp>
          <SectionLabel>Research</SectionLabel>
        </FadeUp>
        <FadeUp stagger={1}>
          <SectionHeading>Understanding the Failure</SectionHeading>
        </FadeUp>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
            marginTop: 48,
          }}
        >
          {[
            {
              heading: 'First-hand Experience',
              subheading: 'Personal Observation',
              body: 'As a direct user of UUCMS, navigation patterns and failure states were documented through repeated use. Initial attempts to locate the marks card required navigating through multiple misleading subsections — results were filed under exam and fee categories with no logical grouping.',
            },
            {
              heading: 'Peer Validation',
              subheading: 'User Interviews',
              body: 'Conversations with classmates revealed a consistent pattern. Students less familiar with technology could not navigate independently. Digitally fluent students resorted to phone calls with peers to navigate together. When a digital tool requires human assistance for a primary task, the tool has failed.',
            },
            {
              heading: 'System Audit',
              subheading: 'Heuristic Evaluation',
              body: "The portal was evaluated against Nielsen's 10 Usability Heuristics. Critical violations found: no system feedback, admin-centric labelling, zero back navigation, hover flyouts requiring pixel-precise interaction, and no wayfinding or breadcrumbs.",
            },
          ].map((card, i) => (
            <FadeUp key={card.heading} stagger={2 + i}>
              <div
                style={{
                  backgroundColor: cardBg,
                  borderRadius: radius,
                  padding: '32px 28px',
                  fontFamily: font,
                  height: '100%',
                }}
              >
                <div
                  style={{ fontSize: 12, color: grey, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8, fontWeight: 400 }}
                >
                  {card.subheading}
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: nearBlack,
                    margin: '0 0 16px',
                    lineHeight: 1.3,
                  }}
                >
                  {card.heading}
                </h3>
                <p style={{ fontSize: 16, color: grey, lineHeight: 1.7, margin: 0, fontWeight: 400 }}>
                  {card.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Section 4 — Competitive Analysis */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
        <FadeUp>
          <SectionLabel>Research</SectionLabel>
        </FadeUp>
        <FadeUp stagger={1}>
          <SectionHeading>What Others Got Right</SectionHeading>
        </FadeUp>
        <FadeUp stagger={2}>
          <p
            style={{
              fontSize: 18,
              color: grey,
              fontFamily: font,
              lineHeight: 1.6,
              margin: '16px 0 0',
              fontWeight: 400,
            }}
          >
            Four reference points studied to identify patterns worth adopting.
          </p>
        </FadeUp>
        <FadeUp stagger={3}>
          <div
            style={{
              marginTop: 40,
              borderRadius: radius,
              overflow: 'hidden',
              fontFamily: font,
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 16,
                fontFamily: font,
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#E8E6E1' }}>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '16px 24px',
                      fontWeight: 700,
                      color: nearBlack,
                      fontSize: 14,
                    }}
                  >
                    Platform
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '16px 24px',
                      fontWeight: 700,
                      color: nearBlack,
                      fontSize: 14,
                    }}
                  >
                    Key Observation
                  </th>
                  <th
                    style={{
                      textAlign: 'left',
                      padding: '16px 24px',
                      fontWeight: 700,
                      color: nearBlack,
                      fontSize: 14,
                    }}
                  >
                    Influence on Redesign
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    platform: 'Manipal University Portal',
                    observation: 'Calendar highlights upcoming exams on dashboard',
                    influence: 'Inspired Updates + Calendar section',
                  },
                  {
                    platform: 'Google Classroom',
                    observation: 'Card-based layout for course information',
                    influence: 'Informed Results and Payments card layout',
                  },
                  {
                    platform: 'Notion',
                    observation: 'Minimal clean sidebar with clear hierarchy',
                    influence: 'Influenced sidebar navigation structure',
                  },
                  {
                    platform: 'Dribbble Portals',
                    observation: 'Multiple features on one page without clutter when spaced correctly',
                    influence: 'Validated information-dense dashboard approach',
                  },
                ].map((row, i) => (
                  <tr
                    key={row.platform}
                    style={{
                      backgroundColor: i % 2 === 1 ? '#F2F0EB' : 'transparent',
                    }}
                  >
                    <td
                      style={{
                        padding: '16px 24px',
                        color: nearBlack,
                        fontWeight: 400,
                        borderBottom: '1px solid rgba(0,0,0,0.05)',
                      }}
                    >
                      {row.platform}
                    </td>
                    <td
                      style={{
                        padding: '16px 24px',
                        color: grey,
                        fontWeight: 400,
                        borderBottom: '1px solid rgba(0,0,0,0.05)',
                      }}
                    >
                      {row.observation}
                    </td>
                    <td
                      style={{
                        padding: '16px 24px',
                        color: grey,
                        fontWeight: 400,
                        borderBottom: '1px solid rgba(0,0,0,0.05)',
                      }}
                    >
                      {row.influence}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>
      </section>

      {/* Section 5 — Before and After */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
        <FadeUp>
          <SectionLabel>Design</SectionLabel>
        </FadeUp>
        <FadeUp stagger={1}>
          <SectionHeading>Before and After</SectionHeading>
        </FadeUp>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
            marginTop: 48,
          }}
        >
          <FadeUp stagger={2}>
            <div>
              <div
                style={{
                  fontSize: 14,
                  color: grey,
                  fontWeight: 700,
                  marginBottom: 16,
                  fontFamily: font,
                }}
              >
                Before — Original UUCMS
              </div>
              <img src="/images/original-uucms.png" width="100%" height="400px" style={{borderRadius: "12px", display: "block", objectFit: "cover", objectPosition: "top"}} />
              <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
                {['Admin-centric navigation', 'No back button', 'Hover flyout menus'].map(
                  (tag) => (
                    <span
                      key={tag}
                      style={{
                        display: 'inline-block',
                        padding: '6px 16px',
                        border: '1px solid rgba(180, 80, 80, 0.3)',
                        borderRadius: 999,
                        fontSize: 13,
                        color: '#9B4444',
                        fontFamily: font,
                        fontWeight: 400,
                      }}
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </FadeUp>
          <FadeUp stagger={3}>
            <div>
              <div
                style={{
                  fontSize: 14,
                  color: grey,
                  fontWeight: 700,
                  marginBottom: 16,
                  fontFamily: font,
                }}
              >
                After — Redesigned Dashboard
              </div>
              <img src="/images/redesigned-dashboard.png" width="100%" height="400px" style={{borderRadius: "12px", display: "block", objectFit: "cover", objectPosition: "top"}} />
              <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
                {['Goal-oriented navigation', 'Breadcrumb wayfinding', '2-click to results'].map(
                  (tag) => (
                    <span
                      key={tag}
                      style={{
                        display: 'inline-block',
                        padding: '6px 16px',
                        border: '1px solid rgba(80, 140, 80, 0.3)',
                        borderRadius: 999,
                        fontSize: 13,
                        color: '#4A7A4A',
                        fontFamily: font,
                        fontWeight: 400,
                      }}
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Section 6 — Key Design Decisions */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
        <FadeUp>
          <SectionLabel>Design</SectionLabel>
        </FadeUp>
        <FadeUp stagger={1}>
          <SectionHeading>Decisions That Mattered</SectionHeading>
        </FadeUp>
        <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 48 }}>
          {[
            {
              num: '01',
              heading: 'Goal-oriented Information Architecture',
              body: 'The original portal organised information around administrative categories — Academics, Exam, Reports. Students think in goals — I want to see my marks, I want to pay my fee. Every navigation label was rewritten to reflect student intent, not backend structure.',
            },
            {
              num: '02',
              heading: 'Progressive Disclosure',
              body: 'The dashboard surfaces the most critical information immediately — current SGPA, payment status, upcoming events. Detail is accessible on demand. Students get answers in seconds without being overwhelmed by the full system complexity.',
            },
            {
              num: '03',
              heading: 'Wayfinding by Default',
              body: 'The original portal had zero back navigation. Every page in the redesign has breadcrumbs, an active sidebar state, and a consistent shell. Users always know where they are and how to get back.',
            },
          ].map((item, i) => (
            <FadeUp key={item.num} stagger={2 + i}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr',
                  gap: 40,
                  alignItems: 'start',
                }}
              >
                <div
                  style={{
                    fontSize: 80,
                    fontWeight: 700,
                    color: '#E0DED9',
                    fontFamily: font,
                    lineHeight: 1,
                  }}
                >
                  {item.num}
                </div>
                <div style={{ paddingTop: 8 }}>
                  <h3
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: nearBlack,
                      fontFamily: font,
                      margin: '0 0 12px',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.heading}
                  </h3>
                  <p
                    style={{
                      fontSize: 18,
                      color: grey,
                      fontFamily: font,
                      lineHeight: 1.7,
                      margin: 0,
                      fontWeight: 400,
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Section 7 — Final Design */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
        <FadeUp>
          <SectionLabel>Outcome</SectionLabel>
        </FadeUp>
        <FadeUp stagger={1}>
          <SectionHeading>The Redesign</SectionHeading>
        </FadeUp>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 32,
            marginTop: 48,
          }}
        >
          {['Dashboard', 'Results Page'].map((label, i) => (
            <FadeUp key={label} stagger={2 + i}>
              <div>
                <img src={label === 'Dashboard' ? '/images/redesigned-dashboard.png' : '/images/results.png'} width="100%" style={{borderRadius: "12px", display: "block"}} />
                <div
                  style={{
                    fontSize: 14,
                    color: grey,
                    fontFamily: font,
                    marginTop: 12,
                    textAlign: 'center',
                    fontWeight: 400,
                  }}
                >
                  {label}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp stagger={4}>
          <p
            style={{
              textAlign: 'center',
              fontSize: 14,
              color: '#A0A0A0',
              fontFamily: font,
              marginTop: 32,
              fontWeight: 400,
            }}
          >
            Interactive prototype available in Figma.
          </p>
        </FadeUp>
      </section>

      {/* Section 8 — Outcome */}
      <section style={{ backgroundColor: warmBg, padding: '100px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <FadeUp>
            <SectionHeading>What Changed</SectionHeading>
          </FadeUp>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              marginTop: 48,
              textAlign: 'left',
            }}
          >
            {[
              { value: '2 clicks', label: 'To access results from dashboard' },
              { value: '15 min → 60 sec', label: 'Task completion time reduction' },
              { value: '100%', label: 'Students could navigate independently' },
            ].map((stat, i) => (
              <FadeUp key={stat.label} stagger={1 + i}>
                <StatCard value={stat.value} label={stat.label} />
              </FadeUp>
            ))}
          </div>
          <FadeUp stagger={4}>
            <p
              style={{
                fontSize: 24,
                fontWeight: 300,
                fontStyle: 'italic',
                color: grey,
                fontFamily: font,
                marginTop: 56,
                lineHeight: 1.5,
              }}
            >
              "The best redesign is the one students don't have to think about."
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '40px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: font,
          borderTop: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <span style={{ fontSize: 14, color: grey, fontWeight: 400 }}>© 2025 Sohum Bhatnagar</span>
        <span
          style={{
            fontSize: 12,
            color: '#A0A0A0',
            fontStyle: 'italic',
            fontWeight: 400,
          }}
        >
          Designed in Figma. Built with intent.
        </span>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <a
            href="#"
            style={{ color: grey, transition: 'color 200ms' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = nearBlack)}
            onMouseLeave={(e) => (e.currentTarget.style.color = grey)}
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="#"
            style={{ color: grey, transition: 'color 200ms' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = nearBlack)}
            onMouseLeave={(e) => (e.currentTarget.style.color = grey)}
            aria-label="Behance"
          >
            <BehanceIcon />
          </a>
        </div>
      </footer>
    </div>
  );
}
