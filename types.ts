// Fix: Defining application-wide types to resolve module errors.
import React from 'react';

export interface Service {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

export interface Project {
  image: string;
  title: string;
  category: string;
  description: string;
}

export interface WebsiteConcept {
  id: string;
  prompt: string;
  html: string;
  css: string;
  js: string;
  timestamp: number;
}
