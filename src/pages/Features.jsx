import { Link } from 'react-router-dom';
import AnimatedContent from '../components/animations/AnimatedContent';
import StarBorder from '../components/ui/StarBorder';

const FEATURES = [
    {
        id: '01',
        title: 'Smart Orchestration',
        subtitle: 'Route every task to the right model, automatically.',
        desc: 'Pulse\'s orchestration layer learns from your workflows. It monitors latency, cost, and quality — and routes each task to the optimal model without any manual intervention.',
        benefits: ['Automatic model selection', 'Latency & cost monitoring', 'Fallback routing', 'A/B model testing'],
        accent: 'var(--lime)',
    },
    {
        id: '02',
        title: 'Node-Based Canvas',
        subtitle: 'Visual logic that your whole team understands.',
        desc: 'Build complex AI workflows by connecting nodes on a canvas. No code required. Each node is a step: a prompt, a model call, a tool, a branch condition. Chain them infinitely.',
        benefits: ['Drag-and-drop builder', 'Conditional branching', 'Infinite nesting', 'Version history'],
        accent: 'var(--accent)',
    },
    {
        id: '03',
        title: 'Predictive Context',
        subtitle: 'AI memory that spans your entire workspace.',
        desc: 'Pulse maintains a persistent knowledge graph of every workflow, output, and decision. Your AI never forgets project context — it builds on it.',
        benefits: ['Cross-session memory', 'Semantic search', 'Entity extraction', 'Linked contexts'],
        accent: 'var(--accent2)',
    },
    {
        id: '04',
        title: 'Team Collaboration',
        subtitle: 'Real-time multiplayer on every workflow.',
        desc: 'Multiple people can edit, run, and comment on the same workflow simultaneously. Live cursors, inline comments, and conflict-free syncing — like Figma, but for AI.',
        benefits: ['Live presence', 'Inline comments', 'Role-based access', 'Activity feed'],
        accent: 'var(--accent)',
    },
    {
        id: '05',
        title: 'Enterprise Security',
        subtitle: 'SOC 2 certified. Zero data training.',
        desc: 'Your data never trains our models. We never share it. Pulse is SOC 2 Type II certified with end-to-end encryption, SSO, SCIM, and a full audit log.',
        benefits: ['SOC 2 Type II', 'SSO & SCIM', 'Audit logs', 'Custom data residency'],
        accent: 'var(--lime)',
    },
    {
        id: '06',
        title: 'Analytics & Insights',
        subtitle: 'Full observability into every AI interaction.',
        desc: 'Real-time dashboards track token usage, latency by node, cost per run, and team output metrics. Spot bottlenecks and optimise in seconds.',
        benefits: ['Token usage tracking', 'Cost attribution', 'Latency heatmaps', 'Export to Datadog / Grafana'],
        accent: 'var(--accent2)',
    },
];

