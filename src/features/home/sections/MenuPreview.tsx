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
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-[20%] h-[500px] w-[500px] rounded-full bg-red-900/8 blur-[180px]" />
        <div className="absolute bottom-0 right-[10%] h-[400px] w-[400px] rounded-full bg-yellow-900/5 blur-[150px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 text-center animate-blur-in">
          <span className="mb-4 inline-block text-[10px] font-bold tracking-[0.5em] text-yellow-400/70 uppercase">
            Daftar Pilihan
          </span>
          <h2 className="font-serif text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            Katalog{' '}
            <span className="font-serif text-white/30 italic">Menu</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/60">
            Temukan berbagai pilihan minuman dan makanan spesial yang kami sajikan dengan sepenuh hati
          </p>
        </div>

        {/* Type Tabs */}
        <div className="mb-10 flex justify-center animate-blur-in">
          <div className="inline-flex rounded-full border border-stone-800 bg-stone-900/50 p-1 backdrop-blur-sm">
            <button
              onClick={() => setActiveType('beverage')}
              className={`flex items-center gap-2 rounded-full px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                activeType === 'beverage'
                  ? 'bg-red-800 text-white shadow-lg shadow-red-900/30'
                  : 'text-stone-500 hover:text-white'
              }`}
            >
              ☕ Minuman
            </button>
            <button
              onClick={() => setActiveType('food')}
              className={`flex items-center gap-2 rounded-full px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                activeType === 'food'
                  ? 'bg-red-800 text-white shadow-lg shadow-red-900/30'
                  : 'text-stone-500 hover:text-white'
              }`}
            >
              🍽️ Makanan
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mx-auto mb-12 max-w-md animate-blur-in delay-100">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={`Cari ${activeType === 'beverage' ? 'minuman' : 'makanan'}...`}
              className="w-full rounded-xl border border-stone-800 bg-stone-900/50 py-3.5 pl-11 pr-5 text-sm text-white placeholder-stone-600 backdrop-blur-sm transition-all focus:border-red-800 focus:ring-2 focus:ring-red-800/20 focus:outline-none"
            />
          </div>
        </div>

        {/* Menu Grid - white cards on dark bg */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-6">
          {filteredItems.map((item, index) => (
            <MenuCard
              key={item.id}
              item={item}
              index={index}
              onViewDetail={setSelectedItem}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="animate-blur-in rounded-2xl border border-red-900 bg-red-900/30 py-16 text-center">
            <p className="font-serif text-lg text-white/50 italic">
              Menu tidak ditemukan.
            </p>
          </div>
        )}
      </div>

      <ProductDetailModal
        isOpen={Boolean(selectedItem)}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
};

export default MenuPreview;
