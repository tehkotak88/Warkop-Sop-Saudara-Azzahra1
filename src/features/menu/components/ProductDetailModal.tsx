import { useState } from 'react';
import { formatCurrency } from '../../../lib/format';
import { MenuItem } from '../../../types/menu';
import QRISPaymentModal from './QRISPaymentModal';

interface ProductDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  showQrisButton?: boolean;
}

const ProductDetailModal = ({
  item,
  isOpen,
  onClose,
  showQrisButton = true,
}: ProductDetailModalProps) => {
  const [isQrisOpen, setIsQrisOpen] = useState(false);

  if (!isOpen || !item) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[110] flex items-center justify-center bg-stone-950/80 p-4 backdrop-blur-md"
        onClick={onClose}
        style={{ animation: 'fadeIn 0.3s ease' }}
      >
        <div
          className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-stone-800 bg-stone-900 shadow-2xl shadow-red-950/20"
          onClick={(event) => event.stopPropagation()}
          style={{ animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-[130] flex h-10 w-10 items-center justify-center rounded-full bg-stone-800/90 text-stone-300 backdrop-blur-sm transition-all active:scale-90 active:bg-stone-700 active:text-white"
            aria-label="Close modal"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative min-h-[420px] overflow-hidden md:rounded-l-2xl">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent md:bg-gradient-to-r md:from-transparent md:to-stone-900/30" />

              {/* Category Badge */}
              {item.category !== 'standard' && (
                <div className="absolute top-4 left-4">
                  <span className={`rounded-full px-3 py-1 text-[9px] font-black tracking-widest text-white uppercase ${
                    item.category === 'best-seller'
                      ? 'bg-red-800 shadow-lg shadow-red-900/30'
                      : 'bg-white/15 backdrop-blur-sm'
                  }`}>
                    {item.category === 'best-seller' ? '🔥 Best Seller' : '✨ New'}
                  </span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between p-8 md:p-10">
              <div>
                <span className="mb-2 inline-block text-[9px] font-bold tracking-[0.4em] text-stone-600 uppercase">
                  {item.type === 'beverage' ? 'Minuman' : 'Makanan'}
                </span>
                <h2 className="mb-4 font-serif text-3xl font-bold text-white md:text-4xl">
                  {item.name}
                </h2>

                <div className="mb-6">
                  <p className="text-lg font-serif text-stone-400 italic leading-relaxed">
                    &quot;{item.description}&quot;
                  </p>
                </div>

                {item.details && (
                  <div className="mb-6 rounded-xl border border-stone-800 bg-stone-800/30 p-4">
                    <h4 className="mb-2 text-[10px] font-bold tracking-[0.3em] text-stone-500 uppercase">
                      Detail
                    </h4>
                    <p className="text-sm leading-relaxed text-stone-400">
                      {item.details}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-4">
                {/* Price */}
                <div className="flex items-center justify-between rounded-xl bg-red-800/10 px-5 py-4">
                  <span className="text-sm font-bold text-stone-400 uppercase tracking-wider">Harga</span>
                  <span className="font-serif text-2xl font-bold text-yellow-400">{formatCurrency(item.price)}</span>
                </div>

                <div className="flex gap-3">
                  {/* Action Buttons */}
                  {showQrisButton && (
                    <button
                      type="button"
                      onClick={() => setIsQrisOpen(true)}
                      className="flex-1 rounded-xl bg-yellow-500 py-4 text-xs font-bold tracking-[0.1em] text-stone-950 uppercase shadow-lg shadow-yellow-500/20 transition-all hover:bg-yellow-400 active:scale-95"
                    >
                      Bayar QRIS
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-xl border border-stone-800 bg-stone-800/50 py-4 text-xs font-bold tracking-[0.2em] text-stone-400 uppercase transition-all hover:bg-stone-800 hover:text-white active:scale-95"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>

      <QRISPaymentModal 
        isOpen={isQrisOpen} 
        onClose={() => setIsQrisOpen(false)} 
        itemName={item.name}
        itemPrice={item.price}
      />
    </>
  );
};

export default ProductDetailModal;
