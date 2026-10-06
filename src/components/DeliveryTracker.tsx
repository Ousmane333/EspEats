import React, { useState, useEffect } from 'react';
import { Order, DeliveryStatus } from '../types';
import { CheckCircle2, ChefHat, Bike, MapPin, Phone, Clock, ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';

interface DeliveryTrackerProps {
  order: Order;
  onUpdateStatus: (orderId: string, newStatus: DeliveryStatus) => void;
  onBackToMenu: () => void;
  onResetOrder?: (orderId: string) => void;
}

export const DeliveryTracker: React.FC<DeliveryTrackerProps> = ({
  order,
  onUpdateStatus,
  onBackToMenu,
  onResetOrder
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps: { key: DeliveryStatus; label: string; desc: string; icon: any }[] = [
    {
      key: 'confirmed',
      label: 'Commande Reçue',
      desc: 'Transmise au Restaurant Universitaire ESP',
      icon: CheckCircle2
    },
    {
      key: 'preparing',
      label: 'En Cuisine',
      desc: 'Préparation chaude & conditionnement',
      icon: ChefHat
    },
    {
      key: 'delivering',
      label: 'En Livraison Campus',
      desc: 'Livreur en route vers votre pavillon',
      icon: Bike
    },
    {
      key: 'delivered',
      label: 'Livrée !',
      desc: 'Remise en main propre contre scan QR',
      icon: MapPin
    }
  ];

  useEffect(() => {
    switch (order.status) {
      case 'confirmed': setActiveStepIndex(0); break;
      case 'preparing': setActiveStepIndex(1); break;
      case 'delivering': setActiveStepIndex(2); break;
      case 'delivered': setActiveStepIndex(3); break;
    }
  }, [order.status]);

  const advanceDemoStatus = () => {
    if (activeStepIndex < 3) {
      const nextStatus = steps[activeStepIndex + 1].key;
      onUpdateStatus(order.id, nextStatus);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-3 sm:py-6 px-3 sm:px-4 animate-fade-in text-slate-800 space-y-4 sm:space-y-6">
      {/* Navigation Header */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-600 hover:text-orange-600 transition-colors py-1.5 px-2.5 bg-slate-100 sm:bg-transparent rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 text-orange-500" />
          <span>Menu principal</span>
        </button>

        <div className="flex items-center gap-2">
          {onResetOrder && (
            <button
              onClick={() => onResetOrder(order.id)}
              className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser</span>
            </button>
          )}

          <div className="bg-orange-100 border-2 border-orange-200 px-3 py-1 rounded-xl text-xs font-mono font-black text-orange-600">
            N° {order.orderNumber}
          </div>
        </div>
      </div>

      {/* Hero Delivery Status Card */}
      <div className="bg-white border-2 border-orange-100 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl relative overflow-hidden space-y-5 sm:space-y-6">
        {/* Top Header & Delivery Timer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="text-[11px] sm:text-xs text-orange-600 font-black uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Suivi en Direct ESP Dakar</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 leading-tight">
              {steps[activeStepIndex].label}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {steps[activeStepIndex].desc}
            </p>
          </div>

          <div className="bg-orange-50 px-3.5 py-2 rounded-2xl border-2 border-orange-200 flex items-center gap-2 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
            <span className="text-xs font-black text-orange-600 uppercase tracking-wider">
              En direct
            </span>
          </div>
        </div>

        {/* 4-Step Progress Visualizer (Adapted cleanly for both mobile & desktop) */}
        <div>
          <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
            Étape de préparation & acheminement ({activeStepIndex + 1} / 4)
          </h3>

          {/* Desktop & Tablet Progress Bar */}
          <div className="relative hidden sm:block mb-2">
            <div className="absolute top-5 left-8 right-8 h-1 bg-slate-100 -z-0" />
            <div
              className="absolute top-5 left-8 h-1 bg-orange-500 -z-0 transition-all duration-700"
              style={{ width: `${(activeStepIndex / 3) * 82}%` }}
            />

            <div className="grid grid-cols-4 gap-4 relative z-10">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isCompleted = idx <= activeStepIndex;
                const isCurrent = idx === activeStepIndex;

                return (
                  <div key={step.key} className="flex flex-col items-center text-center">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black transition-all shadow-sm mb-2 ${
                        isCurrent
                          ? 'bg-orange-500 text-white ring-4 ring-orange-200 scale-110 shadow-md'
                          : isCompleted
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className={`text-xs font-extrabold ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                      {step.label}
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                      {isCompleted ? 'Validé' : 'En attente'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Vertical/Card Timeline View for spacious mobile layout */}
          <div className="grid grid-cols-1 gap-2 sm:hidden">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isCompleted = idx <= activeStepIndex;
              const isCurrent = idx === activeStepIndex;

              return (
                <div
                  key={step.key}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                    isCurrent
                      ? 'bg-orange-500 text-white border-orange-600 shadow-md scale-[1.01]'
                      : isCompleted
                      ? 'bg-slate-900 text-white border-slate-800'
                      : 'bg-slate-50 text-slate-400 border-slate-200 opacity-70'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-black ${
                      isCurrent
                        ? 'bg-white text-orange-600'
                        : isCompleted
                        ? 'bg-slate-800 text-orange-400'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-extrabold ${isCurrent ? 'text-white' : isCompleted ? 'text-slate-100' : 'text-slate-600'}`}>
                        {step.label}
                      </span>
                      <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        isCurrent
                          ? 'bg-orange-600 text-white'
                          : isCompleted
                          ? 'bg-emerald-900/80 text-emerald-300'
                          : 'bg-slate-200 text-slate-500'
                      }`}>
                        {isCurrent ? 'En cours' : isCompleted ? 'Terminé' : 'En attente'}
                      </span>
                    </div>
                    <p className={`text-[10px] mt-0.5 truncate ${isCurrent ? 'text-orange-100' : isCompleted ? 'text-slate-400' : 'text-slate-400'}`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Simulated Campus Map View */}
        <div className="bg-slate-900 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 text-white space-y-3 shadow-md">
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5 uppercase font-black tracking-wider text-orange-400 text-[11px] sm:text-xs">
              <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
              <span>Trajet Livreur Campus ESP</span>
            </span>
            <span className="text-[10px] bg-slate-800 text-orange-300 px-2.5 py-1 rounded-full font-mono font-bold w-fit truncate">
              Dest : Chambre {order.student.roomNumberOrDetails}
            </span>
          </div>

          {/* Graphical Map Representation with ample mobile height */}
          <div className="relative h-52 sm:h-48 bg-slate-950 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-800 p-3 sm:p-4 flex flex-col justify-between">
            {/* Map Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

            {/* Simulated Road Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-orange-500/40 stroke-dasharray-4" strokeWidth="3" fill="none">
              <path d="M 30 140 Q 120 40 280 110 T 520 70" />
            </svg>

            {/* Resto ESP Node */}
            <div className="relative z-10 flex items-center gap-2 bg-slate-900/90 border border-slate-700 px-2.5 py-1.5 rounded-xl w-fit text-[11px] font-bold text-white shadow-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping shrink-0" />
              <span className="truncate">🍳 Resto Universitaire ESP</span>
            </div>

            {/* Animated Delivery Agent Position */}
            <div 
              className="relative z-20 flex items-center gap-1.5 bg-orange-500 text-white px-3 py-1.5 rounded-xl font-black text-[11px] shadow-xl transition-all duration-1000 w-fit my-2 uppercase tracking-wider"
              style={{
                marginLeft: `${Math.min(activeStepIndex * 28 + 5, 68)}%`
              }}
            >
              <Bike className="w-4 h-4 animate-bounce shrink-0" />
              <span className="truncate">{order.deliveryAgent.name}</span>
            </div>

            {/* Student Destination Node */}
            <div className="relative z-10 self-end flex items-center gap-1.5 bg-slate-900/90 border border-slate-700 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-orange-300 shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span className="truncate">📍 Chambre : {order.student.roomNumberOrDetails}</span>
            </div>
          </div>
        </div>

        {/* Delivery Agent Contact Info */}
        <div className="pt-4 border-t-2 border-slate-100 flex items-center justify-between gap-3 bg-slate-50 p-3.5 sm:p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-orange-100 border-2 border-orange-200 flex items-center justify-center font-black text-lg text-orange-600 shrink-0">
              {order.deliveryAgent.avatar}
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Livreur Étudiant ESP</div>
              <div className="font-black text-xs sm:text-sm text-slate-800 truncate">{order.deliveryAgent.name}</div>
              <div className="text-[10px] sm:text-xs text-slate-500 font-bold truncate">{order.deliveryAgent.transport}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Controls: Interactive simulation for testing */}
      <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="text-slate-700 font-medium text-[11px] sm:text-xs">
          💡 <strong>Mode Simulation :</strong> Vous pouvez avancer l'étape de livraison pour tester le suivi.
        </div>
        <button
          onClick={advanceDemoStatus}
          disabled={activeStepIndex >= 3}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black px-4 py-2.5 rounded-xl shrink-0 transition-transform active:scale-95 uppercase tracking-wider text-[11px] text-center"
        >
          {activeStepIndex >= 3 ? 'Livraison Terminée !' : 'Étape suivante →'}
        </button>
      </div>
    </div>
  );
};
