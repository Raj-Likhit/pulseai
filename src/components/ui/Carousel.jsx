import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';

/* ── Carousel ────────────────────────────────────────────────────
   Draggable 3D flip carousel from ReactBits.
   Themed: dark violet bg, violet border accents.
   ─────────────────────────────────────────────────────────────── */

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 14;
const SPRING = { type: 'spring', stiffness: 300, damping: 30 };

function CarouselItem({ item, index, itemWidth, round, trackItemOffset, x, transition }) {
    const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
    const rotateY = useTransform(x, range, [90, 0, -90], { clamp: false });

    return (
        <motion.div
            key={`${item?.id ?? index}-${index}`}
            style={{
                width: itemWidth,
                height: round ? itemWidth : '100%',
                rotateY,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                border: '1px solid rgba(139,92,246,0.2)',
                borderRadius: round ? '50%' : '16px',
                background: 'rgba(13,5,32,0.9)',
                overflow: 'hidden',
                cursor: 'grab',
                position: 'relative',
            }}
            transition={transition}
            whileHover={{ borderColor: 'rgba(139,92,246,0.5)' }}
        >
            {/* Gradient overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(139,92,246,0.05) 0%, transparent 60%)',
                pointerEvents: 'none',
            }} />

            <div style={{ padding: '24px', paddingBottom: '0', position: 'relative', zIndex: 1 }}>
                {item.icon && (
                    <span style={{
                        display: 'flex', width: 36, height: 36, alignItems: 'center', justifyContent: 'center',
                        borderRadius: '50%', background: 'rgba(139,92,246,0.15)',
                        border: '1px solid rgba(139,92,246,0.25)', marginBottom: '16px',
                        color: '#A78BFA',
                    }}>
                        {item.icon}
                    </span>
                )}
            </div>
            <div style={{ padding: '20px', position: 'relative', zIndex: 1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: '#fff', marginBottom: '6px', letterSpacing: '-0.01em' }}>{item.title}</div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{item.description}</p>
            </div>
        </motion.div>
    );
}

export default function Carousel({
    items = [],
    baseWidth = 300,
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = true,
    loop = false,
    round = false,
}) {
    const containerPadding = 16;
    const itemWidth = baseWidth - containerPadding * 2;
    const trackItemOffset = itemWidth + GAP;

    const itemsForRender = useMemo(() => {
        if (!loop) return items;
        if (!items.length) return [];
        return [items[items.length - 1], ...items, items[0]];
    }, [items, loop]);

    const [position, setPosition] = useState(loop ? 1 : 0);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isJumping, setIsJumping] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!pauseOnHover || !containerRef.current) return;
        const el = containerRef.current;
        const enter = () => setIsHovered(true);
        const leave = () => setIsHovered(false);
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
        return () => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); };
    }, [pauseOnHover]);

    useEffect(() => {
        if (!autoplay || itemsForRender.length <= 1) return;
        if (pauseOnHover && isHovered) return;
        const t = setInterval(() => setPosition(p => Math.min(p + 1, itemsForRender.length - 1)), autoplayDelay);
        return () => clearInterval(t);
    }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

    useEffect(() => {
        const start = loop ? 1 : 0;
        setPosition(start);
        x.set(-start * trackItemOffset);
    }, [items.length, loop, trackItemOffset, x]);

    const effectiveTransition = isJumping ? { duration: 0 } : SPRING;

    const handleAnimationComplete = () => {
        if (!loop || itemsForRender.length <= 1) { setIsAnimating(false); return; }
        const last = itemsForRender.length - 1;
        if (position === last) {
            setIsJumping(true);
            setPosition(1); x.set(-1 * trackItemOffset);
            requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false); });
        } else if (position === 0) {
            setIsJumping(true);
            setPosition(items.length); x.set(-items.length * trackItemOffset);
            requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false); });
        } else { setIsAnimating(false); }
    };

    const handleDragEnd = (_, info) => {
        const dir = info.offset.x < -DRAG_BUFFER || info.velocity.x < -VELOCITY_THRESHOLD ? 1
            : info.offset.x > DRAG_BUFFER || info.velocity.x > VELOCITY_THRESHOLD ? -1 : 0;
        if (!dir) return;
        setPosition(p => {
            const next = p + dir;
            return Math.max(0, Math.min(next, itemsForRender.length - 1));
        });
    };

    const dragProps = loop ? {} : { dragConstraints: { left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0), right: 0 } };
    const activeIndex = !items.length ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(139,92,246,0.2)',
                borderRadius: '24px',
                padding: '16px',
                width: `${baseWidth}px`,
                background: 'rgba(13,5,32,0.5)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <motion.div
                drag={isAnimating ? false : 'x'}
                {...dragProps}
                style={{ display: 'flex', gap: `${GAP}px`, width: itemWidth, perspective: 1000, perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`, x }}
                onDragEnd={handleDragEnd}
                animate={{ x: -(position * trackItemOffset) }}
                transition={effectiveTransition}
                onAnimationStart={() => setIsAnimating(true)}
                onAnimationComplete={handleAnimationComplete}
            >
                {itemsForRender.map((item, i) => (
                    <CarouselItem key={`${item?.id ?? i}-${i}`} item={item} index={i} itemWidth={itemWidth} round={round} trackItemOffset={trackItemOffset} x={x} transition={effectiveTransition} />
                ))}
            </motion.div>

            {/* Dot indicators */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', gap: '8px' }}>
                {items.map((_, i) => (
                    <motion.div
                        key={i}
                        onClick={() => setPosition(loop ? i + 1 : i)}
                        animate={{ scale: activeIndex === i ? 1.3 : 1 }}
                        transition={{ duration: 0.15 }}
                        style={{
                            width: 7, height: 7, borderRadius: '50%', cursor: 'pointer',
                            background: activeIndex === i ? 'var(--violet)' : 'rgba(139,92,246,0.3)',
                            boxShadow: activeIndex === i ? '0 0 8px rgba(139,92,246,0.6)' : 'none',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
