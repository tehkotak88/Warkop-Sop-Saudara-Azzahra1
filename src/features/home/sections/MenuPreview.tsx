import { useMemo, useState, useEffect, useRef } from 'react';

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredItems = useMemo(
    () =>
      filterMenuItems({
        items: menuItems,
        searchQuery,
        type: activeType,
      }),
    [menuItems, activeType, searchQuery],
  );

  // Take the first item as the "Featured" item
  const featuredItem = filteredItems[0];
  const displayItems = filteredItems.slice(1, 7); // Show next 6 items in the grid

  return (
    <section 
      id="menu" 
      ref={sectionRef}
      className="relative overflow-hidden bg-[#080808] py-32 lg:py-48"
    >
      {/* Interactive Ambient Light */}
      <div 
        className="pointer-events-none absolute h-[600px] w-[600px] rounded-full bg-red-600/5 blur-[120px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
        }}
      />

      {/* Decorative Text Background */}
      <div className="absolute top-1/4 -left-20 pointer-events-none select-none opacity-[0.02] transform -rotate-90">
        <span className="font-serif text-[20rem] font-black text-white leading-none whitespace-nowrap">
          AZZAHRA MENU
        </span>
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Editorial Header */}
        <div className="mb-24 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl animate-blur-in">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-yellow-500" />
              <span className="text-[11px] font-black tracking-[0.6em] text-yellow-500 uppercase">
                Curated Selection
              </span>
            </div>
            <h2 className="font-serif text-6xl font-bold leading-[0.9] text-white md:text-8xl lg:text-9xl">
              Signature <br />
              <span className="text-white/20 italic">Collection</span>
            </h2>
          </div>
          
          <div className="flex flex-col items-start gap-6 md:items-end animate-blur-in delay-200">
             <p className="max-w-xs text-left text-sm leading-relaxed text-white/40 md:text-right">
               Setiap sajian adalah perpaduan antara tradisi dan inovasi yang kami ciptakan untuk pengalaman rasa yang tak terlupakan.
             </p>
             {/* Search/Filter Controls */}
             <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex rounded-2xl bg-white/5 p-1 backdrop-blur-xl ring-1 ring-white/10">
                  {(['beverage', 'food'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`rounded-xl px-8 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                        activeType === type
                          ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20'
                          : 'text-white/40 hover:text-white'
                      }`}
                    >
                      {type === 'beverage' ? 'Coffee' : 'Signature Food'}
                    </button>
                  ))}
                </div>
             </div>
          </div>
        </div>

        {/* Magazine Layout Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Featured Item - Large Card (Span 5) */}
          {featuredItem && (
            <div className="lg:col-span-5 animate-blur-in delay-300">
              <div 
                onClick={() => setSelectedItem(featuredItem)}
                className="group relative h-full cursor-pointer overflow-hidden rounded-[3rem] border border-white/5 bg-stone-900/40 p-4 backdrop-blur-sm transition-all hover:border-red-500/30"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem]">
                  <img 
                    src={featuredItem.imageUrl} 
                    alt={featuredItem.name}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  
                  {/* Floating Price Badge */}
                  <div className="absolute bottom-8 left-8">
                     <span className="mb-2 block text-[10px] font-bold tracking-widest text-yellow-500 uppercase">Recommended</span>
                     <h3 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">{featuredItem.name}</h3>
                     <div className="flex items-center gap-4">
                        <span className="rounded-full bg-white/10 px-6 py-2 text-xl font-bold text-white backdrop-blur-md">
                          {featuredItem.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
                        </span>
                        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-black transition-transform group-hover:scale-110">
                          →
                        </button>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Items - Bento Style (Span 7) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              {displayItems.map((item, index) => (
                <div key={item.id} className={`animate-blur-in`} style={{ animationDelay: `${500 + index * 100}ms` }}>
                  <MenuCard
                    item={item}
                    index={index}
                    onViewDetail={setSelectedItem}
                  />
                </div>
              ))}
            </div>
            
            {/* View All Section */}
            <div className="mt-12 flex flex-col items-center justify-between gap-8 rounded-[3rem] border border-white/5 bg-white/[0.02] p-10 backdrop-blur-sm md:flex-row">
               <div>
                  <h4 className="mb-2 text-xl font-bold text-white">Ingin lihat koleksi lengkap kami?</h4>
                  <p className="text-sm text-white/40">Tersedia lebih dari 40+ pilihan menu spesial.</p>
               </div>
               <button 
                 onClick={() => window.open('/digital-menu', '_blank')}
                 className="group flex items-center gap-4 rounded-full bg-white px-10 py-5 font-black text-black transition-all hover:bg-yellow-500 hover:scale-105 active:scale-95"
               >
                 LIHAT SEMUA MENU
                 <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:rotate-45">
                   →
                 </span>
               </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="py-32 text-center animate-blur-in">
            <p className="font-serif text-2xl text-white/20 italic">
              Menu tidak ditemukan.
            </p>
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
