import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ShieldCheck, ArrowRight, Lock, Sparkles, AlertCircle } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  maxAllowed: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  maxAllowed
}) => {
  if (!isOpen) return null;

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalValueSaved = items.reduce((sum, item) => sum + item.menuItem.normalPrice * item.quantity, 0);
  const isQuotaFull = totalItemCount >= maxAllowed;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-slate-900 text-white shadow-2xl flex flex-col p-4 sm:p-6 rounded-none sm:rounded-l-3xl">
          {/* Header */}
          <div className="pb-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white font-black flex items-center justify-center shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-black text-lg text-white uppercase tracking-wide">TA COMMANDE</h2>
                <p className="text-xs font-extrabold text-orange-400 uppercase tracking-widest">Offre 100% Gratuite</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 3-Item Quota Progress Gauge like in Vibrant Palette design HTML */}
          <div className="py-4 border-b border-slate-800">
            <div className="flex justify-between text-xs text-slate-300 font-bold mb-1.5">
              <span className="uppercase tracking-wider">Items Sélectionnés</span>
              <span className="font-mono text-orange-400">{totalItemCount} / {maxAllowed}</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div
                className="bg-orange-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min((totalItemCount / maxAllowed) * 100, 100)}%` }}
              />
            </div>

            {isQuotaFull ? (
              <p className="text-[11px] text-orange-400 mt-2 flex items-center gap-1 font-bold bg-orange-500/10 p-2 rounded-xl border border-orange-500/20">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>Quota de 3 articles atteint ! Prêt à valider.</span>
              </p>
            ) : (
              <p className="text-[11px] text-slate-400 mt-2 font-medium">
                En attente de <strong>{maxAllowed - totalItemCount}</strong> choix supplémentaire(s)...
              </p>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto py-5 space-y-3 custom-scrollbar">
            {items.length === 0 ? (
              <div className="text-center py-12 px-4 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 mx-auto flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="font-black text-white text-sm uppercase">Votre panier est vide</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Ajoutez 3 éléments du menu (Plat, Boisson, Dessert) offerts par l'ESP !
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3.5 relative group transition-all hover:border-orange-500/50"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-900 border border-slate-700"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-black text-sm text-white truncate">
                          {item.menuItem.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-red-400 p-1 rounded transition-colors"
                          title="Supprimer l'article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Selected Options display */}
                      {Object.keys(item.selectedOptions).length > 0 && (
                        <div className="text-[10px] text-orange-300 mt-0.5 space-y-0.5">
                          {Object.entries(item.selectedOptions).map(([key, val]) => (
                            <div key={key}>
                              • {key}: <span className="font-bold">{val}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.specialInstructions && (
                        <div className="text-[10px] text-slate-400 italic mt-0.5 line-clamp-1">
                          "{item.specialInstructions}"
                        </div>
                      )}

                      {/* Price tag */}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-[11px] font-mono line-through text-slate-500">
                          {item.menuItem.normalPrice.toLocaleString()} FCFA
                        </div>
                        <div className="text-xs font-black text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-lg border border-orange-500/20 uppercase">
                          OFFERT
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="pt-4 border-t border-slate-800 space-y-4 mt-auto">
              {/* Value Summary */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Valeur totale :</span>
                  <span className="font-mono line-through">{totalValueSaved.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-orange-400 font-bold">
                  <span>Prise en charge ESP :</span>
                  <span>- {totalValueSaved.toLocaleString()} FCFA</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="font-black text-sm text-white uppercase">Total à payer :</span>
                  <span className="font-black text-xl text-orange-400">0 FCFA</span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-800 p-3 rounded-2xl border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Reçu QR Code généré dès la validation.</span>
              </div>

              {/* Action */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onClearCart}
                  className="p-3.5 text-slate-400 hover:text-red-400 rounded-2xl hover:bg-slate-800 border border-slate-700 text-xs transition-colors"
                  title="Vider le panier"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onProceedToCheckout();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-4 rounded-2xl shadow-lg shadow-orange-900/30 uppercase tracking-widest text-xs transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Commander Maintenant (0 FCFA)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
