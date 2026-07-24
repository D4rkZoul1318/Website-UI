interface GlassFilterProps {
  id?: string;
  /** Turbulence frequency driving the refraction ripple — lower is calmer. */
  displace?: number;
  /** Base feDisplacementMap scale (pixels of warp). */
  distortionScale?: number;
  /** Per-channel scale deltas from the base distortion — the source of the
   * chromatic-aberration "glass edge" fringing. */
  redOffset?: number;
  greenOffset?: number;
  blueOffset?: number;
  /** 0–100, brightens the refracted backdrop so it reads as lit glass
   * rather than a plain dark smear. */
  brightness?: number;
}

/** The refraction mechanic behind react-bits' GlassSurface, reimplemented
 * standalone (the sandbox can't reach reactbits.dev to install the package
 * directly): feTurbulence generates a ripple map, feDisplacementMap warps
 * the backdrop through it once per color channel at a slightly different
 * scale, and the three results are screen-blended back together — that
 * per-channel scale mismatch is what produces the subtle chromatic
 * aberration real glass/lens distortion has. Renders only the invisible
 * `<filter>` def; apply it with `backdrop-filter: url(#id) blur(...)`. */
export function GlassFilter({
  id = 'pill-glass-distortion',
  displace = 0.018,
  distortionScale = 14,
  redOffset = 0,
  greenOffset = 4,
  blueOffset = 8,
  brightness = 15,
}: GlassFilterProps) {
  const slope = 1 + brightness / 100;
  return (
    <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        <filter id={id} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency={displace} numOctaves={2} seed={7} result="noise" />
          <feGaussianBlur in="noise" stdDeviation={1.5} result="softNoise" />

          <feDisplacementMap in="SourceGraphic" in2="softNoise" scale={distortionScale + redOffset} xChannelSelector="R" yChannelSelector="G" result="dispR" />
          <feColorMatrix in="dispR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="onlyR" />

          <feDisplacementMap in="SourceGraphic" in2="softNoise" scale={distortionScale + greenOffset} xChannelSelector="R" yChannelSelector="G" result="dispG" />
          <feColorMatrix in="dispG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="onlyG" />

          <feDisplacementMap in="SourceGraphic" in2="softNoise" scale={distortionScale + blueOffset} xChannelSelector="R" yChannelSelector="G" result="dispB" />
          <feColorMatrix in="dispB" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="onlyB" />

          <feBlend in="onlyR" in2="onlyG" mode="screen" result="rg" />
          <feBlend in="rg" in2="onlyB" mode="screen" result="rgb" />

          <feComponentTransfer in="rgb">
            <feFuncR type="linear" slope={slope} />
            <feFuncG type="linear" slope={slope} />
            <feFuncB type="linear" slope={slope} />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}
