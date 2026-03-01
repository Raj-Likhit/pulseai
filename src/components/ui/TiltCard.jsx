import React, { useRef, useEffect } from 'react'

/* ── Tilt Card ───────────────────────────────────────────────────
   3D perspective tilt on hover with specular shine.
   Based on ReactBits Tilt Card component.
   ─────────────────────────────────────────────────────────────── */
export default function TiltCard({
    children,
    maxTilt = 12,
    scale = 1.03,
    className = '',
    style = {},
}) {
    const cardRef = useRef(null)
    const shineRef = useRef(null)
    const animRef = useRef(null)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        if (window.matchMedia('(pointer: coarse)').matches) return

        const card = cardRef.current
        const shine = shineRef.current
        if (!card) return

        let tx = 0, ty = 0, sx = 50, sy = 50
        let targetX = 0, targetY = 0, targetSX = 50, targetSY = 50
        let isHovered = false

        const animate = () => {
            tx += (targetX - tx) * 0.1
            ty += (targetY - ty) * 0.1
            sx += (targetSX - sx) * 0.1
            sy += (targetSY - sy) * 0.1

            card.style.transform = `perspective(800px) rotateX(${ty}deg) rotateY(${tx}deg) scale(${isHovered ? scale : 1})`
            if (shine) shine.style.background = `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.12) 0%, transparent 60%)`

            animRef.current = requestAnimationFrame(animate)
        }
        animate()

        const onMove = (e) => {
            const rect = card.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width
            const y = (e.clientY - rect.top) / rect.height
            targetX = (x - 0.5) * maxTilt * 2
            targetY = -(y - 0.5) * maxTilt * 2
            targetSX = x * 100
            targetSY = y * 100
        }
        const onEnter = () => { isHovered = true }
        const onLeave = () => {
            isHovered = false
            targetX = 0
            targetY = 0
            targetSX = 50
            targetSY = 50
        }

        card.addEventListener('mousemove', onMove)
        card.addEventListener('mouseenter', onEnter)
        card.addEventListener('mouseleave', onLeave)

        return () => {
            card.removeEventListener('mousemove', onMove)
            card.removeEventListener('mouseenter', onEnter)
            card.removeEventListener('mouseleave', onLeave)
            cancelAnimationFrame(animRef.current)
        }
    }, [maxTilt, scale])

    return (
        <div
            ref={cardRef}
            className={`card ${className}`}
            style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                position: 'relative',
                overflow: 'hidden',
                ...style,
            }}
        >
            {/* Specular shine overlay */}
            <div
                ref={shineRef}
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 10,
                    borderRadius: 'inherit',
                    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)',
                    transition: 'background 0.1s',
                }}
            />
            {children}
        </div>
    )
}
