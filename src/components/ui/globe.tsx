"use client"

import { useEffect, useRef } from "react"
import createGlobe, { type COBEOptions } from "cobe"

import { cn } from "@/lib/utils"

export function Globe({
  className,
  config,
}: {
  className?: string
  config?: COBEOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const dragOffset = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let phi = config?.phi ?? 0
    let raf = 0

    const measure = () => {
      const size = canvas.offsetWidth || 1
      return size * 2
    }

    const globe = createGlobe(canvas, {
      phi: 0,
      theta: 0.25,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      devicePixelRatio: 2,
      baseColor: [1, 1, 1],
      markerColor: [1, 1, 1],
      glowColor: [1, 1, 1],
      ...config,
      width: measure(),
      height: measure(),
    } as COBEOptions)

    const onResize = () => {
      const size = measure()
      globe.update({ width: size, height: size })
    }
    window.addEventListener("resize", onResize)

    const loop = () => {
      if (pointerInteracting.current === null) phi += 0.005
      globe.update({ phi: phi + dragOffset.current })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const t = setTimeout(() => {
      canvas.style.opacity = "1"
    }, 60)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t)
      window.removeEventListener("resize", onResize)
      globe.destroy()
    }
  }, [config])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-150",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full cursor-grab opacity-0 transition-opacity duration-500 contain-[layout_paint_size] active:cursor-grabbing"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
        }}
        onPointerUp={() => {
          pointerInteracting.current = null
        }}
        onPointerOut={() => {
          pointerInteracting.current = null
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            dragOffset.current +=
              (e.clientX - pointerInteracting.current) / 1400
            pointerInteracting.current = e.clientX
          }
        }}
        onTouchMove={(e) => {
          if (
            pointerInteracting.current !== null &&
            e.touches[0]
          ) {
            dragOffset.current +=
              (e.touches[0].clientX - pointerInteracting.current) / 1400
            pointerInteracting.current = e.touches[0].clientX
          }
        }}
      />
    </div>
  )
}
