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
import IdeaGeneratorPage from './components/IdeaGenerator';
import MyConcepts from './components/MyConcepts';
import PlansPage from './components/Plans';
import QuoteCalculator from './components/QuoteCalculator';
import LogoGeneratorPage from './components/LogoGenerator';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import CreatePostPage from './components/CreatePostPage';
import LoginPage from './components/LoginPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const routes: { [key: string]: React.ComponentType<any> } = {
  '/': HomePage,
  '/services': ServicesPage,
  '/work': WorkPage,
  '/about': AboutPage,
  '/pricing': PlansPage,
  '/contact': ContactPage,
  '/ai-generator': AIGeneratorPage,
  '/idea-generator': IdeaGeneratorPage,
  '/my-concepts': MyConcepts,
  '/quote-calculator': QuoteCalculator,
  '/logo-generator': LogoGeneratorPage,
  '/blog': BlogPage,
  '/login': LoginPage,
  // '/blog/new' is handled separately as a protected route
};

const AppContent: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState(window.location.hash.slice(1) || '/');
  const { isAuthenticated } = useAuth();

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

  let PageComponent: React.ComponentType<any> | undefined;
  const pageProps: { [key: string]: any } = { setActiveRoute };

  // Handle protected route for creating a new post
  if (activeRoute === '/blog/new') {
    if (isAuthenticated) {
      PageComponent = CreatePostPage;
    } else {
      // Redirect to login if not authenticated
      PageComponent = LoginPage;
    }
  } else {
     PageComponent = routes[activeRoute];
  }

  // Handle dynamic blog post routes
  if (!PageComponent) {
    if (activeRoute.startsWith('/blog/')) {
        const slug = activeRoute.substring('/blog/'.length);
        if (slug !== 'new') {
            PageComponent = BlogPostPage;
            pageProps.slug = slug;
        }
    }
  }
  
  // Fallback to home page if no route matches
  if (!PageComponent) {
    PageComponent = routes['/'];
  }

  const Page = PageComponent;

  return (
    <div className="antialiased">
      <Header activeRoute={activeRoute} setActiveRoute={setRoute} />
      <main>
          <Page {...pageProps} />
      </main>
      <Footer setActiveRoute={setRoute} />
    </div>
  );
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};


export default App;
