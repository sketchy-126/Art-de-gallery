import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105 animate-slow-zoom"
        style={{ backgroundImage: `url('https://picsum.photos/id/1015/2500/1600')` }}
      >
        <div className="absolute inset-0 bg-black/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gallery-900 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight animate-fade-in-up delay-100">
          Where Silence <br/> Meets <span className="italic text-gallery-gold">Color</span>
        </h1>
        <p className="text-gallery-100/80 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
          Explore the emotive landscapes and abstract expressions of Benard Mugambi.
        </p>
        
        <button 
          onClick={onExplore}
          className="group relative px-8 py-3 overflow-hidden bg-transparent border border-gallery-100 text-gallery-100 transition-all hover:border-gallery-gold"
        >
          <span className="relative z-10 text-sm uppercase tracking-widest group-hover:text-gallery-900 transition-colors">Enter Gallery</span>
          <div className="absolute inset-0 h-full w-full bg-gallery-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-gallery-100/50" size={32} />
      </div>
    </section>
  );
};