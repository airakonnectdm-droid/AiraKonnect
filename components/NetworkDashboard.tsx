import React, { useState, useMemo, useEffect, useRef } from 'react';
// Fix: Added missing ArrowRight import from lucide-react to resolve ReferenceError
import { Search, Bell, ChevronLeft, Calendar, MapPin, Monitor, Clock, Plus, Check, Filter, Download, Square, CheckSquare, ShoppingBag, X, Info, Send, CheckCircle2, TrendingUp, Users, Home, ChevronRight, LayoutGrid, Image as ImageIcon, ShieldAlert, Lock, ArrowRight } from 'lucide-react';
import L from 'leaflet';

interface Venue {
  id: string;
  name: string;
  area: string;
  type: string;
  image?: string;
  galleryImages?: string[];
  weeks: string;
  screens: number;
  hours: number;
  price: number;
  originalPrice: number;
  lat: number;
  lng: number;
  impressions?: string;
  dwellTime?: string;
}

const VENUES: Venue[] = [
  {
    id: '1',
    name: 'Cu2',
    area: 'Financial District & Kokapet',
    type: 'Fine Dining',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400',
    galleryImages: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
    ],
    weeks: '4/4',
    screens: 3,
    hours: 504,
    price: 75000,
    originalPrice: 90000,
    lat: 17.4085, lng: 78.3308,
    impressions: '45k+',
    dwellTime: '55m'
  },
  {
    id: '2',
    name: 'Itlu (Jubilee)',
    area: 'Jubilee Hills',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=400',
    galleryImages: [
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
    ],
    weeks: '4/4',
    screens: 1,
    hours: 168,
    price: 30000,
    originalPrice: 35000,
    lat: 17.4312, lng: 78.4065,
    impressions: '12k+',
    dwellTime: '40m'
  },
  {
    id: '3',
    name: 'Itlu (Financial Dist)',
    area: 'Financial District & Kokapet',
    type: 'Restaurant',
    galleryImages: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
    ],
    weeks: '4/4',
    screens: 2,
    hours: 336,
    price: 50000,
    originalPrice: 60000,
    lat: 17.4140, lng: 78.3412,
    impressions: '28k+',
    dwellTime: '45m'
  },
  {
    id: '4',
    name: 'Makau',
    area: 'Jubilee Hills',
    type: 'Lounge',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400',
    galleryImages: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
    ],
    weeks: '4/4',
    screens: 3,
    hours: 504,
    price: 85000,
    originalPrice: 100000,
    lat: 17.4335, lng: 78.4002,
    impressions: '50k+',
    dwellTime: '90m'
  },
  {
    id: '5',
    name: 'Minerva',
    area: 'Nanakramaguda Circle',
    type: 'Fine Dining',
    galleryImages: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
    ],
    weeks: '4/4',
    screens: 1,
    hours: 168,
    price: 25000,
    originalPrice: 30000,
    lat: 17.4125, lng: 78.3440,
    impressions: '15k+',
    dwellTime: '40m'
  },
  {
    id: '6',
    name: 'MMCCC',
    area: 'Jubilee Hills',
    type: 'Social Club',
    galleryImages: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
    ],
    weeks: '4/4',
    screens: 6,
    hours: 1008,
    price: 150000,
    originalPrice: 180000,
    lat: 17.4255, lng: 78.4110,
    impressions: '120k+',
    dwellTime: '120m'
  },
  {
    id: '7',
    name: 'Pandem Punju',
    area: 'Jubilee Hills',
    type: 'Restaurant',
    galleryImages: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
    ],
    weeks: '4/4',
    screens: 1,
    hours: 168,
    price: 28000,
    originalPrice: 32000,
    lat: 17.4280, lng: 78.4080,
    impressions: '18k+',
    dwellTime: '50m'
  },
  {
    id: '8',
    name: 'Srikanya Comfort',
    area: 'Kukatpally',
    type: 'Restaurant',
    galleryImages: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
    ],
    weeks: '4/4',
    screens: 1,
    hours: 168,
    price: 25000,
    originalPrice: 30000,
    lat: 17.4840, lng: 78.3880,
    impressions: '22k+',
    dwellTime: '45m'
  },
  {
    id: '9',
    name: 'The Hyderabad Gymkhana Club',
    area: 'Banjara Hills',
    type: 'Club',
    galleryImages: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
    ],
    weeks: '4/4',
    screens: 4,
    hours: 672,
    price: 100000,
    originalPrice: 125000,
    lat: 17.4185, lng: 78.4350,
    impressions: '80k+',
    dwellTime: '150m'
  }
];

