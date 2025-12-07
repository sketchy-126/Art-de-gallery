const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increased limit for base64 images
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Load artworks from JSON file
const ARTWORKS_FILE = path.join(__dirname, 'artworks.json');

const loadArtworks = () => {
  try {
    if (fs.existsSync(ARTWORKS_FILE)) {
      const data = fs.readFileSync(ARTWORKS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading artworks:', error);
  }
  return [];
};

const saveArtworks = (artworks) => {
  try {
    fs.writeFileSync(ARTWORKS_FILE, JSON.stringify(artworks, null, 2));
  } catch (error) {
    console.error('Error saving artworks:', error);
  }
};

// Routes

// Get all artworks
app.get('/api/artworks', (req, res) => {
  const artworks = loadArtworks();
  res.json(artworks);
});

// Get single artwork
app.get('/api/artworks/:id', (req, res) => {
  const artworks = loadArtworks();
  const artwork = artworks.find(a => a.id === req.params.id);
  
  if (artwork) {
    res.json(artwork);
  } else {
    res.status(404).json({ error: 'Artwork not found' });
  }
});

// Upload image (now accepts base64)
app.post('/api/upload', (req, res) => {
  const { image } = req.body;
  
  if (!image) {
    return res.status(400).json({ error: 'No image data provided' });
  }
  
  // Validate base64 format
  if (!image.startsWith('data:image/')) {
    return res.status(400).json({ error: 'Invalid image format. Must be base64 encoded.' });
  }
  
  // Return the base64 string as-is (it will be stored in JSON)
  res.json({ imageUrl: image });
});

// Create artwork
app.post('/api/artworks', (req, res) => {
  const artworks = loadArtworks();
  const newArtwork = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  
  artworks.push(newArtwork);
  saveArtworks(artworks);
  
  res.status(201).json(newArtwork);
});

// Update artwork
app.put('/api/artworks/:id', (req, res) => {
  const artworks = loadArtworks();
  const index = artworks.findIndex(a => a.id === req.params.id);
  
  if (index !== -1) {
    artworks[index] = { ...artworks[index], ...req.body };
    saveArtworks(artworks);
    res.json(artworks[index]);
  } else {
    res.status(404).json({ error: 'Artwork not found' });
  }
});

// Delete artwork
app.delete('/api/artworks/:id', (req, res) => {
  const artworks = loadArtworks();
  const index = artworks.findIndex(a => a.id === req.params.id);
  
  if (index !== -1) {
    artworks.splice(index, 1);
    saveArtworks(artworks);
    res.json({ message: 'Artwork deleted successfully' });
  } else {
    res.status(404).json({ error: 'Artwork not found' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
