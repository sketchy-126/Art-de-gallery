import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { ArtworkModal } from './components/ArtworkModal';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { storageService } from './services/storageService';
import { Artwork } from './types';

function App() {
  // Lifted state for artworks to allow updates - load from storage
  const [artworks, setArtworks] = useState<Artwork[]>(() => storageService.loadArtworks());
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  
  // Admin State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Save artworks to localStorage whenever they change
  useEffect(() => {
    storageService.saveArtworks(artworks);
  }, [artworks]);

  const handleSaveArtwork = (updatedArtwork: Artwork) => {
    setArtworks(prev => {
      const exists = prev.find(a => a.id === updatedArtwork.id);
      if (exists) {
        return prev.map(a => a.id === updatedArtwork.id ? updatedArtwork : a);
      } else {
        return [updatedArtwork, ...prev];
      }
    });
  };

  const handleDeleteArtwork = (id: string) => {
    setArtworks(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-gallery-900 text-gallery-100 font-sans">
      <Navbar onNavigate={handleNavigate} />
      
      <main>
        <Hero onExplore={() => handleNavigate('gallery')} />
        <Gallery 
          artworks={artworks} 
          onArtworkSelect={setSelectedArtwork} 
        />
        <About />
        <Contact onAdminClick={() => setIsAdminOpen(true)} />
      </main>

      <ArtworkModal 
        artwork={selectedArtwork} 
        onClose={() => setSelectedArtwork(null)} 
      />

      {/* Admin Interface */}
      {isAdminOpen && !isAuthenticated && (
        <AdminLogin 
          onClose={() => setIsAdminOpen(false)} 
          onLogin={handleLoginSuccess} 
        />
      )}

      {isAdminOpen && isAuthenticated && (
        <AdminDashboard 
          artworks={artworks}
          onClose={() => {
            setIsAdminOpen(false);
            setIsAuthenticated(false); // Log out when closing the dashboard
          }}
          onSave={handleSaveArtwork}
          onDelete={handleDeleteArtwork}
        />
      )}
    </div>
  );
}

export default App;