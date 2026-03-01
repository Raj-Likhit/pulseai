import React from 'react'
import { useParams, Link } from 'react-router-dom'
import AnimatedContent from '../components/animations/AnimatedContent'
import { ArrowLeft, BookOpen, Terminal, ChevronRight } from 'lucide-react'

export default function DocArticle() {
    const { slug } = useParams()
    const title = slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Quickstart: Your first API call'

    return (
        <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', display: 'flex' }}>
            {/* Sidebar */}
            <aside style={{ width: '280px', borderRight: '1px solid var(--border)', height: 'calc(100vh - var(--nav-h))', position: 'sticky', top: 'var(--nav-h)', overflowY: 'auto', padding: '32px 24px', display: 'none' }} className="docs-sidebar">
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>Getting Started</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
                    <div style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600, background: 'var(--accent-dim)', padding: '6px 10px', borderRadius: '6px' }}>Quickstart</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', padding: '6px 10px' }}>Installation</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', padding: '6px 10px' }}>Authentication</div>
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>Workflows</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', padding: '6px 10px' }}>Builder Overview</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', padding: '6px 10px' }}>Prompt Chaining</div>
                </div>
            </aside>
            <style>{`@media (min-width: 1024px) { .docs-sidebar { display: block !important; } }`}</style>

            <article style={{ flex: 1, padding: 'var(--space-8) var(--space-4) var(--space-20)', maxWidth: '800px', margin: '0 auto' }}>
                <AnimatedContent direction="up">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>
                        <Link to="/docs" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Documentation</Link>
                        <ChevronRight size={12} />
                        <span>Getting Started</span>
                        <ChevronRight size={12} />
                        <span style={{ color: 'var(--accent)' }}>{title}</span>
                    </div>

                    <h1 className="display-lg" style={{ marginBottom: '16px' }}>{title}</h1>
                    <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-8)' }}>
                        Make your first successful completion request in under 5 minutes. We'll set up your API key, make a basic request, and explore streaming responses.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', color: 'var(--text-primary)', lineHeight: 1.7 }}>
                        <div>
                            <h2 style={{ fontSize: '20px', fontWeight: 700, borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '16px' }}>1. Get an API Key</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>First, you'll need a Pulse API Key. Head over to the <Link to="/signup" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Developer Dashboard</Link> to generate one. You get $10 in free credits to start.</p>
                        </div>

                        <div>
                            <h2 style={{ fontSize: '20px', fontWeight: 700, borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '16px' }}>2. Install the SDK</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>While you can use raw HTTP requests, our official Node.js SDK makes type inference and retries easy.</p>
                            <div style={{ background: '#050B14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
                                <div style={{ background: '#0A1220', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <Terminal size={14} style={{ color: '#fff' }} />
                                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)' }}>Terminal</span>
                                </div>
                                <div style={{ padding: '16px', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                                    npm install @pulse-ai/sdk
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 style={{ fontSize: '20px', fontWeight: 700, borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '16px' }}>3. Make a completion request</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Initialize the client and send a message. Smart-routing defaults to the fastest model under $1/1M tokens if you pass "auto".</p>
                            <div style={{ background: '#050B14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
                                <div style={{ background: '#0A1220', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <Terminal size={14} style={{ color: '#fff' }} />
                                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)' }}>index.ts</span>
                                </div>
                                <pre style={{ padding: '16px', color: '#E8A020', fontFamily: 'var(--font-mono)', fontSize: '13px', margin: 0, overflowX: 'auto' }}>
                                    {`import Pulse from '@pulse-ai/sdk';

const pulse = new Pulse({ apiKey: process.env.PULSE_API_KEY });

async function main() {
  const response = await pulse.chat.completions.create({
    model: "auto",
    messages: [{ role: "user", content: "Tell me a joke about routing." }]
  });
  console.log(response.choices[0].message.content);
}

main();`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </AnimatedContent>
            </article>
        </main>
    )
}
