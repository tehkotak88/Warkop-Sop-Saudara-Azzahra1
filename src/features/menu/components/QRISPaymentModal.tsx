import { useState } from 'react';
import { SITE_CONFIG } from '../../../config/site';

interface QRISPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName?: string;
  itemPrice?: number;
}

const QRISPaymentModal = ({ isOpen, onClose, itemName, itemPrice }: QRISPaymentModalProps) => {
  const [selectedOutlet, setSelectedOutlet] = useState<string>(SITE_CONFIG.outlets[0].name);

  if (!isOpen) return null;

  const outlet = SITE_CONFIG.outlets.find((outlet) => outlet.name === selectedOutlet) || SITE_CONFIG.outlets[0];

  const handleWhatsAppConfirm = () => {
    let message = 'Halo, saya sudah melakukan pembayaran via QRIS.';
    if (itemName) {
      message = `Halo, saya memesan ${itemName}${itemPrice ? ` (Rp ${itemPrice.toLocaleString('id-ID')})` : ''} dan sudah melakukan pembayaran via QRIS.`;
    }
    const whatsappUrl = `https://wa.me/${outlet.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-stone-950/90 p-4 backdrop-blur-xl"
      onClick={onClose}
      style={{ animation: 'fadeIn 0.3s ease' }}
    >
      <div
        className="relative w-full max-w-[420px] max-h-[85vh] overflow-y-auto rounded-3xl border border-stone-800 bg-stone-900 shadow-2xl shadow-yellow-500/10"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Header */}
        <div className="bg-red-950/30 p-6 text-center border-b border-stone-800">
          <h3 className="font-serif text-2xl font-bold text-white">Pembayaran QRIS</h3>
          <p className="mt-2 text-xs text-stone-400">Scan QR Code di bawah menggunakan aplikasi M-Banking atau E-Wallet Anda (Gopay, OVO, Dana, ShopeePay, dll).</p>
        </div>

        {/* QRIS Content */}
        <div className="p-8 flex flex-col items-center gap-6">
          <div className="relative mb-1 flex aspect-square w-full max-w-[240px] items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-inner">
            <img 
              src="/qr/qiris paymen.jpeg" 
              alt="QRIS Warkop Azzahra" 
              className="h-full w-full object-contain"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/400x400.png?text=QRIS+Not+Found';
              }}
            />
          </div>

          <div className="w-full rounded-xl bg-stone-800/30 p-4 text-center border border-stone-700">
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Merchant</p>
            <p className="text-lg font-bold text-white">ROTI MARUS AZZAHRA</p>
            <p className="text-xs text-yellow-500 font-mono">NMID: ID1026484769280</p>
          </div>

          <div className="w-full rounded-3xl border border-stone-800 bg-stone-900/90 p-5 text-left">
            <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.3em] text-stone-500">Pilih Outlet untuk Konfirmasi WA</label>
            <select
              value={selectedOutlet}
              onChange={(e) => setSelectedOutlet(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-stone-950/80 px-4 py-3 text-sm text-white outline-none transition-all focus:border-yellow-500"
            >
              {SITE_CONFIG.outlets.map((outlet) => (
                <option key={outlet.name} value={outlet.name} className="bg-stone-950 text-white">
                  {outlet.name} — {outlet.phone}
                </option>
              ))}
            </select>

            <div className="mt-4 space-y-3 rounded-2xl bg-stone-800/50 p-4 text-sm text-white/80">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Nomor outlet aktif</p>
              <p className="font-semibold text-white">{outlet.name}</p>
              <p>{outlet.phone}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-stone-950/50 p-6 border-t border-stone-800">
          <button
            onClick={handleWhatsAppConfirm}
            className="w-full rounded-2xl bg-yellow-500 py-4 text-xs font-bold tracking-[0.2em] text-stone-950 uppercase shadow-lg shadow-yellow-500/20 transition-all hover:bg-yellow-400 active:scale-95"
          >
            Konfirmasi ke WhatsApp Outlet
          </button>
          
          <div className="mt-3">
            <button
              onClick={onClose}
              className="w-full rounded-2xl border border-yellow-500/50 bg-stone-800/90 py-4 text-xs font-black tracking-[0.2em] text-white uppercase shadow-sm shadow-yellow-500/10 transition-all hover:bg-stone-700 active:scale-95"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRISPaymentModal;

