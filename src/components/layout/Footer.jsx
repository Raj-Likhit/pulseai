import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import Logo from '../ui/Logo'

export default function Footer() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const footerLinks = {
        Product: [
            { label: 'Features', to: '/features' },
            { label: 'Pricing', to: '/pricing' },
            { label: 'Changelog', to: '/changelog' },
            { label: 'Roadmap', to: '/roadmap' },
        ],
        Company: [
            { label: 'About', to: '/about' },
            { label: 'Blog', to: '/blog' },
            { label: 'Careers', to: '/careers' },
            { label: 'Press', to: '/press' },
        ],
        Resources: [
            { label: 'Documentation', to: '/docs' },
            { label: 'API Reference', to: '/api' },
            { label: 'Status', to: '/status' },
            { label: 'Community', to: '/community' },
        ],
        Legal: [
            { label: 'Privacy', to: '/privacy' },
            { label: 'Terms', to: '/terms' },
            { label: 'Security', to: '/security' },
            { label: 'DPA', to: '/dpa' },
        ],
    }

    return (
        <footer style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--bg-surface)',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Ambient accent glow at bottom */}
            <div style={{
                position: 'absolute',
                bottom: 0, left: '50%', transform: 'translateX(-50%)',
                width: '60%', height: '40%',
                background: 'radial-gradient(ellipse, var(--ambient-1) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Watermark / editorial headline */}
            <div style={{
                borderBottom: '1px solid var(--border)',
                padding: 'var(--space-8) 0',
                overflow: 'hidden',
            }}>
                <div className="container">
                    <p style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(20px, 3vw, 36px)',
                        fontWeight: 800,
                        letterSpacing: '-0.025em',
                        color: isDark ? 'rgba(250,243,224,0.06)' : 'rgba(10,22,40,0.06)',
                        lineHeight: 1.2,
                        userSelect: 'none',
                    }}>
                        Artificial Intelligence + Human Creativity = Unlimited Potential
                    </p>
                </div>
            </div>

            {/* Main footer grid */}
            <div className="container" style={{ padding: 'var(--space-8) var(--space-4)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 'var(--space-6)' }}>

                    {/* Brand */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                            <Logo size={28} />
                        </Link>

                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '220px' }}>
                            One API for every AI model. Build, deploy, and optimize AI workflows at scale.
                        </p>

                        {/* Status badge */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            background: 'var(--accent-dim)',
                            border: '1px solid var(--border-md)',
                            borderRadius: '999px', padding: '6px 14px', width: 'fit-content',
                        }}>
                            <span style={{
                                width: 7, height: 7, borderRadius: '50%',
                                background: 'var(--accent)',
                                boxShadow: '0 0 8px var(--accent)',
                                display: 'inline-block',
                                animation: 'pulse-dot 2s infinite',
                            }} />
                            <span style={{
                                fontSize: '11px', fontWeight: 600,
                                color: 'var(--accent)',
                                letterSpacing: '0.06em',
                            }}>ALL SYSTEMS OPERATIONAL</span>
                        </div>

                        {/* Social icons */}
                        <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                            {['𝕏', 'in', '◈', '⌥'].map((icon, i) => (
                                <a key={i} href="https://x.com/pulseai" target="_blank" rel="noopener noreferrer" style={{
                                    width: 34, height: 34, borderRadius: '10px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: 'var(--accent-dim)',
                                    border: '1px solid var(--border)',
                                    color: 'var(--text-muted)',
                                    fontSize: '13px',
                                    transition: 'all 200ms',
                                    textDecoration: 'none',
                                }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = 'var(--border-md)'
                                        e.currentTarget.style.color = 'var(--accent)'
                                        e.currentTarget.style.borderColor = 'var(--border-md)'
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = 'var(--accent-dim)'
                                        e.currentTarget.style.color = 'var(--text-muted)'
                                        e.currentTarget.style.borderColor = 'var(--border)'
                                    }}
                                >{icon}</a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([section, links]) => (
                        <div key={section}>
                            <div style={{
                                fontSize: '11px', fontWeight: 700,
                                letterSpacing: '0.1em', textTransform: 'uppercase',
                                color: 'var(--accent)',
                                marginBottom: '16px',
                            }}>{section}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {links.map(link => (
                                    <Link
                                        key={link.label}
                                        to={link.to}
                                        style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 200ms' }}
                                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div style={{
                    marginTop: 'var(--space-8)',
                    paddingTop: 'var(--space-4)',
                    borderTop: '1px solid var(--border)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    flexWrap: 'wrap', gap: '12px',
                }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        © {new Date().getFullYear()} Pulse AI, Inc. All rights reserved.
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        v2.4.1 · Built with ⚡
                    </span>
                </div>
            </div>
        </footer>
    )
}
