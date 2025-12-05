import React, { useState } from 'react';
import { X, Lock, User } from 'lucide-react';

interface AdminLoginProps {
  onClose: () => void;
  onLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      setError('Invalid Username or Password');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4">
      <div className="bg-gallery-900 border border-gallery-800 p-8 rounded-lg max-w-md w-full relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gallery-100/50 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gallery-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gallery-gold">
            <Lock size={20} />
          </div>
          <h2 className="font-serif text-2xl text-white">Artist Portal</h2>
          <p className="text-gallery-100/50 text-sm mt-2">Enter your credentials to manage the gallery.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gallery-100/30" size={16} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                placeholder="Username"
                className="w-full bg-gallery-800 border border-gallery-700 text-white pl-10 pr-4 py-3 rounded focus:outline-none focus:border-gallery-gold transition-colors tracking-wide placeholder:text-gallery-100/30"
                autoFocus
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gallery-100/30" size={16} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Password"
                className="w-full bg-gallery-800 border border-gallery-700 text-white pl-10 pr-4 py-3 rounded focus:outline-none focus:border-gallery-gold transition-colors tracking-wide placeholder:text-gallery-100/30"
              />
            </div>
            {error && <p className="text-red-400 text-xs text-center mt-2">{error}</p>}
          </div>
          <button 
            type="submit"
            className="w-full bg-gallery-gold text-gallery-900 font-medium py-3 rounded uppercase tracking-wider hover:bg-gallery-goldHover transition-colors mt-2"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};