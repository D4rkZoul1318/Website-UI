import { motion } from "motion/react";
import Cubes from "./Cubes";

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(240,237,232,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(240,237,232,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 items-center max-w-[1400px] mx-auto w-full">
        <div className="relative z-20">
          <motion.p
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[11px] uppercase tracking-[0.2em] text-[#737373] mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Product Designer // Mobile UX // Creative Tech
          </motion.p>

          <motion.h1
            className="font-semibold text-[#F0EDE8]"
            style={{
              fontSize: "clamp(3rem, 8vw, 8rem)",
              letterSpacing: "-0.05em",
              lineHeight: 0.85,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            Sohum
            <br />
            Bhatnagar
          </motion.h1>

          <motion.p
            className="mt-8 text-base md:text-lg text-[#A3A3A3] max-w-[480px] leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Designing interfaces for mobility and sound. Currently the sole
            designer at Bob Rides, building ride-hailing UX used on Indian roads
            daily.
          </motion.p>

          <motion.div
            className="mt-8 flex gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <a
              href="https://linkedin.com/in/sohumbhatnagar"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] uppercase tracking-widest text-[#737373] hover:text-[#E8734A] transition-colors duration-300"
            >
              LinkedIn ↗
            </a>
            <a
              href="mailto:sohum1311@gmail.com"
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] uppercase tracking-widest text-[#737373] hover:text-[#E8734A] transition-colors duration-300"
            >
              Email
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[12px] uppercase tracking-widest text-[#737373] hover:text-[#E8734A] transition-colors duration-300"
            >
              Resume ↗
            </a>
          </motion.div>
        </div>

        <div className="hidden lg:block h-[600px] relative -mr-16">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0C0C0C] to-transparent z-10 pointer-events-none" />
          <Cubes
            gridSize={10}
            maxAngle={120}
            radius={4}
            borderStyle="1px solid #333333"
            faceColor="#0C0C0C"
            rippleColor="#E8734A"
            rippleSpeed={1.5}
            autoAnimate={true}
            rippleOnClick={true}
          />
        </div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <span
          style={{ fontFamily: "var(--font-mono)" }}
          className="text-[10px] uppercase tracking-widest text-[#737373]"
        >
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#737373] to-transparent" />
      </motion.div>
    </section>
  );
}
