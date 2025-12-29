
// Fix: Import React to resolve 'Cannot find namespace React' for React.ReactNode
import React from 'react';

export interface BrochureSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string[];
  image?: string;
  stats?: { label: string; value: string }[];
  icon?: React.ReactNode;
}

export interface User {
  email: string;
  name: string;
  isLoggedIn: boolean;
}

export interface ImageEditResult {
  imageUrl: string;
  prompt: string;
}
