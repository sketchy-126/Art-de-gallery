require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increased limit for base64 images
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// MongoDB Connection
let db;
let artworksCollection;

async function connectToMongoDB() {
  try {
    const client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      tls: true
    });
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');
    
    db = client.db('exo-arts');
    artworksCollection = db.collection('artworks');
    
    // Create indexes for better performance
    await artworksCollection.createIndex({ id: 1 });
    await artworksCollection.createIndex({ category: 1 });
    
    console.log('✅ Database initialized');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// Routes

// Get all artworks
app.get('/api/artworks', async (req, res) => {
  try {
    const artworks = await artworksCollection.find({}).toArray();
    // Remove MongoDB _id from response
    const cleanArtworks = artworks.map(({ _id, ...artwork }) => artwork);
    res.json(cleanArtworks);
  } catch (error) {
    console.error('Error fetching artworks:', error);
    res.status(500).json({ error: 'Failed to fetch artworks' });
  }
});

// Get single artwork
app.get('/api/artworks/:id', async (req, res) => {
  try {
    const artwork = await artworksCollection.findOne({ id: req.params.id });
    
    if (artwork) {
      const { _id, ...cleanArtwork } = artwork;
      res.json(cleanArtwork);
    } else {
      res.status(404).json({ error: 'Artwork not found' });
    }
  } catch (error) {
    console.error('Error fetching artwork:', error);
    res.status(500).json({ error: 'Failed to fetch artwork' });
  }
});

// Upload image (accepts base64)
app.post('/api/upload', (req, res) => {
  const { image } = req.body;
  
  if (!image) {
    return res.status(400).json({ error: 'No image data provided' });
  }
  
  // Validate base64 format
  if (!image.startsWith('data:image/')) {
    return res.status(400).json({ error: 'Invalid image format. Must be base64 encoded.' });
  }
  
  // Return the base64 string as-is
  res.json({ imageUrl: image });
});

// Create artwork
app.post('/api/artworks', async (req, res) => {
  try {
    const newArtwork = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    await artworksCollection.insertOne(newArtwork);
    
    const { _id, ...cleanArtwork } = newArtwork;
    res.status(201).json(cleanArtwork);
  } catch (error) {
    console.error('Error creating artwork:', error);
    res.status(500).json({ error: 'Failed to create artwork' });
  }
});

// Update artwork
app.put('/api/artworks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData.id; // Don't update the id field
    
    const result = await artworksCollection.findOneAndUpdate(
      { id },
      { $set: updateData },
      { returnDocument: 'after' }
    );
    
    if (result) {
      const { _id, ...cleanArtwork } = result;
      res.json(cleanArtwork);
    } else {
      res.status(404).json({ error: 'Artwork not found' });
    }
  } catch (error) {
    console.error('Error updating artwork:', error);
    res.status(500).json({ error: 'Failed to update artwork' });
  }
});

// Delete artwork
app.delete('/api/artworks/:id', async (req, res) => {
  try {
    const result = await artworksCollection.deleteOne({ id: req.params.id });
    
    if (result.deletedCount > 0) {
      res.json({ message: 'Artwork deleted successfully' });
    } else {
      res.status(404).json({ error: 'Artwork not found' });
    }
  } catch (error) {
    console.error('Error deleting artwork:', error);
    res.status(500).json({ error: 'Failed to delete artwork' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  const dbStatus = db ? 'connected' : 'disconnected';
  res.json({ 
    status: 'ok', 
    database: dbStatus,
    timestamp: new Date().toISOString() 
  });
});

// Start server after MongoDB connection
connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Database: MongoDB Atlas`);
    console.log(`🎨 Ready to serve artworks!`);
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  process.exit(0);
});
