import { useScrollReveal } from "./useScrollReveal";
import { ROUTES } from "../routes";

const pills = ["2-click navigation", "Student-first IA", "Figma Prototype"];

const CardImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div
      className="w-full md:w-1/2"
      style={{ aspectRatio: "16/9", overflow: "hidden", position: "relative" }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top",
          display: "block",
          transition: "transform 400ms ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      />
    </div>
  );
};

export function Projects() {
  const { ref, isVisible } = useScrollReveal(0.1);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 400ms ease-out ${delay}ms, transform 400ms ease-out ${delay}ms`,
  });

  const cardStyle = (delay: number): React.CSSProperties => ({
    ...fadeUp(delay),
    borderRadius: "12px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E8E8E4",
    overflow: "hidden",
    transition: "transform 300ms ease, box-shadow 300ms ease, opacity 400ms ease-out",
    cursor: "pointer",
  });

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)";
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <section id="projects" ref={ref} style={{ backgroundColor: "#F9F9F7", padding: "120px 24px" }}>
      <div className="max-w-[1100px] mx-auto">
        <p style={{ ...fadeUp(0), fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: "12px", letterSpacing: "3px", color: "#6B6B6B", textTransform: "uppercase", marginBottom: "12px" }}>
          WORK
        </p>
        <h2 style={{ ...fadeUp(80), fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "clamp(32px, 4vw, 48px)", color: "#1A1A1A", marginBottom: "48px", lineHeight: 1.2 }}>
          Selected Projects
        </h2>

        {/* Card 1 — UUCMS */}
        <div
          className="flex flex-col md:flex-row"
          style={cardStyle(160)}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onClick={() => window.location.href = ROUTES.caseStudy}
        >
          <CardImage src="/images/uucms-thumbnail.png" alt="UUCMS thumbnail" />
          <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-10">
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "12px", color: "#6B6B6B", marginBottom: "8px", letterSpacing: "0.5px" }}>
              UI/UX Redesign &middot; 2025
            </p>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "clamp(22px, 3vw, 32px)", color: "#1A1A1A", marginBottom: "12px", lineHeight: 1.3 }}>
              UUCMS Student Portal
            </h3>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.5vw, 18px)", color: "#6B6B6B", lineHeight: 1.6, marginBottom: "20px" }}>
              Redesigning a government university portal to reduce task completion time from 15 minutes to under 60 seconds.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {pills.map((pill) => (
                <span key={pill} style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "13px", color: "#6B6B6B", border: "1px solid #D5D5D0", borderRadius: "12px", padding: "5px 14px" }}>
                  {pill}
                </span>
              ))}
            </div>
            <a href={ROUTES.caseStudy} style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: "16px", color: "#4A5240", textDecoration: "none", display: "inline-block" }}>
              View Case Study &rarr;
            </a>
          </div>
        </div>

        {/* Card 2 — BOB Rides */}
        <div
          className="flex flex-col md:flex-row mt-8"
          style={cardStyle(240)}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onClick={() => window.location.href = ROUTES.bobRides}
        >
          <CardImage src="/images/bob-thumbnail.png" alt="BOB Rides thumbnail" />
          <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-10">
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "12px", color: "#6B6B6B", marginBottom: "8px", letterSpacing: "0.5px" }}>
              Icon Design & UI/UX &middot; 2025
            </p>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "clamp(22px, 3vw, 32px)", color: "#1A1A1A", marginBottom: "12px", lineHeight: 1.3 }}>
              BOB Rides
            </h3>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.5vw, 18px)", color: "#6B6B6B", lineHeight: 1.6, marginBottom: "20px" }}>
              Designing a 3D vehicle icon system and UI for a taxi aggregator platform that consolidates Uber, Ola, and Rapido into one app.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["3D Icon System", "Dark-mode Native", "Multi-app Aggregation"].map((pill) => (
                <span key={pill} style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: "13px", color: "#6B6B6B", border: "1px solid #D5D5D0", borderRadius: "12px", padding: "5px 14px" }}>
                  {pill}
                </span>
              ))}
            </div>
            <a href={ROUTES.bobRides} style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: "16px", color: "#4A5240", textDecoration: "none", display: "inline-block" }}>
              View Case Study &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
