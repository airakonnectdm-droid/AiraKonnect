
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`fixed bottom-8 right-8 z-[150] transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <button
        onClick={scrollToTop}
        className="group relative p-5 bg-[#c4a47c] text-[#030712] rounded-full shadow-2xl hover:bg-white transition-all duration-500 active:scale-90"
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} strokeWidth={2.5} className="transition-transform duration-300 group-hover:-translate-y-1" />
        
        {/* Subtle orbit effect */}
        <div className="absolute -inset-1 rounded-full border border-[#c4a47c]/20 group-hover:border-white/40 transition-colors animate-pulse"></div>
      </button>
    </div>
  );
};

export default ScrollToTop;
