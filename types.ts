export enum ArtCategory {
  PAINTING = 'Painting',
  PENCIL = 'Pencil Work'
}

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  category: ArtCategory;
  price: number;
  dimensions: string;
  year: number;
  description: string;
  imageUrl: string;
  available: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}