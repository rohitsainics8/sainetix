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

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  category: string;
  coverImage: string;
  createdAt: number;
  excerpt: string;
}

export interface Idea {
  title: string;
  description: string;
}
