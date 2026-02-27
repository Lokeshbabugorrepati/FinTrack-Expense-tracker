import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import { logger } from "./middleware/logger.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

// Load env vars
dotenv.config();

const app = express();

// Middleware to ensure DB connection for each request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("❌ Database connection error:".red, error.message);
    console.error("Stack:".red, error.stack);
    res.status(503).json({
      success: false,
      message: "Database unavailable. Please try again later.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enhanced CORS configuration with detailed logging
const corsOptions = {
  origin: function (origin, callback) {
    // Log every request origin
    console.log(`🌐 CORS Request from origin: ${origin || 'same-origin'}`);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('✓ Allowing request with no origin');
      return callback(null, true);
    }
    
    // Get allowed origins from environment
    const clientURL = process.env.CLIENT_URL || "http://localhost:5173";
    console.log(`🔑 Configured CLIENT_URL: ${clientURL}`);
    
    // Remove trailing slashes for comparison
    const normalizedOrigin = origin.replace(/\/$/, '');
    const normalizedClientURL = clientURL.replace(/\/$/, '');
    
    // Check if origin matches
    if (normalizedOrigin === normalizedClientURL) {
      console.log(`✓ CORS ALLOWED: Origin matches CLIENT_URL`);
      return callback(null, true);
    }
    
    // Also allow any vercel.app domain for FinTrack (development flexibility)
    if (normalizedOrigin.includes('fin-track-expense-tracker') && normalizedOrigin.includes('vercel.app')) {
      console.log(`✓ CORS ALLOWED: Origin is FinTrack Vercel deployment`);
      return callback(null, true);
    }
    
    // Allow localhost for development
    if (normalizedOrigin.includes('localhost')) {
      console.log(`✓ CORS ALLOWED: Localhost development`);
      return callback(null, true);
    }
    
    // Reject other origins
    console.log(`✗ CORS BLOCKED: Origin not allowed`);
    console.log(`   Expected: ${normalizedClientURL}`);
    console.log(`   Received: ${normalizedOrigin}`);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Logger middleware
app.use(logger);

// Routes
app.get("/", (req, res) => {
  console.log("🏠 Root endpoint accessed");
  res.json({
    success: true,
    message: "FinTrack API is running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

console.log("📝 Registering API routes...");
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
console.log("✓ Routes registered successfully");

// Error handler (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log("═══════════════════════════════════════════════".cyan);
    console.log(`  🚀 FinTrack Server Running `.green.bold);
    console.log(`  📍 Port: ${PORT}`.yellow);
    console.log(
      `  🌍 Environment: ${process.env.NODE_ENV || "development"}`.yellow,
    );
    console.log("═══════════════════════════════════════════════".cyan);
  });
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`✗ Unhandled Rejection: ${err.message}`.red.bold);
  if (process.env.NODE_ENV !== "production") {
    process.exit(1);
  }
});

// Export for Vercel
export default app;
