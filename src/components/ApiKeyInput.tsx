
import React, { useState, useEffect } from 'react';
import { Settings, X, Save, Key } from 'lucide-react';

const ApiKeyInput: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const savedKey = localStorage.getItem('groq_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const saveApiKey = () => {
    localStorage.setItem('groq_api_key', apiKey);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-4 p-2 rounded-full bg-chatbot-secondary/40 text-chatbot-white/70 hover:text-chatbot-cyan transition-colors border border-white/10"
      >
        <Settings size={18} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="glass-panel rounded-xl w-96 p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-chatbot-white/70 hover:text-chatbot-white"
            >
              <X size={18} />
            </button>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-chatbot-white mb-1">API Settings</h2>
              <p className="text-chatbot-white/70 text-sm">Enter your Groq API key to enable AI responses</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-chatbot-white/70 text-sm mb-2">Groq API Key</label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-chatbot-white/40">
                  <Key size={16} />
                </div>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Groq API key"
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-chatbot-white placeholder:text-chatbot-white/30 focus:outline-none focus:ring-1 focus:ring-chatbot-cyan/50"
                />
              </div>
              <p className="mt-2 text-xs text-chatbot-white/50">
                Your API key is stored locally in your browser and is not sent to our servers.
              </p>
            </div>
            
            <button
              onClick={saveApiKey}
              className="w-full py-2 px-4 bg-gradient-to-r from-chatbot-cyan to-chatbot-purple rounded-lg text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Save size={16} />
              Save Settings
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ApiKeyInput;
