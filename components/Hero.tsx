import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, ChevronDown, User, Building2, Phone, Mail, CheckCircle2, Calendar as CalendarIcon, MapPin, ArrowRight } from 'lucide-react';
import { SLIDER_IMAGES } from '../constants';
import { User as UserType } from '../types';

interface HeroProps {
  user: UserType | null;
  onSearch: (query: string) => void;
  onLeadSubmit?: () => void;
}

const Hero: React.FC<HeroProps> = ({ user, onSearch, onLeadSubmit }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Date State
  const today = new Date();
  const defaultStartDate = today.toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(defaultStartDate);
  
  const defaultEndDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  }, []);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: ''
  });

  // Check if lead form should be hidden (Logged in or submitted within 30 mins)
  useEffect(() => {
    const checkLeadStatus = () => {
      if (user) {
        setShowLeadForm(false);
        return;
      }

      const lastSubmission = localStorage.getItem('aira_lead_submitted_at');
      if (lastSubmission) {
        const submissionTime = parseInt(lastSubmission, 10);
        const thirtyMinutesInMs = 30 * 60 * 1000;
        if (Date.now() - submissionTime < thirtyMinutesInMs) {
          setShowLeadForm(false);
          return;
        }
      }
      setShowLeadForm(true);
    };

    checkLeadStatus();
    // Re-check periodically if the 30 mins have passed
    const interval = setInterval(checkLeadStatus, 60000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log('--- LEAD GENERATION EMAIL SIMULATION ---', {
      to: 'airakonnectdm@gmail.com',
      from: formData.email,
      data: { ...formData, dates: `${startDate} to ${endDate}` }
    });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Persist submission timestamp
    localStorage.setItem('aira_lead_submitted_at', Date.now().toString());
    setShowLeadForm(false);
    
    setIsSubmitting(false);
    if (onLeadSubmit) onLeadSubmit();
  };

  const cities = [
    { name: 'Hyderabad', active: true },
    { name: 'Bengaluru', active: false },
    { name: 'Vijayawada', active: false },
    { name: 'Mumbai', active: false },
    { name: 'Delhi', active: false }
  ];

  const browseTags = ['RESTAURANTS', 'CLUBS', 'GATED COMMUNITIES'];

  return (
    <div className="relative h-screen min-h-[900px] flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      {SLIDER_IMAGES.map((img, idx) => (
        <div
          key={img}
          className={`absolute inset-0 transition-all duration-[2500ms] ${idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/90 via-[#030712]/40 to-[#030712]/95 z-10" />
          <img src={img} alt="Hero Background" className="w-full h-full object-cover" />
        </div>
      ))}

      <div className="relative z-20 w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 h-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* Left Content Column */}
        <div className={`flex-1 ${showLeadForm ? 'lg:max-w-[58%]' : 'max-w-4xl mx-auto text-center'} text-left space-y-8 animate-in fade-in slide-in-from-left duration-1000 transition-all`}>
          <div className={`inline-flex items-center px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-[10px] font-black tracking-[0.4em] uppercase font-canva backdrop-blur-md ${!showLeadForm ? 'mx-auto' : ''}`}>
            Digital Intelligence & Luxury DOOH
          </div>
          
          <h1 className={`text-5xl md:text-8xl lg:text-[100px] font-bold text-white leading-[0.9] tracking-tighter ${!showLeadForm ? 'text-center' : ''}`}>
            The <span className="italic font-serif font-normal text-gradient-gold">Architecture</span> <br />
            of Influence
          </h1>
          
          <p className={`text-lg md:text-xl text-slate-300 font-light leading-relaxed font-canva ${!showLeadForm ? 'text-center mx-auto max-w-2xl' : 'max-w-xl'}`}>
            Where luxury meets digital precision. We bridge the gap between elite brands and their high-value audiences in exclusive environments.
          </p>

          {/* Search Bar UI */}
          <div className={`w-full ${!showLeadForm ? 'max-w-4xl mx-auto' : ''}`}>
            <div className="relative">
              <form 
                onSubmit={handleSearchSubmit} 
                className="flex items-center bg-white rounded-full p-2 pr-2 shadow-luxury overflow-hidden h-[70px] md:h-[80px]"
              >
                {/* City Selection */}
                <div className="relative flex-shrink-0" ref={dropdownRef}>
                  <button 
                    type="button"
                    onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 rounded-full transition-colors"
                  >
                    <MapPin size={20} className="text-[#1e293b]" />
                    <span className="text-slate-800 font-bold text-base">Hyderabad</span>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isCityDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {cities.map((city) => (
                        <div 
                          key={city.name}
                          className={`px-6 py-3 flex items-center justify-between transition-colors ${city.active ? 'bg-slate-50' : 'hover:bg-slate-50 cursor-pointer'}`}
                        >
                          <span className={`text-sm font-bold ${city.active ? 'text-slate-900' : 'text-slate-400'}`}>
                            {city.name}
                          </span>
                          {!city.active && (
                            <span className="bg-slate-100 text-slate-400 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Soon</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="h-8 w-[1px] bg-slate-200 mx-2" />

                {/* Search Input */}
                <div className="flex-grow px-4 flex items-center">
                  <Search size={20} className="text-slate-300 mr-3" />
                  <input
                    type="text"
                    placeholder="Search by venue, category, or area..."
                    className="w-full bg-transparent border-none outline-none text-slate-800 text-sm font-medium placeholder:text-slate-300"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>

                <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block" />

                {/* Campaign Dates Selection - UPDATED to interactive inputs */}
                <div className="hidden md:flex flex-col justify-center px-4 min-w-[200px] text-left">
                  <div className="flex items-center space-x-2 group">
                    <CalendarIcon size={18} className="text-[#1e293b]" />
                    <div className="flex flex-col">
                      <span className="block text-[8px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">Campaign Dates</span>
                      <div className="flex items-center space-x-1">
                        <input 
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="bg-transparent border-none p-0 text-slate-800 font-bold text-[11px] focus:ring-0 cursor-pointer"
                        />
                        <span className="text-slate-300">-</span>
                        <input 
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="bg-transparent border-none p-0 text-slate-800 font-bold text-[11px] focus:ring-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <button 
                  type="submit" 
                  className="bg-[#1e293b] hover:bg-black text-white h-full px-10 rounded-full transition-all active:scale-[0.98] flex items-center justify-center group/btn"
                >
                  <span className="text-sm font-black uppercase tracking-[0.2em]">Search</span>
                </button>
              </form>
            </div>

            {/* Browse Categories */}
            <div className={`mt-8 flex flex-wrap items-center gap-4 ${!showLeadForm ? 'justify-center' : ''}`}>
              <span className="text-[10px] font-bold text-slate-500 tracking-[0.1em] uppercase">OR BROWSE BY:</span>
              <div className="flex flex-wrap gap-3">
                {browseTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => { setSearchValue(tag); onSearch(tag); }}
                    className="px-6 py-2 rounded-full border border-white/20 bg-black/40 text-[9px] font-bold text-white tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            
            <div className={`pt-8 ${!showLeadForm ? 'text-center' : ''}`}>
              <h2 className="text-[20px] md:text-[24px] font-black text-[#c4a47c] tracking-[0.4em] uppercase leading-none font-sans drop-shadow-sm">
                CONNECT. CAPTIVATE. CONVERT.
              </h2>
            </div>
          </div>
        </div>

        {/* Right Lead Column - Conditionally Rendered */}
        {showLeadForm && (
          <div className="lg:max-w-[420px] w-full animate-in fade-in slide-in-from-right duration-1000 delay-300">
            <div className="bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 shadow-luxury overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c4a47c] to-transparent" />
              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif text-white mb-3">Unlock Screen Inventory</h2>
                <p className="text-slate-400 text-xs font-light leading-relaxed">
                  Access Hyderabad's most premium advertising network and interactive discovery map.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"><User size={18} /></div>
                  <input 
                    type="text" placeholder="Full Name" required
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#c4a47c]/30 transition-all"
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"><Building2 size={18} /></div>
                  <input 
                    type="text" placeholder="Brand Name" required
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#c4a47c]/30 transition-all"
                    value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"><Phone size={18} /></div>
                    <input 
                      type="tel" placeholder="Phone" required
                      className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#c4a47c]/30 transition-all"
                      value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"><Mail size={18} /></div>
                    <input 
                      type="email" placeholder="Email" required
                      className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-[#c4a47c]/30 transition-all"
                      value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  type="submit" disabled={isSubmitting}
                  className="w-full bg-white hover:bg-[#c4a47c] hover:text-white text-black py-5 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all active:scale-[0.98] mt-4 flex items-center justify-center space-x-3"
                >
                  <span>{isSubmitting ? 'Verifying...' : 'Unlock Screen Inventory'}</span>
                  <ArrowRight size={16} />
                </button>
                
                <div className="flex items-center justify-center space-x-6 pt-6 opacity-60">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 size={14} className="text-[#10b981]" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Verified Venues</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 size={14} className="text-[#10b981]" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Secure Access</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex space-x-5">
        {SLIDER_IMAGES.map((_, idx) => (
          <button key={idx} onClick={() => setCurrentSlide(idx)} className="group relative py-3">
            <div className={`w-12 h-[2px] transition-all duration-1000 rounded-full ${idx === currentSlide ? 'bg-[#c4a47c]' : 'bg-white/20 hover:bg-white/40'}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Hero;