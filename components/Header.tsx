import React, { useState, useEffect } from 'react';
import RocketIcon from './icons/RocketIcon';
import SparklesIcon from './icons/SparklesIcon'; // Assuming SparklesIcon for Website Generator
import MagicWandIcon from './icons/MagicWandIcon'; // New icon for Logo Generator
import IdeaIcon from './icons/IdeaIcon';

interface HeaderProps {
    activeRoute: string;
    setActiveRoute: (route: string) => void;
}

const navLinks = [
    { name: 'Home', href: '#/' },
    { name: 'Services', href: '#/services' },
    { name: 'Work', href: '#/work' },
    { name: 'About', href: '#/about' },
    { name: 'Pricing', href: '#/pricing' },
    { name: 'Contact', href: '#/contact' },
];

const Header: React.FC<HeaderProps> = ({ activeRoute, setActiveRoute }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on initial load
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setActiveRoute(href.slice(1));
        setIsMenuOpen(false);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-black/50 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}>
            <div className="container max-w-7xl mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    <a href="#/" onClick={(e) => handleNavClick(e, '#/')} className="flex items-center space-x-2">
                        <RocketIcon className="w-7 h-7 text-indigo-500" />
                        <span className="text-2xl font-bold text-white">Sainetix</span>
                    </a>
                    <nav className="hidden md:flex items-center space-x-2">
                        {navLinks.map(link => (
                            <a 
                                key={link.name} 
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeRoute === link.href.slice(1) ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                {link.name}
                            </a>
                        ))}
                        {/* AI Tools Dropdown */}
                        <div className="relative group ml-4">
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-md shadow-indigo-600/20 transition-all transform hover:scale-105 flex items-center space-x-2">
                                <span>AI Tools</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <div className="absolute top-full right-0 mt-2 w-64 bg-zinc-900/80 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl p-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 -translate-y-2 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                                <a href="#/ai-generator" onClick={(e) => handleNavClick(e, '#/ai-generator')} className="flex items-center space-x-3 px-4 py-3 text-left w-full rounded-md text-zinc-300 hover:bg-white/10 hover:text-white">
                                    <SparklesIcon className="w-6 h-6 text-indigo-400"/>
                                    <div>
                                        <p className="font-semibold">Website Generator</p>
                                        <p className="text-xs text-zinc-400">Create a site from a prompt</p>
                                    </div>
                                </a>
                                <a href="#/logo-generator" onClick={(e) => handleNavClick(e, '#/logo-generator')} className="flex items-center space-x-3 px-4 py-3 text-left w-full rounded-md text-zinc-300 hover:bg-white/10 hover:text-white">
                                    <MagicWandIcon className="w-6 h-6 text-indigo-400"/>
                                    <div>
                                        <p className="font-semibold">Logo Generator</p>
                                        <p className="text-xs text-zinc-400">Generate a brand logo</p>
                                    </div>
                                </a>
                                <a href="#/idea-generator" onClick={(e) => handleNavClick(e, '#/idea-generator')} className="flex items-center space-x-3 px-4 py-3 text-left w-full rounded-md text-zinc-300 hover:bg-white/10 hover:text-white">
                                    <IdeaIcon className="w-6 h-6 text-indigo-400"/>
                                    <div>
                                        <p className="font-semibold">Idea Generator</p>
                                        <p className="text-xs text-zinc-400">Brainstorm creative ideas</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none p-2 rounded-md hover:bg-white/10">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            <div className={`md:hidden bg-black/80 backdrop-blur-lg overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
                 <nav className="flex flex-col items-center space-y-2 py-6">
                    {navLinks.map(link => (
                        <a 
                            key={link.name} 
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`px-4 py-2 rounded-md w-4/5 text-center text-lg ${activeRoute === link.href.slice(1) ? 'bg-white/10 text-white' : 'text-zinc-400'}`}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a href="#/ai-generator" onClick={(e) => handleNavClick(e, '#/ai-generator')} className="mt-4 bg-indigo-600/50 hover:bg-indigo-700/50 text-white font-semibold py-3 px-6 rounded-md w-4/5 text-center">
                        Website Generator
                    </a>
                    <a href="#/logo-generator" onClick={(e) => handleNavClick(e, '#/logo-generator')} className="bg-indigo-600/50 hover:bg-indigo-700/50 text-white font-semibold py-3 px-6 rounded-md w-4/5 text-center">
                        Logo Generator
                    </a>
                     <a href="#/idea-generator" onClick={(e) => handleNavClick(e, '#/idea-generator')} className="bg-indigo-600/50 hover:bg-indigo-700/50 text-white font-semibold py-3 px-6 rounded-md w-4/5 text-center">
                        Idea Generator
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;