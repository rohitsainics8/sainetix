import React, { useState, useEffect } from 'react';
import { generateCreativeIdeas } from '../services/geminiService';
import AnimatedSection from './AnimatedSection';
import APIKeyManager from './APIKeyManager';


const ideaTypes = [
  { key: 'Slogans', label: 'Brand Slogans' },
  { key: 'Taglines', label: 'Marketing Taglines' },
  { key: 'Features', label: 'Unique Website Features' },
];

const IdeaGeneratorPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedType, setSelectedType] = useState(ideaTypes[0].key);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<string[]>([]);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('google-ai-api-key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     if (!apiKey) {
      setError('Please set your API key before generating ideas.');
      return;
    }
    if (!prompt.trim()) {
      setError('Please describe your business or product.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const generatedIdeas = await generateCreativeIdeas(prompt, selectedType, apiKey);
      setResults(generatedIdeas);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetApiKey = () => {
    localStorage.removeItem('google-ai-api-key');
    setApiKey(null);
    setError(null);
  };

  const isApiKeyError = error && error.toLowerCase().includes('api key');

  return (
    <div className="py-24 pt-36 min-h-screen">
      <div className="container max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">AI Idea Generator</h2>
            <p className="text-lg text-zinc-400 mb-12">
              Stuck in a creative rut? Describe your business and let our AI brainstorm slogans, taglines, and feature ideas for you.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay="delay-200" className="max-w-3xl mx-auto">
          {!apiKey ? (
            <APIKeyManager onKeySaved={setApiKey} />
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
              <div>
                <label htmlFor="idea-prompt" className="block text-sm font-medium text-zinc-300 mb-2">Your Business / Product</label>
                <textarea
                  id="idea-prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., An eco-friendly subscription box for coffee lovers..."
                  className="w-full bg-black/20 border-2 border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
                  rows={3}
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-3">What do you need?</label>
                <div className="flex flex-wrap gap-3">
                  {ideaTypes.map(type => (
                    <button
                      key={type.key}
                      type="button"
                      onClick={() => setSelectedType(type.key)}
                      disabled={isLoading}
                      className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${selectedType === type.key ? 'bg-indigo-600 text-white' : 'bg-white/10 text-zinc-300 hover:bg-white/20'}`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105 disabled:bg-zinc-600 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center min-w-[160px]"
                >
                  {isLoading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Generate Ideas'}
                </button>
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

        {(isLoading && results.length === 0) && (
          <div className="w-full mt-16 text-center">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-zinc-400">Our AI is brainstorming... please wait.</p>
          </div>
        )}

        {results.length > 0 && (
          <AnimatedSection className="mt-16 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-white mb-8">Here are some ideas for you!</h3>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-5 flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-600/30 text-indigo-400 rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <p className="text-zinc-200 text-lg">{result}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
};

export default IdeaGeneratorPage;