import { useEffect, useRef } from 'react';

const RAMP = ' .:-=+*#%@';
const CHAR_WIDTH_PX = 4.4;
const CHAR_ASPECT = 0.52; // glyph width / height for JetBrains Mono
const CHAR_HEIGHT_PX = CHAR_WIDTH_PX / CHAR_ASPECT;
const FONT_SIZE_PX = CHAR_WIDTH_PX / 0.6;
const TARGET_FPS = 15;

interface AsciiVideoProps {
  src: string;
  className?: string;
  label?: string;
}

export default function AsciiVideo({ src, className, label }: AsciiVideoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const preRef = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    const pre = preRef.current;
    if (!container || !video || !pre) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sampleCanvas = document.createElement('canvas');
    const ctx = sampleCanvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let cols = 60;
    let rows = 40;
    let cropX = 0;
    let cropY = 0;
    let cropW = 0;
    let cropH = 0;
    let dimsReady = false;
    let running = false;
    let rafId = 0;
    let lastDraw = 0;

    const measure = () => {
      const rect = container.getBoundingClientRect();
      const vw = video.videoWidth || 16;
      const vh = video.videoHeight || 9;
      ctx.font = `${FONT_SIZE_PX}px 'JetBrains Mono', monospace`;
      const charWidthPx = ctx.measureText('0').width || CHAR_WIDTH_PX;
      cols = Math.max(10, Math.round(rect.width / charWidthPx));
      rows = Math.max(6, Math.round(rect.height / CHAR_HEIGHT_PX));
      sampleCanvas.width = cols;
      sampleCanvas.height = rows;

      // object-fit: cover, object-position: top — crop the video to the
      // panel's aspect so the ascii grid fills it edge to edge, biased to
      // the top of frame so the subject doesn't get cropped off.
      const targetAspect = cols / rows;
      const videoAspect = vw / vh;
      if (videoAspect > targetAspect) {
        cropH = vh;
        cropW = vh * targetAspect;
        cropX = (vw - cropW) / 2;
        cropY = 0;
      } else {
        cropW = vw;
        cropH = vw / targetAspect;
        cropX = 0;
        cropY = 0;
      }
      dimsReady = true;
    };

    const renderFrame = () => {
      if (!dimsReady) return;
      ctx.drawImage(video, cropX, cropY, cropW, cropH, 0, 0, cols, rows);
      const { data } = ctx.getImageData(0, 0, cols, rows);
      let out = '';
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
          out += RAMP[Math.min(RAMP.length - 1, Math.floor(lum * RAMP.length))];
        }
        out += '\n';
      }
      pre.textContent = out;
    };

    const loop = (t: number) => {
      if (!running) return;
      if (t - lastDraw >= 1000 / TARGET_FPS) {
        lastDraw = t;
        renderFrame();
      }
      rafId = requestAnimationFrame(loop);
    };

    const onLoadedMeta = () => {
      measure();
      if (prefersReduced) {
        video.currentTime = Math.min(1, (video.duration || 2) / 3);
      }
    };
    if (video.readyState >= 1) onLoadedMeta();
    else video.addEventListener('loadedmetadata', onLoadedMeta, { once: true });

    const onSeeked = () => renderFrame();
    if (prefersReduced) video.addEventListener('seeked', onSeeked);

    const resizeObserver = new ResizeObserver(() => {
      if (video.readyState >= 1) measure();
    });
    resizeObserver.observe(container);

    let intersectionObserver: IntersectionObserver | null = null;
    if (!prefersReduced) {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            running = true;
            video.play().catch(() => {});
            if (!rafId) rafId = requestAnimationFrame(loop);
          } else {
            running = false;
            video.pause();
            if (rafId) {
              cancelAnimationFrame(rafId);
              rafId = 0;
            }
          }
        },
        { threshold: 0.15 }
      );
      intersectionObserver.observe(container);
    }

    return () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      video.removeEventListener('loadedmetadata', onLoadedMeta);
      video.removeEventListener('seeked', onSeeked);
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={className ? `ascii-video ${className}` : 'ascii-video'}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      <video ref={videoRef} src={src} muted loop playsInline preload="auto" style={{ display: 'none' }} />
      <pre
        ref={preRef}
        className="ascii-video__output"
        aria-hidden="true"
        style={{ fontSize: `${FONT_SIZE_PX}px`, lineHeight: `${CHAR_HEIGHT_PX}px` }}
      />
    </div>
  );
}
