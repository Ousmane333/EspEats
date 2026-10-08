import React from 'react';
import { Utensils, Receipt, ShoppingBag, ShieldCheck } from 'lucide-react';

interface FlutterBottomNavBarProps {
  activeTab: 'menu' | 'receipts' | 'tracking' | 'pass' | 'admin';
  setActiveTab: (tab: 'menu' | 'receipts' | 'tracking' | 'pass' | 'admin') => void;
  cartItemCount: number;
  onOpenCart: () => void;
  hasActiveOrder: boolean;
  onOpenFlutterExport?: () => void;
  isAdminAuthenticated?: boolean;
  onOpenAdminLogin?: () => void;
}

export const FlutterBottomNavBar: React.FC<FlutterBottomNavBarProps> = ({
  activeTab,
  setActiveTab,
  cartItemCount,
  onOpenCart,
  isAdminAuthenticated = false,
  onOpenAdminLogin
}) => {
  const handleAdminClick = () => {
    if (isAdminAuthenticated) {
      setActiveTab('admin');
    } else if (onOpenAdminLogin) {
      onOpenAdminLogin();
    } else {
      setActiveTab('admin');
    }
  };

  return (
    <nav 
      aria-label="Navigation mobile"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-slate-900/95 backdrop-blur-xl text-white border-t border-slate-800/80 shadow-[0_-8px_30px_rgba(0,0,0,0.3)] px-2 py-1.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 items-center relative gap-1">
        {/* 1. Menu Tab */}
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-xl transition-all duration-200 active:scale-95 ${
            activeTab === 'menu'
              ? 'text-orange-400 font-black'
              : 'text-slate-400 hover:text-slate-200 font-bold'
          }`}
        >
          <div
            className={`p-1.5 rounded-xl transition-all ${
              activeTab === 'menu' ? 'bg-orange-500/20 text-orange-400 ring-2 ring-orange-500/40 scale-105' : ''
            }`}
          >
            <Utensils className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase tracking-wider mt-0.5">Menu</span>
        </button>

        {/* 2. Central Elevated Cart Action Button */}
        <div className="flex flex-col items-center justify-center -mt-5">
          <button
            onClick={onOpenCart}
            className={`relative p-3 min-w-[48px] min-h-[48px] rounded-full shadow-xl transition-all duration-200 active:scale-90 flex items-center justify-center border-4 border-slate-900 ${
              cartItemCount > 0
                ? 'bg-gradient-to-tr from-orange-500 via-orange-600 to-amber-500 shadow-orange-500/40 scale-105 animate-pulse'
                : 'bg-slate-800 text-slate-300 shadow-slate-900/50 hover:bg-slate-700'
            }`}
            aria-label="Mon Panier"
          >
            <ShoppingBag className="w-5 h-5 text-white" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-[10px] font-mono font-black w-4.5 h-4.5 rounded-full shadow-md flex items-center justify-center border border-orange-200">
                {cartItemCount}
              </span>
            )}
          </button>
          <span className={`text-[9px] uppercase tracking-wider font-black mt-0.5 ${cartItemCount > 0 ? 'text-orange-400' : 'text-slate-400'}`}>
            Panier
          </span>
        </div>

        {/* 3. Reçus Tab */}
        <button
          onClick={() => setActiveTab('receipts')}
          className={`flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-xl transition-all duration-200 active:scale-95 ${
            activeTab === 'receipts'
              ? 'text-orange-400 font-black'
              : 'text-slate-400 hover:text-slate-200 font-bold'
          }`}
        >
          <div
            className={`p-1.5 rounded-xl transition-all ${
              activeTab === 'receipts' ? 'bg-orange-500/20 text-orange-400 ring-2 ring-orange-500/40 scale-105' : ''
            }`}
          >
            <Receipt className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase tracking-wider mt-0.5">Reçus</span>
        </button>

        {/* 4. Admin Tab (En bas) */}
        <button
          onClick={handleAdminClick}
          className={`flex flex-col items-center justify-center py-1.5 min-h-[48px] rounded-xl transition-all duration-200 active:scale-95 ${
            activeTab === 'admin'
              ? 'text-orange-400 font-black'
              : 'text-slate-400 hover:text-slate-200 font-bold'
          }`}
        >
          <div
            className={`p-1.5 rounded-xl transition-all ${
              activeTab === 'admin' ? 'bg-orange-500/20 text-orange-400 ring-2 ring-orange-500/40 scale-105' : ''
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-[10px] uppercase tracking-wider mt-0.5">Admin</span>
        </button>
      </div>
    </nav>
  );
};
