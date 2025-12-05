import React, { useState, useRef } from 'react';
import { X, Plus, Edit2, Trash2, Save, Image as ImageIcon, Upload, AlertTriangle } from 'lucide-react';
import { Artwork, ArtCategory } from '../types';

interface AdminDashboardProps {
  artworks: Artwork[];
  onClose: () => void;
  onSave: (artwork: Artwork) => void;
  onDelete: (id: string) => void;
}

const EMPTY_ARTWORK: Artwork = {
  id: '',
  title: '',
  artist: 'Benard Mugambi',
  category: ArtCategory.PAINTING,
  price: 0,
  dimensions: '',
  year: new Date().getFullYear(),
  description: '',
  imageUrl: '',
  available: true,
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ artworks, onClose, onSave, onDelete }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Artwork>(EMPTY_ARTWORK);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Delete confirmation state
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (artwork: Artwork) => {
    setFormData(artwork);
    setEditingId(artwork.id);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setFormData({ ...EMPTY_ARTWORK, id: Date.now().toString() });
    setEditingId(null);
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsFormOpen(false);
  };

  const requestDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] bg-gallery-900 flex flex-col">
      {/* Header */}
      <div className="bg-gallery-800 px-6 py-4 flex justify-between items-center border-b border-gallery-700 shadow-md">
        <h2 className="font-serif text-2xl text-white">Gallery Management</h2>
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-gallery-gold text-gallery-900 px-4 py-2 rounded hover:bg-gallery-goldHover transition-colors font-medium text-sm"
          >
            <Plus size={16} /> Add Artwork
          </button>
          <button 
            type="button"
            onClick={onClose}
            className="text-gallery-100/60 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {artworks.map((art) => (
            <div key={art.id} className="bg-gallery-800 border border-gallery-700 rounded-lg overflow-hidden group hover:border-gallery-gold/50 transition-colors">
              <div className="relative h-48 overflow-hidden bg-black/50">
                <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                {!art.available && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded uppercase font-bold">Sold</div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-lg text-white truncate pr-2">{art.title}</h3>
                  <span className="text-gallery-gold text-sm font-medium">${art.price.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gallery-100/50 uppercase tracking-wider mb-4">{art.category}</p>
                
                <div className="flex gap-2 pt-2 border-t border-gallery-700">
                  <button 
                    type="button"
                    onClick={() => handleEdit(art)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gallery-700 hover:bg-gallery-600 text-white py-2 rounded text-sm transition-colors"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                  <button 
                    type="button"
                    onClick={() => requestDelete(art.id)}
                    className="flex-none px-3 bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded transition-colors flex items-center justify-center"
                    title="Delete Artwork"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit/Add Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gallery-900 border border-gallery-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl">
            <div className="p-6 border-b border-gallery-700 flex justify-between items-center bg-gallery-800">
              <h3 className="font-serif text-xl text-white">{editingId ? 'Edit Artwork' : 'Add New Artwork'}</h3>
              <button type="button" onClick={() => setIsFormOpen(false)}><X size={20} className="text-gallery-100/50 hover:text-white" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gallery-100/50 mb-1">Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-gallery-800 border border-gallery-700 text-white p-2 rounded focus:border-gallery-gold focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gallery-100/50 mb-1">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as ArtCategory})} className="w-full bg-gallery-800 border border-gallery-700 text-white p-2 rounded focus:border-gallery-gold focus:outline-none">
                    {Object.values(ArtCategory).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gallery-100/50 mb-1">Price ($)</label>
                  <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full bg-gallery-800 border border-gallery-700 text-white p-2 rounded focus:border-gallery-gold focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gallery-100/50 mb-1">Year</label>
                  <input required type="number" value={formData.year} onChange={e => setFormData({...formData, year: Number(e.target.value)})} className="w-full bg-gallery-800 border border-gallery-700 text-white p-2 rounded focus:border-gallery-gold focus:outline-none" />
                </div>
                
                {/* Image Upload Section */}
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-gallery-100/50 mb-2">Artwork Image</label>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Image Upload/Preview Area */}
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="group relative w-40 h-52 flex-shrink-0 bg-gallery-800 border-2 border-dashed border-gallery-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gallery-gold transition-colors overflow-hidden"
                    >
                      {formData.imageUrl ? (
                        <>
                          <img 
                            src={formData.imageUrl} 
                            alt="Preview" 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-xs uppercase tracking-widest font-medium flex items-center gap-2">
                              <Upload size={14} /> Change
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-4">
                          <Upload size={24} className="text-gallery-100/30 mx-auto mb-2 group-hover:text-gallery-gold transition-colors" />
                          <span className="text-gallery-100/50 text-xs uppercase tracking-wider group-hover:text-gallery-100">Upload</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>

                    {/* URL Fallback */}
                    <div className="flex-1 w-full">
                       <div className="bg-gallery-800/50 p-4 rounded border border-gallery-700/50">
                          <p className="text-gallery-100/60 text-sm mb-4 font-light">
                            Click the box to upload an image from your device, or paste an external image URL below.
                          </p>
                          <label className="block text-xs uppercase tracking-wider text-gallery-100/30 mb-1">Image URL (Fallback)</label>
                          <div className="flex gap-2">
                             <input 
                              type="url" 
                              value={formData.imageUrl} 
                              onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                              className="flex-1 bg-gallery-800 border border-gallery-700 text-white p-2 rounded focus:border-gallery-gold focus:outline-none text-sm" 
                              placeholder="https://..." 
                            />
                          </div>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                   <label className="block text-xs uppercase tracking-wider text-gallery-100/50 mb-1">Dimensions</label>
                   <input required type="text" value={formData.dimensions} onChange={e => setFormData({...formData, dimensions: e.target.value})} className="w-full bg-gallery-800 border border-gallery-700 text-white p-2 rounded focus:border-gallery-gold focus:outline-none" placeholder='e.g. 24" x 36"' />
                </div>
                <div className="md:col-span-2">
                   <label className="block text-xs uppercase tracking-wider text-gallery-100/50 mb-1">Description</label>
                   <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gallery-800 border border-gallery-700 text-white p-2 rounded focus:border-gallery-gold focus:outline-none" />
                </div>
                <div className="md:col-span-2 flex items-center gap-2">
                  <input type="checkbox" id="available" checked={formData.available} onChange={e => setFormData({...formData, available: e.target.checked})} className="rounded bg-gallery-800 border-gallery-700 text-gallery-gold focus:ring-gallery-gold" />
                  <label htmlFor="available" className="text-white text-sm cursor-pointer">Available for purchase</label>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-6 border-t border-gallery-700">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-gallery-100/60 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="bg-gallery-gold text-gallery-900 px-6 py-2 rounded font-medium hover:bg-gallery-goldHover transition-colors flex items-center gap-2">
                  <Save size={18} /> Save Artwork
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gallery-900 border border-red-900/50 w-full max-w-sm rounded-lg shadow-2xl p-6 text-center">
            <div className="w-16 h-16 bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>
            <h3 className="font-serif text-xl text-white mb-2">Delete Artwork?</h3>
            <p className="text-gallery-100/60 text-sm mb-6">
              Are you sure you want to permanently remove this piece from your portfolio? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-center">
              <button 
                type="button"
                onClick={() => setDeleteId(null)}
                className="px-6 py-2 bg-gallery-800 text-white rounded hover:bg-gallery-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={confirmDelete}
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};