import { useScrollReveal } from "./useScrollReveal";

const interests = ["UI/UX Design", "Gym", "Gaming"];

const skills = [
  { category: "Design", items: ["Figma", "Photoshop", "Maya"] },
  { category: "Prototyping", items: ["Figma Make"] },
  { category: "AI", items: ["Claude", "Gemini", "ChatGPT"] },
  { category: "Dev", items: ["Git", "Vercel"] },
  { category: "Methods", items: ["UX Research", "Wireframing", "3D Iconography"] },
];

export function About() {
  const { ref, isVisible } = useScrollReveal(0.1);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 400ms ease-out ${delay}ms, transform 400ms ease-out ${delay}ms`,
  });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        backgroundColor: "#F9F9F7",
        padding: "120px 24px",
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        <p
          style={{
            ...fadeUp(0),
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 500,
            fontSize: "12px",
            letterSpacing: "3px",
            color: "#6B6B6B",
            textTransform: "uppercase" as const,
            marginBottom: "48px",
          }}
        >
          ABOUT
        </p>

        {/* Two-column: quote + bio */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Left — Pull Quote */}
          <div className="md:w-1/2" style={fadeUp(80)}>
            <blockquote
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(26px, 3vw, 36px)",
                color: "#1A1A1A",
                lineHeight: 1.4,
                margin: 0,
                padding: 0,
                borderLeft: "none",
              }}
            >
              "Design is how it works, not just how it looks."
            </blockquote>
          </div>

          {/* Right — Body + interests */}
          <div className="md:w-1/2" style={fadeUp(160)}>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(15px, 1.5vw, 18px)",
                color: "#6B6B6B",
                lineHeight: 1.6,
                marginBottom: "28px",
              }}
            >
              I'm Sohum Bhatnagar, a UI/UX designer based in Bangalore. I care
              deeply about how things work — not just how they look. My process
              starts with real problems and ends with interfaces that feel
              obvious in hindsight. When I'm not designing, I'm either at the
              gym or deep in a game. I love technology, and I think the best
              products are the ones that get out of your way.
            </p>

            <div className="flex flex-wrap gap-2">
              {interests.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 400,
                    fontSize: "13px",
                    color: "#6B6B6B",
                    border: "1px solid #D5D5D0",
                    borderRadius: "12px",
                    padding: "5px 14px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Grid — aligned with right column */}
        <div style={{ marginTop: 80, display: 'flex', flexDirection: 'column' }} className="md:flex-row md:gap-16">
          <div className="md:w-1/2" style={{ flexShrink: 0 }} />
          <div className="md:w-1/2">
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                letterSpacing: "3px",
                color: "#6B6B6B",
                textTransform: "uppercase" as const,
                marginBottom: "32px",
              }}
            >
              Skills
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {skills.map(({ category, items }) => (
                <div key={category} style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600,
                      fontSize: "12px",
                      color: "#6B6B6B",
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.08em",
                      minWidth: "120px",
                    }}
                  >
                    {category}
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {items.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          backgroundColor: "#E8E6E0",
                          borderRadius: 999,
                          padding: "6px 16px",
                          fontSize: 13,
                          color: "#1A1A1A",
                          fontWeight: 500,
                          fontFamily: "'Outfit', sans-serif",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div style={{ ...fadeUp(240), marginTop: 80, textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 32,
              color: "#1A1A1A",
            }}
          >
            Get in touch
          </h2>
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 18,
              color: "#6B6B6B",
              marginTop: 8,
            }}
          >
            Have a project in mind or just want to say hi?
          </p>
          <a
            href="/#chill"
            style={{
              display: "inline-block",
              marginTop: 24,
              padding: "12px 24px",
              border: "1px solid #4A5240",
              color: "#4A5240",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              textDecoration: "none",
              borderRadius: "8px",
              transition: "background-color 200ms",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#4A5240";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#4A5240";
            }}
            onClick={(e) => { e.preventDefault(); window.location.href = '/#chill'; }}
          >
            Send me an email
          </a>
        </div>
      </div>
    </section>
  );
}
