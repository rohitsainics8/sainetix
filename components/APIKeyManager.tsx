// Fix: Redesigned the APIKeyManager to match the new, modern aesthetic.
import React, { useState } from 'react';

interface APIKeyManagerProps {
  onKeySaved: (key: string) => void;
}

const APIKeyManager: React.FC<APIKeyManagerProps> = ({ onKeySaved }) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!apiKey.trim()) {
      setError('API Key cannot be empty.');
      return;
    }
    setError('');
    localStorage.setItem('google-ai-api-key', apiKey);
    onKeySaved(apiKey);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/5 border border-indigo-500/30 rounded-xl p-8 text-center">
      <h3 className="text-2xl font-bold text-white mb-3">Set Your API Key</h3>
      <p className="text-zinc-400 mb-6">
        To use the AI Generator, please enter your Google AI Studio API key.
        You can get your key from{' '}
        <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline hover:text-indigo-300">
          Google AI Studio
        </a>.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API Key here"
          className="flex-grow w-full bg-white/5 border-2 border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        />
        <button
          onClick={handleSave}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-indigo-600/30 transition-all transform hover:scale-105"
        >
          Save Key
        </button>
      </div>
      {error && <p className="text-red-400 mt-4">{error}</p>}
      <p className="text-xs text-zinc-500 mt-4">
        Your key is stored securely in your browser's local storage and is never sent anywhere else.
      </p>
    </div>
  );
};

export default APIKeyManager;