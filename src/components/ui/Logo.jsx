import React from 'react'
import { useTheme } from '../../context/ThemeContext'

export default function Logo({ size = 32, withText = true }) {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', userSelect: 'none' }}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ flexShrink: 0 }}
            >
                <defs>
                    <linearGradient id="logo-main-grad" x1="0" y1="0" x2="32" y2="32">
                        <stop stopColor={isDark ? "#F4A623" : "#0A1628"} />
                        <stop offset="1" stopColor={isDark ? "#FF6348" : "#E8A020"} />
                    </linearGradient>
                    <linearGradient id="logo-bg-grad" x1="0" y1="32" x2="32" y2="0">
                        <stop stopColor={isDark ? "rgba(244,166,35,0.2)" : "rgba(10,22,40,0.1)"} />
                        <stop offset="1" stopColor="transparent" />
                    </linearGradient>
                </defs>

                {/* Tech/Orchestration Geometric Base */}
                <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#logo-bg-grad)" stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"} strokeWidth="1" />

                {/* Dynamic Pulse Wave & Nodes */}
                <path
                    d="M8 18 C 12 18, 14 10, 18 10 C 22 10, 24 20, 28 16"
                    stroke="url(#logo-main-grad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <circle cx="8" cy="18" r="2.5" fill={isDark ? "#FAF3E0" : "#ffffff"} />
                <circle cx="18" cy="10" r="2.5" fill={isDark ? "#F4A623" : "#0A1628"} />
                <circle cx="28" cy="16" r="2.5" fill={isDark ? "#FF6348" : "#E8A020"} />
            </svg>

            {withText && (
                <span style={{
                    fontFamily: 'Inter, var(--font-display)',
                    fontSize: `${size * 0.58}px`,
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    color: 'var(--text-primary)',
                    lineHeight: 1
                }}>
                    Pulse
                </span>
            )}
        </div>
    )
}
