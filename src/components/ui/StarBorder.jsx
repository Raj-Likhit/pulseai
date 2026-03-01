/* ── StarBorder ──────────────────────────────────────────────────
   Animated glowing border that travels around the element edges.
   From ReactBits — adapted to violet/cyan theme.
   ─────────────────────────────────────────────────────────────── */

const StarBorder = ({
    as: Component = 'div',
    className = '',
    color = '#8B5CF6',
    speed = '5s',
    thickness = 1.5,
    children,
    style = {},
    ...rest
}) => {
    return (
        <Component
            className={`star-border-container ${className}`}
            style={{
                display: 'inline-block',
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                padding: `${thickness}px 0`,
                ...style,
            }}
            {...rest}
        >
            <div
                className="star-border-gradient-bottom"
                style={{
                    position: 'absolute',
                    width: '300%',
                    height: '50%',
                    opacity: 0.7,
                    bottom: '-12px',
                    right: '-250%',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                    animation: `star-bottom ${speed} linear infinite alternate`,
                    zIndex: 0,
                }}
            />
            <div
                className="star-border-gradient-top"
                style={{
                    position: 'absolute',
                    opacity: 0.7,
                    width: '300%',
                    height: '50%',
                    top: '-12px',
                    left: '-250%',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                    animation: `star-top ${speed} linear infinite alternate`,
                    zIndex: 0,
                }}
            />
            <div
                className="star-border-inner"
                style={{
                    position: 'relative',
                    border: '1px solid rgba(139,92,246,0.25)',
                    background: 'rgba(13,5,32,0.9)',
                    color: 'white',
                    borderRadius: '20px',
                    zIndex: 1,
                }}
            >
                {children}
            </div>

            <style>{`
        @keyframes star-bottom {
          0%   { transform: translate(0%, 0%);    opacity: 1; }
          100% { transform: translate(-100%, 0%); opacity: 0; }
        }
        @keyframes star-top {
          0%   { transform: translate(0%, 0%);   opacity: 1; }
          100% { transform: translate(100%, 0%); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .star-border-gradient-bottom,
          .star-border-gradient-top { animation: none !important; }
        }
      `}</style>
        </Component>
    );
};

export default StarBorder;
