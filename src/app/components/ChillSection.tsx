import { useScrollReveal } from "./useScrollReveal";

export function ChillSection() {
  const { ref, isVisible } = useScrollReveal(0.15);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 400ms ease-out ${delay}ms, transform 400ms ease-out ${delay}ms`,
  });

  return (
    <section
      id="chill"
      ref={ref}
      className="flex items-center justify-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#F2F0EB",
      }}
    >
      <div className="text-center px-6">
        <div style={{ ...fadeUp(0), fontSize: "64px", marginBottom: "24px" }}>
          &#9749;
        </div>
        <h2
          style={{
            ...fadeUp(80),
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(36px, 5vw, 56px)",
            color: "#1A1A1A",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          Having coffee.
        </h2>
        <p
          style={{
            ...fadeUp(160),
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(22px, 3vw, 32px)",
            color: "#6B6B6B",
            marginTop: "12px",
            lineHeight: 1.6,
          }}
        >
          Want some?
        </p>
        <a
          href="mailto:sohum1311@gmail.com"
          style={{
            ...fadeUp(240),
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            color: "#4A5240",
            textDecoration: "none",
            display: "inline-block",
            marginTop: "28px",
          }}
        >
          sohum@email.com
        </a>
      </div>
    </section>
  );
}
