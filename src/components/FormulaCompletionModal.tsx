import React from 'react';
import { CartItem } from '../types';
import { X, CheckCircle2, ArrowRight, Sparkles, Utensils, Pizza, IceCream, RotateCcw } from 'lucide-react';

interface FormulaCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  fastFood?: CartItem;
  accompagnant?: CartItem;
  dessert?: CartItem;
  onProceedToCheckout: () => void;
  onModifyChoices: () => void;
}

export const FormulaCompletionModal: React.FC<FormulaCompletionModalProps> = ({
  isOpen,
  onClose,
  fastFood,
  accompagnant,
  dessert,
  onProceedToCheckout,
  onModifyChoices
}) => {
  if (!isOpen) return null;

  const totalNormalPrice = 
    (fastFood?.menuItem.normalPrice || 0) +
    (accompagnant?.menuItem.normalPrice || 0) +
    (dessert?.menuItem.normalPrice || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white border-2 border-orange-200 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl text-slate-800 relative flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 p-5 sm:p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-15">
            <Sparkles className="w-32 h-32" />
          </div>

          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/20 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Menu Complet 3/3 Validé</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            Votre formule est complète !
          </h2>
          <p className="text-xs sm:text-sm text-orange-100 font-medium mt-1">
            Chaque étudiant a droit à 1 Fast-Food, 1 Accompagnant et 1 Dessert.
          </p>
        </div>

        {/* Selected 3 Items Summary */}
        <div className="p-4 sm:p-6 space-y-3.5 overflow-y-auto custom-scrollbar flex-1">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>Composition de votre commande</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Gratuit
            </span>
          </div>

          {/* 1. Fast Food */}
          <div className="flex items-center gap-3 p-3 bg-orange-50/70 border border-orange-200 rounded-2xl">
            {fastFood?.menuItem.image ? (
              <img 
                src={fastFood.menuItem.image} 
                alt={fastFood.menuItem.name}
                style={{ objectPosition: fastFood.menuItem.imagePosition || 'center center' }}
                className="w-14 h-14 rounded-xl object-cover object-center shrink-0 border border-orange-200 shadow-xs"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-orange-200 flex items-center justify-center text-orange-700 shrink-0">
                <Pizza className="w-6 h-6" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-black text-orange-600 uppercase tracking-wider flex items-center gap-1">
                <span>1. Fast-Food</span>
                <span className="text-slate-400 font-normal">• 1 seul</span>
              </div>
              <h4 className="font-black text-sm text-slate-900 truncate">
                {fastFood ? fastFood.menuItem.name : 'Non sélectionné'}
              </h4>
              {fastFood && Object.keys(fastFood.selectedOptions).length > 0 && (
                <div className="text-[10px] text-slate-500 truncate">
                  {Object.values(fastFood.selectedOptions).join(', ')}
                </div>
              )}
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] line-through text-slate-400 font-mono">
                {fastFood?.menuItem.normalPrice.toLocaleString()} FCFA
              </div>
              <div className="text-xs font-black text-orange-600">0 FCFA</div>
            </div>
          </div>

          {/* 2. Accompagnant */}
          <div className="flex items-center gap-3 p-3 bg-amber-50/70 border border-amber-200 rounded-2xl">
            {accompagnant?.menuItem.image ? (
              <img 
                src={accompagnant.menuItem.image} 
                alt={accompagnant.menuItem.name}
                style={{ objectPosition: accompagnant.menuItem.imagePosition || 'center center' }}
                className="w-14 h-14 rounded-xl object-cover object-center shrink-0 border border-amber-200 shadow-xs"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                <Utensils className="w-6 h-6" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-black text-amber-700 uppercase tracking-wider flex items-center gap-1">
                <span>2. Accompagnant</span>
                <span className="text-slate-400 font-normal">• 1 seul</span>
              </div>
              <h4 className="font-black text-sm text-slate-900 truncate">
                {accompagnant ? accompagnant.menuItem.name : 'Non sélectionné'}
              </h4>
              {accompagnant && Object.keys(accompagnant.selectedOptions).length > 0 && (
                <div className="text-[10px] text-slate-500 truncate">
                  {Object.values(accompagnant.selectedOptions).join(', ')}
                </div>
              )}
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] line-through text-slate-400 font-mono">
                {accompagnant?.menuItem.normalPrice.toLocaleString()} FCFA
              </div>
              <div className="text-xs font-black text-amber-700">0 FCFA</div>
            </div>
          </div>

          {/* 3. Dessert */}
          <div className="flex items-center gap-3 p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
            {dessert?.menuItem.image ? (
              <img 
                src={dessert.menuItem.image} 
                alt={dessert.menuItem.name}
                style={{ objectPosition: dessert.menuItem.imagePosition || 'center center' }}
                className="w-14 h-14 rounded-xl object-cover object-center shrink-0 border border-emerald-200 shadow-xs"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                <IceCream className="w-6 h-6" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-black text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                <span>3. Dessert</span>
                <span className="text-slate-400 font-normal">• 1 seul</span>
              </div>
              <h4 className="font-black text-sm text-slate-900 truncate">
                {dessert ? dessert.menuItem.name : 'Non sélectionné'}
              </h4>
              {dessert && Object.keys(dessert.selectedOptions).length > 0 && (
                <div className="text-[10px] text-slate-500 truncate">
                  {Object.values(dessert.selectedOptions).join(', ')}
                </div>
              )}
            </div>
            <div className="text-right shrink-0">
              <div className="text-[10px] line-through text-slate-400 font-mono">
                {dessert?.menuItem.normalPrice.toLocaleString()} FCFA
              </div>
              <div className="text-xs font-black text-emerald-700">0 FCFA</div>
            </div>
          </div>

          {/* Total & Subvention Banner */}
          <div className="p-3.5 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Total Commande</div>
              <div className="text-xs text-orange-300">
                Valeur : <span className="line-through font-mono">{totalNormalPrice.toLocaleString()} FCFA</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-extrabold text-emerald-400 uppercase">Subvention ESP</div>
              <div className="text-xl font-black text-white">0 FCFA</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={() => {
              onClose();
              onModifyChoices();
            }}
            className="w-full sm:w-auto px-4 py-3 rounded-2xl text-xs font-extrabold text-slate-700 hover:bg-slate-200 transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Modifier</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onProceedToCheckout();
            }}
            className="w-full flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black py-3.5 px-5 rounded-2xl shadow-lg shadow-orange-500/30 uppercase tracking-wider text-xs sm:text-sm transition-all transform hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>Commander directement (0 FCFA)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
