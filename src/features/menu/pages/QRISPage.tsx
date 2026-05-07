import { SITE_CONFIG } from '../../../config/site';

interface QRISPageProps {
  onNavigateHome: () => void;
}

const QRISPage = ({ onNavigateHome }: QRISPageProps) => {
  const handleWhatsAppConfirm = () => {
    const message = 'Halo, saya sudah melakukan pembayaran via QRIS.';
    const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-yellow-500 selection:text-black flex flex-col">
      {/* Header */}
      <div className="relative border-b border-white/10 bg-black/50 p-6 text-center backdrop-blur-md">
        <button 
          onClick={onNavigateHome}
          className="absolute top-1/2 left-6 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white transition-colors"
        >
          ←
        </button>
        <span className="block text-[10px] font-bold tracking-[0.4em] text-yellow-500 uppercase">
          Pembayaran
        </span>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-white mt-1">
          QRIS Azzahra
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm rounded-3xl border border-stone-800 bg-stone-900 p-8 shadow-2xl shadow-yellow-500/5 text-center relative overflow-hidden">
          
          {/* Decorative gradients */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-950/50 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-900/10 blur-[100px] pointer-events-none" />

          <p className="mb-8 text-sm text-stone-400 relative z-10">
            Scan QR Code di bawah menggunakan aplikasi M-Banking atau E-Wallet Anda (Gopay, OVO, Dana, ShopeePay, dll).
          </p>

          <div className="relative mb-8 flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-3 shadow-inner z-10">
            <img 
              src="/qr/qiris paymen.jpeg" 
              alt="QRIS ROTI MARUS AZZAHRA" 
              className="h-full w-full object-contain"
            />
          </div>

          <div className="w-full space-y-3 rounded-2xl bg-stone-800/40 p-5 text-center border border-white/5 relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Merchant</p>
            <p className="text-xl font-bold text-white tracking-wide">ROTI MARUS AZZAHRA</p>
            <p className="text-xs text-yellow-500 font-mono tracking-wider bg-yellow-500/10 inline-block px-3 py-1 rounded-full mt-2">NMID: ID1026484769280</p>
          </div>

          <button
            onClick={handleWhatsAppConfirm}
            className="mt-8 w-full rounded-2xl bg-yellow-500 py-4 text-xs font-bold tracking-[0.2em] text-stone-950 uppercase shadow-xl shadow-yellow-500/20 transition-all hover:bg-yellow-400 active:scale-[0.98] relative z-10"
          >
            Konfirmasi Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRISPage;
