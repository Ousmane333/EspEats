import React, { useState } from 'react';
import { Order, DeliveryStatus } from '../types';
import { ChefHat, Bike, CheckCircle2, Clock, Search, Filter, Phone, MapPin, User, QrCode, RefreshCw } from 'lucide-react';

interface AdminPanelProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, newStatus: DeliveryStatus) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ orders, onUpdateStatus }) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(o => {
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    const matchesSearch = 
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.student.deliveryLocation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: DeliveryStatus) => {
    switch (status) {
      case 'confirmed':
        return <span className="bg-orange-100 text-orange-600 border border-orange-200 px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">1. Reçue</span>;
      case 'preparing':
        return <span className="bg-blue-100 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">2. En Cuisine</span>;
      case 'delivering':
        return <span className="bg-purple-100 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">3. En Livraison</span>;
      case 'delivered':
        return <span className="bg-slate-900 text-white border border-slate-900 px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">4. Livrée</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 text-slate-800 animate-fade-in space-y-6">
      {/* Top Banner */}
      <div className="bg-white border-2 border-orange-100 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white font-black flex items-center justify-center shadow-md">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Espace Resto & Livreurs ESP</h2>
            <p className="text-xs text-slate-500 font-medium">
              Gestion des commandes gratuites des nouveaux étudiants ESP (Vérification Quota 3 articles max)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-orange-50 p-2 rounded-2xl border-2 border-orange-200 text-xs font-bold">
          <div className="px-3 py-1 bg-white text-orange-600 rounded-xl font-black border border-orange-200">
            Total : {orders.length}
          </div>
          <div className="px-3 py-1 bg-orange-500 text-white rounded-xl font-black">
            En cours : {orders.filter(o => o.status !== 'delivered').length}
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-4 rounded-3xl border-2 border-slate-100">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Rechercher par N° commande, nom étudiant, pavillon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-10 pr-3.5 py-2 text-xs text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {['all', 'confirmed', 'preparing', 'delivering', 'delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 ${
                filterStatus === st
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-orange-100 border border-slate-200'
              }`}
            >
              {st === 'all' ? 'Toutes' : st === 'confirmed' ? 'Reçues' : st === 'preparing' ? 'Cuisine' : st === 'delivering' ? 'Livraison' : 'Livrées'}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List Table */}
      <div className="bg-white border-2 border-orange-100 rounded-3xl overflow-hidden shadow-xl">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-medium text-xs">
            Aucune commande enregistrée pour le moment. Les commandes passées par les étudiants apparaîtront ici en temps réel.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-orange-50 text-orange-900 font-black uppercase text-[10px] tracking-wider border-b border-orange-100">
                <tr>
                  <th className="p-4">N° Commande</th>
                  <th className="p-4">Étudiant(e)</th>
                  <th className="p-4">Localisation ESP</th>
                  <th className="p-4">Articles (Max 3)</th>
                  <th className="p-4">Statut</th>
                  <th className="p-4 text-right">Actions Resto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-orange-50/50 transition-colors">
                    <td className="p-4 font-mono font-black text-orange-600">
                      {order.orderNumber}
                      <div className="text-[10px] text-slate-400 font-normal">{order.createdAt}</div>
                    </td>

                    <td className="p-4 font-extrabold text-slate-900">
                      <div>{order.student.fullName}</div>
                      <div className="text-[10px] text-orange-600 font-mono">{order.student.studentId} • {order.student.phone}</div>
                    </td>

                    <td className="p-4 text-slate-700">
                      <div className="font-bold">{order.student.deliveryLocation}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{order.student.roomNumberOrDetails}</div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-0.5">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="text-[11px] text-slate-700 font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                            <span>{it.menuItem.name}</span>
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-orange-600 block mt-1 uppercase">
                        Total : {order.items.length} / 3 articles
                      </span>
                    </td>

                    <td className="p-4">
                      {getStatusBadge(order.status)}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {order.status === 'confirmed' && (
                          <button
                            onClick={() => onUpdateStatus(order.id, 'preparing')}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-black px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm"
                          >
                            Passer en Cuisine 👨‍🍳
                          </button>
                        )}

                        {order.status === 'preparing' && (
                          <button
                            onClick={() => onUpdateStatus(order.id, 'delivering')}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-black px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm"
                          >
                            Confier au Livreur 🚲
                          </button>
                        )}

                        {order.status === 'delivering' && (
                          <button
                            onClick={() => onUpdateStatus(order.id, 'delivered')}
                            className="bg-slate-900 hover:bg-black text-white font-black px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm"
                          >
                            Valider Livraison (Scan) ✓
                          </button>
                        )}

                        {order.status === 'delivered' && (
                          <span className="text-orange-600 font-black text-[11px] flex items-center gap-1 uppercase">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Livrée
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
