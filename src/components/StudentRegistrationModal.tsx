import React, { useState, useEffect } from 'react';
import { StudentInfo } from '../types';
import { CAMPUS_LOCATIONS, DEPARTMENTS_LIST, LEVELS_LIST } from '../data/menu';
import { GraduationCap, User, Mail, Phone, MapPin, Building2, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { extractLocalDigits, formatSenegalLocalDigits, isValidSenegalPhone, toFullSenegalPhone } from '../utils/phone';

interface StudentRegistrationModalProps {
  isOpen: boolean;
  onSaveProfile: (profile: StudentInfo) => void;
  currentProfile: StudentInfo | null;
  isEditing?: boolean;
  onCloseEdit?: () => void;
  onResetAsNewUser?: () => void;
}

export const StudentRegistrationModal: React.FC<StudentRegistrationModalProps> = ({
  isOpen,
  onSaveProfile,
  currentProfile,
  isEditing = false,
  onCloseEdit,
  onResetAsNewUser
}) => {
  const [fullName, setFullName] = useState(currentProfile?.fullName || '');
  const [email, setEmail] = useState(currentProfile?.email || '');
  const [phoneLocal, setPhoneLocal] = useState(
    extractLocalDigits(currentProfile?.phone || '') || ''
  );
  const [studentId, setStudentId] = useState(
    currentProfile?.studentId || `ESP-2026-${Math.floor(1000 + Math.random() * 9000)}`
  );
  const [department, setDepartment] = useState(currentProfile?.department || DEPARTMENTS_LIST[0]);
  const [level, setLevel] = useState(currentProfile?.level || LEVELS_LIST[0]);
  const [deliveryLocation, setDeliveryLocation] = useState(
    currentProfile?.deliveryLocation || CAMPUS_LOCATIONS[0].name
  );
  const [roomNumberOrDetails, setRoomNumberOrDetails] = useState(currentProfile?.roomNumberOrDetails || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFullName(currentProfile?.fullName || '');
      setEmail(currentProfile?.email || '');
      setPhoneLocal(extractLocalDigits(currentProfile?.phone || '') || '');
      setStudentId(currentProfile?.studentId || `ESP-2026-${Math.floor(1000 + Math.random() * 9000)}`);
      setDepartment(currentProfile?.department || DEPARTMENTS_LIST[0]);
      setLevel(currentProfile?.level || LEVELS_LIST[0]);
      setDeliveryLocation(currentProfile?.deliveryLocation || CAMPUS_LOCATIONS[0].name);
      setRoomNumberOrDetails(currentProfile?.roomNumberOrDetails || '');
      setError('');
    }
  }, [isOpen, currentProfile]);

  if (!isOpen) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatSenegalLocalDigits(e.target.value);
    setPhoneLocal(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setError('Veuillez saisir votre nom et prénom.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Veuillez saisir une adresse e-mail valide (ex: etudiant@esp.sn).');
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
    const profile: StudentInfo = {
      fullName,
      email,
      phone: toFullSenegalPhone(phoneLocal),
      studentId,
      department,
      level,
      deliveryLocation,
      roomNumberOrDetails
    };

    onSaveProfile(profile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-white border-2 border-orange-200 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl text-slate-800 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Header */}
        <div className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-orange-600 font-black flex items-center justify-center shadow-md">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-orange-700/80 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-yellow-300 mb-1">
                <Sparkles className="w-3 h-3" />
                <span>ESP Dakar • Identification Étudiante</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white leading-tight">
                {isEditing ? 'Modifier mon profil étudiant' : 'Inscription Nouvel Étudiant ESP'}
              </h2>
            </div>
          </div>

          {isEditing && onCloseEdit && (
            <button
              onClick={onCloseEdit}
              className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-xl transition-colors"
            >
              Fermer
            </button>
          )}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 custom-scrollbar flex-1">
          {!isEditing && (
            <div className="p-4 bg-orange-50 border-2 border-orange-200 rounded-2xl text-xs space-y-1">
              <div className="font-black text-orange-700 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span>Identification obligatoire avant de commander</span>
              </div>
              <p className="text-slate-600 font-medium">
                Saisissez vos informations pour débloquer votre <strong>Pass Intégration 2026</strong> et bénéficier de vos 3 repas & boissons gratuits au Resto Campus.
              </p>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-100 border-2 border-red-200 text-red-700 text-xs rounded-xl font-bold">
              ⚠️ {error}
            </div>
          )}

          {/* Personal Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-orange-600 uppercase tracking-widest flex items-center gap-1.5 border-b border-orange-100 pb-1.5">
              <User className="w-4 h-4" />
              <span>1. Identité & Coordonnées</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-700 block mb-1 font-extrabold">Nom & Prénom *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Ex : Cheikh Tidiane Sy"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-700 block mb-1 font-extrabold">Adresse E-mail *</label>
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

            <div>
              <label className="text-xs text-slate-700 block mb-1 font-extrabold">Téléphone (WhatsApp / Appel) *</label>
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
          </div>

          {/* Academic Info */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-black text-orange-600 uppercase tracking-widest flex items-center gap-1.5 border-b border-orange-100 pb-1.5">
              <Building2 className="w-4 h-4" />
              <span>2. Département & Niveau d'études</span>
            </h3>

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
          </div>

          {/* Delivery Location */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-black text-orange-600 uppercase tracking-widest flex items-center gap-1.5 border-b border-orange-100 pb-1.5">
              <MapPin className="w-4 h-4" />
              <span>3. Lieu de livraison (Chambre ESP)</span>
            </h3>

            <div>
              <label className="text-xs text-slate-700 block mb-1 font-extrabold">Numéro de chambre *</label>
              <input
                type="text"
                required
                placeholder="Ex : 22G"
                value={roomNumberOrDetails}
                onChange={(e) => setRoomNumberOrDetails(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-6 rounded-2xl shadow-md uppercase tracking-widest text-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 mt-4"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{isEditing ? 'Enregistrer les modifications' : 'Valider mon profil & Accéder à l\'application'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
