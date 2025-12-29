
import React, { useState } from 'react';
import { X, Lock, Mail, ChevronRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onSuccess({
        email,
        name: email.split('@')[0].toUpperCase(),
        isLoggedIn: true
      });
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Darkened/Blurred Overlay */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg animate-in fade-in zoom-in duration-300">
        
        {/* Back to Home Button */}
        <button 
          onClick={onClose}
          className="absolute -top-16 left-0 flex items-center space-x-3 text-slate-400 hover:text-white transition-colors group"
        >
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5">
            <ArrowLeft size={18} />
          </div>
          <span className="text-sm font-bold tracking-tight">Back to Home</span>
        </button>

        <div className="bg-[#0a0a0a] border border-white/5 rounded-[48px] p-8 md:p-12 shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#8b1d2e]/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col items-center text-center">
            {/* AK Logo Box */}
            <div className="w-16 h-16 bg-gradient-to-br from-[#d946ef] to-[#8b1d2e] rounded-2xl flex items-center justify-center shadow-lg mb-6">
              <span className="text-white font-black text-xl">AK</span>
            </div>

            <h2 className="text-3xl font-black text-white mb-2">Welcome Back</h2>
            <p className="text-slate-500 text-sm font-medium mb-10">Please sign in to your account</p>

            <form onSubmit={handleSubmit} className="w-full space-y-6">
              {/* Email Field */}
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold text-slate-300 ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full bg-[#111111] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-white/10 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2 text-left">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-slate-300">Password</label>
                  <button type="button" className="text-[11px] font-bold text-[#8b1d2e] hover:text-[#a62237] transition-colors">
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    className="w-full bg-[#111111] border border-white/5 rounded-2xl py-5 pl-14 pr-14 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-white/10 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-5 bg-[#8b1d2e] hover:bg-[#a62237] disabled:bg-slate-800 disabled:text-slate-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-[#8b1d2e]/10 active:scale-[0.98] flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="w-full flex items-center my-8">
              <div className="flex-1 h-[1px] bg-white/5"></div>
              <span className="px-4 text-[11px] font-bold text-slate-600 uppercase tracking-widest whitespace-nowrap">Or continue with</span>
              <div className="flex-1 h-[1px] bg-white/5"></div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <button className="flex items-center justify-center space-x-3 bg-transparent border border-white/5 rounded-2xl py-4 hover:bg-white/5 transition-all text-sm font-bold text-slate-300">
                <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" className="w-5 h-5" alt="Google" />
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center space-x-3 bg-transparent border border-white/5 rounded-2xl py-4 hover:bg-white/5 transition-all text-sm font-bold text-slate-300">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg"><path d="M17.05 20.28c-.96.95-2.04 1.72-3.24 1.72-1.35 0-1.87-.83-3.41-.83-1.55 0-2.12.81-3.37.83-1.2 0-2.28-.77-3.24-1.72-2-1.95-3.04-5.46-3.04-8.15 0-3.86 2.41-5.91 4.71-5.91.95 0 1.83.33 2.5.61.64.26 1.15.5 1.48.5.33 0 .84-.24 1.48-.5.67-.28 1.55-.61 2.5-.61 1.72 0 3.32.84 4.14 2.21-3.46 1.43-2.9 5.86.58 7.37-.6 1.43-1.34 2.86-2.3 3.84zM12.03 5.07c.05-1.15.54-2.26 1.34-3.13C14.2 1.08 15.34.48 16.51.5c.08 1.2-.42 2.38-1.22 3.25-.79.88-2.05 1.51-3.26 1.32z"/></svg>
                <span>Apple</span>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-10">
              <p className="text-slate-500 text-sm font-medium">
                Don't have an account? <button className="text-white font-black hover:underline transition-all">Sign up</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
