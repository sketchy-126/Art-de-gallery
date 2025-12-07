import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { ArtworkModal } from './components/ArtworkModal';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { apiService } from './services/apiService';
import { Artwork } from './types';

function App() {
  // Load artworks from backend API
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
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

  // Load artworks from backend on mount
  useEffect(() => {
    loadArtworks();
  }, []);

  const loadArtworks = async () => {
    setIsLoading(true);
    const data = await apiService.getArtworks();
    setArtworks(data);
    setIsLoading(false);
  };

  const handleSaveArtwork = async (updatedArtwork: Artwork) => {
    const exists = artworks.find(a => a.id === updatedArtwork.id);
    
    if (exists) {
      // Update existing artwork
      const result = await apiService.updateArtwork(updatedArtwork.id, updatedArtwork);
      if (result) {
        setArtworks(prev => prev.map(a => a.id === updatedArtwork.id ? result : a));
      }
    } else {
      // Create new artwork
      const result = await apiService.createArtwork(updatedArtwork);
      if (result) {
        setArtworks(prev => [result, ...prev]);
      }
    }
  };

  const handleDeleteArtwork = async (id: string) => {
    const success = await apiService.deleteArtwork(id);
    if (success) {
      setArtworks(prev => prev.filter(a => a.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gallery-900 text-gallery-100 font-sans">
      <Navbar onNavigate={handleNavigate} />
      
      <main>
        <Hero onExplore={() => handleNavigate('gallery')} />
        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gallery-gold mx-auto mb-4"></div>
              <p className="text-gallery-100/60">Loading gallery...</p>
            </div>
          </div>
        ) : (
          <Gallery 
            artworks={artworks} 
            onArtworkSelect={setSelectedArtwork} 
          />
        )}
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