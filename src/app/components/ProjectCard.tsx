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
  index,
}: ProjectCardProps) {
  const linkProps = external
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : { href: link };

  const isPortrait = videoOrientation === "portrait";

  const containerClass = isPortrait
    ? "relative bg-neutral-950 rounded-xl overflow-hidden h-[480px] md:h-[560px] flex items-center justify-center"
    : "relative bg-neutral-100 rounded-xl overflow-hidden aspect-video";

  const videoClass = isPortrait
    ? "h-full w-auto object-contain mx-auto block"
    : "w-full h-full object-cover";

  const badgeClass =
    badgeStyle === "light"
      ? "absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-neutral-900 text-xs font-medium px-3 py-1 rounded-full z-10"
      : "absolute top-3 right-3 bg-neutral-900/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full z-10";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
    >
      <div className={containerClass}>
        {badge && <span className={badgeClass}>{badge}</span>}
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

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-badge-text bg-badge-bg px-2.5 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="mt-3 text-xl md:text-2xl font-medium tracking-tight text-neutral-900">
        {title}
      </h3>

      <p className="mt-1 text-neutral-500 leading-relaxed">{description}</p>

      <a
        {...linkProps}
        className="mt-2 inline-flex items-center gap-1 text-sm text-neutral-900 underline underline-offset-4 hover:text-neutral-600 transition-colors"
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
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        ) : (
          <span aria-hidden="true">→</span>
        )}
      </a>
    </motion.div>
  );
}
