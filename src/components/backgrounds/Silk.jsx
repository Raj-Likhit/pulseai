import React, { useEffect, useRef } from 'react'

/* ── Silk Background ─────────────────────────────────────────────
   Fluid, slow-morphing silk shader using canvas + simplex-like noise.
   Used in: Hero section
   ─────────────────────────────────────────────────────────────── */
export default function Silk({
    speed = 0.3,
    color1 = '#7C3AED',
    color2 = '#2DD4BF',
    color3 = '#060010',
    style = {}
}) {
    const canvasRef = useRef(null)
    const animRef = useRef(null)
    const tRef = useRef(0)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resize()

        const ro = new ResizeObserver(resize)
        ro.observe(canvas)

        // Pseudo-simplex noise using sin harmonics
        const noise = (x, y, t) => {
            return (
                Math.sin(x * 1.2 + t * 0.7) * 0.4 +
                Math.sin(y * 0.8 - t * 0.5) * 0.3 +
                Math.sin((x + y) * 0.6 + t * 0.9) * 0.2 +
                Math.sin((x - y) * 0.4 - t * 0.3) * 0.1
            )
        }

        const hexToRgb = (hex) => {
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            return [r, g, b]
        }

        const lerpColor = (c1, c2, t) => {
            return c1.map((v, i) => Math.round(v + (c2[i] - v) * t))
        }

        const rgb1 = hexToRgb(color1)
        const rgb2 = hexToRgb(color2)
        const rgb3 = hexToRgb(color3)

        const draw = () => {
            const w = canvas.width
            const h = canvas.height
            tRef.current += speed * 0.008

            // Draw gradient blobs
            ctx.clearRect(0, 0, w, h)

            // Base dark background
            ctx.fillStyle = color3
            ctx.fillRect(0, 0, w, h)

            // Blob 1 — violet
            const n1 = noise(0.5, 0.5, tRef.current)
            const x1 = w * (0.3 + n1 * 0.2)
            const y1 = h * (0.4 + Math.sin(tRef.current * 0.6) * 0.15)
            const g1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, w * 0.6)
            g1.addColorStop(0, `rgba(${rgb1[0]},${rgb1[1]},${rgb1[2]},0.55)`)
            g1.addColorStop(1, 'transparent')
            ctx.fillStyle = g1
            ctx.fillRect(0, 0, w, h)

            // Blob 2 — teal
            const n2 = noise(1.0, 0.3, tRef.current + 1.5)
            const x2 = w * (0.7 + n2 * 0.15)
            const y2 = h * (0.6 + Math.cos(tRef.current * 0.5) * 0.12)
            const g2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, w * 0.5)
            g2.addColorStop(0, `rgba(${rgb2[0]},${rgb2[1]},${rgb2[2]},0.35)`)
            g2.addColorStop(1, 'transparent')
            ctx.fillStyle = g2
            ctx.fillRect(0, 0, w, h)

            // Silk sheen — thin flowing highlights
            const n3 = noise(0.2, 0.8, tRef.current + 2.8)
            for (let i = 0; i < 3; i++) {
                const yPos = h * (0.2 + i * 0.3 + n3 * 0.05)
                const grad = ctx.createLinearGradient(0, yPos - 30, 0, yPos + 30)
                grad.addColorStop(0, 'transparent')
                grad.addColorStop(0.5, `rgba(168, 85, 247, ${0.06 - i * 0.015})`)
                grad.addColorStop(1, 'transparent')
                ctx.fillStyle = grad
                ctx.fillRect(0, yPos - 30, w, 60)
            }

            animRef.current = requestAnimationFrame(draw)
        }

        // Respect reduced-motion
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            draw()
        } else {
            // Static fallback: single gradient
            const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
            g.addColorStop(0, color3)
            g.addColorStop(0.5, color1 + '88')
            g.addColorStop(1, color3)
            ctx.fillStyle = g
            ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        return () => {
            cancelAnimationFrame(animRef.current)
            ro.disconnect()
        }
    }, [speed, color1, color2, color3])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                display: 'block',
                ...style,
            }}
            aria-hidden="true"
        />
    )
}
