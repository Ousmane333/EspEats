import React, { useState, useEffect } from 'react';
import { StudentInfo, CartItem } from '../types';
import { CAMPUS_LOCATIONS, DEPARTMENTS_LIST, LEVELS_LIST } from '../data/menu';
import { X, MapPin, User, Phone, Mail, GraduationCap, Building2, CheckCircle2, ShieldCheck, Sparkles, Edit3, Lock, AlertTriangle } from 'lucide-react';
import { extractLocalDigits, formatSenegalLocalDigits, isValidSenegalPhone, toFullSenegalPhone } from '../utils/phone';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onConfirmOrder: (studentInfo: StudentInfo) => void;
  studentProfile?: StudentInfo | null;
  onEditCart?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onConfirmOrder,
  studentProfile,
  onEditCart
}) => {
  const [fullName, setFullName] = useState(studentProfile?.fullName || '');
  const [email, setEmail] = useState(studentProfile?.email || '');
  const [studentId, setStudentId] = useState(studentProfile?.studentId || `ESP-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [department, setDepartment] = useState(studentProfile?.department || DEPARTMENTS_LIST[0]);
  const [level, setLevel] = useState(studentProfile?.level || LEVELS_LIST[0]);
  const [phoneLocal, setPhoneLocal] = useState(
    extractLocalDigits(studentProfile?.phone || '') || ''
  );
  const [deliveryLocation, setDeliveryLocation] = useState(studentProfile?.deliveryLocation || CAMPUS_LOCATIONS[0].name);
  const [roomNumberOrDetails, setRoomNumberOrDetails] = useState(studentProfile?.roomNumberOrDetails || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFullName(studentProfile?.fullName || '');
      setEmail(studentProfile?.email || '');
      setStudentId(studentProfile?.studentId || `ESP-2026-${Math.floor(1000 + Math.random() * 9000)}`);
      setDepartment(studentProfile?.department || DEPARTMENTS_LIST[0]);
      setLevel(studentProfile?.level || LEVELS_LIST[0]);
      setPhoneLocal(extractLocalDigits(studentProfile?.phone || '') || '');
      setDeliveryLocation(studentProfile?.deliveryLocation || CAMPUS_LOCATIONS[0].name);
      setRoomNumberOrDetails(studentProfile?.roomNumberOrDetails || '');
      setError('');
    }
  }, [isOpen, studentProfile]);

  if (!isOpen) return null;

  const totalValueSaved = cartItems.reduce((sum, item) => sum + item.menuItem.normalPrice * item.quantity, 0);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatSenegalLocalDigits(e.target.value);
    setPhoneLocal(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Veuillez entrer votre nom et prénom.');
      return;
    }
    if (!isValidSenegalPhone(phoneLocal)) {
      setError('Veuillez fournir un numéro de téléphone à 9 chiffres valide (ex : 77 123 45 67).');
      return;
    }
    if (!roomNumberOrDetails.trim()) {
      setError('Veuillez indiquer le numéro de votre chambre (exemple : 22G).');
      return;
    }

    setError('');
    onConfirmOrder({
      fullName,
      email: email || `${fullName.toLowerCase().replace(/\s+/g, '.')}@esp.sn`,
      studentId,
      department,
      level,
      phone: toFullSenegalPhone(phoneLocal),
      deliveryLocation,
      roomNumberOrDetails
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white border-2 border-orange-100 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl text-slate-800 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-orange-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-orange-600 font-black flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-black text-lg uppercase tracking-tight text-white">Validation de Commande ESP</h2>
              <p className="text-xs text-orange-100 font-bold uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                Offre Intégration Nouveaux Étudiants (3 Articles Offerts)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-orange-100 hover:text-white rounded-xl hover:bg-orange-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 custom-scrollbar flex-1">
          {error && (
            <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-xs rounded-xl font-bold">
              ⚠️ {error}
            </div>
          )}

          {/* Item Review & Modification Step */}
          <div className="bg-orange-50/90 p-4 rounded-2xl border-2 border-orange-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <h3 className="font-black text-xs text-slate-900 uppercase tracking-wider">
                  Votre Menu Sélectionné ({cartItems.length} / 3 articles)
                </h3>
              </div>
              {onEditCart && (
                <button
                  type="button"
                  onClick={onEditCart}
                  className="bg-white hover:bg-orange-100 text-orange-600 border border-orange-300 font-extrabold text-[11px] px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs transition-all hover:scale-105 active:scale-95"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Modifier mon menu</span>
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-2.5 rounded-xl border border-orange-100 flex items-center gap-3">
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-xs text-slate-800 truncate">{item.menuItem.name}</div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      {Object.entries(item.selectedOptions).map(([k, v]) => `${k}: ${v}`).join(' • ') || 'Option standard'}
                    </div>
                  </div>
                  <div className="text-xs font-black text-orange-600 bg-orange-100 px-2 py-0.5 rounded-md">
                    OFFERT
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs pt-1 border-t border-orange-200/80 font-bold text-slate-700">
              <span>Total prise en charge ESP :</span>
              <span className="text-orange-600 font-black">0 FCFA (-{totalValueSaved.toLocaleString()} FCFA)</span>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-orange-600 uppercase tracking-widest flex items-center gap-1.5 border-b border-orange-100 pb-1.5">
              <User className="w-3.5 h-3.5" />
              <span>1. Identité de l'étudiant(e)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-700 block mb-1 font-extrabold">Nom & Prénom *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Aminata Diallo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-700 block mb-1 font-extrabold">N° Carte / Identifiant ESP</label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-orange-600 font-mono font-black focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-700 block mb-1 font-extrabold">Département ESP</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-orange-500"
                >
                  {DEPARTMENTS_LIST.map((dept, i) => (
                    <option key={i} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-700 block mb-1 font-extrabold">Niveau d'études</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-orange-500"
                >
                  {LEVELS_LIST.map((lvl, i) => (
                    <option key={i} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-700 block mb-1 font-extrabold">Téléphone (Appel livreur) *</label>
                <div className="flex items-center rounded-xl border-2 border-slate-200 bg-transparent overflow-hidden focus-within:border-orange-500 focus-within:bg-transparent transition-colors">
                  <div className="bg-transparent text-slate-700 font-mono font-black text-xs px-3 py-2.5 flex items-center gap-1.5 border-r border-slate-200 shrink-0 select-none">
                    <Phone className="w-3.5 h-3.5 text-orange-600" />
                    <span>+221</span>
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="77 123 45 67"
                    value={phoneLocal}
                    onChange={handlePhoneChange}
                    maxLength={12}
                    className="w-full bg-transparent px-3.5 py-2.5 text-xs text-slate-900 font-mono font-bold focus:outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-700 block mb-1 font-extrabold">Adresse Email *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="etudiant@esp.sn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Location Section */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-black text-orange-600 uppercase tracking-widest flex items-center gap-1.5 border-b border-orange-100 pb-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>2. Chambre de livraison sur le Campus ESP</span>
            </h3>

            <div>
              <label className="text-xs text-slate-700 block mb-1 font-extrabold">Nom / Numéro de la chambre (exemple : 22G) *</label>
              <input
                type="text"
                required
                placeholder="Ex: 22G"
                value={roomNumberOrDetails}
                onChange={(e) => setRoomNumberOrDetails(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Lock & Non-reversible Warning Notice */}
          <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1 text-amber-900">
              <div className="font-extrabold uppercase tracking-wide">
                ⚠️ Attention : Validation Définitive
              </div>
              <p className="text-[11px] font-medium leading-relaxed text-amber-800">
                Une fois votre commande <strong>validée</strong>, elle est automatiquement verrouillée et transmise à la cuisine du restaurant universitaire et à votre livreur. <strong>Vous ne pourrez plus revenir en arrière ni la modifier.</strong> Vous serez directement réorienté(e) vers l'écran de <strong>suivi en direct</strong>.
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-6 rounded-2xl shadow-md uppercase tracking-widest text-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Valider Définitivement Ma Commande (0 FCFA)</span>
          </button>
        </form>
      </div>
    </div>
  );
};
