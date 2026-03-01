import React from 'react'
import { useParams, Link } from 'react-router-dom'
import AnimatedContent from '../components/animations/AnimatedContent'
import { ArrowLeft, Clock, Share2 } from 'lucide-react'

export default function BlogPost() {
    const { slug } = useParams()

    // We parse the slug to make a readable title
    const title = slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'How we cut P99 latency by 40% with predictive model pre-warming'

    return (
        <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', paddingBottom: 'var(--space-20)' }}>
            <article>
                <header style={{ padding: 'var(--space-12) 0 var(--space-8)', borderBottom: '1px solid var(--border)' }}>
                    <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <AnimatedContent direction="up">
                            <Link to="/blog" style={{
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none',
                                marginBottom: 'var(--space-6)', transition: 'color 0.2s'
                            }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                                <ArrowLeft size={14} /> Back to Blog
                            </Link>

                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px' }}>
                                <span style={{
                                    padding: '3px 10px', borderRadius: '999px', fontSize: '11px',
                                    fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                                    background: 'var(--accent-dim)', color: 'var(--accent)',
                                }}>Engineering</span>
                                <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={13} /> 8 min read</span>
                            </div>

                            <h1 className="display-lg" style={{ marginBottom: '24px', lineHeight: 1.1 }}>
                                {title}
                            </h1>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }} />
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>Sarah Chen</div>
                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>VP Platform Engineering · Feb 24, 2026</div>
                                    </div>
                                </div>
                                <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '8px', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px', transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent-dim)' }}
                                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
                                    <Share2 size={13} /> Share
                                </button>
                            </div>
                        </AnimatedContent>
                    </div>
                </header>

                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: 'var(--space-8)' }}>
                    <AnimatedContent direction="up" delay={100}>
                        <div style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <p style={{ fontSize: '20px', color: 'var(--text-primary)', lineHeight: 1.6 }}>When thousands of requests hit simultaneously, cold model boots were our silent killer. Here's the pre-warming architecture we built to fix it and save millions in compute waste.</p>

                            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '24px' }}>The Problem with Cold Boots</h2>
                            <p>Every major LLM provider charges for context size and generation length. But what they don't charge you for—and what actually ruins user experience—is the time to first token (TTFT). For complex models, a cold boot can add anywhere from 500ms to 2.5s of pure overhead before a single character is streamed.</p>

                            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', margin: '16px 0', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--accent)' }}>
                                {"// Typical latency profile without pre-warming\nconst ttft = (coldBootMs + networkLatencyMs + computeMs); // ~1800ms average"}
                            </div>

                            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '24px' }}>Predictive Pre-Warming</h2>
                            <p>To solve this, we implemented a predictive pre-warming layer across our Kubernetes clusters. By analyzing historical traffic patterns and leveraging a lightweight forecasting model, we now spin up idle model instances <em>just before</em> anticipated traffic spikes.</p>

                            <p>The results were immediate: a 40% reduction in P99 latency across all major LLM requests routing through Pulse. This isn't just about faster text generation; it's about making conversational AI feel indistinguishable from human typing speed.</p>

                            <div style={{ background: 'linear-gradient(135deg, var(--accent-dim), transparent)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid var(--accent)' }}>
                                <em style={{ fontSize: '18px', color: 'var(--text-primary)' }}>"We realized that fighting physics was a losing battle. The only way to beat cold boots was to never have them in the first place."</em>
                            </div>

                            <p>We're open-sourcing the core forecasting logic next week. Stay tuned on our GitHub repository for the release.</p>
                        </div>
                    </AnimatedContent>
                </div>
            </article>
        </main>
    )
}
