import { motion } from "motion/react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  videoSrc?: string;
  badge?: string;
  badgeStyle?: "light" | "dark";
  link: string;
  external?: boolean;
  videoOrientation?: "landscape" | "portrait";
  compact?: boolean;
  index: number;
}

export function ProjectCard({
  title,
  description,
  tags,
  videoSrc,
  badge,
  badgeStyle = "dark",
  link,
  external,
  videoOrientation = "landscape",
  compact,
  index,
}: ProjectCardProps) {
  const linkProps = external
    ? { href: link, target: "_blank" as const, rel: "noopener noreferrer" }
    : { href: link };

  const isPortrait = videoOrientation === "portrait";

  const containerClass = isPortrait
    ? "relative rounded-xl overflow-hidden h-[400px] md:h-[500px] bg-neutral-950 flex items-center justify-center transition-shadow duration-500 group-hover:shadow-xl group-hover:shadow-neutral-900/10"
    : compact
    ? "relative rounded-xl overflow-hidden aspect-[4/3] bg-neutral-100 transition-shadow duration-500 group-hover:shadow-xl group-hover:shadow-neutral-900/10"
    : "relative rounded-xl overflow-hidden aspect-video bg-neutral-100 transition-shadow duration-500 group-hover:shadow-xl group-hover:shadow-neutral-900/10";

  const videoClass = isPortrait
    ? "h-full w-auto object-contain mx-auto block transition-transform duration-700 group-hover:scale-[1.02]"
    : "w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]";

  const badgeEl = badge && (
    <span
      className={
        badgeStyle === "light"
          ? "absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-neutral-900 text-xs font-medium px-3 py-1 rounded-full z-10"
          : "absolute top-3 right-3 bg-neutral-900/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full z-10"
      }
    >
      {badge}
    </span>
  );

  return (
    <motion.div
      className="project-card group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className={containerClass}>
        {badgeEl}
        {videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            className={videoClass}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm text-neutral-400">Case study in progress</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="flex gap-2 flex-wrap mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-500 transition-colors group-hover:bg-neutral-200"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl md:text-2xl font-medium tracking-tight text-neutral-900">
          {title}
        </h3>
        <p className="text-neutral-500 mt-1">{description}</p>
        <a
          {...linkProps}
          className="inline-flex items-center gap-1 text-sm text-neutral-900 mt-3 underline underline-offset-4 hover:text-neutral-600 group-hover:gap-2 transition-all"
        >
          {external ? "Visit project" : "Read case study"}
          {external ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          ) : (
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          )}
        </a>
      </div>
    </motion.div>
  );
}
