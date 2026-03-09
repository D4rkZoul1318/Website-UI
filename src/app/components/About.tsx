import { useScrollReveal } from "./useScrollReveal";

const interests = ["UI/UX Design", "Gym", "Gaming"];

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

          {/* Right — Body */}
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

            {/* Contact section */}
            <div style={fadeUp(240)} className="mt-16 text-center">
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
                href="mailto:sohum1311@gmail.com"
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
              >
                Send me an email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
