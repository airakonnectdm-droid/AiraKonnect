import React from 'react';
import { Monitor, Smartphone, Users, MapPin, Zap, TrendingUp, ShieldCheck, Clock, CheckCircle2, Target, Star, MapPin as Pin, Infinity, CloudUpload, PlayCircle, FileBarChart, Music, UtensilsCrossed, GlassWater, BarChart3, Globe2, Eye, MousePointerClick, BookOpen } from 'lucide-react';

export const COLORS = {
  primary: '#c4a47c',
  secondary: '#c4a47c', 
  bgDark: '#030712',
  bgLight: '#0f172a',
  textMain: '#f8fafc',
  textMuted: '#94a3b8'
};

// Using a high-quality placeholder for the logo as the local file is missing
export const LOGO_URL = 'https://raw.githubusercontent.com/lucide-react/lucide/main/icons/layers.svg';

export const BROCHURE_DATA = [
  {
    id: 'venues',
    type: 'venue-grid',
    title: 'Our Venues',
    subtitle: 'Curated spaces where culture, cuisine, and connections come alive.',
    venues: [
      {
        title: 'Cultural Centers',
        desc: 'Spaces that celebrate art, heritage, and community gatherings.',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
        icon: <Music size={20} className="text-white" />
      },
      {
        title: 'Restaurants',
        desc: 'Premium dining experiences where flavor meets luxury.',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
        icon: <UtensilsCrossed size={20} className="text-white" />
      },
      {
        title: 'Clubs & Lounges',
        desc: 'High-energy social venues that attract the trendsetters.',
        image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&q=80&w=800',
        icon: <GlassWater size={20} className="text-white" />
      }
    ],
    footerStat: '150+ SCREENS ACROSS HYDERABAD'
  },
  {
    id: 'story',
    title: 'AIRA "KONNECT" BRAND STORY',
    type: 'story-comparison',
    content: [
      "At Aira Konnect, we believe that communication is the most powerful force in the world. Our name reflects this duality: 'Aira,' rooted in the ancient Sanskrit preference for speech and the life-giving atmosphere, represents the essence of communication. 'Konnect' represents our cutting-edge digital infrastructure that bridges the gap between brands and people.",
      "History teaches us that the most enduring legacies aren't built in crowded marketplaces, but in the halls of influence. At Aira Konnect, we are digitizing that exact strategy.",
      "The strategy was simple: show up where the right audience already spends time."
    ],
    comparisonImages: [
      {
        year: '1925',
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecee?auto=format&fit=crop&q=80&w=800',
        label: ''
      },
      {
        year: '2025',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
        label: ''
      }
    ]
  },
  {
    id: 'crisis',
    title: 'The "Scroll" Fatigue Crisis',
    subtitle: "You are paying for impressions, but you aren't getting attention.",
    content: [
      "Digital ads are skippable. Social media is cluttered. Your audience is distracted.",
      "Average view time on mobile: 1.7 Seconds.",
      "Ad blockers & Premium Subscriptions reduce your reach.",
      "Low Trust Factor: Users ignore banner ads instinctively."
    ],
    stats: [
      { label: 'Mobile Attention', value: '1.7s' },
      { label: 'Ad Trust', value: 'Low' }
    ],
    icon: <Zap className="text-red-500" />
  },
  {
    id: 'solution',
    type: 'solution-dashboard',
    title: 'THE AIRA "SOLUTION"',
    description: 'We place your brand in Premium, High-Dwell time Environments where audiences are relaxed, receptive, and captive.',
    features: [
      {
        title: 'UnSkippable Visibility',
        desc: '100% Share of Voice during your slot',
        icon: <CheckCircle2 className="text-[#c4a47c]" size={32} />
      },
      {
        title: 'Prime Locations',
        desc: 'Popular venues and target the exact demographic you need',
        icon: <Pin className="text-[#c4a47c]" size={32} />
      },
      {
        title: 'Hyper-Targeted',
        desc: 'Reach the affluent in their natural habitat',
        icon: <Target className="text-[#c4a47c]" size={32} />
      },
      {
        title: 'Brand Recall',
        desc: 'Get 240+ daily plays with your 10-sec slot, plus technology to convert attention into action',
        icon: <Star className="text-[#c4a47c]" size={32} />
      }
    ],
    progressBars: [
      { label: 'Ad Recall', value: 82 },
      { label: 'Engagement', value: 65 },
      { label: 'Trust Factor', value: 70 },
      { label: 'Mobile Search', value: 48 }
    ],
    bottomStats: [
      { value: '45+', label: 'MINS DWELL TIME' },
      { value: '82%', label: 'AD RECALL RATE' },
      { value: '0%', label: 'AD BLOCKING' }
    ]
  },
  {
    id: 'impact-metrics',
    type: 'impact-grid',
    title: 'Media Influence & Reach',
    subtitle: 'Quantifiable results in the most exclusive environments across the city.',
    metrics: [
      {
        label: 'Monthly Impressions',
        value: '5M+',
        icon: <Eye className="text-[#c4a47c]" size={24} />,
        desc: 'Verified views in premium high-traffic areas.'
      },
      {
        label: 'Brand Recall',
        value: '82%',
        icon: <BarChart3 className="text-[#c4a47c]" size={24} />,
        desc: 'Industry leading retention compared to mobile ads.'
      },
      {
        label: 'Avg. Dwell Time',
        value: '45m',
        icon: <Clock className="text-[#c4a47c]" size={24} />,
        desc: 'Undistracted exposure in captive environments.'
      },
      {
        label: 'Growth Rate',
        value: '3x',
        icon: <TrendingUp className="text-[#c4a47c]" size={24} />,
        desc: 'Year-on-year network expansion and visibility.'
      }
    ]
  },
  {
    id: 'gallery',
    type: 'gallery-grid',
    title: 'The Gallery',
    description: 'A visual showcase of Aira Konnect\'s premium digital placements and unforgettable campaigns.',
    secondaryDescription: 'Each frame reflects precision, creativity, and targeted influence.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
        caption: 'Premium dining placements in high-traffic urban hubs.',
        size: 'wide'
      },
      {
        url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200',
        caption: 'Where premium audiences meet unforgettable advertising.',
        size: 'tall'
      },
      {
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200',
        caption: 'Targeted reach inside high-dwell, high-value environments.',
        size: 'normal'
      },
      {
        url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
        caption: 'Designed to pull attention, built to leave a lasting impression.',
        size: 'normal'
      }
    ]
  }
];

export const SLIDER_IMAGES = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1800',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1800',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1800'
];