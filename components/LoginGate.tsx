import React, { useState } from 'react';
import { Lock, User as UserIcon, ShieldAlert, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface LoginGateProps {
  onSuccess: () => void;
}

const LoginGate: React.FC<LoginGateProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);

    // Hardcoded credentials check per request
    setTimeout(() => {
      if (username === 'AiraKonnect' && password === 'Aira@12') {
        onSuccess();
      } else {
        setError(true);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#030712] flex items-center justify-center p-6 overflow-hidden">
      {/* Background Cinematic Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-[#c4a47c]/5 via-transparent to-transparent opacity-40" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#c4a47c]/10 blur-[150px] rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 blur-[150px] rounded-full" />
        
        {/* Animated Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      </div>

      <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-700">
        <div className="text-center mb-12 space-y-6">
          <div className="inline-block relative">
            <div className="absolute -inset-4 bg-[#c4a47c]/20 blur-2xl rounded-full opacity-50" />
            <h1 className="relative text-white font-black text-4xl tracking-tighter uppercase font-sans">
              AIRA <span className="text-[#c4a47c]">KONNECT</span>
            </h1>
          </div>
          <div className="space-y-1">
             <h2 className="text-white/60 text-[10px] font-black uppercase tracking-[0.5em]">Gatekeeper Protocol</h2>
             <p className="text-slate-500 text-xs font-light">Authentication required to access the network inventory.</p>
          </div>
        </div>

        <div className={`bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[48px] p-10 md:p-12 shadow-2xl transition-all duration-300 ${error ? 'border-red-500/50 shadow-red-500/10 scale-[1.02]' : ''}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Identity</label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500">
                  <UserIcon size={18} strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Username"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white text-sm placeholder:text-slate-700 focus:outline-none focus:border-[#c4a47c]/30 focus:bg-white/[0.06] transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Access Key</label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500">
                  <Lock size={18} strokeWidth={1.5} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Password"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-14 text-white text-sm placeholder:text-slate-700 focus:outline-none focus:border-[#c4a47c]/30 focus:bg-white/[0.06] transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 animate-in fade-in slide-in-from-top-2 duration-300">
                <ShieldAlert size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Access Denied</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-white hover:bg-[#c4a47c] hover:text-white text-black font-black rounded-2xl transition-all shadow-xl active:scale-[0.98] flex items-center justify-center space-x-3 uppercase text-[10px] tracking-[0.3em]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <span>Authenticate</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.5em] animate-pulse">
            Secure Terminal Active
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginGate;