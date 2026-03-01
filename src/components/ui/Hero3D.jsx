import { useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

/* ── Hero3D ──────────────────────────────────────────────────────
   3D rotating card with mouse-tracked LERP rotation.
   Colors adapt to current theme via CSS variables.
   ─────────────────────────────────────────────────────────────── */
export default function Hero3D() {
    const sceneRef = useRef(null);
    const rafRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const currentRef = useRef({ x: 0, y: 0 });
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    /* Colours per theme */
    const c = isDark ? {
        cardBg: 'rgba(22, 16, 9, 0.7)',
        cardBorder: 'rgba(244,166,35,0.2)',
        glow1: 'rgba(244,166,35,0.18)',
        glow2: 'rgba(255,99,72,0.12)',
        lineFill1: '#F4A623',
        lineFill2: '#FF6348',
        lineGrad1: 'line-grad-amber',
        lineGrad2: 'line-grad-coral',
        metricBar: 'rgba(11,9,6,0.8)',
        metricBorder: 'rgba(244,166,35,0.12)',
        hubBg: 'radial-gradient(circle at 35% 35%, rgba(244,166,35,0.9), rgba(255,99,72,0.7))',
        hubBorder: 'rgba(244,166,35,0.6)',
        hubShadow: '0 0 30px rgba(244,166,35,0.5), 0 0 60px rgba(244,166,35,0.2)',
        hubShadowPulse: '0 0 50px rgba(244,166,35,0.7), 0 0 100px rgba(244,166,35,0.35)',
        nodeBg: 'rgba(22,16,9,0.92)',
        depthBg: 'rgba(244,166,35,',
        depthBorder: 'rgba(244,166,35,',
        text: '#FAF3E0',
        metricLatency: '#F4A623',
        metricUptime: '#FF6348',
        metricReq: '#E8D5A3',
    } : {
        cardBg: 'rgba(242, 234, 216, 0.8)',
        cardBorder: 'rgba(10,22,40,0.18)',
        glow1: 'rgba(232,160,32,0.12)',
        glow2: 'rgba(10,22,40,0.05)',
        lineFill1: '#E8A020',
        lineFill2: '#D44B35',
        lineGrad1: 'line-grad-amber',
        lineGrad2: 'line-grad-coral',
        metricBar: 'rgba(237,227,205,0.9)',
        metricBorder: 'rgba(10,22,40,0.1)',
        hubBg: 'radial-gradient(circle at 35% 35%, #0A1628, #1E3A5F)',
        hubBorder: 'rgba(10,22,40,0.5)',
        hubShadow: '0 0 24px rgba(10,22,40,0.25)',
        hubShadowPulse: '0 0 32px rgba(10,22,40,0.35)',
        nodeBg: 'rgba(251,247,239,0.95)',
        depthBg: 'rgba(10,22,40,0.0',
        depthBorder: 'rgba(10,22,40,0.0',
        text: '#0A1628',
        metricLatency: '#E8A020',
        metricUptime: '#D44B35',
        metricReq: '#0A1628',
    };

    useEffect(() => {
        const onMove = e => {
            const { innerWidth: w, innerHeight: h } = window;
            mouseRef.current = {
                x: (e.clientX / w - 0.5) * 2,
                y: (e.clientY / h - 0.5) * 2,
            };
        };
        window.addEventListener('mousemove', onMove);

        const lerp = (a, b, t) => a + (b - a) * t;
        const animate = () => {
            currentRef.current.x = lerp(currentRef.current.x, mouseRef.current.x, 0.05);
            currentRef.current.y = lerp(currentRef.current.y, mouseRef.current.y, 0.05);
            if (sceneRef.current) {
                const rotY = currentRef.current.x * 14;
                const rotX = -currentRef.current.y * 10;
                sceneRef.current.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            }
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);
        return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafRef.current); };
    }, []);

    const nodes = [
        { id: 'n1', x: '18%', y: '22%', label: 'GPT-4o', color: c.lineFill1, delay: 0 },
        { id: 'n2', x: '72%', y: '15%', label: 'Claude 3.5', color: c.lineFill2, delay: 0.3 },
        { id: 'n3', x: '80%', y: '68%', label: 'LLaMA 3', color: c.metricUptime, delay: 0.6 },
        { id: 'n4', x: '12%', y: '70%', label: 'Gemini', color: c.metricLatency, delay: 0.9 },
        { id: 'n5', x: '48%', y: '85%', label: 'Mistral', color: c.metricReq, delay: 1.2 },
        { id: 'central', x: '50%', y: '48%', label: 'PULSE', isCenter: true },
    ];

    const getPos = id => { const n = nodes.find(n => n.id === id); return n ? { x: parseFloat(n.x), y: parseFloat(n.y) } : { x: 50, y: 50 }; };
    const connections = [['n1', 'central'], ['n2', 'central'], ['n3', 'central'], ['n4', 'central'], ['n5', 'central']];

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
                ref={sceneRef}
                style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d', willChange: 'transform', transition: 'transform 0.05s linear' }}
            >
                {/* Main card face */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: c.cardBg,
                    border: `1px solid ${c.cardBorder}`,
                    borderRadius: '24px',
                    backdropFilter: 'blur(20px)',
                    overflow: 'hidden',
                }}>
                    {/* Ambient glows */}
                    <div style={{ position: 'absolute', top: '-20%', left: '20%', width: '60%', height: '60%', borderRadius: '50%', background: `radial-gradient(circle, ${c.glow1} 0%, transparent 70%)`, filter: 'blur(40px)' }} />
                    <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '50%', height: '50%', borderRadius: '50%', background: `radial-gradient(circle, ${c.glow2} 0%, transparent 70%)`, filter: 'blur(40px)' }} />

                    {/* SVG connections */}
                    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                        <defs>
                            <linearGradient id={c.lineGrad1} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={c.lineFill1} stopOpacity="0" />
                                <stop offset="50%" stopColor={c.lineFill1} stopOpacity="0.5" />
                                <stop offset="100%" stopColor={c.lineFill1} stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id={c.lineGrad2} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={c.lineFill2} stopOpacity="0" />
                                <stop offset="50%" stopColor={c.lineFill2} stopOpacity="0.4" />
                                <stop offset="100%" stopColor={c.lineFill2} stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {connections.map(([from, to], i) => {
                            const a = getPos(from), b = getPos(to);
                            return (
                                <line key={i}
                                    x1={`${a.x}%`} y1={`${a.y}%`} x2={`${b.x}%`} y2={`${b.y}%`}
                                    stroke={`url(#${i < 2 ? c.lineGrad1 : c.lineGrad2})`}
                                    strokeWidth="1.5" strokeDasharray="6 4"
                                    style={{ animation: `dashMove ${2 + i * 0.4}s linear infinite`, opacity: 0.8 }}
                                />
                            );
                        })}
                    </svg>

                    {/* Nodes */}
                    {nodes.map(node => (
                        <div key={node.id} style={{
                            position: 'absolute', left: node.x, top: node.y,
                            transform: 'translate(-50%, -50%)',
                            animation: node.isCenter ? 'none' : `floatNode ${3 + parseFloat(node.delay)}s ease-in-out ${node.delay}s infinite alternate`,
                            zIndex: node.isCenter ? 3 : 2,
                        }}>
                            {node.isCenter ? (
                                <div style={{
                                    width: 72, height: 72, borderRadius: '50%',
                                    background: c.hubBg, border: `2px solid ${c.hubBorder}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: c.hubShadow, animation: 'pulseCenter 2s ease-in-out infinite',
                                    flexDirection: 'column', gap: '3px',
                                }}>
                                    <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em', color: isDark ? '#0B0906' : '#FAF3E0', fontFamily: 'var(--font-display)' }}>PULSE</span>
                                    <div style={{ display: 'flex', gap: '3px' }}>
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: isDark ? 'rgba(11,9,6,0.5)' : 'rgba(250,243,224,0.5)', animation: `barPulse 1s ${i * 0.2}s ease-in-out infinite alternate` }} />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div style={{
                                    background: c.nodeBg, border: `1px solid ${node.color}35`,
                                    borderRadius: '12px', padding: '8px 12px',
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: `0 4px 20px ${node.color}18, 0 0 0 1px ${node.color}12`,
                                }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: node.color, boxShadow: `0 0 8px ${node.color}`, animation: 'pulseDot 2s ease-in-out infinite' }} />
                                    <span style={{ fontSize: '11px', fontWeight: 700, color: c.text, whiteSpace: 'nowrap', letterSpacing: '0.02em' }}>{node.label}</span>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Metrics bar */}
                    <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        padding: '12px 20px',
                        background: c.metricBar, backdropFilter: 'blur(10px)',
                        borderTop: `1px solid ${c.metricBorder}`,
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                        {[
                            { label: 'Latency', value: '< 120ms', color: c.metricLatency },
                            { label: 'Uptime', value: '99.97%', color: c.metricUptime },
                            { label: 'Requests', value: '2.1M/hr', color: c.metricReq },
                        ].map(m => (
                            <div key={m.label} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '10px', color: isDark ? 'rgba(250,243,224,0.4)' : 'rgba(10,22,40,0.4)', letterSpacing: '0.06em', marginBottom: '2px', textTransform: 'uppercase' }}>{m.label}</div>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: m.color, fontFamily: 'var(--font-mono)' }}>{m.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Depth layers */}
                {[...Array(6)].map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute', inset: 0, borderRadius: '24px',
                        background: `${c.depthBg}${0.015 - i * 0.002})`,
                        border: `1px solid ${c.depthBorder}${0.08 - i * 0.01})`,
                        transform: `translateZ(${-(i + 1) * 6}px)`,
                    }} />
                ))}
            </div>

            <style>{`
        @keyframes floatNode {
          from { transform: translate(-50%, -50%) translateY(0px); }
          to   { transform: translate(-50%, -50%) translateY(-12px); }
        }
        @keyframes dashMove {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -20; }
        }
        @keyframes pulseCenter {
          0%, 100% { box-shadow: ${c.hubShadow}; }
          50%       { box-shadow: ${c.hubShadowPulse}; }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        @keyframes barPulse {
          from { transform: scaleY(0.5); opacity: 0.5; }
          to   { transform: scaleY(1.5); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
        </div>
    );
}
