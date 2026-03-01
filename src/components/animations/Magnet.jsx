import React, { useRef, useEffect } from 'react'

/* ── Magnet ──────────────────────────────────────────────────────
   Wraps children. On hover, element drifts slightly toward cursor.
   Based on ReactBits Magnet component.
   ─────────────────────────────────────────────────────────────── */
export default function Magnet({ children, strength = 0.35, style = {} }) {
    const ref = useRef(null)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        if (window.matchMedia('(pointer: coarse)').matches) return

        const el = ref.current
        if (!el) return

        let animId = null
        let tx = 0, ty = 0
        let cx = 0, cy = 0

        const onEnter = () => {
            window.addEventListener('mousemove', onMove)
        }
        const onLeave = () => {
            window.removeEventListener('mousemove', onMove)
            // Spring back
            const springBack = () => {
                tx *= 0.8
                ty *= 0.8
                el.style.transform = `translate(${tx}px, ${ty}px)`
                if (Math.abs(tx) > 0.1 || Math.abs(ty) > 0.1) {
                    animId = requestAnimationFrame(springBack)
                } else {
                    el.style.transform = ''
                }
            }
            cancelAnimationFrame(animId)
            springBack()
        }
        const onMove = (e) => {
            const rect = el.getBoundingClientRect()
            cx = rect.left + rect.width / 2
            cy = rect.top + rect.height / 2
            const dx = e.clientX - cx
            const dy = e.clientY - cy
            tx = dx * strength
            ty = dy * strength
            el.style.transform = `translate(${tx}px, ${ty}px)`
            el.style.transition = 'transform 0.15s cubic-bezier(0.4,0,0.2,1)'
        }

        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)

        return () => {
            el.removeEventListener('mouseenter', onEnter)
            el.removeEventListener('mouseleave', onLeave)
            window.removeEventListener('mousemove', onMove)
            cancelAnimationFrame(animId)
        }
    }, [strength])

    return (
        <div ref={ref} style={{ display: 'inline-flex', ...style }}>
            {children}
        </div>
    )
}
