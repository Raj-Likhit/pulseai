import React, { useEffect, useRef, useState } from 'react'

/* ── Animated List ───────────────────────────────────────────────
   Items animate in with staggered delay on scroll into view.
   Based on ReactBits Animated List component.
   ─────────────────────────────────────────────────────────────── */
export default function AnimatedList({
    items = [],
    delay = 120,
    className = '',
    renderItem,
}) {
    const [visible, setVisible] = useState([])
    const ref = useRef(null)
    const observed = useRef(false)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setVisible(items.map((_, i) => i))
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !observed.current) {
                    observed.current = true
                    items.forEach((_, i) => {
                        setTimeout(() => setVisible(prev => [...prev, i]), i * delay)
                    })
                }
            },
            { threshold: 0.1 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [items, delay])

    return (
        <ul ref={ref} className={className} style={{ listStyle: 'none' }}>
            {items.map((item, i) => (
                <li
                    key={i}
                    style={{
                        opacity: visible.includes(i) ? 1 : 0,
                        transform: visible.includes(i) ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.2,0.64,1)',
                    }}
                >
                    {renderItem ? renderItem(item, i) : item}
                </li>
            ))}
        </ul>
    )
}
