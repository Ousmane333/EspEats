import React from 'react';
import { Sparkles, MapPin, Clock, ShieldCheck, ArrowRight, User, CheckCircle2, Utensils } from 'lucide-react';
import { StudentInfo } from '../types';

interface HeroBannerProps {
  onExploreMenu: () => void;
  cartCount: number;
  studentProfile?: StudentInfo | null;
  onOpenFlutterModal?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreMenu,
  cartCount,
  studentProfile,
}) => {
  const studentName = studentProfile?.fullName || "Étudiant ESP";
  const quotaPercentage = Math.min((cartCount / 3) * 100, 100);
  const remainingCount = Math.max(0, 3 - cartCount);

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border-2 border-orange-100 shadow-xs text-slate-900 mb-4 sm:mb-6 p-4 sm:p-6 lg:p-7">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-bl from-orange-100/60 via-amber-50/30 to-transparent rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

      <div className="relative z-10 space-y-4 sm:space-y-5">
        
        {/* Top Header: Clean, Elegant Greeting without redundant pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-orange-100/70 pb-3 sm:pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2">
              <span>Bonjour, <span className="text-orange-600">{studentName.split(' ')[0]}</span> !</span>
              <span className="text-xl sm:text-2xl">👋</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Composez votre repas universitaire 100% offert au Restaurant Campus ESP.
            </p>
          </div>

          {/* Student ID Pill */}
          <div className="flex items-center gap-2 bg-orange-50/90 border border-orange-200/90 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold text-orange-800 self-start sm:self-auto shrink-0 shadow-2xs">
            <User className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span>{studentProfile?.studentId || 'ESP-2026'}</span>
            <span className="text-orange-300">•</span>
            <span className="text-[11px] font-sans font-extrabold text-slate-700 truncate max-w-[140px] sm:max-w-none">
              {studentProfile?.department?.split('(')[0]?.trim() || 'ESP Dakar'}
            </span>
          </div>
        </div>

        {/* REFINED 2-KPI GRID: Spacious, High-Contrast & Clear (3rd cramped card removed) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* KPI 1: Quota Menu Card */}
          <div className="bg-gradient-to-br from-orange-50/90 to-amber-50/50 border-2 border-orange-200/90 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-orange-500" />
                <span>Quota de Repas Offert</span>
              </span>
              <span className={`text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full ${
                cartCount === 3
                  ? 'bg-orange-500 text-white shadow-2xs'
                  : 'bg-orange-200/80 text-orange-900'
              }`}>
                {cartCount === 3 ? 'Quota Complet (3/3)' : `${remainingCount} restant${remainingCount > 1 ? 's' : ''}`}
              </span>
            </div>

            <div className="my-2.5 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black text-orange-600 font-mono tracking-tight">
                {cartCount} <span className="text-sm sm:text-base text-slate-400 font-normal">/ 3 plats</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {cartCount === 0 && 'Choisissez jusqu\'à 3 articles'}
                {cartCount === 1 && 'Encore 2 articles offerts'}
                {cartCount === 2 && 'Plus qu\'1 article offert'}
                {cartCount >= 3 && 'Menu complet prêt à valider'}
              </span>
            </div>

            {/* 3 Step Visual Progress Indicator */}
            <div className="space-y-1.5">
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 2, 3].map((step) => {
                  const isFilled = cartCount >= step;
                  return (
                    <div
                      key={step}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isFilled ? 'bg-orange-500 shadow-2xs' : 'bg-orange-200/50'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* KPI 2: Subvention & Prise en Charge ESP Card */}
          <div className="bg-gradient-to-br from-emerald-50/90 to-teal-50/40 border-2 border-emerald-200/90 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Prise en Charge ESP</span>
              </span>
              <span className="text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-2xs">
                100% Subventionné
              </span>
            </div>

            <div className="my-2.5 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono tracking-tight">
                0 FCFA
              </span>
              <span className="text-[11px] text-emerald-800 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Facture Soldée</span>
              </span>
            </div>

            {/* Full 100% Subvention Indicator Bar matching KPI 1 */}
            <div className="space-y-1.5">
              <div className="h-2 rounded-full bg-emerald-500 shadow-2xs w-full" />
            </div>
          </div>
        </div>

        {/* Quick Action Button & Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <button
            onClick={onExploreMenu}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black px-5 sm:px-7 py-3 rounded-xl sm:rounded-2xl shadow-sm text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95"
          >
            <span>{cartCount > 0 ? `Finaliser mon menu (${cartCount}/3)` : 'Choisir mes 3 plats offerts'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 text-[11px] sm:text-xs font-bold text-slate-500 shrink-0">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Service Resto Ouvert</span>
            </span>
            <span>•</span>
            <span className="text-orange-600 font-extrabold">Reçu Officiel avec QR Code</span>
          </div>
        </div>
      </div>
    </div>
  );
};
