import { SiFigma, SiAutodeskmaya, SiBlender, SiReact } from 'react-icons/si';

const TOOLS = [
  { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
  { name: 'Maya', Icon: SiAutodeskmaya, color: '#0696D7' },
  { name: 'Blender', Icon: SiBlender, color: '#E87D0D' },
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
];

const STEP = 360 / TOOLS.length;

/** Tools shown as logos on a spinning wheel — the set orbits around the
 * center on the same aperture-spin rotation used in the old hero dial,
 * while each logo counter-rotates to stay upright as it travels. */
export function ToolsWheel() {
  return (
    <div className="tools-wheel" aria-hidden="true">
      <div className="tools-wheel-track">
        {TOOLS.map((tool, i) => (
          <div
            className="tools-wheel-item"
            key={tool.name}
            style={{ transform: `rotate(${i * STEP}deg) translateY(-72px) rotate(${-i * STEP}deg)` }}
          >
            <div className="tools-wheel-item-inner">
              <tool.Icon style={{ color: tool.color }} />
              <span>{tool.name}</span>
            </div>
          </div>
        ))}
      </div>
      <span className="tools-wheel-center" />
    </div>
  );
}
