import React from 'react';
import { Order } from '../types';
import { AlertTriangle, Clock, RotateCcw, X, ArrowRight, ShieldAlert } from 'lucide-react';

interface ActiveOrderNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrder: Order | null;
  onViewOrder: () => void;
  onResetOrder: (orderId: string) => void;
}

export const ActiveOrderNoticeModal: React.FC<ActiveOrderNoticeModalProps> = ({
  isOpen,
  onClose,
  activeOrder,
  onViewOrder,
  onResetOrder
}) => {
  if (!isOpen || !activeOrder) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white border-2 border-orange-200 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl text-slate-800 p-6 relative"
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
            <ShieldAlert className="w-9 h-9" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 bg-orange-100 border border-orange-200 text-orange-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Commande déjà validée !</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Vous avez déjà une commande
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
              Votre commande <strong className="text-orange-600 font-mono">{activeOrder.orderNumber}</strong> ({activeOrder.items.length} article{activeOrder.items.length > 1 ? 's' : ''}) est déjà enregistrée et verrouillée. 
              <br />
              <strong className="text-slate-800">Une fois validée, vous ne pouvez plus recommander ni annuler.</strong>
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-xs text-left text-slate-700 space-y-1.5 font-medium">
            <div className="font-black text-amber-800 uppercase tracking-wider">🔒 Statut de votre commande</div>
            <p>• Votre repas est en cours de préparation / livraison par le restaurant ESP.</p>
            <p>• Suivez l'arrivée de votre livreur étudiant en direct sur la carte du campus.</p>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              onClick={() => {
                onClose();
                onViewOrder();
              }}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black py-3.5 px-4 rounded-xl text-xs shadow-md uppercase tracking-wider transition-all hover:scale-[1.01]"
            >
              <Clock className="w-4 h-4" />
              <span>Suivre ma commande en direct ({activeOrder.orderNumber})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
