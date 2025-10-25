// Redesigned Quote Calculator in INR for Indian market
import React, { useState, useMemo, useEffect } from 'react';
import AnimatedSection from './AnimatedSection';

const QuoteCalculator: React.FC<{ setActiveRoute: (route: string) => void; }> = ({ setActiveRoute }) => {
  const [features, setFeatures] = useState<string[]>([]);
  const [pages, setPages] = useState(5);
  const [design, setDesign] = useState('template');
  const [displayCost, setDisplayCost] = useState(0);

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setFeatures([...features, value]);
    } else {
      setFeatures(features.filter(feature => feature !== value));
    }
  };

  const estimatedCost = useMemo(() => {
    let baseCost = 0;

    // Cost per page in INR
    baseCost += pages * 2000;

    // Design complexity cost
    if (design === 'custom') baseCost += 10000;
    else if (design === 'template') baseCost += 3000;

    // Feature costs in INR
    features.forEach(feature => {
      switch (feature) {
        case 'ecommerce': baseCost += 15000; break;
        case 'cms': baseCost += 7000; break;
        case 'auth': baseCost += 5000; break;
        case 'seo': baseCost += 4000; break;
        default: break;
      }
    });

    return baseCost;
  }, [features, pages, design]);

  useEffect(() => {
    const animationDuration = 500; // ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(animationDuration / frameDuration);
    const startValue = displayCost;
    const endValue = estimatedCost;
    const difference = endValue - startValue;

    let currentFrame = 0;

    const counter = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const currentValue = startValue + difference * Math.pow(progress, 3); // easeOutCubic

      setDisplayCost(currentValue);

      if (currentFrame === totalFrames) {
        clearInterval(counter);
        setDisplayCost(endValue);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [estimatedCost]);

  return (
    <div className="py-24 pt-36">
      <div className="container max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-4xl lg:text-5xl font-bold text-center text-white mb-4 tracking-tight">
            Project Quote Estimator
          </h2>
          <p className="text-lg text-zinc-400 text-center max-w-3xl mx-auto mb-16">
            Select your project's features to get a real-time cost estimate. For a detailed quote, please get in touch.
          </p>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
          <AnimatedSection delay="delay-200">
            <div className="bg-white/5 p-8 rounded-xl border border-white/10 space-y-8 h-full">
              <div>
                <label className="block text-lg font-semibold text-white mb-3">
                  Number of Pages: <span className="text-indigo-400 font-bold">{pages}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={pages}
                  onChange={(e) => setPages(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-white mb-4">Design Complexity</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${design === 'template' ? 'bg-indigo-600/30 border-indigo-500' : 'border-white/10 hover:border-white/20'}`}>
                    <input type="radio" name="design" value="template" checked={design === 'template'} onChange={(e) => setDesign(e.target.value)} className="sr-only"/>
                    <span className="font-bold text-white">Template-based</span>
                    <span className="text-sm text-zinc-400 block mt-1">Cost-effective & fast</span>
                  </label>
                  <label className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${design === 'custom' ? 'bg-indigo-600/30 border-indigo-500' : 'border-white/10 hover:border-white/20'}`}>
                    <input type="radio" name="design" value="custom" checked={design === 'custom'} onChange={(e) => setDesign(e.target.value)} className="sr-only"/>
                    <span className="font-bold text-white">Full Custom</span>
                    <span className="text-sm text-zinc-400 block mt-1">Unique & tailored</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-white mb-4">Core Features</label>
                <div className="grid grid-cols-2 gap-3">
                  {['E-commerce', 'CMS Integration', 'User Auth', 'Advanced SEO'].map(feature => (
                    <label key={feature} className="flex items-center space-x-3 text-zinc-300 cursor-pointer p-2 rounded-md hover:bg-white/5">
                      <input type="checkbox" value={feature.toLowerCase().split(' ')[0]} onChange={handleFeatureChange} className="form-checkbox h-5 w-5 text-indigo-500 bg-zinc-700 border-zinc-600 rounded focus:ring-indigo-500"/>
                      <span>{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay="delay-400">
            <div className="bg-zinc-900/50 p-8 rounded-xl border border-indigo-500/30 sticky top-28 text-center">
              <p className="text-zinc-400 text-lg uppercase tracking-wider">Estimated Cost</p>
              <h3 className="text-5xl lg:text-6xl font-extrabold text-white my-4">
                ₹{Math.round(displayCost).toLocaleString()}
              </h3>
              <p className="text-zinc-500 text-sm">This is a ballpark figure. Prices may vary based on specific requirements.</p>
              <button 
                  onClick={() => setActiveRoute('/contact')}
                  className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105"
                >
                  Request a Formal Quote
                </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default QuoteCalculator;
