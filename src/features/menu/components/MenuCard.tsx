import { FC } from 'react';

import { formatCurrency } from '../../../lib/format';
import { MenuItem } from '../../../types/menu';
import Tilt3DCard from '../../../components/layout/Tilt3DCard';

interface MenuCardProps {
  item: MenuItem;
  index?: number;
  onViewDetail?: (item: MenuItem) => void;
}

const MenuCard: FC<MenuCardProps> = ({ item, index = 0, onViewDetail }) => {
  const animationDelay = `${(index % 12) * 60}ms`;

  return (
    <Tilt3DCard
      intensity={12}
      scale={1.05}
      className="h-full"
      glareEnabled={true}
    >
      <div
        onClick={() => onViewDetail?.(item)}
        className="group relative h-full cursor-pointer overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-stone-900/80 to-black/90 p-3 backdrop-blur-xl transition-all duration-500 hover:border-red-500/30 hover:shadow-[0_25px_50px_-12px_rgba(153,27,27,0.5)]"
        style={{
          animation: `blur-in 0.6s ease-out ${animationDelay} both`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Background Highlight */}
        <div className="absolute -inset-2 bg-gradient-to-tr from-red-600/0 via-red-600/0 to-red-600/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        
        {/* Image Container with Parallax */}
        <div className="tilt-child relative mb-4 aspect-[4/5] w-full overflow-hidden rounded-2xl bg-stone-800" data-depth="15">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
          
          {/* Badge with Parallax */}
          {item.category !== 'standard' && (
            <div className="tilt-child absolute top-3 left-3" data-depth="25">
              <span
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[8px] font-black tracking-[0.2em] text-white uppercase backdrop-blur-md shadow-2xl ${
                  item.category === 'best-seller'
                    ? 'bg-red-600/80 ring-1 ring-red-400/50'
                    : 'bg-stone-900/80 ring-1 ring-white/20'
                }`}
              >
                <span className={`h-1 w-1 rounded-full animate-pulse ${item.category === 'best-seller' ? 'bg-yellow-400' : 'bg-blue-400'}`} />
                {item.category === 'best-seller' ? 'Best Seller' : 'New Arrival'}
              </span>
            </div>
          )}
        </div>

        {/* Info Content with Parallax */}
        <div className="tilt-child relative space-y-2 px-1 text-center" data-depth="10">
          <h3 className="line-clamp-2 min-h-[2.5rem] text-[13px] font-bold leading-tight text-white/90 transition-colors group-hover:text-yellow-400 md:text-[14px]">
            {item.name}
          </h3>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-medium tracking-wider text-white/30 uppercase">IDR</span>
            <p className="font-serif text-lg font-bold text-white group-hover:scale-110 transition-transform duration-500">
              {formatCurrency(item.price).replace('Rp', '').trim()}
            </p>
          </div>
        </div>

        {/* Hover Action Button */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
           <div className="rounded-full bg-white/10 px-4 py-1.5 text-[9px] font-bold text-white backdrop-blur-md ring-1 ring-white/20">
             Tap for details
           </div>
        </div>
      </div>
    </Tilt3DCard>
  );
};

export default MenuCard;
