import React from 'react';
import { CartItem, Category } from '../types';
import { X, Trash2, ShoppingBag, ShieldCheck, ArrowRight, Sparkles, Check, Pizza, Utensils, IceCream, Plus } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  maxAllowed: number;
  onSelectCategory?: (cat: Category) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onSelectCategory
}) => {
  if (!isOpen) return null;

  const fastFood = items.find(i => i.menuItem.category === 'fastfood');
  const accompagnant = items.find(i => i.menuItem.category === 'accompagnants');
  const dessert = items.find(i => i.menuItem.category === 'desserts');

  const totalItemCount = (fastFood ? 1 : 0) + (accompagnant ? 1 : 0) + (dessert ? 1 : 0);
  const totalValueSaved = items.reduce((sum, item) => sum + item.menuItem.normalPrice * item.quantity, 0);
  const isFormulaComplete = totalItemCount === 3;

  const handlePickCategory = (cat: Category) => {
    onClose();
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-slate-900 text-white shadow-2xl flex flex-col p-4 sm:p-6 rounded-none sm:rounded-l-3xl">
          {/* Header */}
          <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white font-black flex items-center justify-center shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-black text-lg text-white uppercase tracking-wide">Formule Étudiant</h2>
                <p className="text-xs font-extrabold text-orange-400 uppercase tracking-widest">1 Fast-Food + 1 Accompagnant + 1 Dessert</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 3-Step Quota Progress Gauge */}
          <div className="py-3.5 border-b border-slate-800">
            <div className="flex justify-between text-xs text-slate-300 font-bold mb-1.5">
              <span className="uppercase tracking-wider">Progression de la Formule</span>
              <span className="font-mono text-orange-400 font-black">{totalItemCount} / 3</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className={`h-2 rounded-full transition-all duration-300 ${fastFood ? 'bg-orange-500 shadow-sm' : 'bg-slate-800'}`} />
              <div className={`h-2 rounded-full transition-all duration-300 ${accompagnant ? 'bg-amber-500 shadow-sm' : 'bg-slate-800'}`} />
              <div className={`h-2 rounded-full transition-all duration-300 ${dessert ? 'bg-emerald-500 shadow-sm' : 'bg-slate-800'}`} />
            </div>

            {isFormulaComplete ? (
              <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1.5 font-bold bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
                <Check className="w-3.5 h-3.5 shrink-0 stroke-[3]" />
                <span>Formule complète 3/3 ! Prête pour la commande.</span>
              </p>
            ) : (
              <p className="text-[11px] text-slate-400 mt-2 font-medium">
                Complétez les 3 étapes offertes avant de valider.
              </p>
            )}
          </div>

          {/* 3 Structured Slots */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3 custom-scrollbar">
            {/* Slot 1: Fast Food */}
            <div className={`p-3.5 rounded-2xl border transition-all ${
              fastFood 
                ? 'bg-slate-800/90 border-orange-500/50' 
                : 'bg-slate-800/40 border-dashed border-slate-700'
            }`}>
              <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider mb-2 text-orange-400">
                <span className="flex items-center gap-1.5">
                  <Pizza className="w-3.5 h-3.5" />
                  <span>1. Fast-Food (1 seul)</span>
                </span>
                {fastFood && (
                  <button
                    onClick={() => onRemoveItem(fastFood.id)}
                    className="text-slate-400 hover:text-red-400 p-1"
                    title="Retirer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {fastFood ? (
                <div className="flex gap-2.5">
                  <img
                    src={fastFood.menuItem.image}
                    alt={fastFood.menuItem.name}
                    style={{ objectPosition: fastFood.menuItem.imagePosition || 'center center' }}
                    className="w-14 h-14 rounded-xl object-cover object-center shrink-0 bg-slate-900 border border-slate-700"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-sm text-white truncate">{fastFood.menuItem.name}</h4>
                    {Object.keys(fastFood.selectedOptions).length > 0 && (
                      <div className="text-[10px] text-orange-300">
                        {Object.values(fastFood.selectedOptions).join(', ')}
                      </div>
                    )}
                    <div className="text-[10px] text-emerald-400 font-bold mt-1">✓ Offert (0 FCFA)</div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handlePickCategory('fastfood')}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 hover:bg-orange-500/20 text-slate-300 hover:text-orange-400 border border-slate-700 hover:border-orange-500 transition-all text-xs font-bold"
                >
                  <span className="flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-orange-400" />
                    <span>Choisir mon Fast-Food</span>
                  </span>
                  <span>→</span>
                </button>
              )}
            </div>

            {/* Slot 2: Accompagnant */}
            <div className={`p-3.5 rounded-2xl border transition-all ${
              accompagnant 
                ? 'bg-slate-800/90 border-amber-500/50' 
                : 'bg-slate-800/40 border-dashed border-slate-700'
            }`}>
              <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider mb-2 text-amber-400">
                <span className="flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>2. Accompagnant (1 seul)</span>
                </span>
                {accompagnant && (
                  <button
                    onClick={() => onRemoveItem(accompagnant.id)}
                    className="text-slate-400 hover:text-red-400 p-1"
                    title="Retirer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {accompagnant ? (
                <div className="flex gap-2.5">
                  <img
                    src={accompagnant.menuItem.image}
                    alt={accompagnant.menuItem.name}
                    style={{ objectPosition: accompagnant.menuItem.imagePosition || 'center center' }}
                    className="w-14 h-14 rounded-xl object-cover object-center shrink-0 bg-slate-900 border border-slate-700"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-sm text-white truncate">{accompagnant.menuItem.name}</h4>
                    {Object.keys(accompagnant.selectedOptions).length > 0 && (
                      <div className="text-[10px] text-amber-300">
                        {Object.values(accompagnant.selectedOptions).join(', ')}
                      </div>
                    )}
                    <div className="text-[10px] text-emerald-400 font-bold mt-1">✓ Offert (0 FCFA)</div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handlePickCategory('accompagnants')}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 border border-slate-700 hover:border-amber-500 transition-all text-xs font-bold"
                >
                  <span className="flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>Choisir mon Accompagnant</span>
                  </span>
                  <span>→</span>
                </button>
              )}
            </div>

            {/* Slot 3: Dessert */}
            <div className={`p-3.5 rounded-2xl border transition-all ${
              dessert 
                ? 'bg-slate-800/90 border-emerald-500/50' 
                : 'bg-slate-800/40 border-dashed border-slate-700'
            }`}>
              <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider mb-2 text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <IceCream className="w-3.5 h-3.5" />
                  <span>3. Dessert (1 seul)</span>
                </span>
                {dessert && (
                  <button
                    onClick={() => onRemoveItem(dessert.id)}
                    className="text-slate-400 hover:text-red-400 p-1"
                    title="Retirer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {dessert ? (
                <div className="flex gap-2.5">
                  <img
                    src={dessert.menuItem.image}
                    alt={dessert.menuItem.name}
                    style={{ objectPosition: dessert.menuItem.imagePosition || 'center center' }}
                    className="w-14 h-14 rounded-xl object-cover object-center shrink-0 bg-slate-900 border border-slate-700"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-sm text-white truncate">{dessert.menuItem.name}</h4>
                    {Object.keys(dessert.selectedOptions).length > 0 && (
                      <div className="text-[10px] text-emerald-300">
                        {Object.values(dessert.selectedOptions).join(', ')}
                      </div>
                    )}
                    <div className="text-[10px] text-emerald-400 font-bold mt-1">✓ Offert (0 FCFA)</div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handlePickCategory('desserts')}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border border-slate-700 hover:border-emerald-500 transition-all text-xs font-bold"
                >
                  <span className="flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-emerald-400" />
                    <span>Choisir mon Dessert</span>
                  </span>
                  <span>→</span>
                </button>
              )}
            </div>
          </div>

          {/* Footer & Checkout */}
          <div className="pt-4 border-t border-slate-800 space-y-3 mt-auto">
            {/* Value Summary */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Valeur totale :</span>
                <span className="font-mono line-through">{totalValueSaved.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>Subvention Intégrale ESP :</span>
                <span>- {totalValueSaved.toLocaleString()} FCFA</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                <span className="font-black text-sm text-white uppercase">Total à payer :</span>
                <span className="font-black text-xl text-emerald-400">0 FCFA</span>
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="p-3.5 text-slate-400 hover:text-red-400 rounded-2xl hover:bg-slate-800 border border-slate-700 text-xs transition-colors"
                  title="Vider le panier"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                disabled={!isFormulaComplete}
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className={`flex-1 flex items-center justify-center gap-2 font-black py-4 px-4 rounded-2xl shadow-lg uppercase tracking-wider text-xs transition-all ${
                  isFormulaComplete
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-orange-900/30 transform hover:scale-[1.01] active:scale-[0.99]'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                <span>{isFormulaComplete ? 'Commander directement (0 FCFA)' : `Compléter les 3 choix (${totalItemCount}/3)`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
