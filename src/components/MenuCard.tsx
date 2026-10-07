import React from 'react';
import { MenuItem } from '../types';
import { Plus, Check, Clock, Flame, RotateCcw } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  onSelectItem: (item: MenuItem) => void;
  isInCart: boolean;
  isCategorySlotFilled?: boolean;
  onRemoveFromCart?: (itemId: string) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  onSelectItem,
  isInCart,
  isCategorySlotFilled = false
}) => {
  const handleClick = () => {
    onSelectItem(item);
  };

  const categoryLabel = 
    item.category === 'fastfood'
      ? 'Étape 1 • Fast-Food'
      : item.category === 'accompagnants'
      ? 'Étape 2 • Accompagnant'
      : 'Étape 3 • Dessert';

  return (
    <div 
      className={`group rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-2 shadow-xs transition-all flex flex-col justify-between relative ${
        isInCart
          ? 'bg-orange-50/90 border-orange-500 shadow-md ring-2 ring-orange-400/30'
          : 'bg-white border-slate-200/80 hover:border-orange-300 hover:shadow-md'
      }`}
    >
      {/* Selected badge */}
      {isInCart && (
        <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1 text-[10px] font-black shadow-md z-10 uppercase tracking-wider">
          <Check className="w-3 h-3 stroke-[3]" />
          <span>Choisi</span>
        </div>
      )}

      <div>
        {/* Card Image Container - Centered and framed for optimal food visibility */}
        <div 
          onClick={handleClick}
          className="relative aspect-[4/3] w-full min-h-[180px] overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-50 via-amber-50/60 to-orange-100/30 mb-3 cursor-pointer shadow-inner"
        >
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            style={{ objectPosition: item.imagePosition || 'center center' }}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800';
            }}
          />

          {/* Gradient overlay at bottom for text contrast */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

          {/* Badges on Image */}
          <div className="absolute top-2 left-2 flex items-center gap-1 max-w-[80%]">
            <span className="bg-slate-900/85 backdrop-blur-md text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-md uppercase tracking-wider">
              {categoryLabel}
            </span>
          </div>

          <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-slate-800 text-[10px] sm:text-[11px] font-bold flex items-center gap-1 shadow-md">
            <Clock className="w-3 h-3 text-orange-500" />
            <span>{item.prepTime}</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-1 mb-2.5 sm:mb-3">
          <div className="flex items-start justify-between gap-1.5">
            <div className="min-w-0 flex-1">
              <h3 
                onClick={handleClick}
                className="font-black text-sm sm:text-base text-slate-900 group-hover:text-orange-600 transition-colors leading-tight line-clamp-1 cursor-pointer"
              >
                {item.name}
              </h3>
              {item.tags.length > 0 && (
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.2 rounded border border-orange-200/60 uppercase tracking-wider">
                    {item.tags[0]}
                  </span>
                </div>
              )}
            </div>
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
          <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Offert ESP</div>
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
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-black shadow-xs uppercase tracking-wider flex items-center gap-1 transition-all active:scale-95"
            >
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
              <span>SÉLECTIONNÉ</span>
            </button>
          ) : isCategorySlotFilled ? (
            <button
              onClick={handleClick}
              className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-black shadow-xs uppercase tracking-wider flex items-center gap-1 transition-all active:scale-95"
              title="Remplacer le choix actuel pour cette étape"
            >
              <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
              <span>REMPLACER</span>
            </button>
          ) : (
            <button
              onClick={handleClick}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-black shadow-xs uppercase tracking-wider flex items-center gap-1 transition-all active:scale-95"
            >
              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
              <span>CHOISIR</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
