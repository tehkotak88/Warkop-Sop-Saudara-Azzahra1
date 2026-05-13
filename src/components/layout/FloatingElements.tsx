const FloatingElements = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {/* 3D Geometric shapes floating */}
      <div className="absolute top-[15%] left-[8%] h-24 w-24 animate-float-3d-1 opacity-20">
        <div className="h-full w-full rounded-2xl bg-gradient-to-br from-red-500/20 to-yellow-400/20 blur-xl transition-all duration-1000"
          style={{ transform: 'rotateX(45deg) rotateZ(45deg)', transformStyle: 'preserve-3d' }}
        />
      </div>

      <div className="absolute top-[60%] right-[5%] h-32 w-32 animate-float-3d-2 opacity-15">
        <div className="h-full w-full rounded-full bg-gradient-to-tr from-yellow-400/30 to-transparent blur-2xl"
          style={{ transform: 'rotateY(30deg)', transformStyle: 'preserve-3d' }}
        />
      </div>

      <div className="absolute top-[30%] right-[15%] h-40 w-40 animate-float-3d-3 opacity-10">
        <div className="h-full w-full rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-3xl"
          style={{ transform: 'rotateX(60deg) rotateY(30deg)', transformStyle: 'preserve-3d' }}
        />
      </div>

      <div className="absolute bottom-[15%] left-[5%] h-16 w-16 animate-float-3d-4 opacity-30">
        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/10"
          style={{ transform: 'rotateX(40deg) rotateZ(-20deg)', transformStyle: 'preserve-3d' }}
        >
          <span className="text-2xl filter blur-[1px] grayscale opacity-40">☕</span>
        </div>
      </div>

      <div className="absolute top-[75%] left-[40%] h-20 w-20 animate-float-3d-5 opacity-20">
        <div className="h-full w-full rounded-full border border-yellow-500/10 shadow-[0_0_50px_rgba(234,179,8,0.1)]"
          style={{ transform: 'rotateX(70deg)', transformStyle: 'preserve-3d' }}
        />
      </div>

      {/* Dust Particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/20 blur-[1px] animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float-3d-1 {
          0%, 100% { transform: translateY(0) translateX(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          33% { transform: translateY(-50px) translateX(20px) rotateX(15deg) rotateY(15deg) rotateZ(5deg); }
          66% { transform: translateY(20px) translateX(-15px) rotateX(-10deg) rotateY(-10deg) rotateZ(-5deg); }
        }
        @keyframes float-3d-2 {
          0%, 100% { transform: translateY(0) rotateY(0deg) scale(1); }
          50% { transform: translateY(-80px) rotateY(180deg) scale(1.1); }
        }
        @keyframes float-3d-3 {
          0%, 100% { transform: translate(0, 0) rotateX(0deg); }
          50% { transform: translate(-40px, -40px) rotateX(45deg); }
        }
        @keyframes float-3d-4 {
          0%, 100% { transform: translateY(0) scale(1) rotateZ(0deg); }
          50% { transform: translateY(-30px) scale(1.05) rotateZ(10deg); }
        }
        @keyframes float-3d-5 {
          0%, 100% { transform: rotateZ(0deg) translateY(0); }
          50% { transform: rotateZ(180deg) translateY(-20px); }
        }
        .animate-float-3d-1 { animation: float-3d-1 15s ease-in-out infinite; }
        .animate-float-3d-2 { animation: float-3d-2 20s ease-in-out infinite; }
        .animate-float-3d-3 { animation: float-3d-3 18s ease-in-out infinite; }
        .animate-float-3d-4 { animation: float-3d-4 10s ease-in-out infinite; }
        .animate-float-3d-5 { animation: float-3d-5 25s linear infinite; }
      `}</style>
    </div>
  );
};

export default FloatingElements;
