import { SiFigma, SiAutodeskmaya, SiBlender, SiReact } from 'react-icons/si';

const TOOLS = [
  { name: 'Figma', Icon: SiFigma },
  { name: 'Maya', Icon: SiAutodeskmaya },
  { name: 'Blender', Icon: SiBlender },
  { name: 'React', Icon: SiReact },
];

/** Compact infinite ticker-tape for the About page's "Tools" line — doubles
 * the list and scrolls it by exactly -50% (one full set) for a seamless
 * loop, same mechanic as the homepage marquee. */
export function ToolsTicker() {
  const loop = [...TOOLS, ...TOOLS];
  return (
    <div className="tools-ticker" aria-hidden="true">
      <div className="tools-ticker-track">
        {loop.map((tool, i) => (
          <span className="tools-ticker-item" key={`${tool.name}-${i}`}>
            <tool.Icon />
            {tool.name}
          </span>
        ))}
      </div>
    </div>
  );
}
