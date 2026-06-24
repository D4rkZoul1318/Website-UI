import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'

const PHOTOS = [
  {
    id: 'forest',
    src: '/images/hero/photo-forest.jpg',
    style: {
      position: 'absolute' as const,
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      objectPosition: 'center',
      zIndex: 1,
    },
    basePixelSize: 12,
    hoverPixelSize: 4,
    canHoverSharpen: false,
  },
  {
    id: 'portrait',
    src: '/images/hero/photo-portrait.jpg',
    style: {
      position: 'absolute' as const,
      left: '8%',
      top: '10%',
      width: '28%',
      height: '78%',
      objectFit: 'cover' as const,
      objectPosition: 'center top',
      zIndex: 3,
      borderRadius: '12px',
    },
    basePixelSize: 8,
    hoverPixelSize: 1,
    canHoverSharpen: true,
  },
  {
    id: 'temple',
    src: '/images/hero/photo-temple.jpg',
    style: {
      position: 'absolute' as const,
      right: '4%',
      top: '5%',
      width: '38%',
      height: '60%',
      objectFit: 'cover' as const,
      objectPosition: 'center top',
      zIndex: 3,
      borderRadius: '12px',
    },
    basePixelSize: 8,
    hoverPixelSize: 1,
    canHoverSharpen: true,
  },
  {
    id: 'bird',
    src: '/images/hero/photo-bird.jpg',
    style: {
      position: 'absolute' as const,
      right: '6%',
      bottom: '6%',
      width: '26%',
      height: '36%',
      objectFit: 'cover' as const,
      objectPosition: 'center',
      zIndex: 4,
      borderRadius: '10px',
    },
    basePixelSize: 8,
    hoverPixelSize: 1,
    canHoverSharpen: true,
  },
]

const PixelatedPhoto = ({
  src,
  photoStyle,
  basePixelSize,
  hoverPixelSize,
  canHoverSharpen,
}: {
  src: string
  photoStyle: React.CSSProperties
  basePixelSize: number
  hoverPixelSize: number
  canHoverSharpen: boolean
  containerRef: React.RefObject<HTMLDivElement | null>
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const pixelSizeRef = useRef(basePixelSize)
  const targetPixelSizeRef = useRef(basePixelSize)
  const animFrameRef = useRef<number>()
  const [isHovered, setIsHovered] = useState(false)

  const breatheRef = useRef({ phase: Math.random() * Math.PI * 2 })

  const drawPixelated = useCallback((pixelSize: number) => {
    const canvas = canvasRef.current
    if (!canvas || !imgRef.current) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height

    if (pixelSize <= 1.2) {
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(imgRef.current, 0, 0, w, h)
      return
    }

    const pw = Math.max(1, Math.floor(w / pixelSize))
    const ph = Math.max(1, Math.floor(h / pixelSize))

    ctx.imageSmoothingEnabled = false
    ctx.drawImage(imgRef.current, 0, 0, pw, ph)

    ctx.imageSmoothingEnabled = false
    ctx.drawImage(canvas, 0, 0, pw, ph, 0, 0, w, h)
  }, [])

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src
    img.onload = () => {
      imgRef.current = img
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.floor(rect.width * window.devicePixelRatio)
      canvas.height = Math.floor(rect.height * window.devicePixelRatio)

      const animate = () => {
        breatheRef.current.phase += 0.015

        if (!isHovered) {
          const breath = Math.sin(breatheRef.current.phase) * 1.5
          targetPixelSizeRef.current = basePixelSize + breath
        }

        const ease = isHovered ? 0.08 : 0.04
        pixelSizeRef.current += (targetPixelSizeRef.current - pixelSizeRef.current) * ease

        drawPixelated(pixelSizeRef.current)
        animFrameRef.current = requestAnimationFrame(animate)
      }

      animate()
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [src, basePixelSize, drawPixelated, isHovered])

  useEffect(() => {
    if (canHoverSharpen) {
      targetPixelSizeRef.current = isHovered ? hoverPixelSize : basePixelSize
    }
  }, [isHovered, hoverPixelSize, basePixelSize, canHoverSharpen])

  return (
    <canvas
      ref={canvasRef}
      style={{
        ...photoStyle,
        cursor: canHoverSharpen ? 'zoom-in' : 'default',
      }}
      onMouseEnter={() => canHoverSharpen && setIsHovered(true)}
      onMouseLeave={() => canHoverSharpen && setIsHovered(false)}
    />
  )
}

export default function HeroCollage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const clipProgress = useTransform(scrollY, [0, typeof window !== 'undefined' ? window.innerHeight * 0.8 : 800], [0, 50])
  const clipSmooth = useSpring(clipProgress, { stiffness: 80, damping: 20 })

  const clipPath = useTransform(
    clipSmooth,
    (v: number) => `inset(${v}% round 0px)`
  )

  const textOpacity = useTransform(scrollY, [0, typeof window !== 'undefined' ? window.innerHeight * 0.4 : 400], [1, 0])

  return (
    <>
      <div style={{ height: '200vh' }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden" ref={containerRef}>

          <motion.div
            className="absolute inset-0 z-10"
            style={{ clipPath }}
          >
            <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

            {PHOTOS.map((photo) => (
              <PixelatedPhoto
                key={photo.id}
                src={photo.src}
                photoStyle={photo.style}
                basePixelSize={photo.basePixelSize}
                hoverPixelSize={photo.hoverPixelSize}
                canHoverSharpen={photo.canHoverSharpen}
                containerRef={containerRef}
              />
            ))}
          </motion.div>

          <motion.div
            className="absolute inset-0 z-20 flex flex-col justify-end pointer-events-none"
            style={{ opacity: textOpacity }}
          >
            <div className="px-8 md:px-16 pb-16">
              <div
                className="inline-block"
                style={{
                  background: 'rgba(12, 12, 12, 0.3)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  borderRadius: '4px',
                  padding: '16px 24px',
                  border: '1px solid rgba(240, 237, 232, 0.08)',
                }}
              >
                <h1
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    lineHeight: 0.9,
                    color: '#F0EDE8',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  SOHUM<br />BHATNAGAR
                </h1>
                <div style={{ marginTop: '10px', display: 'flex', gap: '16px' }}>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '13px',
                      fontWeight: 400,
                      color: 'rgba(240, 237, 232, 0.5)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                    }}
                  >
                    Designer
                  </span>
                  <span style={{ color: 'rgba(232, 115, 74, 0.6)', fontFamily: "'Space Mono', monospace" }}>—</span>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '13px',
                      fontWeight: 400,
                      color: 'rgba(240, 237, 232, 0.5)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                    }}
                  >
                    Photographer
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
            style={{ opacity: textOpacity }}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          >
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'rgba(240, 237, 232, 0.4)',
              }}
            >
              Scroll
            </span>
            <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, rgba(240,237,232,0.4), transparent)' }} />
          </motion.div>

          <div className="absolute inset-0 z-0 bg-[#0C0C0C]" />

        </div>
      </div>
    </>
  )
}
