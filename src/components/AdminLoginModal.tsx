import React, { useState, useEffect } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, X, AlertCircle, ChefHat } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Garantit que les cases restent toujours totalement vides à chaque ouverture
  useEffect(() => {
    if (isOpen) {
      setUsername('');
      setPassword('');
      setError('');
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Identifiants requis : Nom : admin / mot de passe : adminsekou
    if (username.trim().toLowerCase() === 'admin' && password === 'adminsekou') {
      setTimeout(() => {
        setIsLoading(false);
        setPassword('');
        setError('');
        onLoginSuccess();
      }, 300);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setError('Nom d\'utilisateur ou mot de passe incorrect.');
      }, 300);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border-2 border-orange-200 overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-black uppercase tracking-wider">Connexion Espace Admin</h2>
              <p className="text-[11px] text-orange-100 font-medium">Gestion Resto, Livreurs & Historique ESP</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content & Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border-2 border-red-200 rounded-2xl flex items-center gap-2.5 text-xs text-red-700 font-bold animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <div className="bg-orange-50/70 border border-orange-200/80 p-3.5 rounded-2xl text-[11px] text-slate-700 space-y-1">
            <div className="font-extrabold text-orange-800 flex items-center gap-1.5">
              <ChefHat className="w-3.5 h-3.5 text-orange-600" />
              <span>Accès réservé aux gestionnaires</span>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed">
              Consultez toutes les commandes passées, effectuez des recherches par nom, téléphone ou <strong>numéro de chambre</strong>, et mettez à jour le statut des livraisons.
            </p>
          </div>

          <div>
            <label className="text-xs text-slate-700 block mb-1.5 font-extrabold">Nom d'utilisateur</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                autoFocus
                placeholder=""
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-700 block mb-1.5 font-extrabold">Mot de passe</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder=""
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-orange-500 transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black py-3.5 px-4 rounded-xl shadow-md uppercase tracking-wider text-xs transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Vérification...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Se connecter à l'espace Admin</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
