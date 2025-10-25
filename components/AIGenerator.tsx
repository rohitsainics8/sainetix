// Fix: Redesigned the AI Generator page with a sleeker interface and improved user experience.
import React, { useState, useRef, useEffect } from 'react';
import { generateWebsiteConcept } from '../services/geminiService';
import type { WebsiteConcept } from '../types';
import AnimatedSection from './AnimatedSection';
import RefreshIcon from './icons/RefreshIcon';
import SaveIcon from './icons/SaveIcon';
import UserIcon from './icons/UserIcon';
import APIKeyManager from './APIKeyManager';


const AIGeneratorPage: React.FC<{ setActiveRoute: (route: string) => void; }> = ({ setActiveRoute }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [concept, setConcept] = useState<{ html: string; css: string; js: string; } | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    // On component mount, try to load the key from localStorage
    const savedKey = localStorage.getItem('google-ai-api-key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);
  
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) {
      setError('Please set your API key before generating a concept.');
      return;
    }
    if (!prompt.trim()) {
      setError('Please enter a description for your website.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setConcept(null);
    setIsSaved(false);

    try {
      const result = await generateWebsiteConcept(prompt, apiKey);
      setConcept(result);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveConcept = () => {
    if (!concept || !prompt) return;

    const savedConcepts: WebsiteConcept[] = JSON.parse(localStorage.getItem('savedConcepts') || '[]');
    const newConcept: WebsiteConcept = {
      id: crypto.randomUUID(),
      prompt,
      ...concept,
      timestamp: Date.now(),
    };
    
    savedConcepts.unshift(newConcept);
    localStorage.setItem('savedConcepts', JSON.stringify(savedConcepts));
    setIsSaved(true);
  };
  
  const handleResetApiKey = () => {
    localStorage.removeItem('google-ai-api-key');
    setApiKey(null);
    setError(null);
  };

  const isApiKeyError = error && error.toLowerCase().includes('api key');

  const srcDoc = concept ? `
    <html>
      <head>
        <style>${concept.css}</style>
      </head>
      <body>
        ${concept.html}
        <script>${concept.js}</script>
      </body>
    </html>
  ` : '';

  return (
    <div className="py-24 pt-36 min-h-screen">
      <div className="container max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">AI Website Generator</h2>
            <p className="text-lg text-zinc-400 mb-8">
              Describe your ideal website, and let our AI create a design concept for you in seconds. From portfolios to e-commerce stores, bring your vision to life.
            </p>
          </div>
        </AnimatedSection>
        
        <AnimatedSection delay="delay-200" className="max-w-4xl mx-auto">
          {!apiKey ? (
             <APIKeyManager onKeySaved={setApiKey} />
          ) : (
            <form onSubmit={handleSubmit}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g., A sleek, dark-themed portfolio for a photographer specializing in cityscapes..."
                      className="w-full bg-transparent text-white rounded-lg px-4 py-3 focus:outline-none placeholder:text-zinc-500 text-lg resize-none"
                      rows={4}
                      disabled={isLoading}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105 disabled:bg-zinc-600 disabled:scale-100 disabled:cursor-not-allowed"
                      >
                        {isLoading ? 'Generating...' : 'Generate'}
                      </button>
                    </div>
                </div>
              </form>
          )}
          {error && (
            <div className="text-center mt-6">
              <p className="text-red-400">{error}</p>
              {isApiKeyError && (
                <button
                  onClick={handleResetApiKey}
                  className="mt-2 text-sm text-indigo-400 underline hover:text-indigo-300"
                >
                  Reset API Key
                </button>
              )}
            </div>
          )}
        </AnimatedSection>
        
        {(isLoading && !concept) && (
            <div className="w-full mt-16 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg text-zinc-400">Our AI is building your concept... this may take a moment.</p>
                </div>
            </div>
        )}

        {concept && (
          <AnimatedSection className="mt-16" ref={resultRef}>
            <div className="bg-black/50 rounded-xl border border-white/10 shadow-2xl overflow-hidden">
              <div className="p-3 bg-zinc-800/50 flex justify-between items-center border-b border-white/10">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={(e) => handleSubmit(e as any)} className="flex items-center space-x-1.5 text-zinc-400 hover:text-white text-sm" title="Regenerate">
                    <RefreshIcon className="w-4 h-4" />
                    <span>Regenerate</span>
                  </button>
                  <button onClick={handleSaveConcept} disabled={isSaved} className="flex items-center space-x-1.5 text-zinc-400 hover:text-white disabled:text-indigo-400 disabled:cursor-not-allowed text-sm" title="Save Concept">
                    <SaveIcon className="w-4 h-4" />
                    <span>{isSaved ? 'Saved!' : 'Save'}</span>
                  </button>
                   <button onClick={() => setActiveRoute('/my-concepts')} className="flex items-center space-x-1.5 text-zinc-400 hover:text-white text-sm" title="View My Concepts">
                      <UserIcon className="w-4 h-4" />
                      <span>My Concepts</span>
                   </button>
                </div>
              </div>
              <div className="aspect-video w-full bg-zinc-900">
                  <iframe
                    title="AI Generated Website Preview"
                    srcDoc={srcDoc}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts"
                  />
              </div>
            </div>
             <div className="text-center mt-10 p-6 bg-white/5 rounded-lg border border-white/10">
                <p className="text-zinc-300">Concept generated! Now, create a logo for your new brand.</p>
                <button onClick={() => setActiveRoute('/logo-generator')} className="mt-3 text-indigo-400 font-semibold hover:text-indigo-300 transition-colors inline-flex items-center">
                    Go to AI Logo Generator &rarr;
                </button>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
};

export default AIGeneratorPage;