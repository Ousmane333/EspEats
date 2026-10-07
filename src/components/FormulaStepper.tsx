import React from 'react';
import { Category, CartItem } from '../types';
import { Check, Sparkles, Pizza, Utensils, IceCream, ArrowRight, Lock } from 'lucide-react';

interface FormulaStepperProps {
  currentCategory: Category;
  onSelectCategory: (cat: Category) => void;
  fastFoodItem?: CartItem;
  accompagnantItem?: CartItem;
  dessertItem?: CartItem;
  onOrderDirectly: () => void;
  hasActiveOrder?: boolean;
}

export const FormulaStepper: React.FC<FormulaStepperProps> = ({
  currentCategory,
  onSelectCategory,
  fastFoodItem,
  accompagnantItem,
  dessertItem,
  onOrderDirectly,
  hasActiveOrder = false
}) => {
  const steps = [
    {
      id: 'fastfood' as Category,
      stepNum: 1,
      title: 'Fast-Food',
      rule: '1 seul autorisé',
      icon: Pizza,
      item: fastFoodItem,
      activeColor: 'border-orange-500 bg-orange-50 text-orange-950',
      badgeColor: 'bg-orange-500 text-white',
      desc: 'Burger, Chawarma ou Fataya'
    },
    {
      id: 'accompagnants' as Category,
      stepNum: 2,
      title: 'Accompagnant',
      rule: '1 seul autorisé',
      icon: Utensils,
      item: accompagnantItem,
      activeColor: 'border-amber-500 bg-amber-50 text-amber-950',
      badgeColor: 'bg-amber-600 text-white',
      desc: 'Frites ou Sauces'
    },
    {
      id: 'desserts' as Category,
      stepNum: 3,
      title: 'Dessert',
      rule: '1 seul autorisé',
      icon: IceCream,
      item: dessertItem,
      activeColor: 'border-emerald-500 bg-emerald-50 text-emerald-950',
      badgeColor: 'bg-emerald-600 text-white',
      desc: 'Sodas, Jus locaux ou Fruits'
    }
  ];

  const completedCount = (fastFoodItem ? 1 : 0) + (accompagnantItem ? 1 : 0) + (dessertItem ? 1 : 0);
  const isComplete = completedCount === 3;

  return (
    <div className="bg-white rounded-3xl border-2 border-orange-200/90 shadow-md p-4 sm:p-5 space-y-4">
      {/* Top Header with explanation and progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-orange-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-orange-600 bg-orange-100/70 px-2.5 py-0.5 rounded-full mb-1">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Formule Étudiant ESP (3 éléments obligatoires)</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            1 Fast-Food + 1 Accompagnant + 1 Dessert
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Sélectionnez chaque élément étape par étape pour compléter votre formule offerte.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <div className={`px-3 py-1.5 rounded-2xl text-xs font-black font-mono flex items-center gap-1.5 border ${
            isComplete
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
              : 'bg-orange-50 text-orange-700 border-orange-200'
          }`}>
            <span>Progression :</span>
            <strong className="text-sm">{completedCount}/3</strong>
          </div>

          {isComplete && !hasActiveOrder && (
            <button
              onClick={onOrderDirectly}
              className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black px-4 py-2 rounded-2xl shadow-md text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all transform hover:scale-105 active:scale-95 animate-pulse"
            >
              <span>Commander (0 FCFA)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3 Step Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
        {steps.map((step) => {
          const StepIcon = step.icon;
          const isSelected = !!step.item;
          const isActive = currentCategory === step.id;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelectCategory(step.id)}
              className={`text-left p-3.5 rounded-2xl border-2 transition-all relative group flex flex-col justify-between ${
                isActive
                  ? `${step.activeColor} shadow-sm ring-2 ring-orange-400/40`
                  : isSelected
                  ? 'border-emerald-200 bg-emerald-50/40 text-slate-900 hover:border-emerald-300'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-orange-50/50 hover:border-orange-200 text-slate-800'
              }`}
            >
              {/* Top Row: Step badge & Check status */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-emerald-600 text-white' : step.badgeColor
                  }`}>
                    {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.stepNum}
                  </span>
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1">
                    <StepIcon className="w-3.5 h-3.5 text-orange-600" />
                    <span>{step.title}</span>
                  </span>
                </div>

                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  {step.rule}
                </span>
              </div>

              {/* Chosen item preview or placeholder */}
              <div className="min-h-[42px] flex flex-col justify-center">
                {isSelected ? (
                  <div className="flex items-center gap-2">
                    {step.item?.menuItem.image && (
                      <img 
                        src={step.item.menuItem.image} 
                        alt={step.item.menuItem.name}
                        style={{ objectPosition: step.item.menuItem.imagePosition || 'center center' }}
                        className="w-8 h-8 rounded-lg object-cover object-center shrink-0 border border-emerald-300"
                      />
                    )}
                    <div className="min-w-0">
                      <div className="text-xs font-extrabold text-emerald-800 truncate">
                        {step.item?.menuItem.name}
                      </div>
                      <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                        <span>✓ Choisi (cliquer pour changer)</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-xs font-bold text-slate-500">
                      {isActive ? '👉 Choisissez ci-dessous' : 'À sélectionner'}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {step.desc}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom active marker */}
              <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-black uppercase tracking-wider">
                <span className={isActive ? 'text-orange-600' : 'text-slate-400'}>
                  {isActive ? 'Étape en cours' : isSelected ? 'Modifier le choix' : 'Voir les choix'}
                </span>
                <span className="text-slate-300 group-hover:text-orange-500 transition-colors">
                  →
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Completion Banner if all 3 are chosen */}
      {isComplete && !hasActiveOrder && (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-3.5 sm:p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-emerald-700 font-black flex items-center justify-center shrink-0 shadow-xs">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
            <div>
              <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider">
                🎉 Félicitations ! Votre formule 3/3 est prête.
              </h4>
              <p className="text-[11px] text-emerald-100 font-medium">
                1 Fast-Food ({fastFoodItem?.menuItem.name}) • 1 Accompagnant ({accompagnantItem?.menuItem.name}) • 1 Dessert ({dessertItem?.menuItem.name})
              </p>
            </div>
          </div>

          <button
            onClick={onOrderDirectly}
            className="w-full sm:w-auto bg-white text-emerald-800 hover:bg-emerald-50 font-black px-5 py-2.5 rounded-xl uppercase tracking-wider text-xs shadow-md transition-all transform hover:scale-105 active:scale-95 shrink-0 flex items-center justify-center gap-1.5"
          >
            <span>Commander directement (0 FCFA)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
