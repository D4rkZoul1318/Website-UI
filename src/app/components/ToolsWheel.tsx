import { SiFigma, SiAutodeskmaya, SiBlender, SiReact } from 'react-icons/si';

const TOOLS = [
  { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
  { name: 'Maya', Icon: SiAutodeskmaya, color: '#0696D7' },
  { name: 'Blender', Icon: SiBlender, color: '#E87D0D' },
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
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
            <tool.Icon style={{ color: tool.color }} />
            {tool.name}
          </span>
        ))}
      </div>
    </div>
  );
}
