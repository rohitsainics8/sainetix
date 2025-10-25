// Fix: Redesigned the My Concepts page for better visual consistency and usability.
import React, { useState, useEffect } from 'react';
import type { WebsiteConcept } from '../types';
import AnimatedSection from './AnimatedSection';
import TrashIcon from './icons/TrashIcon';

const MyConcepts: React.FC<{ setActiveRoute: (route: string) => void; }> = ({ setActiveRoute }) => {
  const [concepts, setConcepts] = useState<WebsiteConcept[]>([]);

  useEffect(() => {
    try {
      const savedConcepts = localStorage.getItem('savedConcepts');
      if (savedConcepts) {
        setConcepts(JSON.parse(savedConcepts));
      }
    } catch (error) {
      console.error("Failed to parse saved concepts from localStorage", error);
    }
  }, []);

  const deleteConcept = (id: string) => {
    const updatedConcepts = concepts.filter(concept => concept.id !== id);
    setConcepts(updatedConcepts);
    localStorage.setItem('savedConcepts', JSON.stringify(updatedConcepts));
  };

  const getPreviewSrcDoc = (concept: WebsiteConcept) => {
    return `
      <html>
        <head>
          <style>${concept.css}</style>
        </head>
        <body style="transform: scale(0.75); transform-origin: top left; width: 133.33%; height: 133.33%; overflow: hidden;">
          ${concept.html}
          <script>${concept.js}</script>
        </body>
      </html>
    `;
  };

  return (
    <div className="py-24 pt-36 min-h-screen">
      <div className="container max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-4xl lg:text-5xl font-bold text-center text-white mb-4 tracking-tight">My Saved Concepts</h2>
          <p className="text-lg text-zinc-400 text-center max-w-2xl mx-auto mb-16">
            Review, revisit, or remove the website concepts you've generated and saved.
          </p>
        </AnimatedSection>

        {concepts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {concepts.map((concept, index) => (
              <AnimatedSection key={concept.id} delay={`delay-${index * 150}`}>
                <div className="group relative bg-white/5 rounded-xl shadow-lg border border-white/10 overflow-hidden transition-all hover:border-indigo-500/50">
                  <div className="aspect-[4/3] bg-zinc-900 overflow-hidden">
                    <iframe
                      title={`Preview of ${concept.prompt}`}
                      srcDoc={getPreviewSrcDoc(concept)}
                      className="w-full h-full border-0 pointer-events-none"
                      sandbox="allow-scripts"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-zinc-300 text-sm truncate" title={concept.prompt}>
                      {concept.prompt}
                    </p>
                    <p className="text-xs text-zinc-500 mt-2">
                      {new Date(concept.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteConcept(concept.id)}
                    className="absolute top-4 right-4 bg-red-800/50 text-red-300 hover:bg-red-700/70 hover:text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Delete concept"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <AnimatedSection className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-2xl font-bold text-white">No concepts saved yet.</h3>
            <p className="text-zinc-400 mt-2 max-w-md mx-auto">
              Head over to the AI Generator to create and save your first website concept!
            </p>
            <button
              onClick={() => setActiveRoute('/ai-generator')}
              className="mt-8 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105"
            >
              Generate a Website
            </button>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
};

export default MyConcepts;