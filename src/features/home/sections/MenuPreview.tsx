import { useMemo, useState } from 'react';

import { useMenu } from '../../../app/MenuContext';
import { filterMenuItems } from '../../../lib/menu';
import { MenuItem, MenuType } from '../../../types/menu';
import MenuCard from '../../menu/components/MenuCard';
import ProductDetailModal from '../../menu/components/ProductDetailModal';

const MenuPreview = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<MenuType>('beverage');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { menuItems } = useMenu();

  const filteredItems = useMemo(
    () =>
      filterMenuItems({
        items: menuItems,
        searchQuery,
        type: activeType,
      }),
    [menuItems, activeType, searchQuery],
  );

  return (
    <section id="menu" className="relative overflow-hidden bg-red-950 py-28 lg:py-36">
      {/* Dynamic Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] h-[60%] w-[60%] rounded-full bg-red-900/10 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[5%] h-[50%] w-[50%] rounded-full bg-yellow-900/5 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,5,5,0.4)_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="mb-20 flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-3 animate-blur-in">
            <div className="h-px w-8 bg-yellow-500/50" />
            <span className="text-[10px] font-black tracking-[0.5em] text-yellow-500 uppercase">
              The Collection
            </span>
            <div className="h-px w-8 bg-yellow-500/50" />
          </div>
          
          <h2 className="mb-6 font-serif text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl animate-blur-in delay-100">
            Daftar <span className="text-white/20 italic">Menu</span>
          </h2>
          
          <p className="mx-auto max-w-xl text-lg text-white/50 animate-blur-in delay-200">
            Pilihan cita rasa autentik yang dikurasi khusus untuk menemani setiap momen santai Anda.
          </p>
        </div>

        {/* Controls Bar: Tabs + Search */}
        <div className="mb-16 flex flex-col items-center gap-8 md:flex-row md:justify-between animate-blur-in delay-300">
          {/* Custom Glass Tabs */}
          <div className="flex rounded-2xl bg-white/5 p-1.5 backdrop-blur-md ring-1 ring-white/10">
            {(['beverage', 'food'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`relative flex items-center gap-3 rounded-xl px-10 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                  activeType === type
                    ? 'text-red-950'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {activeType === type && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 shadow-[0_10px_20px_-5px_rgba(234,179,8,0.4)]" />
                )}
                <span className="relative z-10">
                  {type === 'beverage' ? '☕ Coffee & Drinks' : '🍽️ Signature Food'}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full max-w-sm">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={`Search in ${activeType}...`}
              className="w-full rounded-2xl border border-white/5 bg-white/5 py-4 pl-14 pr-6 text-sm text-white placeholder-white/20 backdrop-blur-md transition-all focus:border-yellow-500/50 focus:bg-white/10 focus:outline-none"
            />
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {filteredItems.map((item, index) => (
            <MenuCard
              key={item.id}
              item={item}
              index={index}
              onViewDetail={setSelectedItem}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="animate-blur-in flex flex-col items-center justify-center rounded-[3rem] border border-white/5 bg-white/5 py-24 text-center backdrop-blur-sm">
            <div className="mb-6 text-5xl">🔭</div>
            <h3 className="mb-2 text-xl font-bold text-white">Menu tidak ditemukan</h3>
            <p className="text-white/40 italic">Coba gunakan kata kunci pencarian yang lain.</p>
          </div>
        )}
      </div>

      <ProductDetailModal
        isOpen={Boolean(selectedItem)}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        showQrisButton={false}
      />
    </section>
  );
};

export default MenuPreview;
