// Fix: Updated main component styles for the new design.
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/Hero';
import ServicesPage from './components/Services';
import WorkPage from './components/Work';
import AboutPage from './components/About';
import ContactPage from './components/Contact';
import AIGeneratorPage from './components/AIGenerator';
import MyConcepts from './components/MyConcepts';
import PlansPage from './components/Plans';
import QuoteCalculator from './components/QuoteCalculator';
import LogoGeneratorPage from './components/LogoGenerator';
import IdeaGeneratorPage from './components/IdeaGenerator';

const routes: { [key: string]: React.ComponentType<any> } = {
  '/': HomePage,
  '/services': ServicesPage,
  '/work': WorkPage,
  '/about': AboutPage,
  '/pricing': PlansPage,
  '/contact': ContactPage,
  '/ai-generator': AIGeneratorPage,
  '/my-concepts': MyConcepts,
  '/quote-calculator': QuoteCalculator,
  '/logo-generator': LogoGeneratorPage,
   '/idea-generator': IdeaGeneratorPage,
};

const App: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = window.location.hash.slice(1) || '/';
      setActiveRoute(newRoute);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Initial load check
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const setRoute = (route: string) => {
      window.location.hash = route;
  };

  const Page = routes[activeRoute] || routes['/']; // Fallback to HomePage

  return (
    <div className="antialiased">
      <Header activeRoute={activeRoute} setActiveRoute={setRoute} />
      <main>
          <Page setActiveRoute={setRoute} />
      </main>
      <Footer setActiveRoute={setRoute} />
    </div>
  );
};

export default App;