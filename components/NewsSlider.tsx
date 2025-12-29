import React, { useRef } from 'react';
import { ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';

interface NewsItem {
  id: number;
  category: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

const NEWS_DATA: NewsItem[] = [
  {
    id: 1,
    category: 'ANALYSIS',
    date: 'DEC 12, 2024',
    title: 'The Shift in Premium Advertising: Why Venues Matter',
    description: 'Traditional billboards are losing gaze time. Discover why brands are moving indoors to capture high-dwell audiences.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    category: 'STRATEGY',
    date: 'JAN 05, 2025',
    title: 'Digitizing the Hallways of Influence',
    description: 'How Aira Konnect uses Sanskrit-rooted principles to bridge the gap between speech and modern technology.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    category: 'INSIGHTS',
    date: 'JAN 20, 2025',
    title: 'Attention Economics: The 1.7 Second Challenge',
    description: 'Mobile attention is fleeting. Learn how captive physical environments are returning 82% brand recall rates.',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    category: 'LUXURY',
    date: 'FEB 02, 2025',
    title: 'Why Heritage Brands Prefer Silent Influence',
    description: 'Tracing the path of Rolls-Royce and Rolex in private lounges and how digital screens are evolving that legacy.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    category: 'REPORTS',
    date: 'FEB 14, 2025',
    title: 'Hyderabad\'s Digital Landscape in 2025',
    description: 'A deep dive into the high-traffic urban hubs that are defining the next decade of OOH advertising in the city.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  }
];

const NewsSlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="blogs" className="bg-[#030712] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center space-y-4 scroll-reveal scroll-reveal-hidden">
          <h4 className="text-[#c4a47c] font-black text-[10px] uppercase tracking-[0.5em]">
            INSIGHTS
          </h4>
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            Latest News
          </h2>
        </div>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute top-1/2 -translate-y-1/2 left-4 z-30 hidden lg:block">
          <button 
            onClick={() => scroll('left')}
            className="p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-[#c4a47c] transition-all"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-4 z-30 hidden lg:block">
          <button 
            onClick={() => scroll('right')}
            className="p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-[#c4a47c] transition-all"
          >
            <ArrowRight size={20} />
          </button>
        </div>

        <div 
          ref={scrollRef}
          className="flex space-x-8 overflow-x-auto pb-12 no-scrollbar cursor-grab active:cursor-grabbing scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {NEWS_DATA.map((item, idx) => (
            <div 
              key={item.id} 
              className="flex-shrink-0 w-[340px] md:w-[420px] scroll-reveal scroll-reveal-hidden"
              style={{ transitionDelay: `${(idx % 3) * 150}ms` }}
            >
              <div className="group space-y-6">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/5 transition-all duration-700 group-hover:border-white/20 shadow-2xl">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-[10px] font-black tracking-[0.2em] text-slate-500">
                    <span className="text-white/40">{item.category}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-snug font-canva group-hover:text-[#c4a47c] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm font-light leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                  
                  <button className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-[#c4a47c] transition-colors group/link pt-2">
                    <span>READ ARTICLE</span>
                    <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSlider;