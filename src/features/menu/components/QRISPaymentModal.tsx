import { SITE_CONFIG } from '../../../config/site';

interface QRISPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName?: string;
  itemPrice?: number;
}

const QRISPaymentModal = ({ isOpen, onClose, itemName, itemPrice }: QRISPaymentModalProps) => {
  if (!isOpen) return null;

  const handleWhatsAppConfirm = () => {
    let message = 'Halo, saya sudah melakukan pembayaran via QRIS.';
    if (itemName) {
      message = `Halo, saya memesan ${itemName} dan sudah melakukan pembayaran via QRIS.`;
    }
    const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-stone-950/90 p-4 backdrop-blur-xl"
      onClick={onClose}
      style={{ animation: 'fadeIn 0.3s ease' }}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-stone-800 bg-stone-900 shadow-2xl shadow-yellow-500/10"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Header */}
        <div className="bg-red-950/30 p-6 text-center border-b border-stone-800">
          <h3 className="font-serif text-2xl font-bold text-white">Pembayaran QRIS</h3>
          <p className="mt-2 text-xs text-stone-400">Scan QR Code di bawah menggunakan aplikasi M-Banking atau E-Wallet Anda (Gopay, OVO, Dana, ShopeePay, dll).</p>
        </div>

        {/* QRIS Content */}
        <div className="p-8 flex flex-col items-center">
          <div className="relative mb-6 flex aspect-square w-full max-w-[240px] items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-inner">
            <img 
              src="/asset/qris.jpg" 
              alt="QRIS Warkop Azzahra" 
              className="h-full w-full object-contain"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/400x400.png?text=Upload+qris.jpg+ke+folder+asset';
              }}
            />
          </div>

          <div className="w-full space-y-3 rounded-xl bg-stone-800/30 p-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Merchant</p>
            <p className="text-lg font-bold text-white">ROTI MARUS AZZAHRA</p>
            <p className="text-xs text-yellow-500 font-mono">NMID: ID1026484769280</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-stone-950/50 p-6 space-y-3 border-t border-stone-800">
          <button
            onClick={handleWhatsAppConfirm}
            className="w-full rounded-xl bg-yellow-500 py-4 text-xs font-bold tracking-[0.2em] text-stone-950 uppercase shadow-lg shadow-yellow-500/20 transition-all hover:bg-yellow-400 active:scale-95"
          >
            Konfirmasi ke WhatsApp
          </button>
          
          <button
            onClick={onClose}
            className="w-full rounded-xl border border-stone-700 bg-transparent py-4 text-xs font-bold tracking-[0.2em] text-stone-400 uppercase transition-all hover:bg-stone-800 hover:text-white active:scale-95"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRISPaymentModal;
