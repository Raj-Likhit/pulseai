import React, { useState } from 'react'
import AnimatedContent from '../components/animations/AnimatedContent'
import { Zap, Shield, GitBranch, BarChart3, Globe, Sparkles } from 'lucide-react'

const RELEASES = [
    {
        version: 'v2.4.1', date: 'Feb 28, 2026', tag: 'Patch',
        icon: <Shield size={14} />, color: 'var(--accent2)',
        summary: 'Performance & stability fixes',
        changes: [
            'Fixed edge case in smart routing causing 0.01% of requests to stall on Mistral Large',
            'Improved streaming stability for Qwen 2.5 at high concurrency',
            'SSE heartbeat interval now configurable via `pulse.stream.heartbeat_ms`',
        ],
    },
    {
        version: 'v2.4.0', date: 'Feb 14, 2026', tag: 'Minor',
        icon: <Sparkles size={14} />, color: 'var(--accent)',
        summary: 'DeepSeek V3 support + cost dashboard',
        changes: [
            'Added native DeepSeek V3 integration — 128K context window, 60 tok/s',
            'New real-time cost dashboard with per-model, per-team, and per-workflow breakdowns',
            'Automatic fallback chains can now be defined in YAML config',
            'Prompt caching now supported for Claude 3.5 Sonnet (up to 90% cost reduction on repeated system prompts)',
        ],
    },
    {
        version: 'v2.3.0', date: 'Jan 30, 2026', tag: 'Minor',
        icon: <Globe size={14} />, color: 'var(--accent)',
        summary: 'Multi-region failover & EU data residency',
        changes: [
            'EU data residency now GA — all traffic stays within eu-west-1 when enabled',
            'Multi-region active-active failover — automatic reroute in <200ms on provider outage',
            'New webhook events: `model.fallback`, `budget.threshold`, `routing.override`',
        ],
    },
    {
        version: 'v2.2.0', date: 'Jan 8, 2026', tag: 'Minor',
        icon: <BarChart3 size={14} />, color: 'var(--accent)',
        summary: 'Analytics v2 + A/B prompt testing',
        changes: [
            'Analytics v2: P50/P95/P99 latency histograms, token cost per request, error rate trends',
            'Built-in A/B prompt testing — split traffic across prompt variants and compare quality scores',
            'New Python SDK v3 with async-first design',
            'OpenAI-compatible endpoint now supports tool_choice and parallel_tool_calls',
        ],
    },
    {
        version: 'v2.1.0', date: 'Dec 12, 2025', tag: 'Minor',
        icon: <GitBranch size={14} />, color: 'var(--accent)',
        summary: 'Visual Workflow Builder GA',
        changes: [
            'Visual Workflow Builder promoted from beta to GA',
            'Added 14 new node types including JSON transform, semantic cache, and rate-limiter',
            'Workflows can now be triggered via webhook, cron, or SDK',
            'Export workflows as reusable templates — share with team or publish to community',
        ],
    },
    {
        version: 'v2.0.0', date: 'Nov 1, 2025', tag: 'Major',
        icon: <Zap size={14} />, color: 'var(--accent)',
        summary: 'Pulse 2.0 — complete platform relaunch',
        changes: [
            'Unified API across all 40+ supported models — single endpoint, consistent schema',
            'Smart routing engine with ML-powered model selection (latency × quality × cost optimization)',
            'Enterprise SSO via SAML 2.0 and SCIM provisioning',
            'SOC 2 Type II certification achieved',
            'New developer dashboard with project-level API key management',
        ],
    },
]

const TAG_COLORS = {
    Major: { bg: 'var(--accent)', color: 'var(--bg)' },
    Minor: { bg: 'var(--accent-dim)', color: 'var(--accent)' },
    Patch: { bg: 'var(--bg-surface)', color: 'var(--text-muted)' },
}

export default function Changelog() {
    const [filter, setFilter] = useState('All')
    const filters = ['All', 'Major', 'Minor', 'Patch']
    const visible = filter === 'All' ? RELEASES : RELEASES.filter(r => r.tag === filter)

    return (
        <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
            {/* Page header */}
            <section style={{ padding: 'var(--space-16) 0 var(--space-8)', borderBottom: '1px solid var(--border)' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <AnimatedContent direction="up">
                        <span className="eyebrow" style={{ display: 'block', marginBottom: '12px' }}>Changelog</span>
                        <h1 className="display-xl">What's new in <span className="text-gradient">Pulse</span></h1>
                        <p style={{ marginTop: '16px', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            Every release, every fix, documented. Subscribe to the RSS feed for real-time updates.
                        </p>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '24px', flexWrap: 'wrap' }}>
                            {filters.map(f => (
                                <button key={f} onClick={() => setFilter(f)} style={{
                                    padding: '7px 18px', borderRadius: '999px', border: '1px solid var(--border)',
                                    background: filter === f ? 'var(--accent)' : 'transparent',
                                    color: filter === f ? 'var(--bg)' : 'var(--text-secondary)',
                                    fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}>{f}</button>
                            ))}
                        </div>
                    </AnimatedContent>
                </div>
            </section>

            {/* Timeline */}
            <section style={{ padding: 'var(--space-10) 0 var(--space-16)' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ position: 'relative' }}>
                        {/* Vertical line */}
                        <div style={{
                            position: 'absolute', left: '7px', top: 0, bottom: 0,
                            width: '1px', background: 'var(--border)',
                        }} />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
                            {visible.map((rel, i) => (
                                <AnimatedContent key={rel.version} delay={i * 80} direction="up">
                                    <div style={{ display: 'flex', gap: '28px' }}>
                                        {/* Timeline dot */}
                                        <div style={{ flexShrink: 0, position: 'relative', paddingTop: '3px' }}>
                                            <div style={{
                                                width: 15, height: 15, borderRadius: '50%',
                                                background: 'var(--accent)', border: '3px solid var(--bg)',
                                                boxShadow: '0 0 0 1px var(--border)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }} />
                                        </div>

                                        {/* Content */}
                                        <div style={{
                                            flex: 1, background: 'var(--bg-card)',
                                            border: '1px solid var(--border)', borderRadius: '16px',
                                            padding: '24px', marginTop: '-2px',
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                                <span style={{
                                                    fontFamily: 'var(--font-mono)', fontSize: '15px',
                                                    fontWeight: 700, color: 'var(--text-primary)',
                                                }}>{rel.version}</span>
                                                <span style={{
                                                    padding: '2px 10px', borderRadius: '999px', fontSize: '11px',
                                                    fontWeight: 700, letterSpacing: '0.06em',
                                                    background: TAG_COLORS[rel.tag].bg,
                                                    color: TAG_COLORS[rel.tag].color,
                                                }}>{rel.tag}</span>
                                                <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: 'auto' }}>{rel.date}</span>
                                            </div>
                                            <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>{rel.summary}</p>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {rel.changes.map((c, j) => (
                                                    <li key={j} style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                                                        <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }}>→</span>
                                                        {c}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </AnimatedContent>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
