import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-gallery-900/95 backdrop-blur-sm py-4 shadow-lg' : 'bg-transparent py-6'
  }`;

  const handleNav = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="font-serif text-2xl md:text-3xl tracking-widest text-white cursor-pointer"
          onClick={() => handleNav('hero')}
        >
          SKETCHY
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {['Gallery', 'About', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => handleNav(item.toLowerCase())}
              className="text-gallery-100 hover:text-gallery-gold transition-colors text-sm uppercase tracking-widest"
            >
              {item}
            </button>
          ))}
          <button 
            onClick={() => handleNav('gallery')}
            className="border border-gallery-gold text-gallery-gold px-6 py-2 rounded-full hover:bg-gallery-gold hover:text-gallery-900 transition-all duration-300 text-sm uppercase tracking-wider"
          >
            Available Works
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gallery-900 border-t border-gallery-800 flex flex-col items-center py-8 space-y-6 md:hidden">
          {['Gallery', 'About', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => handleNav(item.toLowerCase())}
              className="text-white text-lg font-serif hover:text-gallery-gold"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};