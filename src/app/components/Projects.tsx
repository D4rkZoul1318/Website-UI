import { useScrollReveal } from "./useScrollReveal";

const pills = ["2-click navigation", "Student-first IA", "Figma Prototype"];

export function Projects() {
  const { ref, isVisible } = useScrollReveal(0.1);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 400ms ease-out ${delay}ms, transform 400ms ease-out ${delay}ms`,
  });

  return (
    <section
      id="projects"
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
            marginBottom: "12px",
          }}
        >
          WORK
        </p>
        <h2
          style={{
            ...fadeUp(80),
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(32px, 4vw, 48px)",
            color: "#1A1A1A",
            marginBottom: "48px",
            lineHeight: 1.2,
          }}
        >
          Selected Projects
        </h2>

        {/* Project Card */}
        <div
          className="flex flex-col md:flex-row gap-0 md:gap-8 overflow-hidden"
          style={{
            ...fadeUp(160),
            borderRadius: "12px",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E8E8E4",
            transition: "transform 200ms ease, opacity 400ms ease-out 160ms",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = isVisible ? "translateY(0)" : "translateY(40px)";
          }}
        >
          {/* Left — Thumbnail */}
          <div
            className="md:w-1/2 w-full flex items-center justify-center"
            style={{
              backgroundColor: "#EEEEEA",
              minHeight: "280px",
              borderRadius: "12px 12px 0 0",
            }}
          >
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "#AEAEA8",
              }}
            >
              Project Thumbnail
            </span>
          </div>

          {/* Right — Details */}
          <div className="md:w-1/2 w-full flex flex-col justify-center p-8 md:p-10">
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                color: "#6B6B6B",
                marginBottom: "8px",
                letterSpacing: "0.5px",
              }}
            >
              UI/UX Redesign &middot; 2025
            </p>
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(24px, 3vw, 32px)",
                color: "#1A1A1A",
                marginBottom: "12px",
                lineHeight: 1.3,
              }}
            >
              UUCMS Student Portal
            </h3>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(15px, 1.5vw, 18px)",
                color: "#6B6B6B",
                lineHeight: 1.6,
                marginBottom: "20px",
              }}
            >
              Redesigning a government university portal to reduce task
              completion time from 15 minutes to under 60 seconds.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {pills.map((pill) => (
                <span
                  key={pill}
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
                  {pill}
                </span>
              ))}
            </div>

            <a
              href="#"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                color: "#4A5240",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              View Case Study &rarr;
            </a>
          </div>
        </div>

        <p
          style={{
            ...fadeUp(240),
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            color: "#AEAEA8",
            textAlign: "center",
            marginTop: "48px",
          }}
        >
          More projects coming soon.
        </p>
      </div>
    </section>
  );
}
