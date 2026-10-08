import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Utensils, Receipt, GraduationCap, ChefHat, Sparkles, CheckCircle, Lock, User, Truck, ChevronDown, X, ArrowRight, HelpCircle, RotateCcw, ShieldCheck } from 'lucide-react';
import { StudentInfo } from '../types';

interface HeaderProps {
  cartItemCount: number;
  maxAllowed: number;
  activeTab: 'menu' | 'receipts' | 'tracking' | 'pass' | 'admin';
  setActiveTab: (tab: 'menu' | 'receipts' | 'tracking' | 'pass' | 'admin') => void;
  onOpenCart: () => void;
  hasActiveOrder: boolean;
  studentProfile?: StudentInfo | null;
  onOpenProfile?: () => void;
  onResetAsNewUser?: () => void;
  isAdminAuthenticated?: boolean;
  onOpenAdminLogin?: () => void;
  onAdminLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  maxAllowed,
  activeTab,
  setActiveTab,
  onOpenCart,
  hasActiveOrder,
  studentProfile,
  onOpenProfile,
  onResetAsNewUser,
  isAdminAuthenticated = false,
  onOpenAdminLogin,
  onAdminLogout
}) => {
  const [isLogoMenuOpen, setIsLogoMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isQuotaFull = cartItemCount >= maxAllowed;

  // Close menu on click outside or escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLogoMenuOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsLogoMenuOpen(false);
      }
    };

    if (isLogoMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLogoMenuOpen]);

  // Derive initials
  const initials = studentProfile?.fullName
    ? studentProfile.fullName
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'ESP';

  const handleSelectTab = (tab: 'menu' | 'receipts' | 'tracking' | 'pass' | 'admin') => {
    setActiveTab(tab);
    setIsLogoMenuOpen(false);
  };

  const handleSelectCart = () => {
    setIsLogoMenuOpen(false);
    onOpenCart();
  };

  return (
    <header className="sticky top-0 z-40 bg-orange-500 text-white shadow-md">
      {/* Top Banner Notice */}
      <div className="bg-orange-600 text-[10px] sm:text-xs py-1.5 px-3 sm:px-4 text-center font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b border-orange-400/40">
        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-300 animate-pulse shrink-0" />
        <span className="truncate max-w-[320px] sm:max-w-none">
          Offre Spéciale ESP : Repas & Boissons 100% Gratuits (3 éléments) !
        </span>
        <span className="hidden sm:inline-block bg-white text-orange-600 font-black px-2 py-0.5 rounded-full text-[10px]">
          ESP-2026
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-18 lg:h-20">
          
          {/* Logo & Interactive Navigation Trigger */}
          <div className="relative" ref={menuRef}>
            <button 
              type="button"
              onClick={() => setIsLogoMenuOpen(!isLogoMenuOpen)}
              aria-label="Ouvrir le menu de navigation rapide"
              aria-expanded={isLogoMenuOpen}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0 text-left rounded-2xl p-1 -m-1 transition-all hover:bg-orange-600/50 focus:outline-none"
            >
              <div className="bg-white p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-sm group-hover:scale-105 group-active:scale-95 transition-transform flex items-center justify-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-500 rounded-lg flex items-center justify-center font-black text-base sm:text-xl italic text-white shadow-inner">
                  E
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <h1 className="text-base sm:text-2xl font-black tracking-tight leading-none text-white">ESP EATS</h1>
                  <span className="bg-orange-600 border border-orange-400 text-orange-100 text-[8px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Dakar
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-orange-200 transition-transform duration-200 ${isLogoMenuOpen ? 'rotate-180' : ''}`} />
                </div>
                <p className="text-[8px] sm:text-xs font-bold text-orange-100 uppercase tracking-widest mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  <span>Menu & Navigation</span>
                </p>
              </div>
            </button>

            {/* QUICK ACCESS DROPDOWN MENU TRIGGERED BY LOGO */}
            {isLogoMenuOpen && (
              <>
                {/* Backdrop on mobile */}
                <div 
                  className="fixed inset-0 bg-black/40 z-40 sm:hidden animate-fade-in"
                  onClick={() => setIsLogoMenuOpen(false)}
                />

                <div className="fixed sm:absolute top-16 left-3 right-3 sm:left-0 sm:right-auto sm:top-full sm:mt-2 w-auto sm:w-84 bg-white text-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-orange-200/90 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  {/* Header of popup */}
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3.5 sm:p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-xl bg-white text-orange-600 flex items-center justify-center font-black text-xs shadow-xs">
                        E
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-wider">ESP EATS DAKAR</div>
                        <div className="text-[10px] text-orange-100 font-medium">Accès direct aux rubriques</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsLogoMenuOpen(false)}
                      className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Fermer le menu"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 4 Core Options Requested by User: Menu, Reçu, Panier, Suivi */}
                  <div className="p-2 sm:p-2.5 space-y-1.5">
                    {/* 1. MENU */}
                    <button
                      type="button"
                      onClick={() => handleSelectTab('menu')}
                      className={`w-full flex items-center justify-between p-3 rounded-xl sm:rounded-2xl transition-all text-left ${
                        activeTab === 'menu'
                          ? 'bg-orange-500 text-white font-extrabold shadow-sm'
                          : 'hover:bg-orange-50 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          activeTab === 'menu' ? 'bg-white text-orange-600' : 'bg-orange-100 text-orange-600'
                        }`}>
                          <Utensils className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-tight">Menu & Plats</div>
                          <div className={`text-[10px] ${activeTab === 'menu' ? 'text-orange-100' : 'text-slate-500'}`}>
                            Plats, jus locaux & desserts offerts
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                    </button>

                    {/* 2. REÇU */}
                    <button
                      type="button"
                      onClick={() => handleSelectTab('receipts')}
                      className={`w-full flex items-center justify-between p-3 rounded-xl sm:rounded-2xl transition-all text-left ${
                        activeTab === 'receipts'
                          ? 'bg-orange-500 text-white font-extrabold shadow-sm'
                          : 'hover:bg-orange-50 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          activeTab === 'receipts' ? 'bg-white text-orange-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          <Receipt className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-tight">Reçu & Commandes</div>
                          <div className={`text-[10px] ${activeTab === 'receipts' ? 'text-orange-100' : 'text-slate-500'}`}>
                            Reçu officiel PDF & historique
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                    </button>

                    {/* 3. PANIER */}
                    <button
                      type="button"
                      onClick={handleSelectCart}
                      className="w-full flex items-center justify-between p-3 rounded-xl sm:rounded-2xl hover:bg-orange-50 text-slate-800 transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
                          <ShoppingBag className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-tight flex items-center gap-1.5">
                            <span>Mon Panier</span>
                            <span className="bg-orange-500 text-white text-[9px] font-mono px-1.5 py-0.2 rounded-full font-bold">
                              {cartItemCount}/{maxAllowed}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {cartItemCount === 0 ? 'Panier vide (3 articles max)' : `${cartItemCount} article(s) à valider`}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-wider bg-orange-100 px-2 py-0.5 rounded-lg">
                        Ouvrir
                      </span>
                    </button>

                    {/* 4. REINITIALISER NOUVEL UTILISATEUR */}
                    {onResetAsNewUser && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsLogoMenuOpen(false);
                          if (window.confirm('Voulez-vous réinitialiser votre session et repartir à zéro comme nouvel étudiant ?')) {
                            onResetAsNewUser();
                          }
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-xl sm:rounded-2xl hover:bg-orange-50 text-slate-700 transition-all text-left border-t border-slate-100 mt-1"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 font-bold">
                            <RotateCcw className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <div className="text-xs font-black uppercase tracking-tight text-slate-800">
                              Mode Nouvel Utilisateur
                            </div>
                            <div className="text-[10px] text-slate-500">
                              Repartir de zéro (Pass 2026, Panier, Profil)
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-orange-600 uppercase bg-orange-100 px-2 py-0.5 rounded-lg">
                          Reset
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Navigation Tabs (Desktop only) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-orange-600/80 p-1.5 rounded-2xl border border-orange-400/50">
            <button
              onClick={() => setActiveTab('menu')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'menu'
                  ? 'bg-white text-orange-600 shadow-md'
                  : 'text-orange-100 hover:text-white hover:bg-orange-500/60'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Menu & Plats</span>
            </button>

            <button
              onClick={() => setActiveTab('receipts')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'receipts'
                  ? 'bg-white text-orange-600 shadow-md'
                  : 'text-orange-100 hover:text-white hover:bg-orange-500/60'
              }`}
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>Mes Reçus</span>
            </button>
          </nav>

          {/* Right Actions: Quota, Cart Trigger, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Delivery status pill (Large screen) */}
            <div className="hidden lg:flex bg-orange-600 px-3.5 py-1.5 rounded-full text-xs font-extrabold items-center gap-2 text-white shadow-inner">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
              <span>LIVRAISON CAMPUS</span>
            </div>

            {/* Quota counter pill */}
            <div 
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all ${
                isQuotaFull
                  ? 'bg-orange-600/90 text-yellow-300 border border-yellow-300/40'
                  : 'bg-orange-600/80 text-white border border-white/20'
              }`}
            >
              {isQuotaFull ? (
                <Lock className="w-3.5 h-3.5 text-yellow-300" />
              ) : (
                <CheckCircle className="w-3.5 h-3.5 text-green-300" />
              )}
              <span>
                Quota : <strong>{cartItemCount}/{maxAllowed}</strong>
              </span>
            </div>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label="Ouvrir le panier"
              className="relative flex items-center gap-1.5 bg-white hover:bg-orange-50 text-orange-600 font-black px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-sm transition-all active:scale-95 text-xs uppercase tracking-wider"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Panier</span>
              <span className="bg-orange-500 text-white text-[11px] sm:text-xs font-black w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            </button>

            {/* User Profile Badge / Button */}
            <button
              onClick={onOpenProfile}
              title="Modifier mon profil étudiant"
              aria-label="Profil étudiant"
              className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white p-1 sm:p-1.5 pr-1.5 sm:pr-3 rounded-xl sm:rounded-2xl border border-orange-400/60 shadow-xs transition-all active:scale-95"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-white text-orange-600 font-black flex items-center justify-center text-xs shadow-xs">
                {initials}
              </div>
              <div className="hidden xl:block text-left">
                <div className="text-[11px] font-black leading-tight truncate max-w-[100px]">
                  {studentProfile ? studentProfile.fullName.split(' ')[0] : 'Profil'}
                </div>
                <div className="text-[9px] text-orange-200 font-mono leading-tight">
                  {studentProfile ? studentProfile.studentId : 'Non inscrit'}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
