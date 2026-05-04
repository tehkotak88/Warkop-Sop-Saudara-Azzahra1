import { useRef } from 'react';

import { useRevealOnIntersect } from '../../../hooks/useRevealOnIntersect';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useRevealOnIntersect(sectionRef);

  const stats = [
    { number: '2024', label: 'Established' },
    { number: '50+', label: 'Menu Pilihan' },
    { number: '7', label: 'Outlet Ready' },
  ];

  const processes = [
    {
      id: 1,
      step: '01',
      title: 'Penyortiran Manual',
      description: 'Hanya biji kopi terbaik yang lolos seleksi ketat tim ahli kami.',
      icon: '🫘',
    },
    {
      id: 2,
      step: '02',
      title: 'Roasting Presisi',
      description: 'Proses sangrai batch kecil untuk mengunci karakter rasa Nusantara.',
      icon: '🔥',
    },
    {
      id: 3,
      step: '03',
      title: 'Sajian Sepenuh Hati',
      description: 'Setiap cangkir adalah karya seni yang diseduh oleh barista kami.',
      icon: '❤️',
    },
  ];

  return (
    <section id="tentang-kami" ref={sectionRef} className="relative overflow-hidden bg-red-950 py-28 lg:py-36">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-red-900/60 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-yellow-500/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <div className={`mb-20 text-center ${isVisible ? 'animate-blur-in' : 'opacity-0'}`}>
          <span className="mb-4 inline-block text-[10px] font-bold tracking-[0.5em] text-yellow-400/80 uppercase">
            Tentang Kami
          </span>
          <h2 className="font-serif text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            Seni Dalam{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent italic">
              Setiap Tetes
            </span>
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="mb-28 grid items-center gap-16 lg:grid-cols-2">
          {/* Image Side */}
          <div className={`relative ${isVisible ? 'animate-blur-in' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-stone-900/10">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop"
                alt="Barista at work"
                className="aspect-[4/5] w-full object-cover transition-transform duration-[3s] hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
            </div>

            {/* Accent badge */}
            <div className="absolute -top-5 -left-5 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 shadow-lg shadow-yellow-900/20" style={{ animation: 'slowSpin 20s linear infinite' }}>
              <p className="text-center text-[7px] leading-tight font-black tracking-tight text-stone-900 uppercase">
                Est.<br />2024
              </p>
            </div>
          </div>

          {/* Text Side */}
          <div className={`${isVisible ? 'animate-blur-in' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
            <div className="space-y-6 text-base leading-relaxed text-white/70 md:text-lg">
              <p className="font-serif-text text-xl leading-relaxed text-white md:text-2xl">
                Warkop Azzahra bukan sekadar tempat berkumpul — ini adalah <span className="font-semibold text-yellow-400">perayaan rasa</span> yang lahir dari dedikasi dan kecintaan terhadap kopi Nusantara.
              </p>

              <div className="my-8 rounded-2xl border-l-4 border-yellow-500 bg-gradient-to-r from-red-900/50 to-transparent py-5 pl-6 pr-4">
                <p className="font-serif-text text-white/90 italic">
                  &quot;Kami tidak hanya menyajikan kopi, kami menyajikan waktu luang yang bermakna dan kehangatan yang tulus.&quot;
                </p>
              </div>

              <p>
                Dari pegunungan Gayo hingga Toraja, kami membawa keajaiban alam Indonesia langsung ke dalam cangkir Anda. Setiap biji kopi melewati proses seleksi ketat sebelum disajikan.
              </p>
            </div>

            {/* Stats Row */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="font-serif text-2xl font-bold text-white md:text-3xl">{stat.number}</p>
                  <p className="mt-1 text-[9px] font-bold tracking-wider text-white/50 uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {processes.map((process, index) => (
            <div
              key={process.id}
              className={`group relative overflow-hidden rounded-2xl border border-red-900 bg-red-900/20 p-8 backdrop-blur-sm transition-all duration-500 hover:border-yellow-400/50 hover:shadow-[0_20px_60px_-15px_rgba(250,204,21,0.15)] ${
                isVisible ? 'animate-blur-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${600 + index * 150}ms` }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
                const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5;
                e.currentTarget.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
              }}
            >
              {/* Step number watermark */}
              <span className="absolute -top-2 -right-2 font-serif text-[80px] font-black leading-none text-red-900 transition-colors group-hover:text-red-800">
                {process.step}
              </span>

              <div className="relative mb-6 text-4xl">{process.icon}</div>

              <h4 className="relative mb-3 font-serif text-xl font-bold text-white">
                {process.title}
              </h4>
              <p className="relative text-sm leading-relaxed text-white/60">
                {process.description}
              </p>

              {/* Bottom accent */}
              <div className="mt-6 h-0.5 w-10 bg-red-800 transition-all duration-500 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-amber-500" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default About;
