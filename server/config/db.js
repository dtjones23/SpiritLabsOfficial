require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/spiritlabsofficial';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return conn.connection; // Return the connection object
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// Export both the connect function and mongoose instance
module.exports = {
  mongoose,
  connectDB
};