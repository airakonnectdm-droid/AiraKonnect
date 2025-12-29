import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Pin as Pinterest, ChevronUp } from 'lucide-react';

interface FooterProps {
  onVenuesClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onVenuesClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030712] text-white pt-24 pb-12 px-6 sm:px-10 lg:px-16 border-t border-white/5 font-sans relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-8">
            <h2 className="text-3xl font-black tracking-tighter uppercase font-sans">
              AIRA KONNECT
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-light">
              Redefining brand presence through premium venue networks. Meaningful, memorable, and measurable impact for the modern era.
            </p>
            <div className="flex items-center space-x-5 text-slate-400">
              <a href="#" className="hover:text-[#c4a47c] transition-colors"><Facebook size={18} /></a>
              <a href="#" className="hover:text-[#c4a47c] transition-colors"><Instagram size={18} /></a>
              <a href="#" className="hover:text-[#c4a47c] transition-colors"><Twitter size={18} /></a>
              <a href="#" className="hover:text-[#c4a47c] transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="hover:text-[#c4a47c] transition-colors"><Pinterest size={18} /></a>
              <a href="#" className="hover:text-[#c4a47c] transition-colors"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Explore Section */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[#c4a47c] text-[10px] font-black uppercase tracking-[0.3em]">Explore</h4>
            <ul className="space-y-4 text-sm text-slate-300 font-light">
              <li>
                <button 
                  onClick={(e) => { e.preventDefault(); onVenuesClick?.(); }}
                  className="hover:text-[#c4a47c] transition-colors text-left"
                >
                  Our Venues
                </button>
              </li>
              <li><a href="#story" className="hover:text-[#c4a47c] transition-colors">Our Philosophy</a></li>
              <li><a href="#gallery" className="hover:text-[#c4a47c] transition-colors">Gallery</a></li>
              <li><a href="#blogs" className="hover:text-[#c4a47c] transition-colors">Insights</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[#c4a47c] text-[10px] font-black uppercase tracking-[0.3em]">Contact</h4>
            <div className="space-y-6">
              <div>
                <h5 className="text-white font-bold text-sm mb-2">Headquarters</h5>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  3rd Floor, Sri Arcade, Jayabheri<br />
                  Enclave, Gachibowli, Hyderabad
                </p>
              </div>
              <div>
                <h5 className="text-white font-bold text-sm mb-2">Inquiries</h5>
                <p className="text-slate-400 text-sm font-light">
                  +91 949 949 9596<br />
                  <a href="mailto:info@airakonnect.com" className="hover:text-[#c4a47c]">info@airakonnect.com</a>
                </p>
              </div>
            </div>
          </div>

          {/* Stay Connected Section */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[#c4a47c] text-[10px] font-black uppercase tracking-[0.3em]">Stay Connected</h4>
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              Subscribe for the latest updates on our network and industry insights.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-[#111827]/50 border border-white/10 rounded-md py-3 px-4 text-white text-sm focus:outline-none focus:border-[#c4a47c]/50 transition-all font-light"
              />
              <button 
                type="submit"
                className="w-full bg-[#c4a47c] hover:bg-[#b3936b] text-black font-black text-[10px] uppercase tracking-[0.3em] py-4 rounded-md transition-all active:scale-[0.98]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-[10px] font-medium tracking-wider">
            © 2025 Aira Konnect. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-8 text-slate-500 text-[10px] font-medium tracking-wider">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;