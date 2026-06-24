import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import DebugControls, { DEFAULT_CONFIG, type HeroConfig } from './DebugControls'

function PixelPhoto({
  src,
  className,
  style,
  pixelSize = 7,
  objectPosition = 'center top',
}: {
  src: string
  className?: string
  style?: React.CSSProperties
  pixelSize?: number
  objectPosition?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const currentPxRef = useRef(pixelSize)
  const targetPxRef = useRef(pixelSize)
  const rafRef = useRef<number>()
  const [loaded, setLoaded] = useState(false)

  const draw = useCallback((px: number) => {
    const canvas = canvasRef.current
    const img = imgRef.current
    if (!canvas || !img) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cw = canvas.width
    const ch = canvas.height
    if (cw === 0 || ch === 0) return

    const imgRatio = img.naturalWidth / img.naturalHeight
    const canvasRatio = cw / ch
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight

    if (imgRatio > canvasRatio) {
      sw = img.naturalHeight * canvasRatio
      sx = (img.naturalWidth - sw) / 2
    } else {
      sh = img.naturalWidth / canvasRatio
      if (objectPosition.includes('top')) sy = 0
      else if (objectPosition.includes('bottom')) sy = img.naturalHeight - sh
      else sy = (img.naturalHeight - sh) / 2
    }

    ctx.imageSmoothingEnabled = false

    if (px <= 1.5) {
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
      return
    }

    const pw = Math.max(1, Math.round(cw / px))
    const ph = Math.max(1, Math.round(ch / px))
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, pw, ph)
    ctx.drawImage(canvas, 0, 0, pw, ph, 0, 0, cw, ch)
  }, [objectPosition])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const initSize = () => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = Math.round(rect.width * window.devicePixelRatio)
        canvas.height = Math.round(rect.height * window.devicePixelRatio)
      }
    }

    const img = new Image()
    img.src = src
    img.onload = () => {
      imgRef.current = img
      initSize()
      draw(pixelSize)
      setLoaded(true)
    }

    const ro = new ResizeObserver(() => {
      initSize()
      draw(currentPxRef.current)
    })
    ro.observe(canvas)

    return () => {
      ro.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [src, pixelSize, draw])

  const startAnim = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const loop = () => {
      const diff = targetPxRef.current - currentPxRef.current
      if (Math.abs(diff) < 0.05) {
        currentPxRef.current = targetPxRef.current
        draw(currentPxRef.current)
        return
      }
      currentPxRef.current += diff * 0.1
      draw(currentPxRef.current)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
  }, [draw])

  const handleMouseEnter = () => {
    targetPxRef.current = 1
    startAnim()
  }

  const handleMouseLeave = () => {
    targetPxRef.current = pixelSize
    startAnim()
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        display: 'block',
        cursor: 'zoom-in',
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  )
}

