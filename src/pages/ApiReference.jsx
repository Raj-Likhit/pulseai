import React, { useState } from 'react'
import AnimatedContent from '../components/animations/AnimatedContent'
import { ChevronDown, Copy } from 'lucide-react'

const ENDPOINTS = [
    {
        section: 'Chat Completions',
        routes: [
            {
                method: 'POST', path: '/v1/chat/completions', summary: 'Create a chat completion',
                desc: 'Send a list of messages to any supported model and receive a completion. Supports streaming, tool calls, vision, and JSON mode.',
                params: [
                    { name: 'model', type: 'string', req: true, desc: 'Model ID (e.g. "gpt-4o", "claude-3-5-sonnet", or "auto" for smart routing)' },
                    { name: 'messages', type: 'array', req: true, desc: 'Array of message objects with role and content fields' },
                    { name: 'stream', type: 'boolean', req: false, desc: 'If true, returns a stream of server-sent events' },
                    { name: 'temperature', type: 'number', req: false, desc: '0–2. Higher values make output more random. Default: 1' },
                    { name: 'max_tokens', type: 'integer', req: false, desc: 'Maximum number of tokens to generate' },
                    { name: 'routing', type: 'object', req: false, desc: 'Pulse routing override: { prefer: "cost" | "speed" | "quality" }' },
                ],
                example: `curl https://api.pulse.ai/v1/chat/completions \\
  -H "Authorization: Bearer $PULSE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "auto",
    "messages": [{"role": "user", "content": "Hello!"}],
    "routing": {"prefer": "cost"}
  }'`,
            },
        ],
    },
    {
        section: 'Models',
        routes: [
            {
                method: 'GET', path: '/v1/models', summary: 'List available models',
                desc: 'Returns a list of all models accessible via your API key, including context windows, pricing, and capability flags.',
                params: [
                    { name: 'provider', type: 'string', req: false, desc: 'Filter by provider: "openai", "anthropic", "google", etc.' },
                    { name: 'capability', type: 'string', req: false, desc: 'Filter by capability: "vision", "tool_calls", "json_mode"' },
                ],
                example: `curl https://api.pulse.ai/v1/models \\
  -H "Authorization: Bearer $PULSE_API_KEY"`,
            },
        ],
    },
]

const METHOD_COLORS = {
    GET: { bg: '#16a34a22', color: '#4ade80', border: '#16a34a40' },
    POST: { bg: 'var(--accent-dim)', color: 'var(--accent)', border: 'var(--border-md)' },
}

