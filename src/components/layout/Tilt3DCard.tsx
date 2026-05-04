import { useCallback, useRef, ReactNode } from 'react';

interface Tilt3DCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glareEnabled?: boolean;
}

const Tilt3DCard = ({ children, className = '', intensity = 15, glareEnabled = true }: Tilt3DCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    if (glare && glareEnabled) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
      glare.style.opacity = '1';
    }
  }, [intensity, glareEnabled]);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    if (glare) {
      glare.style.opacity = '0';
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
      {glareEnabled && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300"
        />
      )}
    </div>
  );
};

export default Tilt3DCard;
