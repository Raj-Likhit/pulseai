import React, { useState } from 'react'
import AnimatedContent from '../components/animations/AnimatedContent'
import { ArrowRight, MapPin } from 'lucide-react'

const JOBS = [
    { team: 'Engineering', title: 'Senior Infrastructure Engineer', location: 'Remote (US/EU)', type: 'Full-time', desc: 'Scale our multi-region API gateway to handle 10B+ requests/month. Deep Rust, Kubernetes, and distributed systems experience required.' },
    { team: 'Engineering', title: 'ML Platform Engineer', location: 'Remote (Worldwide)', type: 'Full-time', desc: 'Build the tooling that connects us to 40+ AI providers. Own our model evaluation harness, latency benchmarking, and routing logic.' },
    { team: 'Engineering', title: 'Full-Stack Engineer — Dashboard', location: 'Remote (US/EU)', type: 'Full-time', desc: 'Own the Pulse developer dashboard from API explorer to cost analytics. React, TypeScript, and a love of great UX.' },
    { team: 'Product', title: 'Product Manager — Workflow Builder', location: 'San Francisco, CA', type: 'Full-time', desc: 'Define the future of no-code AI orchestration. Work directly with engineering and design to ship the next generation of our workflow tooling.' },
    { team: 'Design', title: 'Product Designer', location: 'Remote (US/EU)', type: 'Full-time', desc: 'Craft developer-first interfaces that feel as good as they perform. Portfolio showing complex technical product design is a must.' },
    { team: 'Go-to-Market', title: 'Developer Advocate', location: 'Remote (Worldwide)', type: 'Full-time', desc: 'Build relationships with the developer community through content, open-source contributions, and conference talks. Ideally you\'ve shipped AI products yourself.' },
    { team: 'Go-to-Market', title: 'Enterprise Account Executive', location: 'New York, NY / San Francisco, CA', type: 'Full-time', desc: 'Close six-figure deals with engineering-led companies. You understand APIs, rate limits, and why devs hate seat-based pricing.' },
]

const TEAMS = ['All', ...Array.from(new Set(JOBS.map(j => j.team)))]

const PERKS = [
    { emoji: '🏥', label: 'Comprehensive health', desc: 'Medical, dental and vision for you and your dependents' },
    { emoji: '💰', label: 'Equity for everyone', desc: 'Meaningful equity stake from day one, not just senior roles' },
    { emoji: '🌍', label: 'Remote-first', desc: 'Work from wherever you do your best thinking' },
    { emoji: '📚', label: '$3K learning budget', desc: 'Courses, books, conferences — invest in yourself' },
    { emoji: '🏖️', label: 'Unlimited PTO', desc: 'Actual culture of taking time off, not just a policy' },
    { emoji: '⚡', label: 'Home office setup', desc: '$2K stipend to build your ideal workspace' },
]

export default function Careers() {
    const [filter, setFilter] = useState('All')
    const visible = filter === 'All' ? JOBS : JOBS.filter(j => j.team === filter)

    return (
        <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
            {/* Hero */}
            <section style={{
                padding: 'var(--space-16) 0 var(--space-10)',
                background: 'linear-gradient(180deg, var(--ambient-1) 0%, transparent 100%)',
                borderBottom: '1px solid var(--border)',
            }}>
                <div className="container" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
                    <AnimatedContent direction="up">
                        <span className="eyebrow" style={{ display: 'block', marginBottom: '14px' }}>We're hiring</span>
                        <h1 className="display-xl">
                            Build the infrastructure<br />
                            <span className="text-gradient">of the AI era</span>
                        </h1>
                        <p style={{ marginTop: '20px', fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                            Pulse is a small, ambitious team. Every engineer here has outsized impact.
                            We move fast, write great code, and care deeply about the developer experience.
                        </p>
                        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '32px', flexWrap: 'wrap' }}>
                            {[['32', 'Team members'], ['18', 'Countries'], ['100%', 'Remote option']].map(([val, label]) => (
                                <div key={label} style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>{val}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase', marginTop: '4px' }}>{label}</div>
                                </div>
                            ))}
                        </div>
                    </AnimatedContent>
                </div>
            </section>

            {/* Perks */}
            <section style={{ padding: 'var(--space-10) 0', borderBottom: '1px solid var(--border)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        {PERKS.map((p, i) => (
                            <AnimatedContent key={i} delay={i * 50} direction="up">
                                <div style={{
                                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                                    borderRadius: '14px', padding: '20px 22px',
                                    display: 'flex', gap: '14px', alignItems: 'flex-start',
                                }}>
                                    <span style={{ fontSize: '24px', lineHeight: 1 }}>{p.emoji}</span>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{p.label}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{p.desc}</div>
                                    </div>
                                </div>
                            </AnimatedContent>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open roles */}
            <section style={{ padding: 'var(--space-10) 0 var(--space-16)' }}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: '12px' }}>
                        <h2 className="display-md">Open roles</h2>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {TEAMS.map(t => (
                                <button key={t} onClick={() => setFilter(t)} style={{
                                    padding: '7px 16px', borderRadius: '999px',
                                    border: '1px solid var(--border)',
                                    background: filter === t ? 'var(--accent)' : 'transparent',
                                    color: filter === t ? 'var(--bg)' : 'var(--text-secondary)',
                                    fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}>{t}</button>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {visible.map((job, i) => (
                            <AnimatedContent key={i} delay={i * 40} direction="up">
                                <div style={{
                                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                                    borderRadius: '14px', padding: '20px 24px',
                                    display: 'flex', alignItems: 'center', gap: '20px',
                                    transition: 'border-color 0.2s, box-shadow 0.2s', cursor: 'pointer',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-md)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)' }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
                                >
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap' }}>
                                            <span style={{
                                                fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em',
                                                textTransform: 'uppercase', color: 'var(--accent)',
                                                background: 'var(--accent-dim)', padding: '2px 8px', borderRadius: '4px',
                                            }}>{job.team}</span>
                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <MapPin size={10} />{job.location}
                                            </span>
                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{job.type}</span>
                                        </div>
                                        <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>{job.title}</div>
                                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{job.desc}</div>
                                    </div>
                                    <ArrowRight size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                                </div>
                            </AnimatedContent>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
