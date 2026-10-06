import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  MapPin, 
  ShoppingBag, 
  FileText, 
  Truck, 
  Search, 
  Sparkles, 
  GraduationCap, 
  QrCode, 
  Phone,
  Clock,
  CheckCircle2,
  Building2
} from 'lucide-react';

export interface FAQItem {
  id: string;
  category: 'order' | 'delivery' | 'receipt' | 'profile';
  question: string;
  answer: string;
  badge?: string;
  icon?: any;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'order',
    badge: 'Pass Intégration',
    icon: Sparkles,
    question: 'Comment fonctionne la commande gratuite (0 FCFA) pour les nouveaux étudiants ?',
    answer: "Dans le cadre de l'intégration des nouveaux étudiants de l'ESP Dakar (Promotion 2026), l'école et la Direction de la Restauration subventionnent à 100% votre premier repas. Vous pouvez choisir jusqu'à 3 articles offerts (un plat chaud comme le Thiébou Dienn ou le Yassa Poulet, un jus local bien glacé au bissap ou au bouye, et un dessert comme le Thiakry). Le total facturé est de 0 FCFA."
  },
  {
    id: 'faq-2',
    category: 'delivery',
    badge: 'Campus ESP',
    icon: MapPin,
    question: 'Quels sont les lieux de livraison desservis sur le campus ?',
    answer: "Nos livreurs étudiants à vélo et scooter express desservent l'ensemble du périmètre universitaire de l'ESP et de l'UCAD :\n• Pavillon A & Pavillon B (Chambres étudiantes avec précision du numéro de chambre)\n• Pavillon C & Résidence Universitaire de Fann\n• Bâtiment Administratif et Direction des Études\n• Départements DGI (Informatique), DGM (Mécanique), DGE (Génie Électrique), DGC (Chimie)\n• Espaces de révision, Bibliothèque ESP & Salles de Travaux Dirigés (TD)."
  },
  {
    id: 'faq-3',
    category: 'delivery',
    badge: 'Délais & Horaires',
    icon: Clock,
    question: 'Quels sont les délais et horaires de livraison du Restaurant Universitaire ?',
    answer: "Le service de livraison campus fonctionne en continu :\n• Déjeuner : de 11h30 à 15h00\n• Dîner : de 18h30 à 22h00\nLe délai moyen de livraison est estimé entre 15 et 25 minutes à partir du moment où la cuisine prépare votre plateau isotherme. Vous pouvez suivre l'avancée du livreur en temps réel sur la carte interactive."
  },
  {
    id: 'faq-4',
    category: 'receipt',
    badge: 'Contrôle & Sécurité',
    icon: QrCode,
    question: 'Comment récupérer mon repas auprès du livreur à mon pavillon ?',
    answer: "Dès que le livreur arrive devant votre pavillon ou point de rendez-vous, présentez simplement le Code QR de contrôle présent sur votre reçu (ou l'image enregistrée dans votre galerie). Le livreur scanne le code pour valider la remise en main propre. Vous pouvez aussi appeler le livreur directement depuis votre reçu avec le bouton « Appeler »."
  },
  {
    id: 'faq-5',
    category: 'receipt',
    badge: 'PDF & Galerie',
    icon: FileText,
    question: 'Comment télécharger mon reçu en PDF et le retrouver dans la galerie de mon téléphone ?',
    answer: "Sur l'écran de confirmation ou dans l'onglet « Mes Reçus », cliquez sur le bouton « 📄 Télécharger le reçu ». L'application génère automatiquement le document PDF certifié et crée également une image haute définition (PNG) enregistrée dans la Galerie photos de votre smartphone pour une consultation immédiate sans connexion."
  },
  {
    id: 'faq-6',
    category: 'order',
    badge: 'Modification',
    icon: ShoppingBag,
    question: 'Puis-je modifier ou recommencer ma commande si je me suis trompé ?',
    answer: "Oui ! Si vous souhaitez changer vos plats ou mettre à jour votre numéro de chambre avant la réception, vous pouvez cliquer sur « Réinitialiser » sur le bandeau de commande active ou sur la page de suivi. Vos 3 droits de plats offerts seront réactivés pour composer votre nouveau panier."
  },
  {
    id: 'faq-7',
    category: 'profile',
    badge: 'Inscription',
    icon: GraduationCap,
    question: 'Que faire si je n\'ai pas encore reçu ma carte d\'étudiant définitive ?',
    answer: "Pas d'inquiétude ! Lors de votre première commande, indiquez simplement votre nom complet, votre filière (DUT 1ère année, DIC1, etc.) et votre numéro de chambre. Un identifiant temporaire certifié (ex: ESP-2026-XXXX) vous est attribué automatiquement par le système."
  }
];

