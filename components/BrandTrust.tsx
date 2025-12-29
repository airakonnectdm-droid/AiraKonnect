import React from 'react';

const BRANDS = [
  'Hyundai', 'Toyota', 'Taj Hotels', 'Apollo', 'Tanishq', 'Nestlé',
  'Samsung', 'BMW', 'ITC', 'Rolex', 'Audemars Piguet', 'Bentley'
];

const BrandTrust: React.FC = () => {
  return (
    <section className="py-8 overflow-hidden bg-[#030712]/50">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center space-y-3">
        <h2 className="text-xl md:text-3xl font-normal text-white tracking-tight font-serif italic">
          Trusted by Global Entities
        </h2>
        <div className="w-12 h-[1px] bg-[#c4a47c]/30 mx-auto" />
        <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em]">
          Strategic Partners & Visionaries
        </p>
      </div>

      <div className="relative space-y-8">
        {/* Row 1: Left to Right */}
        <div className="flex overflow-hidden group">
          <div className="flex space-x-16 animate-scroll-right pause-on-hover whitespace-nowrap items-center">
            {[...BRANDS, ...BRANDS].map((brand, idx) => (
              <span 
                key={`r1-${idx}`} 
                className="text-xl md:text-3xl font-normal text-white/60 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-500 cursor-default select-none px-4 font-serif tracking-widest uppercase"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex overflow-hidden group">
          <div className="flex space-x-16 animate-scroll-left pause-on-hover whitespace-nowrap items-center">
            {[...BRANDS, ...BRANDS].reverse().map((brand, idx) => (
              <span 
                key={`r2-${idx}`} 
                className="text-xl md:text-3xl font-normal text-white/60 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-500 cursor-default select-none px-4 font-serif tracking-widest uppercase"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandTrust;