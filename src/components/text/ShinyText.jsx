import React from 'react'

/* ── Shiny Text ──────────────────────────────────────────────────
   Text with an animated shimmer/glint effect crossing it.
   Based on ReactBits Shiny Text component.
   ─────────────────────────────────────────────────────────────── */
export default function ShinyText({
    text = '',
    speed = 3,
    shimmerColor = 'rgba(255,255,255,0.8)',
    className = '',
    style = {},
}) {
    return (
        <span
            className={className}
            style={{
                position: 'relative',
                display: 'inline-block',
                backgroundImage: `
          linear-gradient(
            90deg,
            transparent 0%,
            transparent 40%,
            ${shimmerColor} 50%,
            transparent 60%,
            transparent 100%
          ),
          linear-gradient(135deg, #7C3AED, #2DD4BF)
        `,
                backgroundSize: '200% 100%, 100% 100%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: `shiny-shimmer ${speed}s linear infinite`,
                ...style,
            }}
        >
            {text}
            <style>{`
        @keyframes shiny-shimmer {
          0% { background-position: -200% 0, 0 0; }
          100% { background-position: 200% 0, 0 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="shiny-shimmer"] { animation: none !important; }
        }
      `}</style>
        </span>
    )
}
