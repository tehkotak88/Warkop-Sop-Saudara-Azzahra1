import { useMemo, useState } from 'react';

import { useMenu } from '../../../app/MenuContext';
import { SITE_CONFIG } from '../../../config/site';
import { formatCompactPrice } from '../../../lib/format';
import { filterMenuItems } from '../../../lib/menu';
import { MenuFilter, MenuItem } from '../../../types/menu';
import ProductDetailModal from '../components/ProductDetailModal';
import Tilt3DCard from '../../../components/layout/Tilt3DCard';

interface MenuPageProps {
  onNavigateHome: () => void;
}

const MENU_FILTERS: MenuFilter[] = ['all', 'beverage', 'food'];

const MenuPage = ({ onNavigateHome }: MenuPageProps) => {
  const { menuItems } = useMenu();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<MenuFilter>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = useMemo(
    () =>
      filterMenuItems({
        items: menuItems,
        searchQuery,
        type: activeFilter,
        includeDescription: true,
      }),
    [activeFilter, menuItems, searchQuery],
  );

  const renderMenuItem = (item: MenuItem, index: number) => {
    return (
      <div
        key={item.id}
        className="animate-blur-in"
        style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
      >
        <Tilt3DCard intensity={5} scale={1.02} className="w-full">
          <div
            onClick={() => setSelectedItem(item)}
            className="group relative flex cursor-pointer items-center gap-6 rounded-3xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-500 hover:bg-white/[0.05] hover:border-yellow-500/20"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-stone-900 ring-1 ring-white/10 group-hover:ring-yellow-500/30">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>

            <div className="flex flex-1 flex-col justify-center">
              <div className="mb-1 flex items-start justify-between gap-4">
                <h3 className="text-lg font-bold text-white transition-colors group-hover:text-yellow-400">
                  {item.name}
                </h3>
                <span className="text-lg font-serif font-bold text-yellow-500">
                  {formatCompactPrice(item.price)}k
                </span>
              </div>
              <p className="line-clamp-2 text-xs leading-relaxed text-white/40">
                {item.description}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-px w-6 bg-white/10" />
                <span className="text-[9px] font-black tracking-widest text-white/20 uppercase group-hover:text-white/40">Details</span>
              </div>
            </div>
          </div>
        </Tilt3DCard>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-red-950 pb-32 text-white selection:bg-yellow-500 selection:text-black">
      {/* Premium Header */}
      <div className="relative overflow-hidden pt-20 pb-16 text-center sm:pt-32 sm:pb-24">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-red-900/10 blur-[120px]" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <button 
            onClick={onNavigateHome}
            className="group absolute top-0 left-0 flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/30 uppercase transition-all hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all group-hover:bg-white/10 group-hover:border-white/20">←</span>
            Back to Site
          </button>

          <div className="mb-6 flex flex-col items-center">
            <span className="mb-4 inline-block text-[10px] font-bold tracking-[0.6em] text-yellow-500 uppercase animate-blur-in">
              The Digital Experience
            </span>
            <h1 className="font-serif text-6xl font-bold tracking-tighter text-white sm:text-9xl animate-blur-in delay-100">
              Katalog <span className="text-white/20 italic">Menu</span>
            </h1>
          </div>

          <p className="mx-auto max-w-2xl text-lg text-white/40 animate-blur-in delay-200 leading-relaxed">
            Pilihlah cita rasa terbaik dari koleksi minuman dan makanan kami yang disiapkan khusus untuk memanjakan lidah Anda.
          </p>

          <div className="mt-16 flex flex-col items-center gap-8 animate-blur-in delay-300">
             {/* Filter Tabs */}
             <div className="flex flex-wrap justify-center gap-2 rounded-2xl bg-white/5 p-1.5 backdrop-blur-xl ring-1 ring-white/10">
              {MENU_FILTERS.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                    activeFilter === type
                      ? 'bg-yellow-500 text-black shadow-[0_10px_25px_-5px_rgba(234,179,8,0.3)]'
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {type === 'all' ? 'All Selection' : type === 'beverage' ? 'Signature Minuman' : 'Signature Food'}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Cari menu favorit Anda..."
                className="w-full rounded-2xl border border-white/5 bg-white/5 py-4 pl-14 pr-6 text-sm text-white placeholder-white/20 backdrop-blur-xl transition-all focus:border-yellow-500/30 focus:bg-white/10 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredItems.map((item, index) => renderMenuItem(item, index))}
          </div>

          {filteredItems.length === 0 && (
            <div className="py-32 text-center animate-blur-in">
              <div className="mb-6 text-6xl opacity-20">☕</div>
              <h3 className="text-xl font-bold text-white/60">Menu tidak ditemukan</h3>
              <p className="mt-2 text-white/30 italic">Coba kata kunci pencarian yang lain.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-40 border-t border-white/5 pt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black tracking-[0.5em] text-yellow-500 uppercase">Outlet Location</h4>
              <p className="text-lg font-bold text-white/80 leading-relaxed">
                {SITE_CONFIG.contact.address}
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black tracking-[0.5em] text-yellow-500 uppercase">Operating Hours</h4>
              <div className="space-y-1">
                <p className="text-lg font-bold text-white/80">{SITE_CONFIG.contact.openingHours}</p>
                <p className="text-sm text-white/40 font-medium italic">{SITE_CONFIG.contact.openingDays}</p>
              </div>
            </div>
            <div className="space-y-6 text-center md:text-right">
              <h4 className="text-[10px] font-black tracking-[0.5em] text-yellow-500 uppercase">Contact Us</h4>
              <p className="text-2xl font-serif font-bold text-white">{SITE_CONFIG.contact.displayPhone}</p>
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{SITE_CONFIG.websiteLabel}</p>
            </div>
          </div>
          
          <div className="mt-20 flex flex-col items-center justify-between border-t border-white/5 pt-12 sm:flex-row">
            <p className="text-[9px] font-bold tracking-[0.4em] text-white/20 uppercase">
              &copy; 2026 Warkop Azzahra. All Rights Reserved.
            </p>
            <div className="mt-6 flex gap-8 sm:mt-0">
               <span className="text-[9px] font-bold tracking-[0.4em] text-white/20 uppercase cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
               <span className="text-[9px] font-bold tracking-[0.4em] text-white/20 uppercase cursor-pointer hover:text-white transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      <ProductDetailModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        showQrisButton={false}
      />
    </div>
  );
};

export default MenuPage;
