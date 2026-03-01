import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function NotFound() {
    const navigate = useNavigate();
    const [count, setCount] = useState(10);

    useEffect(() => {
        if (count <= 0) { navigate('/'); return; }
        const t = setTimeout(() => setCount(c => c - 1), 1000);
        return () => clearTimeout(t);
    }, [count, navigate]);

    return (
        <main style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center',
            justifyContent: 'center', padding: '32px', textAlign: 'center',
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Glow */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                width: '500px', height: '300px',
                background: 'radial-gradient(ellipse, rgba(247,255,158,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '520px' }}>
                <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(120px, 20vw, 200px)',
                    fontWeight: 900,
                    letterSpacing: '-0.05em',
                    lineHeight: 0.85,
                    color: '#fff',
                    opacity: 0.08,
                    userSelect: 'none',
                    marginBottom: '0',
                }}>
                    404
                </div>
                <div style={{ marginTop: '-40px', position: 'relative', zIndex: 1 }}>
                    <p className="eyebrow" style={{ marginBottom: '20px', color: 'var(--lime)' }}>Page not found</p>
                    <h1 className="display-lg" style={{ marginBottom: '20px' }}>This page escaped gravity</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6, marginBottom: '40px' }}>
                        The page you're looking for doesn't exist or has been moved. Heading back home in <strong style={{ color: '#fff' }}>{count}s</strong>.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button onClick={() => navigate(-1)} className="btn-secondary" style={{ fontSize: '14px', padding: '13px 24px' }}>← Go back</button>
                        <button onClick={() => navigate('/')} className="btn-primary" style={{ fontSize: '14px', padding: '13px 24px' }}>Take me home</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
