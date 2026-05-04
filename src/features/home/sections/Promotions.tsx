import { useRef } from 'react';

import { PROMOTIONS_LIST } from '../../../data/menu-data';
import { useRevealOnIntersect } from '../../../hooks/useRevealOnIntersect';
import { SectionId } from '../../../types/app';

interface PromotionsProps {
  onNavigate: (sectionId: SectionId) => void;
}

const Promotions = ({ onNavigate }: PromotionsProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useRevealOnIntersect(sectionRef);

  return (
    <section id="promo" ref={sectionRef} className="relative overflow-hidden bg-red-950 py-28 lg:py-36">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full bg-red-900/40 blur-[150px]" />
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-yellow-600/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`mb-20 text-center ${isVisible ? 'animate-blur-in' : 'opacity-0'}`}>
          <span className="mb-4 inline-block text-[10px] font-bold tracking-[0.5em] text-yellow-400/80 uppercase">
            Penawaran Spesial
          </span>
          <h2 className="font-serif text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            Promo{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent italic">Terbaru</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {PROMOTIONS_LIST.map((promo, index) => (
            <div
              key={promo.id}
              className={`group relative cursor-pointer overflow-hidden rounded-[2rem] transition-all duration-500 ${
                isVisible ? 'animate-blur-in' : 'opacity-0'
              }`}
              style={{
                animationDelay: `${index * 200}ms`,
                transformStyle: 'preserve-3d',
              }}
              onClick={() => onNavigate('menu')}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
                const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
              }}
            >
              {/* Image */}
              <div className="relative h-[450px] overflow-hidden rounded-[2rem] border border-stone-200 shadow-xl shadow-stone-900/5">
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                {/* Badge */}
                <div className="absolute top-6 right-6">
                  <div className="rounded-full bg-red-800 px-4 py-1.5 text-[9px] font-black tracking-[0.2em] text-white uppercase shadow-lg shadow-red-900/30">
                    Promo
                  </div>
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <h3 className="mb-3 font-serif text-3xl font-bold text-white transition-colors group-hover:text-yellow-300">
                    {promo.title}
                  </h3>
                  <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-white/60 transition-colors group-hover:text-white/80">
                    {promo.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm transition-all group-hover:bg-red-800 group-hover:shadow-lg">
                      Lihat Menu
                      <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
