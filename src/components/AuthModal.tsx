import React, { useState } from 'react';
import { Terminal, Mail, Lock, ArrowRight, Github, Globe, X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string, username: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('dev@example.com');
  const [password, setPassword] = useState('••••••••');
  const [username, setUsername] = useState('dev_architect');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(email, username);
    onClose();
  };

  const handleSocialLogin = (provider: string) => {
    onLoginSuccess(`${provider.toLowerCase()}_user@devcanvas.io`, `dev_${provider.toLowerCase()}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0e1424] border border-[#22304d] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a233a] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Terminal Icon & Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#16213b] border border-[#2e3e67] flex items-center justify-center text-[#93c5fd] shadow-md mb-3">
            <Terminal className="w-6 h-6 text-[#93c5fd]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            DevCanvas
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Accede a tu entorno de desarrollo
          </p>
        </div>

        {/* Tab Switcher: Iniciar Sesión | Unirse */}
        <div className="flex border-b border-[#1e2a4a] mb-6">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 pb-3 text-xs sm:text-sm font-semibold tracking-wide transition-all relative ${
              authMode === 'login'
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Iniciar Sesión</span>
            {authMode === 'login' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6] shadow-[0_0_8px_#3b82f6]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`flex-1 pb-3 text-xs sm:text-sm font-semibold tracking-wide transition-all relative ${
              authMode === 'signup'
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Unirse</span>
            {authMode === 'signup' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6] shadow-[0_0_8px_#3b82f6]" />
            )}
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Nombre de Usuario
              </label>
              <div className="flex items-center w-full bg-[#131b2e] border border-[#22304d] rounded-xl px-3 py-2.5 focus-within:border-[#3b82f6] transition-all">
                <span className="text-slate-400 text-sm mr-2 font-mono">@</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="tu_usuario"
                  required
                  className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Correo Electrónico
            </label>
            <div className="flex items-center w-full bg-[#131b2e] border border-[#22304d] rounded-xl px-3 py-2.5 focus-within:border-[#3b82f6] transition-all">
              <Mail className="w-4 h-4 text-slate-400 mr-2.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dev@example.com"
                required
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Contraseña
              </label>
              {authMode === 'login' && (
                <button
                  type="button"
                  onClick={() => alert("Restablecer contraseña: Se ha enviado un enlace a tu correo.")}
                  className="text-[11px] text-[#93c5fd] hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              )}
            </div>
            <div className="flex items-center w-full bg-[#131b2e] border border-[#22304d] rounded-xl px-3 py-2.5 focus-within:border-[#3b82f6] transition-all">
              <Lock className="w-4 h-4 text-slate-400 mr-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#9bb6fb] hover:bg-[#b2c8fc] text-[#0b101e] font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-[0.99] mt-2 cursor-pointer"
          >
            <span>{authMode === 'login' ? 'Entrar al Lienzo' : 'Crear Cuenta'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#1e2a4a]" />
          </div>
          <span className="relative px-3 bg-[#0e1424] text-[11px] font-mono uppercase tracking-wider text-slate-400">
            O CONTINUAR CON
          </span>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin('GitHub')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#131b2e] hover:bg-[#1a243d] border border-[#22304d] text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin('Google')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#131b2e] hover:bg-[#1a243d] border border-[#22304d] text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Google</span>
          </button>
        </div>

        {/* Legal Disclaimer */}
        <p className="text-[11px] text-center text-slate-400 mt-6 leading-normal">
          Al continuar, aceptas nuestros{' '}
          <button onClick={() => alert("Términos de Servicio")} className="text-slate-300 hover:underline">
            Términos de Servicio
          </button>{' '}
          y{' '}
          <button onClick={() => alert("Política de Privacidad")} className="text-slate-300 hover:underline">
            Política de Privacidad
          </button>
          .
        </p>
      </div>
    </div>
  );
};
