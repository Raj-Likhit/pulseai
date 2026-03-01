import React, { useState } from 'react'
import AnimatedContent from '../components/animations/AnimatedContent'
import { ChevronRight, Search } from 'lucide-react'

const SECTIONS = [
    {
        label: 'Getting Started', color: 'var(--accent)',
        guides: [
            { title: 'Quickstart: Your first API call', desc: '5 minutes to your first successful model request via the Pulse API.' },
            { title: 'Installation & SDK setup', desc: 'Python, Node.js, TypeScript, Go and REST. All clients, all versions.' },
            { title: 'Authentication & API keys', desc: 'Project-scoped keys, rotation policies, and environment variables.' },
            { title: 'Rate limits & quotas', desc: 'Understanding request limits, burst capacity, and how to increase them.' },
        ],
    },
    {
        label: 'Models', color: 'var(--accent)',
        guides: [
            { title: 'Supported models directory', desc: 'All 40+ models with context windows, pricing, and capability tags.' },
            { title: 'Smart routing explained', desc: 'How Pulse selects the optimal model for each request automatically.' },
            { title: 'Custom routing rules', desc: 'Override routing decisions with YAML config or programmatic rules.' },
            { title: 'Fallback chains', desc: 'Configure automatic fallback sequences when a model is unavailable.' },
        ],
    },
    {
        label: 'Workflows', color: 'var(--accent)',
        guides: [
            { title: 'Workflow Builder overview', desc: 'Node types, connections, triggers and deployment.' },
            { title: 'Prompt chaining', desc: 'Pipe model outputs into subsequent model inputs with typed schemas.' },
            { title: 'Semantic caching', desc: 'Cache semantically similar prompts to cut latency and cost.' },
            { title: 'Webhook triggers', desc: 'Trigger workflows via HTTP events, cron schedules, or SDK calls.' },
        ],
    },
    {
        label: 'Analytics & Optimization', color: 'var(--accent)',
        guides: [
            { title: 'Cost dashboard', desc: 'Per-model, per-team and per-workflow spend tracking in real time.' },
            { title: 'Latency histograms', desc: 'P50/P95/P99 breakdowns with drill-down by model and region.' },
            { title: 'A/B prompt testing', desc: 'Split traffic between prompt variants and compare quality scores.' },
            { title: 'Budget alerts', desc: 'Set spend thresholds with Slack, email or PagerDuty notifications.' },
        ],
    },
]

export default function Documentation() {
    const [query, setQuery] = useState('')
    const filtered = SECTIONS.map(s => ({
        ...s,
        guides: s.guides.filter(g =>
            !query || g.title.toLowerCase().includes(query.toLowerCase()) || g.desc.toLowerCase().includes(query.toLowerCase())
        ),
    })).filter(s => s.guides.length > 0)

    return (
        <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
            {/* Header */}
            <section style={{
                padding: 'var(--space-14) 0 var(--space-8)',
                background: 'linear-gradient(180deg, var(--ambient-1) 0%, transparent 100%)',
                borderBottom: '1px solid var(--border)',
            }}>
                <div className="container" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
                    <AnimatedContent direction="up">
                        <span className="eyebrow" style={{ display: 'block', marginBottom: '14px' }}>Documentation</span>
                        <h1 className="display-xl" style={{ marginBottom: '24px' }}>
                            Everything you need to<br /><span className="text-gradient">build with Pulse</span>
                        </h1>
                        {/* Search box */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '12px',
                            background: 'var(--bg-card)', border: '1px solid var(--border)',
                            borderRadius: '14px', padding: '14px 20px',
                            maxWidth: '520px', margin: '0 auto',
                            transition: 'border-color 0.2s',
                        }}
                            onFocusCapture={e => e.currentTarget.style.borderColor = 'var(--border-md)'}
                            onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--border)'}
                        >
                            <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                            <input
                                value={query} onChange={e => setQuery(e.target.value)}
                                placeholder="Search docs…"
                                style={{
                                    flex: 1, background: 'none', border: 'none', outline: 'none',
                                    fontSize: '15px', color: 'var(--text-primary)',
                                }}
                            />
                        </div>
                    </AnimatedContent>
                </div>
            </section>

            {/* Docs grid */}
            <section style={{ padding: 'var(--space-10) 0 var(--space-16)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
                        {filtered.map((section, si) => (
                            <AnimatedContent key={section.label} delay={si * 80} direction="up">
                                <div>
                                    <h2 style={{
                                        fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em',
                                        textTransform: 'uppercase', color: 'var(--accent)',
                                        marginBottom: '14px', paddingBottom: '10px',
                                        borderBottom: '1px solid var(--border)',
                                    }}>{section.label}</h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        {section.guides.map((guide, gi) => (
                                            <a key={gi} href={`/docs/guide-${gi}`} style={{
                                                display: 'flex', alignItems: 'center', gap: '12px',
                                                fontSize: '14px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s',
                                                padding: '12px 14px', borderRadius: '10px',
                                                // textDecoration: 'none', transition: 'background 0.15s', // This line was duplicated and partially incorrect in the instruction
                                            }}
                                                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card)'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>{guide.title}</div>
                                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{guide.desc}</div>
                                                </div>
                                                <ChevronRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </AnimatedContent>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