interface FAQSectionProps {
  defaultCategory?: 'all' | 'order' | 'delivery' | 'receipt' | 'profile';
  className?: string;
  onExploreMenu?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ 
  defaultCategory = 'all', 
  className = '',
  onExploreMenu
}) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true, // Open the first item by default
    'faq-2': true,
  });
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'order' | 'delivery' | 'receipt' | 'profile'>(defaultCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = [
    { id: 'all', label: 'Toutes les questions', icon: HelpCircle },
    { id: 'order', label: 'Commande & Quota', icon: ShoppingBag },
    { id: 'delivery', label: 'Lieux & Livraison', icon: Truck },
    { id: 'receipt', label: 'Reçus & QR Code', icon: QrCode },
    { id: 'profile', label: 'Pass & Profil', icon: GraduationCap },
  ];

  const filteredFaqs = FAQ_DATA.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.badge && item.badge.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 rounded-3xl p-5 sm:p-7 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-yellow-200">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Guide d'Accueil Étudiant ESP 2026</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
            Foire Aux Questions (FAQ) — Restauration & Campus
          </h3>

          <p className="text-xs sm:text-sm text-orange-100 font-medium max-w-2xl leading-relaxed">
            Retrouvez toutes les réponses essentielles pour commander votre repas gratuit, choisir votre pavillon de livraison et faire valider votre reçu QR auprès des livreurs de l'ESP.
          </p>

          {/* Quick Search inside FAQ */}
          <div className="pt-2 max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher pavillon, livreur, quota, QR code..."
                className="w-full bg-white text-slate-900 placeholder-slate-400 text-xs font-medium pl-10 pr-4 py-2.5 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Effacer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/15 scale-102'
                  : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200/80 hover:border-orange-300'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-orange-400' : 'text-orange-500'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-3xl border-2 border-orange-100 p-8 text-center space-y-2">
            <HelpCircle className="w-10 h-10 text-orange-300 mx-auto" />
            <h4 className="text-sm font-black text-slate-800">Aucune question ne correspond à votre recherche</h4>
            <p className="text-xs text-slate-500">Essayez un autre mot-clé ou réinitialisez la recherche.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-2 text-xs font-bold text-orange-600 hover:underline uppercase"
            >
              Afficher toutes les questions
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = !!openItems[faq.id];
            const Icon = faq.icon || HelpCircle;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl sm:rounded-3xl border-2 transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-orange-400 shadow-sm' : 'border-slate-100 hover:border-orange-200 shadow-2xs'
                }`}
              >
                {/* Question Trigger */}
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                      isOpen ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600 group-hover:bg-orange-200'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="space-y-1">
                      {faq.badge && (
                        <span className="inline-block bg-orange-100 text-orange-700 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                          {faq.badge}
                        </span>
                      )}
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                        {faq.question}
                      </h4>
                    </div>
                  </div>

                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Collapsible Answer */}
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-slate-600 text-xs sm:text-[13px] leading-relaxed border-t border-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="bg-orange-50/60 p-3.5 sm:p-4 rounded-2xl border border-orange-100/80 whitespace-pre-line font-medium text-slate-700">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Campus Support & Delivery Assistance Banner */}
      <div className="bg-white rounded-3xl border-2 border-orange-100 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-black text-sm text-slate-900 uppercase tracking-tight">
              Une autre question ? Besoin d'aide au campus ?
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              Le Bureau de la Restauration ESP et les livreurs étudiants sont disponibles pour vous orienter.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
          <a
            href="tel:+221776543210"
            className="flex-1 sm:flex-initial bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs px-3.5 py-2.5 rounded-xl uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Appel Resto ESP</span>
          </a>

          {onExploreMenu && (
            <button
              onClick={onExploreMenu}
              className="flex-1 sm:flex-initial bg-orange-500 hover:bg-orange-600 text-white font-black text-xs px-4 py-2.5 rounded-xl uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs"
            >
              <span>Passer commande</span>
              <span>→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
