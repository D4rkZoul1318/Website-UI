import React, { useRef, useState, useEffect } from "react";
import { useScrollReveal } from "./useScrollReveal";

function CoffeeMachine() {
  const [state, setState] = useState<"idle" | "brewing" | "done">("idle");
  const [hint, setHint] = useState("Press the button to brew");
  const s1Ref = useRef<SVGLineElement>(null);
  const s2Ref = useRef<SVGLineElement>(null);
  const cofillRef = useRef<SVGRectElement>(null);
  const stm1Ref = useRef<SVGPathElement>(null);
  const stm2Ref = useRef<SVGPathElement>(null);
  const stm3Ref = useRef<SVGPathElement>(null);
  const steamRunning = useRef(false);
  const stateRef = useRef<"idle" | "brewing" | "done">("idle");

  function animDash(el: SVGElement, from: number, to: number, dur: number, cb?: () => void) {
    let st: number | null = null;
    function step(ts: number) {
      if (!st) st = ts;
      const p = Math.min((ts - st) / dur, 1);
      const e = p * p * (3 - 2 * p);
      el.setAttribute("stroke-dashoffset", String(from + (to - from) * e));
      if (p < 1) requestAnimationFrame(step);
      else if (cb) cb();
    }
    requestAnimationFrame(step);
  }

  function animFill(dur: number, cb?: () => void) {
    const el = cofillRef.current;
    if (!el) return;
    let st: number | null = null;
    function step(ts: number) {
      if (!st) st = ts;
      const p = Math.min((ts - st) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.setAttribute("transform", `scale(1,${e})`);
      if (p < 1) requestAnimationFrame(step);
      else if (cb) cb();
    }
    requestAnimationFrame(step);
  }

  function steamCycle(el: SVGPathElement, delay: number) {
    setTimeout(function go() {
      if (!steamRunning.current) return;
      let st: number | null = null;
      el.style.opacity = "0";
      el.setAttribute("transform", "translate(0,0)");
      function step(ts: number) {
        if (!st) st = ts;
        const p = Math.min((ts - st) / 1800, 1);
        const op = p < 0.2 ? (p / 0.2) * 0.7 : p < 0.75 ? 0.7 : ((1 - p) / 0.25) * 0.7;
        el.style.opacity = String(op);
        el.setAttribute("transform", `translate(0,${-24 * p})`);
        if (p < 1) requestAnimationFrame(step);
        else if (steamRunning.current) go();
      }
      requestAnimationFrame(step);
    }, delay);
  }

  function reset() {
    s1Ref.current?.setAttribute("stroke-dashoffset", "34");
    s2Ref.current?.setAttribute("stroke-dashoffset", "34");
    cofillRef.current?.setAttribute("transform", "scale(1,0)");
    steamRunning.current = false;
    [stm1Ref, stm2Ref, stm3Ref].forEach(r => {
      if (r.current) { r.current.style.opacity = "0"; r.current.setAttribute("transform", ""); }
    });
  }

  function brew() {
    if (stateRef.current === "brewing") return;
    if (stateRef.current === "done") {
      stateRef.current = "idle";
      setState("idle");
      reset();
      setHint("Press the button to brew");
      return;
    }
    stateRef.current = "brewing";
    setState("brewing");
    setHint("Brewing...");

    if (s1Ref.current) animDash(s1Ref.current, 34, 0, 800);
    setTimeout(() => { if (s2Ref.current) animDash(s2Ref.current, 34, 0, 750); }, 50);
    setTimeout(() => {
      animFill(950, () => {
        s1Ref.current?.setAttribute("stroke-dashoffset", "34");
        s2Ref.current?.setAttribute("stroke-dashoffset", "34");
        stateRef.current = "done";
        setState("done");
        setHint("Coffee ready ✓ — click to reset");
        steamRunning.current = true;
        [stm1Ref, stm2Ref, stm3Ref].forEach((r, i) => { if (r.current) steamCycle(r.current, i * 450); });
      });
    }, 260);
  }

  useEffect(() => { reset(); }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width="200" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="198" height="284" rx="20" fill="#6B8A5E"/>
        <rect x="19" y="12" width="162" height="178" rx="14" fill="#7a9a6a"/>
        <rect x="30" y="23" width="140" height="80" rx="10" fill="#669254"/>
        <rect x="41" y="30" width="118" height="66" rx="8" fill="#5a7d4c"/>
        <rect x="50" y="37" width="100" height="52" rx="7" fill="#3a5230"/>
        <text x="100" y="62" textAnchor="middle" fontFamily="'Outfit', sans-serif" fontSize="10" fontWeight="500" fill="#a8c89a" letterSpacing="2">SOHUM</text>
        <text x="100" y="78" textAnchor="middle" fontFamily="'Outfit', sans-serif" fontSize="7" fill="#7a9a6e" letterSpacing="1.8">COFFEE CO.</text>
        <circle cx="100" cy="136" r="21" fill="#3a5230"/>
        <circle cx="100" cy="136" r="17" fill="#4d7040"/>
        <circle cx="100" cy="136" r="13" fill="#5d8050"/>
        <circle cx="100" cy="136" r="5" fill="#2e6d18"/>
        <rect x="98.5" y="119" width="3" height="14" rx="1.5" fill="#2e6d18"/>
        <circle cx="100" cy="136" r="21" fill="transparent" style={{ cursor: "pointer" }} onClick={brew}/>
        <rect x="78" y="181" width="44" height="14" rx="6" fill="#405e33"/>
        <rect x="83" y="185" width="6" height="6" rx="1.5" fill="#88b373"/>
        <rect x="97" y="185" width="6" height="6" rx="1.5" fill="#61924a"/>
        <rect x="111" y="185" width="6" height="6" rx="1.5" fill="#4e8334"/>
        <rect x="84" y="195" width="32" height="9" rx="4" fill="#3a5230"/>
        <rect x="91" y="204" width="3" height="20" rx="1.5" fill="#d9d9d9"/>
        <rect x="106" y="204" width="3" height="20" rx="1.5" fill="#d9d9d9"/>
        <rect x="46" y="226" width="108" height="58" rx="10" fill="#405e33"/>
        <line ref={s1Ref} x1="92.5" y1="224" x2="92.5" y2="258" stroke="#4a1e08" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="34" strokeDashoffset="34"/>
        <line ref={s2Ref} x1="107.5" y1="224" x2="107.5" y2="258" stroke="#7B4A2A" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="34" strokeDashoffset="34"/>
        <ellipse cx="100" cy="277" rx="46" ry="6" fill="#c0aa88"/>
        <path d="M60 250 Q57 250 56 258 L56 272 Q56 278 63 278 L137 278 Q144 278 144 272 L144 258 Q143 250 140 250 Z" fill="#E8DCC8"/>
        <path d="M64 254 Q61 254 60 260 L60 270 Q60 275 66 275 L134 275 Q140 275 140 270 L140 260 Q139 254 136 254 Z" fill="#DDD0B8"/>
        <path d="M144 258 Q153 258 153 265 Q153 272 144 272" fill="none" stroke="#C8B89A" strokeWidth="3.5" strokeLinecap="round"/>
        <defs>
          <clipPath id="cupc">
            <path d="M64 254 Q61 254 60 260 L60 270 Q60 275 66 275 L134 275 Q140 275 140 270 L140 260 Q139 254 136 254 Z"/>
          </clipPath>
        </defs>
        <rect ref={cofillRef} x="60" y="254" width="80" height="21" fill="#6B3A1F" clipPath="url(#cupc)" transform="scale(1,0)" style={{ transformOrigin: "100px 275px" }}/>
        <path ref={stm1Ref} d="M80 248 Q84 238 80 228 Q76 218 80 208" fill="none" stroke="#b0b89a" strokeWidth="1.5" strokeLinecap="round" opacity={0}/>
        <path ref={stm2Ref} d="M100 248 Q104 238 100 228 Q96 218 100 208" fill="none" stroke="#b0b89a" strokeWidth="1.5" strokeLinecap="round" opacity={0}/>
        <path ref={stm3Ref} d="M120 248 Q124 238 120 228 Q116 218 120 208" fill="none" stroke="#b0b89a" strokeWidth="1.5" strokeLinecap="round" opacity={0}/>
      </svg>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "13px", color: "#6B6B6B", marginTop: "14px", letterSpacing: "0.04em" }}>
        {hint}
      </p>
    </div>
  );
}

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
        <p style={{ ...fadeUp(200), fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: "clamp(16px, 2vw, 22px)", color: "#6B6B6B", lineHeight: 1.6, maxWidth: "600px", margin: "0 auto 40px" }}>
          This is the part of the website where we both agree to stop and get a coffee.
        </p>
        <div style={{ ...fadeUp(280), display: "flex", justifyContent: "center" }}>
          <CoffeeMachine />
        </div>
      </div>
    </section>
  );
}
