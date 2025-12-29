import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Mail, Phone, User, MessageSquare, Zap } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

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
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for reaching out. Our team will contact you shortly.');
  };

  return (
    <section id="contact" className="bg-[#030712] py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#c4a47c]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center mb-16 scroll-reveal scroll-reveal-hidden relative">
        <div className="inline-block relative">
          <div className="absolute -inset-4 bg-[#c4a47c]/10 blur-2xl rounded-full opacity-50" />
          <h4 className="relative text-[#c4a47c] font-black text-[12px] uppercase tracking-[0.6em] mb-6 flex items-center justify-center space-x-4">
            <span className="w-8 h-[1px] bg-[#c4a47c]/40" />
            <Zap size={14} className="animate-pulse" />
            <span>REACH US ANYTIME</span>
            <span className="w-8 h-[1px] bg-[#c4a47c]/40" />
          </h4>
        </div>
        
        <div className="relative mt-2">
          <p className="text-3xl md:text-5xl font-serif text-white leading-tight font-normal italic tracking-tight max-w-3xl mx-auto">
            Have questions or need help? <br />
            <span className="text-gradient-gold not-italic font-sans font-black uppercase text-2xl md:text-4xl tracking-tighter block mt-2">
              We are here for you.
            </span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start relative z-10">
        <div className="lg:col-span-4 space-y-8 scroll-reveal scroll-reveal-hidden delay-100">
          <h2 className="text-5xl md:text-6xl font-serif text-white leading-[1.1] tracking-tight">
            Bring your brand to <br />
            <span className="italic font-normal">life</span> <br />
            <span className="text-white font-sans font-black uppercase text-4xl md:text-5xl tracking-tighter">on the big screens!</span>
          </h2>
          <p className="text-white text-base font-light leading-relaxed font-canva max-w-sm opacity-80">
            Collaborate with India's premier digital screen network. Reach out to our experienced team to elevate your brand's visibility across urban audiences.
          </p>
          <div className="pt-4">
            <a href="mailto:sales@airakonnect.com" className="text-white font-bold text-lg hover:text-[#c4a47c] transition-colors border-b border-white/20 pb-1">sales@airakonnect.com</a>
          </div>
        </div>

        <div className="lg:col-span-3 lg:pt-2 space-y-8 scroll-reveal scroll-reveal-hidden delay-200">
          <div className="space-y-4">
            <h3 className="text-white font-bold text-xl font-canva">Contact Sales</h3>
            <p className="text-white text-sm leading-relaxed font-light font-canva opacity-80">
              Let's collaborate on custom advertising solutions or schedule a quick demo to explore tailored packages for your brand.
            </p>
          </div>
          <button className="flex items-center space-x-3 text-[#c4a47c] font-black text-xs uppercase tracking-[0.2em] group">
            <span>BOOK A CALL</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="lg:col-span-5 scroll-reveal scroll-reveal-hidden delay-300">
          <div className="luxury-card bg-[#0a0a0a]/60 backdrop-blur-3xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-luxury">
            <div className="mb-10">
              <h2 className="text-3xl font-serif text-white mb-2">We'd love to help!</h2>
              <p className="text-white text-xs font-light uppercase tracking-widest font-canva opacity-60">Let us know how</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="text" placeholder="Full Name" required className="w-full bg-white border-none rounded-xl py-5 px-6 text-black text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c4a47c]/50 transition-all font-canva" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
              <input type="email" placeholder="Email Address" required className="w-full bg-white border-none rounded-xl py-5 px-6 text-black text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c4a47c]/50 transition-all font-canva" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              <input type="tel" placeholder="Phone Number" required className="w-full bg-white border-none rounded-xl py-5 px-6 text-black text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c4a47c]/50 transition-all font-canva" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              <textarea placeholder="How may we assist you?" required rows={4} className="w-full bg-white border-none rounded-xl py-5 px-6 text-black text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c4a47c]/50 transition-all font-canva resize-none" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
              <button type="submit" className="w-full bg-white hover:bg-[#c4a47c] hover:text-white text-black py-5 rounded-xl font-black text-xs uppercase tracking-[0.3em] shadow-xl transition-all active:scale-[0.98] mt-4 font-canva">SEND YOUR MESSAGE</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
