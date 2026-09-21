// Shown in place of a photo, video, or embed that failed to load, instead
// of the browser's raw broken-image glyph or a silently blank frame.
// Mirrors home/MediaFallback.tsx's paper-surface treatment, using
// camera-theme's own tokens so it matches the case-study pages it's used on.
export function MediaFallback({ label, ratio }: { label: string; ratio?: string }) {
  return (
    <div
      className="media-fallback"
      role="img"
      aria-label={`${label} unavailable`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <span className="media-fallback-text">Frame unavailable</span>
    </div>
  );
}
