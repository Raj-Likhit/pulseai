import React, { useState } from 'react'
import AnimatedContent from '../components/animations/AnimatedContent'
import { ThumbsUp, Zap, Brain, Shield, Globe, BarChart3, GitBranch, Layers, Lock } from 'lucide-react'

const COLUMNS = [
    {
        id: 'progress', label: 'In Progress', color: 'var(--accent)',
        items: [
            { title: 'Image generation routing', icon: <Layers size={15} />, votes: 284, desc: 'Unified endpoint for DALL·E 3, Flux Pro, Stable Diffusion, Ideogram. Auto-select by style/cost.' },
            { title: 'Prompt versioning & diff', icon: <GitBranch size={15} />, votes: 211, desc: 'Track, compare, and roll back prompt versions across workflows with git-style diffs.' },
        ],
    },
    {
        id: 'next', label: 'Next Up', color: 'var(--accent2)',
        items: [
            { title: 'Fine-tuning orchestration', icon: <Brain size={15} />, votes: 388, desc: 'Orchestrate fine-tuning jobs across OpenAI, Together AI, Replicate from a single API.' },
            { title: 'Real-time voice models', icon: <Zap size={15} />, votes: 301, desc: 'Low-latency routing for Whisper v3, ElevenLabs, and Deepgram with automatic language detection.' },
            { title: 'Team usage quotas', icon: <BarChart3 size={15} />, votes: 193, desc: 'Set per-team or per-project budget limits with Slack/email alerts before overage.' },
        ],
    },
    {
        id: 'planned', label: 'Planned', color: 'var(--text-secondary)',
        items: [
            { title: 'SOC 2 Type II (APAC)', icon: <Shield size={15} />, votes: 178, desc: 'Dedicated APAC region with local data residency and AP-specific compliance certification.' },
            { title: 'Latency SLA guarantees', icon: <Globe size={15} />, votes: 156, desc: 'Contractual P99 latency guarantees per model tier with automatic SLA credit on breach.' },
            { title: 'RBAC & audit logs', icon: <Lock size={15} />, votes: 144, desc: 'Role-based access control with full immutable audit log export to S3, Datadog, or Splunk.' },
        ],
    },
]

export default function Roadmap() {
    const [votes, setVotes] = useState({})

    const handleVote = (colId, i) => {
        const key = `${colId}-${i}`
        setVotes(v => ({ ...v, [key]: !v[key] }))
    }

    return (
        <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
            {/* Hero header */}
            <section style={{
                padding: 'var(--space-16) 0 var(--space-10)',
                background: 'linear-gradient(180deg, var(--ambient-1) 0%, transparent 100%)',
                borderBottom: '1px solid var(--border)',
            }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
                    <AnimatedContent direction="up">
                        <span className="eyebrow" style={{ display: 'block', marginBottom: '14px' }}>Roadmap</span>
                        <h1 className="display-xl">Built in public.<br /><span className="text-gradient">Shaped by you.</span></h1>
                        <p style={{ marginTop: '16px', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                            Vote on features you want most. Our roadmap is driven by real usage patterns
                            and direct feedback — not internal guessing.
                        </p>
                    </AnimatedContent>
                </div>
            </section>

            {/* Kanban board */}
            <section style={{ padding: 'var(--space-10) 0 var(--space-16)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'start' }}>
                        {COLUMNS.map((col, ci) => (
                            <AnimatedContent key={col.id} delay={ci * 100} direction="up">
                                <div>
                                    {/* Column header */}
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '10px',
                                        marginBottom: '16px', paddingBottom: '12px',
                                        borderBottom: `2px solid ${col.color}`,
                                    }}>
                                        <span style={{
                                            width: 8, height: 8, borderRadius: '50%',
                                            background: col.color, display: 'inline-block',
                                            boxShadow: `0 0 10px ${col.color}`,
                                        }} />
                                        <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: col.color }}>{col.label}</span>
                                        <span style={{
                                            marginLeft: 'auto', fontSize: '11px',
                                            background: 'var(--bg-surface)', border: '1px solid var(--border)',
                                            borderRadius: '999px', padding: '2px 10px',
                                            color: 'var(--text-muted)',
                                        }}>{col.items.length}</span>
                                    </div>

                                    {/* Cards */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {col.items.map((item, ii) => {
                                            const key = `${col.id}-${ii}`
                                            const voted = !!votes[key]
                                            const count = item.votes + (voted ? 1 : 0)
                                            return (
                                                <div key={ii} style={{
                                                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                                                    borderRadius: '14px', padding: '18px',
                                                    transition: 'border-color 0.2s, box-shadow 0.2s',
                                                }}
                                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-md)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)' }}
                                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
                                                >
                                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '8px' }}>
                                                        <span style={{ color: 'var(--accent)', marginTop: '1px', flexShrink: 0 }}>{item.icon}</span>
                                                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.35 }}>{item.title}</span>
                                                    </div>
                                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>{item.desc}</p>
                                                    <button onClick={() => handleVote(col.id, ii)} style={{
                                                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                        padding: '5px 12px', borderRadius: '8px',
                                                        background: voted ? 'var(--accent-dim)' : 'var(--bg-surface)',
                                                        border: voted ? '1px solid var(--border-md)' : '1px solid var(--border)',
                                                        color: voted ? 'var(--accent)' : 'var(--text-muted)',
                                                        fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                                                        transition: 'all 0.2s',
                                                    }}>
                                                        <ThumbsUp size={12} fill={voted ? 'var(--accent)' : 'none'} />
                                                        {count}
                                                    </button>
                                                </div>
                                            )
                                        })}
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
