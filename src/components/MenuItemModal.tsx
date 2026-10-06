import React, { useState } from 'react';
import { MenuItem } from '../types';
import { X, Check, Flame, Clock, Sparkles, MessageSquare } from 'lucide-react';

interface MenuItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, selectedOptions: Record<string, string>, specialInstructions: string) => void;
  isInCart: boolean;
  cartCount: number;
  maxAllowed: number;
}

export const MenuItemModal: React.FC<MenuItemModalProps> = ({
  item,
  onClose,
  onAddToCart,
  isInCart,
  cartCount,
  maxAllowed
}) => {
  if (!item) return null;

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (item.options) {
      item.options.forEach(opt => {
        if (opt.choices.length > 0) {
          initial[opt.name] = opt.choices[0];
        }
      });
    }
    return initial;
  });

  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleOptionChange = (optionName: string, choice: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: choice
    }));
  };

  const handleConfirm = () => {
    onAddToCart(item, selectedOptions, specialInstructions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative bg-white border-2 border-orange-100 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl text-slate-800 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-52 w-full bg-orange-50 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-white/90 text-slate-800 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-orange-500 text-white text-xs font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                OFFERT (0 FCFA)
              </span>
              <span className="text-white text-xs font-bold flex items-center gap-1 bg-black/40 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                <Clock className="w-3 h-3 text-orange-400" />
                {item.prepTime}
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">{item.name}</h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
            {item.description}
          </p>

          {/* Value callout */}
          <div className="flex items-center justify-between p-3.5 bg-orange-50 rounded-2xl border-2 border-orange-200 text-xs">
            <div className="text-slate-600 font-bold">Prix habituel hors offre :</div>
            <div className="font-mono text-slate-400 line-through font-bold">{item.normalPrice.toLocaleString()} FCFA</div>
            <div className="font-black text-orange-600 bg-white px-2.5 py-0.5 rounded-full border border-orange-200">
              0 FCFA (Pris en charge)
            </div>
          </div>

          {/* Options Customization */}
          {item.options && item.options.length > 0 && (
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-orange-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Personnalisez votre plat</span>
              </h3>

              {item.options.map((opt, idx) => (
                <div key={idx} className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 block">
                    {opt.name}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {opt.choices.map((choice, cIdx) => {
                      const isSelected = selectedOptions[opt.name] === choice;
                      return (
                        <button
                          key={cIdx}
                          type="button"
                          onClick={() => handleOptionChange(opt.name, choice)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-bold text-left border-2 transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-orange-50 border-orange-500 text-orange-600'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-orange-200'
                          }`}
                        >
                          <span>{choice}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-orange-600 shrink-0 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Special Instructions Note */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-orange-500" />
              <span>Remarque ou allergie (Optionnel)</span>
            </label>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Ex : Pas d'oignons, piment à part, servir très chaud..."
              rows={2}
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t-2 border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Quota Panier</div>
            <div className="text-xs font-black text-orange-600">
              {cartCount}/{maxAllowed} articles
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-600 hover:bg-slate-200 transition-colors uppercase tracking-wider"
            >
              Annuler
            </button>
            <button
              onClick={handleConfirm}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black px-5 py-2.5 rounded-xl text-xs shadow-md uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
            >
              {isInCart ? 'Mettre à jour' : 'Ajouter gratuitement'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
