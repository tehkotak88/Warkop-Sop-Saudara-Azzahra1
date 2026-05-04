const FloatingElements = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {/* 3D Geometric shapes floating */}
      <div className="floating-3d-element absolute top-[15%] left-[8%] h-16 w-16 animate-float-3d-1">
        <div className="h-full w-full rounded-xl bg-gradient-to-br from-red-800/8 to-yellow-400/8 backdrop-blur-sm"
          style={{ transform: 'rotateX(45deg) rotateZ(45deg)', transformStyle: 'preserve-3d' }}
        />
      </div>

      <div className="floating-3d-element absolute top-[60%] right-[5%] h-12 w-12 animate-float-3d-2">
        <div className="h-full w-full rounded-full bg-gradient-to-br from-yellow-400/10 to-red-700/5 backdrop-blur-sm"
          style={{ transform: 'rotateY(30deg)', transformStyle: 'preserve-3d' }}
        />
      </div>

      <div className="floating-3d-element absolute top-[30%] right-[15%] h-20 w-20 animate-float-3d-3">
        <div className="h-full w-full rounded-2xl border border-red-800/5 bg-gradient-to-br from-red-900/5 to-transparent"
          style={{ transform: 'rotateX(60deg) rotateY(30deg)', transformStyle: 'preserve-3d' }}
        />
      </div>

      <div className="floating-3d-element absolute bottom-[20%] left-[12%] h-10 w-10 animate-float-3d-4">
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-yellow-400/8"
          style={{ transform: 'rotateX(40deg) rotateZ(-20deg)', transformStyle: 'preserve-3d' }}
        >
          <span className="text-lg opacity-30">☕</span>
        </div>
      </div>

      <div className="floating-3d-element absolute top-[75%] left-[45%] h-14 w-14 animate-float-3d-5">
        <div className="h-full w-full rounded-full border border-yellow-400/8"
          style={{ transform: 'rotateX(50deg)', transformStyle: 'preserve-3d' }}
        />
      </div>

      <div className="floating-3d-element absolute top-[10%] left-[50%] h-8 w-8 animate-float-3d-2">
        <div className="h-full w-full rotate-45 bg-red-800/5" />
      </div>

      <div className="floating-3d-element absolute bottom-[35%] right-[25%] h-6 w-6 animate-float-3d-1">
        <div className="h-full w-full rounded-full bg-yellow-500/10" />
      </div>

      <style>{`
        @keyframes float-3d-1 {
          0%, 100% { transform: translateY(0) translateX(0) rotateZ(0deg); }
          25% { transform: translateY(-30px) translateX(10px) rotateZ(5deg); }
          50% { transform: translateY(-15px) translateX(-5px) rotateZ(-3deg); }
          75% { transform: translateY(-40px) translateX(15px) rotateZ(8deg); }
        }
        @keyframes float-3d-2 {
          0%, 100% { transform: translateY(0) rotateY(0deg); }
          33% { transform: translateY(-25px) rotateY(120deg); }
          66% { transform: translateY(-45px) rotateY(240deg); }
        }
        @keyframes float-3d-3 {
          0%, 100% { transform: translateY(0) translateX(0) rotateX(0deg); }
          50% { transform: translateY(-35px) translateX(-20px) rotateX(180deg); }
        }
        @keyframes float-3d-4 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
        @keyframes float-3d-5 {
          0%, 100% { transform: translateY(0) rotateZ(0deg); }
          25% { transform: translateY(-15px) rotateZ(90deg); }
          50% { transform: translateY(-30px) rotateZ(180deg); }
          75% { transform: translateY(-10px) rotateZ(270deg); }
        }
        .animate-float-3d-1 { animation: float-3d-1 12s ease-in-out infinite; }
        .animate-float-3d-2 { animation: float-3d-2 16s ease-in-out infinite; }
        .animate-float-3d-3 { animation: float-3d-3 14s ease-in-out infinite; }
        .animate-float-3d-4 { animation: float-3d-4 8s ease-in-out infinite; }
        .animate-float-3d-5 { animation: float-3d-5 18s linear infinite; }
      `}</style>
    </div>
  );
};

export default FloatingElements;
