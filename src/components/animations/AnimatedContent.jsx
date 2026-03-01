import React, { useEffect, useRef, useState } from 'react'

/* ── Animated Content ────────────────────────────────────────────
   General-purpose scroll-triggered entrance wrapper.
   Children animate in with fade + translate on scroll.
   ─────────────────────────────────────────────────────────────── */
export default function AnimatedContent({
    children,
    delay = 0,
    direction = 'up',    // 'up' | 'down' | 'left' | 'right' | 'none'
    distance = 32,
    duration = 600,
    threshold = 0.15,
    className = '',
    style = {},
}) {
    const [visible, setVisible] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setVisible(true)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setVisible(true), delay)
                    observer.disconnect()
                }
            },
            { threshold }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [delay, threshold])

    const translateMap = {
        up: `translateY(${distance}px)`,
        down: `translateY(-${distance}px)`,
        left: `translateX(${distance}px)`,
        right: `translateX(-${distance}px)`,
        none: 'none',
    }

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translate(0,0)' : translateMap[direction],
                transition: `opacity ${duration}ms cubic-bezier(0.4,0,0.2,1), transform ${duration}ms cubic-bezier(0.4,0,0.2,1)`,
                ...style,
            }}
        >
            {children}
        </div>
    )
}
