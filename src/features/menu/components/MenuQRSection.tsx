import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const MenuQRSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://warkop-azzahra.com';

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        currentUrl,
        {
          width: 256,
          margin: 2,
          color: {
            dark: '#ffffff',
            light: '#00000000', // transparent
          },
        },
        (error) => {
          if (error) console.error('Error generating QR code:', error);
        }
      );
    }
  }, [currentUrl]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'warkop-azzahra-menu-qr.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="mt-24 rounded-3xl border border-stone-800 bg-stone-900/40 p-8 text-center backdrop-blur-md lg:p-12">
      <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-400/10 text-3xl">
        📱
      </div>
      <h3 className="mb-4 font-serif text-3xl font-bold text-white">Menu Digital QR</h3>
      <p className="mx-auto mb-10 max-w-lg text-sm text-white/50 leading-relaxed">
        Buka menu ini di ponsel Anda atau download kode QR untuk dipasang di meja pelanggan. 
        Memudahkan pemesanan tanpa harus menunggu buku menu fisik.
      </p>

      <div className="group relative mx-auto mb-10 flex h-64 w-64 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-yellow-400/30">
        <canvas ref={canvasRef} className="h-full w-full" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 rounded-2xl">
          <button
            onClick={handleDownload}
            className="rounded-full bg-yellow-500 px-6 py-2 text-xs font-bold text-red-950 transition-transform hover:scale-105 active:scale-95"
          >
            Download PNG
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <div className="flex items-center gap-2 rounded-full border border-stone-800 bg-stone-900/60 px-4 py-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          Ready to Scan
        </div>
      </div>
    </div>
  );
};

export default MenuQRSection;
