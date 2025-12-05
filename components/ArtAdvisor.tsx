import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { getArtAdvisorResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ArtAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome. I am Aura, the gallery's AI curator. How can I assist you in finding the perfect piece today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // Prepare history for context
    const history = messages.map(m => ({ role: m.role, text: m.text }));

    const response = await getArtAdvisorResponse(userMsg, history);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-gallery-gold text-gallery-900 p-4 rounded-full shadow-lg hover:bg-gallery-goldHover transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${isOpen ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
      >
        <Sparkles size={20} />
        <span className="font-serif font-medium hidden md:inline">Ask Curator</span>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-[90vw] md:w-96 bg-gallery-800 border border-gallery-700 rounded-lg shadow-2xl z-50 flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'
        }`}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-gallery-900 p-4 rounded-t-lg flex justify-between items-center border-b border-gallery-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gallery-gold/20 flex items-center justify-center text-gallery-gold">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-white font-serif">Aura</h3>
              <p className="text-xs text-gallery-100/50">AI Art Advisor</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gallery-100/50 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-gallery-gold text-gallery-900 rounded-br-none' 
                    : 'bg-gallery-700 text-gallery-100 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gallery-700 p-3 rounded-lg rounded-bl-none flex gap-1">
                <span className="w-2 h-2 bg-gallery-100/50 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gallery-100/50 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-gallery-100/50 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gallery-700 bg-gallery-900 rounded-b-lg">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Suggest something moody..."
              className="w-full bg-gallery-800 text-white pl-4 pr-12 py-3 rounded focus:outline-none focus:ring-1 focus:ring-gallery-gold text-sm"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gallery-gold hover:text-white disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};