export default function ApiReference() {
    const [open, setOpen] = useState({ '0-0': true })
    const [copied, setCopied] = useState(null)

    const toggle = key => setOpen(o => ({ ...o, [key]: !o[key] }))
    const copy = (key, text) => {
        navigator.clipboard.writeText(text).catch(() => { })
        setCopied(key)
        setTimeout(() => setCopied(null), 1800)
    }

    return (
        <main style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
            <section style={{ padding: 'var(--space-12) 0 var(--space-8)', borderBottom: '1px solid var(--border)' }}>
                <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
                    <AnimatedContent direction="up">
                        <span className="eyebrow" style={{ display: 'block', marginBottom: '12px' }}>API Reference</span>
                        <h1 className="display-xl"><span className="text-gradient">REST API</span> Reference</h1>
                        <p style={{ marginTop: '16px', fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: '560px' }}>
                            Base URL: <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '6px', padding: '2px 8px', fontSize: '13px', color: 'var(--accent)' }}>https://api.pulse.ai</code>.
                            Authenticate with <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '6px', padding: '2px 8px', fontSize: '13px', color: 'var(--accent)' }}>Authorization: Bearer YOUR_API_KEY</code>.
                        </p>
                    </AnimatedContent>
                </div>
            </section>

            <section style={{ padding: 'var(--space-8) 0 var(--space-16)' }}>
                <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
                    {ENDPOINTS.map((section, si) => (
                        <div key={si} style={{ marginBottom: 'var(--space-10)' }}>
                            <h2 style={{
                                fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                                color: 'var(--accent)', marginBottom: '16px', paddingBottom: '10px',
                                borderBottom: '1px solid var(--border)',
                            }}>{section.section}</h2>
                            {section.routes.map((route, ri) => {
                                const key = `${si}-${ri}`
                                const isOpen = !!open[key]
                                const mc = METHOD_COLORS[route.method] || METHOD_COLORS.POST
                                return (
                                    <AnimatedContent key={key} delay={ri * 40} direction="up">
                                        <div style={{ border: '1px solid var(--border)', borderRadius: '14px', marginBottom: '12px', overflow: 'hidden' }}>
                                            {/* Route header */}
                                            <button onClick={() => toggle(key)} style={{
                                                display: 'flex', alignItems: 'center', gap: '14px', width: '100%',
                                                padding: '16px 20px', background: isOpen ? 'var(--bg-surface)' : 'var(--bg-card)',
                                                border: 'none', cursor: 'pointer', textAlign: 'left',
                                                transition: 'background 0.15s',
                                            }}>
                                                <span style={{
                                                    padding: '3px 10px', borderRadius: '6px', fontSize: '11px',
                                                    fontWeight: 700, letterSpacing: '0.06em', fontFamily: 'var(--font-mono)',
                                                    background: mc.bg, color: mc.color, border: `1px solid ${mc.border}`, flexShrink: 0,
                                                }}>{route.method}</span>
                                                <code style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-primary)', flex: 1 }}>{route.path}</code>
                                                <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginRight: '8px' }}>{route.summary}</span>
                                                <ChevronDown size={15} style={{ color: 'var(--text-muted)', transition: 'transform 0.25s', transform: isOpen ? 'rotate(180deg)' : 'none', flexShrink: 0 }} />
                                            </button>

                                            {/* Expanded body */}
                                            {isOpen && (
                                                <div style={{ padding: '0 20px 20px', background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}>
                                                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, padding: '16px 0 12px' }}>{route.desc}</p>

                                                    {/* Parameters */}
                                                    <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>Parameters</h4>
                                                    <div style={{ border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
                                                        {route.params.map((p, pi) => (
                                                            <div key={pi} style={{
                                                                display: 'grid', gridTemplateColumns: '140px 80px 60px 1fr',
                                                                gap: '12px', padding: '10px 14px', fontSize: '13px',
                                                                background: pi % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-surface)',
                                                                borderBottom: pi < route.params.length - 1 ? '1px solid var(--border)' : 'none',
                                                                alignItems: 'center',
                                                            }}>
                                                                <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: '12px' }}>{p.name}</code>
                                                                <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{p.type}</span>
                                                                <span style={{ fontSize: '10px', fontWeight: 700, color: p.req ? 'var(--accent2)' : 'var(--text-muted)' }}>{p.req ? 'required' : 'optional'}</span>
                                                                <span style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: 1.5 }}>{p.desc}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Example */}
                                                    <div style={{ position: 'relative' }}>
                                                        <div style={{
                                                            background: 'var(--bg-surface)', border: '1px solid var(--border)',
                                                            borderRadius: '10px', padding: '16px',
                                                            fontFamily: 'var(--font-mono)', fontSize: '12px',
                                                            color: 'var(--text-secondary)', lineHeight: 1.7,
                                                            whiteSpace: 'pre', overflowX: 'auto',
                                                        }}>{route.example}</div>
                                                        <button onClick={() => copy(key, route.example)} style={{
                                                            position: 'absolute', top: '10px', right: '10px',
                                                            background: 'var(--bg-card)', border: '1px solid var(--border)',
                                                            borderRadius: '6px', padding: '5px 10px',
                                                            color: copied === key ? 'var(--accent)' : 'var(--text-muted)',
                                                            fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                                                            transition: 'color 0.2s',
                                                        }}>
                                                            <Copy size={11} /> {copied === key ? 'Copied!' : 'Copy'}
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </AnimatedContent>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}
