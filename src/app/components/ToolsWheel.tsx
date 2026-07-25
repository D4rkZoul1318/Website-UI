import { SiFigma, SiAutodeskmaya, SiBlender, SiUnrealengine, SiClaude, SiGooglegemini, SiOpenai, SiGit, SiVercel } from 'react-icons/si';

const TOOLS = [
  { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
  { name: 'Maya', Icon: SiAutodeskmaya, color: '#0696D7' },
  { name: 'Blender', Icon: SiBlender, color: '#E87D0D' },
  { name: 'Unreal', Icon: SiUnrealengine, color: '#0E1128' },
  { name: 'Claude', Icon: SiClaude, color: '#D97757' },
  { name: 'Gemini', Icon: SiGooglegemini, color: '#8E75B2' },
  { name: 'ChatGPT', Icon: SiOpenai, color: '#10A37F' },
  { name: 'Git', Icon: SiGit, color: '#F05033' },
  { name: 'Vercel', Icon: SiVercel, color: '#000000' },
];

const STEP = 360 / TOOLS.length;

/** Toolkit-list labels already represented as logos on the wheel, so the
 * Skills & Tools section further down can skip them and avoid duplicates. */
export const WHEEL_TOOL_NAMES = TOOLS.map((tool) => (tool.name === 'Unreal' ? 'Unreal Engine' : tool.name));

/** Every tool from the toolkit list that has a real brand logo, shown
 * orbiting a spinning wheel — same aperture-spin rotation used by the
 * old hero dial, with each logo counter-rotating to stay upright as it
 * travels around the circle. */
export function ToolsWheel() {
  return (
    <div className="tools-wheel" aria-hidden="true">
      <div className="tools-wheel-track">
        {TOOLS.map((tool, i) => (
          <div
            className="tools-wheel-item"
            key={tool.name}
            style={{ transform: `rotate(${i * STEP}deg) translateY(-96px) rotate(${-i * STEP}deg)` }}
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
