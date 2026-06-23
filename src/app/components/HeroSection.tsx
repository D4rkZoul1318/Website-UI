import { motion } from "motion/react";

export function HeroSection() {
  return (
    <motion.section
      className="pt-[120px] pb-[80px] px-4 md:px-8 lg:px-12 max-w-[1280px] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900">
        Sohum Bhatnagar
      </h1>
      <p className="mt-3 text-lg md:text-xl text-neutral-500 max-w-[520px] leading-relaxed">
        Product designer building ride-hailing UX for Indian roads.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-xs text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
          Available for opportunities
        </span>
        <span className="text-xs text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
          Bengaluru, India
        </span>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <a
          href="https://linkedin.com/in/sohumbhatnagar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="LinkedIn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a
          href="mailto:sohum1311@gmail.com"
          className="text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="Email"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="Resume"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </a>
      </div>
    </motion.section>
  );
}
