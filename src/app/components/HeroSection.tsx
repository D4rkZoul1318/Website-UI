import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-8xl font-bold tracking-tighter text-neutral-900"
            style={{ lineHeight: 0.9, letterSpacing: "-0.05em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Sohum
            <br />
            Bhatnagar
          </motion.h1>

          <motion.div
            className="mt-6 flex flex-col gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="text-lg text-neutral-400 font-light">Product Design</span>
            <span className="text-lg text-neutral-400 font-light">Mobile UX</span>
            <span className="text-lg text-neutral-400 font-light">Creative Tech</span>
          </motion.div>

          <motion.div
            className="mt-8 flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <a
              href="https://linkedin.com/in/sohumbhatnagar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors underline underline-offset-4"
            >
              LinkedIn
            </a>
            <a
              href="mailto:sohum1311@gmail.com"
              className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors underline underline-offset-4"
            >
              Email
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors underline underline-offset-4"
            >
              Resume
            </a>
          </motion.div>
        </div>

        <motion.div
          className="flex gap-4 items-end justify-center lg:justify-end"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-[120px] md:w-[160px] lg:w-[200px] rounded-2xl overflow-hidden shadow-2xl shadow-neutral-900/10 hover:shadow-neutral-900/20 transition-shadow duration-500">
            <video autoPlay muted loop playsInline disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback" className="w-full h-auto block">
              <source src="/videos/bob-rides-preview.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="w-[180px] md:w-[240px] lg:w-[320px] rounded-xl overflow-hidden shadow-2xl shadow-neutral-900/10 hover:shadow-neutral-900/20 transition-shadow duration-500 mb-8">
            <video autoPlay muted loop playsInline disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback" className="w-full h-auto block">
              <source src="/videos/rewind-preview.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-neutral-300">
          <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
