// Shown in place of a photo or video that failed to load, instead of the
// browser's raw broken-image glyph. Reuses the paper surface already
// painted behind each frame (.vf-hero-photo, .vf-project-frame) plus the
// existing eyebrow/meta type role, rather than a bespoke icon or color.
export function MediaFallback({ label }: { label: string }) {
  return (
    <div className="vf-media-fallback" role="img" aria-label={`${label} unavailable`}>
      <span className="vf-media-fallback-text">Frame unavailable</span>
    </div>
  );
}
