import { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';

/* ── MagicBento ──────────────────────────────────────────────────
   GSAP-powered interactive bento grid with particles, spotlight,
   tilt, and click ripple effects. From ReactBits.
   Themed to: deep violet/purple (#0d0520) with violet glow.
   ─────────────────────────────────────────────────────────────── */

const DEFAULT_PARTICLE_COUNT = 10;
const DEFAULT_SPOTLIGHT_RADIUS = 350;
const DEFAULT_GLOW_COLOR = '139, 92, 246'; // violet RGB
const MOBILE_BREAKPOINT = 768;

const createParticle = (x, y, color = DEFAULT_GLOW_COLOR) => {
    const el = document.createElement('div');
    el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 8px rgba(${color}, 0.7);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
    return el;
};

const ParticleCard = ({
    children, className = '', style, disableAnimations = false,
    particleCount = DEFAULT_PARTICLE_COUNT, glowColor = DEFAULT_GLOW_COLOR,
    enableTilt = true, clickEffect = true, enableMagnetism = false,
}) => {
    const cardRef = useRef(null);
    const particlesRef = useRef([]);
    const timeoutsRef = useRef([]);
    const isHoveredRef = useRef(false);
    const memoizedParticles = useRef([]);
    const particlesInitialized = useRef(false);

    const initParticles = useCallback(() => {
        if (particlesInitialized.current || !cardRef.current) return;
        const { width, height } = cardRef.current.getBoundingClientRect();
        memoizedParticles.current = Array.from({ length: particleCount }, () =>
            createParticle(Math.random() * width, Math.random() * height, glowColor)
        );
        particlesInitialized.current = true;
    }, [particleCount, glowColor]);

    const clearParticles = useCallback(() => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
        particlesRef.current.forEach(p => {
            gsap.to(p, { scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.7)', onComplete: () => p.parentNode?.removeChild(p) });
        });
        particlesRef.current = [];
    }, []);

    const animateParticles = useCallback(() => {
        if (!cardRef.current || !isHoveredRef.current) return;
        if (!particlesInitialized.current) initParticles();

        memoizedParticles.current.forEach((particle, i) => {
            const id = setTimeout(() => {
                if (!isHoveredRef.current || !cardRef.current) return;
                const clone = particle.cloneNode(true);
                cardRef.current.appendChild(clone);
                particlesRef.current.push(clone);
                gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
                gsap.to(clone, { x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 80, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true });
                gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
            }, i * 80);
            timeoutsRef.current.push(id);
        });
    }, [initParticles]);

    useEffect(() => {
        if (disableAnimations || !cardRef.current) return;
        const el = cardRef.current;

        const onEnter = () => {
            isHoveredRef.current = true;
            animateParticles();
            if (enableTilt) gsap.to(el, { rotateX: 4, rotateY: 4, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 });
        };

        const onLeave = () => {
            isHoveredRef.current = false;
            clearParticles();
            if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.4, ease: 'power2.out' });
            if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
        };

        const onMove = e => {
            if (!enableTilt && !enableMagnetism) return;
            const rect = el.getBoundingClientRect();
            const cx = rect.width / 2, cy = rect.height / 2;
            const x = e.clientX - rect.left, y = e.clientY - rect.top;
            if (enableTilt) gsap.to(el, { rotateX: ((y - cy) / cy) * -8, rotateY: ((x - cx) / cx) * 8, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 });
            if (enableMagnetism) gsap.to(el, { x: (x - cx) * 0.04, y: (y - cy) * 0.04, duration: 0.3, ease: 'power2.out' });
        };

        const onClick = e => {
            if (!clickEffect) return;
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left, y = e.clientY - rect.top;
            const dist = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height));
            const ripple = document.createElement('div');
            ripple.style.cssText = `position:absolute;width:${dist * 2}px;height:${dist * 2}px;border-radius:50%;background:radial-gradient(circle,rgba(${glowColor},0.4) 0%,rgba(${glowColor},0.1) 40%,transparent 70%);left:${x - dist}px;top:${y - dist}px;pointer-events:none;z-index:1000;`;
            el.appendChild(ripple);
            gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() });
        };

        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
        el.addEventListener('mousemove', onMove);
        el.addEventListener('click', onClick);
        return () => {
            isHoveredRef.current = false;
            el.removeEventListener('mouseenter', onEnter);
            el.removeEventListener('mouseleave', onLeave);
            el.removeEventListener('mousemove', onMove);
            el.removeEventListener('click', onClick);
            clearParticles();
        };
    }, [animateParticles, clearParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

    return (
        <div ref={cardRef} className={className} style={{ ...style, position: 'relative', overflow: 'hidden' }}>
            {children}
        </div>
    );
};

