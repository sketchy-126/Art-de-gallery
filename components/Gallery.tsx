import React, { useState } from 'react';
import { Artwork, ArtCategory } from '../types';
import { Filter } from 'lucide-react';

interface GalleryProps {
  artworks: Artwork[];
  onArtworkSelect: (artwork: Artwork) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ artworks, onArtworkSelect }) => {
  const [filter, setFilter] = useState<ArtCategory | 'All'>('All');

  const categories = ['All', ...Object.values(ArtCategory)];

  const filteredArt = filter === 'All' 
    ? artworks 
    : artworks.filter(art => art.category === filter);

  return (
    <section id="gallery" className="py-24 bg-gallery-900 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-gallery-gold text-sm uppercase tracking-widest mb-2">Portfolio</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-white">Selected Works</h3>
          </div>
          
          {/* Filters */}
          <div className="mt-8 md:mt-0 flex flex-wrap gap-4">
             {categories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => setFilter(cat as ArtCategory | 'All')}
                 className={`text-sm uppercase tracking-wider px-4 py-2 border transition-all ${
                   filter === cat 
                     ? 'border-gallery-gold text-gallery-gold' 
                     : 'border-transparent text-gallery-700 hover:text-gallery-100'
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {filteredArt.map((art) => (
            <div 
              key={art.id}
              className="group cursor-pointer"
              onClick={() => onArtworkSelect(art)}
            >
              <div className="relative overflow-hidden aspect-[4/5] bg-gallery-800 mb-6">
                <img 
                  src={art.imageUrl} 
                  alt={art.title} 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                {!art.available && (
                  <div className="absolute top-4 right-4 bg-gallery-900/80 px-3 py-1 text-xs text-white uppercase tracking-widest backdrop-blur-sm">
                    Sold
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="flex justify-between items-baseline border-b border-gallery-800 pb-4 group-hover:border-gallery-gold transition-colors duration-500">
                <div>
                  <h4 className="font-serif text-2xl text-gallery-100 group-hover:text-gallery-gold transition-colors">{art.title}</h4>
                  <p className="text-gallery-100/50 text-sm mt-1">{art.category}</p>
                </div>
                <span className="text-gallery-100/80 font-light">${art.price.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
        
        {filteredArt.length === 0 && (
          <div className="text-center text-gallery-700 py-20 italic font-serif text-xl">
            No artworks found in this category.
          </div>
        )}
      </div>
    </section>
  );
};