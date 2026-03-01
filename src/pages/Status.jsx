import React, { useEffect, useState } from 'react'
import AnimatedContent from '../components/animations/AnimatedContent'

const SERVICES = [
    { name: 'API Gateway', desc: 'Core routing & completions endpoint', current: 'operational' },
    { name: 'Model Providers', desc: 'Connections to OpenAI, Anthropic, Google, etc.', current: 'operational' },
    { name: 'Workflow Engine', desc: 'Visual workflow execution & scheduling', current: 'operational' },
    { name: 'Analytics Pipeline', desc: 'Real-time cost & latency telemetry', current: 'degraded' },
    { name: 'Dashboard & UI', desc: 'Web application and developer portal', current: 'operational' },
    { name: 'Webhooks', desc: 'Event delivery to customer endpoints', current: 'operational' },
    { name: 'Authentication', desc: 'API key validation and SSO', current: 'operational' },
]

const INCIDENTS = [
    {
        date: 'Feb 20, 2026', status: 'resolved', title: 'Elevated latency on Analytics Pipeline',
        updates: [
            { time: '14:32 UTC', msg: 'Monitoring — Investigating reports of increased P99 latency in the analytics pipeline.' },
            { time: '14:58 UTC', msg: 'Identified — Root cause identified: Kafka consumer lag due to a misconfigured partition rebalance after a routine deploy.' },
            { time: '15:24 UTC', msg: 'Resolved — Consumer lag cleared. Analytics pipeline fully operational. Post-mortem in progress.' },
        ],
    },
    {
        date: 'Jan 8, 2026', status: 'resolved', title: 'Intermittent 503 errors on /v1/chat/completions',
        updates: [
            { time: '09:15 UTC', msg: 'Monitoring — Small percentage of requests receiving 503 responses. Investigating.' },
            { time: '09:41 UTC', msg: 'Resolved — Root cause was an overloaded upstream connection pool. Auto-scaling triggered and resolved within 26 minutes. No data loss.' },
        ],
    },
]

const STATUS_CONFIG = {
    operational: { label: 'Operational', color: 'var(--accent)', dot: 'var(--accent)' },
    degraded: { label: 'Degraded Performance', color: 'var(--accent2)', dot: 'var(--accent2)' },
    outage: { label: 'Major Outage', color: '#ef4444', dot: '#ef4444' },
}

function UptimeBars({ status }) {
    // 90 days of "uptime bars"
    const bars = Array.from({ length: 90 }, (_, i) => {
        if (status === 'degraded' && i === 72) return 'degraded'
        if (i === 45 && status === 'operational') return 'incident'
        return 'up'
    })
    return (
        <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
            {bars.map((b, i) => (
                <div key={i} style={{
                    width: '3px', height: '28px', borderRadius: '2px',
                    background: b === 'up' ? 'var(--accent)' : b === 'degraded' ? 'var(--accent2)' : 'var(--accent2)',
                    opacity: b === 'up' ? 0.55 : 1,
                }} />
            ))}
        </div>
    )
}

export default function Status() {
    const [now, setNow] = useState(new Date())
    useEffect(() => { const t = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(t) }, [])
    const allOperational = SERVICES.every(s => s.current === 'operational')

    return (
        <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
            {/* Overall status banner */}
            <section style={{
                padding: 'var(--space-12) 0 var(--space-8)',
                background: allOperational
                    ? 'linear-gradient(180deg, var(--accent-dim) 0%, transparent 100%)'
                    : 'linear-gradient(180deg, var(--accent2-dim) 0%, transparent 100%)',
                borderBottom: '1px solid var(--border)',
                textAlign: 'center',
            }}>
                <div className="container">
                    <AnimatedContent direction="up">
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '12px',
                            background: 'var(--bg-card)', border: '1px solid var(--border)',
                            borderRadius: '999px', padding: '10px 24px', marginBottom: '20px',
                        }}>
                            <span style={{
                                width: 10, height: 10, borderRadius: '50%',
                                background: allOperational ? 'var(--accent)' : 'var(--accent2)',
                                boxShadow: `0 0 12px ${allOperational ? 'var(--accent)' : 'var(--accent2)'}`,
                                display: 'inline-block', animation: 'pulse-dot 2s infinite',
                            }} />
                            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                                {allOperational ? 'All systems operational' : 'Partial system degradation'}
                            </span>
                        </div>
                        <h1 className="display-xl" style={{ marginBottom: '8px' }}>System <span className="text-gradient">Status</span></h1>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                            Last checked {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} UTC
                        </p>
                    </AnimatedContent>
                </div>
            </section>

            {/* Service list */}
            <section style={{ padding: 'var(--space-8) 0', borderBottom: '1px solid var(--border)' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
                        {SERVICES.map((svc, i) => {
                            const cfg = STATUS_CONFIG[svc.current]
                            return (
                                <AnimatedContent key={i} delay={i * 30} direction="up">
                                    <div style={{
                                        display: 'grid', gridTemplateColumns: '1fr auto',
                                        gap: '20px', alignItems: 'center',
                                        padding: '16px 20px', background: 'var(--bg-card)',
                                        borderBottom: i < SERVICES.length - 1 ? '1px solid var(--border)' : 'none',
                                    }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                                <UptimeBars status={svc.current} />
                                            </div>
                                            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>{svc.name}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{svc.desc}</div>
                                        </div>
                                        <span style={{
                                            fontSize: '12px', fontWeight: 600, color: cfg.color,
                                            padding: '4px 12px', borderRadius: '999px',
                                            background: svc.current === 'operational' ? 'var(--accent-dim)' : 'var(--accent2-dim)',
                                            border: `1px solid ${cfg.color}30`, whiteSpace: 'nowrap',
                                        }}>{cfg.label}</span>
                                    </div>
                                </AnimatedContent>
                            )
                        })}
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '10px', textAlign: 'right' }}>
                        Each bar = 1 day · 90-day history
                    </p>
                </div>
            </section>

            {/* Incident history */}
            <section style={{ padding: 'var(--space-8) 0 var(--space-16)' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 className="display-md" style={{ marginBottom: 'var(--space-6)' }}>Incident history</h2>
                    {INCIDENTS.map((inc, i) => (
                        <AnimatedContent key={i} delay={i * 60} direction="up">
                            <div style={{ marginBottom: '20px', border: '1px solid var(--border)', borderRadius: '14px', overflow: 'hidden' }}>
                                <div style={{ background: 'var(--bg-surface)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border)' }}>
                                    <span style={{
                                        fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px',
                                        background: 'var(--accent-dim)', color: 'var(--accent)',
                                        letterSpacing: '0.06em', textTransform: 'uppercase',
                                    }}>Resolved</span>
                                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{inc.title}</span>
                                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: 'auto' }}>{inc.date}</span>
                                </div>
                                <div style={{ background: 'var(--bg-card)', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {inc.updates.map((u, j) => (
                                        <div key={j} style={{ display: 'flex', gap: '14px', fontSize: '13px' }}>
                                            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', flexShrink: 0, fontSize: '11px', paddingTop: '1px' }}>{u.time}</span>
                                            <span style={{ color: 'var(--text-secondary)', lineHeight: 1.55 }}>{u.msg}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AnimatedContent>
                    ))}
                </div>
            </section>
        </main>
    )
}
