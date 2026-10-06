import React from 'react';
import { X, Lock, ShoppingBag, Sparkles, Check } from 'lucide-react';

interface QuotaNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCart: () => void;
  maxAllowed: number;
}

export const QuotaNoticeModal: React.FC<QuotaNoticeModalProps> = ({
  isOpen,
  onClose,
  onOpenCart,
  maxAllowed
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white border-2 border-orange-100 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl text-slate-800 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-4 pt-2">
          <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white font-black mx-auto flex items-center justify-center shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Offre Nouveaux Étudiants ESP</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Quota de {maxAllowed} articles atteint !
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
              En tant que nouvel étudiant, tu bénéficies de <strong>{maxAllowed} articles offerts à 100%</strong> dans ta commande d'intégration (ex: 1 Plat principal + 1 Boisson + 1 Dessert).
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 p-3.5 rounded-2xl text-xs text-left text-slate-700 space-y-1.5 font-medium">
            <div className="font-black text-orange-600 uppercase tracking-wider">💡 Pour changer de plat :</div>
            <p>Ouvre ton panier pour retirer un article existant avant d'en sélectionner un nouveau.</p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl text-xs font-extrabold text-slate-600 hover:bg-slate-100 transition-colors uppercase tracking-wider"
            >
              Fermer
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenCart();
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black py-3 px-4 rounded-xl text-xs shadow-md uppercase tracking-wider transition-transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Mon panier ({maxAllowed}/{maxAllowed})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
