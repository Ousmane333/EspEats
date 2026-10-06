import React, { useState } from 'react';
import { Order } from '../types';
import {
  Clock,
  CheckCircle2,
  Receipt,
  RotateCcw,
  Search,
  MapPin,
  Calendar,
  ChefHat,
  Truck,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';

interface OrderHistoryViewProps {
  orders: Order[];
  activeOrder: Order | null;
  onSelectOrder: (order: Order) => void;
  onTrackOrder: (order: Order) => void;
  onReorder: (order: Order) => void;
  onBackToMenu: () => void;
  onShowActiveReceipt: () => void;
  onLoadDemoOrders?: () => void;
}

export const OrderHistoryView: React.FC<OrderHistoryViewProps> = ({
  orders,
  activeOrder,
  onSelectOrder,
  onTrackOrder,
  onReorder,
  onBackToMenu,
  onShowActiveReceipt,
  onLoadDemoOrders
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'delivered'>('all');

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((i) => i.menuItem.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const isDelivered = order.status === 'delivered';
    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'active'
        ? !isDelivered
        : isDelivered;

    return matchesSearch && matchesStatus;
  });

  const totalSavedAllOrders = orders.reduce((sum, o) => sum + o.totalSaved, 0);

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full text-xs font-black">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Confirmée
          </span>
        );
      case 'preparing':
        return (
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-black">
            <ChefHat className="w-3.5 h-3.5 text-amber-600" />
            En Cuisine
          </span>
        );
      case 'delivering':
        return (
          <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-800 border border-orange-200 px-2.5 py-1 rounded-full text-xs font-black">
            <Truck className="w-3.5 h-3.5 text-orange-600 animate-bounce" />
            En Livraison
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-black">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Livrée & Archivée
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-2 sm:px-4 animate-fade-in space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Background Decorative Graphic */}
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none select-none text-9xl font-black text-white">
          ESP
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider mb-2">
              <Receipt className="w-3.5 h-3.5" />
              <span>Resto Campus ESP • Archives</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Historique de vos Commandes
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 max-w-lg">
              Retrouvez et téléchargez les reçus officiels de toutes vos commandes passées au Resto Campus.
            </p>
          </div>

          {/* Savings & Order Count Stat Box */}
          <div className="flex items-center gap-3 bg-slate-800/90 border border-slate-700/80 p-4 rounded-2xl shrink-0">
            <div className="w-12 h-12 rounded-xl bg-orange-500 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Total Économisé
              </div>
              <div className="text-xl font-black text-orange-400 font-mono">
                {totalSavedAllOrders.toLocaleString()} FCFA
              </div>
              <div className="text-[11px] text-slate-300 font-extrabold">
                {orders.length} commande{orders.length > 1 ? 's' : ''} enregistrée{orders.length > 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-orange-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Rechercher un plat, n° commande..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl pl-10 pr-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
              statusFilter === 'all'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Toutes ({orders.length})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
              statusFilter === 'active'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            En Cours ({orders.filter((o) => o.status !== 'delivered').length})
          </button>
          <button
            onClick={() => setStatusFilter('delivered')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
              statusFilter === 'delivered'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Livrées ({orders.filter((o) => o.status === 'delivered').length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isCurrentlySelected = activeOrder?.id === order.id;

            return (
              <div
                key={order.id}
                className={`bg-white rounded-3xl p-5 border-2 transition-all shadow-sm hover:shadow-md ${
                  isCurrentlySelected
                    ? 'border-orange-500 ring-2 ring-orange-200 bg-orange-50/20'
                    : 'border-orange-100 hover:border-orange-200'
                }`}
              >
                {/* Top Row: Ref + Status + Date */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-sm text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1 rounded-xl">
                      {order.orderNumber}
                    </span>
                    {getStatusBadge(order.status)}
                    {isCurrentlySelected && (
                      <span className="bg-orange-500 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded-md">
                        Reçu actif
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{order.createdAt}</span>
                  </div>
                </div>

                {/* Middle Content: Items summary & Delivery details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Items List */}
                  <div className="md:col-span-2 space-y-2">
                    <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                      Plats commandés ({order.items.length})
                    </div>
                    <div className="space-y-1.5">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-xl text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-lg bg-orange-100 text-orange-700 font-bold font-mono text-[11px] flex items-center justify-center shrink-0">
                              {item.quantity}x
                            </span>
                            <span className="font-extrabold text-slate-800">
                              {item.menuItem.name}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono line-through">
                            {(item.menuItem.normalPrice * item.quantity).toLocaleString()} FCFA
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Location & Total */}
                  <div className="bg-orange-50/60 border border-orange-200 rounded-2xl p-3.5 flex flex-col justify-between text-xs space-y-2">
                    <div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                        <span>Lieu de Livraison</span>
                      </div>
                      <div className="font-black text-slate-900 mt-1">
                        Chambre {order.student.roomNumberOrDetails}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-orange-200/80 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-extrabold">Facturé :</span>
                      <div className="text-right">
                        <span className="font-black text-orange-600 text-sm">0 FCFA</span>
                        <span className="text-[10px] text-slate-400 block font-medium">
                          (Offert - Pass ESP)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <div className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    <span>Commande du {order.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {order.status !== 'delivered' && (
                      <button
                        onClick={() => onTrackOrder(order)}
                        className="bg-orange-100 hover:bg-orange-200 text-orange-800 font-black px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                      >
                        <Truck className="w-3.5 h-3.5 text-orange-600" />
                        <span>Suivre Livraison</span>
                      </button>
                    )}

                    <button
                      onClick={() => onSelectOrder(order)}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-black px-4 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 active:scale-95"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>Voir le Reçu</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border-2 border-orange-100 p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 mx-auto flex items-center justify-center font-black text-2xl">
            📜
          </div>
          <h3 className="text-lg font-black text-slate-800">Aucune commande trouvée</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery || statusFilter !== 'all'
              ? 'Aucun résultat ne correspond à votre filtre. Essayez de réinitialiser la recherche.'
              : 'Vous n’avez pas encore passé de commande. Découvrez notre menu pour profiter de votre pass gratuit.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={onBackToMenu}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black px-6 py-2.5 rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all"
            >
              Découvrir le Menu
            </button>
            {onLoadDemoOrders && orders.length === 0 && (
              <button
                onClick={onLoadDemoOrders}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-2xl text-xs uppercase tracking-wider transition-all"
              >
                Charger exemple démo
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
