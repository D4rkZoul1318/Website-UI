import { useScrollReveal } from "./useScrollReveal";

export function ChillSection() {
  const { ref, isVisible } = useScrollReveal(0.15);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 400ms ease-out ${delay}ms, transform 400ms ease-out ${delay}ms`,
  });

  return (
    <section id="chill" ref={ref} className="flex items-center justify-center" style={{ minHeight: "100vh", backgroundColor: "#F2F0EB" }}>
      <div className="text-center px-6">
        <div style={{ ...fadeUp(0), fontSize: "64px", marginBottom: "24px" }}>&#9749;</div>
        <h2 style={{ ...fadeUp(80), fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 46px)", color: "#1A1A1A", lineHeight: 1.2, margin: 0 }}>
          Somewhere between pixel 1 and line 12,000,
        </h2>
        <h2 style={{ ...fadeUp(120), fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "clamp(28px, 4vw, 46px)", color: "#1A1A1A", lineHeight: 1.2, margin: "0 0 20px" }}>
          a designer accidentally became a developer.
        </h2>
        <p style={{ ...fadeUp(200), fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: "clamp(16px, 2vw, 22px)", color: "#6B6B6B", lineHeight: 1.6, maxWidth: "600px", margin: "0 auto 32px" }}>
          This is the part of the website where we both agree to stop and get a coffee.
        </p>
        <a href="mailto:sohum1311@gmail.com" style={{ ...fadeUp(280), fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: "15px", color: "#4A5240", textDecoration: "none", display: "inline-block", padding: "10px 24px", border: "1px solid #4A5240", borderRadius: "999px" }}>
          sohum1311@gmail.com
        </a>
      </div>
    </section>
  );
}
