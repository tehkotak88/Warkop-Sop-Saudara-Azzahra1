import { useMemo, useState } from 'react';
import { useMenu } from '../../../app/MenuContext';
import { SITE_CONFIG } from '../../../config/site';
import { formatCompactPrice } from '../../../lib/format';
import { filterMenuItems } from '../../../lib/menu';
import { MenuFilter, MenuItem } from '../../../types/menu';
import ProductDetailModal from '../components/ProductDetailModal';

interface DigitalMenuPageProps {
  onNavigateHome: () => void;
}

const MENU_FILTERS: MenuFilter[] = ['all', 'beverage', 'food'];

const DigitalMenuPage = ({ onNavigateHome }: DigitalMenuPageProps) => {
  const { menuItems } = useMenu();
  const [activeFilter, setActiveFilter] = useState<MenuFilter>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

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
    <div className="min-h-screen bg-[#0a0a0a] pb-24 text-white selection:bg-yellow-500 selection:text-black">
      {/* Premium Header */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/40 to-[#0a0a0a]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <button 
            onClick={onNavigateHome}
            className="absolute top-6 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white"
          >
            ←
          </button>
          <span className="mb-2 text-[10px] font-bold tracking-[0.4em] text-yellow-500 uppercase">
            Warkop & Sop Saudara
          </span>
          <h1 className="font-serif text-5xl font-bold tracking-tight text-white sm:text-7xl">
            AZZAHRA
          </h1>
          <div className="mt-4 h-1 w-12 bg-yellow-500 rounded-full" />
        </div>
      </div>

      <div className="mx-auto -mt-12 max-w-2xl px-4 sm:px-6">
        {/* Category Selector */}
        <div className="sticky top-6 z-50 mb-10 flex justify-center">
          <div className="flex rounded-2xl border border-white/10 bg-black/60 p-1.5 backdrop-blur-xl shadow-2xl">
            {MENU_FILTERS.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`rounded-xl px-8 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === type
                    ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {type === 'all' ? 'Semua' : type === 'beverage' ? 'Minuman' : 'Makanan'}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items List */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative flex items-center gap-4 overflow-hidden rounded-3xl border border-white/5 bg-white/[0.03] p-4 transition-all hover:bg-white/[0.06] active:scale-[0.98]"
            >
              {/* Image */}
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-stone-900">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col justify-center">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-white line-clamp-1">{item.name}</h3>
                  <span className="text-sm font-bold text-yellow-500">
                    {formatCompactPrice(item.price)}
                  </span>
                </div>
                <p className="mb-2 text-xs text-white/40 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-white/20 uppercase tracking-tighter">
                  View Details
                  <span className="text-yellow-500/40">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center">
            <div className="mb-4 text-4xl">☕</div>
            <p className="text-white/30 italic">Menu belum tersedia...</p>
          </div>
        )}

        {/* Footer Info */}
        <footer className="mt-20 border-t border-white/5 pt-12 text-center">
          <p className="mb-4 text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase">
            {SITE_CONFIG.websiteLabel}
          </p>
          <div className="flex justify-center gap-6 text-white/40">
            <div className="text-xs">
              <span className="block font-bold text-white/60 mb-1">JAM BUKA</span>
              {SITE_CONFIG.contact.openingHours}
            </div>
            <div className="h-8 w-px bg-white/5" />
            <div className="text-xs">
              <span className="block font-bold text-white/60 mb-1">KONTAK</span>
              {SITE_CONFIG.contact.displayPhone}
            </div>
          </div>
        </footer>
      </div>

      <ProductDetailModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};

export default DigitalMenuPage;
