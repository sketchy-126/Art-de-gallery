import React, { useState } from 'react';
import { X, MessageCircle, ZoomIn, Maximize2 } from 'lucide-react';
import { Artwork } from '../types';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export const ArtworkModal: React.FC<ArtworkModalProps> = ({ artwork, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!artwork) return null;

  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in purchasing "${artwork.title}" by Benard Mugambi listed at $${artwork.price}. Is it still available?`);
  const whatsappLink = `https://wa.me/254711874765?text=${whatsappMessage}`;

  // Full Screen Zoom View
  if (isZoomed) {
    return (
      <div className="fixed inset-0 z-[70] bg-black flex items-center justify-center animate-fade-in">
        <button 
          onClick={() => setIsZoomed(false)}
          className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2 bg-black/50 rounded-full"
        >
          <X size={32} />
        </button>
        <div className="w-full h-full p-4 md:p-10 flex items-center justify-center overflow-auto">
          <img 
            src={artwork.imageUrl} 
            alt={artwork.title} 
            className="max-w-none md:max-w-full md:max-h-full object-contain cursor-zoom-out shadow-2xl"
            onClick={() => setIsZoomed(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Content */}
      <div className="relative bg-gallery-900 w-full max-w-6xl max-h-[90vh] overflow-y-auto grid grid-cols-1 lg:grid-cols-2 shadow-2xl animate-fade-in-up border border-gallery-800">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/50 hover:text-white transition-colors bg-black/20 p-1 rounded-full lg:bg-transparent"
        >
          <X size={32} />
        </button>

        {/* Image Section */}
        <div className="relative bg-gallery-800 h-[50vh] lg:h-auto group overflow-hidden">
          <img 
            src={artwork.imageUrl} 
            alt={artwork.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Zoom Trigger */}
          <div 
            className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
            onClick={() => setIsZoomed(true)}
          >
            <div className="bg-gallery-900/80 backdrop-blur text-white px-6 py-3 rounded-full flex items-center gap-3 uppercase tracking-widest text-xs hover:bg-gallery-gold hover:text-gallery-900 transition-colors">
              <Maximize2 size={16} />
              <span>View Full Screen</span>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <span className="text-gallery-gold uppercase tracking-widest text-sm block mb-2">{artwork.category}</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-2">{artwork.title}</h2>
            <p className="text-gallery-100/60 font-light italic">{artwork.year}</p>
          </div>

          <div className="space-y-6 text-gallery-100/80 font-light leading-relaxed mb-10">
            <p>{artwork.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm mt-6 pt-6 border-t border-gallery-800">
              <div>
                <span className="block text-gallery-100/40 uppercase tracking-wider text-xs mb-1">Dimensions</span>
                {artwork.dimensions}
              </div>
              <div>
                <span className="block text-gallery-100/40 uppercase tracking-wider text-xs mb-1">Status</span>
                <span className={artwork.available ? 'text-green-400' : 'text-red-400'}>
                  {artwork.available ? 'Available' : 'Sold'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6">
            <div className="text-2xl font-serif text-white">${artwork.price.toLocaleString()}</div>
            
            {artwork.available ? (
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gallery-gold text-gallery-900 px-8 py-4 uppercase tracking-widest font-medium hover:bg-gallery-goldHover transition-colors"
              >
                <MessageCircle size={20} />
                <span>Inquire</span>
              </a>
            ) : (
              <button disabled className="bg-gallery-800 text-gallery-100/30 px-8 py-4 uppercase tracking-widest cursor-not-allowed">
                Sold Out
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};