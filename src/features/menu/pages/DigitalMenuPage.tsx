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
    <div className="min-h-screen bg-[#050505] pb-32 text-white selection:bg-yellow-500 selection:text-black">
      {/* Premium Header */}
      <div className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1920&auto=format&fit=crop" 
            className="h-full w-full object-cover opacity-30 blur-sm"
            alt="background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-red-950/60 via-[#050505]/80 to-[#050505]" />
        </div>
        
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center animate-blur-in">
          <button 
            onClick={onNavigateHome}
            className="absolute top-8 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white transition-all hover:bg-white/10"
          >
            ←
          </button>
          
          <div className="mb-4 flex items-center gap-2">
            <div className="h-px w-6 bg-yellow-500/50" />
            <span className="text-[10px] font-black tracking-[0.5em] text-yellow-500 uppercase">
              Exclusive Menu
            </span>
            <div className="h-px w-6 bg-yellow-500/50" />
          </div>
          
          <h1 className="font-serif text-6xl font-bold tracking-tighter text-white sm:text-8xl">
            AZZAHRA
          </h1>
          <p className="mt-4 text-xs font-bold tracking-[0.3em] text-white/40 uppercase">Digital Experience</p>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-16 max-w-2xl px-4 sm:px-6">
        {/* Category Selector */}
        <div className="sticky top-6 z-50 mb-12 flex justify-center">
          <div className="flex rounded-3xl border border-white/10 bg-black/40 p-1.5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {MENU_FILTERS.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`rounded-2xl px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                  activeFilter === type
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-500/20'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {type === 'all' ? 'All' : type === 'beverage' ? 'Drinks' : 'Food'}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items List */}
        <div className="grid gap-4">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id}
              className="animate-blur-in"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
            >
              <Tilt3DCard intensity={5} scale={1.02} glareEnabled={false}>
                <div
                  onClick={() => setSelectedItem(item)}
                  className="group relative flex items-center gap-5 overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-4 transition-all hover:bg-white/[0.05] active:scale-[0.98] hover:border-white/10"
                >
                  {/* Image Container */}
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[1.5rem] bg-stone-900 ring-1 ring-white/10 transition-all group-hover:ring-yellow-500/30">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-center py-2">
                    <div className="mb-1 flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold text-white transition-colors group-hover:text-yellow-400 leading-tight">
                        {item.name}
                      </h3>
                      <div className="flex flex-col items-end">
                        <span className="text-lg font-serif font-bold text-yellow-500">
                          {formatCompactPrice(item.price)}k
                        </span>
                      </div>
                    </div>
                    <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-white/40 font-medium">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500 animate-pulse" />
                      <span className="text-[9px] font-black tracking-widest text-white/20 uppercase group-hover:text-white/40">Details</span>
                    </div>
                  </div>
                </div>
              </Tilt3DCard>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-24 text-center animate-blur-in">
            <div className="mb-4 text-5xl opacity-20">☕</div>
            <p className="text-white/30 font-medium italic">Koleksi belum tersedia...</p>
          </div>
        )}

        {/* Footer Info */}
        <footer className="mt-32 border-t border-white/5 pt-16 text-center">
          <div className="mb-10 flex flex-col items-center gap-2">
             <span className="text-[9px] font-black tracking-[0.6em] text-white/20 uppercase">
              {SITE_CONFIG.websiteLabel}
            </span>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-center sm:gap-16">
            <div className="text-center">
              <span className="mb-2 block text-[9px] font-black tracking-widest text-yellow-500/40 uppercase">Operating Hours</span>
              <p className="text-sm font-bold text-white/60">{SITE_CONFIG.contact.openingHours}</p>
            </div>
            <div className="text-center">
              <span className="mb-2 block text-[9px] font-black tracking-widest text-yellow-500/40 uppercase">Direct Contact</span>
              <p className="text-sm font-bold text-white/60">{SITE_CONFIG.contact.displayPhone}</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating QRIS Button */}
      <div className="fixed bottom-8 left-0 right-0 z-40 flex justify-center px-6">
        <button
          onClick={() => setIsQrisOpen(true)}
          className="group relative flex items-center gap-4 overflow-hidden rounded-full bg-gradient-to-r from-yellow-400 to-amber-600 px-10 py-5 font-black text-stone-950 shadow-[0_20px_50px_-10px_rgba(234,179,8,0.5)] transition-all hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
          <span className="text-xs tracking-[0.2em] uppercase">Quick QRIS Pay</span>
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
