import { Artwork } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiService = {
  // Get all artworks
  async getArtworks(): Promise<Artwork[]> {
    try {
      const response = await fetch(`${API_URL}/artworks`);
      if (!response.ok) throw new Error('Failed to fetch artworks');
      return await response.json();
    } catch (error) {
      console.error('Error fetching artworks:', error);
      return [];
    }
  },

  // Get single artwork
  async getArtwork(id: string): Promise<Artwork | null> {
    try {
      const response = await fetch(`${API_URL}/artworks/${id}`);
      if (!response.ok) throw new Error('Failed to fetch artwork');
      return await response.json();
    } catch (error) {
      console.error('Error fetching artwork:', error);
      return null;
    }
  },

  // Upload image
  async uploadImage(file: File): Promise<string | null> {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');
      
      const data = await response.json();
      return `${API_URL.replace('/api', '')}${data.imageUrl}`;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  },

  // Create artwork
  async createArtwork(artwork: Omit<Artwork, 'id'>): Promise<Artwork | null> {
    try {
      const response = await fetch(`${API_URL}/artworks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(artwork),
      });

      if (!response.ok) throw new Error('Failed to create artwork');
      return await response.json();
    } catch (error) {
      console.error('Error creating artwork:', error);
      return null;
    }
  },

  // Update artwork
  async updateArtwork(id: string, artwork: Partial<Artwork>): Promise<Artwork | null> {
    try {
      const response = await fetch(`${API_URL}/artworks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(artwork),
      });

      if (!response.ok) throw new Error('Failed to update artwork');
      return await response.json();
    } catch (error) {
      console.error('Error updating artwork:', error);
      return null;
    }
  },

  // Delete artwork
  async deleteArtwork(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/artworks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete artwork');
      return true;
    } catch (error) {
      console.error('Error deleting artwork:', error);
      return false;
    }
  },
};
