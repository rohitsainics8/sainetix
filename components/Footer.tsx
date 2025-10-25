// Fix: Simplified and redesigned the Footer for a cleaner look.
import React from 'react';
import RocketIcon from './icons/RocketIcon';

interface FooterProps {
  setActiveRoute: (route: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveRoute }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveRoute(href.slice(1));
  };

  return (
    <footer className="bg-black/20 border-t border-white/10 mt-24">
      <div className="container max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          {/* Column 1: Brand */}
          <div className="col-span-1 md:col-span-1">
            <a href="#/" onClick={(e) => handleNavClick(e, '#/')} className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <RocketIcon className="w-7 h-7 text-indigo-500" />
              <span className="text-2xl font-bold text-white">Sainetix</span>
            </a>
            <p className="text-zinc-400 text-sm">
              AI-powered web development for visionary brands.
            </p>
            <div className="flex space-x-4 mt-6 justify-center md:justify-start">
              <a href="#" aria-label="Twitter" className="text-zinc-500 hover:text-indigo-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085c.645 1.956 2.523 3.375 4.743 3.415-1.708 1.325-3.843 2.11-6.166 2.11a11.14 11.14 0 01-.598-.035c2.21 1.405 4.833 2.223 7.616 2.223 9.135 0 14.119-7.556 14.119-14.118 0-.214-.005-.428-.014-.64a10.025 10.025 0 002.463-2.548z"></path></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-zinc-500 hover:text-indigo-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"></path></svg>
              </a>
              <a href="#" aria-label="Github" className="text-zinc-500 hover:text-indigo-400 transition-colors">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd"></path></svg>
              </a>
            </div>
          </div>
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#/services" onClick={(e) => handleNavClick(e, '#/services')} className="text-zinc-400 hover:text-indigo-400 transition-colors">Services</a></li>
              <li><a href="#/work" onClick={(e) => handleNavClick(e, '#/work')} className="text-zinc-400 hover:text-indigo-400 transition-colors">Work</a></li>
              <li><a href="#/about" onClick={(e) => handleNavClick(e, '#/about')} className="text-zinc-400 hover:text-indigo-400 transition-colors">About</a></li>
              <li><a href="#/pricing" onClick={(e) => handleNavClick(e, '#/pricing')} className="text-zinc-400 hover:text-indigo-400 transition-colors">Pricing</a></li>
            </ul>
          </div>
          {/* Column 3: AI Tools */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">AI Tools</h3>
            <ul className="space-y-3">
              <li><a href="#/ai-generator" onClick={(e) => handleNavClick(e, '#/ai-generator')} className="text-zinc-400 hover:text-indigo-400 transition-colors">Website Generator</a></li>
              <li><a href="#/logo-generator" onClick={(e) => handleNavClick(e, '#/logo-generator')} className="text-zinc-400 hover:text-indigo-400 transition-colors">Logo Generator</a></li>
              <li><a href="#/idea-generator" onClick={(e) => handleNavClick(e, '#/idea-generator')} className="text-zinc-400 hover:text-indigo-400 transition-colors">Idea Generator</a></li>
              <li><a href="#/my-concepts" onClick={(e) => handleNavClick(e, '#/my-concepts')} className="text-zinc-400 hover:text-indigo-400 transition-colors">My Concepts</a></li>
              <li><a href="#/quote-calculator" onClick={(e) => handleNavClick(e, '#/quote-calculator')} className="text-zinc-400 hover:text-indigo-400 transition-colors">Quote Calculator</a></li>
            </ul>
          </div>
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li><a href="#/contact" onClick={(e) => handleNavClick(e, '#/contact')} className="text-zinc-400 hover:text-indigo-400 transition-colors">Contact Us</a></li>
              <li><p className="text-zinc-400">info@sainetix.com</p></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-zinc-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Sainetix. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;