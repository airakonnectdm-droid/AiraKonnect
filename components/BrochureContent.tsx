import React, { useEffect, useRef } from 'react';
import { BROCHURE_DATA, LOGO_URL } from '../constants';
import { ChevronRight, ArrowUpRight, ArrowRight, Plus, Calendar, Monitor, Clock, MapPin, TrendingUp, BarChart3, Eye, Zap, ShieldCheck } from 'lucide-react';

interface BrochureContentProps {
  searchQuery: string;
  onAction?: () => void;
  onCategorySelect?: (category: string) => void;
}

const BrochureContent: React.FC<BrochureContentProps> = ({ searchQuery, onAction, onCategorySelect }) => {
  const filteredData = BROCHURE_DATA.filter(section => 
    section.id !== 'blogs' && (
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (section.content && section.content.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      ((section as any).description && (section as any).description?.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-reveal-visible');
          entry.target.classList.remove('scroll-reveal-hidden');
        } else {
          entry.target.classList.remove('scroll-reveal-visible');
          entry.target.classList.add('scroll-reveal-hidden');
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const targets = document.querySelectorAll('.scroll-reveal');
    targets.forEach(t => observerRef.current?.observe(t));

    return () => observerRef.current?.disconnect();
  }, [filteredData]);

  if (filteredData.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-slate-400 text-lg">No brochure content found for "{searchQuery}"</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 text-[#c4a47c] hover:text-[#e6ccaa] transition-colors text-base font-bold uppercase tracking-widest"
        >
          View all sections
        </button>
      </div>
    );
  }

  const renderSection = (section: any, idx: number) => {
    // 1. PERFORMANCE ANALYTICS (Redesigned Bento Impact Grid)
    if (section.type === 'impact-grid') {
      return (
        <section 
          key={section.id} 
          id={section.id}
          className="scroll-reveal scroll-reveal-hidden max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-20 bg-[#030712]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-3 text-[#c4a47c] font-black text-[10px] uppercase tracking-[0.4em]">
                  <Zap size={14} />
                  <span>The Intelligence Dashboard</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-none">
                  {section.title}
                </h2>
                <p className="text-slate-400 text-sm md:text-xl max-w-xl font-light leading-relaxed font-canva">
                  {section.subtitle}
                </p>
              </div>
              <div className="hidden lg:flex items-center space-x-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-xl">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Live Network Metrics</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-6 h-auto md:h-[600px]">
              <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden bg-[#0a0a0a] border border-white/5 rounded-[48px] p-10 flex flex-col justify-between shadow-luxury hover:border-[#c4a47c]/30 transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c4a47c]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none overflow-hidden">
                   <svg viewBox="0 0 400 400" className="w-full h-full group-hover:scale-125 transition-transform duration-[3s]">
                     <path d="M0,200 Q100,100 200,200 T400,200" fill="none" stroke="#c4a47c" strokeWidth="1" className="animate-pulse" />
                     <path d="M0,220 Q100,120 200,220 T400,220" fill="none" stroke="#c4a47c" strokeWidth="1" opacity="0.5" />
                   </svg>
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 group-hover:bg-[#c4a47c]/20 transition-all duration-500">
                    <Eye size={32} className="text-[#c4a47c]" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2">Total Monthly Reach</h3>
                    <div className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-none group-hover:text-gradient-gold transition-all duration-700">
                      5M+
                    </div>
                  </div>
                </div>
                <div className="relative z-10">
                  <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-xs">
                    Verified eyeballs across the most affluent districts in the city.
                  </p>
                  <div className="flex items-center space-x-2 mt-6 text-[#c4a47c] text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck size={14} />
                    <span>Real-time Audience Verification</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1 md:row-span-1 bg-[#0f172a]/20 border border-white/5 rounded-[40px] p-8 flex flex-col justify-between hover:bg-[#c4a47c]/5 hover:border-[#c4a47c]/20 transition-all duration-500 group">
                 <div className="flex justify-between items-start">
                   <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-[#c4a47c]">
                      <BarChart3 size={20} />
                   </div>
                   <div className="text-[11px] font-black text-emerald-500">+12% vs Industry</div>
                 </div>
                 <div className="space-y-1">
                   <div className="text-4xl font-black text-white group-hover:scale-110 origin-left transition-transform">82%</div>
                   <div className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Brand Recall</div>
                 </div>
              </div>

              <div className="md:col-span-1 md:row-span-1 bg-[#0f172a]/20 border border-white/5 rounded-[40px] p-8 flex flex-col justify-between hover:bg-[#c4a47c]/5 hover:border-[#c4a47c]/20 transition-all duration-500 group">
                 <div className="flex justify-between items-start">
                   <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-[#c4a47c]">
                      <Clock size={20} />
                   </div>
                   <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                   </div>
                 </div>
                 <div className="space-y-1">
                   <div className="text-4xl font-black text-white group-hover:scale-110 origin-left transition-transform">45m</div>
                   <div className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Avg. Dwell Time</div>
                 </div>
              </div>

              <div className="md:col-span-2 md:row-span-1 relative bg-gradient-to-br from-[#1e293b]/30 to-transparent border border-white/5 rounded-[40px] p-8 flex items-center justify-between hover:border-[#c4a47c]/30 transition-all duration-500 group">
                 <div className="space-y-2 relative z-10">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Network Expansion</h4>
                   <div className="text-5xl font-black text-white">3X <span className="text-lg font-light text-slate-400 italic">Growth</span></div>
                   <p className="text-slate-500 text-xs font-light max-w-[180px]">Expanding our reach to 50+ new premium venues this quarter.</p>
                 </div>
                 <div className="flex-1 h-full max-w-[180px] flex items-end justify-center relative">
                    <div className="flex items-end space-x-1 w-full h-16">
                       <div className="flex-1 bg-white/5 h-[30%] group-hover:h-[40%] transition-all duration-700 delay-0" />
                       <div className="flex-1 bg-white/5 h-[45%] group-hover:h-[60%] transition-all duration-700 delay-100" />
                       <div className="flex-1 bg-[#c4a47c]/40 h-[70%] group-hover:h-[85%] transition-all duration-700 delay-200" />
                       <div className="flex-1 bg-[#c4a47c] h-[90%] group-hover:h-[100%] transition-all duration-700 delay-300" />
                    </div>
                 </div>
                 <div className="absolute right-10 top-1/2 -translate-y-1/2 text-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <TrendingUp size={100} />
                 </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (section.type === 'venue-grid') {
      // Prioritize venues based on search query
      const sortedVenues = [...section.venues].sort((a, b) => {
        const aMatch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.desc.toLowerCase().includes(searchQuery.toLowerCase());
        const bMatch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.desc.toLowerCase().includes(searchQuery.toLowerCase());
        if (aMatch && !bMatch) return -1;
        if (!aMatch && bMatch) return 1;
        return 0;
      });

      return (
        <section 
          key={section.id} 
          id={section.id}
          className="scroll-reveal scroll-reveal-hidden max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-20 bg-[#050914]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter font-canva leading-none">
                {section.title}
              </h2>
              <div className="w-20 h-[3px] bg-gradient-to-r from-[#c4a47c] to-[#e6ccaa] mx-auto rounded-full" />
              <p className="text-slate-400 text-sm md:text-xl max-w-2xl mx-auto font-light leading-relaxed font-canva pt-4">
                {section.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
              {sortedVenues.map((venue: any, i: number) => (
                <div 
                  key={i} 
                  className={`scroll-reveal scroll-reveal-hidden group relative bg-[#0b1221]/40 backdrop-blur-2xl border border-white/5 rounded-[40px] overflow-hidden hover:border-[#c4a47c]/30 transition-all duration-700 shadow-luxury hover:shadow-luxury-hover flex flex-col cursor-pointer`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                  onClick={() => onCategorySelect?.(venue.title)}
                >
                  <div className="relative h-[320px] overflow-hidden">
                    <img src={venue.image} alt={venue.title} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0 brightness-75 group-hover:brightness-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-90" />
                    <div className="absolute top-6 right-6 bg-white/5 backdrop-blur-xl p-3 rounded-2xl border border-white/15 shadow-xl">
                      {venue.icon}
                    </div>
                  </div>
                  <div className="p-8 space-y-4 flex-1">
                    <h3 className="text-2xl font-bold text-white tracking-tight font-canva">{venue.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-light font-canva">{venue.desc}</p>
                    <button 
                      className="pt-2 flex items-center space-x-3 text-[#c4a47c] text-[10px] font-black uppercase tracking-[0.35em] group/btn hover:text-white transition-colors"
                    >
                      <span>EXPLORE VENUE</span>
                      <div className="w-6 h-[1px] bg-[#c4a47c]/40 group-hover/btn:w-10 group-hover/btn:bg-white transition-all" />
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <div className="inline-flex items-center px-10 py-4 rounded-full border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl">
                <span className="text-[10px] font-black text-[#c4a47c] tracking-[0.5em] uppercase">{section.footerStat}</span>
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (section.type === 'story-comparison') {
      return (
        <section 
          key={section.id} 
          id={section.id}
          className="scroll-reveal scroll-reveal-hidden max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-20 bg-[#030712] overflow-x-hidden"
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 space-y-10 scroll-reveal scroll-reveal-hidden">
              <div className="space-y-6">
                <div className="flex items-center space-x-6 mb-2">
                  <div className="w-32 transition-transform hover:rotate-1 duration-500">
                    <img src={LOGO_URL} alt="Aira Logo" className="w-full h-auto object-contain brightness-110" />
                  </div>
                  <div className="h-[2px] w-24 bg-gradient-to-r from-[#c4a47c]/60 to-transparent" />
                </div>
                <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.85] font-canva">
                  AIRA KONNECT <br />
                  <span className="text-gradient-gold italic font-serif lowercase font-normal tracking-normal text-6xl md:text-7xl">legacy of influence</span>
                </h2>
              </div>
              <div className="space-y-8 pr-6">
                {section.content.map((paragraph: string, i: number) => (
                  <p key={i} className="text-base md:text-xl text-slate-300 leading-relaxed font-light font-canva">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full relative h-[700px] flex items-center justify-center scroll-reveal scroll-reveal-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-3/4 bg-[#c4a47c]/5 blur-[120px] rounded-full -z-10 opacity-40 animate-pulse" />
              <div className="relative w-full max-w-[500px] h-full flex flex-col justify-between">
                <div className="relative self-start w-[58%] aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 shadow-luxury z-10 group transition-all duration-[1.5s] hover:-translate-y-4">
                  <div className="absolute top-6 left-6 z-20 flex flex-col">
                    <span className="text-white font-black text-[10px] tracking-[0.3em] uppercase bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">{section.comparisonImages[0].year}</span>
                  </div>
                  <img src={section.comparisonImages[0].url} className="w-full h-full object-cover grayscale brightness-75 transition-transform duration-[8s] group-hover:scale-110" />
                </div>
                <div className="relative self-end -mt-40 w-[68%] aspect-[3/5] rounded-[48px] overflow-hidden border border-[#c4a47c]/40 shadow-luxury hover:shadow-luxury-hover z-20 group transition-all duration-[1.5s] hover:translate-y-4">
                  <div className="absolute bottom-8 right-8 z-20 text-right flex flex-col items-end">
                    <span className="text-white font-black text-[10px] tracking-[0.3em] uppercase bg-[#c4a47c]/80 backdrop-blur-md px-4 py-1.5 rounded-full">{section.comparisonImages[1].year}</span>
                  </div>
                  <img src={section.comparisonImages[1].url} className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110" />
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (section.type === 'solution-dashboard') {
      return (
        <section 
          key={section.id} 
          id={section.id}
          className="scroll-reveal scroll-reveal-hidden max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-20 bg-[#0a1120]"
        >
          <div className="max-w-7xl mx-auto luxury-card p-10 md:p-16 rounded-[60px] relative overflow-hidden shadow-luxury border border-white/5">
              <div className="flex flex-col md:flex-row md:items-center gap-8 mb-12">
                <div className="w-32 drop-shadow-lg">
                  <img src={LOGO_URL} alt="Aira" className="w-full h-auto object-contain brightness-110" />
                </div>
                <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">{section.title}</h2>
              </div>
              <p className="text-2xl md:text-4xl text-white mb-12 max-w-5xl font-light leading-snug font-canva">
                Strategic placement in <span className="text-[#c4a47c] font-black border-b-[4px] border-[#c4a47c]/30">Elite, Captive Environments</span>.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {section.features.map((feature: any, i: number) => (
                    <div key={i} className={`scroll-reveal scroll-reveal-hidden flex flex-col space-y-5 group`} style={{ transitionDelay: `${i * 100}ms` }}>
                      <div className="flex-shrink-0 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-[#c4a47c]/40 group-hover:bg-[#c4a47c]/10 transition-all duration-500 shadow-inner">
                        {React.cloneElement(feature.icon as React.ReactElement<{ className?: string; size?: number }>, { className: 'text-[#c4a47c]', size: 28 })}
                      </div>
                      <div className="space-y-3 font-canva">
                        <h4 className="text-xl font-bold text-white tracking-tight group-hover:text-[#c4a47c] transition-colors">{feature.title}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed font-light">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-8 bg-black/40 p-10 rounded-[40px] border border-white/10 font-canva shadow-inner backdrop-blur-3xl">
                  {section.progressBars.map((bar: any, i: number) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-slate-300 text-[11px] font-black uppercase tracking-[0.3em]">{bar.label}</span>
                        <span className="text-gradient-gold font-black text-xl tracking-widest">{bar.value}%</span>
                      </div>
                      <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                        <div className="h-full bg-gradient-to-r from-[#c4a47c] via-[#e6ccaa] to-[#c4a47c] transition-all duration-[2s] ease-out shadow-lg" style={{ width: `${bar.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-12 bg-white/5 rounded-[40px] border border-white/10 overflow-hidden shadow-luxury-hover backdrop-blur-md">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
                  {section.bottomStats.map((stat: any, i: number) => (
                    <div key={i} className="py-12 text-center hover:bg-white/[0.04] transition-all duration-500 group">
                      <div className="text-5xl font-black text-white mb-2 group-hover:text-[#c4a47c] transition-all tracking-tighter">{stat.value}</div>
                      <div className="text-[10px] font-black text-slate-400 tracking-[0.4em] uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </section>
      );
    }

    if (section.type === 'gallery-grid') {
      return (
        <section 
          key={section.id} 
          id={section.id}
          className="scroll-reveal scroll-reveal-hidden max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-20 bg-[#030712] font-canva"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-10 lg:gap-14">
            <div className="col-span-12 lg:col-span-5 space-y-10 flex flex-col justify-center scroll-reveal scroll-reveal-hidden">
              <h2 className="text-5xl md:text-8xl font-serif italic text-white leading-tight tracking-tight">{section.title}</h2>
              <div className="space-y-8">
                <p className="text-slate-300 text-lg md:text-2xl font-light leading-relaxed">{section.description}</p>
                {section.secondaryDescription && (
                  <p className="text-[#c4a47c] text-base md:text-xl font-light leading-relaxed italic border-l-2 border-[#c4a47c]/40 pl-8">{section.secondaryDescription}</p>
                )}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-7 group scroll-reveal scroll-reveal-hidden">
              <div className="relative aspect-[16/11] rounded-[48px] overflow-hidden border border-white/10 shadow-luxury group-hover:shadow-luxury-hover transition-all duration-1000">
                <img src={section.images[0].url} className="w-full h-full object-cover transition-transform duration-[12s] group-hover:scale-110 brightness-90 group-hover:brightness-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-10">
                  <p className="text-white text-base font-light italic leading-relaxed max-md">{section.images[0].caption}</p>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5 group scroll-reveal scroll-reveal-hidden">
              <div className="relative aspect-[4/6] rounded-[48px] overflow-hidden border border-white/10 shadow-luxury mb-8 transition-all duration-1000 group-hover:shadow-luxury-hover">
                <img src={section.images[1].url} className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" />
              </div>
              <div className="luxury-card border border-white/10 p-8 rounded-3xl bg-white/[0.02] backdrop-blur-3xl shadow-2xl">
                 <p className="text-slate-300 text-sm italic text-center font-serif leading-relaxed">{section.images[1].caption}</p>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-7 space-y-12">
              {[section.images[2], section.images[3]].map((img: any, i: number) => (
                <div key={i} className={`group scroll-reveal scroll-reveal-hidden`} style={{ transitionDelay: `${i * 200}ms` }}>
                  <div className="relative aspect-[16/8] rounded-[40px] overflow-hidden border border-white/10 shadow-luxury mb-6 transition-all duration-1000 group-hover:shadow-luxury-hover">
                    <img src={img.url} className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105" />
                  </div>
                  <div className="luxury-card border border-white/10 p-6 rounded-3xl bg-white/[0.02] backdrop-blur-xl shadow-2xl">
                    <p className="text-slate-300 text-sm italic text-center font-serif leading-relaxed">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    return (
      <section 
        key={section.id} 
        id={section.id}
        className="scroll-reveal scroll-reveal-hidden max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-20 bg-[#030712]"
      >
        <div className={`max-w-7xl mx-auto flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24`}>
          <div className="flex-1 relative group w-full scroll-reveal scroll-reveal-hidden">
            <div className="absolute -inset-10 bg-[#c4a47c]/10 rounded-[60px] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            {section.image ? (
              <div className="relative overflow-hidden rounded-[40px] border border-white/10 shadow-luxury hover:shadow-luxury-hover transition-all duration-1000 aspect-video">
                <img src={section.image} className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" />
              </div>
            ) : (
              <div className="relative w-full aspect-video flex flex-col items-center justify-center luxury-card border border-white/10 rounded-[40px] p-12 text-center font-canva shadow-luxury">
                <div className="mb-8 p-6 bg-[#c4a47c]/15 rounded-[32px] border border-[#c4a47c]/30 shadow-inner">
                  {section.icon}
                </div>
                {section.stats && (
                  <div className="grid grid-cols-2 gap-12 w-full">
                    {section.stats.map((stat: any) => (
                      <div key={stat.label} className="space-y-2">
                        <div className="text-4xl font-black text-[#c4a47c] tracking-tighter drop-shadow-lg">{stat.value}</div>
                        <div className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex-1 space-y-10 scroll-reveal scroll-reveal-hidden">
            <div className="inline-flex items-center space-x-4 text-[#c4a47c] font-black text-[10px] uppercase tracking-[0.5em]">
              <span className="w-12 h-[1px] bg-gradient-to-r from-[#c4a47c] to-transparent" />
              <span>Chapter 0{idx + 1}</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none font-canva">{section.title}</h2>
            {section.subtitle && (
              <p className="text-xl text-slate-300 font-light border-l-[4px] border-[#c4a47c]/40 pl-10 font-canva italic leading-relaxed">{section.subtitle}</p>
            )}
            <div className="space-y-6 pt-4 font-canva">
              {section.content && section.content.map((point: string, i: number) => (
                <div key={i} className="flex items-start space-x-6 text-slate-300 group">
                  <div className="mt-1 text-[#c4a47c] group-hover:translate-x-1 transition-transform"><ChevronRight size={22} /></div>
                  <p className="text-base md:text-lg font-light leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
            <div className="pt-8">
              <button 
                onClick={onAction}
                className="px-14 py-5 bg-white text-black hover:bg-[#c4a47c] hover:text-white rounded-full text-[11px] font-black uppercase tracking-[0.4em] transition-all flex items-center space-x-4 group/btn shadow-luxury active:scale-95 font-canva"
              >
                <span>View Details</span>
                <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="flex flex-col space-y-0">
      {filteredData.map((section, idx) => renderSection(section, idx))}
    </div>
  );
};

export default BrochureContent;