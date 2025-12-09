require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI;
const ARTWORKS_FILE = path.join(__dirname, 'artworks.json');

async function migrateToMongoDB() {
  console.log('🚀 Starting migration to MongoDB...\n');
  
  try {
    // Read artworks from JSON file
    console.log('📖 Reading artworks.json...');
    const artworksData = fs.readFileSync(ARTWORKS_FILE, 'utf8');
    const artworks = JSON.parse(artworksData);
    console.log(`✅ Found ${artworks.length} artworks\n`);
    
    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB Atlas...');
    const client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      tls: true
    });
    await client.connect();
    console.log('✅ Connected to MongoDB\n');
    
    const db = client.db('exo-arts');
    const collection = db.collection('artworks');
    
    // Check if collection already has data
    const existingCount = await collection.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  Collection already has ${existingCount} artworks`);
      console.log('Do you want to:');
      console.log('1. Skip migration (keep existing data)');
      console.log('2. Clear and re-import (WARNING: deletes existing data)');
      console.log('\nTo clear and re-import, run: node migrate-to-mongodb.js --force\n');
      
      if (!process.argv.includes('--force')) {
        console.log('✅ Migration skipped. Existing data preserved.');
        await client.close();
        return;
      }
      
      console.log('🗑️  Clearing existing data...');
      await collection.deleteMany({});
      console.log('✅ Cleared\n');
    }
    
    // Insert artworks
    console.log('📥 Inserting artworks into MongoDB...');
    const result = await collection.insertMany(artworks);
    console.log(`✅ Inserted ${result.insertedCount} artworks\n`);
    
    // Create indexes
    console.log('🔍 Creating indexes...');
    await collection.createIndex({ id: 1 });
    await collection.createIndex({ category: 1 });
    console.log('✅ Indexes created\n');
    
    // Verify
    console.log('🔍 Verifying migration...');
    const finalCount = await collection.countDocuments();
    console.log(`✅ Total artworks in MongoDB: ${finalCount}\n`);
    
    // Show sample
    const sample = await collection.findOne({});
    if (sample) {
      console.log('📄 Sample artwork:');
      console.log(`   Title: ${sample.title}`);
      console.log(`   Artist: ${sample.artist}`);
      console.log(`   Category: ${sample.category}`);
      console.log(`   Price: $${sample.price}`);
      console.log(`   Image: ${sample.imageUrl ? 'Yes (base64)' : 'No'}\n`);
    }
    
    await client.close();
    console.log('✅ Migration completed successfully! 🎉');
    console.log('\n📝 Next steps:');
    console.log('1. Restart your backend server: npm start');
    console.log('2. Test the API: http://localhost:5000/api/artworks');
    console.log('3. Your artworks are now in MongoDB Atlas!\n');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateToMongoDB();
