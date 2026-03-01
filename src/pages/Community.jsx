import React from 'react'
import AnimatedContent from '../components/animations/AnimatedContent'
import { MessageSquare, Github, Youtube, Twitter, ArrowRight } from 'lucide-react'

const CHANNELS = [
    {
        icon: <MessageSquare size={22} />, name: 'Discord', desc: 'Real-time chat with 12,000+ developers. Get help, share workflows, and see what people are building.',
        cta: 'Join Discord', members: '12,400', color: 'var(--accent)',
    },
    {
        icon: <Github size={22} />, name: 'GitHub', desc: 'Explore open-source examples, SDKs, and workflow templates. File issues and contribute to the ecosystem.',
        cta: 'View on GitHub', members: '3,800 stars', color: 'var(--accent)',
    },
    {
        icon: <Youtube size={22} />, name: 'YouTube', desc: 'Tutorials, product deep-dives, and developer interviews. New content every two weeks.',
        cta: 'Subscribe', members: '6,200 subs', color: 'var(--accent2)',
    },
    {
        icon: <Twitter size={22} />, name: '𝕏 / Twitter', desc: 'Follow for release announcements, tips, and conversations with the Pulse team.',
        cta: 'Follow @pulseai', members: '9,100', color: 'var(--accent)',
    },
]

const POSTS = [
    { author: 'Alex K.', time: '2 hours ago', title: 'Sharing my multi-model router: GPT-4o for complex tasks, Haiku for simple ones — 62% cost drop', replies: 18, votes: 94 },
    { author: 'Wei L.', time: '5 hours ago', title: 'Is there a way to pass custom metadata through to webhook events?', replies: 7, votes: 31 },
    { author: 'Fatima N.', time: 'Yesterday', title: 'Template: Full RAG pipeline with semantic cache — saves ~70% on repeated queries', replies: 24, votes: 187 },
    { author: 'James R.', time: '2 days ago', title: 'Tips for reducing streaming latency when falling back from Claude to Mistral?', replies: 12, votes: 55 },
]

export default function Community() {
    return (
        <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
            {/* Hero */}
            <section style={{
                padding: 'var(--space-16) 0 var(--space-10)',
                background: 'linear-gradient(180deg, var(--ambient-1) 0%, transparent 100%)',
                borderBottom: '1px solid var(--border)',
                textAlign: 'center',
            }}>
                <div className="container" style={{ maxWidth: '640px', margin: '0 auto' }}>
                    <AnimatedContent direction="up">
                        <span className="eyebrow" style={{ display: 'block', marginBottom: '14px' }}>Community</span>
                        <h1 className="display-xl">
                            Built together.<br /><span className="text-gradient">Better together.</span>
                        </h1>
                        <p style={{ marginTop: '16px', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                            Join thousands of developers building the next generation of AI products.
                            Share workflows, get help, and shape the future of Pulse.
                        </p>
                    </AnimatedContent>
                </div>
            </section>

            {/* Channels grid */}
            <section style={{ padding: 'var(--space-10) 0', borderBottom: '1px solid var(--border)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                        {CHANNELS.map((ch, i) => (
                            <AnimatedContent key={i} delay={i * 60} direction="up">
                                <div style={{
                                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                                    borderRadius: '18px', padding: '28px',
                                    display: 'flex', flexDirection: 'column', gap: '14px',
                                    transition: 'border-color 0.2s, box-shadow 0.2s',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-md)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)' }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <span style={{ color: ch.color }}>{ch.icon}</span>
                                        <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{ch.name}</span>
                                        <span style={{
                                            marginLeft: 'auto', fontSize: '11px', color: 'var(--text-muted)',
                                            background: 'var(--bg-surface)', border: '1px solid var(--border)',
                                            padding: '2px 10px', borderRadius: '999px',
                                        }}>{ch.members}</span>
                                    </div>
                                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>{ch.desc}</p>
                                    <a href="https://twitter.com/pulseai" target="_blank" rel="noopener noreferrer" style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                                        fontSize: '13px', fontWeight: 600, color: ch.color, textDecoration: 'none',
                                    }}>
                                        {ch.cta} <ArrowRight size={13} />
                                    </a>
                                </div>
                            </AnimatedContent>
                        ))}
                    </div>
                </div>
            </section>

            {/* Forum preview */}
            <section style={{ padding: 'var(--space-10) 0 var(--space-16)' }}>
                <div className="container" style={{ maxWidth: '760px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                        <h2 className="display-md">Community forum</h2>
                        <a href="/community/announcement" style={{ fontSize: '13px', color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            All posts <ArrowRight size={13} />
                        </a>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {POSTS.map((post, i) => (
                            <AnimatedContent key={i} delay={i * 40} direction="up">
                                <div style={{
                                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                                    borderRadius: '12px', padding: '16px 20px',
                                    display: 'flex', alignItems: 'center', gap: '16px',
                                    cursor: 'pointer', transition: 'border-color 0.2s',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-md)'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                                >
                                    {/* Vote */}
                                    <div style={{ textAlign: 'center', flexShrink: 0, width: '32px' }}>
                                        <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--accent)' }}>{post.votes}</div>
                                        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>votes</div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', lineHeight: 1.35 }}>{post.title}</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{post.author} · {post.time} · {post.replies} replies</div>
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
