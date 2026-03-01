import React, { useRef, useState } from 'react'

/* ── Marquee ─────────────────────────────────────────────────────
   Infinite scrolling marquee.
   Supports both `items` prop array AND `children` (preferred for new pages).
   ─────────────────────────────────────────────────────────────── */
export default function Marquee({
    children,
    items = [],
    speed = 30,
    gap = 40,
    pauseOnHover = true,
    direction = 'left',
    className = '',
    itemStyle = {},
}) {
    const [paused, setPaused] = useState(false)

    // Support both children API (Landing) and items API (legacy)
    const useChildren = children && React.Children.count(children) > 0

    const resolvedItems = useChildren
        ? React.Children.toArray(children)
        : items

    const tripled = [...resolvedItems, ...resolvedItems, ...resolvedItems]
    const duration = (resolvedItems.length * 200) / speed

    return (
        <div
            className={className}
            style={{ overflow: 'hidden', width: '100%', position: 'relative' }}
            onMouseEnter={() => pauseOnHover && setPaused(true)}
            onMouseLeave={() => pauseOnHover && setPaused(false)}
            aria-label="Scrolling marquee"
        >
            {/* Fade masks */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                background: 'linear-gradient(to right, var(--bg, #080808) 0%, transparent 10%, transparent 90%, var(--bg, #080808) 100%)',
            }} />

            <div style={{
                display: 'flex',
                gap: `${gap}px`,
                width: 'max-content',
                animation: `marquee-scroll-${direction} ${duration}s linear infinite`,
                animationPlayState: paused ? 'paused' : 'running',
            }}>
                {tripled.map((item, i) => (
                    <div key={i} style={{ flexShrink: 0, ...itemStyle }}>
                        {!useChildren && typeof item === 'string' ? (
                            <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '13px',
                                color: 'var(--text-secondary)',
                                letterSpacing: '0.05em',
                            }}>{item}</span>
                        ) : item}
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes marquee-scroll-left {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-33.333%); }
                }
                @keyframes marquee-scroll-right {
                    from { transform: translateX(-33.333%); }
                    to   { transform: translateX(0); }
                }
                @media (prefers-reduced-motion: reduce) {
                    [data-marquee] { animation: none !important; }
                }
            `}</style>
        </div>
    )
}
