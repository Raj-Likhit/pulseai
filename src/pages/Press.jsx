import React from 'react'
import AnimatedContent from '../components/animations/AnimatedContent'
import { Download, ExternalLink } from 'lucide-react'

const COVERAGE = [
    { outlet: 'TechCrunch', quote: '"Pulse is quietly becoming the backbone of the AI-native startup stack. Every serious team we spoke with is either using it or evaluating it."', date: 'Feb 2026', logo: '📰' },
    { outlet: 'The Verge', quote: '"Finally, a developer tool that treats AI routing as a first-class problem. The workflow builder alone is worth the price."', date: 'Jan 2026', logo: '🔷' },
    { outlet: 'Wired', quote: '"As AI model sprawl becomes unmanageable, Pulse has positioned itself as the definitive integration layer for teams that care about cost and reliability."', date: 'Dec 2025', logo: '📡' },
    { outlet: 'Hacker News', quote: '"I built the same thing internally at my last two companies. Pulse saved us months of infrastructure work."', date: 'Nov 2025', logo: '🟠' },
]

const ASSETS = [
    { name: 'Pulse logo (full color)', format: 'SVG / PNG', desc: 'Primary logo on dark and light backgrounds' },
    { name: 'Pulse wordmark', format: 'SVG / PNG', desc: 'Horizontal lockup, dark and light variants' },
    { name: 'Product screenshots', format: 'PNG 2x', desc: 'Dashboard, Workflow Builder, API Explorer, Analytics' },
    { name: 'Brand guidelines', format: 'PDF', desc: 'Full color system, typography, spacing, voice & tone' },
    { name: 'Executive photos', format: 'JPG 4K', desc: 'Headshots of CEO, CTO, Head of Product' },
]

export default function Press() {
    return (
        <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
            <section style={{ padding: 'var(--space-16) 0 var(--space-10)', borderBottom: '1px solid var(--border)' }}>
                <div className="container" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
                    <AnimatedContent direction="up">
                        <span className="eyebrow" style={{ display: 'block', marginBottom: '14px' }}>Press</span>
                        <h1 className="display-xl">Pulse in the <span className="text-gradient">press</span></h1>
                        <p style={{ marginTop: '16px', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                            For media enquiries contact <a href="mailto:press@pulse.ai" style={{ color: 'var(--accent)', textDecoration: 'none' }}>press@pulse.ai</a>.
                            We typically respond within 24 hours.
                        </p>
                    </AnimatedContent>
                </div>
            </section>

            {/* Press coverage */}
            <section style={{ padding: 'var(--space-10) 0', borderBottom: '1px solid var(--border)' }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h2 className="display-md" style={{ marginBottom: 'var(--space-6)' }}>Coverage</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {COVERAGE.map((item, i) => (
                            <AnimatedContent key={i} delay={i * 60} direction="up">
                                <div style={{
                                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                                    borderRadius: '16px', padding: '24px 28px',
                                    display: 'grid', gridTemplateColumns: '64px 1fr auto',
                                    gap: '20px', alignItems: 'center',
                                    transition: 'border-color 0.2s',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-md)'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                                >
                                    <div style={{ fontSize: '36px', textAlign: 'center' }}>{item.logo}</div>
                                    <div>
                                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>{item.outlet}</div>
                                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65, fontStyle: 'italic' }}>{item.quote}</p>
                                    </div>
                                    <a href="/assets/Pulse_SCC_Template.pdf" target="_blank" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}
                                        onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                                    ><ExternalLink size={16} /></a>
                                </div>
                            </AnimatedContent>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brand assets */}
            <section style={{ padding: 'var(--space-10) 0 var(--space-16)' }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h2 className="display-md" style={{ marginBottom: 'var(--space-6)' }}>Brand assets</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
                        {ASSETS.map((a, i) => (
                            <div key={i} style={{
                                background: 'var(--bg-card)', padding: '18px 24px',
                                display: 'flex', alignItems: 'center', gap: '16px',
                                borderBottom: i < ASSETS.length - 1 ? '1px solid var(--border)' : 'none',
                                transition: 'background 0.15s',
                            }}
                                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-surface)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}
                            >
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>{a.name}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{a.desc}</div>
                                </div>
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{a.format}</span>
                                <button style={{
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    padding: '6px 14px', borderRadius: '8px', cursor: 'pointer',
                                    border: '1px solid var(--border)', background: 'var(--accent-dim)',
                                    color: 'var(--accent)', fontSize: '12px', fontWeight: 600,
                                    transition: 'all 0.2s',
                                }}>
                                    <Download size={12} /> Download
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
