import { useEffect, useRef, useState } from 'react';

import { SectionId } from '../../../types/app';

interface HeroProps {
  onNavigate: (sectionId: SectionId) => void;
}

const Hero = ({ onNavigate }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
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
      className="relative flex h-screen items-center justify-center overflow-hidden bg-red-950"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translate3d(${mousePos.x * -8}px, ${mousePos.y * -8}px, 0) scale(1.1)`,
          transition: 'transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1920&auto=format&fit=crop')",
            animation: 'heroZoom 30s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-red-950/80 via-red-950/40 to-red-950" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-red-900/30 via-transparent to-red-900/30" />

      {/* Decorative Lines */}
      <div className="pointer-events-none absolute inset-0 z-[3]">
        <div className="absolute top-0 left-1/4 h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute top-0 left-2/4 h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute top-0 left-3/4 h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      {/* Soft Glow Orbs */}
      <div className="pointer-events-none absolute inset-0 z-[4]">
        <div className="absolute top-[20%] left-[15%] h-[400px] w-[400px] rounded-full bg-red-900/15 blur-[150px]" style={{ animation: 'glowPulse 8s ease-in-out infinite' }} />
        <div className="absolute bottom-[10%] right-[10%] h-[350px] w-[350px] rounded-full bg-yellow-600/10 blur-[130px]" style={{ animation: 'glowPulse 10s ease-in-out infinite 2s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="mx-auto max-w-5xl text-center">
          {/* Top badge */}
          <div
            className={`mb-8 transition-all duration-[1.8s] ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] font-bold tracking-[0.4em] text-white/60 uppercase backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
              Warkop & Sop Saudara
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-10 select-none">
            <span
              className={`block font-serif text-7xl font-bold tracking-tight text-white md:text-[10rem] md:leading-[0.85] transition-all duration-[1.8s] ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
              style={{ transitionDelay: '0.4s' }}
            >
              Warkop
            </span>
            <span
              className={`font-handwriting mt-2 block text-6xl text-yellow-400 italic md:text-[8rem] md:leading-[0.9] transition-all duration-[1.8s] ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
              style={{ transitionDelay: '0.7s', textShadow: '0 0 80px rgba(250,204,21,0.15)' }}
            >
              Azzahra
            </span>
          </h1>

          {/* Divider */}
          <div
            className={`mx-auto mb-10 flex items-center justify-center gap-4 transition-all duration-[1.8s] ${loaded ? 'translate-y-0 opacity-100 scale-x-100' : 'translate-y-8 opacity-0 scale-x-0'}`}
            style={{ transitionDelay: '1s' }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-700/50" />
            <div className="h-2 w-2 rotate-45 border border-yellow-400/40" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-700/50" />
          </div>

          {/* Subtitle */}
          <p
            className={`font-serif-text mx-auto max-w-xl text-lg leading-relaxed text-white/50 italic md:text-xl transition-all duration-[1.8s] ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionDelay: '1.2s' }}
          >
            &quot;Temukan harmoni rasa dalam setiap sajian makanan dan minuman spesial kami.&quot;
          </p>

          {/* CTA Buttons */}
          <div
            className={`mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row transition-all duration-[1.8s] ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
            style={{ transitionDelay: '1.5s' }}
          >
            <button
              onClick={() => onNavigate('menu')}
              className="group relative overflow-hidden rounded-full bg-red-800 px-10 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition-all duration-500 hover:bg-red-700 hover:shadow-[0_0_40px_rgba(153,27,27,0.4)] active:scale-95"
            >
              <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
              <span className="relative flex items-center gap-3">
                Eksplor Menu
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>

            <button
              onClick={() => onNavigate('reservasi')}
              className="rounded-full border border-white/15 px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white/70 transition-all duration-500 hover:border-yellow-400/40 hover:text-yellow-300 hover:bg-yellow-400/5"
            >
              Reservasi Tempat
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 z-[5] h-32 bg-gradient-to-t from-red-950 to-transparent" />

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-16 left-1/2 z-10 -translate-x-1/2 transition-all duration-[1.8s] ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: '2s' }}
      >
        <div className="flex flex-col items-center gap-3" style={{ animation: 'floatUpDown 3s ease-in-out infinite' }}>
          <span className="text-[8px] font-bold tracking-[0.5em] text-white/25 uppercase">Scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>

      <style>{`
        @keyframes heroZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