const GlobalSpotlight = ({ gridRef, disableAnimations, enabled, spotlightRadius, glowColor }) => {
    const spotlightRef = useRef(null);

    useEffect(() => {
        if (disableAnimations || !gridRef?.current || !enabled) return;
        const spotlight = document.createElement('div');
        spotlight.style.cssText = `
      position: fixed; width: 700px; height: 700px; border-radius: 50%;
      pointer-events: none; z-index: 200; opacity: 0;
      background: radial-gradient(circle, rgba(${glowColor},0.12) 0%, rgba(${glowColor},0.06) 20%, rgba(${glowColor},0.02) 40%, transparent 65%);
      transform: translate(-50%,-50%); mix-blend-mode: screen;
    `;
        document.body.appendChild(spotlight);
        spotlightRef.current = spotlight;

        const { proximity, fadeDistance } = { proximity: spotlightRadius * 0.5, fadeDistance: spotlightRadius * 0.75 };

        const onMove = e => {
            if (!spotlightRef.current || !gridRef.current) return;
            const section = gridRef.current.closest('[data-bento-section]');
            const rect = section?.getBoundingClientRect();
            const inside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

            if (!inside) { gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 }); return; }

            let minDist = Infinity;
            gridRef.current.querySelectorAll('[data-bento-card]').forEach(card => {
                const cr = card.getBoundingClientRect();
                const cx = cr.left + cr.width / 2, cy = cr.top + cr.height / 2;
                const d = Math.max(0, Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(cr.width, cr.height) / 2);
                minDist = Math.min(minDist, d);
                const glow = d <= proximity ? 1 : d <= fadeDistance ? (fadeDistance - d) / (fadeDistance - proximity) : 0;
                card.style.setProperty('--glow-x', `${((e.clientX - cr.left) / cr.width) * 100}%`);
                card.style.setProperty('--glow-y', `${((e.clientY - cr.top) / cr.height) * 100}%`);
                card.style.setProperty('--glow-intensity', glow.toString());
                card.style.setProperty('--glow-radius', `${spotlightRadius}px`);
            });

            gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.12, ease: 'power2.out' });
            const tgt = minDist <= proximity ? 0.9 : minDist <= fadeDistance ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.9 : 0;
            gsap.to(spotlightRef.current, { opacity: tgt, duration: tgt > 0 ? 0.2 : 0.5 });
        };

        document.addEventListener('mousemove', onMove);
        return () => {
            document.removeEventListener('mousemove', onMove);
            spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
        };
    }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

    return null;
};

const MagicBento = ({
    cards,
    textAutoHide = true,
    enableStars = true,
    enableSpotlight = true,
    enableBorderGlow = true,
    disableAnimations = false,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    particleCount = DEFAULT_PARTICLE_COUNT,
    enableTilt = false,
    glowColor = DEFAULT_GLOW_COLOR,
    clickEffect = true,
    enableMagnetism = false,
    gridStyle = {},
}) => {
    const gridRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const shouldDisable = disableAnimations || isMobile;

    return (
        <>
            {enableSpotlight && (
                <GlobalSpotlight
                    gridRef={gridRef}
                    disableAnimations={shouldDisable}
                    enabled={enableSpotlight}
                    spotlightRadius={spotlightRadius}
                    glowColor={glowColor}
                />
            )}

            <div
                ref={gridRef}
                data-bento-section
                style={{
                    display: 'grid',
                    gap: '12px',
                    padding: '8px',
                    width: '100%',
                    ...gridStyle,
                }}
            >
                {cards.map((card, i) => {
                    const cardStyle = {
                        backgroundColor: 'var(--bg-card)',
                        '--glow-color': glowColor,
                        '--glow-x': '50%',
                        '--glow-y': '50%',
                        '--glow-intensity': '0',
                        '--glow-radius': '200px',
                        position: 'relative',
                        borderRadius: '20px',
                        border: enableBorderGlow
                            ? '1px solid rgba(139,92,246,0.15)'
                            : '1px solid rgba(139,92,246,0.08)',
                        padding: '28px',
                        overflow: 'hidden',
                        minHeight: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'border-color 0.3s ease, transform 0.3s ease',
                        ...card.style,
                    };

                    const content = (
                        <>
                            {/* Glow overlay */}
                            {enableBorderGlow && (
                                <div style={{
                                    position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit', zIndex: 0,
                                    background: 'radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(var(--glow-color), calc(var(--glow-intensity) * 0.15)) 0%, transparent calc(var(--glow-radius) * 0.8))',
                                }} />
                            )}
                            {/* Border glow */}
                            {enableBorderGlow && (
                                <div style={{
                                    position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit', zIndex: 0,
                                    boxShadow: `inset 0 0 0 1px rgba(${glowColor}, calc(var(--glow-intensity) * 0.6))`,
                                }} />
                            )}
                            <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                {card.label && (
                                    <span style={{
                                        fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
                                        textTransform: 'uppercase', color: 'var(--violet-light)', opacity: 0.8,
                                    }}>{card.label}</span>
                                )}
                                {card.icon && <span style={{ opacity: 0.6 }}>{card.icon}</span>}
                            </div>
                            <div style={{ position: 'relative', zIndex: 1 }}>
                                {card.title && <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '8px', letterSpacing: '-0.02em' }}>{card.title}</h3>}
                                {card.description && <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.55, overflow: textAutoHide ? 'hidden' : 'visible', display: textAutoHide ? '-webkit-box' : 'block', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{card.description}</p>}
                                {card.extra}
                            </div>
                        </>
                    );

                    return enableStars ? (
                        <ParticleCard
                            key={i}
                            data-bento-card
                            className=""
                            style={cardStyle}
                            disableAnimations={shouldDisable}
                            particleCount={particleCount}
                            glowColor={glowColor}
                            enableTilt={enableTilt}
                            clickEffect={clickEffect}
                            enableMagnetism={enableMagnetism}
                        >
                            {content}
                        </ParticleCard>
                    ) : (
                        <div key={i} data-bento-card style={cardStyle}>
                            {content}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default MagicBento;
