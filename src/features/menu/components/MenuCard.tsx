import { FC, useCallback, useRef } from 'react';

import { useRevealOnIntersect } from '../../../hooks/useRevealOnIntersect';
import { formatCurrency } from '../../../lib/format';
import { MenuItem } from '../../../types/menu';

interface MenuCardProps {
  item: MenuItem;
  index?: number;
  onViewDetail?: (item: MenuItem) => void;
}

const MenuCard: FC<MenuCardProps> = ({ item, index = 0, onViewDetail }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isVisible = useRevealOnIntersect(elementRef);
  const animationDelay = `${(index % 12) * 60}ms`;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = elementRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = elementRef.current;
    if (card) {
      card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  }, []);

  return (
    <div
      ref={elementRef}
      onClick={() => onViewDetail?.(item)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/60 p-2.5 backdrop-blur-sm transition-all duration-300 hover:border-red-800/40 hover:shadow-[0_15px_40px_-10px_rgba(153,27,27,0.2)] ${
        isVisible ? 'animate-blur-in' : 'opacity-0'
      }`}
      style={{
        animationDelay: isVisible ? animationDelay : '0ms',
        animationFillMode: 'forwards',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-xl bg-stone-800">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {item.category !== 'standard' && (
          <div className="absolute top-2 left-2">
            <span
              className={`rounded-full px-2.5 py-1 text-[7px] font-black tracking-widest text-white uppercase ${
                item.category === 'best-seller'
                  ? 'bg-gradient-to-r from-red-800 to-red-700 shadow-sm shadow-red-900/30'
                  : 'bg-white/15 backdrop-blur-sm'
              }`}
            >
              {item.category === 'best-seller' ? '🔥 HOT' : '✨ NEW'}
            </span>
          </div>
        )}
      </div>

      <div className="px-1 text-center">
        <h3 className="mb-1 line-clamp-1 text-[11px] font-bold text-white/90 transition-colors group-hover:text-yellow-300 md:text-[12px]">
          {item.name}
        </h3>
        <p className="text-[12px] font-black text-white">
          {formatCurrency(item.price)}
        </p>
      </div>
    </div>
  );
};

export default MenuCard;
