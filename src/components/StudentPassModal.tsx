import React, { useState } from 'react';
import { 
  GraduationCap, 
  QrCode, 
  Sparkles, 
  CheckCircle, 
  ShieldCheck, 
  MapPin, 
  Gift, 
  User,
  HelpCircle,
  ArrowRight,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { StudentInfo } from '../types';
import { FAQSection } from './FAQSection';

interface StudentPassModalProps {
  onExploreMenu: () => void;
  studentProfile?: StudentInfo | null;
  initialSubTab?: 'card' | 'faq';
}

export const StudentPassModal: React.FC<StudentPassModalProps> = ({ 
  onExploreMenu, 
  studentProfile,
  initialSubTab = 'card'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'card' | 'faq'>(initialSubTab);

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-6 px-3 sm:px-4 animate-fade-in text-slate-800 space-y-6">
      {/* Sub-Tabs Switcher */}
      <div className="bg-white p-2 rounded-2xl sm:rounded-3xl border-2 border-orange-100 shadow-sm flex items-center justify-center gap-2 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => setActiveSubTab('card')}
          className={`flex-1 py-2.5 px-4 rounded-xl sm:rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'card'
              ? 'bg-orange-500 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-orange-50'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>Carte Pass</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('faq')}
          className={`flex-1 py-2.5 px-4 rounded-xl sm:rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            activeSubTab === 'faq'
              ? 'bg-orange-500 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 hover:bg-orange-50'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>FAQ Étudiants</span>
        </button>
      </div>

      {/* VIEW 1: PASS CARD VIEW */}
      {activeSubTab === 'card' ? (
        <div className="space-y-6">
          {/* Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 bg-orange-100 border-2 border-orange-200 px-4 py-1 rounded-full text-xs font-black text-orange-600 uppercase tracking-widest">
              <Gift className="w-3.5 h-3.5" />
              <span>Pass Intégration ESP 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              {studentProfile ? `Carte Privilège de ${studentProfile.fullName}` : 'Votre Carte Privilège Nouvel Étudiant'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto leading-relaxed">
              Ce pass vous donne droit à une commande 100% gratuite jusqu'à 3 articles au Resto Campus avec livraison gratuite à votre chambre.
            </p>
          </div>

          {/* Official Student Digital Pass Visual */}
          <div className="relative bg-white border-2 border-orange-100 rounded-3xl p-5 sm:p-8 shadow-xl overflow-hidden">
            <div className="relative z-10 space-y-6">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b-2 border-orange-500 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white font-black text-xl flex items-center justify-center shadow-md">
                    E
                  </div>
                  <div>
                    <h3 className="font-black text-base text-slate-900 tracking-tight">
                      ÉCOLE SUPÉRIEURE POLYTECHNIQUE
                    </h3>
                    <p className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest">
                      PASS INTÉGRATION 2026 • UCAD DAKAR
                    </p>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 px-3 py-1 rounded-2xl text-orange-600 text-xs font-black flex items-center gap-1.5 uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4 text-orange-500" />
                  <span>PASS ACTIF</span>
                </div>
              </div>

              {/* Student Body Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center bg-orange-50/80 p-4 rounded-2xl border-2 border-orange-200">
                <div className="flex items-center gap-3 sm:col-span-2">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md">
                    {studentProfile?.fullName ? studentProfile.fullName.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() : 'ESP'}
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-wider">Étudiant Identifié</div>
                    <div className="font-black text-base text-slate-900">
                      {studentProfile?.fullName || 'Nouvel Étudiant ESP'}
                    </div>
                    <div className="text-xs text-orange-600 font-mono font-bold mt-0.5">
                      ID : {studentProfile?.studentId || 'ESP-2026-INTEGRATION'}
                    </div>
                    {studentProfile?.roomNumberOrDetails && (
                      <div className="text-[11px] text-slate-600 font-bold mt-1">
                        📍 Chambre : <span className="text-slate-900 font-extrabold">{studentProfile.roomNumberOrDetails}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center justify-center p-2 bg-white rounded-xl text-slate-900 text-center border border-orange-200 shadow-sm">
                  <QrCode className="w-12 h-12 stroke-[1.5] text-slate-800" />
                  <span className="text-[9px] font-mono font-bold mt-1 text-orange-600">
                    {studentProfile?.studentId ? `PASS-${studentProfile.studentId}` : 'VERIF-ESP-2026'}
                  </span>
                </div>
              </div>

              {/* Privileges Included */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-orange-600 uppercase tracking-widest">
                  Avantages inclus avec votre pass :
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-100 flex items-center gap-2.5">
                    <span className="w-6 h-6 bg-orange-500 text-white text-xs font-black rounded-full flex items-center justify-center shrink-0">1</span>
                    <span className="font-semibold text-slate-700"><strong>3 Articles Gratuits</strong> au menu</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-100 flex items-center gap-2.5">
                    <span className="w-6 h-6 bg-orange-500 text-white text-xs font-black rounded-full flex items-center justify-center shrink-0">2</span>
                    <span className="font-semibold text-slate-700"><strong>Livraison 0 FCFA</strong> sur tout le campus</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-100 flex items-center gap-2.5">
                    <span className="w-6 h-6 bg-orange-500 text-white text-xs font-black rounded-full flex items-center justify-center shrink-0">3</span>
                    <span className="font-semibold text-slate-700"><strong>Reçu QR Numérique</strong> certifié</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-100 flex items-center gap-2.5">
                    <span className="w-6 h-6 bg-orange-500 text-white text-xs font-black rounded-full flex items-center justify-center shrink-0">4</span>
                    <span className="font-semibold text-slate-700"><strong>Suivi GPS direct</strong> du livreur</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onExploreMenu}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-6 rounded-2xl shadow-md text-xs uppercase tracking-wider transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Utiliser mon pass pour commander (3 articles offerts)</span>
              </button>
            </div>
          </div>

          {/* Quick FAQ Highlight Card on the Pass Page */}
          <div className="bg-white rounded-3xl border-2 border-orange-100 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-sm text-slate-900 uppercase tracking-tight">
                  Des questions sur les pavillons ou la livraison ?
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  Consultez les réponses détaillées : lieux de livraison, horaires, validation QR et reçus.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveSubTab('faq')}
              className="bg-slate-900 hover:bg-black text-white text-xs font-black px-4 py-2.5 rounded-xl uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>Voir la FAQ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* VIEW 2: FULL INTERACTIVE FAQ */
        <FAQSection onExploreMenu={onExploreMenu} />
      )}
    </div>
  );
};
