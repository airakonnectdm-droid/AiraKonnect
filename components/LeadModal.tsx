
import React, { useState } from 'react';
import { X, User, Building2, Phone, Mail, CheckCircle2, ShieldCheck, Map } from 'lucide-react';

interface LeadModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const LeadModal: React.FC<LeadModalProps> = ({ onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: ''
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Explicit Simulation for requested email recipient
    console.log('--- LEAD GENERATION EMAIL SIMULATION (POPUP) ---');
    console.log('To: airakonnectdm@gmail.com');
    console.log('Payload:', formData);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#01030a]/90 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-[#030712] border border-white/10 rounded-[40px] shadow-luxury overflow-hidden animate-in fade-in zoom-in duration-500">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c4a47c] to-transparent" />
        
        <div className="p-10 md:p-12">
          <div className="flex justify-between items-start mb-10">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-[#c4a47c] text-[10px] font-black uppercase tracking-[0.4em]">
                <Map size={14} />
                <span>Premium Access</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tight">Unlock Interactive Network</h2>
              <p className="text-slate-400 text-sm font-light leading-relaxed max-w-sm">
                Register your interest to gain full access to our interactive venue map and screen availability dashboard.
              </p>
            </div>
            <button onClick={onClose} className="p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full border border-white/5">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Full Name"
                  required
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#c4a47c]/30 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Building2 size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Company Name"
                  required
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#c4a47c]/30 transition-all"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <Phone size={18} />
              </div>
              <input 
                type="tel" 
                placeholder="Phone Number"
                required
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#c4a47c]/30 transition-all"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                placeholder="Work Email"
                required
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#c4a47c]/30 transition-all"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white hover:bg-slate-100 disabled:bg-slate-800 text-black py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl transition-all active:scale-[0.98] mt-4 flex items-center justify-center space-x-3"
            >
              <ShieldCheck size={18} />
              <span>{isSubmitting ? 'Verifying Access...' : 'Access Discovery Map'}</span>
            </button>

            <div className="flex items-center justify-center space-x-8 pt-6 border-t border-white/5">
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Real-time Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Secure Portal</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadModal;