export default function HeroCollage() {
  const [config, setConfig] = useState<HeroConfig>(DEFAULT_CONFIG)
  const { scrollY } = useScroll()

  const vh = typeof window !== 'undefined' ? window.innerHeight : 800

  const rawClip = useTransform(scrollY, [0, vh * 0.85], [0, 100])
  const smoothClip = useSpring(rawClip, { stiffness: 50, damping: 18 })
  const clipPath = useTransform(smoothClip, (v: number) => `inset(0 0 ${v}% 0)`)

  const textOpacity = useTransform(scrollY, [0, vh * 0.5], [1, 0])

  const bgPixelSize = useTransform(scrollY, [0, vh * 0.6], [config.bgPixelSize, 1])
  const bgCanvasRef = useRef<HTMLCanvasElement>(null)
  const bgImgRef = useRef<HTMLImageElement | null>(null)

  const drawBg = useCallback((px: number) => {
    const canvas = bgCanvasRef.current
    const img = bgImgRef.current
    if (!canvas || !img) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cw = canvas.width
    const ch = canvas.height
    if (!cw || !ch) return

    const imgRatio = img.naturalWidth / img.naturalHeight
    const canvasRatio = cw / ch
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight
    if (imgRatio > canvasRatio) {
      sw = img.naturalHeight * canvasRatio
      sx = (img.naturalWidth - sw) / 2
    } else {
      sh = img.naturalWidth / canvasRatio
      sy = (img.naturalHeight - sh) / 2
    }

    ctx.imageSmoothingEnabled = false
    if (px <= 1.5) {
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
      return
    }
    const pw = Math.max(1, Math.round(cw / px))
    const ph = Math.max(1, Math.round(ch / px))
    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, pw, ph)
    ctx.drawImage(canvas, 0, 0, pw, ph, 0, 0, cw, ch)
  }, [])

  useEffect(() => {
    const img = new Image()
    img.src = '/images/hero/photo-forest.jpg'
    img.onload = () => {
      bgImgRef.current = img
      drawBg(config.bgPixelSize)
    }
  }, [drawBg])

  useEffect(() => {
    return bgPixelSize.on('change', (px: number) => {
      drawBg(px)
    })
  }, [bgPixelSize, drawBg])

  useEffect(() => {
    const canvas = bgCanvasRef.current
    if (!canvas) return
    const ro = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.round(rect.width * window.devicePixelRatio)
      canvas.height = Math.round(rect.height * window.devicePixelRatio)
      drawBg(config.bgPixelSize)
    })
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [drawBg])

  return (
    <div style={{ height: '200vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0C0C0C]">

        <motion.div className="absolute inset-0" style={{ clipPath }}>

          <div className="absolute inset-0 z-[1]">
            <canvas
              ref={bgCanvasRef}
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
              }}
            />
          </div>

          <div
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(12,12,12,0.7) 100%)',
            }}
          />

          <PixelPhoto
            src="/images/hero/photo-portrait.jpg"
            pixelSize={config.portraitPixelSize}
            objectPosition="center top"
            style={{
              position: 'absolute',
              left: config.portraitLeft + '%',
              top: config.portraitTop + '%',
              width: config.portraitWidth + '%',
              height: config.portraitHeight + '%',
              zIndex: 3,
              borderRadius: '10px',
              boxShadow: '0 0 0 1px rgba(240,237,232,0.08), 0 24px 48px rgba(0,0,0,0.5)',
            }}
          />

          <PixelPhoto
            src="/images/hero/photo-temple.jpg"
            pixelSize={config.templePixelSize}
            objectPosition="center top"
            style={{
              position: 'absolute',
              right: config.templeRight + '%',
              top: config.templeTop + '%',
              width: config.templeWidth + '%',
              height: config.templeHeight + '%',
              zIndex: 3,
              borderRadius: '10px',
              boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
            }}
          />

          <PixelPhoto
            src="/images/hero/photo-bird.jpg"
            pixelSize={config.birdPixelSize}
            objectPosition="center center"
            style={{
              position: 'absolute',
              right: config.birdRight + '%',
              bottom: config.birdBottom + '%',
              width: config.birdWidth + '%',
              height: config.birdHeight + '%',
              zIndex: 4,
              borderRadius: '8px',
              boxShadow: '0 0 0 1px rgba(240,237,232,0.08), 0 16px 32px rgba(0,0,0,0.6)',
            }}
          />

          <motion.div
            className="absolute z-[5] pointer-events-none"
            style={{
              opacity: textOpacity,
              bottom: config.textBottom + '%',
              left: config.textLeft + '%',
            }}
          >
            <div
              style={{
                background: 'rgba(12,12,12,0.25)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '6px',
                padding: '20px 28px 16px',
                border: '1px solid rgba(240,237,232,0.07)',
                display: 'inline-block',
              }}
            >
              <h1
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(2.8rem, 6.5vw, 7rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.88,
                  color: '#F0EDE8',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                SOHUM<br />BHATNAGAR
              </h1>
              <div
                style={{
                  marginTop: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '12px',
                  color: 'rgba(240,237,232,0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                }}>
                  Designer
                </span>
                <span style={{ color: '#E8734A', fontFamily: "'Space Mono', monospace", fontSize: '12px' }}>—</span>
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '12px',
                  color: 'rgba(240,237,232,0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                }}>
                  Photographer
                </span>
              </div>
            </div>
          </motion.div>

        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: textOpacity }}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'rgba(240,237,232,0.35)',
          }}>
            Scroll
          </span>
          <div style={{
            width: '1px',
            height: '32px',
            background: 'linear-gradient(to bottom, rgba(240,237,232,0.35), transparent)',
          }} />
        </motion.div>

        <DebugControls config={config} onChange={setConfig} />
      </div>
    </div>
  )
}
