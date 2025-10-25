import React, { useState, useEffect } from 'react';
import { generateLogoConcept } from '../services/geminiService';
import AnimatedSection from './AnimatedSection';
import APIKeyManager from './APIKeyManager';
import DownloadIcon from './icons/DownloadIcon';

const styles = ['Minimalist', '3D', 'Vintage', 'Abstract', 'Illustration', 'Futuristic'];

const LogoGeneratorPage: React.FC<{}> = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(styles[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('google-ai-api-key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) {
      setError('Please set your API key before generating logos.');
      return;
    }
    if (!prompt.trim()) {
      setError('Please enter a description for your logo.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setImages([]);

    try {
      const result = await generateLogoConcept(prompt, selectedStyle, apiKey);
      setImages(result);
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
  
  const handleDownload = () => {
    if (!selectedImage) return;
    const link = document.createElement('a');
    link.href = selectedImage;
    link.download = `sainetix-logo-${prompt.substring(0, 20).replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isApiKeyError = error && error.toLowerCase().includes('api key');

  return (
    <div className="py-24 pt-36 min-h-screen">
      <div className="container max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">AI Logo Generator</h2>
            <p className="text-lg text-zinc-400 mb-8">
              Describe your brand's essence, select a style, and let our AI craft the perfect logo for you.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay="delay-200" className="max-w-4xl mx-auto">
          {!apiKey ? (
            <APIKeyManager onKeySaved={setApiKey} />
          ) : (
            <form onSubmit={handleGenerate} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
                <div>
                  <label htmlFor="logo-prompt" className="block text-sm font-medium text-zinc-300 mb-2">Logo Description</label>
                  <textarea
                    id="logo-prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A majestic lion wearing a crown, for a luxury brand..."
                    className="w-full bg-black/20 border-2 border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
                    rows={3}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-3">Style</label>
                  <div className="flex flex-wrap gap-3">
                    {styles.map(style => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setSelectedStyle(style)}
                        disabled={isLoading}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${selectedStyle === style ? 'bg-indigo-600 text-white' : 'bg-white/10 text-zinc-300 hover:bg-white/20'}`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105 disabled:bg-zinc-600 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
                  >
                    {isLoading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Generate Logos'}
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

        {isLoading && images.length === 0 && (
            <div className="w-full mt-16 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg text-zinc-400">Our AI is designing your logos... this can take up to a minute.</p>
                </div>
            </div>
        )}

        {images.length > 0 && (
          <AnimatedSection className="mt-16">
            <h3 className="text-2xl font-bold text-center text-white mb-8">Your Generated Concepts</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {images.map((imageSrc, index) => (
                <div key={index} className="group relative bg-white/5 p-4 rounded-xl shadow-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer" onClick={() => setSelectedImage(imageSrc)}>
                  <img src={imageSrc} alt={`Generated Logo ${index + 1}`} className="w-full h-full object-contain rounded-md" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-semibold">View</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-2xl max-h-[80vh] bg-zinc-900 border border-white/10 rounded-xl p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Selected logo" className="w-full h-full object-contain rounded-lg"/>
            <div className="mt-6 flex justify-center">
               <button onClick={handleDownload} className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105">
                <DownloadIcon className="w-5 h-5" />
                <span>Download</span>
              </button>
            </div>
            <button onClick={() => setSelectedImage(null)} className="absolute -top-3 -right-3 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoGeneratorPage;