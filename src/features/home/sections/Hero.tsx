import { useEffect, useRef, useState } from 'react';

import { SectionId } from '../../../types/app';

interface HeroProps {
  onNavigate: (sectionId: SectionId) => void;
}

const Hero = ({ onNavigate }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) {
        return;
      }

      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;

      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-stone-900"
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px) scale(1.1)`,
          transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="h-full w-full animate-ken-burns bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1920&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/50 to-stone-950/80" />
      </div>

      {/* Animated red & yellow glow orbs */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-red-900/20 blur-[200px] animate-hero-glow-1" />
        <div className="absolute -right-40 -bottom-40 h-[500px] w-[500px] rounded-full bg-yellow-500/15 blur-[180px] animate-hero-glow-2" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-800/10 blur-[150px] animate-hero-glow-3" />
      </div>

      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-8 text-6xl font-bold leading-[0.9] tracking-tighter text-white select-none md:text-[9rem]">
            <span
              className="block animate-blur-in opacity-0 delay-200"
              style={{ animationFillMode: 'forwards' }}
            >
              Warkop
            </span>
            <span
              className="font-handwriting block animate-blur-in bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent italic opacity-0 delay-300"
              style={{ animationFillMode: 'forwards' }}
            >
              Azzahra
            </span>
          </h1>

          <div
            className="mx-auto mt-10 mb-16 max-w-2xl animate-blur-in opacity-0 delay-500"
            style={{ animationFillMode: 'forwards' }}
          >
            <p className="font-serif-text text-lg leading-relaxed text-white/70 italic md:text-2xl">
              &quot;Temukan harmoni rasa dalam setiap sajian makanan dan minuman
              spesial kami.&quot;
            </p>
          </div>

          <div
            className="flex flex-col items-center justify-center gap-6 animate-blur-in opacity-0 delay-700 sm:flex-row"
            style={{ animationFillMode: 'forwards' }}
          >
            <button
              onClick={() => onNavigate('menu')}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-red-800 to-red-700 px-10 py-4 text-sm font-black text-white transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(153,27,27,0.5)] active:scale-95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest group-hover:text-stone-900">
                Eksplor Menu
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </button>

            <button
              onClick={() => onNavigate('promo')}
              className="rounded-full border-2 border-yellow-400/30 px-10 py-4 text-sm font-bold uppercase tracking-widest text-yellow-300 backdrop-blur-sm transition-all hover:border-yellow-400/60 hover:bg-yellow-400/10 hover:text-yellow-200 hover:shadow-[0_0_30px_rgba(250,204,21,0.15)]"
            >
              Promo Spesial
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 animate-bounce-slow">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/20 p-1.5">
          <div className="h-2 w-1 rounded-full bg-yellow-400 animate-scroll-dot" />
        </div>
      </div>

      <style>{`
        @keyframes hero-glow-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          50% { transform: translate(40px, 30px) scale(1.1); opacity: 0.35; }
        }
        @keyframes hero-glow-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.15; }
          50% { transform: translate(-30px, -20px) scale(1.15); opacity: 0.25; }
        }
        @keyframes hero-glow-3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.2; }
        }
        .animate-hero-glow-1 { animation: hero-glow-1 8s ease-in-out infinite; }
        .animate-hero-glow-2 { animation: hero-glow-2 10s ease-in-out infinite; }
        .animate-hero-glow-3 { animation: hero-glow-3 6s ease-in-out infinite; }
        @keyframes scroll-dot {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(8px); }
        }
        .animate-scroll-dot { animation: scroll-dot 2s ease-in-out infinite; }
        @keyframes bounce-slow-hero {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-8px); }
        }
        .animate-bounce-slow { animation: bounce-slow-hero 3s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
