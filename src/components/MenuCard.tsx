import React from 'react';
import { MenuItem } from '../types';
import { Plus, Check, Clock, Flame, Tag, AlertTriangle } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  onSelectItem: (item: MenuItem) => void;
  isInCart: boolean;
  cartCount: number;
  maxAllowed: number;
  onQuotaLimitReached: () => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  onSelectItem,
  isInCart,
  cartCount,
  maxAllowed,
  onQuotaLimitReached
}) => {
  const isFull = cartCount >= maxAllowed;

  const handleClick = () => {
    if (isFull && !isInCart) {
      onQuotaLimitReached();
    } else {
      onSelectItem(item);
    }
  };

  return (
    <div 
      className={`group rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-2 shadow-xs transition-all flex flex-col justify-between relative ${
        isInCart
          ? 'bg-orange-50 border-orange-400 shadow-sm'
          : isFull
          ? 'bg-white border-slate-100 opacity-60'
          : 'bg-white border-slate-100 hover:border-orange-300 hover:shadow-md'
      }`}
    >
      {/* Selected Quantity badge like design HTML */}
      {isInCart && (
        <div className="absolute top-2 right-2 bg-orange-500 text-white w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-black shadow-md z-10">
          1
        </div>
      )}

      <div>
        {/* Card Image Container */}
        <div className="relative h-36 sm:h-40 md:h-44 w-full overflow-hidden rounded-xl sm:rounded-2xl bg-orange-50 mb-2.5 sm:mb-3">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800';
            }}
          />

          {/* Badges on Image */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[70%]">
            {item.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-orange-500/95 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider truncate"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-slate-800 text-[10px] sm:text-[11px] font-bold flex items-center gap-1 shadow-xs">
            <Clock className="w-3 h-3 text-orange-500" />
            <span>{item.prepTime}</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-1 mb-2.5 sm:mb-3">
          <div className="flex items-start justify-between gap-1.5">
            <h3 className="font-black text-sm sm:text-lg text-slate-800 group-hover:text-orange-600 transition-colors leading-tight line-clamp-1">
              {item.name}
            </h3>
            {item.spicyLevel && item.spicyLevel !== 'none' && (
              <span 
                className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-bold shrink-0 flex items-center gap-0.5 ${
                  item.spicyLevel === 'spicy'
                    ? 'bg-red-100 text-red-600 border border-red-200'
                    : 'bg-orange-100 text-orange-700 border border-orange-200'
                }`}
              >
                <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                {item.spicyLevel === 'spicy' ? 'Épicé' : 'Doux'}
              </span>
            )}
          </div>

          <p className="text-slate-500 text-[11px] sm:text-xs line-clamp-2 leading-relaxed font-medium">
            {item.description}
          </p>
        </div>
      </div>

      {/* Footer / Price & Add Action */}
      <div className="pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between mt-auto gap-2">
        <div>
          <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Prix Habituel</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-slate-400 text-[11px] sm:text-xs line-through font-mono">
              {item.normalPrice.toLocaleString()} FCFA
            </span>
            <span className="text-orange-600 text-xs sm:text-sm font-black">
              0 FCFA
            </span>
          </div>
        </div>

        <div>
          {isInCart ? (
            <button
              onClick={handleClick}
              className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-black shadow-xs uppercase tracking-wider flex items-center gap-1 transition-all active:scale-95"
            >
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
              <span>RETIRER</span>
            </button>
          ) : isFull ? (
            <div className="bg-slate-100 text-slate-400 px-2.5 py-1.5 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-tight border border-slate-200">
              LIMITE ATTEINTE
            </div>
          ) : (
            <button
              onClick={handleClick}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-black shadow-xs uppercase tracking-wider flex items-center gap-1 transition-all active:scale-95"
            >
              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
              <span>AJOUTER</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
