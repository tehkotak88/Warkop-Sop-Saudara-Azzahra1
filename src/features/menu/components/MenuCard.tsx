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
      intensity={10}
      scale={1.08}
      className="h-full"
      glareEnabled={true}
    >
      <div
        onClick={() => onViewDetail?.(item)}
        className="group relative h-full cursor-pointer overflow-hidden rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-stone-900/40 to-black/60 p-4 backdrop-blur-md transition-all duration-700 hover:border-yellow-500/30"
        style={{
          animation: `blur-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${animationDelay} both`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Subtle Shimmer Effect */}
        <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
        
        {/* Image Container */}
        <div className="tilt-child relative mb-6 aspect-square w-full overflow-hidden rounded-[2rem] bg-stone-900 ring-1 ring-white/5 transition-all duration-700 group-hover:ring-yellow-500/20" data-depth="15">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Category Tag */}
          {item.category !== 'standard' && (
            <div className="absolute bottom-3 left-3">
              <span className="rounded-full bg-black/60 px-3 py-1 text-[7px] font-black tracking-widest text-white uppercase backdrop-blur-md ring-1 ring-white/10">
                {item.category === 'best-seller' ? 'Best Seller' : 'New'}
              </span>
            </div>
          )}
        </div>

        {/* Minimal Info */}
        <div className="tilt-child space-y-3 px-1" data-depth="10">
          <h3 className="line-clamp-1 text-[13px] font-bold tracking-wide text-white/90 transition-colors group-hover:text-yellow-400">
            {item.name}
          </h3>
          <div className="flex items-end justify-between">
            <p className="font-serif text-lg font-black text-white">
              {formatCurrency(item.price).replace('Rp', '').trim()}
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/20 transition-all group-hover:bg-yellow-500 group-hover:text-black group-hover:rotate-45">
               <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
               </svg>
            </div>
          </div>
        </div>
      </div>
    </Tilt3DCard>
  );
};

export default MenuCard;
