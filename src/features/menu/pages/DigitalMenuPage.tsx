import { useMemo, useState } from 'react';
import { useMenu } from '../../../app/MenuContext';
import { SITE_CONFIG } from '../../../config/site';
import { formatCompactPrice } from '../../../lib/format';
import { filterMenuItems } from '../../../lib/menu';
import { MenuFilter, MenuItem } from '../../../types/menu';
import ProductDetailModal from '../components/ProductDetailModal';
import QRISPaymentModal from '../components/QRISPaymentModal';
import Tilt3DCard from '../../../components/layout/Tilt3DCard';

interface DigitalMenuPageProps {
  onNavigateHome: () => void;
}

const MENU_FILTERS: MenuFilter[] = ['all', 'beverage', 'food'];

const DigitalMenuPage = ({ onNavigateHome }: DigitalMenuPageProps) => {
  const { menuItems } = useMenu();
  const [activeFilter, setActiveFilter] = useState<MenuFilter>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isQrisOpen, setIsQrisOpen] = useState(false);

  const filteredItems = useMemo(
    () =>
      filterMenuItems({
        items: menuItems,
        searchQuery: '',
        type: activeFilter,
        includeDescription: true,
      }),
    [activeFilter, menuItems],
  );

  return (
    <div className="min-h-screen bg-red-950 pb-32 text-white selection:bg-yellow-500 selection:text-black">
      {/* Editorial Header */}
      <div className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* Background Canvas */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(153,27,27,0.15),transparent_70%)]" />
          <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-900/5 blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03] grayscale contrast-150" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }} />
        </div>

        <div className="relative z-10 animate-blur-in">
          <button 
            onClick={onNavigateHome}
            className="group mb-12 flex items-center gap-3 text-[10px] font-black tracking-[0.4em] text-white/30 uppercase transition-all hover:text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all group-hover:bg-white/10">←</span>
            Back to Home
          </button>
          
          <span className="mb-4 block text-[11px] font-black tracking-[0.8em] text-yellow-500 uppercase">
            Azzahra Digital
          </span>
          <h1 className="font-serif text-7xl font-bold leading-[0.8] tracking-tighter text-white sm:text-9xl">
            MENU
          </h1>
          <div className="mx-auto mt-12 h-px w-24 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-20 max-w-2xl px-4 sm:px-6">
        {/* Category Selector */}
        <div className="sticky top-8 z-50 mb-16 flex justify-center">
          <div className="flex rounded-[2rem] border border-white/5 bg-black/60 p-1.5 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
            {MENU_FILTERS.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`rounded-[1.5rem] px-10 py-3.5 text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                  activeFilter === type
                    ? 'bg-white text-black shadow-xl'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {type === 'all' ? 'All Selection' : type === 'beverage' ? 'Drinks' : 'Signature Food'}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items List */}
        <div className="grid gap-6">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              className="animate-blur-in"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
            >
              <Tilt3DCard intensity={5} scale={1.03} glareEnabled={false}>
                <div
                  onClick={() => setSelectedItem(item)}
                  className="group relative flex items-center gap-6 overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-5 transition-all hover:bg-white/[0.05] hover:border-white/10"
                >
                  {/* Elegant Image container */}
                  <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-[2rem] bg-stone-900 ring-1 ring-white/10">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-center">
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <h3 className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-yellow-400">
                        {item.name}
                      </h3>
                      <span className="font-serif text-xl font-bold text-yellow-500">
                        {formatCompactPrice(item.price)}k
                      </span>
                    </div>
                    <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-white/40 font-medium">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-3">
                       <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-[10px] text-white/20 transition-all group-hover:bg-yellow-500 group-hover:text-black">→</span>
                       <span className="text-[9px] font-black tracking-widest text-white/20 uppercase group-hover:text-white/40">Discover details</span>
                    </div>
                  </div>
                </div>
              </Tilt3DCard>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-32 text-center animate-blur-in">
            <p className="font-serif text-2xl text-white/10 italic">Menu currently empty...</p>
          </div>
        )}

        {/* Minimalist Footer */}
        <footer className="mt-40 space-y-12 border-t border-white/5 pt-20 text-center">
          <div className="flex flex-col items-center gap-6">
             <h2 className="font-serif text-4xl font-bold text-white/20">Azzahra</h2>
             <div className="flex gap-12">
                <div className="text-center">
                  <span className="mb-1 block text-[9px] font-black tracking-widest text-white/20 uppercase">Opened</span>
                  <p className="text-sm font-bold text-white/60">{SITE_CONFIG.contact.openingHours}</p>
                </div>
                <div className="text-center">
                  <span className="mb-1 block text-[9px] font-black tracking-widest text-white/20 uppercase">Contact</span>
                  <p className="text-sm font-bold text-white/60">{SITE_CONFIG.contact.displayPhone}</p>
                </div>
             </div>
          </div>
          <p className="text-[10px] font-bold tracking-[0.4em] text-white/10 uppercase">{SITE_CONFIG.websiteLabel}</p>
        </footer>
      </div>

      {/* Modern Floating QRIS Button */}
      <div className="fixed bottom-10 left-0 right-0 z-40 flex justify-center px-6">
        <button
          onClick={() => setIsQrisOpen(true)}
          className="group flex items-center gap-4 rounded-full bg-white px-10 py-5 font-black text-black shadow-[0_20px_60px_rgba(255,255,255,0.1)] transition-all hover:bg-yellow-500 hover:scale-105 active:scale-95"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
          <span className="text-xs tracking-[0.2em] uppercase">Bayar Digital (QRIS)</span>
        </button>
      </div>

      <ProductDetailModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        showQrisButton={true}
      />

      <QRISPaymentModal
        isOpen={isQrisOpen}
        onClose={() => setIsQrisOpen(false)}
      />
    </div>
  );
};

export default DigitalMenuPage;
