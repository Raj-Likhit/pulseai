import React, { useEffect, useRef } from 'react'

/* ── Particles Background ────────────────────────────────────────
   Floating glowing particles with gentle drift.
   Used in: Testimonials, general sections
   ─────────────────────────────────────────────────────────────── */
export default function Particles({
    count = 60,
    colors = ['#7C3AED', '#2DD4BF', '#A855F7'],
    speed = 0.3,
    style = {}
}) {
    const canvasRef = useRef(null)
    const animRef = useRef(null)
    const particlesRef = useRef([])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
            initParticles()
        }

        const initParticles = () => {
            particlesRef.current = Array.from({ length: count }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2.5 + 0.5,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * speed * 0.4,
                vy: (Math.random() - 0.5) * speed * 0.4,
                alpha: Math.random() * 0.5 + 0.1,
                alphaDir: Math.random() > 0.5 ? 1 : -1,
                alphaSpeed: Math.random() * 0.005 + 0.002,
            }))
        }

        resize()
        const ro = new ResizeObserver(resize)
        ro.observe(canvas)

        const draw = () => {
            const { width: w, height: h } = canvas
            ctx.clearRect(0, 0, w, h)

            particlesRef.current.forEach((p) => {
                // Drift
                p.x += p.vx
                p.y += p.vy

                // Wrap
                if (p.x < -10) p.x = w + 10
                if (p.x > w + 10) p.x = -10
                if (p.y < -10) p.y = h + 10
                if (p.y > h + 10) p.y = -10

                // Pulse alpha
                p.alpha += p.alphaDir * p.alphaSpeed
                if (p.alpha > 0.65 || p.alpha < 0.05) p.alphaDir *= -1

                // Glow
                const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
                grd.addColorStop(0, p.color + Math.round(p.alpha * 255).toString(16).padStart(2, '0'))
                grd.addColorStop(1, 'transparent')
                ctx.fillStyle = grd
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
                ctx.fill()

                // Core dot
                ctx.fillStyle = p.color
                ctx.globalAlpha = p.alpha
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fill()
                ctx.globalAlpha = 1
            })

            animRef.current = requestAnimationFrame(draw)
        }

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            draw()
        }

        return () => {
            cancelAnimationFrame(animRef.current)
            ro.disconnect()
        }
    }, [count, speed])

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
