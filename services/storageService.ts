import { Artwork } from '../types';
import { ARTWORKS as INITIAL_ARTWORKS } from '../data';

const STORAGE_KEY = 'sketchy_gallery_artworks';

export const storageService = {
  // Load artworks from localStorage or return initial data
  loadArtworks(): Artwork[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return INITIAL_ARTWORKS;
    } catch (error) {
      console.error('Error loading artworks:', error);
      return INITIAL_ARTWORKS;
    }
  },

  // Save artworks to localStorage
  saveArtworks(artworks: Artwork[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(artworks));
    } catch (error) {
      console.error('Error saving artworks:', error);
    }
  },

  // Reset to initial artworks
  resetArtworks(): Artwork[] {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return INITIAL_ARTWORKS;
    } catch (error) {
      console.error('Error resetting artworks:', error);
      return INITIAL_ARTWORKS;
    }
  }
};
