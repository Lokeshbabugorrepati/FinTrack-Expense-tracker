import mongoose from "mongoose";
import colors from "colors";

// Cache the database connection
let cachedDb = null;

const connectDB = async () => {
  // If we have a cached connection, return it
  if (cachedDb && mongoose.connection.readyState === 1) {
    console.log("✓ Using cached MongoDB connection".cyan);
    return cachedDb;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    });
    
    cachedDb = conn;
    console.log(
      `✓ MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold,
    );
    return cachedDb;
  } catch (error) {
    console.error(`✗ MongoDB Connection Error: ${error.message}`.red.bold);
    cachedDb = null;
    // Don't exit in serverless environment, throw error instead
    throw new Error(`Database connection failed: ${error.message}`);
  }
};

export default connectDB;
