import { useEffect, useState } from "react";

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const baseStyle = (delay: number): React.CSSProperties => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 400ms ease-out ${delay}ms, transform 400ms ease-out ${delay}ms`,
  });

  return (
    <section
      id="home"
      className="flex items-center justify-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#F9F9F7",
      }}
    >
      <div className="text-center px-6">
        <h1
          style={{
            ...baseStyle(0),
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(40px, 6vw, 72px)",
            color: "#1A1A1A",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Designing with intent.
        </h1>
        <p
          style={{
            ...baseStyle(100),
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(18px, 2.5vw, 24px)",
            color: "#6B6B6B",
            marginTop: "20px",
            lineHeight: 1.6,
          }}
        >
          Sohum Bhatnagar — UI/UX Designer
        </p>
        <button
          onClick={scrollToProjects}
          className="cursor-pointer"
          style={{
            ...baseStyle(200),
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            color: "#4A5240",
            backgroundColor: "transparent",
            border: "1px solid #4A5240",
            borderRadius: "12px",
            padding: "12px 32px",
            marginTop: "36px",
            transition: `background-color 200ms ease, color 200ms ease, opacity 400ms ease-out 200ms, transform 400ms ease-out 200ms`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#4A5240";
            e.currentTarget.style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#4A5240";
          }}
        >
          View My Work
        </button>
      </div>
    </section>
  );
}
