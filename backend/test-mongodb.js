require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;

console.log('Testing MongoDB connection...');
console.log('Connection string:', MONGODB_URI ? MONGODB_URI.replace(/\/\/.*@/, '//***:***@') : 'NOT FOUND');

async function testConnection() {
  try {
    console.log('Attempting to connect...');
    
    const client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      tls: true
    });
    
    await client.connect();
    console.log('✅ Successfully connected to MongoDB Atlas');
    
    // Test database access
    const db = client.db('exo-arts');
    const collections = await db.listCollections().toArray();
    console.log('✅ Database accessible, collections:', collections.map(c => c.name));
    
    // Test artworks collection
    const artworksCollection = db.collection('artworks');
    const count = await artworksCollection.countDocuments();
    console.log(`✅ Artworks collection has ${count} documents`);
    
    await client.close();
    console.log('✅ Connection test completed successfully');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Full error:', error);
  }
}

testConnection();