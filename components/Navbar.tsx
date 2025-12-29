import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { LOGO_URL, COLORS } from '../constants';
import { Menu, X, LogIn, LogOut, User as UserIcon, ShieldCheck, Map } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onDashboardClick?: () => void;
  onVenuesClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLoginClick, onLogout, onDashboardClick, onVenuesClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'VENUES', href: '#venues', type: 'dashboard' },
    { name: 'OUR STORY', href: '#story', type: 'scroll' },
    { name: 'GALLERY', href: '#gallery', type: 'scroll' },
    { name: 'BLOGS', href: '#blogs', type: 'scroll' },
    { name: 'CONTACT US', href: '#contact', type: 'scroll' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: any) => {
    if (link.type === 'dashboard') {
      e.preventDefault();
      onVenuesClick?.();
      setIsMenuOpen(false);
      return;
    }

    if (link.href.startsWith('#')) {
      e.preventDefault();
      const id = link.href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // Navbar height offset
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#030712]/95 backdrop-blur-xl py-1 border-b border-white/5 shadow-2xl' : 'bg-transparent py-4'}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div 
            className="flex items-center cursor-pointer group flex-shrink-0" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="transition-all duration-300 transform group-hover:scale-105">
              <img 
                src={LOGO_URL} 
                alt="Aira Konnect" 
                className="h-10 md:h-12 w-auto object-contain brightness-110 contrast-125" 
              />
            </div>
          </div>

          {/* Main Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className="text-[11px] font-black text-white/90 hover:text-[#c4a47c] transition-all tracking-[0.2em]"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={onDashboardClick}
                  className="flex items-center space-x-2 bg-white/5 hover:bg-[#c4a47c] hover:text-black text-[#c4a47c] px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all border border-[#c4a47c]/30 shadow-xl active:scale-95 group"
                >
                  <Map size={13} />
                  <span>DASHBOARD</span>
                </button>
                
                <div className="flex items-center space-x-2 text-white/60 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <UserIcon size={12} />
                  <span className="text-[11px] font-bold uppercase tracking-wider">{user.name}</span>
                </div>
                
                <button
                  onClick={onLogout}
                  className="p-2 text-white/40 hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="flex items-center space-x-2 text-white text-[11px] font-black hover:text-[#c4a47c] transition-all tracking-widest mr-2"
                >
                  <LogIn size={14} />
                  <span>LOG IN</span>
                </button>

                <button
                  onClick={onLoginClick}
                  className="flex items-center space-x-2 bg-[#c4a47c] hover:bg-[#b3936b] text-black px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all shadow-xl active:scale-95 group"
                >
                  <ShieldCheck size={13} />
                  <span>COLLABORATOR LOGIN</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 hover:text-[#c4a47c] transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-[#030712] z-[60] overflow-y-auto animate-in slide-in-from-top duration-500">
          <div className="px-6 py-12 flex flex-col items-center space-y-8 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className="text-xl font-black uppercase tracking-[0.3em] text-white hover:text-[#c4a47c] transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <div className="w-24 h-[1px] bg-white/10 my-4" />
            
            {user ? (
              <div className="flex flex-col items-center space-y-6 w-full max-w-xs">
                 <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onDashboardClick?.();
                  }}
                  className="w-full flex items-center justify-center space-x-3 bg-[#c4a47c] text-black py-5 rounded-full text-sm font-black uppercase tracking-[0.3em] shadow-xl"
                >
                  <Map size={18} />
                  <span>GO TO DASHBOARD</span>
                </button>

                <div className="text-[#c4a47c] font-black uppercase tracking-widest text-lg pt-4">{user.name}</div>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onLogout();
                  }}
                  className="flex items-center justify-center space-x-2 text-red-400 py-4 text-sm font-black uppercase tracking-[0.3em]"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-6 w-full max-w-xs">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onLoginClick();
                  }}
                  className="w-full flex items-center justify-center space-x-3 text-white py-5 text-sm font-black uppercase tracking-[0.3em] border border-white/10 rounded-full hover:bg-white/5"
                >
                  <LogIn size={18} />
                  <span>LOG IN</span>
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onLoginClick();
                  }}
                  className="w-full flex items-center justify-center space-x-3 bg-[#c4a47c] text-black py-5 rounded-full text-sm font-black uppercase tracking-[0.3em] shadow-xl"
                >
                  <ShieldCheck size={18} />
                  <span>COLLABORATOR LOGIN</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;