import React from 'react'
import { Link } from 'react-router-dom'
import AnimatedContent from '../components/animations/AnimatedContent'
import { ArrowRight } from 'lucide-react'

const POSTS = [
    {
        category: 'Engineering', date: 'Feb 24, 2026', readTime: '8 min',
        title: 'How we cut P99 latency by 40% with predictive model pre-warming',
        excerpt: "When thousands of requests hit simultaneously, cold model boots were our silent killer. Here's the pre-warming architecture we built to fix it.",
        accent: 'var(--accent)',
    },
    {
        category: 'Product', date: 'Feb 10, 2026', readTime: '5 min',
        title: 'Introducing Visual Workflow Builder: AI pipelines without the YAML',
        excerpt: 'Node-based pipelines for your AI workflows. Drag, connect, deploy. No infrastructure knowledge required.',
        accent: 'var(--accent2)',
    },
    {
        category: 'Case Study', date: 'Jan 30, 2026', readTime: '6 min',
        title: 'How Nexus shipped an AI feature in 3 hours that would have taken 3 weeks',
        excerpt: "Marcus Wright, Head of Engineering at Nexus, walks us through how Pulse's routing and workflow tools changed their entire dev loop.",
        accent: 'var(--accent)',
    },
    {
        category: 'Engineering', date: 'Jan 15, 2026', readTime: '12 min',
        title: "The economics of AI model routing: when to use GPT-4 vs. Claude vs. Mistral",
        excerpt: 'A data-driven breakdown of 2.1 billion requests across our platform — which models win on which task types and why.',
        accent: 'var(--accent)',
    },
    {
        category: 'Announcement', date: 'Jan 3, 2026', readTime: '3 min',
        title: 'Pulse achieves SOC 2 Type II certification',
        excerpt: 'Enterprise trust, validated. Our SOC 2 Type II audit covers security, availability, and confidentiality across all production systems.',
        accent: 'var(--accent2)',
    },
    {
        category: 'Product', date: 'Dec 18, 2025', readTime: '4 min',
        title: 'Prompt caching for Claude 3.5 Sonnet: up to 90% cost reduction on repeated prompts',
        excerpt: "If you're running the same system prompt across thousands of requests, you've been overpaying. Not anymore.",
        accent: 'var(--accent)',
    },
]

const CAT_COLORS = {
    Engineering: { bg: 'var(--accent-dim)', color: 'var(--accent)' },
    Product: { bg: 'var(--accent2-dim)', color: 'var(--accent2)' },
    'Case Study': { bg: 'var(--accent-dim)', color: 'var(--accent)' },
    Announcement: { bg: 'var(--bg-surface)', color: 'var(--text-secondary)' },
}

export default function Blog() {
    const featured = POSTS[0]
    const rest = POSTS.slice(1)

    return (
        <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
            {/* Header */}
            <section style={{ padding: 'var(--space-12) 0 var(--space-8)', borderBottom: '1px solid var(--border)' }}>
                <div className="container">
                    <AnimatedContent direction="up">
                        <span className="eyebrow" style={{ display: 'block', marginBottom: '12px' }}>Blog</span>
                        <h1 className="display-xl" style={{ maxWidth: '600px' }}>
                            Ideas, engineering,<br /><span className="text-gradient">and product thinking</span>
                        </h1>
                    </AnimatedContent>
                </div>
            </section>

            <section style={{ padding: 'var(--space-10) 0 var(--space-16)' }}>
                <div className="container">
                    {/* Featured post */}
                    <AnimatedContent direction="up">
                        <div style={{
                            display: 'grid', gridTemplateColumns: '1fr 1fr',
                            gap: 'var(--space-6)', marginBottom: 'var(--space-10)',
                            background: 'var(--bg-card)', border: '1px solid var(--border)',
                            borderRadius: '24px', overflow: 'hidden',
                        }}>
                            {/* Visual panel */}
                            <div style={{
                                background: 'linear-gradient(135deg, var(--accent-dim) 0%, var(--accent2-dim) 100%)',
                                minHeight: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                padding: '40px',
                            }}>
                                <div style={{ fontSize: '80px', opacity: 0.3, userSelect: 'none', lineHeight: 1 }}>⚡</div>
                            </div>
                            {/* Text */}
                            <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px' }}>
                                    <span style={{
                                        padding: '3px 10px', borderRadius: '999px', fontSize: '11px',
                                        fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                                        background: CAT_COLORS[featured.category].bg,
                                        color: CAT_COLORS[featured.category].color,
                                    }}>{featured.category}</span>
                                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{featured.date} · {featured.readTime} read</span>
                                </div>
                                <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35, marginBottom: '14px' }}>
                                    {featured.title}
                                </h2>
                                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '24px' }}>
                                    {featured.excerpt}
                                </p>
                                <a href="/blog/scaling-inference" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    fontSize: '13px', fontWeight: 600, color: 'var(--accent)',
                                    textDecoration: 'none',
                                }}>
                                    Read article <ArrowRight size={13} />
                                </a>
                            </div>
                        </div>
                    </AnimatedContent>

                    {/* Grid of remaining posts */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                        {rest.map((post, i) => (
                            <AnimatedContent key={i} delay={i * 60} direction="up">
                                <a href="/blog/pulse-ai-announcement" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                                    <div style={{
                                        background: 'var(--bg-card)', border: '1px solid var(--border)',
                                        borderRadius: '16px', padding: '24px', height: '100%',
                                        boxSizing: 'border-box', transition: 'border-color 0.2s, box-shadow 0.2s',
                                        display: 'flex', flexDirection: 'column', gap: '12px',
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-md)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)' }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
                                    >
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <span style={{
                                                padding: '2px 9px', borderRadius: '999px', fontSize: '10px',
                                                fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                                                background: CAT_COLORS[post.category].bg,
                                                color: CAT_COLORS[post.category].color,
                                            }}>{post.category}</span>
                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{post.readTime}</span>
                                        </div>
                                        <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4, flex: 1 }}>
                                            {post.title}
                                        </h3>
                                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{post.excerpt}</p>
                                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>{post.date}</span>
                                    </div>
                                </a>
                            </AnimatedContent>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