export default function Features() {
    return (
        <main style={{ paddingTop: 'var(--nav-h)' }}>

            {/* Hero */}
            <section style={{ padding: 'var(--space-16) 32px var(--space-12)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                {/* Hero background glow */}
                <div style={{
                    position: 'absolute', top: '-10%', right: '-5%',
                    width: '60vw', height: '60vw',
                    background: 'radial-gradient(circle, rgba(244, 166, 35, 0.08) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                    pointerEvents: 'none',
                }} />
                {/* Animated grid */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                    maskImage: 'radial-gradient(ellipse 60% 60% at 80% 20%, black 20%, transparent 100%)',
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-12)', alignItems: 'center' }}>
                        <AnimatedContent direction="left">
                            <div style={{ marginBottom: '24px', display: 'inline-block' }}>
                                <StarBorder as="div" color="var(--accent)" speed="4s">
                                    <span style={{ padding: '6px 14px', display: 'inline-block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase' }}>PRODUCT</span>
                                </StarBorder>
                            </div>
                            <h1 className="display-hero" style={{ maxWidth: '800px', marginBottom: '32px' }}>
                                Every feature<br />
                                <span style={{ color: 'var(--lime)' }}>built to ship</span>
                            </h1>
                            <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.55 }}>
                                Six core capabilities that multiply your team's output — without multiplying complexity.
                            </p>
                        </AnimatedContent>

                        <AnimatedContent direction="right" delay={200}>
                            <div style={{
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                {/* Edge feathered mask + screen blend mode guarantees black backgrounds become completely transparent */}
                                <img
                                    src="/features-hero.png"
                                    alt="Pulse AI Orchestration Features"
                                    style={{
                                        width: '120%',
                                        height: 'auto',
                                        display: 'block',
                                        mixBlendMode: 'screen',
                                        maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
                                        WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)'
                                    }}
                                />
                            </div>
                        </AnimatedContent>
                    </div>
                </div>
            </section>


            {/* Feature deep-dives */}
            {
                FEATURES.map((f, i) => (
                    <section
                        key={f.id}
                        style={{
                            padding: '100px 32px',
                            background: i % 2 === 1 ? 'var(--bg-surface)' : 'var(--bg)',
                            borderBottom: '1px solid var(--border)',
                        }}
                    >
                        <div className="container" style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '80px',
                            alignItems: 'center',
                        }}>
                            {/* Text side */}
                            <AnimatedContent delay={0}>
                                <div>
                                    <span style={{
                                        fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 700,
                                        color: f.accent, letterSpacing: '0.1em',
                                    }}>{f.id}</span>
                                    <h2 className="display-lg" style={{ marginTop: '16px', marginBottom: '16px' }}>{f.title}</h2>
                                    <p style={{ fontSize: '17px', color: f.accent, fontWeight: 500, marginBottom: '20px' }}>{f.subtitle}</p>
                                    <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '32px' }}>{f.desc}</p>

                                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {f.benefits.map(b => (
                                            <li key={b} style={{
                                                display: 'flex', alignItems: 'center', gap: '12px',
                                                fontSize: '14px', color: 'var(--text-secondary)',
                                            }}>
                                                <span style={{ color: f.accent, fontWeight: 700 }}>—</span>
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </AnimatedContent>

                            {/* Visual side */}
                            <AnimatedContent delay={100}>
                                <div style={{
                                    background: 'var(--bg)', border: '1px solid var(--border)',
                                    borderRadius: '20px', padding: '40px',
                                    aspectRatio: '4/3', display: 'flex', flexDirection: 'column',
                                    gap: '16px', justifyContent: 'center', alignItems: 'center',
                                    position: 'relative', overflow: 'hidden',
                                }}>
                                    {/* Glow */}
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: `radial-gradient(ellipse at 50% 50%, ${f.accent}12 0%, transparent 70%)`,
                                        pointerEvents: 'none',
                                    }} />

                                    {/* Feature number big */}
                                    <span style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '120px', fontWeight: 900,
                                        color: `${f.accent}18`, lineHeight: 1,
                                        position: 'absolute', bottom: '-10px', right: '20px',
                                        userSelect: 'none', pointerEvents: 'none',
                                    }}>{f.id}</span>

                                    {/* Mock node boxes */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '280px', position: 'relative', zIndex: 1 }}>
                                        {f.benefits.map((b, bi) => (
                                            <div key={b} style={{
                                                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                                borderRadius: '10px', padding: '12px 16px',
                                                display: 'flex', alignItems: 'center', gap: '10px',
                                                transition: 'border-color 200ms ease',
                                            }}>
                                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: f.accent, flexShrink: 0 }} />
                                                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>{b}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </AnimatedContent>

                        </div>
                        <style>{`@media (max-width: 768px) { .feature-grid { grid-template-columns: 1fr !important; } }`}</style>
                    </section>
                ))
            }

            {/* CTA */}
            <section style={{ padding: '128px 32px', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '640px' }}>
                    <AnimatedContent>
                        <h2 className="display-xl" style={{ marginBottom: '24px' }}>Ready to try it?</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '17px', marginBottom: '40px' }}>All features available free for 14 days. No credit card required.</p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/signup" className="btn-primary" style={{ fontSize: '15px', padding: '15px 32px' }}>Start free trial</Link>
                            <Link to="/pricing" className="btn-secondary" style={{ fontSize: '15px', padding: '15px 32px' }}>See pricing</Link>
                        </div>
                    </AnimatedContent>
                </div>
            </section>

        </main >
    );
}
