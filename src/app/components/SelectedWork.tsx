import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "Bob Rides",
    description:
      "Sole designer on a ride aggregator. Built the comparison UI, vehicle icon system, and design tokens from scratch.",
    tags: ["Ride-hailing", "Mobile UX", "Design system"],
    videoSrc: "/videos/bob-rides-preview.mp4",
    videoScale: 25,
    badge: "Live product",
    link: "/bob-rides",
  },
  {
    title: "UUCMS Redesign",
    description:
      "Redesigned a university campus management portal to reduce student task completion from 12 steps to 4.",
    tags: ["EdTech", "Responsive web", "Accessibility"],
    link: "/uucms",
  },
  {
    title: "REWIND",
    description:
      "A nostalgic audio experience built for Figma Config Makeathon 2026. Hardware-inspired UI meets spatial audio processing.",
    tags: ["Figma Config", "Web Audio", "Creative tech"],
    videoSrc: "/videos/rewind-preview.mp4",
    badge: "Makeathon 2026",
    link: "https://rewind-tau.vercel.app",
    external: true,
  },
];

export function SelectedWork() {
  return (
    <section id="work" className="px-4 md:px-8 lg:px-12 pb-20 max-w-[1280px] mx-auto">
      <p className="text-xs uppercase tracking-widest text-neutral-400 mb-8">
        Selected work
      </p>
      <div className="flex flex-col gap-8 md:gap-12">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} {...project} index={i} />
        ))}
      </div>
    </section>
  );
}
