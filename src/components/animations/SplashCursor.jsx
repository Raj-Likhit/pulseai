import React, { useEffect, useRef } from 'react'

/* ── Splash Cursor ───────────────────────────────────────────────
   Fluid ink-splash cursor effect that follows mouse movement.
   Based on the ReactBits Splash Cursor component concept.
   Used globally on all pages.
   ─────────────────────────────────────────────────────────────── */
export default function SplashCursor() {
    const canvasRef = useRef(null)
    const animRef = useRef(null)
    const splashesRef = useRef([])
    const mouseRef = useRef({ x: -100, y: -100 })
    const prevMouseRef = useRef({ x: -100, y: -100 })

    useEffect(() => {
        // Don't activate on mobile (touch devices)
        if (window.matchMedia('(pointer: coarse)').matches) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const onMove = (e) => {
            prevMouseRef.current = { ...mouseRef.current }
            mouseRef.current = { x: e.clientX, y: e.clientY }

            const dx = mouseRef.current.x - prevMouseRef.current.x
            const dy = mouseRef.current.y - prevMouseRef.current.y
            const speed = Math.sqrt(dx * dx + dy * dy)

            if (speed > 3) {
                for (let i = 0; i < Math.min(3, Math.floor(speed / 5)); i++) {
                    const angle = Math.random() * Math.PI * 2
                    const vel = Math.random() * speed * 0.25 + 1
                    splashesRef.current.push({
                        x: e.clientX + (Math.random() - 0.5) * 8,
                        y: e.clientY + (Math.random() - 0.5) * 8,
                        vx: Math.cos(angle) * vel,
                        vy: Math.sin(angle) * vel - Math.random() * 2,
                        r: Math.random() * 4 + 2,
                        alpha: 0.8,
                        color: Math.random() > 0.5 ? '#7C3AED' : '#2DD4BF',
                    })
                }
            }
        }
        window.addEventListener('mousemove', onMove)

        const draw = () => {
            const { width: w, height: h } = canvas
            ctx.clearRect(0, 0, w, h)

            // Main cursor dot
            const grad = ctx.createRadialGradient(
                mouseRef.current.x, mouseRef.current.y, 0,
                mouseRef.current.x, mouseRef.current.y, 12
            )
            grad.addColorStop(0, 'rgba(168, 85, 247, 0.9)')
            grad.addColorStop(0.4, 'rgba(124, 58, 237, 0.5)')
            grad.addColorStop(1, 'transparent')
            ctx.fillStyle = grad
            ctx.beginPath()
            ctx.arc(mouseRef.current.x, mouseRef.current.y, 12, 0, Math.PI * 2)
            ctx.fill()

            // Core dot
            ctx.fillStyle = '#fff'
            ctx.beginPath()
            ctx.arc(mouseRef.current.x, mouseRef.current.y, 3, 0, Math.PI * 2)
            ctx.fill()

            // Splash particles
            splashesRef.current = splashesRef.current.filter(s => s.alpha > 0.02)
            splashesRef.current.forEach(s => {
                s.x += s.vx
                s.y += s.vy
                s.vy += 0.15 // gravity
                s.r *= 0.96
                s.alpha *= 0.88

                ctx.globalAlpha = s.alpha
                const sg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 2)
                sg.addColorStop(0, s.color)
                sg.addColorStop(1, 'transparent')
                ctx.fillStyle = sg
                ctx.beginPath()
                ctx.arc(s.x, s.y, s.r * 2, 0, Math.PI * 2)
                ctx.fill()
                ctx.globalAlpha = 1
            })

            animRef.current = requestAnimationFrame(draw)
        }
        draw()

        return () => {
            cancelAnimationFrame(animRef.current)
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 9999,
                width: '100vw',
                height: '100vh',
            }}
            aria-hidden="true"
        />
    )
}
