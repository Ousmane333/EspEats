import React, { useState, useMemo } from 'react';
import { Order, DeliveryStatus } from '../types';
import { 
  ChefHat, Bike, CheckCircle2, Clock, Search, Filter, Phone, MapPin, 
  User, QrCode, RefreshCw, LogOut, ArrowUpDown, X, Sparkles, Building,
  PackageCheck, Utensils, AlertTriangle, ShieldCheck
} from 'lucide-react';

interface AdminPanelProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, newStatus: DeliveryStatus) => void;
  onLogout?: () => void;
  onViewOrderReceipt?: (order: Order) => void;
  onRefreshOrders?: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
  orders = [], 
  onUpdateStatus, 
  onLogout,
  onViewOrderReceipt,
  onRefreshOrders
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Safe list of orders
  const safeOrders = useMemo(() => {
    return Array.isArray(orders) ? orders.filter((o): o is Order => !!o && typeof o === 'object') : [];
  }, [orders]);

  // Advanced multi-criteria search filtering
  const filteredOrders = useMemo(() => {
    return safeOrders.filter(o => {
      if (!o) return false;

      // 1. Status filter
      const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
      if (!matchesStatus) return false;

      // 2. Search term matching across ALL fields
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase().trim();

      const studentName = (o.student?.fullName || '').toLowerCase();
      const studentPhone = (o.student?.phone || '').toLowerCase();
      const roomNumber = (o.student?.roomNumberOrDetails || '').toLowerCase();
      const orderNumber = (o.orderNumber || '').toLowerCase();
      const studentId = (o.student?.studentId || '').toLowerCase();
      const location = (o.student?.deliveryLocation || '').toLowerCase();
      const department = (o.student?.department || '').toLowerCase();
      const agentName = (o.deliveryAgent?.name || '').toLowerCase();
      const agentPhone = (o.deliveryAgent?.phone || '').toLowerCase();
      const itemsNames = (o.items || []).map(it => it?.menuItem?.name?.toLowerCase() || '').join(' ');

      return (
        studentName.includes(term) ||
        studentPhone.includes(term) ||
        roomNumber.includes(term) ||
        orderNumber.includes(term) ||
        studentId.includes(term) ||
        location.includes(term) ||
        department.includes(term) ||
        agentName.includes(term) ||
        agentPhone.includes(term) ||
        itemsNames.includes(term)
      );
    });
  }, [safeOrders, filterStatus, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    const total = safeOrders.length;
    const confirmed = safeOrders.filter(o => o?.status === 'confirmed').length;
    const preparing = safeOrders.filter(o => o?.status === 'preparing').length;
    const delivering = safeOrders.filter(o => o?.status === 'delivering').length;
    const delivered = safeOrders.filter(o => o?.status === 'delivered').length;
    return { total, confirmed, preparing, delivering, delivered };
  }, [safeOrders]);

  const handleManualRefresh = () => {
    if (onRefreshOrders) {
      setIsRefreshing(true);
      onRefreshOrders();
      setTimeout(() => setIsRefreshing(false), 600);
    }
  };

  const getStatusBadge = (status: DeliveryStatus) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 border border-orange-200 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
            <Clock className="w-3 h-3 text-orange-600 animate-pulse" />
            <span>1. Reçue</span>
          </span>
        );
      case 'preparing':
        return (
          <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
            <ChefHat className="w-3 h-3 text-blue-600" />
            <span>2. En Cuisine</span>
          </span>
        );
      case 'delivering':
        return (
          <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
            <Bike className="w-3 h-3 text-purple-600 animate-bounce" />
            <span>3. En Livraison</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>4. Livrée</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-4 sm:py-6 px-2.5 sm:px-4 text-slate-800 animate-fade-in space-y-5">
      {/* Top Banner & Admin Header */}
      <div className="bg-white border-2 border-orange-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-600 text-white font-black flex items-center justify-center shadow-md shrink-0">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Espace Admin Resto & Livreurs ESP
              </h2>
              <span className="bg-orange-100 text-orange-700 text-[10px] font-mono font-black px-2 py-0.5 rounded-full border border-orange-300 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-orange-600" />
                <span>admin</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Historique complet de toutes les commandes, recherche multi-critères et suivi des livraisons
            </p>
          </div>
        </div>

        {/* Top actions & Logout */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          {/* Live Sync Status indicator */}
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Synchro Directe Mondiale</span>
          </div>

          <div className="bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-200 text-xs font-black text-orange-900">
            {safeOrders.length} commande{safeOrders.length > 1 ? 's' : ''} au total
          </div>

          {onRefreshOrders && (
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="bg-white hover:bg-orange-50 text-orange-700 font-black px-3 py-2 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 border border-orange-200 shadow-2xs active:scale-95 disabled:opacity-60"
              title="Actualiser les commandes depuis le serveur"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-orange-600' : ''}`} />
              <span className="hidden sm:inline">Actualiser</span>
            </button>
          )}

          {onLogout && (
            <button
              onClick={onLogout}
              className="bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 font-black px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 border border-slate-200 shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>
          )}
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <button
          onClick={() => setFilterStatus('all')}
          className={`p-3 rounded-2xl border-2 text-left transition-all ${
            filterStatus === 'all'
              ? 'bg-orange-500 text-white border-orange-600 shadow-md scale-[1.02]'
              : 'bg-white border-slate-200 hover:border-orange-300'
          }`}
        >
          <div className="text-[10px] font-black uppercase tracking-wider opacity-80">Toutes les commandes</div>
          <div className="text-xl sm:text-2xl font-black font-mono mt-0.5">{stats.total}</div>
        </button>

        <button
          onClick={() => setFilterStatus('confirmed')}
          className={`p-3 rounded-2xl border-2 text-left transition-all ${
            filterStatus === 'confirmed'
              ? 'bg-orange-500 text-white border-orange-600 shadow-md scale-[1.02]'
              : 'bg-white border-slate-200 hover:border-orange-300'
          }`}
        >
          <div className="text-[10px] font-black uppercase tracking-wider opacity-80">Reçues (À préparer)</div>
          <div className="text-xl sm:text-2xl font-black font-mono mt-0.5">{stats.confirmed}</div>
        </button>

        <button
          onClick={() => setFilterStatus('delivering')}
          className={`p-3 rounded-2xl border-2 text-left transition-all ${
            filterStatus === 'delivering'
              ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-[1.02]'
              : 'bg-white border-slate-200 hover:border-purple-300'
          }`}
        >
          <div className="text-[10px] font-black uppercase tracking-wider opacity-80">En Cours de Livraison</div>
          <div className="text-xl sm:text-2xl font-black font-mono mt-0.5">{stats.delivering}</div>
        </button>

        <button
          onClick={() => setFilterStatus('delivered')}
          className={`p-3 rounded-2xl border-2 text-left transition-all ${
            filterStatus === 'delivered'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-[1.02]'
              : 'bg-white border-slate-200 hover:border-emerald-300'
          }`}
        >
          <div className="text-[10px] font-black uppercase tracking-wider opacity-80">Livrées (Terminées)</div>
          <div className="text-xl sm:text-2xl font-black font-mono mt-0.5">{stats.delivered}</div>
        </button>
      </div>

      {/* Advanced Multi-criteria Search & Filters */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border-2 border-orange-100 shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Universal Search input: Name, Phone, Room Number, Order ID, etc. */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-orange-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Rechercher par nom, téléphone, numéro de chambre (ex : 22G), N° commande..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl pl-10 pr-10 py-2.5 text-xs text-slate-900 font-semibold placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 p-0.5"
                title="Effacer la recherche"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status filter buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
            {[
              { id: 'all', label: 'Toutes' },
              { id: 'confirmed', label: 'Reçues' },
              { id: 'preparing', label: 'Cuisine' },
              { id: 'delivering', label: 'Livraison' },
              { id: 'delivered', label: 'Livrées' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                  filterStatus === tab.id
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-orange-50 text-slate-600 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Summary */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
          <div>
            {searchTerm ? (
              <span>
                Résultats pour « <strong className="text-orange-600">{searchTerm}</strong> » :{' '}
                <strong className="text-slate-900">{filteredOrders.length}</strong> commande(s) trouvée(s)
              </span>
            ) : (
              <span>
                Affichage de <strong className="text-slate-900">{filteredOrders.length}</strong> commande(s)
              </span>
            )}
          </div>

          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 underline"
            >
              Réinitialiser la recherche
            </button>
          )}
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white border-2 border-orange-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
        {safeOrders.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto shadow-inner">
              <PackageCheck className="w-7 h-7" />
            </div>
            <h3 className="font-black text-slate-900 text-base">Aucune commande enregistrée pour le moment</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Les commandes sont synchronisées en direct. Dès qu'un étudiant ou client valide sa commande sur le site, elle apparaîtra ici instantanément avec toutes ses informations (nom, téléphone, <strong>numéro de chambre</strong>, formule choisie et statut de livraison).
            </p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-sm">Aucun résultat trouvé</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Aucune commande ne correspond à votre recherche « {searchTerm} ». Vérifiez l'orthographe du nom, téléphone ou numéro de chambre.
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-2 text-xs font-bold text-orange-600 hover:text-orange-700 underline"
              >
                Effacer la recherche
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredOrders.map((order) => {
              return (
                <div 
                  key={order.id} 
                  className="p-4 sm:p-5 hover:bg-orange-50/40 transition-colors space-y-3.5"
                >
                  {/* Row Top: Order ID, Date, Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200">
                        {order.orderNumber}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{order.createdAt}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {getStatusBadge(order.status)}

                      {onViewOrderReceipt && (
                        <button
                          onClick={() => onViewOrderReceipt(order)}
                          className="bg-white hover:bg-orange-100 text-orange-600 border border-orange-300 font-black text-[11px] px-2.5 py-1 rounded-xl shadow-2xs transition-colors"
                        >
                          Voir Reçu
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Main Grid: Student & Location + Order Items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left Column: Student Details & Room Number */}
                    <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-black text-xs text-slate-900 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-orange-600" />
                            <span>{order.student?.fullName || 'Client Étudiant'}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                            {order.student?.studentId || 'ID N/A'} • {order.student?.department || 'ESP'}
                          </div>
                        </div>

                        {/* Direct Phone Call Button */}
                        {order.student?.phone ? (
                          <a
                            href={`tel:${order.student.phone.replace(/\s+/g, '')}`}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-black px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-2xs transition-transform active:scale-95"
                            title="Appeler l'étudiant"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{order.student.phone}</span>
                          </a>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-medium italic">Numéro non renseigné</span>
                        )}
                      </div>

                      {/* Delivery Address with Prominent Room Number */}
                      <div className="pt-1.5 border-t border-slate-200/70 flex flex-wrap items-center gap-2 text-xs">
                        <div className="flex items-center gap-1 font-bold text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span>{order.student?.deliveryLocation || 'Campus ESP'}</span>
                        </div>

                        {/* Room number highlighted */}
                        <div className="bg-orange-500 text-white font-black text-[11px] px-2 py-0.5 rounded-lg font-mono shadow-2xs flex items-center gap-1">
                          <span>🚪 Chambre :</span>
                          <span>{order.student?.roomNumberOrDetails || 'Non spécifiée'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Ordered Items Breakdown */}
                    <div className="bg-orange-50/60 p-3.5 rounded-2xl border border-orange-200/80 space-y-2">
                      <div className="text-[11px] font-black text-orange-900 uppercase tracking-wider flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Utensils className="w-3.5 h-3.5 text-orange-600" />
                          <span>Menu Choisi ({(order.items || []).length}/3)</span>
                        </span>
                        <span className="text-emerald-700 font-extrabold text-[10px]">
                          100% Offert (0 FCFA)
                        </span>
                      </div>

                      <div className="space-y-1">
                        {(order.items || []).map((it, idx) => (
                          <div key={idx} className="text-xs flex items-center justify-between gap-2">
                            <span className="font-bold text-slate-800 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                              <span>{it.menuItem?.name || 'Article'}</span>
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium truncate max-w-[140px]">
                              {it.selectedOptions ? Object.entries(it.selectedOptions).map(([_, v]) => `${v}`).join(', ') : 'Standard'}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Assigned Delivery Agent */}
                      {order.deliveryAgent && (
                        <div className="pt-1.5 border-t border-orange-200/60 flex items-center justify-between text-[11px] text-slate-600">
                          <span className="font-medium flex items-center gap-1">
                            <Bike className="w-3.5 h-3.5 text-purple-600" />
                            <span>Livreur : <strong>{order.deliveryAgent.name}</strong></span>
                          </span>
                          <span className="font-mono text-purple-700 font-bold">
                            {order.deliveryAgent.phone}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Row Bottom: Status Flow Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400 font-semibold">
                      Action rapide statut :
                    </span>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {order.status === 'confirmed' && (
                        <button
                          onClick={() => onUpdateStatus(order.id, 'preparing')}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-black px-3.5 py-1.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-xs flex items-center gap-1"
                        >
                          <ChefHat className="w-3.5 h-3.5" />
                          <span>Lancer en Cuisine 👨‍🍳</span>
                        </button>
                      )}

                      {order.status === 'preparing' && (
                        <button
                          onClick={() => onUpdateStatus(order.id, 'delivering')}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-black px-3.5 py-1.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-xs flex items-center gap-1"
                        >
                          <Bike className="w-3.5 h-3.5" />
                          <span>Confier au Livreur 🚲</span>
                        </button>
                      )}

                      {order.status === 'delivering' && (
                        <button
                          onClick={() => onUpdateStatus(order.id, 'delivered')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-3.5 py-1.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-xs flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Valider Livraison Terminée ✓</span>
                        </button>
                      )}

                      {order.status === 'delivered' && (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-black text-xs px-3 py-1 rounded-xl flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Livraison effectuée avec succès</span>
                        </span>
                      )}

                      {/* Manual reset/toggle status if needed */}
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateStatus(order.id, e.target.value as DeliveryStatus)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold px-2 py-1.5 rounded-xl border border-slate-300 focus:outline-none"
                        title="Changer manuellement le statut"
                      >
                        <option value="confirmed">1. Reçue</option>
                        <option value="preparing">2. En Cuisine</option>
                        <option value="delivering">3. En Livraison</option>
                        <option value="delivered">4. Livrée</option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