const AREAS = ['All Areas', 'Jubilee Hills', 'Banjara Hills', 'Financial District & Kokapet', 'Nanakramaguda Circle', 'Kukatpally'];

interface NetworkDashboardProps {
  initialSearch?: string;
  onBack?: () => void;
  hasAccess?: boolean;
  onRequestAccess?: () => void;
}

const NetworkDashboard: React.FC<NetworkDashboardProps> = ({ initialSearch = '', onBack, hasAccess = true, onRequestAccess }) => {
  const [activeTab, setActiveTab] = useState<'available' | 'selected'>('available');
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeArea, setActiveArea] = useState('All Areas');
  const [hoveredVenueId, setHoveredVenueId] = useState<string | null>(null);
  const [detailVenue, setDetailVenue] = useState<Venue | null>(null);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const filteredVenues = useMemo(() => {
    return VENUES.filter(v => {
      const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesArea = activeArea === 'All Areas' || v.area === activeArea;
      return matchesSearch && matchesArea;
    });
  }, [searchQuery, activeArea]);

  const displayedVenues = useMemo(() => {
    if (activeTab === 'selected') {
      return VENUES.filter(v => selectedVenues.includes(v.id));
    }
    return filteredVenues;
  }, [activeTab, filteredVenues, selectedVenues]);

  const toggleVenue = (id: string) => {
    setSelectedVenues(prev => 
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const totalSelectedPrice = useMemo(() => {
    return selectedVenues.reduce((acc, id) => {
      const v = VENUES.find(item => item.id === id);
      return acc + (v ? v.price : 0);
    }, 0);
  }, [selectedVenues]);

  // Map Effect
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current || isReviewMode || !hasAccess) return;

    const map = L.map(mapContainerRef.current, {
      center: [17.43, 78.37],
      zoom: 12,
      zoomControl: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CARTO'
    }).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [isReviewMode, hasAccess]);

  // Markers Effect
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || isReviewMode || !hasAccess) return;

    Object.keys(markersRef.current).forEach(id => {
      markersRef.current[id].remove();
    });
    markersRef.current = {};

    displayedVenues.forEach(v => {
      const isSelected = selectedVenues.includes(v.id);
      const isHovered = hoveredVenueId === v.id;

      const markerIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="position: relative; width: 32px; height: 32px;">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="${isSelected ? '#8b1d2e' : (isHovered ? '#1e293b' : '#000000')}" stroke="#ffffff" stroke-width="2" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3)); transition: all 0.2s ease;">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" fill="#ffffff" />
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32] 
      });

      const marker = L.marker([v.lat, v.lng], { icon: markerIcon }).addTo(map);
      marker.on('click', () => {
        setDetailVenue(v);
        setShowAllImages(false);
        map.flyTo([v.lat, v.lng], 15, { duration: 1.5 });
      });
      markersRef.current[v.id] = marker;
    });
  }, [displayedVenues, selectedVenues, hoveredVenueId, isReviewMode, hasAccess]);

  if (!hasAccess) {
    return (
      <div className="h-screen w-full flex flex-col bg-[#030712] overflow-hidden items-center justify-center relative p-6">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1800')] bg-cover bg-center opacity-20 grayscale brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/90 via-transparent to-[#030712]" />
        
        <header className="absolute top-0 left-0 right-0 h-20 flex items-center justify-between px-8 z-20">
           <button onClick={onBack} className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors">
              <ChevronLeft size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Return to Gallery</span>
           </button>
        </header>

        <div className="relative z-10 max-w-2xl w-full text-center space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
           <div className="inline-flex items-center space-x-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[#c4a47c] backdrop-blur-xl">
              <Lock size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Restricted Intelligence</span>
           </div>
           
           <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight font-sans">
              Unlock the <br />
              <span className="italic font-serif font-normal text-gradient-gold">Interactive Grid</span>
           </h2>
           
           <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed font-canva">
              Access to Hyderabad's most exclusive screen inventory map requires professional verification. Gain insights into live impressions, dwell times, and campaign analytics.
           </p>

           <div className="pt-6">
              <button 
                onClick={onRequestAccess}
                className="bg-white text-black px-12 py-6 rounded-full font-black text-[11px] uppercase tracking-[0.3em] shadow-luxury hover:bg-[#c4a47c] hover:text-white transition-all active:scale-95 flex items-center justify-center mx-auto space-x-4 group"
              >
                <span>Provide Brand Details</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
           </div>
           
           <div className="flex items-center justify-center space-x-12 pt-12 opacity-40">
              <div className="flex flex-col items-center">
                 <Monitor size={20} className="text-white mb-2" />
                 <span className="text-[8px] font-black text-white uppercase tracking-widest">Inventory Visualization</span>
              </div>
              <div className="flex flex-col items-center">
                 <Users size={20} className="text-white mb-2" />
                 <span className="text-[8px] font-black text-white uppercase tracking-widest">Audience Intelligence</span>
              </div>
              <div className="flex flex-col items-center">
                 <TrendingUp size={20} className="text-white mb-2" />
                 <span className="text-[8px] font-black text-white uppercase tracking-widest">Performance Metrics</span>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div id="network-discovery" className="h-screen w-full flex flex-col bg-white overflow-hidden z-[60] relative">
      <header className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white z-20">
        <button 
          onClick={() => isReviewMode ? setIsReviewMode(false) : onBack?.()}
          className="flex items-center space-x-2 text-gray-500 hover:text-black transition-colors group"
        >
          <ChevronLeft size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">{isReviewMode ? 'Back to Map' : 'Back to Home'}</span>
        </button>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-black relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full border border-white" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-[10px] font-black text-white">AK</div>
        </div>
      </header>

      {isReviewMode ? (
        <div className="flex-1 overflow-y-auto bg-gray-50 p-8 md:p-16">
          <div className="max-w-4xl mx-auto text-center py-20">
             <h2 className="text-3xl font-black mb-10">Review Media Plan</h2>
             <button onClick={() => setIsSubmitted(true)} className="bg-black text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em]">Finalise Campaign</button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          <aside className="w-[450px] bg-white border-r border-gray-100 flex flex-col h-full shadow-2xl z-10">
            <div className="p-6 border-b border-gray-50 space-y-5">
              <div className="flex items-center space-x-3 bg-gray-50 rounded-2xl p-2 border border-gray-100">
                <Search size={18} className="text-gray-400 ml-3" />
                <input 
                  type="text" placeholder="Search venues..." 
                  className="w-full bg-transparent border-none text-sm focus:ring-0 text-gray-800 font-medium placeholder:text-gray-300"
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {AREAS.map(area => (
                  <button
                    key={area} onClick={() => setActiveArea(area)}
                    className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeArea === area ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 no-scrollbar">
              {displayedVenues.map(venue => (
                <div 
                  key={venue.id} onClick={() => setDetailVenue(venue)}
                  className={`bg-white rounded-3xl p-5 flex gap-4 cursor-pointer transition-all border-2 ${selectedVenues.includes(venue.id) ? 'border-red-600 shadow-lg shadow-red-50' : 'border-transparent hover:border-gray-200'}`}
                >
                  <div className="w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden">
                    <img src={venue.image || venue.galleryImages?.[0]} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900 font-black text-sm leading-tight">{venue.name}</h4>
                    <p className="text-gray-400 text-[10px] font-bold mt-1">{venue.area}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">{venue.type}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleVenue(venue.id); }}
                        className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all ${selectedVenues.includes(venue.id) ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                      >
                        {selectedVenues.includes(venue.id) ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <main className="flex-1 relative bg-gray-100">
            <div ref={mapContainerRef} className="w-full h-full z-0" />
            
            {detailVenue && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setDetailVenue(null)} />
                <div className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-luxury overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
                  <div className="relative h-[450px] flex-shrink-0 overflow-hidden">
                    <div className="absolute inset-0 flex">
                      <div className="flex-1 relative h-full">
                        <img src={detailVenue.galleryImages?.[0] || detailVenue.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="w-[30%] flex flex-col gap-1 pl-1 bg-white">
                        {detailVenue.galleryImages?.slice(1, 4).map((img, i) => (
                          <div key={i} className="flex-1 relative overflow-hidden">
                            <img src={img} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <button 
                      onClick={() => setDetailVenue(null)}
                      className="absolute top-6 right-6 bg-white text-black p-3 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-xl z-[60]"
                    >
                      <X size={20} />
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none" />
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                      <div>
                        <div className="flex items-center space-x-2 text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">
                          <MapPin size={10} className="text-red-500" />
                          <span>{detailVenue.area}</span>
                        </div>
                        <h3 className="text-4xl font-black text-white leading-tight">{detailVenue.name}</h3>
                      </div>
                      {detailVenue.galleryImages && detailVenue.galleryImages.length > 1 && (
                        <button 
                          onClick={() => setShowAllImages(!showAllImages)}
                          className="bg-white/20 backdrop-blur-xl border border-white/20 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center space-x-2"
                        >
                          <ImageIcon size={14} />
                          <span>{showAllImages ? 'Hide Gallery' : 'Show All Images'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-10 space-y-10 overflow-y-auto bg-white flex-1">
                    {showAllImages ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-500">
                        {detailVenue.galleryImages?.map((img, i) => (
                          <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-gray-100">
                            <img src={img} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-3 gap-6">
                           <div className="bg-gray-50 rounded-3xl p-6 text-center">
                              <Monitor size={24} className="mx-auto mb-3 text-blue-500" />
                              <div className="text-2xl font-black text-gray-900">{detailVenue.screens}</div>
                              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Screens</div>
                           </div>
                           <div className="bg-gray-50 rounded-3xl p-6 text-center">
                              <Users size={24} className="mx-auto mb-3 text-emerald-500" />
                              <div className="text-2xl font-black text-gray-900">{detailVenue.impressions || '25k+'}</div>
                              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Monthly REACH</div>
                           </div>
                           <div className="bg-gray-50 rounded-3xl p-6 text-center">
                              <Clock size={24} className="mx-auto mb-3 text-orange-500" />
                              <div className="text-2xl font-black text-gray-900">{detailVenue.dwellTime || '45m'}</div>
                              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">AVG Engagement</div>
                           </div>
                        </div>
                        <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                           <div className="text-3xl font-black text-gray-900">₹{(detailVenue.price/1000).toFixed(1)}K</div>
                           <button 
                             onClick={() => toggleVenue(detailVenue.id)}
                             className={`px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all shadow-xl active:scale-95 ${selectedVenues.includes(detailVenue.id) ? 'bg-red-600 text-white' : 'bg-black text-white hover:bg-gray-900'}`}
                           >
                              {selectedVenues.includes(detailVenue.id) ? 'Deselect Location' : 'Select for Campaign'}
                           </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {!isReviewMode && selectedVenues.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-6 z-[80] shadow-[0_-20px_60px_rgba(0,0,0,0.5)] border-t border-white/5 animate-in slide-in-from-bottom duration-500">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <div className="flex items-center space-x-4">
                <ShoppingBag size={24} className="text-red-500" />
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Total Campaign Value</div>
                  <div className="text-2xl font-black text-white">₹{(totalSelectedPrice / 100000).toFixed(2)} <span className="text-sm font-medium text-gray-400">Lakhs</span></div>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsReviewMode(true)}
              className="bg-white text-black px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-red-600 hover:text-white transition-all flex items-center space-x-3"
            >
              <Check size={16} />
              <span>Review Media Plan</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkDashboard;