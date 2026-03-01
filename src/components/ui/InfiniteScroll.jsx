import React from 'react'

/* ── Infinite Scroll ─────────────────────────────────────────────
   Two-direction cloned infinite scroll — used for testimonials.
   Based on ReactBits Infinite Scroll component.
   ─────────────────────────────────────────────────────────────── */
export default function InfiniteScroll({
    items = [],
    direction = 'left',
    speed = 25,
    gap = 24,
    className = '',
    renderItem,
    pauseOnHover = true,
}) {
    const [paused, setPaused] = React.useState(false)
    const tripled = [...items, ...items, ...items]
    const duration = (items.length * 280) / speed

    return (
        <div
            className={className}
            style={{ overflow: 'hidden', width: '100%' }}
            onMouseEnter={() => pauseOnHover && setPaused(true)}
            onMouseLeave={() => pauseOnHover && setPaused(false)}
        >
            <div
                style={{
                    display: 'flex',
                    gap: `${gap}px`,
                    width: 'max-content',
                    animation: `inf-scroll-${direction} ${duration}s linear infinite`,
                    animationPlayState: paused ? 'paused' : 'running',
                }}
            >
                {tripled.map((item, i) => (
                    <div key={i} style={{ flexShrink: 0 }}>
                        {renderItem ? renderItem(item, i % items.length) : item}
                    </div>
                ))}
            </div>

            <style>{`
        @keyframes inf-scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes inf-scroll-right {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="inf-scroll"] { animation: none !important; }
        }
      `}</style>
        </div>
    )
}
