// Drives the #ambient-sky overlay's --sky-top / --sky-bottom custom
// properties from the real local clock. Four fixed anchors describe the
// sky at Night / Dawn / Day / Dusk; between any two adjacent anchors the
// color is smoothstep-eased (not linear, which kinks visibly at each
// anchor) and re-applied every 60s. The 90s CSS transition on those
// properties (ambient-sky.css) is what turns those periodic snaps into a
// continuous drift — this is deliberately not a rAF loop or keyframe
// animation, since the change is tied to wall-clock time, not motion.

type RGB = [number, number, number];

interface Anchor {
  hour: number;
  top: RGB;
  bottom: RGB;
}

function hexToRgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const ANCHORS: Anchor[] = [
  { hour: 0, top: hexToRgb('#656565'), bottom: hexToRgb('#020202') }, // Night
  { hour: 6, top: hexToRgb('#9986a8'), bottom: hexToRgb('#f5c39a') }, // Dawn
  { hour: 13, top: hexToRgb('#7598c0'), bottom: hexToRgb('#e1ded1') }, // Day
  { hour: 19, top: hexToRgb('#9986a8'), bottom: hexToRgb('#f5c39a') }, // Dusk
];

function smoothstep(t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  return clamped * clamped * (3 - 2 * clamped);
}

function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

function lerpRgb(a: RGB, b: RGB, t: number): RGB {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

function rgbToCss([r, g, b]: RGB): string {
  return `rgb(${r}, ${g}, ${b})`;
}

function skyAt(date: Date): { top: string; bottom: string } {
  const hours = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;

  let prev = ANCHORS[ANCHORS.length - 1];
  let next = ANCHORS[0];
  let prevHour = prev.hour - 24;
  let nextHour = next.hour;

  for (let i = 0; i < ANCHORS.length; i++) {
    const a = ANCHORS[i];
    const b = ANCHORS[(i + 1) % ANCHORS.length];
    const isLastSegment = i === ANCHORS.length - 1;
    const bHour = isLastSegment ? b.hour + 24 : b.hour;
    if (hours >= a.hour && hours < bHour) {
      prev = a;
      next = b;
      prevHour = a.hour;
      nextHour = bHour;
      break;
    }
  }

  const t = smoothstep((hours - prevHour) / (nextHour - prevHour));
  return {
    top: rgbToCss(lerpRgb(prev.top, next.top, t)),
    bottom: rgbToCss(lerpRgb(prev.bottom, next.bottom, t)),
  };
}

const RECOMPUTE_INTERVAL_MS = 60_000;

export function startAmbientSky(): () => void {
  const el = document.getElementById('ambient-sky');
  if (!el) return () => {};

  const apply = () => {
    const { top, bottom } = skyAt(new Date());
    el.style.setProperty('--sky-top', top);
    el.style.setProperty('--sky-bottom', bottom);
  };

  apply();
  const id = window.setInterval(apply, RECOMPUTE_INTERVAL_MS);
  return () => window.clearInterval(id);
}
