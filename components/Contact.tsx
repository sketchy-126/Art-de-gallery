import React, { useState } from 'react';
import { Mail, Instagram, Phone, Lock, ArrowRight, MessageCircle } from 'lucide-react';

interface ContactProps {
  onAdminClick?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onAdminClick }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gallery-900 border-t border-gallery-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-serif text-4xl text-white mb-2">Acquire & Connect</h2>
        <p className="text-gallery-100/50 font-light mb-12 max-w-xl mx-auto">
          Private viewings available by appointment. For commissions and press inquiries, please reach out directly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gallery-800 flex items-center justify-center text-gallery-gold mb-4">
              <Mail size={20} />
            </div>
            <h4 className="text-lg font-serif text-white mb-2">Email</h4>
            <a href="mailto:studio@sketchygallery.com" className="text-gallery-100/70 hover:text-gallery-gold transition-colors">
              studio@sketchygallery.com
            </a> 
         </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gallery-800 flex items-center justify-center text-gallery-gold mb-4">
              <Phone size={20} />
            </div>
            <h4 className="text-lg font-serif text-white mb-2">Phone</h4>
            <a href="tel:+254711874765" className="text-gallery-100/70 hover:text-gallery-gold transition-colors">
              +254 711874765
            </a>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gallery-800 flex items-center justify-center text-gallery-gold mb-4">
              <Instagram size={20} />
            </div>
            <h4 className="text-lg font-serif text-white mb-2">Instagram</h4>
            <a href="https://www.instagram.com/exo_savage_6" target="_blank" rel="noopener noreferrer" className="text-gallery-100/70 hover:text-gallery-gold transition-colors">
              @exo_savage_6
            </a>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gallery-800 flex items-center justify-center text-gallery-gold mb-4">
              <MessageCircle size={20} />
            </div>
            <h4 className="text-lg font-serif text-white mb-2">WhatsApp</h4>
            <a href="https://wa.me/254711874765" target="_blank" rel="noopener noreferrer" className="text-gallery-100/70 hover:text-gallery-gold transition-colors">
              Chat with us
            </a>
          </div>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <h3 className="text-xl font-serif text-white mb-4">Stay Updated</h3>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gallery-800 border border-gallery-700 text-white placeholder-gallery-100/50 focus:outline-none focus:border-gallery-gold"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gallery-gold text-gallery-900 hover:bg-gallery-gold/90 transition-colors flex items-center gap-2"
            >
              <ArrowRight size={16} />
            </button>
          </form>
          {subscribed && (
            <p className="text-gallery-gold mt-2 text-sm">Thank you for subscribing!</p>
          )}
        </div>

        {onAdminClick && (
          <button
            onClick={onAdminClick}
            className="inline-flex items-center gap-2 text-gallery-100/50 hover:text-gallery-gold transition-colors text-sm"
          >
            <Lock size={16} />
            Admin Access
          </button>
        )}
      </div>
    </section>
  );
};