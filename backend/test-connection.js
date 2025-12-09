require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

async function testConnection() {
  console.log('Testing MongoDB connection...\n');
  console.log('URI:', uri.replace(/:[^:@]+@/, ':****@')); // Hide password
  
  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      tls: true,
      tlsAllowInvalidCertificates: false
    });
    
    console.log('\nConnecting...');
    await client.connect();
    console.log('✅ Connected successfully!');
    
    const db = client.db('exo-arts');
    console.log('✅ Database selected: exo-arts');
    
    await client.close();
    console.log('✅ Connection closed');
    
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error(error.message);
  }
}

testConnection();
