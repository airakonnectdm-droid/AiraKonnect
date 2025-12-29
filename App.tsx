import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandTrust from './components/BrandTrust';
import BrochureContent from './components/BrochureContent';
import ContactSection from './components/ContactSection';
import AuthModal from './components/AuthModal';
import LeadModal from './components/LeadModal';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import NewsSlider from './components/NewsSlider';
import NetworkDashboard from './components/NetworkDashboard';
import LoginGate from './components/LoginGate';
import { User } from './types';
import { Shield, Target, Zap, Globe, ArrowRight, X, Home } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progressBar = document.getElementById('scroll-progress');
      if (progressBar) {
        progressBar.style.width = scrolled + "%";
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkAccessGranted = () => {
    if (user && user.isLoggedIn) return true;
    
    const lastSubmission = localStorage.getItem('aira_lead_submitted_at');
    if (lastSubmission) {
      const submissionTime = parseInt(lastSubmission, 10);
      const thirtyMinutesInMs = 30 * 60 * 1000;
      if (Date.now() - submissionTime < thirtyMinutesInMs) {
        return true;
      }
    }
    return false;
  };

  const handleGateSuccess = () => {
    setIsAuthenticated(true);
    // Auto-login as the master user
    setUser({
      name: 'Aira Konnect Admin',
      email: 'admin@airakonnect.com',
      isLoggedIn: true
    });
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthModalOpen(false);
    setView('dashboard'); 
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
    setIsAuthenticated(false); // Force re-entry to gate on logout
    localStorage.removeItem('aira_lead_submitted_at');
  };

  const handleLeadCaptured = () => {
    setIsLeadModalOpen(false);
    localStorage.setItem('aira_lead_submitted_at', Date.now().toString());
    setView('dashboard'); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (checkAccessGranted()) {
      setView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsLeadModalOpen(true);
    }
  };

  const navigateToDashboard = () => {
    if (checkAccessGranted()) {
      setView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsLeadModalOpen(true);
    }
  };

  // Mandatory Login Gate
  if (!isAuthenticated) {
    return <LoginGate onSuccess={handleGateSuccess} />;
  }

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-white">
        <NetworkDashboard 
          initialSearch={searchQuery} 
          onBack={() => setView('landing')} 
          hasAccess={checkAccessGranted()}
          onRequestAccess={() => setIsLeadModalOpen(true)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-[#c4a47c]/30 overflow-x-hidden">
      <Navbar 
        user={user} 
        onLoginClick={() => setView('dashboard')} 
        onLogout={handleLogout}
        onDashboardClick={navigateToDashboard}
        onVenuesClick={navigateToDashboard}
      />
      
      <main className="flex flex-col space-y-0">
        <Hero 
          user={user}
          onSearch={handleSearch} 
          onLeadSubmit={handleLeadCaptured}
        />
        
        <BrandTrust />
        
        <div id="brochure-section">
          <BrochureContent 
            searchQuery={searchQuery} 
            onAction={() => setIsLeadModalOpen(true)}
            onCategorySelect={(cat) => handleSearch(cat)}
          />
        </div>

        {/* STRATEGIC INFLUENCE METHODOLOGY */}
        <section id="strategic-influence" className="bg-[#050810] py-20 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#c4a47c]/5 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
              
              <div className="flex-1 space-y-10 animate-in fade-in slide-in-from-left duration-1000">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-3 text-[#c4a47c] font-black text-[10px] uppercase tracking-[0.5em]">
                    <Globe size={14} className="animate-spin-slow" />
                    <span>Proprietary Methodology</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[0.9]">
                    Mastering the <br />
                    <span className="italic font-serif font-normal text-gradient-gold">Art of Dwell</span>
                  </h2>
                  <p className="text-slate-400 text-lg md:text-xl max-w-xl font-light leading-relaxed font-canva">
                    Aira Konnect isn't just a network; it's a strategic architecture. We synchronize brand messages with the subconscious rhythms of premium urban environments.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-[#c4a47c]/30 transition-all duration-500 group">
                    <div className="w-12 h-12 bg-[#c4a47c]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Target size={24} className="text-[#c4a47c]" />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-3">Hyper-Precision</h3>
                    <p className="text-slate-500 text-sm font-light leading-relaxed">Contextual placements that align with user psychology and venue atmosphere.</p>
                  </div>
                  
                  <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-[#c4a47c]/30 transition-all duration-500 group">
                    <div className="w-12 h-12 bg-[#c4a47c]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Zap size={24} className="text-[#c4a47c]" />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-3">Peak Influence</h3>
                    <p className="text-slate-500 text-sm font-light leading-relaxed">Capturing high-value attention during the 'receptive window' of dwell time.</p>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={navigateToDashboard}
                    className="flex items-center space-x-6 bg-white text-black px-12 py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-luxury hover:bg-[#c4a47c] hover:text-white transition-all active:scale-95 group/btn"
                  >
                    <span>Request Network Inventory</span>
                    <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="flex-1 w-full max-w-[550px] animate-in fade-in slide-in-from-right duration-1000 delay-300">
                <div className="relative group">
                  <div className="absolute -inset-10 bg-[#c4a47c]/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="relative rounded-[56px] overflow-hidden border border-white/10 shadow-luxury transition-all duration-1000 group-hover:scale-[1.03] group-hover:shadow-luxury-hover">
                    <img 
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                      className="w-full h-[650px] object-cover brightness-75 group-hover:brightness-90 transition-all duration-1000"
                      alt="Architecture of Influence"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-transparent opacity-90" />
                    
                    <div className="absolute bottom-12 left-12 right-12 text-center space-y-4">
                       <div className="w-12 h-[1px] bg-[#c4a47c]/60 mx-auto" />
                       <h4 className="text-white text-sm font-black tracking-[0.5em] uppercase opacity-60">Visual Dominance</h4>
                       <p className="text-white/80 text-xs font-light italic leading-relaxed max-w-xs mx-auto">"Influence is not loud; it is consistent, premium, and omnipresent in the halls of prestige."</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        < NewsSlider />

        <ContactSection />

        <Footer onVenuesClick={navigateToDashboard} />
      </main>

      <ScrollToTop />

      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)} 
          onSuccess={handleLogin} 
        />
      )}

      {isLeadModalOpen && (
        <LeadModal 
          onClose={() => setIsLeadModalOpen(false)} 
          onSuccess={handleLeadCaptured} 
        />
      )}
    </div>
  );
};

export default App;